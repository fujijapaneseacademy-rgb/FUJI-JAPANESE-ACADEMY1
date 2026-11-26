import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Loader2, Phone, CheckCircle } from 'lucide-react';
import { supabase } from '../src/lib/supabaseClient';

const Signup: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [googleLoading, setGoogleLoading] = useState(false);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        setGoogleLoading(true);
        setError(null);
        try {
            const { error } = await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: `${window.location.origin}/dashboard`
                }
            });
            if (error) throw error;
        } catch (err: any) {
            console.error("Google sign in error:", err);
            setError(err.message || 'Failed to sign up with Google. Please try again.');
            setGoogleLoading(false);
        }
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const cleanEmail = formData.email.trim().toLowerCase();
        const cleanPassword = formData.password.trim();
        const cleanName = formData.name.trim();
        const cleanPhone = formData.phone.trim();

        try {
            const { data, error } = await supabase.auth.signUp({
                email: cleanEmail,
                password: cleanPassword,
                options: {
                    data: {
                        full_name: cleanName,
                        phone: cleanPhone,
                    },
                },
            });

            if (error) throw error;

            if (data.session) {
                // Email confirmation is not required, session active immediately
                navigate('/dashboard');
            } else if (data.user) {
                // Email confirmation required by Supabase project
                setSignupSuccess(true);
            }
        } catch (err: any) {
            // Fallback for demo
            if (err.message?.includes('supabaseUrl is required') || !import.meta.env.VITE_SUPABASE_URL) {
                console.warn("Supabase not configured. Mocking signup.");
                navigate('/dashboard');
                return;
            }
            setError(err.message || 'Failed to create account');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex text-fuji-slate pt-20">
            {/* Left Side - Image */}
            <div className="hidden lg:flex lg:w-1/2 bg-fuji-red relative overflow-hidden items-center justify-center order-2">
                <div className="absolute inset-0 bg-[url('/images/hero/fuji-hero-mount-fuji-spring.jpg')] bg-cover bg-center opacity-30 mix-blend-multiply" />
                <div className="relative z-10 p-12 text-center text-white max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-display font-bold mb-6 text-white">Join Fuji Japanese Academy</h2>
                        <p className="text-lg text-white/90 leading-relaxed">
                            Start your journey today. Unlock premium courses, track your progress, and get certified.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50/50 order-1">
                <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
                    {signupSuccess ? (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <h2 className="text-2xl font-bold font-display text-fuji-indigo mb-2">Check Your Email</h2>
                            <p className="text-gray-600 mb-4">
                                We've sent a verification link to <span className="font-semibold text-gray-900">{formData.email}</span>.
                            </p>
                            <p className="text-xs text-gray-600 mb-6">
                                Please click the link in your email to activate your account, then log in. (Check Spam if you don't see it).
                            </p>
                            <Link
                                to="/login"
                                className="inline-block w-full py-3.5 bg-fuji-indigo text-white font-bold rounded-xl shadow-lg hover:bg-fuji-slate transition-all text-center"
                            >
                                Proceed to Login
                            </Link>
                        </div>
                    ) : (
                        <>
                            <div className="text-center mb-8">
                                <h1 className="text-3xl font-bold font-display text-fuji-indigo mb-2">Create Account</h1>
                                <p className="text-gray-600">Join the community of Japanese learners</p>
                            </div>

                            <form onSubmit={handleSignup} className="space-y-5">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-800 ml-1">Full Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 outline-none transition-all placeholder:text-gray-400 shadow-sm"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-800 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 outline-none transition-all placeholder:text-gray-400 shadow-sm"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-800 ml-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 outline-none transition-all placeholder:text-gray-400 shadow-sm"
                                    placeholder="+91 98765 43210"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-800 ml-1">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    type="password"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 outline-none transition-all placeholder:text-gray-400 shadow-sm"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-fuji-indigo text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-fuji-slate active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Create Account <ArrowRight className="w-5 h-5" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-3 text-gray-500 font-semibold tracking-wider">
                                Or continue with
                            </span>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        disabled={googleLoading || loading}
                        className="w-full py-3 px-4 border border-gray-300 rounded-xl font-semibold text-gray-700 bg-white hover:bg-gray-50 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-sm hover:border-gray-400 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
                    >
                        {googleLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin text-gray-600" />
                        ) : (
                            <>
                                <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                                </svg>
                                <span>Sign up with Google</span>
                            </>
                        )}
                    </button>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-fuji-red hover:text-red-700 transition-colors">
                            Log In
                        </Link>
                    </div>
                    </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Signup;
