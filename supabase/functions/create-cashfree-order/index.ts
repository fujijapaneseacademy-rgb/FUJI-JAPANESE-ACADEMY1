// 💳 SUPABASE EDGE FUNCTION: CREATE CASHFREE ORDER
// Generates official Cashfree Order & Payment Session ID using authoritative server-side pricing.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const CASHFREE_ENV = (Deno.env.get("CASHFREE_ENV") || Deno.env.get("VITE_CASHFREE_MODE") || "SANDBOX").toUpperCase();
const IS_PROD = CASHFREE_ENV === "PRODUCTION";
const CASHFREE_API_ENDPOINT = IS_PROD ? "https://api.cashfree.com/pg/orders" : "https://sandbox.cashfree.com/pg/orders";

const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const allowedOrigins = [
  "https://fujijapaneseacademy.com",
  "https://www.fujijapaneseacademy.com",
  "https://fujijapanese.netlify.app",
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get("origin") || "";
  const isAllowed = allowedOrigins.includes(origin) || origin.startsWith("http://localhost") || origin.startsWith("http://127.0.0.1");
  return {
    "Access-Control-Allow-Origin": isAllowed ? origin : allowedOrigins[0],
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  };
}

// Authoritative course price catalog (in INR Rupees)
// All pricing is authoritatively determined server-side; client amounts are strictly ignored.
interface CoursePriceDefinition {
  title: string;
  priceINR: number;
}

const AUTHORITATIVE_COURSES: Record<string, CoursePriceDefinition> = {
  // JLPT Core Programs
  "jlpt-n5": { title: "JLPT N5 Foundation Course", priceINR: 15000 },
  "n5": { title: "JLPT N5 Foundation Course", priceINR: 15000 },
  "jlpt-n4": { title: "JLPT N4 Elementary Course", priceINR: 20300 },
  "n4": { title: "JLPT N4 Elementary Course", priceINR: 20300 },
  "jlpt-n3": { title: "JLPT N3 Intermediate Course", priceINR: 30300 },
  "n3": { title: "JLPT N3 Intermediate Course", priceINR: 30300 },
  "jlpt-n2": { title: "JLPT N2 Pre-Advanced Course", priceINR: 40200 },
  "n2": { title: "JLPT N2 Pre-Advanced Course", priceINR: 40200 },
  "jlpt-n1": { title: "JLPT N1 Master Course", priceINR: 75300 },
  "n1": { title: "JLPT N1 Master Course", priceINR: 75300 },

  // Specialized Immersion Programs
  "spoken-japanese": { title: "Spoken Japanese & Cultural Fluency", priceINR: 8000 },
  "spoken": { title: "Spoken Japanese & Cultural Fluency", priceINR: 8000 },
  "business-japanese": { title: "Business Japanese & Workplace Etiquette", priceINR: 22500 },
  "business": { title: "Business Japanese & Workplace Etiquette", priceINR: 22500 },
  "japanese-for-it-professionals": { title: "Japanese for IT Professionals", priceINR: 24000 },
  "it-japanese": { title: "Japanese for IT Professionals", priceINR: 24000 },
  "it": { title: "Japanese for IT Professionals", priceINR: 24000 },

  // Token Admissions
  "seat-reservation": { title: "Batch Seat Reservation Token", priceINR: 5000 },
  "reservation": { title: "Batch Seat Reservation Token", priceINR: 5000 },
};

function resolveCoursePricing(
  courseId?: string,
  courseName?: string
): { isValid: boolean; courseKey?: string; courseTitle?: string; priceINR?: number } {
  // 1. Direct ID match
  if (courseId) {
    const cleanId = courseId.trim().toLowerCase().replace(/\s+/g, "-");
    if (AUTHORITATIVE_COURSES[cleanId]) {
      return {
        isValid: true,
        courseKey: cleanId,
        courseTitle: AUTHORITATIVE_COURSES[cleanId].title,
        priceINR: AUTHORITATIVE_COURSES[cleanId].priceINR,
      };
    }
  }

  // 2. Course Name match
  if (courseName) {
    const cleanName = courseName.trim().toLowerCase();
    for (const [key, item] of Object.entries(AUTHORITATIVE_COURSES)) {
      if (
        cleanName === item.title.toLowerCase() ||
        cleanName === key ||
        cleanName.includes(key) ||
        item.title.toLowerCase().includes(cleanName)
      ) {
        return {
          isValid: true,
          courseKey: key,
          courseTitle: item.title,
          priceINR: item.priceINR,
        };
      }
    }
  }

  return { isValid: false };
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  // Support GET order verification: /create-cashfree-order?order_id=xyz
  const url = new URL(req.url);
  const verifyOrderId = url.searchParams.get("order_id");

  const appId = Deno.env.get("CASHFREE_APP_ID");
  const secretKey = Deno.env.get("CASHFREE_SECRET_KEY");
  const apiEndpoint = CASHFREE_API_ENDPOINT;

  if (!appId || !secretKey) {
    return new Response(
      JSON.stringify({ success: false, error: "Payment gateway credentials not configured." }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }

  if (req.method === "GET" && verifyOrderId) {
    try {
      const verifyRes = await fetch(`${apiEndpoint}/${encodeURIComponent(verifyOrderId)}`, {
        method: "GET",
        headers: {
          "x-client-id": appId,
          "x-client-secret": secretKey,
          "x-api-version": "2023-08-01",
        },
      });

      const orderData = await verifyRes.json();
      const isPaid = orderData?.order_status === "PAID";
      const orderCurrency = (orderData?.order_currency || "INR").toUpperCase();
      const orderAmount = Number(orderData?.order_amount || 0);
      const courseId = orderData?.order_tags?.course_id || "general";
      const courseTitle = orderData?.order_tags?.course_title || orderData?.order_note || "JLPT Program";
      const customerEmail = (orderData?.customer_details?.customer_email || "").trim().toLowerCase();

      // If PAID with valid currency and DB credentials exist, idempotently synchronize payments and enrollments
      if (isPaid && orderCurrency === "INR" && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY && customerEmail) {
        try {
          const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
            auth: { autoRefreshToken: false, persistSession: false },
          });

          await admin.from("payments").upsert(
            {
              order_id: verifyOrderId,
              cf_order_id: orderData.cf_order_id ? String(orderData.cf_order_id) : null,
              customer_email: customerEmail,
              course_id: courseId,
              course_name: courseTitle,
              amount_inr: orderAmount,
              currency: "INR",
              status: "paid",
              raw_payload: orderData,
              updated_at: new Date().toISOString(),
            },
            { onConflict: "order_id" }
          );

          // Find or create user
          let userId: string | null = null;
          const { data: profile } = await admin.from("profiles").select("id").eq("email", customerEmail).maybeSingle();
          if (profile?.id) {
            userId = profile.id;
          } else {
            const { data: userList } = await admin.auth.admin.listUsers();
            const foundUser = userList?.users?.find((u: any) => u.email?.toLowerCase() === customerEmail);
            if (foundUser?.id) {
              userId = foundUser.id;
            }
          }

          if (userId) {
            await admin.from("enrollments").upsert(
              {
                user_id: userId,
                course_id: courseId,
                course_title: courseTitle,
                status: "active",
                progress: 0,
              },
              { onConflict: "user_id, course_id" }
            );
          }
        } catch (syncErr) {
          console.warn("[Cashfree Verify] Background DB sync notice:", syncErr);
        }
      }

      return new Response(
        JSON.stringify({
          success: verifyRes.ok,
          order: orderData,
          isPaid,
          status: orderData?.order_status || "UNKNOWN",
          currency: orderCurrency,
          amount: orderAmount,
          courseId,
          courseTitle,
        }),
        {
          status: verifyRes.status,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    } catch (err: any) {
      return new Response(JSON.stringify({ success: false, error: err.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  }

  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  try {
    const body = await req.json();
    const { courseId, courseName, customer = {}, returnUrl } = body;

    // Server-enforced pricing: Resolve course authoritatively. Client amount is ignored.
    const resolved = resolveCoursePricing(courseId, courseName);
    if (!resolved.isValid || !resolved.priceINR || !resolved.courseTitle) {
      console.warn(`[Cashfree] Rejected order creation: Unrecognized course "${courseId || courseName}"`);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Invalid course selected. Course tuition is authoritatively calculated on server.",
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const priceINR = resolved.priceINR;
    console.log(`[Cashfree] Authoritative pricing applied: ${resolved.courseTitle} = ₹${priceINR} INR`);

    // Clean customer phone (must be 10 digits for Indian numbers)
    let cleanPhone = (customer.contact || customer.phone || "").replace(/\D/g, "");
    if (cleanPhone.length > 10) {
      cleanPhone = cleanPhone.slice(-10);
    }
    if (cleanPhone.length < 10) {
      cleanPhone = "9999999999"; // Fallback to satisfy Cashfree schema if user didn't enter 10 digits
    }

    const customerName = (customer.name || "Scholar").trim().substring(0, 100);
    const customerEmail = (customer.email || "student@fujijapaneseacademy.com").trim().toLowerCase().substring(0, 100);
    const customerId = `cust_${cleanPhone}_${Date.now()}`.substring(0, 50);

    const safeOrderId = `fuji_${Date.now()}_${Math.floor(Math.random() * 1000)}`.substring(0, 45);
    const safeNote = `FJA Enrollment: ${resolved.courseTitle}`.substring(0, 100);

    let effectiveReturnUrl = "https://fujijapaneseacademy.com/payment?order_id={order_id}";
    if (returnUrl && typeof returnUrl === "string") {
      const isAllowedReturn =
        allowedOrigins.some((origin) => returnUrl.startsWith(origin)) ||
        returnUrl.startsWith("http://localhost") ||
        returnUrl.startsWith("http://127.0.0.1");
      if (isAllowedReturn) {
        effectiveReturnUrl = returnUrl;
      }
    }

    const cashfreePayload = {
      order_id: safeOrderId,
      order_amount: priceINR,
      order_currency: "INR",
      customer_details: {
        customer_id: customerId,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: cleanPhone,
      },
      order_meta: {
        return_url: effectiveReturnUrl,
      },
      order_note: safeNote,
      order_tags: {
        course_id: resolved.courseKey || "general",
        course_title: resolved.courseTitle,
        system: "fuji_authoritative_v2",
      },
    };

    const cfResponse = await fetch(apiEndpoint, {
      method: "POST",
      headers: {
        "x-client-id": appId,
        "x-client-secret": secretKey,
        "x-api-version": "2023-08-01",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cashfreePayload),
    });

    const cfData = await cfResponse.json();

    if (!cfResponse.ok) {
      console.error("[Cashfree] Cashfree order creation failed:", cfData);
      return new Response(
        JSON.stringify({
          success: false,
          error: cfData?.message || "Failed to generate Cashfree order.",
          details: cfData,
        }),
        { status: cfResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Record authoritative pending payment intent into Supabase payments table
    if (SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY) {
      try {
        const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
          auth: { autoRefreshToken: false, persistSession: false },
        });
        await admin.from("payments").upsert(
          {
            order_id: safeOrderId,
            cf_order_id: cfData.cf_order_id ? String(cfData.cf_order_id) : null,
            customer_email: customerEmail,
            customer_phone: cleanPhone,
            course_id: resolved.courseKey || "general",
            course_name: resolved.courseTitle,
            amount_inr: priceINR,
            currency: "INR",
            status: "pending",
            raw_payload: cfData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
          { onConflict: "order_id" }
        );
        console.log(`[Cashfree] Recorded pending payment intent for order ${safeOrderId}`);
      } catch (dbErr) {
        console.warn("[Cashfree] Could not record pending payment intent:", dbErr);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId: cfData.order_id,
        cfOrderId: cfData.cf_order_id,
        paymentSessionId: cfData.payment_session_id,
        orderStatus: cfData.order_status,
        amount: priceINR,
        currency: "INR",
        courseId: resolved.courseKey,
        courseTitle: resolved.courseTitle,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("[Cashfree] Edge function exception:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
