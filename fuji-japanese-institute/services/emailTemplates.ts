
import { FormData } from './formService';

export const getAdminEmailTemplate = (data: FormData) => `
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #1e1b4b; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">New Lead Received!</h1>
    </div>

    <!-- Body -->
    <div style="padding: 40px;">
      <p style="font-size: 16px; margin-bottom: 24px;">Hello Admin,</p>
      <p style="font-size: 16px; margin-bottom: 24px;">You have received a new inquiry from the <strong>${data.formType}</strong> form.</p>

      <div style="background-color: #f3f4f6; border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
        <p style="margin: 8px 0;"><strong>👤 Name:</strong> ${data.name}</p>
        <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:${data.email}" style="color: #ef4444; text-decoration: none;">${data.email}</a></p>
        <p style="margin: 8px 0;"><strong>📱 Phone:</strong> <a href="tel:${data.phone}" style="color: #333; text-decoration: none;">${data.phone}</a></p>
        <p style="margin: 8px 0;"><strong>📚 Interest:</strong> ${data.course || 'General Inquiry'}</p>
      </div>

      <p style="font-weight: bold; margin-bottom: 10px;">Message:</p>
      <div style="border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; color: #555; font-style: italic;">
        ${data.message || 'No additional message'}
      </div>
      
      <div style="margin-top: 40px; text-align: center;">
        <a href="mailto:${data.email}" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply to Student</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
      Sent via Fuji Japanese Academy Website
    </div>
  </div>
</div>
`;

export const getStudentInquiryTemplate = (data: FormData) => `
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
    
    <!-- Image Banner -->
    <div style="height: 150px; background-color: #1e1b4b; background-image: url('https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=600&auto=format&fit=crop'); background-size: cover; background-position: center;">
      <div style="width: 100%; height: 100%; background: rgba(30, 27, 75, 0.6); display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Arigatou Gozaimasu!</h1>
      </div>
    </div>

    <!-- Body -->
    <div style="padding: 40px;">
      <h2 style="color: #1e1b4b; margin-top: 0;">Application Received</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
        Konnichiwa <strong>${data.name}</strong>,
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
        Thank you for your interest in <strong>${data.course || 'Japanese Language Course'}</strong>. We have successfully received your details.
      </p>
      
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
        Here is the <strong>Step-by-Step Process</strong> for your enrollment:
      </p>
      
      <!-- Step By Step Process Section -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 25px; margin: 25px 0;">
        
        <!-- Step 1 -->
        <div style="display: flex; margin-bottom: 20px;">
          <div style="background-color: #ef4444; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">1</div>
          <div>
            <h3 style="margin: 0 0 5px; color: #1e1b4b; font-size: 16px;">Application Review</h3>
            <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">Our admissions team has received your details and is currently reviewing your application.</p>
          </div>
        </div>

        <!-- Step 2 -->
        <div style="display: flex; margin-bottom: 20px;">
          <div style="background-color: #ef4444; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">2</div>
          <div>
            <h3 style="margin: 0 0 5px; color: #1e1b4b; font-size: 16px;">Consultation Call</h3>
            <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">We will contact you at <strong>${data.phone}</strong> within 24 hours to verify your details and answer any questions.</p>
          </div>
        </div>

        <!-- Step 3 -->
        <div style="display: flex;">
          <div style="background-color: #ef4444; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; margin-right: 15px; flex-shrink: 0;">3</div>
          <div>
            <h3 style="margin: 0 0 5px; color: #1e1b4b; font-size: 16px;">Final Enrollment</h3>
            <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">Once approved, you will receive a payment link to secure your seat and credentials to access your student portal.</p>
          </div>
        </div>

      </div>

      <div style="margin-top: 30px; text-align: center;">
        <a href="https://fujijapaneseacademy.com" style="display: inline-block; background-color: #ef4444; color: white; padding: 12px 25px; text-decoration: none; border-radius: 30px; font-weight: bold;">Visit Website</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #1e1b4b; padding: 30px; text-align: center; color: rgba(255,255,255,0.7); font-size: 13px;">
      <p style="margin: 0 0 10px;">Fuji Japanese Academy</p>
      <p style="margin: 0;">Master the Art of Japanese</p>
    </div>
  </div>
</div>
`;

export const getPaymentSuccessTemplate = (data: FormData) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Payment Successful</title>
</head>
<body style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px; color: #1e1b4b;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0,0,0,0.1);">
    
    <!-- Hero Section -->
    <div style="background-color: #1e1b4b; padding: 40px 20px; text-align: center; background-image: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);">
      <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">Welcome to Fuji!</h1>
      <p style="color: #e0e7ff; margin-top: 10px; font-size: 16px;">Your journey to mastering Japanese starts now.</p>
    </div>

    <!-- Content -->
    <div style="padding: 40px;">
      <div style="text-align: center; margin-bottom: 30px;">
        <div style="display: inline-flex; align-items: center; justify-content: center; width: 64px; height: 64px; background-color: #dcfce7; border-radius: 50%; margin-bottom: 20px;">
          <span style="font-size: 32px;">🎉</span>
        </div>
        <h2 style="margin: 0; color: #1e1b4b; font-size: 24px;">Enrollment Confirmed</h2>
        <p style="color: #64748b; margin-top: 8px;">For <strong>${data.course}</strong></p>
      </div>

      <!-- Payment Receipt -->
      <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
        <h3 style="margin: 0 0 16px; color: #1e1b4b; font-size: 16px; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">Payment Receipt</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Transaction ID</td>
            <td style="padding: 8px 0; text-align: right; color: #1e1b4b; font-family: monospace;">${data.paymentId}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Amount Paid</td>
            <td style="padding: 8px 0; text-align: right; color: #1e1b4b; font-weight: bold;">${data.amountPaid}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Date</td>
            <td style="padding: 8px 0; text-align: right; color: #1e1b4b;">${new Date().toLocaleDateString()}</td>
          </tr>
        </table>
      </div>

      <!-- Student Portal Activation & Access -->
      <div style="background: linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%); padding: 25px; border-radius: 12px; margin-bottom: 30px; border: 1px solid #ddd6fe; text-align: center;">
        <h3 style="margin-top: 0; color: #4338ca; font-size: 18px;">Your Student Portal Access</h3>
        <p style="color: #4b5563; font-size: 14px; margin-bottom: 15px;">Your student account is active for <strong>${data.email}</strong>. Access your syllabus materials, video lessons, and schedule below:</p>
        <a href="${data.loginUrl || 'https://fujijapaneseacademy.com/login'}" style="display: inline-block; background: #4f46e5; color: white; padding: 12px 28px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 14px; box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);">Access Student Dashboard</a>
      </div>

      <!-- Next Steps -->
      <div style="margin-bottom: 32px;">
        <h3 style="color: #1e1b4b; margin-bottom: 20px;">What Happens Next?</h3>
        
        <div style="display: flex; gap: 16px; margin-bottom: 20px;">
          <div style="width: 28px; height: 28px; background-color: #ef4444; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 14px;">1</div>
          <div>
            <strong style="display: block; color: #1e1b4b; margin-bottom: 4px;">Student Account Access</strong>
            <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">You can log in anytime at fujijapaneseacademy.com/login using your email. An initial password activation link has been sent to your inbox.</p>
          </div>
        </div>

        <div style="display: flex; gap: 16px; margin-bottom: 20px;">
           <div style="width: 28px; height: 28px; background-color: #ef4444; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 14px;">2</div>
           <div>
            <strong style="display: block; color: #1e1b4b; margin-bottom: 4px;">Schedule Call</strong>
            <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">Our batch coordinator will call you to confirm your class timings.</p>
          </div>
        </div>

        <div style="display: flex; gap: 16px;">
           <div style="width: 28px; height: 28px; background-color: #ef4444; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0; font-size: 14px;">3</div>
           <div>
            <strong style="display: block; color: #1e1b4b; margin-bottom: 4px;">Join the Community</strong>
            <p style="margin: 0; color: #64748b; font-size: 14px; line-height: 1.5;">You'll be added to our private student WhatsApp group.</p>
          </div>
        </div>
      </div>

      <div style="text-align: center;">
        <a href="https://fujijapaneseacademy.com" style="display: inline-block; background-color: #ef4444; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; transition: background-color 0.2s;">Go to Website</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f1f5f9; padding: 24px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0;">
      <p style="margin-bottom: 8px;">&copy; ${new Date().getFullYear()} Fuji Japanese Academy. All rights reserved.</p>
      <p style="margin: 0;">Sent via Secure Payment Gateway</p>
    </div>
  </div>
</body>
</html>
`;

export const getPasswordResetEmailTemplate = (email: string, resetUrl?: string) => `
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #1e1b4b; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Password Reset Request</h1>
    </div>

    <!-- Body -->
    <div style="padding: 40px;">
      <p style="font-size: 16px; margin-bottom: 24px;">Hello,</p>
      <p style="font-size: 16px; margin-bottom: 24px;">We received a request to reset the password for your account associated with <strong>${email}</strong>.</p>
      <div style="background-color: #f3f4f6; border-left: 4px solid #4f46e5; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
        <p style="margin: 0; color: #555;">Click the button below to choose a new password. If you did not make this request, you can safely ignore this email.</p>
      </div>
      
      <div style="margin-top: 30px; text-align: center;">
        <a href="${resetUrl || 'https://fujijapaneseacademy.com/reset-password'}" style="display: inline-block; background-color: #4f46e5; color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px;">Reset My Password</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
      Fuji Japanese Academy
    </div>
  </div>
</div>
`;
