import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  MapPin, CheckCircle2,
  Building2, HelpCircle, ChevronDown,
  ChevronUp, ExternalLink, BookOpen,
  GraduationCap, ArrowRight, Briefcase, Award
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { LOCATIONS_DATA, LocationDetail } from '../data/locationData';

const LocationPage: React.FC = () => {
  const { city } = useParams<{ city?: string }>();
  const validKeys = Object.keys(LOCATIONS_DATA);
  const normalizedCity = city?.toLowerCase() || 'bangalore';
  const activeCityKey = validKeys.includes(normalizedCity) ? normalizedCity : 'bangalore';
  const data: LocationDetail = LOCATIONS_DATA[activeCityKey];

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeCityKey]);

  // Schema.org LocalBusiness & FAQPage JSON-LD
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'EducationalOrganization',
        '@id': `https://fujijapaneseacademy.com/locations/${data.slug}#organization`,
        'name': `Fuji Japanese Academy - ${data.badge}`,
        'image': 'https://fujijapaneseacademy.com/og-image.jpg',
        'url': `https://fujijapaneseacademy.com/locations/${data.slug}`,
        'telephone': data.phone,
        'email': data.email,
        'priceRange': '₹₹',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': data.address,
          'addressLocality': data.subLocality || 'Bengaluru',
          'addressRegion': 'Karnataka',
          'postalCode': data.postalCode || '560100',
          'addressCountry': 'IN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': data.geoCoordinates?.latitude || 12.84666,
          'longitude': data.geoCoordinates?.longitude || 77.67111
        },
        'areaServed': [
          'Bengaluru',
          'Electronic City',
          'Koramangala',
          'Indiranagar',
          'Whitefield',
          'HSR Layout',
          'BTM Layout',
          'Karnataka'
        ],
        'openingHoursSpecification': [
          {
            '@type': 'OpeningHoursSpecification',
            'dayOfWeek': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            'opens': '09:00',
            'closes': '19:30'
          }
        ]
      },
      ...(data.faqs && data.faqs.length > 0 ? [{
        '@type': 'FAQPage',
        '@id': `https://fujijapaneseacademy.com/locations/${data.slug}#faq`,
        'mainEntity': data.faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.answer
          }
        }))
      }] : [])
    ]
  };

  return (
    <div className="pt-24 min-h-screen bg-[#fafafc] text-fuji-slate">
      <Helmet>
        <title>{data.title} | JLPT Coaching & Demo | Fuji Academy</title>
        <meta name="description" content={data.overview.slice(0, 160)} />
        <link rel="canonical" href={`https://fujijapaneseacademy.com/locations/${data.slug}`} />
        <meta property="og:title" content={`${data.title} | Fuji Japanese Academy`} />
        <meta property="og:description" content={data.overview.slice(0, 160)} />
        <meta property="og:url" content={`https://fujijapaneseacademy.com/locations/${data.slug}`} />
        <meta property="og:image" content="https://fujijapaneseacademy.com/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify(combinedSchema)}
        </script>
      </Helmet>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-fuji-indigo via-[#1d1945] to-[#12102e] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-4 text-xs">
              <span className="px-3 py-1 bg-fuji-red text-white font-bold rounded-full uppercase tracking-wider">
                {data.badge}
              </span>
              <span className="text-gray-300 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-fuji-red" /> Bengaluru, Karnataka
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl font-display font-bold leading-tight mb-3 text-white">
              {data.heroHeadline}
            </h1>
            <p className="text-xl text-amber-300 font-display font-semibold mb-4">
              {data.tagline}
            </p>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed max-w-3xl mb-8">
              {data.overview}
            </p>

            {/* Quick Location Switcher */}
            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/10 items-center">
              <span className="text-xs text-gray-400 mr-1">Locations:</span>
              {[
                { slug: 'bangalore', label: 'Bengaluru (All Areas)' },
                { slug: 'electronic-city', label: 'Electronic City' },
                { slug: 'koramangala', label: 'Koramangala' },
                { slug: 'indiranagar', label: 'Indiranagar' },
                { slug: 'whitefield', label: 'Whitefield' }
              ].map(loc => (
                <Link
                  key={loc.slug}
                  to={`/locations/${loc.slug}`}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activeCityKey === loc.slug
                      ? 'bg-white text-fuji-indigo shadow-md'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  {loc.label}
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
              { label: 'Locations', path: '/locations/bangalore' },
              { label: data.badge, path: `/locations/${data.slug}` }
            ]}
            className="mb-8"
          />

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {data.highlights.map((h, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm hover:shadow-md transition-all"
              >
                <div className="w-10 h-10 rounded-xl bg-red-50 text-fuji-red flex items-center justify-center mb-4">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold font-display text-fuji-indigo mb-2">
                  {h.title}
                </h3>
                <p className="text-xs md:text-sm text-fuji-slate/70 leading-relaxed">
                  {h.description}
                </p>
              </div>
            ))}
          </div>

          {/* Center Address & Contact Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-12">
            <h2 className="text-2xl font-display font-bold text-fuji-indigo mb-6 flex items-center gap-2">
              <MapPin className="w-6 h-6 text-fuji-red" /> Campus Address &amp; Visiting Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm text-fuji-slate/80">
              <div className="space-y-4">
                <div>
                  <strong className="text-fuji-indigo block text-sm mb-1">Electronic City Center</strong>
                  <p className="text-fuji-slate/70">{data.address}</p>
                </div>
                <div>
                  <strong className="text-fuji-indigo block text-sm mb-1">Visiting Hours</strong>
                  <p className="text-fuji-slate/70">{data.visitingHours}</p>
                </div>
                <div>
                  <strong className="text-fuji-indigo block text-sm mb-1">Admissions Desk</strong>
                  <p className="text-fuji-slate/70">Phone: {data.phone}</p>
                  <p className="text-fuji-slate/70">Email: {data.email}</p>
                </div>
              </div>

              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-fuji-red block mb-1">
                    Free In-Person Consultation
                  </span>
                  <p className="text-xs text-fuji-slate/70 leading-relaxed mb-4">
                    Visit our campus to inspect official Minna no Nihongo &amp; Shin Kanzen textbooks, browse our Japanese reading library, and consult with a senior sensei.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <a
                    href="https://maps.google.com/?q=Electronic+City,+06,+1st+Floor,+Vittasandra+Cross+Hemavathi+Block,+Phase-1,+Bettadasanapura,+Karnataka+560100"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-fuji-indigo hover:bg-fuji-slate text-white text-xs font-semibold rounded-xl transition-all shadow"
                  >
                    <ExternalLink className="w-3.5 h-3.5" /> Get Directions
                  </a>
                  <Link
                    to="/enquire"
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-fuji-red hover:bg-rose-600 text-white text-xs font-semibold rounded-xl transition-all shadow"
                  >
                    Book Free Demo
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Offline Classroom & Online Courses Offered at this Location */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-12">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-fuji-red block mb-1">
                  Classroom &amp; Hybrid Batches
                </span>
                <h2 className="text-2xl font-display font-bold text-fuji-indigo flex items-center gap-2">
                  <GraduationCap className="w-6 h-6 text-fuji-red" />
                  Japanese Courses Available in Bengaluru
                </h2>
              </div>
              <Link
                to="/courses"
                className="text-xs md:text-sm font-bold text-fuji-red hover:underline inline-flex items-center gap-1"
              >
                View All Courses <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
            <p className="text-xs md:text-sm text-fuji-slate/70 mb-6">
              Join in-person classroom batches at our Electronic City Phase 1 campus or access live interactive Zoom cohorts with native Japanese senseis. Weekend batches available for working professionals.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <Link
                to="/courses/jlpt-n5"
                className="p-4 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all bg-gray-50/60 block group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 bg-red-100 text-fuji-red text-[11px] font-bold rounded-md">JLPT N5</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">Weekend / Weekday</span>
                </div>
                <h3 className="font-bold text-sm text-fuji-indigo group-hover:text-fuji-red transition-colors">JLPT N5 Foundation</h3>
                <p className="text-xs text-fuji-slate/60 mt-1">Beginner course covering Hiragana, Katakana, 103 Kanji, and essential grammar.</p>
              </Link>

              <Link
                to="/courses/jlpt-n4"
                className="p-4 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all bg-gray-50/60 block group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 bg-red-100 text-fuji-red text-[11px] font-bold rounded-md">JLPT N4</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">Classroom &amp; Live</span>
                </div>
                <h3 className="font-bold text-sm text-fuji-indigo group-hover:text-fuji-red transition-colors">JLPT N4 Basic Conversational</h3>
                <p className="text-xs text-fuji-slate/60 mt-1">Daily life Japanese, 300 Kanji, and foundational conversational fluency.</p>
              </Link>

              <Link
                to="/courses/jlpt-n3"
                className="p-4 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all bg-gray-50/60 block group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 bg-blue-100 text-blue-700 text-[11px] font-bold rounded-md">JLPT N3</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">IT Career Key</span>
                </div>
                <h3 className="font-bold text-sm text-fuji-indigo group-hover:text-fuji-red transition-colors">JLPT N3 Intermediate for IT</h3>
                <p className="text-xs text-fuji-slate/60 mt-1">Essential benchmark for software engineer hiring in Tokyo and Bengaluru GICs.</p>
              </Link>

              <Link
                to="/courses/japanese-for-it-professionals"
                className="p-4 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all bg-gray-50/60 block group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 bg-purple-100 text-purple-700 text-[11px] font-bold rounded-md">Tech Focus</span>
                  <span className="text-[11px] text-purple-700 font-semibold">Developers</span>
                </div>
                <h3 className="font-bold text-sm text-fuji-indigo group-hover:text-fuji-red transition-colors">Japanese for IT Professionals</h3>
                <p className="text-xs text-fuji-slate/60 mt-1">Standups, code reviews, JIRA in Japanese, and Tokyo tech interview prep.</p>
              </Link>

              <Link
                to="/courses/spoken-japanese"
                className="p-4 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all bg-gray-50/60 block group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 bg-amber-100 text-amber-700 text-[11px] font-bold rounded-md">Speaking</span>
                  <span className="text-[11px] text-amber-700 font-semibold">Kaiwa Lounge</span>
                </div>
                <h3 className="font-bold text-sm text-fuji-indigo group-hover:text-fuji-red transition-colors">Spoken Japanese Course</h3>
                <p className="text-xs text-fuji-slate/60 mt-1">Practical everyday conversation drills and pronunciation with native speakers.</p>
              </Link>

              <Link
                to="/courses/corporate-japanese-training"
                className="p-4 rounded-2xl border border-gray-100 hover:border-red-200 hover:shadow-md transition-all bg-gray-50/60 block group"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-700 text-[11px] font-bold rounded-md">B2B</span>
                  <span className="text-[11px] text-emerald-700 font-semibold">Enterprises</span>
                </div>
                <h3 className="font-bold text-sm text-fuji-indigo group-hover:text-fuji-red transition-colors">Corporate Training</h3>
                <p className="text-xs text-fuji-slate/60 mt-1">On-campus and onsite corporate Japanese programs for Bengaluru tech companies.</p>
              </Link>
            </div>

            {/* In-depth Links: JLPT Hub & Career Pathways */}
            <div className="pt-6 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-red-50/40 rounded-2xl border border-red-100">
                <span className="text-xs font-bold text-fuji-red flex items-center gap-1 mb-1">
                  <Award className="w-3.5 h-3.5" /> JLPT Examination Hub
                </span>
                <p className="text-xs text-fuji-slate/70 mb-2">
                  Review exam format, passing marks, and syllabus guidelines for all 5 JLPT levels.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link to="/jlpt" className="font-bold text-fuji-indigo hover:text-fuji-red underline">JLPT Overview</Link>
                  <span>•</span>
                  <Link to="/jlpt/n5" className="font-bold text-fuji-indigo hover:text-fuji-red underline">N5 Marks</Link>
                  <span>•</span>
                  <Link to="/jlpt/n4" className="font-bold text-fuji-indigo hover:text-fuji-red underline">N4 Guide</Link>
                  <span>•</span>
                  <Link to="/jlpt/n3" className="font-bold text-fuji-indigo hover:text-fuji-red underline">N3 Benchmark</Link>
                </div>
              </div>

              <div className="p-4 bg-blue-50/40 rounded-2xl border border-blue-100">
                <span className="text-xs font-bold text-blue-700 flex items-center gap-1 mb-1">
                  <Briefcase className="w-3.5 h-3.5" /> Japan Career &amp; Visas
                </span>
                <p className="text-xs text-fuji-slate/70 mb-2">
                  Guidance for software engineers and professionals aiming to relocate to Tokyo.
                </p>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link to="/career/japanese-for-it" className="font-bold text-fuji-indigo hover:text-fuji-red underline">IT Jobs in Japan</Link>
                  <span>•</span>
                  <Link to="/career/working-in-japan" className="font-bold text-fuji-indigo hover:text-fuji-red underline">Work Visas</Link>
                  <span>•</span>
                  <Link to="/career/japanese-job-interview" className="font-bold text-fuji-indigo hover:text-fuji-red underline">Resume (Rirekisho)</Link>
                </div>
              </div>
            </div>
          </div>

          {/* JLPT Exam Center in Bengaluru Info */}
          {data.jlptCenterInfo && (
            <div className="bg-gradient-to-br from-fuji-indigo to-[#1e1a47] text-white rounded-3xl p-6 md:p-8 shadow-md mb-12">
              <span className="text-xs uppercase font-bold tracking-wider text-amber-300 block mb-1">
                Official Exam Center
              </span>
              <h3 className="text-xl md:text-2xl font-bold font-display mb-2">
                Bengaluru JLPT Test Center: {data.jlptCenterInfo.centerName}
              </h3>
              <p className="text-xs md:text-sm text-gray-200 mb-3">
                <strong>Address:</strong> {data.jlptCenterInfo.location}
              </p>
              <p className="text-xs text-gray-300">
                <strong>Commute:</strong> {data.jlptCenterInfo.transportTips}
              </p>
            </div>
          )}

          {/* Nearby Tech Hubs */}
          {data.nearbyTechParks && (
            <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-12">
              <h3 className="text-xl font-bold font-display text-fuji-indigo mb-4 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-fuji-red" /> Nearby Tech Parks &amp; IT Corridors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {data.nearbyTechParks.map((park, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-xl text-xs font-medium text-fuji-slate/80 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-fuji-red" />
                    <span>{park}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-12">
            <h3 className="text-xl font-bold font-display text-fuji-indigo mb-6 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-fuji-red" /> Frequently Asked Questions
            </h3>
            <div className="space-y-3">
              {data.faqs.map((faq, idx) => (
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

          {/* Bottom CTA */}
          <div className="p-8 bg-gradient-to-r from-red-500 to-rose-600 text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase font-bold tracking-wider text-amber-200 block mb-1">
                Start Learning in Bengaluru
              </span>
              <h4 className="text-xl font-bold font-display">Join an Upcoming Weekend Batch</h4>
              <p className="text-xs text-rose-100 mt-1 max-w-md">
                Attend classroom sessions in Electronic City or live interactive Zoom classes from home.
              </p>
            </div>
            <Link
              to="/enquire"
              className="px-6 py-3 bg-white text-fuji-red hover:bg-gray-100 font-bold rounded-xl text-xs md:text-sm whitespace-nowrap shadow transition-all"
            >
              Book Free Demo Class
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LocationPage;
