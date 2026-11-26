import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Sparkles, 
  Send,
  GraduationCap
} from 'lucide-react';
import { submitToGoogleSheet } from '../services/formService';

interface QuizAnswer {
  label: string;
  subtext?: string;
  points: {
    level: 'N5' | 'N4' | 'N3' | 'N2';
    track: 'it' | 'study' | 'general';
  };
}

interface Question {
  id: number;
  title: string;
  subtitle: string;
  options: QuizAnswer[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'What is your primary goal for learning Japanese?',
    subtitle: 'This helps us align your target timeline and curriculum.',
    options: [
      {
        label: 'Work in Tokyo as a Software Engineer / Tech Professional',
        subtext: 'Targeting 6M–12M JPY salaries and visa sponsorship',
        points: { level: 'N3', track: 'it' },
      },
      {
        label: 'Higher Studies in Japan (University / MEXT Scholarship)',
        subtext: 'Bachelors, Masters, or Doctoral admissions',
        points: { level: 'N2', track: 'study' },
      },
      {
        label: 'Career Growth in Indian IT GCCs & Japanese MNCs',
        subtext: 'Bilingual Project Manager, Translator, or Consultant',
        points: { level: 'N3', track: 'it' },
      },
      {
        label: 'Personal Interest, Anime, Culture, or Travel',
        subtext: 'Conversational fluency and reading original media',
        points: { level: 'N5', track: 'general' },
      },
    ],
  },
  {
    id: 2,
    title: 'What is your current Japanese language experience?',
    subtitle: 'Be honest—no prior knowledge is totally fine!',
    options: [
      {
        label: 'Complete Absolute Beginner',
        subtext: 'I do not know Hiragana or Katakana yet',
        points: { level: 'N5', track: 'general' },
      },
      {
        label: 'I know Hiragana, Katakana & Basic Phrases',
        subtext: 'I can read basic Japanese characters slowly',
        points: { level: 'N5', track: 'general' },
      },
      {
        label: 'Completed JLPT N5 or equivalent self-study',
        subtext: 'I know around 100 Kanji and basic grammar patterns',
        points: { level: 'N4', track: 'general' },
      },
      {
        label: 'Passed JLPT N4 or higher',
        subtext: 'Comfortable with ~300 Kanji and daily conversational Japanese',
        points: { level: 'N3', track: 'it' },
      },
    ],
  },
  {
    id: 3,
    title: 'How much time can you commit each week?',
    subtitle: 'We offer weekend executive cohorts and flexible weekday evening batches.',
    options: [
      {
        label: '4 to 6 Hours / Week (Weekend Executive Track)',
        subtext: 'Saturdays & Sundays tailored for working professionals',
        points: { level: 'N5', track: 'it' },
      },
      {
        label: '8 to 10 Hours / Week (Weekday Evening Track)',
        subtext: 'Consistent 1.5-hour evening classes 4 days a week',
        points: { level: 'N4', track: 'it' },
      },
      {
        label: '15+ Hours / Week (Intensive Fast-Track)',
        subtext: 'Daily immersive study to clear JLPT in under 6 months',
        points: { level: 'N3', track: 'study' },
      },
    ],
  },
  {
    id: 4,
    title: 'Where do you plan to attend classes?',
    subtitle: 'Both options feature our certified native Japanese sensei.',
    options: [
      {
        label: 'In-Person Classroom at Electronic City, Bengaluru',
        subtext: 'Physical immersive classroom at Vittasandra Cross',
        points: { level: 'N5', track: 'it' },
      },
      {
        label: 'Live Interactive Online Cohort (Zoom + Breakout Rooms)',
        subtext: 'Join from anywhere in India with full session recordings',
        points: { level: 'N5', track: 'general' },
      },
      {
        label: 'Hybrid (Classroom on weekends + Online during weekdays)',
        subtext: 'Maximum flexibility for IT engineers in Bengaluru',
        points: { level: 'N4', track: 'it' },
      },
    ],
  },
];

export const JlptCareerQuiz: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSelectOption = (option: QuizAnswer) => {
    const updated = [...answers, option];
    setAnswers(updated);
    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setCurrentStep(QUESTIONS.length);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setIsSubmitted(false);
  };

interface RecommendationResult {
  targetLevel: 'N5' | 'N4' | 'N3' | 'N2';
  track: string;
}

  const determineRecommendation = (): RecommendationResult => {
    const trackCounts: Record<string, number> = { it: 0, study: 0, general: 0 };
    let highestLevel: 'N5' | 'N4' | 'N3' | 'N2' = 'N5';

    for (const ans of answers) {
      trackCounts[ans.points.track] = (trackCounts[ans.points.track] || 0) + 1;
      if (ans.points.level === 'N2') highestLevel = 'N2';
      else if (ans.points.level === 'N3' && highestLevel !== 'N2') highestLevel = 'N3';
      else if (ans.points.level === 'N4' && highestLevel !== 'N3' && highestLevel !== 'N2') highestLevel = 'N4';
    }

    const primaryTrack = Object.keys(trackCounts).reduce((a, b) =>
      trackCounts[a] > trackCounts[b] ? a : b
    );

    return {
      targetLevel: highestLevel,
      track: primaryTrack,
    };
  };

  const recommendation = answers.length === QUESTIONS.length ? determineRecommendation() : null;

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    const rec = recommendation || { targetLevel: 'N5', track: 'general' };
    submitToGoogleSheet({
      formType: 'Demo Inquiry',
      name: userName,
      email: userEmail,
      phone: userPhone,
      course: `JLPT ${rec.targetLevel} Assessment (${rec.track.toUpperCase()} Track)`,
      message: `Assessment completed. Recommended Level: JLPT ${rec.targetLevel}, Preferred Track: ${rec.track}`
    }).catch(err => {
      console.warn('Quiz lead submission fallback:', err);
    });
  };

  const getWhatsAppUrl = () => {
    const rec = recommendation || { targetLevel: 'N5', track: 'it' };
    const text = encodeURIComponent(
      `Hello Fuji Japanese Academy Team! I just completed your JLPT Career Assessment.\n\n` +
      `👤 Name: ${userName || 'Student'}\n` +
      `🎯 Recommended Level: JLPT ${rec.targetLevel}\n` +
      `💼 Preferred Track: ${rec.track.toUpperCase()}\n` +
      `📍 Center Preference: Bengaluru / Live Online\n\n` +
      `I would like to schedule my free 1-on-1 counseling session and receive the detailed syllabus.`
    );
    return `https://wa.me/916364924110?text=${text}`;
  };

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-b from-gray-50 to-white text-gray-900" id="jlpt-quiz">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-red-600 font-bold text-xs uppercase tracking-wider mb-3">
            <Sparkles className="w-4 h-4" />
            <span>Interactive Roadmap Engine</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Which JLPT Level &amp; Career Pathway Is Right for You?
          </h2>
          <p className="text-gray-600 mt-2 text-sm sm:text-base max-w-xl mx-auto">
            Take our 60-second assessment designed by certified native educators to discover your optimal JLPT milestones and Tokyo salary potential.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2.5 rounded-full mb-8 overflow-hidden">
          <div
            className="bg-red-600 h-full transition-all duration-300 ease-out"
            style={{ width: `${((currentStep + 1) / (QUESTIONS.length + 1)) * 100}%` }}
          />
        </div>

        {/* Card Body */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 sm:p-10">
          {currentStep < QUESTIONS.length && (
            <AnimatePresence mode="wait">
              <motion.div
                key={QUESTIONS[currentStep].id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-6">
                  <span className="text-xs font-bold text-red-600 uppercase tracking-widest">
                    Step {currentStep + 1} of {QUESTIONS.length}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
                    {QUESTIONS[currentStep].title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {QUESTIONS[currentStep].subtitle}
                  </p>
                </div>

                <div className="space-y-3.5">
                  {QUESTIONS[currentStep].options.map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(option)}
                      className="w-full text-left p-4 sm:p-5 rounded-2xl border-2 border-gray-100 hover:border-red-600 hover:bg-red-50/30 transition-all duration-200 group flex items-start justify-between cursor-pointer"
                    >
                      <div>
                        <div className="font-bold text-gray-900 text-sm sm:text-base group-hover:text-red-700">
                          {option.label}
                        </div>
                        {option.subtext && (
                          <div className="text-xs sm:text-sm text-gray-500 mt-0.5">
                            {option.subtext}
                          </div>
                        )}
                      </div>
                      <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600 group-hover:translate-x-1 transition-transform flex-shrink-0 mt-0.5" />
                    </button>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Lead Capture Step */}
          {currentStep === QUESTIONS.length && !isSubmitted && (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Your Personalized Roadmap is Ready!
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  Enter your contact details below to unlock your custom JLPT curriculum blueprint and Tokyo tech salary forecast.
                </p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-4 max-w-md mx-auto">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    WhatsApp Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="e.g. +91 98765 43210"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="e.g. rahul.sharma@gmail.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm sm:text-base shadow-lg shadow-red-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Reveal My Custom Roadmap</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}

          {/* Result Presentation & WhatsApp Pre-fill */}
          {isSubmitted && recommendation && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <div className="p-6 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border border-red-100">
                <span className="text-xs font-bold uppercase tracking-wider text-red-600">
                  Recommended Learning Milestone
                </span>
                <h4 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mt-1">
                  {recommendation.targetLevel === 'N5' && 'Start with JLPT N5 Foundation Course'}
                  {recommendation.targetLevel === 'N4' && 'Fast-Track to JLPT N4 Elementary'}
                  {recommendation.targetLevel === 'N3' && 'Career Accelerator: JLPT N3 + IT Japanese'}
                  {recommendation.targetLevel === 'N2' && 'Advanced Fluency: JLPT N2 Business'}
                </h4>
                <p className="text-sm text-gray-700 mt-2 leading-relaxed">
                  Based on your goals, our academic directors recommend a structured roadmap targeting{' '}
                  <strong>JLPT {recommendation.targetLevel}</strong>. In just 3–6 months, you can master foundational Kanji, conversational patterns, and start qualifying for Japan-focused corporate roles.
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-red-200/60 text-center">
                  <div className="p-3 bg-white rounded-xl shadow-xs">
                    <div className="text-xs text-gray-500">Estimated Duration</div>
                    <div className="text-sm sm:text-base font-bold text-gray-900">
                      {recommendation.targetLevel === 'N5' ? '12 Weeks' : '16–20 Weeks'}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-xs">
                    <div className="text-xs text-gray-500">Average Salary</div>
                    <div className="text-sm sm:text-base font-bold text-red-600">
                      {recommendation.track === 'it' ? '¥6.5M – ¥9M JPY' : '₹12L – ₹18L INR'}
                    </div>
                  </div>
                  <div className="p-3 bg-white rounded-xl shadow-xs col-span-2 sm:col-span-1">
                    <div className="text-xs text-gray-500">Class Mode</div>
                    <div className="text-sm sm:text-base font-bold text-gray-900">
                      Electronic City / Live Zoom
                    </div>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Action Button */}
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-center shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  <span>Chat with Academic Counselor on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="py-4 px-6 rounded-2xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-center transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake</span>
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default JlptCareerQuiz;
