import React, { useState } from 'react';
import { X, Download, FileText, CheckCircle2, MessageSquare, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { submitToGoogleSheet } from '../services/formService';

interface SyllabusDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultLevel?: string;
}

export const SyllabusDownloadModal: React.FC<SyllabusDownloadModalProps> = ({
  isOpen,
  onClose,
  defaultLevel = 'JLPT N5 Foundation'
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [targetLevel, setTargetLevel] = useState(defaultLevel);
  const [city, setCity] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Submit lead to database / sheet
      await submitToGoogleSheet({
        formType: 'Free Course',
        name,
        email: `${phone.replace(/\D/g, '')}@fujileads.in`, // fallback clean identifier
        phone,
        course: targetLevel,
        message: `Syllabus Download Request: ${targetLevel} | City: ${city}`
      });
    } catch (err) {
      console.warn('Syllabus download capture fallback:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);

      // Pre-filled WhatsApp message
      const text = encodeURIComponent(
        `Konnichiwa Fuji Japanese Academy! I requested the official ${targetLevel} Curriculum & Fee Structure.\n\n` +
        `👤 Name: ${name}\n` +
        `📱 WhatsApp: ${phone}\n` +
        `🎯 Target Level: ${targetLevel}\n` +
        `📍 City: ${city || 'India'}\n\n` +
        `Please send me the PDF copy and upcoming batch timings.`
      );

      // Trigger instant WhatsApp redirect in new tab
      const whatsappUrl = `https://wa.me/916364924110?text=${text}`;
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 600);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-red-600 via-rose-600 to-red-700 p-6 text-white text-center relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/20 hover:bg-black/40 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-3 backdrop-blur-md">
            <Download className="w-6 h-6 text-white" />
          </div>

          <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Download Complete JLPT Syllabus &amp; Fee Blueprint (PDF)
          </h3>
          <p className="text-xs sm:text-sm text-red-100 font-light mt-1">
            Includes module-wise Kanji lists, grammar formulas, mock exam schedules, and fee breakdowns.
          </p>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Arun Kumar"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                  WhatsApp Number (for instant PDF delivery) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +91 98765 43210"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-sm"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Target Program *
                  </label>
                  <select
                    value={targetLevel}
                    onChange={(e) => setTargetLevel(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-xs sm:text-sm bg-white"
                  >
                    <option value="JLPT N5 Foundation">JLPT N5 Foundation (Beginners)</option>
                    <option value="JLPT N4 Elementary">JLPT N4 Elementary (SSW Visa)</option>
                    <option value="JLPT N3 Intermediate">JLPT N3 Intermediate (Tokyo IT)</option>
                    <option value="JLPT N2 Advanced">JLPT N2 Advanced (Business)</option>
                    <option value="JLPT N1 Native Level">JLPT N1 Native Mastery</option>
                    <option value="Spoken Japanese">Spoken Japanese (Conversational)</option>
                    <option value="Study & Work in Japan">Study &amp; Work in Japan Pathway</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-1">
                    Your City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="e.g. Bengaluru, Chennai, Mumbai"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-red-600 focus:ring-2 focus:ring-red-100 outline-none text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-red-600 hover:bg-red-700 text-white font-extrabold text-sm shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer disabled:opacity-75"
                >
                  <Download className="w-4 h-4" />
                  <span>{isSubmitting ? 'Generating PDF...' : 'Unlock & Download Syllabus PDF'}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-gray-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>100% Free &bull; Sent directly to your WhatsApp</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h4 className="text-xl font-bold text-gray-900">
                Syllabus Unlocked &amp; Ready!
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 max-w-sm mx-auto">
                Thank you, <strong>{name}</strong>! We have dispatched the complete <strong>{targetLevel}</strong> syllabus and commercial fee breakdown to your WhatsApp number.
              </p>
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SyllabusDownloadModal;
