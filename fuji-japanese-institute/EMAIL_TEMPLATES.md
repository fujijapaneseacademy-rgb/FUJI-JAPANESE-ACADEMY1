# 📧 EmailJS Templates

Here are the HTML codes for your email templates. Copy and paste these into the **"Source Code" (< > icon)** view of your EmailJS Template Editor.

---

## 1. 🔔 Admin Notification (Send to You)

*Use this template to get notified immediately when someone submits a form.*

**Subject Line:** `New Lead: {{to_name}} - {{course}}`

```html
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #1e1b4b; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">New Lead Received!</h1>
    </div>

    <!-- Body -->
    <div style="padding: 40px;">
      <p style="font-size: 16px; margin-bottom: 24px;">Hello Admin,</p>
      <p style="font-size: 16px; margin-bottom: 24px;">You have received a new inquiry from the <strong>{{form_source}}</strong> form.</p>

      <div style="background-color: #f3f4f6; border-left: 4px solid #ef4444; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
        <p style="margin: 8px 0;"><strong>👤 Name:</strong> {{to_name}}</p>
        <p style="margin: 8px 0;"><strong>📧 Email:</strong> <a href="mailto:{{user_email}}" style="color: #ef4444; text-decoration: none;">{{user_email}}</a></p>
        <p style="margin: 8px 0;"><strong>📱 Phone:</strong> <a href="tel:{{phone}}" style="color: #333; text-decoration: none;">{{phone}}</a></p>
        <p style="margin: 8px 0;"><strong>📚 Interest:</strong> {{course}}</p>
      </div>

      <p style="font-weight: bold; margin-bottom: 10px;">Message:</p>
      <div style="border: 1px solid #e5e7eb; padding: 15px; border-radius: 8px; color: #555; font-style: italic;">
        {{message}}
      </div>
      
      <div style="margin-top: 40px; text-align: center;">
        <a href="mailto:{{user_email}}" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Reply to Student</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
      Sent via Fuji Japanese Institute Website
    </div>
  </div>
</div>
```

---

## 2. 🎓 Student Confirmation (Send to Student)

*Use this template to automatically thank the student for applying.*

**Subject Line:** `Arigatou Gozaimasu, {{to_name}}! - Application Received`

```html
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
    
    <!-- Image Banner (Optional) -->
    <div style="height: 150px; background-color: #1e1b4b; background-image: url('https://images.unsplash.com/photo-1528164344705-47542687000d?q=80&w=600&auto=format&fit=crop'); background-size: cover; background-position: center;">
      <div style="width: 100%; height: 100%; background: rgba(30, 27, 75, 0.6); display: flex; align-items: center; justify-content: center;">
        <h1 style="color: white; font-size: 28px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">Arigatou Gozaimasu!</h1>
      </div>
    </div>

    <!-- Body -->
    <div style="padding: 40px;">
      <h2 style="color: #1e1b4b; margin-top: 0;">Application Received</h2>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
        Konnichiwa <strong>{{to_name}}</strong>,
      </p>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
        Thank you for your interest in <strong>{{course}}</strong>. We have successfully received your details.
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
            <p style="margin: 0; font-size: 14px; color: #64748b; line-height: 1.5;">We will contact you at <strong>{{phone}}</strong> within 24 hours to verify your details and answer any questions.</p>
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
        <a href="https://yourwebsite.com" style="display: inline-block; background-color: #ef4444; color: white; padding: 12px 25px; text-decoration: none; border-radius: 30px; font-weight: bold;">Visit Website</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #1e1b4b; padding: 30px; text-align: center; color: rgba(255,255,255,0.7); font-size: 13px;">
      <p style="margin: 0 0 10px;">Fuji Japanese Institute</p>
      <p style="margin: 0;">Master the Art of Japanese</p>
    </div>
  </div>
</div>
```

---

## 3. 🔐 Password Reset Notification

*Use this template to send a password reset notification when the standard Supabase email is not used.*

**Subject Line:** `{{subject}} - Action Required`

```html
<div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f9fafb; padding: 40px; color: #333;">
  <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); overflow: hidden;">
    
    <!-- Header -->
    <div style="background-color: #1e1b4b; padding: 30px; text-align: center;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 700;">Password Reset Request</h1>
    </div>

    <!-- Body -->
    <div style="padding: 40px;">
      <p style="font-size: 16px; margin-bottom: 24px;">Hello,</p>
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
        We received a request to reset the password for your account associated with <strong>{{user_email}}</strong>.
      </p>
      
      <p style="font-size: 16px; line-height: 1.6; color: #4b5563; background-color: #fff1f2; padding: 15px; border-left: 4px solid #ef4444; border-radius: 4px;">
        <strong>Note:</strong> We noticed you had trouble resetting your password directly. An administrator has been notified and will contact you shortly to verify your identity and assist you.
      </p>

      <p style="font-size: 16px; line-height: 1.6; color: #4b5563;">
        If you did not request this change, please ignore this email.
      </p>

      <div style="margin-top: 40px; text-align: center;">
        <a href="mailto:fujijapaneseacademy@gmail.com" style="background-color: #ef4444; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold;">Contact Support</a>
      </div>
    </div>

    <!-- Footer -->
    <div style="background-color: #f9fafb; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb; font-size: 12px; color: #9ca3af;">
      <p style="margin: 0;">Fuji Japanese Institute</p>
      <p style="margin: 5px 0 0;">Secure Automated System</p>
    </div>
  </div>
</div>
```
