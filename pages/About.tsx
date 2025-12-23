
import React from 'react';
import { FACULTY } from '../constants';
import { Users, Target, Heart } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="pt-24 pb-20 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Story */}
        <section className="mb-20">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8 text-center">About FUJI JAPANESE INSTITUTE</h1>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img src="https://picsum.photos/id/1015/800/600" alt="Institute Campus" className="rounded-2xl shadow-2xl" />
            </div>
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-indigo-900">Bridging Cultures Since 2015</h2>
              <p className="text-slate-600 leading-relaxed">
                FUJI JAPANESE INSTITUTE was founded with a singular mission: to provide world-class Japanese language education that goes beyond textbooks. 
                We believe that learning a language is learning a new way of thinking.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Located in the heart of the city, our campus is designed to mimic a mini-Japan, providing an immersive environment for students to practice their skills freely.
              </p>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">5k+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Graduates</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">95%</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Pass Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-600">20+</div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Partners</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="mb-20 bg-stone-50 rounded-3xl p-12">
           <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-red-600">
                  <Target className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Excellence</h3>
                <p className="text-sm text-slate-600">We strive for perfection in our teaching methodology and student support.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-red-600">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Passion</h3>
                <p className="text-sm text-slate-600">Our love for Japanese culture drives us to create engaging learning experiences.</p>
              </div>
              <div>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm text-red-600">
                  <Users className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-lg mb-2">Community</h3>
                <p className="text-sm text-slate-600">We build a lifelong network of learners, professionals, and Japan enthusiasts.</p>
              </div>
           </div>
        </section>

        {/* Faculty */}
        <section>
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Meet Our Sensei</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {FACULTY.map((member) => (
              <div key={member.id} className="group text-center">
                <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden border-4 border-stone-100 group-hover:border-red-500 transition-colors duration-300">
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                <p className="text-red-600 font-medium text-sm mb-3">{member.role}</p>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">{member.bio}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
