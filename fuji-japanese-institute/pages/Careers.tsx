import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { OPEN_POSITIONS } from '../constants';
import { 
  Briefcase, GraduationCap, Heart, Rocket, MapPin, Send, ArrowRight, 
  UserPlus, CheckCircle2, Clock, IndianRupee, Sparkles, Mail, Copy, Check 
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { supabase } from '../src/lib/supabaseClient';
import { JobPost } from '../types';
import { getJobApplyMailto, ADMIN_CAREERS_EMAIL, EXECUTIVE_SALES_JOB } from '../data/jobsData';
import { cn } from '../lib/utils';

const Careers: React.FC = () => {
  // Use mock data as initial state for immediate render, then update from DB
  const [positions, setPositions] = useState<JobPost[]>(OPEN_POSITIONS.map(p => ({ ...p, active: true } as JobPost)));
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(ADMIN_CAREERS_EMAIL);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  useEffect(() => {
    // Smooth scroll to target hash on initial load or lazy mount
    if (typeof window !== 'undefined' && window.location.hash) {
      const el = document.querySelector(window.location.hash);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    }
  }, []);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data, error } = await supabase.from('jobs').select('*').eq('active', true);
        if (error) {
          if (import.meta.env.DEV) console.warn("Supabase fetch error, using mock data", error);
          return;
        }
        if (data && data.length > 0) {
          // Always ensure authoritative EXECUTIVE_SALES_JOB is pinned at the top
          const otherJobs = data.filter(j => j.id !== 'executive-sales-manesar');
          setPositions([EXECUTIVE_SALES_JOB, ...otherJobs]);
        }
      } catch (err) {
        if (import.meta.env.DEV) console.warn("Error fetching jobs", err);
      }
    };
    fetchJobs();
  }, []);

  return (
    <div className="pt-24 min-h-screen bg-fuji-light">
      <Helmet>
        <title>Careers & Job Openings: Executive Sales & Japanese Trainers | Fuji Japanese Academy</title>
        <meta 
          name="description" 
          content="Active job opening: Executive Sales / Business Development in Manesar, Haryana (6-10 LPA CTC, JLPT N2/N1). Join Fuji Japanese Academy as a sensei, trainer, or sales executive." 
        />
        <meta 
          name="keywords" 
          content="Executive Sales Business Development Manesar, Japanese bilingual sales jobs Haryana, JLPT N2 N1 jobs, Japanese teacher jobs Bengaluru, Fuji Japanese Academy careers" 
        />
        <link rel="canonical" href="https://fujijapaneseacademy.com/careers" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "JobPosting",
                "title": "Executive Sales / Business Development",
                "description": "<p>We are looking for a dynamic and result-oriented Japan Sales professional to develop and manage business opportunities with Japanese customers and clients. The role will involve client communication, business development, relationship management, and coordination with internal teams.</p><h3>Key Responsibilities:</h3><ul><li>Develop new business opportunities with Japanese customers and companies.</li><li>Build and maintain strong relationships with existing Japanese clients.</li><li>Understand customer requirements and coordinate with internal teams for suitable solutions.</li><li>Handle sales discussions, presentations, quotations, and negotiations.</li><li>Coordinate with Japanese stakeholders and support smooth business communication.</li><li>Identify market opportunities and contribute to sales growth.</li><li>Travel for client meetings and business discussions as required.</li><li>Maintain regular sales reports and track business development activities.</li></ul><h3>Eligibility & Requirements:</h3><ul><li>MBA in Sales, Marketing, International Business, or a related field.</li><li>JLPT N2 or N1 certification is mandatory.</li><li>Strong Japanese and English communication skills.</li><li>Good interpersonal, presentation, and negotiation skills.</li><li>Candidates with B2B sales/business development experience will be preferred.</li><li>Exposure to Japanese companies or Japanese business culture will be an advantage.</li><li>Freshers with strong Japanese proficiency and an MBA may also be considered.</li></ul>",
                "identifier": {
                  "@type": "PropertyValue",
                  "name": "Fuji Japanese Academy",
                  "value": "executive-sales-manesar"
                },
                "datePosted": "2026-10-24",
                "validThrough": "2026-12-31",
                "employmentType": "FULL_TIME",
                "hiringOrganization": {
                  "@type": "Organization",
                  "name": "Fuji Japanese Academy",
                  "sameAs": "https://fujijapaneseacademy.com",
                  "logo": "https://fujijapaneseacademy.com/logo.png"
                },
                "jobLocation": {
                  "@type": "Place",
                  "address": {
                    "@type": "PostalAddress",
                    "addressLocality": "Manesar",
                    "addressRegion": "Haryana",
                    "addressCountry": "IN"
                  }
                },
                "baseSalary": {
                  "@type": "MonetaryAmount",
                  "currency": "INR",
                  "value": {
                    "@type": "QuantitativeValue",
                    "minValue": 600000,
                    "maxValue": 1000000,
                    "unitText": "YEAR"
                  }
                },
                "qualifications": "MBA in Sales, Marketing, International Business; JLPT N2 or N1 certification mandatory; Japanese and English fluency",
                "applicantLocationRequirements": {
                  "@type": "Country",
                  "name": "India"
                },
                "directApply": true
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="bg-fuji-indigo text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-fuji-red/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-fuji-red text-sm font-bold border border-white/10 mb-8 uppercase tracking-widest hover:bg-white/20 transition-colors cursor-default">
              <UserPlus className="w-4 h-4" /> We Are Hiring
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-bold text-white mb-6 tracking-tight leading-tight">
              Shape the Future of <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuji-red to-orange-500">Language &amp; Global Business</span>
            </h1>
            <p className="text-white/70 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
              At Fuji Japanese Academy, we build bridges between Indian talent and Japanese corporate excellence. 
              Explore active openings in Business Development, Corporate Sales, and Japanese language pedagogy.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <a 
                href="#openings" 
                className="px-8 py-3.5 bg-fuji-red text-white font-bold rounded-xl shadow-lg hover:bg-rose-600 transition-all text-sm"
              >
                View Open Positions
              </a>
              <a 
                href="#executive-sales-manesar" 
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl border border-white/15 transition-all text-sm backdrop-blur-sm"
              >
                🔥 Executive Sales (Manesar, Haryana)
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-fuji-indigo mb-6">Why Build Your Career With Us?</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-fuji-red to-transparent mx-auto rounded-full opacity-50"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Rocket,
              title: "Career Elevation",
              desc: "Clear progression paths for sales executives, corporate liaisons, and academic trainers."
            },
            {
              icon: Heart,
              title: "Cultural Immersion",
              desc: "Collaborate closely with Japanese clients, native trainers, and multinational enterprises daily."
            },
            {
              icon: GraduationCap,
              title: "Continuous Upskilling",
              desc: "Access proprietary JLPT preparation masterclasses and cross-border negotiation workshops."
            },
            {
              icon: Briefcase,
              title: "Competitive Packages",
              desc: "Fixed industry-norm compensation with generous performance rewards and travel opportunities."
            }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-fuji-indigo/5 hover:border-fuji-red/30 hover:shadow-premium transition-all duration-300 text-center group"
            >
              <div className="w-16 h-16 bg-fuji-light text-fuji-red rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-fuji-red group-hover:text-white transition-all duration-300 transform group-hover:-rotate-3">
                <benefit.icon className="w-8 h-8" />
              </div>
              <h3 className="font-display font-bold text-xl text-fuji-indigo mb-3 group-hover:text-fuji-red transition-colors">{benefit.title}</h3>
              <p className="text-sm text-fuji-slate/70 leading-relaxed max-w-xs mx-auto">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="openings" className="py-24 bg-white relative scroll-mt-20">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-fuji-indigo/10 to-transparent"></div>

        <div className="container mx-auto px-4 md:px-6">
          <Breadcrumbs items={[{ label: 'Careers & Job Openings', path: '/careers' }]} className="mb-8" />
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <span className="text-fuji-red font-bold tracking-widest uppercase text-sm mb-2 block">We are hiring</span>
              <h2 className="text-4xl font-display font-bold text-fuji-indigo">Current Job Openings</h2>
              <p className="text-fuji-slate/70 text-sm mt-2 max-w-xl">
                Review available positions below. Apply directly with your resume and certification credentials via email.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 self-start md:self-auto">
              <Link
                to="/careers/apply"
                className="px-5 py-2.5 bg-fuji-red hover:bg-rose-600 text-white rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 transition-all"
              >
                <Briefcase className="w-3.5 h-3.5" />
                <span>100+ Japanese Jobs Master Catalogue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <div className="px-5 py-2.5 bg-fuji-light text-fuji-indigo rounded-full text-xs font-bold border border-fuji-indigo/10 shadow-sm flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500 animate-pulse"></span>
                {positions.length} Open Positions
              </div>
            </div>
          </div>

          <div className="grid gap-8">
            {positions.map((job) => {
              const applyMailto = getJobApplyMailto(job.title, job.location);

              return (
                <motion.div
                  key={job.id}
                  id={job.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  className={cn(
                    "group bg-fuji-light p-6 md:p-10 rounded-[2rem] border transition-all duration-300 flex flex-col gap-6 hover:shadow-xl scroll-mt-28",
                    job.featured
                      ? "border-fuji-red/30 bg-gradient-to-br from-white via-rose-50/20 to-amber-50/20 ring-1 ring-fuji-red/20 shadow-md"
                      : "border-transparent hover:border-fuji-red/20 hover:bg-white"
                  )}
                >
                  {/* Top Meta Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="px-3 py-1 bg-white border border-fuji-red/20 text-fuji-red text-xs font-bold uppercase rounded-lg tracking-wider shadow-xs flex items-center gap-1.5">
                        <Briefcase className="w-3.5 h-3.5" />
                        {job.department}
                      </span>
                      <span className="px-3 py-1 bg-fuji-indigo/10 text-fuji-indigo text-xs font-bold uppercase rounded-lg tracking-wider flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {job.type}
                      </span>
                      {job.salary && (
                        <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-lg tracking-wide border border-emerald-200 flex items-center gap-1">
                          <IndianRupee className="w-3.5 h-3.5" />
                          {job.salary}
                        </span>
                      )}
                    </div>
                    {job.featured && (
                      <span className="px-3 py-1 bg-gradient-to-r from-red-600 to-rose-600 text-white text-[11px] font-extrabold uppercase rounded-full shadow-sm tracking-wide flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5" /> Urgently Hiring
                      </span>
                    )}
                  </div>

                  {/* Role Title with Apply Button Beside It */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-b border-fuji-indigo/5 pb-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-2xl md:text-3xl font-display font-bold text-fuji-indigo group-hover:text-fuji-red transition-colors">
                          {job.title}
                        </h3>
                        {/* Mobile inline Apply button directly beside title */}
                        <a
                          href={applyMailto}
                          className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 bg-fuji-red hover:bg-rose-600 text-white font-bold text-xs rounded-xl shadow-xs active:scale-95 transition-all"
                          title={`Apply directly via email for ${job.title}`}
                        >
                          Apply <Send className="w-3.5 h-3.5" />
                        </a>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-fuji-slate/70 font-medium mt-2">
                        <div className="flex items-center gap-1.5 text-fuji-red font-semibold">
                          <MapPin className="w-4 h-4" />
                          {job.location}
                        </div>
                        {job.salary && (
                          <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                            <span>CTC: {job.salary}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Desktop Apply Button Beside Role Title */}
                    <div className="hidden sm:flex shrink-0 items-center gap-2">
                      <a
                        href={applyMailto}
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-fuji-red hover:bg-rose-600 text-white font-bold text-sm rounded-xl transition-all shadow-md hover:shadow-fuji-red/30 active:scale-95 duration-200"
                        title={`Apply directly via email for ${job.title}`}
                      >
                        Apply Now <Send className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Compensation Note */}
                  {job.salaryNote && (
                    <div className="p-4 bg-amber-50/90 border border-amber-200/80 rounded-2xl text-xs md:text-sm text-amber-950 flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                      <span className="font-bold text-amber-900 shrink-0 uppercase tracking-wider text-[11px]">Salary &amp; CTC:</span>
                      <span className="text-amber-900/90">{job.salaryNote}</span>
                    </div>
                  )}

                  {/* About the Role */}
                  {job.aboutRole ? (
                    <div>
                      <h4 className="text-xs font-bold text-fuji-slate/50 uppercase mb-2 tracking-widest">
                        About the Role:
                      </h4>
                      <p className="text-fuji-slate/85 text-sm md:text-base leading-relaxed">
                        {job.aboutRole}
                      </p>
                    </div>
                  ) : (
                    <p className="text-fuji-slate/80 text-base max-w-3xl leading-relaxed">{job.description}</p>
                  )}

                  {/* Key Responsibilities */}
                  {job.responsibilities && job.responsibilities.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-bold text-fuji-slate/50 uppercase mb-3 tracking-widest">
                        Key Responsibilities:
                      </h4>
                      <ul className="grid sm:grid-cols-2 gap-2.5">
                        {job.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-fuji-slate/80 bg-white/90 p-3 rounded-xl border border-fuji-indigo/5 shadow-2xs">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Eligibility & Requirements */}
                  <div className="pt-2">
                    <h4 className="text-xs font-bold text-fuji-slate/50 uppercase mb-3 tracking-widest">
                      Eligibility &amp; Requirements:
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2.5">
                      {(job.eligibility || job.requirements || []).map((req, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs md:text-sm text-fuji-slate/80 bg-white/90 p-3 rounded-xl border border-fuji-indigo/5 shadow-2xs">
                          <GraduationCap className="w-4 h-4 text-fuji-indigo shrink-0 mt-0.5" />
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bottom Apply Card Strip */}
                  <div className="pt-4 border-t border-fuji-indigo/10 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/80 p-5 rounded-2xl">
                    <div className="text-xs md:text-sm text-fuji-slate/75 flex items-center gap-2.5">
                      <Mail className="w-5 h-5 text-fuji-red shrink-0" />
                      <div>
                        <span className="font-semibold text-fuji-indigo block">Ready to Apply?</span>
                        <span className="text-xs text-fuji-slate/60">
                          Email your resume directly to <strong className="text-fuji-indigo">fujijapaneseacademy@gmail.com</strong>
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="px-4 py-3 bg-fuji-indigo/5 hover:bg-fuji-indigo/10 text-fuji-indigo font-bold text-xs rounded-xl border border-fuji-indigo/10 transition-all flex items-center justify-center gap-1.5 flex-1 md:flex-none cursor-pointer"
                        title="Copy recruitment email address to clipboard"
                      >
                        {copiedEmail ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                        {copiedEmail ? 'Email Copied!' : 'Copy Email'}
                      </button>
                      <a
                        href={applyMailto}
                        className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-fuji-indigo text-white font-bold text-sm rounded-xl hover:bg-fuji-red transition-all shadow-md hover:shadow-fuji-red/30 flex-1 md:flex-none active:scale-95 duration-200"
                      >
                        Apply for this Position <Send className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="bg-fuji-indigo rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gradient-to-br from-fuji-red/20 to-transparent rounded-full blur-3xl translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>

          <div className="relative z-10 text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-6">Our Hiring Process</h2>
            <p className="text-white/60 max-w-md mx-auto">Straightforward, transparent, and designed for professional bilateral success.</p>
          </div>

          <div className="relative z-10 grid md:grid-cols-3 gap-16 text-center">
            {[
              { step: "01", title: "Submit Application", desc: "Send your resume and JLPT scorecard directly via our email apply button." },
              { step: "02", title: "Dialogue & Evaluation", desc: "A 30-min conversation regarding your Japanese language proficiency and experience." },
              { step: "03", title: "Final Discussion & Offer", desc: "Role presentation, client interaction scenario or demo lesson, and offer rollout." }
            ].map((s, idx) => (
              <div key={idx} className="relative group">
                <div className="text-8xl font-black text-white/5 absolute -top-12 left-1/2 -translate-x-1/2 select-none group-hover:text-fuji-red/10 transition-colors duration-500 font-display">
                  {s.step}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4 relative z-10 font-display">{s.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs mx-auto relative z-10">{s.desc}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-8 -translate-y-1/2 text-white/20">
                    <ArrowRight className="w-8 h-8" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-24 pt-12 border-t border-white/10 text-center relative z-10">
            <p className="text-white/50 text-sm mb-6">Looking for custom corporate training or have general queries?</p>
            <a 
              href="mailto:fujijapaneseacademy@gmail.com?subject=General%20Career%20Inquiry%20-%20Fuji%20Japanese%20Academy" 
              className="inline-block text-white font-bold border-b-2 border-fuji-red pb-1 hover:text-fuji-red transition-colors hover:pb-2 duration-300"
            >
              Send us a general application &rarr;
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
