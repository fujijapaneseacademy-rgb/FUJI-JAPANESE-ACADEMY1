
import React, { useState, useEffect, useLayoutEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import PublicLayout from './components/PublicLayout';
import PageLoader from './components/PageLoader';
import ErrorBoundary from './components/ErrorBoundary';
import { initGlobalClickTracking, trackPageView } from './src/lib/analytics';

const AdminLayout = React.lazy(() => import('./pages/admin/AdminLayout'));

// Lazy load pages
const Home = React.lazy(() => import('./pages/Home'));
const Courses = React.lazy(() => import('./pages/Courses'));
const CourseDetailPage = React.lazy(() => import('./pages/CourseDetailPage'));
const FreeCourses = React.lazy(() => import('./pages/FreeCourses'));
const About = React.lazy(() => import('./pages/About'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPostPage = React.lazy(() => import('./pages/BlogPostPage'));
const Careers = React.lazy(() => import('./pages/Careers'));
const PrivacyPolicy = React.lazy(() => import('./pages/PrivacyPolicy'));
const TermsAndConditions = React.lazy(() => import('./pages/TermsAndConditions'));
const Connect = React.lazy(() => import('./pages/Connect'));
const QRCodePage = React.lazy(() => import('./pages/QRCodePage'));
const NotFound = React.lazy(() => import('./pages/NotFound'));
const ScriptSetup = React.lazy(() => import('./pages/ScriptSetup'));
const Login = React.lazy(() => import('./pages/Login'));
const Signup = React.lazy(() => import('./pages/Signup'));
const ForgotPassword = React.lazy(() => import('./pages/ForgotPassword'));
const ResetPassword = React.lazy(() => import('./pages/ResetPassword'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// New Core Hubs & Admissions Pages
const EnquirePage = React.lazy(() => import('./pages/EnquirePage'));
const JLPTPage = React.lazy(() => import('./pages/JLPTPage'));
const LearnPage = React.lazy(() => import('./pages/LearnPage'));
const PracticePage = React.lazy(() => import('./pages/PracticePage'));
const CareerPage = React.lazy(() => import('./pages/CareerPage'));
const LocationPage = React.lazy(() => import('./pages/LocationPage'));
const NewsPage = React.lazy(() => import('./pages/NewsPage'));
const PaymentPage = React.lazy(() => import('./pages/PaymentPage'));
const MockTestPage = React.lazy(() => import('./pages/MockTestPage'));
const CorporatePage = React.lazy(() => import('./pages/CorporatePage'));
const JlptExamDatesPage = React.lazy(() => import('./pages/JlptExamDatesPage'));
const LocationLandingPage = React.lazy(() => import('./pages/LocationLandingPage'));
const StateHubPage = React.lazy(() => import('./pages/StateHubPage'));
const JobCataloguePage = React.lazy(() => import('./pages/JobCataloguePage'));
const ExamCalendarPage = React.lazy(() => import('./pages/ExamCalendarPage'));
const CollegePartnershipsPage = React.lazy(() => import('./pages/CollegePartnershipsPage'));
const VerifyCertificatePage = React.lazy(() => import('./pages/VerifyCertificatePage'));

// Admin Lazy Load
const AdminDashboard = React.lazy(() => import('./pages/admin/AdminDashboard'));
const AdminBlogs = React.lazy(() => import('./pages/admin/AdminBlogs'));
const AdminCourses = React.lazy(() => import('./pages/admin/AdminCourses'));
const AdminFreeCourses = React.lazy(() => import('./pages/admin/AdminFreeCourses'));

const AdminJobs = React.lazy(() => import('./pages/admin/AdminJobs'));
const AdminUsers = React.lazy(() => import('./pages/admin/AdminUsers'));
const AdminInquiries = React.lazy(() => import('./pages/admin/AdminInquiries'));

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  // 1. Disable browser's native automatic scroll restoration so it doesn't fight route navigation
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.history && 'scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
    } catch {}
  }, []);

  const scrollToHeader = () => {
    try {
      if (typeof window === 'undefined' || typeof document === 'undefined') return;
      if (location.hash) {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
      if (typeof window.scrollTo === 'function') {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
      }
      if (document.documentElement) document.documentElement.scrollTop = 0;
      if (document.body) document.body.scrollTop = 0;
    } catch {}
  };

  // 2. Immediate scroll reset before paint
  useLayoutEffect(() => {
    scrollToHeader();
  }, [location.pathname, location.search, location.hash, location.key]);

  // 3. Multi-frame retry to accommodate React.lazy Suspense chunk mounting & layout stabilization
  useEffect(() => {
    scrollToHeader();
    const t1 = setTimeout(scrollToHeader, 50);
    const t2 = setTimeout(scrollToHeader, 150);
    const t3 = setTimeout(scrollToHeader, 350);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [location.pathname, location.search, location.hash, location.key]);

  // 4. Handle clicks on links to the current page (e.g. clicking "Courses" or "Home" while scrolled down)
  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement)?.closest('a');
      if (!link) return;
      const href = link.getAttribute('href');
      if (!href) return;

      // Ignore external or protocol links
      if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) return;

      // If clicking hash anchor on current page
      if (href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }

      // If clicking link to current route (e.g. while scrolled near footer)
      const cleanHref = href.split('?')[0].split('#')[0];
      const currentPath = window.location.pathname;
      if (cleanHref === currentPath || (cleanHref === '/' && currentPath === '/')) {
        const hashIndex = href.indexOf('#');
        if (hashIndex !== -1) {
          const hash = href.substring(hashIndex);
          const target = document.querySelector(hash);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth' });
            if (window.history && window.history.pushState) {
              window.history.pushState(null, '', href);
            }
            return;
          }
        }
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      }
    };

    window.addEventListener('click', handleLinkClick);
    return () => window.removeEventListener('click', handleLinkClick);
  }, []);

  return null;
};


const AnalyticsTracker: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    const cleanup = initGlobalClickTracking();
    return cleanup;
  }, []);

  useEffect(() => {
    trackPageView(location.pathname + location.search, document.title);
  }, [location.pathname, location.search]);

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
    <BrowserRouter>
      <ScrollToTop />
      <AnalyticsTracker />
      <div className="min-h-screen flex flex-col font-sans">
        <React.Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public Routes - Wrapped in PublicLayout */}
            <Route element={
              <PublicLayout
                onOpenEnrollment={handleOpenEnrollment}
                isEnrollmentOpen={isEnrollmentOpen}
                onCloseEnrollment={() => setIsEnrollmentOpen(false)}
                selectedCourse={selectedCourse}
              />
            }>
              <Route path="/" element={<Home onOpenEnrollment={handleOpenEnrollment} />} />
              <Route path="/courses" element={<Courses onOpenEnrollment={handleOpenEnrollment} />} />
              <Route path="/courses/:slug" element={<CourseDetailPage onOpenEnrollment={handleOpenEnrollment} />} />
              <Route path="/courses/free" element={<FreeCourses />} />
              <Route path="/about" element={<About />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/enquire" element={<EnquirePage />} />
              <Route path="/enroll" element={<Navigate to="/enquire" replace />} />
              <Route path="/admissions" element={<Navigate to="/enquire" replace />} />
              <Route path="/payment" element={<PaymentPage />} />
              <Route path="/pay" element={<PaymentPage />} />

              {/* JLPT Knowledge Hub */}
              <Route path="/jlpt" element={<JLPTPage />} />
              <Route path="/jlpt/:level" element={<JLPTPage />} />
              <Route path="/n5" element={<Navigate to="/jlpt/n5" replace />} />
              <Route path="/n4" element={<Navigate to="/jlpt/n4" replace />} />
              <Route path="/n3" element={<Navigate to="/jlpt/n3" replace />} />
              <Route path="/n2" element={<Navigate to="/jlpt/n2" replace />} />
              <Route path="/n1" element={<Navigate to="/jlpt/n1" replace />} />

              {/* Learn Japanese Hub */}
              <Route path="/learn" element={<LearnPage />} />
              <Route path="/learn/:topic" element={<LearnPage />} />

              {/* Interactive Practice Platform */}
              <Route path="/practice" element={<PracticePage />} />
              <Route path="/practice/:quizId" element={<PracticePage />} />
              <Route path="/mock-test" element={<MockTestPage />} />

              {/* Career in Japan Hub & Job Applications */}
              <Route path="/career" element={<CareerPage />} />
              <Route path="/career/:topic" element={<CareerPage />} />
              <Route path="/careers/apply" element={<JobCataloguePage />} />
              <Route path="/apply-jobs" element={<Navigate to="/careers/apply" replace />} />

              {/* Local SEO & Pan-India State & City Hubs */}
              <Route path="/locations" element={<LocationLandingPage onOpenEnrollment={handleOpenEnrollment} />} />
              <Route path="/locations/state/:stateSlug" element={<StateHubPage onOpenEnrollment={handleOpenEnrollment} />} />
              <Route path="/locations/:citySlug" element={<LocationLandingPage onOpenEnrollment={handleOpenEnrollment} />} />

              {/* High-Authority Examination, College & Verification Portals */}
              <Route path="/exam-calendar" element={<ExamCalendarPage />} />
              <Route path="/college-partnerships" element={<CollegePartnershipsPage />} />
              <Route path="/verify-certificate" element={<VerifyCertificatePage />} />
              <Route path="/verify" element={<VerifyCertificatePage />} />

              {/* News & Bulletins */}
              <Route path="/news" element={<NewsPage />} />

              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPostPage />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms" element={<TermsAndConditions />} />
              <Route path="/connect" element={<Connect />} />
              <Route path="/corporate" element={<CorporatePage />} />
              <Route path="/jlpt-exam-dates-india" element={<JlptExamDatesPage />} />
              <Route path="/links" element={<Connect />} />
              <Route path="/qr" element={<QRCodePage />} />
              <Route path="/qrcode" element={<QRCodePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />

              {/* User Dashboard */}
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Admin Portal Routes - Wrapped in AdminLayout */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="setup" element={<ScriptSetup />} />
              <Route path="blogs" element={<AdminBlogs />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="free-courses" element={<AdminFreeCourses />} />
              <Route path="users" element={<AdminUsers />} />
              <Route path="careers" element={<AdminJobs />} />
              <Route path="inquiries" element={<AdminInquiries />} />
            </Route>

            {/* Global 404 Catch-All Route */}
            <Route path="*" element={<NotFound />} />

          </Routes>
        </React.Suspense>
      </div>
    </BrowserRouter>
  );
};

const AppWithErrorBoundary: React.FC = () => (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);

export default AppWithErrorBoundary;
