import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Calculator, CheckCircle2, ArrowRight, Sparkles, MessageSquare,
  Clock, ShieldCheck, MapPin, Laptop, Layers, Tag, CreditCard, ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export interface CourseOption {
  id: string;
  name: string;
  category: 'single' | 'bundle';
  basePrice: number;
  duration: string;
  levelBadge: string;
  savings?: number;
  popular?: boolean;
  description: string;
}

export const COURSE_CATALOG_OPTIONS: CourseOption[] = [
  {
    id: 'bundle-n5-n4',
    name: 'JLPT N5 + N4 Career Combo Track',
    category: 'bundle',
    basePrice: 30000,
    duration: '6.5 Months',
    levelBadge: 'Most Popular Bundle',
    savings: 5000,
    popular: true,
    description: 'Complete beginner-to-elementary track. Clears eligibility for Specified Skilled Worker (SSW) visas.'
  },
  {
    id: 'bundle-n5-n4-n3',
    name: 'N5 + N4 + N3 Tokyo Job Placement Track',
    category: 'bundle',
    basePrice: 55000,
    duration: '11 Months',
    levelBadge: 'Tokyo Career Benchmark',
    savings: 8000,
    description: 'Comprehensive pathway to the N3 technical bilingual engineer benchmark required by Tokyo tech employers.'
  },
  {
    id: 'jlpt-n5',
    name: 'JLPT N5 - Beginners Foundation',
    category: 'single',
    basePrice: 15000,
    duration: '3 Months',
    levelBadge: 'Beginner',
    description: 'Master Hiragana, Katakana, 103 foundational Kanji, essential grammar, and daily conversational greetings.'
  },
  {
    id: 'jlpt-n4',
    name: 'JLPT N4 - Elementary Japanese',
    category: 'single',
    basePrice: 20000,
    duration: '3.5 Months',
    levelBadge: 'Elementary',
    description: 'Advance to 300+ Kanji, complex verb conjugations, and conversational listening comprehension.'
  },
  {
    id: 'jlpt-n3',
    name: 'JLPT N3 - Intermediate Career Bridge',
    category: 'single',
    basePrice: 28000,
    duration: '4.5 Months',
    levelBadge: 'Intermediate',
    description: 'The golden benchmark for IT jobs in Japan. Covers 650 Kanji and nuanced Japanese sentence structures.'
  },
  {
    id: 'spoken-japanese',
    name: 'Spoken Japanese & Everyday Conversation',
    category: 'single',
    basePrice: 8000,
    duration: '1.5 Months',
    levelBadge: 'Speaking Special',
    description: 'Focus exclusively on verbal fluency, anime idioms, natural pitch accent, and situational communication.'
  },
  {
    id: 'business-japanese',
    name: 'Business Japanese & Corporate Keigo',
    category: 'single',
    basePrice: 22500,
    duration: '3 Months',
    levelBadge: 'Corporate',
    description: 'Master Sonkeigo, Kenjougo, formal email etiquette, and client meeting communication for Tokyo offices.'
  },
  {
    id: 'japanese-for-it-professionals',
    name: 'Japanese for IT Professionals & Engineers',
    category: 'single',
    basePrice: 24000,
    duration: '3 Months',
    levelBadge: 'Tech Special',
    description: 'Technical Japanese vocabulary, Agile standup Japanese, bug tracking terminologies, and Jira communication.'
  }
];

export const DELIVERY_MODES = [
  {
    id: 'online',
    name: 'Live Interactive Zoom (PAN-India)',
    description: 'Small cohort batches with native Tokyo sensei, digital whiteboards, and full class recordings.',
    surcharge: 0,
    icon: Laptop
  },
  {
    id: 'classroom',
    name: 'Bengaluru Campus (Electronic City)',
    description: 'In-person classroom batches at our Vittasandra Cross, Electronic City Phase 1 campus.',
    surcharge: 0,
    icon: MapPin
  },
  {
    id: 'hybrid',
    name: 'Hybrid Flexi-Pass',
    description: 'Attend physical classroom sessions on weekends + enjoy lifetime online recording and digital lab access.',
    surcharge: 2500,
    icon: Layers
  }
];

export const BATCH_SCHEDULES = [
  {
    id: 'weekend-morning',
    name: 'Weekend Morning Batch',
    timings: 'Saturday & Sunday • 10:00 AM – 1:00 PM IST',
    target: 'Preferred by Working Software Engineers'
  },
  {
    id: 'weekday-evening',
    name: 'Weekday Evening Batch',
    timings: 'Monday, Wednesday & Friday • 7:30 PM – 9:00 PM IST',
    target: 'Popular for College Students & Daily Learners'
  },
  {
    id: 'sunday-intensive',
    name: 'Sunday Intensive Bootcamp',
    timings: 'Sundays • 9:00 AM – 3:00 PM IST (with Lunch Break)',
    target: 'Fast-Track Weekend Immersion'
  }
];

interface CourseFeeScheduleCalculatorProps {
  onEnroll?: (courseTitle: string) => void;
  onBookDemo?: (level?: string) => void;
  initialCourseId?: string;
  className?: string;
}

export const CourseFeeScheduleCalculator: React.FC<CourseFeeScheduleCalculatorProps> = ({
  onEnroll,
  onBookDemo,
  initialCourseId = 'bundle-n5-n4',
  className = ''
}) => {
  const [selectedCourseId, setSelectedCourseId] = useState<string>(initialCourseId);
  const [selectedModeId, setSelectedModeId] = useState<string>('online');
  const [selectedScheduleId, setSelectedScheduleId] = useState<string>('weekend-morning');
  const [includePhysicalKit, setIncludePhysicalKit] = useState<boolean>(false);
  const [paymentPlan, setPaymentPlan] = useState<'upfront' | 'emi'>('upfront');

  const selectedCourse = COURSE_CATALOG_OPTIONS.find(c => c.id === selectedCourseId) || COURSE_CATALOG_OPTIONS[0];
  const selectedMode = DELIVERY_MODES.find(m => m.id === selectedModeId) || DELIVERY_MODES[0];
  const selectedSchedule = BATCH_SCHEDULES.find(s => s.id === selectedScheduleId) || BATCH_SCHEDULES[0];

  // Financial calculations
  const baseTuition = selectedCourse.basePrice;
  const bundleSavings = selectedCourse.savings || 0;
  const modeSurcharge = selectedMode.surcharge;
  const physicalKitFee = includePhysicalKit ? 1200 : 0;

  const subtotalBeforeDiscounts = baseTuition + modeSurcharge + physicalKitFee;
  // 5% Upfront discount on tuition if upfront payment selected
  const earlyBirdDiscount = paymentPlan === 'upfront' ? Math.round(baseTuition * 0.05) : 0;
  const netPayable = subtotalBeforeDiscounts - earlyBirdDiscount;

  // EMI calculations
  const emiInstallment1 = Math.round(netPayable / 2);
  const emiInstallment2 = netPayable - emiInstallment1;

  // WhatsApp Quote Builder
  const handleShareWhatsAppQuote = () => {
    const message = `Konnichiwa Fuji Japanese Academy!
I calculated my tuition fee for:
- Course: ${selectedCourse.name} (${selectedCourse.duration})
- Learning Mode: ${selectedMode.name}
- Batch Schedule: ${selectedSchedule.name} (${selectedSchedule.timings})
- Materials: ${includePhysicalKit ? 'Physical Kanji Workbooks (+Rs. 1,200)' : 'Digital Workbooks (Free)'}
- Payment Plan: ${paymentPlan === 'upfront' ? 'Full Upfront (5% Discount Applied)' : '2-Installment No-Cost EMI'}
- Net Calculated Fee: Rs. ${netPayable.toLocaleString('en-IN')}

Please share upcoming batch intake dates and enrollment details.`;

    if (typeof window !== 'undefined') {
      window.open(`https://wa.me/919900000000?text=${encodeURIComponent(message)}`, '_blank');
    }
  };

  const handleEnrollClick = () => {
    if (onEnroll) {
      onEnroll(selectedCourse.name);
    } else if (typeof window !== 'undefined') {
      window.location.href = `/payment?course=${encodeURIComponent(selectedCourse.name)}&amount=${netPayable}`;
    }
  };

  const handleDemoClick = () => {
    if (onBookDemo) {
      onBookDemo(selectedCourse.name);
    } else if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('fuji:open-demo-modal', { detail: { level: selectedCourse.name } }));
    }
  };

  return (
    <div className={cn("w-full bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden", className)}>
      {/* Top Header */}
      <div className="bg-gradient-to-r from-fuji-indigo via-[#231d52] to-[#171338] p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-fuji-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300 mb-2">
            <Calculator className="w-3.5 h-3.5" /> Interactive Tuition Fee &amp; Schedule Modeler
          </div>
          <h2 className="text-2xl sm:text-3xl font-display font-bold">
            Course Finder &amp; Fee Schedule Calculator
          </h2>
          <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-2xl leading-relaxed">
            Customize your learning track, choose between live Zoom or Bengaluru classroom batches, toggle no-cost EMI installments, and receive an instant transparent quote.
          </p>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Selectors (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* 1. Track / Course Selection */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-fuji-slate/70 mb-3 flex items-center justify-between">
              <span>1. Choose Course or Combo Bundle</span>
              <span className="text-[11px] font-normal text-fuji-red lowercase">Combos save up to ₹8,000</span>
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {COURSE_CATALOG_OPTIONS.map((c) => {
                const isSelected = selectedCourseId === c.id;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCourseId(c.id)}
                    className={cn(
                      "p-3.5 rounded-2xl border-2 text-left transition-all relative flex flex-col justify-between cursor-pointer",
                      isSelected
                        ? "border-fuji-red bg-red-50/20 shadow-md ring-1 ring-fuji-red/20"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    )}
                  >
                    {c.popular && (
                      <span className="absolute -top-2.5 right-3 bg-fuji-red text-white text-[9px] font-bold uppercase px-2 py-0.5 rounded-full shadow-sm">
                        Best Value
                      </span>
                    )}
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-fuji-slate/60 bg-gray-100 px-2 py-0.5 rounded-md">
                          {c.levelBadge}
                        </span>
                        <span className="text-xs font-bold text-fuji-indigo">
                          ₹{c.basePrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-fuji-indigo leading-tight mt-1">
                        {c.name}
                      </h4>
                      <p className="text-[11px] text-fuji-slate/70 line-clamp-2 mt-1">
                        {c.description}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 mt-2 border-t border-gray-100 text-[10px] font-medium text-fuji-slate/60">
                      <span>⏱️ {c.duration}</span>
                      {c.savings && (
                        <span className="text-emerald-700 font-bold">Save ₹{c.savings.toLocaleString('en-IN')}</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Delivery Mode Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-fuji-slate/70 mb-3">
              2. Select Learning Format &amp; Campus Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {DELIVERY_MODES.map((m) => {
                const isSelected = selectedModeId === m.id;
                const IconComponent = m.icon;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setSelectedModeId(m.id)}
                    className={cn(
                      "p-3 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between",
                      isSelected
                        ? "border-fuji-indigo bg-fuji-indigo/5 shadow-sm"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    )}
                  >
                    <div>
                      <div className="w-8 h-8 rounded-xl bg-gray-100 flex items-center justify-center text-fuji-indigo mb-2">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h4 className="text-xs font-bold text-fuji-indigo leading-snug">
                        {m.name}
                      </h4>
                      <p className="text-[10px] text-fuji-slate/70 mt-1 line-clamp-2 leading-tight">
                        {m.description}
                      </p>
                    </div>
                    {m.surcharge > 0 && (
                      <span className="text-[10px] font-bold text-amber-700 mt-2 block">
                        +₹{m.surcharge.toLocaleString('en-IN')} Hybrid Pass
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Batch Schedule Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-fuji-slate/70 mb-3">
              3. Choose Preferred Batch Schedule
            </label>
            <div className="space-y-2">
              {BATCH_SCHEDULES.map((s) => {
                const isSelected = selectedScheduleId === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedScheduleId(s.id)}
                    className={cn(
                      "w-full p-3 rounded-xl border text-left transition-all flex items-center justify-between gap-3 cursor-pointer",
                      isSelected
                        ? "border-fuji-indigo bg-fuji-indigo/5 text-fuji-indigo font-bold"
                        : "border-gray-200 bg-white text-fuji-slate hover:bg-gray-50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-4 h-4 rounded-full border-2 flex items-center justify-center",
                        isSelected ? "border-fuji-indigo" : "border-gray-300"
                      )}>
                        {isSelected && <div className="w-2 h-2 rounded-full bg-fuji-indigo" />}
                      </div>
                      <div>
                        <span className="text-xs font-bold block">{s.name}</span>
                        <span className="text-[11px] text-fuji-slate/70 font-normal">{s.timings}</span>
                      </div>
                    </div>
                    <span className="text-[10px] bg-white border border-gray-200 px-2 py-0.5 rounded-full text-fuji-slate/70 hidden sm:inline-block">
                      {s.target}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Physical Materials Addon Toggle */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-gray-200 flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-red-100 text-fuji-red flex items-center justify-center flex-shrink-0 mt-0.5">
                <Tag className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-fuji-indigo">
                  Printed Physical Kanji &amp; JLPT Workbook Kit
                </h4>
                <p className="text-[11px] text-fuji-slate/70 leading-relaxed mt-0.5">
                  High-quality spiral stroke-order guides &amp; JLPT practice papers delivered to your doorstep anywhere in India. (Digital PDFs are always included free).
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIncludePhysicalKit(!includePhysicalKit)}
              className={cn(
                "px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex-shrink-0 cursor-pointer border",
                includePhysicalKit
                  ? "bg-fuji-red text-white border-fuji-red shadow-sm"
                  : "bg-white text-fuji-slate border-gray-300 hover:border-gray-400"
              )}
            >
              {includePhysicalKit ? 'Added (+₹1,200)' : '+ Add ₹1,200'}
            </button>
          </div>
        </div>

        {/* Right Column: Live Price Breakdown & CTAs (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-slate-50/90 rounded-3xl p-6 border border-gray-200 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-fuji-slate/70">
                Fee Breakdown
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5" /> 100% Transparent
              </span>
            </div>

            {/* Payment Plan Tabs */}
            <div>
              <span className="text-xs font-bold text-fuji-slate/70 block mb-2">
                Payment Structure Option
              </span>
              <div className="grid grid-cols-2 gap-2 bg-white p-1 rounded-xl border border-gray-200">
                <button
                  type="button"
                  onClick={() => setPaymentPlan('upfront')}
                  className={cn(
                    "py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center",
                    paymentPlan === 'upfront'
                      ? "bg-fuji-indigo text-white shadow-sm"
                      : "text-fuji-slate hover:bg-gray-50"
                  )}
                >
                  <span>One-Time (5% Off)</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentPlan('emi')}
                  className={cn(
                    "py-2 rounded-lg text-xs font-bold transition-all cursor-pointer text-center",
                    paymentPlan === 'emi'
                      ? "bg-fuji-indigo text-white shadow-sm"
                      : "text-fuji-slate hover:bg-gray-50"
                  )}
                >
                  <span>2 No-Cost EMIs</span>
                </button>
              </div>
            </div>

            {/* Line Items */}
            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-fuji-slate">
                <span>Base Course Tuition</span>
                <span className="font-mono font-semibold">₹{baseTuition.toLocaleString('en-IN')}</span>
              </div>

              {bundleSavings > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Combo Bundle Savings</span>
                  <span className="font-mono">-₹{bundleSavings.toLocaleString('en-IN')}</span>
                </div>
              )}

              {modeSurcharge > 0 && (
                <div className="flex justify-between text-fuji-slate">
                  <span>Hybrid Flexi-Pass Upgrade</span>
                  <span className="font-mono">+₹{modeSurcharge.toLocaleString('en-IN')}</span>
                </div>
              )}

              {includePhysicalKit && (
                <div className="flex justify-between text-fuji-slate">
                  <span>Printed Physical Workbook Kit</span>
                  <span className="font-mono">+₹{physicalKitFee.toLocaleString('en-IN')}</span>
                </div>
              )}

              {earlyBirdDiscount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>5% Early-Bird Upfront Discount</span>
                  <span className="font-mono">-₹{earlyBirdDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline">
                <div>
                  <span className="text-sm font-bold text-fuji-indigo block">Total Net Payable</span>
                  <span className="text-[10px] text-fuji-slate/60">Includes GST &amp; Live Training</span>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-display font-bold text-fuji-red">
                    ₹{netPayable.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {paymentPlan === 'emi' && (
                <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-amber-900 text-[11px] space-y-1 mt-2">
                  <div className="font-bold flex items-center justify-between">
                    <span>Installment 1 (Due at Admission):</span>
                    <span className="font-mono">₹{emiInstallment1.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex items-center justify-between text-amber-800">
                    <span>Installment 2 (After 30 Days):</span>
                    <span className="font-mono">₹{emiInstallment2.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleEnrollClick}
                className="w-full py-3.5 bg-fuji-red hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-fuji-red/20 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enroll with Calculated Fee</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleShareWhatsAppQuote}
                className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Share Fee Quote to WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleDemoClick}
                className="w-full py-2.5 bg-white hover:bg-gray-100 text-fuji-indigo border border-gray-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Clock className="w-3.5 h-3.5 text-fuji-red" />
                <span>Book Free Demo Class First</span>
              </button>
            </div>
          </div>

          <div className="text-center text-[11px] text-fuji-slate/60 pt-4">
            🔒 Bank-grade Cashfree 128-bit SSL encrypted payments &amp; GST tax invoice provided upon enrollment.
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseFeeScheduleCalculator;
