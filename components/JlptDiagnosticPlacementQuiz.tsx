import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CheckCircle2, XCircle, ArrowRight, RotateCcw, Award,
  Sparkles, Target, BookOpen, Clock, HelpCircle, ChevronRight
} from 'lucide-react';
import { cn } from '../lib/utils';

export interface DiagnosticQuestion {
  id: number;
  category: 'Kana & Script' | 'Particles & Grammar' | 'Verb Conjugation' | 'Situational Dialogue' | 'Kanji Recognition' | 'Sentence Structure';
  categoryKey: 'kana' | 'particles' | 'verbs' | 'dialogue' | 'kanji' | 'structure';
  questionJapanese: string;
  questionRomaji: string;
  questionEnglish: string;
  options: {
    label: string;
    subtext?: string;
  }[];
  correctIndex: number;
  explanation: string;
  grammarTip: string;
}

export const DIAGNOSTIC_QUESTIONS: DiagnosticQuestion[] = [
  {
    id: 1,
    category: 'Kana & Script',
    categoryKey: 'kana',
    questionJapanese: '「とうきょう」を ローマ字で どう 読みますか？',
    questionRomaji: '"Toukyou" wo roomaji de dou yomimasu ka?',
    questionEnglish: 'What is the correct English/Romaji reading of the Japanese word 「とうきょう」?',
    options: [
      { label: 'Tokyo', subtext: 'とう (Tou) + きょう (Kyou)' },
      { label: 'Kyoto', subtext: 'きょう (Kyou) + と (To)' },
      { label: 'Osaka', subtext: 'おお (Oo) + さか (Saka)' },
      { label: 'Fukuoka', subtext: 'ふく (Fuku) + おか (Oka)' }
    ],
    correctIndex: 0,
    explanation: '「とうきょう」combines とう (tō / tou) and きょう (kyō / kyou), representing Tokyo (東京), the capital city of Japan.',
    grammarTip: 'Hiragana utilizes the combination character ょ (small "yo") attached to き (ki) to form the contracted syllable "kyo".'
  },
  {
    id: 2,
    category: 'Particles & Grammar',
    categoryKey: 'particles',
    questionJapanese: 'わたし ______ 田中 です。はじめまして。',
    questionRomaji: 'Watashi ______ Tanaka desu. Hajimemashite.',
    questionEnglish: 'Choose the correct grammatical particle to introduce yourself: "I am Tanaka. Nice to meet you."',
    options: [
      { label: 'を (wo/o)', subtext: 'Direct object marker' },
      { label: 'は (wa)', subtext: 'Topic marker particle' },
      { label: 'に (ni)', subtext: 'Time & destination marker' },
      { label: 'へ (e)', subtext: 'Direction marker' }
    ],
    correctIndex: 1,
    explanation: 'The particle は (pronounced "wa") is the primary topic marker in Japanese, establishing "As for me (わたしは), I am Tanaka."',
    grammarTip: 'Even though it is written with the Hiragana character は (ha), it is always pronounced "wa" when serving as the topic marker.'
  },
  {
    id: 3,
    category: 'Verb Conjugation',
    categoryKey: 'verbs',
    questionJapanese: '動詞「たべます (to eat)」の て形（Te-form）は どれですか？',
    questionRomaji: 'Doushi "tabemasu (to eat)" no Te-kei wa dore desu ka?',
    questionEnglish: 'What is the correct "Te-form" (request/connecting form) for the Group 2 verb 「たべます」?',
    options: [
      { label: 'たべた (Tabeta)', subtext: 'Past plain form' },
      { label: 'たべない (Tabenai)', subtext: 'Negative plain form' },
      { label: 'たべて (Tabete)', subtext: 'Drop -masu and attach -te' },
      { label: 'たべよう (Tabeyou)', subtext: 'Volitional form' }
    ],
    correctIndex: 2,
    explanation: 'For Group 2 (Ichidan) verbs like たべる/たべます, you drop the -ます and append -て to produce 「たべて」 (as in 「たべて ください」= "Please eat").',
    grammarTip: 'Group 2 verbs end with an "i" or "e" sound before -masu (tabe-masu, mi-masu) and conjugate consistently with -te.'
  },
  {
    id: 4,
    category: 'Situational Dialogue',
    categoryKey: 'dialogue',
    questionJapanese: '道に 迷いました。駅の 場所を たずねる時、何と 言いますか？',
    questionRomaji: 'Michi ni mayoimashita. Eki no basho wo tazuneru toki, nanto iimasu ka?',
    questionEnglish: 'You are lost in Tokyo. How do you politely ask a pedestrian where the train station is?',
    options: [
      { label: 'こんにちは、駅に 行きましょう。', subtext: 'Konnichiwa, eki ni ikimashou.' },
      { label: 'さようなら、駅が 好きです。', subtext: 'Sayounara, eki ga suki desu.' },
      { label: 'ありがとう、駅は 高いですね。', subtext: 'Arigatou, eki wa takai desu ne.' },
      { label: 'すみません、駅は どこですか？', subtext: 'Sumimasen, eki wa doko desu ka?' }
    ],
    correctIndex: 3,
    explanation: '「すみません、駅は どこですか？」 translates to "Excuse me, where is the station?". 「どこ」 is the question word for "where".',
    grammarTip: 'Starting with 「すみません」 (Excuse me) is essential Japanese social etiquette before asking for directions.'
  },
  {
    id: 5,
    category: 'Kanji Recognition',
    categoryKey: 'kanji',
    questionJapanese: '漢字「水」の 意味と 読み方は どれですか？',
    questionRomaji: 'Kanji "水" no imi to yomikata wa dore desu ka?',
    questionEnglish: 'What is the primary English meaning and reading of the fundamental Kanji character 「水」?',
    options: [
      { label: 'Fire (ひ / hi)', subtext: 'Kanji character 火' },
      { label: 'Water (みず / mizu)', subtext: 'Essential nature element' },
      { label: 'Tree / Wood (き / ki)', subtext: 'Kanji character 木' },
      { label: 'Gold / Money (かね / kane)', subtext: 'Kanji character 金' }
    ],
    correctIndex: 1,
    explanation: 'The Kanji 「水」 means "Water" with Kun-yomi reading "みず" (mizu) and On-yomi "スイ" (sui), as in 水曜日 (Wednesday).',
    grammarTip: 'In JLPT N5, you master 103 foundational pictographic Kanji including 日, 月, 火, 水, 木, 金, and 土.'
  },
  {
    id: 6,
    category: 'Sentence Structure',
    categoryKey: 'structure',
    questionJapanese: 'きのう、図書館で 日本語を ______。',
    questionRomaji: 'Kinou, toshokan de Nihongo wo ______.',
    questionEnglish: 'Complete the sentence: "Yesterday, I ______ Japanese at the library."',
    options: [
      { label: 'べんきょうします (Benkyou shimasu)', subtext: 'Polite Present/Future Tense' },
      { label: 'べんきょうしません (Benkyou shimasen)', subtext: 'Polite Present Negative' },
      { label: 'べんきょうしました (Benkyou shimashita)', subtext: 'Polite Past Tense' },
      { label: 'べんきょうしたい (Benkyou shitai)', subtext: 'Desire "want to study"' }
    ],
    correctIndex: 2,
    explanation: 'Because the sentence begins with the past time indicator 「きのう」 (Yesterday), the verb must take the polite past affirmative form 「〜ました」.',
    grammarTip: 'In Japanese, time words like 今日 (today), 明日 (tomorrow), and 昨日 (yesterday) set the required verb tense for the sentence.'
  }
];

interface JlptDiagnosticPlacementQuizProps {
  onSelectCourse?: (courseSlug: string) => void;
  onBookDemo?: (level?: string) => void;
  className?: string;
  compact?: boolean;
}

export const JlptDiagnosticPlacementQuiz: React.FC<JlptDiagnosticPlacementQuizProps> = ({
  onSelectCourse,
  onBookDemo,
  className = '',
  compact = false
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [hasAnsweredCurrent, setHasAnsweredCurrent] = useState(false);
  const [isQuizComplete, setIsQuizComplete] = useState(false);

  const currentQuestion = DIAGNOSTIC_QUESTIONS[currentIndex];
  const totalQuestions = DIAGNOSTIC_QUESTIONS.length;

  const handleSelectOption = (optionIndex: number) => {
    if (hasAnsweredCurrent) return;
    setSelectedAnswers(prev => ({ ...prev, [currentIndex]: optionIndex }));
    setHasAnsweredCurrent(true);
  };

  const handleNext = () => {
    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      setHasAnsweredCurrent(selectedAnswers[currentIndex + 1] !== undefined);
    } else {
      setIsQuizComplete(true);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setHasAnsweredCurrent(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswers({});
    setHasAnsweredCurrent(false);
    setIsQuizComplete(false);
  };

  // Score Calculation
  const correctCount = Object.entries(selectedAnswers).reduce((acc, [idx, ans]) => {
    const qIndex = parseInt(idx, 10);
    return acc + (DIAGNOSTIC_QUESTIONS[qIndex]?.correctIndex === ans ? 1 : 0);
  }, 0);

  const scorePercentage = Math.round((correctCount / totalQuestions) * 100);

  // Diagnostic Level Recommendation Logic
  const getRecommendation = () => {
    if (correctCount <= 2) {
      return {
        level: 'JLPT N5 Foundation',
        levelSlug: 'jlpt-n5',
        tagline: 'Recommended: Absolute Beginner to N5 Masterclass',
        summary: 'You are at the ideal starting point! Our structured JLPT N5 curriculum will guide you step-by-step from Kana phonetic writing to 103 foundational Kanji and conversational fluency.',
        highlights: [
          'Master Hiragana & Katakana with native audio stroke-order guides',
          'Learn 103 Kanji and 800+ high-frequency vocabulary words',
          'Weekly live interactive speaking drills with certified senseis'
        ],
        badgeColor: 'bg-emerald-500'
      };
    } else if (correctCount <= 4) {
      return {
        level: 'JLPT N4 Elementary Fast-Track',
        levelSlug: 'jlpt-n4',
        tagline: 'Recommended: JLPT N4 Elementary or N5+N4 Combo Track',
        summary: 'Great baseline comprehension! You have grasped core particles and basic vocabulary. Transitioning to JLPT N4 will double your Kanji count and prepare you for complex sentence structures and Specified Skilled Worker (SSW) eligibility.',
        highlights: [
          'Advance to 300+ Kanji and 1,500 essential vocabulary',
          'Master Te-form, conditional (Tara/Ba), and potential verb conjugations',
          'Simulated timer mock tests matching the Japan Foundation exam'
        ],
        badgeColor: 'bg-blue-600'
      };
    } else {
      return {
        level: 'JLPT N3 Intermediate & IT Career Track',
        levelSlug: 'jlpt-n3',
        tagline: 'Recommended: JLPT N3 Intermediate or Japanese for IT',
        summary: 'Exceptional Japanese aptitude! You demonstrated accurate particle discernment, verb conjugation, and Kanji comprehension. You are ready to tackle intermediate grammar and prepare for high-paying Tokyo IT & corporate opportunities.',
        highlights: [
          'Target the 650 Kanji benchmark demanded by Tokyo software employers',
          'Master business Keigo honorifics and technical sprint standup Japanese',
          'Direct placement assistance and bilingual Japanese resume (Rirekisho) coaching'
        ],
        badgeColor: 'bg-fuji-red'
      };
    }
  };

  const recommendation = getRecommendation();

  return (
    <div className={cn("w-full bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden", className)}>
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-fuji-indigo via-[#262058] to-[#1a1640] p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-fuji-red/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> 2-Minute Diagnostic Placement
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-bold">
              JLPT Readiness &amp; Placement Quiz
            </h3>
            <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-xl">
              Test your grasp of Japanese Kana, particles, verb forms, and Kanji to discover your exact starting benchmark.
            </p>
          </div>

          {!isQuizComplete && (
            <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-white/10 pt-3 sm:pt-0">
              <span className="text-xs text-gray-300 uppercase tracking-wider font-semibold">Progress</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-amber-300">
                {currentIndex + 1} <span className="text-sm text-gray-400 font-normal">/ {totalQuestions}</span>
              </span>
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {!isQuizComplete && (
          <div className="w-full bg-white/10 h-1.5 rounded-full mt-6 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-amber-400 to-fuji-red rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentIndex + (hasAnsweredCurrent ? 1 : 0)) / totalQuestions) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        )}
      </div>

      {/* Main Body */}
      <div className="p-6 sm:p-8">
        <AnimatePresence mode="wait">
          {!isQuizComplete ? (
            <motion.div
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Category & Skill Badge */}
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-fuji-red/10 text-fuji-red border border-fuji-red/20">
                  <Target className="w-3.5 h-3.5" />
                  {currentQuestion.category}
                </span>
                <span className="text-xs text-fuji-slate/60 font-medium">
                  Question {currentIndex + 1} of {totalQuestions}
                </span>
              </div>

              {/* Japanese Prompt */}
              <div className="p-5 sm:p-6 bg-slate-50/80 rounded-2xl border border-gray-100">
                <p className="text-xl sm:text-2xl font-bold text-fuji-indigo font-sans leading-relaxed tracking-wide">
                  {currentQuestion.questionJapanese}
                </p>
                <p className="text-xs sm:text-sm font-mono text-fuji-slate/60 mt-2">
                  {currentQuestion.questionRomaji}
                </p>
                <p className="text-sm sm:text-base font-medium text-fuji-slate mt-2 pt-2 border-t border-gray-200/60">
                  {currentQuestion.questionEnglish}
                </p>
              </div>

              {/* Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentQuestion.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentIndex] === idx;
                  const isCorrect = currentQuestion.correctIndex === idx;
                  const showResultState = hasAnsweredCurrent;

                  let buttonStyle = "border-gray-200 bg-white hover:border-fuji-red/50 hover:bg-red-50/20";
                  let indicatorIcon = <span className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-xs font-bold text-gray-400">{String.fromCharCode(65 + idx)}</span>;

                  if (showResultState) {
                    if (isCorrect) {
                      buttonStyle = "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm";
                      indicatorIcon = <CheckCircle2 className="w-6 h-6 text-emerald-600 fill-emerald-100" />;
                    } else if (isSelected && !isCorrect) {
                      buttonStyle = "border-red-400 bg-red-50 text-red-900 shadow-sm";
                      indicatorIcon = <XCircle className="w-6 h-6 text-red-500 fill-red-100" />;
                    } else {
                      buttonStyle = "border-gray-200 bg-gray-50/50 opacity-60 text-gray-500";
                    }
                  }

                  return (
                    <button
                      key={idx}
                      type="button"
                      disabled={hasAnsweredCurrent}
                      onClick={() => handleSelectOption(idx)}
                      className={cn(
                        "w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 flex items-center justify-between gap-3 cursor-pointer",
                        buttonStyle
                      )}
                    >
                      <div className="flex-1">
                        <span className="text-base sm:text-lg font-bold block leading-snug">
                          {opt.label}
                        </span>
                        {opt.subtext && (
                          <span className="text-xs text-fuji-slate/70 block mt-0.5">
                            {opt.subtext}
                          </span>
                        )}
                      </div>
                      <div className="flex-shrink-0">
                        {indicatorIcon}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Grammar Nuance Card */}
              <AnimatePresence>
                {hasAnsweredCurrent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className={cn(
                      "p-4 sm:p-5 rounded-2xl border text-sm space-y-2",
                      selectedAnswers[currentIndex] === currentQuestion.correctIndex
                        ? "bg-emerald-50/80 border-emerald-200 text-emerald-900"
                        : "bg-amber-50/80 border-amber-200 text-amber-950"
                    )}
                  >
                    <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider">
                      {selectedAnswers[currentIndex] === currentQuestion.correctIndex ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          <span>Correct! Explanation</span>
                        </>
                      ) : (
                        <>
                          <HelpCircle className="w-4 h-4 text-amber-600" />
                          <span>Review &amp; Explanation</span>
                        </>
                      )}
                    </div>
                    <p className="leading-relaxed">
                      {currentQuestion.explanation}
                    </p>
                    <p className="text-xs opacity-80 pt-1 border-t border-black/5 italic">
                      💡 <strong>Sensei Tip:</strong> {currentQuestion.grammarTip}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handlePrev}
                  disabled={currentIndex === 0}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-colors",
                    currentIndex === 0 ? "opacity-30 cursor-not-allowed text-gray-400" : "text-fuji-slate hover:bg-gray-100"
                  )}
                >
                  ← Previous
                </button>

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={!hasAnsweredCurrent}
                  className={cn(
                    "px-6 py-3 rounded-xl text-xs sm:text-sm font-bold flex items-center gap-2 transition-all shadow-md active:scale-95",
                    hasAnsweredCurrent
                      ? "bg-fuji-red text-white hover:bg-red-700 shadow-fuji-red/20 cursor-pointer"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  )}
                >
                  <span>{currentIndex === totalQuestions - 1 ? 'View Full Placement Report' : 'Next Question'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ) : (
            /* Results & Placement Report */
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              {/* Score Gauge & Verdict */}
              <div className="text-center max-w-2xl mx-auto space-y-4">
                <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-tr from-fuji-indigo to-fuji-red text-white shadow-xl shadow-fuji-indigo/20 p-1.5">
                  <div className="w-full h-full rounded-full border-2 border-white/40 flex flex-col items-center justify-center">
                    <span className="text-3xl font-mono font-bold leading-none">{scorePercentage}%</span>
                    <span className="text-[10px] uppercase font-semibold text-white/80 mt-1">Readiness</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-fuji-red">Diagnostic Assessment Complete</span>
                  <h4 className="text-2xl sm:text-3xl font-display font-bold text-fuji-indigo mt-1">
                    Your Placement: {recommendation.level}
                  </h4>
                  <p className="text-fuji-slate/80 text-sm sm:text-base mt-2 leading-relaxed">
                    {recommendation.summary}
                  </p>
                </div>
              </div>

              {/* Skill Category Breakdown */}
              <div className="bg-slate-50 p-6 rounded-2xl border border-gray-100">
                <h5 className="text-xs font-bold uppercase tracking-wider text-fuji-slate/70 mb-4 flex items-center gap-2">
                  <Award className="w-4 h-4 text-fuji-red" /> Diagnostic Skill Breakdown
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {DIAGNOSTIC_QUESTIONS.map((q, idx) => {
                    const isCorrect = selectedAnswers[idx] === q.correctIndex;
                    return (
                      <div key={q.id} className="flex items-center justify-between p-3 bg-white rounded-xl border border-gray-100 text-xs">
                        <span className="font-semibold text-fuji-indigo">{q.category}</span>
                        <span className={cn(
                          "px-2.5 py-0.5 rounded-full font-bold",
                          isCorrect ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-800"
                        )}>
                          {isCorrect ? 'Mastered' : 'Needs Focus'}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Tailored Course Recommendation Card */}
              <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-fuji-indigo via-[#221c54] to-[#16123a] text-white shadow-xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-fuji-red/15 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                  <div className="space-y-3 flex-1">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-amber-300 border border-white/15">
                      Tailored Curriculum Match
                    </span>
                    <h5 className="text-xl sm:text-2xl font-display font-bold">
                      {recommendation.tagline}
                    </h5>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-gray-200">
                      {recommendation.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-amber-300 flex-shrink-0" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="w-full md:w-auto flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        if (onSelectCourse) onSelectCourse(recommendation.levelSlug);
                        else if (typeof window !== 'undefined') window.location.href = `/courses/${recommendation.levelSlug}`;
                      }}
                      className="px-6 py-3.5 bg-fuji-red hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Enroll in {recommendation.level}</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (onBookDemo) onBookDemo(recommendation.level);
                        else if (typeof window !== 'undefined') {
                          window.dispatchEvent(new CustomEvent('fuji:open-demo-modal', { detail: { level: recommendation.level } }));
                        }
                      }}
                      className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Clock className="w-4 h-4 text-amber-300" />
                      <span>Book Free Level Validation Demo</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Retake Action */}
              <div className="flex justify-center pt-2">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-fuji-slate/70 hover:text-fuji-red transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Diagnostic Quiz</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default JlptDiagnosticPlacementQuiz;
