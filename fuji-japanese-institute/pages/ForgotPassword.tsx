import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../src/lib/supabaseClient';
import { sendPasswordResetEmail } from '../services/emailService';

const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        const cleanEmail = email.trim().toLowerCase();

        if (!cleanEmail || !cleanEmail.includes('@')) {
            setErrorMessage('Please enter a valid email address.');
            setStatus('error');
            return;
        }

        setLoading(true);
        setStatus('idle');
        setErrorMessage('');

        try {
            // 1. First attempt: Use Fuji Custom Edge Function (sends from info@fujijapaneseacademy.com via Resend)
            const { data: edgeData, error: edgeErr } = await supabase.functions.invoke('send-email', {
                body: {
                    formType: 'PasswordReset',
                    email: cleanEmail,
                    loginUrl: `${window.location.origin}/reset-password`
                }
            });

            if (!edgeErr && edgeData?.studentSent) {
                setStatus('success');
                return;
            }

            // 2. Fallback attempt: Standard Supabase reset if edge function encounters issue
            const { error } = await supabase.auth.resetPasswordForEmail(cleanEmail, {
                redirectTo: `${window.location.origin}/reset-password`,
            });

            if (error) throw error;

            setStatus('success');
        } catch (err: any) {

            // 3. Fallback: Send email notification via EmailJS
            try {
                const emailSent = await sendPasswordResetEmail(cleanEmail);
                if (emailSent) {
                    setStatus('success');
                    return;
                }
            } catch (fallbackErr) {
                if (import.meta.env.DEV) console.warn("Fallback error:", fallbackErr);
            }

            setStatus('error');
            if (err.message?.toLowerCase().includes('rate limit') || err.status === 429) {
                setErrorMessage('Too many requests. Please wait a minute before requesting another password reset link.');
            } else {
                setErrorMessage(err.message || 'Unable to send reset email. Please verify your email or contact support.');
            }
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
                        Forgot Password?
                    </h2>
                    <p className="text-gray-500">
                        Don't worry! It happens. Please enter the email address associated with your account.
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
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Check your email</h3>
                        <p className="text-gray-500 mb-2">
                            We have sent a password reset link to <span className="font-semibold text-gray-900">{email}</span>.
                        </p>
                        <p className="text-xs text-gray-600 mb-6">
                            Be sure to check your Spam or Junk folder if the email doesn't appear in a couple of minutes.
                        </p>
                        <button
                            type="button"
                            onClick={() => setStatus('idle')}
                            className="text-fuji-indigo font-semibold hover:text-fuji-red transition-colors cursor-pointer"
                        >
                            Try another email
                        </button>
                    </motion.div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleReset}>
                        <div className="space-y-2">
                            <label htmlFor="email-address" className="block text-sm font-semibold text-gray-800 ml-1">
                                Email address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-fuji-indigo focus:ring-2 focus:ring-fuji-indigo/20 outline-none transition-all placeholder:text-gray-400 shadow-sm"
                                    placeholder="name@example.com"
                                />
                            </div>
                        </div>

                        {status === 'error' && (
                            <div className="p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-100">
                                {errorMessage}
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
                                "Send Reset Link"
                            )}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
