
import React from 'react';
import { OPEN_POSITIONS } from '../constants';
import { Briefcase, GraduationCap, Heart, Rocket, Clock, MapPin, Send, ArrowRight } from 'lucide-react';

const Careers: React.FC = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-stone-50">
      {/* Hero Section */}
      <section className="bg-indigo-950 py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-red-500 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
          <span className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 text-red-400 text-sm font-bold border border-red-600/30 mb-6 uppercase tracking-widest">
            Join Our Team
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
            Shape the Future of <br/> <span className="text-red-500">Language Education</span>
          </h1>
          <p className="text-indigo-200 max-w-2xl mx-auto text-lg md:text-xl font-light leading-relaxed">
            At FUJI JAPANESE INSTITUTE, we are more than just a school. We are a bridge between cultures. Come help us build it.
          </p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why Work With Us?</h2>
          <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: <Rocket className="w-8 h-8" />,
              title: "Career Growth",
              desc: "Clear progression paths for trainers and administrators alike."
            },
            {
              icon: <Heart className="w-8 h-8" />,
              title: "Cultural Exchange",
              desc: "Work closely with native speakers and Japanese enthusiasts."
            },
            {
              icon: <GraduationCap className="w-8 h-8" />,
              title: "Skill Training",
              desc: "Regular workshops to enhance your pedagogical and technical skills."
            },
            {
              icon: <Briefcase className="w-8 h-8" />,
              title: "Inclusive Culture",
              desc: "A supportive environment where every idea is valued."
            }
          ].map((benefit, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow text-center group">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-red-600 group-hover:text-white transition-colors">
                {benefit.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{benefit.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Current Openings</h2>
              <p className="text-slate-500 mt-1">Explore opportunities to contribute and grow.</p>
            </div>
            <div className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-lg text-sm font-semibold border border-indigo-100">
              {OPEN_POSITIONS.length} Positions Available
            </div>
          </div>

          <div className="grid gap-6">
            {OPEN_POSITIONS.map((job) => (
              <div key={job.id} className="group bg-stone-50 p-6 md:p-8 rounded-2xl border border-stone-100 hover:border-red-200 hover:bg-white transition-all flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl">
                <div className="flex-grow space-y-3">
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-red-100 text-red-700 text-[10px] font-bold uppercase rounded-md">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 bg-indigo-100 text-indigo-700 text-[10px] font-bold uppercase rounded-md">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-red-600 transition-colors">{job.title}</h3>
                  <div className="flex items-center gap-4 text-sm text-slate-500">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </div>
                  </div>
                  <p className="text-slate-600 text-sm max-w-2xl leading-relaxed">{job.description}</p>
                  
                  <div className="pt-2">
                    <p className="text-xs font-bold text-slate-400 uppercase mb-2">Requirements:</p>
                    <ul className="flex flex-wrap gap-x-4 gap-y-1">
                      {job.requirements.map((req, i) => (
                        <li key={i} className="text-xs text-slate-500 flex items-center gap-1">
                          <div className="w-1 h-1 bg-red-400 rounded-full"></div>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                
                <div className="shrink-0">
                  <a 
                    href="mailto:fujijapaneseacademy@gmail.com" 
                    className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-indigo-900 text-white font-bold rounded-xl hover:bg-red-600 transition-colors w-full md:w-auto"
                  >
                    Apply Now <Send className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="bg-indigo-900 rounded-[3rem] p-10 md:p-20 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-0 w-64 h-64 bg-red-600/10 rounded-full blur-3xl"></div>
          
          <div className="relative z-10 text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Hiring Process</h2>
            <p className="text-indigo-200">Straightforward, transparent, and fair.</p>
          </div>

          <div className="relative z-10 grid md:grid-cols-3 gap-12 text-center">
            {[
              { step: "01", title: "Apply", desc: "Submit your resume and cover letter via email." },
              { step: "02", title: "Interview", desc: "A 30-minute chat about your experience and goals." },
              { step: "03", title: "Demo/Task", desc: "Showcase your skills through a short demo session." }
            ].map((s, idx) => (
              <div key={idx} className="relative group">
                <div className="text-6xl font-black text-white/5 absolute -top-10 left-1/2 -translate-x-1/2 select-none group-hover:text-red-500/10 transition-colors">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-4 relative z-10">{s.title}</h3>
                <p className="text-indigo-200 text-sm leading-relaxed">{s.desc}</p>
                {idx < 2 && (
                  <div className="hidden md:block absolute top-6 -right-6 text-indigo-700">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-20 pt-10 border-t border-white/10 text-center">
             <p className="text-indigo-200 text-sm mb-6">Didn't find a suitable role? We are always looking for great talent!</p>
             <a href="mailto:fujijapaneseacademy@gmail.com" className="text-white font-bold border-b-2 border-red-500 pb-1 hover:text-red-400 transition-colors">
               Send us a general application &rarr;
             </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Careers;
