import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, BookOpen, GraduationCap, Briefcase, Calendar, CreditCard, ShieldCheck, FileText, MapPin, Sparkles, Stethoscope, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SearchEntry {
  title: string;
  category: 'Courses' | 'College MoUs' | 'Careers & Jobs' | 'Exams & Practice' | 'Fees & Admissions' | 'Guides & Blog' | 'Locations';
  path: string;
  description: string;
  keywords: string[];
  badge?: string;
  icon: 'course' | 'nursing' | 'college' | 'career' | 'exam' | 'fee' | 'blog' | 'location';
}

export const SEARCH_DIRECTORY: SearchEntry[] = [
  {
    title: 'SSW Nursing Caregiver & Medical Japanese',
    category: 'Courses',
    path: '/courses/ssw-nursing-caregiver-japanese',
    description: 'JLPT N4 + Nursing Care Japanese Evaluation Test (NCET). T. John Nursing partner track with ₹2.4L/mo salary in Japan.',
    keywords: ['nursing', 'caregiver', 'ssw', 'medical', 'hospital', 't john', 't john nursing', 'kaigo', 'ncet', 'healthcare', 'nurse salary', 'japan nurse'],
    badge: 'T. John Partner Track',
    icon: 'nursing'
  },
  {
    title: 'JLPT N5 - Beginners Foundation',
    category: 'Courses',
    path: '/courses/jlpt-n5',
    description: 'Master Hiragana, Katakana, 103 Kanji, daily greetings, and fundamental sentence structures in 3 months.',
    keywords: ['n5', 'jlpt n5', 'beginner', 'basics', 'hiragana', 'katakana', 'kanji', 'zero basics', 'starter course', '15000'],
    badge: 'Most Popular',
    icon: 'course'
  },
  {
    title: 'JLPT N4 - Elementary Fluency',
    category: 'Courses',
    path: '/courses/jlpt-n4',
    description: 'Everyday conversational Japanese, 300 Kanji, complex sentences, and official SSW work visa requirement.',
    keywords: ['n4', 'jlpt n4', 'elementary', 'conversational', 'ssw visa', 'grammar', 'listening'],
    icon: 'course'
  },
  {
    title: 'JLPT N3 - Intermediate Business Bridge',
    category: 'Courses',
    path: '/courses/jlpt-n3',
    description: 'The golden benchmark for IT companies and bilingual software engineers relocating to Tokyo.',
    keywords: ['n3', 'jlpt n3', 'intermediate', 'software engineer', 'it hiring', 'tokyo tech', 'benchmark'],
    badge: 'Tech Hiring Benchmark',
    icon: 'course'
  },
  {
    title: 'JLPT N2 - Advanced Corporate Fluency',
    category: 'Courses',
    path: '/courses/jlpt-n2',
    description: 'High-level business communication, editorial reading, Keigo, and 10 bonus points on Japan Highly Skilled visa.',
    keywords: ['n2', 'jlpt n2', 'advanced', 'corporate', 'keigo', 'fluent', 'pr fast track'],
    icon: 'course'
  },
  {
    title: 'JLPT N1 - Native Level Mastery',
    category: 'Courses',
    path: '/courses/jlpt-n1',
    description: 'Supreme Japanese mastery for corporate leadership, executive translation, and legal documentation.',
    keywords: ['n1', 'jlpt n1', 'native', 'mastery', 'bilingual leader', 'executive'],
    icon: 'course'
  },
  {
    title: 'Japanese for IT Professionals & Software Engineers',
    category: 'Courses',
    path: '/courses/japanese-for-it-professionals',
    description: 'Tech vocabulary (IT Yōgo), Agile standups, code review etiquette, and Tokyo tech interview preparation.',
    keywords: ['it', 'software', 'developer', 'engineer', 'agile', 'yogo', 'jira', 'code review', 'tech jobs'],
    icon: 'career'
  },
  {
    title: 'Spoken Japanese (Zero Kanji)',
    category: 'Courses',
    path: '/courses/spoken-japanese',
    description: 'Fast-track spoken fluency for travelers, hobbyists, anime fans, and conversational confidence without written scripts.',
    keywords: ['spoken', 'speaking', 'conversation', 'zero kanji', 'anime', 'travel', 'romaji'],
    icon: 'course'
  },
  {
    title: 'College Partnerships & Campus MoUs',
    category: 'College MoUs',
    path: '/college-partnerships',
    description: 'Official academic MoUs with T. John College of Nursing, T. John PU College, and V.E.T. First Grade College.',
    keywords: ['college', 'mou', 'partnerships', 'campus', 't john', 't john nursing', 't john pu', 'vet college', 'university', 'academic', 'principals'],
    badge: 'Bengaluru Colleges',
    icon: 'college'
  },
  {
    title: 'Transparent Fees, Instant UPI & No-Cost EMI',
    category: 'Fees & Admissions',
    path: '/payment',
    description: 'Pay fees via Google Pay, PhonePe, Paytm (fujijapaneseacademyy@axl), 0% No-Cost 3-Month EMI, or ICICI Bank.',
    keywords: ['fees', 'fee', 'payment', 'pay', 'upi', 'gpay', 'phonepe', 'paytm', 'bhim', 'emi', 'no cost emi', 'icici', 'gst', 'cost', 'price'],
    badge: 'Instant UPI',
    icon: 'fee'
  },
  {
    title: 'Admissions & Demo Class Inquiry',
    category: 'Fees & Admissions',
    path: '/enquire',
    description: 'Book your free 45-minute live demo class, check weekend batch timings, and receive personalized career counseling.',
    keywords: ['admissions', 'enquire', 'enroll', 'enrollment', 'demo', 'free demo', 'contact', 'batch timing', 'counseling'],
    badge: 'Free Demo',
    icon: 'fee'
  },
  {
    title: 'India JLPT Exam Calendar 2026',
    category: 'Exams & Practice',
    path: '/exam-calendar',
    description: 'July and December JLPT test dates, registration deadlines, and center guide across Bengaluru, Delhi, Chennai, Pune, Mumbai.',
    keywords: ['exam calendar', 'exam dates', 'jlpt dates', 'july jlpt', 'december jlpt', 'exam centers', 'bengaluru center', 'nat test', 'jft basic'],
    icon: 'exam'
  },
  {
    title: 'Free JLPT Mock Test Platform',
    category: 'Exams & Practice',
    path: '/mock-test',
    description: 'Simulated JLPT computer-based test with instant scoring, timer, and detailed section-wise feedback.',
    keywords: ['mock test', 'test', 'simulation', 'practice test', 'score', 'evaluate', 'free mock'],
    badge: '100% Free',
    icon: 'exam'
  },
  {
    title: 'Interactive Practice Platform & Quizzes',
    category: 'Exams & Practice',
    path: '/practice',
    description: 'Vocabulary flashcards, particle quizzes, and Kanji drills designed by certified native instructors.',
    keywords: ['practice', 'quiz', 'quizzes', 'flashcards', 'drills', 'particle quiz'],
    icon: 'exam'
  },
  {
    title: 'Free Learning Resources & PDF Worksheets',
    category: 'Guides & Blog',
    path: '/courses/free',
    description: 'Download free Hiragana & Katakana charts, 103 N5 Kanji stroke-order guides, and Minna no Nihongo cheat sheets.',
    keywords: ['free courses', 'free resources', 'pdf', 'worksheets', 'hiragana chart', 'katakana chart', 'kanji pdf', 'cheat sheet'],
    badge: 'Free Downloads',
    icon: 'blog'
  },
  {
    title: 'Mastering the 10 Essential Japanese Particles',
    category: 'Guides & Blog',
    path: '/blog/japanese-particles-cheat-sheet-jlpt-n5-n4',
    description: 'Wa vs Ga explained with complete formulas, contrast rules, and JLPT N5/N4 question walkthroughs.',
    keywords: ['particles', 'wa vs ga', 'wa', 'ga', 'wo', 'ni', 'de', 'grammar', 'particle cheat sheet', 'blog'],
    icon: 'blog'
  },
  {
    title: 'Tech Jobs in Japan for Indian Engineers & Developers',
    category: 'Careers & Jobs',
    path: '/blog/tech-jobs-in-japan-for-indian-engineers',
    description: 'Comprehensive guide to salaries (¥6M–¥12M), visa sponsorship, tech stacks, and hiring companies in Tokyo.',
    keywords: ['jobs in japan', 'software jobs', 'tokyo jobs', 'engineer visa', 'rakuten', 'salary in japan', 'hiring'],
    icon: 'career'
  },
  {
    title: 'How to Learn 500 Kanji in 60 Days: Radicals & Mnemonics',
    category: 'Guides & Blog',
    path: '/blog/how-to-learn-kanji-fast-mnemonics-radicals',
    description: 'Deconstruct complex Japanese Kanji into 50 core radicals and visual memory stories.',
    keywords: ['how to learn kanji', 'kanji radicals', 'mnemonics', 'bushu', 'fast kanji', 'blog'],
    icon: 'blog'
  },
  {
    title: 'Japan Work Visa Guide (Engineer, SSW & HSP)',
    category: 'Careers & Jobs',
    path: '/blog/japan-work-visa-guide-for-foreigners-engineers',
    description: 'Certificate of Eligibility (COE) process, salary requirements, family sponsorship, and PR pathways.',
    keywords: ['visa', 'work visa', 'coe', 'engineer visa', 'ssw visa', 'pr in japan', 'visa rules'],
    icon: 'career'
  },
  {
    title: 'Jobs Master Catalogue (100+ Roles in Japan)',
    category: 'Careers & Jobs',
    path: '/careers/apply',
    description: 'Live job openings for Indian engineers, nursing caregivers, translators, and bilingual project managers in Japan.',
    keywords: ['apply jobs', 'job catalogue', 'vacancies', 'openings', 'careers apply', 'placements'],
    badge: '100+ Roles',
    icon: 'career'
  },
  {
    title: 'Bengaluru Offline Campus & Center Locations',
    category: 'Locations',
    path: '/locations',
    description: 'Visit our flagship physical campus at Electronic City Phase 1, Bengaluru. Hybrid batches for Koramangala, Whitefield, Indiranagar.',
    keywords: ['locations', 'bengaluru', 'bangalore', 'electronic city', 'koramangala', 'whitefield', 'indiranagar', 'offline classes', 'classroom', 'address', 'campus'],
    icon: 'location'
  },
  {
    title: 'Certificate Verification Portal',
    category: 'Fees & Admissions',
    path: '/verify-certificate',
    description: 'Verify official course completion certificates and JLPT credentials issued by Fuji Japanese Academy.',
    keywords: ['verify', 'certificate', 'qr verification', 'credential', 'certificate check'],
    icon: 'exam'
  }
];

export const TOP_SEARCH_KEYWORDS = [
  'Nursing & SSW',
  'JLPT N5',
  'Fees & UPI',
  'T. John College',
  'Jobs in Japan',
  'Exam Dates',
  'Mock Test',
  'No-Cost EMI',
  'Bengaluru Campus'
];

interface UniversalSiteSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialQuery?: string;
}

export const UniversalSiteSearchModal: React.FC<UniversalSiteSearchModalProps> = ({
  isOpen,
  onClose,
  initialQuery = ''
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      setQuery(initialQuery);
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, [isOpen, initialQuery]);

  // Handle ESC key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const filteredResults = useMemo(() => {
    const q = query.trim().toLowerCase();
    return SEARCH_DIRECTORY.filter(item => {
      if (activeCategory !== 'All' && item.category !== activeCategory) {
        return false;
      }
      if (!q) return true;

      const titleMatch = item.title.toLowerCase().includes(q);
      const descMatch = item.description.toLowerCase().includes(q);
      const categoryMatch = item.category.toLowerCase().includes(q);
      const keywordMatch = item.keywords.some(k => k.toLowerCase().includes(q));

      return titleMatch || descMatch || categoryMatch || keywordMatch;
    });
  }, [query, activeCategory]);

  const handleSelect = (path: string) => {
    onClose();
    if (path.startsWith('http')) {
      window.open(path, '_blank');
    } else {
      navigate(path);
    }
  };

  const getIcon = (icon: SearchEntry['icon']) => {
    switch (icon) {
      case 'nursing': return <Stethoscope className="w-4 h-4 text-rose-500" />;
      case 'course': return <BookOpen className="w-4 h-4 text-red-500" />;
      case 'college': return <GraduationCap className="w-4 h-4 text-emerald-500" />;
      case 'career': return <Briefcase className="w-4 h-4 text-blue-500" />;
      case 'exam': return <Calendar className="w-4 h-4 text-amber-500" />;
      case 'fee': return <CreditCard className="w-4 h-4 text-purple-500" />;
      case 'blog': return <FileText className="w-4 h-4 text-cyan-500" />;
      case 'location': return <MapPin className="w-4 h-4 text-red-500" />;
      default: return <Search className="w-4 h-4 text-gray-500" />;
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-4 bg-black/75 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: -15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: -15 }}
          transition={{ duration: 0.18 }}
          className="w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col max-h-[85vh]"
        >
          {/* Top Search Input Box */}
          <div className="p-4 sm:p-5 border-b border-gray-100 flex items-center gap-3 bg-slate-50/70">
            <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search courses, nursing, fees, college MoUs, JLPT N5, jobs..."
              className="w-full bg-transparent text-base sm:text-lg text-gray-900 placeholder-gray-400 focus:outline-none font-medium"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full hover:bg-gray-200 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 transition-colors flex-shrink-0"
            >
              ESC
            </button>
          </div>

          {/* Popular Relative Keyword Tags */}
          <div className="px-4 sm:px-5 py-2.5 bg-white border-b border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider flex-shrink-0 mr-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-amber-500" /> Top:
            </span>
            {TOP_SEARCH_KEYWORDS.map((tag) => (
              <button
                key={tag}
                onClick={() => setQuery(tag)}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 hover:bg-red-50 hover:text-red-600 text-gray-700 whitespace-nowrap transition-all flex-shrink-0 active:scale-95"
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Results List */}
          <div className="p-3 sm:p-4 overflow-y-auto divide-y divide-gray-100 flex-1">
            {filteredResults.length === 0 ? (
              <div className="py-12 text-center text-gray-500">
                <p className="font-semibold text-gray-800 text-base mb-1">No matching sections found for "{query}"</p>
                <p className="text-xs text-gray-400">Try searching for "N5", "Nursing", "T John", "Fees", "Exam Dates", or "Bengaluru".</p>
              </div>
            ) : (
              filteredResults.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelect(item.path)}
                  className="py-3 px-3 sm:px-4 rounded-2xl hover:bg-slate-50 cursor-pointer transition-colors group flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 group-hover:bg-red-50 flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors">
                      {getIcon(item.icon)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <h4 className="text-sm font-bold text-gray-900 group-hover:text-red-600 transition-colors">
                          {item.title}
                        </h4>
                        {item.badge && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                            {item.badge}
                          </span>
                        )}
                        <span className="text-[10px] uppercase font-semibold text-gray-400 px-1.5 py-0.2 rounded bg-gray-100">
                          {item.category}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 line-clamp-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-red-600 group-hover:translate-x-1 transition-all flex-shrink-0 mt-2" />
                </div>
              ))
            )}
          </div>

          {/* Footer Bar with Domain Guidance */}
          <div className="p-3 sm:p-4 bg-slate-50 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
            <div>
              <strong className="text-gray-700">Fuji Japanese Academy Ecosystem:</strong> India Academy: <span className="text-red-600 font-semibold">.in</span> • Global Enterprise: <span className="text-blue-600 font-semibold">.com</span>
            </div>
            <div className="text-[11px] text-gray-400">
              Press <kbd className="px-1.5 py-0.5 rounded bg-gray-200 text-gray-700 font-mono">ESC</kbd> to exit
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default UniversalSiteSearchModal;
