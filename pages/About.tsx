import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FACULTY } from '../constants';
import { 
  Users, 
  Award, 
  Globe, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Compass, 
  Briefcase, 
  GraduationCap, 
  ArrowRight, 
  MessageCircle,
  Coffee,
  Library,
  Languages,
  TrendingUp,
  Heart
} from 'lucide-react';
import { trackEvent } from '../src/lib/analytics';
import LeadershipTeam from '../components/LeadershipTeam';
import CampusPartnershipShowcase from '../components/CampusPartnershipShowcase';
import EnhancedStudentTestimonialsShowcase from '../components/EnhancedStudentTestimonialsShowcase';

const About: React.FC = () => {
  const educationalOrgSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Fuji Japanese Academy",
    "legalName": "FUJI JAPANESE ACADEMY PRIVATE LIMITED",
    "alternateName": "Fuji Japanese Language Institute",
    "url": "https://fujijapaneseacademy.com/about",
    "logo": "https://fujijapaneseacademy.com/og-image.jpg",
    "description": "Premier Japanese language academy in Electronic City, Bengaluru providing certified JLPT training, native Japanese sensei instruction, and corporate Japanese programs.",
    "foundingDate": "2015",
    "founder": [
      {
        "@type": "Person",
        "name": "Nagendra M",
        "jobTitle": "Founder & Managing Director"
      }
    ],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Electronic City, 06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura",
      "addressLocality": "Bengaluru",
      "addressRegion": "Karnataka",
      "postalCode": "560100",
      "addressCountry": "IN"
    },
    "sameAs": [
      "https://wa.me/916364924110"
    ]
  };

  return (
    <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
      <Helmet>
        <title>About Us | Native Faculty & Japanese Language School | Fuji Japanese Academy</title>
        <meta 
          name="description" 
          content="Discover Fuji Japanese Academy: Bengaluru's premier Japanese language institute since 2015. Certified native Japanese trainers, 98% JLPT pass record, and immersive Mini-Japan campus." 
        />
        <meta 
          name="keywords" 
          content="About Fuji Japanese Academy, Japanese language institute Bengaluru, Native Japanese teachers India, Learn Japanese Electronic City, JLPT coaching Bangalore" 
        />
        <link rel="canonical" href="https://fujijapaneseacademy.com/about" />
        <script type="application/ld+json">
          {JSON.stringify(educationalOrgSchema)}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative min-h-[560px] lg:min-h-[640px] flex items-center justify-center overflow-hidden bg-fuji-indigo text-white">
        <div className="absolute inset-0">
          <img
            src="/images/banners/about-hero-banner.jpg"
            alt="Japanese Garden and Pagoda"
            className="w-full h-full object-cover opacity-25 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-fuji-indigo via-fuji-indigo/90 to-fuji-indigo/70 mix-blend-multiply" />
          <div className="absolute -bottom-1 left-0 right-0 h-16 bg-gradient-to-t from-[#fafafc] to-transparent z-10" />
        </div>

        <div className="container mx-auto px-4 md:px-8 relative z-20 py-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs md:text-sm font-semibold tracking-wider uppercase mb-6">
              <span className="w-2 h-2 rounded-full bg-fuji-red animate-pulse" />
              富士日本語学院について • Established 2015 • Bengaluru
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold text-white mb-6 leading-[1.1] tracking-tight">
              Bridging Cultures, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuji-red via-rose-300 to-amber-300">
                Building Global Careers.
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-white/90 max-w-3xl font-light leading-relaxed border-l-4 border-fuji-red pl-6 mb-8">
              More than a language school. We are South India's premier gateway to Japan — combining native Japanese pedagogy, JLPT exam mastery, and corporate career acceleration.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/courses"
                className="px-7 py-3.5 bg-fuji-red hover:bg-red-600 text-white font-bold rounded-xl shadow-lg shadow-fuji-red/30 transition-all text-sm flex items-center gap-2"
              >
                Explore JLPT Courses <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/contact?demo=true"
                onClick={() => trackEvent('demo_class_booked', { source: 'about_hero_demo' })}
                className="px-7 py-3.5 bg-white/10 hover:bg-white/20 border border-white/25 text-white font-bold rounded-xl backdrop-blur-md transition-all text-sm flex items-center gap-2"
              >
                Book a Free Demo Class
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Statistics Strip */}
      <section className="container mx-auto px-4 md:px-8 -mt-10 relative z-30 mb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            { label: 'Successful Graduates', value: '2,400+', icon: Users, desc: 'Trained across N5 through N1' },
            { label: 'JLPT First-Attempt Pass', value: '98%', icon: Award, desc: 'Proven syllabus & mock tests' },
            { label: 'Certified Senseis', value: '100%', icon: GraduationCap, desc: 'Native & N1 certified faculty' },
            { label: 'Corporate Partners', value: '25+', icon: Globe, desc: 'Placements & Japanese MNCs' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="w-12 h-12 rounded-2xl bg-fuji-indigo/5 text-fuji-red flex items-center justify-center mb-4">
                <stat.icon className="w-6 h-6" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-extrabold text-fuji-indigo mb-1">
                {stat.value}
              </div>
              <div className="text-sm font-bold text-gray-800 mb-1">{stat.label}</div>
              <div className="text-xs text-gray-500 font-light">{stat.desc}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story & Electronic City Campus */}
      <section className="container mx-auto px-4 md:px-8 mb-28">
        <div className="flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          <div className="lg:w-1/2">
            <div className="relative">
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="/images/sections/classroom-story.jpg"
                  alt="Students learning Japanese in classroom"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Stat Badge */}
              <div className="absolute -bottom-6 -right-4 md:-right-6 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 hidden sm:flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-600 uppercase">Track Record</div>
                  <div className="text-base font-bold text-fuji-indigo">98% JLPT Success Rate</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-fuji-red/10 text-fuji-red text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Our Story & Purpose
            </span>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-fuji-indigo leading-tight">
              Authentic Japanese Learning <br />
              <span className="text-fuji-red">In The Heart of Bengaluru</span>
            </h2>

            <p className="text-base md:text-lg text-gray-600 font-normal leading-relaxed">
              Founded in <strong className="text-fuji-indigo font-bold">2015</strong> in Electronic City, Bengaluru, 
              Fuji Japanese Academy (operated by <strong className="text-fuji-indigo font-semibold">FUJI JAPANESE ACADEMY PRIVATE LIMITED</strong>) was built to solve a critical challenge: Indian engineers, students, and professionals 
              needed more than rote textbook grammar — they needed <strong className="text-fuji-indigo font-medium">real conversational confidence and workplace cultural competence</strong>.
            </p>

            <p className="text-base md:text-lg text-gray-600 font-normal leading-relaxed">
              We developed our signature immersive pedagogy under the guidance of native Tokyo instructors. Whether you are aiming to crack JLPT N5 in 3 months, move to Japan on an Engineer visa, or prepare for corporate interviews, our academy guides you every step of the way.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600 shrink-0">
                  <Compass className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-fuji-indigo text-sm">Our Mission</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-normal">Empowering learners with lifelong Japanese fluency, cultural nuance, and global career mobility.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-2xl bg-white border border-gray-100 shadow-sm">
                <div className="p-2 rounded-xl bg-red-50 text-fuji-red shrink-0">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-fuji-indigo text-sm">Career Focus</h4>
                  <p className="text-xs text-gray-500 mt-1 leading-normal">Bilingual resume preparation, Japanese corporate interview drills, and corporate tie-ups in Japan.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Japanese Cultural Philosophy & Core Values: Kaizen, Monozukuri, Omotenashi */}
      <section className="container mx-auto px-4 md:px-8 mb-28">
        <div className="bg-gradient-to-br from-slate-900 via-[#1b1742] to-slate-900 rounded-[2.5rem] p-8 md:p-14 text-white relative overflow-hidden shadow-2xl border border-white/10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-fuji-red/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto text-center mb-14">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-fuji-red" /> 日本の心 • Cultural Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mb-4">
              Rooted in Japanese Values: <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
                Kaizen, Monozukuri &amp; Omotenashi
              </span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg font-light leading-relaxed">
              We do not just teach vocabulary and grammar points; we instill timeless Japanese work ethics and philosophies that empower our graduates to succeed in corporate Tokyo and multinational Japanese enterprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
            {/* Kaizen */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-fuji-red/40 hover:bg-white/[0.08] transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-fuji-red/20 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-display font-black text-white/20 group-hover:text-rose-400/40 transition-colors select-none">
                    改善
                  </span>
                </div>
                <div className="text-xs uppercase tracking-widest text-rose-400 font-bold mb-1">Continuous Improvement</div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">Kaizen (改善)</h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed mb-4">
                  The philosophy of consistent, incremental growth. Learning Japanese can seem daunting, but mastering 3 Kanji and 5 expressions every single day creates unstoppable compound momentum towards JLPT certification.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-rose-300 font-medium">
                • Zero overwhelm: Daily habit loops and bite-sized mastery.
              </div>
            </div>

            {/* Monozukuri */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-amber-400/40 hover:bg-white/[0.08] transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-display font-black text-white/20 group-hover:text-amber-300/40 transition-colors select-none">
                    ものづくり
                  </span>
                </div>
                <div className="text-xs uppercase tracking-widest text-amber-300 font-bold mb-1">Craftsmanship &amp; Precision</div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">Monozukuri (ものづくり)</h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed mb-4">
                  The art and craftsmanship of creating with pride and precision. We treat Japanese language pedagogy with the exactitude of Japanese engineering — focusing on authentic stroke order (Hitsujun), pitch accent, and Keigo nuance.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-amber-200 font-medium">
                • Rigorous standards: Native pronunciation &amp; grammatical precision.
              </div>
            </div>

            {/* Omotenashi */}
            <div className="bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:border-emerald-400/40 hover:bg-white/[0.08] transition-all duration-300 group flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Heart className="w-6 h-6" />
                  </div>
                  <span className="text-3xl font-display font-black text-white/20 group-hover:text-emerald-300/40 transition-colors select-none">
                    おもてなし
                  </span>
                </div>
                <div className="text-xs uppercase tracking-widest text-emerald-300 font-bold mb-1">Dedicated Mentorship</div>
                <h3 className="text-2xl font-display font-bold text-white mb-3">Omotenashi (おもてなし)</h3>
                <p className="text-gray-300 text-sm font-light leading-relaxed mb-4">
                  Heartfelt care and unconditional student dedication. From free 1-on-1 doubt clearing and flexible class rescheduling to personalized Japanese resume (Rirekisho) reviews, our senseis support you far beyond the classroom door.
                </p>
              </div>
              <div className="pt-4 border-t border-white/10 text-xs text-emerald-200 font-medium">
                • Personal support: 1-on-1 counseling, interview drills &amp; career guidance.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The 'Mini-Japan' Campus Experience with Visual Photography */}
      <section className="bg-white py-28 border-y border-gray-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuji-red/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuji-indigo/10 text-fuji-indigo text-xs font-bold uppercase tracking-wider mb-4">
              <Coffee className="w-3.5 h-3.5 text-fuji-red" /> Cultural Immersion Center
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-fuji-indigo mb-4">
              Our "Mini-Japan" Campus Experience
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed">
              Language cannot be learned in isolation from culture. Our campus in Electronic City, Bengaluru is crafted to give students an authentic taste of Japanese daily life, workplace etiquette, and literature.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                image: '/images/sections/kanji-library.jpg',
                icon: Library,
                tag: 'Literature & Manga',
                title: '500+ Volume Kanji Library',
                desc: 'Graded Japanese readers, authentic manga, and official JLPT question papers from the past 15 years for all levels.'
              },
              {
                image: '/images/courses/business-japanese.jpg',
                icon: Briefcase,
                tag: 'Workplace Etiquette',
                title: 'Business Keigo Lab',
                desc: 'Simulated Tokyo boardroom roleplays where engineers practice formal greetings, Meishi card exchanges, and email composition.'
              },
              {
                image: '/images/courses/spoken-japanese.jpg',
                icon: Languages,
                tag: 'Active Speaking',
                title: 'Kaiwa Speaking Lounge',
                desc: 'Weekly conversation circles with native Japanese expats to break speech anxiety and build natural pronunciation cadence.'
              },
              {
                image: '/images/sections/cultural-workshops.jpg',
                icon: Sparkles,
                tag: 'Japanese Traditions',
                title: 'Cultural Workshops',
                desc: 'Hands-on calligraphy (Shodou), tea appreciation (Sadou), origami, and seasonal festivals like Tanabata right in Bengaluru.'
              }
            ].map((feature, idx) => (
              <div 
                key={idx}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col hover:-translate-y-2"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white/95 text-[11px] font-bold text-fuji-indigo shadow-sm uppercase tracking-wider flex items-center gap-1.5">
                      <feature.icon className="w-3 h-3 text-fuji-red" />
                      {feature.tag}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold font-display text-fuji-indigo mb-2 group-hover:text-fuji-red transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-xs md:text-sm leading-relaxed font-light">
                    {feature.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3-Pillar Methodology with Japanese Kanji Accents */}
      <section className="container mx-auto px-4 md:px-8 py-28 relative">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuji-red/10 text-fuji-red text-xs font-bold uppercase tracking-wider mb-4">
            <BookOpen className="w-3.5 h-3.5" /> Proven Academic Pedagogy
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-fuji-indigo mb-4">
            The 3-Pillar Fuji Methodology
          </h2>
          <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed">
            How our curriculum consistently achieves a 98% JLPT first-attempt pass rate year after year for college students and working IT engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              kanji: '一',
              step: 'Pillar 01',
              subtitle: '記憶の科学 • Memory Science',
              title: 'Spaced Repetition & Radical Science',
              desc: 'We decompose complex Kanji into intuitive semantic radicals rather than brute memorization. Flashcard spaced repetition ensures retention for life.',
              badge: 'Zero Rote Learning'
            },
            {
              kanji: '二',
              step: 'Pillar 02',
              subtitle: '即時会話 • Conversational Drills',
              title: 'Active Speaking from Day One',
              desc: 'No passive listening. Students speak in Japanese from their first lesson, practicing real workplace scenarios like standup syncs, inquiries, and dining.',
              badge: 'Confidence First'
            },
            {
              kanji: '三',
              step: 'Pillar 03',
              subtitle: '試験対策 • Exam Rigor',
              title: 'JLPT Rigor & Full Mock Tests',
              desc: 'Official timer-based mock exam sessions under authentic test conditions with granular error diagnosis in vocabulary, grammar, reading, and listening.',
              badge: '98% Pass Track'
            }
          ].map((pillar, idx) => (
            <div 
              key={idx}
              className="relative bg-white p-8 md:p-10 rounded-[2.5rem] shadow-sm hover:shadow-2xl border border-gray-100/90 transition-all duration-500 flex flex-col justify-between group hover:-translate-y-2 overflow-hidden"
            >
              <div className="absolute top-4 right-6 text-7xl font-display font-black text-gray-100 select-none pointer-events-none group-hover:text-fuji-red/10 transition-colors">
                {pillar.kanji}
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-extrabold text-fuji-red uppercase tracking-wider">
                    {pillar.step}
                  </span>
                  <span className="w-1 h-1 bg-gray-300 rounded-full" />
                  <span className="text-[11px] text-gray-400 font-medium">
                    {pillar.subtitle}
                  </span>
                </div>

                <h3 className="text-xl font-bold font-display text-fuji-indigo mb-3 group-hover:text-fuji-red transition-colors leading-snug">
                  {pillar.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed font-light mb-6">
                  {pillar.desc}
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="inline-block px-3 py-1 rounded-full bg-fuji-light text-fuji-indigo text-xs font-bold">
                  {pillar.badge}
                </span>
                <span className="text-fuji-red font-bold text-xs">Fuji Standard</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Institutional Leadership & Directorate */}
      <LeadershipTeam className="bg-slate-50/70 border-y border-slate-100 my-16" />

      {/* Faculty Showcase - Meet Your Sensei */}
      <section className="container mx-auto px-4 md:px-8 py-20 mb-20 bg-gradient-to-b from-transparent via-gray-50/50 to-transparent rounded-[3rem]">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuji-red/10 text-fuji-red text-xs font-bold uppercase tracking-wider mb-4">
            <GraduationCap className="w-3.5 h-3.5" /> Certified Instructors
          </span>
          <h2 className="text-4xl md:text-5xl font-display font-extrabold text-fuji-indigo mb-4">
            Meet Your Sensei
          </h2>
          <p className="text-base md:text-lg text-gray-600 font-light leading-relaxed">
            Our faculty combines native Japanese speakers from Tokyo and Osaka with certified N1 Indian educators. Learn authentic cadence and precise grammar with zero guesswork.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FACULTY.map((member, i) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[2.5rem] p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full group hover:-translate-y-2 relative overflow-hidden"
            >
              {/* Subtle top background highlight */}
              <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-fuji-red via-rose-400 to-fuji-indigo opacity-0 group-hover:opacity-100 transition-opacity" />

              {/* Profile Image with badge */}
              <div className="relative w-36 h-36 mx-auto mb-6">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-100 shadow-md group-hover:scale-105 transition-transform duration-500 bg-slate-100 flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.classList.add('bg-gradient-to-br', 'from-rose-50', 'to-indigo-50');
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-indigo-50 text-fuji-indigo">
                      <GraduationCap className="w-10 h-10 text-fuji-red mb-1" />
                      <span className="text-[11px] font-bold text-gray-700">{member.name}</span>
                    </div>
                  )}
                </div>
                {member.badge && (
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3.5 py-1 bg-gradient-to-r from-fuji-red to-red-600 text-white text-[11px] font-bold rounded-full shadow-md uppercase tracking-wider">
                    {member.badge}
                  </div>
                )}
              </div>

              {/* Name and Role */}
              <div className="text-center mb-4">
                <h3 className="text-2xl font-bold text-fuji-indigo font-display mb-1 group-hover:text-fuji-red transition-colors">
                  {member.name}
                </h3>
                <p className="text-fuji-red font-semibold text-xs tracking-wider uppercase">{member.role}</p>
              </div>

              {/* Specialty and Experience tags */}
              <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
                {member.experience && (
                  <span className="px-3 py-1 rounded-xl bg-gray-100 text-gray-700 text-xs font-semibold">
                    {member.experience}
                  </span>
                )}
                {member.specialty && (
                  <span className="px-3 py-1 rounded-xl bg-blue-50 text-blue-700 text-xs font-semibold">
                    {member.specialty}
                  </span>
                )}
              </div>

              {/* Full Bio - Permanently visible on all screens */}
              <p className="text-gray-600 text-sm leading-relaxed font-light text-center mt-auto border-t border-gray-100 pt-5">
                "{member.bio}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Campus Seminar & Orientation Spotlight: T. John College of Nursing, T. John PU College & V.E.T. First Grade College */}
      <section className="container mx-auto px-4 md:px-8 mb-24">
        <CampusPartnershipShowcase
          variant="full"
          showHeading={true}
          defaultCampusId="t-john-nursing"
        />
      </section>

      {/* Verified Student Success Stories & Testimonials Showcase */}
      <section className="container mx-auto px-4 md:px-8 mb-24">
        <EnhancedStudentTestimonialsShowcase />
      </section>

      {/* High-Converting Closing Call to Action */}
      <section className="container mx-auto px-4 md:px-8 pb-28">
        <div className="relative p-10 md:p-16 rounded-[3rem] bg-gradient-to-br from-fuji-indigo via-[#262362] to-slate-900 text-white text-center overflow-hidden shadow-2xl">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-fuji-red/25 rounded-full blur-[100px]" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px]" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md text-rose-300 text-xs font-bold uppercase tracking-wider border border-white/10">
              <Sparkles className="w-3.5 h-3.5 text-fuji-red" /> Start Your Journey Today
            </span>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white leading-tight">
              Ready to Speak Japanese With Confidence?
            </h2>

            <p className="text-white/80 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Join thousands of successful students and engineers. Book a free 1-on-1 counseling and trial session with our academic advisor.
            </p>

            <div className="flex flex-wrap justify-center items-center gap-4 pt-4">
              <Link
                to="/contact?demo=true"
                onClick={() => trackEvent('demo_class_booked', { source: 'about_bottom_cta' })}
                className="px-8 py-4 bg-gradient-to-r from-fuji-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-2xl shadow-xl shadow-fuji-red/30 transition-all text-base flex items-center gap-2"
              >
                Book a Free Demo Class <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="https://wa.me/916364924110?text=Hi%20Fuji%20Japanese%20Academy,%20I%20would%20like%20to%20know%20more%20about%20your%20courses."
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_whatsapp', { source: 'about_bottom_whatsapp' })}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl backdrop-blur-md transition-all text-base flex items-center gap-2"
              >
                <MessageCircle className="w-5 h-5 text-emerald-400" /> Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;

