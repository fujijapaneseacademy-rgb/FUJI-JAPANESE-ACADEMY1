
import React from 'react';
import { NavLink } from 'react-router-dom';
import { COURSES } from '../constants';
import { CheckCircle, Clock, Calendar, Gift, ArrowRight } from 'lucide-react';

interface CoursesProps {
  onOpenEnrollment: (courseName?: string) => void;
}

const Courses: React.FC<CoursesProps> = ({ onOpenEnrollment }) => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 md:px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Our Japanese Courses</h1>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Comprehensive curriculum tailored for all levels. From absolute beginners to advanced business professionals.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {COURSES.map((course) => (
            <div key={course.id} className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-stone-100 flex flex-col md:flex-row h-full">
              <div className="md:w-2/5 relative">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover min-h-[250px]" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indigo-900 shadow-sm">
                  {course.jlptLevel || 'Special'}
                </div>
              </div>
              
              <div className="p-6 md:w-3/5 flex flex-col">
                <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-bold text-slate-900">{course.title}</h3>
                   <span className="text-red-600 font-bold">{course.price}</span>
                </div>
                
                <p className="text-slate-500 text-sm mb-4 leading-relaxed flex-grow">
                  {course.description}
                </p>

                <div className="grid grid-cols-2 gap-y-2 gap-x-4 mb-6">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Clock className="w-4 h-4 text-indigo-500" />
                    {course.duration}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Calendar className="w-4 h-4 text-indigo-500" />
                    Weekend/Weekday
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  {course.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => onOpenEnrollment(course.title)}
                  className="w-full py-3 rounded-lg border-2 border-indigo-900 text-indigo-900 font-bold hover:bg-indigo-900 hover:text-white transition-all"
                >
                  Enroll Now
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Banner for Free Courses */}
        <div className="mb-8 p-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl">
          <div className="bg-white rounded-[1.4rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600">
                <Gift className="w-8 h-8" />
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-slate-900">Starting from scratch?</h3>
                <p className="text-slate-500">Check out our free introductory resources and master Hiragana today.</p>
              </div>
            </div>
            <NavLink to="/courses/free" className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 transition-all flex items-center gap-2 shadow-lg shadow-emerald-100">
              Explore Free Courses <ArrowRight className="w-5 h-5" />
            </NavLink>
          </div>
        </div>

        {/* Additional Info */}
        <div className="p-8 bg-indigo-50 rounded-2xl border border-indigo-100">
          <h3 className="text-xl font-bold text-indigo-900 mb-4">Looking for customized Corporate Training?</h3>
          <p className="text-slate-700 mb-6">
            We offer tailored language training solutions for companies planning to expand to Japan or upskill their workforce.
            Contact us specifically for corporate packages.
          </p>
          <button onClick={() => onOpenEnrollment('Corporate Training')} className="text-red-600 font-bold hover:underline">
            Request Corporate Brochure &rarr;
          </button>
        </div>

      </div>
    </div>
  );
};

export default Courses;
