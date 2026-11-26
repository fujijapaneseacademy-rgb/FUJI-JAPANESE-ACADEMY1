import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Sparkles, Building2, CheckCircle2 } from 'lucide-react';

export interface LeaderProfile {
  name: string;
  rolePill: string;
  designation: string;
  organization: string;
  bio: string;
  image: string;
  badges: string[];
  pillColor: string;
  accentBorder: string;
}

export const LEADERSHIP_PROFILES: LeaderProfile[] = [
  {
    name: 'Nagendra M',
    rolePill: 'Founder & Managing Director',
    designation: 'Chief Institutional Architect & Managing Director',
    organization: 'Fuji Japanese Academy Private Limited',
    bio: 'Leading Fuji Japanese Academy Private Limited with a steadfast vision to build South India\'s premier Japanese language institution and bilateral career ecosystem. Spearheads institutional governance, enterprise university MoUs, and strategic corporate partnerships connecting ambitious Indian engineers and professionals directly to career opportunities in Tokyo and beyond.',
    image: '/images/leadership/nagendra-m.jpg',
    badges: ['Institutional Vision', 'Bilateral Strategy', 'Corporate Governance', 'University MoUs'],
    pillColor: 'bg-rose-50 text-fuji-red border-rose-200',
    accentBorder: 'hover:border-fuji-red/40'
  }
];

interface LeadershipTeamProps {
  showHeader?: boolean;
  className?: string;
}

export const LeadershipTeam: React.FC<LeadershipTeamProps> = ({ 
  showHeader = true,
  className = '' 
}) => {
  return (
    <section className={`relative overflow-hidden py-16 md:py-24 ${className}`}>
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-red-50/50 via-slate-50/50 to-blue-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="container mx-auto px-4 md:px-8">
        {showHeader && (
          <div className="max-w-3xl mx-auto text-center mb-14 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-fuji-red/10 text-fuji-red text-xs font-bold uppercase tracking-wider mb-4 border border-fuji-red/20 shadow-sm">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Executive Directorate • 経営陣</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-fuji-indigo tracking-tight mb-4 leading-tight">
              Institutional Leadership &amp; Directorate
            </h2>
            <p className="text-gray-600 text-base md:text-lg font-light leading-relaxed">
              Guided by experienced institutional founders committed to gold-standard Japanese language pedagogy, statutory integrity, and life-changing bilateral career mobility for India's brightest talent.
            </p>
          </div>
        )}

        <div className={`grid grid-cols-1 ${LEADERSHIP_PROFILES.length > 1 ? 'lg:grid-cols-2 max-w-6xl' : 'max-w-3xl'} gap-8 lg:gap-10 mx-auto`}>
          {LEADERSHIP_PROFILES.map((leader, idx) => (
            <motion.div
              key={leader.name}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className={`bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-7 relative group ${leader.accentBorder}`}
            >
              {/* Photo Frame */}
              <div className="relative w-44 sm:w-52 h-60 sm:h-68 rounded-2xl overflow-hidden shrink-0 bg-slate-100 shadow-md border border-slate-200/80">
                <img
                  src={leader.image}
                  alt={`${leader.name} - ${leader.rolePill}`}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to render
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    if (target.parentElement) {
                      target.parentElement.innerHTML = `
                        <div class="w-full h-full flex flex-col items-center justify-center bg-slate-100 text-slate-400 p-4 text-center">
                          <svg class="w-12 h-12 mb-2 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                          <span class="text-xs font-bold text-slate-600">${leader.name}</span>
                        </div>
                      `;
                    }
                  }}
                />
                
                {/* Subtle verified pill badge on photo */}
                <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-slate-900/85 backdrop-blur-md py-1 px-2 rounded-lg flex items-center justify-center gap-1.5 text-[10px] font-semibold text-white tracking-wide border border-white/10 shadow-sm">
                  <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                  <span className="truncate">Directorate</span>
                </div>
              </div>

              {/* Bio & Details Area */}
              <div className="flex-1 text-center sm:text-left flex flex-col justify-between h-full">
                <div>
                  {/* Pill Badge */}
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide border shadow-xs mb-3 ${leader.pillColor}`}>
                    <Award className="w-3 h-3 shrink-0" />
                    <span>{leader.rolePill}</span>
                  </div>

                  {/* Name */}
                  <h3 className="text-2xl font-display font-extrabold text-slate-900 tracking-tight mb-1 group-hover:text-fuji-indigo transition-colors">
                    {leader.name}
                  </h3>

                  {/* Title & Organization */}
                  <div className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-1">
                    {leader.designation}
                  </div>
                  <div className="text-xs font-medium text-fuji-red mb-3 flex items-center justify-center sm:justify-start gap-1">
                    <Building2 className="w-3.5 h-3.5 shrink-0" />
                    <span>{leader.organization}</span>
                  </div>

                  {/* Narrative Bio */}
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-light mb-4">
                    {leader.bio}
                  </p>
                </div>

                {/* Sub-Badges / Areas of Expertise */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-center sm:justify-start gap-1.5">
                  {leader.badges.map((badge, bIdx) => (
                    <span
                      key={bIdx}
                      className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 text-[11px] font-medium border border-slate-200/60"
                    >
                      <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LeadershipTeam;
