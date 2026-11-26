# Supabase Email Guide: Sending Transactional Emails (via Resend)

We are using **Resend** because it is the modern standard for Supabase apps.

## ⚠️ CRITICAL: You must execute these commands in your terminal ⚠️

I tried to run these for you, but **you are not logged in** to Supabase on your computer yet. Please follow these exact steps:

### Step 1: Login to Supabase

Run this command in your terminal. It will open your browser to log in.

```powershell
npx supabase login
```

### Step 2: Link Your Project

You need to tell Supabase which cloud project this is.

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard).
2. Click on your project.
3. Keep the dashboard open.
4. Run this command (Replace `YOUR_PROJECT_ID` with the ID from your URL, e.g., `app.supabase.com/project/xyzxyzxyz` -> the ID is `xyzxyzxyz`):

```powershell
npx supabase link --project-ref YOUR_PROJECT_ID
```

*(It will ask for your database password. If you forgot it, reset it in Dashboard > Settings > Database).*

### Step 3: Set Your Resend API Key

I have prepared this command with the key you provided:

```powershell
npx supabase secrets set RESEND_API_KEY=your_resend_api_key_here
```

### Step 4: Deploy the Function

This uploads the code I wrote to the cloud.

```powershell
npx supabase functions deploy send-email --no-verify-jwt
```

---

## ✅ Done

Once you see "Deployed Function send-email" in your terminal, your website (Enrollment Form) will automatically start sending emails via Resend.
