import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Briefcase, GraduationCap, MapPin, Search, Filter, Copy, Check,
  CheckCircle2, ChevronRight, UserCheck, ShieldCheck, Globe, Building2,
  Send, FileText, Sparkles, AlertCircle, Phone, Mail, Award, Clock,
  ArrowRight, ExternalLink, IndianRupee, Layers, ChevronDown, CheckCircle
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import {
  MASTER_JOB_FAMILIES,
  JAPANESE_PROFICIENCY_MATRIX,
  FEATURED_EMPLOYER_REQUIREMENTS,
  STANDARD_RECRUITMENT_ROLES,
  OPERATIONAL_DIVISIONS,
  RECRUITMENT_STATS
} from '../data/recruitmentCatalogueData';
import { supabase } from '../src/lib/supabaseClient';
import { submitToGoogleSheet } from '../services/formService';

export const JobCataloguePage: React.FC = () => {
  // Filter state for Interactive Matching System (Section 6)
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedJlpt, setSelectedJlpt] = useState<string>('all');
  const [selectedExp, setSelectedExp] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  // Form submission state
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    city: '',
    qualification: 'B.E. / B.Tech',
    skills: '',
    japaneseLevel: 'N3',
    experience: 'Fresher / 0-1 Year',
    targetRole: '',
    preferredLocation: 'India & Japan (Open to both)',
    noticePeriod: 'Immediate / 15 Days',
    resumeUrl: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Filtered Roles calculation
  const filteredRoles = useMemo(() => {
    return STANDARD_RECRUITMENT_ROLES.filter((roleItem) => {
      // Category filter
      if (selectedCategory !== 'all' && !roleItem.category.toLowerCase().includes(selectedCategory.toLowerCase())) {
        return false;
      }
      // JLPT filter
      if (selectedJlpt !== 'all' && !roleItem.japaneseTarget.includes(selectedJlpt)) {
        return false;
      }
      // Experience filter
      if (selectedExp !== 'all') {
        if (selectedExp === 'fresher' && !roleItem.experience.startsWith('0')) {
          return false;
        }
        if (selectedExp === 'experienced' && roleItem.experience === '0–3 years') {
          // let pass
        }
      }
      // Search query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        return (
          roleItem.role.toLowerCase().includes(q) ||
          roleItem.eligibility.toLowerCase().includes(q) ||
          roleItem.category.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [selectedCategory, selectedJlpt, selectedExp, searchQuery]);

  // Copy filtered roles handler
  const handleCopyRoles = () => {
    const textToCopy = filteredRoles
      .map((r) => `• ${r.role} (${r.category}) | Target JLPT: ${r.japaneseTarget} | Exp: ${r.experience}`)
      .join('\n');
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Pre-fill target role from employer requirement
  const handleApplyForRole = (roleTitle: string) => {
    setFormData((prev) => ({ ...prev, targetRole: roleTitle }));
    const formElement = document.getElementById('candidate-registration-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Form submit handler
  const handleSubmitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const jobSubject = `Job Application: ${formData.targetRole || 'General Candidate Registration'} (JLPT: ${formData.japaneseLevel})`;
      const applicationDetails = `Education: ${formData.qualification} | Skills: ${formData.skills} | Exp: ${formData.experience} | Pref Location: ${formData.preferredLocation} | City: ${formData.city} | Resume: ${formData.resumeUrl} | Notes: ${formData.message}`;

      const success = await submitToGoogleSheet({
        formType: 'Job Application',
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        subject: jobSubject,
        message: applicationDetails
      });

      if (success) {
        setSubmitSuccess(true);
        // Reset form
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          city: '',
          qualification: 'B.E. / B.Tech',
          skills: '',
          japaneseLevel: 'N3',
          experience: 'Fresher / 0-1 Year',
          targetRole: '',
          preferredLocation: 'India & Japan (Open to both)',
          noticePeriod: 'Immediate / 15 Days',
          resumeUrl: '',
          message: ''
        });
      } else {
        setSubmitError('Unable to record application online right now. Please apply directly via email or chat with us on WhatsApp.');
      }
    } catch (err: any) {
      console.error('Submission error:', err);
      setSubmitError('An error occurred during submission. Please reach our team on WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pt-24 min-h-screen bg-slate-50 text-slate-800">
      <Helmet>
        <title>Apply for Jobs — Master Job Roles & Recruitment Requirements Catalogue (2026–2036) | Fuji Japanese Academy</title>
        <meta
          name="description"
          content="Comprehensive recruitment and candidate-placement database for Fuji Japanese Academy across 15 job families, 100+ roles, JLPT N5–N1 and non-Japanese pathways in India and Tokyo."
        />
        <meta
          name="keywords"
          content="Japan jobs, Fuji Japanese Academy careers, apply for jobs Japan, JLPT N2 sales executive Manesar, Indo-Sakura software engineer, Japan SSW recruitment, bilingual IT jobs"
        />
        <link rel="canonical" href="https://fujijapaneseacademy.com/careers/apply" />
      </Helmet>

      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 md:px-6 py-4">
        <Breadcrumbs
          items={[
            { label: 'Careers', path: '/careers' },
            { label: 'Apply for Jobs — Master Catalogue' }
          ]}
        />
      </div>

      {/* Hero Header Section */}
      <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-fuji-indigo text-white py-16 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-600/15 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/25 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider mb-6">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Fuji Japanese Academy &bull; Placement &amp; Sourcing Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-extrabold text-white tracking-tight leading-tight">
            Master Job Roles &amp; Recruitment <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-amber-300">
              Requirements Catalogue (2026–2036)
            </span>
          </h1>

          <p className="mt-6 text-slate-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
            <strong>Purpose:</strong> Build a comprehensive recruitment and candidate-placement database for Fuji Japanese Academy,
            covering Japanese-speaking and non-Japanese-speaking candidates, freshers, experienced professionals,
            technical workers, skilled labour, and entry-level workers.
          </p>

          <p className="mt-2 text-xs md:text-sm text-slate-400 max-w-2xl mx-auto">
            This catalogue powers candidate registration, student placements, Japanese employer partnerships, Indian company hiring requirements, and campus placement drives.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-10">
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-red-400">{RECRUITMENT_STATS.jobFamiliesCount}</div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold mt-1">Job Families</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-white">{RECRUITMENT_STATS.targetRolesCount}</div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold mt-1">Target Roles</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-amber-400">N5–N1</div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold mt-1">&amp; Non-Japanese</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center">
              <div className="text-2xl sm:text-3xl font-black text-emerald-400">2</div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold mt-1">Hiring Markets (IN &amp; JP)</div>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-4 text-center col-span-2 sm:col-span-1">
              <div className="text-xl sm:text-2xl font-black text-cyan-300">0–15+ yrs</div>
              <div className="text-[11px] text-slate-300 uppercase tracking-wider font-semibold mt-1">Fresher to Senior</div>
            </div>
          </div>

          {/* Important Legal & Scope Notice */}
          <div className="mt-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs text-left max-w-3xl mx-auto flex items-start gap-3">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
            <p>
              <strong>Important:</strong> These are job categories for sourcing candidates and building partnerships, not 100+ confirmed vacancies.
              The Manesar business-development position and Japanese-speaking technical requirements are based on active employer briefs supplied.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#candidate-registration-form"
              className="px-8 py-3.5 bg-red-600 hover:bg-red-500 text-white font-bold rounded-xl shadow-lg transition-all text-sm flex items-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>Register as a Candidate / Apply</span>
            </a>
            <a
              href="#master-taxonomy"
              className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold rounded-xl border border-slate-700 transition-all text-sm"
            >
              Explore 15 Job Families &darr;
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 1: Complete Master Job Roles List (15 Categories) */}
      <section id="master-taxonomy" className="py-16 container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-600 font-bold tracking-widest uppercase text-xs">Section 1</span>
          <h2 className="text-3xl font-display font-extrabold text-slate-900 mt-1">
            Complete Master Job Roles Taxonomy
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            The permanent recruitment taxonomy for Fuji Japanese Academy across 15 job families and 100+ specialized roles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MASTER_JOB_FAMILIES.map((family) => (
            <div
              key={family.id}
              className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-red-500/50 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="w-8 h-8 rounded-lg bg-red-600 text-white font-bold text-xs flex items-center justify-center shadow-xs">
                    {family.code}
                  </span>
                  <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                    {family.roles.length} Roles
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {family.name}
                </h3>
                <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                  {family.description}
                </p>

                <div className="mb-4">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                    Eligible Backgrounds:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {family.targetQualifications.map((q, qIdx) => (
                      <span key={qIdx} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                        {q}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-slate-100">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Roles Included:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {family.roles.map((r, rIdx) => (
                      <button
                        key={rIdx}
                        type="button"
                        onClick={() => handleApplyForRole(r)}
                        className="text-[11px] text-slate-700 bg-slate-50 hover:bg-red-50 hover:text-red-600 px-2.5 py-1 rounded-md border border-slate-200/80 transition-colors text-left"
                        title="Click to apply for this role"
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Targeting this stream?</span>
                <button
                  type="button"
                  onClick={() => handleApplyForRole(`${family.name} Roles`)}
                  className="text-xs font-bold text-red-600 hover:text-red-700 inline-flex items-center gap-1"
                >
                  <span>Register &rarr;</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 2: Japanese Proficiency & Recruitment Eligibility */}
      <section className="py-16 bg-slate-100 border-y border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-red-600 font-bold tracking-widest uppercase text-xs">Section 2</span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mt-1">
              Japanese Proficiency &amp; Recruitment Eligibility
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              For your candidate profile, use the following standardized language classifications and career pathway mapping.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {JAPANESE_PROFICIENCY_MATRIX.map((tier, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-slate-900 text-white font-extrabold text-xs">
                      {tier.level}
                    </span>
                    <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-red-50 text-red-600 font-bold border border-red-200">
                      {tier.badge}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mb-2">{tier.targetAudience}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {tier.suggestedOpportunities}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700">Immigration / Visa Context: </span>
                  <span>{tier.visaRelevance}</span>
                </div>
              </div>
            ))}
          </div>

          {/* SSW 19 Fields Info Note */}
          <div className="mt-8 p-5 bg-white rounded-2xl border border-slate-200 shadow-sm max-w-4xl mx-auto flex items-start gap-4">
            <ShieldCheck className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
            <div className="text-xs text-slate-600 leading-relaxed space-y-1">
              <strong className="text-slate-900 block text-sm">
                Specified Skilled Worker (SSW) Pathway &amp; Official Visa Compliance:
              </strong>
              <p>
                For Japan's Specified Skilled Worker (SSW) pathway, candidates generally require qualifying Japanese-language and sector-specific skills assessments.
                Japan's current official SSW information identifies <strong>19 Type 1 fields</strong>, including newer categories such as logistics warehousing, linen services, and industrial manufacturing.
                JLPT certification alone does not establish suitability or immigration eligibility; all candidates are guided through certified immigration legal routes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 & 4: Active Featured Employer Requirements */}
      <section className="py-16 container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-600 font-bold tracking-widest uppercase text-xs">Sections 3 &amp; 4</span>
          <h2 className="text-3xl font-display font-extrabold text-slate-900 mt-1">
            Active Employer Requirements &amp; Partner Briefs
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Priority openings and active hiring mandates based on client briefs supplied to Fuji Japanese Academy.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {FEATURED_EMPLOYER_REQUIREMENTS.map((emp) => (
            <div
              key={emp.id}
              className="bg-white rounded-3xl p-7 md:p-8 border-2 border-red-500/30 shadow-lg relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 px-4 py-1.5 bg-gradient-to-l from-red-600 to-rose-600 text-white text-[11px] font-bold rounded-bl-2xl uppercase tracking-wider">
                Active Brief
              </div>

              <div>
                <span className="text-xs font-semibold text-slate-500 block mb-1">{emp.employerCategory}</span>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-4">{emp.roleTitle}</h3>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Location</span>
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-red-500" />
                      {emp.location}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Compensation / CTC</span>
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                      <IndianRupee className="w-3.5 h-3.5 text-emerald-600" />
                      {emp.ctc}
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Japanese Level</span>
                    <span className="text-xs font-bold text-red-600 mt-0.5 block">{emp.japaneseProficiency}</span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="text-[10px] text-slate-400 font-bold uppercase block">Employment</span>
                    <span className="text-xs font-bold text-slate-800 mt-0.5 block">{emp.employmentType}</span>
                  </div>
                </div>

                <div className="space-y-2 mb-4 text-xs text-slate-600">
                  <p><strong>Qualifications:</strong> {emp.qualifications}</p>
                  <p><strong>Experience:</strong> {emp.experience}</p>
                </div>

                {emp.responsibilities && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <strong className="text-xs text-slate-800 block mb-2">Key Responsibilities:</strong>
                    <ul className="space-y-1.5 text-xs text-slate-600">
                      {emp.responsibilities.map((r, rIdx) => (
                        <li key={rIdx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-500 flex-shrink-0 mt-0.5" />
                          <span>{r}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {emp.specializations && (
                  <div className="mt-4 pt-3 border-t border-slate-100">
                    <strong className="text-xs text-slate-800 block mb-2">Technical Specializations Needed:</strong>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {emp.specializations.map((s, sIdx) => (
                        <div key={sIdx} className="p-2 bg-slate-50 rounded-lg border border-slate-100">
                          <span className="font-bold text-slate-900 block">{s.area}</span>
                          <span className="text-[11px] text-slate-500">{s.skills}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500">{emp.classification}</span>
                <button
                  type="button"
                  onClick={() => handleApplyForRole(emp.roleTitle)}
                  className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-md transition-all flex items-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Apply for this Brief</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 5: Standard Recruitment Requirements for Other Roles */}
      <section className="py-16 bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-red-600 font-bold tracking-widest uppercase text-xs">Section 5</span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mt-1">
              Standard Recruitment Requirements by Role
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Recommended starting requirements for corporate vacancies across tech, linguistics, commerce, skilled trades, and healthcare.
            </p>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-900 text-white font-bold">
                    <th className="p-4">Target Role</th>
                    <th className="p-4">Suggested Educational / Technical Eligibility</th>
                    <th className="p-4">Japanese Target</th>
                    <th className="p-4">Experience</th>
                    <th className="p-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {STANDARD_RECRUITMENT_ROLES.map((r, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                      <td className="p-4 font-bold text-slate-900">{r.role}</td>
                      <td className="p-4 text-slate-600">{r.eligibility}</td>
                      <td className="p-4">
                        <span className="px-2.5 py-1 rounded-md bg-red-50 text-red-600 font-bold border border-red-200">
                          {r.japaneseTarget}
                        </span>
                      </td>
                      <td className="p-4 text-slate-600">{r.experience}</td>
                      <td className="p-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleApplyForRole(r.role)}
                          className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-red-600 text-white text-[11px] font-semibold transition-colors"
                        >
                          Apply
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6: Permanent Candidate Registration System & Interactive Filter */}
      <section id="candidate-registration-form" className="py-16 container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-red-600 font-bold tracking-widest uppercase text-xs">Section 6</span>
          <h2 className="text-3xl font-display font-extrabold text-slate-900 mt-1">
            Permanent Candidate Registration &amp; Search Portal
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Use the interactive filter below to explore matching role profiles, or register directly into the Fuji Japanese Academy placement database.
          </p>
        </div>

        {/* Interactive Filter Widget */}
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-md mb-12">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Filter className="w-5 h-5 text-red-600" />
                <span>Interactive Role Finder &amp; Filter</span>
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Filter by industry category, Japanese proficiency level, or professional experience.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-red-50 text-red-600 border border-red-200 rounded-full text-xs font-bold">
                {filteredRoles.length} Matching Profiles
              </span>
              <button
                type="button"
                onClick={handleCopyRoles}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-semibold transition-colors shadow-xs"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Filtered Role List'}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Industry / Job Category</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Categories</option>
                <option value="software">Software Development &amp; IT</option>
                <option value="ai">AI, Data &amp; Emerging Tech</option>
                <option value="cloud">Cloud, DevOps &amp; Security</option>
                <option value="sap">SAP, ERP &amp; Enterprise</option>
                <option value="semiconductor">Semiconductor &amp; Hardware</option>
                <option value="accounting">Accounting &amp; Finance</option>
                <option value="business">Business, Sales &amp; Management</option>
                <option value="language">Japanese Language &amp; Translation</option>
                <option value="hr">HR &amp; Recruitment</option>
                <option value="manufacturing">Manufacturing &amp; Skilled Labour</option>
                <option value="operations">Operations &amp; Production</option>
                <option value="healthcare">Healthcare &amp; Caregiving</option>
                <option value="hospitality">Hospitality &amp; Tourism</option>
                <option value="logistics">Logistics &amp; Supply Chain</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">JLPT Level Target</label>
              <select
                value={selectedJlpt}
                onChange={(e) => setSelectedJlpt(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All JLPT Levels</option>
                <option value="N1">JLPT N1</option>
                <option value="N2">JLPT N2</option>
                <option value="N3">JLPT N3</option>
                <option value="N4">JLPT N4</option>
                <option value="N5">JLPT N5</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Experience Level</label>
              <select
                value={selectedExp}
                onChange={(e) => setSelectedExp(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="all">All Experience Levels</option>
                <option value="fresher">Fresher (0–1 Years)</option>
                <option value="experienced">Experienced (2+ Years)</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1.5">Keyword Search</label>
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  placeholder="e.g. Java, Caregiver, CNC..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
          </div>

          {/* Filter Results Display */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mt-6 pt-6 border-t border-slate-100">
            {filteredRoles.length > 0 ? (
              filteredRoles.map((r, i) => (
                <div
                  key={i}
                  onClick={() => handleApplyForRole(r.role)}
                  className="p-3.5 rounded-xl bg-slate-50 hover:bg-red-50/60 border border-slate-200/90 hover:border-red-400 transition-all cursor-pointer group flex flex-col justify-between"
                >
                  <div>
                    <span className="font-bold text-xs text-slate-900 group-hover:text-red-600 block">
                      {r.role}
                    </span>
                    <span className="text-[10px] text-slate-500 block mt-0.5 line-clamp-1">{r.eligibility}</span>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-slate-200/50">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-red-100/70 text-red-700 font-bold">
                      {r.japaneseTarget}
                    </span>
                    <span className="text-[10px] text-slate-400 font-medium">{r.experience}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-xs text-slate-500">
                No matching roles found for current filter selection. Try selecting "All Categories" or clearing the search query.
              </div>
            )}
          </div>
        </div>

        {/* Candidate Registration Application Form */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-slate-200 shadow-xl max-w-4xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider">
              Candidate Placement Portal
            </span>
            <h3 className="text-2xl font-display font-extrabold text-slate-900 mt-2">
              Submit Your Candidate Profile
            </h3>
            <p className="text-xs text-slate-600 mt-1">
              Every candidate submits personal details, technical qualifications, Japanese certification, location preference, and resume for verified employer matching.
            </p>
          </div>

          {submitSuccess ? (
            <div className="p-8 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-emerald-900">Candidate Profile Submitted Successfully!</h4>
              <p className="text-xs text-emerald-800 max-w-lg mx-auto">
                Thank you! Your profile has been registered in the Fuji Japanese Academy Placement &amp; Employer Matching Database.
                Our corporate recruitment coordinator will review your qualifications and reach out regarding relevant India and Tokyo interview opportunities.
              </p>
              <button
                type="button"
                onClick={() => setSubmitSuccess(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitForm} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter candidate full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="name@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Current City &amp; State *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Bengaluru, Karnataka or Delhi NCR"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Educational Qualification *</label>
                  <select
                    value={formData.qualification}
                    onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    <option value="B.E. / B.Tech">B.E. / B.Tech</option>
                    <option value="M.E. / M.Tech">M.E. / M.Tech</option>
                    <option value="BCA / MCA">BCA / MCA</option>
                    <option value="MBA / PGDM">MBA / PGDM</option>
                    <option value="B.Com / M.Com">B.Com / M.Com</option>
                    <option value="BBA / BBM">BBA / BBM</option>
                    <option value="CA / CMA / CS">CA / CMA / CS</option>
                    <option value="Polytechnic Diploma">Polytechnic Diploma</option>
                    <option value="ITI / Vocational">ITI / Vocational</option>
                    <option value="Nursing / Healthcare">Nursing / Healthcare</option>
                    <option value="Other Graduate / Postgraduate">Other Graduate</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Japanese Language Level *</label>
                  <select
                    value={formData.japaneseLevel}
                    onChange={(e) => setFormData({ ...formData, japaneseLevel: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    <option value="No Japanese">No Japanese (India Jobs / Willing to Learn)</option>
                    <option value="N5">JLPT N5 (Beginner)</option>
                    <option value="N4">JLPT N4 (Basic / SSW Benchmark)</option>
                    <option value="N3">JLPT N3 (Intermediate Tech Gateway)</option>
                    <option value="N2">JLPT N2 (Fluent Bilingual)</option>
                    <option value="N1">JLPT N1 (Native-Level Mastery)</option>
                    <option value="Native / Bilingual">Native Japanese</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Years of Experience *</label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    <option value="Fresher / 0-1 Year">Fresher (0–1 Year)</option>
                    <option value="1-3 Years">1–3 Years</option>
                    <option value="3-5 Years">3–5 Years</option>
                    <option value="5-8 Years">5–8 Years</option>
                    <option value="8-12 Years">8–12 Years</option>
                    <option value="12+ Years (Senior Lead)">12+ Years (Senior / Leadership)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Target Job Role *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Java Developer, Executive Sales, Japanese Interpreter"
                    value={formData.targetRole}
                    onChange={(e) => setFormData({ ...formData, targetRole: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Preferred Location *</label>
                  <select
                    value={formData.preferredLocation}
                    onChange={(e) => setFormData({ ...formData, preferredLocation: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium bg-white focus:ring-2 focus:ring-red-500 focus:outline-none"
                  >
                    <option value="India & Japan (Open to both)">India &amp; Japan (Open to both)</option>
                    <option value="Japan On-Site (Tokyo / Osaka / Nationwide)">Japan On-Site (Tokyo / Osaka / Nationwide)</option>
                    <option value="India Only (Bengaluru / Manesar / Mumbai / NCR)">India Only (Bengaluru / Manesar / Mumbai / NCR)</option>
                    <option value="Remote / Hybrid">Remote / Hybrid</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Technical Skills &amp; Domain Expertise</label>
                  <input
                    type="text"
                    placeholder="e.g. Spring Boot, AWS, SAP MM, Accounting, CNC, Caregiving"
                    value={formData.skills}
                    onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Resume / Portfolio Link (Google Drive / LinkedIn / GitHub)</label>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/... or LinkedIn URL"
                    value={formData.resumeUrl}
                    onChange={(e) => setFormData({ ...formData, resumeUrl: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Additional Notes / Cover Summary</label>
                <textarea
                  rows={3}
                  placeholder="Mention your notice period, JLPT score details, or specific career expectations..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3 rounded-xl border border-slate-200 text-xs font-medium focus:ring-2 focus:ring-red-500 focus:outline-none"
                />
              </div>

              <div className="pt-2 text-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-sm shadow-lg hover:shadow-red-600/30 transition-all disabled:opacity-50"
                >
                  {isSubmitting ? 'Registering Profile...' : 'Submit Candidate Registration'}
                </button>
                <p className="text-[11px] text-slate-400 mt-2">
                  All candidate registrations are held confidentially and evaluated for matching employer vacancies.
                </p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* SECTION 7: Recommended Operational Structure */}
      <section className="py-16 bg-slate-100 border-t border-slate-200">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-red-600 font-bold tracking-widest uppercase text-xs">Section 7</span>
            <h2 className="text-3xl font-display font-extrabold text-slate-900 mt-1">
              Recommended Operational Structure
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Four specialized divisions powering career pathways, skilled migration, campus drives, and executive search.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {OPERATIONAL_DIVISIONS.map((div) => (
              <div key={div.number} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm flex flex-col justify-between">
                <div>
                  <div className="text-2xl font-black text-red-600 mb-2">{div.number}</div>
                  <h3 className="font-bold text-slate-900 text-sm mb-3">{div.name}</h3>
                  <p className="text-xs text-slate-600 mb-4 leading-relaxed">{div.scope}</p>
                </div>
                <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 font-medium">
                  {div.focus}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 8: Website-Ready Recruitment Introduction & Employer Outreach */}
      <section className="py-16 container mx-auto px-4 md:px-6">
        <div className="bg-gradient-to-br from-slate-950 via-slate-900 to-fuji-indigo text-white rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-2xl">
          <div className="relative z-10 max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-red-600/30 text-red-300 text-[11px] font-bold uppercase tracking-wider border border-red-500/30">
              Section 8 &bull; Career &amp; Corporate Partnerships
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-white mt-4">
              Japan &amp; India Career Opportunities — Build Your Career with Fuji Japanese Academy
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed mt-4">
              Fuji Japanese Academy connects aspiring professionals, Japanese language learners, experienced specialists,
              engineering graduates, commerce and management candidates, and skilled workers with potential career opportunities in India and Japan.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8 pt-6 border-t border-slate-800">
              <div>
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">Who Can Register?</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Freshers, experienced professionals, JLPT N5–N1 certified candidates, Japanese language learners, diploma holders, ITI professionals, graduates, and postgraduates.
                </p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-red-400 uppercase tracking-wider mb-2">For Employers &amp; MoUs</h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We welcome recruitment requirements from Japanese companies, Indian multinational corporations, recruitment partners, and staffing organizations.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center gap-6">
              <a
                href="mailto:corporate@fujijapaneseacademy.com"
                className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                <span>corporate@fujijapaneseacademy.com</span>
              </a>
              <span className="text-xs text-slate-400">
                Official Placement Desk: www.fujijapaneseacademy.com
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JobCataloguePage;
