import emailjs from '@emailjs/browser';
import { FormData } from './formService';
import { getAdminEmailTemplate, getStudentInquiryTemplate, getPaymentSuccessTemplate, getPasswordResetEmailTemplate } from './emailTemplates';

/**
 * Sends confirmation emails using EmailJS.
 * 
 * REQUIRED:
 * You must set these variables in your .env file:
 * - VITE_EMAILJS_SERVICE_ID
 * - VITE_EMAILJS_TEMPLATE_ID
 * - VITE_EMAILJS_PUBLIC_KEY
 * 
 * IMPORTANT:
 * Configure your ONE EmailJS template to have just this body: 
 * {{{content_html}}}
 */
export const sendConfirmationEmail = async (data: FormData) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    // Hardcoded Admin Email (The receiver of the notification)
    const ADMIN_EMAIL = "fujijapaneseacademy@gmail.com";

    if (!serviceId || !templateId || !publicKey) {
        console.warn("⚠️ [EmailJS] Configuration missing in .env. Email not sent.");
        return false;
    }

    try {
        // 1. Send Notification to Admin
        const adminHtml = getAdminEmailTemplate(data);
        const adminParams = {
            // Essential fields for EmailJS Dashboard Template (if user uses dashboard template)
            to_name: data.name,           // Mapped to {{to_name}} (Student Name in body)
            user_email: data.email,       // Mapped to {{user_email}}
            form_source: data.formType,   // Mapped to {{form_source}}
            phone: data.phone,            // Mapped to {{phone}}
            course: data.course || 'General Inquiry', // Mapped to {{course}}
            message: data.message || 'No additional message', // Mapped to {{message}}

            // Standard data object (fallback)
            data: data,
            ...data,

            // EmailJS Service Configuration
            to_email: ADMIN_EMAIL,        // Mapped to "To Email" field in Dashboard (Receiver)
            admin_name: "Admin",          // Just in case we need to address Admin specifically
            subject: `New Lead: ${data.name} - ${data.course || 'Inquiry'}`,
            content_html: adminHtml,      // Full HTML body if using {{{content_html}}}
        };

        // 2. Send Confirmation to Student
        // Choose template based on payment status
        const studentHtml = data.paymentId
            ? getPaymentSuccessTemplate(data)
            : getStudentInquiryTemplate(data);

        const studentSubject = data.paymentId
            ? `Enrollment Confirmed: ${data.course} 🎓`
            : `Arigatou Gozaimasu, ${data.name}! - Application Received`;

        const studentParams = {
            to_name: data.name,
            user_email: data.email,

            data: data,
            ...data,

            to_email: data.email,
            subject: studentSubject,
            content_html: studentHtml,
        };




        let studentSuccess = false;
        let adminSuccess = false;

        // 1. Deliver to Student (Priority)
        try {
            const studentRes = await emailjs.send(serviceId, templateId, studentParams, publicKey);
            if (studentRes.status === 200) {
                studentSuccess = true;
            }
        } catch (studentErr) {
            console.error("❌ [EmailJS] Failed to send email to Student:", studentErr);
        }

        // 2. Deliver to Admin
        try {
            const adminRes = await emailjs.send(serviceId, templateId, adminParams, publicKey);
            if (adminRes.status === 200) {
                adminSuccess = true;
            }
        } catch (adminErr) {
            console.error("❌ [EmailJS] Failed to send email to Admin:", adminErr);
        }

        return studentSuccess || adminSuccess;
    } catch (err) {
        console.warn("❌ [EmailJS] Unexpected failure in sendConfirmationEmail:", err);
        return false;
    }
};

/**
 * Sends a password reset request via EmailJS
 */
export const sendPasswordResetEmail = async (email: string) => {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
        console.warn("⚠️ [EmailJS] Configuration missing in .env");
        return false;
    }

    try {
        const emailHtml = getPasswordResetEmailTemplate(email);
        const templateParams = {
            to_name: "Valued User",
            to_email: email,
            user_email: email,
            from_name: "Fuji Japanese Academy",
            subject: "Password Reset Request",
            content_html: emailHtml,
            message: "Password reset requested.",
            form_source: "Password Reset",
            // Fill required fields to prevent template errors
            phone: "N/A",
            course: "N/A"
        };

        const response = await emailjs.send(serviceId, templateId, templateParams, publicKey);
        return response.status === 200;
    } catch (err) {
        console.error("❌ [EmailJS] Password reset email failed:", err);
        return false;
    }
};
