import React, { useEffect, useRef, useState, useCallback } from 'react';

interface SakuraCanvasProps {
  className?: string;
  petalCount?: number;
  interactive?: boolean;
}

interface Petal {
  x: number;
  y: number;
  z: number; // 0 (background) to 1 (foreground)
  size: number;
  baseVx: number;
  baseVy: number;
  windVx: number;
  windVy: number;
  sway: number;
  swaySpeed: number;
  swayWidth: number;
  angle: number;
  angleSpeed: number;
  flip: number;
  flipSpeed: number;
  color: string;
  alpha: number;
}

const PETAL_COLORS = [
  '#FFD1DC', // Classic sakura blossom pink
  '#FFB7C5', // Delicate cherry pink
  '#FFE4E8', // Pale ethereal cherry blush
  '#F472B6', // Vibrant blossom accent
  '#FB7185', // Warm rose Shu-iro undertone
  '#FECDD3', // Soft sakura petal
];

export const SakuraCanvas: React.FC<SakuraCanvasProps> = ({
  className = 'absolute inset-0 pointer-events-none z-[15]',
  petalCount = 38,
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const petalsRef = useRef<Petal[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const isVisibleRef = useRef<boolean>(true);
  const [reducedMotion, setReducedMotion] = useState<boolean>(false);

  // Mouse / touch interaction state
  const mousePosRef = useRef<{ x: number; y: number; vx: number; vy: number; lastX: number; lastY: number; active: boolean }>({
    x: -9999,
    y: -9999,
    vx: 0,
    vy: 0,
    lastX: -9999,
    lastY: -9999,
    active: false,
  });

  // Check prefers-reduced-motion media query safely
  useEffect(() => {
    try {
      if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq) {
        setReducedMotion(Boolean(mq.matches));

        const handler = (e: MediaQueryListEvent) => {
          setReducedMotion(Boolean(e.matches));
        };

        if (mq.addEventListener) {
          mq.addEventListener('change', handler);
          return () => mq.removeEventListener('change', handler);
        } else if ((mq as any).addListener) {
          (mq as any).addListener(handler);
          return () => (mq as any).removeListener(handler);
        }
      }
    } catch {
      // Graceful fallback
    }
  }, []);

  // Initialize petals with realistic 3D depth and variation
  const initPetals = useCallback((width: number, height: number) => {
    const petals: Petal[] = [];
    const count = Math.max(16, Math.min(60, petalCount));

    for (let i = 0; i < count; i++) {
      const z = Math.random(); // Depth layer: 0 is far/small, 1 is close/large
      const size = 9 + z * 11; // 9px to 20px
      const baseVy = 0.7 + z * 1.3; // Fall speed
      const baseVx = 0.4 + z * 0.8; // Gentle natural breeze to the right

      petals.push({
        x: Math.random() * (width + 100) - 50,
        y: Math.random() * (height + 100) - 50,
        z,
        size,
        baseVx,
        baseVy,
        windVx: 0,
        windVy: 0,
        sway: Math.random() * Math.PI * 2,
        swaySpeed: 0.015 + Math.random() * 0.02,
        swayWidth: 0.6 + z * 0.8,
        angle: Math.random() * Math.PI * 2,
        angleSpeed: (Math.random() - 0.5) * 0.025,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: 0.02 + Math.random() * 0.03,
        color: PETAL_COLORS[Math.floor(Math.random() * PETAL_COLORS.length)],
        alpha: 0.45 + z * 0.45, // Deeper petals are softer and more translucent
      });
    }

    petalsRef.current = petals;
  }, [petalCount]);

  // Draw authentic notched Sakura petal shape
  const drawSakuraPetal = (
    ctx: CanvasRenderingContext2D,
    petal: Petal
  ) => {
    ctx.save();
    ctx.translate(petal.x, petal.y);
    ctx.rotate(petal.angle);

    // 3D tumble/flip transformation
    const cosFlip = Math.cos(petal.flip);
    const sinFlip = Math.sin(petal.flip * 0.7);
    ctx.scale(Math.max(0.15, Math.abs(cosFlip)), Math.max(0.2, Math.abs(sinFlip)));

    const size = petal.size;

    ctx.beginPath();
    // Petal base (stem attachment)
    ctx.moveTo(0, size * 0.85);
    // Left outer lobe curve up to petal apex
    ctx.bezierCurveTo(
      -size * 0.65, size * 0.35,
      -size * 0.75, -size * 0.45,
      -size * 0.28, -size * 0.95
    );
    // Authentic Japanese Sakura V-notch at petal crown
    ctx.quadraticCurveTo(0, -size * 0.68, size * 0.28, -size * 0.95);
    // Right outer lobe curve back down to stem base
    ctx.bezierCurveTo(
      size * 0.75, -size * 0.45,
      size * 0.65, size * 0.35,
      0, size * 0.85
    );
    ctx.closePath();

    // Subtle gradient glow to give petals dimensional translucency
    const gradient = ctx.createRadialGradient(0, 0, 1, 0, 0, size);
    gradient.addColorStop(0, '#FFFFFF');
    gradient.addColorStop(0.35, petal.color);
    gradient.addColorStop(1, petal.color);

    ctx.fillStyle = gradient;
    ctx.globalAlpha = petal.alpha;
    ctx.shadowColor = 'rgba(255, 183, 197, 0.4)';
    ctx.shadowBlur = 4 * petal.z;
    ctx.fill();

    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let isRunning = false;

    // Handle high-DPI crisp rendering
    const handleResize = () => {
      const parent = containerRef.current?.parentElement || canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      width = rect.width || window.innerWidth || 1200;
      height = rect.height || 580;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.resetTransform?.();
      ctx.scale(dpr, dpr);

      if (petalsRef.current.length === 0) {
        initPetals(width, height);
      }

      if (reducedMotion) {
        ctx.clearRect(0, 0, width, height);
        petalsRef.current.slice(0, 15).forEach((petal) => {
          drawSakuraPetal(ctx, petal);
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // If reduced motion is requested by user, draw one calm static frame and stop
    if (reducedMotion) {
      if (petalsRef.current.length === 0) {
        initPetals(width, height);
      }
      ctx.clearRect(0, 0, width, height);
      petalsRef.current.slice(0, 15).forEach((petal) => {
        drawSakuraPetal(ctx, petal);
      });
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }

    // Interactive mouse wind-wake physics tracking
    const handleMouseMove = (e: MouseEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;

      const mouse = mousePosRef.current;
      if (mouse.lastX !== -9999) {
        mouse.vx = (currentX - mouse.lastX) * 0.45;
        mouse.vy = (currentY - mouse.lastY) * 0.45;
      }
      mouse.lastX = currentX;
      mouse.lastY = currentY;
      mouse.x = currentX;
      mouse.y = currentY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      const mouse = mousePosRef.current;
      mouse.active = false;
      mouse.lastX = -9999;
      mouse.lastY = -9999;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!interactive || !e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      const currentX = e.touches[0].clientX - rect.left;
      const currentY = e.touches[0].clientY - rect.top;

      const mouse = mousePosRef.current;
      if (mouse.lastX !== -9999) {
        mouse.vx = (currentX - mouse.lastX) * 0.35;
        mouse.vy = (currentY - mouse.lastY) * 0.35;
      }
      mouse.lastX = currentX;
      mouse.lastY = currentY;
      mouse.x = currentX;
      mouse.y = currentY;
      mouse.active = true;
    };

    // Attach mouse & touch listeners to the interactive container (parent of containerRef)
    // because containerRef has pointer-events-none which blocks direct DOM pointer dispatch.
    const eventTarget = containerRef.current?.parentElement || canvas.parentElement;
    if (eventTarget && interactive) {
      eventTarget.addEventListener('mousemove', handleMouseMove as EventListener, { passive: true });
      eventTarget.addEventListener('mouseleave', handleMouseLeave, { passive: true });
      eventTarget.addEventListener('touchmove', handleTouchMove as EventListener, { passive: true });
      eventTarget.addEventListener('touchend', handleMouseLeave, { passive: true });
      eventTarget.addEventListener('touchcancel', handleMouseLeave, { passive: true });
    }

    // 60fps Animation Loop with wind-wake physics and oscillation
    const WAKE_RADIUS = 150;
    const WAKE_RADIUS_SQ = WAKE_RADIUS * WAKE_RADIUS;

    const stopLoop = () => {
      if (animFrameRef.current !== null) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      isRunning = false;
    };

    const render = () => {
      if (!isVisibleRef.current || reducedMotion) {
        stopLoop();
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const mouse = mousePosRef.current;
      const mouseSpeed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);

      // Dampen mouse velocity frame-by-frame
      mouse.vx *= 0.88;
      mouse.vy *= 0.88;

      const petals = petalsRef.current;

      for (let i = 0; i < petals.length; i++) {
        const petal = petals[i];

        // 1. Interactive Mouse Wind-Wake Impulse
        if (mouse.active && mouseSpeed > 0.3) {
          const dx = petal.x - mouse.x;
          const dy = petal.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < WAKE_RADIUS_SQ && distSq > 4) {
            const dist = Math.sqrt(distSq);
            const force = (1 - dist / WAKE_RADIUS);

            // Outward push + drag in the direction of mouse movement
            petal.windVx += (dx / dist * 3.5 + mouse.vx * 0.35) * force;
            petal.windVy += (dy / dist * 3.5 + mouse.vy * 0.35) * force;
            petal.flipSpeed += force * 0.08;
            petal.angleSpeed += (dx > 0 ? 0.03 : -0.03) * force;
          }
        }

        // 2. Smooth Wind Damping
        petal.windVx *= 0.94;
        petal.windVy *= 0.94;

        // 3. Natural Oscillation Sway & Drift
        petal.sway += petal.swaySpeed;
        const currentSway = Math.sin(petal.sway) * petal.swayWidth;

        petal.x += petal.baseVx + petal.windVx + currentSway;
        petal.y += petal.baseVy + petal.windVy;
        petal.angle += petal.angleSpeed;
        petal.flip += petal.flipSpeed;

        // 4. Wrap around boundaries seamlessly
        if (petal.y > height + 40) {
          petal.y = -30;
          petal.x = Math.random() * (width + 80) - 40;
          petal.windVx = 0;
          petal.windVy = 0;
        }
        if (petal.x > width + 40) {
          petal.x = -30;
        } else if (petal.x < -40) {
          petal.x = width + 30;
        }

        // 5. Render
        drawSakuraPetal(ctx, petal);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isRunning && isVisibleRef.current && !reducedMotion) {
        isRunning = true;
        animFrameRef.current = requestAnimationFrame(render);
      }
    };

    // IntersectionObserver to freeze GPU/CPU execution when offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          isVisibleRef.current = entry.isIntersecting;
          if (entry.isIntersecting) {
            startLoop();
          } else {
            stopLoop();
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Initial start if visible
    startLoop();

    return () => {
      stopLoop();
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      if (eventTarget) {
        eventTarget.removeEventListener('mousemove', handleMouseMove as EventListener);
        eventTarget.removeEventListener('mouseleave', handleMouseLeave);
        eventTarget.removeEventListener('touchmove', handleTouchMove as EventListener);
        eventTarget.removeEventListener('touchend', handleMouseLeave);
        eventTarget.removeEventListener('touchcancel', handleMouseLeave);
      }
    };
  }, [initPetals, interactive, reducedMotion]);

  return (
    <div ref={containerRef} className={className} aria-hidden="true">
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ willChange: 'transform' }}
      />
    </div>
  );
};

export default SakuraCanvas;
