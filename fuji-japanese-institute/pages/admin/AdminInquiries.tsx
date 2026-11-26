
import React, { useEffect, useState } from 'react';
import { supabase } from '../../src/lib/supabaseClient';
import { Inquiry } from '../../types';
import { Search, Loader2, Mail, CheckCircle, Clock, Reply } from 'lucide-react';

const AdminInquiries: React.FC = () => {
    const [inquiries, setInquiries] = useState<Inquiry[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchInquiries = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
            if (error) throw error;
            const mappedInquiries = (data || []).map((item: any) => ({
                ...item,
                date: item.created_at ? new Date(item.created_at).toLocaleDateString() : (item.date || 'Recent')
            }));
            setInquiries(mappedInquiries);
        } catch (err) {
            console.warn("Error fetching inquiries:", err);
            // Mock
            setInquiries([
                { id: '1', name: 'Alice Smith', email: 'alice@example.com', phone: '1234567890', message: 'Interested in N5 course.', date: '2024-01-02', status: 'new' },
                { id: '2', name: 'Bob Jones', email: 'bob@example.com', phone: '0987654321', message: 'Do you offer online classes?', date: '2024-01-01', status: 'read' },
            ]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchInquiries();
    }, []);

    const markAsRead = async (id: string) => {
        try {
            const { error } = await supabase.from('inquiries').update({ status: 'read' }).eq('id', id);
            if (error) throw error;
            setInquiries(inquiries.map(i => i.id === id ? { ...i, status: 'read' } : i));
        } catch (err) {
            // If mock, just update local state
            setInquiries(inquiries.map(i => i.id === id ? { ...i, status: 'read' } : i));
        }
    };

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-display font-bold text-fuji-indigo">Inquiries</h1>
                    <p className="text-gray-500">Manage contact form submissions</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 text-fuji-red animate-spin" /></div>
            ) : (
                <div className="space-y-4">
                    {inquiries.map((inquiry) => (
                        <div key={inquiry.id} className={`bg-white p-6 rounded-2xl shadow-sm border transition-all ${inquiry.status === 'new' ? 'border-fuji-red/50 shadow-md' : 'border-gray-100'}`}>
                            <div className="flex flex-col md:flex-row justify-between md:items-start gap-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-lg font-bold text-fuji-indigo">{inquiry.name}</h3>
                                        {inquiry.status === 'new' && (
                                            <span className="bg-fuji-red text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">New</span>
                                        )}
                                        {inquiry.subject && (
                                            <span className="bg-fuji-indigo/10 text-fuji-indigo text-[11px] font-semibold px-2.5 py-0.5 rounded-md">
                                                {inquiry.subject}
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-sm text-gray-500 flex flex-wrap gap-4 mb-3">
                                        <a href={`mailto:${inquiry.email}`} className="hover:text-fuji-red flex items-center gap-1"><Mail className="w-3 h-3" /> {inquiry.email}</a>
                                        <span>{inquiry.phone}</span>
                                        <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {inquiry.date}</span>
                                    </div>
                                    <p className="text-gray-700 bg-gray-50 p-4 rounded-xl text-sm">{inquiry.message}</p>
                                </div>
                                <div className="flex gap-2 shrink-0">
                                    <button type="button"
                                        onClick={() => {
                                            const subject = encodeURIComponent(`Re: Inquiry from ${inquiry.name}`);
                                            const body = encodeURIComponent(`Hi ${inquiry.name},\n\nThank you for contacting Fuji Japanese Institute.\n\nRegarding your message:\n"${inquiry.message}"\n\n`);
                                            window.open(`mailto:${inquiry.email}?subject=${subject}&body=${body}`, '_blank');
                                        }}
                                        className="px-4 py-2 text-xs font-bold bg-fuji-indigo text-white rounded-lg hover:bg-fuji-indigo/90 transition-colors flex items-center gap-2"
                                    >
                                        <Reply className="w-3 h-3" /> Reply
                                    </button>
                                    {inquiry.status === 'new' && (
                                        <button type="button"
                                            onClick={() => markAsRead(inquiry.id)}
                                            className="px-4 py-2 text-xs font-bold bg-fuji-indigo/5 text-fuji-indigo rounded-lg hover:bg-fuji-indigo/10 transition-colors flex items-center gap-2"
                                        >
                                            <CheckCircle className="w-3 h-3" /> Mark Read
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    {inquiries.length === 0 && (
                        <div className="text-center py-12 text-gray-500 bg-white rounded-2xl border border-gray-100">
                            No inquiries found.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AdminInquiries;
