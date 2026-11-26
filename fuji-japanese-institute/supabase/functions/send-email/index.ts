// 📧 SUPABASE EDGE FUNCTION: SEND EMAILS (VIA RESEND)
// We use Resend because it is the "Supabase Native" recommendation for emails.
// Docs: https://resend.com/docs/dashboard/emails/introduction

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const ADMIN_EMAIL = "fujijapaneseacademy@gmail.com";

// Verified domain sender email
const SENDER_EMAIL = Deno.env.get("SENDER_EMAIL") || "info@fujijapaneseacademy.com";
const RESEND_AUDIENCE_ID = Deno.env.get("RESEND_AUDIENCE_ID") || "d218dcb9-e797-4eee-a3d0-5f604e33b47f";
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

interface EmailData {
  name: string;
  email: string;
  phone: string;
  course?: string;
  subject?: string;
  companyName?: string;
  teamSize?: string;
  message?: string;
  paymentId?: string;
  amountPaid?: string;
  formType: string;
  isNewUser?: boolean;
  loginUrl?: string;
}

const allowedOrigins = [
  "https://fujijapaneseacademy.com",
  "https://www.fujijapaneseacademy.com",
  "https://fujijapanese.netlify.app",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const isAllowed = allowedOrigins.includes(origin) || origin.startsWith("http://localhost");
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
  };
}

const ALLOWED_FORM_TYPES = new Set([
  'Enrollment',
  'Enrollment Lead',
  'Contact',
  'Free Course',
  'Demo Inquiry',
  'Dedicated Admissions Enquiry',
  'Corporate',
  'Newsletter',
  'Job Application',
  'PasswordReset'
]);

// In-memory sliding window rate-limiting for abuse prevention
const ipRequestTimes = new Map<string, number[]>();
const emailRequestTimes = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_IP = 5;
const EMAIL_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_EMAIL = 3;

function isRateLimited(clientIp: string, email: string): boolean {
  const now = Date.now();
  const ipHits = (ipRequestTimes.get(clientIp) || []).filter(t => now - t < RATE_LIMIT_WINDOW_MS);
  if (ipHits.length >= MAX_REQUESTS_PER_IP) return true;
  ipHits.push(now);
  ipRequestTimes.set(clientIp, ipHits);

  const cleanEmail = email.toLowerCase().trim();
  const emailHits = (emailRequestTimes.get(cleanEmail) || []).filter(t => now - t < EMAIL_LIMIT_WINDOW_MS);
  if (emailHits.length >= MAX_REQUESTS_PER_EMAIL) return true;
  emailHits.push(now);
  emailRequestTimes.set(cleanEmail, emailHits);

  return false;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("cf-connecting-ip") || "unknown_ip";
    const data: EmailData = await req.json();

    // Input length validation to prevent injection and abuse
    if (!data.name || !data.email || !data.formType) {
      return new Response(JSON.stringify({ error: 'Missing required fields' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (!ALLOWED_FORM_TYPES.has(data.formType)) {
      return new Response(JSON.stringify({ error: 'Invalid or unsupported formType' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    if (data.name.length > 100 || data.email.length > 254 || (data.phone && data.phone.length > 20) ||
        (data.message && data.message.length > 2000) || (data.companyName && data.companyName.length > 200)) {
      return new Response(JSON.stringify({ error: 'Input exceeds allowed length' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
    // Strict email format check
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
      return new Response(JSON.stringify({ error: 'Invalid email format' }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }

    // Server-side rate limiting per IP and per recipient email
    if (isRateLimited(clientIp, data.email)) {
      console.warn(`[Send Email] Rate limit exceeded for IP ${clientIp} / Email ${data.email}`);
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please wait a few minutes before submitting again.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY env variable");
    }

    // Special handling for Password Reset emails (sent from info@fujijapaneseacademy.com)
    if (data.formType === "PasswordReset") {
      const cleanEmail = (data.email || "").trim().toLowerCase();
      if (!cleanEmail) {
        throw new Error("Missing email for password reset");
      }

      let redirectTo = "https://fujijapaneseacademy.com/reset-password";
      if (data.loginUrl && typeof data.loginUrl === "string") {
        const isAllowedOrigin = allowedOrigins.some(origin => data.loginUrl?.startsWith(origin)) || data.loginUrl.startsWith("http://localhost");
        if (isAllowedOrigin) {
          redirectTo = data.loginUrl;
        }
      }
      let resetUrl = redirectTo;

      if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
        const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
          auth: { autoRefreshToken: false, persistSession: false },
        });

        const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
          type: "recovery",
          email: cleanEmail,
          options: { redirectTo },
        });

        if (!linkErr && linkData?.properties?.action_link) {
          resetUrl = linkData.properties.action_link;
          console.log("✅ Generated recovery link for:", cleanEmail);
        } else if (linkErr) {
          console.warn("generateLink warning:", linkErr.message);
        }
      }

      const resetSubject = "🔒 Reset Your Password — Fuji Japanese Academy";
      const resetHtml = getPasswordResetTemplate(cleanEmail, resetUrl);

      let resetSent = false;
      let resetError: string | null = null;
      try {
        await sendToResend(cleanEmail, resetSubject, resetHtml);
        resetSent = true;
        console.log("✅ Sent password reset email to:", cleanEmail);
      } catch (e: any) {
        console.error("Password reset Resend error:", e.message || e);
        resetError = e.message || "Failed to send reset email";
      }

      return new Response(
        JSON.stringify({
          success: resetSent,
          studentSent: resetSent,
          studentError: resetError,
          message: resetSent
            ? "Password reset email sent from info@fujijapaneseacademy.com"
            : resetError,
        }),
        {
          headers: { ...corsHeaders, "Content-Type": "application/json" },
          status: resetSent ? 200 : 400,
        }
      );
    }

    // Normalize course name
    const effectiveCourse = data.course || data.subject || (data.formType === 'Corporate' ? 'Corporate Japanese Training for Enterprises' : 'General Japanese Program');
    data.course = effectiveCourse;

    const isCorporate = data.formType === 'Corporate' || 
                        (data.course && data.course.toLowerCase().includes('corporate')) || 
                        !!data.companyName;

    // 0. Ensure user exists in Supabase Auth ONLY for paid individual enrollments
    if (data.paymentId && !isCorporate) {
      await ensureAuthUser(data);
    }

    // 1. Prepare Admin Email
    const adminHtml = getAdminTemplate(data, isCorporate);
    const adminSubject = isCorporate
      ? `🏢 Enterprise Corporate Training Lead: ${data.name} ${data.companyName ? `(${data.companyName})` : ''}`
      : data.paymentId
        ? `💰 Payment Received: ${data.name} (${data.course})`
        : `New Lead: ${data.name}`;

    // 2. Prepare Client / Student Email
    const isPayment = !isCorporate && !!data.paymentId;
    const studentSubject = isCorporate
      ? `Fuji Japanese Academy — Corporate Training Proposal & Consultation Details`
      : isPayment
        ? `Enrollment Confirmed: ${data.course} 🎓`
        : `Arigatou Gozaimasu, ${data.name}!`;

    const studentHtml = isCorporate
      ? getCorporateClientTemplate(data)
      : isPayment
        ? getPaymentSuccessTemplate(data)
        : getStudentInquiryTemplate(data);

    // 3. Send Both Emails independently using Resend API
    let adminSent = false;
    let studentSent = false;
    let studentError: string | null = null;
    let adminError: string | null = null;

    try {
      await sendToResend(ADMIN_EMAIL, adminSubject, adminHtml);
      adminSent = true;
    } catch (e: any) {
      console.error("Admin Resend Error:", e.message || e);
      adminError = e.message || "Failed to deliver admin email";
    }

    try {
      await sendToResend(data.email, studentSubject, studentHtml);
      studentSent = true;
    } catch (e: any) {
      console.error("Student Resend Error:", e.message || e);
      studentError = e.message || "Failed to deliver student email";
    }

    // 4. Automatically sync student/lead to Resend Audience for marketing and updates
    syncToAudience(data.email, data.name).catch(() => {});

    return new Response(JSON.stringify({
      success: studentSent || adminSent,
      adminSent,
      studentSent,
      studentError,
      adminError,
      message: studentSent ? "Emails sent via Resend" : "Student email blocked by Resend restrictions"
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });

  } catch (error) {
    console.error("Email Error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

/**
 * Helper to send email via Resend Fetch API
 */
async function sendToResend(to: string, subject: string, html: string) {
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${RESEND_API_KEY}`,
    },
    body: JSON.stringify({
      from: `Fuji Japanese Academy <${SENDER_EMAIL}>`,
      to: [to],
      subject: subject,
      html: html,
    }),
  });

  const body = await res.json();
  if (!res.ok) {
    console.error("Resend Error:", body);
    throw new Error(`Resend API Error: ${JSON.stringify(body)}`);
  }
  return body;
}

/**
 * Ensures user is created/updated in Supabase Auth with email confirmed
 */
async function ensureAuthUser(data: EmailData) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !data.email) return;

  try {
    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false }
    });
    const cleanEmail = data.email.trim().toLowerCase();

    // Look up existing user via profiles table (indexed)
    const { data: existingProfile } = await admin
      .from("profiles")
      .select("id")
      .eq("email", cleanEmail)
      .maybeSingle();

    let userId = existingProfile?.id;

    if (userId) {
      await admin.auth.admin.updateUserById(userId, {
        email_confirm: true,
        user_metadata: { full_name: data.name, phone: data.phone }
      });
      console.log("✅ Synced profile metadata for existing user:", cleanEmail);
    } else {
      const { data: createData, error: createErr } = await admin.auth.admin.createUser({
        email: cleanEmail,
        email_confirm: true,
        user_metadata: { full_name: data.name, phone: data.phone }
      });
      if (createErr) {
        // Fallback: If user already exists in auth
        const { data: listData } = await admin.auth.admin.listUsers();
        const found = listData?.users?.find((u: any) => u.email?.toLowerCase() === cleanEmail);
        if (found) {
          userId = found.id;
        }
      } else {
        userId = createData?.user?.id;
        console.log("✅ Provisioned new student account for:", cleanEmail);
      }
    }

    // Generate secure single-use password activation / recovery link
    try {
      const { data: linkData, error: linkErr } = await admin.auth.admin.generateLink({
        type: "recovery",
        email: cleanEmail,
        options: { redirectTo: "https://fujijapaneseacademy.com/reset-password" },
      });
      if (!linkErr && linkData?.properties?.action_link) {
        data.loginUrl = linkData.properties.action_link;
        console.log("✅ Generated secure account activation link for:", cleanEmail);
      }
    } catch (linkEx) {
      console.warn("generateLink non-blocking notice:", linkEx);
    }

    // 2. Sync to 'profiles' table
    if (userId) {
      const { error: profErr } = await admin.from("profiles").upsert({
        id: userId,
        full_name: data.name,
        email: cleanEmail,
        phone: data.phone || "N/A",
        updated_at: new Date().toISOString()
      });
      if (profErr) console.warn("Profiles upsert warning:", profErr.message);
      else console.log("✅ Profile synced for:", cleanEmail);
    }
    // NOTE: Course enrollment is strictly server-owned by Cashfree payment webhook & verification.
    // send-email never inserts or modifies enrollments table.
  } catch (err) {
    console.error("ensureAuthUser exception:", err);
  }
}

/**
 * Helper to automatically sync leads and students to Resend Audience
 */
async function syncToAudience(email: string, fullName?: string) {
  if (!RESEND_API_KEY || !RESEND_AUDIENCE_ID || !email) return;
  try {
    const parts = (fullName || "").trim().split(" ");
    const firstName = parts[0] || "Student";
    const lastName = parts.slice(1).join(" ") || "";

    await fetch(`https://api.resend.com/audiences/${RESEND_AUDIENCE_ID}/contacts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        first_name: firstName,
        last_name: lastName,
        unsubscribed: false,
      }),
    });
  } catch (err) {
    console.warn("Resend Audience sync non-critical warning:", err);
  }
}

// --- TEMPLATES ---

const SUBJECT_STYLES = `
  font-family: 'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  color: #1a1a1a;
  line-height: 1.6;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const HEADER_STYLE = `
  background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
  color: #ffffff;
  padding: 40px 30px;
  text-align: center;
`;

const CONTENT_STYLE = `
  padding: 40px 30px;
`;

const FOOTER_STYLE = `
  background-color: #f9fafb;
  padding: 30px;
  text-align: center;
  border-top: 1px solid #f3f4f6;
  font-size: 14px;
  color: #6b7280;
`;

function getAdminTemplate(data: EmailData, isCorporate: boolean = false) {
  const isPayment = !isCorporate && !!data.paymentId;
  const headerTitle = isCorporate
    ? "Enterprise Corporate Training Lead"
    : isPayment
      ? "New Enrollment Payment"
      : "New Student Inquiry";
  const headerGradient = isCorporate
    ? "linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)"
    : isPayment
      ? "linear-gradient(135deg, #065f46 0%, #059669 100%)"
      : "linear-gradient(135deg, #1e1b4b 0%, #312e81 100%)";

  return `
    <div style="background-color: #f3f4f6; padding: 40px 20px;">
      <div style="${SUBJECT_STYLES}">
        <div style="${HEADER_STYLE} background: ${headerGradient};">
          <img src="https://fujijapaneseacademy.com/logo.png" alt="Fuji Japanese Academy" style="width: 80px; margin-bottom: 20px;">
          <h1 style="margin:0; font-size: 24px; font-weight: 700; letter-spacing: -0.025em;">${headerTitle}</h1>
          <p style="margin: 10px 0 0; opacity: 0.9;">Source: ${data.formType}</p>
        </div>
        <div style="${CONTENT_STYLE}">
          <h2 style="margin-top:0; font-size: 18px; color: #111827; border-bottom: 2px solid #f3f4f6; padding-bottom: 10px;">
            ${isCorporate ? "Corporate Client Details" : "Student Details"}
          </h2>
          <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
            <tr>
              <td style="padding: 12px 0; color: #6b7280; width: 140px;">Representative</td>
              <td style="padding: 12px 0; color: #111827; font-weight: 600;">${data.name}</td>
            </tr>
            ${data.companyName ? `
            <tr>
              <td style="padding: 12px 0; color: #6b7280;">Company / Org</td>
              <td style="padding: 12px 0; color: #111827; font-weight: 700;">${data.companyName}</td>
            </tr>
            ` : ''}
            ${data.teamSize ? `
            <tr>
              <td style="padding: 12px 0; color: #6b7280;">Team / Cohort Size</td>
              <td style="padding: 12px 0; color: #111827; font-weight: 600;">${data.teamSize}</td>
            </tr>
            ` : ''}
            <tr>
              <td style="padding: 12px 0; color: #6b7280;">Email</td>
              <td style="padding: 12px 0; color: #111827; font-weight: 600;"><a href="mailto:${data.email}" style="color: #4f46e5; text-decoration: none;">${data.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #6b7280;">Phone / WhatsApp</td>
              <td style="padding: 12px 0; color: #111827; font-weight: 600;"><a href="tel:${data.phone}" style="color: #111827; text-decoration: none;">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px 0; color: #6b7280;">Program</td>
              <td style="padding: 12px 0; color: #111827; font-weight: 600;">${data.course}</td>
            </tr>
          </table>

          ${data.message ? `
            <div style="margin-top: 30px; padding: 20px; background-color: #f9fafb; border-radius: 12px; border-left: 4px solid #e5e7eb;">
              <p style="margin: 0; font-size: 14px; color: #4b5563; font-style: italic;">"${data.message}"</p>
            </div>
          ` : ''}

          ${isPayment ? `
            <div style="margin-top: 30px; padding: 24px; background-color: #ecfdf5; border-radius: 12px; border: 1px solid #d1fae5;">
              <h3 style="margin: 0 0 16px 0; color: #065f46; font-size: 16px;">Payment Information</h3>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #065f46; opacity: 0.8;">Amount:</span>
                <strong style="color: #065f46; font-size: 20px;">${data.amountPaid}</strong>
              </div>
              <div style="font-size: 12px; color: #065f46; opacity: 0.7;">
                Transaction ID: ${data.paymentId}
              </div>
            </div>
          ` : ''}
          
          <div style="margin-top: 40px; text-align: center;">
            <a href="https://fujijapaneseacademy.com/admin/inquiries" style="display: inline-block; background-color: #1e1b4b; color: #ffffff; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; font-size: 15px;">View in Admin Panel</a>
          </div>
        </div>
        <div style="${FOOTER_STYLE}">
          This is an automated notification from Fuji Japanese Academy.
        </div>
      </div>
    </div>
  `;
}

function getCorporateClientTemplate(data: EmailData) {
  const company = data.companyName ? ` at <strong>${data.companyName}</strong>` : '';
  return `
    <div style="background-color: #f1f5f9; padding: 30px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-width: 600px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; box-sizing: border-box;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 36px 24px; text-align: center; color: #ffffff;">
          <img src="https://fujijapaneseacademy.com/logo.png" alt="Fuji Japanese Academy" style="width: 80px; margin-bottom: 16px;">
          <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.15em; color: #f43f5e; text-transform: uppercase; margin-bottom: 6px;">CORPORATE TRAINING DIVISION</div>
          <h1 style="margin: 0; font-size: 24px; font-weight: 800; color: #ffffff; line-height: 1.3;">Customized Enterprise Training Proposal</h1>
          <p style="margin: 8px 0 0; font-size: 14px; color: #94a3b8;">Bilingual & Native Japanese Language Programs for MNCs & Tech Teams</p>
        </div>

        <!-- Body -->
        <div style="padding: 30px 24px; color: #334155; font-size: 15px; line-height: 1.6;">
          <p style="font-size: 16px; color: #0f172a; margin-top: 0;">Dear <strong>${data.name}</strong>${company},</p>
          <p style="color: #475569;">
            Thank you for connecting with <strong>Fuji Japanese Academy</strong> regarding corporate Japanese language training. We have received your enterprise requirements and our Corporate Training Director will connect with you within 24 hours.
          </p>

          <!-- Executive Summary Card -->
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.08em; color: #64748b; text-transform: uppercase; margin-bottom: 12px;">Inquiry Summary</div>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 14px;">
              ${data.companyName ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b; width: 130px;">Organization:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 700;">${data.companyName}</td>
              </tr>
              ` : ''}
              ${data.teamSize ? `
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Cohort Size:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${data.teamSize}</td>
              </tr>
              ` : ''}
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Target Program:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${data.course}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Primary Contact:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 600;">${data.phone} (${data.email})</td>
              </tr>
            </table>
          </div>

          <!-- Enterprise Pillars -->
          <div style="margin: 24px 0;">
            <h3 style="color: #0f172a; font-size: 16px; margin: 0 0 12px 0;">Our Enterprise Training Methodology Includes:</h3>
            <div style="display: flex; flex-direction: column; gap: 10px;">
              <div style="background: #f8fafc; border-left: 3px solid #dc2626; padding: 12px 14px; border-radius: 0 8px 8px 0; font-size: 14px; color: #334155;">
                <strong>Keigo & Business Etiquette:</strong> Formal Japanese business email writing, client honorifics, and Hou-Ren-So reporting framework.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #4f46e5; padding: 12px 14px; border-radius: 0 8px 8px 0; font-size: 14px; color: #334155;">
                <strong>Domain-Specific Vocabulary:</strong> Tailored terminology for IT/Software Engineering, Automotive, Manufacturing, or Finance.
              </div>
              <div style="background: #f8fafc; border-left: 3px solid #059669; padding: 12px 14px; border-radius: 0 8px 8px 0; font-size: 14px; color: #334155;">
                <strong>Flexible Delivery Modes:</strong> In-person classroom training at your campus/office in Bengaluru or private live virtual batches.
              </div>
            </div>
          </div>

          <!-- Direct Corporate Support -->
          <div style="background: linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%); border-radius: 12px; padding: 18px; margin: 24px 0; text-align: center;">
            <div style="font-size: 12px; font-weight: 800; color: #991b1b; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px;">Direct Corporate Admissions Desk</div>
            <p style="margin: 4px 0 10px 0; font-size: 14px; color: #4b5563;">Need an immediate formal proposal or custom batch quote?</p>
            <div style="display: inline-block;">
              <a href="tel:+916364924110" style="display: inline-block; background-color: #dc2626; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; margin: 4px;">Call +91 63649 24110</a>
              <a href="mailto:fujijapaneseacademy@gmail.com" style="display: inline-block; background-color: #0f172a; color: #ffffff; padding: 10px 20px; border-radius: 8px; text-decoration: none; font-weight: 700; font-size: 14px; margin: 4px;">Email Corporate Desk</a>
            </div>
          </div>

          <p style="margin-top: 26px; font-size: 14px; color: #0f172a; font-weight: 600;">
            With sincere regards,<br>
            <span style="font-weight: 400; color: #64748b; font-size: 13px;">Corporate Training & Enterprise Relations | Fuji Japanese Academy</span>
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 18px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8;">
          Fuji Japanese Academy • Electronic City, Bengaluru, India<br>
          <a href="https://fujijapaneseacademy.com" style="color: #dc2626; text-decoration: none;">fujijapaneseacademy.com</a>
        </div>
      </div>
    </div>
  `;
}

function getStudentInquiryTemplate(data: EmailData) {
  return `
    <div style="background-color: #f9fafb; padding: 40px 20px;">
      <div style="${SUBJECT_STYLES}">
        <div style="${HEADER_STYLE}">
          <img src="https://fujijapaneseacademy.com/logo.png" alt="Fuji Japanese Academy" style="width: 70px; margin-bottom: 20px;">
          <h1 style="margin:0; font-size: 32px; font-weight: 800; letter-spacing: -0.025em;">Arigatou Gozaimasu!</h1>
          <p style="margin: 10px 0 0; font-size: 18px; opacity: 0.9;">Thank you for your interest, ${data.name.split(' ')[0]}</p>
        </div>
        <div style="${CONTENT_STYLE}">
          <p style="font-size: 18px; color: #111827;">Konnichiwa <strong>${data.name}</strong>,</p>
          <p style="font-size: 16px; color: #4b5563;">We have received your inquiry regarding the <strong>${data.course}</strong> course. Our academic counselors will review your request and get in touch with you shortly at <strong>${data.phone}</strong>.</p>
          
          <div style="margin: 40px 0; padding: 30px; background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); border-radius: 20px; text-align: center;">
            <h3 style="margin-top: 0; color: #4338ca; font-size: 20px;">Why learn with Fuji?</h3>
            <ul style="text-align: left; display: inline-block; padding: 0; list-style: none; margin: 20px 0;">
              <li style="margin-bottom: 12px; display: flex; align-items: center; color: #4b5563;">
                <span style="background-color: #4f46e5; color: white; width: 24px; height: 24px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 12px;">✓</span>
                Native Japanese Speaking Senseis
              </li>
              <li style="margin-bottom: 12px; display: flex; align-items: center; color: #4b5563;">
                <span style="background-color: #4f46e5; color: white; width: 24px; height: 24px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 12px;">✓</span>
                JLPT Oriented Training (N5 to N1)
              </li>
              <li style="margin-bottom: 0; display: flex; align-items: center; color: #4b5563;">
                <span style="background-color: #4f46e5; color: white; width: 24px; height: 24px; border-radius: 12px; display: inline-flex; align-items: center; justify-content: center; margin-right: 12px; font-size: 12px;">✓</span>
                Weekend & Weekday Flexible Batches
              </li>
            </ul>
            <div style="margin-top: 10px;">
              <a href="https://fujijapaneseacademy.com/courses" style="display: inline-block; background-color: #4f46e5; color: #ffffff; padding: 14px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3);">Explore More Courses</a>
            </div>
          </div>

          <p style="font-size: 15px; color: #6b7280; text-align: center;">In the meantime, feel free to check out our free resources or follow us on social media for daily Japanese tips.</p>
        </div>
        <div style="${FOOTER_STYLE}">
          <p style="margin-bottom: 8px;"><strong>Fuji Japanese Academy</strong></p>
          <p style="margin: 0;">Bengaluru, India | +91 6364924110</p>
          <div style="margin-top: 20px;">
             <a href="#" style="margin: 0 10px; color: #9ca3af; text-decoration: none;">Instagram</a>
             <a href="#" style="margin: 0 10px; color: #9ca3af; text-decoration: none;">LinkedIn</a>
             <a href="#" style="margin: 0 10px; color: #9ca3af; text-decoration: none;">Facebook</a>
          </div>
          <p style="margin-top: 20px; font-size: 11px; opacity: 0.6;">&copy; ${new Date().getFullYear()} Fuji Japanese Academy. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;
}

function getPaymentSuccessTemplate(data: EmailData) {
  const loginSection = `
    <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 20px 14px; margin: 24px 0; text-align: center; box-sizing: border-box; width: 100%;">
      <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.1em; color: #991b1b; text-transform: uppercase; margin-bottom: 4px;">Welcome to the Academy! 🎊</div>
      <p style="color: #4b5563; font-size: 14px; margin: 4px 0 16px 0; line-height: 1.4;">Your student portal is ready for <strong>${data.email}</strong>. For your security, please activate your account and choose your password using the link below:</p>
      
      <a href="${data.loginUrl || 'https://fujijapaneseacademy.com/login'}" style="display: block; width: 100%; max-width: 320px; margin: 0 auto; background: #dc2626; color: #ffffff; padding: 14px 20px; text-decoration: none; border-radius: 10px; font-weight: 700; font-size: 15px; box-sizing: border-box; text-align: center; box-shadow: 0 4px 14px rgba(220, 38, 38, 0.35);">Set Up Password & Access Portal →</a>
      <p style="margin: 10px 0 0 0; font-size: 12px; color: #64748b;">(Single-use secure link valid for 24 hours)</p>
    </div>
  `;

  return `
    <div style="background-color: #f1f5f9; padding: 14px 6px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-width: 580px; width: 100%; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0; box-sizing: border-box;">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 30px 18px; text-align: center; color: #ffffff;">
          <img src="https://fujijapaneseacademy.com/favicon.png" alt="Fuji" width="52" height="52" style="border-radius: 12px; margin-bottom: 12px; display: inline-block;">
          <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.15em; color: #f43f5e; text-transform: uppercase; margin-bottom: 4px;">FUJI JAPANESE ACADEMY</div>
          <h1 style="margin: 0; font-size: 26px; font-weight: 800; color: #ffffff; line-height: 1.2;">Omedetou! 🎉</h1>
          <p style="margin: 6px 0 0 0; font-size: 15px; color: #cbd5e1;">Course Enrollment Confirmed</p>
        </div>

        <div style="padding: 22px 18px; box-sizing: border-box;">
          <p style="font-size: 16px; color: #0f172a; margin: 0 0 12px 0;">Konnichiwa <strong>${data.name}</strong>-san,</p>
          <p style="font-size: 14px; color: #475569; margin: 0 0 18px 0; line-height: 1.6;">
            Congratulations on enrolling in <strong>${data.course}</strong>! Your admission is verified and your learning materials are unlocked.
          </p>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 16px 0; box-sizing: border-box;">
            <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.08em; color: #64748b; text-transform: uppercase; margin-bottom: 10px;">Enrollment Summary</div>
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 14px;">
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Course:</td>
                <td style="padding: 6px 0; color: #0f172a; font-weight: 700; text-align: right;">${data.course}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Amount Paid:</td>
                <td style="padding: 6px 0; color: #059669; font-weight: 800; text-align: right;">₹${data.amountPaid || '2,999'}</td>
              </tr>
              <tr>
                <td style="padding: 6px 0; color: #64748b;">Reference ID:</td>
                <td style="padding: 6px 0; color: #0f172a; font-family: monospace; font-size: 12px; text-align: right;">${data.paymentId || 'N/A'}</td>
              </tr>
            </table>
          </div>

          ${loginSection}

          <div style="margin-top: 22px; padding-top: 18px; border-top: 1px solid #f1f5f9;">
            <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-bottom: 8px;">Quick Steps to Get Started:</div>
            <div style="font-size: 13px; color: #475569; line-height: 1.6;">
              • Log in to your portal and view your 25 JLPT N5 lessons.<br>
              • Complete interactive exercises and quiz tests at your pace.<br>
              • Join our student community on WhatsApp for daily practice.
            </div>
          </div>

          <p style="margin-top: 26px; font-size: 14px; color: #0f172a; font-weight: 600;">
            Gambatte kudasai! (Do your best!)<br>
            <span style="font-weight: 400; color: #64748b; font-size: 13px;">— Sensei & Team Fuji Japanese Academy</span>
          </p>
        </div>

        <div style="background-color: #f8fafc; padding: 18px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8;">
          Fuji Japanese Academy • Bangalore, India<br>
          Questions? Reply directly to this email or visit <a href="https://fujijapaneseacademy.com" style="color: #dc2626; text-decoration: none;">fujijapaneseacademy.com</a>
        </div>
      </div>
    </div>
  `;
}

function getPasswordResetTemplate(email: string, resetUrl: string) {
  return `
    <div style="background-color: #f1f5f9; padding: 40px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
      <div style="max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.01); border: 1px solid #e2e8f0;">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, #1e1b4b 0%, #2e2874 100%); padding: 36px 30px; text-align: center;">
          <div style="display: inline-block; padding: 8px 16px; background: rgba(255, 255, 255, 0.1); border-radius: 9999px; color: #fca5a5; font-size: 11px; font-weight: 800; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 12px; border: 1px solid rgba(255, 255, 255, 0.15);">
            🇯🇵 Fuji Japanese Academy
          </div>
          <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: -0.02em;">Password Reset Request</h1>
        </div>

        <!-- Body -->
        <div style="padding: 36px 30px; color: #334155; font-size: 15px; line-height: 1.6;">
          <p style="margin-top: 0; font-size: 16px; color: #0f172a;">
            Konnichiwa,
          </p>
          <p style="color: #475569;">
            We received a request to reset the password for your account associated with <strong style="color: #0f172a;">${email}</strong>.
          </p>
          <p style="color: #475569;">
            Click the button below to choose a new password. This link is valid for 1 hour.
          </p>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetUrl}" style="display: inline-block; background-color: #dc2626; color: #ffffff; font-weight: 700; font-size: 15px; padding: 14px 36px; border-radius: 12px; text-decoration: none; box-shadow: 0 4px 14px rgba(220, 38, 38, 0.35);">
              Reset My Password →
            </a>
          </div>

          <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; margin: 24px 0;">
            <div style="font-size: 12px; font-weight: 700; color: #64748b; margin-bottom: 6px;">If the button doesn't work, copy and paste this link:</div>
            <div style="font-size: 11px; word-break: break-all; color: #3b82f6; line-height: 1.4;">
              <a href="${resetUrl}" style="color: #2563eb; text-decoration: underline;">${resetUrl}</a>
            </div>
          </div>

          <p style="color: #94a3b8; font-size: 13px; line-height: 1.5; margin-bottom: 0;">
            If you did not request this password reset, you can safely ignore this email. Your password will remain unchanged.
          </p>
        </div>

        <!-- Footer -->
        <div style="background-color: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8;">
          Fuji Japanese Academy • Bengaluru, India<br>
          Sent securely from <a href="mailto:info@fujijapaneseacademy.com" style="color: #dc2626; text-decoration: none;">info@fujijapaneseacademy.com</a>
        </div>
      </div>
    </div>
  `;
}


