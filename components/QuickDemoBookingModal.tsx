import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X, CheckCircle2, Calendar, Clock, Video, MapPin, Sparkles,
  ArrowRight, User, Phone, Mail, Copy, Check, MessageSquare, ExternalLink
} from 'lucide-react';
import { submitToGoogleSheet } from '../services/formService';
import { cn } from '../lib/utils';

export interface DemoSlot {
  id: string;
  dayLabel: string;
  timeLabel: string;
  instructor: string;
  badge: string;
}

export const DEMO_SLOTS: DemoSlot[] = [
  {
    id: 'sat-11am',
    dayLabel: 'This Saturday',
    timeLabel: '11:00 AM – 11:45 AM IST',
    instructor: 'Kenji Tanaka Sensei (Tokyo Native)',
    badge: 'Popular Weekend Slot'
  },
  {
    id: 'sun-3pm',
    dayLabel: 'This Sunday',
    timeLabel: '3:00 PM – 3:45 PM IST',
    instructor: 'Priya Sharma Sensei (JLPT N1 Certified)',
    badge: 'Bilingual Pedagogy'
  },
  {
    id: 'wed-730pm',
    dayLabel: 'Upcoming Wednesday',
    timeLabel: '7:30 PM – 8:15 PM IST',
    instructor: 'Hiroshi Sato Sensei (Tokyo Native)',
    badge: 'Weekday Evening'
  }
];

export const DEMO_LEVELS = [
  { id: 'N5', name: 'JLPT N5 (Beginners)', desc: 'Starting from scratch (Kana & basic greetings)' },
  { id: 'N4', name: 'JLPT N4 (Elementary)', desc: 'Basic Kana known; ready for Kanji & verb forms' },
  { id: 'N3', name: 'JLPT N3 (IT & Career Bridge)', desc: 'Aiming for Tokyo software engineering roles' },
  { id: 'Spoken', name: 'Spoken Japanese & Fluency', desc: 'Focus purely on conversational confidence' }
];

interface QuickDemoBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialLevel?: string;
}

export const openDemoModal = (level?: string) => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('fuji:open-demo-modal', { detail: { level } }));
  }
};

export const QuickDemoBookingModal: React.FC<QuickDemoBookingModalProps> = ({
  isOpen,
  onClose,
  initialLevel
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [selectedLevel, setSelectedLevel] = useState<string>(initialLevel || 'N5');
  const [selectedSlotId, setSelectedSlotId] = useState<string>('sat-11am');
  const [selectedMode, setSelectedMode] = useState<'zoom' | 'campus'>('zoom');

  // Form Fields
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [background, setBackground] = useState('Software / IT Engineer');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Keep in sync with initialLevel prop
  useEffect(() => {
    if (initialLevel) {
      const match = DEMO_LEVELS.find(l => initialLevel.toLowerCase().includes(l.id.toLowerCase()));
      if (match) setSelectedLevel(match.id);
    }
  }, [initialLevel]);

  // Reset state when modal reopens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setCopiedLink(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const currentSlot = DEMO_SLOTS.find(s => s.id === selectedSlotId) || DEMO_SLOTS[0];
  const demoZoomUrl = "https://zoom.us/j/84920481928?pwd=FUJI_DEMO_CLASS";

  const handleCopyZoom = () => {
    if (typeof window !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(demoZoomUrl);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const handleStep1Next = () => {
    setStep(2);
  };

  const handleSubmitBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) return;

    setIsSubmitting(true);
    try {
      const formattedMessage = `Demo Class Booking:
- Level: ${selectedLevel}
- Slot: ${currentSlot.dayLabel} at ${currentSlot.timeLabel}
- Sensei: ${currentSlot.instructor}
- Mode: ${selectedMode === 'zoom' ? 'Live Zoom PAN-India' : 'Bengaluru Campus'}
- Background: ${background}`;

      await submitToGoogleSheet({
        formType: 'Demo Inquiry',
        name,
        email,
        phone,
        course: `Free Demo: JLPT ${selectedLevel}`,
        message: formattedMessage
      });

      setStep(3);
    } catch (err) {
      console.warn("Demo submission warning", err);
      // Still show success to student, inquiry is cached offline in submitToGoogleSheet
      setStep(3);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Google Calendar URL generator
  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`Fuji Academy Free Japanese Demo Class (JLPT ${selectedLevel})`);
    const details = encodeURIComponent(`Live Japanese Demo Session with ${currentSlot.instructor}.\nZoom Link: ${demoZoomUrl}\nCampus: Vittasandra Cross, Electronic City Phase 1, Bengaluru`);
    const location = encodeURIComponent(selectedMode === 'zoom' ? demoZoomUrl : "Fuji Japanese Academy, Electronic City Phase 1, Bengaluru");
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${location}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden my-auto"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-fuji-indigo via-[#241e54] to-[#171338] p-6 text-white relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300 w-fit mb-2">
            <Sparkles className="w-3.5 h-3.5" /> 100% Free • No Payment Required
          </div>
          <h3 className="text-xl sm:text-2xl font-display font-bold">
            Reserve Your Free Live Demo Class
          </h3>
          <p className="text-gray-300 text-xs sm:text-sm mt-1">
            Experience our interactive teaching method, practice speaking with a native Sensei, and receive your personalized study roadmap.
          </p>

          {/* Stepper Dots */}
          <div className="flex items-center gap-2 mt-4">
            <div className={cn("h-1.5 rounded-full transition-all duration-300", step >= 1 ? "w-8 bg-amber-400" : "w-3 bg-white/20")} />
            <div className={cn("h-1.5 rounded-full transition-all duration-300", step >= 2 ? "w-8 bg-amber-400" : "w-3 bg-white/20")} />
            <div className={cn("h-1.5 rounded-full transition-all duration-300", step === 3 ? "w-8 bg-emerald-400" : "w-3 bg-white/20")} />
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {step === 1 && (
            <div className="space-y-6">
              {/* Level Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-fuji-slate/70 mb-2.5">
                  1. Select Target Japanese Level
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {DEMO_LEVELS.map((lvl) => {
                    const isSelected = selectedLevel === lvl.id;
                    return (
                      <button
                        key={lvl.id}
                        type="button"
                        onClick={() => setSelectedLevel(lvl.id)}
                        className={cn(
                          "p-3 rounded-2xl border-2 text-left transition-all cursor-pointer",
                          isSelected
                            ? "border-fuji-red bg-red-50/30 shadow-sm"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        )}
                      >
                        <span className="text-xs font-bold text-fuji-indigo block">{lvl.name}</span>
                        <span className="text-[11px] text-fuji-slate/70 block mt-0.5 leading-tight">{lvl.desc}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Demo Slot Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-fuji-slate/70 mb-2.5">
                  2. Choose Upcoming Demo Slot
                </label>
                <div className="space-y-2.5">
                  {DEMO_SLOTS.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;
                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => setSelectedSlotId(slot.id)}
                        className={cn(
                          "w-full p-3.5 rounded-2xl border-2 text-left transition-all flex items-center justify-between gap-3 cursor-pointer",
                          isSelected
                            ? "border-fuji-indigo bg-fuji-indigo/5 shadow-sm"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0",
                            isSelected ? "bg-fuji-indigo text-white" : "bg-gray-100 text-fuji-slate"
                          )}>
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-bold text-fuji-indigo">{slot.dayLabel}</span>
                              <span className="text-[10px] bg-red-100 text-fuji-red px-2 py-0.2 rounded-full font-bold">
                                {slot.badge}
                              </span>
                            </div>
                            <span className="text-xs text-fuji-slate font-medium block mt-0.5">{slot.timeLabel}</span>
                            <span className="text-[11px] text-fuji-slate/60 block">{slot.instructor}</span>
                          </div>
                        </div>

                        <div className={cn(
                          "w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                          isSelected ? "border-fuji-indigo" : "border-gray-300"
                        )}>
                          {isSelected && <div className="w-2 h-2 rounded-full bg-fuji-indigo" />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mode Selector */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-fuji-slate/70 mb-2.5">
                  3. Select Attendance Mode
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setSelectedMode('zoom')}
                    className={cn(
                      "p-3 rounded-xl border-2 text-center transition-all cursor-pointer flex items-center justify-center gap-2 text-xs font-bold",
                      selectedMode === 'zoom'
                        ? "border-fuji-indigo bg-fuji-indigo text-white shadow-sm"
                        : "border-gray-200 bg-white text-fuji-slate hover:bg-gray-50"
                    )}
                  >
                    <Video className="w-4 h-4" />
                    <span>Live Zoom PAN-India</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedMode('campus')}
                    className={cn(
                      "p-3 rounded-xl border-2 text-center transition-all cursor-pointer flex items-center justify-center gap-2 text-xs font-bold",
                      selectedMode === 'campus'
                        ? "border-fuji-indigo bg-fuji-indigo text-white shadow-sm"
                        : "border-gray-200 bg-white text-fuji-slate hover:bg-gray-50"
                    )}
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Bengaluru Campus</span>
                  </button>
                </div>
              </div>

              {/* Next Button */}
              <button
                type="button"
                onClick={handleStep1Next}
                className="w-full py-3.5 bg-fuji-red hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-fuji-red/20 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Attendee Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {step === 2 && (
            <form onSubmit={handleSubmitBooking} className="space-y-4">
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-gray-200 text-xs flex items-center justify-between">
                <div>
                  <span className="font-bold text-fuji-indigo block">Selected Slot: {currentSlot.dayLabel}</span>
                  <span className="text-fuji-slate/70">{currentSlot.timeLabel} • {selectedMode === 'zoom' ? 'Live Zoom' : 'Bengaluru Campus'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="text-fuji-red font-bold text-xs underline cursor-pointer"
                >
                  Change
                </button>
              </div>

              <div>
                <label className="block text-xs font-bold text-fuji-slate/80 mb-1">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Rahul Verma"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-fuji-indigo focus:ring-1 focus:ring-fuji-indigo outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-fuji-slate/80 mb-1">
                  WhatsApp Number * (For Zoom link reminder)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-fuji-indigo focus:ring-1 focus:ring-fuji-indigo outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-fuji-slate/80 mb-1">
                  Email Address * (For calendar invite)
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="rahul.verma@example.com"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-fuji-indigo focus:ring-1 focus:ring-fuji-indigo outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-fuji-slate/80 mb-1">
                  Current Background / Learning Goal
                </label>
                <select
                  value={background}
                  onChange={(e) => setBackground(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:border-fuji-indigo focus:ring-1 focus:ring-fuji-indigo outline-none bg-white"
                >
                  <option value="Software / IT Engineer">Software / IT Engineer (Targeting Tokyo Tech Jobs)</option>
                  <option value="College Student">College Student / Recent Graduate</option>
                  <option value="Healthcare SSW Candidate">Healthcare &amp; Nursing (SSW Visa)</option>
                  <option value="Anime & Manga Fan">Anime, Manga &amp; Japanese Culture Enthusiast</option>
                  <option value="Corporate / Business">Corporate Executive / Business Liaison</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-3 px-4 border border-gray-200 rounded-xl text-xs font-bold text-fuji-slate hover:bg-gray-50"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3.5 bg-fuji-red hover:bg-red-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-fuji-red/20 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <span>Confirming Reservation...</span>
                  ) : (
                    <>
                      <span>Confirm Free Demo Seat</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          )}

          {step === 3 && (
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  Seat Confirmed!
                </span>
                <h4 className="text-2xl font-display font-bold text-fuji-indigo mt-2">
                  We look forward to seeing you, {name}!
                </h4>
                <p className="text-xs sm:text-sm text-fuji-slate/70 mt-1 max-w-md mx-auto">
                  A calendar invite and WhatsApp reminder with your joining link have been sent to <strong>{phone}</strong>.
                </p>
              </div>

              {/* Demo Session Card */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-gray-200 text-left space-y-3">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-gray-200">
                  <span className="font-bold text-fuji-indigo">Level: JLPT {selectedLevel} Demo</span>
                  <span className="text-fuji-red font-bold">{currentSlot.dayLabel} • {currentSlot.timeLabel}</span>
                </div>

                <div className="text-xs text-fuji-slate/80 space-y-1">
                  <div><strong>Instructor:</strong> {currentSlot.instructor}</div>
                  <div><strong>Format:</strong> {selectedMode === 'zoom' ? 'Interactive Zoom Breakout Meeting' : 'Vittasandra Cross Campus, Electronic City Phase 1'}</div>
                </div>

                {selectedMode === 'zoom' && (
                  <div className="pt-2">
                    <label className="block text-[11px] font-bold text-fuji-slate/60 mb-1">Live Meeting URL:</label>
                    <div className="flex items-center gap-2 p-2 bg-white rounded-xl border border-gray-200 text-xs">
                      <span className="font-mono text-fuji-indigo truncate flex-1">{demoZoomUrl}</span>
                      <button
                        type="button"
                        onClick={handleCopyZoom}
                        className="px-2.5 py-1 bg-gray-100 hover:bg-gray-200 text-fuji-slate rounded-lg font-bold flex items-center gap-1 cursor-pointer"
                      >
                        {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedLink ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Sync CTAs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <a
                  href={getGoogleCalendarUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-white hover:bg-gray-50 text-fuji-indigo border border-gray-200 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <Calendar className="w-4 h-4 text-fuji-red" />
                  <span>Add to Google Calendar</span>
                </a>

                <a
                  href="https://chat.whatsapp.com/CsrjvewBVU8Iy8NOVpR913"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Join Demo WhatsApp Group</span>
                </a>
              </div>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 text-xs font-semibold text-fuji-slate hover:text-fuji-indigo transition-colors cursor-pointer"
                >
                  Done &amp; Return to Page
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default QuickDemoBookingModal;
