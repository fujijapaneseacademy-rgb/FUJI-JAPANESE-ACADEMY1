
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink, Link } from 'react-router-dom';
import {
  ArrowRight, Star, CheckCircle, Play, Globe, Award, BookOpen, Users,
  Gift, Clock, Briefcase, ChevronRight, ChevronLeft, Laptop, Building2,
  GraduationCap, Compass, Plane, TrendingUp, Sparkles, Sprout,
  Volume2, HelpCircle, MapPin, ExternalLink, CheckCircle2, XCircle,
  MessageSquare, Phone, ShieldCheck, ChevronDown, ChevronUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { COURSES, TESTIMONIALS } from '../constants';
import { cn } from '../lib/utils';
import CourseFinderWidget from '../components/CourseFinderWidget';
import WordOfTheDayWidget from '../components/WordOfTheDayWidget';
import BatchCountdownTimer from '../components/BatchCountdownTimer';
import HeroSlider from '../components/HeroSlider';
import JlptCareerQuiz from '../components/JlptCareerQuiz';
import BatchScheduleTable from '../components/BatchScheduleTable';
import JapanROICalculator from '../components/JapanROICalculator';
import PanIndiaLocationDirectory from '../components/PanIndiaLocationDirectory';
import SyllabusDownloadModal from '../components/SyllabusDownloadModal';
import TiltCard from '../components/TiltCard';
import LeadershipTeam from '../components/LeadershipTeam';
import CampusPartnershipShowcase from '../components/CampusPartnershipShowcase';
import { getJobApplyMailto } from '../data/jobsData';
import DailyStudyResourceHub from '../components/DailyStudyResourceHub';
import EnhancedStudentTestimonialsShowcase from '../components/EnhancedStudentTestimonialsShowcase';
import InteractiveFaqSearchAccordion from '../components/InteractiveFaqSearchAccordion';
import JlptDiagnosticPlacementQuiz from '../components/JlptDiagnosticPlacementQuiz';
interface HomeProps {
  onOpenEnrollment: (courseName?: string) => void;
}

const HERO_IMAGES = [
  "/images/hero/fuji-hero-mount-fuji-spring.jpg",
  "/images/hero/fuji-hero-tokyo-skyline.jpg",
  "/images/hero/fuji-hero-torii-shrine.jpg",
  "/images/hero/fuji-hero-kyoto-bamboo.jpg",
];

const ToriiGateIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M2 5c4-.8 16-.8 20 0v2c-3.5-.6-16.5-.6-20 0V5z" />
    <path d="M4 8.5h16v1.8H4z" />
    <path d="M6.5 8.5h2.2v12H6.5zM15.3 8.5h2.2v12h-2.2z" />
    <path d="M11 7h2v3.5h-2z" />
  </svg>
);

const JapaneseFanIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 1.54.36 2.98.97 4.29L12 21.5l9.03-5.21C21.64 14.98 22 13.54 22 12c0-5.52-4.48-10-10-10zm-1 3.12c1.78-.1 3.53.25 5.12.98L12 17.25 7.88 6.1c.98-.45 2.03-.76 3.12-.98zM4.73 8.86l4.24 7.35L4.1 13.5c.13-1.68.73-3.23 1.63-4.64zm14.54 0c.9 1.41 1.5 2.96 1.63 4.64l-4.87 2.71 4.24-7.35z" />
  </svg>
);

const HankoSealBadge: React.FC<{ className?: string }> = ({ className = "" }) => (
  <div className={cn("relative w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 flex items-center justify-center select-none group", className)}>
    <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-[#c8102e] via-[#d90429] to-[#ef233c] shadow-xl shadow-red-500/25 transform rotate-[-4deg] group-hover:rotate-0 transition-transform duration-300 flex items-center justify-center p-2.5 border-2 border-dashed border-white/50">
      <div className="w-full h-full rounded-full border border-white/60 flex flex-col items-center justify-center text-center text-white px-2 py-1">
        <span className="text-[9px] uppercase font-bold tracking-widest text-white/80 leading-none mb-1">FUJI SPIRIT</span>
        <span className="font-display font-bold text-xs sm:text-sm leading-tight text-white drop-shadow">
          More Than<br />a Language
        </span>
        <span className="text-[10px] sm:text-[11px] font-display italic text-amber-200 mt-1 leading-none font-medium">
          A Brighter You
        </span>
      </div>
    </div>
  </div>
);

const KANA_PREVIEWS = [
  { char: 'あ', romaji: 'a', word: 'Arigatou', meaning: 'Thank you' },
  { char: 'い', romaji: 'i', word: 'Inu', meaning: 'Dog' },
  { char: 'う', romaji: 'u', word: 'Umi', meaning: 'Ocean' },
  { char: 'え', romaji: 'e', word: 'Eki', meaning: 'Station' },
  { char: 'お', romaji: 'o', word: 'Ocha', meaning: 'Tea' },
  { char: 'か', romaji: 'ka', word: 'Kawaii', meaning: 'Cute' },
  { char: 'さ', romaji: 'sa', word: 'Sakura', meaning: 'Cherry Blossom' },
  { char: 'た', romaji: 'ta', word: 'Tokyo', meaning: 'Capital' },
  { char: 'な', romaji: 'na', word: 'Nihon', meaning: 'Japan' },
  { char: 'は', romaji: 'ha', word: 'Hana', meaning: 'Flower' },
];

const COMPARISON_ROWS = [
  {
    feature: "Instructor Credentials",
    fuji: "100% Native Japanese Sensei & JLPT N1 Certified Indian Educators",
    generic: "Often junior or uncertified part-time tutors",
    apps: "Zero live teachers; automated robotic voices"
  },
  {
    feature: "Bilingual Pedagogy",
    fuji: "Explanations in Japanese + English + Hindi + Kannada for absolute clarity",
    generic: "Strict English-only; confuses grammatical nuances",
    apps: "Direct machine translation without context"
  },
  {
    feature: "Batch Size & Attention",
    fuji: "Small cohorts (10–12 students max) with daily 1-on-1 speaking drills",
    generic: "35–50 students in crowded lecture rooms",
    apps: "Completely isolated; no conversation practice"
  },
  {
    feature: "First-Attempt Pass Rate",
    fuji: "98% Pass Rate with 4–8 full simulated timer mock tests",
    generic: "~50% average pass rate; limited test series",
    apps: "<20% course completion; no exam benchmark"
  },
  {
    feature: "Tokyo Career & Visa Guidance",
    fuji: "Direct Tokyo IT referrals, Japanese Resume (Rirekisho) & interview prep",
    generic: "Grammar-only coaching with zero placement help",
    apps: "None"
  },
  {
    feature: "Learning Environment",
    fuji: "Physical Bengaluru Campus (Electronic City) + Live Interactive Zoom",
    generic: "Rigid offline-only or pre-recorded videos",
    apps: "Screen-time only on smartphone"
  }
];

const HOME_FAQS = [
  {
    q: "Which is the best Japanese language institute in Bangalore?",
    a: "Fuji Japanese Academy is Bangalore's premier Japanese language school, featuring certified native Japanese trainers, high JLPT pass rates across N5 through N1, physical classrooms in Electronic City Phase 1, and live interactive Zoom batches across India."
  },
  {
    q: "How long does it take to learn Japanese and clear JLPT N5?",
    a: "At Fuji Japanese Academy, our structured JLPT N5 foundation course takes approximately 3 months (70+ hours of live training), covering Hiragana, Katakana, 103 Kanji, essential vocabulary, and official mock tests."
  },
  {
    q: "Are online Japanese classes as effective as classroom coaching?",
    a: "Yes! Our live online batches feature interactive breakout rooms, real-time speaking drills with native teachers, digital whiteboards, instant doubt clearing, and lifetime access to HD class recordings."
  },
  {
    q: "Can learning Japanese help Indian software engineers get jobs in Japan?",
    a: "Yes, clearing JLPT N3 or N2 opens high-paying software engineering, bilingual project management, and data science opportunities in Tokyo and across Japan, with starting packages between 6M and 12M JPY and full visa sponsorship."
  },
  {
    q: "Where can I take Japanese classes near Electronic City, Koramangala, and Whitefield?",
    a: "Fuji Japanese Academy has a physical classroom center at Vittasandra Cross, Electronic City Phase 1, and dedicated hybrid & online cohorts tailored for professionals in Koramangala, Indiranagar, and Whitefield."
  },
  {
    q: "What study materials, textbooks, and mock tests are provided with the courses?",
    a: "Every enrolled student receives complete digital and physical JLPT study packages, curated Kanji stroke-order workbooks, Minna no Nihongo reference guides, audio listening drills, and 4 to 8 full-length simulated mock exams with personal instructor feedback."
  },
  {
    q: "Can I attend a free demo session before paying the course fee?",
    a: "Absolutely! We offer a 100% free, 45-minute live demo class where you can meet your sensei, experience our intuitive teaching methodology, ask questions about batch timings, and receive a personalized learning roadmap."
  }
];

const HOME_TESTIMONIALS = [
  {
    name: "Aditya Raj",
    role: "Senior Software Engineer (Placed at Rakuten, Tokyo)",
    scoreBadge: "JLPT N3 Certified • 168 / 180 Points",
    avatar: "/images/avatars/alumni-karthik.jpg",
    content: "Fuji Academy was the catalyst for my move to Japan. Hiroshi Sensei and Priya Sensei helped me crack N3 in my very first attempt while training me for Tokyo tech interviews. The small batch size meant I spoke Japanese in every single class."
  },
  {
    name: "Sneha Gupta",
    role: "Computer Science Graduate, Bengaluru",
    scoreBadge: "JLPT N5 Certified • 174 / 180 Points",
    avatar: "/images/testimonials/sneha-gupta.jpg",
    content: "I started with zero knowledge of Japanese script. In just 3 months, I mastered Hiragana, Katakana, and over 100 Kanji. The weekend batch fit perfectly with my engineering college schedule, and the mock exams felt identical to the actual JLPT!"
  },
  {
    name: "Rohit Deshpande",
    role: "Bilingual IT Technical Lead, Electronic City",
    scoreBadge: "JLPT N2 Certified • 154 / 180 Points",
    avatar: "/images/avatars/alumni-rohit.jpg",
    content: "The Business Keigo and IT engineering module gave me the exact vocabulary I needed for client standup meetings with our Tokyo stakeholders. Fuji Academy is hands down the best Japanese institute in Bengaluru."
  },
  {
    name: "Ananya Deshmukh",
    role: "Healthcare & Hospitality Specialist",
    scoreBadge: "JLPT N4 Certified • 165 / 180 Points",
    avatar: "/images/avatars/alumni-ananya.jpg",
    content: "My goal was clearing JLPT N4 for the Specified Skilled Worker (SSW) visa program. The senseis coached me patiently on listening comprehension and conversational nuance. Passed on first try!"
  }
];

const Home: React.FC<HomeProps> = ({ onOpenEnrollment }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'n5' | 'n4' | 'n3' | 'n2' | 'spoken'>('all');
  const [expandedCourseSyllabus, setExpandedCourseSyllabus] = useState<string | null>(null);
  const [playingKana, setPlayingKana] = useState<string | null>(null);
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [isSyllabusModalOpen, setIsSyllabusModalOpen] = useState(false);
  const [selectedSyllabusLevel, setSelectedSyllabusLevel] = useState('JLPT N5 Foundation');

  const playJapaneseKana = (kana: string) => {
    setPlayingKana(kana);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(kana);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.8;
        utterance.onend = () => setPlayingKana(null);
        utterance.onerror = () => setPlayingKana(null);
        window.speechSynthesis.speak(utterance);
      } catch {
        setPlayingKana(null);
      }
    } else {
      setTimeout(() => setPlayingKana(null), 800);
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      <Helmet>
        <title>Top Japanese Language Institute in India, Bengaluru & Japan | Offline & Online Classes | Fuji Japanese Academy</title>
        <meta name="description" content="Ranked among the top Japanese language institutions in India & Japan. Fuji Japanese Academy offers offline classroom coaching in Bengaluru, live online JLPT N5–N1 classes across India (Chennai, Hyderabad, Mumbai, Palakkad, Kerala & all states), and direct Study & Work in Japan placement." />
        <meta name="keywords" content="Japanese language course near me, JLPT N5 N4 N3 training, Learn Japanese India, Study in Japan, Jobs in Japan for Indians" />
        <link rel="canonical" href="https://fujijapaneseacademy.com/" />
        {/* Preload hero image */}
        <link
          rel="preload"
          as="image"
          href="/images/hero-slider/slide-1-institutional.jpg"
          fetchPriority="high"
        />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "Which is the best Japanese language institute in Bangalore?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Fuji Japanese Academy is Bangalore's premier Japanese language school, featuring certified native Japanese trainers, high JLPT pass rates across N5 through N1, physical classrooms in Electronic City Phase 1, and live interactive Zoom batches across India."
                }
              },
              {
                "@type": "Question",
                "name": "How long does it take to learn Japanese and clear JLPT N5?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "At Fuji Japanese Academy, our structured JLPT N5 foundation course takes approximately 3 months (70+ hours of live training), covering Hiragana, Katakana, 103 Kanji, essential vocabulary, and official mock tests."
                }
              },
              {
                "@type": "Question",
                "name": "Are online Japanese classes as effective as classroom coaching?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! Our live online batches feature interactive breakout rooms, real-time speaking drills with native teachers, digital whiteboards, instant doubt clearing, and lifetime access to HD class recordings."
                }
              },
              {
                "@type": "Question",
                "name": "Can learning Japanese help Indian software engineers get jobs in Japan?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, clearing JLPT N3 or N2 opens high-paying software engineering, bilingual project management, and data science opportunities in Tokyo and across Japan, with starting packages between 6M and 12M JPY and full visa sponsorship."
                }
              },
              {
                "@type": "Question",
                "name": "Where can I take Japanese classes near Electronic City, Koramangala, and Whitefield?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Fuji Japanese Academy has a physical classroom center at Vittasandra Cross, Electronic City Phase 1, and dedicated hybrid & online cohorts tailored for professionals in Koramangala, Indiranagar, and Whitefield."
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* 1. HERO SECTION - Full Interactive Carousel Banner */}
      <HeroSlider onOpenEnrollment={onOpenEnrollment} />

      {/* 2. FLOATING VALUE METRICS BAR */}
    <section className="relative z-30 mt-6 sm:mt-8 md:mt-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="bg-[#FAF8F5] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#EDE6D9] p-5 sm:p-6 lg:p-7 grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 divide-y sm:divide-y-0 divide-[#EADFCB] relative overflow-hidden">
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#D90429] via-[#EF233C] to-[#C8102E]" />
          
          {/* Metric 1 */}
          <div className="flex items-center gap-3.5 sm:gap-4 pt-2 sm:pt-0">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-50 text-fuji-red flex items-center justify-center flex-shrink-0 shadow-sm">
              <Users className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 leading-tight">2,400+</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-snug sm:whitespace-nowrap mt-0.5 font-medium">Certified Scholars</p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="flex items-center gap-3.5 sm:gap-4 pt-2 sm:pt-0 sm:border-l sm:border-gray-200/80 sm:pl-3 lg:pl-5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-50 text-fuji-red flex items-center justify-center flex-shrink-0 shadow-sm">
              <Award className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 leading-tight">98.4%</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-snug sm:whitespace-nowrap mt-0.5 font-medium">First-Attempt JLPT Pass Rate</p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="flex items-center gap-3.5 sm:gap-4 pt-2 sm:pt-0 lg:border-l lg:border-gray-200/80 lg:pl-5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-50 text-fuji-red flex items-center justify-center flex-shrink-0 shadow-sm">
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h4 className="font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 leading-tight">150+</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-snug sm:whitespace-nowrap mt-0.5 font-medium">Corporate Batches Trained</p>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="flex items-center gap-3.5 sm:gap-4 pt-2 sm:pt-0 sm:border-l sm:border-gray-200/80 sm:pl-3 lg:pl-5">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-red-50 text-fuji-red flex items-center justify-center flex-shrink-0 shadow-sm">
              <Star className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-fuji-red" />
            </div>
            <div>
              <h4 className="font-extrabold text-base sm:text-lg md:text-xl lg:text-2xl text-gray-900 leading-tight">4.9/5</h4>
              <p className="text-xs sm:text-sm text-gray-600 leading-snug sm:whitespace-nowrap mt-0.5 font-medium">Star Rating</p>
            </div>
          </div>

        </div>
      </div>
    </section>

    <div className="container mx-auto px-4 md:px-6 relative z-20 mt-8 mb-4">
      <div className="flex flex-col lg:flex-row gap-8 items-start justify-center mb-8">
        <div className="w-full lg:w-1/3">
          <WordOfTheDayWidget />
        </div>
        <div className="w-full lg:w-2/3">
          <BatchCountdownTimer onEnroll={onOpenEnrollment} />
        </div>
      </div>
      <DailyStudyResourceHub />
    </div>

      {/* 3. JLPT COURSE MATRIX SECTION - Interactive Card Grids & Syllabus Preview */}
      <section id="courses-section" className="py-20 md:py-28 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-fuji-red text-xs font-bold uppercase tracking-wider mb-3 border border-red-100">
                <BookOpen className="w-3.5 h-3.5" /> JLPT Certification &amp; Career Matrix
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 leading-tight">
                Choose Your Japanese<br />Learning Pathway
              </h2>
              <p className="text-sm md:text-base text-gray-500 mt-2 max-w-xl">
                Structured curriculum from zero basics (JLPT N5) to business fluency (N2/N1) and tech engineering careers.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <NavLink
                to="/courses"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fuji-indigo text-white hover:bg-fuji-red text-xs sm:text-sm font-bold transition-all shadow-md active:scale-95"
              >
                <span>View All 9 Programs</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>

          {/* Interactive Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 mb-10 pb-2 border-b border-gray-100">
            {[
              { id: 'all', label: 'All Courses' },
              { id: 'n5', label: 'JLPT N5 (Beginners)' },
              { id: 'n4', label: 'JLPT N4 (Elementary)' },
              { id: 'n3', label: 'JLPT N3 (Intermediate)' },
              { id: 'n2', label: 'JLPT N2 / N1 (Advanced)' },
              { id: 'spoken', label: 'Spoken, IT & Corporate' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={cn(
                  "px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer border",
                  activeTab === tab.id
                    ? "bg-fuji-red text-white border-fuji-red shadow-md scale-102"
                    : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-white hover:border-gray-300"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Course Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {COURSES.filter(c => {
              if (activeTab === 'all') return true;
              if (activeTab === 'n5') return c.slug === 'jlpt-n5';
              if (activeTab === 'n4') return c.slug === 'jlpt-n4';
              if (activeTab === 'n3') return c.slug === 'jlpt-n3';
              if (activeTab === 'n2') return c.slug === 'jlpt-n2' || c.slug === 'jlpt-n1';
              if (activeTab === 'spoken') return ['spoken-japanese', 'business-japanese', 'japanese-for-it-professionals', 'corporate-japanese-training'].includes(c.slug || '');
              return true;
            }).map((course) => {
              const isSyllabusOpen = expandedCourseSyllabus === course.id;

              return (
                <TiltCard key={course.id} washiStyle shuiroAccent maxTilt={6} scale={1.018} className="rounded-3xl h-full">
                  <div

                  className="group bg-[#FAF8F5]/90 rounded-3xl border border-[#EDE6D9] hover:border-[#D90429]/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between overflow-hidden h-full"
                >
                  <div>
                    {/* Course Banner Visual */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <img
                        src={course.image}
                        alt={`${course.title} - Fuji Japanese Academy`}
                        width="400"
                        height="192"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = '/images/courses/jlpt-n5.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                          {course.jlptLevel || 'Special'}
                        </span>
                        {course.badge && (
                          <span className="px-2.5 py-1 rounded-full bg-fuji-red text-white text-[10px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5" />
                            {course.badge}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 text-white text-xs font-semibold flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-300" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6">
                      <NavLink to={`/courses/${course.slug || course.id}`}>
                        <h3 className="text-xl font-display font-bold text-gray-900 mb-2 group-hover:text-fuji-red transition-colors">
                          {course.title}
                        </h3>
                      </NavLink>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4 line-clamp-2">
                        {course.description}
                      </p>

                      {/* Course Metric Highlights */}
                      <div className="grid grid-cols-2 gap-2 p-3 bg-gray-50 rounded-2xl mb-4 text-[11px]">
                        <div>
                          <span className="text-gray-400 block font-medium">Kanji Target</span>
                          <span className="font-bold text-gray-800">{course.kanjiCount?.split(' ')[0] || '100+'} Kanji</span>
                        </div>
                        <div>
                          <span className="text-gray-400 block font-medium">Learning Mode</span>
                          <span className="font-bold text-gray-800">Online &amp; Classroom</span>
                        </div>
                      </div>
                      
                      {/* Price Display */}
                      <div className="flex items-center gap-2 mb-4">
                        {course.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                        <span className="text-2xl font-bold text-fuji-red">{course.price}</span>
                        {course.discountPercent && (
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            {course.discountPercent}% OFF
                          </span>
                        )}
                      </div>

                      {/* Key Features List */}
                      <div className="space-y-1.5 mb-5">
                        {course.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>

                      {/* Expandable Syllabus Preview */}
                      {course.syllabus && course.syllabus.length > 0 && (
                        <div className="border-t border-gray-100 pt-3">
                          <button
                            type="button"
                            onClick={() => setExpandedCourseSyllabus(isSyllabusOpen ? null : course.id)}
                            className="w-full flex items-center justify-between text-xs font-bold text-fuji-indigo hover:text-fuji-red py-1 transition-colors cursor-pointer"
                            aria-expanded={isSyllabusOpen}
                          >
                            <span className="flex items-center gap-1.5">
                              <BookOpen className="w-3.5 h-3.5 text-fuji-red" />
                              {isSyllabusOpen ? 'Hide Syllabus Preview' : 'Preview Syllabus Modules'}
                            </span>
                            {isSyllabusOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </button>

                          <AnimatePresence>
                            {isSyllabusOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                className="mt-3 pt-3 border-t border-gray-100 space-y-2.5 overflow-hidden text-xs"
                              >
                                {course.syllabus.slice(0, 3).map((mod, modIdx) => (
                                  <div key={modIdx} className="bg-gray-50/70 p-2.5 rounded-xl border border-gray-100">
                                    <div className="font-bold text-fuji-indigo text-[11px] mb-0.5">{mod.title}</div>
                                    <p className="text-[10px] text-gray-500 leading-tight font-light">{mod.description}</p>
                                  </div>
                                ))}
                                <NavLink
                                  to={`/courses/${course.slug || course.id}`}
                                  className="text-[11px] text-fuji-red font-bold hover:underline block pt-1"
                                >
                                  View all {course.syllabus.length} modules →
                                </NavLink>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-6 pt-0">
                    <div className="flex items-center gap-2">
                      <NavLink
                        to={`/courses/${course.slug || course.id}`}
                        className="flex-1 py-2.5 px-3 text-center rounded-xl border border-gray-200 text-gray-800 font-bold text-xs hover:border-fuji-indigo hover:text-fuji-indigo transition-colors"
                      >
                        Syllabus
                      </NavLink>
                      <button
                        type="button"
                        onClick={() => onOpenEnrollment()}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-fuji-red hover:bg-red-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
                      >
                        <span>Enroll Now</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                </TiltCard>
              );
            })}
          </div>

          {/* Quick link to view all & Download Syllabus */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <NavLink
              to="/courses"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-bold transition-all shadow-sm"
            >
              <span>Explore All 9 Language &amp; Corporate Offerings</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
            <button
              type="button"
              onClick={() => {
                setSelectedSyllabusLevel('JLPT N5 Foundation');
                setIsSyllabusModalOpen(true);
              }}
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-sm font-bold transition-all shadow-md shadow-red-600/30 cursor-pointer"
            >
              <span>Download N5–N1 Syllabus &amp; Fee PDF</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Live Batch Schedule Table */}
        <div className="container mx-auto px-4 md:px-6 pt-10">
          <BatchScheduleTable onReserveSeat={(batch) => onOpenEnrollment()} />
        </div>
      </section>

      {/* 4. CORPORATE TRAINING SECTION - Sleek Dark Slate Banner */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-slate-950 via-[#151a2d] to-slate-950 text-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
            {/* Ambient Red Blur */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-fuji-red/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              {/* Left Video Thumbnail Card */}
              <div className="lg:col-span-5 flex justify-center lg:justify-start">
                <div
                  onClick={onOpenEnrollment}
                  className="relative rounded-2xl overflow-hidden shadow-2xl border border-white/15 group cursor-pointer aspect-video w-full max-w-md bg-slate-800"
                >
                  <img
                    src="/images/corporate-video-thumb.png"
                    alt="Corporate Japanese Training at Fuji Academy"
                    width="448"
                    height="252"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-4 group-hover:bg-black/30 transition-colors">
                    <div className="w-12 h-12 rounded-full bg-white text-fuji-red flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                    <span className="text-white text-xs font-semibold mt-2.5 drop-shadow">
                      Watch Our Story (1 Min)
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Content */}
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-bold text-white tracking-tight leading-snug">
                  Corporate Training<br className="hidden sm:inline" /> for a Global Workforce
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed max-w-xl font-light">
                  Customized Japanese language programs for your team. Improve communication, bridge cross-border engineering workflows, and create global opportunities.
                </p>

                <div className="pt-2 flex flex-wrap items-center gap-4">
                  <NavLink
                    to="/career/japanese-for-it"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/30 hover:border-white text-white font-bold text-sm hover:bg-white hover:text-slate-900 transition-all active:scale-95"
                  >
                    <span>Know More</span>
                    <ArrowRight className="w-4 h-4" />
                  </NavLink>

                  <button
                    type="button"
                    onClick={onOpenEnrollment}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-fuji-red hover:bg-fuji-darkRed text-white font-bold text-sm shadow-md transition-all active:scale-95"
                  >
                    <span>Request Corporate Proposal</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE FUJI? - 5 Circular Badges + Red Hanko Seal Stamp */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-rose-50/20 to-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Title */}
            <div className="lg:w-1/4 text-center lg:text-left">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-gray-900 leading-tight">
                Why<br className="hidden lg:inline" /> Choose Fuji?
              </h2>
              <div className="w-12 h-1 bg-fuji-red mt-3 rounded-full mx-auto lg:mx-0" />
            </div>

            {/* Middle 5 Circular Badges */}
            <div className="lg:w-2/4 grid grid-cols-2 sm:grid-cols-5 gap-6 text-center">
              
              {/* Feature 1 */}
              <div className="flex flex-col items-center space-y-2 group">
                <div className="w-14 h-14 rounded-full bg-rose-50 text-fuji-red border border-rose-200/80 flex items-center justify-center group-hover:bg-fuji-red group-hover:text-white transition-all duration-300 shadow-sm">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-gray-800 leading-tight">Practical &amp; Real-World Learning</h4>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center space-y-2 group">
                <div className="w-14 h-14 rounded-full bg-rose-50 text-fuji-red border border-rose-200/80 flex items-center justify-center group-hover:bg-fuji-red group-hover:text-white transition-all duration-300 shadow-sm">
                  <Users className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-gray-800 leading-tight">Small Batch Sizes</h4>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center space-y-2 group">
                <div className="w-14 h-14 rounded-full bg-rose-50 text-fuji-red border border-rose-200/80 flex items-center justify-center group-hover:bg-fuji-red group-hover:text-white transition-all duration-300 shadow-sm">
                  <Laptop className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-gray-800 leading-tight">Flexible Learning Options</h4>
              </div>

              {/* Feature 4 */}
              <div className="flex flex-col items-center space-y-2 group">
                <div className="w-14 h-14 rounded-full bg-rose-50 text-fuji-red border border-rose-200/80 flex items-center justify-center group-hover:bg-fuji-red group-hover:text-white transition-all duration-300 shadow-sm">
                  <Compass className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-gray-800 leading-tight">Career Guidance</h4>
              </div>

              {/* Feature 5 */}
              <div className="flex flex-col items-center space-y-2 group col-span-2 sm:col-span-1">
                <div className="w-14 h-14 rounded-full bg-rose-50 text-fuji-red border border-rose-200/80 flex items-center justify-center group-hover:bg-fuji-red group-hover:text-white transition-all duration-300 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <h4 className="text-xs font-bold text-gray-800 leading-tight">Proven Track Record</h4>
              </div>

            </div>

            {/* Right Hanko Seal Badge */}
            <div className="lg:w-1/4 flex justify-center lg:justify-end">
              <HankoSealBadge />
            </div>

          </div>

          {/* Institutional Comparison Table */}
          <div className="mt-16 pt-12 border-t border-rose-100/60">
            <div className="text-center max-w-3xl mx-auto mb-10">
              <span className="text-fuji-red font-bold text-xs uppercase tracking-widest block mb-2">
                ACADEMY BENCHMARK
              </span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-gray-900">
                Why Ambitious Learners Choose Fuji Over Others
              </h3>
              <p className="text-sm text-gray-500 mt-2 font-light">
                See how our native-led pedagogy compares against conventional classroom centers and self-study mobile apps.
              </p>
            </div>

            {/* Desktop / Tablet Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50/80">
                    <th className="p-5 font-bold text-sm text-gray-700 w-1/4">Key Features &amp; Criteria</th>
                    <th className="p-5 font-extrabold text-sm text-white bg-gradient-to-r from-fuji-red to-red-600 w-1/3 shadow-sm">
                      <div className="flex items-center gap-1.5">
                        <Sparkles className="w-4 h-4" />
                        <span>Fuji Japanese Academy</span>
                      </div>
                    </th>
                    <th className="p-5 font-bold text-sm text-gray-600 w-1/4">Conventional Institutes</th>
                    <th className="p-5 font-bold text-sm text-gray-400 w-1/5">Self-Study Apps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50/40"}>
                      <td className="p-5 font-bold text-gray-900">{row.feature}</td>
                      <td className="p-5 font-semibold text-gray-900 bg-rose-50/40 border-x border-rose-100">
                        <div className="flex items-start gap-2 text-fuji-red">
                          <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-fuji-red" />
                          <span className="text-gray-900">{row.fuji}</span>
                        </div>
                      </td>
                      <td className="p-5 text-gray-600">
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 flex-shrink-0" />
                          <span>{row.generic}</span>
                        </div>
                      </td>
                      <td className="p-5 text-gray-400 font-light">
                        <div className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-gray-300 mt-2 flex-shrink-0" />
                          <span>{row.apps}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Responsive Cards */}
            <div className="md:hidden space-y-4">
              {COMPARISON_ROWS.map((row, idx) => (
                <div key={idx} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3">
                  <h4 className="font-bold text-sm text-gray-900 pb-2 border-b border-gray-100">{row.feature}</h4>
                  <div className="p-3 bg-rose-50/70 rounded-xl border border-rose-100">
                    <span className="text-[10px] font-bold text-fuji-red uppercase tracking-wider block mb-1">
                      Fuji Japanese Academy
                    </span>
                    <p className="text-xs font-semibold text-gray-900">{row.fuji}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                    <div>
                      <span className="text-gray-400 block font-medium">Other Institutes:</span>
                      <span className="text-gray-600">{row.generic}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block font-medium">Apps:</span>
                      <span className="text-gray-400">{row.apps}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. INSPIRATIONAL QUOTE & GLOBAL PATHWAYS BANNER */}
      <section className="relative py-14 bg-gradient-to-r from-rose-50/50 via-white to-rose-50/50 border-y border-rose-100 overflow-hidden">
        {/* Background Side Accents: Torii Gate on Left, Pagoda on Right */}
        <div className="absolute top-0 left-0 h-full w-44 pointer-events-none opacity-40 hidden sm:block">
          <img
            src="/images/torii-left.png"
            alt="Japanese Torii Gate Decorative Accent"
            width="176"
            height="200"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-left"
          />
        </div>
        <div className="absolute top-0 right-0 h-full w-28 pointer-events-none opacity-40 hidden sm:block">
          <img
            src="/images/pagoda-right.png"
            alt="Japanese Pagoda Decorative Accent"
            width="112"
            height="200"
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover object-right"
          />
        </div>

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Quote on Left */}
            <div className="flex items-start gap-4 max-w-xl text-center lg:text-left">
              <span className="text-4xl sm:text-5xl font-serif text-fuji-red leading-none select-none">“</span>
              <div>
                <blockquote className="text-lg sm:text-xl md:text-2xl font-display font-bold text-gray-900 leading-snug">
                  Language connects people. Opportunities change lives.
                </blockquote>
                <p className="text-xs sm:text-sm font-semibold text-gray-500 mt-1.5">
                  — Fuji Japanese Academy
                </p>
              </div>
            </div>

            {/* 4 Pathway Pillars on Right */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 items-center text-center">
              
              <div className="flex flex-col items-center space-y-1.5 group">
                <Plane className="w-6 h-6 text-gray-700 group-hover:text-fuji-red group-hover:-translate-y-0.5 transition-all" />
                <span className="text-xs font-bold text-gray-800">Study in Japan</span>
              </div>

              <div className="flex flex-col items-center space-y-1.5 group">
                <Briefcase className="w-6 h-6 text-gray-700 group-hover:text-fuji-red group-hover:-translate-y-0.5 transition-all" />
                <span className="text-xs font-bold text-gray-800">Work Opportunities</span>
              </div>

              <div className="flex flex-col items-center space-y-1.5 group">
                <BookOpen className="w-6 h-6 text-gray-700 group-hover:text-fuji-red group-hover:-translate-y-0.5 transition-all" />
                <span className="text-xs font-bold text-gray-800">Cultural Understanding</span>
              </div>

              <div className="flex flex-col items-center space-y-1.5 group">
                <TrendingUp className="w-6 h-6 text-gray-700 group-hover:text-fuji-red group-hover:-translate-y-0.5 transition-all" />
                <span className="text-xs font-bold text-gray-800">Personal Growth</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* 7. LATEST UPDATES / BATCH ANNOUNCEMENTS */}
      <section className="py-12 bg-gradient-to-b from-rose-50/20 to-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-gradient-to-r from-fuji-indigo via-[#232042] to-fuji-indigo rounded-[2.5rem] p-8 md:p-12 shadow-premium relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 border border-white/10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuji-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
            
            <div className="relative z-10 flex-1">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuji-red/20 text-rose-300 text-xs font-bold border border-fuji-red/30 mb-5 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-fuji-red animate-pulse" />
                Latest Updates
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-white mb-3 leading-tight">
                🌟 Enroll Now: Fresh Batches Starting Soon!
              </h2>
              <p className="text-white/80 text-sm sm:text-base mb-6 max-w-2xl font-light leading-relaxed">
                Begin your journey to mastering the Japanese language with Fuji Japanese Academy. Whether you are aiming for higher education, a career in Japan, or simply love the culture, our expert-led sessions are designed for your success.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-5 text-white">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-white/10 rounded-xl shrink-0">
                    <Clock className="w-5 h-5 text-fuji-red" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white/60 uppercase tracking-wider">Available Timings</h4>
                    <p className="font-medium text-sm">
                      Mon – Sun: 9:00 AM – 7:30 PM IST<br />
                      Weekday &amp; Weekend Flexible Batches
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="p-2.5 bg-white/10 rounded-xl shrink-0">
                    <Award className="w-5 h-5 text-fuji-red" />
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white/60 uppercase tracking-wider">Target Levels &amp; Mode</h4>
                    <p className="font-medium text-sm">
                      JLPT N5, N4, N3, N2 &amp; Business<br />
                      Online / Offline / Hybrid
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative z-10 shrink-0 text-center md:text-right bg-white/10 p-6 sm:p-8 rounded-3xl border border-white/15 backdrop-blur-md w-full md:w-auto">
              <p className="text-white/80 text-sm font-semibold mb-1">Upcoming Batches:</p>
              <p className="text-2xl sm:text-3xl font-display font-bold text-amber-300 mb-5">Admissions Open Weekly</p>
              <button
                type="button"
                onClick={onOpenEnrollment}
                className="w-full px-7 py-3.5 bg-fuji-red text-white rounded-full font-bold text-sm sm:text-base hover:bg-fuji-darkRed transition-all shadow-lg shadow-fuji-red/30 flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>Click Here to Register</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <p className="text-white/80 text-xs mt-3">
                Or call our direct hotline: <a href="tel:+916364924110" className="text-white font-bold hover:underline">+91 63649 24110</a>
              </p>
              <p className="text-amber-300 text-xs font-bold mt-1.5 animate-pulse">
                • Limited Seats per Batch for 1-on-1 Focus
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Learn Japanese - Japan Opportunities */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <span className="text-fuji-red font-bold tracking-widest uppercase text-sm mb-4 block">Why Learn Japanese?</span>
            <h2 className="text-4xl md:text-5xl font-bold text-fuji-indigo font-display leading-tight mb-6">
              🚀 Unlock Global Career Opportunities: <br /> Why Indians are Moving to Japan
            </h2>
            <p className="text-lg text-fuji-slate/70 leading-relaxed font-light">
              Japan and India share deep economic and cultural ties. With Japan's rapidly aging population and booming tech sectors, there is a massive shortage of young, skilled professionals. For ambitious Indians, clearing the <strong>Japanese-Language Proficiency Test (JLPT)</strong> is the golden key to unlocking highly lucrative career paths in the Land of the Rising Sun.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <TiltCard washiStyle shuiroAccent maxTilt={4} scale={1.015} className="rounded-[2rem] h-full">
              <div className="bg-[#FAF8F5]/90 p-10 rounded-[2rem] hover:shadow-premium transition-all duration-300 border border-[#EDE6D9] hover:border-[#D90429]/40 h-full">
                <div className="w-14 h-14 bg-fuji-indigo text-white rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-fuji-indigo mb-4">1. The IT & Engineering Boom</h3>
                <p className="text-fuji-slate/70 leading-relaxed">
                  Japan's technology and manufacturing sectors are actively recruiting Indian software developers, AI specialists, and engineers. Holding a JLPT N3 or N2 certificate bridges the communication gap, making you a top-tier candidate for giants like Rakuten, Sony, Toyota, and thousands of innovative startups.
                </p>
              </div>
            </TiltCard>

            <TiltCard washiStyle shuiroAccent maxTilt={4} scale={1.015} className="rounded-[2rem] h-full">
              <div className="bg-[#FAF8F5]/90 p-10 rounded-[2rem] hover:shadow-premium transition-all duration-300 border border-[#EDE6D9] hover:border-[#D90429]/40 h-full">
                <div className="w-14 h-14 bg-fuji-red text-white rounded-2xl flex items-center justify-center mb-6">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-fuji-indigo mb-4">2. High Demand in Specialized Sectors</h3>
                <p className="text-fuji-slate/70 leading-relaxed mb-4">
                  Beyond IT, Japan has introduced the <strong>Specified Skilled Worker (SSW)</strong> visa to welcome foreign talent. Clearing the JLPT N4 opens direct pathways to jobs in:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-fuji-slate/80">
                    <CheckCircle className="w-4 h-4 text-fuji-red" /> <strong>Healthcare & Nursing Care:</strong> High demand for compassionate caregivers.
                  </li>
                  <li className="flex items-center gap-2 text-fuji-slate/80">
                    <CheckCircle className="w-4 h-4 text-fuji-red" /> <strong>Hospitality & Tourism:</strong> Opportunities in premium hotels and travel companies.
                  </li>
                  <li className="flex items-center gap-2 text-fuji-slate/80">
                    <CheckCircle className="w-4 h-4 text-fuji-red" /> <strong>Business & Management:</strong> Bilingual professionals for translation, HR, and international relations.
                  </li>
                </ul>
              </div>
            </TiltCard>

            <TiltCard washiStyle shuiroAccent maxTilt={4} scale={1.015} className="rounded-[2rem] h-full">
              <div className="bg-[#FAF8F5]/90 p-10 rounded-[2rem] hover:shadow-premium transition-all duration-300 border border-[#EDE6D9] hover:border-[#D90429]/40 h-full">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-2xl flex items-center justify-center mb-6">
                  <Award className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-fuji-indigo mb-4">3. Attractive Salaries & Standard of Living</h3>
                <p className="text-fuji-slate/70 leading-relaxed">
                  Professionals in Japan enjoy highly competitive salaries, excellent healthcare, world-class public transport, and one of the lowest crime rates globally. Indian professionals are highly respected in the Japanese corporate ecosystem for their technical skills and adaptability.
                </p>
              </div>
            </TiltCard>

            <TiltCard washiStyle shuiroAccent maxTilt={4} scale={1.015} className="rounded-[2rem] h-full">
              <div className="bg-[#FAF8F5]/90 p-10 rounded-[2rem] hover:shadow-premium transition-all duration-300 border border-[#EDE6D9] hover:border-[#D90429]/40 h-full">
                <div className="w-14 h-14 bg-blue-500 text-white rounded-2xl flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold text-fuji-indigo mb-4">4. Pathways to Permanent Residency</h3>
                <p className="text-fuji-slate/70 leading-relaxed">
                  The Japanese government has recently relaxed immigration rules for highly skilled professionals. A strong JLPT score gives you extra points on the immigration scale, fast-tracking your journey to obtaining a Permanent Resident (PR) visa.
                </p>
              </div>
            </TiltCard>
          </div>

          <div className="bg-fuji-indigo text-white p-8 md:p-12 rounded-[2.5rem] text-center max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-fuji-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 relative z-10">
              Ready to build your future in Japan?
            </h3>
            <p className="text-white/90 text-lg mb-8 relative z-10">
              It all starts with the right foundation. Join our upcoming JLPT preparation batches at Fuji Japanese Academy and let our experienced sensei guide you to success!
            </p>
            <button
              type="button"
              onClick={onOpenEnrollment}
              className="relative z-10 px-8 py-4 bg-fuji-red text-white rounded-full font-bold text-lg shadow-[0_0_20px_-5px_rgba(217,4,41,0.5)] hover:bg-fuji-darkRed transition-all transform hover:-translate-y-1"
            >
              Start Your Journey Today
            </button>
          </div>

          {/* Actively Hiring Banner - Executive Sales & Careers */}
          <div className="mt-10 bg-white rounded-3xl p-6 md:p-8 border border-red-100 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 max-w-4xl mx-auto">
            <div className="space-y-2 text-center md:text-left">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-fuji-red text-xs font-bold uppercase tracking-wider">
                <Briefcase className="w-3.5 h-3.5" /> Career Opportunity • Manesar, Haryana
              </span>
              <h4 className="text-xl md:text-2xl font-bold font-display text-fuji-indigo">
                Now Hiring: Executive Sales / Business Development
              </h4>
              <p className="text-xs md:text-sm text-fuji-slate/75 leading-relaxed">
                Salary: <strong>6 to 10 LPA CTC (Fixed)</strong> &bull; Mandatory JLPT N2/N1 + MBA in Sales/Marketing. Lead bilateral relationships with Japanese corporate clients.
              </p>
            </div>
            <div className="shrink-0 flex flex-wrap gap-3">
              <Link
                to="/careers#executive-sales-manesar"
                className="px-6 py-3 bg-fuji-red hover:bg-rose-600 text-white font-bold text-xs md:text-sm rounded-xl shadow-md transition-all whitespace-nowrap"
              >
                View Role &amp; Apply &rarr;
              </Link>
              <a
                href={getJobApplyMailto('Executive Sales / Business Development', 'Manesar, Haryana')}
                className="px-5 py-3 bg-fuji-indigo hover:bg-indigo-950 text-white font-bold text-xs md:text-sm rounded-xl shadow-md transition-all whitespace-nowrap text-center"
              >
                Email Resume
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Learning Tools Section: Kana Sound Board & Practice Teaser */}
      <section className="py-24 bg-gradient-to-b from-fuji-indigo via-[#1d1945] to-fuji-indigo text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuji-red/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/10 backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5 text-fuji-red" /> 日本語ツール • Interactive Learning Tools
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-white mb-4">
              Try Japanese in 60 Seconds
            </h2>
            <p className="text-gray-300 text-sm sm:text-base font-light leading-relaxed">
              Experience the joy of learning with native pronunciation audio and instant interactive comprehension drills.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
            
            {/* Tool 1: Interactive Kana Sound Board (7 Cols) */}
            <div className="lg:col-span-7 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-300 block mb-0.5">
                    Click to Listen &bull; 音声再生
                  </span>
                  <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                    <Volume2 className="w-5 h-5 text-fuji-red" />
                    Essential Kana Sound Board
                  </h3>
                </div>
                <NavLink
                  to="/learn/hiragana-katakana"
                  className="text-xs font-bold text-rose-300 hover:text-white transition-colors flex items-center gap-1"
                >
                  Full 46-Chart Guide →
                </NavLink>
              </div>

              {/* 10 Interactive Character Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {KANA_PREVIEWS.map((item, idx) => {
                  const isPlaying = playingKana === item.char;

                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => playJapaneseKana(item.char)}
                      className={cn(
                        "p-3 rounded-2xl border text-center transition-all duration-200 group flex flex-col items-center justify-center cursor-pointer select-none active:scale-95",
                        isPlaying
                          ? "bg-fuji-red border-fuji-red text-white shadow-lg shadow-fuji-red/40 scale-105"
                          : "bg-white/5 border-white/10 hover:bg-white/15 hover:border-white/30 text-white"
                      )}
                      aria-label={`Listen to pronunciation of ${item.char} (${item.romaji})`}
                    >
                      <span className="text-3xl font-display font-bold block mb-1 group-hover:scale-110 transition-transform">
                        {item.char}
                      </span>
                      <span className="text-xs font-mono font-bold tracking-wider text-amber-300 uppercase block">
                        {item.romaji}
                      </span>
                      <span className="text-[10px] text-gray-300 mt-1 truncate max-w-full font-light block">
                        {item.word}
                      </span>
                      <span className="text-[9px] text-gray-400 mt-0.5 truncate max-w-full italic block">
                        ({item.meaning})
                      </span>
                      <div className="mt-2 text-[10px] flex items-center justify-center gap-1 text-white/70">
                        <Volume2 className={cn("w-3 h-3", isPlaying && "animate-ping text-white")} />
                        <span className="text-[9px]">{isPlaying ? 'Playing...' : 'Audio'}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              <p className="text-[11px] text-gray-400 mt-4 text-center font-light">
                🔊 Powered by Japanese Speech Synthesis. Click any character to hear native Tokyo cadence.
              </p>
            </div>

            {/* Tool 2: Interactive JLPT Practice Quiz Teaser (5 Cols) */}
            <div className="lg:col-span-5 bg-white/5 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/10 shadow-2xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between gap-3 mb-6 pb-4 border-b border-white/10">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-300 block mb-0.5">
                      Live Comprehension Drill
                    </span>
                    <h3 className="text-xl font-display font-bold text-white flex items-center gap-2">
                      <HelpCircle className="w-5 h-5 text-amber-300" />
                      Daily JLPT Teaser
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold uppercase tracking-wider border border-emerald-500/30">
                    JLPT N5
                  </span>
                </div>

                {/* Question */}
                <div className="bg-black/30 p-4 rounded-2xl border border-white/10 mb-4">
                  <span className="text-[11px] text-gray-400 uppercase tracking-wider block mb-1">
                    Question 01 • Vocabulary
                  </span>
                  <p className="text-base font-bold text-white">
                    What does <span className="text-amber-300 font-display">『こんにちは、元気ですか？』</span> translate to in English?
                  </p>
                  <span className="text-xs text-gray-400 font-mono mt-1 block">
                    Romaji: Konnichiwa, genki desu ka?
                  </span>
                </div>

                {/* Options */}
                <div className="space-y-2 mb-4">
                  {[
                    { text: 'Good morning, what time is the meeting?', correct: false },
                    { text: 'Hello, how are you doing?', correct: true },
                    { text: 'Good evening, nice to meet you.', correct: false },
                    { text: 'Thank you very much, goodbye.', correct: false },
                  ].map((option, optIdx) => {
                    const isSelected = quizSelectedOption === optIdx;
                    const isCorrect = option.correct;

                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => setQuizSelectedOption(optIdx)}
                        className={cn(
                          "w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm font-medium transition-all duration-200 cursor-pointer flex items-center justify-between",
                          isSelected
                            ? isCorrect
                              ? "bg-emerald-500/25 border-emerald-400 text-emerald-200 font-bold"
                              : "bg-rose-500/25 border-rose-400 text-rose-200 font-bold"
                            : "bg-white/5 border-white/10 hover:bg-white/10 text-white"
                        )}
                      >
                        <span>{option.text}</span>
                        {isSelected && (
                          isCorrect
                            ? <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                            : <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation feedback */}
                {quizSelectedOption !== null && (
                  <div className={cn(
                    "p-3.5 rounded-xl border text-xs leading-relaxed",
                    quizSelectedOption === 1
                      ? "bg-emerald-950/60 border-emerald-500/50 text-emerald-200"
                      : "bg-rose-950/60 border-rose-500/50 text-rose-200"
                  )}>
                    {quizSelectedOption === 1 ? (
                      <div>
                        <strong>🎉 正解 (Correct)!</strong> "Konnichiwa" is the standard daytime greeting (Hello / Good afternoon), and "Genki desu ka?" is the polite inquiry asking "How are you?".
                      </div>
                    ) : (
                      <div>
                        <strong>💡 Almost!</strong> Option B is correct. "Konnichiwa" means Hello/Good afternoon, while "Genki desu ka?" means "Are you well / How are you?".
                      </div>
                    )}
                  </div>
                )}
              </div>

              <div className="pt-5 mt-4 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-gray-300">Want more practice?</span>
                <NavLink
                  to="/practice"
                  className="px-4 py-2 rounded-xl bg-white text-fuji-indigo hover:bg-amber-300 font-bold text-xs transition-colors shadow-md"
                >
                  Open 50+ Full Practice Quizzes →
                </NavLink>
              </div>
            </div>

          </div>

          {/* Smart Course Finder Widget */}
          <div>
            <CourseFinderWidget onOpenEnrollment={onOpenEnrollment} />
          </div>

          {/* Interactive Diagnostic Placement Quiz */}
          <div className="mt-16">
            <JlptDiagnosticPlacementQuiz onSelectCourse={(slug) => onOpenEnrollment(slug)} />
          </div>

        </div>
      </section>

      {/* Free Resources CTA */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <div className="relative rounded-[3rem] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-900" />
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

            <div className="relative z-10 px-8 py-16 md:p-20 flex flex-col lg:flex-row items-center justify-between gap-12">
              <div className="lg:w-1/2 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-emerald-200 text-sm font-bold border border-white/10 mb-6 backdrop-blur-md">
                  <Gift className="w-4 h-4" />
                  <span className="tracking-widest uppercase">Start for Free</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">
                  Master Hiragana <br /> In Just <span className="text-emerald-400">3 Days</span>
                </h2>
                <p className="text-emerald-100/80 text-lg mb-10 max-w-xl font-light leading-relaxed">
                  Not ready to commit? Access our premium selection of free lesson videos, workbooks, and join our active WhatsApp community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <NavLink
                    to="/courses/free"
                    className="px-8 py-4 bg-white text-emerald-900 rounded-full font-bold text-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 shadow-xl"
                  >
                    Get Free Access <ArrowRight className="w-5 h-5" />
                  </NavLink>
                  <a
                    href="https://chat.whatsapp.com/CsrjvewBVU8Iy8NOVpR913"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 bg-emerald-500/20 text-white border border-white/30 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
                  >
                    Join Community
                  </a>
                </div>
              </div>

              <div className="lg:w-1/2 relative">
                <div className="relative z-10 grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 transform -rotate-3 hover:rotate-0 transition-transform">
                      <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center mb-4">
                        <Play className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">Video Lessons</h4>
                      <p className="text-emerald-100/60 text-xs font-light">HD Quality tutorials</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 transform rotate-2 hover:rotate-0 transition-transform">
                      <div className="w-10 h-10 bg-teal-500 rounded-xl flex items-center justify-center mb-4">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">Workbooks</h4>
                      <p className="text-emerald-100/60 text-xs font-light">Downloadable PDFs</p>
                    </div>
                  </div>
                  <div className="space-y-4 pt-8">
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 transform rotate-6 hover:rotate-0 transition-transform">
                      <div className="w-10 h-10 bg-emerald-400 rounded-xl flex items-center justify-center mb-4">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">Community</h4>
                      <p className="text-emerald-100/60 text-xs font-light">24/7 Support</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10 transform -rotate-6 hover:rotate-0 transition-transform">
                      <div className="w-10 h-10 bg-teal-400 rounded-xl flex items-center justify-center mb-4">
                        <Globe className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="font-bold text-white text-sm mb-1">Culture</h4>
                      <p className="text-emerald-100/60 text-xs font-light">Weekly workshops</p>
                    </div>
                  </div>
                </div>
                {/* Decorative Blur */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-emerald-400/30 rounded-full blur-[100px] -z-1" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAMPUS SEMINAR & ORIENTATION SPOTLIGHT - T. JOHN COLLEGE OF NURSING, T. JOHN PU COLLEGE & V.E.T. FIRST GRADE COLLEGE */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-slate-100/80 via-white to-slate-50 border-t border-slate-200/80 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <CampusPartnershipShowcase
            variant="featured"
            showHeading={true}
            onOpenEnrollment={onOpenEnrollment}
            defaultCampusId="t-john-nursing"
          />
        </div>
      </section>

      {/* 6. ENHANCED STUDENT SUCCESS STORIES & ALUMNI FILTER */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4 md:px-6">
          <EnhancedStudentTestimonialsShowcase onBookDemo={onOpenEnrollment} />
        </div>
      </section>

      {/* INTERACTIVE LEAD MAGNET - JLPT Level & Career Assessment Quiz */}
      <JlptCareerQuiz />

      {/* JAPAN STUDY & CAREER ROI CALCULATOR */}
      <div className="container mx-auto px-4 md:px-6">
        <JapanROICalculator onOpenEnrollment={onOpenEnrollment} />
      </div>

      {/* INSTITUTIONAL LEADERSHIP & DIRECTORATE */}
      <LeadershipTeam className="bg-white border-t border-slate-100" />

      {/* 7. COMPREHENSIVE FAQ SECTION - Live Search & Category Accordion */}
      <section className="py-24 bg-gray-50/60 border-t border-gray-100 relative">
        <div className="container mx-auto px-4 md:px-6">
          <InteractiveFaqSearchAccordion />
        </div>
      </section>

      {/* 8. LOCATION & CAMPUS MAP BAR - Bengaluru Campus Details & Live Deep Link */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-fuji-red font-bold text-xs uppercase tracking-widest block mb-2">
              CAMPUS &bull; キャンパス所在地
            </span>
            <h2 className="text-3xl md:text-5xl font-bold font-display text-fuji-indigo leading-tight mb-4">
              Visit Our Bengaluru Campus
            </h2>
            <p className="text-sm md:text-base text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
              Located in Electronic City Phase 1, our state-of-the-art Japanese learning center features immersive audiovisual classrooms, a curated Kanji library, and comfortable counseling lounges.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-6xl mx-auto items-stretch">
            
            {/* Campus Info Card (5 Cols) */}
            <div className="lg:col-span-5 bg-gradient-to-br from-white via-gray-50 to-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-md flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-fuji-red text-xs font-bold uppercase tracking-wider mb-4 border border-red-100">
                  <Building2 className="w-3.5 h-3.5" /> Electronic City Headquarters
                </div>
                <h3 className="text-2xl font-display font-bold text-fuji-indigo mb-4">
                  Fuji Japanese Academy
                </h3>

                <div className="space-y-4 text-xs sm:text-sm text-gray-700 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-fuji-red flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block font-semibold mb-0.5">Physical Campus Address:</strong>
                      <span className="text-gray-600 leading-relaxed font-light">
                        Electronic City, 06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Bengaluru, Karnataka 560100
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-fuji-indigo flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block font-semibold mb-0.5">Visiting &amp; Consultation Hours:</strong>
                      <span className="text-gray-600 font-light">
                        Monday to Sunday: 9:00 AM – 7:30 PM IST (Daily)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block font-semibold mb-0.5">Direct Helpline:</strong>
                      <a href="tel:+916364924110" className="text-fuji-red font-bold hover:underline">
                        +91 63649 24110
                      </a>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-200/60 mb-6">
                  <span className="text-xs font-bold text-gray-900 block mb-2">Campus Amenities:</span>
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Audio-Visual Digital Lab</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>500+ Manga &amp; Kanji Books</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Air-Conditioned Hall</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Free Two-Wheeler Parking</span>
                    </div>
                  </div>
                </div>
              </div>

              <a
                href="https://share.google/JHpoZKsmxV9p22Exb"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 rounded-2xl bg-fuji-indigo hover:bg-fuji-red text-white text-center text-xs sm:text-sm font-bold transition-all shadow-md flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Get Directions on Google Maps</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>

            {/* Embedded Google Map (7 Cols) */}
            <div className="lg:col-span-7 rounded-3xl overflow-hidden shadow-lg border border-gray-200 relative min-h-[380px] bg-gray-100">
              <iframe
                width="100%"
                height="100%"
                title="Fuji Japanese Academy Electronic City Campus Location Map"
                className="w-full h-full min-h-[380px] border-0"
                loading="lazy"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3889.9862834736987!2d77.6347608!3d12.8441623!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6bf43bc8eb9b%3A0x77a9e4f6869d6f11!2sFUJI+JAPANESE+ACADEMY!5e0!3m2!1sen!2sin"
              />
              <div className="absolute top-4 right-4">
                <a
                  href="https://share.google/JHpoZKsmxV9p22Exb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-white/95 text-fuji-indigo font-bold text-xs shadow-lg hover:bg-fuji-red hover:text-white transition-all flex items-center gap-1.5 backdrop-blur-md"
                >
                  <MapPin className="w-3.5 h-3.5 text-fuji-red" />
                  <span>Open in Maps</span>
                </a>
              </div>
            </div>

          </div>

          {/* Bengaluru Classroom & Online Locations Hubs */}
          <div className="mt-10 pt-8 border-t border-gray-200/80 max-w-6xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-fuji-red block">Offline Classroom Centers &amp; Hubs</span>
                <h4 className="text-lg font-bold font-display text-fuji-indigo">Explore Japanese Classes Across Bengaluru</h4>
              </div>
              <Link to="/locations" className="text-xs md:text-sm font-bold text-fuji-red hover:underline flex items-center gap-1">
                All Locations <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              <Link
                to="/locations/electronic-city"
                className="p-3 bg-white rounded-xl border border-gray-200 hover:border-red-400 hover:shadow-sm transition-all group block"
              >
                <span className="text-xs font-bold text-fuji-indigo group-hover:text-fuji-red block mb-0.5">Electronic City</span>
                <span className="text-[11px] text-gray-500 block">Classroom Campus</span>
              </Link>
              <Link
                to="/locations/koramangala"
                className="p-3 bg-white rounded-xl border border-gray-200 hover:border-red-400 hover:shadow-sm transition-all group block"
              >
                <span className="text-xs font-bold text-fuji-indigo group-hover:text-fuji-red block mb-0.5">Koramangala</span>
                <span className="text-[11px] text-gray-500 block">Hybrid &amp; Weekend</span>
              </Link>
              <Link
                to="/locations/indiranagar"
                className="p-3 bg-white rounded-xl border border-gray-200 hover:border-red-400 hover:shadow-sm transition-all group block"
              >
                <span className="text-xs font-bold text-fuji-indigo group-hover:text-fuji-red block mb-0.5">Indiranagar</span>
                <span className="text-[11px] text-gray-500 block">Fast-Track Batches</span>
              </Link>
              <Link
                to="/locations/whitefield"
                className="p-3 bg-white rounded-xl border border-gray-200 hover:border-red-400 hover:shadow-sm transition-all group block"
              >
                <span className="text-xs font-bold text-fuji-indigo group-hover:text-fuji-red block mb-0.5">Whitefield</span>
                <span className="text-[11px] text-gray-500 block">IT Corridor Hub</span>
              </Link>
              <Link
                to="/locations/bangalore"
                className="p-3 bg-white rounded-xl border border-gray-200 hover:border-red-400 hover:shadow-sm transition-all group block"
              >
                <span className="text-xs font-bold text-fuji-indigo group-hover:text-fuji-red block mb-0.5">Bengaluru Central</span>
                <span className="text-[11px] text-gray-500 block">City Overview</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* PAN-INDIA & GLOBAL LEARNING DIRECTORY ACCORDION */}
      <div className="container mx-auto px-4 md:px-6">
        <PanIndiaLocationDirectory />
      </div>

      {/* 9. FINAL HIGH-IMPACT ENROLLMENT CTA BANNER */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-slate-950 via-[#171435] to-slate-950 text-white overflow-hidden">
        {/* Japanese Motif Accents */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 pointer-events-none" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuji-red/25 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          {/* Live Batch Alert Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-rose-300 text-xs font-extrabold uppercase tracking-wider mb-6 border border-white/15 backdrop-blur-md">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
            <span>🎌 Fresh Batches Starting Next Monday &bull; Admissions Open</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-display font-extrabold text-white mb-6 leading-tight tracking-tight">
            Ready to Speak Fluent Japanese?<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
              Your Global Future Starts Here.
            </span>
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
            Join over 2,400+ successful scholars and software engineers who mastered Japanese with certified native senseis. Book a zero-obligation free counseling and demo class today.
          </p>

          {/* Guarantees Strip */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-300 mb-10">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> 100% Free Demo Session
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-400" /> Small Batches (10–12 Students)
            </span>
            <span>&bull;</span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-emerald-400" /> 98% First-Attempt Pass Rate
            </span>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              type="button"
              onClick={onOpenEnrollment}
              className="w-full sm:w-auto px-9 py-4 bg-fuji-red hover:bg-red-600 text-white rounded-2xl font-bold text-base shadow-xl shadow-fuji-red/30 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Book a Free Demo Class</span>
              <ArrowRight className="w-5 h-5" />
            </button>

            <a
              href="https://wa.me/916364924110?text=Hi%20Fuji%20Japanese%20Academy,%20I%20would%20like%20to%20reserve%20a%20seat%20for%20the%20upcoming%20batch%20and%20attend%20a%20free%20demo."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-2xl font-bold text-base backdrop-blur-md transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <MessageSquare className="w-5 h-5 text-emerald-400" />
              <span>Chat on WhatsApp</span>
            </a>

            <a
              href="tel:+916364924110"
              className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/10 border border-white/15 text-white/90 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 active:scale-95"
            >
              <Phone className="w-5 h-5 text-amber-300" />
              <span>+91 63649 24110</span>
            </a>
          </div>
        </div>
      </section>

      {/* Syllabus Download Modal */}
      <SyllabusDownloadModal
        isOpen={isSyllabusModalOpen}
        onClose={() => setIsSyllabusModalOpen(false)}
        defaultLevel={selectedSyllabusLevel}
      />
    </div>
  );
};

export default Home;
