import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ShieldCheck, Search, CheckCircle2, XCircle, Award,
  Building2, Calendar, FileText, ArrowRight, UserCheck, AlertCircle,
  AlertTriangle, Clock, Loader2
} from 'lucide-react';
import Breadcrumbs from '../components/Breadcrumbs';
import { supabase } from '../src/lib/supabaseClient';

export interface VerificationResult {
  certificateId: string;
  studentName?: string;
  courseCompleted?: string;
  jlptLevelEquivalent?: string;
  issueDate?: string;
  expiryDate?: string;
  status: 'AUTHENTIC' | 'REVOKED' | 'EXPIRED' | 'NOT_FOUND';
  grade?: string;
  issuingAuthority?: string;
  revocationReason?: string;
  message?: string;
}

export const VerifyCertificatePage: React.FC = () => {
  const [certInput, setCertInput] = useState('');
  const [hasSearched, setHasSearched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceError, setServiceError] = useState<string | null>(null);
  const [result, setResult] = useState<VerificationResult | null>(null);
  const [cooldownRemaining, setCooldownRemaining] = useState<number>(0);
  const [lastQueryTime, setLastQueryTime] = useState<number>(0);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanId = certInput.trim().toUpperCase();
    if (!cleanId) return;

    // Abuse prevention & query rate-limiting (1.5-second cooldown between queries)
    const now = Date.now();
    const timeSinceLast = now - lastQueryTime;
    if (timeSinceLast < 1500) {
      const waitMs = 1500 - timeSinceLast;
      setCooldownRemaining(Math.ceil(waitMs / 1000));
      setTimeout(() => setCooldownRemaining(0), waitMs);
      return;
    }
    setLastQueryTime(now);

    setIsLoading(true);
    setServiceError(null);
    setHasSearched(true);
    setResult(null);

    try {
      // Authoritative verification via Supabase backend RPC
      // The backend RPC masks student names and verifies status against official database records.
      const { data, error } = await supabase.rpc('verify_certificate', {
        p_cert_id: cleanId,
      });

      if (error) {
        // If RPC is unavailable (e.g. offline, local dev without Supabase credentials, or migration pending)
        console.warn('[Certificate Verification] RPC Error:', error);
        setServiceError('Certificate verification service is temporarily unavailable. Please retry or contact the academy directly.');
        setResult(null);
      } else if (data) {
        if (data.status === 'NOT_FOUND') {
          setResult(null);
        } else {
          setResult(data as VerificationResult);
        }
      } else {
        setResult(null);
      }
    } catch (err: any) {
      console.error('[Certificate Verification] Network error:', err);
      setServiceError('Unable to connect to credential registry. Please check your network connection and retry.');
      setResult(null);
    } finally {
      setIsLoading(false);
    }
  };

  const pageTitle = 'Official Certificate Verification Portal | Fuji Japanese Academy';
  const metaDescription = 'Authenticate graduation credentials, JLPT completion records, and corporate credentials issued by Fuji Japanese Academy Private Limited, Bengaluru.';

  return (
    <div className="pt-24 min-h-screen bg-slate-50 text-slate-800">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <link rel="canonical" href="https://fujijapaneseacademy.com/verify-certificate" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDescription} />
      </Helmet>

      <div className="container mx-auto px-4 md:px-8 py-3">
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: 'Verify Certificate', path: '/verify-certificate' }
          ]}
        />
      </div>

      {/* Hero */}
      <header className="py-14 bg-gradient-to-br from-slate-950 via-[#181335] to-slate-950 text-white">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600/20 text-red-300 text-xs font-bold uppercase tracking-wider mb-4 border border-red-500/30">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Authoritative Credential Registry</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Verify Academy Certificate
          </h1>

          <p className="text-sm sm:text-base text-slate-300 font-light leading-relaxed max-w-2xl mx-auto mb-8">
            Authenticate graduation credentials, JLPT readiness certificates, and corporate training verifications issued by Fuji Japanese Academy.
          </p>

          {/* Search Box */}
          <form onSubmit={handleVerify} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                required
                value={certInput}
                onChange={(e) => setCertInput(e.target.value)}
                placeholder="Enter Certificate ID (e.g. FJA-2026-N5-8841)"
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white text-slate-900 placeholder-slate-400 font-mono text-sm uppercase font-bold outline-none border-2 border-transparent focus:border-red-500 shadow-xl"
              />
              <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-4" />
            </div>

            <button
              type="submit"
              disabled={isLoading || cooldownRemaining > 0}
              className="px-7 py-3.5 rounded-2xl bg-red-600 hover:bg-red-700 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold text-sm shadow-xl shadow-red-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : cooldownRemaining > 0 ? (
                <span>Wait {cooldownRemaining}s</span>
              ) : (
                <>
                  <span>Verify Now</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <p className="text-xs text-slate-400 mt-3 font-light">
            Each credential is cryptographic and verified against official academy registry records.
          </p>
        </div>
      </header>

      {/* Verification Output Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 md:px-8 max-w-3xl">
          {serviceError && (
            <div role="alert" aria-live="polite" className="mb-6 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 flex items-start gap-3 animate-fade-in">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold text-sm">Registry Service Notice</strong>
                <p className="text-xs text-amber-800 mt-1 leading-relaxed">{serviceError}</p>
                <div className="mt-3">
                  <a
                    href="mailto:info@fujijapaneseacademy.com?subject=Certificate%20Verification%20Inquiry"
                    className="text-xs font-bold text-amber-900 underline hover:text-amber-700"
                  >
                    Contact Academic Examination Office &rarr;
                  </a>
                </div>
              </div>
            </div>
          )}

          {hasSearched && !isLoading && !serviceError && (
            <div role="status" aria-live="polite">
              {result && result.status === 'AUTHENTIC' ? (
                <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-emerald-500 shadow-xl space-y-6 animate-fade-in">
                  <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-emerald-600">
                          Verified &bull; Authentic Credential
                        </span>
                        <h3 className="text-xl font-extrabold text-slate-900 font-mono">
                          {result.certificateId}
                        </h3>
                      </div>
                    </div>

                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">
                      Active &bull; Valid
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block font-medium">Student Name</span>
                      <strong className="text-slate-900 text-base">{result.studentName}</strong>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block font-medium">Course Program</span>
                      <strong className="text-slate-900 text-base">{result.courseCompleted}</strong>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block font-medium">JLPT Equivalent Level</span>
                      <strong className="text-red-600 text-base">{result.jlptLevelEquivalent}</strong>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block font-medium">Graduation Grade</span>
                      <strong className="text-slate-900 text-base">{result.grade}</strong>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block font-medium">Date of Conferment</span>
                      <strong className="text-slate-900">{result.issueDate}</strong>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-2xl">
                      <span className="text-slate-400 block font-medium">Issuing Authority</span>
                      <strong className="text-slate-900">{result.issuingAuthority || 'Fuji Japanese Academy Academic Council'}</strong>
                    </div>
                  </div>

                  <div className="p-4 bg-slate-900 text-white rounded-2xl text-xs flex items-center justify-between">
                    <div>
                      <span className="font-bold block">Need an official sealed transcript for visa or employer background check?</span>
                      <span className="text-slate-300">Our academic directorate issues certified background verification reports.</span>
                    </div>
                    <a
                      href={`mailto:info@fujijapaneseacademy.com?subject=Transcript%20Verification%20Request%20${result.certificateId}`}
                      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors whitespace-nowrap ml-3"
                    >
                      Request Transcript
                    </a>
                  </div>
                </div>
              ) : result && result.status === 'REVOKED' ? (
                <div className="bg-white rounded-3xl p-8 border-2 border-red-500 shadow-xl space-y-4 animate-fade-in text-center">
                  <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 uppercase tracking-wider">
                    Status: Revoked Credential
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-mono">
                    {result.certificateId}
                  </h3>
                  <p className="text-sm text-red-700 max-w-md mx-auto font-medium">
                    This certificate has been formally REVOKED by the Fuji Japanese Academy Academic Council.
                  </p>
                  {result.revocationReason && (
                    <div className="p-3 bg-red-50 rounded-xl text-xs text-red-800 font-mono inline-block">
                      Reason: {result.revocationReason}
                    </div>
                  )}
                  <p className="text-xs text-slate-500 font-light">
                    For verification disputes or appeals, contact <a href="mailto:info@fujijapaneseacademy.com" className="text-red-600 underline font-semibold">info@fujijapaneseacademy.com</a>.
                  </p>
                </div>
              ) : result && result.status === 'EXPIRED' ? (
                <div className="bg-white rounded-3xl p-8 border-2 border-amber-500 shadow-xl space-y-4 animate-fade-in text-center">
                  <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto">
                    <Clock className="w-8 h-8" />
                  </div>
                  <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 uppercase tracking-wider">
                    Status: Expired Credential
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 font-mono">
                    {result.certificateId}
                  </h3>
                  <p className="text-sm text-slate-700 max-w-md mx-auto">
                    This short-term course credential reached its validity period and has expired.
                  </p>
                  <p className="text-xs text-slate-500">
                    Conferment Date: {result.issueDate} &bull; Expiration Date: {result.expiryDate}
                  </p>
                </div>
              ) : (
                <div className="bg-white rounded-3xl p-8 border border-red-200 shadow-lg text-center space-y-4 animate-fade-in">
                  <div className="w-14 h-14 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto">
                    <XCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">
                    No Matching Certificate Found
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto font-light leading-relaxed">
                    We could not locate any active credential matching ID <code className="font-bold text-slate-900 font-mono">{certInput}</code> in the academy database. Please recheck the alphanumeric ID printed on your document.
                  </p>
                  <div className="pt-2">
                    <a
                      href="https://wa.me/916364924110?text=Hi%20Fuji%20Japanese%20Academy,%20I%20am%20trying%20to%20verify%20my%20certificate%20ID%20and%20need%20assistance."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-red-600 transition-colors"
                    >
                      Contact Examination Desk on WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Employer Verification Info */}
          <div className="mt-12 p-6 rounded-3xl bg-white border border-slate-200 space-y-3">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Building2 className="w-4 h-4 text-red-600" />
              <span>For Corporate HRs &amp; Background Screening Agencies</span>
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed font-light">
              Fuji Japanese Academy Private Limited provides automated and manual education verification for IT companies, background verification agencies (BGVs), and Japanese immigration authorities. For formal API access or stamped letters of verification, email your inquiry to <a href="mailto:info@fujijapaneseacademy.com" className="text-red-600 font-bold underline">info@fujijapaneseacademy.com</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VerifyCertificatePage;
