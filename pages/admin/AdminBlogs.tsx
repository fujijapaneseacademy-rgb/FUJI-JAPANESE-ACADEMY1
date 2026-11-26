
import React, { useEffect, useState } from 'react';
import { supabase } from '../../src/lib/supabaseClient';
import { BlogPost } from '../../types';
import { Plus, Edit2, Trash2, X, Loader2, Save, Sparkles, RefreshCw } from 'lucide-react';
import { BLOG_POSTS as MOCK_POSTS } from '../../constants';
import { publishDailyBlog } from '../../services/blogGeneratorService';

const AdminBlogs: React.FC = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPost, setCurrentPost] = useState<Partial<BlogPost>>({});
    const [isSaving, setIsSaving] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [usingMockData, setUsingMockData] = useState(false);
    const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

    const fetchPosts = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('blogs').select('*').order('published_at', { ascending: false });
            if (error) throw error;
            setPosts(data || []);
        } catch (err) {
            console.warn("Error fetching blogs (using mock data):", err);
            setUsingMockData(true);
            setPosts(MOCK_POSTS);
        } finally {
            setLoading(false);
        }
    };

    const handleAutoGenerateBlog = async () => {
        setIsGenerating(true);
        setStatusMessage(null);
        try {
            const res = await publishDailyBlog();
            if (res.success) {
                setStatusMessage({ type: 'success', text: `✨ Published: "${res.blog?.title}" with high-authority AEO/GEO optimization!` });
                await fetchPosts();
            } else {
                setStatusMessage({ type: 'error', text: `Error: ${res.message}` });
            }
        } catch (err: any) {
            setStatusMessage({ type: 'error', text: err.message || 'Generation failed.' });
        } finally {
            setIsGenerating(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this post?')) return;

        if (usingMockData) {
            setPosts(posts.filter(p => p.id !== id));
            return;
        }

        try {
            const { error } = await supabase.from('blogs').delete().eq('id', id);
            if (error) throw error;
            setPosts(posts.filter(p => p.id !== id));
        } catch (err) {
            alert('Failed to delete post');
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        const newPost = {
            ...currentPost,
            // Generate ID if missing (for mock) or let Supabase handle it
            id: currentPost.id || crypto.randomUUID(),
            date: currentPost.date || new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        } as BlogPost;

        if (usingMockData) {
            if (currentPost.id) {
                setPosts(posts.map(p => p.id === currentPost.id ? newPost : p));
            } else {
                setPosts([...posts, newPost]);
            }
            setIsModalOpen(false);
            setIsSaving(false);
            return;
        }

        try {
            if (currentPost.id && posts.find(p => p.id === currentPost.id)) {
                // Update
                const { error } = await supabase.from('blogs').update(newPost).eq('id', currentPost.id);
                if (error) throw error;
            } else {
                // Insert
                // remove ID to let db generate it if using uuid, or send it if manually managing
                const { id, ...postData } = newPost;
                const { data, error } = await supabase.from('blogs').insert([postData]).select();
                if (error) throw error;
                // In real app, use returned data
            }
            await fetchPosts();
            setIsModalOpen(false);
        } catch (err: any) {
            console.error(err);
            alert(`Failed to save: ${err.message}`);
        } finally {
            setIsSaving(false);
        }
    };

    const openModal = (post?: BlogPost) => {
        setCurrentPost(post || {
            title: '',
            excerpt: '',
            category: 'General',
            image: '/images/courses/jlpt-n5.jpg'
        });
        setIsModalOpen(true);
    };

    return (
        <div>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-fuji-indigo">Blog Management</h1>
                    <p className="text-sm text-fuji-slate/70">Manage articles, generate daily SEO/AEO/GEO optimized blogs, and control indexing.</p>
                    {usingMockData && <span className="text-xs text-amber-600 font-medium bg-amber-50 px-2 py-1 rounded border border-amber-100 mt-2 inline-block">⚠ Demo Mode: Changes won't persist</span>}
                </div>
                <div className="flex items-center gap-3">
                    <button type="button"
                        onClick={handleAutoGenerateBlog}
                        disabled={isGenerating}
                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl font-bold hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md shadow-purple-500/20 disabled:opacity-50"
                        title="Generates and publishes an AI/SEO-optimized Japanese learning article"
                    >
                        {isGenerating ? (
                            <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                            <Sparkles className="w-5 h-5 text-amber-300" />
                        )}
                        {isGenerating ? 'Publishing...' : 'AI Generate Daily Blog'}
                    </button>
                    <button type="button"
                        onClick={() => fetchPosts()}
                        className="p-2 border border-gray-200 text-fuji-indigo rounded-xl hover:bg-gray-50 transition-colors"
                        title="Refresh blog list"
                    >
                        <RefreshCw className="w-5 h-5" />
                    </button>
                    <button type="button"
                        onClick={() => openModal()}
                        className="flex items-center gap-2 px-4 py-2 bg-fuji-red text-white rounded-xl font-bold hover:bg-red-600 transition-colors shadow-md shadow-red-500/20"
                    >
                        <Plus className="w-5 h-5" /> Add Post
                    </button>
                </div>
            </div>

            {statusMessage && (
                <div className={`mb-6 p-4 rounded-xl border ${statusMessage.type === 'success' ? 'bg-emerald-50 border-emerald-200 text-emerald-800' : 'bg-red-50 border-red-200 text-red-800'} flex items-center justify-between`}>
                    <p className="text-sm font-medium">{statusMessage.text}</p>
                    <button type="button" onClick={() => setStatusMessage(null)} className="text-xs font-bold underline ml-4">Dismiss</button>
                </div>
            )}

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-fuji-red animate-spin" /></div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group">
                            <div className="h-48 relative overflow-hidden">
                                <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <button type="button" onClick={() => openModal(post)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-fuji-indigo hover:text-fuji-red transition-colors shadow-sm">
                                        <Edit2 className="w-4 h-4" />
                                    </button>
                                    <button type="button" onClick={() => handleDelete(post.id)} className="p-2 bg-white/90 backdrop-blur rounded-lg text-red-500 hover:bg-red-50 transition-colors shadow-sm">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                            <div className="p-6 flex flex-col flex-grow">
                                <div className="text-xs font-bold text-fuji-slate/50 mb-2 uppercase tracking-wide">{post.category}</div>
                                <h3 className="text-xl font-bold text-fuji-indigo mb-2 line-clamp-2">{post.title}</h3>
                                <p className="text-sm text-gray-500 line-clamp-3 mb-4 flex-grow">{post.excerpt}</p>
                                <div className="text-xs text-gray-400">{post.date}</div>
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
                                {currentPost.id ? 'Edit Post' : 'New Blog Post'}
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
                                    value={currentPost.title}
                                    onChange={e => setCurrentPost({ ...currentPost, title: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Category</label>
                                <input
                                    type="text"
                                    required
                                    value={currentPost.category}
                                    onChange={e => setCurrentPost({ ...currentPost, category: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    required
                                    value={currentPost.image}
                                    onChange={e => setCurrentPost({ ...currentPost, image: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Excerpt</label>
                                <textarea
                                    required
                                    rows={3}
                                    value={currentPost.excerpt}
                                    onChange={e => setCurrentPost({ ...currentPost, excerpt: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Content (Full Paragraph)</label>
                                <textarea
                                    rows={6}
                                    value={currentPost.content || ''}
                                    onChange={e => setCurrentPost({ ...currentPost, content: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none resize-none"
                                    placeholder="Write your article content here..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Related / Article Link</label>
                                <input
                                    type="url"
                                    value={currentPost.relatedLink || ''}
                                    onChange={e => setCurrentPost({ ...currentPost, relatedLink: e.target.value })}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-fuji-red/20 outline-none"
                                    placeholder="https://"
                                />
                            </div>

                            <div className="pt-4">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="w-full py-3 bg-fuji-red text-white font-bold rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                                >
                                    {isSaving ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Save className="w-5 h-5" /> Save Post</>}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminBlogs;
