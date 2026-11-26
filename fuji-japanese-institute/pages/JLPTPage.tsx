import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  BookOpen, Award, Clock, CheckCircle2, ArrowRight,
  Sparkles, Calendar, ChevronDown, ChevronUp,
  Target, HelpCircle, Layers, MapPin, Building2, Briefcase
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { JLPT_LEVELS, JLPTLevelDetail } from '../data/jlptHubData';
import JlptDiagnosticPlacementQuiz from '../components/JlptDiagnosticPlacementQuiz';

const ALL_LEVEL_KEYS = ['n5', 'n4', 'n3', 'n2', 'n1'];

const JLPTPage: React.FC = () => {
  const { level } = useParams<{ level?: string }>();
  const currentKey = level?.toLowerCase();
  const currentLevelData: JLPTLevelDetail | undefined = currentKey ? JLPT_LEVELS[currentKey] : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [level]);

  // If a specific level was requested but not found, redirect to /jlpt
  if (level && !currentLevelData) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-gray-50 flex items-center justify-center text-center px-4">
        <div className="max-w-md bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
          <h1 className="text-2xl font-bold font-display text-fuji-indigo mb-2">JLPT Level Not Found</h1>
          <p className="text-sm text-fuji-slate/70 mb-6">
            Please choose one of the official JLPT levels: N5, N4, N3, N2, or N1.
          </p>
          <Link
            to="/jlpt"
            className="inline-flex items-center gap-2 px-6 py-3 bg-fuji-red text-white font-bold rounded-xl"
          >
            Explore JLPT Hub <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  // If NO level parameter, show the Master JLPT Hub Overview
  if (!currentLevelData) {
    return (
      <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
        <Helmet>
          <title>JLPT Guide &amp; Syllabus (N5 to N1) | Japanese Language Proficiency Test | Fuji Academy</title>
          <meta
            name="description"
            content="Complete guide to the JLPT (Japanese Language Proficiency Test) in India. Detailed syllabus, passing marks, exam patterns, and study tips for JLPT N5, N4, N3, N2, and N1."
          />
          <link rel="canonical" href="https://fujijapaneseacademy.com/jlpt" />
        </Helmet>

        {/* Hero Banner */}
        <section className="bg-gradient-to-b from-fuji-indigo via-[#1d1945] to-[#12102e] text-white py-16 md:py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-fuji-red/15 blur-3xl pointer-events-none" />
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-6">
                <Target className="w-4 h-4" /> Official Examination Roadmap
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                Master the <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200">JLPT</span> (日本語能力試験)
              </h1>
              <p className="text-gray-300 text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
                Your definitive guide to all 5 levels of the Japanese Language Proficiency Test. Explore passing scores, question formats, career benchmarks, and exam schedules in India.
              </p>
            </div>
          </div>
        </section>

        {/* Diagnostic Placement Quiz Section */}
        <section className="container mx-auto px-4 md:px-6 pt-10 pb-4">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <span className="text-fuji-red font-bold tracking-widest uppercase text-xs">Diagnostic Assessment</span>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-fuji-indigo mt-1">
              Find Your True Starting JLPT Level
            </h2>
            <p className="text-fuji-slate/70 text-xs md:text-sm mt-1">
              Not sure whether to start at N5, N4, or N3? Take our 6-question diagnostic placement quiz for instant level placement.
            </p>
          </div>
          <JlptDiagnosticPlacementQuiz />
        </section>

        {/* Level Cards Grid */}
        <section className="container mx-auto px-4 md:px-6 py-10 md:py-14">
          <Breadcrumbs items={[{ label: 'JLPT Knowledge Hub', path: '/jlpt' }]} className="mb-8" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_LEVEL_KEYS.map((key) => {
              const item = JLPT_LEVELS[key];
              return (
                <div
                  key={key}
                  className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-fuji-red">
                        {item.badge}
                      </span>
                      <span className="text-xs font-semibold text-fuji-slate/60">
                        {item.cefrEquivalent}
                      </span>
                    </div>

                    <h2 className="text-2xl font-display font-bold text-fuji-indigo group-hover:text-fuji-red transition-colors mb-1">
                      {item.kanjiTitle}
                    </h2>
                    <p className="text-xs font-semibold text-fuji-red/80 mb-3 uppercase tracking-wider">
                      {item.tagline}
                    </p>
                    <p className="text-xs md:text-sm text-fuji-slate/70 line-clamp-3 mb-6 leading-relaxed">
                      {item.overview}
                    </p>

                    <div className="grid grid-cols-3 gap-2 p-3 bg-gray-50 rounded-2xl text-center mb-6 text-xs">
                      <div>
                        <span className="block font-bold text-fuji-indigo">{item.kanjiTarget}</span>
                        <span className="text-[10px] text-fuji-slate/60">Kanji</span>
                      </div>
                      <div>
                        <span className="block font-bold text-fuji-indigo">{item.vocabTarget}</span>
                        <span className="text-[10px] text-fuji-slate/60">Vocab</span>
                      </div>
                      <div>
                        <span className="block font-bold text-fuji-indigo">{item.passingMarks}/180</span>
                        <span className="text-[10px] text-fuji-slate/60">Pass Mark</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Link
                      to={`/jlpt/${key}`}
                      className="w-full py-2.5 px-4 bg-fuji-indigo hover:bg-fuji-slate text-white text-xs md:text-sm font-semibold rounded-xl flex items-center justify-center gap-1.5 transition-colors"
                    >
                      Read Full {key.toUpperCase()} Guide <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      to={`/courses/${item.courseSlug}`}
                      className="w-full py-2 px-4 bg-transparent hover:bg-red-50 text-fuji-red text-xs font-semibold rounded-xl flex items-center justify-center gap-1 transition-colors"
                    >
                      View Coaching Batch Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Official JLPT 2026/2027 Exam Calendar & Guide */}
          <div className="mt-16 bg-white rounded-3xl p-8 md:p-12 border border-gray-100 shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-red-50 text-fuji-red flex items-center justify-center">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-display font-bold text-fuji-indigo">
                  Official JLPT 2026 / 2027 Exam Calendar
                </h2>
                <p className="text-xs md:text-sm text-fuji-slate/70">
                  Conducted by the Japan Foundation and local host institutions.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-fuji-slate/80 mb-8">
              <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-fuji-red block mb-1">Session 1 (July 2026/2027)</span>
                <h3 className="font-bold text-base text-fuji-indigo mb-2">First Sunday of July</h3>
                <ul className="space-y-2 text-xs text-fuji-slate/70">
                  <li>• <strong>Registration Window:</strong> Early March - Early April</li>
                  <li>• <strong>Hall Tickets:</strong> Dispatched late May / early June</li>
                  <li>• <strong>Result Date:</strong> Late August / Early September</li>
                </ul>
              </div>

              <div className="p-5 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100">
                <span className="text-xs font-bold uppercase tracking-wider text-fuji-red block mb-1">Session 2 (December 2026/2027)</span>
                <h3 className="font-bold text-base text-fuji-indigo mb-2">First Sunday of December</h3>
                <ul className="space-y-2 text-xs text-fuji-slate/70">
                  <li>• <strong>Registration Window:</strong> Early August - Early September</li>
                  <li>• <strong>Hall Tickets:</strong> Dispatched mid-November</li>
                  <li>• <strong>Result Date:</strong> Late January / Early February</li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-8 mb-8">
              <h3 className="font-bold text-lg text-fuji-indigo mb-3">Official Indian Test Centers</h3>
              <div className="flex flex-wrap gap-2 text-sm text-gray-700">
                <span className="bg-gray-100 px-3 py-1 rounded-full">Bengaluru</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Chennai</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">New Delhi</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Mumbai</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Pune</span>
                <span className="bg-gray-100 px-3 py-1 rounded-full">Kolkata</span>
              </div>
            </div>
            
            <div className="border-t border-gray-100 pt-8 mb-8">
              <h3 className="font-bold text-lg text-fuji-indigo mb-3">Step-by-step Registration Guide</h3>
              <ol className="list-decimal pl-5 space-y-2 text-sm text-gray-700">
                <li>Create an account on the official <a href="https://jlpt.mombusho.co.in/" target="_blank" rel="noreferrer" className="text-red-600 font-bold hover:underline">MOSAI JLPT portal</a> or regional center website (e.g., JALTA).</li>
                <li>Fill in the application form completely with your personal details and test center preference.</li>
                <li>Upload a passport-sized photograph adhering strictly to the JF guidelines.</li>
                <li>Pay the examination fee online via the official payment gateway.</li>
                <li>Keep the registration confirmation and receipt safe for future reference.</li>
              </ol>
            </div>

            <div className="mt-8 p-5 bg-amber-50/70 border border-amber-200/80 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-amber-950">
                <strong>Need help registering for the upcoming exam?</strong>
                <p className="text-amber-800 text-[11px] mt-0.5">
                  Fuji Japanese Academy assists all enrolled students with examination center selection, form filling, and photo compliance.
                </p>
              </div>
              <Link
                to="/enquire"
                className="px-5 py-2.5 bg-fuji-red text-white text-xs font-bold rounded-xl whitespace-nowrap hover:bg-rose-600 transition-all shadow"
              >
                Join an Exam Prep Batch
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Specific Level View (e.g. /jlpt/n5, /jlpt/n4, etc.)
  const data = currentLevelData;
  const levelUpper = data.level.toUpperCase();

  return (
    <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
      <Helmet>
        <title>{data.title} | Passing Marks, Pattern &amp; Coaching | Fuji Academy</title>
        <meta
          name="description"
          content={`Complete ${levelUpper} guide: Passing criteria (${data.passingMarks}/180), ${data.kanjiTarget}, ${data.vocabTarget}, exam timing, question types, and recommended books.`}
        />
        <link rel="canonical" href={`https://fujijapaneseacademy.com/jlpt/${data.level}`} />
      </Helmet>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-fuji-indigo via-[#1d1945] to-[#12102e] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-fuji-red text-white">
                {data.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-200">
                CEFR: {data.cefrEquivalent}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/10 text-gray-200">
                Recommended Study: {data.studyHours}
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold text-white mb-2">
              {data.title}
            </h1>
            <p className="text-xl text-amber-300 font-display font-semibold mb-4">
              {data.kanjiTitle} • {data.tagline}
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl mb-8">
              {data.overview}
            </p>

            {/* Quick Level Switcher */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10">
              <span className="text-xs text-gray-400 self-center mr-2">Switch Level:</span>
              {ALL_LEVEL_KEYS.map((lvl) => (
                <Link
                  key={lvl}
                  to={`/jlpt/${lvl}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition-all ${
                    lvl === data.level
                      ? 'bg-white text-fuji-indigo shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  JLPT {lvl.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'JLPT Knowledge Hub', path: '/jlpt' },
              { label: `JLPT ${levelUpper} Guide`, path: `/jlpt/${data.level}` }
            ]}
            className="mb-8"
          />

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
              <span className="block text-2xl font-bold font-display text-fuji-indigo">{data.kanjiTarget}</span>
              <span className="text-xs text-fuji-slate/60">Kanji Characters</span>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
              <span className="block text-2xl font-bold font-display text-fuji-indigo">{data.vocabTarget}</span>
              <span className="text-xs text-fuji-slate/60">Vocabulary Words</span>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
              <span className="block text-2xl font-bold font-display text-fuji-indigo">{data.passingMarks} / 180</span>
              <span className="text-xs text-fuji-slate/60">Minimum Pass Score</span>
            </div>
            <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm text-center">
              <span className="block text-2xl font-bold font-display text-fuji-indigo">{data.grammarTarget}</span>
              <span className="text-xs text-fuji-slate/60">Grammar Structures</span>
            </div>
          </div>

          {/* Scoring & Section Cutoffs */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-10">
            <h2 className="text-2xl font-display font-bold text-fuji-indigo mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-fuji-red" /> Passing Marks &amp; Sectional Cutoffs
            </h2>
            <p className="text-xs md:text-sm text-fuji-slate/70 mb-6">
              {data.level === 'n5' || data.level === 'n4' ? (
                <>
                  To clear JLPT {levelUpper}, you must achieve two conditions simultaneously: reach the overall pass mark of <strong>{data.passingMarks} / 180 points</strong>, and achieve the required sectional cutoffs: at least <strong>38 / 120 points</strong> in Language Knowledge &amp; Reading, and at least <strong>19 / 60 points</strong> in Listening. Falling below either sectional cutoff results in a failed test, even if your total score exceeds {data.passingMarks}.
                </>
              ) : (
                <>
                  To clear JLPT {levelUpper}, you must achieve two conditions simultaneously: reach the overall pass mark of <strong>{data.passingMarks} / 180 points</strong>, and achieve at least <strong>19 points in every individual section</strong> (Language Knowledge, Reading, and Listening). Falling below 19 in any section results in a failed test, even if your total score exceeds {data.passingMarks}.
                </>
              )}
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-gray-200 text-fuji-slate/60 uppercase tracking-wider text-[11px]">
                    <th className="pb-3 font-semibold">Test Section</th>
                    <th className="pb-3 font-semibold text-center">Maximum Score</th>
                    <th className="pb-3 font-semibold text-center">Section Cutoff</th>
                    <th className="pb-3 font-semibold">What is Tested</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {data.sectionCutoffs.map((sec, idx) => (
                    <tr key={idx}>
                      <td className="py-3.5 font-bold text-fuji-indigo pr-4">{sec.section}</td>
                      <td className="py-3.5 text-center font-semibold text-fuji-slate/80">{sec.maxScore} pts</td>
                      <td className="py-3.5 text-center font-bold text-fuji-red">{sec.passScore} pts</td>
                      <td className="py-3.5 text-fuji-slate/70 text-xs">{sec.description}</td>
                    </tr>
                  ))}
                  <tr className="bg-gray-50/80 font-bold">
                    <td className="py-3.5 pl-3 text-fuji-indigo">Total Requirement</td>
                    <td className="py-3.5 text-center">{data.totalMarks} pts</td>
                    <td className="py-3.5 text-center text-fuji-red">{data.passingMarks} pts (Pass)</td>
                    <td className="py-3.5 text-xs text-fuji-slate/70">Both overall and sectional cutoffs must be met.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Exam Timing */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-10">
            <h2 className="text-2xl font-display font-bold text-fuji-indigo mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-fuji-red" /> Examination Structure &amp; Time Limit
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.examTiming.map((t, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <span className="text-xs font-bold text-fuji-indigo block mb-1">{t.sectionName}</span>
                  <div className="flex items-center justify-between text-xs text-fuji-slate/70 mt-2">
                    <span>Duration:</span>
                    <strong className="text-fuji-red">{t.duration}</strong>
                  </div>
                  <div className="flex items-center justify-between text-xs text-fuji-slate/70 mt-1">
                    <span>Questions:</span>
                    <strong>{t.questionsCount}</strong>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Key Topics */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-10">
            <h2 className="text-2xl font-display font-bold text-fuji-indigo mb-6 flex items-center gap-2">
              <Layers className="w-6 h-6 text-fuji-red" /> Core Syllabus Topics
            </h2>
            <div className="space-y-6">
              {data.keyTopics.map((topic, idx) => (
                <div key={idx} className="border-b border-gray-100 pb-5 last:border-b-0">
                  <h3 className="font-bold text-base text-fuji-indigo mb-1.5">{topic.title}</h3>
                  <p className="text-xs md:text-sm text-fuji-slate/70 mb-3">{topic.description}</p>
                  {topic.examples && (
                    <div className="flex flex-wrap gap-2">
                      {topic.examples.map((ex, i) => (
                        <span key={i} className="px-3 py-1 bg-red-50 text-fuji-red text-xs font-medium rounded-lg">
                          {ex}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Career & Opportunities */}
          <div className="bg-gradient-to-br from-fuji-indigo to-[#1b1740] text-white rounded-3xl p-6 md:p-8 shadow-md mb-10">
            <h2 className="text-xl md:text-2xl font-display font-bold mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-300" /> Career &amp; Visa Benefits of JLPT {levelUpper}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs md:text-sm text-gray-200">
              {data.careerOpportunities.map((opp, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 bg-white/5 rounded-xl">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{opp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Books */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-10">
            <h2 className="text-2xl font-display font-bold text-fuji-indigo mb-4 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-fuji-red" /> Official Recommended Books
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {data.recommendedBooks.map((b, idx) => (
                <div key={idx} className="p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <strong className="text-sm font-bold text-fuji-indigo block mb-1">{b.title}</strong>
                  <p className="text-xs text-fuji-slate/70">{b.purpose}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-10">
            <h2 className="text-2xl font-display font-bold text-fuji-indigo mb-6 flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-fuji-red" /> JLPT {levelUpper} Frequently Asked Questions
            </h2>
            <div className="space-y-3">
              {data.faqs.map((faq, idx) => (
                <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-sm text-fuji-indigo hover:text-fuji-red transition-colors cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {openFaq === idx ? (
                      <ChevronUp className="w-4 h-4 text-fuji-red flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {openFaq === idx && (
                    <div className="px-4 pb-4 pt-1 text-xs md:text-sm text-fuji-slate/70 leading-relaxed border-t border-gray-50">
                      {faq.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* In-Person Classroom Coaching in Bengaluru & Study Hubs */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-fuji-red block mb-1">
                  Offline Coaching in Bengaluru
                </span>
                <h2 className="text-2xl font-display font-bold text-fuji-indigo flex items-center gap-2">
                  <Building2 className="w-6 h-6 text-fuji-red" />
                  JLPT {levelUpper} Classroom Batches &amp; Centers
                </h2>
              </div>
              <Link
                to={`/courses/${data.courseSlug}`}
                className="text-xs md:text-sm font-bold text-fuji-red hover:underline inline-flex items-center gap-1"
              >
                View Course Syllabus <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="text-xs md:text-sm text-fuji-slate/70 mb-6 leading-relaxed">
              Prefer classroom learning? Join our weekend offline batches at Electronic City Phase 1 or join live interactive Zoom sessions. Learn directly from native Japanese senseis and JLPT N1 certified Indian educators.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Link
                to="/locations/electronic-city"
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 hover:border-red-300 hover:shadow-sm transition-all block group"
              >
                <div className="flex items-center gap-2 text-fuji-indigo font-bold text-sm mb-1 group-hover:text-fuji-red transition-colors">
                  <MapPin className="w-4 h-4 text-fuji-red" /> Electronic City Campus
                </div>
                <p className="text-xs text-fuji-slate/60">Main physical center with AV lab, Kanji library, and offline JLPT mock tests.</p>
              </Link>

              <Link
                to="/locations/bangalore"
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 hover:border-red-300 hover:shadow-sm transition-all block group"
              >
                <div className="flex items-center gap-2 text-fuji-indigo font-bold text-sm mb-1 group-hover:text-fuji-red transition-colors">
                  <Building2 className="w-4 h-4 text-fuji-indigo" /> Bengaluru Central Hub
                </div>
                <p className="text-xs text-fuji-slate/60">Official Bangalore University JLPT test center details, transit, and batch schedules.</p>
              </Link>

              <Link
                to="/career/japanese-for-it"
                className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 hover:border-red-300 hover:shadow-sm transition-all block group"
              >
                <div className="flex items-center gap-2 text-fuji-indigo font-bold text-sm mb-1 group-hover:text-fuji-red transition-colors">
                  <Briefcase className="w-4 h-4 text-emerald-600" /> Tokyo Tech Careers
                </div>
                <p className="text-xs text-fuji-slate/60">How JLPT {levelUpper} unlocks software engineer and bilingual jobs in Japan.</p>
              </Link>
            </div>

            {/* Free Self-Study Interlinks */}
            <div className="pt-4 border-t border-gray-100">
              <span className="text-xs text-fuji-slate/60 block mb-2 font-medium">Free Learning Resources:</span>
              <div className="flex flex-wrap gap-2 text-xs">
                <Link to="/learn/hiragana-katakana" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">Kana Charts</Link>
                <Link to="/learn/vocabulary" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">Vocabulary Bank</Link>
                <Link to="/learn/grammar" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">Particles &amp; Grammar</Link>
                <Link to="/learn/kanji" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">Kanji Radicals</Link>
                <Link to="/practice" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">Interactive Quizzes</Link>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="p-8 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-3xl shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-200 block mb-1">
                Pass JLPT {levelUpper} on Your First Attempt
              </span>
              <h3 className="text-2xl font-bold font-display">Join Fuji Academy's {levelUpper} Batch</h3>
              <p className="text-xs text-rose-100 mt-1 max-w-md">
                Live interactive classes, certified senseis, official mock tests, and personalized doubt clearing.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <Link
                to={`/courses/${data.courseSlug}`}
                className="px-6 py-3 bg-white text-fuji-red hover:bg-gray-100 font-bold rounded-xl text-xs md:text-sm text-center shadow transition-all"
              >
                View Course Syllabus &amp; Fees
              </Link>
              <Link
                to="/enquire"
                className="px-6 py-3 bg-fuji-indigo hover:bg-fuji-slate text-white font-bold rounded-xl text-xs md:text-sm text-center shadow transition-all"
              >
                Book Free Demo Class
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JLPTPage;
