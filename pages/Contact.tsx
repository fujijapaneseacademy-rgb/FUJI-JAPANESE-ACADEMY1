import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Mail, Phone, MapPin, Loader2, CheckCircle, AlertCircle,
  ExternalLink, Send, Star, Clock, MessageSquare, ShieldCheck,
  Calendar, ArrowRight, ChevronDown, ChevronUp, Sparkles, Building2,
  Compass, Laptop, Users, GraduationCap, Check, Plane
} from 'lucide-react';
import { submitToGoogleSheet } from '../services/formService';
import { trackEvent } from '../src/lib/analytics';

interface ContactProps {
  onOpenEnrollment?: (courseName?: string) => void;
}

const COURSE_OPTIONS = [
  { id: 'JLPT N5', label: 'JLPT N5 (Beginners)', badge: 'Most Popular' },
  { id: 'JLPT N4', label: 'JLPT N4 (Elementary)', badge: 'Fast-Track' },
  { id: 'JLPT N3', label: 'JLPT N3 (Intermediate)', badge: 'Job Ready' },
  { id: 'JLPT N2/N1', label: 'JLPT N2 / N1 (Advanced)', badge: 'Executive' },
  { id: 'Spoken Japanese', label: 'Spoken Japanese (Conversational)', badge: 'Zero Kanji' },
  { id: 'Corporate Training', label: 'Corporate & IT Training', badge: 'MNC Teams' },
];

const Contact: React.FC<ContactProps> = ({ onOpenEnrollment }) => {
  const [searchParams] = useSearchParams();
  const demoParam = searchParams.get('demo');
  const courseParam = searchParams.get('course');
  const modeParam = searchParams.get('mode');

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [wantsDemo, setWantsDemo] = useState(() => demoParam !== 'false');
  const [learningMode, setLearningMode] = useState<'online' | 'offline' | 'japan'>(() => {
    if (modeParam === 'offline' || modeParam === 'japan' || modeParam === 'online') return modeParam;
    return 'online';
  });
  const [selectedCourse, setSelectedCourse] = useState(() => {
    if (courseParam) {
      const cleanParam = courseParam.toLowerCase().replace(/[-_]/g, ' ');
      const match = COURSE_OPTIONS.find(c => {
        const cIdClean = c.id.toLowerCase().replace(/[-_]/g, ' ');
        const cLabelClean = c.label.toLowerCase().replace(/[-_]/g, ' ');
        return (
          cIdClean === cleanParam ||
          cLabelClean.includes(cleanParam) ||
          cleanParam.includes(cIdClean)
        );
      });
      if (match) return match.label;
    }
    return 'JLPT N5 (Beginners)';
  });
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');

    try {
      const modeText = learningMode === 'online' ? 'Online Live Classroom' : learningMode === 'japan' ? 'Japan Study / On-Shore Program (Tokyo & Partner Schools)' : 'Offline Bengaluru Campus';
      const inquiryMessage = wantsDemo
        ? `[Wants Free Demo Class: YES] [Preferred Mode: ${modeText}] ${formData.message}`
        : `[Preferred Mode: ${modeText}] ${formData.message}`;

      const success = await submitToGoogleSheet({
        formType: wantsDemo ? 'Demo Inquiry' : 'Contact',
        name: `${formData.firstName} ${formData.lastName}`.trim(),
        email: formData.email,
        phone: formData.phone,
        subject: selectedCourse,
        message: inquiryMessage
      });

      if (success) {
        setStatus('success');
        trackEvent('contact_form_submitted', {
          course_subject: selectedCourse,
          wants_demo: wantsDemo,
          learning_mode: learningMode
        });
        trackEvent('generate_lead', {
          mode: wantsDemo ? 'contact_demo' : 'contact_form',
          course: selectedCourse
        });
        setFormData({ firstName: '', lastName: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (e) {
      console.error(e);
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const ADMISSIONS_FAQS = [
    {
      q: 'How soon will a counselor contact me after submitting this form?',
      a: 'Our admissions counselors respond within 15 to 30 minutes during normal business hours (Mon–Sun, 9:00 AM – 9:00 PM IST) via WhatsApp or phone call with complete batch schedules and course fee structures.'
    },
    {
      q: 'What happens during the Free Demo Class?',
      a: 'You will attend a 45-minute live interactive session led by a certified native/N1 sensei. You will learn basic Japanese greetings (Aisatsu), pronunciation secrets, Hiragana origins, and experience our zero-rote teaching methodology firsthand.'
    },
    {
      q: 'Can I learn online if I live outside Bengaluru?',
      a: 'Yes! Over 60% of our active students learn via live interactive Zoom batches across India, the USA, and Europe. You get real-time speaking practice, recorded lecture archives, digital flashcards, and personalized doubt resolution.'
    },
    {
      q: 'Can I visit the Electronic City campus for an in-person consultation?',
      a: 'Absolutely! Our campus is located at Electronic City, 06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Karnataka 560100. You can walk in Monday through Sunday (9:00 AM – 7:30 PM) to explore our Japanese library, meet the faculty, and inspect study materials.'
    },
    {
      q: 'Do you offer placement assistance for jobs in Japan or Japanese MNCs in India?',
      a: 'Yes! We conduct corporate Keigo (business etiquette) training, bilingual Japanese resume writing workshops, and connect JLPT N3/N2 students directly with hiring partners and recruitment consultancies in Tokyo and Bengaluru.'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
      <Helmet>
        <title>Contact Admissions & Free Demo Class | Fuji Japanese Academy</title>
        <meta name="description" content="Get in touch with Fuji Japanese Academy. Book a free 1-on-1 Japanese demo class, inquire about JLPT N5-N1 batches, or visit our Electronic City campus in Bengaluru." />
        <link rel="canonical" href="https://fujijapaneseacademy.com/contact" />
      </Helmet>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-b from-fuji-indigo via-[#1d1945] to-[#12102e] text-white py-24 relative overflow-hidden">
        {/* Ambient Glows & Japanese Red Sun Motif */}
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-fuji-red/25 via-rose-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
        
        {/* Japanese Calligraphy Watermark */}
        <div className="absolute left-1/2 bottom-2 -translate-x-1/2 text-white/[0.03] text-8xl md:text-[12rem] font-display font-black select-none pointer-events-none tracking-widest leading-none">
          お問合せ
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-rose-300 text-xs font-bold border border-white/15 mb-6 uppercase tracking-[0.2em] backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-fuji-red" /> Admissions & Student Support
            </span>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
              Begin Your Journey to <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuji-red via-rose-300 to-amber-300">
                Japanese Fluency
              </span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-8">
              Have questions about course fees, batch schedules, or JLPT exams? Our bilingual senseis and counselors are ready to help you take the right step.
            </p>

            {/* Availability Badges */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-xs">
              <span className="inline-flex items-center gap-2 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 px-4 py-2 rounded-full backdrop-blur-md font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                Admissions Open &bull; Next Batches Start Monday
              </span>
              <span className="inline-flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2 rounded-full text-white/90 font-medium backdrop-blur-md">
                <Clock className="w-3.5 h-3.5 text-amber-300" />
                Counselor Helpline: 9:00 AM – 9:00 PM IST
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 4 Quick Connect Direct Action Cards */}
      <section className="container mx-auto px-4 md:px-6 -mt-10 relative z-20 mb-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
          
          {/* WhatsApp Direct */}
          <a
            href="https://wa.me/916364924110?text=Hi%20Fuji%20Japanese%20Academy,%20I%20am%20interested%20in%20learning%20Japanese%20and%20would%20like%20course%20details."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('click_whatsapp', { source: 'contact_page_card' })}
            className="group relative bg-white p-7 rounded-3xl shadow-premium hover:shadow-2xl transition-all duration-300 border border-gray-100/80 flex flex-col justify-between hover:-translate-y-1.5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[4rem] -z-0 group-hover:scale-110 transition-transform" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-[#25D366]/15 text-[#25D366] flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100/80 text-emerald-800 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                Fastest Response (&lt;15 mins)
              </div>
              <h3 className="font-display font-bold text-xl text-fuji-indigo group-hover:text-emerald-700 transition-colors">
                Chat on WhatsApp
              </h3>
              <p className="text-xs text-fuji-slate/70 mt-2 leading-relaxed font-light">
                Direct chat with student counselors for instantaneous fee quotes & batch times.
              </p>
            </div>
            <span className="relative z-10 mt-6 text-xs font-bold text-emerald-700 flex items-center gap-1 group-hover:gap-2 transition-all">
              Message Sensei on WhatsApp →
            </span>
          </a>

          {/* Phone Call */}
          <a
            href="tel:+916364924110"
            onClick={() => trackEvent('click_phone', { phone_number: '+916364924110' })}
            className="group relative bg-white p-7 rounded-3xl shadow-premium hover:shadow-2xl transition-all duration-300 border border-gray-100/80 flex flex-col justify-between hover:-translate-y-1.5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-rose-50 rounded-bl-[4rem] -z-0 group-hover:scale-110 transition-transform" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-fuji-red/15 text-fuji-red flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <Phone className="w-6 h-6" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-rose-100/80 text-rose-800 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                Direct Sensei Helpline
              </div>
              <h3 className="font-display font-bold text-xl text-fuji-indigo group-hover:text-fuji-red transition-colors">
                +91 63649 24110
              </h3>
              <p className="text-xs text-fuji-slate/70 mt-2 leading-relaxed font-light">
                Speak directly with our academic advisor for personalized level guidance.
              </p>
            </div>
            <span className="relative z-10 mt-6 text-xs font-bold text-fuji-red flex items-center gap-1 group-hover:gap-2 transition-all">
              Call Helpline Now →
            </span>
          </a>

          {/* Visit Campus */}
          <a
            href="https://share.google/JHpoZKsmxV9p22Exb"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative bg-white p-7 rounded-3xl shadow-premium hover:shadow-2xl transition-all duration-300 border border-gray-100/80 flex flex-col justify-between hover:-translate-y-1.5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-[4rem] -z-0 group-hover:scale-110 transition-transform" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <MapPin className="w-6 h-6" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-blue-100/80 text-blue-800 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                Bengaluru Center
              </div>
              <h3 className="font-display font-bold text-xl text-fuji-indigo group-hover:text-blue-600 transition-colors">
                Electronic City
              </h3>
              <p className="text-xs text-fuji-slate/70 mt-2 leading-relaxed font-light">
                Electronic City, 06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Karnataka 560100
              </p>
            </div>
            <span className="relative z-10 mt-6 text-xs font-bold text-blue-600 flex items-center gap-1 group-hover:gap-2 transition-all">
              Get Live Directions ↗
            </span>
          </a>

          {/* Email Support */}
          <a
            href="mailto:fujijapaneseacademy@gmail.com"
            className="group relative bg-white p-7 rounded-3xl shadow-premium hover:shadow-2xl transition-all duration-300 border border-gray-100/80 flex flex-col justify-between hover:-translate-y-1.5 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-24 h-24 bg-amber-50 rounded-bl-[4rem] -z-0 group-hover:scale-110 transition-transform" />
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
                <Mail className="w-6 h-6" />
              </div>
              <div className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100/80 text-amber-800 text-[10px] font-extrabold uppercase tracking-wider mb-2">
                Official Inquiries
              </div>
              <h3 className="font-display font-bold text-xl text-fuji-indigo group-hover:text-amber-600 transition-colors truncate">
                Email Admissions
              </h3>
              <p className="text-xs text-fuji-slate/70 mt-2 leading-relaxed font-light">
                Request institutional proposals, corporate brochures, or syllabus PDFs.
              </p>
            </div>
            <span className="relative z-10 mt-6 text-xs font-bold text-amber-600 flex items-center gap-1 group-hover:gap-2 transition-all">
              Send Email Inquiry →
            </span>
          </a>

        </div>
      </section>

      {/* Main Form & Location Section */}
      <div className="container mx-auto px-4 md:px-6 mb-24">
        <div className="grid lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-start">

          {/* Left Column: Campus Information & Interactive Map (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Campus Overview Card */}
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100 relative overflow-hidden">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-3 rounded-2xl bg-fuji-indigo/5 text-fuji-red">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Headquarters</span>
                  <h3 className="text-2xl font-display font-bold text-fuji-indigo">Bengaluru Center</h3>
                  <span className="text-xs font-semibold text-fuji-slate/75 block mt-0.5">FUJI JAPANESE ACADEMY PRIVATE LIMITED</span>
                </div>
              </div>

              <p className="text-sm text-fuji-slate/80 leading-relaxed mb-6 font-light">
                Designed to recreate an authentic Japanese classroom setting. Complete with audio-visual learning labs, a Japanese library, and comfortable air-conditioned study spaces.
              </p>

              <div className="space-y-4 text-xs text-fuji-slate/80 pb-6 border-b border-gray-100">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-fuji-red flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-fuji-indigo block mb-0.5">Physical Campus Address</span>
                    <span className="leading-relaxed">Electronic City, 06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Karnataka 560100</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-fuji-indigo flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-fuji-indigo block mb-0.5">Campus Visiting Hours</span>
                    <span>Monday to Sunday: 9:00 AM – 7:30 PM IST</span>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Star className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5 fill-current" />
                  <div>
                    <span className="font-bold text-fuji-indigo block mb-0.5">Student Rating</span>
                    <span>4.9 / 5 Stars based on 348+ verified Google reviews</span>
                  </div>
                </div>
              </div>

              {/* Google Review Link Button */}
              <div className="pt-6">
                <a
                  href="https://share.google/JtUmZJn5W7Undf9Ir"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-gray-50 hover:bg-fuji-indigo hover:text-white transition-all rounded-2xl font-bold text-xs text-fuji-indigo flex items-center justify-center gap-2 border border-gray-200 group shadow-sm"
                >
                  <div className="flex text-amber-400">
                    {'★'.repeat(5)}
                  </div>
                  <span>Read 348+ Google Reviews ↗</span>
                </a>
              </div>
            </div>

            {/* Interactive Google Map Card */}
            <div className="bg-white rounded-[2.5rem] p-3 shadow-sm border border-gray-100 overflow-hidden">
              <div className="h-72 w-full rounded-2xl overflow-hidden relative border border-gray-100">
                <iframe
                  width="100%"
                  height="100%"
                  title="Fuji Japanese Academy Electronic City Location"
                  className="w-full h-full border-0"
                  loading="lazy"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.9862834736987!2d77.6347608!3d12.8441623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6bf43bc8eb9b%3A0x77a9e4f6869d6f11!2sFUJI+JAPANESE+ACADEMY!5e0!3m2!1sen!2sin"
                />
                <div className="absolute bottom-3 right-3">
                  <a
                    href="https://share.google/JHpoZKsmxV9p22Exb"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-1.5 bg-white/95 text-fuji-indigo hover:bg-fuji-red hover:text-white transition-all rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 backdrop-blur-md"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Open Maps
                  </a>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Premium Inquiry & Demo Booking Studio (7 Cols) */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-premium border border-gray-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-fuji-red/10 to-transparent rounded-full blur-3xl pointer-events-none" />

              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-100 text-emerald-600 shadow-inner">
                    <CheckCircle className="w-10 h-10" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 block mb-2">🎌 Arigatou Gozaimasu!</span>
                  <h3 className="text-3xl font-display font-bold text-fuji-indigo mb-4">Inquiry Received</h3>
                  <p className="text-fuji-slate/70 mb-8 max-w-md mx-auto text-sm leading-relaxed font-light">
                    Thank you for reaching out to Fuji Japanese Academy. Our admissions sensei will review your preferences and connect with you via WhatsApp/phone within 15–30 minutes.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      type="button"
                      onClick={() => setStatus('idle')}
                      className="px-6 py-3.5 bg-fuji-indigo text-white font-bold rounded-xl hover:bg-slate-900 transition-all text-sm cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                    <a
                      href="https://wa.me/916364924110"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-all text-sm flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" /> Chat on WhatsApp Now
                    </a>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Top Segmented Mode Selector: Demo Class vs General Inquiry */}
                  <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-fuji-red block mb-1">
                          Admissions & Consultation
                        </span>
                        <h2 className="text-2xl sm:text-3xl font-display font-bold text-fuji-indigo">
                          {wantsDemo ? 'Book a Free Trial Demo Class' : 'General Course Inquiry'}
                        </h2>
                      </div>
                    </div>

                    {/* Dual-Mode Toggle Bar */}
                    <div className="grid grid-cols-2 p-1.5 bg-gray-100 rounded-2xl gap-1">
                      <button
                        type="button"
                        onClick={() => setWantsDemo(true)}
                        className={`py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                          wantsDemo
                            ? 'bg-white text-fuji-indigo shadow-md'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        <GraduationCap className="w-4 h-4 text-fuji-red" />
                        <span>Free Demo Class</span>
                        <span className="hidden sm:inline-block px-2 py-0.5 text-[10px] bg-emerald-100 text-emerald-800 rounded-full font-extrabold">
                          FREE
                        </span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setWantsDemo(false)}
                        className={`py-3 px-4 rounded-xl text-xs md:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
                          !wantsDemo
                            ? 'bg-white text-fuji-indigo shadow-md'
                            : 'text-gray-500 hover:text-gray-900'
                        }`}
                      >
                        <MessageSquare className="w-4 h-4 text-fuji-indigo" />
                        <span>Course Inquiry</span>
                      </button>
                    </div>
                  </div>

                  {status === 'error' && (
                    <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                        <span>Could not submit inquiry right now. Please try again or reach us directly on WhatsApp.</span>
                      </div>
                      <a
                        href={`https://wa.me/916364924110?text=Hi%20Fuji%20Japanese%20Academy,%20I%20am%20trying%20to%20inquire%20about%20${encodeURIComponent(selectedCourse)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs shrink-0 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> Chat on WhatsApp
                      </a>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    
                    {/* Preferred Learning Mode Chips */}
                    <div>
                      <label className="text-xs font-bold text-fuji-indigo block mb-2">
                        1. Preferred Learning Mode *
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <button
                          type="button"
                          onClick={() => setLearningMode('online')}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                            learningMode === 'online'
                              ? 'border-fuji-indigo bg-fuji-indigo/5 text-fuji-indigo shadow-sm'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <div className={`p-2 rounded-xl ${learningMode === 'online' ? 'bg-fuji-indigo text-white' : 'bg-gray-100 text-gray-500'}`}>
                            <Laptop className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold block">Live Online Classroom</span>
                            <span className="text-[11px] text-gray-500">Zoom &bull; Pan-India</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setLearningMode('offline')}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                            learningMode === 'offline'
                              ? 'border-fuji-indigo bg-fuji-indigo/5 text-fuji-indigo shadow-sm'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <div className={`p-2 rounded-xl ${learningMode === 'offline' ? 'bg-fuji-indigo text-white' : 'bg-gray-100 text-gray-500'}`}>
                            <Building2 className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold block">Bengaluru Campus (Offline)</span>
                            <span className="text-[11px] text-gray-500">Electronic City Phase-1</span>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => setLearningMode('japan')}
                          className={`p-3.5 rounded-2xl border text-left transition-all flex items-center gap-3 ${
                            learningMode === 'japan'
                              ? 'border-fuji-indigo bg-fuji-indigo/5 text-fuji-indigo shadow-sm'
                              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                          }`}
                        >
                          <div className={`p-2 rounded-xl ${learningMode === 'japan' ? 'bg-fuji-indigo text-white' : 'bg-gray-100 text-gray-500'}`}>
                            <Plane className="w-4 h-4" />
                          </div>
                          <div>
                            <span className="text-xs font-bold block">Japan Study / On-Shore</span>
                            <span className="text-[11px] text-gray-500">Tokyo &amp; Partner Pathways</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Course Level Selection Chips */}
                    <div>
                      <label className="text-xs font-bold text-fuji-indigo block mb-2">
                        2. Target Level / Course *
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                        {COURSE_OPTIONS.map((c) => {
                          const isSelected = selectedCourse === c.label;
                          return (
                            <button
                              key={c.id}
                              type="button"
                              onClick={() => setSelectedCourse(c.label)}
                              className={`p-3 rounded-2xl border text-left transition-all relative ${
                                isSelected
                                  ? 'border-fuji-red bg-rose-50/50 text-fuji-indigo shadow-sm ring-1 ring-fuji-red'
                                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold">{c.id}</span>
                                {isSelected && <Check className="w-3.5 h-3.5 text-fuji-red" />}
                              </div>
                              <span className="text-[10px] text-gray-500 truncate block mt-0.5">{c.badge}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Personal Details */}
                    <div>
                      <label className="text-xs font-bold text-fuji-indigo block mb-2">
                        3. Your Contact Information *
                      </label>
                      <div className="space-y-3">
                        <div className="grid sm:grid-cols-2 gap-3">
                          <input
                            required
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-gray-50/70 rounded-2xl font-medium text-sm text-fuji-indigo border border-gray-200 focus:bg-white focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 focus:outline-none transition-all placeholder:text-gray-400"
                            placeholder="First Name *"
                          />
                          <input
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-gray-50/70 rounded-2xl font-medium text-sm text-fuji-indigo border border-gray-200 focus:bg-white focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 focus:outline-none transition-all placeholder:text-gray-400"
                            placeholder="Last Name"
                          />
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3">
                          <input
                            required
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-gray-50/70 rounded-2xl font-medium text-sm text-fuji-indigo border border-gray-200 focus:bg-white focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 focus:outline-none transition-all placeholder:text-gray-400"
                            placeholder="Email Address *"
                          />
                          <input
                            required
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full px-4 py-3.5 bg-gray-50/70 rounded-2xl font-medium text-sm text-fuji-indigo border border-gray-200 focus:bg-white focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 focus:outline-none transition-all placeholder:text-gray-400"
                            placeholder="Phone / WhatsApp Number *"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Message Area */}
                    <div>
                      <label className="text-xs font-bold text-fuji-indigo block mb-2">
                        4. Specific Goals or Questions (Optional)
                      </label>
                      <textarea
                        rows={2}
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50/70 rounded-2xl font-medium text-sm text-fuji-indigo border border-gray-200 focus:bg-white focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 focus:outline-none transition-all placeholder:text-gray-400 resize-none"
                        placeholder="e.g. Planning for Dec JLPT, weekend batch preferred, need corporate invoice..."
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full py-4 px-6 bg-gradient-to-r from-fuji-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-2xl shadow-xl shadow-fuji-red/25 transition-all flex items-center justify-center gap-2 disabled:opacity-70 text-base active:scale-98"
                    >
                      {status === 'submitting' ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" /> Submitting Request...
                        </>
                      ) : (
                        <>
                          {wantsDemo ? 'Confirm Free Demo Booking' : 'Submit Course Inquiry'} <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>

                    {/* Trust Privacy Note */}
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-1 text-[11px] text-gray-500">
                      <span className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                        100% Privacy Protected
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-blue-600" />
                        Instant WhatsApp Confirmation
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                        Free 30-min Level Assessment
                      </span>
                    </div>

                  </form>
                </>
              )}

            </div>
          </div>

        </div>
      </div>

      {/* Admissions FAQ Accordion Section */}
      <section className="container mx-auto px-4 md:px-6 max-w-4xl pb-24 border-t border-gray-200 pt-16">
        <div className="text-center mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-fuji-red block mb-1">Admissions Clarity</span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-fuji-indigo">Frequently Asked Questions</h2>
          <p className="text-sm text-gray-500 font-light mt-1">Everything you need to know before joining your first Japanese batch.</p>
        </div>

        <div className="space-y-3.5">
          {ADMISSIONS_FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div key={idx} className="bg-white rounded-3xl border border-gray-200/80 shadow-sm overflow-hidden transition-all">
                <button
                  type="button"
                  onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left font-bold text-base text-fuji-indigo flex items-center justify-between gap-4 hover:bg-gray-50/50 transition-colors cursor-pointer"
                >
                  <span className="pr-4">{faq.q}</span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${isOpen ? 'bg-fuji-indigo text-white' : 'bg-gray-100 text-gray-600'}`}>
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="px-6 pb-6 text-sm text-fuji-slate/80 leading-relaxed border-t border-gray-100 pt-4 font-light"
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};

export default Contact;
