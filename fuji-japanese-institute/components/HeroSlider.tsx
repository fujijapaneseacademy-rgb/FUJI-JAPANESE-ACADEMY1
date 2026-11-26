import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import SakuraCanvas from './SakuraCanvas';

interface HeroSliderProps {
  onOpenEnrollment: () => void;
}

export interface SlideData {
  id: number;
  image: string;
  badge: string;
  title: string;
  titleHighlight: string;
  subtitle: string;
  tags: string[];
  primaryAction: 'enroll' | 'connect';
  primaryText: string;
  secondaryText: string;
  alt: string;
}

const SLIDES: SlideData[] = [
  {
    id: 1,
    image: '/images/hero-slider/slide-1-institutional.jpg',
    badge: 'India • Japan Bilateral Initiative',
    title: 'Institutional Partnerships',
    titleHighlight: 'for a Brighter Future',
    subtitle: 'Fostering academic MoUs, university student exchange programs, and corporate hiring bridges between India and Japan.',
    tags: ['Academic MoUs', 'Student Exchange', 'Faculty Training', 'Bilateral Programs'],
    primaryAction: 'connect',
    primaryText: 'Partner With Us',
    secondaryText: 'Book a Consultation',
    alt: 'Institutional Partnerships for a Brighter Future - India-Japan Academic and Corporate Collaboration at Fuji Japanese Academy',
  },
  {
    id: 2,
    image: '/images/hero-slider/slide-2-study-abroad.jpg',
    badge: 'Higher Education in Japan',
    title: 'Study Abroad with',
    titleHighlight: 'Japanese University Pathways',
    subtitle: 'Direct university admissions, MEXT scholarship guidance, visa processing, and complete relocation support for Indian students.',
    tags: ['MEXT Scholarships', 'Top 30 Japanese Universities', '100% Visa Guidance', 'Campus Support'],
    primaryAction: 'enroll',
    primaryText: 'Start Your Application',
    secondaryText: 'Talk to Study Abroad Expert',
    alt: 'Study Abroad with Japanese University Pathways - Japanese University Admissions, Scholarships and Visa Guidance',
  },
  {
    id: 3,
    image: '/images/hero-slider/slide-3-classroom-future.jpg',
    badge: 'Certified Native Sensei',
    title: 'Learn Japanese &',
    titleHighlight: 'Build Your Global Future',
    subtitle: 'Comprehensive JLPT N5 to N1 preparation. Interactive physical classroom coaching in Bengaluru & live Zoom cohorts nationwide.',
    tags: ['JLPT N5 to N1', 'Native Japanese Sensei', 'Interactive Speaking Drills', '98.4% Pass Rate'],
    primaryAction: 'enroll',
    primaryText: 'Start Learning Today',
    secondaryText: 'Book a Free Consultation',
    alt: 'Learn Japanese and Build Your Global Future - Classroom and Live Online Coaching with Native Sensei at Fuji Japanese Academy',
  },
  {
    id: 4,
    image: '/images/hero-slider/slide-4-corporate-career.jpg',
    badge: 'Global Career Launchpad',
    title: 'Build Your Corporate Career',
    titleHighlight: 'in Tokyo & Japan',
    subtitle: "Launch your career in Japan's premier tech hubs. Business Japanese, interview bootcamps, and direct corporate placement opportunities.",
    tags: ['Bilingual IT Careers', 'Tokyo MNC Placement', 'Business Keigo', 'Work Visa Support'],
    primaryAction: 'enroll',
    primaryText: 'Explore Career Pathways',
    secondaryText: 'Book Career Counseling',
    alt: 'Build Your Corporate Career in Japan - Tokyo IT Jobs, Career Prep and Visa Support at Fuji Japanese Academy',
  },
];

const AUTO_PLAY_INTERVAL = 4500; // 4.5 seconds

export const HeroSlider: React.FC<HeroSliderProps> = ({ onOpenEnrollment }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const navigate = useNavigate();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Touch gesture support for mobile devices
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Preload all slides on initial mount for instant transitions
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && typeof Image !== 'undefined') {
        SLIDES.forEach((slide) => {
          const img = new Image();
          img.src = slide.image;
        });
      }
    } catch {
      // Ignore in headless/SSR environments
    }
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-play timer (pauses on hover/touch)
  useEffect(() => {
    if (isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, AUTO_PLAY_INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, isPaused, nextSlide]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const handlePrimaryClick = () => {
    const slide = SLIDES[currentIndex];
    if (slide.primaryAction === 'connect') {
      navigate('/college-partnerships');
    } else {
      onOpenEnrollment();
    }
  };

  const handleSecondaryClick = () => {
    navigate('/enquire');
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide = SLIDES[currentIndex];

  return (
    <section
      className="relative w-full overflow-hidden bg-gray-950 select-none group min-h-[600px] sm:min-h-[640px] md:min-h-[680px] lg:min-h-[720px] xl:min-h-[760px] flex items-center pt-[100px] sm:pt-[110px] md:pt-[120px] pb-16 sm:pb-20 md:pb-24"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      role="region"
      aria-roledescription="carousel"
      aria-label="Fuji Japanese Academy Highlights Carousel"
    >
      {/* Screen-reader SEO Heading to preserve high-value H1 indexing */}
      <div className="sr-only">
        <h1>Top Japanese Language Institute in India, Bengaluru &amp; Japan — Offline Classroom &amp; Live Online Classes</h1>
        <p>
          Master JLPT N5 to N1 with certified Native &amp; Indian N1 Faculty. Attend offline classes at our Electronic City, Bengaluru campus, join live interactive online batches from anywhere in India, or enroll in our on-shore Study &amp; Work in Japan programs.
        </p>
      </div>

      {/* Background Photographic Image with Smooth Crossfade - Full Bleed Edge-to-Edge */}
      <div className="absolute inset-0 w-full h-full">
        <AnimatePresence initial={false} mode="wait">
          <motion.img
            key={currentSlide.id}
            src={currentSlide.image}
            alt={currentSlide.alt}
            width={1920}
            height={1080}
            loading={currentIndex === 0 ? 'eager' : 'lazy'}
            fetchPriority={currentIndex === 0 ? 'high' : 'auto'}
            decoding="async"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full object-cover object-center"
          />
        </AnimatePresence>
      </div>

      {/* Cinematic Contrast Gradient Scrim: Deep on the left, clear on the right */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/85 sm:via-gray-950/70 to-gray-950/40 sm:to-transparent pointer-events-none z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/90 via-transparent to-gray-950/30 pointer-events-none z-10" />

      {/* 60fps GPU Sakura Petal Ambient Canvas across the entire screen */}
      <SakuraCanvas className="absolute inset-0 pointer-events-none z-[15]" />

      {/* Authentic Japanese Calligraphy & Hanko Seal Watermark */}
      <div
        className="absolute top-28 sm:top-32 right-6 sm:right-10 md:right-14 lg:right-16 hidden lg:flex flex-col items-center gap-3 pointer-events-none z-[15] select-none opacity-25"
        aria-hidden="true"
      >
        <span
          className="text-white font-jp text-sm tracking-[0.45em] font-light drop-shadow"
          style={{ writingMode: 'vertical-rl' }}
        >
          富士日本語学院・最高峰
        </span>
        <span className="w-6 h-6 rounded-sm border-2 border-red-500/80 bg-red-600/30 flex items-center justify-center text-[10px] text-red-200 font-bold shadow-lg">
          印
        </span>
      </div>

      {/* Slide Text Content & Responsive Interactive Typography Overlays */}
      <div className="relative z-20 w-full container mx-auto px-5 sm:px-8 md:px-20 lg:px-24 flex flex-col justify-center">
        <div className="max-w-2xl sm:max-w-3xl lg:max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="space-y-4 sm:space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs sm:text-sm font-bold text-white tracking-wider uppercase shadow-md">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-fuji-red animate-pulse" />
                <span>{currentSlide.badge}</span>
              </div>

              {/* Main Headline */}
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-[62px] font-extrabold text-white tracking-tight leading-[1.12] sm:leading-[1.1] drop-shadow-lg">
                {currentSlide.title} <br className="hidden sm:inline" />
                <span className="text-red-400 font-display italic drop-shadow-md">
                  {currentSlide.titleHighlight}
                </span>
              </h2>

              {/* Subtitle / Description - Increased font size */}
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-100 max-w-2xl lg:max-w-3xl font-medium leading-relaxed drop-shadow-md">
                {currentSlide.subtitle}
              </p>

              {/* Feature Tags - Increased font size */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1 pb-1">
                {currentSlide.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs sm:text-sm md:text-base font-semibold text-white shadow-sm hover:bg-white/25 transition-colors"
                  >
                    <CheckCircle2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-red-400 flex-shrink-0" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>

              {/* CTA Buttons - Increased font size */}
              <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 pt-2 sm:pt-3">
                <button
                  type="button"
                  onClick={handlePrimaryClick}
                  className="px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 md:py-4 rounded-full bg-gradient-to-r from-[#d90429] via-[#ef233c] to-[#d90429] bg-[length:200%_auto] hover:bg-right text-white font-bold text-sm sm:text-base md:text-lg shadow-xl shadow-red-950/50 hover:shadow-red-700/60 hover:scale-[1.03] active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 sm:gap-2.5 cursor-pointer border border-white/20"
                >
                  <span>{currentSlide.primaryText}</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  type="button"
                  onClick={handleSecondaryClick}
                  className="px-6 sm:px-8 md:px-9 py-3 sm:py-3.5 md:py-4 rounded-full bg-white/15 hover:bg-white text-white hover:text-gray-900 border-2 border-white/80 font-bold text-sm sm:text-base md:text-lg backdrop-blur-md hover:shadow-xl hover:scale-[1.03] active:scale-95 transition-all duration-200 flex items-center justify-center cursor-pointer"
                >
                  <span>{currentSlide.secondaryText}</span>
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows: Left & Right (hidden on mobile to prevent text collision; active on tablet/desktop) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prevSlide();
        }}
        aria-label="Previous Slide"
        className="hidden md:flex absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 hover:bg-white text-white hover:text-gray-900 border border-white/30 backdrop-blur-md items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-30 cursor-pointer shadow-lg"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          nextSlide();
        }}
        aria-label="Next Slide"
        className="hidden md:flex absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 rounded-full bg-black/40 hover:bg-white text-white hover:text-gray-900 border border-white/30 backdrop-blur-md items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95 z-30 cursor-pointer shadow-lg"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Prominent Bottom 4-Dot Indicator Pills */}
      <div
        className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-2.5 z-30 px-3.5 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/15"
        role="tablist"
        aria-label="Slide Selection"
      >
        {SLIDES.map((slide, index) => (
          <button
            key={slide.id}
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              goToSlide(index);
            }}
            role="tab"
            aria-selected={currentIndex === index}
            aria-label={`Jump to slide ${index + 1}: ${slide.title}`}
            className="p-1 cursor-pointer focus:outline-none group/dot"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-7 sm:w-9 h-2 sm:h-2.5 bg-fuji-red shadow-md ring-2 ring-white/50'
                  : 'w-2 sm:w-2.5 h-2 sm:h-2.5 bg-white/60 hover:bg-white group-hover/dot:scale-125'
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
