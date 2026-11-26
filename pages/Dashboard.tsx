import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    BookOpen, LogOut, Clock, Target, PlayCircle, Award, 
    X, CheckCircle, ChevronRight, Volume2, Sparkles, HelpCircle,
    User, Settings, Trash2, AlertTriangle, Check, Loader2, Mail, Phone, Lock, Save, KeyRound
} from 'lucide-react';
import PageLoader from '../components/PageLoader';
import { supabase } from '../src/lib/supabaseClient';
import { COURSES } from '../constants';
import { Course } from '../types';
import { JLPT_N5_25_LESSONS, Lesson } from '../data/n5LessonsData';

// Interface for Enrollment data
interface Enrollment {
    id: string;
    course_title: string;
    course_id: string;
    progress: number;
    status: string;
}

// Map course IDs to images/details (since DB might only have ID/Title)
const COURSE_DETAILS: Record<string, { image: string, totalLessons: number, nextLesson: string }> = {
    'JLPT N5 - Beginners': {
        image: '/images/courses/jlpt-n5.jpg',
        totalLessons: 25,
        nextLesson: 'Lesson 1: Japanese Self-Introduction & Greetings'
    },
    'JLPT N4 - Basic': {
        image: '/images/courses/jlpt-n4.jpg',
        totalLessons: 45,
        nextLesson: 'Verb Conjugations Te-Form'
    },
    'JLPT N3 - Intermediate': {
        image: '/images/courses/jlpt-n3.jpg',
        totalLessons: 60,
        nextLesson: 'Conditional Forms'
    },
    'JLPT N2 - Advanced': {
        image: '/images/courses/jlpt-n2.jpg',
        totalLessons: 65,
        nextLesson: 'Advanced Grammar Structures'
    },
    'JLPT N1 - Expert': {
        image: '/images/courses/jlpt-n1.jpg',
        totalLessons: 70,
        nextLesson: 'Business Japanese Keigo'
    },
    'Spoken Japanese': {
        image: '/images/courses/spoken-japanese.jpg',
        totalLessons: 20,
        nextLesson: 'Daily Conversation Basics'
    },
    // Default fallback
    'default': {
        image: '/images/courses/jlpt-n5.jpg',
        totalLessons: 25,
        nextLesson: 'Start your first lesson'
    }
};

const Dashboard: React.FC = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState<Enrollment[]>([]);
    const [allCourses, setAllCourses] = useState<Course[]>([]);

    // State for interactive Course Lessons modal
    const [selectedCourseForViewer, setSelectedCourseForViewer] = useState<Enrollment | null>(null);
    const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);
    const [completedLessonIds, setCompletedLessonIds] = useState<number[]>([1]);
    const [activeTab, setActiveTab] = useState<'grammar' | 'vocab' | 'kanji' | 'drill'>('grammar');
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [drillFeedback, setDrillFeedback] = useState<boolean | null>(null);

    // State for Profile Modal
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [profileName, setProfileName] = useState('');
    const [profileEmail, setProfileEmail] = useState('');
    const [profilePhone, setProfilePhone] = useState('');
    const [profileErrors, setProfileErrors] = useState<{ name?: string; email?: string; phone?: string; password?: string }>({});
    const [newPassword, setNewPassword] = useState('');
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [isSavingProfile, setIsSavingProfile] = useState(false);
    const [profileStatusMessage, setProfileStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    // State for Delete Profile Modal
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deleteConfirmationText, setDeleteConfirmationText] = useState('');
    const [isDeletingProfile, setIsDeletingProfile] = useState(false);

    useEffect(() => {
        checkUser();

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            if (!session?.user) {
                navigate('/login?redirect=/dashboard', { replace: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [navigate]);

    const checkUser = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session?.user) {
                navigate('/login?redirect=/dashboard&reason=auth_required', { replace: true });
                return;
            }

            const currentUser = session.user;
            setUser(currentUser);

            if (currentUser) {
                // Initialize profile form inputs from user metadata or profile table
                const fullName = currentUser.user_metadata?.full_name || currentUser.user_metadata?.name || '';
                const email = currentUser.email || '';
                const phone = currentUser.user_metadata?.phone || '';
                setProfileName(fullName);
                setProfileEmail(email);
                setProfilePhone(phone);

                // Try fetching extra profile info from 'profiles' table
                try {
                    const { data: profileRow } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', currentUser.id)
                        .maybeSingle();

                    if (profileRow) {
                        if (profileRow.full_name) setProfileName(profileRow.full_name);
                        if (profileRow.phone) setProfilePhone(profileRow.phone);
                    }
                } catch {
                    // Fall back to auth metadata
                }

                // Fetch enrollments and exclude non-curriculum items like "General Inquiry"
                const { data: enrollmentData } = await supabase
                    .from('enrollments')
                    .select('*')
                    .eq('user_id', currentUser.id);

                if (enrollmentData && enrollmentData.length > 0) {
                    // Filter out "General Inquiry" or any placeholder non-course entries
                    const legitCourses = enrollmentData.filter(e => {
                        const title = (e.course_title || '').trim().toLowerCase();
                        return title !== 'general inquiry' && 
                               title !== 'course inquiry' && 
                               !title.includes('inquiry');
                    });
                    
                    setCourses(legitCourses);
                } else {
                    setCourses([]);
                }

                // Fetch all courses to resolve images for dynamic courses
                const { data: coursesData } = await supabase
                    .from('courses')
                    .select('*');

                if (coursesData) {
                    setAllCourses(coursesData);
                }
            }
        } catch (error) {
            console.error('Error checking auth:', error);
            navigate('/login?redirect=/dashboard&reason=auth_required', { replace: true });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const validateProfileForm = (): boolean => {
        const errors: { name?: string; email?: string; phone?: string; password?: string } = {};

        // Name validation: min 2 characters, only letters and spaces
        const trimmedName = profileName.trim();
        if (!trimmedName) {
            errors.name = 'Full name is required.';
        } else if (trimmedName.length < 2) {
            errors.name = 'Full name must be at least 2 characters long.';
        } else if (!/^[a-zA-Z\s.'-]+$/.test(trimmedName)) {
            errors.name = 'Name can only contain letters, spaces, and hyphens.';
        }

        // Email validation: standard RFC email pattern
        const trimmedEmail = profileEmail.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!trimmedEmail) {
            errors.email = 'Email address is required.';
        } else if (!emailRegex.test(trimmedEmail)) {
            errors.email = 'Please enter a valid email address (e.g. name@example.com).';
        }

        // Phone validation: Indian standard or international format
        const cleanPhone = profilePhone.replace(/[^0-9]/g, '');
        if (profilePhone.trim() && cleanPhone.length > 0) {
            if (cleanPhone.length < 10 || cleanPhone.length > 15) {
                errors.phone = 'Please enter a valid 10-15 digit phone number.';
            }
        }

        // Optional Password validation (min 6 chars if entered)
        if (newPassword.trim() && newPassword.trim().length < 6) {
            errors.password = 'New password must be at least 6 characters.';
        }

        setProfileErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSaveProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setProfileStatusMessage(null);

        if (!validateProfileForm()) return;
        if (!user) return;

        setIsSavingProfile(true);

        try {
            const cleanPhone = profilePhone.trim();
            const cleanName = profileName.trim();
            const cleanEmail = profileEmail.trim().toLowerCase();

            // 1. Update Auth User Metadata, Email & Password
            const updatePayload: any = {
                data: {
                    full_name: cleanName,
                    phone: cleanPhone
                }
            };

            const emailChanged = cleanEmail !== (user.email || '').toLowerCase();
            if (emailChanged) {
                updatePayload.email = cleanEmail;
            }

            const passwordChanged = !!newPassword.trim();
            if (passwordChanged) {
                updatePayload.password = newPassword.trim();
            }

            const { data: updatedUserData, error: authUpdateError } = await supabase.auth.updateUser(updatePayload);

            if (authUpdateError) {
                throw authUpdateError;
            }

            // 2. Update or Upsert in 'profiles' table
            try {
                await supabase.from('profiles').upsert({
                    id: user.id,
                    full_name: cleanName,
                    phone: cleanPhone,
                    email: cleanEmail,
                    updated_at: new Date().toISOString()
                });
            } catch (pErr) {
                console.warn('Profiles table sync skipped/handled:', pErr);
            }

            // 3. Update local user state
            if (updatedUserData?.user) {
                setUser(updatedUserData.user);
            } else {
                setUser({
                    ...user,
                    email: cleanEmail,
                    user_metadata: {
                        ...user.user_metadata,
                        full_name: cleanName,
                        phone: cleanPhone
                    }
                });
            }

            setProfileStatusMessage({
                type: 'success',
                text: passwordChanged
                    ? 'Profile and password updated successfully!'
                    : emailChanged 
                        ? 'Profile updated! A confirmation link was sent to your new email.' 
                        : 'Profile details updated successfully!'
            });

            setTimeout(() => {
                setIsProfileModalOpen(false);
                setProfileStatusMessage(null);
            }, 1800);

        } catch (err: any) {
            console.error('Failed to update profile:', err);
            setProfileStatusMessage({
                type: 'error',
                text: err.message || 'Failed to update profile. Please try again.'
            });
        } finally {
            setIsSavingProfile(false);
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirmationText.trim().toUpperCase() !== 'DELETE') return;
        if (!user) return;

        setIsDeletingProfile(true);

        try {
            // 1. Delete user enrollments
            await supabase
                .from('enrollments')
                .delete()
                .eq('user_id', user.id);

            // 2. Delete user profile record
            await supabase
                .from('profiles')
                .delete()
                .eq('id', user.id);

            // 3. Sign out the user
            await supabase.auth.signOut();

            // 4. Redirect to home with notification
            setIsDeleteModalOpen(false);
            setIsProfileModalOpen(false);
            alert('Your profile and course registrations have been permanently deleted.');
            navigate('/');
        } catch (err: any) {
            console.error('Failed to delete profile:', err);
            alert(err.message || 'Failed to delete account. Please try again or contact support.');
        } finally {
            setIsDeletingProfile(false);
        }
    };

    const handleOpenCourse = (course: Enrollment) => {
        setSelectedCourseForViewer(course);
        setActiveLessonIndex(0);
        setSelectedAnswer(null);
        setDrillFeedback(null);
        setActiveTab('grammar');
    };

    const handleLessonChange = (index: number) => {
        setActiveLessonIndex(index);
        setSelectedAnswer(null);
        setDrillFeedback(null);
        setActiveTab('grammar');
    };

    const handleToggleComplete = (lessonId: number) => {
        if (completedLessonIds.includes(lessonId)) {
            setCompletedLessonIds(completedLessonIds.filter(id => id !== lessonId));
        } else {
            setCompletedLessonIds([...completedLessonIds, lessonId]);
        }
    };

    const handleCheckDrill = (optionIdx: number, correctIdx: number) => {
        setSelectedAnswer(optionIdx);
        setDrillFeedback(optionIdx === correctIdx);
    };

    if (loading || !user) {
        return <PageLoader />;
    }

    const currentLesson: Lesson = JLPT_N5_25_LESSONS[activeLessonIndex] || JLPT_N5_25_LESSONS[0];

    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-fuji-indigo">
                            Welcome back, {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Scholar'}
                        </h1>
                        <p className="text-gray-500 mt-1">Ready to continue your Japanese journey?</p>
                    </div>
                    <div className="flex items-center gap-3">
                        {user && (
                            <button
                                type="button"
                                onClick={() => {
                                    setProfileName(user?.user_metadata?.full_name || '');
                                    setProfileEmail(user?.email || '');
                                    setProfilePhone(user?.user_metadata?.phone || '');
                                    setProfileErrors({});
                                    setProfileStatusMessage(null);
                                    setIsProfileModalOpen(true);
                                }}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-fuji-indigo bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-all shadow-sm cursor-pointer"
                                title="Edit My Profile"
                            >
                                <Settings className="w-4 h-4 text-slate-500" />
                                <span>My Profile</span>
                            </button>
                        )}
                        {user && (
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-xl transition-colors cursor-pointer"
                            >
                                <LogOut className="w-4 h-4" />
                                Sign Out
                            </button>
                        )}
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                                <BookOpen className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Active Courses</p>
                                <h3 className="text-2xl font-bold text-gray-900">{courses.length}</h3>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                                <Clock className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">JLPT N5 Curriculum</p>
                                <h3 className="text-2xl font-bold text-gray-900">25 Lessons</h3>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                                <Award className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 font-medium">Completed Lessons</p>
                                <h3 className="text-2xl font-bold text-gray-900">{completedLessonIds.length} / 25</h3>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* My Courses Section */}
                <div className="mb-12">
                    <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2 text-fuji-indigo">
                        <Target className="w-5 h-5 text-fuji-red" />
                        My Learning
                    </h2>

                    {courses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {courses.map((course, idx) => {
                                const dbCourse = allCourses.find(c => c.id === course.course_id || c.title === course.course_title);
                                const constantCourse = COURSES.find(c => c.title === course.course_title || c.id === course.course_id);
                                const localDetails = COURSE_DETAILS[course.course_title] || COURSE_DETAILS['default'];

                                const details = {
                                    ...localDetails,
                                    image: dbCourse?.image || constantCourse?.image || localDetails.image
                                };

                                const isN5 = course.course_title.includes('N5');
                                const totalLessons = isN5 ? 25 : details.totalLessons;
                                const completed = isN5 
                                    ? completedLessonIds.length 
                                    : Math.round(((course.progress || 0) / 100) * totalLessons);
                                const calculatedProgress = Math.round((completed / totalLessons) * 100);

                                return (
                                    <motion.div
                                        key={course.id || idx}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: idx * 0.1 }}
                                        className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 flex flex-col"
                                    >
                                        <div className="h-44 relative overflow-hidden bg-slate-100">
                                            <img
                                                src={details.image}
                                                alt={course.course_title}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    const target = e.target as HTMLImageElement;
                                                    target.src = '/images/courses/jlpt-n5.jpg';
                                                }}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                            <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                                                <span className="text-xs font-bold bg-white/20 backdrop-blur-md px-3 py-1 rounded-full uppercase tracking-wider">
                                                    {course.status || 'Active'}
                                                </span>
                                                <span className="text-xs font-medium text-white/90">
                                                    {totalLessons} Lessons Full Access
                                                </span>
                                            </div>
                                        </div>

                                        <div className="p-6 flex flex-col flex-grow">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">
                                                {course.course_title}
                                            </h3>

                                            <div className="mb-4">
                                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                    <span>{calculatedProgress}% Complete</span>
                                                    <span>{completed}/{totalLessons} Lessons</span>
                                                </div>
                                                <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                                    <div
                                                        className="bg-fuji-red h-full rounded-full transition-all duration-500"
                                                        style={{ width: `${calculatedProgress}%` }}
                                                    ></div>
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-4 border-t border-gray-50">
                                                <p className="text-xs text-gray-500 mb-4">
                                                    <span className="font-semibold text-gray-700">Next Lesson:</span>{' '}
                                                    {isN5 && JLPT_N5_25_LESSONS[activeLessonIndex]
                                                        ? `Lesson ${JLPT_N5_25_LESSONS[activeLessonIndex].id}: ${JLPT_N5_25_LESSONS[activeLessonIndex].title}`
                                                        : details.nextLesson}
                                                </p>
                                                <button
                                                    type="button"
                                                    onClick={() => handleOpenCourse(course)}
                                                    className="w-full py-3 bg-fuji-indigo hover:bg-fuji-red text-white rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                                                >
                                                    <PlayCircle className="w-4 h-4" />
                                                    Continue Learning (25 Lessons)
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 max-w-xl mx-auto shadow-sm">
                            <BookOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No Active Courses Enrolled</h3>
                            <p className="text-sm text-gray-500 mb-6">
                                You have not registered for any JLPT cohorts yet. Explore our structured beginner through advanced batches to begin!
                            </p>
                            <Link
                                to="/courses"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-fuji-red text-white rounded-xl font-bold text-sm hover:bg-red-600 transition-colors shadow-sm"
                            >
                                Explore Courses <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    )}
                </div>
            </div>

            {/* Profile Settings Modal */}
            <AnimatePresence>
                {isProfileModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-fuji-indigo/80 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[2rem] w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl border border-slate-100 flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-100 bg-slate-50/70">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-fuji-indigo/10 text-fuji-indigo flex items-center justify-center">
                                        <User className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-display font-bold text-fuji-indigo">
                                            My Profile Settings
                                        </h3>
                                        <p className="text-xs text-slate-500">Manage your name, email address, and contact details</p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsProfileModalOpen(false)}
                                    className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-600 flex items-center justify-center text-xs font-bold transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Modal Body */}
                            <form onSubmit={handleSaveProfile} className="p-5 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto max-h-[calc(90vh-90px)]">
                                {profileStatusMessage && (
                                    <div className={`p-4 rounded-xl text-xs font-semibold flex items-center gap-2 ${
                                        profileStatusMessage.type === 'success' 
                                            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                                            : 'bg-red-50 text-red-800 border border-red-200'
                                    }`}>
                                        {profileStatusMessage.type === 'success' ? <Check className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                                        <span>{profileStatusMessage.text}</span>
                                    </div>
                                )}

                                {/* Full Name Field */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                                        <User className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Full Name *</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={profileName}
                                        onChange={(e) => {
                                            setProfileName(e.target.value);
                                            if (profileErrors.name) setProfileErrors(prev => ({ ...prev, name: undefined }));
                                        }}
                                        placeholder="e.g. Tanaka Kenji"
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border outline-none text-sm transition-all ${
                                            profileErrors.name 
                                                ? 'border-red-400 focus:ring-2 focus:ring-red-400/20 bg-red-50/20' 
                                                : 'border-slate-200 focus:border-fuji-indigo focus:bg-white'
                                        }`}
                                    />
                                    {profileErrors.name && (
                                        <p className="text-[11px] text-red-500 font-semibold mt-1">{profileErrors.name}</p>
                                    )}
                                </div>

                                {/* Email Address Field */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                                        <Mail className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Email Address *</span>
                                    </label>
                                    <input
                                        type="email"
                                        value={profileEmail}
                                        onChange={(e) => {
                                            setProfileEmail(e.target.value);
                                            if (profileErrors.email) setProfileErrors(prev => ({ ...prev, email: undefined }));
                                        }}
                                        placeholder="e.g. student@fujiacademy.com"
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border outline-none text-sm transition-all ${
                                            profileErrors.email 
                                                ? 'border-red-400 focus:ring-2 focus:ring-red-400/20 bg-red-50/20' 
                                                : 'border-slate-200 focus:border-fuji-indigo focus:bg-white'
                                        }`}
                                    />
                                    {profileErrors.email && (
                                        <p className="text-[11px] text-red-500 font-semibold mt-1">{profileErrors.email}</p>
                                    )}
                                    <p className="text-[11px] text-slate-400 mt-1">Changing email may send a verification email to your new address.</p>
                                </div>

                                {/* Phone Number Field */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                                        <Phone className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Phone Number</span>
                                    </label>
                                    <input
                                        type="tel"
                                        value={profilePhone}
                                        onChange={(e) => {
                                            setProfilePhone(e.target.value);
                                            if (profileErrors.phone) setProfileErrors(prev => ({ ...prev, phone: undefined }));
                                        }}
                                        placeholder="e.g. 9876543210"
                                        className={`w-full px-4 py-3 rounded-xl bg-slate-50 border outline-none text-sm transition-all ${
                                            profileErrors.phone 
                                                ? 'border-red-400 focus:ring-2 focus:ring-red-400/20 bg-red-50/20' 
                                                : 'border-slate-200 focus:border-fuji-indigo focus:bg-white'
                                        }`}
                                    />
                                    {profileErrors.phone && (
                                        <p className="text-[11px] text-red-500 font-semibold mt-1">{profileErrors.phone}</p>
                                    )}
                                </div>

                                {/* New Password Field (Optional) */}
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5 flex items-center gap-1.5">
                                        <KeyRound className="w-3.5 h-3.5 text-slate-400" />
                                        <span>Change Password (Optional)</span>
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            value={newPassword}
                                            onChange={(e) => {
                                                setNewPassword(e.target.value);
                                                if (profileErrors.password) setProfileErrors(prev => ({ ...prev, password: undefined }));
                                            }}
                                            placeholder="Leave blank to keep current password"
                                            className={`w-full px-4 py-3 rounded-xl bg-slate-50 border outline-none text-sm transition-all pr-12 ${
                                                profileErrors.password 
                                                    ? 'border-red-400 focus:ring-2 focus:ring-red-400/20 bg-red-50/20' 
                                                    : 'border-slate-200 focus:border-fuji-indigo focus:bg-white'
                                            }`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-semibold px-1"
                                        >
                                            {showNewPassword ? "Hide" : "Show"}
                                        </button>
                                    </div>
                                    {profileErrors.password && (
                                        <p className="text-[11px] text-red-500 font-semibold mt-1">{profileErrors.password}</p>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-2 flex items-center justify-between gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setIsDeleteModalOpen(true)}
                                        className="text-xs font-bold text-red-600 hover:text-red-800 hover:underline flex items-center gap-1 cursor-pointer"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                        <span>Delete Profile</span>
                                    </button>

                                    <div className="flex items-center gap-2">
                                        <button
                                            type="button"
                                            onClick={() => setIsProfileModalOpen(false)}
                                            className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-bold text-xs hover:bg-slate-100 transition-colors cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            type="submit"
                                            disabled={isSavingProfile}
                                            className="px-6 py-2.5 rounded-xl bg-fuji-indigo hover:bg-fuji-slate text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer disabled:opacity-50"
                                        >
                                            {isSavingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                            <span>Save Changes</span>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Danger Zone: Delete Profile Confirmation Modal */}
            <AnimatePresence>
                {isDeleteModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white rounded-[2rem] w-full max-w-md overflow-hidden shadow-2xl border border-red-100 p-6 flex flex-col"
                        >
                            <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4">
                                <AlertTriangle className="w-7 h-7" />
                            </div>

                            <h3 className="text-xl font-display font-black text-center text-slate-900 mb-2">
                                Delete Account & Profile?
                            </h3>

                            <p className="text-xs text-slate-500 text-center leading-relaxed mb-6 font-light">
                                This action is permanent. All your active course enrollments, progress data, and profile settings will be permanently erased.
                            </p>

                            <div className="bg-red-50 p-4 rounded-xl border border-red-100 mb-5">
                                <label className="block text-[11px] font-bold text-red-900 uppercase tracking-wider mb-2">
                                    Type <span className="font-mono text-red-600">DELETE</span> to confirm:
                                </label>
                                <input
                                    type="text"
                                    value={deleteConfirmationText}
                                    onChange={(e) => setDeleteConfirmationText(e.target.value)}
                                    placeholder="DELETE"
                                    className="w-full px-3 py-2 bg-white rounded-lg border border-red-200 text-sm font-bold text-red-600 outline-none text-center tracking-widest uppercase"
                                />
                            </div>

                            <div className="flex items-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsDeleteModalOpen(false);
                                        setDeleteConfirmationText('');
                                    }}
                                    className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl transition-colors cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleDeleteAccount}
                                    disabled={deleteConfirmationText.trim().toUpperCase() !== 'DELETE' || isDeletingProfile}
                                    className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl transition-all shadow-md shadow-red-600/20 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-1.5 cursor-pointer"
                                >
                                    {isDeletingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                    <span>Permanently Delete</span>
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Interactive Course Lessons Modal */}
            <AnimatePresence>
                {selectedCourseForViewer && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-fuji-indigo/80 backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.95, y: 20 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-6xl h-[90vh] rounded-[2rem] overflow-hidden shadow-2xl flex flex-col border border-white/20"
                        >
                            {/* Modal Header */}
                            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-gray-100 bg-fuji-light">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-fuji-red/10 text-fuji-red flex items-center justify-center">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-display font-bold text-fuji-indigo text-lg sm:text-xl">
                                            {selectedCourseForViewer.course_title}
                                        </h3>
                                        <p className="text-xs text-gray-500">
                                            Official JLPT Curriculum • {JLPT_N5_25_LESSONS.length} Interactive Lessons
                                        </p>
                                    </div>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setSelectedCourseForViewer(null)}
                                    className="p-2 text-gray-400 hover:text-fuji-red hover:bg-fuji-red/5 rounded-full transition-colors cursor-pointer"
                                >
                                    <X className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Modal Content - Two Column Layout */}
                            <div className="flex-grow flex flex-col md:flex-row overflow-hidden">
                                {/* Left Column: 25 Lessons Sidebar */}
                                <div className="w-full md:w-80 border-r border-gray-100 flex flex-col bg-gray-50/50">
                                    <div className="p-4 border-b border-gray-100 bg-white">
                                        <div className="flex items-center justify-between text-xs font-bold text-gray-600 mb-2">
                                            <span>Curriculum Progress</span>
                                            <span className="text-fuji-red">{completedLessonIds.length}/25 Completed</span>
                                        </div>
                                        <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                                            <div
                                                className="bg-green-500 h-full rounded-full transition-all duration-300"
                                                style={{ width: `${(completedLessonIds.length / 25) * 100}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="overflow-y-auto flex-grow divide-y divide-gray-100">
                                        {JLPT_N5_25_LESSONS.map((lesson, idx) => {
                                            const isActive = idx === activeLessonIndex;
                                            const isDone = completedLessonIds.includes(lesson.id);

                                            return (
                                                <button
                                                    key={lesson.id}
                                                    type="button"
                                                    onClick={() => handleLessonChange(idx)}
                                                    className={`w-full text-left p-4 transition-all flex items-start gap-3 cursor-pointer ${
                                                        isActive
                                                            ? 'bg-white border-l-4 border-fuji-red shadow-sm'
                                                            : 'hover:bg-gray-100/70 text-gray-600'
                                                    }`}
                                                >
                                                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                                                        isDone
                                                            ? 'bg-green-100 text-green-700'
                                                            : isActive
                                                            ? 'bg-fuji-red text-white'
                                                            : 'bg-gray-200 text-gray-500'
                                                    }`}>
                                                        {isDone ? '✓' : lesson.id}
                                                    </div>
                                                    <div className="flex-grow min-w-0">
                                                        <div className="flex items-center justify-between gap-1">
                                                            <span className="text-[11px] font-bold text-fuji-red uppercase">
                                                                Lesson {lesson.id}
                                                            </span>
                                                            <span className="text-[10px] text-gray-400">{lesson.duration}</span>
                                                        </div>
                                                        <p className="text-xs font-bold text-gray-900 truncate mt-0.5">
                                                            {lesson.title}
                                                        </p>
                                                        <p className="text-[11px] text-gray-400 font-japanese truncate">
                                                            {lesson.japaneseTitle}
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>

                                {/* Right Column: Active Lesson View */}
                                <div className="flex-grow flex flex-col bg-white overflow-hidden">
                                    {/* Lesson Title & Tabs Bar */}
                                    <div className="p-6 border-b border-gray-100 bg-white">
                                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-fuji-red/10 text-fuji-red uppercase">
                                                        Lesson {currentLesson.id}
                                                    </span>
                                                    <span className="text-xs text-gray-400">{currentLesson.duration}</span>
                                                </div>
                                                <h2 className="text-2xl font-bold text-gray-900 mt-1">
                                                    {currentLesson.title}
                                                </h2>
                                                <p className="text-sm text-fuji-red font-japanese font-semibold">
                                                    {currentLesson.japaneseTitle}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => handleToggleComplete(currentLesson.id)}
                                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                                                    completedLessonIds.includes(currentLesson.id)
                                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                                }`}
                                            >
                                                <CheckCircle className="w-4 h-4" />
                                                <span>
                                                    {completedLessonIds.includes(currentLesson.id) ? 'Completed' : 'Mark Complete'}
                                                </span>
                                            </button>
                                        </div>

                                        {/* Navigation Tabs */}
                                        <div className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-gray-100">
                                            {[
                                                { id: 'grammar', label: 'Grammar Points' },
                                                { id: 'vocab', label: `Vocabulary (${currentLesson.keyVocab.length})` },
                                                { id: 'kanji', label: `Kanji Focus (${currentLesson.keyKanji.length})` },
                                                { id: 'drill', label: 'Practice Drill' }
                                            ].map((tab) => (
                                                <button
                                                    key={tab.id}
                                                    type="button"
                                                    onClick={() => setActiveTab(tab.id as any)}
                                                    className={`px-4 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                                                        activeTab === tab.id
                                                            ? 'bg-fuji-indigo text-white shadow-sm'
                                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                                    }`}
                                                >
                                                    {tab.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Tab Content Area */}
                                    <div className="p-6 overflow-y-auto flex-grow">
                                        {activeTab === 'grammar' && (
                                            <div className="space-y-6">
                                                <div>
                                                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-2">
                                                        Lesson Overview
                                                    </h4>
                                                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-xl border border-gray-100">
                                                        {currentLesson.summary}
                                                    </p>
                                                </div>

                                                <div>
                                                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                                                        Key Grammar Patterns
                                                    </h4>
                                                    <div className="space-y-3">
                                                        {currentLesson.grammarPoints.map((point, pIdx) => (
                                                            <div key={pIdx} className="p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors bg-white flex items-start gap-3">
                                                                <span className="w-6 h-6 rounded-full bg-red-50 text-fuji-red font-bold text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                                                                    {pIdx + 1}
                                                                </span>
                                                                <p className="text-sm font-semibold text-fuji-indigo leading-relaxed">
                                                                    {point}
                                                                </p>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'vocab' && (
                                            <div className="space-y-4">
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                    Essential Lesson Vocabulary
                                                </h4>
                                                <div className="grid sm:grid-cols-2 gap-3">
                                                    {currentLesson.keyVocab.map((item, vIdx) => (
                                                        <div key={vIdx} className="p-3.5 bg-gray-50 rounded-xl border border-gray-100 flex items-center justify-between">
                                                            <div>
                                                                <p className="font-japanese font-bold text-base text-gray-900">
                                                                    {item.word}
                                                                </p>
                                                                <p className="text-xs text-fuji-red font-medium">
                                                                    {item.reading}
                                                                </p>
                                                            </div>
                                                            <span className="text-xs text-gray-600 font-medium bg-white px-3 py-1.5 rounded-lg border border-gray-100">
                                                                {item.meaning}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'kanji' && (
                                            <div className="space-y-4">
                                                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                                    Featured Kanji Characters
                                                </h4>
                                                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
                                                    {currentLesson.keyKanji.map((k, kIdx) => (
                                                        <div key={kIdx} className="p-5 bg-white rounded-2xl border border-gray-200 text-center shadow-sm">
                                                            <div className="text-4xl font-bold text-fuji-indigo mb-2 font-japanese">
                                                                {k.kanji}
                                                            </div>
                                                            <p className="text-xs font-bold text-gray-900 mb-1">{k.meaning}</p>
                                                            <div className="text-[11px] text-gray-500 space-y-0.5 border-t border-gray-100 pt-2 mt-2">
                                                                <p><span className="font-semibold text-gray-700">Onyomi:</span> {k.onyomi}</p>
                                                                <p><span className="font-semibold text-gray-700">Kunyomi:</span> {k.kunyomi}</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {activeTab === 'drill' && (
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-bold text-gray-900 flex items-center gap-2">
                                                    <HelpCircle className="w-4 h-4 text-fuji-red" />
                                                    Quick Concept Check
                                                </h4>
                                                <div className="p-5 bg-blue-50/50 rounded-xl border border-blue-100">
                                                    <p className="text-sm font-semibold text-gray-900 mb-4">
                                                        {currentLesson.practiceDrill.question}
                                                    </p>
                                                    <div className="space-y-2">
                                                        {currentLesson.practiceDrill.options.map((opt, optIdx) => (
                                                            <button
                                                                key={optIdx}
                                                                type="button"
                                                                onClick={() => handleCheckDrill(optIdx, currentLesson.practiceDrill.answer)}
                                                                className={`w-full text-left p-3 rounded-lg text-xs font-medium border transition-all flex items-center justify-between cursor-pointer ${
                                                                    selectedAnswer === optIdx
                                                                        ? optIdx === currentLesson.practiceDrill.answer
                                                                            ? 'bg-emerald-100 border-emerald-500 text-emerald-900'
                                                                            : 'bg-red-100 border-red-500 text-red-900'
                                                                        : 'bg-white border-gray-200 hover:border-fuji-indigo text-gray-700'
                                                                }`}
                                                            >
                                                                <span>{optIdx + 1}. {opt}</span>
                                                                {selectedAnswer === optIdx && (
                                                                    <span>
                                                                        {optIdx === currentLesson.practiceDrill.answer ? '✓ Correct' : '✗ Incorrect'}
                                                                    </span>
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    {drillFeedback !== null && (
                                                        <div className={`mt-4 p-3 rounded-lg text-xs font-medium ${
                                                            drillFeedback ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                                                        }`}>
                                                            <p className="font-bold mb-0.5">
                                                                {drillFeedback ? '🎉 Correct!' : '💡 Explanation:'}
                                                            </p>
                                                            <p>{currentLesson.practiceDrill.explanation}</p>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Bottom Navigation Buttons */}
                                    <div className="p-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                                        <button
                                            type="button"
                                            disabled={activeLessonIndex === 0}
                                            onClick={() => handleLessonChange(activeLessonIndex - 1)}
                                            className="px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                        >
                                            ← Previous Lesson
                                        </button>

                                        <span className="text-xs font-bold text-gray-500">
                                            Lesson {currentLesson.id} of 25
                                        </span>

                                        <button
                                            type="button"
                                            disabled={activeLessonIndex === JLPT_N5_25_LESSONS.length - 1}
                                            onClick={() => handleLessonChange(activeLessonIndex + 1)}
                                            className="px-4 py-2 text-xs font-semibold text-white bg-fuji-indigo hover:bg-fuji-red rounded-lg disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                                        >
                                            Next Lesson →
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Dashboard;
