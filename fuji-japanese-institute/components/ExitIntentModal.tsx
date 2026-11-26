import React, { useState, useEffect, useRef } from 'react';
import { X, ArrowRight } from 'lucide-react';

const STORAGE_KEYS = [
  'fuji_exit_popup_completed',
  'fuji_exit_popup_dismissed',
  'fuji_exit_popup_shown',
  'fuji_demo_claimed',
  'fuji_form_submitted',
  'fuji_enrolled',
];

function isAlreadySilenced(): boolean {
  try {
    for (const key of STORAGE_KEYS) {
      if (localStorage.getItem(key)) return true;
    }
  } catch {
    // In case localStorage is blocked/restricted
  }
  return false;
}

function silencePermanently(): void {
  try {
    for (const key of STORAGE_KEYS) {
      localStorage.setItem(key, 'true');
    }
  } catch {
    // Ignore
  }
}

export default function ExitIntentModal() {
  const [isOpen, setIsOpen] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    // 1. If user already saw it, registered, closed it, or claimed demo, NEVER attach listeners
    if (isAlreadySilenced()) {
      return;
    }

    // 2. Never show on sensitive/auth/admin pages
    const path = window.location.pathname;
    if (['/login', '/signup', '/dashboard', '/admin', '/payment', '/reset-password', '/forgot-password'].includes(path)) {
      return;
    }

    const triggerPopup = () => {
      if (triggeredRef.current || isAlreadySilenced()) return;
      triggeredRef.current = true;
      // Mark permanently immediately so even if refreshed or navigated, it NEVER appears again
      silencePermanently();
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
      setIsOpen(true);
    };

    // User must be browsing for at least 8 seconds before exit intent is eligible
    const mountTime = Date.now();
    const handleMouseLeave = (e: MouseEvent) => {
      if (Date.now() - mountTime < 8000) return;
      if (e.clientY <= 0) {
        triggerPopup();
      }
    };

    // Mobile timeout: only after 90 seconds of browsing, and only once
    const timer = setTimeout(() => {
      triggerPopup();
    }, 90000);

    document.addEventListener('mouseleave', handleMouseLeave);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  const handleDismiss = () => {
    silencePermanently();
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    silencePermanently();
    
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value || '';
    const phone = (form.elements.namedItem('phone') as HTMLInputElement)?.value || '';
    
    const message = `Hi Fuji Japanese Academy, I'm ${name}. I'd like to claim my 1 Free Live Japanese Demo Class. My WhatsApp number is ${phone}.`;
    const whatsappUrl = `https://wa.me/916364924110?text=${encodeURIComponent(message)}`;
    
    setIsOpen(false);
    window.open(whatsappUrl, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={handleDismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Claim Free Demo Class"
    >
      <div 
        className="bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleDismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 z-10 bg-white/90 hover:bg-white rounded-full p-1.5 shadow-sm transition-all"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>
        
        <div className="bg-red-600 p-8 text-center text-white relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />
          <h2 className="text-2xl font-bold mb-2 font-display leading-tight">
            Before You Go — Claim Your 1 Free Live Japanese Demo Class!
          </h2>
          <p className="text-red-100 text-sm">Experience our native-level training methodology.</p>
        </div>
        
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="exit-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input 
                type="text" 
                id="exit-name" 
                name="name" 
                required 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label htmlFor="exit-phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input 
                type="tel" 
                id="exit-phone" 
                name="phone" 
                required 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-red-500 focus:border-red-500 outline-none transition-all"
                placeholder="Enter WhatsApp number"
              />
            </div>
            <button 
              type="submit" 
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 mt-4 cursor-pointer"
            >
              <span>Claim via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
          <p className="text-center text-xs text-gray-400 mt-4">
            No commitment required. Offer valid today.
          </p>
        </div>
      </div>
    </div>
  );
}
