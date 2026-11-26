import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BLOG_POSTS as MOCK_POSTS } from '../constants';
import { DETAILED_BLOG_ARTICLES } from '../data/blogArticlesData';
import { 
  ArrowRight, Calendar, Tag, BookOpen, Clock, Search, 
  Sparkles, Image, AlignLeft
} from 'lucide-react';
import { supabase } from '../src/lib/supabaseClient';
import { BlogPost } from '../types';

const CATEGORIES = ['All', 'JLPT Preparation', 'Career & Culture', 'Learning Tips'];

const getCategoryKanji = (category: string) => {
  switch (category) {
    case 'JLPT Preparation':
      return { kanji: '合格', romaji: 'Gōkaku • JLPT Pass', meaning: 'Exam Success' };
    case 'Career & Culture':
      return { kanji: '就職', romaji: 'Shūshoku • Career', meaning: 'Tech Placement' };
    case 'Learning Tips':
      return { kanji: '上達', romaji: 'Jōtatsu • Mastery', meaning: 'Fluency Hacks' };
    default:
      return { kanji: '日本語', romaji: 'Nihongo • Japanese', meaning: 'Language' };
  }
};

const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>(DETAILED_BLOG_ARTICLES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'visual' | 'words'>('visual');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('published_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const localSlugs = new Set(DETAILED_BLOG_ARTICLES.map(a => a.slug || a.id));
          const remoteExtra = data.filter(d => !localSlugs.has(d.slug) && !localSlugs.has(d.id));
          setPosts([...DETAILED_BLOG_ARTICLES, ...remoteExtra]);
        } else {
          setPosts(DETAILED_BLOG_ARTICLES);
        }
      } catch (err) {
        if (import.meta.env.DEV) console.warn("Error fetching blogs, using fallback data:", err);
        setPosts(DETAILED_BLOG_ARTICLES);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  const filteredPosts = posts.filter(post => {
    const matchesCategory = selectedCategory === 'All' || post.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = searchQuery === '' || 
      (post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (post.excerpt?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false) ||
      (post.keywords?.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ?? false);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
      <Helmet>
        <title>Japanese Learning Blog & JLPT Guides | Fuji Japanese Academy</title>
        <meta name="description" content="Explore expert guides on JLPT N5-N1 syllabus, Japanese grammar particles, Kanji mnemonics, and engineering career opportunities in Japan." />
        <meta name="keywords" content="Japanese learning blog, JLPT N5 guide, Japanese particles cheat sheet, Jobs in Japan for Indian engineers, Learn Kanji" />
        <link rel="canonical" href="https://fujijapaneseacademy.com/blog" />
      </Helmet>

      {/* Hero Section with Japanese Calligraphy Accent */}
      <section className="bg-gradient-to-b from-fuji-indigo via-[#1d1945] to-[#12102e] text-white py-24 relative overflow-hidden">
        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-96 h-96 rounded-full bg-gradient-to-br from-fuji-red/25 via-rose-500/10 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />

        {/* Japanese Watermark */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 text-white/[0.03] text-8xl md:text-[11rem] font-display font-black select-none pointer-events-none tracking-widest leading-none">
          日本語の知識
        </div>

        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-rose-300 text-xs font-bold border border-white/15 mb-6 uppercase tracking-[0.2em] backdrop-blur-md">
              <BookOpen className="w-3.5 h-3.5 text-fuji-red" /> 富士知識ハブ • FJI Knowledge Hub
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-extrabold text-white mb-6 tracking-tight leading-[1.1]">
              Japanese Language & <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuji-red via-rose-300 to-amber-300">
                Career Insights
              </span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto font-light leading-relaxed mb-6">
              Master JLPT exams, crack Kanji mnemonics, and accelerate your career in Japan with actionable guides written by certified native senseis.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Floating Filters, Search & View Switcher Bar */}
      <div className="container mx-auto px-4 md:px-8 -mt-8 relative z-20">
        <div className="bg-white p-4 md:p-6 rounded-[2rem] shadow-premium border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Category Pills */}
          <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
            {CATEGORIES.map(cat => (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-fuji-indigo text-white shadow-md'
                    : 'bg-gray-100/70 text-gray-600 hover:bg-gray-200/80'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Controls: View Switcher (Images vs Words) + Search Box */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
            
            {/* View Mode Switcher: Visual Photos vs Pure Words Only */}
            <div className="flex items-center bg-gray-100 p-1.5 rounded-2xl border border-gray-200 shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('visual')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'visual'
                    ? 'bg-white text-fuji-indigo shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                title="View articles with topic-relevant photography"
              >
                <Image className="w-3.5 h-3.5 text-fuji-red" />
                <span>With Images</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('words')}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  viewMode === 'words'
                    ? 'bg-white text-fuji-indigo shadow-sm'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
                title="View articles in clean Japanese editorial words-only layout"
              >
                <AlignLeft className="w-3.5 h-3.5 text-fuji-indigo" />
                <span>Words Only</span>
              </button>
            </div>

            {/* Search Input */}
            <div className="relative flex-grow sm:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search topics, JLPT..."
                className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-gray-50 border border-gray-200 text-xs md:text-sm focus:bg-white focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 outline-none transition-all placeholder:text-gray-400"
              />
            </div>

          </div>
        </div>
      </div>

      {/* Blog Articles Grid */}
      <div className="container mx-auto px-4 md:px-8 py-16">
        {loading ? (
          <div className="flex justify-center items-center py-24">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-fuji-red border-t-transparent"></div>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm">
            <Sparkles className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold font-display text-fuji-indigo mb-2">No articles found</h3>
            <p className="text-gray-500 text-sm mb-6 font-light">Try searching with different keywords or clearing your active filters.</p>
            <button
              type="button"
              onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
              className="px-6 py-2.5 bg-fuji-indigo text-white text-sm font-bold rounded-xl hover:bg-slate-900 transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredPosts.map((post, idx) => {
              const kanjiMeta = getCategoryKanji(post.category);
              const isVisual = viewMode === 'visual' && Boolean(post.image);

              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={`group rounded-[2.5rem] overflow-hidden transition-all duration-500 flex flex-col h-full hover:-translate-y-2 ${
                    isVisual
                      ? 'bg-white shadow-sm hover:shadow-2xl border border-gray-100'
                      : 'bg-white shadow-sm hover:shadow-2xl border-2 border-gray-200/80 hover:border-fuji-red/30'
                  }`}
                >
                  {isVisual ? (
                    /* 1. VISUAL MODE: Clean cinematic photography matching the topic */
                    <Link to={`/blog/${post.slug || post.id}`} className="relative h-64 overflow-hidden block">
                      <img
                        src={post.image}
                        alt={post.title}
                        width="600"
                        height="256"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/courses/jlpt-n5.jpg';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                      
                      {/* Floating Category Pill */}
                      <div className="absolute top-4 left-4">
                        <span className="px-3.5 py-1.5 bg-white/95 backdrop-blur-md rounded-xl text-xs font-bold text-fuji-indigo shadow-md flex items-center gap-1.5 uppercase tracking-wide">
                          <Tag className="w-3 h-3 text-fuji-red" />
                          {post.category}
                        </span>
                      </div>

                      {/* Bottom Image Stamp */}
                      <div className="absolute bottom-3 right-4">
                        <span className="text-white/80 text-xs font-medium tracking-wider backdrop-blur-sm px-2 py-0.5 rounded-lg bg-black/30">
                          {kanjiMeta.kanji}
                        </span>
                      </div>
                    </Link>
                  ) : (
                    /* 2. WORDS-ONLY EDITORIAL MODE: Pure Japanese Typography & Calligraphy Accent */
                    <Link 
                      to={`/blog/${post.slug || post.id}`} 
                      className="relative p-7 bg-gradient-to-br from-gray-50 via-white to-rose-50/20 border-b border-gray-100 overflow-hidden flex flex-col justify-between min-h-[140px]"
                    >
                      {/* Japanese Calligraphy Kanji Seal Watermark */}
                      <div className="absolute -right-3 -bottom-5 text-7xl font-display font-black text-gray-200/70 select-none pointer-events-none group-hover:text-fuji-red/10 transition-colors">
                        {kanjiMeta.kanji}
                      </div>

                      <div className="flex items-center justify-between relative z-10 mb-2">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-fuji-indigo text-white text-[11px] font-bold uppercase tracking-wider shadow-sm">
                          <BookOpen className="w-3 h-3 text-fuji-red" />
                          {post.category}
                        </span>

                        <span className="px-2.5 py-1 rounded-md bg-rose-50 text-fuji-red text-xs font-black border border-rose-100">
                          {kanjiMeta.kanji}
                        </span>
                      </div>

                      <div className="relative z-10 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                        {kanjiMeta.romaji}
                      </div>
                    </Link>
                  )}

                  {/* Article Card Body */}
                  <div className="p-7 md:p-8 flex flex-col flex-grow">
                    {/* Metadata Header */}
                    <div className="flex items-center gap-3 text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {post.date}
                      </div>
                      <span className="w-1 h-1 bg-gray-300 rounded-full" />
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-fuji-red" /> {post.read_time || '5 min read'}
                      </div>
                    </div>

                    {/* Article Title */}
                    <Link to={`/blog/${post.slug || post.id}`}>
                      <h2 className="text-xl md:text-2xl font-display font-bold text-fuji-indigo mb-3 group-hover:text-fuji-red transition-colors leading-snug line-clamp-2">
                        {post.title}
                      </h2>
                    </Link>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-grow font-light">
                      {post.excerpt}
                    </p>

                    {/* Read Action Footer */}
                    <div className="pt-5 border-t border-gray-100 mt-auto flex items-center justify-between">
                      <Link
                        to={`/blog/${post.slug || post.id}`}
                        className="inline-flex items-center gap-2 text-fuji-red font-bold text-sm group/btn hover:gap-3 transition-all"
                      >
                        Read Complete Guide <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Link>

                      <span className="text-xs text-gray-400 font-medium">
                        Sensei Tanaka
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}

        {/* Free Study Kit & JLPT Starter Pack Lead Magnet */}
        <div className="mt-24 p-10 md:p-14 bg-gradient-to-br from-fuji-indigo via-[#221e54] to-slate-900 rounded-[3rem] text-center relative overflow-hidden shadow-2xl text-white">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-fuji-red/25 rounded-full blur-[90px]" />
          <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/20 rounded-full blur-[90px]" />

          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 text-rose-300 text-xs font-bold uppercase tracking-wider mb-4 border border-white/15">
              <Sparkles className="w-3.5 h-3.5 text-fuji-red" /> Free Study Resources
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-extrabold mb-4 leading-tight">
              Ready to Accelerate Your Japanese?
            </h2>
            <p className="text-white/80 text-base md:text-lg mb-8 font-light leading-relaxed">
              Explore our structured JLPT N5 through N1 live batches with certified native senseis. Small batch sizes, interactive speaking drills, and proven 98% pass curriculum.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                to="/courses"
                className="px-8 py-4 bg-gradient-to-r from-fuji-red to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold rounded-2xl shadow-xl shadow-fuji-red/30 transition-all text-base flex items-center gap-2"
              >
                Browse All Courses <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/contact?demo=true"
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-2xl backdrop-blur-md transition-all text-base flex items-center gap-2"
              >
                Book a Free Demo Class
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;

