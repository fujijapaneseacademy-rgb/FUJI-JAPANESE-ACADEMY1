import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  Briefcase, ArrowRight, CheckCircle2,
  Clock, HelpCircle, ChevronDown, ChevronUp,
  GraduationCap, MapPin, Building2, BookOpen
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { CAREER_ARTICLES, CareerArticle } from '../data/careerData';
import { getJobApplyMailto } from '../data/jobsData';

const ALL_TOPICS = ['japanese-for-it', 'working-in-japan', 'japanese-jobs', 'japanese-job-interview'];

const CareerPage: React.FC = () => {
  const { topic } = useParams<{ topic?: string }>();
  const resolvedTopic = topic === 'it-jobs-in-japan-for-indians' ? 'japanese-for-it' : topic;
  const activeArticle: CareerArticle | undefined = resolvedTopic ? CAREER_ARTICLES[resolvedTopic] : undefined;
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [topic]);

  // If no topic parameter, render the Career Hub Overview
  if (!activeArticle) {
    return (
      <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
        <Helmet>
          <title>Career in Japan &amp; Japanese for IT Professionals | Fuji Japanese Academy</title>
          <meta
            name="description"
            content="Unlock high-paying software engineering and tech careers in Tokyo. Guide to Japan work visas, tech hiring, Japanese resume (Rirekisho) writing &amp; interview tips."
          />
          <link rel="canonical" href="https://fujijapaneseacademy.com/career" />
        </Helmet>

        {/* Hero */}
        <section className="bg-gradient-to-b from-fuji-indigo via-[#1d1945] to-[#12102e] text-white py-16 md:py-20 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold uppercase tracking-wider text-amber-300 mb-6">
                <Briefcase className="w-4 h-4" /> Career Hub &amp; Global Mobility
              </div>
              <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-4 text-white">
                Launch Your Career in <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-200">Japan</span>
              </h1>
              <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
                Japan needs over 400,000 international software developers and bilingual professionals. Learn how our coaching and placement assistance fast-tracks your Tokyo relocation.
              </p>
            </div>
          </div>
        </section>

        {/* Guides Grid */}
        <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
          <div className="max-w-5xl mx-auto">
            <Breadcrumbs items={[{ label: 'Career in Japan Hub', path: '/career' }]} className="mb-8" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {ALL_TOPICS.map((tKey) => {
                const item = CAREER_ARTICLES[tKey];
                return (
                  <div
                    key={tKey}
                    className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="px-3 py-1 bg-red-50 text-fuji-red font-bold text-xs rounded-full uppercase tracking-wider">
                          {item.badge}
                        </span>
                        <span className="text-xs text-fuji-slate/60 flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" /> {item.readTime}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold font-display text-fuji-indigo group-hover:text-fuji-red transition-colors mb-2 line-clamp-2">
                        {item.title}
                      </h2>
                      <p className="text-xs md:text-sm text-fuji-slate/70 mb-6 leading-relaxed line-clamp-3">
                        {item.excerpt}
                      </p>
                    </div>

                    <Link
                      to={`/career/${item.slug}`}
                      className="inline-flex items-center gap-2 font-bold text-xs md:text-sm text-fuji-red group-hover:text-fuji-indigo transition-colors"
                    >
                      Read Career Guide <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Direct Opening Alert: Executive Sales */}
            <div className="mt-12 bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white rounded-3xl p-6 md:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="max-w-xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-bold uppercase tracking-wider mb-2">
                  <Briefcase className="w-3.5 h-3.5" /> Direct Hiring • Manesar, Haryana
                </div>
                <h3 className="text-xl md:text-2xl font-bold font-display text-white mb-2">
                  Executive Sales / Business Development
                </h3>
                <p className="text-xs md:text-sm text-rose-100 leading-relaxed">
                  Salary: <strong>6 to 10 LPA CTC (Fixed)</strong> • Mandatory JLPT N2 or N1 + MBA in Sales/Marketing. Develop and manage bilateral business opportunities with Japanese corporate clients.
                </p>
              </div>
              <div className="shrink-0 flex flex-col sm:flex-row gap-3">
                <Link
                  to="/careers#executive-sales-manesar"
                  className="px-6 py-3 bg-white text-fuji-red hover:bg-gray-100 font-bold rounded-xl text-xs md:text-sm whitespace-nowrap shadow-md transition-all text-center"
                >
                  View Role &amp; Apply
                </Link>
                <a
                  href={getJobApplyMailto('Executive Sales / Business Development', 'Manesar, Haryana')}
                  className="px-6 py-3 bg-fuji-indigo hover:bg-indigo-950 text-white font-bold rounded-xl text-xs md:text-sm whitespace-nowrap shadow-md transition-all text-center"
                >
                  Email Resume Directly
                </a>
              </div>
            </div>

            {/* Corporate Placement Assistance Banner */}
            <div className="mt-12 bg-gradient-to-br from-fuji-indigo to-[#1e1a47] text-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="max-w-xl">
                <span className="text-xs uppercase font-bold tracking-wider text-amber-300 block mb-1">
                  Corporate Placement Cell
                </span>
                <h3 className="text-2xl md:text-3xl font-bold font-display text-white mb-2">
                  Bilingual Interview &amp; Resume Mentorship
                </h3>
                <p className="text-xs md:text-sm text-gray-300 leading-relaxed">
                  Enrolled students receive 1-on-1 resume reviews (Rirekisho &amp; Shokumu Keirekisho), mock technical interviews conducted in Japanese, and direct referrals to hiring partners in Tokyo &amp; Bengaluru.
                </p>
              </div>
              <Link
                to="/enquire"
                className="px-6 py-3.5 bg-fuji-red hover:bg-rose-600 text-white font-bold rounded-xl text-xs md:text-sm whitespace-nowrap shadow-lg transition-all"
              >
                Schedule Career Counseling
              </Link>
            </div>
          </div>
        </section>
      </div>
    );
  }

  // Individual Career Article View
  const article = activeArticle;

  return (
    <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
      <Helmet>
        <title>{article.title} | Fuji Japanese Academy</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://fujijapaneseacademy.com/career/${article.slug}`} />
      </Helmet>

      {/* Header */}
      <section className="bg-gradient-to-b from-fuji-indigo via-[#1d1945] to-[#12102e] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-4 text-xs">
              <span className="px-3 py-1 bg-fuji-red text-white font-bold rounded-full uppercase tracking-wider">
                {article.badge}
              </span>
              <span className="text-gray-300 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> {article.readTime}
              </span>
            </div>
            <h1 className="text-2xl md:text-4xl font-display font-bold text-white leading-tight mb-4">
              {article.title}
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed">
              {article.excerpt}
            </p>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <section className="container mx-auto px-4 md:px-6 py-12 md:py-16">
        <div className="max-w-3xl mx-auto">
          <Breadcrumbs
            items={[
              { label: 'Career Hub', path: '/career' },
              { label: article.badge, path: `/career/${article.slug}` }
            ]}
            className="mb-8"
          />

          <article className="space-y-10">
            {article.contentModules.map((mod, idx) => (
              <div key={idx} className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <h2 className="text-xl md:text-2xl font-bold font-display text-fuji-indigo mb-3">
                  {mod.heading}
                </h2>
                <p className="text-xs md:text-sm text-fuji-slate/80 leading-relaxed mb-4">
                  {mod.text}
                </p>

                {mod.bulletPoints && (
                  <ul className="space-y-2 text-xs md:text-sm text-fuji-slate/80 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    {mod.bulletPoints.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {mod.calloutBox && (
                  <div className="mt-4 p-4 bg-amber-50/80 border border-amber-200 rounded-2xl text-xs md:text-sm text-amber-950">
                    <strong className="block font-bold text-amber-900 mb-1">{mod.calloutBox.title}</strong>
                    <p className="text-amber-900/90 leading-relaxed">{mod.calloutBox.body}</p>
                    {mod.calloutBox.linkUrl && (
                      <div className="mt-3">
                        {mod.calloutBox.linkUrl.startsWith('mailto:') ? (
                          <a
                            href={mod.calloutBox.linkUrl}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-fuji-red hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
                          >
                            {mod.calloutBox.linkText || 'Apply Now'} <ArrowRight className="w-3.5 h-3.5" />
                          </a>
                        ) : (
                          <Link
                            to={mod.calloutBox.linkUrl}
                            className="inline-flex items-center gap-1.5 px-4 py-2 bg-fuji-red hover:bg-rose-600 text-white font-bold text-xs rounded-xl transition-all shadow-sm"
                          >
                            {mod.calloutBox.linkText || 'View Details'} <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}

            {/* FAQs */}
            {article.faqs && article.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                <h3 className="text-xl font-bold font-display text-fuji-indigo mb-4 flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-fuji-red" /> Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {article.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-gray-100 rounded-2xl overflow-hidden">
                      <button
                        type="button"
                        onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                        className="w-full text-left p-4 flex items-center justify-between gap-4 font-semibold text-xs md:text-sm text-fuji-indigo hover:text-fuji-red transition-colors cursor-pointer"
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
            )}

            {/* Recommended Courses & Bengaluru Classroom Batches */}
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-fuji-red block mb-1">
                    Path to Tokyo Placement
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold font-display text-fuji-indigo flex items-center gap-2">
                    <GraduationCap className="w-6 h-6 text-fuji-red" />
                    Recommended Japanese Programs for IT &amp; Careers
                  </h3>
                </div>
                <Link
                  to="/courses"
                  className="text-xs md:text-sm font-bold text-fuji-red hover:underline inline-flex items-center gap-1"
                >
                  All Courses <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
              <p className="text-xs md:text-sm text-fuji-slate/70 mb-6 leading-relaxed">
                Companies in Tokyo and Bengaluru Japanese MNCs look for JLPT N3 or N2 proficiency. Learn via weekend offline batches in Electronic City or live interactive Zoom classes.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <Link
                  to="/courses/japanese-for-it-professionals"
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 hover:border-red-300 hover:shadow-sm transition-all block group"
                >
                  <div className="text-xs font-bold text-purple-700 uppercase mb-1">Developers</div>
                  <h4 className="font-bold text-sm text-fuji-indigo group-hover:text-fuji-red transition-colors">
                    Japanese for IT Professionals
                  </h4>
                  <p className="text-xs text-fuji-slate/60 mt-1">
                    Tech terminology, daily standups, Japanese pull requests, and interview preparation.
                  </p>
                </Link>

                <Link
                  to="/courses/jlpt-n3"
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 hover:border-red-300 hover:shadow-sm transition-all block group"
                >
                  <div className="text-xs font-bold text-blue-700 uppercase mb-1">Career Benchmark</div>
                  <h4 className="font-bold text-sm text-fuji-indigo group-hover:text-fuji-red transition-colors">
                    JLPT N3 Intermediate Course
                  </h4>
                  <p className="text-xs text-fuji-slate/60 mt-1">
                    The golden visa and hiring benchmark for foreign software engineers in Japan.
                  </p>
                </Link>

                <Link
                  to="/courses/business-japanese"
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 hover:border-red-300 hover:shadow-sm transition-all block group"
                >
                  <div className="text-xs font-bold text-amber-700 uppercase mb-1">Corporate Keigo</div>
                  <h4 className="font-bold text-sm text-fuji-indigo group-hover:text-fuji-red transition-colors">
                    Business Japanese &amp; Etiquette
                  </h4>
                  <p className="text-xs text-fuji-slate/60 mt-1">
                    Sonkeigo, Kenjougo, formal email writing, and Japanese corporate meeting dynamics.
                  </p>
                </Link>

                <Link
                  to="/locations/electronic-city"
                  className="p-4 rounded-2xl border border-gray-100 bg-gray-50/70 hover:border-red-300 hover:shadow-sm transition-all block group"
                >
                  <div className="text-xs font-bold text-emerald-700 uppercase mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-fuji-red" /> Bengaluru Campus
                  </div>
                  <h4 className="font-bold text-sm text-fuji-indigo group-hover:text-fuji-red transition-colors">
                    In-Person Weekend Batches
                  </h4>
                  <p className="text-xs text-fuji-slate/60 mt-1">
                    Attend classroom sessions at Electronic City Phase 1 or join live virtual cohorts.
                  </p>
                </Link>
              </div>

              {/* Sibling Career Guide Links */}
              <div className="pt-4 border-t border-gray-100">
                <span className="text-xs text-fuji-slate/60 block mb-2 font-medium">Explore More Career Guides &amp; Hiring:</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link to="/careers#executive-sales-manesar" className="px-3 py-1 bg-red-50 text-fuji-red border border-red-200 rounded-lg font-bold hover:bg-red-100 flex items-center gap-1">
                    <Briefcase className="w-3 h-3" /> Job Opening: Executive Sales (Manesar)
                  </Link>
                  <Link to="/careers" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">All Open Positions</Link>
                  <Link to="/career/japanese-for-it" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">IT Jobs in Tokyo</Link>
                  <Link to="/career/working-in-japan" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">Japan Work Visas</Link>
                  <Link to="/career/japanese-jobs" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">Companies Hiring</Link>
                  <Link to="/career/japanese-job-interview" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">Japanese Resume (Rirekisho)</Link>
                </div>
              </div>
            </div>

            {/* Bottom CTA */}
            <div className="p-8 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-amber-200 block mb-1">
                  Ready to Work in Japan?
                </span>
                <h4 className="text-xl font-bold font-display">Fast-Track Your JLPT &amp; Interview Prep</h4>
                <p className="text-xs text-rose-100 mt-1 max-w-md">
                  Join our specialized Japanese for IT Professionals or Business Japanese batches.
                </p>
              </div>
              <Link
                to="/enquire"
                className="px-6 py-3 bg-white text-fuji-red hover:bg-gray-100 font-bold rounded-xl text-xs md:text-sm whitespace-nowrap shadow transition-all"
              >
                Book Free Counseling
              </Link>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
};

export default CareerPage;
