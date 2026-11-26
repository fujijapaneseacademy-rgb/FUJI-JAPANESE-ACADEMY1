import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock, Calendar, CheckCircle, ArrowRight, ArrowLeft, Star,
  BookOpen, Award, Users, ChevronDown, ChevronUp, Sparkles,
  GraduationCap, HelpCircle, PhoneCall, ShieldCheck, MapPin,
  Building2, Briefcase
} from 'lucide-react';
import { COURSES } from '../constants';
import { Course } from '../types';

interface CourseDetailPageProps {
  onOpenEnrollment: (courseName?: string) => void;
}

const CourseDetailPage: React.FC<CourseDetailPageProps> = ({ onOpenEnrollment }) => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [course, setCourse] = useState<Course | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!slug) return;
    const found = COURSES.find(c => c.slug === slug || c.id === slug);
    if (found) {
      setCourse(found);
    }
    window.scrollTo(0, 0);
  }, [slug]);

  if (!course) {
    return (
      <div className="min-h-screen pt-32 pb-20 bg-fuji-light flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-md mx-auto">
          <div className="w-16 h-16 bg-red-50 text-fuji-red rounded-2xl flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold font-display text-fuji-indigo mb-2">Course Not Found</h1>
          <p className="text-fuji-slate/70 text-sm mb-6">
            The course you are looking for might have moved or the link is incorrect.
          </p>
          <Link
            to="/courses"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-fuji-indigo text-white rounded-xl font-bold hover:bg-fuji-red transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> View All Courses
          </Link>
        </div>
      </div>
    );
  }

  // Related courses (excluding current)
  const relatedCourses = COURSES.filter(c => c.id !== course.id).slice(0, 3);

  // Schema.org Course + Breadcrumb + FAQPage JSON-LD
  const courseSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "name": course.title,
        "description": course.description,
        "provider": {
          "@type": "EducationalOrganization",
          "name": "Fuji Japanese Academy",
          "url": "https://fujijapaneseacademy.com",
          "logo": "https://fujijapaneseacademy.com/og-image.jpg"
        },
        "educationalCredentialAwarded": course.jlptLevel ? `JLPT ${course.jlptLevel} Certification` : "Certificate of Japanese Proficiency",
        "hasCourseInstance": {
          "@type": "CourseInstance",
          "courseMode": ["blended", "online", "onsite"],
          "courseWorkload": course.duration,
          "instructor": [
            {
              "@type": "Person",
              "name": "Hiroshi Tanaka",
              "jobTitle": "Head Native Japanese Instructor"
            },
            {
              "@type": "Person",
              "name": "Priya Sharma",
              "jobTitle": "Senior N1 Certified Trainer"
            }
          ]
        },
        "offers": {
          "@type": "Offer",
          "category": "Paid",
          "availability": "https://schema.org/InStock"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://fujijapaneseacademy.com"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Courses",
            "item": "https://fujijapaneseacademy.com/courses"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": course.title,
            "item": `https://fujijapaneseacademy.com/courses/${course.slug || course.id}`
          }
        ]
      },
      ...(course.faqs && course.faqs.length > 0 ? [{
        "@type": "FAQPage",
        "mainEntity": course.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        }))
      }] : [])
    ]
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-fuji-light text-fuji-slate">
      <Helmet>
        <title>{course.metaTitle || `${course.title} Coaching | Fuji Japanese Academy`}</title>
        <meta name="description" content={course.metaDescription || course.description} />
        <link rel="canonical" href={`https://fujijapaneseacademy.com/courses/${course.slug || course.id}`} />
        <meta property="og:title" content={course.metaTitle || course.title} />
        <meta property="og:description" content={course.metaDescription || course.description} />
        <meta property="og:image" content={course.image} />
        <meta property="og:url" content={`https://fujijapaneseacademy.com/courses/${course.slug || course.id}`} />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {JSON.stringify(courseSchema)}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <div className="container mx-auto px-4 md:px-6 py-4">
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs text-fuji-slate/60">
          <Link to="/" className="hover:text-fuji-red transition-colors">Home</Link>
          <span>/</span>
          <Link to="/courses" className="hover:text-fuji-red transition-colors">Courses</Link>
          <span>/</span>
          <span className="text-fuji-indigo font-semibold">{course.title}</span>
        </nav>
      </div>

      {/* Hero Header Section */}
      <section className="relative py-12 md:py-16 bg-gradient-to-b from-fuji-indigo via-fuji-indigo to-slate-900 text-white overflow-hidden mb-12">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuji-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3.5 py-1 bg-fuji-red text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  {course.jlptLevel ? `JLPT ${course.jlptLevel}` : 'Conversational'}
                </span>
                {course.badge && (
                  <span className="px-3 py-1 bg-white/10 text-emerald-300 border border-emerald-400/30 text-xs font-semibold rounded-full flex items-center gap-1.5 backdrop-blur-sm">
                    <Sparkles className="w-3.5 h-3.5" />
                    {course.badge}
                  </span>
                )}
                <div className="flex items-center gap-1 text-yellow-400 text-xs font-medium ml-auto sm:ml-0">
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <Star className="w-3.5 h-3.5 fill-current" />
                  <span className="text-white/80 ml-1">4.9/5 (348+ reviews)</span>
                </div>
              </div>

              <h1 className="text-3xl md:text-5xl font-display font-bold mb-4 leading-tight text-white">
                {course.title}
              </h1>

              <p className="text-lg text-white/85 mb-8 leading-relaxed font-light max-w-2xl">
                {course.description}
              </p>

              {/* Quick Metrics Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-md mb-8">
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wide">Duration</div>
                  <div className="text-sm md:text-base font-bold text-white mt-0.5">{course.duration.includes('(') ? course.duration.split('(')[0].trim() : course.duration}</div>
                </div>
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wide">Kanji Target</div>
                  <div className="text-sm md:text-base font-bold text-white mt-0.5">{course.kanjiCount?.split(' ')[0] || '100+'} Kanji</div>
                </div>
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wide">Mode</div>
                  <div className="text-sm md:text-base font-bold text-white mt-0.5">Live Online & Class</div>
                </div>
                <div>
                  <div className="text-xs text-white/60 uppercase tracking-wide">Batches</div>
                  <div className="text-sm md:text-base font-bold text-emerald-400 mt-0.5">Admissions Open</div>
                </div>
              </div>

              {/* Dual Action CTAs */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="button"
                  onClick={() => onOpenEnrollment(course.title)}
                  className="px-8 py-4 bg-fuji-red text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-xl hover:shadow-fuji-red/30 flex items-center justify-center gap-2 group active:scale-98 cursor-pointer"
                >
                  Book Free Demo Class
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenEnrollment(course.title)}
                  className="px-8 py-4 bg-white/10 text-white border border-white/20 rounded-xl font-bold hover:bg-white/20 transition-all backdrop-blur-sm flex items-center justify-center gap-2 active:scale-98 cursor-pointer"
                >
                  Enroll & Register Online
                </button>
              </div>

              <div className="flex items-center gap-4 mt-4 text-xs text-white/70">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-emerald-400" /> Free Trial with Zero Obligation</span>
                <span>•</span>
                <span className="flex items-center gap-1.5"><Award className="w-4 h-4 text-emerald-400" /> Certified Instructors</span>
              </div>
            </div>

            {/* Right Card / Visual */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white/10 group">
                <img
                  src={course.image}
                  alt={`${course.title} Japanese Course`}
                  width="600"
                  height="384"
                  loading="eager"
                  fetchPriority="high"
                  decoding="async"
                  className="w-full h-80 lg:h-96 object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <div className="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-1">Batch Schedule</div>
                  <div className="text-sm font-semibold text-white/95">
                    Weekday & Weekend Batches Available • Next batch starts this Monday!
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-12 gap-10">

          {/* Left / Center Column (Syllabus, Overview, FAQs) */}
          <div className="lg:col-span-8 space-y-12">

            {/* Target Audience & Prerequisites */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-display font-bold text-fuji-indigo mb-6 flex items-center gap-2">
                <GraduationCap className="w-6 h-6 text-fuji-red" />
                Who Should Take This Course?
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-5 bg-fuji-light rounded-2xl border border-gray-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-fuji-red mb-2">Ideal For</div>
                  <p className="text-sm text-fuji-slate/80 leading-relaxed">{course.targetAudience || 'Students, job seekers, and professionals looking to learn Japanese.'}</p>
                </div>
                <div className="p-5 bg-fuji-light rounded-2xl border border-gray-100">
                  <div className="text-xs font-bold uppercase tracking-wider text-fuji-indigo mb-2">Prerequisites</div>
                  <p className="text-sm text-fuji-slate/80 leading-relaxed">{course.prerequisites || 'No prerequisites required.'}</p>
                </div>
              </div>
            </div>

            {/* Key Learning Highlights */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <h2 className="text-2xl font-display font-bold text-fuji-indigo mb-6 flex items-center gap-2">
                <Award className="w-6 h-6 text-fuji-red" />
                What You Will Achieve in {course.title}
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {course.features.map((feat, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-4 bg-fuji-light/70 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-fuji-slate/90">{feat}</span>
                  </div>
                ))}
                {course.examPassingCriteria && (
                  <div className="sm:col-span-2 flex items-start gap-3 p-4 bg-emerald-50 border border-emerald-200/50 rounded-xl">
                    <ShieldCheck className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-xs font-bold uppercase text-emerald-800">Official JLPT Exam Passing Benchmark</div>
                      <div className="text-sm text-emerald-950 mt-0.5">{course.examPassingCriteria}</div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Complete Syllabus Breakdown Accordion */}
            {course.syllabus && course.syllabus.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h2 className="text-2xl font-display font-bold text-fuji-indigo flex items-center gap-2">
                      <BookOpen className="w-6 h-6 text-fuji-red" />
                      Detailed Syllabus & Curriculum
                    </h2>
                    <p className="text-xs text-fuji-slate/60 mt-1">Structured modules designed in alignment with Japan Foundation guidelines.</p>
                  </div>
                  <span className="text-xs font-semibold px-3 py-1.5 bg-fuji-light text-fuji-indigo rounded-lg w-fit">
                    {course.syllabus.length} Core Modules
                  </span>
                </div>

                <div className="space-y-4">
                  {course.syllabus.map((module, idx) => {
                    const isOpen = openModuleIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-200"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenModuleIndex(isOpen ? null : idx)}
                          className="w-full text-left p-5 flex items-center justify-between gap-4 bg-white hover:bg-fuji-light/50 transition-colors cursor-pointer"
                          aria-expanded={isOpen}
                        >
                          <div>
                            <span className="text-xs font-bold text-fuji-red uppercase tracking-wider block mb-1">
                              Module {idx + 1}
                            </span>
                            <h3 className="text-base font-bold text-fuji-indigo">
                              {module.title}
                            </h3>
                            <p className="text-xs text-fuji-slate/70 mt-1 font-light">
                              {module.description}
                            </p>
                          </div>
                          <div className="w-8 h-8 rounded-full bg-fuji-light flex items-center justify-center flex-shrink-0 text-fuji-indigo">
                            {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                          </div>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.25 }}
                              className="border-t border-gray-100 bg-fuji-light/30 px-6 py-4"
                            >
                              <ul className="space-y-2.5">
                                {module.items.map((item, itemIdx) => (
                                  <li key={itemIdx} className="flex items-start gap-2.5 text-sm text-fuji-slate/85">
                                    <span className="w-1.5 h-1.5 rounded-full bg-fuji-red mt-2 flex-shrink-0" />
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Level-Specific FAQs */}
            {course.faqs && course.faqs.length > 0 && (
              <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                <h2 className="text-2xl font-display font-bold text-fuji-indigo mb-2 flex items-center gap-2">
                  <HelpCircle className="w-6 h-6 text-fuji-red" />
                  Frequently Asked Questions
                </h2>
                <p className="text-xs text-fuji-slate/60 mb-6">
                  Got questions about {course.title}? Here are clear answers to common student inquiries.
                </p>

                <div className="space-y-3">
                  {course.faqs.map((faq, idx) => {
                    const isOpen = openFaqIndex === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-gray-200 rounded-xl overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                          className="w-full text-left p-4 flex items-center justify-between gap-4 hover:bg-fuji-light/50 transition-colors cursor-pointer"
                          aria-expanded={isOpen}
                        >
                          <span className="text-sm md:text-base font-bold text-fuji-indigo">
                            {faq.question}
                          </span>
                          <span className="w-6 h-6 rounded-full bg-fuji-light flex items-center justify-center flex-shrink-0 text-fuji-indigo">
                            {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                          </span>
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="border-t border-gray-100 bg-fuji-light/40 px-5 py-3.5 text-sm text-fuji-slate/85 leading-relaxed"
                            >
                              {faq.answer}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* In-Person Classroom Training in Bengaluru */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-fuji-red block mb-1">
                Offline Classroom &amp; Hybrid Learning
              </span>
              <h2 className="text-2xl font-display font-bold text-fuji-indigo mb-3 flex items-center gap-2">
                <Building2 className="w-6 h-6 text-fuji-red" />
                Attend In-Person at Our Bengaluru Campus
              </h2>
              <p className="text-sm text-fuji-slate/80 leading-relaxed mb-6">
                Prefer hands-on, face-to-face coaching? Attend {course.title} in-person at our Electronic City Phase 1 campus. Enjoy high-tech AV classrooms, a 500+ Japanese manga and Kanji library, and direct speaking practice with native senseis.
              </p>

              <div className="grid sm:grid-cols-2 gap-4 mb-6">
                <div className="p-4 bg-fuji-light rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 text-fuji-indigo font-bold text-sm mb-1">
                    <MapPin className="w-4 h-4 text-fuji-red" /> Electronic City Campus
                  </div>
                  <p className="text-xs text-fuji-slate/70 leading-relaxed">
                    06, 1st Floor, Vittasandra Cross, Hemavathi Block, Phase-1, Bettadasanapura, Electronic City, Bengaluru 560100.
                  </p>
                  <Link
                    to="/locations/electronic-city"
                    className="inline-flex items-center gap-1 text-xs font-bold text-fuji-red hover:underline mt-2"
                  >
                    View Campus Details <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>

                <div className="p-4 bg-fuji-light rounded-2xl border border-gray-100">
                  <div className="flex items-center gap-2 text-fuji-indigo font-bold text-sm mb-1">
                    <Clock className="w-4 h-4 text-fuji-indigo" /> Weekend &amp; Weekday Batches
                  </div>
                  <p className="text-xs text-fuji-slate/70 leading-relaxed">
                    Saturday &amp; Sunday classroom slots designed for tech professionals and students across Bengaluru.
                  </p>
                  <Link
                    to="/locations/bangalore"
                    className="inline-flex items-center gap-1 text-xs font-bold text-fuji-red hover:underline mt-2"
                  >
                    All Bengaluru Hubs <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>

              {/* Area Links */}
              <div className="pt-4 border-t border-gray-100">
                <span className="text-xs text-fuji-slate/60 block mb-2 font-medium">Accessible to professionals across Bengaluru:</span>
                <div className="flex flex-wrap gap-2 text-xs">
                  <Link to="/locations/electronic-city" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">Electronic City</Link>
                  <Link to="/locations/koramangala" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">Koramangala</Link>
                  <Link to="/locations/indiranagar" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">Indiranagar</Link>
                  <Link to="/locations/whitefield" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">Whitefield</Link>
                  <Link to="/locations/bangalore" className="px-3 py-1 bg-gray-50 border border-gray-200 rounded-lg font-semibold hover:border-red-400">All Bengaluru</Link>
                </div>
              </div>
            </div>

            {/* Related Exam Guides & Career Roadmaps */}
            <div className="bg-gradient-to-br from-fuji-indigo to-[#1e1a47] text-white rounded-3xl p-8 shadow-sm">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">
                Knowledge &amp; Career Hubs
              </span>
              <h2 className="text-2xl font-display font-bold mb-3 flex items-center gap-2">
                <Award className="w-6 h-6 text-amber-300" />
                JLPT Preparation &amp; Japan Careers
              </h2>
              <p className="text-xs md:text-sm text-gray-200 mb-6 leading-relaxed">
                Maximize your study progress with our comprehensive exam syllabi, self-study kana guides, and direct Tokyo tech hiring pathways.
              </p>

              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <Link
                  to={course.jlptLevel ? `/jlpt/${course.jlptLevel.toLowerCase()}` : '/jlpt'}
                  className="p-3.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 block"
                >
                  <div className="font-bold text-amber-300 mb-1 flex items-center gap-1">
                    <BookOpen className="w-3.5 h-3.5" /> JLPT Exam Guide
                  </div>
                  <p className="text-gray-300 text-[11px]">Syllabus, passing scores &amp; sectional benchmarks.</p>
                </Link>

                <Link
                  to="/career/japanese-for-it"
                  className="p-3.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 block"
                >
                  <div className="font-bold text-emerald-300 mb-1 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5" /> Tokyo Tech Careers
                  </div>
                  <p className="text-gray-300 text-[11px]">Salaries, hiring trends &amp; visa requirements.</p>
                </Link>

                <Link
                  to="/learn/hiragana-katakana"
                  className="p-3.5 bg-white/10 hover:bg-white/20 rounded-xl transition-all border border-white/10 block"
                >
                  <div className="font-bold text-rose-300 mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" /> Free Kana &amp; Kanji
                  </div>
                  <p className="text-gray-300 text-[11px]">Stroke orders, particle guides &amp; practice quizzes.</p>
                </Link>
              </div>
            </div>

          </div>

          {/* Right Sticky Sidebar (Enrollment & Counseling) */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Sticky Pricing & Enrollment Card */}
            <div className="sticky top-28 bg-white rounded-3xl p-6 border border-gray-200 shadow-premium">
              <div className="text-xs uppercase tracking-widest text-fuji-slate/60 font-semibold mb-1">
                Admissions &amp; Enrollment
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  New Batches Starting Soon
                </span>
              </div>

              <div className="space-y-3 py-4 border-y border-gray-100 text-xs text-fuji-slate/80">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-fuji-indigo" /> Course Duration</span>
                  <span className="font-semibold text-fuji-indigo">{course.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Users className="w-4 h-4 text-fuji-indigo" /> Batch Size</span>
                  <span className="font-semibold text-fuji-indigo">12–15 Students Max</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-fuji-indigo" /> Class Timings</span>
                  <span className="font-semibold text-fuji-indigo">Weekend / Weekday</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-2"><MapPin className="w-4 h-4 text-fuji-red" /> Learning Mode</span>
                  <span className="font-semibold text-fuji-indigo text-right">
                    <Link to="/locations/electronic-city" className="hover:text-fuji-red underline">Classroom</Link> &amp; Online
                  </span>
                </div>
              </div>

              {/* Batch Timings */}
              {course.batchSchedule && (
                <div className="my-4">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-fuji-indigo mb-2">Available Batches</div>
                  <ul className="space-y-1.5">
                    {course.batchSchedule.map((b, idx) => (
                      <li key={idx} className="text-xs text-fuji-slate/80 flex items-start gap-2 bg-fuji-light/80 p-2.5 rounded-lg">
                        <span className="text-fuji-red font-bold">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Pricing Display */}
              {course.price && (
                <div className="my-4 p-4 bg-red-50 rounded-xl border border-red-100 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-2">
                    {course.originalPrice && (
                      <span className="text-sm text-gray-400 line-through">₹{course.originalPrice.toLocaleString('en-IN')}</span>
                    )}
                    <span className="text-2xl font-bold text-fuji-red">{course.price}</span>
                    {course.discountPercent && (
                      <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                        {course.discountPercent}% OFF
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] text-gray-500 mt-1">All-Inclusive (No Hidden Fees)</span>
                </div>
              )}

              {/* CTA Buttons */}
              <div className="space-y-3 pt-2">
                <button
                  type="button"
                  onClick={() => onOpenEnrollment(course.title)}
                  className="w-full py-4 bg-fuji-red text-white rounded-xl font-bold hover:bg-red-700 transition-all shadow-lg hover:shadow-fuji-red/30 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  Book Free Demo Class
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  type="button"
                  onClick={() => onOpenEnrollment(course.title)}
                  className="w-full py-3 bg-fuji-indigo text-white rounded-xl font-bold hover:bg-slate-900 transition-all text-sm cursor-pointer"
                >
                  Enroll &amp; Check Fee
                </button>
              </div>

              {/* Instant WhatsApp Counseling */}
              <div className="mt-5 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-center">
                <div className="text-xs font-semibold text-emerald-950 mb-1">Need Guidance Choosing Your Level?</div>
                <a
                  href={`https://wa.me/916364924110?text=Hi%20Fuji%20Japanese%20Academy,%20I%20have%20questions%20regarding%20the%20${encodeURIComponent(course.title)}%20course.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-900 inline-flex items-center gap-1.5 underline"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Chat with a Counselor on WhatsApp
                </a>
              </div>

              <div className="text-[10px] text-fuji-slate/50 text-center mt-3">
                <Link to="/terms" className="underline hover:text-fuji-red">Terms & Refund Policy</Link> applies to all enrollments.
              </div>
            </div>

          </div>

        </div>

        {/* Explore Other Courses Section */}
        <section className="mt-20 pt-12 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-fuji-red">Continuous Progression</span>
              <h2 className="text-2xl font-display font-bold text-fuji-indigo">Explore Other Japanese Levels</h2>
            </div>
            <Link to="/courses" className="text-sm font-bold text-fuji-red hover:underline flex items-center gap-1">
              View All Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedCourses.map(rel => (
              <Link
                key={rel.id}
                to={`/courses/${rel.slug || rel.id}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-premium transition-all p-5 flex flex-col justify-between"
              >
                <div>
                  <div className="h-40 rounded-xl overflow-hidden mb-4 relative">
                    <img
                      src={rel.image}
                      alt={rel.title}
                      width="400"
                      height="160"
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 px-2.5 py-0.5 bg-white/95 rounded-md text-[10px] font-bold text-fuji-indigo">
                      {rel.jlptLevel || 'Special'}
                    </div>
                  </div>
                  <h3 className="font-display font-bold text-lg text-fuji-indigo group-hover:text-fuji-red transition-colors mb-1">
                    {rel.title}
                  </h3>
                  <p className="text-xs text-fuji-slate/70 line-clamp-2 mb-3">
                    {rel.description}
                  </p>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-xs font-bold text-fuji-indigo">
                  <span className="text-fuji-slate/60 font-medium">{rel.duration}</span>
                  <span className="text-fuji-red flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    View Syllabus <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default CourseDetailPage;
