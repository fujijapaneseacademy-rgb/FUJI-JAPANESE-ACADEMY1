
import React, { useEffect, useState } from 'react';
import { supabase } from '../../src/lib/supabaseClient';
import { JobPost } from '../../types';
import { Plus, Edit2, Trash2, X, Loader2, Save, Check } from 'lucide-react';
import { OPEN_POSITIONS as MOCK_JOBS } from '../../constants';

const AdminJobs: React.FC = () => {
    // Map the constant structure to JobPost structure if needed, or just use as is
    const [jobs, setJobs] = useState<JobPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentJob, setCurrentJob] = useState<Partial<JobPost>>({});
    const [reqInput, setReqInput] = useState('');
    const [isSaving, setIsSaving] = useState(false);
    const [usingMockData, setUsingMockData] = useState(false);

    const fetchJobs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('jobs').select('*');
            if (error) throw error;
            setJobs(data || []);
        } catch (err) {
            console.warn("Error fetching jobs (using mock data):", err);
            setUsingMockData(true);
            // Adapt mock data to JobPost interface
            const adaptedMock = MOCK_JOBS.map(j => ({ ...j, active: true })) as JobPost[];
            setJobs(adaptedMock);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this job post?')) return;

        if (usingMockData) {
            setJobs(jobs.filter(j => j.id !== id));
            return;
        }

        try {
            const { error } = await supabase.from('jobs').delete().eq('id', id);
            if (error) throw error;
            setJobs(jobs.filter(j => j.id !== id));
        } catch (err) {
            alert('Failed to delete job');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const newJob = {
            ...currentJob,
            id: currentJob.id || crypto.randomUUID(),
            requirements: reqInput.split('\n').filter(line => line.trim() !== ''),
            active: currentJob.active ?? true
        } as JobPost;

        if (usingMockData) {
            if (currentJob.id) {
                setJobs(jobs.map(j => j.id === currentJob.id ? newJob : j));
            } else {
                setJobs([...jobs, newJob]);
            }
            setIsModalOpen(false);
            setIsSaving(false);
            return;
        }

        try {
            if (currentJob.id && jobs.find(j => j.id === currentJob.id)) {
                const { error } = await supabase.from('jobs').update(newJob).eq('id', currentJob.id);
                if (error) throw error;
            } else {
                const { id, ...jobData } = newJob;
                const { error } = await supabase.from('jobs').insert([jobData]);
                if (error) throw error;
            }
            await fetchJobs();
            setIsModalOpen(false);
        } catch (err: any) {
            console.error(err);
            alert(`Failed to save: ${err.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const openModal = (job?: JobPost) => {
        setCurrentJob(job || {
            title: '',
            department: 'Academics',
            type: 'Full-time',
            location: 'Bengaluru',
            description: '',
            active: true
        });
        setReqInput(job ? job.requirements.join('\n') : '');
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-fuji-indigo">Careers Management</h1>
                    {usingMockData && <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded border border-amber-100">⚠ Demo Mode</span>}
                </div>
                <button type="button"
                    onClick={() => openModal()}
                    className="flex items-center gap-2 px-4 py-2 bg-fuji-red text-white rounded-xl font-bold hover:bg-red-600 transition-colors"
                >
                    <Plus className="w-5 h-5" /> Post Job
                </button>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-fuji-red animate-spin" /></div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {jobs.map((job) => (
                        <div key={job.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <span className="text-xs font-bold text-fuji-red bg-fuji-red/5 px-2 py-1 rounded-md uppercase tracking-wide">{job.department}</span>
                                    <h3 className="text-xl font-bold text-fuji-indigo mt-2">{job.title}</h3>
                                </div>
                                <div className="flex gap-1">
                                    <button type="button" onClick={() => openModal(job)} className="p-2 text-gray-400 hover:text-fuji-indigo transition-colors">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button type="button" onClick={() => handleDelete(job.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 mb-6">
                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gray-300"></span> {job.type}
                                </div>
                                <div className="text-sm text-gray-500 flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-gray-300"></span> {job.location}
                                </div>
                            </div>

                            <p className="text-sm text-gray-600 mb-4 line-clamp-3">{job.description}</p>

                            <div className="mt-auto pt-4 border-t border-gray-100">
                                <div className="space-y-1">
                                    {job.requirements.slice(0, 2).map((r, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                                            <Check className="w-3 h-3 text-green-500" /> {r}
                                        </div>
                                    ))}
                                    {job.requirements.length > 2 && <div className="text-xs text-gray-400 pl-5">+{job.requirements.length - 2} more</div>}
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
                                {currentJob.id ? 'Edit Job' : 'Post New Job'}
                            </h2>
                            <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Job Title</label>
                                <input
                                    type="text"
                                    required
                                    value={currentJob.title}
                                    onChange={e => setCurrentJob({ ...currentJob, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Department</label>
                                <select
                                    value={currentJob.department}
                                    onChange={e => setCurrentJob({ ...currentJob, department: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                >
                                    <option value="Academics">Academics</option>
                                    <option value="Marketing">Marketing</option>
                                    <option value="Sales & Support">Sales & Support</option>
                                    <option value="Tech">Tech</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Type</label>
                                <select
                                    value={currentJob.type}
                                    onChange={e => setCurrentJob({ ...currentJob, type: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                >
                                    <option value="Full-time">Full-time</option>
                                    <option value="Part-time">Part-time</option>
                                    <option value="Contract">Contract</option>
                                    <option value="Internship">Internship</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    required
                                    value={currentJob.location}
                                    onChange={e => setCurrentJob({ ...currentJob, location: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Description</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={currentJob.description}
                                    onChange={e => setCurrentJob({ ...currentJob, description: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none resize-none"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Requirements (One per line)</label>
                                <textarea
                                    required
                                    rows={4}
                                    value={reqInput}
                                    onChange={e => setReqInput(e.target.value)}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none resize-none font-mono text-sm"
                                    placeholder="JLPT N1 Certified&#10;3+ Years Exp"
                                />
                            </div>

                            <div className="pt-4 md:col-span-2">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full py-3 bg-fuji-red text-white font-bold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Publish Job</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminJobs;
