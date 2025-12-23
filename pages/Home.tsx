
import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ArrowRight, Star, CheckCircle } from 'lucide-react';
import { FEATURES, COURSES, TESTIMONIALS } from '../constants';

interface HomeProps {
  onOpenEnrollment: () => void;
}

const HERO_IMAGES = [
  "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?auto=format&fit=crop&q=80&w=2000", // Mt. Fuji & Chureito Pagoda
  "https://images.unsplash.com/photo-1590253230533-51b8d6411516?auto=format&fit=crop&q=80&w=2000", // Fushimi Inari Torii Gates
  "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?auto=format&fit=crop&q=80&w=2000", // Himeji Castle
  "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&q=80&w=2000", // Nachi Falls & Pagoda
  "https://images.unsplash.com/photo-1522383225653-ed111181a951?auto=format&fit=crop&q=80&w=2000"  // Cherry Blossoms
];

const Home: React.FC<HomeProps> = ({ onOpenEnrollment }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % HERO_IMAGES.length);
    }, 4000); // 4 seconds interval

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section with Slideshow */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden pt-20">
        
        {/* Background Slideshow */}
        <div className="absolute inset-0 z-0">
          {HERO_IMAGES.map((img, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentImageIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <img 
                src={img} 
                alt="Japanese Scenery" 
                className="w-full h-full object-cover object-center"
              />
              {/* Dark Overlay for Text Readability */}
              <div className="absolute inset-0 bg-black/40"></div>
            </div>
          ))}
        </div>
        
        {/* Content */}
        <div className="container mx-auto px-4 md:px-6 relative z-20 text-center text-white">
          <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-10 duration-1000">
            
            <div className="inline-block">
              <span className="bg-red-600 text-white text-xs md:text-sm font-bold tracking-[0.2em] px-4 py-1.5 rounded-full uppercase mb-4 shadow-lg border border-red-500/50">
                Welcome to FUJI JAPANESE INSTITUTE
              </span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight tracking-tight drop-shadow-lg">
              Experience <span className="text-red-500">Japan</span> <br/>
              <span className="text-white">In Your Classroom</span>
            </h1>
            
            <p className="text-lg md:text-xl text-stone-200 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md">
              Your gateway to mastering the Japanese language. From JLPT N5 to N1, cultural immersion, and career guidance. Join the #1 Japanese Institute today.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-5 justify-center pt-6">
              <button 
                onClick={onOpenEnrollment}
                className="px-8 py-4 bg-red-600 text-white rounded-full font-bold text-lg shadow-[0_0_20px_rgba(220,38,38,0.5)] hover:bg-red-700 hover:scale-105 transition-all flex items-center justify-center gap-2 group"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <NavLink 
                to="/courses"
                className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold text-lg shadow-lg hover:bg-white hover:text-red-900 transition-all flex items-center justify-center"
              >
                Explore Courses
              </NavLink>
            </div>

            {/* Trust Indicators */}
            <div className="pt-10 flex flex-col items-center gap-3">
              <div className="flex -space-x-3">
                 {[1,2,3,4,5].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-white overflow-hidden shadow-lg">
                     <img src={`https://picsum.photos/id/${60+i}/100/100`} alt="Student" className="w-full h-full object-cover"/>
                   </div>
                 ))}
                 <div className="w-10 h-10 rounded-full bg-white text-red-600 flex items-center justify-center font-bold text-xs border-2 border-white shadow-lg">+5k</div>
              </div>
              <p className="text-sm font-medium text-stone-300 drop-shadow-md">Joined by 5,000+ Students</p>
            </div>

          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20 opacity-70">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <span className="text-red-600 font-bold tracking-wider text-sm uppercase">Why Choose Us</span>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mt-2 mb-4">Your Pathway to Fluency</h2>
            <div className="w-20 h-1 bg-red-600 mx-auto rounded-full"></div>
            <p className="text-slate-500 max-w-2xl mx-auto mt-6 text-lg">At FUJI JAPANESE INSTITUTE, we combine traditional teaching methods with modern technology to provide an unparalleled learning experience.</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="p-8 rounded-2xl bg-stone-50 hover:bg-white hover:shadow-xl hover:-translate-y-1 border border-stone-100 transition-all duration-300 group">
                <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-red-600 transition-colors duration-300">
                  <div className="text-red-600 group-hover:text-white transition-colors duration-300">
                    {React.cloneElement(feature.icon as React.ReactElement<{ className?: string }>, { className: "w-7 h-7" })}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="py-24 bg-indigo-950 text-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-red-600/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div>
               <span className="text-red-400 font-bold tracking-wider uppercase text-sm">Our Curriculum</span>
               <h2 className="text-3xl md:text-4xl font-bold mt-2">Popular Courses</h2>
            </div>
            <NavLink to="/courses" className="hidden md:flex items-center gap-2 px-6 py-3 bg-white/10 rounded-full hover:bg-white hover:text-indigo-950 transition-all font-semibold backdrop-blur-sm border border-white/10">
              View All Courses <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {COURSES.slice(0, 3).map((course) => (
              <div key={course.id} className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="h-56 overflow-hidden relative">
                  <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded-md text-xs font-bold text-indigo-900 shadow-sm uppercase tracking-wider">
                    {course.jlptLevel || 'Special'}
                  </div>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300"></div>
                </div>
                <div className="p-8">
                  <div className="flex justify-between items-center mb-4">
                     <span className="text-indigo-600 text-sm font-bold bg-indigo-50 px-3 py-1 rounded-full">{course.duration}</span>
                     <div className="flex text-yellow-400">
                       <Star className="w-4 h-4 fill-current" />
                       <Star className="w-4 h-4 fill-current" />
                       <Star className="w-4 h-4 fill-current" />
                       <Star className="w-4 h-4 fill-current" />
                       <Star className="w-4 h-4 fill-current" />
                     </div>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-red-600 transition-colors">{course.title}</h3>
                  <p className="text-slate-500 text-sm mb-6 line-clamp-2 leading-relaxed">{course.description}</p>
                  
                  <div className="border-t border-slate-100 pt-6 flex items-center justify-between">
                    <span className="text-slate-900 font-bold text-lg">{course.price}</span>
                    <button 
                      onClick={onOpenEnrollment}
                      className="text-red-600 font-bold text-sm hover:underline flex items-center gap-1"
                    >
                      Enroll Now <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-12 text-center md:hidden">
             <NavLink to="/courses" className="inline-flex items-center gap-2 text-white font-semibold border-b border-red-500 pb-1">
              View All Courses <ArrowRight className="w-4 h-4" />
            </NavLink>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">Voices of Success</h2>
            <p className="text-slate-500 max-w-xl mx-auto">Hear from our students who have transformed their careers and lives through Japanese at FUJI JAPANESE INSTITUTE.</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-stone-50 p-10 rounded-[2rem] relative hover:bg-stone-100 transition-colors">
                <div className="absolute -top-6 -left-2 text-9xl text-indigo-100 font-serif leading-none select-none">"</div>
                <div className="relative z-10">
                  <div className="flex items-center gap-1 mb-6 text-yellow-400">
                     {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-slate-700 text-lg italic mb-8 leading-relaxed font-light">"{testimonial.content}"</p>
                  <div className="flex items-center gap-4 border-t border-slate-200 pt-6">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover ring-4 ring-white" />
                    <div>
                      <h4 className="font-bold text-slate-900 text-lg">{testimonial.name}</h4>
                      <p className="text-sm text-red-600 font-medium">{testimonial.role}</p>
                    </div>
                    <div className="ml-auto text-xs font-bold text-slate-400 bg-white px-3 py-1 rounded-full shadow-sm">
                      {testimonial.courseTaken}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-red-600 to-red-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <div className="container mx-auto px-4 md:px-6 text-center text-white relative z-10">
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 tracking-tight">Ready to start your journey?</h2>
          <p className="text-xl text-red-100 mb-10 max-w-2xl mx-auto font-light">
            Join our next batch at FUJI JAPANESE INSTITUTE and take the first step towards fluency. <br/> Free trial classes available this weekend.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={onOpenEnrollment}
              className="px-10 py-5 bg-white text-red-700 rounded-full font-bold text-lg shadow-2xl hover:shadow-white/20 hover:scale-105 transition-all"
            >
              Register for Free Trial
            </button>
            <NavLink 
              to="/contact"
              className="px-10 py-5 bg-red-800/50 backdrop-blur-sm border border-red-500 text-white rounded-full font-bold text-lg hover:bg-red-800 transition-all"
            >
              Contact Us
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
