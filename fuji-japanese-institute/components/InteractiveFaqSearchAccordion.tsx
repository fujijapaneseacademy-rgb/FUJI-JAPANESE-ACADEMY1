import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ChevronDown, HelpCircle, MessageSquare,
  Sparkles, CheckCircle2, X, ArrowRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export interface FAQItem {
  id: string;
  category: 'fees' | 'jlpt' | 'classes' | 'visas' | 'materials';
  categoryLabel: string;
  question: string;
  answer: string;
  keywords: string[];
}

export const COMPREHENSIVE_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'fees',
    categoryLabel: 'Fees & Installments',
    question: 'What are the course fees and do you offer installment/EMI plans?',
    answer: 'Our course fees range from ₹15,000 for JLPT N5 Foundation (3 months) to ₹30,000 for the N5+N4 Career Track. We provide 2 No-Cost Monthly Installments (50% upfront at admission and 50% after 30 days) and an upfront 5% early-bird discount on one-time payments. All fees are inclusive of GST and official learning kits.',
    keywords: ['fees', 'cost', 'installment', 'emi', 'price', 'discount', 'payment']
  },
  {
    id: 'faq-2',
    category: 'jlpt',
    categoryLabel: 'JLPT Exams & Passing',
    question: 'How long does it take to learn Japanese and clear the JLPT N5 exam?',
    answer: 'At Fuji Japanese Academy, our structured JLPT N5 foundation course spans approximately 3 months (70+ hours of live training). It thoroughly covers Hiragana, Katakana, 103 Kanji, 800+ vocabulary words, essential particles, and includes 4 to 8 full-length simulated mock tests matching the Japan Foundation examination standard.',
    keywords: ['n5', 'duration', 'time', 'passing', 'kanji', 'syllabus', 'hours']
  },
  {
    id: 'faq-3',
    category: 'classes',
    categoryLabel: 'Classroom vs Online Zoom',
    question: 'Where is your Bengaluru campus located, and how do live online Zoom classes work?',
    answer: 'Our physical classroom is located at Vittasandra Cross, Electronic City Phase 1, Bengaluru. For students across India, our live online Zoom batches feature interactive small cohorts (10–12 students max), breakout room speaking drills with native Tokyo senseis, digital whiteboards, and lifetime access to high-definition class recordings.',
    keywords: ['bengaluru', 'bangalore', 'location', 'electronic city', 'campus', 'zoom', 'online', 'offline']
  },
  {
    id: 'faq-4',
    category: 'visas',
    categoryLabel: 'Jobs & Visas in Japan',
    question: 'Can learning Japanese help Indian software engineers secure jobs and work visas in Tokyo?',
    answer: 'Yes! Clearing JLPT N3 or N2 opens extensive opportunities for bilingual software engineers, cloud architects, and data scientists in Tokyo. Starting compensation typically ranges from ¥6,000,000 to ¥10,000,000 (~₹33L – ₹55L CTC) with full engineer visa sponsorship, relocation allowances, and bonus points toward Japan Permanent Residency (PR).',
    keywords: ['jobs', 'careers', 'visa', 'tokyo', 'software', 'engineer', 'salary', 'pr']
  },
  {
    id: 'faq-5',
    category: 'visas',
    categoryLabel: 'Jobs & Visas in Japan',
    question: 'What is the Specified Skilled Worker (SSW) visa program and which level is required?',
    answer: 'The Specified Skilled Worker (SSW-1) visa enables foreign professionals to work in Japan across designated sectors like Healthcare/Nursing, Hospitality, Agriculture, and Food Services. Candidates must pass JLPT N4 (or JFT-Basic A2) along with the specific industry skills evaluation test. Fuji Academy offers dedicated N4 SSW preparation tracks.',
    keywords: ['ssw', 'visa', 'healthcare', 'nursing', 'n4', 'specified skilled worker', 'work']
  },
  {
    id: 'faq-6',
    category: 'materials',
    categoryLabel: 'Study Materials & Batches',
    question: 'What textbooks, workbooks, and mock tests are provided with the courses?',
    answer: 'Every enrolled student receives curated Kanji stroke-order workbooks, Minna no Nihongo reference materials, bilingual audio listening drills, and 4 to 8 full simulated mock tests with individual instructor review. Physical printed workbook kits are also delivered with free door shipping across India.',
    keywords: ['materials', 'books', 'textbooks', 'workbooks', 'mock tests', 'pdf']
  },
  {
    id: 'faq-7',
    category: 'classes',
    categoryLabel: 'Classroom vs Online Zoom',
    question: 'What happens if I miss a live class due to work or university exams?',
    answer: 'All live lectures are recorded in 1080p HD and uploaded to your student portal within 2 hours of the class finishing. You have lifetime access to rewatch recordings, download class presentation slides, and submit doubts directly to your sensei on the student WhatsApp group.',
    keywords: ['missed class', 'recording', 'portal', 'backup', 'attendance']
  },
  {
    id: 'faq-8',
    category: 'fees',
    categoryLabel: 'Fees & Installments',
    question: 'Can I attend a free demo session before making a decision?',
    answer: 'Yes! We conduct 100% free, 45-minute live demo classes every weekend (Saturday 11 AM and Sunday 3 PM) and Wednesday evening. You can meet your sensei, experience our bilingual teaching pedagogy, ask questions about syllabus timings, and receive a free level placement roadmap.',
    keywords: ['demo', 'free class', 'trial', 'preview']
  }
];

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Topics' },
  { id: 'fees', label: 'Fees & Installments' },
  { id: 'jlpt', label: 'JLPT Exams & Passing' },
  { id: 'classes', label: 'Classroom vs Online Zoom' },
  { id: 'visas', label: 'Jobs & Visas in Japan' },
  { id: 'materials', label: 'Study Materials & Batches' }
];

interface InteractiveFaqSearchAccordionProps {
  className?: string;
}

export const InteractiveFaqSearchAccordion: React.FC<InteractiveFaqSearchAccordionProps> = ({
  className = ''
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openIds, setOpenIds] = useState<string[]>(['faq-1']);

  const toggleFaq = (id: string) => {
    setOpenIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredFaqs = useMemo(() => {
    return COMPREHENSIVE_FAQS.filter(faq => {
      const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
      if (!matchesCategory) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const matchText = faq.question.toLowerCase().includes(q) ||
        faq.answer.toLowerCase().includes(q) ||
        faq.keywords.some(k => k.toLowerCase().includes(q));

      return matchText;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className={cn("w-full bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden p-6 sm:p-10", className)}>
      {/* Top Section */}
      <div className="max-w-3xl mx-auto text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-fuji-red text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5" /> Frequently Asked Questions
        </div>
        <h2 className="text-2xl sm:text-4xl font-display font-bold text-fuji-indigo">
          Instant Answers to Common Inquiries
        </h2>
        <p className="text-fuji-slate/70 text-xs sm:text-sm max-w-xl mx-auto">
          Search for course fees, batch timings, JLPT exam patterns, or work visa guidelines below.
        </p>

        {/* Live Search Bar */}
        <div className="relative max-w-xl mx-auto pt-3">
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords (e.g. fees, EMI, N5 duration, Tokyo jobs, Zoom)..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl border border-gray-200 text-sm focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 outline-none shadow-sm transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-3">
          {FAQ_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={cn(
                  "px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer border",
                  isSelected
                    ? "bg-fuji-indigo text-white border-fuji-indigo shadow-sm"
                    : "bg-slate-50 text-fuji-slate border-gray-200 hover:bg-gray-100"
                )}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Match Count Indicator */}
        {searchQuery.trim() && (
          <p className="text-xs text-fuji-slate/60 font-medium pt-1">
            Found <strong>{filteredFaqs.length}</strong> matching questions for "{searchQuery}"
          </p>
        )}
      </div>

      {/* Accordion List */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className={cn(
                  "rounded-2xl border transition-all duration-200 overflow-hidden",
                  isOpen
                    ? "border-fuji-red/30 bg-red-50/10 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-fuji-slate/50 block">
                      {faq.categoryLabel}
                    </span>
                    <h3 className={cn(
                      "text-sm sm:text-base font-bold transition-colors",
                      isOpen ? "text-fuji-red" : "text-fuji-indigo"
                    )}>
                      {faq.question}
                    </h3>
                  </div>

                  <div className={cn(
                    "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300",
                    isOpen ? "bg-fuji-red text-white rotate-180" : "bg-gray-100 text-fuji-slate"
                  )}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-fuji-slate/80 leading-relaxed border-t border-gray-100/60">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })
        ) : (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-gray-200 p-8 space-y-3">
            <HelpCircle className="w-8 h-8 text-gray-400 mx-auto" />
            <h4 className="text-base font-bold text-fuji-indigo">No matching questions found</h4>
            <p className="text-xs text-fuji-slate/70 max-w-sm mx-auto">
              We couldn’t find an exact match for "{searchQuery}". Connect directly with a counselor on WhatsApp for instant assistance.
            </p>
          </div>
        )}
      </div>

      {/* WhatsApp Fallback Counselor CTA */}
      <div className="max-w-3xl mx-auto mt-8 p-5 rounded-2xl bg-slate-50 border border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#25D366]/10 text-[#25D366] flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold text-fuji-indigo block">Have a specific question not listed here?</span>
            <span className="text-[11px] text-fuji-slate/70">Chat directly with a senior counselor on WhatsApp (9 AM – 9 PM IST).</span>
          </div>
        </div>

        <a
          href={`https://wa.me/919900000000?text=${encodeURIComponent(
            searchQuery ? `Hello Fuji Japanese Academy, I had a question regarding: "${searchQuery}"` : "Hello Fuji Japanese Academy, I have an inquiry regarding admissions and batch schedules."
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="px-4 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm flex-shrink-0"
        >
          <span>Ask on WhatsApp</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};

export default InteractiveFaqSearchAccordion;
