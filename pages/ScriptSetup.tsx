
import React from 'react';
import { Mail, CheckCircle, ShieldCheck, Zap, ExternalLink, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

const ScriptSetup: React.FC = () => {
  return (
    <div className="pt-24 min-h-screen bg-fuji-light">
      <div className="container mx-auto px-4 max-w-4xl py-20">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 bg-fuji-indigo rounded-[2rem] p-10 text-white shadow-premium relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-fuji-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="relative z-10">
            <h1 className="text-3xl font-display font-bold text-white mb-4 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              System Integration Active
            </h1>
            <p className="text-white/70 mb-6 leading-relaxed max-w-2xl font-light">
              We have migrated from Google Sheets to <strong>Formspree</strong> for higher reliability, instant email notifications, and better spam protection.
            </p>
            <div className="inline-flex items-center gap-3 bg-white/10 px-4 py-2 rounded-xl border border-white/20 backdrop-blur-md">
              <span className="text-xs uppercase tracking-widest text-white/50 font-bold">Endpoint ID</span>
              <span className="font-mono text-fuji-red font-bold">mrezrvjk</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-[2.5rem] shadow-premium border border-fuji-indigo/5 p-10 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-fuji-indigo via-fuji-red to-fuji-indigo opacity-50"></div>

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center mb-2 relative">
              <div className="absolute inset-0 bg-emerald-100 rounded-full animate-ping opacity-20"></div>
              <CheckCircle className="w-12 h-12 text-emerald-600 relative z-10" />
            </div>

            <h2 className="text-3xl font-display font-bold text-fuji-indigo">Your Forms are Live!</h2>
            <p className="text-fuji-slate/70 max-w-lg leading-relaxed">
              All submissions from the <strong>Enrollment Modal</strong> and <strong>Contact Page</strong> are now being securely routed to your dashboard.
            </p>

            <div className="grid md:grid-cols-2 gap-6 w-full pt-8">
              <div className="p-8 bg-fuji-light rounded-[2rem] border border-transparent hover:border-fuji-indigo/10 transition-colors text-left group">
                <div className="flex items-center gap-3 text-fuji-indigo font-bold mb-3 group-hover:text-fuji-red transition-colors">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-fuji-red"><Zap className="w-4 h-4" /></div>
                  Instant Delivery
                </div>
                <p className="text-sm text-fuji-slate/60 leading-relaxed">Submissions reach your inbox in seconds without any complex Google Script permissions or delays.</p>
              </div>
              <div className="p-8 bg-fuji-light rounded-[2rem] border border-transparent hover:border-fuji-indigo/10 transition-colors text-left group">
                <div className="flex items-center gap-3 text-fuji-indigo font-bold mb-3 group-hover:text-fuji-red transition-colors">
                  <div className="p-2 bg-white rounded-lg shadow-sm text-fuji-red"><Mail className="w-4 h-4" /></div>
                  Email Alerts
                </div>
                <p className="text-sm text-fuji-slate/60 leading-relaxed">You will receive an automated, formatted email for every new lead, enrollment, or inquiry.</p>
              </div>
            </div>

            <a
              href="https://formspree.io/f/mrezrvjk"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 px-8 py-4 bg-fuji-indigo text-white rounded-xl font-bold hover:bg-fuji-red transition-all flex items-center gap-2 shadow-lg hover:shadow-fuji-red/20 hover:-translate-y-1"
            >
              <Settings className="w-4 h-4" /> Open Configuration <ExternalLink className="w-4 h-4 opacity-50" />
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ScriptSetup;
