
import React from 'react';
import { motion } from 'framer-motion';
import { Users, BookOpen, GraduationCap, TrendingUp, DollarSign } from 'lucide-react';

const AdminDashboard: React.FC = () => {
    // In a real app, you'd fetch these stats from Supabase
    const stats = [
        { label: 'Total Students', value: '1,234', icon: <Users className="w-6 h-6 text-blue-500" />, trend: '+12%' },
        { label: 'Active Courses', value: '12', icon: <GraduationCap className="w-6 h-6 text-fuji-red" />, trend: 'Stable' },
        { label: 'Blog Posts', value: '24', icon: <BookOpen className="w-6 h-6 text-emerald-500" />, trend: '+3 This Month' },
        { label: 'Revenue', value: '₹4.2L', icon: <DollarSign className="w-6 h-6 text-amber-500" />, trend: '+8%' },
    ];

    return (
        <div className="space-y-8">
            <header>
                <h1 className="text-3xl font-display font-bold text-fuji-indigo">Dashboard</h1>
                <p className="text-gray-500">Welcome back, Administrator.</p>
            </header>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-gray-50 rounded-xl">{stat.icon}</div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.trend.includes('+') ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                                }`}>
                                {stat.trend}
                            </span>
                        </div>
                        <h3 className="text-3xl font-bold text-fuji-indigo mb-1">{stat.value}</h3>
                        <p className="text-gray-500 text-sm font-medium">{stat.label}</p>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-fuji-indigo mb-6">Recent Enrollments</h3>
                    <div className="space-y-4">
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-100">
                                <div className="w-10 h-10 bg-fuji-indigo/10 rounded-full flex items-center justify-center text-fuji-indigo font-bold">
                                    {['JD', 'AS', 'MK'][i]}
                                </div>
                                <div className="flex-grow">
                                    <h4 className="font-bold text-fuji-indigo">Student Name {i + 1}</h4>
                                    <p className="text-xs text-gray-500">Enrolled in JLPT N{5 - i}</p>
                                </div>
                                <span className="text-sm font-medium text-gray-400">2h ago</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                    <h3 className="text-xl font-bold text-fuji-indigo mb-6">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <button type="button" className="p-4 bg-fuji-red/5 hover:bg-fuji-red/10 text-fuji-red rounded-xl font-bold transition-colors flex flex-col items-center gap-2">
                            <BookOpen className="w-6 h-6" /> Create Post
                        </button>
                        <button type="button" className="p-4 bg-fuji-indigo/5 hover:bg-fuji-indigo/10 text-fuji-indigo rounded-xl font-bold transition-colors flex flex-col items-center gap-2">
                            <GraduationCap className="w-6 h-6" /> Add Course
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
