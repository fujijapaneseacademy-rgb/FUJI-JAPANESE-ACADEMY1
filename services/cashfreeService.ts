import { supabase } from '../src/lib/supabaseClient';

declare global {
  interface Window {
    Cashfree: any;
  }
}

/**
 * Dynamically loads the official Cashfree JS SDK v3
 */
export const loadCashfree = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined' && 'Cashfree' in window) {
      resolve(true);
      return;
    }

    if (document.getElementById('cashfree-sdk-script')) {
      const script = document.getElementById('cashfree-sdk-script') as HTMLScriptElement;
      script.addEventListener('load', () => resolve(true));
      script.addEventListener('error', () => resolve(false));
      return;
    }

    const script = document.createElement('script');
    script.id = 'cashfree-sdk-script';
    script.src = 'https://sdk.cashfree.com/js/v3/cashfree.js';
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export interface PaymentOptions {
  courseId?: string;
  courseName: string;
  amount?: number; // Maintained for backward compatibility; pricing is authoritatively determined server-side
  customer: {
    name: string;
    email: string;
    contact: string;
  };
  onSuccess: (response: { payment_id: string; order_id: string; cf_order_id?: string; razorpay_payment_id?: string }) => void;
  onFailure: (errorMessage: string) => void;
}

export const verifyCashfreeOrder = async (orderId: string): Promise<{
  success: boolean;
  isPaid: boolean;
  status: string;
  courseId?: string;
  courseTitle?: string;
}> => {
  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
    const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
    if (!supabaseUrl || !orderId) {
      return { success: false, isPaid: false, status: 'UNAVAILABLE' };
    }

    const res = await fetch(
      `${supabaseUrl}/functions/v1/create-cashfree-order?order_id=${encodeURIComponent(orderId)}`,
      {
        method: 'GET',
        headers: {
          'apikey': anonKey,
          'Authorization': `Bearer ${anonKey}`,
        },
      }
    );

    if (!res.ok) {
      return { success: false, isPaid: false, status: 'HTTP_ERROR' };
    }

    const data = await res.json();
    return {
      success: true,
      isPaid: Boolean(data.isPaid),
      status: data.status || 'UNKNOWN',
      courseId: data.courseId,
      courseTitle: data.courseTitle,
    };
  } catch (err) {
    console.warn('[Cashfree] Order status verification error:', err);
    return { success: false, isPaid: false, status: 'NETWORK_ERROR' };
  }
};

export const handlePayment = async ({
  courseId,
  courseName,
  amount,
  customer,
  onSuccess,
  onFailure,
}: PaymentOptions) => {
  try {
    const isLoaded = await loadCashfree();

    if (!isLoaded || !window.Cashfree) {
      onFailure('Unable to initialize Cashfree payment gateway. Please check your internet connection or use Direct UPI / Bank Transfer.');
      return;
    }

    // 1️⃣ Generate official Cashfree Order ID & Payment Session via Supabase Edge Function
    // Pricing is authoritatively resolved server-side based on courseId / courseName
    let paymentSessionId: string | null = null;
    let orderId: string | null = null;
    let cfOrderId: string | null = null;

    try {
      const { data: orderData, error: orderError } = await supabase.functions.invoke('create-cashfree-order', {
        body: {
          courseId: courseId || courseName.toLowerCase().replace(/\s+/g, '-'),
          courseName,
          amount: amount ? Math.round(amount) : undefined,
          customer: {
            name: customer.name,
            email: customer.email,
            contact: customer.contact,
          },
          returnUrl: 'https://fujijapaneseacademy.com/payment?order_id={order_id}',
        }
      });

      if (!orderError && orderData?.success && orderData?.paymentSessionId) {
        paymentSessionId = orderData.paymentSessionId;
        orderId = orderData.orderId;
        cfOrderId = orderData.cfOrderId;
      } else {
        const errorMsg = orderData?.error || orderError?.message || 'Failed to create payment session';
        console.warn('[Cashfree] Backend order creation error:', errorMsg);
        onFailure(errorMsg);
        return;
      }
    } catch (orderErr: any) {
      console.error('[Cashfree] Order invocation failed:', orderErr);
      onFailure('Could not connect to payment server. Please try again or use Direct UPI.');
      return;
    }

    if (!paymentSessionId) {
      onFailure('Payment session could not be established. Please use Direct UPI / Bank Transfer.');
      return;
    }

    // 2️⃣ Initialize Cashfree Production Checkout
    const cashfree = window.Cashfree({
      mode: (import.meta.env.VITE_CASHFREE_MODE || 'production') as 'production' | 'sandbox',
    });

    const checkoutOptions = {
      paymentSessionId: paymentSessionId,
      redirectTarget: '_modal', // Opens modal popup for payment
    };

    cashfree.checkout(checkoutOptions).then(async (result: any) => {
      if (result?.error) {
        console.warn('[Cashfree] Checkout cancelled or dismissed:', result.error);
        const desc = result.error.message || 'Payment window closed or cancelled.';
        onFailure(desc);
      } else if (result?.redirect) {
        // Redirection was triggered for 3DS or bank auth
        console.log('[Cashfree] Payment redirecting for 3DS authentication...');
      } else if (result?.paymentDetails) {
        console.log('[Cashfree] Payment modal returned details:', result.paymentDetails);
        const resolvedPaymentId = result.paymentDetails.paymentMessage || orderId || 'cf_paid';

        // SECURITY REQUIREMENT: Treat browser checkout completion as pending until backend verifies payment
        if (orderId) {
          const verification = await verifyCashfreeOrder(orderId);
          if (verification.success && verification.isPaid) {
            onSuccess({
              payment_id: resolvedPaymentId,
              order_id: orderId,
              cf_order_id: cfOrderId || '',
              razorpay_payment_id: resolvedPaymentId,
            });
            return;
          }
        }

        // If backend verification returned pending or unsettled, do not declare immediate success
        onFailure(
          'Payment confirmation is pending bank settlement. If your account was debited, your enrollment will activate automatically upon webhook confirmation.'
        );
      } else {
        // Modal was dismissed or closed without explicit successful payment details.
        // SECURITY FIX: Never assume success on empty or dismissed modal!
        console.warn('[Cashfree] Checkout modal closed without explicit payment details. Order:', orderId);
        onFailure('Payment window was closed before completion. If your account was debited, your enrollment will be confirmed automatically via webhook.');
      }
    }).catch((err: any) => {
      console.error('[Cashfree] Checkout runtime error:', err);
      onFailure(err?.message || 'Transaction could not be completed.');
    });

  } catch (error: any) {
    onFailure(error?.message || 'Unexpected payment error. Please use Direct UPI / Bank Transfer.');
  }
};
