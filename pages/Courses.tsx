
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, Clock, Calendar, Gift, ArrowRight, BookOpen, Star, Filter } from 'lucide-react';
import { COURSES } from '../constants';
import { cn } from '../lib/utils';
import { CourseLevel, Course } from '../types';
import { supabase } from '../src/lib/supabaseClient';
import CourseFinderWidget from '../components/CourseFinderWidget';
import CourseComparisonTable from '../components/CourseComparisonTable';
import BatchCountdownTimer from '../components/BatchCountdownTimer';
import Breadcrumbs from '../components/Breadcrumbs';
import CourseFeeScheduleCalculator from '../components/CourseFeeScheduleCalculator';
import JlptDiagnosticPlacementQuiz from '../components/JlptDiagnosticPlacementQuiz';

interface CoursesProps {
  onOpenEnrollment: (courseName?: string) => void;
}

const FILTER_CHIPS = ['All', 'JLPT N5', 'JLPT N4', 'JLPT N3', 'JLPT N2', 'Spoken', 'Business', 'IT'];

const Courses: React.FC<CoursesProps> = ({ onOpenEnrollment }) => {
  const [filter, setFilter] = useState<string>('All');
  const [courses, setCourses] = useState<Course[]>(COURSES);

  useEffect(() => {
    const fetchCourses = async () => {
      // First check if admin stored custom/updated courses
      try {
        const saved = typeof window !== 'undefined' ? localStorage.getItem('fuji_admin_courses') : null;
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCourses(parsed);
          }
        }
      } catch (e) {
        console.warn("Error reading local courses cache", e);
      }

      try {
        const { data, error } = await supabase.from('courses').select('*').order('id');
        if (error) {
          console.warn("Supabase fetch error, using cache/mock data", error);
          return;
        }
        if (data && data.length > 0) {
          const formattedCourses = data.map((c: any) => {
            const defaultCourse = COURSES.find(dc => dc.id === c.id || dc.title === c.title || dc.slug === c.slug);
            return {
              ...defaultCourse,
              ...c,
              originalPrice: c.originalPrice || defaultCourse?.originalPrice,
              discountPercent: c.discountPercent || defaultCourse?.discountPercent,
              features: Array.isArray(c.features) ? c.features : (typeof c.features === 'string' ? JSON.parse(c.features) : (defaultCourse?.features || [])),
            };
          }) as Course[];

          setCourses(formattedCourses);
        }
      } catch (err) {
        console.warn("Error fetching courses", err);
      }
    };
    fetchCourses();
  }, []);

  const filteredCourses = courses.filter(c => {
    if (filter === 'All') return true;
    if (filter === 'JLPT N5') return c.jlptLevel === 'N5' || c.slug === 'jlpt-n5';
    if (filter === 'JLPT N4') return c.jlptLevel === 'N4' || c.slug === 'jlpt-n4';
    if (filter === 'JLPT N3') return c.jlptLevel === 'N3' || c.slug === 'jlpt-n3';
    if (filter === 'JLPT N2') return c.jlptLevel === 'N2' || c.slug === 'jlpt-n2' || c.jlptLevel === 'N1' || c.slug === 'jlpt-n1';
    if (filter === 'Spoken') return c.slug === 'spoken-japanese' || c.title.toLowerCase().includes('spoken');
    if (filter === 'Business') return c.slug === 'business-japanese' || c.title.toLowerCase().includes('business');
    if (filter === 'IT') return c.slug === 'japanese-for-it-professionals' || c.title.toLowerCase().includes('it');
    return true;
  });

  return (
    <div className="pt-24 pb-20 min-h-screen bg-fuji-light">
      <Helmet>
        <title>Best JLPT Coaching in India | N5 to N1 Courses | Fuji Japanese Academy</title>
        <meta name="description" content="Enroll in expert JLPT N5 to N1 coaching. Get top-rated Japanese language training online and in Bengaluru with certified trainers & 100% placement support." />
        <meta name="keywords" content="JLPT coaching, JLPT N5 to N2 coaching, Japanese language test preparation, Learn Japanese India" />
        <link rel="canonical" href="https://fujijapaneseacademy.com/courses" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            "itemListElement": courses.map((c, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "item": {
                "@type": "Course",
                "name": c.title,
                "description": c.description,
                "url": `https://fujijapaneseacademy.com/courses/${c.slug || c.id}`,
                "provider": {
                  "@type": "EducationalOrganization",
                  "name": "Fuji Japanese Academy",
                  "url": "https://fujijapaneseacademy.com"
                }
              }
            }))
          })}
        </script>
      </Helmet>
      {/* Header */}
      <section className="relative py-20 bg-fuji-indigo text-white mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-fuji-red/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-fuji-red font-bold tracking-widest uppercase text-sm mb-4 inline-block">JLPT N5 to N1 Courses</span>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-white">Expert Japanese Coaching</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed">
              From absolute beginners to advanced professionals, find the best Japanese language course to pass the JLPT and secure jobs in Japan.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        <Breadcrumbs items={[{ label: 'Courses', path: '/courses' }]} className="mb-8" />

        <BatchCountdownTimer onEnroll={() => onOpenEnrollment()} />
        <CourseComparisonTable />

        {/* Dynamic Tuition Fee & Schedule Calculator */}
        <div className="mt-12 mb-16">
          <CourseFeeScheduleCalculator onEnroll={onOpenEnrollment} />
        </div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-12 mb-12">
          {FILTER_CHIPS.map((level) => (
            <button
              type="button"
              key={level}
              onClick={() => setFilter(level)}
              aria-label={`Filter courses by ${level}`}
              className={cn(
                "px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 border cursor-pointer",
                filter === level
                  ? "bg-fuji-red text-white border-fuji-red shadow-lg scale-105"
                  : "bg-white text-fuji-slate border-gray-200 hover:border-fuji-red/50 hover:text-fuji-red"
              )}
            >
              {level}
            </button>
          ))}
        </div>

        {/* Course Grid */}
        <motion.div layout className="grid lg:grid-cols-2 gap-8 mb-20">
          <AnimatePresence>
            {filteredCourses.map((course) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                key={course.id}
                className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-premium transition-all duration-300 border border-white flex flex-col md:flex-row h-full"
              >
                {/* Image Section */}
                <NavLink
                  to={`/courses/${course.slug || course.id}`}
                  className="md:w-2/5 relative overflow-hidden bg-gray-100 flex items-center justify-center block cursor-pointer"
                >
                  <img
                    src={course.image}
                    alt={`${course.title} - Japanese Language Course`}
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="600"
                    className="w-full h-full object-cover min-h-[250px] transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/images/courses/jlpt-n5.jpg'; // Fallback
                      target.onerror = null; // Prevent infinite loop
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60 pointer-events-none" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-fuji-indigo shadow-sm uppercase tracking-wide z-10">
                    {course.jlptLevel || 'Special'}
                  </div>
                  <div className="absolute bottom-4 left-4 text-white z-10">
                    <div className="flex items-center gap-1 text-yellow-400 mb-1">
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                      <Star className="w-3 h-3 fill-current" />
                    </div>
                    <span className="text-xs font-medium text-white/90">Rated 4.9/5 by students</span>
                  </div>
                </NavLink>

                {/* Content Section */}
                <div className="p-8 md:w-3/5 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <NavLink to={`/courses/${course.slug || course.id}`}>
                        <h3 className="text-2xl font-display font-bold text-fuji-indigo group-hover:text-fuji-red transition-colors">
                          {course.title}
                        </h3>
                      </NavLink>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-fuji-red/10 text-fuji-red">
                        <span className="w-1.5 h-1.5 rounded-full bg-fuji-red animate-pulse" />
                        Admissions Open
                      </span>
                      <span className="text-xs font-medium text-fuji-slate/60">Live Online & Bengaluru Center</span>
                    </div>

                    <p className="text-fuji-slate/70 text-sm mb-6 leading-relaxed">
                      {course.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-6">
                      <div className="flex items-center gap-2 text-xs font-semibold text-fuji-slate/80 bg-fuji-light px-3 py-1.5 rounded-md">
                        <Clock className="w-4 h-4 text-fuji-indigo" />
                        {course.duration}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-semibold text-fuji-slate/80 bg-fuji-light px-3 py-1.5 rounded-md">
                        <Calendar className="w-4 h-4 text-fuji-indigo" />
                        Weekend/Weekday
                      </div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {course.features.slice(0, 3).map((feature, i) => (
                        <div key={i} className="flex items-center gap-3 text-sm text-fuji-slate/90">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-4">
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
                    <div className="flex flex-col gap-0.5 mb-3 px-1">
                      <NavLink
                        to="/terms"
                        className="text-[9px] md:text-[10px] text-fuji-slate/60 hover:text-fuji-red transition-colors underline w-fit"
                      >
                        Terms & Refund Policy ↗
                      </NavLink>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-2.5">
                      <NavLink
                        to={`/courses/${course.slug || course.id}`}
                        className="flex-1 py-3 px-4 rounded-xl border-2 border-fuji-indigo text-fuji-indigo font-bold hover:bg-fuji-indigo hover:text-white transition-all text-center text-sm flex items-center justify-center gap-1.5 active:scale-95"
                      >
                        View Syllabus
                        <ArrowRight className="w-3.5 h-3.5" />
                      </NavLink>
                      <button
                        type="button"
                        onClick={() => onOpenEnrollment(course.title)}
                        className="flex-1 py-3 px-4 rounded-xl bg-fuji-red text-white font-bold hover:bg-red-700 transition-all shadow-md active:scale-95 flex justify-center items-center gap-1.5 text-sm"
                      >
                        Enroll / Check Fee
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Smart Course Finder Widget */}
        <div className="mb-16">
          <CourseFinderWidget onOpenEnrollment={onOpenEnrollment} />
        </div>

        {/* Interactive Placement Diagnostic Quiz Section */}
        <div className="mb-20">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-fuji-red font-bold tracking-widest uppercase text-xs">Skill-Based Self-Assessment</span>
            <h2 className="text-3xl font-display font-bold text-fuji-indigo mt-1">Not Sure Which Level to Choose?</h2>
            <p className="text-fuji-slate/70 text-sm mt-2">
              Take our 2-minute diagnostic skill assessment. Test your knowledge of Kana, particles, verb conjugations, and Kanji to discover your exact starting benchmark.
            </p>
          </div>
          <JlptDiagnosticPlacementQuiz onSelectCourse={(slug) => onOpenEnrollment(slug)} />
        </div>

        {/* Free Courses Banner */}
        <div className="mb-16 relative rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-emerald-600 to-teal-800 shadow-2xl">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
          <div className="relative z-10 p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md rounded-3xl flex items-center justify-center text-white border border-white/20 shadow-inner">
                <Gift className="w-10 h-10" />
              </div>
              <div>
                <h3 className="text-3xl font-display font-bold text-white mb-2">Starting from scratch?</h3>
                <p className="text-emerald-100 text-lg max-w-md">Access our premium introductory resources completely free. Master Hiragana in just 3 days.</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <NavLink to="/courses/free" className="px-8 py-4 bg-white text-emerald-800 rounded-full font-bold hover:bg-emerald-50 transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1">
                Explore Free Courses <ArrowRight className="w-5 h-5" />
              </NavLink>
              <a
                href="https://chat.whatsapp.com/CsrjvewBVU8Iy8NOVpR913"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-emerald-500/20 text-white border border-white/30 rounded-full font-bold hover:bg-white/10 transition-all flex items-center justify-center gap-2 backdrop-blur-sm shadow-xl"
              >
                Join Community
              </a>
            </div>
          </div>
        </div>

        {/* Corporate Training */}
        <div className="p-12 bg-white rounded-[2rem] border border-gray-100 shadow-premium flex flex-col lg:flex-row items-center gap-12 text-center lg:text-left">
          <div className="lg:w-2/3">
            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
              <BookOpen className="w-6 h-6 text-fuji-red" />
              <span className="text-sm font-bold tracking-widest uppercase text-fuji-slate/50">Enterprise Solutions</span>
            </div>
            <h3 className="text-3xl font-display font-bold text-fuji-indigo mb-4">Corporate Language Training</h3>
            <p className="text-fuji-slate/80 text-lg leading-relaxed">
              We offer customized Japanese language training programs for organizations expanding to Japan.
              Our curriculum focuses on business etiquette, technical vocabulary, and cross-cultural communication.
            </p>
          </div>
          <div className="lg:w-1/3 flex justify-center lg:justify-end w-full">
            <button
              type="button"
              onClick={() => onOpenEnrollment('Corporate Japanese Training for Enterprises')}
              className="px-8 py-4 border-2 border-fuji-indigo text-fuji-indigo rounded-full font-bold hover:bg-fuji-indigo hover:text-white transition-all w-full md:w-auto cursor-pointer"
            >
              Request Corporate Brochure &amp; Proposal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Courses;
