import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  BookOpen, Sparkles, ArrowRight, Search, Volume2, Layers
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  HIRAGANA_DATA, KATAKANA_DATA, VOCABULARY_LIST,
  GRAMMAR_POINTS, KANJI_LIST
} from '../data/learningHubData';
import FlashcardSystem from '../components/FlashcardSystem';
import DailyStudyResourceHub from '../components/DailyStudyResourceHub';

const LearnPage: React.FC = () => {
  const { topic } = useParams<{ topic?: string }>();
  const [selectedKanaTab, setSelectedKanaTab] = useState<'hiragana' | 'katakana'>('hiragana');
  const [vocabSearch, setVocabSearch] = useState('');
  const [selectedVocabCategory, setSelectedVocabCategory] = useState('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topic]);

  if (topic && !['hiragana-katakana', 'vocabulary', 'grammar', 'kanji'].includes(topic)) {
    return <Navigate to="/learn" replace />;
  }

  const speakText = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'ja-JP';
        window.speechSynthesis.speak(utterance);
      } catch {}
    }
  };

  // Filtered vocabulary
  const vocabCategories = ['All', 'Greetings', 'Numbers', 'Daily Life', 'Tech & Career'];
  const filteredVocab = VOCABULARY_LIST.filter(item => {
    const matchesCategory = selectedVocabCategory === 'All' || item.category === selectedVocabCategory;
    const matchesSearch = item.japanese.includes(vocabSearch) ||
      item.kana.includes(vocabSearch) ||
      item.romaji.toLowerCase().includes(vocabSearch.toLowerCase()) ||
      item.english.toLowerCase().includes(vocabSearch.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
      <Helmet>
        <title>Learn Japanese Free | Hiragana, Katakana, Kanji, Grammar &amp; Vocabulary | Fuji Academy</title>
        <meta
          name="description"
          content="Free Japanese learning resources from Fuji Japanese Academy. Master Hiragana &amp; Katakana charts with pronunciation, essential N5 vocabulary, Japanese particles &amp; Kanji."
        />
        <link rel="canonical" href={`https://fujijapaneseacademy.com/learn${topic ? `/${topic}` : ''}`} />
      </Helmet>

      {/* Hero Banner */}
      <section className="bg-gradient-to-b from-fuji-indigo via-[#1d1945] to-[#12102e] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-6">
              <Sparkles className="w-4 h-4" /> Free Educational Hub
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
              Learn Japanese <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200">Step by Step</span>
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Explore interactive phonetic scripts, essential JLPT N5 vocabulary, particle cheat sheets, and foundation Kanji with native audio pronunciation.
            </p>

            {/* Navigation Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
              <Link
                to="/learn"
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  !topic ? 'bg-fuji-red text-white shadow-lg' : 'bg-white/10 text-gray-200 hover:bg-white/20'
                }`}
              >
                Overview
              </Link>
              <Link
                to="/learn/hiragana-katakana"
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  topic === 'hiragana-katakana' ? 'bg-fuji-red text-white shadow-lg' : 'bg-white/10 text-gray-200 hover:bg-white/20'
                }`}
              >
                Hiragana &amp; Katakana
              </Link>
              <Link
                to="/learn/vocabulary"
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  topic === 'vocabulary' ? 'bg-fuji-red text-white shadow-lg' : 'bg-white/10 text-gray-200 hover:bg-white/20'
                }`}
              >
                Essential Vocabulary
              </Link>
              <Link
                to="/learn/grammar"
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  topic === 'grammar' ? 'bg-fuji-red text-white shadow-lg' : 'bg-white/10 text-gray-200 hover:bg-white/20'
                }`}
              >
                Core Grammar &amp; Particles
              </Link>
              <Link
                to="/learn/kanji"
                className={`px-4 py-2 rounded-xl text-xs md:text-sm font-semibold transition-all ${
                  topic === 'kanji' ? 'bg-fuji-red text-white shadow-lg' : 'bg-white/10 text-gray-200 hover:bg-white/20'
                }`}
              >
                Kanji Foundations
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-5xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Learn Japanese', path: '/learn' },
              ...(topic ? [{ label: topic.replace(/-/g, ' ').toUpperCase(), path: `/learn/${topic}` }] : [])
            ]}
            className="mb-8"
          />

          {/* SUBTOPIC 1: Hiragana & Katakana */}
          {topic === 'hiragana-katakana' && (
            <div>
              <div className="text-center max-w-2xl mx-auto mb-10">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-fuji-indigo mb-2">
                  Japanese Phonetic Syllabaries (かな)
                </h2>
                <p className="text-xs md:text-sm text-fuji-slate/70">
                  Japanese is written using three primary scripts: <strong>Hiragana</strong> (native words and grammatical inflections), <strong>Katakana</strong> (foreign loanwords, technical terms, and names), and <strong>Kanji</strong> (ideograms representing meanings). Click any character card below to hear native pronunciation!
                </p>

                <div className="inline-flex p-1 bg-gray-100 rounded-2xl mt-6">
                  <button
                    type="button"
                    onClick={() => setSelectedKanaTab('hiragana')}
                    className={`px-6 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                      selectedKanaTab === 'hiragana' ? 'bg-white text-fuji-red shadow-sm' : 'text-fuji-slate/70'
                    }`}
                  >
                    Hiragana (ひらがな)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedKanaTab('katakana')}
                    className={`px-6 py-2 rounded-xl text-xs md:text-sm font-bold transition-all cursor-pointer ${
                      selectedKanaTab === 'katakana' ? 'bg-white text-fuji-red shadow-sm' : 'text-fuji-slate/70'
                    }`}
                  >
                    Katakana (カタカナ)
                  </button>
                </div>
              </div>

              {/* Kana Grid */}
              <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-10 gap-3">
                {(selectedKanaTab === 'hiragana' ? HIRAGANA_DATA : KATAKANA_DATA).map((item, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => speakText(item.kana)}
                    className="p-3.5 bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-md hover:border-fuji-red/30 transition-all flex flex-col items-center justify-center group active:scale-95 cursor-pointer"
                    title={`Click to listen to ${item.romaji}`}
                  >
                    <span className="text-2xl md:text-3xl font-display font-bold text-fuji-indigo group-hover:text-fuji-red transition-colors mb-1">
                      {item.kana}
                    </span>
                    <span className="text-[11px] font-semibold text-fuji-slate/60 uppercase">
                      {item.romaji}
                    </span>
                  </button>
                ))}
              </div>

              {/* Tips for Mastery */}
              <div className="mt-12 bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <h3 className="text-lg font-display font-bold text-fuji-indigo mb-3 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-fuji-red" /> 3 Secrets to Memorize Kana in 7 Days
                </h3>
                <ul className="space-y-2.5 text-xs md:text-sm text-fuji-slate/80">
                  <li>• <strong>Visual Association &amp; Mnemonics:</strong> Relate the character's shape to a picture (e.g. あ looks like an apple with a stem).</li>
                  <li>• <strong>Stroke Order Awareness:</strong> Always write top-to-bottom, left-to-right to build fluid handwriting muscle memory.</li>
                  <li>• <strong>Active Recall with Flashcards:</strong> Test yourself reading real brand names in Katakana (トヨタ = Toyota, ソニー = Sony).</li>
                </ul>
              </div>
            </div>
          )}

          {/* SUBTOPIC 2: Vocabulary */}
          {topic === 'vocabulary' && (
            <div>
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold text-fuji-indigo">
                    High-Frequency Japanese Vocabulary
                  </h2>
                  <p className="text-xs md:text-sm text-fuji-slate/70">
                    Essential words tested on the JLPT N5 and used in everyday conversation.
                  </p>
                </div>

                {/* Search Bar */}
                <div className="relative w-full md:w-72">
                  <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    value={vocabSearch}
                    onChange={(e) => setVocabSearch(e.target.value)}
                    placeholder="Search word, romaji, or meaning..."
                    className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs md:text-sm focus:outline-none focus:ring-2 focus:ring-fuji-red/20 focus:border-fuji-red transition-all"
                  />
                </div>
              </div>

              {/* Flashcard SRS */}
              <div className="mb-12">
                <FlashcardSystem />
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap gap-2 mb-6">
                {vocabCategories.map(cat => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() => setSelectedVocabCategory(cat)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      selectedVocabCategory === cat
                        ? 'bg-fuji-red text-white shadow-sm'
                        : 'bg-white border border-gray-200 text-fuji-slate/70 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Vocab List */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredVocab.map((w, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <div>
                          <span className="text-xl font-bold font-display text-fuji-indigo block">
                            {w.japanese}
                          </span>
                          <span className="text-xs text-fuji-red font-medium">
                            {w.kana} ({w.romaji})
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => speakText(w.japanese)}
                          className="p-2 text-fuji-slate/50 hover:text-fuji-red hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Listen pronunciation"
                        >
                          <Volume2 className="w-4 h-4" />
                        </button>
                      </div>

                      <p className="text-sm font-semibold text-fuji-slate/90 mt-2">
                        {w.english}
                      </p>

                      {w.exampleSentence && (
                        <div className="mt-3 p-2.5 bg-gray-50 rounded-xl text-xs text-fuji-slate/70 border border-gray-100">
                          <p className="font-medium text-fuji-indigo">{w.exampleSentence}</p>
                          <p className="text-[11px] text-fuji-slate/60 mt-0.5">{w.exampleEnglish}</p>
                        </div>
                      )}
                    </div>

                    <div className="mt-3 pt-2 border-t border-gray-50 flex items-center justify-between text-[11px] text-fuji-slate/50">
                      <span className="bg-gray-100 px-2 py-0.5 rounded-md font-medium text-fuji-slate/70">
                        {w.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTOPIC 3: Grammar */}
          {topic === 'grammar' && (
            <div>
              <div className="max-w-2xl mb-8">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-fuji-indigo mb-2">
                  Fundamental Japanese Grammar &amp; Particles
                </h2>
                <p className="text-xs md:text-sm text-fuji-slate/70">
                  Unlike English (Subject-Verb-Object), Japanese follows a <strong>Subject-Object-Verb (SOV)</strong> sentence structure. Particles (Joshi) act like tiny road signs that tell you the grammatical function of each word.
                </p>
              </div>

              <div className="space-y-6">
                {GRAMMAR_POINTS.map((pt, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm"
                  >
                    <div className="flex flex-wrap items-center gap-3 mb-2">
                      <span className="px-3 py-1 bg-red-50 text-fuji-red font-bold text-xs rounded-full">
                        Grammar Point {idx + 1}
                      </span>
                      <span className="text-xs font-semibold text-fuji-slate/60">
                        {pt.formation}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold font-display text-fuji-indigo mb-1">
                      {pt.pattern}
                    </h3>
                    <p className="text-xs md:text-sm font-semibold text-fuji-red mb-3">
                      Meaning: {pt.meaning}
                    </p>
                    <p className="text-xs md:text-sm text-fuji-slate/70 mb-4 leading-relaxed">
                      {pt.explanation}
                    </p>

                    <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                      <span className="text-xs font-bold uppercase tracking-wider text-fuji-slate/60 block mb-2">
                        Sentence Examples:
                      </span>
                      <div className="space-y-3">
                        {pt.examples.map((ex, i) => (
                          <div key={i} className="flex items-start gap-3">
                            <button
                              type="button"
                              onClick={() => speakText(ex.japanese)}
                              className="p-1.5 text-fuji-slate/60 hover:text-fuji-red hover:bg-white rounded-lg transition-colors mt-0.5 cursor-pointer"
                              title="Listen pronunciation"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                            </button>
                            <div>
                              <p className="text-sm font-bold text-fuji-indigo">{ex.japanese}</p>
                              <p className="text-xs text-fuji-red/80 font-medium">{ex.romaji}</p>
                              <p className="text-xs text-fuji-slate/70">{ex.english}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SUBTOPIC 4: Kanji */}
          {topic === 'kanji' && (
            <div>
              <div className="max-w-2xl mb-8">
                <h2 className="text-2xl md:text-3xl font-display font-bold text-fuji-indigo mb-2">
                  Beginner Kanji Foundations (漢字)
                </h2>
                <p className="text-xs md:text-sm text-fuji-slate/70">
                  Kanji are ideograms borrowed from Chinese characters. Most Kanji have two reading types: <strong>On'yomi (音読み)</strong>, the historical Chinese-derived reading, and <strong>Kun'yomi (訓読み)</strong>, the native Japanese reading.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {KANJI_LIST.map((k, idx) => (
                  <div
                    key={idx}
                    className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-16 h-16 rounded-2xl bg-red-50 text-fuji-red flex items-center justify-center font-display font-bold text-4xl shadow-inner">
                          {k.kanji}
                        </div>
                        <div>
                          <span className="text-lg font-bold text-fuji-indigo block">{k.meaning}</span>
                          <span className="text-xs text-fuji-slate/60">{k.strokes} Strokes</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-4 p-3 bg-gray-50 rounded-xl">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-fuji-slate/50 block">On'yomi</span>
                          <span className="font-semibold text-fuji-indigo">{k.onyomi}</span>
                        </div>
                        <div>
                          <span className="text-[10px] uppercase font-bold text-fuji-slate/50 block">Kun'yomi</span>
                          <span className="font-semibold text-fuji-red">{k.kunyomi}</span>
                        </div>
                      </div>

                      <div className="space-y-1.5 text-xs text-fuji-slate/70">
                        <span className="text-[11px] font-bold text-fuji-indigo block">Compound Examples:</span>
                        {k.examples.map((ex, i) => (
                          <div key={i} className="flex items-center justify-between py-1 border-b border-gray-50 last:border-0">
                            <span className="font-bold text-fuji-indigo">{ex.word}</span>
                            <span className="text-fuji-red text-[11px]">{ex.reading}</span>
                            <span className="text-fuji-slate/70 text-[11px]">{ex.meaning}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OVERVIEW (When no specific subtopic is chosen) */}
          {!topic && (
            <div className="space-y-12">
              {/* Daily Study Resource Hub & Micro-Practice */}
              <DailyStudyResourceHub />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Module 1 */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-fuji-red flex items-center justify-center mb-4 font-bold text-xl">
                      あ
                    </div>
                    <h3 className="text-xl font-bold font-display text-fuji-indigo group-hover:text-fuji-red transition-colors mb-2">
                      Hiragana &amp; Katakana Master Chart
                    </h3>
                    <p className="text-xs md:text-sm text-fuji-slate/70 mb-4 leading-relaxed">
                      Start your Japanese learning journey by mastering the two 46-character phonetic writing systems with click-to-play audio pronunciations.
                    </p>
                  </div>
                  <Link
                    to="/learn/hiragana-katakana"
                    className="inline-flex items-center gap-1.5 font-bold text-xs md:text-sm text-fuji-red hover:underline"
                  >
                    Open Kana Soundboard <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Module 2 */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-fuji-red flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-fuji-indigo group-hover:text-fuji-red transition-colors mb-2">
                      High-Frequency Vocabulary Bank
                    </h3>
                    <p className="text-xs md:text-sm text-fuji-slate/70 mb-4 leading-relaxed">
                      Explore 800+ categorized Japanese words for daily interactions, travel, numbers, calendar dates, and software engineering teams.
                    </p>
                  </div>
                  <Link
                    to="/learn/vocabulary"
                    className="inline-flex items-center gap-1.5 font-bold text-xs md:text-sm text-fuji-red hover:underline"
                  >
                    Explore Vocabulary Bank <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Module 3 */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-fuji-red flex items-center justify-center mb-4">
                      <Layers className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-bold font-display text-fuji-indigo group-hover:text-fuji-red transition-colors mb-2">
                      Core Japanese Grammar &amp; Particles
                    </h3>
                    <p className="text-xs md:text-sm text-fuji-slate/70 mb-4 leading-relaxed">
                      Understand SOV word order, particle nuances (は, が, を, に, で), and basic polite verb conjugations with clear English breakdowns.
                    </p>
                  </div>
                  <Link
                    to="/learn/grammar"
                    className="inline-flex items-center gap-1.5 font-bold text-xs md:text-sm text-fuji-red hover:underline"
                  >
                    Read Grammar Fundamentals <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>

                {/* Module 4 */}
                <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group">
                  <div>
                    <div className="w-12 h-12 rounded-2xl bg-red-50 text-fuji-red flex items-center justify-center mb-4 font-bold text-xl">
                      日
                    </div>
                    <h3 className="text-xl font-bold font-display text-fuji-indigo group-hover:text-fuji-red transition-colors mb-2">
                      Kanji Foundations (103 JLPT N5 Characters)
                    </h3>
                    <p className="text-xs md:text-sm text-fuji-slate/70 mb-4 leading-relaxed">
                      Demystify Kanji radicals, stroke orders, and On'yomi vs. Kun'yomi readings with mnemonic associations and practical compound words.
                    </p>
                  </div>
                  <Link
                    to="/learn/kanji"
                    className="inline-flex items-center gap-1.5 font-bold text-xs md:text-sm text-fuji-red hover:underline"
                  >
                    Learn Foundation Kanji <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Free Download Callout */}
              <div className="bg-gradient-to-r from-fuji-indigo to-[#1e1a47] text-white rounded-3xl p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <span className="text-xs uppercase font-bold tracking-wider text-amber-300 block mb-1">
                    Free Study Materials
                  </span>
                  <h4 className="text-2xl font-bold font-display">Download Printable Worksheets &amp; Charts</h4>
                  <p className="text-xs md:text-sm text-gray-300 mt-1 max-w-md">
                    Access printable Hiragana/Katakana stroke writing workbooks, N5 Kanji worksheets, and particle cheat sheets 100% free.
                  </p>
                </div>
                <Link
                  to="/courses/free"
                  className="px-6 py-3 bg-fuji-red hover:bg-rose-600 text-white font-bold rounded-xl text-xs md:text-sm whitespace-nowrap shadow transition-all"
                >
                  Access Free Downloads
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default LearnPage;
