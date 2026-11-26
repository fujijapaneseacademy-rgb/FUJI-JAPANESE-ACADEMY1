import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  Facebook, Instagram, Linkedin, Mail, MapPin, Phone,
  Star, Twitter, MessageSquare, Image as ImageIcon,
  ArrowRight, ShieldCheck, Award, Sparkles, CheckCircle, Send
} from 'lucide-react';
import { submitToGoogleSheet } from '../services/formService';
import UniversalSiteSearchModal, { TOP_SEARCH_KEYWORDS } from './UniversalSiteSearchModal';
import { Search, Globe } from 'lucide-react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchInitialQuery, setSearchInitialQuery] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setIsSubmitting(true);
    const success = await submitToGoogleSheet({
      formType: 'Newsletter',
      name: 'Newsletter Subscriber',
      email,
      phone: ''
    });
    setIsSubmitting(false);
    if (success) {
      setIsSuccess(true);
      setEmail('');
      setTimeout(() => setIsSuccess(false), 5000);
    }
  };
  const socialLinks = [
    { icon: Instagram, href: "https://www.instagram.com/fuji_japanese_academy/", label: "Instagram" },
    { icon: (props: any) => (
      <svg className={props.className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
        <path d="m10 15 5-3-5-3z" />
      </svg>
    ), href: "https://www.youtube.com/@fujijapaneseacademy", label: "YouTube" },
    { icon: Facebook, href: "https://www.facebook.com/people/Fuji-Japanese-Academy-Learn-Japanese-Online/61583139153440/", label: "Facebook" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/fuji-japanese-academy-497156391", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/FujiAcadem77430", label: "X (Twitter)" },
    { icon: MessageSquare, href: "https://www.reddit.com/user/FUJI_JAPANESES/", label: "Reddit" },
    { icon: ImageIcon, href: "https://in.pinterest.com/fujijapanesea/", label: "Pinterest" },
    { icon: MessageSquare, href: "https://wa.me/916364924110", label: "WhatsApp" },
    { icon: Star, href: "https://share.google/JtUmZJn5W7Undf9Ir", label: "Google Review" },
    { icon: MapPin, href: "https://share.google/JHpoZKsmxV9p22Exb", label: "Google Maps" }
  ];

  return (
    <footer className="bg-fuji-indigo text-white pt-20 pb-24 lg:pb-12 relative overflow-hidden border-t border-white/5">
      {/* Ambient Motif */}
      <div className="absolute top-0 right-0 p-32 opacity-5 pointer-events-none">
        <img src="/logo.png" alt="Fuji Japanese Academy Ambient Logo" width="384" height="384" loading="lazy" decoding="async" className="w-96 h-96 grayscale" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        {/* UNIVERSAL SITE SEARCH & TOP KEYWORDS BAR */}
        <div className="mb-14 p-6 sm:p-8 rounded-3xl bg-white/[0.06] border border-white/15 backdrop-blur-md shadow-2xl relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            <div className="max-w-md text-center lg:text-left">
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-300 flex items-center justify-center lg:justify-start gap-1.5 mb-1">
                <Search className="w-3.5 h-3.5 text-amber-400" /> Universal Section &amp; Course Search
              </span>
              <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                Find Any Course, Enterprise Solution or Topic
              </h3>
              <p className="text-xs sm:text-sm text-white/70 mt-1">
                Type any relative word: Nursing, N5 Fees, Corporate Training, Tokyo IT Jobs, or Exam Dates.
              </p>
            </div>

            <div className="w-full lg:max-w-xl">
              <div 
                onClick={() => {
                  setSearchInitialQuery('');
                  setIsSearchOpen(true);
                }}
                className="cursor-pointer flex items-center justify-between bg-black/40 hover:bg-black/60 border border-white/20 hover:border-amber-400/60 rounded-2xl p-3 sm:p-4 text-white/70 transition-all shadow-inner group"
              >
                <div className="flex items-center gap-3">
                  <Search className="w-5 h-5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs sm:text-sm font-medium text-white/80">Search relative keywords (e.g., Nursing, Fees, N5, Jobs)...</span>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-xs font-bold text-white shadow-md">
                  Search All ↗
                </span>
              </div>

              {/* Relative Keywords Top Pills */}
              <div className="flex items-center gap-1.5 mt-3 overflow-x-auto no-scrollbar">
                <span className="text-[11px] text-amber-300 font-bold uppercase flex-shrink-0 mr-1">Top:</span>
                {TOP_SEARCH_KEYWORDS.map((kw) => (
                  <button
                    key={kw}
                    type="button"
                    onClick={() => {
                      setSearchInitialQuery(kw);
                      setIsSearchOpen(true);
                    }}
                    className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-white/10 hover:bg-amber-400 hover:text-gray-950 text-white/90 whitespace-nowrap transition-all flex-shrink-0 active:scale-95 border border-white/10"
                  >
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* DOMAIN DIRECTORY SWITCHER: .COM (MAIN WORLD) VS .IN (INDIA) */}
        <div className="mb-12 p-5 rounded-2xl bg-gradient-to-r from-indigo-950/50 via-slate-950/60 to-red-950/40 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🌐</span>
            <div>
              <span className="font-bold text-white text-sm block">Fuji Japanese Academy Global Portal (.com)</span>
              <span className="text-white/60">Dedicated to international corporate training, overseas recruitment, and enterprise clients.</span>
            </div>
          </div>
          <a
            href="https://fujijapaneseacademy.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-amber-300 font-bold text-xs uppercase tracking-wider transition-all border border-amber-400/40 whitespace-nowrap"
          >
            <span className="text-sm">🇮🇳</span>
            <span>Visit India Academy &amp; College Portal (.in) ↗</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-16">

          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white/10 bg-white shadow-lg">
                <img
                  src="/logo.png"
                  alt="Fuji Japanese Academy Logo"
                  width="48"
                  height="48"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.parentElement!.classList.add('bg-fuji-red', 'flex', 'items-center', 'justify-center');
                    e.currentTarget.parentElement!.innerHTML = '<span class="text-white font-bold text-xs">FJ</span>';
                  }}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-2xl tracking-tight leading-none">FUJI JAPANESE ACADEMY</span>
                <span className="text-xs font-semibold tracking-wider text-amber-300 mt-1">FUJI JAPANESE ACADEMY PRIVATE LIMITED</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.25em] text-white/50 mt-0.5">Language • Culture • Careers</span>
              </div>
            </div>

            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Premier Japanese language and JLPT coaching academy in Bengaluru and online. Learn from certified native and bilingual instructors with a 98% exam pass rate and corporate placement support.
            </p>

            <div className="flex items-center gap-2 p-3 bg-white/5 rounded-2xl max-w-xs border border-white/10 text-xs">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="font-bold text-white">4.9 / 5</span>
              <span className="text-white/50">• 348+ Verified Student Reviews</span>
            </div>

            <div className="flex flex-wrap gap-2 max-w-xs">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.label}
                  aria-label={social.label}
                  className="p-2 bg-white/5 rounded-xl hover:bg-fuji-red hover:text-white transition-all hover:-translate-y-0.5 border border-white/5"
                >
                  <social.icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Courses Column */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-wider uppercase mb-4 text-amber-300">
              JLPT Courses
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm text-white/70">
              <li><NavLink to="/courses/jlpt-n5" className="hover:text-amber-300 transition-colors">JLPT N5 (Beginner Foundation)</NavLink></li>
              <li><NavLink to="/courses/jlpt-n4" className="hover:text-amber-300 transition-colors">JLPT N4 (Elementary)</NavLink></li>
              <li><NavLink to="/courses/jlpt-n3" className="hover:text-amber-300 transition-colors">JLPT N3 (Intermediate)</NavLink></li>
              <li><NavLink to="/courses/jlpt-n2" className="hover:text-amber-300 transition-colors">JLPT N2 (Business Fluency)</NavLink></li>
              <li><NavLink to="/courses/jlpt-n1" className="hover:text-amber-300 transition-colors">JLPT N1 (Mastery Level)</NavLink></li>
              <li><NavLink to="/courses/spoken-japanese" className="hover:text-amber-300 transition-colors">Spoken Japanese</NavLink></li>
              <li><NavLink to="/courses/business-japanese" className="hover:text-amber-300 transition-colors">Business Japanese &amp; Keigo</NavLink></li>
              <li><NavLink to="/courses/japanese-for-it-professionals" className="hover:text-amber-300 transition-colors">Japanese for IT Engineers</NavLink></li>
              <li><NavLink to="/courses/corporate-japanese-training" className="hover:text-amber-300 transition-colors">Corporate Training (B2B)</NavLink></li>
              <li><NavLink to="/corporate" className="text-amber-300 font-bold hover:underline">Enterprise B2B Training Portal</NavLink></li>
              <li><NavLink to="/college-partnerships" className="text-amber-300 hover:underline">College Partnerships (MoU)</NavLink></li>
              <li><NavLink to="/courses" className="text-amber-300 font-semibold hover:underline block pt-1">Explore All Courses →</NavLink></li>
            </ul>
          </div>

          {/* Learn & Practice Hub */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-wider uppercase mb-4 text-amber-300">
              JLPT Hub &amp; Practice
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm text-white/70">
              <li><NavLink to="/jlpt" className="hover:text-amber-300 transition-colors">JLPT Complete Guide</NavLink></li>
              <li><NavLink to="/exam-calendar" className="text-amber-300 font-bold hover:underline">India Exam Calendar 2026 (JLPT, NAT, JFT)</NavLink></li>
              <li><NavLink to="/jlpt-exam-dates-india" className="hover:text-amber-300 transition-colors">India JLPT Exam Dates Tracker</NavLink></li>
              <li><NavLink to="/jlpt/n5" className="hover:text-amber-300 transition-colors">JLPT N5 Syllabus &amp; Marks</NavLink></li>
              <li><NavLink to="/jlpt/n4" className="hover:text-amber-300 transition-colors">JLPT N4 Exam Breakdown</NavLink></li>
              <li><NavLink to="/jlpt/n3" className="hover:text-amber-300 transition-colors">JLPT N3 IT Benchmark</NavLink></li>
              <li><NavLink to="/practice" className="text-emerald-400 font-bold hover:underline">Interactive JLPT Quizzes</NavLink></li>
              <li><NavLink to="/mock-test" className="text-amber-300 font-bold hover:underline">JLPT Mock Exam Simulator (N5-N3)</NavLink></li>
              <li><NavLink to="/learn/hiragana-katakana" className="hover:text-amber-300 transition-colors">Hiragana &amp; Katakana Chart</NavLink></li>
              <li><NavLink to="/learn/vocabulary" className="hover:text-amber-300 transition-colors">N5 Vocabulary Bank</NavLink></li>
              <li><NavLink to="/learn/grammar" className="hover:text-amber-300 transition-colors">Japanese Particles Guide</NavLink></li>
              <li><NavLink to="/learn/kanji" className="hover:text-amber-300 transition-colors">Foundation Kanji</NavLink></li>
              <li><NavLink to="/courses/free" className="text-emerald-400 font-semibold hover:underline">Free Study Materials</NavLink></li>
            </ul>
          </div>

          {/* Career, Locations & Quick Links */}
          <div>
            <h4 className="font-display font-bold text-sm tracking-wider uppercase mb-4 text-amber-300">
              Career &amp; Locations
            </h4>
            <ul className="space-y-2.5 text-xs md:text-sm text-white/70">
              <li><NavLink to="/career/japanese-for-it" className="hover:text-amber-300 transition-colors">Software Jobs in Japan</NavLink></li>
              <li><NavLink to="/career/working-in-japan" className="hover:text-amber-300 transition-colors">Japan Visa &amp; Living Guide</NavLink></li>
              <li><NavLink to="/career/japanese-job-interview" className="hover:text-amber-300 transition-colors">Japanese Resume (Rirekisho)</NavLink></li>
              <li><NavLink to="/locations/bangalore" className="hover:text-amber-300 transition-colors">Bengaluru Classes</NavLink></li>
              <li><NavLink to="/locations/electronic-city" className="hover:text-amber-300 transition-colors">Electronic City Campus</NavLink></li>
              <li><NavLink to="/locations" className="text-amber-300 hover:underline">Pan-India Learning Centers</NavLink></li>
              <li><NavLink to="/verify-certificate" className="text-emerald-400 font-semibold hover:underline">Verify Academy Certificate</NavLink></li>
              <li><NavLink to="/enquire" className="text-amber-300 font-bold hover:underline">Book Free Demo Class</NavLink></li>
              <li><NavLink to="/payment" className="text-emerald-300 font-bold hover:underline flex items-center gap-1">💳 Pay Course Fee Online</NavLink></li>
              <li><NavLink to="/news" className="hover:text-amber-300 transition-colors">Academy News &amp; Bulletins</NavLink></li>
              <li><NavLink to="/blog" className="hover:text-amber-300 transition-colors">Academy Blog</NavLink></li>
              <li><NavLink to="/about" className="hover:text-amber-300 transition-colors">About Us</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-amber-300 transition-colors">Contact Us</NavLink></li>
              <li><NavLink to="/careers" className="hover:text-amber-300 transition-colors flex items-center justify-between"><span>Careers &amp; Open Positions</span><span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded font-bold">HIRING</span></NavLink></li>
              <li><NavLink to="/careers#executive-sales-manesar" className="text-amber-300 hover:underline text-xs flex items-center gap-1"><span>↳ Executive Sales (Manesar)</span></NavLink></li>
            </ul>
          </div>

        </div>

        {/* Newsletter Subscription */}
        <div className="mb-12 pb-10 border-b border-white/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-md">
            <h4 className="font-display font-bold text-lg md:text-xl text-white mb-2 flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-300" />
              Subscribe to Fuji Japanese Digest
            </h4>
            <p className="text-white/60 text-sm">
              Get weekly language tips, cultural insights, and exclusive JLPT study resources delivered to your inbox.
            </p>
          </div>
          
          <div className="w-full md:w-auto flex-1 max-w-lg">
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                required
                disabled={isSubmitting || isSuccess}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-4 pr-32 text-sm text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400/50 focus:bg-white/10 transition-all disabled:opacity-50"
                aria-label="Email for newsletter subscription"
              />
              <button
                type="submit"
                disabled={isSubmitting || isSuccess || !email}
                className={`absolute right-1.5 top-1.5 bottom-1.5 px-5 rounded-xl text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-80
                  ${isSuccess 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-fuji-red hover:bg-fuji-darkRed text-white'}`}
                aria-label="Subscribe button"
              >
                {isSubmitting ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : isSuccess ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>Subscribe</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>
            {isSuccess && (
              <p className="text-emerald-400 text-xs mt-2 flex items-center gap-1 animate-in fade-in">
                <CheckCircle className="w-3 h-3" />
                Thank you for subscribing to our digest!
              </p>
            )}
          </div>
        </div>

        {/* Featured High-Visibility Contact Banner */}
        <div className="my-10 rounded-3xl bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-fuji-red/[0.08] border border-white/15 p-6 sm:p-8 lg:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm">
          {/* Subtle Watermark Pattern */}
          <div className="absolute -right-6 -bottom-6 text-white/[0.03] font-serif font-black text-8xl pointer-events-none select-none">
            富士
          </div>

          <div className="relative z-10">
            {/* Top Tagline */}
            <div className="flex flex-wrap items-center justify-between gap-3 mb-6 pb-5 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                <span className="text-xs font-bold uppercase tracking-widest text-amber-300">
                  Direct Admissions &amp; Student Support Desk
                </span>
              </div>
              <span className="text-xs text-white/70 font-medium">
                Mon – Sun: 9:00 AM – 7:30 PM IST • Admissions Open for 2026 Batches
              </span>
            </div>

            {/* Massive Phone and Mail Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
              {/* Phone Card */}
              <div className="bg-black/20 rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-amber-400/40 transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-fuji-red to-red-500 flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-white/60 font-semibold block">Call / WhatsApp Hotline</span>
                    <span className="text-[11px] text-emerald-400 font-medium">Instant Consultation &amp; Course Advice</span>
                  </div>
                </div>

                <a
                  href="tel:+916364924110"
                  className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white group-hover:text-amber-300 transition-colors tracking-tight block my-2"
                >
                  +91 63649 24110
                </a>

                <div className="flex flex-wrap items-center gap-3 pt-2 text-xs">
                  <a
                    href="https://wa.me/916364924110"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors font-semibold"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Chat on WhatsApp</span>
                  </a>
                  <span className="text-white/50">• Direct Admissions Desk</span>
                </div>
              </div>

              {/* Email Card */}
              <div className="bg-black/20 rounded-2xl p-5 sm:p-6 border border-white/10 hover:border-amber-400/40 transition-all group">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wider text-white/60 font-semibold block">Official Admissions Email</span>
                    <span className="text-[11px] text-amber-300 font-medium">Verified Response within 2 Hours</span>
                  </div>
                </div>

                <a
                  href="mailto:info@fujijapaneseacademy.com"
                  className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-white group-hover:text-amber-300 transition-colors tracking-tight block my-2 break-all sm:break-normal"
                >
                  info@fujijapaneseacademy.com
                </a>

                <a
                  href="mailto:fujijapaneseacademy@gmail.com"
                  className="text-xl sm:text-2xl lg:text-3xl font-display font-extrabold text-white/80 group-hover:text-amber-300 transition-colors tracking-tight block break-all sm:break-normal"
                >
                  fujijapaneseacademy@gmail.com
                </a>
              </div>
            </div>

            {/* Address & Direction Bar */}
            <div className="mt-6 pt-5 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-xs text-white/70">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-fuji-red flex-shrink-0 mt-0.5" />
                <span>
                  <strong className="text-white">Bengaluru Campus:</strong> Electronic City, 06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Karnataka 560100
                </span>
              </div>
              <a
                href="https://share.google/JHpoZKsmxV9p22Exb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-colors flex-shrink-0"
              >
                <span>Campus Location</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Accreditation & Institutional Quality Badges */}
        <div className="py-6 border-t border-white/10 my-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
            <Award className="w-5 h-5 text-amber-300 flex-shrink-0" />
            <div className="text-left">
              <span className="text-xs font-bold text-white block">Japan Foundation Aligned</span>
              <span className="text-[10px] text-white/60">Official JLPT Standards</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
            <Sparkles className="w-5 h-5 text-rose-400 flex-shrink-0" />
            <div className="text-left">
              <span className="text-xs font-bold text-white block">Certified Senseis</span>
              <span className="text-[10px] text-white/60">Native &amp; N1 Faculty</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
            <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <div className="text-left">
              <span className="text-xs font-bold text-white block">Encrypted Gateway</span>
              <span className="text-[10px] text-white/60">Cashfree Verified Admissions</span>
            </div>
          </div>
          <div className="flex items-center justify-center gap-2 p-3 rounded-2xl bg-white/[0.04] border border-white/10">
            <Star className="w-5 h-5 text-amber-400 flex-shrink-0 fill-current" />
            <div className="text-left">
              <span className="text-xs font-bold text-white block">98% First-Attempt Pass</span>
              <span className="text-[10px] text-white/60">Over 2,400+ Alumni</span>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Copyright */}
        <div className="pt-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} FUJI JAPANESE ACADEMY PRIVATE LIMITED. All rights reserved.</p>
          <div className="flex flex-wrap gap-6 text-gray-300">
            <a href="https://fujijapaneseacademy.in" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-bold hover:text-white transition-colors flex items-center gap-1">Fuji Academy India (.in) ↗</a>
            <NavLink to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</NavLink>
            <NavLink to="/terms" className="hover:text-white transition-colors">Terms &amp; Refund Policy</NavLink>
            <NavLink to="/connect" className="hover:text-white transition-colors">Social Bio Links</NavLink>
            <NavLink to="/qr" className="hover:text-white transition-colors">QR Code Hub</NavLink>
          </div>
        </div>
      </div>
      <UniversalSiteSearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} initialQuery={searchInitialQuery} />
    </footer>
  );
};

export default Footer;
