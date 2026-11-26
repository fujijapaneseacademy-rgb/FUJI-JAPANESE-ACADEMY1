# How to Fix "Email Failed" Error (Resend)

If your emails are not sending and you see a **400 Error** in the console, it is because of **Resend's Security Policy**.

## The Rule

On the **Free** plan (without a verified domain), you can **ONLY** send emails to the **email address you signed up with**.

## The Fix

### Option 1: Test with YOUR Email (Easiest)

1. Go to your Website.
2. Fill out the Enrollment Form.
3. In the "Email" field, enter the **exact email address** you used to log in to Resend.com.
   - *Example: If you signed up with `csc@example.com`, you MUST put `csc@example.com` in the form.*

### Option 2: Verify Your Domain (Recommended for Production)

1. Go to [Resend Domains](https://resend.com/domains).
2. Click "Add Domain".
3. Enter `fujijapaneseinstitute.com`.
4. Add the **DNS Records** (TXT, MX) to your Domain Provider (GoDaddy/Namecheap).
5. Once verified (usually instantaneous), you can send email to **anyone**.

### Option 3: Update Admin Email

Currently, the system tries to send a notification to `fujijapaneseacademy@gmail.com`.
If this is **NOT** your Resend email, this will fail.

**To fix this temporarily for testing:**

1. Open `supabase/functions/send-email/index.ts`.
2. Change:

   ```typescript
   const ADMIN_EMAIL = "YOUR_RESEND_EMAIL@gmail.com";
   ```

3. Deploy again: `deploy_email.bat`.
