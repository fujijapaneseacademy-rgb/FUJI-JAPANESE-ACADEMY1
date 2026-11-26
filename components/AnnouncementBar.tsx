import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AnnouncementBarProps {
  onDismiss?: () => void;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ onDismiss }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        const isDismissed = sessionStorage.getItem('fuji_announcement_dismissed');
        if (!isDismissed) {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
    } catch {
      // In case of restricted/headless/sandbox mode, show safely
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsVisible(false);
    try {
      if (typeof window !== 'undefined' && typeof sessionStorage !== 'undefined') {
        sessionStorage.setItem('fuji_announcement_dismissed', 'true');
      }
    } catch {
      // Ignore storage restrictions
    }
    if (onDismiss) onDismiss();
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.aside
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.25 }}
          aria-label="New Batches Announcement"
          className="relative bg-gradient-to-r from-fuji-indigo via-[#232042] to-fuji-indigo text-white text-xs md:text-sm py-2 px-4 shadow-sm z-50 overflow-hidden border-b border-white/10"
        >
          <div className="container mx-auto flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap mx-auto text-center justify-center">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-fuji-red text-white uppercase tracking-wider animate-pulse">
                <Sparkles className="w-3 h-3" /> New Batches
              </span>
              <span className="text-gray-200 font-medium">
                JLPT N5–N1 Weekday &amp; Weekend Batches Starting Soon | Offline (Bengaluru) &bull; Live Online (Pan-India) &bull; Japan Immersion
              </span>
              <Link
                to="/enquire"
                className="inline-flex items-center gap-1 font-semibold text-amber-300 hover:text-amber-200 underline underline-offset-2 ml-1 transition-colors"
              >
                Book Free Demo <ArrowRight className="w-3.5 h-3.5 inline" />
              </Link>
            </div>

            <button
              type="button"
              onClick={handleDismiss}
              aria-label="Dismiss announcement"
              className="p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors flex-shrink-0 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
};

export default AnnouncementBar;
