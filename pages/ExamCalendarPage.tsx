import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import {
  Calendar, MapPin, Clock, Award, ShieldCheck, CheckCircle2,
  ExternalLink, AlertCircle, FileText, ArrowRight, MessageSquare
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';

export const ExamCalendarPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'jlpt' | 'nat' | 'jft'>('jlpt');

  const jlptExams = [
    {
      session: 'July 2026 Exam (First Session)',
      date: 'Sunday, July 5, 2026',
      registrationWindow: 'March 1 – March 20, 2026',
      levels: 'N5, N4, N3, N2, N1',
      fee: '₹1,500 – ₹2,000 (Based on Level)',
      status: 'Registrations Opening March 2026',
      badge: 'Major National Exam'
    },
    {
      session: 'December 2026 Exam (Second Session)',
      date: 'Sunday, December 6, 2026',
      registrationWindow: 'August 1 – August 25, 2026',
      levels: 'N5, N4, N3, N2, N1',
      fee: '₹1,500 – ₹2,000 (Based on Level)',
      status: 'Registrations Opening August 2026',
      badge: 'Year-End Session'
    }
  ];

  const natTestExams = [
    { session: 'Feb 2026 (Exam 1)', date: 'February 8, 2026', deadline: 'January 10, 2026', levels: 'Levels 5Q, 4Q, 3Q, 2Q, 1Q' },
    { session: 'Apr 2026 (Exam 2)', date: 'April 12, 2026', deadline: 'March 15, 2026', levels: 'Levels 5Q, 4Q, 3Q, 2Q' },
    { session: 'Jun 2026 (Exam 3)', date: 'June 14, 2026', deadline: 'May 15, 2026', levels: 'Levels 5Q, 4Q, 3Q, 2Q, 1Q' },
    { session: 'Aug 2026 (Exam 4)', date: 'August 9, 2026', deadline: 'July 10, 2026', levels: 'Levels 5Q, 4Q, 3Q, 2Q' },
    { session: 'Oct 2026 (Exam 5)', date: 'October 11, 2026', deadline: 'September 10, 2026', levels: 'Levels 5Q, 4Q, 3Q, 2Q, 1Q' },
    { session: 'Dec 2026 (Exam 6)', date: 'December 13, 2026', deadline: 'November 10, 2026', levels: 'Levels 5Q, 4Q, 3Q, 2Q' }
  ];

  const testCenters = [
    { city: 'Bengaluru (Bangalore)', state: 'Karnataka', host: 'Bangalore University (Jnana Bharathi Campus)', tests: 'JLPT, NAT-TEST', address: 'Mysore Road, Bengaluru 560056' },
    { city: 'Chennai', state: 'Tamil Nadu', host: 'ABK-AOTS DOSOKAI, Tamilnadu Centre', tests: 'JLPT, NAT-TEST, JFT', address: 'Chamiers Road, Nandanam, Chennai 600035' },
    { city: 'New Delhi', state: 'Delhi NCR', host: 'MOSAI (Mombusho Scholars Association)', tests: 'JLPT, NAT-TEST, JFT', address: 'Barakhamba Road, New Delhi 110001' },
    { city: 'Pune', state: 'Maharashtra', host: 'JALTAP (Japanese Language Teachers Association of Pune)', tests: 'JLPT, NAT-TEST', address: 'Fergusson College Campus, Pune 411004' },
    { city: 'Mumbai', state: 'Maharashtra', host: 'Indo-Japanese Association / Mumbai University', tests: 'JLPT, NAT-TEST', address: 'Vidyanagari, Kalina, Santacruz East, Mumbai 400098' },
    { city: 'Kolkata', state: 'West Bengal', host: 'Indo-Japan Cultural Society', tests: 'JLPT', address: 'Jadavpur University Campus, Kolkata 700032' },
    { city: 'Karur & Salem', state: 'Tamil Nadu', host: 'Regional Exam Assessment Centers', tests: 'NAT-TEST, JFT-Basic', address: 'Authorized Prometric Testing Nodes' }
  ];

  const pageTitle = 'India JLPT & Japanese Exam Calendar 2026 — Dates, Fees & Centers | Fuji Japanese Academy';
  const metaDescription = 'Complete 2026 exam schedule for JLPT (July & Dec), NAT-TEST (6 times/year), and JFT-Basic across India. Registration deadlines, exam fees, and test center directory for Bengaluru, Chennai, Delhi, Pune, Mumbai, Kolkata, Karur & Salem.';

  return (
    <div className="pt-24 min-h-screen bg-slate-50 text-slate-800">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href="https://fujijapaneseacademy.com/exam-calendar" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 py-3">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: 'Exam Calendar 2026', path: '/exam-calendar' }
          ]}
        />
      </div>

      {/* Header */}
      <header className="py-14 bg-gradient-to-br from-slate-950 via-[#181335] to-slate-950 text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 text-red-300 text-xs font-bold uppercase tracking-wider mb-4 border border-red-500/30">
            <Calendar className="w-3.5 h-3.5" />
            <span>Official India Examination Hub 2026</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            India Japanese Exam Calendar 2026
          </h1>
          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto mb-6">
            Official test dates, registration deadlines, seat limits, and examination center directory for JLPT, NAT-TEST, and JFT-Basic.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href="https://wa.me/916364924110?text=Hi%20Fuji%20Japanese%20Academy,%20please%20guide%20me%20with%20upcoming%20JLPT%20exam%20registration%20and%20mock%20tests."
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Get Exam Registration Assistance</span>
            </a>
          </div>
        </div>
      </header>

      {/* Exam Tabs */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-5xl">
          <div className="flex items-center justify-center gap-2 mb-8">
            <button
              type="button"
              onClick={() => setActiveTab('jlpt')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                activeTab === 'jlpt'
                  ? 'bg-red-600 text-white border-red-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              JLPT (July &amp; Dec)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('nat')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                activeTab === 'nat'
                  ? 'bg-red-600 text-white border-red-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              NAT-TEST (6 Times / Year)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('jft')}
              className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer border ${
                activeTab === 'jft'
                  ? 'bg-red-600 text-white border-red-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
              }`}
            >
              JFT-Basic (SSW Visa)
            </button>
          </div>

          {activeTab === 'jlpt' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {jlptExams.map((exam, idx) => (
                  <div key={idx} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-red-600 uppercase bg-red-50 px-2.5 py-1 rounded-full">
                        {exam.badge}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">{exam.fee}</span>
                    </div>
                    <h3 className="text-xl font-bold text-slate-900">{exam.session}</h3>
                    <div className="p-4 bg-slate-50 rounded-2xl text-xs space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Exam Date:</span>
                        <strong className="text-slate-900">{exam.date}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Registration:</span>
                        <span className="text-red-700 font-semibold">{exam.registrationWindow}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Levels Offered:</span>
                        <span className="text-slate-900 font-bold">{exam.levels}</span>
                      </div>
                    </div>
                    <Link
                      to="/courses"
                      className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-red-600 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Prepare with Mock Tests</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'nat' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-lg font-bold text-slate-900 mb-4">NAT-TEST India 2026 Schedule (Conducted 6 Times a Year)</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-700">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-900 font-bold uppercase text-[11px]">
                      <th className="py-3 px-4">Exam Session</th>
                      <th className="py-3 px-4">Test Date</th>
                      <th className="py-3 px-4">Application Deadline</th>
                      <th className="py-3 px-4">Levels</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {natTestExams.map((exam, idx) => (
                      <tr key={idx} className="hover:bg-slate-50">
                        <td className="py-3 px-4 font-bold text-slate-900">{exam.session}</td>
                        <td className="py-3 px-4 text-red-600 font-semibold">{exam.date}</td>
                        <td className="py-3 px-4 text-slate-500">{exam.deadline}</td>
                        <td className="py-3 px-4">{exam.levels}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'jft' && (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
              <h3 className="text-lg font-bold text-slate-900">JFT-Basic (Japan Foundation Test for Basic Japanese)</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                The JFT-Basic is a computer-based test (CBT) conducted multiple times throughout the year at Prometric testing centers in Bengaluru, Chennai, Delhi NCR, Mumbai, and Hyderabad. It is officially recognized as an equivalent to JLPT N4 for obtaining the <strong>Specified Skilled Worker (SSW 1) Status of Residence</strong>.
              </p>
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-800 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Test score reports are issued immediately upon exam completion at the Prometric workstation.</span>
              </div>
            </div>
          )}

          {/* Test Center Directory */}
          <div className="mt-14">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-extrabold text-slate-900">
                Official Indian Examination Centers &amp; Host Organizations
              </h2>
              <p className="text-xs sm:text-sm text-slate-600">
                Fuji Japanese Academy assists all enrolled students with test center registration and seat securing.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testCenters.map((center, idx) => (
                <div key={idx} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-sm text-slate-900 flex items-center gap-1.5">
                      <MapPin className="w-4 h-4 text-red-600" />
                      {center.city}, {center.state}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 rounded text-slate-700">
                      {center.tests}
                    </span>
                  </div>
                  <strong className="text-xs text-slate-800 block">{center.host}</strong>
                  <p className="text-[11px] text-slate-500 font-light">{center.address}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ExamCalendarPage;
