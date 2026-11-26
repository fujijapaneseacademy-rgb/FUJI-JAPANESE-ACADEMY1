import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default: 8)
  scale?: number; // Scale on hover (default: 1.02)
  glare?: boolean; // Enable dynamic light glare
  washiStyle?: boolean; // Apply Torinoko-iro washi aesthetic
  shuiroAccent?: boolean; // Apply subtle Shu-iro vermilion highlight
}

export const TiltCard: React.FC<TiltCardProps> = ({
  children,
  className = '',
  maxTilt = 8,
  scale = 1.02,
  glare = true,
  washiStyle = false,
  shuiroAccent = false,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [glarePosition, setGlarePosition] = useState<{ x: number; y: number; opacity: number }>({
    x: 50,
    y: 50,
    opacity: 0,
  });

  // Motion values for smooth 60fps spring transitions
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-maxTilt, maxTilt]);

  useEffect(() => {
    try {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq) {
        setReducedMotion(Boolean(mq.matches));
        const handler = (e: MediaQueryListEvent) => setReducedMotion(Boolean(e.matches));
        if (mq.addEventListener) {
          mq.addEventListener('change', handler);
          return () => mq.removeEventListener('change', handler);
        } else if ((mq as any).addListener) {
          (mq as any).addListener(handler);
          return () => (mq as any).removeListener(handler);
        }
      }
    } catch {
      // Graceful fallback: do nothing in headless/SSR environments
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Normalize coordinates from -0.5 to 0.5
    const normX = x / rect.width - 0.5;
    const normY = y / rect.height - 0.5;

    mouseX.set(normX);
    mouseY.set(normY);

    if (glare) {
      setGlarePosition({
        x: (x / rect.width) * 100,
        y: (y / rect.height) * 100,
        opacity: 0.18,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
    setGlarePosition((prev) => ({ ...prev, opacity: 0 }));
  };

  if (reducedMotion) {
    return (
      <div
        className={`relative ${washiStyle ? 'bg-[#FAF8F5]' : ''} ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      style={{ perspective: 1000 }}
      className="w-full h-full"
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered ? scale : 1,
        }}
        transition={{
          scale: { duration: 0.25, ease: 'easeOut' },
        }}
        className={`relative w-full h-full transition-shadow duration-300 ${
          washiStyle ? 'bg-[#FAF8F5] border-[#F2ECE1]' : ''
        } ${
          shuiroAccent && isHovered
            ? 'shadow-2xl shadow-red-500/15 ring-1 ring-[#D90429]/30'
            : ''
        } ${className}`}
      >
        {/* Child Content */}
        <div style={{ transform: 'translateZ(1px)' }} className="w-full h-full">
          {children}
        </div>

        {/* Dynamic Glare Specular Highlight */}
        {glare && (
          <div
            className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-300"
            style={{
              opacity: glarePosition.opacity,
              background: `radial-gradient(circle 260px at ${glarePosition.x}% ${glarePosition.y}%, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 80%)`,
              zIndex: 25,
            }}
          />
        )}
      </motion.div>
    </div>
  );
};

export default TiltCard;
