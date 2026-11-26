/**
 * Fuji Japanese Academy - Comprehensive Analytics & Conversion Event Dispatcher
 * Integrates with Google Tag Manager (GTM), Google Analytics 4 (GA4),
 * and Google Ads Conversion Tracking with Google Consent Mode v2 support.
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

export type AnalyticsEventType =
  | 'page_view'
  | 'generate_lead'
  | 'form_submission'
  | 'telephone_click'
  | 'whatsapp_click'
  | 'click_phone'
  | 'click_whatsapp'
  | 'demo_class_booked'
  | 'purchase_complete'
  | 'purchase_started'
  | 'contact_form_submitted'
  | 'enquiry_form_submitted'
  | 'course_finder_match'
  | 'enrollment_modal_opened'
  | 'payment_page_initiated'
  | 'conversion';

export interface AnalyticsEventParams {
  [key: string]: any;
}

const COOKIE_CONSENT_KEY = 'fuji_cookie_consent_preferences';

/**
 * Checks whether user has explicitly granted analytics / functional cookie consent.
 */
export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  try {
    const rawConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!rawConsent) {
      // Default to true for essential GTM measurement while respecting Consent Mode
      return true;
    }
    const parsed = JSON.parse(rawConsent);
    return Boolean(parsed.functional || parsed.marketing);
  } catch {
    return true;
  }
};

/**
 * Update Google Consent Mode v2 state
 */
export const updateGoogleConsent = (granted: boolean): void => {
  if (typeof window === 'undefined') return;
  const status = granted ? 'granted' : 'denied';

  if (typeof window.gtag === 'function') {
    window.gtag('consent', 'update', {
      ad_storage: status,
      analytics_storage: status,
      ad_user_data: status,
      ad_personalization: status,
    });
  }

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'consent_status_update',
    consent_mode: status,
  });
};

/**
 * Google Ads Conversion Helper
 */
export const trackGoogleAdsConversion = (
  action: 'form_submission' | 'telephone_click' | 'whatsapp_click' | 'purchase',
  params: AnalyticsEventParams = {}
): void => {
  try {
    if (typeof window === 'undefined') return;

    const adsId = import.meta.env.VITE_GOOGLE_ADS_ID || '';
    let label = '';

    if (action === 'form_submission') {
      label = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL_FORM || '';
    } else if (action === 'telephone_click') {
      label = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL_PHONE || '';
    } else if (action === 'whatsapp_click') {
      label = import.meta.env.VITE_GOOGLE_ADS_CONVERSION_LABEL_WHATSAPP || '';
    }

    const sendTo = adsId && label ? `${adsId}/${label}` : adsId || undefined;

    // 1. Push Google Ads conversion to GTM dataLayer
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({
      event: 'conversion',
      conversion_type: action,
      send_to: sendTo,
      value: params.value || 1.0,
      currency: params.currency || 'INR',
      ...params,
    });

    // 2. Direct gtag conversion call if configured
    if (typeof window.gtag === 'function' && sendTo) {
      window.gtag('event', 'conversion', {
        send_to: sendTo,
        value: params.value || 1.0,
        currency: params.currency || 'INR',
        ...params,
      });
    }

    if (import.meta.env.DEV) {
      console.log(`🎯 [Google Ads Conversion Tracked]: ${action}`, { sendTo, params });
    }
  } catch (err) {
    console.warn('Google Ads tracking error:', err);
  }
};

/**
 * Core event dispatcher to window.dataLayer and window.gtag
 */
export const trackEvent = (
  eventName: AnalyticsEventType,
  params: AnalyticsEventParams = {}
): void => {
  try {
    if (typeof window === 'undefined') return;

    const eventPayload = {
      event: eventName,
      timestamp: new Date().toISOString(),
      consent_granted: hasAnalyticsConsent(),
      ...params,
    };

    // 1. Google Tag Manager dataLayer push
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(eventPayload);

    // 2. Google Analytics 4 gtag push
    if (typeof window.gtag === 'function') {
      window.gtag('event', eventName, params);
    }

    // Diagnostic console logging in dev
    if (import.meta.env.DEV) {
      console.log(`📊 [Analytics Event]: ${eventName}`, params);
    }
  } catch (err) {
    console.warn('Analytics tracking error:', err);
  }
};

/**
 * Track Page Views (SPA Route Transitions)
 */
export const trackPageView = (path?: string, title?: string): void => {
  if (typeof window === 'undefined') return;

  const currentPath = path || window.location.pathname + window.location.search;
  const currentTitle = title || document.title;
  const currentUrl = window.location.href;

  const payload = {
    page_path: currentPath,
    page_title: currentTitle,
    page_location: currentUrl,
  };

  // Push standard GA4 page_view to GTM dataLayer
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'page_view',
    ...payload,
  });

  if (typeof window.gtag === 'function') {
    window.gtag('event', 'page_view', payload);
  }

  if (import.meta.env.DEV) {
    console.log(`📄 [GA4 PageView Tracked]: ${currentPath}`);
  }
};

/**
 * Track Form Submissions (Leads, Inquiries, Demo Bookings)
 */
export const trackFormSubmission = (
  formName: string,
  formData: AnalyticsEventParams = {}
): void => {
  const payload = {
    form_name: formName,
    form_type: formName,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
    ...formData,
  };

  // 1. GA4 / GTM standard events
  trackEvent('form_submission', payload);
  trackEvent('generate_lead', payload);

  // 2. Google Ads Conversion tracking
  trackGoogleAdsConversion('form_submission', payload);
};

/**
 * Track Telephone Clicks
 */
export const trackTelephoneClick = (
  phoneNumber: string,
  clickText: string = 'Phone Call'
): void => {
  const payload = {
    phone_number: phoneNumber,
    click_text: clickText,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  };

  // 1. GA4 / GTM events
  trackEvent('telephone_click', payload);
  trackEvent('click_phone', payload);

  // 2. Google Ads Conversion tracking for phone calls
  trackGoogleAdsConversion('telephone_click', payload);
};

/**
 * Track WhatsApp Clicks
 */
export const trackWhatsAppClick = (
  whatsappTarget: string,
  clickText: string = 'WhatsApp Chat'
): void => {
  const payload = {
    whatsapp_target: whatsappTarget,
    click_text: clickText,
    page_path: typeof window !== 'undefined' ? window.location.pathname : '',
  };

  // 1. GA4 / GTM events
  trackEvent('whatsapp_click', payload);
  trackEvent('click_whatsapp', payload);

  // 2. Google Ads Conversion tracking for WhatsApp
  trackGoogleAdsConversion('whatsapp_click', payload);
};

/**
 * Global delegated click & submit listener to catch 100% of phone, WhatsApp, and form interactions
 */
let isGlobalTrackingInitialized = false;

export const initGlobalClickTracking = (): (() => void) => {
  if (typeof window === 'undefined' || typeof document === 'undefined') return () => {};
  if (isGlobalTrackingInitialized) return () => {};

  isGlobalTrackingInitialized = true;

  const handleClick = (e: MouseEvent) => {
    try {
      const target = (e.target as HTMLElement)?.closest('a, button');
      if (!target) return;

      const href = target.getAttribute('href') || '';
      const text = target.textContent?.trim() || target.getAttribute('aria-label') || '';

      // Telephone links (e.g. href="tel:+916364924110")
      if (href.startsWith('tel:')) {
        const phone = href.replace(/^tel:/, '').trim();
        trackTelephoneClick(phone, text || 'Telephone Link');
        return;
      }

      // WhatsApp links (e.g. wa.me, api.whatsapp.com, chat.whatsapp.com)
      if (
        href.includes('wa.me') ||
        href.includes('whatsapp.com') ||
        target.getAttribute('data-action') === 'whatsapp'
      ) {
        trackWhatsAppClick(href, text || 'WhatsApp Link');
        return;
      }
    } catch (err) {
      console.warn('Global click tracking handler error:', err);
    }
  };

  const handleSubmit = (e: Event) => {
    try {
      const form = e.target as HTMLFormElement;
      if (!form) return;
      const formName = form.getAttribute('name') || form.id || form.getAttribute('aria-label') || 'unnamed_form';
      trackFormSubmission(formName, {
        form_id: form.id || undefined,
        form_action: form.action || undefined,
      });
    } catch (err) {
      console.warn('Global form submit tracking error:', err);
    }
  };

  document.addEventListener('click', handleClick, true);
  document.addEventListener('submit', handleSubmit, true);

  return () => {
    document.removeEventListener('click', handleClick, true);
    document.removeEventListener('submit', handleSubmit, true);
    isGlobalTrackingInitialized = false;
  };
};
