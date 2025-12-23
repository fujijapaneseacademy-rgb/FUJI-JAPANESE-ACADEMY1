
import React from 'react';
import { PlayCircle, Download, BookOpen, Gift, ArrowRight } from 'lucide-react';

const FREE_COURSES = [
  {
    title: 'Hiragana Mastery',
    description: 'Learn to read and write the first Japanese script in just 3 days.',
    type: 'Video Series',
    duration: '2 Hours',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Survival Japanese',
    description: 'Essential phrases for travelers - how to order food and ask for directions.',
    type: 'PDF Guide + Audio',
    duration: '1 Hour',
    image: 'https://images.unsplash.com/photo-1528164344705-4754268799af?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'Japanese Culture 101',
    description: 'Understand the basics of bowing, gift-giving, and table manners.',
    type: 'Mini Course',
    duration: '1.5 Hours',
    image: 'https://images.unsplash.com/photo-1557409518-691ebcd96038?auto=format&fit=crop&q=80&w=800'
  }
];

const FreeCourses: React.FC = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-emerald-50 py-16 mb-16">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-700 text-sm font-bold mb-6">
            <Gift className="w-4 h-4" />
            Learning For Everyone
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">Start Your Journey <span className="text-emerald-600">For Free</span></h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg leading-relaxed">
            At FUJI JAPANESE INSTITUTE, we believe language education should be accessible. Explore our curated selection of free introductory courses and study materials.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-6">
        {/* Course Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {FREE_COURSES.map((course, idx) => (
            <div key={idx} className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="h-48 relative overflow-hidden">
                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors"></div>
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                  {course.type}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">{course.title}</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">{course.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> {course.duration}
                  </span>
                  <button className="flex items-center gap-2 text-sm font-bold text-emerald-600 hover:text-emerald-700">
                    Access Now <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Resources Section */}
        <section className="bg-slate-900 rounded-[2.5rem] p-8 md:p-16 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
           
           <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
             <div>
               <h2 className="text-3xl font-bold mb-6">Free PDF Study Bank</h2>
               <p className="text-slate-400 mb-8 leading-relaxed">
                 Download our exclusive workbooks, Kanji practice sheets, and vocabulary cheat sheets developed by our expert faculty.
               </p>
               <div className="space-y-4">
                 {[
                   'Hiragana & Katakana Workbook (15 Pages)',
                   'Top 100 Common Japanese Verbs Cheat Sheet',
                   'Japan Travel Survival Pocket Guide',
                   'JLPT N5 Vocabulary List PDF'
                 ].map((item, i) => (
                   <div key={i} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                     <div className="w-10 h-10 bg-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400">
                        <Download className="w-5 h-5" />
                     </div>
                     <span className="flex-grow font-medium">{item}</span>
                     <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                   </div>
                 ))}
               </div>
             </div>
             <div className="hidden lg:block">
               <div className="aspect-square bg-emerald-500/20 rounded-full flex items-center justify-center p-20 animate-pulse">
                 <div className="w-full h-full bg-emerald-500/20 rounded-full flex items-center justify-center">
                    <PlayCircle className="w-24 h-24 text-emerald-400" />
                 </div>
               </div>
             </div>
           </div>
        </section>

        {/* Community Info */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Join Our Weekly Community Class</h2>
          <p className="text-slate-500 mb-8 max-w-xl mx-auto">
            Every Sunday at 11 AM, we host a free 45-minute "Conversation Circle" for anyone interested in practicing Japanese.
          </p>
          <a href="https://wa.me/919071054569" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-full font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition-all">
            Get Meeting Link via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default FreeCourses;
