import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Clock,
  CheckCircle2,
  XCircle,
  Award,
  AlertTriangle,
  ArrowRight,
  ArrowLeft,
  RotateCcw,
  Bookmark,
  Sparkles,
  BookOpen,
  Layers,
  Check,
  ChevronRight,
  FileText,
  HelpCircle,
  Flame,
  ShieldCheck,
  Send
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import CertificateModal from '../components/CertificateModal';
import { MOCK_EXAM_LEVELS, MockExamLevel, MockQuestion } from '../data/mockTestData';

type ExamStatus = 'idle' | 'running' | 'completed';

export default function MockTestPage() {
  const [selectedLevelId, setSelectedLevelId] = useState<'N5' | 'N4' | 'N3'>('N5');
  const [examStatus, setExamStatus] = useState<ExamStatus>('idle');
  const [candidateName, setCandidateName] = useState<string>('');
  const [currentQIndex, setCurrentQIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [secondsRemaining, setSecondsRemaining] = useState<number>(0);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showCertModal, setShowCertModal] = useState<boolean>(false);
  const [showReviewDetails, setShowReviewDetails] = useState<boolean>(false);

  const activeLevel: MockExamLevel = MOCK_EXAM_LEVELS[selectedLevelId];
  const timerRef = useRef<number | null>(null);

  // Initialize and handle Countdown Timer
  useEffect(() => {
    if (examStatus === 'running') {
      timerRef.current = window.setInterval(() => {
        setSecondsRemaining(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setTimeout(() => handleFinishExam(), 0);
            return 0;
          }
          return prev - 1;
        });
        setTimeSpentSeconds(prev => prev + 1);
      }, 1000);
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [examStatus]);

  const handleStartExam = () => {
    setUserAnswers({});
    setFlaggedQuestions(new Set());
    setCurrentQIndex(0);
    setSecondsRemaining(activeLevel.durationMinutes * 60);
    setTimeSpentSeconds(0);
    setExamStatus('running');
    setShowReviewDetails(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectOption = (qId: number, optionIdx: number) => {
    if (examStatus !== 'running') return;
    setUserAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const toggleFlagQuestion = (qId: number) => {
    setFlaggedQuestions(prev => {
      const next = new Set(prev);
      if (next.has(qId)) {
        next.delete(qId);
      } else {
        next.add(qId);
      }
      return next;
    });
  };

  const handleFinishExam = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setShowSubmitModal(false);
    setExamStatus('completed');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRetake = () => {
    handleStartExam();
  };

  // Calculations for Score & Analysis
  interface ExamResults {
    totalScore: number;
    percentage: number;
    isPassed: boolean;
    sectionBreakdown: Record<string, { total: number; correct: number }>;
  }

  const results: ExamResults = useMemo(() => {
    if (examStatus !== 'completed') {
      return { totalScore: 0, percentage: 0, isPassed: false, sectionBreakdown: {} };
    }

    let correctCount = 0;
    const sectionMap: Record<string, { total: number; correct: number }> = {
      'Kanji & Vocab': { total: 0, correct: 0 },
      'Grammar': { total: 0, correct: 0 },
      'Reading': { total: 0, correct: 0 }
    };

    activeLevel.questions.forEach(q => {
      const isCorrect = userAnswers[q.id] === q.correctIndex;
      if (isCorrect) correctCount += 1;

      if (!sectionMap[q.section]) {
        sectionMap[q.section] = { total: 0, correct: 0 };
      }
      sectionMap[q.section].total += 1;
      if (isCorrect) sectionMap[q.section].correct += 1;
    });

    const totalQuestions = activeLevel.questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const isPassed = percentage >= activeLevel.passingScorePercent;

    return {
      totalScore: correctCount,
      percentage,
      isPassed,
      sectionBreakdown: sectionMap
    };
  }, [examStatus, userAnswers, activeLevel]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const answeredCount = Object.keys(userAnswers).length;
  const currentQuestion: MockQuestion | undefined = activeLevel.questions[currentQIndex];

  return (
    <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
      <Helmet>
        <title>{examStatus === 'idle' ? 'JLPT Mock Test Online | Free N5, N4, N3 Practice Exam | Fuji Japanese Academy' : `Official JLPT ${selectedLevelId} Exam Simulator | Fuji Japanese Academy`}</title>
        <meta
          name="description"
          content="Take our free interactive JLPT mock test for N5, N4, and N3 levels. Timed simulated questions covering Kanji, Vocabulary, Grammar and Reading with instant certificate generation."
        />
        <link rel="canonical" href="https://fujijapaneseacademy.com/mock-test" />
      </Helmet>

      <CertificateModal
        isOpen={showCertModal}
        onClose={() => setShowCertModal(false)}
        studentName={candidateName.trim() || 'JLPT Candidate'}
        courseLevel={`JLPT ${selectedLevelId} Mini Benchmark Assessment`}
        score={results.totalScore}
        totalScore={activeLevel.questions.length}
        percentage={results.percentage}
        isPassed={results.isPassed}
        onUpdateName={setCandidateName}
      />

      <div className="container mx-auto px-4 md:px-6 py-6 md:py-10 max-w-4xl">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: 'Practice Hub', path: '/practice' },
            { label: 'JLPT Exam Simulator', path: '/mock-test' }
          ]}
          className="mb-6"
        />

        {/* 1. IDLE STATE: Level Selection & Exam Briefing */}
        {examStatus === 'idle' && (
          <div className="space-y-8 animate-fade-in">
            {/* Header Banner */}
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 text-fuji-red border border-red-200 text-xs font-bold uppercase tracking-wider mb-4">
                <Flame className="w-4 h-4 text-fuji-red" />
                <span>Simulated Japanese Language Proficiency Test</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-fuji-indigo tracking-tight">
                JLPT Mini-Exam <span className="text-fuji-red">Simulator</span>
              </h1>
              <p className="mt-3 text-sm sm:text-base text-fuji-slate/80 leading-relaxed">
                Test your authentic readiness under real exam pressure. Experience strict countdown timing, balanced Kanji/Grammar/Reading sections, and receive instant performance metrics.
              </p>
            </div>

            {/* Level Selector Cards */}
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-fuji-slate/70 mb-3">
                1. Select Target JLPT Level
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {(['N5', 'N4', 'N3'] as const).map(lvlKey => {
                  const lvlData = MOCK_EXAM_LEVELS[lvlKey];
                  const isSelected = selectedLevelId === lvlKey;
                  return (
                    <button
                      type="button"
                      key={lvlKey}
                      onClick={() => setSelectedLevelId(lvlKey)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all cursor-pointer relative ${
                        isSelected
                          ? 'border-fuji-red bg-red-50/40 shadow-lg shadow-red-600/10'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-black font-display text-fuji-indigo">
                          JLPT {lvlKey}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            isSelected ? 'bg-fuji-red text-white' : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {lvlData.badge}
                        </span>
                      </div>
                      <p className="text-xs text-fuji-slate/70 leading-relaxed mb-4">
                        {lvlData.description}
                      </p>
                      <div className="flex items-center gap-3 text-[11px] text-fuji-slate/60 pt-3 border-t border-gray-100">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5 text-fuji-red" /> {lvlData.durationMinutes} Mins
                        </span>
                        <span className="flex items-center gap-1">
                          <FileText className="w-3.5 h-3.5 text-fuji-indigo" /> {lvlData.questions.length} Questions
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Candidate Name Input for Certificate */}
            <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <label className="block text-xs font-bold uppercase tracking-wider text-fuji-slate/80 mb-2">
                Candidate Name for Certificate Preview (Optional)
              </label>
              <input
                type="text"
                value={candidateName}
                onChange={e => setCandidateName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full px-4 py-3 bg-slate-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-fuji-red/30 transition-all"
              />
              <p className="text-[11px] text-gray-400 mt-1.5">
                Pass with &ge;60% to unlock your Fuji Academy Certificate of Assessment.
              </p>
            </div>

            {/* Exam Rules & Launch Action */}
            <div className="bg-gradient-to-br from-fuji-indigo to-[#1c194a] text-white p-6 sm:p-8 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="space-y-2">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" /> Exam Conditions Ready
                </h3>
                <ul className="text-xs sm:text-sm text-indigo-100/80 space-y-1">
                  <li>• {activeLevel.questions.length} questions across Kanji, Grammar, and Reading.</li>
                  <li>• Strict {activeLevel.durationMinutes}-minute countdown timer with auto-submit.</li>
                  <li>• Detailed Japanese grammatical analysis upon completion.</li>
                </ul>
              </div>
              <button
                type="button"
                onClick={handleStartExam}
                className="w-full sm:w-auto px-8 py-4 bg-fuji-red hover:bg-rose-600 text-white font-bold rounded-2xl shadow-lg shadow-fuji-red/30 transition-all flex items-center justify-center gap-2 text-base cursor-pointer hover:scale-[1.02] active:scale-95 whitespace-nowrap"
              >
                <span>Begin JLPT {selectedLevelId} Exam</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* 2. EXAM RUNNING STATE: Interactive Timer & Question Engine */}
        {examStatus === 'running' && currentQuestion && (
          <div className="space-y-6 animate-fade-in">
            {/* Top Fixed Control Bar */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-lg bg-fuji-indigo text-white text-xs font-black uppercase tracking-wider">
                  JLPT {selectedLevelId}
                </span>
                <span className="text-xs font-bold text-gray-500">
                  Question {currentQIndex + 1} of {activeLevel.questions.length}
                </span>
              </div>

              {/* Timer Display */}
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl font-mono text-sm font-bold border transition-colors ${
                  secondsRemaining < 120
                    ? 'bg-rose-50 border-rose-300 text-rose-600 animate-pulse'
                    : secondsRemaining < 300
                    ? 'bg-amber-50 border-amber-300 text-amber-700'
                    : 'bg-slate-50 border-gray-200 text-fuji-indigo'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>

              {/* Progress & Submit Action */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleFlagQuestion(currentQuestion.id)}
                  title="Bookmark for review"
                  className={`p-2 rounded-xl border text-xs font-bold flex items-center gap-1 transition-all cursor-pointer ${
                    flaggedQuestions.has(currentQuestion.id)
                      ? 'bg-amber-100 border-amber-300 text-amber-800'
                      : 'bg-gray-50 border-gray-200 text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  <span className="hidden sm:inline">
                    {flaggedQuestions.has(currentQuestion.id) ? 'Flagged' : 'Flag'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="px-4 py-2 bg-fuji-indigo hover:bg-fuji-red text-white text-xs font-bold rounded-xl transition-all cursor-pointer"
                >
                  Submit Exam
                </button>
              </div>
            </div>

            {/* Question Palette Grid */}
            <div className="bg-white p-3.5 rounded-2xl border border-gray-100 shadow-xs">
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span className="font-semibold">Question Navigator</span>
                <span className="text-[11px] font-medium text-gray-400">
                  {answeredCount} of {activeLevel.questions.length} Answered
                </span>
              </div>
              <div className="grid grid-cols-6 sm:grid-cols-12 gap-1.5">
                {activeLevel.questions.map((q, idx) => {
                  const isAnswered = userAnswers[q.id] !== undefined;
                  const isCurrent = idx === currentQIndex;
                  const isFlagged = flaggedQuestions.has(q.id);

                  let bgClass = 'bg-gray-50 text-gray-600 border-gray-200';
                  if (isCurrent) {
                    bgClass = 'bg-fuji-red text-white border-fuji-red font-bold ring-2 ring-red-200';
                  } else if (isFlagged) {
                    bgClass = 'bg-amber-100 text-amber-900 border-amber-300 font-bold';
                  } else if (isAnswered) {
                    bgClass = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-semibold';
                  }

                  return (
                    <button
                      type="button"
                      key={q.id}
                      onClick={() => setCurrentQIndex(idx)}
                      className={`h-8 rounded-lg border text-xs flex items-center justify-center transition-all cursor-pointer ${bgClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Question Panel */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-md">
              <div className="flex items-center justify-between gap-2 mb-4">
                <span className="px-3 py-1 rounded-full bg-slate-100 text-fuji-indigo text-xs font-bold uppercase tracking-wider">
                  {currentQuestion.section}
                </span>
                {flaggedQuestions.has(currentQuestion.id) && (
                  <span className="text-[11px] font-bold text-amber-600 flex items-center gap-1">
                    <Bookmark className="w-3.5 h-3.5" /> Review Flagged
                  </span>
                )}
              </div>

              {/* Reading Passage if applicable */}
              {currentQuestion.readingPassage && (
                <div className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/80 mb-6 text-sm sm:text-base leading-relaxed text-slate-800 font-medium">
                  <span className="text-xs font-bold uppercase text-amber-800 tracking-wider block mb-1">
                    Passage for Reading Comprehension:
                  </span>
                  <p>{currentQuestion.readingPassage}</p>
                </div>
              )}

              {/* Question Text */}
              <h2 className="text-lg sm:text-xl font-bold font-display text-fuji-indigo mb-2 leading-relaxed">
                {currentQuestion.question}
              </h2>
              {currentQuestion.context && (
                <p className="text-xs sm:text-sm text-gray-500 italic mb-6">
                  {currentQuestion.context}
                </p>
              )}

              {/* Option Choices */}
              <div className="space-y-3 mb-8">
                {currentQuestion.options.map((optionText, optIdx) => {
                  const isSelected = userAnswers[currentQuestion.id] === optIdx;
                  return (
                    <button
                      type="button"
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQuestion.id, optIdx)}
                      className={`w-full p-4 rounded-2xl border text-left text-sm sm:text-base flex items-center justify-between transition-all cursor-pointer ${
                        isSelected
                          ? 'border-fuji-red bg-red-50/50 text-fuji-indigo font-bold shadow-sm ring-1 ring-red-400'
                          : 'border-gray-200 bg-gray-50/50 hover:bg-gray-100/80 text-gray-800'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-7 h-7 rounded-xl border text-xs font-bold flex items-center justify-center ${
                            isSelected
                              ? 'bg-fuji-red text-white border-fuji-red'
                              : 'bg-white border-gray-300 text-gray-500'
                          }`}
                        >
                          {optIdx + 1}
                        </span>
                        <span>{optionText}</span>
                      </div>
                      {isSelected && (
                        <Check className="w-5 h-5 text-fuji-red flex-shrink-0" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setCurrentQIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentQIndex === 0}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-bold text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous
                </button>

                {currentQIndex < activeLevel.questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentQIndex(prev => prev + 1)}
                    className="px-5 py-2.5 rounded-xl bg-fuji-indigo hover:bg-[#25225c] text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
                  >
                    Next <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSubmitModal(true)}
                    className="px-6 py-2.5 rounded-xl bg-fuji-red hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-md"
                  >
                    Finish Exam <CheckCircle2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* 3. EXAM COMPLETED / RESULTS STATE */}
        {examStatus === 'completed' && (
          <div className="space-y-8 animate-fade-in">
            {/* Score Showcase Hero */}
            <div className="bg-white rounded-3xl p-6 sm:p-10 border border-gray-100 shadow-xl text-center relative overflow-hidden">
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  results.isPassed
                    ? 'bg-emerald-100 text-emerald-600'
                    : 'bg-rose-100 text-fuji-red'
                }`}
              >
                {results.isPassed ? (
                  <Award className="w-10 h-10" />
                ) : (
                  <AlertTriangle className="w-10 h-10" />
                )}
              </div>

              <span
                className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                  results.isPassed
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : 'bg-rose-50 text-rose-700 border border-rose-200'
                }`}
              >
                {results.isPassed ? 'JLPT Benchmark Qualified' : 'Revision Required'}
              </span>

              <h2 className="text-3xl sm:text-4xl font-display font-black text-fuji-indigo mt-3 mb-2">
                Score: {results.totalScore} / {activeLevel.questions.length} ({results.percentage}%)
              </h2>

              <p className="text-sm text-fuji-slate/80 max-w-lg mx-auto">
                {results.isPassed
                  ? `Congratulations! You cleared the JLPT ${selectedLevelId} benchmark threshold of ${activeLevel.passingScorePercent}%. Your foundational comprehension is battle-tested.`
                  : `You scored ${results.percentage}%, just below the official ${activeLevel.passingScorePercent}% threshold. Review your detailed answer breakdown below and retry.`}
              </p>

              {/* Key Meta Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-gray-100">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <div className="text-[11px] text-gray-500 font-medium">Level</div>
                  <div className="text-sm font-bold text-fuji-indigo">JLPT {selectedLevelId}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <div className="text-[11px] text-gray-500 font-medium">Time Taken</div>
                  <div className="text-sm font-bold text-fuji-indigo">{formatTime(timeSpentSeconds)}</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <div className="text-[11px] text-gray-500 font-medium">Accuracy</div>
                  <div className="text-sm font-bold text-fuji-indigo">{results.percentage}%</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <div className="text-[11px] text-gray-500 font-medium">Result</div>
                  <div className={`text-sm font-bold ${results.isPassed ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {results.isPassed ? 'PASS' : 'RETRY'}
                  </div>
                </div>
              </div>

              {/* Certificate Preview Card */}
              <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-red-50 via-amber-50/50 to-orange-50 border border-red-200 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
                <div className="text-left w-full md:w-auto">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-100/80 text-fuji-red text-[10px] font-bold uppercase tracking-wider mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>DPIIT &amp; ISO 9001:2015 Verified Template</span>
                  </div>
                  <h4 className="font-bold text-sm text-fuji-indigo">
                    JLPT {selectedLevelId} Mini Benchmark Certificate of Completion
                  </h4>
                  <p className="text-xs text-gray-600 mt-0.5">
                    Includes your verified score of <strong className="text-fuji-indigo font-bold">{results.totalScore}/{activeLevel.questions.length} ({results.percentage}%)</strong> with Director &amp; Founder signatures.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full md:w-auto">
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    placeholder="Candidate Full Name"
                    className="px-3.5 py-2 bg-white border border-red-200 rounded-xl text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-fuji-red/30 w-full sm:w-56 shadow-xs"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCertModal(true)}
                    className="w-full sm:w-auto px-5 py-2.5 bg-fuji-red hover:bg-rose-600 text-white text-xs font-bold rounded-xl shadow-md shadow-red-600/20 transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <Award className="w-4 h-4" /> View Benchmark Certificate
                  </button>
                </div>
              </div>
            </div>

            {/* Section Breakdown Grid */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-wider text-fuji-indigo mb-4">
                Section Competency Breakdown
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.entries(results.sectionBreakdown).map(([secName, secData]) => {
                  const secPct = secData.total > 0 ? Math.round((secData.correct / secData.total) * 100) : 0;
                  return (
                    <div key={secName} className="p-4 rounded-2xl bg-slate-50 border border-gray-100">
                      <div className="flex justify-between items-center text-xs font-bold text-fuji-indigo mb-1">
                        <span>{secName}</span>
                        <span>{secData.correct}/{secData.total} ({secPct}%)</span>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden mt-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-500 ${
                            secPct >= 60 ? 'bg-emerald-500' : 'bg-fuji-red'
                          }`}
                          style={{ width: `${secPct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Detailed Question Review Accordion / Toggle */}
            <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-base font-bold text-fuji-indigo">
                    Question-by-Question Review
                  </h3>
                  <p className="text-xs text-gray-500">
                    Verify the correct linguistic principles and grammatical rules.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowReviewDetails(prev => !prev)}
                  className="px-4 py-2 rounded-xl border border-gray-200 text-xs font-bold text-fuji-indigo hover:bg-gray-50 transition-all cursor-pointer"
                >
                  {showReviewDetails ? 'Hide Explanations' : 'View Explanations'}
                </button>
              </div>

              {showReviewDetails && (
                <div className="space-y-4 pt-4 border-t border-gray-100 animate-fade-in">
                  {activeLevel.questions.map((q, idx) => {
                    const candidateAns = userAnswers[q.id];
                    const isCorrect = candidateAns === q.correctIndex;

                    return (
                      <div
                        key={q.id}
                        className={`p-4 rounded-2xl border transition-all ${
                          isCorrect ? 'border-emerald-200 bg-emerald-50/30' : 'border-rose-200 bg-rose-50/30'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-xs font-bold text-fuji-indigo">
                            Question {idx + 1} ({q.section})
                          </span>
                          {isCorrect ? (
                            <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                              <CheckCircle2 className="w-4 h-4" /> Correct
                            </span>
                          ) : (
                            <span className="text-xs font-bold text-rose-600 flex items-center gap-1">
                              <XCircle className="w-4 h-4" /> Incorrect
                            </span>
                          )}
                        </div>

                        <p className="text-sm font-bold text-fuji-indigo mb-2">
                          {q.question}
                        </p>

                        <div className="text-xs space-y-1 mb-3">
                          <div className="text-gray-600">
                            Your Answer:{' '}
                            <span className="font-semibold text-fuji-slate">
                              {candidateAns !== undefined ? q.options[candidateAns] : 'Not Answered'}
                            </span>
                          </div>
                          <div className="text-emerald-700 font-semibold">
                            Correct Answer: {q.options[q.correctIndex]}
                          </div>
                        </div>

                        <div className="p-3 bg-white/80 rounded-xl border border-gray-200/80 text-xs text-gray-700 leading-relaxed">
                          <span className="font-bold text-fuji-indigo block mb-0.5">
                            Explanation:
                          </span>
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={handleRetake}
                className="w-full sm:w-auto px-6 py-3.5 bg-gray-100 hover:bg-gray-200 text-fuji-indigo font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" /> Retake Exam
              </button>
              <button
                type="button"
                onClick={() => setExamStatus('idle')}
                className="w-full sm:w-auto px-6 py-3.5 bg-fuji-indigo hover:bg-slate-900 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
              >
                Change Level <Layers className="w-4 h-4" />
              </button>
              <Link
                to="/enquire"
                className="w-full sm:w-auto px-6 py-3.5 bg-fuji-red hover:bg-rose-600 text-white font-bold rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                Enroll in Live JLPT Batches <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

        {/* Submit Confirmation Modal */}
        {showSubmitModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 space-y-4">
              <div className="flex items-center gap-3 text-amber-600">
                <AlertTriangle className="w-6 h-6" />
                <h4 className="font-display font-bold text-base text-fuji-indigo">
                  Submit Examination?
                </h4>
              </div>

              <p className="text-xs text-gray-600 leading-relaxed">
                You have answered <strong>{answeredCount}</strong> of{' '}
                <strong>{activeLevel.questions.length}</strong> questions.
                {answeredCount < activeLevel.questions.length && (
                  <span className="text-rose-600 block mt-1">
                    Warning: You still have {activeLevel.questions.length - answeredCount} unanswered questions!
                  </span>
                )}
              </p>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Continue Test
                </button>
                <button
                  type="button"
                  onClick={handleFinishExam}
                  className="px-5 py-2 rounded-xl text-xs font-bold bg-fuji-red text-white hover:bg-rose-600 transition-all shadow-sm"
                >
                  Yes, Submit Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}