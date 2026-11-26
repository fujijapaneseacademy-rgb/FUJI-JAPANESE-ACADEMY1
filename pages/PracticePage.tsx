import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Sparkles, CheckCircle2, XCircle, ArrowRight, RotateCcw,
  Award, Clock, Check, HelpCircle, Layers, BookOpen, ChevronRight
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { PRACTICE_QUIZZES, QuizTopic, QuizQuestion } from '../data/practiceData';
import CertificateModal from '../components/CertificateModal';

const shuffleQuestions = (quizQuestions: QuizQuestion[]): QuizQuestion[] => {
  return quizQuestions.map(q => {
    const paired = q.options.map((opt, idx) => ({
      text: opt,
      isCorrect: idx === q.correctIndex
    }));
    // Fisher-Yates shuffle
    for (let i = paired.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [paired[i], paired[j]] = [paired[j], paired[i]];
    }
    const newOptions = paired.map(p => p.text);
    const newCorrectIndex = paired.findIndex(p => p.isCorrect);
    return {
      ...q,
      options: newOptions,
      correctIndex: newCorrectIndex
    };
  });
};

const PracticePage: React.FC = () => {
  const { quizId } = useParams<{ quizId?: string }>();
  const location = useLocation();
  const activeQuiz: QuizTopic | undefined = quizId ? PRACTICE_QUIZZES[quizId] : undefined;

  // Quiz state
  const [questions, setQuestions] = useState<QuizQuestion[]>(() => (activeQuiz ? shuffleQuestions(activeQuiz.questions) : []));
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  
  const [showCert, setShowCert] = useState(location.state?.showCertificate || false);
  const [certName, setCertName] = useState(location.state?.name || '');

  useEffect(() => {
    window.scrollTo(0, 0);
    // Reset state and shuffle options when quiz changes
    if (activeQuiz) {
      setQuestions(shuffleQuestions(activeQuiz.questions));
    } else {
      setQuestions([]);
    }
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  }, [quizId]);

  const handleSelectOption = (idx: number) => {
    const currentQ = questions[currentQuestionIdx] || (activeQuiz ? activeQuiz.questions[currentQuestionIdx] : null);
    if (isAnswered || !currentQ) return;
    setSelectedOption(idx);
    setIsAnswered(true);

    const isCorrect = idx === currentQ.correctIndex;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (!activeQuiz) return;
    const totalQ = questions.length || activeQuiz.questions.length;
    if (currentQuestionIdx + 1 < totalQ) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setIsCompleted(true);
    }
  };

  const handleRestart = () => {
    if (activeQuiz) {
      setQuestions(shuffleQuestions(activeQuiz.questions));
    }
    setCurrentQuestionIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setIsCompleted(false);
  };

  // If no quizId or quizId not found, render Hub
  if (!activeQuiz) {
    return (
      <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
        <Helmet>
          <title>Free JLPT Practice Quizzes &amp; Drills | JLPT N5 &amp; N4 | Fuji Academy</title>
          <meta
            name="description"
            content="Practice with authentic JLPT N5 and N4 mock questions. Instant feedback, detailed grammatical explanations, and score benchmarking."
          />
          <link rel="canonical" href="https://fujijapaneseacademy.com/practice" />
        </Helmet>
        
        <CertificateModal 
          isOpen={showCert} 
          onClose={() => setShowCert(false)} 
          studentName={certName} 
        />

        {/* Hero */}
        <section className="bg-gradient-to-b from-fuji-indigo via-[#1d1945] to-[#12102e] text-white py-16 md:py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-6">
                <Sparkles className="w-4 h-4" /> Interactive Quiz Engine
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                JLPT Practice <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200">Quizzes &amp; Drills</span>
              </h1>
              <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Test your Japanese skills with authentic test simulations. Get instant answer explanations and track your readiness for the official exam.
              </p>
            </div>
          </div>
        </section>

        {/* Quizzes List */}
        <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <Breadcrumbs items={[{ label: 'JLPT Practice Platform', path: '/practice' }]} className="mb-8" />

            {/* Official Mock Test Hero CTA */}
            <div className="mb-12 bg-gradient-to-r from-red-50 to-amber-50 rounded-3xl p-6 md:p-10 border border-red-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex-1">
                <span className="px-3 py-1 bg-red-600 text-white font-bold text-xs rounded-full uppercase tracking-wider mb-4 inline-block">
                  New Feature
                </span>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-gray-900 mb-3">
                  Full Interactive N5 Mock Test
                </h3>
                <p className="text-gray-700 text-sm md:text-base mb-4 max-w-lg">
                  Take our comprehensive 20-minute simulated JLPT test. Includes Vocabulary, Grammar, Reading, and Audio Listening sections. Get a detailed score report and a downloadable certificate!
                </p>
                <div className="flex flex-wrap gap-4 text-xs font-semibold text-gray-600">
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4 text-red-500" /> 20 Minutes</span>
                  <span className="flex items-center gap-1"><Layers className="w-4 h-4 text-red-500" /> 20 Questions</span>
                  <span className="flex items-center gap-1"><Award className="w-4 h-4 text-red-500" /> Get Certificate</span>
                </div>
              </div>
              <div className="w-full md:w-auto flex-shrink-0">
                <Link
                  to="/mock-test"
                  className="w-full md:w-auto px-8 py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center gap-2 text-lg"
                >
                  Start Mock Test <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.values(PRACTICE_QUIZZES).map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 bg-red-50 text-fuji-red font-bold text-xs rounded-full uppercase tracking-wider">
                        JLPT {quiz.level}
                      </span>
                      <span className="text-xs font-semibold text-fuji-slate/60 flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> ~{quiz.timeLimitMinutes} Mins
                      </span>
                    </div>

                    <h2 className="text-xl font-bold font-display text-fuji-indigo group-hover:text-fuji-red transition-colors mb-2">
                      {quiz.title}
                    </h2>
                    <p className="text-xs md:text-sm text-fuji-slate/70 mb-4 leading-relaxed">
                      {quiz.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-fuji-slate/60 mb-6 py-2 border-y border-gray-50">
                      <span><strong>{quiz.questions.length}</strong> Questions</span>
                      <span>•</span>
                      <span>{quiz.category}</span>
                      <span>•</span>
                      <span>Instant Feedback</span>
                    </div>
                  </div>

                  <Link
                    to={`/practice/${quiz.id}`}
                    className="w-full py-3 px-4 bg-fuji-indigo hover:bg-fuji-red text-white text-xs md:text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-sm"
                  >
                    Start Drill <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>

            {/* Preparation Tip */}
            <div className="mt-12 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="font-display font-bold text-lg text-fuji-indigo mb-1">
                  Want Full-Length 3-Hour Simulated Mock Tests?
                </h3>
                <p className="text-xs md:text-sm text-fuji-slate/70">
                  Enrolled students at Fuji Japanese Academy receive 6 to 10 official simulated past mock tests with listening audio and negative-check score analytics.
                </p>
              </div>
              <Link
                to="/enquire"
                className="px-6 py-3 bg-fuji-red hover:bg-rose-600 text-white font-bold rounded-xl text-xs md:text-sm whitespace-nowrap shadow transition-all"
              >
                Enroll in Exam Batches
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Active Quiz View
  const totalQuestions = questions.length || activeQuiz.questions.length;
  const currentQ = questions[currentQuestionIdx] || activeQuiz.questions[currentQuestionIdx];
  const progressPercent = totalQuestions > 0 ? Math.round(((currentQuestionIdx + 1) / totalQuestions) * 100) : 0;

  return (
    <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
      <Helmet>
        <title>{activeQuiz.title} | Practice Drill | Fuji Japanese Academy</title>
        <meta name="description" content={activeQuiz.description} />
      </Helmet>
      
      <CertificateModal 
        isOpen={showCert} 
        onClose={() => setShowCert(false)} 
        studentName={certName} 
        courseLevel={activeQuiz ? `${activeQuiz.title} Mini Benchmark` : 'JLPT Practice Drill'}
        score={score}
        totalScore={totalQuestions}
        percentage={totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : undefined}
        isPassed={score >= totalQuestions * 0.7}
        onUpdateName={setCertName}
      />

      <section className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Practice Platform', path: '/practice' },
              { label: activeQuiz.title, path: `/practice/${activeQuiz.id}` }
            ]}
            className="mb-6"
          />

          {/* QUIZ IN PROGRESS */}
          {!isCompleted ? (
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-xl shadow-slate-200/50">
              {/* Top Meta & Progress */}
              <div className="flex items-center justify-between text-xs text-fuji-slate/60 mb-3">
                <span className="font-bold text-fuji-indigo uppercase tracking-wider">
                  Question {currentQuestionIdx + 1} of {totalQuestions}
                </span>
                <span className="font-semibold text-fuji-red">
                  Score: {score}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-100 rounded-full h-2 mb-8 overflow-hidden">
                <div
                  className="bg-fuji-red h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Question Text */}
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold font-display text-fuji-indigo mb-2 leading-relaxed">
                  {currentQ.question}
                </h2>
                {currentQ.context && (
                  <p className="text-xs md:text-sm text-fuji-slate/70 italic">
                    Hint / Context: {currentQ.context}
                  </p>
                )}
              </div>

              {/* Options */}
              <div className="space-y-3 mb-6">
                {currentQ.options.map((opt, idx) => {
                  let buttonStyle = 'bg-gray-50 border-gray-200 text-fuji-indigo hover:border-fuji-red/50 hover:bg-red-50/30';
                  let icon = null;

                  if (isAnswered) {
                    if (idx === currentQ.correctIndex) {
                      buttonStyle = 'bg-emerald-50 border-emerald-400 text-emerald-900 font-bold';
                      icon = <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />;
                    } else if (idx === selectedOption) {
                      buttonStyle = 'bg-rose-50 border-rose-400 text-rose-900 font-bold';
                      icon = <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />;
                    } else {
                      buttonStyle = 'bg-gray-50 border-gray-100 text-gray-400 opacity-60';
                    }
                  }

                  return (
                    <button
                      type="button"
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={isAnswered}
                      className={`w-full p-4 rounded-2xl border text-left text-sm md:text-base flex items-center justify-between transition-all cursor-pointer ${buttonStyle}`}
                    >
                      <span className="flex items-center gap-3">
                        <span className="w-7 h-7 rounded-xl bg-white border border-gray-200 text-xs font-bold flex items-center justify-center text-fuji-slate/70">
                          {idx + 1}
                        </span>
                        <span>{opt}</span>
                      </span>
                      {icon}
                    </button>
                  );
                })}
              </div>

              {/* Explanation Card */}
              {isAnswered && (
                <div className="p-5 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs md:text-sm text-amber-950 mb-6 animate-fade-in">
                  <div className="font-bold flex items-center gap-1.5 text-amber-900 mb-1">
                    <HelpCircle className="w-4 h-4 text-amber-700" /> Explanation:
                  </div>
                  <p className="leading-relaxed text-amber-900/90">{currentQ.explanation}</p>
                </div>
              )}

              {/* Next Button */}
              {isAnswered && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="w-full py-4 bg-fuji-red hover:bg-rose-600 text-white font-bold rounded-xl shadow-lg shadow-fuji-red/25 flex items-center justify-center gap-2 text-sm md:text-base transition-all cursor-pointer"
                >
                  {currentQuestionIdx + 1 < totalQuestions ? (
                    <>Next Question <ArrowRight className="w-5 h-5" /></>
                  ) : (
                    <>View Final Results <Award className="w-5 h-5" /></>
                  )}
                </button>
              )}
            </div>
          ) : (
            /* COMPLETION SCREEN */
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-xl text-center">
              <div className="w-20 h-20 bg-red-50 text-fuji-red rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                <Award className="w-10 h-10" />
              </div>

              <span className="text-xs uppercase font-bold tracking-wider text-fuji-red block mb-1">
                Drill Completed!
              </span>
              <h2 className="text-3xl font-display font-bold text-fuji-indigo mb-2">
                Your Score: {score} / {totalQuestions}
              </h2>

              <p className="text-base text-fuji-slate/80 max-w-md mx-auto mb-8">
                {score >= totalQuestions * 0.7 ? (
                  <span className="text-emerald-700 font-semibold">
                    🎉 Excellent performance! You have a solid grasp of this topic. Ready for the next challenge!
                  </span>
                ) : (
                  <span className="text-fuji-slate/70">
                    Good effort! Review the questions you missed and retry to achieve 100% accuracy.
                  </span>
                )}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="w-full sm:w-auto px-6 py-3 bg-gray-100 hover:bg-gray-200 text-fuji-indigo font-bold rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" /> Retake Drill
                </button>
                <Link
                  to="/practice"
                  className="w-full sm:w-auto px-6 py-3 bg-fuji-indigo hover:bg-fuji-slate text-white font-bold rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 transition-all"
                >
                  Try Another Drill <Layers className="w-4 h-4" />
                </Link>
                <Link
                  to="/enquire"
                  className="w-full sm:w-auto px-6 py-3 bg-fuji-red hover:bg-rose-600 text-white font-bold rounded-xl text-xs md:text-sm flex items-center justify-center gap-2 transition-all shadow"
                >
                  Join Live Batch <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default PracticePage;
