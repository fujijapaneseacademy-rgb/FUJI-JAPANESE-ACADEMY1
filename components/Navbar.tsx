import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, Link, useNavigate } from 'react-router-dom';
import {
  Menu, X, ArrowRight, User, ChevronDown, Sparkles,
  BookOpen, Target, Layers, Briefcase, MapPin, Award, Search, CreditCard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AnnouncementBar from './AnnouncementBar';
import { ADMIN_EMAIL } from '../constants';
import { cn } from '../lib/utils';
import { supabase } from '../src/lib/supabaseClient';

interface NavbarProps {
  onOpenEnrollment: () => void;
  onOpenDemo?: (level?: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenEnrollment, onOpenDemo }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<any>(null);
  const location = useLocation();
  const [logoError, setLogoError] = useState(false);

  // Active hover dropdown for desktop
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile accordion states
  const [mobileExpandedSection, setMobileExpandedSection] = useState<string | null>(null);

  const handleMouseEnter = (menuName: string) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(menuName);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 15);
    window.addEventListener('scroll', handleScroll);

    let authUnsubscribe: (() => void) | null = null;
    try {
      supabase.auth.getSession().then((res: any) => {
        if (res && res.data && res.data.session) {
          setUser(res.data.session.user || null);
        } else {
          setUser(null);
        }
      }).catch((err: any) => {
        console.warn('Supabase session read warning:', err);
      });

      const { data } = supabase.auth.onAuthStateChange((_event: any, session: any) => {
        setUser(session?.user ?? null);
      });
      if (data && data.subscription && typeof data.subscription.unsubscribe === 'function') {
        authUnsubscribe = () => data.subscription.unsubscribe();
      }
    } catch (authInitErr) {
      console.warn('Supabase auth listener setup skipped:', authInitErr);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (authUnsubscribe) {
        try {
          authUnsubscribe();
        } catch {}
      }
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
    setActiveDropdown(null);
    setMobileExpandedSection(null);
  }, [location]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* Top Announcement Bar */}
      <AnnouncementBar />

      {/* Main Navigation Bar */}
      <nav
        className={cn(
          "w-full transition-all duration-300 border-b border-transparent",
          scrolled ? "bg-white/95 backdrop-blur-md border-gray-100 shadow-sm py-2.5" : "bg-white/80 backdrop-blur-sm py-3.5"
        )}
      >
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* Logo */}
          <NavLink to="/" className="flex items-center gap-3.5 group flex-shrink-0">
            <div className="relative w-11 h-11 md:w-12 md:h-12 overflow-hidden rounded-full shadow-md border-2 border-white group-hover:scale-105 transition-transform duration-300">
              {!logoError ? (
                <img
                  src="/logo.png"
                  alt="Fuji Japanese Academy"
                  width="48"
                  height="48"
                  loading="eager"
                  decoding="async"
                  className="w-full h-full object-cover"
                  onError={() => setLogoError(true)}
                />
              ) : (
                <div className="absolute inset-0 bg-fuji-red text-white flex items-center justify-center font-bold text-xs">
                  FJ
                </div>
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-fuji-indigo text-xl md:text-2xl lg:text-[26px] leading-none tracking-tight group-hover:text-fuji-red transition-colors">
                FUJI
              </span>
              <span className="text-[10px] md:text-[11px] font-extrabold text-fuji-slate/75 tracking-[0.22em] uppercase mt-1">
                Japanese Academy
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5">

            {/* Courses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('courses')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/courses"
                className={({ isActive }) =>
                  cn(
                    "px-3.5 py-2 text-sm xl:text-[15px] font-bold rounded-full transition-all duration-200 flex items-center gap-1 hover:text-fuji-red",
                    isActive ? "text-fuji-red font-extrabold bg-fuji-red/10" : "text-fuji-indigo/90"
                  )
                }
              >
                Courses <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </NavLink>

              <AnimatePresence>
                {activeDropdown === 'courses' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 p-3 grid grid-cols-1 gap-1 z-50"
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-fuji-slate/50">
                      JLPT Certification Programs
                    </div>
                    <Link to="/courses/jlpt-n5" className="p-2.5 rounded-xl hover:bg-gray-50 flex items-start gap-2.5 group">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-fuji-red mt-0.5">N5</span>
                      <div>
                        <strong className="text-xs text-fuji-indigo group-hover:text-fuji-red block">JLPT N5 (Beginner Foundation)</strong>
                        <span className="text-[11px] text-fuji-slate/60">Hiragana, Katakana &amp; 103 Kanji</span>
                      </div>
                    </Link>
                    <Link to="/courses/jlpt-n4" className="p-2.5 rounded-xl hover:bg-gray-50 flex items-start gap-2.5 group">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-fuji-red mt-0.5">N4</span>
                      <div>
                        <strong className="text-xs text-fuji-indigo group-hover:text-fuji-red block">JLPT N4 (Elementary)</strong>
                        <span className="text-[11px] text-fuji-slate/60">Conversational &amp; SSW Visa requirement</span>
                      </div>
                    </Link>
                    <Link to="/courses/jlpt-n3" className="p-2.5 rounded-xl hover:bg-gray-50 flex items-start gap-2.5 group">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-fuji-red mt-0.5">N3</span>
                      <div>
                        <strong className="text-xs text-fuji-indigo group-hover:text-fuji-red block">JLPT N3 (Intermediate)</strong>
                        <span className="text-[11px] text-fuji-slate/60">Business bridge &amp; Tokyo IT hiring benchmark</span>
                      </div>
                    </Link>
                    <Link to="/courses/jlpt-n2" className="p-2.5 rounded-xl hover:bg-gray-50 flex items-start gap-2.5 group">
                      <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-red-50 text-fuji-red mt-0.5">N2</span>
                      <div>
                        <strong className="text-xs text-fuji-indigo group-hover:text-fuji-red block">JLPT N2 (Advanced)</strong>
                        <span className="text-[11px] text-fuji-slate/60">Corporate fluency &amp; HSP Visa bonus points</span>
                      </div>
                    </Link>
                    <div className="pt-2 mt-1 border-t border-gray-100 flex flex-col gap-1">
                      <Link to="/courses/spoken-japanese" className="px-3 py-1.5 text-xs text-fuji-indigo hover:text-fuji-red font-medium">
                        • Spoken Japanese (Zero Kanji)
                      </Link>
                      <Link to="/courses/business-japanese" className="px-3 py-1.5 text-xs text-fuji-indigo hover:text-fuji-red font-medium">
                        • Business Japanese &amp; Keigo
                      </Link>
                      <Link to="/courses/japanese-for-it-professionals" className="px-3 py-1.5 text-xs text-fuji-indigo hover:text-fuji-red font-medium">
                        • Japanese for IT Professionals
                      </Link>
                      <Link to="/mock-test" className="px-3 py-1.5 text-xs text-fuji-indigo hover:text-fuji-red font-medium font-bold text-fuji-red flex items-center gap-1">
                        <Award className="w-3 h-3" /> • Free JLPT Mock Test
                      </Link>
                      <Link to="/courses" className="px-3 py-2 text-xs font-bold text-fuji-red hover:underline block text-center bg-red-50/50 rounded-xl mt-1">
                        View All Courses →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* JLPT Hub Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('jlpt')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/jlpt"
                className={({ isActive }) =>
                  cn(
                    "px-3.5 py-2 text-sm xl:text-[15px] font-bold rounded-full transition-all duration-200 flex items-center gap-1 hover:text-fuji-red",
                    isActive ? "text-fuji-red font-extrabold bg-fuji-red/10" : "text-fuji-indigo/90"
                  )
                }
              >
                JLPT Hub <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </NavLink>

              <AnimatePresence>
                {activeDropdown === 'jlpt' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2.5 z-50"
                  >
                    <Link to="/exam-calendar" className="p-2 rounded-xl bg-red-50/80 hover:bg-red-100/80 block mb-1 border border-red-100">
                      <strong className="text-xs text-red-600 block flex items-center justify-between">
                        <span>India Exam Calendar 2026</span>
                        <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.2 rounded font-bold">New</span>
                      </strong>
                      <span className="text-[11px] text-gray-600">JLPT, NAT-TEST &amp; JFT-Basic</span>
                    </Link>
                    <Link to="/jlpt" className="p-2 rounded-xl hover:bg-gray-50 block mb-1">
                      <strong className="text-xs text-fuji-indigo block">JLPT Exam Overview</strong>
                      <span className="text-[11px] text-fuji-slate/60">Exam dates &amp; Indian test centers</span>
                    </Link>
                    <div className="border-t border-gray-100 pt-1 space-y-0.5">
                      <Link to="/jlpt/n5" className="p-2 rounded-xl hover:bg-gray-50 flex items-center justify-between text-xs text-fuji-indigo hover:text-fuji-red">
                        <span>JLPT N5 Syllabus &amp; Marks</span>
                        <span className="text-[10px] text-gray-400">80/180</span>
                      </Link>
                      <Link to="/jlpt/n4" className="p-2 rounded-xl hover:bg-gray-50 flex items-center justify-between text-xs text-fuji-indigo hover:text-fuji-red">
                        <span>JLPT N4 Exam Breakdown</span>
                        <span className="text-[10px] text-gray-400">90/180</span>
                      </Link>
                      <Link to="/jlpt/n3" className="p-2 rounded-xl hover:bg-gray-50 flex items-center justify-between text-xs text-fuji-indigo hover:text-fuji-red">
                        <span>JLPT N3 Career Guide</span>
                        <span className="text-[10px] text-gray-400">95/180</span>
                      </Link>
                      <Link to="/jlpt/n2" className="p-2 rounded-xl hover:bg-gray-50 flex items-center justify-between text-xs text-fuji-indigo hover:text-fuji-red">
                        <span>JLPT N2 Corporate Benchmark</span>
                        <span className="text-[10px] text-gray-400">90/180</span>
                      </Link>
                      <Link to="/jlpt/n1" className="p-2 rounded-xl hover:bg-gray-50 flex items-center justify-between text-xs text-fuji-indigo hover:text-fuji-red">
                        <span>JLPT N1 Mastery Guide</span>
                        <span className="text-[10px] text-gray-400">100/180</span>
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Learn Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('learn')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/learn"
                className={({ isActive }) =>
                  cn(
                    "px-3.5 py-2 text-sm xl:text-[15px] font-bold rounded-full transition-all duration-200 flex items-center gap-1 hover:text-fuji-red",
                    isActive ? "text-fuji-red font-extrabold bg-fuji-red/10" : "text-fuji-indigo/90"
                  )
                }
              >
                Learn <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </NavLink>

              <AnimatePresence>
                {activeDropdown === 'learn' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2.5 z-50"
                  >
                    <Link to="/learn/hiragana-katakana" className="p-2 rounded-xl hover:bg-gray-50 block">
                      <strong className="text-xs text-fuji-indigo block">Hiragana &amp; Katakana</strong>
                      <span className="text-[11px] text-fuji-slate/60">Interactive soundboard &amp; charts</span>
                    </Link>
                    <Link to="/learn/vocabulary" className="p-2 rounded-xl hover:bg-gray-50 block">
                      <strong className="text-xs text-fuji-indigo block">Vocabulary Bank</strong>
                      <span className="text-[11px] text-fuji-slate/60">High-frequency words by category</span>
                    </Link>
                    <Link to="/learn/grammar" className="p-2 rounded-xl hover:bg-gray-50 block">
                      <strong className="text-xs text-fuji-indigo block">Grammar &amp; Particles</strong>
                      <span className="text-[11px] text-fuji-slate/60">SOV rules &amp; particle cheat sheets</span>
                    </Link>
                    <Link to="/learn/kanji" className="p-2 rounded-xl hover:bg-gray-50 block">
                      <strong className="text-xs text-fuji-indigo block">Kanji Foundations</strong>
                      <span className="text-[11px] text-fuji-slate/60">Radicals, stroke orders &amp; readings</span>
                    </Link>
                    <div className="pt-2 mt-1 border-t border-gray-100">
                      <Link to="/courses/free" className="p-2 rounded-xl hover:bg-emerald-50 text-emerald-700 font-semibold block text-xs">
                        ★ Free PDF Worksheets &amp; Downloads
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Practice Platform */}
            <NavLink
              to="/practice"
              className={({ isActive }) =>
                cn(
                  "px-3.5 py-2 text-sm xl:text-[15px] font-bold rounded-full transition-all duration-200 hover:text-fuji-red",
                  isActive ? "text-fuji-red font-extrabold bg-fuji-red/10" : "text-fuji-indigo/90"
                )
              }
            >
              Practice
            </NavLink>

            {/* Career in Japan */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('career')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/career"
                className={({ isActive }) =>
                  cn(
                    "px-3.5 py-2 text-sm xl:text-[15px] font-bold rounded-full transition-all duration-200 flex items-center gap-1 hover:text-fuji-red",
                    isActive ? "text-fuji-red font-extrabold bg-fuji-red/10" : "text-fuji-indigo/90"
                  )
                }
              >
                Career <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </NavLink>

              <AnimatePresence>
                {activeDropdown === 'career' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-xl border border-gray-100 p-2.5 z-50"
                  >
                    <Link to="/careers/apply" className="p-2 rounded-xl bg-gradient-to-r from-red-600 to-rose-600 text-white hover:from-red-700 hover:to-rose-700 block mb-1.5 shadow-sm">
                      <div className="flex items-center justify-between">
                        <strong className="text-xs text-white block">Apply for Jobs — Master Catalogue</strong>
                        <span className="text-[9px] bg-white text-red-600 px-1.5 py-0.5 rounded-full font-bold">100+ ROLES</span>
                      </div>
                      <span className="text-[10px] text-white/90">Candidate Placement &amp; Sourcing (2026–2036)</span>
                    </Link>
                    <Link to="/careers" className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100/80 block mb-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-xs text-fuji-red block">Careers &amp; Job Openings</strong>
                        <span className="text-[10px] bg-fuji-red text-white px-1.5 py-0.5 rounded-full font-bold">HIRING</span>
                      </div>
                      <span className="text-[11px] text-fuji-slate/70">Executive Sales (Manesar) &amp; Sensei</span>
                    </Link>
                    <Link to="/college-partnerships" className="p-2 rounded-xl bg-slate-50 hover:bg-slate-100 block mb-1">
                      <strong className="text-xs text-fuji-indigo block">College MoUs &amp; Placements</strong>
                      <span className="text-[11px] text-fuji-slate/60">Campus Japanese training programs</span>
                    </Link>
                    <Link to="/career/japanese-for-it" className="p-2 rounded-xl hover:bg-gray-50 block">
                      <strong className="text-xs text-fuji-indigo block">Software Jobs in Japan</strong>
                      <span className="text-[11px] text-fuji-slate/60">Salaries, stacks &amp; N3/N2 benchmark</span>
                    </Link>
                    <Link to="/career/working-in-japan" className="p-2 rounded-xl hover:bg-gray-50 block">
                      <strong className="text-xs text-fuji-indigo block">Work Visas &amp; Life in Japan</strong>
                      <span className="text-[11px] text-fuji-slate/60">SSW, Engineer visa &amp; living costs</span>
                    </Link>
                    <Link to="/career/japanese-jobs" className="p-2 rounded-xl hover:bg-gray-50 block">
                      <strong className="text-xs text-fuji-indigo block">Top Hiring Companies</strong>
                      <span className="text-[11px] text-fuji-slate/60">Tokyo tech startups &amp; job portals</span>
                    </Link>
                    <Link to="/career/japanese-job-interview" className="p-2 rounded-xl hover:bg-gray-50 block">
                      <strong className="text-xs text-fuji-indigo block">Interview &amp; Resume Guide</strong>
                      <span className="text-[11px] text-fuji-slate/60">Rirekisho &amp; Jikoshoukai scripts</span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Locations */}
            <div
              className="relative"
              onMouseEnter={() => handleMouseEnter('locations')}
              onMouseLeave={handleMouseLeave}
            >
              <NavLink
                to="/locations/bangalore"
                className={({ isActive }) =>
                  cn(
                    "px-3.5 py-2 text-sm xl:text-[15px] font-bold rounded-full transition-all duration-200 flex items-center gap-1 hover:text-fuji-red",
                    isActive ? "text-fuji-red font-extrabold bg-fuji-red/10" : "text-fuji-indigo/90"
                  )
                }
              >
                Locations <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </NavLink>

              <AnimatePresence>
                {activeDropdown === 'locations' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 w-60 bg-white rounded-2xl shadow-xl border border-gray-100 p-2 z-50"
                  >
                    <Link to="/locations/bangalore" className="p-2 rounded-xl hover:bg-gray-50 block">
                      <strong className="text-xs text-fuji-indigo block">Bengaluru (All Areas)</strong>
                      <span className="text-[11px] text-fuji-slate/60">Live interactive online classes</span>
                    </Link>
                    <Link to="/locations/electronic-city" className="p-2 rounded-xl hover:bg-gray-50 block">
                      <strong className="text-xs text-fuji-indigo block">Electronic City Campus</strong>
                      <span className="text-[11px] text-fuji-slate/60">Physical classroom (Phase 1)</span>
                    </Link>
                    <Link to="/locations" className="p-2 rounded-xl hover:bg-red-50 text-red-600 font-bold block text-xs">
                      Pan-India City Directory &rarr;
                    </Link>
                    <Link to="/verify-certificate" className="p-2 rounded-xl hover:bg-emerald-50 text-emerald-700 font-semibold block text-xs">
                      Verify Certificate ID
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Blog & Contact */}
            <NavLink
              to="/blog"
              className={({ isActive }) =>
                cn(
                  "px-3.5 py-2 text-sm xl:text-[15px] font-bold rounded-full transition-all duration-200 hover:text-fuji-red",
                  isActive ? "text-fuji-red font-extrabold bg-fuji-red/10" : "text-fuji-indigo/90"
                )
              }
            >
              Blog
            </NavLink>

            <NavLink
              to="/contact"
              className={({ isActive }) =>
                cn(
                  "px-3.5 py-2 text-sm xl:text-[15px] font-bold rounded-full transition-all duration-200 hover:text-fuji-red",
                  isActive ? "text-fuji-red font-extrabold bg-fuji-red/10" : "text-fuji-indigo/90"
                )
              }
            >
              Contact
            </NavLink>

            {/* Pay Fee NavLink */}
            <NavLink
              to="/payment"
              className={({ isActive }) =>
                cn(
                  "px-3.5 py-1.5 text-xs xl:text-sm font-extrabold rounded-full transition-all duration-200 flex items-center gap-1.5 border border-emerald-500/30 text-emerald-700 bg-emerald-50/70 hover:bg-emerald-100 hover:text-emerald-800 shadow-xs",
                  isActive ? "bg-emerald-600 text-white border-emerald-600 font-extrabold hover:text-white" : ""
                )
              }
            >
              <CreditCard className="w-3.5 h-3.5" />
              <span>Pay Fee</span>
            </NavLink>
          </div>

          {/* Right Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                navigate('/courses');
              }}
              aria-label="Search courses"
              className="p-2 text-fuji-slate/70 hover:text-fuji-red hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              title="Search Courses"
            >
              <Search className="w-4 h-4" />
            </button>

            {user ? (
              <Link
                to="/dashboard"
                className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-fuji-indigo hover:text-fuji-red transition-colors"
                title="Go to Dashboard"
              >
                <div className="w-7 h-7 rounded-full bg-fuji-red/10 flex items-center justify-center text-fuji-red">
                  <User className="w-3.5 h-3.5" />
                </div>
                <span className="max-w-[80px] truncate">{user.user_metadata?.full_name || 'Dashboard'}</span>
              </Link>
            ) : (
              <Link
                to="/login"
                className="text-xs font-medium text-fuji-slate hover:text-fuji-red transition-colors px-2.5 py-1.5"
              >
                Log In
              </Link>
            )}

            {user && user.email === ADMIN_EMAIL && (
              <Link
                to="/admin/dashboard"
                className="text-xs font-medium text-fuji-indigo hover:text-fuji-red transition-colors px-2"
              >
                Admin
              </Link>
            )}

            <button
              type="button"
              onClick={() => {
                if (onOpenDemo) onOpenDemo();
                else onOpenEnrollment();
              }}
              className="px-5 py-2.5 bg-fuji-red hover:bg-fuji-darkRed text-white rounded-full text-xs font-bold transition-all shadow-md shadow-fuji-red/20 flex items-center gap-1.5 active:scale-95 group cursor-pointer"
            >
              <span>Book Free Demo</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 text-fuji-slate hover:bg-gray-100 rounded-full transition-colors z-50 relative cursor-pointer"
          >
            {isOpen ? <X className="w-6 h-6 text-fuji-indigo" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: '100vh' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 lg:hidden overflow-y-auto pb-24"
          >
            <div className="flex flex-col space-y-2">
              <NavLink to="/" className="text-xl font-display font-bold py-2 text-fuji-indigo">
                Home
              </NavLink>

              {/* Mobile Accordion: Courses */}
              <div className="border-b border-gray-100 py-2">
                <button
                  type="button"
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'courses' ? null : 'courses')}
                  className="w-full flex items-center justify-between text-xl font-display font-bold text-fuji-slate cursor-pointer"
                >
                  <span>Courses</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpandedSection === 'courses' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpandedSection === 'courses' && (
                  <div className="pl-4 pt-2 space-y-2 text-sm text-fuji-slate/80">
                    <Link to="/courses/jlpt-n5" className="block py-1">JLPT N5 (Beginner)</Link>
                    <Link to="/courses/jlpt-n4" className="block py-1">JLPT N4 (Elementary)</Link>
                    <Link to="/courses/jlpt-n3" className="block py-1">JLPT N3 (Intermediate)</Link>
                    <Link to="/courses/jlpt-n2" className="block py-1">JLPT N2 (Advanced)</Link>
                    <Link to="/courses/spoken-japanese" className="block py-1">Spoken Japanese</Link>
                    <Link to="/courses/business-japanese" className="block py-1">Business Japanese &amp; Keigo</Link>
                    <Link to="/courses/japanese-for-it-professionals" className="block py-1">Japanese for IT</Link>
                    <Link to="/courses" className="block py-1 font-bold text-fuji-red">View All Courses →</Link>
                  </div>
                )}
              </div>

              {/* Mobile Accordion: JLPT Hub */}
              <div className="border-b border-gray-100 py-2">
                <button
                  type="button"
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'jlpt' ? null : 'jlpt')}
                  className="w-full flex items-center justify-between text-xl font-display font-bold text-fuji-slate cursor-pointer"
                >
                  <span>JLPT Hub</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpandedSection === 'jlpt' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpandedSection === 'jlpt' && (
                  <div className="pl-4 pt-2 space-y-2 text-sm text-fuji-slate/80">
                    <Link to="/jlpt" className="block py-1 font-bold text-fuji-red">JLPT Hub Overview</Link>
                    <Link to="/jlpt/n5" className="block py-1">JLPT N5 Syllabus &amp; Marks</Link>
                    <Link to="/jlpt/n4" className="block py-1">JLPT N4 Exam Breakdown</Link>
                    <Link to="/jlpt/n3" className="block py-1">JLPT N3 IT Benchmark</Link>
                    <Link to="/jlpt/n2" className="block py-1">JLPT N2 Corporate Benchmark</Link>
                    <Link to="/jlpt/n1" className="block py-1">JLPT N1 Mastery</Link>
                  </div>
                )}
              </div>

              {/* Mobile Accordion: Learn */}
              <div className="border-b border-gray-100 py-2">
                <button
                  type="button"
                  onClick={() => setMobileExpandedSection(mobileExpandedSection === 'learn' ? null : 'learn')}
                  className="w-full flex items-center justify-between text-xl font-display font-bold text-fuji-slate cursor-pointer"
                >
                  <span>Learn Japanese</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpandedSection === 'learn' ? 'rotate-180' : ''}`} />
                </button>
                {mobileExpandedSection === 'learn' && (
                  <div className="pl-4 pt-2 space-y-2 text-sm text-fuji-slate/80">
                    <Link to="/learn" className="block py-1 font-bold text-fuji-red">Learning Hub Overview</Link>
                    <Link to="/learn/hiragana-katakana" className="block py-1">Hiragana &amp; Katakana Chart</Link>
                    <Link to="/learn/vocabulary" className="block py-1">N5 Vocabulary Bank</Link>
                    <Link to="/learn/grammar" className="block py-1">Japanese Particles Guide</Link>
                    <Link to="/learn/kanji" className="block py-1">Foundation Kanji</Link>
                    <Link to="/courses/free" className="block py-1 text-emerald-600 font-semibold">Free Study Worksheets</Link>
                  </div>
                )}
              </div>

              {/* Direct links */}
              <NavLink to="/practice" className="text-xl font-display font-bold py-2 border-b border-gray-100 text-fuji-slate">
                Practice Quizzes
              </NavLink>
              <NavLink to="/career" className="text-xl font-display font-bold py-2 border-b border-gray-100 text-fuji-slate">
                Career in Japan
              </NavLink>
              <NavLink to="/careers/apply" className="text-xl font-display font-bold py-2 border-b border-gray-100 text-red-600 flex items-center justify-between">
                <span>Apply for Jobs (Master Catalogue)</span>
                <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full font-bold">100+ ROLES</span>
              </NavLink>
              <NavLink to="/careers" className="text-xl font-display font-bold py-2 border-b border-gray-100 text-fuji-red flex items-center justify-between">
                <span>Careers &amp; Openings</span>
                <span className="text-xs bg-fuji-red text-white px-2 py-0.5 rounded-full font-bold">HIRING</span>
              </NavLink>
              <NavLink to="/locations/bangalore" className="text-xl font-display font-bold py-2 border-b border-gray-100 text-fuji-slate">
                Bengaluru Campus
              </NavLink>
              <NavLink to="/blog" className="text-xl font-display font-bold py-2 border-b border-gray-100 text-fuji-slate">
                Blog
              </NavLink>
              <NavLink to="/about" className="text-xl font-display font-bold py-2 border-b border-gray-100 text-fuji-slate">
                About Us
              </NavLink>
              <NavLink to="/contact" className="text-xl font-display font-bold py-2 border-b border-gray-100 text-fuji-slate">
                Contact
              </NavLink>

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to="/payment"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white text-center font-bold rounded-xl shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Pay Course Fee Online</span>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsOpen(false);
                    if (onOpenDemo) onOpenDemo();
                    else onOpenEnrollment();
                  }}
                  className="w-full py-3.5 bg-fuji-red text-white text-center font-bold rounded-xl shadow-lg text-sm cursor-pointer"
                >
                  Book Free Demo Class
                </button>
                <div className="flex items-center justify-between pt-2">
                  {user ? (
                    <Link to="/dashboard" className="text-sm font-semibold text-fuji-indigo">
                      Go to Dashboard →
                    </Link>
                  ) : (
                    <Link to="/login" className="text-sm font-semibold text-fuji-slate">
                      Student Log In →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
