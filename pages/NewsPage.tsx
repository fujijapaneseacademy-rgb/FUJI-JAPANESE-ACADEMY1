import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Bell, Calendar, ArrowRight, Filter
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { ACADEMY_NEWS, NewsItem } from '../data/newsData';

const NewsPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const categories = ['All', 'New Batches', 'JLPT Updates', 'Academy Events', 'Student Success'];
  const filteredNews = ACADEMY_NEWS.filter(
    item => selectedCategory === 'All' || item.category === selectedCategory
  );

  return (
    <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
      <Helmet>
        <title>Academy News &amp; JLPT Exam Updates | Fuji Japanese Academy</title>
        <meta
          name="description"
          content="Latest announcements from Fuji Japanese Academy. Upcoming JLPT exam schedules, new weekend batch openings, student pass results, and cultural workshops."
        />
        <link rel="canonical" href="https://fujijapaneseacademy.com/news" />
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-b from-fuji-indigo via-[#1d1945] to-[#12102e] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-6">
              <Bell className="w-4 h-4" /> Official Academy Bulletin
            </div>
            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4">
              News &amp; <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200">Announcements</span>
            </h1>
            <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
              Stay up-to-date with JLPT registration deadlines, upcoming batch schedules, exam results, and special Japanese cultural masterclasses.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <Breadcrumbs items={[{ label: 'News & Announcements', path: '/news' }]} className="mb-8" />

          {/* Category Filter */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <span className="text-xs font-bold text-fuji-slate/60 flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-fuji-red text-white shadow-sm'
                    : 'bg-white border border-gray-200 text-fuji-slate/70 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* News Cards */}
          <div className="space-y-6">
            {filteredNews.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-50 text-fuji-red">
                        {item.badge}
                      </span>
                      <span className="text-xs font-semibold text-fuji-slate/60 bg-gray-100 px-2.5 py-0.5 rounded-md">
                        {item.category}
                      </span>
                    </div>
                    <span className="text-xs text-fuji-slate/50 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" /> {item.date}
                    </span>
                  </div>

                  <h2 className="text-xl md:text-2xl font-bold font-display text-fuji-indigo mb-3">
                    {item.title}
                  </h2>
                  <p className="text-xs md:text-sm text-fuji-slate/70 leading-relaxed mb-6">
                    {item.summary}
                  </p>
                </div>

                {item.ctaLink && (
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between">
                    <Link
                      to={item.ctaLink}
                      className="inline-flex items-center gap-1.5 text-xs md:text-sm font-bold text-fuji-red hover:text-fuji-indigo transition-colors"
                    >
                      {item.ctaText || 'Learn More'} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewsPage;
