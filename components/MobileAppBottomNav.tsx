import React from 'react';
import { Phone, MessageSquare, GraduationCap } from 'lucide-react';

export interface MobileAppBottomNavProps {
  onOpenEnrollment: () => void;
}

export const MobileAppBottomNav: React.FC<MobileAppBottomNavProps> = ({ onOpenEnrollment }) => {
  return (
    <aside
      aria-label="Mobile Quick Conversion Bar"
      className="block md:hidden fixed bottom-0 left-0 right-0 z-50 bg-slate-950/95 backdrop-blur-xl border-t border-slate-800 shadow-[0_-4px_25px_rgba(0,0,0,0.3)] pb-[env(safe-area-inset-bottom,6px)] pt-2 px-3"
    >
      <div className="max-w-md mx-auto grid grid-cols-3 gap-2 py-1">
        {/* 1. Call Helpline */}
        <a
          href="tel:+916364924110"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 border border-slate-800 text-white hover:bg-slate-800 active:scale-95 transition-all"
        >
          <Phone className="w-4 h-4 text-amber-400 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">Call Helpline</span>
        </a>

        {/* 2. WhatsApp Sensei */}
        <a
          href="https://wa.me/916364924110?text=Konnichiwa%20Sensei,%20I%20would%20like%20to%20know%20about%20upcoming%20Japanese%20batches%20and%20attend%20a%20free%20demo."
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-600/30 active:scale-95 transition-all"
        >
          <MessageSquare className="w-4 h-4 text-emerald-400 mb-0.5" />
          <span className="text-[10px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* 3. Free Demo */}
        <button
          type="button"
          onClick={onOpenEnrollment}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-red-600 text-white hover:bg-red-700 active:scale-95 transition-all shadow-md shadow-red-600/30 cursor-pointer"
        >
          <GraduationCap className="w-4 h-4 text-white mb-0.5" />
          <span className="text-[10px] font-extrabold tracking-tight">Free Demo</span>
        </button>
      </div>
    </aside>
  );
};

export default MobileAppBottomNav;
