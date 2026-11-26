import React, { useState, useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  PlayCircle, Download, Gift, ArrowRight, Video,
  Clock, Users, Search, Eye, X, Check, Sparkles,
  CheckCircle2, BookmarkCheck
} from 'lucide-react';
import { supabase } from '../src/lib/supabaseClient';
import { FreeCourse } from '../types';
import { FREE_RESOURCES, ResourceItem, triggerDirectDownload } from '../data/freeResources';

const MOCK_FREE_COURSES: FreeCourse[] = [
  {
    id: '1',
    title: 'Hiragana Mastery Course',
    description: 'Learn to read and write the first Japanese phonetic script in just 3 days with our structured crash course.',
    type: 'Video Series',
    duration: '2 Hours',
    image: '/images/courses/free-hiragana.jpg'
  },
  {
    id: '2',
    title: 'Survival Japanese for Travelers',
    description: 'Essential phrases for travelers - how to order delicious food, navigate trains, and shop politely in Japan.',
    type: 'Audio Guide',
    duration: '1 Hour',
    image: '/images/courses/free-travel.jpg'
  },
  {
    id: '3',
    title: 'Japanese Culture & Business Etiquette',
    description: 'Understand the essential rules of bowing (ojigi), business cards (meishi koukan), and dining etiquette in Japan.',
    type: 'Mini Course',
    duration: '45 Mins',
    image: '/images/courses/free-culture.jpg'
  }
];

const CATEGORIES = [
  { id: 'all', label: 'All Free Resources' },
  { id: 'hiragana', label: 'Hiragana (ひらがな)' },
  { id: 'katakana', label: 'Katakana (カタカナ)' },
  { id: 'vocabulary', label: 'JLPT N5 Vocab' },
  { id: 'grammar', label: 'Verbs & Grammar' },
  { id: 'cheatsheet', label: 'Cheat Sheets' }
];

const FreeCourses: React.FC = () => {
  const [courses, setCourses] = useState<FreeCourse[]>(MOCK_FREE_COURSES);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [previewResource, setPreviewResource] = useState<ResourceItem | null>(null);
  const [downloadSuccessId, setDownloadSuccessId] = useState<string | null>(null);

  useEffect(() => {
    const fetchCourses = async () => {
      if (import.meta.env.VITE_SUPABASE_URL) {
        try {
          const { data } = await supabase.from('free_courses').select('*');
          if (data && data.length > 0) {
            setCourses(data);
          }
        } catch {
          // Keep fallback
        }
      }
    };
    fetchCourses();
  }, []);

  const filteredResources = useMemo(() => {
    return FREE_RESOURCES.filter((res) => {
      const matchesCategory = selectedCategory === 'all' || res.category === selectedCategory;
      const query = searchQuery.toLowerCase().trim();
      if (!query) return matchesCategory;

      const matchesSearch =
        res.title.toLowerCase().includes(query) ||
        res.japaneseTitle.toLowerCase().includes(query) ||
        res.description.toLowerCase().includes(query) ||
        res.tags.some(tag => tag.toLowerCase().includes(query)) ||
        (res.contentData.gridItems && res.contentData.gridItems.some(
          g => g.primary.includes(query) || g.secondary.toLowerCase().includes(query)
        ));

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  const handleDownload = (res: ResourceItem) => {
    triggerDirectDownload(res);
    setDownloadSuccessId(res.id);
    setTimeout(() => {
      setDownloadSuccessId(null);
    }, 2500);
  };

  return (
    <div className="pt-24 min-h-screen bg-fuji-light">
      <Helmet>
        <title>Free Japanese Learning Resources & Downloads | Hiragana, Katakana & Vocab | Fuji Japanese Academy</title>
        <meta
          name="description"
          content="Free Japanese study sheets, Hiragana & Katakana charts, JLPT N5 vocabulary lists, and verb conjugation matrix. Direct zero-redirection download and interactive preview."
        />
        <link rel="canonical" href="https://fujijapaneseacademy.com/courses/free" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-900 py-20 text-white relative overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-teal-500/15 rounded-full blur-[90px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 text-emerald-300 text-xs md:text-sm font-bold border border-white/10 mb-6 backdrop-blur-md">
              <Gift className="w-4 h-4" />
              <span className="tracking-widest uppercase">100% Free Study Materials</span>
            </div>
            <h1 className="text-3xl md:text-6xl font-display font-black mb-6 tracking-tight text-white">
              Master Japanese <span className="text-emerald-400">Zero Cost</span>
            </h1>
            <p className="text-emerald-100/90 max-w-2xl mx-auto text-base md:text-xl font-light leading-relaxed mb-8">
              Explore our curated Hiragana & Katakana charts, JLPT N5 cheat sheets, and vocabulary guides.
              <strong className="block mt-2 font-semibold text-white">Instant direct download or interactive preview without leaving the page.</strong>
            </p>

            {/* Quick Stats Banner */}
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 pt-4 text-xs md:text-sm text-emerald-200/90">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Instant Direct Download</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Zero Redirections</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-full backdrop-blur-sm">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Interactive Live Preview</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">

        {/* Free Resource Library Search & Filter Section */}
        <div className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-premium border border-slate-100 mb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

          {/* Section Heading */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 pb-6 border-b border-slate-100 gap-4">
            <div>
              <div className="flex items-center gap-2 text-fuji-red text-xs font-black uppercase tracking-widest mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Interactive Resource Library</span>
              </div>
              <h2 className="text-2xl md:text-4xl font-display font-black text-fuji-indigo">
                Free Japanese Study Sheets & Downloads
              </h2>
              <p className="text-slate-500 text-sm md:text-base mt-2 font-light">
                Search Hiragana, Katakana, JLPT N5 vocabulary, numbers, and survival cheat sheets. Preview live or download directly.
              </p>
            </div>
            <div className="text-xs font-semibold text-slate-400 bg-slate-50 border border-slate-200 px-4 py-2 rounded-xl self-start md:self-auto">
              Showing <span className="text-emerald-700 font-black">{filteredResources.length}</span> of {FREE_RESOURCES.length} items
            </div>
          </div>

          {/* Search Bar & Category Filters */}
          <div className="space-y-6 mb-10">
            {/* Search Input */}
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by alphabet, romaji, English meaning, or Japanese word (e.g. 'hiragana', 'taberu', 'numbers', 'あ')..."
                className="w-full pl-14 pr-12 py-4 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-4 focus:ring-emerald-500/15 transition-all text-slate-800 text-sm md:text-base font-medium placeholder:text-slate-400 outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold transition-all cursor-pointer"
                  title="Clear search"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    type="button"
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                      isActive
                        ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Resources Grid */}
          {filteredResources.length === 0 ? (
            <div className="text-center py-16 px-4 bg-slate-50 rounded-3xl border border-dashed border-slate-200">
              <Search className="w-12 h-12 text-slate-300 mx-auto mb-4" />
              <h4 className="text-lg font-bold text-slate-700 mb-1">No resources matched your search</h4>
              <p className="text-sm text-slate-400 mb-6">Try searching for 'hiragana', 'katakana', 'verbs', or reset the category filter.</p>
              <button
                type="button"
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs transition-all cursor-pointer"
              >
                Reset Search Filters
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((res) => {
                const isDownloaded = downloadSuccessId === res.id;

                return (
                  <motion.div
                    key={res.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-3xl p-6 border border-slate-200/80 hover:border-emerald-500/40 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-28 h-28 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-colors pointer-events-none"></div>

                    <div>
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2 mb-4">
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200/60 rounded-full text-[11px] font-bold tracking-wide">
                          {res.badge}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                          {res.level}
                        </span>
                      </div>

                      {/* Titles */}
                      <div className="mb-3">
                        <div className="text-xs font-bold text-fuji-red tracking-wide mb-1">
                          {res.japaneseTitle}
                        </div>
                        <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                          {res.title}
                        </h3>
                      </div>

                      <p className="text-xs text-slate-500 leading-relaxed font-light mb-5">
                        {res.description}
                      </p>

                      {/* Feature Bullet Points */}
                      <div className="space-y-1.5 mb-6 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100">
                        {res.features.slice(0, 3).map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-[11px] text-slate-600 font-medium">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Buttons: Preview & Direct Download */}
                    <div className="pt-4 border-t border-slate-100 flex items-center gap-2.5">
                      <button
                        type="button"
                        onClick={() => setPreviewResource(res)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                        title="Interactive Online Preview"
                      >
                        <Eye className="w-3.5 h-3.5 text-slate-500" />
                        <span>Preview</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownload(res)}
                        className={`flex-1 py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                          isDownloaded
                            ? 'bg-emerald-700 text-white'
                            : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20'
                        }`}
                        title="Direct instant download (no redirect)"
                      >
                        {isDownloaded ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Downloaded!</span>
                          </>
                        ) : (
                          <>
                            <Download className="w-3.5 h-3.5" />
                            <span>Download</span>
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

        {/* Video Courses Grid */}
        <div className="mb-24">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
              Free Video Tutorials
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-black text-fuji-indigo mt-3">
              Guided Intro Courses
            </h2>
            <p className="text-slate-500 text-sm font-light mt-2">
              Watch concise walkthroughs led by experienced bilingual Japanese instructors.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, idx) => (
              <motion.div
                key={course.id || idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group bg-white rounded-[2rem] overflow-hidden border border-emerald-900/5 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 flex flex-col"
              >
                <div className="h-52 relative overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/courses/jlpt-n5.jpg';
                    }}
                  />
                  <div className="absolute inset-0 bg-emerald-950/30 group-hover:bg-emerald-950/15 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4 px-3 py-1.5 bg-white/95 backdrop-blur-md rounded-xl text-[10px] font-bold uppercase tracking-wider text-emerald-800 shadow-sm flex items-center gap-1.5">
                    <Video className="w-3 h-3" />
                    {course.type}
                  </div>

                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg text-emerald-600">
                      <PlayCircle className="w-8 h-8 fill-current" />
                    </div>
                  </div>
                </div>

                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="text-xl font-display font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-slate-500 text-xs md:text-sm mb-6 leading-relaxed flex-grow font-light">
                    {course.description}
                  </p>
                  <div className="flex items-center justify-between pt-5 border-t border-slate-100 text-xs">
                    <span className="font-bold text-slate-400 flex items-center gap-1.5 uppercase tracking-wider">
                      <Clock className="w-3.5 h-3.5" /> {course.duration}
                    </span>
                    <a
                      href="https://chat.whatsapp.com/CsrjvewBVU8Iy8NOVpR913"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 font-bold text-emerald-600 hover:text-emerald-800 transition-colors"
                    >
                      <span>Join Study Group</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Community Banner */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 rounded-[2.5rem] p-10 md:p-14 shadow-2xl relative overflow-hidden text-white flex flex-col items-center text-center"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 max-w-2xl">
              <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-emerald-300 mb-6 mx-auto shadow-inner border border-white/10">
                <Users className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
                Join our Japanese Learning Community
              </h2>
              <p className="text-emerald-100/80 mb-8 text-sm md:text-base font-light leading-relaxed">
                Connect with passionate learners across Bengaluru & India. Share daily kanji flashcards, practice conversational sentences, and receive direct guidance from certified Native Japanese teachers.
              </p>
              <a
                href="https://chat.whatsapp.com/CsrjvewBVU8Iy8NOVpR913"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-3.5 bg-white text-emerald-950 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-xl shadow-black/20 text-sm transform hover:-translate-y-0.5"
              >
                <span>Join Official WhatsApp Group</span>
                <ArrowRight className="w-4 h-4 text-emerald-700" />
              </a>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Interactive Modal Previewer (Direct Zero-Redirection) */}
      <AnimatePresence>
        {previewResource && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewResource(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Modal Dialog */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col border border-slate-100 z-10"
            >
              {/* Modal Header */}
              <div className="p-6 md:p-8 bg-slate-900 text-white flex items-start justify-between gap-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full text-[10px] font-bold uppercase tracking-wider">
                      {previewResource.category} • {previewResource.level}
                    </span>
                    <span className="text-xs text-slate-400">
                      {previewResource.totalItems}
                    </span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-display font-black text-white">
                    {previewResource.title}
                  </h3>
                  <div className="text-sm font-bold text-emerald-400 mt-1">
                    {previewResource.japaneseTitle}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setPreviewResource(null)}
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer shrink-0"
                  title="Close preview"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body (Scrollable) */}
              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-grow bg-slate-50">
                {/* Sensei Tips Box */}
                <div className="bg-emerald-50 border border-emerald-200/80 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4 text-emerald-600" />
                    <span>Sensei Study Tips</span>
                  </div>
                  <p className="text-xs md:text-sm text-emerald-950 font-medium mb-3">
                    {previewResource.contentData.summary}
                  </p>
                  <ul className="space-y-1 text-xs text-emerald-800">
                    {previewResource.contentData.instructions.map((inst, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-emerald-500 font-bold">•</span>
                        <span>{inst}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Character Matrix Grid (Hiragana / Katakana) */}
                {previewResource.contentData.gridItems && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
                      Character Matrix ({previewResource.contentData.gridItems.length} Letters)
                    </h4>
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2.5">
                      {previewResource.contentData.gridItems.map((item, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white rounded-xl border border-slate-200 text-center hover:border-emerald-500 hover:shadow-md transition-all group"
                        >
                          <div className="text-2xl md:text-3xl font-black text-slate-900 group-hover:text-emerald-600 transition-colors">
                            {item.primary}
                          </div>
                          <div className="text-xs font-bold text-fuji-red mt-1">
                            {item.secondary}
                          </div>
                          {item.note && (
                            <div className="text-[9px] text-slate-400 truncate mt-0.5" title={item.note}>
                              {item.note}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Table Layout (Vocab / Verbs / Numbers) */}
                {previewResource.contentData.tableHeaders && previewResource.contentData.tableRows && (
                  <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs md:text-sm">
                        <thead className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-bold">
                          <tr>
                            {previewResource.contentData.tableHeaders.map((head, hIdx) => (
                              <th key={hIdx} className="p-3.5 whitespace-nowrap">
                                {head}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {previewResource.contentData.tableRows.map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-emerald-50/40 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td
                                  key={cIdx}
                                  className={`p-3.5 ${cIdx === 0 ? 'font-bold text-slate-900 text-base' : 'text-slate-600'}`}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Section Layout (Survival Phrases) */}
                {previewResource.contentData.sections && (
                  <div className="space-y-6">
                    {previewResource.contentData.sections.map((sec, sIdx) => (
                      <div key={sIdx} className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm">
                        <h4 className="font-display font-bold text-slate-900 text-sm md:text-base mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                          <BookmarkCheck className="w-4 h-4 text-emerald-600" />
                          <span>{sec.title}</span>
                        </h4>
                        <div className="grid gap-3">
                          {sec.items.map((phrase, pIdx) => (
                            <div
                              key={pIdx}
                              className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
                            >
                              <div className="font-bold text-slate-900 text-sm md:text-base">
                                {phrase.key}
                              </div>
                              <div className="text-xs md:text-sm text-slate-600 font-medium">
                                {phrase.value}
                              </div>
                              {phrase.extra && (
                                <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md self-start sm:self-auto">
                                  {phrase.extra}
                                </span>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Modal Footer Actions */}
              <div className="p-4 md:p-6 bg-white border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-400 hidden sm:block">
                  Direct download generates an instant printable study worksheet with zero page redirection.
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setPreviewResource(null)}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Close
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDownload(previewResource)}
                    className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-emerald-600/20 cursor-pointer"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download Worksheet</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FreeCourses;