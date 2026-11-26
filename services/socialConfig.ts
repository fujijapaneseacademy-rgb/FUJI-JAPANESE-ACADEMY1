export interface SocialLinkItem {
  id: string;
  platform: string;
  title: string;
  description: string;
  url: string;
  iconName: string;
  category: 'business' | 'social';
  enabled: boolean;
  order: number;
  badge?: string;
  featured?: boolean;
  buttonText?: string;
  colorScheme: {
    bg: string;
    text: string;
    border: string;
    hoverBg: string;
    iconColor: string;
  };
}

export interface SisterVenture {
  id: string;
  name: string;
  tagline: string;
  url: string;
  badge: string;
  description: string;
}

export interface BrandConfig {
  name: string;
  japaneseName: string;
  tagline: string;
  description: string;
  logo: string;
  phone: string;
  whatsapp: string;
  whatsappGreeting: string;
  email: string;
  address: string;
  website: string;
  verifiedBadge: boolean;
  qr: {
    qrUrl: string;
    campaignParams: string;
    brandLogo: string;
    showLogoInCenter: boolean;
    logoSizePercent: number;
    fgColor: string;
    bgColor: string;
    borderColor: string;
    borderStyle: string;
    errorCorrectionLevel: string;
    cardTitle: string;
    cardSubtitle: string;
  };
  links: SocialLinkItem[];
}

export const DEFAULT_BRAND_CONFIG: BrandConfig = {
  name: "FUJI JAPANESE ACADEMY",
  japaneseName: "富士日本語アカデミー",
  tagline: "Learn • Connect • Grow",
  description: "India's Premier Japanese Language Institute. Offline & Online JLPT N5-N1 coaching, cultural immersion, and career guidance.",
  logo: "/logo.png",
  phone: "+91 6364924110",
  whatsapp: "916364924110",
  whatsappGreeting: "Hi, I found you through your QR code and would like to know more about your Japanese language courses and services.",
  email: "fujijapaneseacademy@gmail.com",
  address: "Electronic City, 06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Karnataka 560100",
  website: "https://fujijapaneseacademy.com",
  verifiedBadge: true,
  qr: {
    qrUrl: "https://fujijapaneseacademy.com/connect",
    campaignParams: "?utm_source=qr&utm_medium=offline&utm_campaign=social_connect",
    brandLogo: "/logo.png",
    showLogoInCenter: true,
    logoSizePercent: 22,
    fgColor: "#1E1B4B",
    bgColor: "#FFFFFF",
    borderColor: "#D90429",
    borderStyle: "rounded",
    errorCorrectionLevel: "H",
    cardTitle: "SCAN TO CONNECT",
    cardSubtitle: "All Social Media & Business Links in One Scan"
  },
  links: [
    {
      id: "website",
      platform: "Official Website",
      title: "Explore Courses & Admissions",
      description: "Visit our official website for syllabus, batches, faculty, and enrollment.",
      url: "https://fujijapaneseacademy.com",
      iconName: "Globe",
      category: "business",
      enabled: true,
      order: 1,
      badge: "Official Portal",
      featured: true,
      buttonText: "Visit Website →",
      colorScheme: {
        bg: "bg-gradient-to-r from-blue-900/90 to-indigo-950/90",
        text: "text-white",
        border: "border-blue-700/40",
        hoverBg: "hover:border-blue-400",
        iconColor: "text-blue-400"
      }
    },
    {
      id: "instagram",
      platform: "Instagram",
      title: "@fuji_japanese_academy",
      description: "Daily Japanese vocabulary, JLPT tips, Japanese culture reels & academy updates.",
      url: "https://www.instagram.com/fuji_japanese_academy/",
      iconName: "Instagram",
      category: "social",
      enabled: true,
      order: 2,
      badge: "Daily Content",
      buttonText: "Follow on Instagram →",
      colorScheme: {
        bg: "bg-gradient-to-r from-[#833ab4]/10 via-[#fd1d1d]/10 to-[#fcb045]/10",
        text: "text-gray-900",
        border: "border-pink-500/20",
        hoverBg: "hover:border-pink-500/60",
        iconColor: "text-pink-600"
      }
    },
    {
      id: "youtube",
      platform: "YouTube",
      title: "Fuji Japanese Academy",
      description: "Free video lessons, pronunciation drills, JLPT grammar series & podcasts.",
      url: "https://www.youtube.com/@fujijapaneseacademy",
      iconName: "Youtube",
      category: "social",
      enabled: true,
      order: 3,
      badge: "Video Tutorials",
      buttonText: "Subscribe on YouTube →",
      colorScheme: {
        bg: "bg-red-50/70",
        text: "text-gray-900",
        border: "border-red-500/20",
        hoverBg: "hover:border-red-500/60",
        iconColor: "text-red-600"
      }
    },
    {
      id: "facebook",
      platform: "Facebook",
      title: "Fuji Japanese Academy Page",
      description: "Join our community, student achievements, and workshop announcements.",
      url: "https://www.facebook.com/people/Fuji-Japanese-Academy-Learn-Japanese-Online/61583139153440/",
      iconName: "Facebook",
      category: "social",
      enabled: true,
      order: 4,
      buttonText: "Like on Facebook →",
      colorScheme: {
        bg: "bg-blue-50/70",
        text: "text-gray-900",
        border: "border-blue-600/20",
        hoverBg: "hover:border-blue-600/60",
        iconColor: "text-blue-600"
      }
    },
    {
      id: "linkedin",
      platform: "LinkedIn",
      title: "Fuji Japanese Academy",
      description: "Corporate training, bilingual career opportunities, and industry insights.",
      url: "https://www.linkedin.com/in/fuji-japanese-academy-497156391",
      iconName: "Linkedin",
      category: "social",
      enabled: true,
      order: 5,
      badge: "Careers",
      buttonText: "Connect on LinkedIn →",
      colorScheme: {
        bg: "bg-sky-50/70",
        text: "text-gray-900",
        border: "border-sky-600/20",
        hoverBg: "hover:border-sky-600/60",
        iconColor: "text-sky-700"
      }
    },
    {
      id: "x-twitter",
      platform: "X (Twitter)",
      title: "@FujiAcadem77430",
      description: "Quick Japanese phrase of the day, news from Japan, and community threads.",
      url: "https://x.com/FujiAcadem77430",
      iconName: "Twitter",
      category: "social",
      enabled: true,
      order: 6,
      buttonText: "Follow on X →",
      colorScheme: {
        bg: "bg-slate-50/80",
        text: "text-gray-900",
        border: "border-slate-300",
        hoverBg: "hover:border-slate-700",
        iconColor: "text-slate-900"
      }
    },
    {
      id: "reddit",
      platform: "Reddit",
      title: "u/FUJI_JAPANESES",
      description: "Join discussions on JLPT strategies, Japanese study resources, and Q&A.",
      url: "https://www.reddit.com/user/FUJI_JAPANESES/",
      iconName: "MessageSquare",
      category: "social",
      enabled: true,
      order: 7,
      buttonText: "View on Reddit →",
      colorScheme: {
        bg: "bg-orange-50/70",
        text: "text-gray-900",
        border: "border-orange-500/20",
        hoverBg: "hover:border-orange-500/60",
        iconColor: "text-[#FF4500]"
      }
    },
    {
      id: "pinterest",
      platform: "Pinterest",
      title: "@fujijapanesea",
      description: "Kanji charts, Hiragana/Katakana mnemonics, and visual grammar guides.",
      url: "https://in.pinterest.com/fujijapanesea/",
      iconName: "Image",
      category: "social",
      enabled: true,
      order: 8,
      buttonText: "Pin & Save Guides →",
      colorScheme: {
        bg: "bg-red-50/70",
        text: "text-gray-900",
        border: "border-red-600/20",
        hoverBg: "hover:border-red-600/60",
        iconColor: "text-[#E60023]"
      }
    },
    {
      id: "google-reviews",
      platform: "Google Reviews",
      title: "Rate & Review Us",
      description: "Read reviews from our students or share your learning experience with us.",
      url: "https://share.google/JtUmZJn5W7Undf9Ir",
      iconName: "Star",
      category: "business",
      enabled: true,
      order: 9,
      badge: "★ 4.9 Rating",
      buttonText: "Write a Review →",
      colorScheme: {
        bg: "bg-amber-50/70",
        text: "text-gray-900",
        border: "border-amber-500/30",
        hoverBg: "hover:border-amber-500/70",
        iconColor: "text-amber-500"
      }
    },
    {
      id: "google-maps",
      platform: "Google Maps / Location",
      title: "Bengaluru Campus",
      description: "Electronic City, 06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Karnataka 560100",
      url: "https://share.google/JHpoZKsmxV9p22Exb",
      iconName: "MapPin",
      category: "business",
      enabled: true,
      order: 10,
      badge: "In-Person Campus",
      buttonText: "Open in Google Maps →",
      colorScheme: {
        bg: "bg-emerald-50/70",
        text: "text-gray-900",
        border: "border-emerald-500/20",
        hoverBg: "hover:border-emerald-500/60",
        iconColor: "text-emerald-600"
      }
    }
  ]
};

export const SISTER_VENTURES: SisterVenture[] = [
  {
    id: "sn-associates",
    name: "SN ASSOCIATES & CO",
    tagline: "Audit • Accounting • GST • Tax • ITR • Compliance",
    url: "https://www.snassociatesandco.com",
    badge: "Finance & Compliance",
    description: "Premier Chartered Accounting & Corporate Compliance advisory."
  },
  {
    id: "fga-ai",
    name: "FUJI GLOBAL AI",
    tagline: "Artificial Intelligence • Automation • AI Solutions",
    url: "https://www.fujiglobalai.com",
    badge: "AI & Innovation",
    description: "Innovate, Automate & Elevate through cutting-edge enterprise AI."
  }
];

const CONFIG_KEY = "fuji_social_brand_config_v2";
const ANALYTICS_KEY = "fuji_analytics_clicks_v1";

export function loadSocialConfig(): BrandConfig {
  if (typeof window === "undefined") return DEFAULT_BRAND_CONFIG;
  try {
    const raw = localStorage.getItem(CONFIG_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_BRAND_CONFIG,
        ...parsed,
        qr: { ...DEFAULT_BRAND_CONFIG.qr, ...(parsed.qr || {}) },
        links: parsed.links && parsed.links.length > 0 ? parsed.links : DEFAULT_BRAND_CONFIG.links
      };
    }
  } catch (e) {
    console.error("Error loading social config from localStorage:", e);
  }
  return DEFAULT_BRAND_CONFIG;
}

export function saveSocialConfig(cfg: BrandConfig): void {
  try {
    localStorage.setItem(CONFIG_KEY, JSON.stringify(cfg));
  } catch (e) {
    console.error("Error saving social config to localStorage:", e);
  }
}

export function resetSocialConfig(): BrandConfig {
  try {
    localStorage.removeItem(CONFIG_KEY);
  } catch (e) {
    console.error("Error resetting social config:", e);
  }
  return DEFAULT_BRAND_CONFIG;
}

export function extractUTM(searchStr: string): Record<string, string> {
  const sp = new URLSearchParams(searchStr);
  const out: Record<string, string> = {};
  ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(k => {
    const val = sp.get(k);
    if (val) out[k] = val;
  });
  return out;
}

export interface AnalyticsStats {
  pageViews: number;
  qrScans: number;
  clicks: Record<string, number>;
  lastUpdated: string;
}

export function getAnalytics(): AnalyticsStats {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error("Failed to load local analytics", e);
  }
  return {
    pageViews: 0,
    qrScans: 0,
    clicks: {},
    lastUpdated: new Date().toISOString()
  };
}

export function trackEvent(evt: string, params: Record<string, any> = {}): void {
  try {
    if (typeof window !== "undefined") {
      const w = window as any;
      if (typeof w.gtag === "function") {
        w.gtag("event", evt, params);
      } else if (Array.isArray(w.dataLayer)) {
        w.dataLayer.push({ event: evt, ...params, timestamp: new Date().toISOString() });
      }
    }
    const current = getAnalytics();
    if (evt === "qr_landing_page_view") {
      current.pageViews = (current.pageViews || 0) + 1;
      if (params.source === "qr" || params.utm_source === "qr") {
        current.qrScans = (current.qrScans || 0) + 1;
      }
    } else {
      current.clicks[evt] = (current.clicks[evt] || 0) + 1;
    }
    current.lastUpdated = new Date().toISOString();
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(current));
    console.info(`[Fuji Analytics] Event: ${evt}`, params);
  } catch (e) {
    console.warn("[Fuji Analytics] Error recording event:", e);
  }
}

export function resetAnalytics(): void {
  try {
    localStorage.removeItem(ANALYTICS_KEY);
  } catch (e) {
    console.error(e);
  }
}
