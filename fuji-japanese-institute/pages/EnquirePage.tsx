import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Sparkles, CheckCircle2, ShieldCheck, Clock, Users, Award,
  PhoneCall, MessageSquare, ArrowRight, Loader2, Star,
  HelpCircle, ChevronDown, ChevronUp, Laptop, MapPin
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { submitToGoogleSheet } from '../services/formService';
import { trackEvent } from '../src/lib/analytics';

const EnquirePage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const preselectedCourse = searchParams.get('course') || 'JLPT N5 (Beginner Foundation)';

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    course: preselectedCourse,
    mode: 'Online Live Batches',
    timing: 'Weekend Batches (Sat & Sun)',
    experience: 'Complete Beginner (Zero Japanese)',
    goals: '',
    honeypot: '' // spam trap
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // Silent discard for bots

    setStatus('submitting');

    try {
      const utmSource = searchParams.get('utm_source') || 'direct';
      const utmCampaign = searchParams.get('utm_campaign') || '';

      const compositeMessage = `[Enquiry Form]
Preferred Mode: ${formData.mode}
Preferred Timing: ${formData.timing}
Current Level: ${formData.experience}
City: ${formData.city || 'Not provided'}
UTM: source=${utmSource}, campaign=${utmCampaign}
Goals/Notes: ${formData.goals || 'None provided'}`;

      const success = await submitToGoogleSheet({
        formType: 'Dedicated Admissions Enquiry',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        subject: formData.course,
        message: compositeMessage
      });

      if (success) {
        setStatus('success');
        trackEvent('enquiry_form_submitted', {
          course: formData.course,
          mode: formData.mode,
          timing: formData.timing
        });
        trackEvent('generate_lead', {
          mode: 'admissions_enquiry',
          course: formData.course
        });
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  const ENQUIRY_FAQS = [
    {
      q: 'What will happen during the free trial session?',
      a: 'You will attend a live 45-minute demo with an experienced Sensei. You will learn foundational Japanese greetings, pronunciation basics, understand how characters work, and receive a customized JLPT roadmap tailored to your schedule and goals.'
    },
    {
      q: 'Can I switch between online and offline classes?',
      a: 'Yes! We offer hybrid flexibility. If you enroll in the Bengaluru Electronic City classroom batch and need to travel or work from home, you can seamlessly attend the live online stream without missing a single class.'
    },
    {
      q: 'Are class recordings provided if I miss a lecture?',
      a: 'Yes, every live lecture is recorded in high definition and made available on the student dashboard within 24 hours, along with PDFs, flashcards, and homework worksheets.'
    },
    {
      q: 'How do you prepare students for corporate IT jobs in Japan?',
      a: 'Beyond JLPT grammar and vocabulary, we train students in IT vocabulary (Jira, GitHub, agile standups), Japanese business email etiquette (Keigo), and Japanese resume writing (Rirekisho) with interview practice.'
    }
  ];

  return (
    <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
      <Helmet>
        <title>Book a Free Japanese Demo Class &amp; Course Counseling | Fuji Japanese Academy</title>
        <meta
          name="description"
          content="Reserve your seat for a 1-on-1 Japanese demo class with Fuji Japanese Academy. Explore JLPT N5-N1 courses, live online &amp; Bengaluru classroom batches."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://fujijapaneseacademy.com/enquire" />
      </Helmet>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-fuji-indigo via-[#1d1945] to-[#12102e] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute top-0 right-10 w-96 h-96 rounded-full bg-fuji-red/15 blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-6">
              <Sparkles className="w-4 h-4 text-amber-300" /> Free 1-on-1 Counseling &amp; Live Demo
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight tracking-tight mb-4">
              Begin Your Japanese Journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200">Certified Senseis</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
              Book a 100% free demo session. Experience our zero-rote learning method, inspect curriculum materials, and map out your path to JLPT certification &amp; career success in Japan.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 mt-8 text-xs md:text-sm text-gray-300">
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> 100% Free • No Commitment
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Small Batches (10–12 Students)
              </span>
              <span className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Bengaluru Campus &amp; Live Online
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs items={[{ label: 'Admissions & Demo Booking', path: '/enquire' }]} className="mb-8" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Counseling Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-gray-100">
              {status === 'success' ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-10"
                >
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h2 className="text-2xl font-bold font-display text-fuji-indigo mb-2">
                    Arigatou Gozaimasu! (ありがとうございます)
                  </h2>
                  <p className="text-fuji-slate/80 text-base mb-6 max-w-md mx-auto">
                    Your demo class seat request has been registered! Our senior academic counselor will connect with you on WhatsApp/Call within <strong>2 hours</strong> to confirm batch timing.
                  </p>

                  <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 text-left text-sm text-amber-900 mb-6">
                    <p className="font-semibold mb-1">Need urgent confirmation?</p>
                    <p className="text-xs text-amber-800">
                      Message our admissions helpline directly on WhatsApp for instant seat reservation and syllabus downloads.
                    </p>
                    <a
                      href="https://wa.me/916364924110?text=Hi%20Fuji%20Academy%2C%20I%20just%20submitted%20my%20demo%20booking%20and%20would%20like%20quick%20confirmation!"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-3 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-medium text-xs shadow transition-all"
                    >
                      <MessageSquare className="w-4 h-4" /> Chat on WhatsApp Now
                    </a>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setStatus('idle');
                      setFormData({
                        name: '',
                        phone: '',
                        email: '',
                        city: '',
                        course: preselectedCourse,
                        mode: 'Online Live Batches',
                        timing: 'Weekend Batches (Sat & Sun)',
                        experience: 'Complete Beginner (Zero Japanese)',
                        goals: '',
                        honeypot: ''
                      });
                    }}
                    className="text-sm font-semibold text-fuji-indigo hover:text-fuji-red underline"
                  >
                    Submit another inquiry
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-gray-100 pb-4 mb-4">
                    <h2 className="text-2xl font-display font-bold text-fuji-indigo">
                      Reserve Your Free Demo Class
                    </h2>
                    <p className="text-xs md:text-sm text-fuji-slate/70 mt-1">
                      Fill out this quick form and our academic team will confirm your preferred schedule.
                    </p>
                  </div>

                  {/* Honeypot */}
                  <input
                    type="text"
                    name="honeypot"
                    value={formData.honeypot}
                    onChange={handleChange}
                    className="hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  {/* Name & Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-fuji-slate/80 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Rahul Sharma"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuji-red/20 focus:border-fuji-red transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-fuji-slate/80 mb-1.5">
                        WhatsApp Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuji-red/20 focus:border-fuji-red transition-all"
                      />
                    </div>
                  </div>

                  {/* Email & City */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-fuji-slate/80 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@domain.com"
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuji-red/20 focus:border-fuji-red transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-fuji-slate/80 mb-1.5">
                        Your City / Location
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        placeholder="e.g. Bengaluru, Hyderabad, Pune..."
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuji-red/20 focus:border-fuji-red transition-all"
                      />
                    </div>
                  </div>

                  {/* Target Course */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-fuji-slate/80 mb-1.5">
                      Interested Course *
                    </label>
                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuji-red/20 focus:border-fuji-red transition-all"
                    >
                      <option value="JLPT N5 (Beginner Foundation)">JLPT N5 (Beginners Foundation)</option>
                      <option value="JLPT N4 (Elementary Proficiency)">JLPT N4 (Elementary Proficiency)</option>
                      <option value="JLPT N3 (Intermediate Business)">JLPT N3 (Intermediate &amp; Career Benchmark)</option>
                      <option value="JLPT N2 (Advanced Corporate)">JLPT N2 (Advanced Corporate Fluency)</option>
                      <option value="JLPT N1 (Mastery Level)">JLPT N1 (Mastery &amp; Interpretation)</option>
                      <option value="Spoken Japanese (Conversational)">Spoken Japanese (Conversational / No Kanji)</option>
                      <option value="Business Japanese &amp; Corporate Etiquette">Business Japanese &amp; Corporate Etiquette</option>
                      <option value="Japanese for IT Professionals">Japanese for IT Professionals &amp; Engineers</option>
                      <option value="Corporate Enterprise Training">Corporate Enterprise Training (B2B)</option>
                    </select>
                  </div>

                  {/* Mode & Timing */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-fuji-slate/80 mb-1.5">
                        Learning Mode *
                      </label>
                      <select
                        name="mode"
                        value={formData.mode}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuji-red/20 focus:border-fuji-red transition-all"
                      >
                        <option value="Live Online Classroom (Zoom)">Live Online Classroom (Zoom)</option>
                        <option value="Bengaluru Campus (Offline - Electronic City)">Bengaluru Campus (Offline - Electronic City)</option>
                        <option value="Japan Study / On-Shore Program (Tokyo & Partner Schools)">Japan Study / On-Shore Program (Tokyo & Partner Schools)</option>
                        <option value="Hybrid (Classroom + Online recordings)">Hybrid (Classroom + Online recordings)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-fuji-slate/80 mb-1.5">
                        Preferred Batch Timing
                      </label>
                      <select
                        name="timing"
                        value={formData.timing}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuji-red/20 focus:border-fuji-red transition-all"
                      >
                        <option value="Weekend Batches (Sat & Sun)">Weekend Batches (Sat &amp; Sun)</option>
                        <option value="Weekday Evening (Mon, Wed, Fri)">Weekday Evening (Mon, Wed, Fri)</option>
                        <option value="Sunday Intensive Batch">Sunday Intensive (1 Day / Week)</option>
                        <option value="Flexible / Either Works">Flexible / Either Works</option>
                      </select>
                    </div>
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-fuji-slate/80 mb-1.5">
                      Prior Japanese Knowledge
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuji-red/20 focus:border-fuji-red transition-all"
                    >
                      <option value="Complete Beginner (Zero Japanese)">Complete Beginner (Zero Japanese knowledge)</option>
                      <option value="Know Basic Hiragana/Katakana">Know basic Hiragana / Katakana scripts</option>
                      <option value="Completed N5 / Preparing N4">Completed N5 or preparing for N4</option>
                      <option value="Completed N4 / Preparing N3+">Completed N4 or preparing for N3/N2</option>
                    </select>
                  </div>

                  {/* Notes / Questions */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-fuji-slate/80 mb-1.5">
                      Your Goals or Questions (Optional)
                    </label>
                    <textarea
                      name="goals"
                      rows={3}
                      value={formData.goals}
                      onChange={handleChange}
                      placeholder="e.g. Preparing for SSW visa / Targeting Tokyo IT job / Anime enthusiast..."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuji-red/20 focus:border-fuji-red transition-all resize-none"
                    />
                  </div>

                  {status === 'error' && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-center gap-2">
                      An error occurred while submitting your request. Please message us directly on WhatsApp at +91 63649 24110.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full py-4 px-6 bg-fuji-red hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-fuji-red/25 flex items-center justify-center gap-2 text-base transition-all disabled:opacity-70 active:scale-[0.99]"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" /> Reserving Demo Seat...
                      </>
                    ) : (
                      <>
                        Confirm Free Demo Booking <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-fuji-slate/60">
                    🔒 We respect your privacy. Zero spam. Your phone number is only used to coordinate your demo class link.
                  </p>
                </form>
              )}
            </div>

            {/* Right Column: Why Fuji & Trust Badges */}
            <div className="lg:col-span-5 space-y-6">
              {/* Trust Card */}
              <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
                <h3 className="font-display font-bold text-xl text-fuji-indigo mb-4 flex items-center gap-2">
                  <Award className="w-5 h-5 text-fuji-red" /> Why Learn with Fuji Academy?
                </h3>
                <ul className="space-y-4 text-sm text-fuji-slate/80">
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-50 text-fuji-red flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Star className="w-3.5 h-3.5 fill-current" />
                    </div>
                    <div>
                      <strong className="text-fuji-indigo block">98% First-Attempt Pass Rate</strong>
                      Rigorous mock test series modeled on official JLPT format with past paper discussions.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-50 text-fuji-red flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Users className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-fuji-indigo block">Small Batch Size (10–12 Students)</strong>
                      Every student participates in daily speaking drills and receives individual homework correction.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-50 text-fuji-red flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Laptop className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-fuji-indigo block">Lifetime Dashboard Access</strong>
                      Recorded lectures, vocabulary flashcards, kanji workbooks, and mock quizzes accessible 24/7.
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-red-50 text-fuji-red flex items-center justify-center flex-shrink-0 mt-0.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <strong className="text-fuji-indigo block">Corporate Job Placement Assistance</strong>
                      Direct interview referrals with Japanese companies and bilingual IT recruitment consultancies.
                    </div>
                  </li>
                </ul>
              </div>

              {/* Direct Help Banner */}
              <div className="bg-gradient-to-br from-fuji-indigo to-[#191638] text-white rounded-3xl p-6 md:p-8 shadow-md relative overflow-hidden">
                <div className="relative z-10">
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-300">Need Immediate Help?</span>
                  <h4 className="text-xl font-bold font-display text-white mt-1 mb-2">Speak to a Senior Counselor</h4>
                  <p className="text-xs text-gray-300 mb-6 leading-relaxed">
                    Have questions about syllabus, exam fee, or SSW visa requirements? Call or WhatsApp our Bengaluru admissions desk directly.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:+916364924110"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-fuji-indigo font-bold text-xs hover:bg-gray-100 transition-all shadow"
                    >
                      <PhoneCall className="w-3.5 h-3.5 text-fuji-red" /> +91 63649 24110
                    </a>
                    <a
                      href="https://wa.me/916364924110"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-all shadow"
                    >
                      <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Desk
                    </a>
                  </div>
                </div>
              </div>

              {/* Campus Address Card */}
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 text-xs text-fuji-slate/70">
                <div className="flex items-center gap-2 font-bold text-fuji-indigo text-sm mb-1">
                  <MapPin className="w-4 h-4 text-fuji-red" /> Bengaluru Campus
                </div>
                <p>
                  Electronic City, 06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Karnataka 560100
                </p>
                <p className="mt-2 text-[11px] text-fuji-slate/50">
                  Visiting Hours: Mon–Sun, 9:00 AM – 7:30 PM IST
                </p>
              </div>
            </div>
          </div>

          {/* Admissions FAQs */}
          <div className="mt-16 max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-fuji-indigo">
                Frequently Asked Admissions Questions
              </h2>
              <p className="text-xs md:text-sm text-fuji-slate/70 mt-1">
                Everything you need to know about demo sessions and starting classes.
              </p>
            </div>

            <div className="space-y-3">
              {ENQUIRY_FAQS.map((faq, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm transition-all"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-sm md:text-base text-fuji-indigo hover:text-fuji-red transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 flex-shrink-0 text-fuji-red" />
                    ) : (
                      <ChevronDown className="w-4 h-4 flex-shrink-0 text-gray-400" />
                    )}
                  </button>

                  {openFaq === idx && (
                    <div className="px-5 pb-5 text-xs md:text-sm text-fuji-slate/80 leading-relaxed border-t border-gray-50 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EnquirePage;
