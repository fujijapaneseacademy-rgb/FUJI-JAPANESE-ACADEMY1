
import React, { Suspense } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import WhatsAppFloat from './WhatsAppFloat';
import CookieBanner from './CookieBanner';
import MobileAppBottomNav from './MobileAppBottomNav';
import ExitIntentModal from './ExitIntentModal';

const EnrollmentModal = React.lazy(() => import('./EnrollmentModal'));
const QuickDemoBookingModal = React.lazy(() => import('./QuickDemoBookingModal'));
const FujiAssistant = React.lazy(() => import('./FujiAssistant'));

interface PublicLayoutProps {
    onOpenEnrollment: (courseName?: string) => void;
    isEnrollmentOpen: boolean;
    onCloseEnrollment: () => void;
    selectedCourse?: string;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({
    onOpenEnrollment,
    isEnrollmentOpen,
    onCloseEnrollment,
    selectedCourse
}) => {
    const location = useLocation();
    const isAuthPage = ['/login', '/signup', '/forgot-password', '/reset-password'].includes(location.pathname);
    const [isCookieBannerVisible, setIsCookieBannerVisible] = React.useState(false);
    const [isDemoOpen, setIsDemoOpen] = React.useState(false);
    const [demoInitialLevel, setDemoInitialLevel] = React.useState<string | undefined>(undefined);

    React.useEffect(() => {
        const handleOpenDemoEvent = (event: any) => {
            if (event?.detail?.level) {
                setDemoInitialLevel(event.detail.level);
            }
            setIsDemoOpen(true);
        };

        if (typeof window !== 'undefined') {
            window.addEventListener('fuji:open-demo-modal', handleOpenDemoEvent);
            return () => window.removeEventListener('fuji:open-demo-modal', handleOpenDemoEvent);
        }
    }, []);

    const handleOpenDemo = (level?: string) => {
        setDemoInitialLevel(level);
        setIsDemoOpen(true);
    };

    return (
        <>
            <Navbar onOpenEnrollment={() => onOpenEnrollment()} onOpenDemo={handleOpenDemo} />
            <main className="flex-grow pb-20 lg:pb-0">
                <Outlet />
            </main>
            <Footer />
            {isEnrollmentOpen && (
                <Suspense fallback={null}>
                    <EnrollmentModal
                        isOpen={isEnrollmentOpen}
                        onClose={onCloseEnrollment}
                        courseTitle={selectedCourse}
                    />
                </Suspense>
            )}
            {isDemoOpen && (
                <Suspense fallback={null}>
                    <QuickDemoBookingModal
                        isOpen={isDemoOpen}
                        onClose={() => setIsDemoOpen(false)}
                        initialLevel={demoInitialLevel}
                    />
                </Suspense>
            )}
            {!isAuthPage && (
                <div className={isCookieBannerVisible ? 'hidden md:contents' : 'contents'}>
                    <Suspense fallback={null}>
                        <FujiAssistant />
                    </Suspense>
                    <WhatsAppFloat />
                </div>
            )}
            <MobileAppBottomNav onOpenEnrollment={() => onOpenEnrollment()} />
            <CookieBanner onVisibilityChange={setIsCookieBannerVisible} />
            <ExitIntentModal />
        </>
    );
};

export default PublicLayout;
