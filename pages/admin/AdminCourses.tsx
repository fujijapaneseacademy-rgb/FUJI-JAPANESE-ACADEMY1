
import React, { useEffect, useState } from 'react';
import { supabase } from '../../src/lib/supabaseClient';
import { Course, CourseLevel } from '../../types';
import { Plus, Edit2, Trash2, X, Loader2, Save, Check } from 'lucide-react';
import { COURSES as MOCK_COURSES } from '../../constants';

const AdminCourses: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<Partial<Course>>({});
    const [featureInput, setFeatureInput] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [usingMockData, setUsingMockData] = useState(false);
    const [actionFeedback, setActionFeedback] = useState<string | null>(null);

    const showFeedback = (msg: string) => {
        setActionFeedback(msg);
        setTimeout(() => setActionFeedback(null), 3500);
    };

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('courses').select('*');
            if (error) throw error;
            if (data && data.length > 0) {
                setCourses(data);
                localStorage.setItem('fuji_admin_courses', JSON.stringify(data));
            } else {
                const saved = localStorage.getItem('fuji_admin_courses');
                if (saved) {
                    setCourses(JSON.parse(saved));
                } else {
                    setCourses(MOCK_COURSES);
                    localStorage.setItem('fuji_admin_courses', JSON.stringify(MOCK_COURSES));
                }
            }
        } catch (err) {
            console.warn("Error fetching courses from Supabase, checking local cache:", err);
            setUsingMockData(true);
            const saved = localStorage.getItem('fuji_admin_courses');
            if (saved) {
                setCourses(JSON.parse(saved));
            } else {
                setCourses(MOCK_COURSES);
                localStorage.setItem('fuji_admin_courses', JSON.stringify(MOCK_COURSES));
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (id: string) => {
        const target = courses.find(c => c.id === id);
        if (!window.confirm(`Are you sure you want to delete "${target?.title || 'this course'}"?`)) return;

        const updated = courses.filter(c => c.id !== id);
        setCourses(updated);
        localStorage.setItem('fuji_admin_courses', JSON.stringify(updated));
        showFeedback(`Course "${target?.title || ''}" deleted successfully.`);

        try {
            await supabase.from('courses').delete().eq('id', id);
        } catch (err) {
            console.warn('Supabase delete sync skipped (saved locally):', err);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const isEditing = Boolean(currentCourse.id && courses.some(c => c.id === currentCourse.id));
        const courseId = currentCourse.id || `course_${Date.now()}`;
        const newCourse = {
            ...currentCourse,
            id: courseId,
            features: featureInput.split('\n').map(l => l.trim()).filter(Boolean)
        } as Course;

        let updatedCourses: Course[];
        if (isEditing) {
            updatedCourses = courses.map(c => c.id === courseId ? newCourse : c);
        } else {
            updatedCourses = [newCourse, ...courses];
        }

        setCourses(updatedCourses);
        localStorage.setItem('fuji_admin_courses', JSON.stringify(updatedCourses));
        showFeedback(isEditing ? `Course "${newCourse.title}" updated successfully!` : `Course "${newCourse.title}" created successfully!`);

        try {
            if (isEditing) {
                await supabase.from('courses').update(newCourse).eq('id', courseId);
            } else {
                await supabase.from('courses').insert([newCourse]);
            }
        } catch (err: any) {
            console.warn('Supabase persist note (saved locally):', err);
        } finally {
            setIsSaving(false);
            setIsModalOpen(false);
        }
    };

    const openModal = (course?: Course) => {
        setCurrentCourse(course || {
            title: '',
            level: CourseLevel.Beginner,
            description: '',
            price: '',
            duration: '',
            image: '/images/courses/jlpt-n5.jpg',
            jlptLevel: '',
        });
        setFeatureInput(course ? course.features.join('\n') : '');
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-fuji-indigo">Course Management</h1>
                    <p className="text-sm text-gray-500 mt-1">View, edit, add, and manage course offerings</p>
                </div>
                <button type="button"
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-fuji-red text-white rounded-xl font-bold hover:bg-red-600 transition-colors shadow-sm"
                >
                    <Plus className="w-5 h-5" /> Add Course
                </button>
            </div>

            {actionFeedback && (
                <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-2 text-sm font-semibold animate-in fade-in slide-in-from-top-2">
                    <Check className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                    <span>{actionFeedback}</span>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-fuji-red animate-spin" /></div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                        <div key={course.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                            <div className="h-48 relative overflow-hidden">
                                <img src={course.image} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button type="button" onClick={() => openModal(course)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-fuji-indigo hover:text-fuji-red transition-colors shadow-sm">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button type="button" onClick={() => handleDelete(course.id)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                                {course.jlptLevel && (
                                    <span className="absolute bottom-2 left-2 px-2 py-1 bg-fuji-red text-white text-xs font-bold rounded">
                                        {course.jlptLevel}
                                    </span>
                                )}
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-fuji-indigo mb-2">{course.title}</h3>
                                <div className="flex justify-between text-sm text-gray-500 mb-4 font-medium">
                                    <span>{course.duration}</span>
                                    <span className="text-fuji-red">{course.price}</span>
                                </div>
                                <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow">{course.description}</p>
                                <div className="space-y-1">
                                    {course.features.slice(0, 2).map((f, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                                            <Check className="w-3 h-3 text-green-500" /> {f}
                                        </div>
                                    ))}
                                    {course.features.length > 2 && <div className="text-xs text-gray-400 pl-5">+{course.features.length - 2} more features</div>}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 text-left">
                    <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-fuji-indigo">
                                {currentCourse.id ? 'Edit Course' : 'New Course'}
                            </h2>
                            <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Course Title</label>
                                <input
                                    type="text"
                                    required
                                    value={currentCourse.title}
                                    onChange={e => setCurrentCourse({ ...currentCourse, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Level</label>
                                <select
                                    value={currentCourse.level}
                                    onChange={e => setCurrentCourse({ ...currentCourse, level: e.target.value as CourseLevel })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                >
                                    {Object.values(CourseLevel).map(l => <option key={l} value={l}>{l}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">JLPT Level (Optional)</label>
                                <input
                                    type="text"
                                    value={currentCourse.jlptLevel || ''}
                                    onChange={e => setCurrentCourse({ ...currentCourse, jlptLevel: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                    placeholder="e.g. N5"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Price</label>
                                <input
                                    type="text"
                                    required
                                    value={currentCourse.price}
                                    onChange={e => setCurrentCourse({ ...currentCourse, price: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
                                <input
                                    type="text"
                                    required
                                    value={currentCourse.duration}
                                    onChange={e => setCurrentCourse({ ...currentCourse, duration: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    required
                                    value={currentCourse.image}
                                    onChange={e => setCurrentCourse({ ...currentCourse, image: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={currentCourse.description}
                                    onChange={e => setCurrentCourse({ ...currentCourse, description: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none resize-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Features (One per line)</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={featureInput}
                                    onChange={e => setFeatureInput(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none resize-none font-mono text-sm"
                                    placeholder="Reading & Writing&#10;Grammar&#10;Listening"
                                />
                            </div>

                            <div className="pt-4 md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full py-3 bg-fuji-red text-white font-bold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Course</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminCourses;
