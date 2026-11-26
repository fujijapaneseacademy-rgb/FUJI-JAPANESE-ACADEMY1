import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, QrCode, Sparkles, Check, Copy, ShieldCheck, Download } from 'lucide-react';
import { loadSocialConfig, trackEvent } from '../services/socialConfig';
import { PrintableQRCard, DynamicQR } from '../components/PrintableQRCard';

const QRCodePage: React.FC = () => {
  const [config] = useState(loadSocialConfig());
  const [tab, setTab] = useState<'card' | 'qr'>('card');
  const [copied, setCopied] = useState(false);
  const [showLogo, setShowLogo] = useState(true);

  const targetUrl = "https://fujijapaneseacademy.com/connect?utm_source=qr&utm_medium=offline&utm_campaign=social_connect";

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(targetUrl);
      setCopied(true);
      trackEvent('qr_copy_url', { url: targetUrl });
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      if (import.meta.env.DEV) console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1E1B4B] via-[#2B2D42] to-[#111827] text-white py-10 px-4 sm:px-6 relative overflow-hidden">
      <Helmet>
        <title>Official QR Code & Print Studio | {config.name}</title>
        <meta
          name="description"
          content="Download and print official high-resolution 300 DPI QR codes for Fuji Japanese Academy."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://fujijapaneseacademy.com/qr" />
      </Helmet>

      <div className="absolute top-0 left-1/4 w-96 h-96 bg-fuji-red/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 pt-16">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
          <NavLink
            to="/"
            className="text-xs font-semibold text-white/80 hover:text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full transition-all"
          >
            ← Back to Home
          </NavLink>
          <NavLink
            to="/connect"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-white bg-fuji-red hover:bg-fuji-darkRed px-4 py-1.5 rounded-full shadow-lg transition-all"
          >
            <span>View Social Landing Page</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </NavLink>
        </div>

        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Official Institutional QR System</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-display font-black tracking-tight text-white mb-2">
            Fuji Academy Official QR Code
          </h1>
          <p className="text-sm text-gray-300 max-w-lg mx-auto">
            This QR code points directly to your permanent social landing page (<code className="text-amber-400 font-mono">/connect</code>). Print this on visiting cards, institutional standees, brochures, or posters.
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-white/10 p-1 rounded-2xl flex gap-1 border border-white/10">
            <button
              type="button"
              onClick={() => setTab('card')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                tab === 'card' ? 'bg-fuji-red text-white shadow-lg' : 'text-white/70 hover:text-white'
              }`}
            >
              Print-Ready QR Card
            </button>
            <button
              type="button"
              onClick={() => setTab('qr')}
              className={`px-5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                tab === 'qr' ? 'bg-fuji-red text-white shadow-lg' : 'text-white/70 hover:text-white'
              }`}
            >
              Standalone High-Res QR
            </button>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          {tab === 'card' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full flex justify-center"
            >
              <PrintableQRCard config={config} targetUrl={targetUrl} showPrintTrigger={true} />
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-white text-fuji-indigo p-8 sm:p-10 rounded-3xl shadow-2xl border-2 border-white/20 flex flex-col items-center max-w-md w-full text-center"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="p-2 bg-fuji-red/10 text-fuji-red rounded-xl">
                  <QrCode className="w-5 h-5" />
                </span>
                <h3 className="font-bold text-lg text-fuji-indigo">High-Res Scannable QR</h3>
              </div>

              <div className="p-4 bg-white rounded-2xl shadow-inner border border-gray-100 mb-4">
                <DynamicQR
                  url={targetUrl}
                  size={260}
                  fgColor={config.qr.fgColor || "#1E1B4B"}
                  bgColor="#FFFFFF"
                  borderColor="#D90429"
                  borderStyle="rounded"
                  logoUrl="/logo.png"
                  showLogo={showLogo}
                  logoSizePercent={18}
                  showActions={true}
                />
              </div>

              <div className="flex items-center justify-between w-full pt-4 border-t border-gray-100 text-xs text-gray-600">
                <span>Embed Logo in Center:</span>
                <button
                  type="button"
                  onClick={() => setShowLogo(!showLogo)}
                  className={`px-3 py-1 rounded-full font-bold transition-all ${
                    showLogo ? 'bg-fuji-indigo text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {showLogo ? 'Enabled' : 'Disabled'}
                </button>
              </div>
            </motion.div>
          )}
        </div>

        <div className="mt-8 p-4 rounded-2xl bg-white/5 border border-white/10 max-w-xl mx-auto flex items-center justify-between gap-3">
          <div className="min-w-0">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest block">
              Permanent Institutional QR URL
            </span>
            <p className="text-xs text-white/90 font-mono truncate mt-0.5">{targetUrl}</p>
          </div>
          <button
            onClick={copyUrl}
            type="button"
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold shrink-0 transition-colors flex items-center gap-1 cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 mt-8 pt-8 border-t border-white/10 text-center">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto mb-2" />
            <h4 className="font-bold text-xs text-white">Permanent Target Guarantee</h4>
            <p className="text-[11px] text-gray-400 mt-1">
              Guaranteed never to expire or change, protecting all physical cards & posters.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <Download className="w-5 h-5 text-amber-400 mx-auto mb-2" />
            <h4 className="font-bold text-xs text-white">300 DPI Commercial Print</h4>
            <p className="text-[11px] text-gray-400 mt-1">
              Crystal-clear 1200x1200px export ready for digital presses & banners.
            </p>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/5">
            <Sparkles className="w-5 h-5 text-fuji-red mx-auto mb-2" />
            <h4 className="font-bold text-xs text-white">Dynamic Link Sync</h4>
            <p className="text-[11px] text-gray-400 mt-1">
              Update social channels and phone numbers anytime without reprinting cards.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodePage;
