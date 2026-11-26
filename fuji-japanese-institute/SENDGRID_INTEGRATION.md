# How to Link SendGrid with EmailJS

Since you are running a client-side application (Vite/React) without a dedicated backend server, the **most secure and easiest** way to use SendGrid is to link it as a service within EmailJS.

This allows you to send emails using SendGrid's reliable infrastructure without exposing your API keys or building a backend.

## Step 1: Get SendGrid API Key

1. Log in to your **SendGrid** account.
2. Go to **Settings** > **API Keys**.
3. Click **Create API Key**.
4. Give it a name (e.g., "Fuji EmailJS").
5. Select **Full Access** (or restricted access with "Mail Send" permissions).
6. Click **Create & View**.
7. **Copy the API Key** immediately. You won't see it again.

## Step 2: Add SendGrid Service in EmailJS

1. Log in to your **EmailJS** Dashboard.
2. Go to the **Services** tab (on the left sidebar).
3. Click **+ Add New Service**.
4. Scroll down and select **SendGrid**.
5. In the configuration window:
   - **Name**: Enter `SendGrid` or `Fuji SendGrid`.
   - **Service ID**: You can keep the default (e.g., `service_xxxxx`) or change it.
     - *Note: If you change the Service ID here, update your `.env` file!*
   - **API Key**: Aste the SendGrid API Key you copied in Step 1.
   - **From Email**: Enter the email address you verified in SendGrid (e.g., `info@fujijapaneseinstitute.com` or your Gmail).
6. Click **Connect Account** (or "Create Service").

## Step 3: Update Environment Variables (If needed)

If you created a **new** service instead of just updating the existing one, you need to update your `.env` file:

```bash
VITE_EMAILJS_SERVICE_ID=your_new_sendgrid_service_id
```

If you just updated the Provider of your existing Service ID, you don't need to change anything!

## Step 4: Verify the Template

We have already updated your code to send a beautiful **Payment Success** email automatically when a payment is made.

The code is in `services/emailService.ts`:
- If a student **Pays**: They get the "Enrollment Confirmed" email.
- If a student **Inquires**: They get the "Application Received" email.

## Troubleshooting

- **401 Unauthorized**: Check if your SendGrid API key is correct.
- **Email not received**: Check your SendGrid "Activity" dashboard to see if the email was dropped or bounced.
- **From Address Error**: Ensure the "From Email" in EmailJS matches a Verified Sender in your SendGrid settings.
