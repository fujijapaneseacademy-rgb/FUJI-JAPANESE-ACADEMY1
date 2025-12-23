
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Courses from './pages/Courses';
import FreeCourses from './pages/FreeCourses';
import About from './pages/About';
import Contact from './pages/Contact';
import Blog from './pages/Blog';
import Careers from './pages/Careers';
import ScriptSetup from './pages/ScriptSetup';
import EnrollmentModal from './components/EnrollmentModal';
import FujiAssistant from './components/FujiAssistant';
import WhatsAppFloat from './components/WhatsAppFloat';

// ScrollToTop component to handle route changes
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  const [isEnrollmentOpen, setIsEnrollmentOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | undefined>(undefined);

  const handleOpenEnrollment = (courseName?: string) => {
    setSelectedCourse(courseName);
    setIsEnrollmentOpen(true);
  };

  return (
    <HashRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col font-sans">
        <Navbar onOpenEnrollment={() => handleOpenEnrollment()} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home onOpenEnrollment={() => handleOpenEnrollment()} />} />
            <Route path="/courses" element={<Courses onOpenEnrollment={handleOpenEnrollment} />} />
            <Route path="/courses/free" element={<FreeCourses />} />
            <Route path="/about" element={<About />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/admin/setup" element={<ScriptSetup />} />
          </Routes>
        </main>
        
        <Footer />
        <EnrollmentModal 
          isOpen={isEnrollmentOpen} 
          onClose={() => setIsEnrollmentOpen(false)} 
          courseTitle={selectedCourse}
        />
        <FujiAssistant />
        <WhatsAppFloat />
      </div>
    </HashRouter>
  );
};

export default App;
