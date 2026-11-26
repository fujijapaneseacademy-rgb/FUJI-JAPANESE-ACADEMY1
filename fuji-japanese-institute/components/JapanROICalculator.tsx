import React, { useState } from 'react';
import { Calculator, TrendingUp, DollarSign, Briefcase, GraduationCap, ArrowRight, Sparkles, Building2, ShieldCheck, Info } from 'lucide-react';

interface CareerPath {
  id: 'it-engineer' | 'ssw-worker' | 'student-visa';
  title: string;
  badge: string;
  requiredJLPT: string;
  monthlyEarningJPY: number;
  monthlyLivingCostJPY: number;
  effectiveTaxRate: number; // Japanese Income Tax + Resident Tax + Social Insurance (Shakai Hoken)
  keyHighlight: string;
  visaType: string;
}

const CAREER_PATHS: Record<string, CareerPath> = {
  'it-engineer': {
    id: 'it-engineer',
    title: 'Bilingual Software / IT Engineer in Tokyo',
    badge: 'Highest Earning Potential',
    requiredJLPT: 'JLPT N3 or N2',
    monthlyEarningJPY: 650000, // ~¥7.8M/yr base
    monthlyLivingCostJPY: 180000,
    effectiveTaxRate: 0.23, // ~23% effective (Income Tax + Resident Tax + Shakai Hoken)
    keyHighlight: 'Starting bilingual IT packages in Tokyo range from ¥6M to ¥12M+ with full visa sponsorship and tech bonuses.',
    visaType: 'Engineer / Specialist in Humanities / International Services'
  },
  'ssw-worker': {
    id: 'ssw-worker',
    title: 'Specified Skilled Worker (SSW 1 & 2)',
    badge: 'Government Bilateral Pathway',
    requiredJLPT: 'JLPT N4 + Skill Evaluation',
    monthlyEarningJPY: 260000, // ~¥3.1M/yr
    monthlyLivingCostJPY: 120000,
    effectiveTaxRate: 0.17, // ~17% effective for mid-bracket
    keyHighlight: 'High demand across Nursing Caregiver, Hospitality, Food Service, and Construction with equal pay protections.',
    visaType: 'Specified Skilled Worker (SSW Status of Residence)'
  },
  'student-visa': {
    id: 'student-visa',
    title: 'Japanese University / Language School Student',
    badge: 'Education + Legal Part-Time Work',
    requiredJLPT: 'JLPT N5 (Basic Minimum)',
    monthlyEarningJPY: 135000, // 28 hrs/week legal part-time @ ~¥1,200/hr
    monthlyLivingCostJPY: 105000,
    effectiveTaxRate: 0.04, // Working student tax-free allowance applies
    keyHighlight: 'Indian students are legally permitted to work 28 hours/week during semesters (40 hours during vacations) to fully cover living expenses.',
    visaType: 'College Student (Ryugaku) Visa'
  }
};

// Baseline exchange rate: 1 JPY = ₹0.56 INR (October 2026 Reference)
const JPY_TO_INR_RATE = 0.56;

export const JapanROICalculator: React.FC<{ className?: string; onOpenEnrollment?: () => void }> = ({
  className = '',
  onOpenEnrollment
}) => {
  const [selectedPathKey, setSelectedPathKey] = useState<'it-engineer' | 'ssw-worker' | 'student-visa'>('it-engineer');
  const [experienceYears, setExperienceYears] = useState<number>(2);

  const activePath = CAREER_PATHS[selectedPathKey];

  // Dynamic experience multiplier for IT Engineers
  const experienceMultiplier = selectedPathKey === 'it-engineer' ? 1 + experienceYears * 0.08 : 1;
  const computedGrossJPY = Math.round(activePath.monthlyEarningJPY * 12 * experienceMultiplier);
  const computedGrossINR = computedGrossJPY * JPY_TO_INR_RATE;
  const computedGrossINRLakhs = (computedGrossINR / 100000).toFixed(2);

  // Model Japanese Taxes & Social Insurance
  const computedTaxJPY = Math.round(computedGrossJPY * activePath.effectiveTaxRate);
  const computedTaxINR = computedTaxJPY * JPY_TO_INR_RATE;
  const computedTaxINRLakhs = (computedTaxINR / 100000).toFixed(2);

  // Post-Tax Take-Home
  const computedNetTakeHomeJPY = computedGrossJPY - computedTaxJPY;

  // Living & Housing Costs (Annual)
  const computedAnnualLivingJPY = activePath.monthlyLivingCostJPY * 12;
  const computedMonthlyLivingINR = activePath.monthlyLivingCostJPY * JPY_TO_INR_RATE;
  const computedMonthlyLivingINRK = (computedMonthlyLivingINR / 1000).toFixed(1);

  // Net Annual Savings in Bank
  const computedSavingsJPY = Math.max(0, computedNetTakeHomeJPY - computedAnnualLivingJPY);
  const computedSavingsINR = computedSavingsJPY * JPY_TO_INR_RATE;
  const computedSavingsINRLakhs = (computedSavingsINR / 100000).toFixed(2);

  return (
    <section className={`w-full py-16 bg-slate-900 text-white rounded-3xl my-12 border border-slate-800 ${className}`} id="roi-calculator">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 text-red-400 text-xs font-bold uppercase tracking-wider mb-3 border border-red-500/30">
            <Calculator className="w-3.5 h-3.5" />
            <span>Financial Planning &amp; Career Modeling</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white mb-2">
            Japan Study &amp; Career ROI Calculator
          </h2>
          <p className="text-sm md:text-base text-slate-300 font-light max-w-2xl mx-auto">
            Compare verified Tokyo salary benchmarks, living costs, and net annual bank savings in JPY (¥) and INR (₹).
          </p>
        </div>

        {/* Path Selection Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-4xl mx-auto mb-8">
          {(Object.keys(CAREER_PATHS) as Array<'it-engineer' | 'ssw-worker' | 'student-visa'>).map((key) => {
            const path = CAREER_PATHS[key];
            const isSelected = selectedPathKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedPathKey(key)}
                className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-red-600 border-red-500 text-white shadow-lg shadow-red-600/30 scale-102'
                    : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                }`}
              >
                <span className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${isSelected ? 'text-red-100' : 'text-slate-400'}`}>
                  {path.badge}
                </span>
                <strong className="text-sm font-bold block leading-snug">
                  {path.title}
                </strong>
                <span className={`text-xs mt-2 block ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                  Target: <strong>{path.requiredJLPT}</strong>
                </span>
              </button>
            );
          })}
        </div>

        {/* Calculator Display Panel */}
        <div className="max-w-4xl mx-auto bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl">
          {selectedPathKey === 'it-engineer' && (
            <div className="mb-8 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-slate-300 block">Years of Software / Tech Experience:</span>
                <span className="text-xs text-slate-400">Higher experience commands significant bilingual salary premiums in Tokyo.</span>
              </div>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="0"
                  max="10"
                  value={experienceYears}
                  onChange={(e) => setExperienceYears(parseInt(e.target.value, 10))}
                  className="w-36 accent-red-600 cursor-pointer"
                />
                <span className="font-extrabold text-sm text-red-400 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                  {experienceYears} Years
                </span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
            {/* Gross Package */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <span className="text-xs font-medium text-slate-400 block mb-1">Gross Annual Compensation</span>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-white">
                  ¥{(computedGrossJPY / 10000).toFixed(0)} 万
                </div>
                <span className="text-xs font-bold text-red-400 mt-1 block">
                  ≈ ₹{computedGrossINRLakhs} Lakhs PA
                </span>
              </div>
              <span className="text-[10px] text-slate-500 mt-2 block">Before tax deductions</span>
            </div>

            {/* Taxes & Social Insurance */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <span className="text-xs font-medium text-slate-400 block mb-1">Taxes &amp; Social Insurance</span>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-amber-400">
                  ¥{(computedTaxJPY / 10000).toFixed(1)} 万
                </div>
                <span className="text-xs font-semibold text-amber-300 mt-1 block">
                  ≈ ₹{computedTaxINRLakhs} Lakhs PA
                </span>
              </div>
              <span className="text-[10px] text-slate-500 mt-2 block">Income, Resident &amp; Shakai Hoken</span>
            </div>

            {/* Monthly Living Expenses */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col justify-between">
              <span className="text-xs font-medium text-slate-400 block mb-1">Monthly Living &amp; Rent</span>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-200">
                  ¥{activePath.monthlyLivingCostJPY.toLocaleString()}
                </div>
                <span className="text-xs font-medium text-slate-300 mt-1 block">
                  ≈ ₹{computedMonthlyLivingINRK}k / month
                </span>
              </div>
              <span className="text-[10px] text-slate-500 mt-2 block">Tokyo metro average</span>
            </div>

            {/* Net Annual Savings */}
            <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950/70 to-slate-900 border border-emerald-500/40 flex flex-col justify-between">
              <span className="text-xs font-medium text-emerald-400 block mb-1">Net Annual Savings</span>
              <div>
                <div className="text-xl sm:text-2xl font-extrabold text-emerald-400">
                  ₹{computedSavingsINRLakhs} Lakhs
                </div>
                <span className="text-xs font-semibold text-emerald-300 mt-1 block">
                  ¥{(computedSavingsJPY / 10000).toFixed(1)} 万 Net in Bank
                </span>
              </div>
              <span className="text-[10px] text-emerald-400/80 mt-2 block">After Tax, Rent &amp; Expenses</span>
            </div>
          </div>

          {/* Details Footnote & Highlights */}
          <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="space-y-1.5 text-center md:text-left">
              <p>
                <strong className="text-slate-200">Visa Classification:</strong> {activePath.visaType}
              </p>
              <p className="text-slate-300">
                {activePath.keyHighlight}
              </p>
              <p className="text-[11px] text-slate-500">
                * Exchange rate modeled at 1 JPY = ₹0.56 INR (October 2026 baseline reference). 1 Lakh INR = ₹100,000. Calculations account for standard Japanese income tax, municipal resident tax (Jūminzei), and statutory health and pension insurance.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                if (onOpenEnrollment) {
                  onOpenEnrollment(activePath.title);
                } else {
                  window.location.href = `/enquire?track=${encodeURIComponent(activePath.id)}`;
                }
              }}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-lg active:scale-95 shrink-0 cursor-pointer"
            >
              <span>Explore {activePath.requiredJLPT} Roadmap</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JapanROICalculator;
