import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  MapPin, CheckCircle2, Building2, HelpCircle, ChevronDown,
  ChevronUp, ExternalLink, BookOpen, GraduationCap, ArrowRight,
  Briefcase, Award, ShieldCheck, Sparkles, MessageSquare, Phone, Laptop, Users
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { INDIA_LOCATIONS, IndiaLocation } from '../data/indiaLocations';
import PanIndiaLocationDirectory from '../components/PanIndiaLocationDirectory';

interface LocationLandingPageProps {
  onOpenEnrollment?: (courseName?: string) => void;
}

const COURSES_FEE_DATA = [
  {
    level: 'JLPT N5',
    name: 'Foundation Certification Course',
    fee: '₹15,000',
    duration: '3 Months (80+ Hours)',
    badge: 'Beginner Essential',
    desc: 'Master Hiragana, Katakana, 103 Kanji, and core conversational sentence formulas. 4 simulated mock exams included.'
  },
  {
    level: 'JLPT N4',
    name: 'Elementary Fluency Course',
    fee: '₹20,300',
    duration: '3.5 Months (90+ Hours)',
    badge: 'SSW Visa Benchmark',
    desc: 'Expand to 300 Kanji and 1,500 words. Qualify for Specified Skilled Worker (SSW) visas and everyday living in Japan.'
  },
  {
    level: 'JLPT N3',
    name: 'Intermediate Business & Tech',
    fee: '₹30,300',
    duration: '4.5 Months (120+ Hours)',
    badge: 'Tokyo IT Gateway',
    desc: 'The gold standard for Indian software developers relocating to Tokyo. Complex grammar, Keigo basics, and tech standup drills.'
  },
  {
    level: 'JLPT N2',
    name: 'Advanced Professional Fluency',
    fee: '₹40,200',
    duration: '6 Months (150+ Hours)',
    badge: 'High-Salary MNC Roles',
    desc: 'Corporate Japanese, contract reading, business negotiation, and direct bilingual project management placement in Japan.'
  },
  {
    level: 'JLPT N1',
    name: 'Native-Level Mastery',
    fee: '₹75,300',
    duration: '8 Months (200+ Hours)',
    badge: 'Executive & Translator',
    desc: 'Complete mastery of 2,000+ Kanji and academic/legal Japanese. Elite coaching by certified native Japanese senseis.'
  },
  {
    level: 'Spoken Japanese',
    name: 'Conversational Fluency & Accent',
    fee: '₹8,000',
    duration: '1.5 Months (40 Hours)',
    badge: 'Fast-Track Speaking',
    desc: '100% conversational practice, Tokyo accent coaching, dining & travel etiquette without intensive script memorization.'
  }
];

export const LocationLandingPage: React.FC<LocationLandingPageProps> = ({ onOpenEnrollment }) => {
  const { citySlug, city } = useParams<{ citySlug?: string; city?: string }>();
  const rawSlug = citySlug || city || 'bangalore';
  const normalizedSlug = rawSlug.toLowerCase();

  const locationData: IndiaLocation = INDIA_LOCATIONS.find(l => l.slug === normalizedSlug) || {
    cityName: 'Bengaluru',
    slug: 'bangalore',
    state: 'Karnataka',
    country: 'India',
    nativeLanguageSupport: 'Kannada, English & Hindi',
    popularPrograms: ['JLPT N5-N1', 'Bilingual IT Engineer', 'Study in Japan', 'Corporate Keigo'],
    localContext: 'Bengaluru is India’s Silicon Valley, home to 45+ Japanese tech firms including Rakuten, Sony, Toyota, and Hitachi. Attend classes at our Electronic City classroom or live online.',
    deliveryMode: 'Offline Campus & Online',
    isPhysicalCampus: true
  };

  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [normalizedSlug]);

  const pageTitle = `Best Japanese Language Classes in ${locationData.cityName} (Online & Offline Campus) | Fuji Japanese Academy`;
  const metaDescription = `Looking for the best Japanese language classes in ${locationData.cityName}, ${locationData.state}? Fuji Japanese Academy provides premier JLPT N5–N1 coaching, native sensei interaction, mother-tongue bilingual grammar bridging with ${locationData.nativeLanguageSupport}, and direct job placement in Tokyo.`;
  const canonicalUrl = `https://fujijapaneseacademy.com/locations/${locationData.slug}`;

  const faqs = [
    {
      q: `Why do students often fail JLPT N5, and how does Fuji Academy's 98% pass rate system solve it?`,
      a: `Most self-learners and generic language institutes fail because they rely on passive video watching or strict English-only translations that confuse Japanese particle grammar (は, が, に, で). At Fuji Japanese Academy, our certified senseis use bilingual grammar bridging with ${locationData.nativeLanguageSupport} and English—since Indian languages share identical Subject-Object-Verb (SOV) sentence structure with Japanese. Plus, every student takes 4 to 8 full-length timer mock exams with personal mistake analysis.`
    },
    {
      q: `Are live online Japanese classes as effective as offline classroom coaching for students in ${locationData.cityName}?`,
      a: `Yes, 100%! Our live virtual classrooms use interactive video breakout rooms, real-time speaking drills with native Tokyo senseis, digital whiteboard Kanji stroke analysis, and 24/7 access to recorded lectures. Students in ${locationData.cityName} also enjoy full access to weekend immersion workshops at our Electronic City, Bengaluru campus whenever they visit.`
    },
    {
      q: `Can learning Japanese help engineers and professionals from ${locationData.cityName} get high-paying jobs in Japan?`,
      a: `Clearing JLPT N3 or N2 is the single highest-ROI skill for Indian engineers. Tokyo tech companies actively sponsor bilingual software engineers, DevOps leads, and data scientists with starting packages between ¥6,000,000 and ¥12,000,000 (₹33 Lakhs to ₹77+ Lakhs PA). Fuji Academy offers direct Japanese resume (Rirekisho) formatting, mock interviews, and recruitment bridges to Tokyo.`
    },
    {
      q: `How can I verify genuine Japan Certificate of Eligibility (COE) and Work Visa pathways?`,
      a: `Beware of unregistered agents promising direct work visas without language qualifications. The Japanese Immigration Services Agency strictly requires accredited JLPT or JFT-Basic certification alongside genuine academic degrees or SSW skills evaluations. Fuji Academy operates transparently with accredited Japanese language universities and verified corporate hiring partners, assisting with 100% genuine COE documentation.`
    },
    {
      q: `How do I attend a free demo session from ${locationData.cityName}?`,
      a: `You can book a 100% free, 45-minute live demo class today. Choose between live interactive Zoom from ${locationData.cityName} or an in-person session at our Electronic City, Bengaluru campus. Our counselor will assess your career goals and provide a customized JLPT roadmap.`
    }
  ];

  const jsonLdSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': ['EducationalOrganization', 'LocalBusiness'],
        '@id': `${canonicalUrl}#organization`,
        'name': `Fuji Japanese Academy - ${locationData.cityName}`,
        'image': 'https://fujijapaneseacademy.com/og-image.jpg',
        'url': canonicalUrl,
        'telephone': '+916364924110',
        'email': 'info@fujijapaneseacademy.com',
        'priceRange': '₹₹',
        'address': {
          '@type': 'PostalAddress',
          'streetAddress': '06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Electronic City',
          'addressLocality': 'Bengaluru',
          'addressRegion': 'Karnataka',
          'postalCode': '560100',
          'addressCountry': 'IN'
        },
        'geo': {
          '@type': 'GeoCoordinates',
          'latitude': 12.8466666,
          'longitude': 77.6711111
        },
        'areaServed': [
          locationData.cityName,
          locationData.state,
          'Bengaluru',
          'India',
          'Japan'
        ],
        'aggregateRating': {
          '@type': 'AggregateRating',
          'ratingValue': '4.9',
          'reviewCount': '348',
          'bestRating': '5',
          'worstRating': '1'
        }
      },
      {
        '@type': 'FAQPage',
        '@id': `${canonicalUrl}#faq`,
        'mainEntity': faqs.map(faq => ({
          '@type': 'Question',
          'name': faq.q,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': faq.a
          }
        }))
      }
    ]
  };

  const handleEnrollClick = (courseTitle?: string) => {
    if (onOpenEnrollment) {
      onOpenEnrollment(courseTitle);
    } else {
      window.location.href = `/enquire?city=${encodeURIComponent(locationData.cityName)}&course=${encodeURIComponent(courseTitle || '')}`;
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 text-slate-800">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://fujijapaneseacademy.com/og-image.jpg" />
        <meta name="twitter:title" content={pageTitle} />
        <meta name="twitter:description" content={metaDescription} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLdSchema)}
        </script>
      </Helmet>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-8 py-3">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: 'Locations', path: '/locations' },
            { label: `${locationData.cityName}, ${locationData.state}`, path: canonicalUrl }
          ]}
        />
      </div>

      {/* Hero Section */}
      <header className="relative py-14 md:py-20 bg-gradient-to-br from-slate-950 via-[#181335] to-slate-950 text-white overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/20 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 text-rose-300 text-xs font-bold uppercase tracking-wider mb-5 border border-white/15 backdrop-blur-md">
              <MapPin className="w-3.5 h-3.5 text-red-400" />
              <span>{locationData.cityName} &bull; {locationData.deliveryMode}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[46px] font-extrabold tracking-tight text-white mb-6 leading-tight">
              Top Japanese Language Institute for Students in {locationData.cityName}, {locationData.state} — Live Online &amp; Bengaluru Offline Campus
            </h1>

            <p className="text-base sm:text-lg text-slate-300 font-light leading-relaxed max-w-3xl mx-auto mb-8">
              {locationData.localContext} Join over 2,400+ successful alumni who cleared JLPT N5 through N1 with certified native Japanese senseis and Indian N1 faculty.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={() => handleEnrollClick()}
                className="px-7 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition-all flex items-center gap-2 active:scale-95 cursor-pointer"
              >
                <span>Book a Free Demo Class ({locationData.cityName})</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                href={`https://wa.me/916364924110?text=Hi%20Fuji%20Japanese%20Academy,%20I%20am%20from%20${encodeURIComponent(locationData.cityName)}%20and%20would%20like%20to%20know%20about%20your%20upcoming%20JLPT%20batches.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 text-white font-bold text-sm border border-white/20 backdrop-blur-md transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp Counselor</span>
              </a>
            </div>

            {/* Quick Trust Badges */}
            <div className="mt-10 pt-8 border-t border-white/10 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" /> 98.4% JLPT Pass Rate
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-emerald-400" /> Small Batches (10–12 Students)
              </span>
              <span>&bull;</span>
              <span className="flex items-center gap-1.5">
                <Award className="w-4 h-4 text-emerald-400" /> Tokyo IT Job &amp; Visa Assistance
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Mother-Tongue Advantage Block */}
      <section className="py-14 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="bg-gradient-to-r from-red-50 via-rose-50 to-amber-50 rounded-3xl p-6 sm:p-10 border border-red-200/80 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>The Mother-Tongue Advantage</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Learn Japanese Faster in {locationData.cityName} with Bilingual Bridge Pedagogy
                </h2>
                <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-3xl">
                  Did you know that Japanese and Indian languages (including <strong>{locationData.nativeLanguageSupport}</strong>) share an identical grammatical foundation? Both use <strong>Subject-Object-Verb (SOV)</strong> word order and postpositional case markers (particles), whereas English uses SVO.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs text-slate-800 font-medium">
                  <div className="p-3 bg-white rounded-xl border border-red-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Support in <strong>{locationData.nativeLanguageSupport}</strong> for subtle grammatical nuances</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-red-100 flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-red-600 shrink-0" />
                    <span>Native Tokyo senseis for pristine pronunciation &amp; pitch accent</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 w-full md:w-auto">
                <button
                  type="button"
                  onClick={() => handleEnrollClick()}
                  className="w-full md:w-auto px-6 py-3.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white font-bold text-xs sm:text-sm transition-colors text-center shadow-md cursor-pointer"
                >
                  Experience Free Demo Class &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Cards & Transparent Fee Matrix */}
      <section className="py-16 bg-slate-50" id="courses">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
              Transparent Fees &bull; JLPT N5 to N1
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Courses Available for Students in {locationData.cityName}
            </h2>
            <p className="text-sm text-slate-600">
              Zero hidden charges. Includes official workbooks, Kanji practice flashcards, live doubt-clearing sessions, and certified mock exams.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {COURSES_FEE_DATA.map((course, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-red-500/60 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-3 py-1 rounded-full bg-red-50 text-red-600 font-extrabold text-xs">
                      {course.level}
                    </span>
                    <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      {course.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors mb-1">
                    {course.name}
                  </h3>

                  <div className="text-xs text-slate-500 mb-3 flex items-center gap-1.5 font-medium">
                    <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                    <span>{course.duration}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-6">
                    {course.desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-baseline justify-between mb-4">
                    <div>
                      <span className="text-xs text-slate-400 block font-medium">All-Inclusive Fee</span>
                      <span className="text-2xl font-extrabold text-slate-900">{course.fee}</span>
                    </div>
                    <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-md">
                      Installments Available
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Link
                      to="/courses"
                      className="py-2.5 px-3 rounded-xl border border-slate-200 text-center font-bold text-xs text-slate-700 hover:bg-slate-50 transition-colors"
                    >
                      Syllabus
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleEnrollClick(course.level)}
                      className="py-2.5 px-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1 shadow-sm cursor-pointer"
                    >
                      <span>Book Demo</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pain-Point & Objection FAQ Section */}
      <section className="py-16 bg-white border-t border-slate-200" id="faqs">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
              Frequently Asked Questions &bull; {locationData.cityName}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Everything You Need to Know Before Enrolling
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-slate-200 bg-slate-50/60 overflow-hidden transition-all duration-200"
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-sm sm:text-base text-slate-900">
                      {faq.q}
                    </span>
                    <span className="w-7 h-7 rounded-full bg-white text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                      {isOpen ? <ChevronUp className="w-4 h-4 text-red-600" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-200/60">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Direct Contact Bar */}
          <div className="mt-12 p-6 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <h4 className="font-bold text-base text-white">Have specific questions from {locationData.cityName}?</h4>
              <p className="text-xs text-slate-300">Speak directly with our senior Japanese language counselor.</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="tel:+916364924110"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5 text-amber-300" />
                <span>+91 63649 24110</span>
              </a>
              <a
                href={`https://wa.me/916364924110?text=Hi%20Fuji%20Academy,%20I%20have%20questions%20regarding%20classes%20for%20${encodeURIComponent(locationData.cityName)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all flex items-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Pan-India Accordion Directory at Bottom */}
      <div className="container mx-auto px-4 md:px-8">
        <PanIndiaLocationDirectory />
      </div>
    </div>
  );
};

export default LocationLandingPage;
