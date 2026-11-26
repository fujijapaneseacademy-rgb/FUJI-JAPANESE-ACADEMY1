// 💳 SUPABASE EDGE FUNCTION: CREATE RAZORPAY ORDER
// Generates official Razorpay Order ID for live & test transactions.

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

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

// Server-side course price registry (in paise)
const VALID_COURSE_PRICES_PAISE = new Set([
  800000,   // ₹8,000 - Spoken Japanese
  1500000,  // ₹15,000 - JLPT N5
  2030000,  // ₹20,300 - JLPT N4
  2250000,  // ₹22,500 - Business Japanese
  2400000,  // ₹24,000 - Japanese for IT Professionals
  3030000,  // ₹30,300 - JLPT N3
  4020000,  // ₹40,200 - JLPT N2
  7530000,  // ₹75,300 - JLPT N1
]);

function isValidCourseAmount(amount: number): boolean {
  for (const validAmount of VALID_COURSE_PRICES_PAISE) {
    const tolerance = Math.round(validAmount * 0.01); // 1% tolerance
    if (Math.abs(amount - validAmount) <= tolerance) return true;
  }
  return false;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { amount, currency = "INR", receipt, notes = {} } = await req.json();

    if (!amount || typeof amount !== "number" || amount <= 0) {
      return new Response(
        JSON.stringify({ success: false, error: "Invalid amount provided." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!isValidCourseAmount(Math.round(amount))) {
      console.warn(`Rejected tampered payment amount: ${amount} paise`);
      return new Response(
        JSON.stringify({ success: false, error: "Invalid payment amount. Please use the official enrollment form." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const keyId = Deno.env.get("RAZORPAY_KEY_ID");
    const keySecret = Deno.env.get("RAZORPAY_KEY_SECRET");

    if (!keyId || !keySecret) {
      return new Response(
        JSON.stringify({ success: false, error: "Payment gateway not configured. Please contact support." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const authHeader = "Basic " + btoa(`${keyId}:${keySecret}`);

    // Receipt max 40 chars
    const safeReceipt = (receipt || `rcpt_${Date.now()}`).substring(0, 40);

    const rzpResponse = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Authorization": authHeader,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount),
        currency: currency.toUpperCase(),
        receipt: safeReceipt,
        notes: notes,
      }),
    });

    const rzpData = await rzpResponse.json();

    if (!rzpResponse.ok) {
      console.error("Razorpay order creation failed:", rzpData);
      return new Response(
        JSON.stringify({
          success: false,
          error: rzpData?.error?.description || "Failed to generate Razorpay order.",
          details: rzpData,
        }),
        { status: rzpResponse.status, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId: rzpData.id,
        amount: rzpData.amount,
        currency: rzpData.currency,
        keyId: keyId,
      }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err: any) {
    console.error("Edge function error:", err);
    return new Response(
      JSON.stringify({ success: false, error: err.message || "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
