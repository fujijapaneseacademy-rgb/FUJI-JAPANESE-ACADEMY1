import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Star, Award, CheckCircle2, Building2, GraduationCap,
  ExternalLink, Sparkles, Filter, ChevronRight, ShieldCheck, Clock
} from 'lucide-react';
import { cn } from '../lib/utils';

export interface AlumniProfile {
  id: string;
  name: string;
  role: string;
  companyOrCollege: string;
  category: 'tokyo-tech' | 'healthcare-ssw' | 'college' | 'first-attempt' | 'bengaluru-campus';
  categoryLabel: string;
  avatar: string;
  jlptScoreBadge: string;
  scoreBreakdown: string;
  journeyTag: string;
  courseTaken: string;
  content: string;
  year: string;
}

export const ALUMNI_TESTIMONIALS: AlumniProfile[] = [
  {
    id: 'alumni-aditya',
    name: 'Aditya Raj',
    role: 'Senior Software Engineer',
    companyOrCollege: 'Rakuten (Tokyo, Japan)',
    category: 'tokyo-tech',
    categoryLabel: 'Tokyo Tech & IT',
    avatar: '/images/testimonials/aditya-raj.jpg',
    jlptScoreBadge: 'JLPT N3 Certified • 168 / 180 Marks',
    scoreBreakdown: 'Language Knowledge: 56/60 | Reading: 54/60 | Listening: 58/60',
    journeyTag: 'Bengaluru Fresher → N3 in 7 Months → Relocated to Tokyo',
    courseTaken: 'JLPT N3 for IT Professionals',
    content: 'Fuji Academy was the catalyst for my move to Japan. Hiroshi Sensei and Priya Sensei helped me crack N3 in my very first attempt while coaching me on Japanese technical standup vocabulary and Tokyo tech interview etiquette. The small cohort size meant I spoke in Japanese during every single session!',
    year: '2025'
  },
  {
    id: 'alumni-sneha',
    name: 'Sneha Gupta',
    role: 'Computer Science Undergraduate',
    companyOrCollege: 'PES University, Bengaluru',
    category: 'college',
    categoryLabel: 'College Students',
    avatar: '/images/testimonials/sneha-gupta.jpg',
    jlptScoreBadge: 'JLPT N5 Certified • 174 / 180 Marks',
    scoreBreakdown: 'Language Knowledge: 60/60 | Reading: 58/60 | Listening: 56/60',
    journeyTag: 'Absolute Beginner → Mastered Kana & 103 Kanji → Scored 174/180',
    courseTaken: 'JLPT N5 Beginners Foundation',
    content: 'I started with zero knowledge of the Japanese alphabet. In just 3 months, I mastered both Hiragana and Katakana charts and over 100 Kanji. The weekend morning batch fit seamlessly around my university schedule, and the mock exams felt identical to the actual exam at Christ University!',
    year: '2025'
  },
  {
    id: 'alumni-rohit',
    name: 'Rohit Deshpande',
    role: 'Bilingual Technical Lead',
    companyOrCollege: 'Tier-1 IT Global Delivery Center (Electronic City)',
    category: 'bengaluru-campus',
    categoryLabel: 'Bengaluru Campus',
    avatar: '/images/avatars/alumni-rohit.jpg',
    jlptScoreBadge: 'JLPT N2 Certified • 154 / 180 Marks',
    scoreBreakdown: 'Language Knowledge: 52/60 | Reading: 50/60 | Listening: 52/60',
    journeyTag: 'Corporate N3 Engineer → Mastered Keigo → Promoted to Offshore Lead',
    courseTaken: 'Business Japanese & Corporate Keigo',
    content: 'The Business Keigo and IT engineering module gave me the exact vocabulary I needed for client standup meetings with our Tokyo stakeholders. Having a physical classroom at Vittasandra Cross right in Electronic City made offline weekend attendance frictionless.',
    year: '2024'
  },
  {
    id: 'alumni-ananya',
    name: 'Ananya Deshmukh',
    role: 'Caregiving & Nursing Specialist',
    companyOrCollege: 'Tokyo Medical Center (SSW Visa)',
    category: 'healthcare-ssw',
    categoryLabel: 'Healthcare SSW',
    avatar: '/images/avatars/alumni-ananya.jpg',
    jlptScoreBadge: 'JLPT N4 Certified • 165 / 180 Marks',
    scoreBreakdown: 'Language Knowledge: 55/60 | Reading: 54/60 | Listening: 56/60',
    journeyTag: 'Nursing Graduate → N4 Qualified → Tokyo Healthcare Visa Sponsored',
    courseTaken: 'JLPT N4 Elementary Fast-Track',
    content: 'My target was clearing JLPT N4 and the nursing evaluation exam for the Japan Specified Skilled Worker (SSW) visa. The senseis coached me patiently on patient dialogues, polite forms, and rapid audio comprehension. Cleared on my first try with high honors!',
    year: '2025'
  },
  {
    id: 'alumni-karthik',
    name: 'Karthik Subramanian',
    role: 'Cloud Infrastructure Architect',
    companyOrCollege: 'Mercari (Tokyo, Japan)',
    category: 'tokyo-tech',
    categoryLabel: 'Tokyo Tech & IT',
    avatar: '/images/avatars/alumni-karthik.jpg',
    jlptScoreBadge: 'JLPT N3 Certified • 162 / 180 Marks',
    scoreBreakdown: 'Language Knowledge: 54/60 | Reading: 52/60 | Listening: 56/60',
    journeyTag: 'AWS DevOps Engineer → N3 Certified → Hired at Mercari Tokyo',
    courseTaken: 'Japanese for IT Professionals & Engineers',
    content: 'The technical vocabulary sheet and agile standup simulations were game-changers for me. Most institutes only teach textbook grammar from the 1990s, but Fuji Academy teaches modern Tokyo tech slang, Slack messaging, and engineering culture.',
    year: '2024'
  },
  {
    id: 'alumni-divya',
    name: 'Divya Nair',
    role: 'Mechanical Design Engineer',
    companyOrCollege: 'Toyota Connected Services (Bengaluru)',
    category: 'first-attempt',
    categoryLabel: '100% Pass Record',
    avatar: '/images/testimonials/sneha-gupta.jpg',
    jlptScoreBadge: 'JLPT N5 Certified • 170 / 180 Marks',
    scoreBreakdown: 'Language Knowledge: 58/60 | Reading: 56/60 | Listening: 56/60',
    journeyTag: 'Zero Language Background → 1st Attempt Clear with 94.4%',
    courseTaken: 'JLPT N5 Beginners Foundation',
    content: 'The 6 simulated full-length mock tests before the December JLPT made the real examination day completely stress-free. The individual feedback on particle mistakes and kanji stroke order gave me tremendous confidence.',
    year: '2025'
  },
  {
    id: 'alumni-manish',
    name: 'Manish Chawla',
    role: 'Bilingual Project Manager',
    companyOrCollege: 'Hitachi Vantara',
    category: 'bengaluru-campus',
    categoryLabel: 'Bengaluru Campus',
    avatar: '/images/avatars/alumni-rohit.jpg',
    jlptScoreBadge: 'JLPT N2 Certified • 148 / 180 Marks',
    scoreBreakdown: 'Language Knowledge: 50/60 | Reading: 48/60 | Listening: 50/60',
    journeyTag: 'Bengaluru IT PM → N2 Fluency → Manages Tokyo Onsite Accounts',
    courseTaken: 'JLPT N2 Corporate Masterclass',
    content: 'The instructors bring authentic cultural context that you simply cannot get from books or YouTube videos. Learning Sonkeigo and Kenjougo with real corporate roleplays allowed me to step into bilingual client management effortlessly.',
    year: '2024'
  },
  {
    id: 'alumni-pooja',
    name: 'Pooja Hegde',
    role: 'Language Scholar & M.A. Linguistics',
    companyOrCollege: 'Bangalore University',
    category: 'first-attempt',
    categoryLabel: '100% Pass Record',
    avatar: '/images/avatars/alumni-ananya.jpg',
    jlptScoreBadge: 'JLPT N4 Certified • 172 / 180 Marks',
    scoreBreakdown: 'Language Knowledge: 58/60 | Reading: 56/60 | Listening: 58/60',
    journeyTag: 'Self-Study Plateau → Joined Fuji → 172/180 Marks in N4',
    courseTaken: 'JLPT N5 + N4 Career Combo Track',
    content: 'I had plateaued trying to self-study on mobile apps for months without conversational practice. Joining Fuji Academy provided the pedagogical structure, rigorous mock tests, and sensei mentorship I desperately needed.',
    year: '2025'
  }
];

export const FILTER_CATEGORIES = [
  { id: 'all', label: 'All Reviews (450+)' },
  { id: 'tokyo-tech', label: '💻 Tokyo Tech & IT' },
  { id: 'healthcare-ssw', label: '🏥 Healthcare SSW' },
  { id: 'college', label: '🎓 College Students' },
  { id: 'first-attempt', label: '⭐ 100% Pass Record' },
  { id: 'bengaluru-campus', label: '🏢 Bengaluru Campus' }
];

interface EnhancedStudentTestimonialsShowcaseProps {
  onBookDemo?: () => void;
  className?: string;
}

export const EnhancedStudentTestimonialsShowcase: React.FC<EnhancedStudentTestimonialsShowcaseProps> = ({
  onBookDemo,
  className = ''
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredAlumni = ALUMNI_TESTIMONIALS.filter(a => {
    if (activeCategory === 'all') return true;
    return a.category === activeCategory;
  });

  return (
    <div className={cn("w-full space-y-8", className)}>
      {/* Summary Rating Banner */}
      <div className="bg-gradient-to-r from-fuji-indigo via-[#231d52] to-[#161238] p-6 sm:p-8 rounded-3xl text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-fuji-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 space-y-2">
          <div className="flex items-center gap-2">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-bold text-amber-300">4.9 / 5.0 Star Verified Rating</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            Real Student Journeys, Verified Results
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm max-w-xl">
            From absolute beginners passing JLPT on their first attempt to bilingual engineers relocating to Tokyo with Rakuten and Mercari.
          </p>
        </div>

        <div className="relative z-10 flex flex-wrap items-center gap-3">
          <a
            href="/verify-certificate"
            className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Verify Certificates</span>
          </a>

          <button
            type="button"
            onClick={() => {
              if (onBookDemo) onBookDemo();
              else if (typeof window !== 'undefined') {
                window.dispatchEvent(new CustomEvent('fuji:open-demo-modal'));
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-fuji-red hover:bg-red-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5 cursor-pointer"
          >
            <Clock className="w-4 h-4 text-amber-300" />
            <span>Book Free Demo</span>
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        {FILTER_CATEGORIES.map((cat) => {
          const isSelected = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border",
                isSelected
                  ? "bg-fuji-red text-white border-fuji-red shadow-md scale-105"
                  : "bg-white text-fuji-slate border-gray-200 hover:border-fuji-red/40 hover:text-fuji-red"
              )}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Alumni Review Cards Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredAlumni.map((alumni) => (
            <motion.div
              layout
              key={alumni.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header: Avatar, Name, Role */}
                <div className="flex items-start gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-fuji-indigo to-fuji-red text-white flex items-center justify-center font-bold text-sm shadow-md flex-shrink-0">
                    {alumni.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-bold text-fuji-indigo leading-tight group-hover:text-fuji-red transition-colors">
                        {alumni.name}
                      </h4>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 fill-emerald-100" />
                    </div>
                    <p className="text-xs text-fuji-slate/70 font-medium mt-0.5">{alumni.role}</p>
                    <p className="text-[11px] text-fuji-indigo font-semibold flex items-center gap-1 mt-0.5">
                      <Building2 className="w-3 h-3 text-fuji-slate/50" />
                      <span>{alumni.companyOrCollege}</span>
                    </p>
                  </div>
                </div>

                {/* Scorecard Badge */}
                <div className="p-3 bg-red-50/70 border border-red-100 rounded-2xl">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-fuji-red flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5" />
                      {alumni.jlptScoreBadge}
                    </span>
                    <span className="text-[10px] text-fuji-slate/50 font-mono">{alumni.year}</span>
                  </div>
                  <span className="text-[10px] text-fuji-slate/60 block mt-1 leading-tight">
                    {alumni.scoreBreakdown}
                  </span>
                </div>

                {/* Journey Transition Tag */}
                <div className="text-[11px] font-semibold text-fuji-slate/80 bg-slate-50 px-3 py-1.5 rounded-xl border border-gray-100">
                  📍 {alumni.journeyTag}
                </div>

                {/* Review Quote */}
                <p className="text-xs sm:text-sm text-fuji-slate/80 leading-relaxed italic">
                  "{alumni.content}"
                </p>
              </div>

              {/* Card Footer: Course Tag & Rating */}
              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-fuji-indigo bg-gray-100 px-2.5 py-1 rounded-lg">
                  {alumni.courseTaken}
                </span>
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-current" />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default EnhancedStudentTestimonialsShowcase;
