
import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Globe, UserPlus } from 'lucide-react';
import { NAV_LINKS } from '../constants';

interface NavbarProps {
  onOpenEnrollment: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenEnrollment }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-white py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
            <img 
              src="https://image2url.com/images/1764928010721-5671d4df-5ac0-4670-bff8-3dc3f877ee68.png" 
              alt="FUJI JAPANESE INSTITUTE Logo" 
              className="w-12 h-12 object-contain rounded-lg"
            />
            <div className="flex flex-col">
              <span className="font-bold text-gray-900 leading-tight">FUJI</span>
              <span className="text-xs text-gray-500 tracking-wider uppercase">Japanese Institute</span>
            </div>
        </NavLink>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className={({ isActive }) => 
                `text-sm font-medium transition-colors hover:text-red-600 ${
                  isActive ? 'text-red-600 font-semibold' : 'text-gray-600'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <button 
            onClick={onOpenEnrollment}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-900 text-white rounded-full text-sm font-semibold hover:bg-indigo-800 transition-all hover:shadow-lg active:scale-95"
          >
            <UserPlus className="w-4 h-4" />
            Apply Now
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="md:hidden text-gray-700 hover:text-red-600 transition-colors"
        >
          {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl flex flex-col p-4 animate-in slide-in-from-top-5 duration-200">
          {NAV_LINKS.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className={({ isActive }) => 
                `py-3 px-4 rounded-lg transition-colors ${
                  isActive ? 'bg-red-50 text-red-600 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <div className="h-px bg-gray-100 my-2" />
          <button 
            onClick={() => {
              onOpenEnrollment();
              setIsOpen(false);
            }}
            className="w-full mt-2 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700"
          >
            Enroll Now
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
