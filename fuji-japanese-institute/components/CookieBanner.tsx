import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ShieldCheck, Cookie, X, Settings2 } from 'lucide-react';
import { updateGoogleConsent } from '../src/lib/analytics';

const COOKIE_STORAGE_KEY = 'fuji_cookie_consent_preferences';

export interface CookieBannerProps {
  onVisibilityChange?: (isVisible: boolean) => void;
}

export const CookieBanner: React.FC<CookieBannerProps> = ({ onVisibilityChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  const [preferences, setPreferences] = useState({
    strictlyNecessary: true,
    functional: true,
    marketing: true
  });

  useEffect(() => {
    try {
      const consent = localStorage.getItem(COOKIE_STORAGE_KEY);
      if (!consent) {
        // Small delay for smooth entry
        const t = setTimeout(() => {
          setIsVisible(true);
          onVisibilityChange?.(true);
        }, 1200);
        return () => clearTimeout(t);
      }
    } catch (e) {
      // Ignore private browsing storage errors
    }
  }, [onVisibilityChange]);

  const saveConsent = (prefs: { strictlyNecessary: boolean, functional: boolean, marketing: boolean }) => {
    try {
      localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({ ...prefs, timestamp: Date.now() }));
    } catch {}
      updateGoogleConsent(Boolean(prefs.functional || prefs.marketing));
    setIsVisible(false);
    setShowPreferences(false);
    onVisibilityChange?.(false);
  };

  const acceptAll = () => saveConsent({ strictlyNecessary: true, functional: true, marketing: true });
  const rejectNonEssential = () => saveConsent({ strictlyNecessary: true, functional: false, marketing: false });
  const saveCustom = () => saveConsent(preferences);

  if (!isVisible) return null;

  return (
    <>
      <aside
        aria-label="Cookie and Privacy Consent"
        className={`fixed bottom-20 lg:bottom-6 left-4 right-4 md:left-24 md:right-auto md:max-w-md z-[70] bg-white text-fuji-indigo rounded-3xl p-5 shadow-2xl border border-gray-200/90 pointer-events-auto animate-in fade-in slide-in-from-bottom-5 duration-300 ${showPreferences ? 'hidden' : 'block'}`}
      >
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-2xl bg-fuji-red/10 text-fuji-red shrink-0 mt-0.5">
            <Cookie className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-2 mb-1">
              <h4 className="font-display font-bold text-sm text-fuji-indigo flex items-center gap-1.5">
                <span>We Value Your Privacy</span>
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
              </h4>
              <button
                type="button"
                onClick={rejectNonEssential}
                className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 cursor-pointer"
                title="Close and accept essential cookies only"
                aria-label="Close cookie banner"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              We use cookies to enhance your learning experience, analyze site performance, and serve relevant content in accordance with our{' '}
              <NavLink to="/privacy-policy" className="text-fuji-red underline hover:text-fuji-darkRed font-semibold">
                Privacy Policy
              </NavLink>.
            </p>

            <div className="mt-3.5 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={acceptAll}
                  type="button"
                  className="flex-1 py-2 px-3 text-xs font-bold rounded-xl bg-fuji-red text-white hover:bg-fuji-darkRed shadow-sm hover:shadow transition-all active:scale-95 cursor-pointer"
                  aria-label="Accept all cookies"
                >
                  Accept All
                </button>
                <button
                  onClick={rejectNonEssential}
                  type="button"
                  className="flex-1 py-2 px-3 text-xs font-semibold rounded-xl bg-gray-100 text-gray-700 hover:bg-gray-200 transition-all cursor-pointer"
                  aria-label="Reject non-essential cookies"
                >
                  Reject Non-Essential
                </button>
              </div>
              <button
                onClick={() => setShowPreferences(true)}
                type="button"
                className="py-1.5 px-3 flex items-center justify-center gap-1.5 text-xs font-medium text-gray-500 hover:text-gray-700 transition-all cursor-pointer"
                aria-label="Customize cookie preferences"
              >
                <Settings2 className="w-3.5 h-3.5" />
                Customize Preferences
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Preferences Drawer/Modal */}
      {showPreferences && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 shadow-2xl border border-gray-100 flex flex-col gap-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-bold text-lg text-fuji-indigo">Cookie Preferences</h3>
              <button 
                onClick={() => setShowPreferences(false)}
                className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Close preferences"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-fuji-indigo">Strictly Necessary</h4>
                  <p className="text-xs text-gray-500 mt-1">Always active. Required for the website to function securely.</p>
                </div>
                <div className="relative inline-flex items-center cursor-not-allowed">
                  <div className="w-9 h-5 bg-fuji-red rounded-full opacity-60"></div>
                  <div className="absolute left-[18px] top-[2px] bg-white w-4 h-4 rounded-full transition-transform"></div>
                </div>
              </div>
              
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-fuji-indigo">Functional & Analytics</h4>
                  <p className="text-xs text-gray-500 mt-1">Helps us understand how visitors interact with our website.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setPreferences(p => ({ ...p, functional: !p.functional }))}
                  className="relative inline-flex items-center cursor-pointer outline-none"
                  aria-label="Toggle Functional and Analytics cookies"
                >
                  <div className={`w-9 h-5 rounded-full transition-colors ${preferences.functional ? 'bg-fuji-red' : 'bg-gray-300'}`}></div>
                  <div className={`absolute top-[2px] bg-white w-4 h-4 rounded-full transition-transform ${preferences.functional ? 'left-[18px]' : 'left-[2px]'}`}></div>
                </button>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="font-semibold text-sm text-fuji-indigo">Marketing & Personalization</h4>
                  <p className="text-xs text-gray-500 mt-1">Used to deliver personalized advertisements and content.</p>
                </div>
                <button 
                  type="button"
                  onClick={() => setPreferences(p => ({ ...p, marketing: !p.marketing }))}
                  className="relative inline-flex items-center cursor-pointer outline-none"
                  aria-label="Toggle Marketing and Personalization cookies"
                >
                  <div className={`w-9 h-5 rounded-full transition-colors ${preferences.marketing ? 'bg-fuji-red' : 'bg-gray-300'}`}></div>
                  <div className={`absolute top-[2px] bg-white w-4 h-4 rounded-full transition-transform ${preferences.marketing ? 'left-[18px]' : 'left-[2px]'}`}></div>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={saveCustom}
                className="flex-1 py-2.5 px-4 font-bold text-sm bg-fuji-red text-white rounded-xl hover:bg-fuji-darkRed transition-colors"
                aria-label="Save my cookie preferences"
              >
                Save My Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieBanner;
