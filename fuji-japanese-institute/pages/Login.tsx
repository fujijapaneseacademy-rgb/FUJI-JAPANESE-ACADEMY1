import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import { supabase } from '../src/lib/supabaseClient';
import { ADMIN_EMAIL } from '../constants';

const Login: React.FC = () => {
    const [searchParams] = useSearchParams();
    const redirectUrl = searchParams.get('redirect');
    const reason = searchParams.get('reason');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [unconfirmedEmail, setUnconfirmedEmail] = useState(false);
    const [resendLoading, setResendLoading] = useState(false);
    const [resendMessage, setResendMessage] = useState<string | null>(null);
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
            setError(err.message || 'Failed to sign in with Google. Please try again.');
            setGoogleLoading(false);
        }
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setUnconfirmedEmail(false);
        setResendMessage(null);

        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        if (!cleanEmail || !cleanPassword) {
            setError('Please enter both email and password.');
            setLoading(false);
            return;
        }

        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: cleanEmail,
                password: cleanPassword,
            });

            if (error) throw error;

            if (data.user) {
                const userEmail = data.user.email?.toLowerCase().trim();
                const adminEmail = ADMIN_EMAIL.toLowerCase().trim();

                if (userEmail === adminEmail) {
                    navigate('/admin/dashboard');
                } else {
                    navigate(redirectUrl || '/dashboard');
                }
            }
        } catch (err: any) {
            const errMsg = (err.message || '').toLowerCase();

            if (errMsg.includes('email not confirmed')) {
                setUnconfirmedEmail(true);
                setError('Your email is not confirmed yet. Please check your inbox or resend the confirmation email.');
            } else if (errMsg.includes('invalid login credentials')) {
                setError('Invalid email or password. Please verify your credentials or click "Forgot password?" below.');
            } else if (err.message?.includes('supabaseUrl is required') || !import.meta.env.VITE_SUPABASE_URL) {
                setError('Authentication service is temporarily unavailable. Please try again later or contact support.');
            } else {
                setError(err.message || 'Failed to login. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleResendConfirmation = async () => {
        const cleanEmail = email.trim().toLowerCase();
        if (!cleanEmail) return;

        setResendLoading(true);
        setResendMessage(null);

        try {
            const { error } = await supabase.auth.resend({
                type: 'signup',
                email: cleanEmail,
            });

            if (error) throw error;
            setResendMessage('Confirmation email resent! Please check your inbox (and spam folder).');
        } catch (err: any) {
            console.error("Resend error:", err);
            setResendMessage(err.message || 'Unable to resend confirmation email. Please try again later.');
        } finally {
            setResendLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex text-fuji-slate pt-20">
            {/* Left Side - Image/Decor */}
            <div className="hidden lg:flex lg:w-1/2 bg-fuji-indigo relative overflow-hidden items-center justify-center">
                <div className="absolute inset-0 bg-[url('/images/hero/fuji-hero-torii-shrine.jpg')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                <div className="relative z-10 p-12 text-center text-white max-w-lg">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h2 className="text-4xl font-display font-bold mb-6 text-white">Welcome Back</h2>
                        <p className="text-lg text-white/90 leading-relaxed">
                            Continue your journey to mastering the Japanese language. Your dashboard awaits.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 bg-gray-50/50">
                <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100">
                    <div className="text-center mb-6 sm:mb-8">
                        <h1 className="text-2xl sm:text-3xl font-bold font-display text-fuji-indigo mb-2">Login</h1>
                        <p className="text-sm sm:text-base text-gray-600">Access your courses and progress</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-5 sm:space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-semibold text-gray-800 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 text-base text-gray-900 bg-white rounded-xl border border-gray-300 focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="name@example.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-semibold text-gray-800">Password</label>
                                <Link to="/forgot-password" className="text-xs font-semibold text-fuji-indigo hover:text-fuji-red transition-colors">
                                    Forgot password?
                                </Link>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full pl-12 pr-12 py-3 text-base text-gray-900 bg-white rounded-xl border border-gray-300 focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 outline-none transition-all placeholder:text-gray-400"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-fuji-indigo transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-50 text-red-700 text-sm border border-red-100 space-y-2">
                                <p>{error}</p>
                                {unconfirmedEmail && (
                                    <div className="pt-2 border-t border-red-200">
                                        <button
                                            type="button"
                                            onClick={handleResendConfirmation}
                                            disabled={resendLoading}
                                            className="text-xs font-semibold text-fuji-indigo hover:text-fuji-red underline transition-colors"
                                        >
                                            {resendLoading ? 'Sending email...' : 'Click here to resend confirmation email'}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}

                        {resendMessage && (
                            <div className="p-3 rounded-xl bg-green-50 text-green-700 text-sm border border-green-200">
                                {resendMessage}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3.5 bg-fuji-red text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-red-600 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Sign In <ArrowRight className="w-5 h-5" />
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
                                <span>Continue with Google</span>
                            </>
                        )}
                    </button>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <Link to="/signup" className="font-semibold text-fuji-indigo hover:text-fuji-red transition-colors">
                            Create Account
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
