// 🔔 SUPABASE EDGE FUNCTION: CASHFREE WEBHOOK
// Validates cryptographic signature against raw body and handles payment events idempotently.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.8";

const CASHFREE_SECRET_KEY = Deno.env.get("CASHFREE_SECRET_KEY");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}

async function verifyCashfreeSignature(
  rawBody: string,
  timestamp: string | null,
  signature: string | null,
  secretKey: string
): Promise<boolean> {
  if (!timestamp || !signature || !secretKey) return false;

  try {
    const encoder = new TextEncoder();
    const keyData = encoder.encode(secretKey);
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const payloadToSign = `${timestamp}${rawBody}`;
    const signatureBuffer = await crypto.subtle.sign(
      "HMAC",
      key,
      encoder.encode(payloadToSign)
    );

    const computedSignature = btoa(
      String.fromCharCode(...new Uint8Array(signatureBuffer))
    );

    return timingSafeEqual(computedSignature, signature);
  } catch (err) {
    console.error("[Cashfree Webhook] Signature verification error:", err);
    return false;
  }
}

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const signature = req.headers.get("x-webhook-signature") || req.headers.get("x-cf-signature");
  const timestamp = req.headers.get("x-webhook-timestamp");
  const rawBody = await req.text();

  if (!CASHFREE_SECRET_KEY) {
    console.error("[Cashfree Webhook] Server configuration missing CASHFREE_SECRET_KEY");
    return new Response(JSON.stringify({ error: "Server misconfiguration" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 1. Verify Timestamp Freshness (5-minute replay prevention window)
  if (!timestamp) {
    console.warn("[Cashfree Webhook] Missing x-webhook-timestamp header");
    return new Response(JSON.stringify({ error: "Missing webhook timestamp" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const parsedTimestamp = parseInt(timestamp, 10);
  const now = Date.now();
  const timestampMs = parsedTimestamp < 1e12 ? parsedTimestamp * 1000 : parsedTimestamp;
  const FIVE_MINUTES_MS = 5 * 60 * 1000;
  if (isNaN(timestampMs) || Math.abs(now - timestampMs) > FIVE_MINUTES_MS) {
    console.warn(`[Cashfree Webhook] Expired or skewed timestamp: ${timestamp} (skew: ${Math.abs(now - timestampMs)}ms)`);
    return new Response(JSON.stringify({ error: "Webhook timestamp expired or out of allowed window" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  // 2. Cryptographic signature verification against raw body with timing-safe comparison
  const isValid = await verifyCashfreeSignature(rawBody, timestamp, signature, CASHFREE_SECRET_KEY);
  if (!isValid) {
    console.warn("[Cashfree Webhook] Unauthorized: Invalid or missing webhook signature");
    return new Response(JSON.stringify({ error: "Invalid signature" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const event = JSON.parse(rawBody);
    console.log("[Cashfree Webhook] Verified event received:", event?.type || event?.event);

    const data = event.data || event;
    const order = data.order || {};
    const payment = data.payment || {};
    const customer = data.customer_details || order.customer_details || {};

    const orderId = order.order_id || data.order_id;
    const paymentId = payment.cf_payment_id ? String(payment.cf_payment_id) : (data.payment_id || orderId);
    const orderStatus = (payment.payment_status || order.order_status || data.order_status || "").toUpperCase();
    const orderCurrency = (order.order_currency || payment.payment_currency || data.order_currency || "INR").toUpperCase();
    const amountINR = Number(order.order_amount || payment.payment_amount || data.order_amount || 0);
    const customerEmail = (customer.customer_email || data.customer_email || "").trim().toLowerCase();
    const customerPhone = customer.customer_phone || data.customer_phone || "";
    const customerName = customer.customer_name || data.customer_name || "Scholar";
    const courseId = order.order_tags?.course_id || data.course_id || "general";
    const courseTitle = order.order_tags?.course_title || order.order_note || data.course_title || "JLPT Program";

    if (!orderId || !customerEmail) {
      return new Response(JSON.stringify({ success: false, error: "Missing required order details" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (orderCurrency !== "INR") {
      console.warn(`[Cashfree Webhook] Rejected invalid currency: ${orderCurrency} for order ${orderId}`);
      return new Response(JSON.stringify({ success: false, error: "Invalid currency. Only INR is supported." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.warn("[Cashfree Webhook] Supabase credentials not configured on edge server");
      return new Response(JSON.stringify({ success: true, message: "Acknowledged without DB" }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const admin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // Idempotency & Out-of-Order Check: Query existing payment record
    const { data: existingPayment } = await admin
      .from("payments")
      .select("id, status, amount_inr, course_id")
      .eq("order_id", orderId)
      .maybeSingle();

    if (existingPayment && existingPayment.status === "paid") {
      console.log(`[Cashfree Webhook] Order ${orderId} already processed idempotently as paid.`);
      return new Response(
        JSON.stringify({ success: true, message: "Duplicate payment event processed idempotently" }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // Verify amount matches expected pending order tuition
    if (existingPayment && existingPayment.amount_inr) {
      if (amountINR < Number(existingPayment.amount_inr)) {
        console.error(`[Cashfree Webhook] Amount mismatch: Paid ₹${amountINR} < Expected ₹${existingPayment.amount_inr} for order ${orderId}`);
        await admin.from("payments").update({
          status: "amount_mismatch",
          raw_payload: event,
          updated_at: new Date().toISOString(),
        }).eq("order_id", orderId);
        return new Response(JSON.stringify({ success: false, error: "Paid amount less than catalog course tuition" }), {
          status: 400,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    const isPaid = orderStatus === "SUCCESS" || orderStatus === "PAID";

    // 1. Record or update payment record
    await admin.from("payments").upsert(
      {
        order_id: orderId,
        payment_id: paymentId,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        course_id: courseId,
        course_name: courseTitle,
        amount_inr: amountINR,
        status: isPaid ? "paid" : "failed",
        raw_payload: event,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "order_id" }
    );

    if (isPaid) {
      // 2. Resolve or create user account safely
      let userId: string | null = null;
      const { data: existingProfile } = await admin
        .from("profiles")
        .select("id")
        .eq("email", customerEmail)
        .maybeSingle();

      if (existingProfile?.id) {
        userId = existingProfile.id;
      } else {
        // Find in auth.users
        const { data: userList } = await admin.auth.admin.listUsers();
        const existingAuthUser = userList?.users?.find(
          (u: any) => u.email?.toLowerCase() === customerEmail
        );

        if (existingAuthUser) {
          userId = existingAuthUser.id;
        } else {
          // Create new student account WITHOUT plaintext password; trigger password setup link
          const { data: newUser, error: createErr } = await admin.auth.admin.createUser({
            email: customerEmail,
            email_confirm: true,
            user_metadata: { full_name: customerName, phone: customerPhone },
          });

          if (!createErr && newUser?.user?.id) {
            userId = newUser.user.id;
            // Generate single-use password recovery / setup link
            await admin.auth.admin.generateLink({
              type: "recovery",
              email: customerEmail,
              options: { redirectTo: "https://fujijapaneseacademy.com/reset-password" },
            });
          }
        }
      }

      // 3. Idempotently insert/activate enrollment
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
        console.log(`[Cashfree Webhook] Enrolled user ${userId} in ${courseTitle}`);
      }
    }

    return new Response(JSON.stringify({ success: true, orderId, status: orderStatus }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("[Cashfree Webhook] Error processing event:", err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
});
