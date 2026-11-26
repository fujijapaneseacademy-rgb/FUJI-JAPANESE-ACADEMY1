import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, Loader2, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { supabase } from '../src/lib/supabaseClient';

const ResetPassword: React.FC = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'checking' | 'ready' | 'success' | 'invalid'>('checking');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Listen for PASSWORD_RECOVERY event (registered synchronously for proper cleanup)
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
            if (event === 'PASSWORD_RECOVERY') {
                setStatus('ready');
            }
        });

        // Check if current session exists (e.g. user arrived via recovery link)
        const checkSession = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                
                // Hash parameters or query params may contain recovery tokens
                const hash = window.location.hash;
                const isRecovery = hash.includes('type=recovery') || hash.includes('access_token') || !!session;

                if (isRecovery || session) {
                    setStatus('ready');
                } else {
                    // Small delay to allow Supabase to process hash from URL
                    setTimeout(async () => {
                        const { data: { session: retrySession } } = await supabase.auth.getSession();
                        if (retrySession) {
                            setStatus('ready');
                        } else {
                            setStatus('ready'); // Still allow attempt in case session is set
                        }
                    }, 1000);
                }
            } catch (err) {
                if (import.meta.env.DEV) console.error("Session check error:", err);
                setStatus('ready');
            }
        };

        checkSession();

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');

        if (password.length < 6) {
            setErrorMessage('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setErrorMessage('Passwords do not match. Please re-enter.');
            return;
        }

        setLoading(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: password.trim()
            });

            if (error) throw error;

            setStatus('success');
            setTimeout(() => {
                navigate('/login');
            }, 3000);
        } catch (err: any) {
            console.error("Password update error:", err);
            setErrorMessage(err.message || 'Failed to update password. Your reset link may have expired.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8 font-sans">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
                <div>
                    <Link to="/login" className="inline-flex items-center text-sm font-medium text-fuji-slate hover:text-fuji-indigo transition-colors mb-6">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Login
                    </Link>
                    <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">
                        Set New Password
                    </h2>
                    <p className="text-gray-500">
                        Please enter your new password below to secure your account.
                    </p>
                </div>

                {status === 'success' ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-6"
                    >
                        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Password Updated!</h3>
                        <p className="text-gray-500 mb-6">
                            Your password has been successfully updated. Redirecting you to login...
                        </p>
                        <Link
                            to="/login"
                            className="inline-block py-3 px-6 bg-fuji-indigo text-white font-bold rounded-xl shadow-md hover:bg-fuji-slate transition-all"
                        >
                            Go to Login Now
                        </Link>
                    </motion.div>
                ) : status === 'invalid' ? (
                    <div className="text-center py-6">
                        <div className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertCircle className="w-8 h-8 text-amber-500" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Invalid or Expired Link</h3>
                        <p className="text-gray-500 mb-6">
                            This password reset link is invalid or has already expired. Please request a new one.
                        </p>
                        <Link
                            to="/forgot-password"
                            className="inline-block py-3 px-6 bg-fuji-indigo text-white font-bold rounded-xl shadow-md hover:bg-fuji-slate transition-all"
                        >
                            Request New Reset Link
                        </Link>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleReset}>
                        <div className="space-y-4">
                            {/* New Password */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-800 ml-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        required
                                        minLength={6}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 outline-none transition-all placeholder:text-gray-400 shadow-sm"
                                        placeholder="At least 6 characters"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-fuji-indigo transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password */}
                            <div className="space-y-2">
                                <label className="block text-sm font-semibold text-gray-800 ml-1">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        required
                                        minLength={6}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full pl-12 pr-12 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 outline-none transition-all placeholder:text-gray-400 shadow-sm"
                                        placeholder="Repeat new password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-fuji-indigo transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {errorMessage && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100 flex items-start gap-2">
                                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                                <span>{errorMessage}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-fuji-indigo hover:bg-fuji-slate focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuji-indigo shadow-lg transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                "Update Password"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ResetPassword;
