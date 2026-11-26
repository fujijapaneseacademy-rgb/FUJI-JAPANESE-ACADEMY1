import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Instagram,
  Youtube,
  Facebook,
  Linkedin,
  Twitter,
  MessageSquare,
  Image as ImageIcon,
  Star,
  Building2,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
  Check,
  Share2,
  Sparkles
} from 'lucide-react';
import {
  loadSocialConfig,
  extractUTM,
  trackEvent,
  SISTER_VENTURES,
  BrandConfig,
  SocialLinkItem
} from '../services/socialConfig';

function isValidUrl(url?: string): boolean {
  if (!url || typeof url !== 'string') return false;
  const trimmed = url.trim();
  if (!trimmed) return false;
  if (trimmed.startsWith('/') || trimmed.startsWith('#')) return true;
  try {
    const parsed = new URL(trimmed);
    return ['https:', 'http:', 'mailto:', 'tel:'].includes(parsed.protocol);
  } catch {
    return trimmed.startsWith('tel:') || trimmed.startsWith('mailto:') ? !/[\r\n<>"]/.test(trimmed) : false;
  }
}

function sanitizeUrl(url?: string, fallback = '#'): string {
  if (!url) return fallback;
  const trimmed = url.trim();
  return isValidUrl(trimmed) ? trimmed : fallback;
}

function makeWhatsAppUrl(phone: string, greeting?: string): string {
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const encodedGreeting = greeting ? encodeURIComponent(greeting) : '';
  return `https://wa.me/${cleanPhone}${encodedGreeting ? `?text=${encodedGreeting}` : ''}`;
}

function makeTelUrl(phone: string): string {
  return `tel:${phone.replace(/[^\d+]/g, '')}`;
}

function makeMailtoUrl(email: string, subject: string): string {
  return `mailto:${email.trim()}?subject=${encodeURIComponent(subject)}`;
}

const renderIcon = (iconName: string, className = "w-6 h-6") => {
  switch (iconName?.toLowerCase()) {
    case 'instagram':
      return <Instagram className={className} />;
    case 'youtube':
      return <Youtube className={className} />;
    case 'facebook':
      return <Facebook className={className} />;
    case 'linkedin':
      return <Linkedin className={className} />;
    case 'twitter':
    case 'x':
      return <Twitter className={className} />;
    case 'reddit':
    case 'messagesquare':
      return <MessageSquare className={className} />;
    case 'pinterest':
    case 'image':
      return <ImageIcon className={className} />;
    case 'star':
    case 'googlereviews':
      return <Star className={className} />;
    case 'mappin':
    case 'googlemaps':
      return <MapPin className={className} />;
    case 'globe':
    case 'website':
    default:
      return <Globe className={className} />;
  }
};

const Connect: React.FC = () => {
  const location = useLocation();
  const [config] = useState<BrandConfig>(loadSocialConfig());
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const utm = extractUTM(location.search);
    trackEvent('qr_landing_page_view', {
      source: utm.utm_source || 'direct',
      medium: utm.utm_medium || 'web',
      campaign: utm.utm_campaign || 'social_connect',
      pathname: location.pathname
    });
  }, [location]);

  const handleLinkClick = (item: SocialLinkItem) => {
    trackEvent('social_link_click', {
      platform: item.platform,
      title: item.title,
      url: item.url
    });
  };

  const handleWhatsAppClick = () => {
    trackEvent('whatsapp_click', {
      phone: config.whatsapp,
      action: 'direct_cta'
    });
  };

  const handlePhoneClick = () => {
    trackEvent('phone_click', { phone: config.phone });
  };

  const handleEmailClick = () => {
    trackEvent('email_click', { email: config.email });
  };

  const sharePageLink = async () => {
    trackEvent('share_landing_page', { url: window.location.href });
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${config.name} | Official Social Links`,
          text: `Connect with ${config.name} on all social media platforms and official channels.`,
          url: window.location.href
        });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      if (import.meta.env.DEV) console.error(err);
    }
  };

  const enabledLinks = [...(config.links || [])]
    .filter(l => l.enabled)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const whatsappUrl = makeWhatsAppUrl(config.whatsapp, config.whatsappGreeting);
  const telUrl = makeTelUrl(config.phone);
  const emailUrl = makeMailtoUrl(config.email, "Inquiry from Fuji Japanese Academy Social Connect");
  const locationUrl = "https://share.google/JHpoZKsmxV9p22Exb";

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF8F5] via-[#F3F4F6] to-[#E9ECEF] text-fuji-slate relative selection:bg-fuji-red/20 selection:text-fuji-red pb-16">
      <Helmet>
        <title>{`Connect With Us | ${config.name}`}</title>
        <meta name="description" content={`Connect with ${config.name} on Instagram, YouTube, Facebook, LinkedIn, X, WhatsApp, Google Reviews, and more.`} />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://fujijapaneseacademy.com/connect" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Connect With Us | ${config.name}`} />
        <meta property="og:description" content={`All official social media, courses, and contact links for ${config.name}.`} />
        <meta property="og:image" content="https://fujijapaneseacademy.com/logo.png" />
        <meta property="og:url" content="https://fujijapaneseacademy.com/connect" />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={`Connect With Us | ${config.name}`} />
        <meta name="twitter:description" content={`All official social media and business links for ${config.name}.`} />
        <meta name="twitter:image" content="https://fujijapaneseacademy.com/logo.png" />
      </Helmet>

      {/* Decorative background glows */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-fuji-indigo to-transparent opacity-95 pointer-events-none" />
      <div className="absolute top-0 right-0 left-0 h-80 bg-[radial-gradient(#D90429_1px,transparent_1px)] [background-size:20px_20px] opacity-10 pointer-events-none" />

      <div className="relative z-10 max-w-xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-8">
          <NavLink
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full transition-all"
          >
            <span>← Fuji Academy Home</span>
          </NavLink>

          <button
            onClick={sharePageLink}
            type="button"
            className="inline-flex items-center gap-1.5 p-2 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-full transition-all active:scale-95 cursor-pointer"
            title="Share Page Link"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-400" />
            ) : (
              <Share2 className="w-4 h-4" />
            )}
          </button>
        </div>

        {/* Profile Card Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-8"
        >
          <div className="relative mb-4 group">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-white p-3 shadow-2xl border-2 border-white/80 flex items-center justify-center relative overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <img
                src={config.logo || "/logo.png"}
                alt={config.name}
                className="w-full h-full object-contain"
                onError={(e) => { (e.target as HTMLElement).style.display = "none"; }}
              />
            </div>
            {config.verifiedBadge && (
              <div
                className="absolute -bottom-1 -right-1 bg-emerald-600 text-white p-1 rounded-full border-2 border-white shadow-md flex items-center justify-center"
                title="Verified Official Academy"
              >
                <ShieldCheck className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          <span className="text-xs font-bold tracking-[0.25em] text-fuji-red uppercase mb-1 drop-shadow-sm">
            {config.japaneseName}
          </span>
          <h1 className="font-display font-black text-2xl sm:text-3xl text-fuji-indigo tracking-tight">
            {config.name}
          </h1>

          <div className="inline-flex items-center gap-2 mt-1.5 px-3 py-1 rounded-full bg-white/70 backdrop-blur-sm border border-gray-200/60 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-bold text-fuji-indigo tracking-wide">
              {config.tagline}
            </span>
          </div>

          <p className="text-xs sm:text-sm text-gray-600 max-w-md mt-3 leading-relaxed">
            {config.description}
          </p>
        </motion.div>

        {/* Quick Contact Buttons (Call, WhatsApp, Email, Location) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-4 gap-2.5 sm:gap-3 mb-6"
        >
          <a
            href={telUrl}
            onClick={handlePhoneClick}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md hover:border-fuji-red/50 hover:bg-fuji-red/5 transition-all group active:scale-95"
            title="Call Us Now"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform mb-1">
              <Phone className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-gray-700 group-hover:text-fuji-indigo">Call Now</span>
          </a>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md hover:border-emerald-500/50 hover:bg-emerald-50/50 transition-all group active:scale-95"
            title="Chat on WhatsApp"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center group-hover:scale-110 transition-transform mb-1">
              <MessageSquare className="w-5 h-5 fill-emerald-600/20" />
            </div>
            <span className="text-[11px] font-bold text-gray-700 group-hover:text-emerald-700">WhatsApp</span>
          </a>

          <a
            href={emailUrl}
            onClick={handleEmailClick}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md hover:border-red-500/50 hover:bg-red-50/50 transition-all group active:scale-95"
            title="Send Email"
          >
            <div className="w-10 h-10 rounded-xl bg-red-50 text-fuji-red flex items-center justify-center group-hover:scale-110 transition-transform mb-1">
              <Mail className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-gray-700 group-hover:text-fuji-indigo">Email</span>
          </a>

          <a
            href={locationUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('google_maps_click', { url: locationUrl })}
            className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-gray-200/80 shadow-sm hover:shadow-md hover:border-amber-500/50 hover:bg-amber-50/50 transition-all group active:scale-95"
            title="Campus Location"
          >
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center group-hover:scale-110 transition-transform mb-1">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-[11px] font-bold text-gray-700 group-hover:text-amber-800">Location</span>
          </a>
        </motion.div>

        {/* Featured WhatsApp Banner */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mb-6"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleWhatsAppClick}
            className="block p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-[#25D366] via-[#20BA5A] to-[#128C7E] text-white shadow-xl shadow-emerald-500/20 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99] relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center shrink-0 border border-white/20">
                  <MessageSquare className="w-6 h-6 text-white fill-white" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-base sm:text-lg tracking-tight">Chat With Us on WhatsApp</span>
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-white text-emerald-800 shadow-sm">Online Now</span>
                  </div>
                  <p className="text-xs text-white/90 font-medium line-clamp-1 mt-0.5">
                    Fast response for course admissions & JLPT guidance
                  </p>
                </div>
              </div>
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0 group-hover:translate-x-1 transition-transform">
                <ArrowRight className="w-5 h-5 text-white" />
              </div>
            </div>
          </a>
        </motion.div>

        {/* Links List */}
        <div className="space-y-3.5 mb-8">
          {enabledLinks.map((item, idx) => {
            const isExternal = item.url.startsWith('http');
            const targetUrl = sanitizeUrl(item.url);

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.15 + idx * 0.04 }}
              >
                <a
                  href={targetUrl}
                  target={isExternal ? "_blank" : "_self"}
                  rel={isExternal ? "noopener noreferrer" : undefined}
                  onClick={() => handleLinkClick(item)}
                  className={`group relative flex items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-white border border-gray-200/90 shadow-sm hover:shadow-xl transition-all duration-300 hover:scale-[1.015] active:scale-[0.99] ${
                    item.featured ? "ring-2 ring-fuji-indigo/20 border-fuji-indigo/40" : ""
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0 pr-2">
                    <div
                      className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 shadow-sm border border-gray-100 transition-transform duration-300 group-hover:scale-110 ${
                        item.colorScheme?.bg || "bg-gray-50"
                      } ${item.colorScheme?.iconColor || "text-fuji-indigo"}`}
                    >
                      {renderIcon(item.iconName, "w-5 h-5")}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h2 className="font-bold text-sm sm:text-base text-fuji-indigo tracking-tight truncate group-hover:text-fuji-red transition-colors">
                          {item.platform}
                        </h2>
                        {item.badge && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 font-medium truncate mt-0.5">
                        {item.description || item.title}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-gray-400 group-hover:text-fuji-red shrink-0 transition-colors">
                    <span className="text-xs font-bold hidden sm:inline-block">
                      {item.buttonText ? item.buttonText.replace(/[→>]/g, '').trim() : "Open"}
                    </span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </a>
              </motion.div>
            );
          })}
        </div>

        {/* Sister Ventures Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8 pt-4 border-t border-gray-200/80"
        >
          <div className="flex items-center justify-center gap-2 mb-3">
            <Building2 className="w-4 h-4 text-fuji-indigo" />
            <h3 className="text-xs uppercase font-bold tracking-widest text-gray-500">
              Our Other Business Ventures
            </h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {SISTER_VENTURES.map((v) => (
              <a
                key={v.id}
                href={v.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('sister_venture_click', { venture: v.name })}
                className="p-3.5 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md hover:border-fuji-indigo/40 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
                    {v.badge}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-fuji-indigo transition-colors" />
                </div>
                <h4 className="font-bold text-sm text-fuji-indigo group-hover:text-fuji-red transition-colors">
                  {v.name}
                </h4>
                <p className="text-[11px] text-gray-500 line-clamp-1 mt-0.5 font-medium">
                  {v.tagline}
                </p>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Footer */}
        <footer className="text-center pt-6 pb-8 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} {config.name}. All Rights Reserved.</p>
          <div className="flex justify-center gap-4 mt-2">
            <NavLink to="/" className="hover:text-fuji-indigo transition-colors">Home</NavLink>
            <span>•</span>
            <NavLink to="/courses" className="hover:text-fuji-indigo transition-colors">Courses</NavLink>
            <span>•</span>
            <NavLink to="/privacy-policy" className="hover:text-fuji-indigo transition-colors">Privacy</NavLink>
            <span>•</span>
            <NavLink to="/terms" className="hover:text-fuji-indigo transition-colors">Terms</NavLink>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Connect;
