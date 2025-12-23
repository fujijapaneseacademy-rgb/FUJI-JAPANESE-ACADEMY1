
import React from 'react';
import { NavLink } from 'react-router-dom';
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Settings } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4 text-white">
              <img 
                src="https://image2url.com/images/1764928010721-5671d4df-5ac0-4670-bff8-3dc3f877ee68.png" 
                alt="FUJI INSTITUTE Logo" 
                className="w-10 h-10 object-contain bg-white rounded-lg p-0.5"
              />
              <span className="font-bold text-lg">FUJI INSTITUTE</span>
            </div>
            <p className="text-sm leading-relaxed mb-6 text-slate-400">
              Your gateway to mastering the Japanese language and culture. Premium JLPT coaching at FUJI JAPANESE INSTITUTE with native expertise.
            </p>
            <div className="flex gap-4">
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-red-600 hover:text-white transition-all"><Facebook className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-red-600 hover:text-white transition-all"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 bg-slate-800 rounded-full hover:bg-red-600 hover:text-white transition-all"><Linkedin className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><NavLink to="/" className="hover:text-red-500 transition-colors">Home</NavLink></li>
              <li><NavLink to="/about" className="hover:text-red-500 transition-colors">About Us</NavLink></li>
              <li><NavLink to="/courses" className="hover:text-red-500 transition-colors">Courses</NavLink></li>
              <li><NavLink to="/careers" className="hover:text-red-500 transition-colors">Careers</NavLink></li>
              <li><NavLink to="/blog" className="hover:text-red-500 transition-colors">Blog & News</NavLink></li>
              <li><NavLink to="/contact" className="hover:text-red-500 transition-colors">Contact</NavLink></li>
            </ul>
          </div>

          {/* Courses */}
          <div>
            <h4 className="text-white font-bold mb-4">Popular Courses</h4>
            <ul className="space-y-2 text-sm">
              <li><NavLink to="/courses" className="hover:text-red-500 transition-colors">JLPT N5 Beginner</NavLink></li>
              <li><NavLink to="/courses" className="hover:text-red-500 transition-colors">JLPT N4 Basic</NavLink></li>
              <li><NavLink to="/courses" className="hover:text-red-500 transition-colors">JLPT N3 Intermediate</NavLink></li>
              <li><NavLink to="/courses" className="hover:text-red-500 transition-colors">Spoken Japanese</NavLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>1st Floor, Electronic City Main Road,<br/>Bengaluru, Karnataka 560100</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-red-500 shrink-0" />
                <span>+91 90710 54569</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-red-500 shrink-0" />
                <span>fujijapaneseacademy@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} FUJI JAPANESE INSTITUTE. All rights reserved.</p>
          <NavLink to="/admin/setup" className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
            <Settings className="w-3 h-3" /> Sheets & Email Setup
          </NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
