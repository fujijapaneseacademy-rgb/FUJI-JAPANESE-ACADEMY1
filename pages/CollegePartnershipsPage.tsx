import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  GraduationCap, Building2, Award, Users, CheckCircle2,
  ArrowRight, Download, Send, ShieldCheck, Sparkles, Globe, FileCheck, Stethoscope
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import CampusPartnershipShowcase from '../components/CampusPartnershipShowcase';
import { submitToGoogleSheet } from '../services/formService';

export const CollegePartnershipsPage: React.FC = () => {
  const [formData, setFormData] = useState({
    institutionName: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    cityState: '',
    studentCount: '50-100',
    preferredModel: 'Campus Credit Course / Add-on Program',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitToGoogleSheet({
        formType: 'Corporate',
        name: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        companyName: formData.institutionName,
        teamSize: formData.studentCount,
        course: 'Institutional College Partnership MoU',
        message: `Designation: ${formData.designation} | City: ${formData.cityState} | Model: ${formData.preferredModel} | Notes: ${formData.message}`
      });
    } catch (err) {
      console.warn('Institutional form fallback:', err);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  const pageTitle = 'College & University Institutional MoUs — Campus Japanese & Japan Placements | Fuji Japanese Academy';
  const metaDescription = 'Partner with Fuji Japanese Academy to establish on-campus Japanese Language Training & Tokyo Placement Cells for Nursing, Engineering (B.Tech), BCA, MCA, and Degree colleges across India. Highlights from T. John College of Nursing, T. John PU College, and V.E.T. First Grade College.';

  return (
    <div className="pt-24 min-h-screen bg-slate-50 text-slate-800">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href="https://fujijapaneseacademy.com/college-partnerships" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 py-3">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: 'College Partnerships', path: '/college-partnerships' }
          ]}
        />
      </div>

      {/* Hero */}
      <header className="py-16 bg-gradient-to-br from-slate-950 via-[#181335] to-slate-950 text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 text-red-300 text-xs font-bold uppercase tracking-wider mb-4 border border-red-500/30">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Academic Bilateral Initiative &bull; India &bull; Japan</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-6">
            Institutional MoUs &amp; On-Campus Japanese Placement Cells
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-300 font-light leading-relaxed max-w-3xl mx-auto mb-8">
            Empower your nursing, engineering, and degree students with accredited JLPT coaching, clinical hospital Japanese, native Tokyo senseis, and direct corporate recruitment pipelines to Japan&apos;s leading tech enterprises and healthcare networks.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#mou-form"
              className="px-8 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm shadow-xl shadow-red-600/30 transition-all active:scale-95 flex items-center gap-2"
            >
              <span>Initiate Institutional MoU Discussion</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Featured Institutional Partners Bar */}
      <section className="bg-white border-b border-slate-200 py-6">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>Campus Collaborations &amp; Institutional MoUs</span>
            </div>
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-rose-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">TJCN</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">T. John College of Nursing</h4>
                  <p className="text-[11px] text-slate-500">Medical &amp; Hospital Japanese &bull; BLR</p>
                </div>
              </div>
              <div className="h-6 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">TJPU</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">T. John PU College</h4>
                  <p className="text-[11px] text-slate-500">Pre-University Foundation &bull; BLR</p>
                </div>
              </div>
              <div className="h-6 w-px bg-slate-200 hidden sm:block" />
              <div className="flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold text-xs flex items-center justify-center shadow-sm">VET</span>
                <div>
                  <h4 className="text-xs font-bold text-slate-800">V.E.T. First Grade College</h4>
                  <p className="text-[11px] text-slate-500">BCA, B.Com Tokyo Placements &bull; BLR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Campus Seminar & Orientation Spotlight: T. John College of Nursing, T. John PU College & V.E.T. First Grade College */}
      <section className="py-16 md:py-20 bg-slate-100/70 border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-6xl">
          <CampusPartnershipShowcase
            variant="full"
            showHeading={true}
            defaultCampusId="t-john-nursing"
          />
        </div>
      </section>

      {/* 4 Pillars Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
              Collaborative Framework
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              How Fuji Japanese Academy Transforms Your Campus Placements
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Credit-Aligned JLPT N5 &amp; N4 Curriculum</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Tailored 120-hour semester modules seamlessly integrated into your academic calendar. Delivered either on-premise at your campus or through high-definition interactive live Zoom cohorts.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-rose-50/70 border border-rose-200/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-rose-600 text-white flex items-center justify-center shadow-sm">
                <Stethoscope className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Medical Japanese &amp; SSW Nursing Care</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Specialized hospital communication curriculum (&quot;Basic Conversation in a Japanese Hospital&quot;), patient dialogue drills, and direct Specified Skilled Worker (SSW - Nursing Care / Kaigo) placement pipelines for B.Sc, GNM &amp; ANM nursing colleges.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Globe className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Native Tokyo Faculty &amp; Cultural Immersion</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Students interact directly with native Japanese instructors, practicing authentic corporate etiquette, business card exchange (Meishi Koukan), and Hō-Ren-Sō reporting methodology.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <Building2 className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Direct Tokyo Corporate Placement Cell</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                We format your students&apos; resumes into Japanese Rirekisho &amp; Shokumu-Keirekisho standards and connect your college placement office directly with hiring managers at Tokyo software MNCs.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200 space-y-3 md:col-span-2 lg:col-span-2">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center">
                <FileCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">MEXT Scholarships &amp; University Exchange</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-light">
                Guidance for your top faculty and students on Government of Japan MEXT scholarships, JASSO grants, and semester exchange programs with leading Japanese universities.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* MoU Inquiry Form */}
      <section className="py-16 bg-slate-900 text-white" id="mou-form">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2">
              Request an Institutional Partnership Proposal
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 font-light">
              Our Academic Director will contact your institution within 1 business day to tailor a campus rollout plan.
            </p>
          </div>

          <div className="bg-slate-950 rounded-3xl border border-slate-800 p-6 sm:p-10 shadow-2xl">
            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      College / Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.institutionName}
                      onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
                      placeholder="e.g. RV College of Engineering"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-red-500 outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      City &amp; State *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cityState}
                      onChange={(e) => setFormData({ ...formData, cityState: e.target.value })}
                      placeholder="e.g. Bengaluru, Karnataka"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-red-500 outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Contact Person &amp; Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      placeholder="e.g. Dr. Ramesh Kumar (Principal / Dean)"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-red-500 outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Designation *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.designation}
                      onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      placeholder="e.g. Head of Placements / HOD"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-red-500 outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Official Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. placements@college.edu.in"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-red-500 outline-none text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Phone / Mobile *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-red-500 outline-none text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Estimated Student Cohort
                    </label>
                    <select
                      value={formData.studentCount}
                      onChange={(e) => setFormData({ ...formData, studentCount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-red-500 outline-none text-sm"
                    >
                      <option value="30-50">30 - 50 Students</option>
                      <option value="50-100">50 - 100 Students</option>
                      <option value="100-250">100 - 250 Students</option>
                      <option value="250+">250+ Students (College-wide)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                      Preferred Institutional Track
                    </label>
                    <select
                      value={formData.preferredModel}
                      onChange={(e) => setFormData({ ...formData, preferredModel: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-slate-900 border border-slate-800 text-white focus:border-red-500 outline-none text-sm"
                    >
                      <option value="Nursing & Healthcare SSW Caregiver Track">Nursing &amp; Healthcare SSW Caregiver Track</option>
                      <option value="Campus Credit Course / Add-on Program">Campus Credit Course / Add-on Program</option>
                      <option value="B.Tech & BCA Tokyo Corporate Placement Cell">B.Tech &amp; BCA Tokyo Corporate Placement Cell</option>
                      <option value="Pre-University & High School Japanese Foundation">Pre-University &amp; High School Japanese Foundation</option>
                      <option value="On-Campus Japanese Seminar & Workshop">On-Campus Japanese Seminar &amp; Workshop</option>
                    </select>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? 'Submitting Proposal Request...' : 'Submit Institutional MoU Request'}</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-red-600/20 text-red-500 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold text-white">MoU Inquiry Successfully Received</h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto">
                  Thank you, <strong>{formData.contactPerson}</strong>. Our Academic Institutional Director will contact your office at <strong>{formData.institutionName}</strong> with complete syllabus frameworks and commercials.
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default CollegePartnershipsPage;
