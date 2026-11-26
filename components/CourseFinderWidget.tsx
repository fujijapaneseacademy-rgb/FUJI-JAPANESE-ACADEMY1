import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sparkles, ArrowRight, ArrowLeft, CheckCircle2, RotateCcw,
  Briefcase, Award, Globe, Heart, BookOpen, Clock, Calendar, Check
} from 'lucide-react';
import { COURSES } from '../constants';
import { Course } from '../types';
import { trackEvent } from '../src/lib/analytics';

interface CourseFinderWidgetProps {
  onOpenEnrollment: (courseName?: string) => void;
  className?: string;
}

interface QuizAnswers {
  goal?: string;
  experience?: string;
  schedule?: string;
}

export const CourseFinderWidget: React.FC<CourseFinderWidgetProps> = ({
  onOpenEnrollment,
  className = ''
}) => {
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [answers, setAnswers] = useState<QuizAnswers>({});
  const [recommendedCourse, setRecommendedCourse] = useState<Course | null>(null);
  const [recommendationReason, setRecommendationReason] = useState<string>('');

  const GOAL_OPTIONS = [
    {
      id: 'career',
      title: 'Career & Jobs in Japan',
      desc: 'Targeting IT, engineering, nursing (SSW), or corporate roles in Tokyo.',
      icon: <Briefcase className="w-5 h-5 text-fuji-red" />
    },
    {
      id: 'jlpt',
      title: 'JLPT Certification',
      desc: 'Need official internationally recognized Japanese proficiency test credentials.',
      icon: <Award className="w-5 h-5 text-fuji-indigo" />
    },
    {
      id: 'travel',
      title: 'Spoken Fluency & Travel',
      desc: 'Want to speak comfortably with locals, travel, and order without reading Kanji.',
      icon: <Globe className="w-5 h-5 text-emerald-600" />
    },
    {
      id: 'anime',
      title: 'Anime, Manga & Culture',
      desc: 'Passionate about Japanese culture and want to understand media without subtitles.',
      icon: <Heart className="w-5 h-5 text-pink-600" />
    }
  ];

  const EXPERIENCE_OPTIONS = [
    {
      id: 'beginner',
      title: 'Complete Beginner',
      desc: 'Zero prior knowledge. Need to start from Hiragana & Katakana scripts.',
      tag: 'Level 0'
    },
    {
      id: 'elementary',
      title: 'Know Basics / Scripts',
      desc: 'Can read Hiragana/Katakana or practiced on apps, but need formal grammar.',
      tag: 'Pre-N5'
    },
    {
      id: 'n5',
      title: 'Passed JLPT N5 / Elementary',
      desc: 'Know 100+ Kanji, basic particles, and daily Masu/Te verb conjugations.',
      tag: 'N5 Certified'
    },
    {
      id: 'n4',
      title: 'Passed JLPT N4 / Intermediate',
      desc: 'Know 300+ Kanji, passive/causative verbs, and ready for workplace Japanese.',
      tag: 'N4 Certified'
    }
  ];

  const SCHEDULE_OPTIONS = [
    {
      id: 'weekend',
      title: 'Weekend Batches',
      desc: 'Saturdays & Sundays (Morning or Afternoon slots). Ideal for working professionals.',
      icon: <Calendar className="w-5 h-5 text-fuji-indigo" />
    },
    {
      id: 'weekday',
      title: 'Weekday Evening Batches',
      desc: 'Post-work / college evening sessions (7:00 PM – 9:00 PM IST).',
      icon: <Clock className="w-5 h-5 text-fuji-red" />
    },
    {
      id: 'flexible',
      title: 'Self-Paced + Live Doubt Clearing',
      desc: 'Flexible schedule with recorded access and weekly 1-on-1 mentorship.',
      icon: <Sparkles className="w-5 h-5 text-emerald-600" />
    }
  ];

  const handleSelectGoal = (goalId: string) => {
    setAnswers(prev => ({ ...prev, goal: goalId }));
    setCurrentStep(2);
  };

  const handleSelectExperience = (expId: string) => {
    setAnswers(prev => ({ ...prev, experience: expId }));
    setCurrentStep(3);
  };

  const handleSelectSchedule = (schedId: string) => {
    const updatedAnswers = { ...answers, schedule: schedId };
    setAnswers(updatedAnswers);
    calculateRecommendation(updatedAnswers);
    setCurrentStep(4);
  };

  const calculateRecommendation = (finalAnswers: QuizAnswers) => {
    const { goal, experience } = finalAnswers;
    let matchId = 'c1'; // Default JLPT N5
    let reason = '';

    if (experience === 'n4') {
      matchId = 'c3'; // JLPT N3
      reason = 'Since you have cleared N4, JLPT N3 is the exact turning point where Japanese IT companies and Tokyo MNCs start hiring bilingual international talent.';
    } else if (experience === 'n5') {
      matchId = 'c2'; // JLPT N4
      reason = 'With N5 foundation complete, JLPT N4 gives you 300 Kanji and mandatory certification for Japan SSW (Specified Skilled Worker) visas and daily workplace communication.';
    } else if (goal === 'travel' && (experience === 'beginner' || experience === 'elementary')) {
      matchId = 'c6'; // Spoken Japanese
      reason = 'Because your focus is conversational speaking and travel, this course skips Kanji memorization and gets you conversing confidently in practical scenarios in 2 months.';
    } else if (goal === 'anime' && experience === 'beginner') {
      matchId = 'c1'; // JLPT N5
      reason = 'JLPT N5 provides the authentic grammatical backbone to understand Japanese sentence nuances, dialogue structures, and colloquial expressions.';
    } else {
      // Default beginner / career path
      matchId = 'c1'; // JLPT N5
      reason = 'JLPT N5 is the international gold standard foundation. In 3 months, you will master all writing scripts, 103 Kanji, and essential grammar with live native instruction.';
    }

    const matched = COURSES.find(c => c.id === matchId) || COURSES[0];
    setRecommendedCourse(matched);
    setRecommendationReason(reason);
    trackEvent('course_finder_match', {
      recommended_course: matched.title,
      goal: finalAnswers.goal,
      experience: finalAnswers.experience,
      schedule: finalAnswers.schedule
    });
  };

  const handleReset = () => {
    setAnswers({});
    setRecommendedCourse(null);
    setRecommendationReason('');
    setCurrentStep(1);
  };

  return (
    <div className={`bg-gradient-to-br from-white via-fuji-light to-white rounded-[2.5rem] p-6 md:p-10 border border-gray-200 shadow-premium relative overflow-hidden ${className}`}>
      {/* Decorative Accents */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-fuji-red/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-fuji-indigo/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="relative z-10 text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-fuji-red/10 text-fuji-red text-xs font-bold uppercase tracking-wider mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          Interactive 30-Second Course Finder
        </div>
        <h3 className="text-2xl md:text-3xl font-display font-bold text-fuji-indigo">
          Which Japanese Course Is Right For You?
        </h3>
        <p className="text-sm text-fuji-slate/70 mt-2 font-light">
          Answer 3 quick questions to get an instant personalized recommendation with batch timings & fee details.
        </p>

        {/* Step Progress Dots */}
        {currentStep < 4 && (
          <div className="flex items-center justify-center gap-2 mt-5">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`h-2 rounded-full transition-all duration-300 ${
                  currentStep === step
                    ? 'w-8 bg-fuji-red'
                    : currentStep > step
                    ? 'w-2.5 bg-fuji-indigo'
                    : 'w-2.5 bg-gray-200'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Quiz Body */}
      <div className="relative z-10 max-w-3xl mx-auto min-h-[320px] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          
          {/* STEP 1: GOAL */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="text-center text-sm font-semibold text-fuji-indigo mb-2">
                Step 1 of 3: What is your primary objective?
              </div>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {GOAL_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => handleSelectGoal(opt.id)}
                    className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-fuji-red hover:shadow-md transition-all text-left group flex items-start gap-4 active:scale-98 cursor-pointer"
                  >
                    <div className="p-2.5 rounded-xl bg-fuji-light group-hover:bg-red-50 transition-colors flex-shrink-0">
                      {opt.icon}
                    </div>
                    <div>
                      <div className="font-bold text-base text-fuji-indigo group-hover:text-fuji-red transition-colors">
                        {opt.title}
                      </div>
                      <div className="text-xs text-fuji-slate/70 mt-1 leading-relaxed">
                        {opt.desc}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 2: EXPERIENCE */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-fuji-slate/60 hover:text-fuji-indigo transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <div className="text-sm font-semibold text-fuji-indigo">
                  Step 2 of 3: What is your current Japanese experience?
                </div>
                <div className="w-10" />
              </div>
              <div className="grid sm:grid-cols-2 gap-3.5">
                {EXPERIENCE_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => handleSelectExperience(opt.id)}
                    className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-fuji-red hover:shadow-md transition-all text-left group flex items-start justify-between gap-3 active:scale-98 cursor-pointer"
                  >
                    <div>
                      <div className="font-bold text-base text-fuji-indigo group-hover:text-fuji-red transition-colors">
                        {opt.title}
                      </div>
                      <div className="text-xs text-fuji-slate/70 mt-1 leading-relaxed">
                        {opt.desc}
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2.5 py-1 bg-fuji-light text-fuji-indigo rounded-lg flex-shrink-0 group-hover:bg-fuji-red group-hover:text-white transition-colors">
                      {opt.tag}
                    </span>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 3: SCHEDULE */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between mb-2">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-fuji-slate/60 hover:text-fuji-indigo transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
                <div className="text-sm font-semibold text-fuji-indigo">
                  Step 3 of 3: What is your preferred class schedule?
                </div>
                <div className="w-10" />
              </div>
              <div className="grid sm:grid-cols-3 gap-3.5">
                {SCHEDULE_OPTIONS.map((opt) => (
                  <button
                    type="button"
                    key={opt.id}
                    onClick={() => handleSelectSchedule(opt.id)}
                    className="p-5 rounded-2xl bg-white border border-gray-200 hover:border-fuji-red hover:shadow-md transition-all text-left group flex flex-col justify-between active:scale-98 cursor-pointer"
                  >
                    <div>
                      <div className="p-2.5 rounded-xl bg-fuji-light group-hover:bg-red-50 transition-colors w-fit mb-3">
                        {opt.icon}
                      </div>
                      <div className="font-bold text-base text-fuji-indigo group-hover:text-fuji-red transition-colors">
                        {opt.title}
                      </div>
                      <div className="text-xs text-fuji-slate/70 mt-1 leading-relaxed">
                        {opt.desc}
                      </div>
                    </div>
                    <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-bold text-fuji-red flex items-center gap-1">
                      Select <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 4: RESULT */}
          {currentStep === 4 && recommendedCourse && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-md"
            >
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 pb-6 border-b border-gray-100">
                <div className="flex items-center gap-3 text-center md:text-left">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Perfect Match Found!</span>
                    <h4 className="text-2xl font-display font-bold text-fuji-indigo">{recommendedCourse.title}</h4>
                  </div>
                </div>
                <div className="text-center md:text-right">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Admissions Open
                  </div>
                  <div className="text-xs text-fuji-slate/60 mt-1">{recommendedCourse.duration}</div>
                </div>
              </div>

              {/* Match Reason */}
              <div className="my-5 p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/60 text-xs md:text-sm text-emerald-950 leading-relaxed">
                <strong>Why this is your best match: </strong>{recommendationReason}
              </div>

              {/* Course Features Preview */}
              <div className="grid sm:grid-cols-2 gap-2.5 mb-6 text-xs text-fuji-slate/80">
                {recommendedCourse.features.slice(0, 4).map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenEnrollment(recommendedCourse.title)}
                  className="flex-1 py-3.5 px-6 rounded-xl bg-fuji-red text-white font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-fuji-red/30 flex items-center justify-center gap-2 group text-sm active:scale-98 cursor-pointer"
                >
                  Book Free Demo Class in This Level
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <NavLink
                  to={`/courses/${recommendedCourse.slug || recommendedCourse.id}`}
                  className="py-3.5 px-6 rounded-xl border-2 border-fuji-indigo text-fuji-indigo font-bold hover:bg-fuji-indigo hover:text-white transition-all text-center text-sm flex items-center justify-center gap-1.5 active:scale-98"
                >
                  <BookOpen className="w-4 h-4" /> View Full Syllabus
                </NavLink>
                <button
                  type="button"
                  onClick={handleReset}
                  className="py-3.5 px-4 rounded-xl text-fuji-slate/60 hover:text-fuji-red hover:bg-fuji-light transition-all text-xs font-semibold flex items-center justify-center gap-1 cursor-pointer"
                  title="Retake Quiz"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Retake
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
};

export default CourseFinderWidget;
