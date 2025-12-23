
import React from 'react';
import { Mail, CheckCircle, ShieldCheck, Zap, ExternalLink } from 'lucide-react';

const ScriptSetup: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-stone-50 min-h-screen">
      <div className="container mx-auto px-4 max-w-4xl">
        
        <div className="mb-8 bg-indigo-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
          <div className="relative z-10">
            <h1 className="text-3xl font-extrabold mb-4 flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400" />
              Formspree Integration Active
            </h1>
            <p className="text-indigo-100 mb-4 leading-relaxed">
              We have migrated from Google Sheets to <strong>Formspree</strong> for higher reliability and instant email notifications.
            </p>
            <div className="inline-block bg-white/10 px-3 py-1.5 rounded-lg border border-white/20 text-[10px] font-mono break-all max-w-full">
              ID: mrezrvjk
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Your Forms are Live!</h2>
            <p className="text-slate-600 max-w-md">
              All submissions from the <strong>Enrollment Modal</strong> and <strong>Contact Page</strong> are now being sent directly to your Formspree dashboard and your registered email.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 w-full pt-6">
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                <div className="flex items-center gap-2 text-indigo-600 font-bold mb-2">
                  <Zap className="w-4 h-4" />
                  Instant Delivery
                </div>
                <p className="text-xs text-slate-500">Submissions reach your inbox in seconds without any complex Google Script permissions.</p>
              </div>
              <div className="p-6 bg-slate-50 rounded-2xl border border-slate-100 text-left">
                <div className="flex items-center gap-2 text-indigo-600 font-bold mb-2">
                  <Mail className="w-4 h-4" />
                  Email Alerts
                </div>
                <p className="text-xs text-slate-500">You will receive an automated email for every new lead or inquiry.</p>
              </div>
            </div>

            <a 
              href="https://formspree.io/f/mrezrvjk" 
              target="_blank" 
              rel="noopener noreferrer"
              className="mt-8 px-8 py-3 bg-indigo-900 text-white rounded-full font-bold hover:bg-indigo-800 transition-all flex items-center gap-2"
            >
              View Dashboard <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptSetup;
