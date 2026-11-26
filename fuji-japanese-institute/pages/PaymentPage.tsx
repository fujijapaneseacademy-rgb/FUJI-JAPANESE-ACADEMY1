import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation, Link } from 'react-router-dom';
import {
  ShieldCheck, CreditCard, QrCode, CheckCircle, ArrowRight,
  Phone, Mail, Copy, Check, AlertCircle, Building2,
  Lock, Sparkles, HelpCircle, MessageSquare, Maximize2, Download, X
} from 'lucide-react';
import { COURSES } from '../constants';
import { handlePayment, verifyCashfreeOrder } from '../services/cashfreeService';
import { submitToGoogleSheet } from '../services/formService';
import { trackEvent } from '../src/lib/analytics';
import Breadcrumbs from '../components/Breadcrumbs';

const COURSE_PAYMENT_OPTIONS = [
  { id: 'jlpt-n5', title: 'JLPT N5 - Beginners Foundation', price: '₹15,000', originalPrice: 25000, discountPercent: 40, amount: 15000, duration: '3 Months' },
  { id: 'jlpt-n4', title: 'JLPT N4 - Basic Conversational Proficiency', price: '₹20,300', originalPrice: 32000, discountPercent: 37, amount: 20300, duration: '4 Months' },
  { id: 'jlpt-n3', title: 'JLPT N3 - Intermediate Business Japanese', price: '₹30,300', originalPrice: 48000, discountPercent: 37, amount: 30300, duration: '5 Months' },
  { id: 'jlpt-n2', title: 'JLPT N2 - Advanced Professional Fluency', price: '₹40,200', originalPrice: 65000, discountPercent: 38, amount: 40200, duration: '6 Months' },
  { id: 'jlpt-n1', title: 'JLPT N1 - Master Level Fluency', price: '₹75,300', originalPrice: 120000, discountPercent: 37, amount: 75300, duration: '6 Months' },
  { id: 'spoken-japanese', title: 'Spoken Japanese - Conversational Fluency', price: '₹8,000', originalPrice: 15000, discountPercent: 47, amount: 8000, duration: '2.5 Months' },
  { id: 'business-japanese', title: 'Business Japanese & Corporate Etiquette (Keigo)', price: '₹22,500', originalPrice: 38000, discountPercent: 41, amount: 22500, duration: '3 Months' },
  { id: 'it-japanese', title: 'Japanese for IT Professionals & Software Engineers', price: '₹24,000', originalPrice: 40000, discountPercent: 40, amount: 24000, duration: '3 Months' },
  { id: 'seat-reservation', title: 'Seat Reservation & Admission Processing Token', price: '₹5,000', amount: 5000, duration: 'Initial Token' }
];

const PaymentPage: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const preselectedCourse = searchParams.get('course');

  const [selectedCourseId, setSelectedCourseId] = useState<string>(() => {
    if (preselectedCourse) {
      const match = COURSE_PAYMENT_OPTIONS.find(
        c => c.id === preselectedCourse || c.title.toLowerCase().includes(preselectedCourse.toLowerCase())
      );
      if (match) return match.id;
    }
    return 'jlpt-n5';
  });

  const [studentDetails, setStudentDetails] = useState({
    name: '',
    email: '',
    phone: '',
    modePreference: 'Live Online Classroom',
    notes: ''
  });

  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [copiedUpi, setCopiedUpi] = useState<boolean>(false);
  const [copiedAcc, setCopiedAcc] = useState<boolean>(false);
  const [copiedIfsc, setCopiedIfsc] = useState<boolean>(false);
  const [copiedName, setCopiedName] = useState<boolean>(false);
  const [activePaymentTab, setActivePaymentTab] = useState<'online' | 'upi' | 'bank'>('online');
  const [isQrZoomed, setIsQrZoomed] = useState<boolean>(false);

  const selectedCourse = COURSE_PAYMENT_OPTIONS.find(c => c.id === selectedCourseId) || COURSE_PAYMENT_OPTIONS[0];

  // Verify Cashfree returnUrl redirect with ?order_id=...
  useEffect(() => {
    const orderIdParam = searchParams.get('order_id');
    if (orderIdParam) {
      setPaymentStatus('processing');
      verifyCashfreeOrder(orderIdParam).then((res) => {
        if (res.success && res.isPaid) {
          setPaymentStatus('success');
          if (res.courseId) {
            setSelectedCourseId(res.courseId);
          }
        } else {
          setPaymentStatus('failed');
          setErrorMessage(
            res.status === 'PENDING'
              ? 'Your payment is being settled by the bank. If your account was debited, your enrollment will activate automatically.'
              : 'Payment verification failed or was cancelled. Please retry or contact the academy.'
          );
        }
      });
    }
  }, [location.search]);

  const handleCopyUpi = () => {
    navigator.clipboard.writeText('fujijapaneseacademyy@axl');
    setCopiedUpi(true);
    setTimeout(() => setCopiedUpi(false), 2000);
  };

  const handleCopyAcc = () => {
    navigator.clipboard.writeText('055201560512');
    setCopiedAcc(true);
    setTimeout(() => setCopiedAcc(false), 2000);
  };

  const handleCopyIfsc = () => {
    navigator.clipboard.writeText('ICIC0000552');
    setCopiedIfsc(true);
    setTimeout(() => setCopiedIfsc(false), 2000);
  };

  const handleCopyName = () => {
    navigator.clipboard.writeText('SHILPA S');
    setCopiedName(true);
    setTimeout(() => setCopiedName(false), 2000);
  };

  const handleOnlinePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentDetails.name.trim()) {
      setErrorMessage('Please enter student full name.');
      return;
    }
    if (!studentDetails.email.trim() || !studentDetails.email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (!studentDetails.phone.trim() || studentDetails.phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile / WhatsApp number.');
      return;
    }

    setErrorMessage('');
    setPaymentStatus('processing');

    const priceInPaise = selectedCourse.amount * 100;

    trackEvent('payment_page_initiated', {
      course: selectedCourse.title,
      amount: selectedCourse.amount
    });

    // Immediate lead pre-capture to ensure admin receives enquiry even if payment window drops
    submitToGoogleSheet({
      formType: 'Enrollment Lead',
      name: studentDetails.name,
      email: studentDetails.email,
      phone: studentDetails.phone,
      course: selectedCourse.title,
      courseId: selectedCourse.id,
      amountPaid: 'Payment Initiated',
      message: `${studentDetails.modePreference} | Checkout Initiated on Payment Page`
    }).catch(() => {});

    await handlePayment({
      courseId: selectedCourse.id,
      courseName: selectedCourse.title,
      amount: priceInPaise,
      customer: {
        name: studentDetails.name,
        email: studentDetails.email,
        contact: studentDetails.phone
      },
      onSuccess: async (response) => {
        setPaymentStatus('success');
        const resolvedPaymentId = response.payment_id || response.order_id || response.razorpay_payment_id || 'cf_paid';
        trackEvent('purchase_complete', {
          course: selectedCourse.title,
          amount: selectedCourse.price,
          paymentId: resolvedPaymentId
        });

        // Record enrollment in Supabase database
        await submitToGoogleSheet({
          formType: 'Enrollment',
          name: studentDetails.name,
          email: studentDetails.email,
          phone: studentDetails.phone,
          course: selectedCourse.title,
          courseId: selectedCourse.id,
          paymentId: resolvedPaymentId,
          amountPaid: selectedCourse.price,
          message: `${studentDetails.modePreference} | Paid Online via Cashfree Payment Portal`
        });
      },
      onFailure: (err) => {
        setPaymentStatus('failed');
        setErrorMessage(typeof err === 'string' ? err : 'Online checkout could not be completed. You can pay directly via UPI / Bank Transfer below.');
        // Automatically switch to UPI / Bank Transfer tab for seamless zero-block payment
        setActivePaymentTab('upi');
      }
    });
  };

  const whatsappConfirmationUrl = `https://wa.me/916364924110?text=${encodeURIComponent(
    `Konnichiwa Fuji Japanese Academy! I want to confirm my fee payment.\n\nStudent: ${studentDetails.name || 'Student'}\nCourse: ${selectedCourse.title}\nFee: ${selectedCourse.price}\nPhone: ${studentDetails.phone || ''}\nMode: ${studentDetails.modePreference}\n\nPlease share batch orientation details.`
  )}`;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pt-24 pb-20">
      <Helmet>
        <title>Pay Course Fee Online | Official Payment Portal | Fuji Japanese Academy</title>
        <meta
          name="description"
          content="Pay your Japanese language & JLPT course fees securely online at Fuji Japanese Academy. UPI, Cards, NetBanking, and Direct Bank Transfer supported."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://fujijapaneseacademy.com/payment" />
      </Helmet>

      <div className="container mx-auto px-4 md:px-6 max-w-5xl">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: 'Courses', path: '/courses' },
            { label: 'Online Payment Portal', path: '/payment' }
          ]}
          className="mb-8"
        />

        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Official Encrypted Payment Desk</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-display font-extrabold text-fuji-indigo tracking-tight mb-4">
            Course Fee Payment &amp; Enrollment
          </h1>
          <p className="text-fuji-slate/75 text-sm md:text-base leading-relaxed">
            Complete your Japanese language admission securely. All fees include live instructor training, comprehensive study workbooks, mock examinations, and official certification.
          </p>
        </div>

        {paymentStatus === 'success' ? (
          /* Success Screen */
          <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-xl border border-gray-100 text-center max-w-xl mx-auto">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-5 border-2 border-emerald-100 shadow-sm">
              <CheckCircle className="w-10 h-10" />
            </div>
            <span className="inline-block px-3.5 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full uppercase tracking-wider mb-3">
              🎌 Arigatou Gozaimasu!
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-fuji-indigo mb-2">
              Payment &amp; Registration Successful!
            </h2>
            <p className="text-fuji-slate/80 text-sm leading-relaxed mb-6">
              Your fee for <strong>{selectedCourse.title}</strong> has been received. Our sensei team is preparing your welcome onboarding pack and Zoom / classroom credentials.
            </p>

            <div className="bg-gray-50 rounded-2xl p-4 text-xs text-left mb-6 space-y-2 border border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-500">Student Name:</span>
                <strong className="text-fuji-indigo">{studentDetails.name}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Course Enrolled:</span>
                <strong className="text-fuji-indigo">{selectedCourse.title}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Amount Paid:</span>
                <strong className="text-emerald-700">{selectedCourse.price} (All-Inclusive)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Learning Mode:</span>
                <strong className="text-fuji-indigo">{studentDetails.modePreference}</strong>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={whatsappConfirmationUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Get WhatsApp Receipt</span>
              </a>
              <Link
                to="/dashboard"
                className="flex-1 py-3.5 px-4 bg-fuji-indigo hover:bg-slate-900 text-white font-bold rounded-xl text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5"
              >
                <span>Go to Student Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        ) : (
          /* Main Payment Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Form & Payment Methods (7 cols) */}
            <div className="lg:col-span-7 space-y-6">

              {/* Student Details Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200">
                <h2 className="text-lg sm:text-xl font-display font-bold text-fuji-indigo mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-fuji-indigo text-white text-xs flex items-center justify-center font-bold">1</span>
                  <span>Student &amp; Course Details</span>
                </h2>

                <div className="space-y-4">
                  {/* Course Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Select Your Course *
                    </label>
                    <select
                      value={selectedCourseId}
                      onChange={(e) => setSelectedCourseId(e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuji-red focus:border-transparent outline-none transition-all text-gray-900 text-sm font-semibold shadow-sm"
                    >
                      {COURSE_PAYMENT_OPTIONS.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title} — {c.price}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Student Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Student Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={studentDetails.name}
                      onChange={(e) => setStudentDetails({ ...studentDetails, name: e.target.value })}
                      placeholder="e.g. Priyanshu Sharma"
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuji-red focus:border-transparent outline-none transition-all text-gray-900 text-sm shadow-sm placeholder:text-gray-400"
                    />
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={studentDetails.email}
                        onChange={(e) => setStudentDetails({ ...studentDetails, email: e.target.value })}
                        placeholder="student@example.com"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuji-red focus:border-transparent outline-none transition-all text-gray-900 text-sm shadow-sm placeholder:text-gray-400"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                        WhatsApp / Mobile *
                      </label>
                      <input
                        type="tel"
                        required
                        value={studentDetails.phone}
                        onChange={(e) => setStudentDetails({ ...studentDetails, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-fuji-red focus:border-transparent outline-none transition-all text-gray-900 text-sm shadow-sm placeholder:text-gray-400"
                      />
                    </div>
                  </div>

                  {/* Preferred Learning Mode */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
                      Batch Preference
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setStudentDetails({ ...studentDetails, modePreference: 'Live Online Classroom' })}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          studentDetails.modePreference === 'Live Online Classroom'
                            ? 'border-fuji-red bg-fuji-red/5 text-fuji-red font-bold'
                            : 'border-gray-200 text-fuji-slate/70 hover:border-gray-300'
                        }`}
                      >
                        💻 Live Online (Zoom)
                      </button>
                      <button
                        type="button"
                        onClick={() => setStudentDetails({ ...studentDetails, modePreference: 'Bengaluru Campus' })}
                        className={`py-2.5 px-3 rounded-xl border text-xs font-semibold text-center transition-all ${
                          studentDetails.modePreference === 'Bengaluru Campus'
                            ? 'border-fuji-red bg-fuji-red/5 text-fuji-red font-bold'
                            : 'border-gray-200 text-fuji-slate/70 hover:border-gray-300'
                        }`}
                      >
                        🏫 Bengaluru Campus
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200">
                <h2 className="text-lg sm:text-xl font-display font-bold text-fuji-indigo mb-4 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-fuji-indigo text-white text-xs flex items-center justify-center font-bold">2</span>
                  <span>Select Payment Method</span>
                </h2>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mb-6">
                  <button
                    type="button"
                    onClick={() => setActivePaymentTab('online')}
                    className={`flex-1 pb-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${
                      activePaymentTab === 'online'
                        ? 'border-fuji-red text-fuji-red'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <CreditCard className="w-4 h-4" />
                    <span>Instant Online Gateway</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePaymentTab('upi')}
                    className={`flex-1 pb-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${
                      activePaymentTab === 'upi'
                        ? 'border-fuji-red text-fuji-red'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <QrCode className="w-4 h-4" />
                    <span>Direct UPI / QR</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActivePaymentTab('bank')}
                    className={`flex-1 pb-3 text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border-b-2 transition-colors ${
                      activePaymentTab === 'bank'
                        ? 'border-fuji-red text-fuji-red'
                        : 'border-transparent text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    <Building2 className="w-4 h-4" />
                    <span>Bank Transfer</span>
                  </button>
                </div>

                {/* Error Banner */}
                {errorMessage && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 mb-6 text-xs text-red-700">
                    <AlertCircle className="w-5 h-5 text-fuji-red shrink-0 mt-0.5" />
                    <div className="leading-relaxed">
                      <strong>Payment Notice:</strong> {errorMessage}
                    </div>
                  </div>
                )}

                {/* Tab 1: Instant Online Gateway */}
                {activePaymentTab === 'online' && (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-600 space-y-1.5">
                      <div className="font-bold text-gray-900 flex items-center gap-1.5">
                        <Lock className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Instant Auto-Confirmation via Encrypted PCI-DSS Checkout</span>
                      </div>
                      <p>
                        Supports all major Indian and International payment methods: <strong>Google Pay, PhonePe, Paytm, UPI ID, Visa, Mastercard, RuPay, NetBanking &amp; EMI</strong>.
                      </p>
                    </div>

                    <button
                      type="button"
                      disabled={paymentStatus === 'processing'}
                      onClick={handleOnlinePayment}
                      className="w-full py-4 px-6 bg-fuji-red hover:bg-[#d41c1c] text-white font-display font-bold text-base rounded-2xl shadow-lg hover:shadow-fuji-red/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 active:scale-98"
                    >
                      <CreditCard className="w-5 h-5" />
                      <span>{paymentStatus === 'processing' ? 'Opening Payment Window...' : `Pay ${selectedCourse.price} Online Now`}</span>
                      <ArrowRight className="w-4 h-4 ml-1" />
                    </button>

                    <p className="text-[11px] text-center text-gray-500">
                      Transactions processed securely via licensed Indian payment gateway.
                    </p>
                  </div>
                )}

                {/* Tab 2: Direct UPI & QR Code */}
                {activePaymentTab === 'upi' && (
                  <div className="space-y-5">
                    <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-2xl border border-emerald-200">
                      <div className="text-xs font-bold text-emerald-900 mb-2 uppercase tracking-wider flex items-center justify-between">
                        <span>Official Institute UPI ID</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Verified Account</span>
                      </div>
                      <div className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-emerald-300 shadow-sm">
                        <span className="font-mono font-bold text-fuji-indigo text-sm sm:text-base select-all">
                          fujijapaneseacademyy@axl
                        </span>
                        <button
                          type="button"
                          onClick={handleCopyUpi}
                          className="px-3 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-800 text-xs font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          {copiedUpi ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedUpi ? 'Copied!' : 'Copy UPI'}</span>
                        </button>
                      </div>

                      {/* Beneficiary Details */}
                      <div className="mt-3 pt-3 border-t border-emerald-200/70 grid grid-cols-2 gap-2 text-xs">
                        <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                          <span className="text-gray-500 text-[10px] uppercase font-bold block">Account Holder</span>
                          <strong className="text-gray-900 font-mono">SHILPA S</strong>
                        </div>
                        <div className="bg-white/80 p-2.5 rounded-lg border border-emerald-100">
                          <span className="text-gray-500 text-[10px] uppercase font-bold block">Bank</span>
                          <strong className="text-gray-900 font-mono">ICICI Bank</strong>
                        </div>
                      </div>

                      {/* QR Code and Quick Pay */}
                      <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 pt-3 border-t border-emerald-200/70">
                        <div className="bg-white p-3 rounded-2xl border border-emerald-200 shadow-sm shrink-0 text-center">
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&margin=4&data=${encodeURIComponent(
                              `upi://pay?pa=fujijapaneseacademyy@axl&pn=SHILPA%20S&cu=INR&tn=Fuji%20Japanese%20Academy%20Course%20Fee`
                            )}`}
                            alt="Scan UPI QR to pay Fuji Japanese Academy"
                            className="w-28 h-28 object-contain mx-auto rounded-lg cursor-pointer hover:opacity-90 transition-opacity"
                            onClick={() => setIsQrZoomed(true)}
                          />
                          <span className="text-[10px] text-gray-500 font-medium block mt-1">Scan via any UPI App</span>
                          <div className="flex items-center justify-center gap-2 mt-2 pt-1 border-t border-gray-100">
                            <button
                              type="button"
                              onClick={() => setIsQrZoomed(true)}
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer"
                              title="Zoom QR Code"
                            >
                              <Maximize2 className="w-3.5 h-3.5" />
                              <span>Zoom</span>
                            </button>
                            <span className="text-gray-300">•</span>
                            <a
                              href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=4&data=${encodeURIComponent(
                                `upi://pay?pa=fujijapaneseacademyy@axl&pn=SHILPA%20S&cu=INR&tn=Fuji%20Japanese%20Academy%20Course%20Fee`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              download="fuji-academy-upi-qr.png"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 transition-colors cursor-pointer"
                              title="Download QR Code"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download</span>
                            </a>
                          </div>
                        </div>
                        <div className="space-y-2 text-center sm:text-left flex-1">
                          <p className="text-xs text-emerald-950 leading-relaxed">
                            Scan with <strong>Google Pay</strong>, <strong>PhonePe</strong>, <strong>Paytm</strong>, or <strong>BHIM</strong> to transfer the fee ({selectedCourse.price}) directly.
                          </p>
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 pt-1">
                            <a
                              href={`upi://pay?pa=fujijapaneseacademyy@axl&pn=SHILPA%20S&cu=INR&tn=Fuji%20Japanese%20Academy%20Fee`}
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
                            >
                              <span>Open in UPI App</span>
                              <ArrowRight className="w-3 h-3" />
                            </a>
                            <span className="text-[11px] text-emerald-800 font-medium">Instant transfer</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Step to confirm */}
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 text-xs text-gray-700 space-y-3">
                      <strong>How to verify your UPI transfer:</strong>
                      <ol className="list-decimal pl-4 space-y-1 text-gray-600">
                        <li>Send <strong>{selectedCourse.price}</strong> to <code>fujijapaneseacademyy@axl</code> (Account Holder: <strong>SHILPA S</strong>)</li>
                        <li>Take a screenshot of the completed payment or note the 12-digit UTR / Reference number</li>
                        <li>Click below to send your transfer screenshot to our admissions desk for immediate receipt and batch access</li>
                      </ol>

                      <a
                        href={whatsappConfirmationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 mt-2"
                      >
                        <MessageSquare className="w-4 h-4" />
                        <span>Send UPI UTR on WhatsApp (+91 63649 24110)</span>
                      </a>
                    </div>
                  </div>
                )}

                {/* Tab 3: Official Bank Transfer */}
                {activePaymentTab === 'bank' && (
                  <div className="space-y-4">
                    <div className="p-5 bg-gray-50 rounded-2xl border border-gray-200 text-xs space-y-3">
                      <div className="font-bold text-fuji-indigo text-sm border-b pb-2 flex items-center justify-between">
                        <span>Academy Bank Account (NEFT / RTGS / IMPS)</span>
                        <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Verified</span>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                        <span className="text-gray-500">Account Holder's Name:</span>
                        <div className="flex items-center gap-2">
                          <strong className="text-gray-900 font-mono text-sm select-all">SHILPA S</strong>
                          <button
                            type="button"
                            onClick={handleCopyName}
                            className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            {copiedName ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedName ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                        <span className="text-gray-500">Account Number:</span>
                        <div className="flex items-center gap-2">
                          <strong className="text-fuji-indigo font-mono text-sm sm:text-base select-all tracking-wider font-black">055201560512</strong>
                          <button
                            type="button"
                            onClick={handleCopyAcc}
                            className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            {copiedAcc ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedAcc ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                        <span className="text-gray-500">Bank Name:</span>
                        <strong className="text-gray-900 font-bold text-sm">ICICI Bank</strong>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                        <span className="text-gray-500">Account Type:</span>
                        <strong className="text-gray-900 font-semibold">Savings</strong>
                      </div>
                      <div className="flex justify-between items-center py-1.5 border-b border-gray-100">
                        <span className="text-gray-500">IFSC Code:</span>
                        <div className="flex items-center gap-2">
                          <strong className="text-fuji-indigo font-mono text-sm sm:text-base select-all tracking-wider font-bold">ICIC0000552</strong>
                          <button
                            type="button"
                            onClick={handleCopyIfsc}
                            className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300 text-gray-800 text-[11px] font-bold rounded-lg transition-colors flex items-center gap-1 cursor-pointer"
                          >
                            {copiedIfsc ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                            <span>{copiedIfsc ? 'Copied' : 'Copy'}</span>
                          </button>
                        </div>
                      </div>
                      <div className="flex justify-between py-1 text-gray-500 text-[11px]">
                        <span>Supported Modes:</span>
                        <span className="text-right text-gray-700 font-medium">
                          IMPS (Instant 24x7) • NEFT • RTGS • NetBanking
                        </span>
                      </div>
                    </div>

                    <a
                      href={whatsappConfirmationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>Notify Admissions of Bank Transfer</span>
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column: Fee Summary & Guarantees (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              
              {/* Order Summary Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-gray-200">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-fuji-red bg-fuji-red/10 px-2.5 py-0.5 rounded-full">
                  Summary &amp; Inclusions
                </span>

                <h3 className="text-xl font-display font-bold text-fuji-indigo mt-3 mb-1">
                  {selectedCourse.title}
                </h3>
                <span className="text-xs text-fuji-slate/60 font-semibold block mb-4">
                  Duration: {selectedCourse.duration}
                </span>

                <div className="p-4 bg-gradient-to-br from-red-50/70 to-rose-50/30 rounded-2xl border border-red-100 mb-6">
                  <div className="flex justify-between items-baseline">
                    <span className="text-xs font-semibold text-gray-600">Total Course Fee:</span>
                    <div className="text-right flex flex-col items-end">
                      <div className="flex items-center gap-2 justify-end mb-1">
                        {('originalPrice' in selectedCourse && selectedCourse.originalPrice) && (
                          <span className="text-sm text-gray-400 line-through">₹{selectedCourse.originalPrice.toLocaleString('en-IN')}</span>
                        )}
                        {('discountPercent' in selectedCourse && selectedCourse.discountPercent) && (
                          <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                            {selectedCourse.discountPercent}% OFF
                          </span>
                        )}
                      </div>
                      <span className="text-3xl font-display font-black text-fuji-red">{selectedCourse.price}</span>
                    </div>
                  </div>
                  <span className="text-[10px] text-gray-500 block text-right mt-0.5">All-Inclusive (No Hidden Fees)</span>
                </div>

                <div className="space-y-3 text-xs text-gray-700 border-t border-gray-100 pt-4">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Live Native &amp; Bilingual Instructor-led Classes</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Official Japanese Workbooks, Kanji Practice &amp; Listening Audio Files</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Full-Length JLPT Simulated Mock Tests with Scoring Analytics</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Fuji Japanese Academy Completion Certificate</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Corporate Placement Support &amp; Tokyo IT Job Referrals</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-1.5 text-xs text-gray-500">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5 font-semibold text-gray-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                      FUJI JAPANESE ACADEMY PRIVATE LIMITED
                    </span>
                    <Link to="/terms" className="underline hover:text-fuji-red shrink-0">
                      Refund Policies
                    </Link>
                  </div>
                  <span className="text-[11px] text-gray-400">Official Merchant &amp; Registered Educational Institution</span>
                </div>
              </div>

              {/* Direct Help & Support Card */}
              <div className="bg-gradient-to-br from-fuji-indigo to-slate-900 text-white rounded-3xl p-6 sm:p-7 shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-amber-300" />
                  </div>
                  <div>
                    <strong className="text-sm block">Admissions Desk Assistance</strong>
                    <span className="text-[11px] text-white/70">Need assistance or invoice before paying?</span>
                  </div>
                </div>

                <a
                  href="tel:+916364924110"
                  className="text-xl sm:text-2xl font-display font-extrabold text-white hover:text-amber-300 transition-colors block my-2"
                >
                  +91 63649 24110
                </a>

                <div className="pt-2 text-xs text-white/70 space-y-1">
                  <div><strong>Email:</strong> info@fujijapaneseacademy.com</div>
                  <div><strong>Hours:</strong> Mon – Sun: 9:00 AM – 7:30 PM IST</div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* QR Code Zoom Modal */}
        {isQrZoomed && (
          <div
            role="dialog"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsQrZoomed(false)}
          >
            <div
              className="bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full text-center relative shadow-2xl border border-gray-100"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setIsQrZoomed(false)}
                className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-3">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-display font-bold text-fuji-indigo mb-1">
                Fuji Academy UPI QR Code
              </h3>
              <p className="text-xs text-gray-500 mb-4">
                Scan with Google Pay, PhonePe, Paytm, or any UPI app
              </p>
              <div className="bg-white p-3 rounded-2xl border-2 border-emerald-500 inline-block shadow-md mb-4">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&margin=4&data=${encodeURIComponent(
                    `upi://pay?pa=fujijapaneseacademyy@axl&pn=SHILPA%20S&cu=INR&tn=Fuji%20Japanese%20Academy%20Course%20Fee`
                  )}`}
                  alt="Enlarged Fuji Japanese Academy UPI QR"
                  className="w-56 h-56 object-contain"
                />
              </div>
              <p className="font-mono font-bold text-xs text-fuji-indigo mb-4 bg-gray-50 py-2 px-3 rounded-xl border border-gray-200 select-all">
                UPI ID: fujijapaneseacademyy@axl
              </p>
              <div className="flex items-center gap-3">
                <a
                  href={`https://api.qrserver.com/v1/create-qr-code/?size=500x500&margin=4&data=${encodeURIComponent(
                    `upi://pay?pa=fujijapaneseacademyy@axl&pn=SHILPA%20S&cu=INR&tn=Fuji%20Japanese%20Academy%20Course%20Fee`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="fuji-academy-upi-qr.png"
                  className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>Download QR</span>
                </a>
                <button
                  type="button"
                  onClick={() => setIsQrZoomed(false)}
                  className="py-3 px-4 rounded-xl border border-gray-200 text-gray-600 font-bold text-xs hover:bg-gray-100 transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentPage;
