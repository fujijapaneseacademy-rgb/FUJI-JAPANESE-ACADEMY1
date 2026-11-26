import { supabase } from '../src/lib/supabaseClient';
import { sendConfirmationEmail } from './emailService';
import { trackFormSubmission } from '../src/lib/analytics';

export interface FormData {
  formType: 'Enrollment' | 'Enrollment Lead' | 'Contact' | 'Free Course' | 'Demo Inquiry' | 'Dedicated Admissions Enquiry' | 'Corporate' | 'Newsletter' | 'Job Application';
  name: string;
  email: string;
  phone: string;
  course?: string; // Optional for Contact form
  courseId?: string; // ID of the course constant/DB row
  subject?: string; // Optional for Enrollment form
  message?: string;
  companyName?: string;
  teamSize?: string;
  paymentId?: string;
  amountPaid?: string;
  loginUrl?: string;
}

/**
 * 🚀 SUBMIT DATA TO SUPABASE
 * 1. Stores the lead in the 'leads' table and mirrors to 'inquiries' for admin dashboard.
 * 2. Sends an email confirmation via Supabase Edge Function (Resend) and EmailJS fallback.
 * 3. Handles basic Auth signup/enrollment strictly for paid enrollments.
 */
export const submitToGoogleSheet = async (data: FormData): Promise<boolean> => {

  // Sanitize Inputs
  data.email = data.email ? data.email.trim().toLowerCase().substring(0, 100) : '';
  data.name = data.name ? data.name.trim().substring(0, 100) : '';
  data.phone = data.phone ? data.phone.trim().substring(0, 50) : '';
  data.message = data.message ? data.message.trim().substring(0, 1000) : '';
  data.companyName = data.companyName ? data.companyName.trim().substring(0, 100) : '';
  data.teamSize = data.teamSize ? data.teamSize.trim().substring(0, 50) : '';

  // Rate Limiting & Debouncing (prevent rapid duplicate clicks within 10s)
  const now = Date.now();
  if (data.email) {
    try {
      const rateLimitKey = `fuji_submit_${data.formType}_${data.email}`;
      const lastSubmitTime = typeof window !== 'undefined' ? localStorage.getItem(rateLimitKey) : null;
      if (lastSubmitTime && now - parseInt(lastSubmitTime, 10) < 10000) {
        // If already submitted in the last 10 seconds, treat as successful to avoid duplicate errors
        return true;
      }
    } catch {
      // Ignore private browsing localStorage restrictions
    }
  }

  const effectiveCourse = data.course || data.subject || (data.formType === 'Corporate' ? 'Corporate Japanese Training for Enterprises' : 'General Japanese Program');
  data.course = effectiveCourse;

  try {
    let leadSaved = false;
    const compositeMessage = data.formType === 'Corporate' && data.companyName
      ? `[Company: ${data.companyName} | Team Size: ${data.teamSize || 'N/A'}] ${data.message || ''}`
      : data.message;

    // 1️⃣ Store the Lead in 'leads' table
    try {
      const { error: dbError } = await supabase
        .from('leads')
        .insert([
          {
            full_name: data.name,
            email: data.email,
            phone: data.phone,
            course_interest: effectiveCourse,
            message: compositeMessage,
            form_source: data.formType,
            status: 'New'
          }
        ]);
      if (!dbError) {
        leadSaved = true;
      }
    } catch (dbEx) {
      if (import.meta.env.DEV) console.warn('[Fuji Leads] Insert notice:', dbEx);
    }

    // 1️⃣b Mirror to 'inquiries' table (ensures admin inquiry portal and legacy consumers see the inquiry)
    try {
      const { error: inqError } = await supabase
        .from('inquiries')
        .insert([
          {
            name: data.name,
            email: data.email,
            phone: data.phone,
            subject: effectiveCourse,
            message: compositeMessage || `Course: ${effectiveCourse}. Form: ${data.formType}`,
            status: 'new'
          }
        ]);
      if (!inqError) {
        leadSaved = true;
      }
    } catch (inqEx) {
      if (import.meta.env.DEV) console.warn('[Fuji Inquiries] Insert notice:', inqEx);
    }

    // 2️⃣ Resolve Current User Session (if authenticated)
    const isPaidEnrollment = !!data.paymentId && data.formType !== 'Corporate';
    let userId: string | undefined = undefined;

    if (isPaidEnrollment) {
      try {
        const { data: userData } = await supabase.auth.getUser();
        userId = userData.user?.id;
      } catch {
        // Unauthenticated visitor is normal
      }
    }

    // 3️⃣ Send Confirmation / Thank You Email (Resend + EmailJS fallback)
    // Server edge function generates single-use activation/setup link without plaintext passwords
    const emailPayload = {
      ...data,
      course: effectiveCourse,
      loginUrl: 'https://fujijapaneseacademy.com/login'
    };

    let studentEmailSent = false;

    try {
      const { data: mailData, error: mailError } = await supabase.functions.invoke('send-email', {
        body: emailPayload
      });

      if (!mailError && (mailData?.studentSent || mailData?.adminSent || (mailData?.success && !mailData?.studentError))) {
        studentEmailSent = true;
      }
    } catch {
      // Edge function failed silently - will fall back to EmailJS
    }

    let emailFallbackSent = false;
    // If Resend didn't confirm delivery, trigger EmailJS fallback
    if (!studentEmailSent) {
      try {
        const emailSent = await sendConfirmationEmail({
          ...data,
          course: effectiveCourse,
        });
        if (emailSent) {
          emailFallbackSent = true;
        }
      } catch {
        // EmailJS fallback also failed - form submission still counts if lead was saved
      }
    }

    // Only declare success if the submission was durably accepted in the database
    
    // 4️⃣ Track Form Submission in GA4, GTM, and Google Ads Conversions
    trackFormSubmission(data.formType, {
      course: effectiveCourse,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.companyName || undefined,
      team_size: data.teamSize || undefined,
      payment_id: data.paymentId || undefined,
    });

    const isSuccess = leadSaved;

    if (isSuccess && typeof window !== 'undefined') {
      try {
        if (data.email) {
          const rateLimitKey = `fuji_submit_${data.formType}_${data.email}`;
          localStorage.setItem(rateLimitKey, now.toString());
        }
        localStorage.setItem('fuji_form_submitted', 'true');
        localStorage.setItem('fuji_exit_popup_completed', 'true');
        localStorage.setItem('fuji_exit_popup_dismissed', 'true');
        localStorage.setItem('fuji_exit_popup_shown', 'true');
      } catch {}
    } else if (!isSuccess && typeof window !== 'undefined') {
      // Offline fallback: cache lead so it is never permanently lost
      try {
        const offlineLeads = JSON.parse(localStorage.getItem('fuji_offline_leads') || '[]');
        offlineLeads.push({ ...data, savedAt: new Date().toISOString() });
        localStorage.setItem('fuji_offline_leads', JSON.stringify(offlineLeads.slice(-50)));
      } catch {}
    }

    return isSuccess;

  } catch (error) {
    if (import.meta.env.DEV) console.error("[Fuji Database] Critical Failure:", error);
    return false;
  }
};
