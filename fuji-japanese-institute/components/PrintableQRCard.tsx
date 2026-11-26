import React, { useRef, useState, useEffect } from 'react';
import { Download, Printer, Copy, Check, Sparkles, Phone, Mail, MapPin } from 'lucide-react';
import { BrandConfig, trackEvent } from '../services/socialConfig';

function drawQRCode(
  canvas: HTMLCanvasElement,
  text: string,
  size: number,
  fgColor: string,
  bgColor: string,
  logoUrl?: string,
  showLogo?: boolean,
  logoPercent: number = 18
) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  canvas.width = size;
  canvas.height = size;

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, size, size);

  const qrImg = new Image();
  qrImg.crossOrigin = 'anonymous';
  const encoded = encodeURIComponent(text);
  qrImg.src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encoded}&color=${fgColor.replace('#', '')}&bgcolor=${bgColor.replace('#', '')}&margin=2&qzone=1`;

  qrImg.onload = () => {
    ctx.drawImage(qrImg, 0, 0, size, size);

    if (showLogo && logoUrl) {
      const logo = new Image();
      logo.crossOrigin = 'anonymous';
      logo.src = logoUrl;
      logo.onload = () => {
        const logoSize = Math.min(Math.max(logoPercent, 14), 22) * (size / 100);
        const center = size / 2;
        const half = logoSize / 2;
        const padding = Math.max(Math.round(size * 0.02), 4);

        ctx.save();
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 2;
        ctx.beginPath();
        const boxX = center - half - padding;
        const boxY = center - half - padding;
        const boxDim = logoSize + padding * 2;
        ctx.roundRect(boxX, boxY, boxDim, boxDim, 8);
        ctx.fill();

        ctx.shadowColor = 'transparent';
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = '#E2E8F0';
        ctx.stroke();

        ctx.drawImage(logo, center - half, center - half, logoSize, logoSize);
        ctx.restore();
      };
    }
  };
}

export interface DynamicQRProps {
  url: string;
  size?: number;
  fgColor?: string;
  bgColor?: string;
  borderColor?: string;
  borderStyle?: string;
  errorCorrectionLevel?: string;
  logoUrl?: string;
  showLogo?: boolean;
  logoSizePercent?: number;
  showActions?: boolean;
  className?: string;
  onDownloaded?: (format: string) => void;
}

export const DynamicQR: React.FC<DynamicQRProps> = ({
  url,
  size = 240,
  fgColor = '#1E1B4B',
  bgColor = '#FFFFFF',
  borderColor = '#D90429',
  borderStyle = 'rounded',
  logoUrl = '/logo.png',
  showLogo = true,
  logoSizePercent = 18,
  showActions = true,
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (canvasRef.current) {
      drawQRCode(canvasRef.current, url, size, fgColor, bgColor, logoUrl, showLogo, logoSizePercent);
    }
  }, [url, size, fgColor, bgColor, logoUrl, showLogo, logoSizePercent]);

  const downloadPNG = () => {
    const offscreen = document.createElement('canvas');
    drawQRCode(offscreen, url, 1200, fgColor, bgColor, logoUrl, showLogo, logoSizePercent);
    setTimeout(() => {
      const dataUrl = offscreen.toDataURL('image/png');
      const a = document.createElement('a');
      a.download = 'fuji-japanese-academy-qr-300dpi.png';
      a.href = dataUrl;
      a.click();
      trackEvent('qr_download', { format: 'png', url });
    }, 400);
  };

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      trackEvent('qr_copy_url', { url });
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        className={`p-3 bg-white shadow-xl transition-transform hover:scale-[1.02] ${
          borderStyle === 'rounded' ? 'rounded-2xl border-2' :
          borderStyle === 'square' ? 'rounded-none border-2' :
          'rounded-2xl'
        }`}
        style={{ borderColor: borderColor || '#D90429' }}
      >
        <canvas
          ref={canvasRef}
          width={size}
          height={size}
          className="rounded-lg max-w-full h-auto block"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      </div>

      {showActions && (
        <div className="mt-4 flex flex-wrap gap-2 justify-center w-full max-w-sm">
          <button
            onClick={downloadPNG}
            type="button"
            className="flex-1 min-w-[140px] inline-flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-bold rounded-xl bg-fuji-indigo text-white hover:bg-fuji-indigo/90 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-fuji-red" />
            <span>Download PNG (300 DPI)</span>
          </button>
          <button
            onClick={copyUrl}
            type="button"
            className="w-full inline-flex items-center justify-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-gray-600 hover:text-fuji-red hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 font-semibold">QR URL Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Target QR URL</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export interface PrintableQRCardProps {
  config: BrandConfig;
  targetUrl: string;
  className?: string;
  showPrintTrigger?: boolean;
}

export const PrintableQRCard: React.FC<PrintableQRCardProps> = ({
  config,
  targetUrl,
  className = '',
  showPrintTrigger = true
}) => {
  const handlePrint = () => {
    trackEvent('qr_print', { url: targetUrl });
    window.print();
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <div
        id="fuji-printable-qr-card"
        className="w-full max-w-[440px] bg-white text-fuji-indigo rounded-3xl p-6 sm:p-8 shadow-2xl border-2 border-amber-200/80 relative overflow-hidden transition-all duration-300"
        style={{ background: 'linear-gradient(145deg, #FFFFFF 0%, #FFFDF9 50%, #F8FAFC 100%)' }}
      >
        <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-500/60 pointer-events-none" />
        <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-500/60 pointer-events-none" />
        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-500/60 pointer-events-none" />
        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500/60 pointer-events-none" />

        <div className="flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 rounded-2xl bg-white p-1.5 shadow-md border border-gray-100 mb-3 flex items-center justify-center">
            <img
              src={config.logo || '/logo.png'}
              alt={config.name}
              className="w-full h-full object-contain"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>
          <span className="text-[11px] font-bold tracking-[0.25em] text-fuji-red uppercase">
            {config.japaneseName}
          </span>
          <h2 className="font-display font-black text-xl sm:text-2xl tracking-tight text-fuji-indigo mt-0.5">
            {config.name}
          </h2>
          <div className="flex items-center gap-2 mt-1">
            <span className="h-[1px] w-6 bg-amber-400" />
            <p className="text-xs font-semibold text-gray-500 tracking-wider">{config.tagline}</p>
            <span className="h-[1px] w-6 bg-amber-400" />
          </div>
        </div>

        <div className="my-5 flex flex-col items-center justify-center relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-fuji-red/10 border border-fuji-red/20 text-fuji-red text-[11px] font-bold tracking-wider mb-3">
            <Sparkles className="w-3 h-3" />
            <span>{config.qr.cardTitle || 'SCAN TO CONNECT'}</span>
          </div>

          <DynamicQR
            url={targetUrl}
            size={210}
            fgColor={config.qr.fgColor || '#1E1B4B'}
            bgColor={config.qr.bgColor || '#FFFFFF'}
            borderColor={config.qr.borderColor || '#D90429'}
            borderStyle="none"
            logoUrl={config.logo || '/logo.png'}
            showLogo={config.qr.showLogoInCenter}
            logoSizePercent={18}
            showActions={false}
          />
          <p className="text-[11px] text-gray-500 mt-2 font-medium">
            Point camera or scanner at this QR code
          </p>
        </div>

        <div className="relative z-10 pt-2 pb-3 border-t border-b border-gray-100 my-2">
          <p className="text-[10px] uppercase font-bold tracking-widest text-center text-gray-400 mb-2">
            Connect With Us Everywhere
          </p>
          <div className="flex flex-wrap justify-center gap-1.5 text-[10px] font-semibold text-fuji-indigo">
            {['Website', 'Instagram', 'YouTube', 'WhatsApp', 'Facebook', 'LinkedIn', 'X', 'Google Reviews'].map((s, i) => (
              <span key={i} className="px-2 py-0.5 bg-gray-100 rounded-md border border-gray-200/60">
                {s}
              </span>
            ))}
          </div>
        </div>

        <div className="relative z-10 space-y-1.5 pt-2 text-[11px] text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <Phone className="w-3.5 h-3.5 text-fuji-red shrink-0" />
            <span className="font-semibold text-fuji-indigo">{config.phone}</span>
            <span className="text-gray-300">•</span>
            <Mail className="w-3.5 h-3.5 text-fuji-red shrink-0" />
            <span className="truncate">{config.email}</span>
          </div>
          <div className="flex items-center justify-center gap-1.5 text-center text-[10px] text-gray-500">
            <MapPin className="w-3 h-3 text-fuji-red shrink-0" />
            <span className="truncate">{config.address}</span>
          </div>
          <div className="text-center pt-1">
            <span className="text-[10px] font-bold text-fuji-indigo">www.fujijapaneseacademy.com</span>
          </div>
        </div>
      </div>

      {showPrintTrigger && (
        <div className="mt-4 flex gap-3 print:hidden">
          <button
            onClick={handlePrint}
            type="button"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-fuji-red text-white font-bold text-sm shadow-lg hover:bg-fuji-darkRed transition-all active:scale-95 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print QR Card</span>
          </button>
        </div>
      )}

      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #fuji-printable-qr-card, #fuji-printable-qr-card * {
            visibility: visible;
          }
          #fuji-printable-qr-card {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            box-shadow: none !important;
            border: 1px solid #ddd !important;
            page-break-inside: avoid;
            margin: 0;
            width: 100% !important;
            max-width: 400px !important;
          }
        }
      `}</style>
    </div>
  );
};

export default PrintableQRCard;
