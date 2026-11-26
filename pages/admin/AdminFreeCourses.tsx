
import React, { useEffect, useState } from 'react';
import { supabase } from '../../src/lib/supabaseClient';
import { Plus, Edit2, Trash2, X, Loader2, Save } from 'lucide-react';

// Mock data from the original file
const MOCK_FREE_COURSES = [
    {
        id: '1',
        title: 'Hiragana Mastery',
        description: 'Learn to read and write the first Japanese script in just 3 days with our intensive crash course.',
        type: 'Video Series',
        duration: '2 Hours',
        image: '/images/courses/jlpt-n5.jpg'
    },
    {
        id: '2',
        title: 'Survival Japanese',
        description: 'Essential phrases for travelers - how to order food, ask for directions, and shop like a local.',
        type: 'Audio Guide',
        duration: '1 Hour',
        image: '/images/courses/spoken-japanese.jpg'
    },
    {
        id: '3',
        title: 'Culture Etiquette 101',
        description: 'Understand the unwritten rules of bowing, gift-giving, and table manners in Japan.',
        type: 'Mini Course',
        duration: '45 Mins',
        image: '/images/sections/cultural-workshops.jpg'
    }
];

interface FreeCourse {
    id: string;
    title: string;
    description: string;
    type: string;
    duration: string;
    image: string;
}

const AdminFreeCourses: React.FC = () => {
    const [courses, setCourses] = useState<FreeCourse[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentCourse, setCurrentCourse] = useState<Partial<FreeCourse>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [usingMockData, setUsingMockData] = useState(false);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('free_courses').select('*');
            if (error) throw error;
            setCourses(data || []);
        } catch (err) {
            console.warn("Error fetching free courses (using mock data):", err);
            setUsingMockData(true);
            setCourses(MOCK_FREE_COURSES);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this course?')) return;

        if (usingMockData) {
            setCourses(courses.filter(c => c.id !== id));
            return;
        }

        try {
            const { error } = await supabase.from('free_courses').delete().eq('id', id);
            if (error) throw error;
            setCourses(courses.filter(c => c.id !== id));
        } catch (err) {
            alert('Failed to delete course');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const newCourse = {
            ...currentCourse,
            id: currentCourse.id || crypto.randomUUID(),
        } as FreeCourse;

        if (usingMockData) {
            if (currentCourse.id) {
                setCourses(courses.map(c => c.id === currentCourse.id ? newCourse : c));
            } else {
                setCourses([...courses, newCourse]);
            }
            setIsModalOpen(false);
            setIsSaving(false);
            return;
        }

        try {
            if (currentCourse.id && courses.find(c => c.id === currentCourse.id)) {
                const { error } = await supabase.from('free_courses').update(newCourse).eq('id', currentCourse.id);
                if (error) throw error;
            } else {
                const { id, ...courseData } = newCourse;
                const { error } = await supabase.from('free_courses').insert([courseData]);
                if (error) throw error;
            }
            await fetchCourses();
            setIsModalOpen(false);
        } catch (err: any) {
            console.error(err);
            alert(`Failed to save: ${err.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const openModal = (course?: FreeCourse) => {
        setCurrentCourse(course || {
            title: '',
            description: '',
            type: 'Video Series',
            duration: '',
            image: '/images/courses/jlpt-n5.jpg'
        });
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-fuji-indigo">Free Course Management</h1>
                    {usingMockData && <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded border border-amber-100">⚠ Demo Mode: Changes won't persist</span>}
                </div>
                <button type="button"
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-fuji-red text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
                >
                    <Plus className="w-5 h-5" /> Add Free Course
                </button>
            </div>

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
                                <span className="absolute bottom-2 left-2 px-2 py-1 bg-emerald-500 text-white text-xs font-bold rounded">
                                    {course.type}
                                </span>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-xl font-bold text-fuji-indigo mb-2">{course.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow">{course.description}</p>
                                <div className="text-xs font-bold text-gray-400">{course.duration}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
                    <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                            <h2 className="text-xl font-bold text-fuji-indigo">
                                {currentCourse.id ? 'Edit Free Course' : 'New Free Course'}
                            </h2>
                            <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Title</label>
                                <input
                                    type="text"
                                    required
                                    value={currentCourse.title}
                                    onChange={e => setCurrentCourse({ ...currentCourse, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. Video Series"
                                    value={currentCourse.type}
                                    onChange={e => setCurrentCourse({ ...currentCourse, type: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Duration</label>
                                <input
                                    type="text"
                                    required
                                    placeholder="e.g. 2 Hours"
                                    value={currentCourse.duration}
                                    onChange={e => setCurrentCourse({ ...currentCourse, duration: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    required
                                    value={currentCourse.image}
                                    onChange={e => setCurrentCourse({ ...currentCourse, image: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Resource Download Link</label>
                                <input
                                    type="url"
                                    value={currentCourse.resourceLink || ''}
                                    onChange={e => setCurrentCourse({ ...currentCourse, resourceLink: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                    placeholder="https://drive.google.com/..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={currentCourse.description}
                                    onChange={e => setCurrentCourse({ ...currentCourse, description: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none resize-none"
                                />
                            </div>

                            <div className="pt-4">
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

export default AdminFreeCourses;
