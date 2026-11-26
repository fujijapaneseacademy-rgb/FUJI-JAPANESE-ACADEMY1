import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import { Home, BookOpen, Phone, ArrowLeft } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-fuji-light flex items-center justify-center py-20 px-4 relative overflow-hidden">
      <Helmet>
        <title>404 - Page Not Found | Fuji Japanese Academy</title>
        <meta name="description" content="Page not found. Return to Fuji Japanese Academy homepage or explore courses." />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      {/* Decorative Mount Fuji silhouette background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-fuji-indigo/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-lg w-full bg-white rounded-[2.5rem] p-8 sm:p-12 shadow-2xl border border-gray-100 text-center relative z-10">
        <div className="w-20 h-20 rounded-full bg-fuji-red/10 text-fuji-red mx-auto mb-6 flex items-center justify-center font-display font-black text-3xl">
          404
        </div>

        <span className="text-xs font-bold text-fuji-red tracking-[0.25em] uppercase block mb-1">
          ページが見つかりません
        </span>
        <h1 className="font-display font-black text-3xl sm:text-4xl text-fuji-indigo mb-3">
          Page Not Found
        </h1>
        <p className="text-fuji-slate/70 text-sm leading-relaxed mb-8">
          The page you are looking for might have been moved, renamed, or is temporarily unavailable. Let us help you find your way back.
        </p>

        <div className="space-y-3 mb-8">
          <NavLink
            to="/"
            className="w-full py-3.5 px-6 rounded-xl bg-fuji-indigo text-white font-bold text-sm hover:bg-fuji-indigo/90 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Home className="w-4 h-4" />
            <span>Return to Homepage</span>
          </NavLink>

          <NavLink
            to="/courses"
            className="w-full py-3.5 px-6 rounded-xl bg-fuji-red text-white font-bold text-sm hover:bg-fuji-darkRed shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4" />
            <span>Explore Japanese Courses</span>
          </NavLink>

          <NavLink
            to="/contact"
            className="w-full py-3 px-6 rounded-xl bg-gray-100 text-fuji-indigo font-bold text-sm hover:bg-gray-200 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4" />
            <span>Contact Academy Support</span>
          </NavLink>
        </div>

        <div className="pt-6 border-t border-gray-100 flex items-center justify-center gap-2 text-xs text-gray-400">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Need help? Call <a href="tel:+916364924110" className="hover:text-fuji-red">+91 63649 24110</a></span>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
