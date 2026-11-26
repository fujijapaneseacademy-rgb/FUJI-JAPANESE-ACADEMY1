import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { 
  Building2, 
  Users, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  Globe2, 
  ShieldCheck, 
  Code2, 
  ArrowRight,
  Briefcase
} from 'lucide-react';
import CorporateRfqForm from '../components/CorporateRfqForm';

export const CorporatePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Helmet>
        <title>Corporate Japanese Language Training for IT GCCs & Enterprises | Fuji Japanese Academy</title>
        <meta 
          name="description" 
          content="Custom Business Japanese and Technical Keigo training for IT GCCs, software developers, and engineering teams in Bengaluru and pan-India. Onsite and live virtual delivery." 
        />
        <meta 
          name="keywords" 
          content="Corporate Japanese training Bangalore, Business Japanese for IT companies, Technical Keigo training, Japanese language training for GCCs, Electronic City corporate training" 
        />
        <link rel="canonical" href="https://fujijapaneseacademy.com/corporate" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "Corporate Japanese Language & Cultural Training",
            "provider": {
              "@type": "EducationalOrganization",
              "name": "Fuji Japanese Academy",
              "url": "https://fujijapaneseacademy.com"
            },
            "serviceType": "Corporate Training",
            "areaServed": {
              "@type": "Country",
              "name": "India"
            },
            "description": "Customized B2B Japanese language coaching, Business Keigo, and cross-border intercultural communication for IT software engineering enterprises."
          })}
        </script>
      </Helmet>

      {/* Corporate Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-24 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-950/40 via-transparent to-transparent pointer-events-none" />

        <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/30 text-xs font-bold uppercase tracking-wider mb-6">
            <Building2 className="w-4 h-4" />
            <span>Enterprise B2B Training Solutions</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-display mb-6 leading-[1.15]">
            Equip Your Engineering Workforce with <br className="hidden sm:inline" />
            <span className="text-red-500 italic">Native Japanese Fluency</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg md:text-xl max-w-3xl mx-auto leading-relaxed mb-10">
            Overcome communication bottlenecks between Indian development centers and Tokyo stakeholders. We deliver outcome-driven Technical Keigo, Agile standup Japanese, and business etiquette programs for IT GCCs and consultancies.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#rfq-form"
              className="px-8 py-4 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-base shadow-xl shadow-red-950/50 hover:scale-105 transition-all cursor-pointer"
            >
              Request Corporate Proposal (RFQ)
            </a>
            <NavLink
              to="/courses/japanese-for-it-professionals"
              className="px-8 py-4 rounded-full bg-white/10 hover:bg-white hover:text-gray-950 text-white border border-white/20 font-bold text-base transition-all cursor-pointer"
            >
              Explore IT Curriculum
            </NavLink>
          </div>

          {/* Value Metrics Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto text-left">
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-red-400">150+</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">Corporate Batches Trained</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">98.4%</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">First-Attempt JLPT Pass Rate</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-blue-400">100%</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">Native Sensei Faculty</div>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">3x</div>
              <div className="text-xs sm:text-sm text-gray-300 mt-1">Higher Offshore Retention</div>
            </div>
          </div>
        </div>
      </section>

      {/* 4 Pillars of Corporate Training */}
      <section className="py-20 md:py-28 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">
              Tailored for Software Teams
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              The 4-Pillar IT Corporate Curriculum
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2 max-w-2xl mx-auto">
              We replace generic textbook dialogues with technical, real-world software engineering context.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mb-5">
                <Code2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">1. Technical Keigo</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Writing defect tickets, code reviews, JIRA documentation, and pull request explanations in formal Japanese business honorifics.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mb-5">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">2. Hō-Ren-Sō Protocol</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Mastering the fundamental Japanese communication triad: Report (Hōkoku), Communicate (Renraku), and Consult (Sōdan) in sprint standups.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mb-5">
                <TrendingUp className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">3. Nemawashi Culture</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Consensus-building frameworks before formal architectural reviews, avoiding surprises and aligning roadmap expectations with Tokyo.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-gray-50 border border-gray-100 hover:shadow-lg transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-5">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-2">4. Incident Escalation</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Managing high-severity outages (Sev-1 / P1), client apologies (Shazai), and post-mortem delivery reports with diplomatic Keigo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Delivery Models */}
      <section className="py-20 md:py-24 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">
              Flexible Formats
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              Corporate Delivery Options
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mt-2">
              Tailored around your engineering sprint cycles and time zones.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">Model A</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">On-Premise at Campus</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Certified native Japanese sensei deployed directly to your facility in Electronic City, Whitefield, or Bellandur.
                </p>
              </div>
              <div className="text-xs text-gray-500 font-medium pt-4 border-t border-gray-100">
                Ideal for 15+ developers per cohort
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">Model B</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Live Virtual Online</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Interactive Zoom sessions with breakout rooms, digital whiteboards, and recorded lectures for distributed pan-India teams.
                </p>
              </div>
              <div className="text-xs text-gray-500 font-medium pt-4 border-t border-gray-100">
                Flexible early morning or post-work slots
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-white border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-2">Model C</span>
                <h3 className="text-xl font-bold text-gray-900 mb-3">Executive 1-on-1</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  High-touch coaching for Delivery Heads, VPs, and Client Partners preparing for delegation travel or high-stakes Tokyo meetings.
                </p>
              </div>
              <div className="text-xs text-gray-500 font-medium pt-4 border-t border-gray-100">
                Custom confidential curriculum
              </div>
            </div>
          </div>

          {/* Hiring Notice for Corporate Sales */}
          <div className="mt-12 bg-slate-900 text-white rounded-3xl p-6 md:p-8 border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                Careers in Japan Sales
              </span>
              <h4 className="text-lg md:text-xl font-bold font-display text-white">
                Now Hiring: Executive Sales / Business Development (Manesar, Haryana)
              </h4>
              <p className="text-xs md:text-sm text-slate-300 mt-1 max-w-2xl">
                Fixed Salary: 6 to 10 LPA CTC &bull; JLPT N2/N1 + MBA in Sales/Marketing. Manage B2B Japanese accounts, client communication, and cross-border partnerships.
              </p>
            </div>
            <NavLink
              to="/careers#executive-sales-manesar"
              className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs md:text-sm rounded-xl whitespace-nowrap shadow-md transition-all flex items-center gap-1.5"
            >
              <span>View Opening</span>
              <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Embedded RFQ Form */}
      <CorporateRfqForm />
    </div>
  );
};

export default CorporatePage;
