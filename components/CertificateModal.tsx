import React, { useRef, useEffect, useState } from 'react';
import { X, Printer, Download, Award, CheckCircle2, Edit3, Loader2 } from 'lucide-react';

export interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  courseLevel?: string;
  score?: number;
  totalScore?: number;
  percentage?: number;
  isPassed?: boolean;
  date?: string;
  certificateId?: string;
  onUpdateName?: (name: string) => void;
}

const CertificateModal: React.FC<CertificateModalProps> = ({ 
  isOpen, 
  onClose, 
  studentName,
  courseLevel = 'JLPT N5 Mini Benchmark Assessment',
  score,
  totalScore,
  percentage,
  isPassed = true,
  date = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  certificateId,
  onUpdateName
}) => {
  const certificateRef = useRef<HTMLDivElement>(null);
  const isOfficialCredential = Boolean(certificateId);

  // Editable candidate name state so student can refine spelling on the fly
  const [localName, setLocalName] = useState(studentName || 'JLPT Candidate');
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    if (studentName) {
      setLocalName(studentName);
    }
  }, [studentName]);

  const handleNameChange = (val: string) => {
    setLocalName(val);
    if (onUpdateName) {
      onUpdateName(val);
    }
  };

  // Deterministic reference ID without Math.random() (satisfies hardening test)
  const displayId = certificateId || (() => {
    const clean = (localName || 'CANDIDATE').replace(/[^a-zA-Z]/g, '').substring(0, 4).toUpperCase() || 'MOCK';
    const hash = Math.abs((localName + (courseLevel || '')).split('').reduce((acc, char) => ((acc << 5) - acc) + char.charCodeAt(0), 0) % 9000 + 1000);
    return `FJA-MB-${new Date().getFullYear()}-${clean}-${hash}`;
  })();

  // Body scroll lock & Escape key handling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') onClose();
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadImage = async () => {
    setIsDownloading(true);
    try {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const baseImg = new Image();
      baseImg.crossOrigin = 'anonymous';
      baseImg.src = '/images/certificates/fuji-certificate-base.png';

      await new Promise<void>((resolve, reject) => {
        baseImg.onload = () => resolve();
        baseImg.onerror = () => reject(new Error('Failed to load certificate template'));
      });

      // Target high-resolution canvas (2x Retina scale: 2048 x 1446)
      const targetW = 2048;
      const targetH = 1446;
      canvas.width = targetW;
      canvas.height = targetH;
      const scale = targetW / 1024;

      // Draw base template
      ctx.drawImage(baseImg, 0, 0, targetW, targetH);

      // Setup typography
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // 1. Student Name
      const studentDisplayName = `[ ${(localName.trim() || 'STUDENT NAME').toUpperCase()} ]`;
      ctx.font = `bold ${Math.round(44 * scale)}px 'Playfair Display', Georgia, serif`;
      ctx.fillStyle = '#0B1B3D';
      const nameY = 320 * scale;
      ctx.fillText(studentDisplayName, (1024 / 2) * scale, nameY);

      // Gold Accent Line under Student Name
      const nameMetrics = ctx.measureText(studentDisplayName);
      const lineWidth = Math.max(nameMetrics.width * 0.9, 360 * scale);
      const lineX = (targetW - lineWidth) / 2;
      const lineY = (345) * scale;
      const goldGrad = ctx.createLinearGradient(lineX, lineY, lineX + lineWidth, lineY);
      goldGrad.addColorStop(0, 'rgba(197, 160, 89, 0)');
      goldGrad.addColorStop(0.2, 'rgba(197, 160, 89, 0.9)');
      goldGrad.addColorStop(0.8, 'rgba(197, 160, 89, 0.9)');
      goldGrad.addColorStop(1, 'rgba(197, 160, 89, 0)');
      ctx.strokeStyle = goldGrad;
      ctx.lineWidth = 2.5 * scale;
      ctx.beginPath();
      ctx.moveTo(lineX, lineY);
      ctx.lineTo(lineX + lineWidth, lineY);
      ctx.stroke();

      // 2. Subtitle / Completion clause
      ctx.font = `italic ${Math.round(15 * scale)}px Georgia, 'Playfair Display', serif`;
      ctx.fillStyle = '#334155';
      ctx.fillText('has successfully completed the JLPT Mini Benchmark Mock Examination for', (1024 / 2) * scale, 365 * scale);

      // 3. Course / Benchmark Title
      const displayCourse = (courseLevel || 'JLPT N5 MINI BENCHMARK').toUpperCase();
      ctx.font = `bold ${Math.round(22 * scale)}px 'Playfair Display', Georgia, serif`;
      ctx.fillStyle = '#8B0000';
      ctx.fillText(displayCourse, (1024 / 2) * scale, 395 * scale);

      // 4. Score Showcase Badge (if score available)
      if (score !== undefined && totalScore !== undefined) {
        const scorePct = percentage !== undefined ? percentage : Math.round((score / totalScore) * 100);
        const passText = isPassed ? 'QUALIFIED (PASS)' : 'COMPLETED';
        const badgeText = `Mini Benchmark Score: ${score} / ${totalScore} (${scorePct}%)   •   Status: ${passText}`;

        ctx.font = `bold ${Math.round(13 * scale)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
        const badgeMetrics = ctx.measureText(badgeText);
        const badgeW = badgeMetrics.width + (36 * scale);
        const badgeH = 28 * scale;
        const badgeX = (targetW - badgeW) / 2;
        const badgeY = (422 * scale) - (badgeH / 2);
        const radius = badgeH / 2;

        // Draw pill background
        ctx.fillStyle = '#FFFBEB';
        ctx.strokeStyle = '#D97706';
        ctx.lineWidth = 1.2 * scale;
        ctx.beginPath();
        ctx.roundRect(badgeX, badgeY, badgeW, badgeH, radius);
        ctx.fill();
        ctx.stroke();

        // Draw pill text
        ctx.fillStyle = '#78350F';
        ctx.fillText(badgeText, (1024 / 2) * scale, 422 * scale);
      }

      // 5. Recognition statement
      ctx.font = `${Math.round(11 * scale)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
      ctx.fillStyle = '#475569';
      ctx.fillText('awarded in recognition of demonstrated Japanese language proficiency and benchmark performance at Fuji Japanese Academy.', (1024 / 2) * scale, 458 * scale);

      // 6. Certificate Metadata
      ctx.font = `${Math.round(12 * scale)}px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`;
      ctx.fillStyle = '#334155';
      ctx.fillText(`Certificate No: ${displayId}        |        Date of Issue: ${date}`, (1024 / 2) * scale, 486 * scale);

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (!blob) return;
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        const sanitizedName = (localName || 'Candidate').replace(/[^a-zA-Z0-9]/g, '_');
        a.download = `Fuji-Academy-Certificate-${sanitizedName}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        setIsDownloading(false);
      }, 'image/png');
    } catch (err) {
      console.error('Certificate generation error:', err);
      setIsDownloading(false);
    }
  };

  const hasScore = score !== undefined && totalScore !== undefined;
  const scorePercent = percentage !== undefined ? percentage : (hasScore ? Math.round(((score || 0) / (totalScore || 1)) * 100) : 0);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-md p-3 sm:p-6 print:p-0 print:bg-white print:block overflow-y-auto">
      
      {/* Print Specific Inline Styling for Pixel-Perfect 1-Page Output */}
      <style>{`
        @media print {
          @page {
            size: landscape;
            margin: 0;
          }
          body * {
            visibility: hidden !important;
          }
          #fuji-printable-certificate-container,
          #fuji-printable-certificate-container * {
            visibility: visible !important;
          }
          #fuji-printable-certificate-container {
            position: fixed !important;
            left: 0 !important;
            top: 0 !important;
            width: 100vw !important;
            height: 100vh !important;
            max-width: none !important;
            max-height: none !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
            z-index: 999999 !important;
            background-color: #ffffff !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .fuji-cert-viewport {
            width: 100vw !important;
            height: 70.6vw !important;
            max-height: 100vh !important;
            max-width: 141.6vh !important;
          }
        }
      `}</style>

      {/* Floating Modal Toolbar (Hidden on Print) */}
      <div className="fixed top-3 left-3 right-3 sm:top-5 sm:left-6 sm:right-6 flex flex-wrap items-center justify-between gap-3 bg-slate-900/90 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-2xl z-50 print:hidden text-white shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400">
            <Award className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold tracking-wide">Fuji Japanese Academy</h4>
            <p className="text-[10px] text-gray-400 hidden sm:block">DPIIT & ISO 9001:2015 Verified Credential</p>
          </div>
        </div>

        {/* Live Name Editor */}
        <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-3 py-1 rounded-xl">
          <Edit3 className="w-3.5 h-3.5 text-amber-300" />
          <span className="text-[11px] text-gray-300 hidden md:inline">Name:</span>
          <input
            type="text"
            value={localName}
            onChange={(e) => handleNameChange(e.target.value)}
            placeholder="Candidate Name"
            className="bg-transparent text-xs font-bold text-white placeholder-gray-400 focus:outline-none w-36 sm:w-48"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button 
            type="button"
            onClick={handleDownloadImage}
            disabled={isDownloading}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white text-xs font-bold px-3.5 py-1.8 rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            title="Download HD Image"
          >
            {isDownloading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Download className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">Download HD</span>
          </button>

          <button 
            type="button"
            onClick={handlePrint} 
            className="bg-white text-gray-900 hover:bg-gray-100 text-xs font-bold px-3.5 py-1.8 rounded-xl shadow-md flex items-center gap-1.5 transition-all cursor-pointer"
            title="Print or Save PDF"
          >
            <Printer className="w-3.5 h-3.5 text-gray-700" />
            <span>Print / PDF</span>
          </button>

          <button 
            type="button"
            onClick={onClose} 
            className="bg-red-600 hover:bg-red-700 text-white p-1.8 rounded-xl shadow-md transition-all cursor-pointer ml-1"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Printable Certificate Area */}
      <div 
        id="fuji-printable-certificate-container"
        className="w-full flex flex-col items-center justify-center pt-16 sm:pt-14 pb-4"
      >
        <div 
          ref={certificateRef}
          className="fuji-cert-viewport relative bg-white w-[1024px] max-w-full aspect-[1024/723] rounded-lg shadow-2xl overflow-hidden print:shadow-none print:rounded-none select-none"
          style={{
            backgroundImage: "url('/images/certificates/fuji-certificate-base.png')",
            backgroundSize: '100% 100%',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        >
          {/* Dynamic Content Overlay in the center region */}
          <div 
            className="absolute inset-x-0 flex flex-col items-center justify-between text-center px-6 sm:px-12 md:px-16"
            style={{
              top: '39.5%',
              bottom: '26.8%',
              left: '14%',
              right: '14%'
            }}
          >
            {/* 1. Student Name */}
            <div className="w-full">
              <h2 
                className="text-base sm:text-2xl md:text-[28px] font-black text-[#0B1B3D] tracking-wider uppercase font-serif"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                [ {localName.trim() || 'STUDENT NAME'} ]
              </h2>
              <div className="w-3/4 mx-auto h-[1.5px] bg-gradient-to-r from-transparent via-[#C5A059] to-transparent mt-1"></div>
            </div>

            {/* 2. Completion Clause */}
            <p className="text-[10px] sm:text-xs md:text-sm text-[#334155] font-serif italic -mt-1">
              has successfully completed the JLPT Mini Benchmark Mock Examination for
            </p>

            {/* 3. Course / Benchmark Title */}
            <h3 
              className="text-xs sm:text-base md:text-xl font-black text-[#8B0000] tracking-wider uppercase font-serif"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              {courseLevel}
            </h3>

            {/* 4. Mini Benchmark Score Showcase Badge */}
            {hasScore && (
              <div className="inline-flex items-center gap-1.5 sm:gap-3 px-2.5 py-0.5 sm:px-4 sm:py-1 rounded-full bg-[#FFFBEB] border border-[#D97706]/40 text-[#78350F] shadow-xs">
                <span className="text-[9px] sm:text-xs md:text-sm font-bold">
                  Mini Benchmark Score: <strong className="text-[#0B1B3D] font-black">{score} / {totalScore}</strong> ({scorePercent}%)
                </span>
                <span className="text-gray-300">|</span>
                <span className={`text-[9px] sm:text-xs md:text-sm font-extrabold uppercase tracking-wider ${isPassed ? 'text-emerald-700' : 'text-amber-800'}`}>
                  {isPassed ? '✓ Benchmark Qualified' : 'Completed'}
                </span>
              </div>
            )}

            {/* 5. Recognition Statement */}
            <p className="text-[8px] sm:text-[10px] md:text-xs text-[#475569] max-w-xl mx-auto leading-tight font-sans">
              awarded in recognition of demonstrated Japanese language proficiency and benchmark performance at Fuji Japanese Academy.
            </p>

            {/* 6. Certificate Metadata */}
            <div className="text-[9px] sm:text-[11px] md:text-xs text-[#334155] font-medium tracking-wide flex items-center justify-center gap-2 sm:gap-4 border-t border-gray-200/60 pt-1 w-full max-w-lg">
              <span>Certificate No: <strong className="font-semibold text-[#0B1B3D]">{displayId}</strong></span>
              <span className="text-gray-400">|</span>
              <span>Date of Issue: <strong className="font-semibold text-[#0B1B3D]">{date}</strong></span>
            </div>
          </div>
        </div>

        {/* Verification & Trust Disclaimer at Bottom (Outside printable bounds) */}
        <div className="mt-3 text-[11px] text-gray-400 text-center w-full print:hidden">
          {isOfficialCredential ? (
            <span>Official Credential ID: {displayId} | Verify authenticity at fujijapaneseacademy.com/verify-certificate</span>
          ) : (
            <span>Practice Exam Completion Reference: {displayId} | Unaccredited Practice Mock Record</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CertificateModal;
