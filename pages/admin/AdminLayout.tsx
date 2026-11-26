
import React, { useEffect, useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { supabase } from '../../src/lib/supabaseClient';
import { LayoutDashboard, BookOpen, GraduationCap, LogOut, Users, Briefcase, Mail } from 'lucide-react';

const AdminLayout: React.FC = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            if (!import.meta.env.VITE_SUPABASE_URL) {
                navigate('/login');
                return;
            }

            const { data: { session } } = await supabase.auth.getSession();

            if (!session) {
                navigate('/login');
                return;
            }

            // Authoritative server-side RBAC check (replaces client email matching)
            let hasAdminPrivilege = false;
            try {
                // 1. Authoritative RPC check against user_roles table
                const { data: isAdminRpc, error: rpcError } = await supabase.rpc('is_admin');
                if (!rpcError && isAdminRpc === true) {
                    hasAdminPrivilege = true;
                } else {
                    // 2. Direct user_roles table check
                    const { data: roleRecord } = await supabase
                        .from('user_roles')
                        .select('role')
                        .eq('user_id', session.user.id)
                        .eq('role', 'admin')
                        .maybeSingle();

                    if (roleRecord) {
                        hasAdminPrivilege = true;
                    }
                }
            } catch (err) {
                console.warn('[Admin RBAC] Verification error:', err);
            }

            // 3. Fallback to Supabase app_metadata if configured
            if (!hasAdminPrivilege && session.user.app_metadata?.role === 'admin') {
                hasAdminPrivilege = true;
            }

            if (!hasAdminPrivilege) {
                console.warn('[Admin RBAC] Access denied: User does not hold administrative role.');
                navigate('/dashboard', { replace: true });
                return;
            }

            setLoading(false);
        };

        checkAuth();
    }, [navigate]);

    const handleLogout = async () => {
        if (import.meta.env.VITE_SUPABASE_URL) {
            await supabase.auth.signOut();
        }
        navigate('/login');
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
    }
    const navItems = [
        { name: 'Dashboard', path: '/admin/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: 'Users', path: '/admin/users', icon: <Users className="w-5 h-5" /> },
        { name: 'Careers', path: '/admin/careers', icon: <Briefcase className="w-5 h-5" /> },
        { name: 'Inquiries', path: '/admin/inquiries', icon: <Mail className="w-5 h-5" /> },
        { name: 'Courses', path: '/admin/courses', icon: <GraduationCap className="w-5 h-5" /> },
        { name: 'Free Courses', path: '/admin/free-courses', icon: <GraduationCap className="w-5 h-5 text-emerald-300" /> },
        { name: 'Blogs', path: '/admin/blogs', icon: <BookOpen className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-fuji-indigo text-white hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-2 font-display font-bold text-xl">
                        <span className="text-fuji-red">FJI</span> Admin
                    </div>
                </div>

                <nav className="flex-grow p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${isActive
                                    ? 'bg-fuji-red text-white shadow-lg'
                                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                                }`
                            }
                        >
                            {item.icon}
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button type="button"
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/70 hover:bg-white/10 hover:text-white w-full transition-all"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-grow flex flex-col min-w-0">
                <header className="bg-white border-b border-gray-200 p-4 md:hidden flex justify-between items-center">
                    <span className="font-bold text-fuji-indigo">FJI Admin</span>
                    {/* Mobile menu toggle could go here */}
                </header>

                <div className="flex-grow p-6 md:p-10 overflow-y-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
