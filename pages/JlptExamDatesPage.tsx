import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Award, 
  BookOpen, 
  ArrowRight,
  ExternalLink,
  HelpCircle,
  FileText
} from 'lucide-react';

export const JlptExamDatesPage: React.FC = () => {
  return (
    <div className="flex flex-col w-full min-h-screen bg-white">
      <Helmet>
        <title>India JLPT Exam Dates 2026, Registration Deadlines & Test Centers | Fuji Japanese Academy</title>
        <meta 
          name="description" 
          content="Official 2026 JLPT exam dates, registration deadlines, fee breakdowns, and test center directory for Bengaluru, Chennai, New Delhi, Pune, Mumbai, and Kolkata. Prepare with Fuji Japanese Academy." 
        />
        <meta 
          name="keywords" 
          content="JLPT exam dates India 2026, JLPT registration Bangalore, JLPT exam fee India, JLPT test centers India, JLPT July 2026 date, JLPT December 2026 date" 
        />
        <link rel="canonical" href="https://fujijapaneseacademy.com/jlpt-exam-dates-india" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Event",
            "name": "July 2026 Japanese Language Proficiency Test (JLPT) India",
            "startDate": "2026-07-05T09:00:00+05:30",
            "endDate": "2026-07-05T17:00:00+05:30",
            "eventStatus": "https://schema.org/EventScheduled",
            "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
            "location": {
              "@type": "Place",
              "name": "Multiple JLPT Examination Centers (Bengaluru, Delhi, Chennai, Pune, Mumbai, Kolkata)",
              "address": {
                "@type": "PostalAddress",
                "addressCountry": "IN"
              }
            },
            "organizer": {
              "@type": "Organization",
              "name": "The Japan Foundation",
              "url": "https://www.jlpt.jp/"
            },
            "description": "Official JLPT certification examination conducted across testing centers in India for N5, N4, N3, N2, and N1 levels."
          })}
        </script>
      </Helmet>

      {/* Header Banner */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-900/30 via-transparent to-transparent pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-bold uppercase tracking-wider text-red-400 mb-4">
            <Calendar className="w-4 h-4" />
            <span>Official Examination Guide (2026–2027)</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight font-display mb-4">
            India JLPT Exam Dates, Deadlines &amp; <br className="hidden sm:inline" />
            <span className="text-red-500 italic">Test Center Directory</span>
          </h1>

          <p className="text-gray-300 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            The Japanese Language Proficiency Test (JLPT) is administered twice a year in India by the Japan Foundation. Track official dates, fees, and test center procedures below.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a
              href="#exam-calendar"
              className="px-6 py-3 rounded-full bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-all shadow-lg shadow-red-900/40"
            >
              View 2026 Schedule
            </a>
            <NavLink
              to="/courses"
              className="px-6 py-3 rounded-full bg-white/10 hover:bg-white hover:text-gray-900 text-white border border-white/30 font-bold text-sm transition-all"
            >
              Pass With Fuji Crash Course
            </NavLink>
          </div>
        </div>
      </section>

      {/* 1. Official Exam Calendar */}
      <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-100" id="exam-calendar">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
              Official Testing Cycles
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
              2026 India JLPT Official Calendar
            </h2>
            <p className="text-gray-600 mt-2 text-sm sm:text-base">
              Mark your calendar and set reminders. Registration slots fill rapidly within the first 48 hours.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* July Cycle */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-28 h-28 bg-red-50 rounded-bl-full -z-0" />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-700 font-bold text-xs uppercase tracking-wider mb-3">
                  Summer Cycle
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">July 2026 Examination</h3>
                <p className="text-3xl font-extrabold text-red-600 mb-6">Sunday, July 5, 2026</p>

                <ul className="space-y-3.5 text-sm text-gray-700 mb-8">
                  <li className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Registration Opens:</strong> March 1, 2026 (10:00 AM IST)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Registration Closes:</strong> March 25, 2026 (5:00 PM IST)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Results Released:</strong> Late August 2026</span>
                  </li>
                </ul>
              </div>

              <NavLink
                to="/enquire"
                className="w-full py-3.5 rounded-xl bg-gray-900 hover:bg-red-600 text-white font-bold text-sm text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enroll in July Prep Batch</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </div>

            {/* December Cycle */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-28 h-28 bg-blue-50 rounded-bl-full -z-0" />
              <div className="relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-bold text-xs uppercase tracking-wider mb-3">
                  Winter Cycle
                </span>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">December 2026 Examination</h3>
                <p className="text-3xl font-extrabold text-blue-600 mb-6">Sunday, December 6, 2026</p>

                <ul className="space-y-3.5 text-sm text-gray-700 mb-8">
                  <li className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span><strong>Registration Opens:</strong> August 1, 2026 (10:00 AM IST)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                    <span><strong>Registration Closes:</strong> August 28, 2026 (5:00 PM IST)</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span><strong>Results Released:</strong> Late January 2027</span>
                  </li>
                </ul>
              </div>

              <NavLink
                to="/enquire"
                className="w-full py-3.5 rounded-xl bg-gray-900 hover:bg-blue-600 text-white font-bold text-sm text-center transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Enroll in December Prep Batch</span>
                <ArrowRight className="w-4 h-4" />
              </NavLink>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Official Fee Breakdown */}
      <section className="py-16 md:py-24 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-4xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
              Examination Fees
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">
              Official JLPT Fee Structure Across India
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Standardized across Indian regional testing associations (inclusive of test booklet &amp; certificate courier).
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-900 text-white text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-4 px-6">JLPT Level</th>
                  <th className="py-4 px-6">Proficiency Description</th>
                  <th className="py-4 px-6 text-right">Official Test Fee</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold text-red-600">JLPT N5</td>
                  <td className="py-4 px-6 text-gray-600">Beginner (103 Kanji, Basic grammar &amp; Hiragana/Katakana)</td>
                  <td className="py-4 px-6 text-right font-bold text-gray-900">₹1,500 – ₹1,800</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold text-red-600">JLPT N4</td>
                  <td className="py-4 px-6 text-gray-600">Elementary (300 Kanji, 1,500 words, daily conversations)</td>
                  <td className="py-4 px-6 text-right font-bold text-gray-900">₹1,500 – ₹1,800</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold text-red-600">JLPT N3</td>
                  <td className="py-4 px-6 text-gray-600">Intermediate (650 Kanji, IT &amp; business entry level)</td>
                  <td className="py-4 px-6 text-right font-bold text-gray-900">₹1,800 – ₹2,200</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold text-red-600">JLPT N2</td>
                  <td className="py-4 px-6 text-gray-600">Advanced (1,000+ Kanji, corporate business fluency)</td>
                  <td className="py-4 px-6 text-right font-bold text-gray-900">₹1,800 – ₹2,200</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-bold text-red-600">JLPT N1</td>
                  <td className="py-4 px-6 text-gray-600">Expert / Academic (2,000+ Kanji, native fluency)</td>
                  <td className="py-4 px-6 text-right font-bold text-gray-900">₹2,000 – ₹2,500</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. Official Test Center Directory */}
      <section className="py-16 md:py-24 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 md:px-6 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-red-600 uppercase tracking-widest block mb-1">
              Examination Venues
            </span>
            <h2 className="text-3xl font-extrabold text-gray-900">
              India JLPT Test Centers &amp; Host Institutions
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Select your testing city to view authorized regional host associations and venues.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Bengaluru */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">Bengaluru (Bangalore)</h3>
              <p className="text-xs text-gray-500 mb-3">Host: Bangalore Nihongo Kyooshikai (BNK)</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Typical venues: Central College Campus &amp; Mount Carmel College, Vasanth Nagar.
              </p>
              <div className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md inline-block">
                Fuji In-Person Support Available
              </div>
            </div>

            {/* Chennai */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">Chennai</h3>
              <p className="text-xs text-gray-500 mb-3">Host: ABK-AOTS DOSOKAI, Tamil Nadu</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Typical venues: Hindustan Institute of Technology &amp; Science / Loyola College.
              </p>
              <div className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md inline-block">
                Covers Tamil Nadu &amp; Puducherry
              </div>
            </div>

            {/* New Delhi */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">New Delhi (NCR)</h3>
              <p className="text-xs text-gray-500 mb-3">Host: MOSAI (Mombusho Scholars)</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Typical venues: Delhi Public School (R.K. Puram) &amp; JNU Campus.
              </p>
              <div className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md inline-block">
                Covers North India
              </div>
            </div>

            {/* Pune */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">Pune</h3>
              <p className="text-xs text-gray-500 mb-3">Host: Indo-Japanese Association, Pune</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Typical venue: Tilak Maharashtra Vidyapeeth (TMV), Gultekdi, Pune.
              </p>
              <div className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md inline-block">
                Major IT Tech Corridor
              </div>
            </div>

            {/* Mumbai */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">Mumbai</h3>
              <p className="text-xs text-gray-500 mb-3">Host: Indo-Japanese Association, Mumbai</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Typical venue: University of Mumbai, Vidyanagari Campus, Kalina.
              </p>
              <div className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md inline-block">
                Covers MMR &amp; Western Region
              </div>
            </div>

            {/* Kolkata */}
            <div className="p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-4">
                <MapPin className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg text-gray-900 mb-1">Kolkata</h3>
              <p className="text-xs text-gray-500 mb-3">Host: Indo-Japan Welfare &amp; Cultural Assn.</p>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Typical venues: Jadavpur University &amp; affiliated regional institutions.
              </p>
              <div className="text-xs font-semibold text-gray-700 bg-gray-100 px-2.5 py-1 rounded-md inline-block">
                Covers East &amp; North-East India
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Pass Guaranteed CTA */}
      <section className="py-20 bg-gradient-to-br from-red-600 to-red-700 text-white text-center">
        <div className="container mx-auto px-4 md:px-6 max-w-3xl">
          <Award className="w-12 h-12 mx-auto mb-4 opacity-90" />
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Pass Your Upcoming JLPT on Your First Attempt
          </h2>
          <p className="text-red-100 text-base md:text-lg mb-8 leading-relaxed">
            Join Fuji Japanese Academy&apos;s proven cohort in Electronic City, Bengaluru or live online across India. Benefit from native sensei drills, timed mock tests, and a 98.4% passing track record.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <NavLink
              to="/courses"
              className="px-8 py-4 rounded-full bg-white text-red-600 font-bold text-base shadow-xl hover:bg-gray-100 transition-all cursor-pointer"
            >
              Explore JLPT Courses (N5 to N1)
            </NavLink>
            <NavLink
              to="/enquire"
              className="px-8 py-4 rounded-full bg-red-900/40 hover:bg-red-900/60 text-white border border-white/30 font-bold text-base transition-all cursor-pointer"
            >
              Book a Free Counseling Session
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default JlptExamDatesPage;
