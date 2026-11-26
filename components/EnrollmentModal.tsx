import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { X, CheckCircle, Loader2, AlertCircle, ArrowRight, ArrowLeft, ShieldCheck, Sparkles, CreditCard, CalendarCheck, Copy, Check, MessageSquare } from 'lucide-react';
import { EnrollmentStatus } from '../types';
import { submitToGoogleSheet } from '../services/formService';
import { COURSES as MOCK_COURSES } from '../constants';
import { handlePayment } from '../services/cashfreeService';
import { supabase } from '../src/lib/supabaseClient';
import { Course } from '../types';
import { trackEvent } from '../src/lib/analytics';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseTitle?: string;
}

const EnrollmentModal: React.FC<EnrollmentModalProps> = ({ isOpen, onClose, courseTitle }) => {
  /* State */
  const [courses, setCourses] = useState<Course[]>(MOCK_COURSES);
  const [status, setStatus] = useState<EnrollmentStatus>('idle');
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);
  const [enrollmentMode, setEnrollmentMode] = useState<'demo' | 'pay'>('demo');
  const [agreedTerms, setAgreedTerms] = useState(true);
  const [stepError, setStepError] = useState('');
  const [paymentError, setPaymentError] = useState('');
  const [showDirectPayDetails, setShowDirectPayDetails] = useState(false);
  const [copiedUpiModal, setCopiedUpiModal] = useState(false);
  const [copiedAccModal, setCopiedAccModal] = useState(false);
  const [copiedIfscModal, setCopiedIfscModal] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyName: '',
    teamSize: '5-15 employees',
    course: courseTitle || 'JLPT N5 - Beginners Foundation',
    modePreference: 'Live Online Classroom',
    message: ''
  });

  // Body scroll lock & Escape key handling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  // Reset step when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(1);
      setStatus('idle');
      setStepError('');
      setPaymentError('');
      if (courseTitle) {
        setFormData(prev => ({ ...prev, course: courseTitle }));
      }
    }
  }, [isOpen, courseTitle]);

  // Fetch dynamic courses on mount
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const { data } = await supabase.from('courses').select('*');
        if (data && data.length > 0) {
          setCourses(() => {
            const existingTitles = new Set(MOCK_COURSES.map(c => c.title));
            const newUniqueCourses = data.filter(c => !existingTitles.has(c.title));
            return [...MOCK_COURSES, ...newUniqueCourses];
          });
        }
      } catch (err) {
        console.error('Error loading dynamic courses', err);
      }
    };
    fetchCourses();
  }, []);

  if (!isOpen) return null;

  // Selected course details
  const selectedCourseData = courses.find(c => 
    c.title === formData.course || 
    (formData.course && c.title.toLowerCase().startsWith(formData.course.toLowerCase())) ||
    (formData.course && formData.course.toLowerCase().includes(c.jlptLevel ? c.jlptLevel.toLowerCase() : '____'))
  ) || courses[0];

  const isCorporate = (formData.course || '').toLowerCase().includes('corporate') || !!formData.companyName;
  
  // Calculate price in paise
  let priceInPaise = 0;
  if (selectedCourseData && selectedCourseData.price) {
    const numericPrice = parseInt(selectedCourseData.price.replace(/[^\d]/g, ''), 10);
    if (!isNaN(numericPrice) && numericPrice > 0) {
      priceInPaise = numericPrice * 100;
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (stepError) setStepError('');
  };

  // Step 1: Validate details, immediately dispatch lead to admin, and reveal course fee & options
  const handleProceedToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setStepError('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setStepError('Please enter a valid email address.');
      return;
    }
    if (!formData.phone.trim() || formData.phone.replace(/[^\d]/g, '').length < 8) {
      setStepError('Please enter a valid phone/WhatsApp number (at least 8 digits).');
      return;
    }
    setStepError('');
    setCurrentStep(2);
  };

  const handleProceedToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedTerms) {
      setStepError('Please agree to the Terms & Conditions to continue.');
      return;
    }

    const isCorporate = (formData.course || '').toLowerCase().includes('corporate');

    submitToGoogleSheet({
      formType: isCorporate ? 'Corporate' : 'Enrollment Lead',
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      course: formData.course,
      courseId: selectedCourseData?.id,
      companyName: formData.companyName,
      teamSize: formData.teamSize,
      message: `${formData.modePreference} | ${formData.companyName ? `Company: ${formData.companyName} | Size: ${formData.teamSize || ''} | ` : ''}${formData.message || ''}`
    }).catch(err => {
      console.warn('Non-blocking lead pre-capture:', err);
    });

    try {
      localStorage.setItem('fuji_form_submitted', 'true');
      localStorage.setItem('fuji_exit_popup_completed', 'true');
      localStorage.setItem('fuji_exit_popup_dismissed', 'true');
      localStorage.setItem('fuji_exit_popup_shown', 'true');
    } catch {
      // Ignore
    }

    setStepError('');
    trackEvent('generate_lead', {
      course: formData.course,
      mode: isCorporate ? 'corporate_inquiry' : 'enrollment_step1'
    });
    setCurrentStep(3);
  };


  // Step 2: Final submission (either Pay online or Book Demo / Request Proposal)
  const handleFinalSubmit = async (chosenMode: 'demo' | 'pay') => {
    setEnrollmentMode(chosenMode);
    setStatus('submitting');
    const isCorporate = (formData.course || '').toLowerCase().includes('corporate');

    const processSubmission = async (paymentDetails?: { paymentId: string; amountPaid: string }) => {
      const success = await submitToGoogleSheet({
        formType: isCorporate ? 'Corporate' : 'Enrollment',
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        companyName: formData.companyName,
        teamSize: formData.teamSize,
        course: formData.course,
        courseId: selectedCourseData?.id,
        message: `${formData.modePreference} | ${formData.companyName ? `Company: ${formData.companyName} | Team Size: ${formData.teamSize || ''} | ` : ''}${formData.message || ''}`,
        ...paymentDetails
      });

      if (success) {
        setStatus('success');
        if (paymentDetails) {
          trackEvent('purchase_complete', {
            course: formData.course,
            amount: paymentDetails.amountPaid,
            paymentId: paymentDetails.paymentId
          });
        } else {
          trackEvent('demo_class_booked', {
            course: formData.course,
            learning_mode: formData.modePreference
          });
        }
        trackEvent('generate_lead', {
          course: formData.course,
          mode: isCorporate ? 'corporate_final' : chosenMode
        });
      } else {
        setStatus('error');
      }
    };

    // Trigger payment flow ONLY if student chose 'pay' mode and course has a valid price
    if (chosenMode === 'pay' && priceInPaise > 0) {
      trackEvent('purchase_started', {
        course: formData.course,
        amount: priceInPaise / 100
      });

      await handlePayment({
        courseId: selectedCourseData?.id || formData.course.toLowerCase().replace(/\s+/g, '-'),
        courseName: formData.course,
        amount: priceInPaise,
        customer: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        onSuccess: (response) => {
          processSubmission({
            paymentId: response.payment_id || response.order_id || response.razorpay_payment_id || 'cf_paid',
            amountPaid: selectedCourseData?.price || ''
          });
        },
        onFailure: (error) => {
          const errText = typeof error === 'string' ? error : 'Online payment could not be processed.';
          setPaymentError(errText);
          setShowDirectPayDetails(true); // Automatically expand UPI / Bank Transfer options so student is never stuck!
          setStatus('idle');
        }
      });
    } else {
      // Free demo class or corporate proposal request
      await processSubmission();
    }
  };

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-4 bg-fuji-indigo/80 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="bg-white rounded-[2rem] w-full max-w-lg overflow-hidden shadow-2xl border border-white/20 my-auto animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 sm:p-6 border-b border-fuji-indigo/5 bg-fuji-light">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-fuji-red animate-pulse" />
            <div>
              <h3 className="text-lg sm:text-xl font-display font-bold text-fuji-indigo leading-tight">
                {status === 'success' ? 'Arigatou Gozaimasu!' : currentStep === 1 ? 'Start Learning Today' : currentStep === 2 ? 'Course Selection' : 'Course Fee & Registration'}
              </h3>
              {status !== 'success' && (
                <span className="text-[11px] font-semibold text-fuji-slate/60">
                  Step {currentStep} of 3: {currentStep === 1 ? 'Your Details' : currentStep === 2 ? 'Course Selection' : 'Fee Breakdown & Options'}
                </span>
              )}
            </div>
          </div>
          <button 
            type="button"
            onClick={onClose} 
            className="text-fuji-slate/40 hover:text-fuji-red transition-colors p-1.5 hover:bg-fuji-red/5 rounded-full"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        {status !== 'success' && status !== 'error' && (
        <div className="px-6 pt-6 pb-2">
          <div className="flex items-center justify-between relative max-w-sm mx-auto">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-100 rounded-full -z-10"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-fuji-red rounded-full -z-10 transition-all duration-500" style={{ width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%' }}></div>
            
            {[
              { step: 1, label: 'Profile' },
              { step: 2, label: 'Course' },
              { step: 3, label: 'Confirm' }
            ].map((s) => {
              const isActive = currentStep === s.step;
              const isCompleted = currentStep > s.step;
              return (
                <div key={s.step} className="flex flex-col items-center gap-1.5 relative bg-white px-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 border-2 ${
                    isActive ? 'border-fuji-red bg-white text-fuji-red scale-110 shadow-sm' : 
                    isCompleted ? 'border-fuji-red bg-fuji-red text-white' : 
                    'border-gray-200 bg-white text-gray-400'
                  }`}>
                    {isCompleted ? <Check className="w-4 h-4" /> : s.step}
                  </div>
                  <span className={`text-[10px] font-bold uppercase tracking-wider ${isActive ? 'text-fuji-indigo' : isCompleted ? 'text-fuji-red' : 'text-gray-400'}`}>
                    {s.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        )}

        {/* Modal Body */}
        <div className="p-6 sm:p-8">
          {status === 'success' ? (
            /* Success View */
            <div className="text-center py-2">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-emerald-100">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10" />
              </div>

              <div className="inline-block px-3 py-1 bg-emerald-100/70 text-emerald-800 text-[11px] font-bold rounded-full uppercase tracking-wider mb-2">
                {isCorporate ? '🏢 Enterprise Request Received' : '🎌 Arigatou Gozaimasu!'}
              </div>

              <h3 className="text-xl sm:text-2xl font-display font-black text-fuji-indigo mb-2">
                {isCorporate
                  ? 'Corporate Proposal Requested!'
                  : enrollmentMode === 'pay'
                    ? 'Registration & Payment Successful!'
                    : 'Demo Class Reservation Confirmed!'}
              </h3>
              
              <div className="text-fuji-slate/80 text-xs sm:text-sm leading-relaxed mb-6 font-light">
                {isCorporate ? (
                  <>
                    <p>Konnichiwa <strong>{formData.name}</strong>, thank you for requesting an enterprise proposal for {formData.companyName ? <strong>{formData.companyName}</strong> : 'your organization'}.</p>
                    <p className="mt-2 text-slate-500 text-xs">
                      Our Corporate Training Director will connect with you within 24 hours with a tailored syllabus, bilingual sensei profiles, and an official corporate quotation.
                    </p>
                  </>
                ) : (
                  <>
                    <p>{formData.name ? <>Konnichiwa <strong>{formData.name}</strong>, your details for <strong>{formData.course}</strong> have been confirmed.</> : "We have received your registration."}</p>
                    <p className="mt-1 text-slate-500 text-xs">
                      {enrollmentMode === 'pay'
                        ? 'Your student portal access credentials have been dispatched to your email.'
                        : 'Our sensei team will connect with you via WhatsApp/phone with your batch joining link.'}
                    </p>
                  </>
                )}
              </div>

              {/* Quick Action Buttons */}
              <div className="flex flex-col gap-2.5">
                {isCorporate ? (
                  <>
                    <a
                      href={`https://wa.me/916364924110?text=${encodeURIComponent(`Hi Fuji Japanese Academy, I have submitted an enterprise corporate training inquiry for ${formData.companyName || formData.name}. Please share proposal details.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Chat with Corporate Desk on WhatsApp</span>
                    </a>

                    <a
                      href="tel:+916364924110"
                      className="w-full py-3.5 bg-fuji-indigo hover:bg-fuji-indigo/90 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <span>Direct Corporate Helpline: +91 63649 24110</span>
                    </a>
                  </>
                ) : enrollmentMode === 'pay' ? (
                  <>
                    <a
                      href="https://chat.whatsapp.com/CsrjvewBVU8Iy8NOVpR913"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                    >
                      <span>Join Student WhatsApp Community</span>
                    </a>

                    <Link
                      to="/login"
                      onClick={onClose}
                      className="w-full py-3.5 bg-fuji-indigo hover:bg-fuji-indigo/90 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-lg text-center"
                    >
                      Access Student Portal (Log In)
                    </Link>
                  </>
                ) : (
                  <a
                    href="https://wa.me/916364924110"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-xs sm:text-sm transition-all shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2"
                  >
                    <span>Connect with Academic Counselor on WhatsApp</span>
                  </a>
                )}

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    setStatus('idle');
                    setCurrentStep(1);
                  }}
                  className="text-fuji-slate/50 text-xs hover:text-fuji-indigo transition-colors pt-2 cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : status === 'error' ? (
            /* Error View */
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-8 h-8 text-fuji-red" />
              </div>
              <p className="text-xl font-display font-bold text-fuji-indigo mb-2">Submission Error</p>
              <p className="text-fuji-slate/60 text-xs sm:text-sm mb-6">Something went wrong while connecting. Please check your internet or try again.</p>
              <button
                type="button"
                onClick={() => setStatus('idle')}
                className="px-8 py-3 bg-fuji-indigo text-white rounded-xl font-bold hover:bg-fuji-indigo/90 transition-colors text-xs sm:text-sm"
              >
                Try Again
              </button>
            </div>
                    ) : currentStep === 1 ? (
            /* STEP 1: Details Collection */
            <form onSubmit={handleProceedToStep2} className="space-y-4">
              <div className="p-3 bg-fuji-light rounded-xl border border-fuji-indigo/10 text-xs text-fuji-slate/80 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-fuji-red shrink-0" />
                <span>Fill your details below to start your enrollment process.</span>
              </div>

              {stepError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{stepError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Full Name *</label>
                <input required name="name" value={formData.name} onChange={handleChange} type="text" className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuji-red focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-900 text-sm shadow-sm" placeholder="e.g. Rahul Sharma" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address *</label>
                <input required name="email" value={formData.email} onChange={handleChange} type="email" className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuji-red focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-900 text-sm shadow-sm" placeholder="rahul@example.com" />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Phone / WhatsApp Number *</label>
                <input required name="phone" value={formData.phone} onChange={handleChange} type="tel" className="w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuji-red focus:border-transparent outline-none transition-all placeholder:text-gray-400 text-gray-900 text-sm shadow-sm" placeholder="+91 98765 43210" />
              </div>

              <div className="pt-2">
                <button type="submit" className="w-full py-3.5 sm:py-4 bg-fuji-indigo text-white rounded-xl font-bold text-sm sm:text-base hover:bg-fuji-indigo/90 transition-all flex items-center justify-center gap-2 shadow-lg shadow-fuji-indigo/20">
                  <span>Continue</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </form>
          ) : currentStep === 3 ? (
            /* STEP 2: Course Selection */
            <form onSubmit={handleProceedToStep3} className="space-y-4">
              <button type="button" onClick={() => setCurrentStep(1)} className="text-xs font-bold text-gray-500 hover:text-fuji-indigo flex items-center gap-1 mb-2 transition-colors">
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Profile
              </button>

              {stepError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-xl flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{stepError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Target Japanese Course *</label>
                <div className="relative">
                  <select name="course" value={formData.course} onChange={handleChange} disabled={!!courseTitle} className={`w-full px-4 py-2.5 sm:py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuji-red focus:border-transparent outline-none transition-all text-gray-900 text-sm appearance-none shadow-sm ${courseTitle ? 'opacity-75 cursor-not-allowed font-medium' : ''}`}>

                    {courses.map((course) => (
                      <option key={course.id} value={course.title}>
                        {course.title} {course.price ? `— ${course.price}` : ''}
                      </option>
                    ))}
                  </select>
                  {!courseTitle && (
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  )}
                </div>
              </div>

              {((formData.course || '').toLowerCase().includes('corporate')) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Company / Organization *</label>
                    <input
                      required
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      type="text"
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900 placeholder:text-gray-400"
                      placeholder="e.g. Infosys, Bosch, Wipro"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">Estimated Team Size</label>
                    <select
                      name="teamSize"
                      value={formData.teamSize}
                      onChange={handleChange}
                      className="w-full px-3 py-2 bg-white border border-gray-300 rounded-lg text-sm text-gray-900"
                    >
                      <option value="1-5 employees">1–5 engineers / managers</option>
                      <option value="5-15 employees">5–15 employees (Standard Batch)</option>
                      <option value="15-50 employees">15–50 employees (Division Cohort)</option>
                      <option value="50+ enterprise">50+ Enterprise Scale</option>
                    </select>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Preferred Learning Mode</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, modePreference: 'Live Online Classroom' })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      formData.modePreference === 'Live Online Classroom'
                        ? 'border-fuji-red bg-fuji-red/5 text-fuji-red font-bold'
                        : 'border-gray-200 text-fuji-slate/70 hover:border-gray-300'
                    }`}
                  >
                    💻 Live Online (Zoom)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, modePreference: 'Bengaluru Campus (Offline)' })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      formData.modePreference === 'Bengaluru Campus (Offline)' || formData.modePreference === 'Bengaluru Campus'
                        ? 'border-fuji-red bg-fuji-red/5 text-fuji-red font-bold'
                        : 'border-gray-200 text-fuji-slate/70 hover:border-gray-300'
                    }`}
                  >
                    🏫 Bengaluru Campus (Offline)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, modePreference: 'Japan Study / On-Shore Program (Tokyo & Partner Schools)' })}
                    className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                      formData.modePreference === 'Japan Study / On-Shore Program (Tokyo & Partner Schools)'
                        ? 'border-fuji-red bg-fuji-red/5 text-fuji-red font-bold'
                        : 'border-gray-200 text-fuji-slate/70 hover:border-gray-300'
                    }`}
                  >
                    🗾 Japan Study / On-Shore Program
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={agreedTerms}
                    onChange={(e) => setAgreedTerms(e.target.checked)}
                    className="w-4 h-4 mt-0.5 rounded border-gray-300 text-fuji-red focus:ring-fuji-red accent-fuji-red shrink-0 cursor-pointer"
                  />
                  <span className="text-[11px] text-fuji-slate/70 leading-normal select-none">
                    I agree to the{' '}
                    <a
                      href="/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-fuji-red transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Terms &amp; Conditions and Refund Policy
                    </a>
                    .
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full bg-fuji-red hover:bg-[#d41c1c] text-white font-bold py-3.5 sm:py-4 rounded-xl shadow-lg hover:shadow-fuji-red/30 transition-all flex items-center justify-center gap-2 mt-2 active:scale-98 text-sm sm:text-base"
              >
                <span>Next: View Course Fee &amp; Options</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          ) : (
            /* STEP 2: Course Fee Display & Registration Choices (Revealed AFTER filling details) */
            <div className="space-y-4">
              {/* Back button */}
              <button
                type="button"
                onClick={() => setCurrentStep(1)}
                className="text-xs font-semibold text-fuji-slate/60 hover:text-fuji-red flex items-center gap-1 transition-colors mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to Edit Details
              </button>

              {/* Student Context Badge */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200/80 text-xs">
                <div>
                  <span className="text-gray-500 block text-[10px] uppercase tracking-wider font-semibold">Student</span>
                  <strong className="text-fuji-indigo">{formData.name}</strong>
                </div>
                <div className="text-right">
                  <span className="text-gray-500 block text-[10px] uppercase tracking-wider font-semibold">Mode</span>
                  <span className="font-semibold text-emerald-700">{formData.modePreference}</span>
                </div>
              </div>

              {/* Payment Error & Fallback Notice */}
              {paymentError && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl text-xs space-y-2 text-red-800">
                  <div className="flex items-center gap-1.5 font-bold text-red-900">
                    <AlertCircle className="w-4 h-4 text-fuji-red shrink-0" />
                    <span>Payment Gateway Notice</span>
                  </div>
                  <p className="text-red-700 leading-relaxed">
                    {paymentError}
                  </p>
                  <div className="pt-1 flex flex-wrap items-center gap-2">
                    <a
                      href="/payment"
                      onClick={() => onClose()}
                      className="px-3 py-1.5 bg-fuji-indigo hover:bg-slate-900 text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Pay via Dedicated Portal / UPI</span>
                      <ArrowRight className="w-3 h-3" />
                    </a>
                    <a
                      href={`https://wa.me/916364924110?text=Hi%20Fuji%20Japanese%20Academy,%20I%20have%20questions%20about%20paying%20for%20${encodeURIComponent(formData.course)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Admissions WhatsApp</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Course Fee Card - REVEALED HERE */}
              <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-red-50/70 via-rose-50/40 to-white border-2 border-fuji-red/30 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-fuji-red bg-fuji-red/10 px-2.5 py-0.5 rounded-full">
                      {(formData.course || '').toLowerCase().includes('corporate') ? 'Enterprise Proposal' : 'Official Course Fee'}
                    </span>
                    <h4 className="text-base sm:text-lg font-display font-bold text-fuji-indigo mt-1">
                      {selectedCourseData?.title || formData.course}
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end mb-1">
                      {selectedCourseData?.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">₹{selectedCourseData.originalPrice.toLocaleString('en-IN')}</span>
                      )}
                      {selectedCourseData?.discountPercent && (
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                          {selectedCourseData.discountPercent}% OFF
                        </span>
                      )}
                    </div>
                    <div className="text-2xl sm:text-3xl font-display font-black text-fuji-red">
                      {selectedCourseData?.price || 'Fee on Request'}
                    </div>
                    <span className="text-[10px] text-gray-500 font-semibold block">
                      {(formData.course || '').toLowerCase().includes('corporate') ? 'Tailored to Team' : 'All-Inclusive'}
                    </span>
                  </div>
                </div>

                {/* Inclusions */}
                <div className="pt-3 border-t border-red-100 mt-3 space-y-1.5 text-xs text-gray-700">
                  {(formData.course || '').toLowerCase().includes('corporate') ? (
                    <>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Customized Curriculum for IT Engineers &amp; Managers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Native Japanese &amp; N1 Bilingual Senseis with Tokyo corporate experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Flexible Shift Timings: Onsite at your office or live virtual Zoom</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Dedicated Corporate Relationship Manager &amp; GST Invoicing</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Live Instructor-led Training ({selectedCourseData?.duration || '3-4 Months'})</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Complete Kanji Workbooks, Grammar PDFs &amp; Listening Audios</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>4 Full-Length Simulated JLPT Mock Tests with Grading</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Fuji Japanese Academy Course Certificate &amp; Career Guidance</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Action Choices */}
              <div className="space-y-3 pt-1">
                {priceInPaise > 0 ? (
                  <>
                    {/* Option 1: Pay & Confirm Online */}
                    <button
                      type="button"
                      disabled={status === 'submitting'}
                      onClick={() => handleFinalSubmit('pay')}
                      className="w-full p-4 rounded-xl bg-fuji-red hover:bg-[#d41c1c] text-white transition-all shadow-lg hover:shadow-fuji-red/30 flex items-center justify-between group active:scale-98 text-left disabled:opacity-60 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                          <CreditCard className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <div className="font-bold text-sm leading-tight flex items-center gap-1.5">
                            Pay &amp; Register Online ({selectedCourseData?.price || ''})
                          </div>
                          <div className="text-[11px] text-white/80 mt-0.5">Instant Seat Confirmation via Cashfree (UPI / Cards / NetBanking)</div>
                        </div>
                      </div>
                      {status === 'submitting' && enrollmentMode === 'pay' ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform shrink-0" />
                      )}
                    </button>

                    {/* Option 2: Free Demo Reservation */}
                    <button
                      type="button"
                      disabled={status === 'submitting'}
                      onClick={() => handleFinalSubmit('demo')}
                      className="w-full p-3.5 rounded-xl border-2 border-emerald-600 hover:bg-emerald-50 text-emerald-800 transition-all flex items-center justify-between group active:scale-98 text-left disabled:opacity-60 cursor-pointer"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center shrink-0">
                          <CalendarCheck className="w-4 h-4 text-emerald-700" />
                        </div>
                        <div>
                          <div className="font-bold text-xs sm:text-sm text-emerald-950 leading-tight">
                            Reserve 1 Free Demo Class First (₹0 Today)
                          </div>
                          <div className="text-[11px] text-emerald-700 mt-0.5">Experience 1 live class with Sensei before paying</div>
                        </div>
                      </div>
                      {status === 'submitting' && enrollmentMode === 'demo' ? (
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-700" />
                      ) : (
                        <ArrowRight className="w-4 h-4 text-emerald-700 group-hover:translate-x-1 transition-transform shrink-0" />
                      )}
                    </button>
                  </>
                ) : (
                  /* If price not numeric or corporate proposal */
                  <button
                    type="button"
                    disabled={status === 'submitting'}
                    onClick={() => handleFinalSubmit('demo')}
                    className="w-full py-4 bg-fuji-red hover:bg-[#d41c1c] text-white font-bold rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <>
                        <span>
                          {(formData.course || '').toLowerCase().includes('corporate')
                            ? 'Request Custom Corporate Proposal & Syllabus (PDF)'
                            : 'Confirm Free Demo & Batch Enrollment'}
                        </span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>

              {/* Direct UPI & Bank Transfer details dropdown */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setShowDirectPayDetails(!showDirectPayDetails)}
                  className="w-full text-center text-xs font-bold text-fuji-indigo hover:text-fuji-red py-2 px-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200/70 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>{showDirectPayDetails ? '▲ Hide Direct UPI / Bank Transfer Details' : '▼ Or Pay via Direct UPI / Bank Transfer'}</span>
                </button>

                {showDirectPayDetails && (
                  <div className="mt-2 p-3.5 bg-gradient-to-br from-slate-50 to-indigo-50/40 rounded-xl border border-gray-200 text-xs space-y-2.5">
                    <div className="flex justify-between items-center pb-1.5 border-b border-gray-200">
                      <span className="font-bold text-gray-900">Direct Payment Credentials</span>
                      <a
                        href="/payment"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] text-fuji-red hover:underline font-bold"
                      >
                        Open Payment Portal →
                      </a>
                    </div>
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-gray-200">
                      <div>
                        <span className="text-[10px] text-gray-500 uppercase block font-bold">Official UPI ID</span>
                        <strong className="font-mono text-fuji-indigo text-xs sm:text-sm select-all">fujijapaneseacademyy@axl</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText('fujijapaneseacademyy@axl');
                          setCopiedUpiModal(true);
                          setTimeout(() => setCopiedUpiModal(false), 2000);
                        }}
                        className="px-2.5 py-1 bg-emerald-100 text-emerald-800 text-[11px] font-bold rounded hover:bg-emerald-200 flex items-center gap-1 cursor-pointer transition-colors"
                      >
                        {copiedUpiModal ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                        <span>{copiedUpiModal ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    <div className="bg-white p-2.5 rounded-lg border border-gray-200 space-y-1.5">
                      <div className="flex justify-between items-center py-0.5 border-b border-gray-100">
                        <span className="text-gray-500 text-[11px]">Account Holder:</span>
                        <strong className="text-gray-900 font-mono">SHILPA S</strong>
                      </div>
                      <div className="flex justify-between items-center py-0.5 border-b border-gray-100">
                        <span className="text-gray-500 text-[11px]">Account Number:</span>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-fuji-indigo font-mono font-bold select-all">055201560512</strong>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText('055201560512');
                              setCopiedAccModal(true);
                              setTimeout(() => setCopiedAccModal(false), 2000);
                            }}
                            className="p-1 text-gray-600 hover:text-gray-900 rounded cursor-pointer"
                            title="Copy Account Number"
                          >
                            {copiedAccModal ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-0.5 border-b border-gray-100">
                        <span className="text-gray-500 text-[11px]">Bank Name:</span>
                        <strong className="text-gray-900 font-semibold">ICICI Bank</strong>
                      </div>
                      <div className="flex justify-between items-center py-0.5 border-b border-gray-100">
                        <span className="text-gray-500 text-[11px]">Account Type:</span>
                        <strong className="text-gray-900">Savings</strong>
                      </div>
                      <div className="flex justify-between items-center py-0.5">
                        <span className="text-gray-500 text-[11px]">IFSC Code:</span>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-fuji-indigo font-mono font-bold select-all">ICIC0000552</strong>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText('ICIC0000552');
                              setCopiedIfscModal(true);
                              setTimeout(() => setCopiedIfscModal(false), 2000);
                            }}
                            className="p-1 text-gray-600 hover:text-gray-900 rounded cursor-pointer"
                            title="Copy IFSC Code"
                          >
                            {copiedIfscModal ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-fuji-slate/50 pt-2 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Encrypted Payment Gateway • PCI-DSS Compliant • Admissions hotline: +91 63649 24110</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default EnrollmentModal;
