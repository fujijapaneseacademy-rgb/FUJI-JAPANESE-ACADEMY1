import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import {
  GraduationCap, Award, Users, CheckCircle2,
  ArrowRight, Maximize2, ChevronLeft, ChevronRight,
  X, Sparkles, MapPin, Globe, Stethoscope, Building2,
  HeartHandshake, BookOpen, Layers
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';

export interface PartnershipPhoto {
  id: string;
  institutionId: 't-john-nursing' | 't-john-pu' | 'vet-college';
  institutionName: string;
  title: string;
  category: string;
  tag: string;
  date: string;
  location: string;
  src: string;
  thumbnail: string;
  description: string;
  highlights: string[];
}

export interface PartnerInstitution {
  id: 't-john-nursing' | 't-john-pu' | 'vet-college';
  name: string;
  shortName: string;
  badge: string;
  collegeType: string;
  location: string;
  tagline: string;
  overview: string;
  themeColor: string;
  accentBadge: string;
  stats: {
    attendance: string;
    focus: string;
    faculty: string;
  };
  keyHighlights: string[];
}

export const PARTNER_INSTITUTIONS: PartnerInstitution[] = [
  {
    id: 't-john-nursing',
    name: 'T. John College of Nursing',
    shortName: 'T. John Nursing',
    badge: 'TJCN',
    collegeType: 'College of Nursing • Healthcare & Medical Japanese',
    location: 'Bannerghatta Road, Bengaluru',
    tagline: 'Medical & Hospital Japanese • Healthcare Caregiver (Kaigo) SSW Pathways',
    overview: 'Specialized healthcare and clinical Japanese language orientation conducted at T. John College of Nursing, Bengaluru. Introducing nursing scholars to hospital conversation ("Basic Conversation in a Japanese Hospital: Speak with Patients, Build Trust, Provide Better Care"), clinical etiquette, and high-demand career pathways in Japan under the Specified Skilled Worker (SSW - Nursing Care / Kaigo) and healthcare visa categories.',
    themeColor: 'rose',
    accentBadge: 'Medical & Hospital Japanese',
    stats: {
      attendance: '120+ Nursing Students',
      focus: 'Clinical Japanese & Hospital Dialogue',
      faculty: 'Principal & Senior Nursing Faculty'
    },
    keyHighlights: [
      'Interactive keynote: "Basic Conversation in a Japanese Hospital — Speak with Patients, Build Trust"',
      'Clinical phrases & spoken Japanese practice for patient communication and vital care checks',
      'Official leadership felicitation & memento ceremony with Nursing College Principal',
      'Guidance for ANM, GNM & B.Sc Nursing candidates on Japan SSW Nursing Care visas'
    ]
  },
  {
    id: 't-john-pu',
    name: 'T. John PU College',
    shortName: 'T. John PU College',
    badge: 'TJPU',
    collegeType: 'Pre-University College • Senior Secondary Foundation',
    location: 'Bannerghatta Road, Bengaluru',
    tagline: 'Pre-University Japanese Foundation • JLPT Levels N5-N1 & Global Studies',
    overview: 'Campus seminar and Japanese language awareness orientation held at the T. John PU College auditorium. Introducing students early to Japanese language proficiency benchmarks (JLPT N5 through N1), cultural intelligence, higher education options in Japan, and global career opportunities.',
    themeColor: 'red',
    accentBadge: 'Pre-University Foundation',
    stats: {
      attendance: '250+ PU Students',
      focus: 'JLPT Levels & Study in Japan',
      faculty: 'PU College Principal & Academic Faculty'
    },
    keyHighlights: [
      'Keynote presentation on Japanese language proficiency levels and Tokyo career horizons',
      'Interactive student assembly and Q&A session in the main auditorium',
      'Official leadership visit & academy memento presentation ceremony',
      'Early bilingual advantage guidance for engineering, commerce, and science streams'
    ]
  },
  {
    id: 'vet-college',
    name: 'V.E.T. First Grade College',
    shortName: 'V.E.T. College',
    badge: 'VET',
    collegeType: 'Undergraduate & Degree College • BCA, B.Com, BBA, B.Sc',
    location: 'J.P. Nagar, Bengaluru',
    tagline: 'Degree College Corporate Japanese • Tokyo IT & Business Placements',
    overview: 'Bilateral academic orientation and corporate Japanese placement seminar conducted for degree students at V.E.T. First Grade College, Bengaluru — outlining accredited JLPT N5/N4 curriculum integration, Tokyo software MNC placements, and bilingual business roles.',
    themeColor: 'indigo',
    accentBadge: 'Degree & Tokyo Placements',
    stats: {
      attendance: '180+ Degree Students',
      focus: 'Bilingual Tech & Tokyo MNCs',
      faculty: 'College Principal & Placement Officers'
    },
    keyHighlights: [
      'Undergraduate career seminar on Tokyo corporate hiring for BCA, B.Com & BBA graduates',
      'Interactive session on credit-aligned JLPT N5 & N4 curriculum integration',
      'Faculty delegation meeting and bilateral placement cell collaboration',
      'Workshop on Japanese corporate etiquette (Hō-Ren-Sō) and Rirekisho resume standards'
    ]
  }
];

export const ALL_PARTNERSHIP_PHOTOS: PartnershipPhoto[] = [
  // ==================== T. JOHN COLLEGE OF NURSING ====================
  {
    id: 'tjcn-student-speaking',
    institutionId: 't-john-nursing',
    institutionName: 'T. John College of Nursing',
    title: 'Live Clinical Japanese Practice: Hospital Dialogue at the Podium',
    category: 'Medical Japanese Seminar',
    tag: 'Hospital Japanese',
    date: 'Academic Year 2026',
    location: 'T. John College of Nursing Podium, Bengaluru',
    src: '/images/partnerships/t-john-nursing-college/t-john-nursing-student-speaking.jpg',
    thumbnail: '/images/partnerships/t-john-nursing-college/t-john-nursing-student-speaking.jpg',
    description: 'Executive Director S. Shilpa conducting interactive spoken Japanese dialogue with a nursing student at the official T. John College of Nursing podium, presenting "Basic Conversation in a Japanese Hospital: Useful Phrases for Nursing Students".',
    highlights: ['Hospital Japanese Phrases', 'Live Spoken Dialogue', 'Clinical Etiquette Practice']
  },
  {
    id: 'tjcn-student-hall',
    institutionId: 't-john-nursing',
    institutionName: 'T. John College of Nursing',
    title: 'Grand Orientation Assembly of Nursing Students',
    category: 'Student Assembly',
    tag: 'Lecture Hall',
    date: 'Academic Year 2026',
    location: 'Main Lecture Hall, T. John College of Nursing, Bengaluru',
    src: '/images/partnerships/t-john-nursing-college/t-john-nursing-student-hall.jpg',
    thumbnail: '/images/partnerships/t-john-nursing-college/t-john-nursing-student-hall.jpg',
    description: 'Full lecture hall of nursing and healthcare candidates at T. John College of Nursing attending the comprehensive seminar on Japan healthcare careers, SSW (Specified Skilled Worker - Nursing Care / Kaigo) visas, and medical Japanese.',
    highlights: ['Full Lecture Hall', 'SSW Nursing Care Pathways', 'Medical Japanese Training']
  },
  {
    id: 'tjcn-faculty-delegation',
    institutionId: 't-john-nursing',
    institutionName: 'T. John College of Nursing',
    title: 'Faculty & Leadership Delegation with Official Academy Brochures',
    category: 'Faculty Delegation',
    tag: 'Faculty & Leaders',
    date: 'Academic Year 2026',
    location: 'T. John College of Nursing, Bengaluru',
    src: '/images/partnerships/t-john-nursing-college/t-john-nursing-faculty-delegation.jpg',
    thumbnail: '/images/partnerships/t-john-nursing-college/t-john-nursing-faculty-delegation.jpg',
    description: 'T. John College of Nursing faculty member wearing official college lanyard alongside Fuji Japanese Academy Managing Director Nagendra M & Executive Director S. Shilpa and enthusiastic nursing scholars displaying official study brochures.',
    highlights: ['Faculty Collaboration', 'Curriculum Materials', 'Official College Lanyard']
  },
  {
    id: 'tjcn-student-cohort',
    institutionId: 't-john-nursing',
    institutionName: 'T. John College of Nursing',
    title: 'Nursing Student Cohort & Leadership Delegation',
    category: 'Student Delegation',
    tag: 'Nursing Cohort',
    date: 'Academic Year 2026',
    location: 'T. John College of Nursing, Bengaluru',
    src: '/images/partnerships/t-john-nursing-college/t-john-nursing-student-cohort.jpg',
    thumbnail: '/images/partnerships/t-john-nursing-college/t-john-nursing-student-cohort.jpg',
    description: 'Nursing students assembled with Fuji Japanese Academy leadership team (Managing Director Nagendra M & Executive Director S. Shilpa) holding Japanese academy prospectus and career guidance materials.',
    highlights: ['Nursing Cohort', 'Bilingual Healthcare Opportunity', 'Japan Career Awareness']
  },
  {
    id: 'tjcn-assembly-group',
    institutionId: 't-john-nursing',
    institutionName: 'T. John College of Nursing',
    title: 'Comprehensive Nursing Student Assembly & Celebration',
    category: 'Campus Orientation',
    tag: 'Campus Assembly',
    date: 'Academic Year 2026',
    location: 'T. John College of Nursing, Bengaluru',
    src: '/images/partnerships/t-john-nursing-college/t-john-nursing-assembly-group.jpg',
    thumbnail: '/images/partnerships/t-john-nursing-college/t-john-nursing-assembly-group.jpg',
    description: 'Commemorative full-hall group capture celebrating the on-campus collaboration between T. John College of Nursing and Fuji Japanese Academy for specialized healthcare language training.',
    highlights: ['Full Assembly', 'Bilateral Celebration', 'Global Healthcare Placements']
  },

  // ==================== T. JOHN PU COLLEGE ====================
  {
    id: 'tjpu-memento-ceremony',
    institutionId: 't-john-pu',
    institutionName: 'T. John PU College',
    title: 'Academy Leadership Felicitation Ceremony',
    category: 'Felicitation Ceremony',
    tag: 'Memento Presentation',
    date: 'Academic Year 2026',
    location: 'T. John PU College, Bengaluru',
    src: '/images/partnerships/t-john-college/t-john-college-mou-memento-ceremony.jpg',
    thumbnail: '/images/partnerships/t-john-college/t-john-college-mou-memento-ceremony.jpg',
    description: 'Fuji Japanese Academy Managing Director Nagendra M and Executive Director S. Shilpa presenting the commemorative academy memento and bouquet to T. John PU College leadership.',
    highlights: ['Campus Leadership Meeting', 'Official Memento Presentation', 'Educational Orientation']
  },
  {
    id: 'tjpu-career-seminar',
    institutionId: 't-john-pu',
    institutionName: 'T. John PU College',
    title: 'Keynote Seminar: Japanese Language & Career Scope',
    category: 'Career Seminar',
    tag: 'Auditorium Seminar',
    date: 'Academic Year 2026',
    location: 'TJGI Auditorium, T. John PU College, Bengaluru',
    src: '/images/partnerships/t-john-college/t-john-college-japanese-career-seminar.jpg',
    thumbnail: '/images/partnerships/t-john-college/t-john-college-japanese-career-seminar.jpg',
    description: 'Executive Director S. Shilpa addressing students on Japanese Language levels (N5 to N1), cultural nuances, and career opportunities in Japan from the T. John podium.',
    highlights: ['JLPT Levels Overview', 'Japan Career Awareness', 'Student Career Guidance']
  },
  {
    id: 'tjpu-auditorium-hall',
    institutionId: 't-john-pu',
    institutionName: 'T. John PU College',
    title: 'Student Assembly at T. John PU College Auditorium',
    category: 'Student Assembly',
    tag: 'Orientation Session',
    date: 'Academic Year 2026',
    location: 'Main Auditorium, T. John PU College, Bengaluru',
    src: '/images/partnerships/t-john-college/t-john-college-auditorium-hall.jpg',
    thumbnail: '/images/partnerships/t-john-college/t-john-college-auditorium-hall.jpg',
    description: 'Students of T. John PU College assembled in the main auditorium for the Japanese language awareness and career orientation session.',
    highlights: ['Auditorium Orientation', 'Language Awareness', 'Global Horizons']
  },
  {
    id: 'tjpu-interactive-session',
    institutionId: 't-john-pu',
    institutionName: 'T. John PU College',
    title: 'Interactive Student Q&A & Language Orientation',
    category: 'Interactive Practice',
    tag: 'Student Engagement',
    date: 'Academic Year 2026',
    location: 'Auditorium, T. John PU College, Bengaluru',
    src: '/images/partnerships/t-john-college/t-john-college-students-session.jpg',
    thumbnail: '/images/partnerships/t-john-college/t-john-college-students-session.jpg',
    description: 'Enthusiastic PU college students participating in the interactive session on learning Japanese, cultural etiquette, and global study avenues.',
    highlights: ['Active Student Participation', 'Language Insights', 'Higher Education Guidance']
  },
  {
    id: 'tjpu-student-cohort',
    institutionId: 't-john-pu',
    institutionName: 'T. John PU College',
    title: 'T. John PU College Student Delegation',
    category: 'Student Assembly',
    tag: 'Student Cohort',
    date: 'Academic Year 2026',
    location: 'T. John PU College, Bengaluru',
    src: '/images/partnerships/t-john-college/t-john-college-student-cohort.jpg',
    thumbnail: '/images/partnerships/t-john-college/t-john-college-student-cohort.jpg',
    description: 'Students of T. John PU College attending the informative briefing on the advantages of learning Japanese early for higher studies and global careers.',
    highlights: ['Early Language Learning', 'Youth Motivation', 'Global Opportunities']
  },
  {
    id: 'tjpu-mou-signing',
    institutionId: 't-john-pu',
    institutionName: 'T. John PU College',
    title: 'Institutional Collaboration Discussion & Memento Exchange',
    category: 'Felicitation Ceremony',
    tag: 'Institutional Tie-up',
    date: 'Academic Year 2026',
    location: 'T. John PU College, Bengaluru',
    src: '/images/partnerships/t-john-college/t-john-college-mou-signing.jpg',
    thumbnail: '/images/partnerships/t-john-college/t-john-college-mou-signing.jpg',
    description: 'Fuji Japanese Academy leadership engaging with T. John PU College officials on institutional partnership and student enrollment pathways.',
    highlights: ['Institutional Meeting', 'Academic Collaboration', 'Campus Visit']
  },
  {
    id: 'tjpu-seminar-presentation',
    institutionId: 't-john-pu',
    institutionName: 'T. John PU College',
    title: 'Keynote Visual Presentation & JLPT Progression Roadmap',
    category: 'Career Seminar',
    tag: 'Curriculum Roadmap',
    date: 'Academic Year 2026',
    location: 'TJGI Auditorium, T. John PU College, Bengaluru',
    src: '/images/partnerships/t-john-college/t-john-college-seminar-presentation.jpg',
    thumbnail: '/images/partnerships/t-john-college/t-john-college-seminar-presentation.jpg',
    description: 'Executive Director S. Shilpa presenting the structured JLPT N5 through N1 milestone path and international placement advantages for PU students.',
    highlights: ['JLPT Roadmap', 'Visual Presentation', 'Student Career Strategy']
  },
  {
    id: 'tjpu-mega-orientation',
    institutionId: 't-john-pu',
    institutionName: 'T. John PU College',
    title: 'Grand Auditorium Orientation Session',
    category: 'Student Assembly',
    tag: 'Mega Orientation',
    date: 'Academic Year 2026',
    location: 'Main Auditorium, T. John PU College, Bengaluru',
    src: '/images/partnerships/t-john-college/t-john-college-mega-orientation.jpg',
    thumbnail: '/images/partnerships/t-john-college/t-john-college-mega-orientation.jpg',
    description: 'Panoramic view of the packed T. John PU College auditorium attending the Japanese language awareness seminar.',
    highlights: ['Auditorium Panorama', 'Enthusiastic Learners', 'Campus Scale']
  },
  {
    id: 'tjpu-student-delegation',
    institutionId: 't-john-pu',
    institutionName: 'T. John PU College',
    title: 'Student Delegation Interactive Discussion',
    category: 'Interactive Practice',
    tag: 'Student Dialogue',
    date: 'Academic Year 2026',
    location: 'T. John PU College, Bengaluru',
    src: '/images/partnerships/t-john-college/t-john-college-student-delegation.jpg',
    thumbnail: '/images/partnerships/t-john-college/t-john-college-student-delegation.jpg',
    description: 'Pre-university students engaging directly with academy instructors regarding Japan student exchange opportunities and language learning timelines.',
    highlights: ['Direct Mentorship', 'Student Queries', 'Career Clarity']
  },

  // ==================== V.E.T. FIRST GRADE COLLEGE ====================
  {
    id: 'vet-career-seminar',
    institutionId: 'vet-college',
    institutionName: 'V.E.T. First Grade College',
    title: 'Undergraduate Career Seminar & Corporate Japanese Scope',
    category: 'Career Seminar',
    tag: 'Degree Seminar',
    date: 'Academic Year 2026',
    location: 'Auditorium, V.E.T. First Grade College, Bengaluru',
    src: '/images/partnerships/vet-college/vet-college-japanese-career-seminar.jpg',
    thumbnail: '/images/partnerships/vet-college/vet-college-japanese-career-seminar.jpg',
    description: 'Fuji Japanese Academy leadership delivering the keynote seminar on Tokyo IT placements and bilingual careers for BCA, B.Com, and BBA students.',
    highlights: ['Degree Placement Scope', 'Tokyo MNC Careers', 'Bilingual IT Advantage']
  },
  {
    id: 'vet-faculty-delegation',
    institutionId: 'vet-college',
    institutionName: 'V.E.T. First Grade College',
    title: 'College Leadership & Faculty Delegation Meeting',
    category: 'Faculty Delegation',
    tag: 'Faculty Tie-up',
    date: 'Academic Year 2026',
    location: 'V.E.T. First Grade College, Bengaluru',
    src: '/images/partnerships/vet-college/vet-college-faculty-delegation.jpg',
    thumbnail: '/images/partnerships/vet-college/vet-college-faculty-delegation.jpg',
    description: 'Fuji Japanese Academy leadership meeting with the Principal and department heads of V.E.T. First Grade College to discuss campus placement integration.',
    highlights: ['Principal Consultation', 'Department Heads Meeting', 'Institutional Placement Cell']
  },
  {
    id: 'vet-auditorium-hall',
    institutionId: 'vet-college',
    institutionName: 'V.E.T. First Grade College',
    title: 'Degree Student Auditorium Assembly',
    category: 'Student Assembly',
    tag: 'Auditorium Assembly',
    date: 'Academic Year 2026',
    location: 'Main Auditorium, V.E.T. First Grade College, Bengaluru',
    src: '/images/partnerships/vet-college/vet-college-auditorium-hall.jpg',
    thumbnail: '/images/partnerships/vet-college/vet-college-auditorium-hall.jpg',
    description: 'Undergraduate students of V.E.T. First Grade College assembled in large numbers for the Japanese career and language orientation.',
    highlights: ['Auditorium Gathering', 'Undergraduate Cohort', 'Bilingual Opportunities']
  },
  {
    id: 'vet-students-session',
    institutionId: 'vet-college',
    institutionName: 'V.E.T. First Grade College',
    title: 'Interactive Q&A Session with Degree Students',
    category: 'Interactive Practice',
    tag: 'Student Engagement',
    date: 'Academic Year 2026',
    location: 'Auditorium, V.E.T. First Grade College, Bengaluru',
    src: '/images/partnerships/vet-college/vet-college-students-session.jpg',
    thumbnail: '/images/partnerships/vet-college/vet-college-students-session.jpg',
    description: 'Degree students asking questions about JLPT N4/N3 requirements for IT engineering roles, visa sponsorships, and life in Tokyo.',
    highlights: ['Student Questions', 'Visa Insights', 'Career Direction']
  },
  {
    id: 'vet-student-cohort',
    institutionId: 'vet-college',
    institutionName: 'V.E.T. First Grade College',
    title: 'V.E.T. First Grade College Student Cohort',
    category: 'Student Assembly',
    tag: 'Student Cohort',
    date: 'Academic Year 2026',
    location: 'V.E.T. First Grade College, Bengaluru',
    src: '/images/partnerships/vet-college/vet-college-student-cohort.jpg',
    thumbnail: '/images/partnerships/vet-college/vet-college-student-cohort.jpg',
    description: 'Focused student participants learning about Japan corporate culture, Hō-Ren-Sō reporting methodology, and interview preparation.',
    highlights: ['Corporate Culture', 'Hō-Ren-Sō Etiquette', 'Bilingual Hiring']
  }
];

// Backward compatibility export
export const T_JOHN_PHOTOS = ALL_PARTNERSHIP_PHOTOS.filter(p => p.institutionId === 't-john-pu');

interface CampusPartnershipShowcaseProps {
  variant?: 'featured' | 'compact' | 'full';
  showHeading?: boolean;
  onOpenEnrollment?: () => void;
  defaultCampusId?: 't-john-nursing' | 't-john-pu' | 'vet-college' | 'all';
}

export const CampusPartnershipShowcase: React.FC<CampusPartnershipShowcaseProps> = ({
  variant = 'featured',
  showHeading = true,
  onOpenEnrollment,
  defaultCampusId = 't-john-nursing'
}) => {
  const [selectedCampusId, setSelectedCampusId] = useState<'t-john-nursing' | 't-john-pu' | 'vet-college' | 'all'>(defaultCampusId);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  // Active institution data if a specific one is selected
  const activeInstitution = useMemo(() => {
    if (selectedCampusId === 'all') return null;
    return PARTNER_INSTITUTIONS.find(i => i.id === selectedCampusId) || PARTNER_INSTITUTIONS[0];
  }, [selectedCampusId]);

  // Photos filtered by selected campus
  const campusPhotos = useMemo(() => {
    if (selectedCampusId === 'all') {
      return ALL_PARTNERSHIP_PHOTOS;
    }
    return ALL_PARTNERSHIP_PHOTOS.filter(p => p.institutionId === selectedCampusId);
  }, [selectedCampusId]);

  // Further filtered by category tab
  const displayedPhotos = useMemo(() => {
    if (activeCategory === 'all') {
      return campusPhotos;
    }
    return campusPhotos.filter(p => p.category === activeCategory);
  }, [campusPhotos, activeCategory]);

  // Selected photo safely clamped to valid range
  const selectedPhoto = useMemo(() => {
    if (displayedPhotos.length === 0) {
      return campusPhotos[0] || ALL_PARTNERSHIP_PHOTOS[0];
    }
    return displayedPhotos[selectedIndex] || displayedPhotos[0];
  }, [displayedPhotos, selectedIndex, campusPhotos]);

  // Reset index when campus or category changes
  const handleCampusChange = (campusId: 't-john-nursing' | 't-john-pu' | 'vet-college' | 'all') => {
    setSelectedCampusId(campusId);
    setActiveCategory('all');
    setSelectedIndex(0);
  };

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setSelectedIndex(0);
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const nextPhoto = useCallback(() => {
    setSelectedIndex((prev) => (prev + 1) % displayedPhotos.length);
  }, [displayedPhotos.length]);

  const prevPhoto = useCallback(() => {
    setSelectedIndex((prev) => (prev - 1 + displayedPhotos.length) % displayedPhotos.length);
  }, [displayedPhotos.length]);

  // Unique categories for the active campus
  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    campusPhotos.forEach(p => cats.add(p.category));
    return Array.from(cats);
  }, [campusPhotos]);

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, nextPhoto, prevPhoto]);

  // Dynamic institution icon helper
  const getInstitutionIcon = (id?: string) => {
    switch (id) {
      case 't-john-nursing':
        return <Stethoscope className="w-5 h-5" />;
      case 't-john-pu':
        return <GraduationCap className="w-5 h-5" />;
      case 'vet-college':
        return <Building2 className="w-5 h-5" />;
      default:
        return <Globe className="w-5 h-5" />;
    }
  };

  return (
    <div className="w-full">
      {/* Section Header */}
      {showHeading && (
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-600/10 text-red-600 text-xs font-bold uppercase tracking-wider mb-3.5 border border-red-600/20">
            <GraduationCap className="w-4 h-4 text-red-600" />
            <span>Campus Orientation &amp; Institutional MoUs</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 font-display tracking-tight leading-tight mb-4">
            {selectedCampusId === 't-john-nursing' ? (
              <>
                Japanese Hospital &amp; Medical Language Seminar at <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-red-600 to-rose-700">
                  T. John College of Nursing
                </span>
              </>
            ) : selectedCampusId === 't-john-pu' ? (
              <>
                Japanese Language Orientation &amp; Seminar at <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-rose-700">
                  T. John PU College
                </span>
              </>
            ) : selectedCampusId === 'vet-college' ? (
              <>
                Bilingual Placements &amp; Japanese Seminar at <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-700">
                  V.E.T. First Grade College
                </span>
              </>
            ) : (
              <>
                Bilateral Campus Seminars &amp; <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-rose-600 to-indigo-600">
                  College Institutional Orientations
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 font-light max-w-3xl mx-auto leading-relaxed">
            {selectedCampusId === 't-john-nursing' ? (
              <>
                Highlights from our clinical Japanese language seminar conducted at <strong>T. John College of Nursing, Bengaluru</strong> — featuring hospital communication ("Basic Conversation in a Japanese Hospital"), patient-care ethics, and Japan&apos;s Specified Skilled Worker (SSW - Nursing Care / Kaigo) opportunities.
              </>
            ) : selectedCampusId === 't-john-pu' ? (
              <>
                Highlights from our on-campus Japanese language awareness and career orientation seminar conducted at <strong>T. John PU College, Bengaluru</strong> — introducing pre-university students to JLPT proficiency levels, cultural etiquette, and global study options.
              </>
            ) : selectedCampusId === 'vet-college' ? (
              <>
                Highlights from our campus orientation at <strong>V.E.T. First Grade College, Bengaluru</strong> — outlining corporate Japanese language pathways, accredited JLPT integration, and direct Tokyo placement cell pipelines.
              </>
            ) : (
              <>
                Real photographic evidence of on-campus seminars, student assemblies, and leadership felicitations conducted by Fuji Japanese Academy across premier colleges in Bengaluru.
              </>
            )}
          </p>

          {/* Quick Stats Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-4 mt-6 pt-4 border-t border-slate-200/70 text-xs sm:text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              <Users className="w-3.5 h-3.5 text-red-600" />
              <span>550+ Students Oriented Across Campuses</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              <Stethoscope className="w-3.5 h-3.5 text-rose-600" />
              <span>Medical &amp; Nursing Japanese Modules</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              <span>Official Leadership Felicitations</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 border border-slate-200">
              <MapPin className="w-3.5 h-3.5 text-blue-600" />
              <span>Bengaluru Campuses</span>
            </span>
          </div>
        </div>
      )}

      {/* Main Interactive Showcase Container */}
      <div className="bg-white rounded-3xl sm:rounded-[2.5rem] border border-slate-200/90 shadow-xl overflow-hidden p-4 sm:p-6 md:p-8">
        
        {/* ==================================================================== */}
        {/* 1. PRIMARY CAMPUS SELECTOR TAB BAR                                   */}
        {/* ==================================================================== */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-red-600" />
              Select Partner Institution:
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline-flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live Campus Partnerships
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* T. John College of Nursing */}
            <button
              type="button"
              onClick={() => handleCampusChange('t-john-nursing')}
              className={cn(
                "p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer relative overflow-hidden group flex items-start gap-3",
                selectedCampusId === 't-john-nursing'
                  ? "bg-rose-50/80 border-rose-500 text-slate-900 shadow-md ring-2 ring-rose-500/20"
                  : "bg-slate-50 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300 text-slate-700"
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-sm transition-colors",
                selectedCampusId === 't-john-nursing'
                  ? "bg-rose-600 text-white"
                  : "bg-rose-100 text-rose-700 group-hover:bg-rose-600 group-hover:text-white"
              )}>
                <Stethoscope className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-bold truncate">T. John Nursing</h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-rose-600 text-white flex-shrink-0">
                    5 Photos
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  Medical &amp; Hospital Japanese
                </p>
              </div>
            </button>

            {/* T. John PU College */}
            <button
              type="button"
              onClick={() => handleCampusChange('t-john-pu')}
              className={cn(
                "p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer relative overflow-hidden group flex items-start gap-3",
                selectedCampusId === 't-john-pu'
                  ? "bg-red-50/80 border-red-500 text-slate-900 shadow-md ring-2 ring-red-500/20"
                  : "bg-slate-50 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300 text-slate-700"
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-sm transition-colors",
                selectedCampusId === 't-john-pu'
                  ? "bg-red-600 text-white"
                  : "bg-red-100 text-red-700 group-hover:bg-red-600 group-hover:text-white"
              )}>
                <GraduationCap className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-bold truncate">T. John PU College</h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-red-600 text-white flex-shrink-0">
                    9 Photos
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  Pre-University Japanese Foundation
                </p>
              </div>
            </button>

            {/* V.E.T. First Grade College */}
            <button
              type="button"
              onClick={() => handleCampusChange('vet-college')}
              className={cn(
                "p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer relative overflow-hidden group flex items-start gap-3",
                selectedCampusId === 'vet-college'
                  ? "bg-indigo-50/80 border-indigo-500 text-slate-900 shadow-md ring-2 ring-indigo-500/20"
                  : "bg-slate-50 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300 text-slate-700"
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-sm transition-colors",
                selectedCampusId === 'vet-college'
                  ? "bg-indigo-600 text-white"
                  : "bg-indigo-100 text-indigo-700 group-hover:bg-indigo-600 group-hover:text-white"
              )}>
                <Building2 className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-bold truncate">V.E.T. College</h4>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-600 text-white flex-shrink-0">
                    5 Photos
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                  Degree &amp; Tokyo IT Placements
                </p>
              </div>
            </button>

            {/* All Campuses Combined */}
            <button
              type="button"
              onClick={() => handleCampusChange('all')}
              className={cn(
                "p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer relative overflow-hidden group flex items-start gap-3",
                selectedCampusId === 'all'
                  ? "bg-slate-900 border-slate-900 text-white shadow-md ring-2 ring-slate-900/20"
                  : "bg-slate-50 border-slate-200/80 hover:bg-slate-100 hover:border-slate-300 text-slate-700"
              )}
            >
              <div className={cn(
                "w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-xs shadow-sm transition-colors",
                selectedCampusId === 'all'
                  ? "bg-red-600 text-white"
                  : "bg-slate-200 text-slate-700 group-hover:bg-slate-900 group-hover:text-white"
              )}>
                <Layers className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <h4 className="text-xs sm:text-sm font-bold truncate">All Campuses</h4>
                  <span className={cn(
                    "text-[10px] font-bold px-1.5 py-0.5 rounded-md flex-shrink-0",
                    selectedCampusId === 'all' ? "bg-red-600 text-white" : "bg-slate-200 text-slate-700"
                  )}>
                    {ALL_PARTNERSHIP_PHOTOS.length} Photos
                  </span>
                </div>
                <p className={cn(
                  "text-[11px] line-clamp-1 mt-0.5",
                  selectedCampusId === 'all' ? "text-slate-300" : "text-slate-500"
                )}>
                  Consolidated Partnership Gallery
                </p>
              </div>
            </button>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 2. CATEGORY FILTER CHIPS FOR SELECTED CAMPUS                         */}
        {/* ==================================================================== */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-6 pb-4 border-b border-slate-100">
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => handleCategoryChange('all')}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer",
                activeCategory === 'all'
                  ? "bg-red-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              )}
            >
              All in View ({campusPhotos.length})
            </button>
            {availableCategories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer inline-flex items-center gap-1",
                  activeCategory === cat
                    ? "bg-red-600 text-white shadow-sm"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                )}
              >
                <span>{cat}</span>
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-500 font-medium ml-auto flex items-center gap-2">
            <span className="hidden sm:inline">Active view:</span>
            <span className="font-bold text-slate-800">
              {selectedCampusId === 't-john-nursing'
                ? 'T. John College of Nursing'
                : selectedCampusId === 't-john-pu'
                ? 'T. John PU College'
                : selectedCampusId === 'vet-college'
                ? 'V.E.T. First Grade College'
                : 'All Partner Institutions'}
            </span>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 3. FEATURED SHOWCASE: LARGE PREVIEW STAGE + INSTITUTION CONTEXT CARD */}
        {/* ==================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mb-8">
          
          {/* Main Large Stage (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col">
            <div className="relative group rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-lg aspect-[16/10] sm:aspect-[16/9] flex items-center justify-center">
              {selectedPhoto && (
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="eager"
                />
              )}

              {/* Top Gradient Badge Overlay */}
              <div className="absolute top-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-b from-black/85 via-black/45 to-transparent flex items-center justify-between pointer-events-none">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-[11px] font-bold uppercase tracking-wider backdrop-blur-md shadow-sm">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{selectedPhoto?.tag}</span>
                </div>

                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 text-slate-200 text-xs font-medium backdrop-blur-md border border-white/10">
                  <MapPin className="w-3.5 h-3.5 text-red-400" />
                  <span className="truncate max-w-[200px] sm:max-w-none">{selectedPhoto?.location}</span>
                </div>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-6 bg-gradient-to-t from-black/95 via-black/80 to-transparent text-white">
                <div className="flex items-end justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-bold text-red-400 uppercase tracking-wider block mb-1">
                      {selectedPhoto?.institutionName} &bull; {selectedPhoto?.category}
                    </span>
                    <h3 className="text-base sm:text-xl md:text-2xl font-bold font-display text-white drop-shadow-sm leading-snug">
                      {selectedPhoto?.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-light mt-1.5 line-clamp-2 max-w-2xl leading-relaxed">
                      {selectedPhoto?.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => openLightbox(selectedIndex)}
                    aria-label="Enlarge photo in full screen"
                    className="flex-shrink-0 px-3.5 py-2.5 rounded-xl bg-white/20 hover:bg-red-600 text-white text-xs font-bold backdrop-blur-md border border-white/20 transition-all flex items-center gap-1.5 shadow-lg active:scale-95 cursor-pointer"
                  >
                    <Maximize2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Enlarge</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Filmstrip & Institution Context Card (4 Cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-4">
            
            {/* Institution Profile Summary Card */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
              <div className="flex items-center gap-3 mb-3">
                <div className={cn(
                  "w-11 h-11 rounded-xl text-white flex items-center justify-center font-bold font-display text-base shadow-sm flex-shrink-0",
                  selectedCampusId === 't-john-nursing'
                    ? "bg-rose-600"
                    : selectedCampusId === 't-john-pu'
                    ? "bg-red-600"
                    : selectedCampusId === 'vet-college'
                    ? "bg-indigo-600"
                    : "bg-slate-900"
                )}>
                  {activeInstitution ? activeInstitution.badge : 'FJA'}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 leading-tight truncate">
                    {activeInstitution ? activeInstitution.name : 'Institutional MoUs'}
                  </h4>
                  <p className="text-xs text-slate-500 truncate">
                    {activeInstitution ? activeInstitution.collegeType : 'Premier College Collaborations'}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 font-light leading-relaxed mb-3">
                {activeInstitution
                  ? activeInstitution.overview
                  : 'Fuji Japanese Academy conducts customized on-campus seminars, student assemblies, and leadership orientations across engineering, degree, and nursing institutions.'}
              </p>

              {/* Institution Specific Quick Stats */}
              {activeInstitution && (
                <div className="grid grid-cols-2 gap-2 mb-3 pt-2 border-t border-slate-200/60 text-center">
                  <div className="p-2 rounded-xl bg-white border border-slate-200/60">
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">Attendance</span>
                    <span className="text-xs font-bold text-slate-800">{activeInstitution.stats.attendance}</span>
                  </div>
                  <div className="p-2 rounded-xl bg-white border border-slate-200/60">
                    <span className="text-[10px] font-semibold text-slate-400 block uppercase">Focus</span>
                    <span className="text-xs font-bold text-slate-800 line-clamp-1">{activeInstitution.stats.focus}</span>
                  </div>
                </div>
              )}

              {/* Key Highlights Bullets */}
              <div className="space-y-1.5 text-xs text-slate-700">
                {(activeInstitution ? activeInstitution.keyHighlights : [
                  'Hospital & clinical Japanese modules for nursing colleges',
                  'Accredited JLPT N5/N4 credit courses for engineering & degree colleges',
                  'Official memento felicitation ceremonies & faculty tie-ups'
                ]).map((hl, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span className="leading-snug">{hl}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Thumbnail Selectors (Click to view) */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                  Select Photo to View:
                </span>
                <span className="text-[11px] text-slate-400">
                  {selectedIndex + 1} of {displayedPhotos.length}
                </span>
              </div>

              <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
                {displayedPhotos.slice(0, 10).map((photo, idx) => {
                  const isCurrent = selectedIndex === idx;
                  return (
                    <button
                      key={photo.id}
                      type="button"
                      onClick={() => setSelectedIndex(idx)}
                      className={cn(
                        "relative rounded-xl overflow-hidden aspect-[4/3] border-2 transition-all text-left group cursor-pointer",
                        isCurrent
                          ? "border-red-600 ring-2 ring-red-600/30 scale-[1.02]"
                          : "border-transparent opacity-75 hover:opacity-100 hover:border-slate-300"
                      )}
                    >
                      <img
                        src={photo.thumbnail}
                        alt={photo.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-1 flex flex-col justify-end text-white">
                        <span className="text-[8px] sm:text-[9px] font-bold leading-tight line-clamp-1">
                          {photo.tag}
                        </span>
                      </div>
                      {isCurrent && (
                        <div className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ==================================================================== */}
        {/* 4. MULTI-CARD GALLERY GRID                                           */}
        {/* ==================================================================== */}
        <div className="pt-6 border-t border-slate-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-600" />
              <span>Campus Gallery &bull; {selectedCampusId === 'all' ? 'All Partner Institutions' : activeInstitution?.name}</span>
            </h4>
            <span className="text-xs text-slate-500">
              Showing {displayedPhotos.length} photographic highlights (click to enlarge)
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
            {displayedPhotos.map((photo, idx) => {
              return (
                <div
                  key={photo.id}
                  onClick={() => openLightbox(idx)}
                  className="group relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-slate-800">
                    <img
                      src={photo.src}
                      alt={photo.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-slate-950/20 group-hover:bg-slate-950/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                      <span className="p-2.5 rounded-full bg-white/90 text-slate-900 shadow-lg transform -translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                        <Maximize2 className="w-4 h-4" />
                      </span>
                    </div>

                    <div className="absolute top-2 left-2 flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded-md bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider shadow">
                        {photo.tag}
                      </span>
                    </div>

                    {/* Institution Pill on All View */}
                    {selectedCampusId === 'all' && (
                      <div className="absolute bottom-2 left-2">
                        <span className="px-2 py-0.5 rounded-md bg-black/75 backdrop-blur-md text-white text-[9px] font-medium border border-white/20">
                          {photo.institutionName}
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-3.5 bg-white flex-1 flex flex-col justify-between border-t border-slate-100">
                    <div>
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                        {photo.category}
                      </span>
                      <h5 className="text-xs font-bold text-slate-900 line-clamp-1 group-hover:text-red-600 transition-colors mt-0.5">
                        {photo.title}
                      </h5>
                    </div>
                    <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="flex items-center gap-1 truncate max-w-[130px]">
                        <MapPin className="w-3 h-3 text-red-500 flex-shrink-0" /> Bengaluru
                      </span>
                      <span className="text-red-600 font-bold group-hover:underline flex items-center gap-0.5 flex-shrink-0">
                        Expand →
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ==================================================================== */}
        {/* 5. ACTION CALLOUT BAR                                                */}
        {/* ==================================================================== */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-slate-900 via-[#191539] to-slate-900 text-white p-5 sm:p-7 rounded-2xl">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-red-400 uppercase tracking-widest mb-1">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Campus Seminars &bull; College MoUs &bull; Placements</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-white leading-snug">
              Looking to conduct a Japanese career orientation at your institution?
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 font-light mt-1 max-w-2xl">
              From Nursing &amp; Healthcare colleges to Engineering, BCA, and PU campuses — invite Fuji Japanese Academy for interactive seminars, student workshops, and Japanese placement cell setup.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 flex-shrink-0 w-full sm:w-auto">
            <NavLink
              to="/college-partnerships#mou-form"
              className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md shadow-red-600/30 transition-all flex items-center justify-center gap-2 active:scale-95 w-full sm:w-auto text-center"
            >
              <span>Invite Us to Your Campus</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </NavLink>

            {onOpenEnrollment && (
              <button
                type="button"
                onClick={onOpenEnrollment}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all flex items-center justify-center gap-2 active:scale-95 w-full sm:w-auto cursor-pointer"
              >
                <span>Student Admissions</span>
              </button>
            )}
          </div>
        </div>

      </div>

      {/* ==================================================================== */}
      {/* 6. FULLSCREEN LIGHTBOX MODAL                                         */}
      {/* ==================================================================== */}
      <AnimatePresence>
        {lightboxOpen && selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
            onClick={() => setLightboxOpen(false)}
          >
            {/* Top Bar */}
            <div
              className="flex items-center justify-between text-white max-w-6xl mx-auto w-full z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2.5">
                <span className="px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold">
                  {selectedPhoto.tag}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/15 text-slate-200 text-xs font-medium hidden sm:inline">
                  {selectedPhoto.institutionName}
                </span>
                <span className="text-xs text-slate-400 hidden sm:inline">
                  Photo {selectedIndex + 1} of {displayedPhotos.length}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setLightboxOpen(false)}
                  aria-label="Close photo preview"
                  className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Central Photo View with Prev/Next Controls */}
            <div
              className="relative flex-1 flex items-center justify-center my-4 max-w-6xl mx-auto w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={prevPhoto}
                aria-label="Previous photo"
                className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/50 hover:bg-red-600 text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              <motion.div
                key={selectedPhoto.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.2 }}
                className="relative max-h-[75vh] w-auto max-w-full rounded-2xl overflow-hidden shadow-2xl flex items-center justify-center bg-black"
              >
                <img
                  src={selectedPhoto.src}
                  alt={selectedPhoto.title}
                  className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl select-none"
                />
              </motion.div>

              <button
                type="button"
                onClick={nextPhoto}
                aria-label="Next photo"
                className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/50 hover:bg-red-600 text-white backdrop-blur-md border border-white/10 transition-all cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption & Filmstrip */}
            <div
              className="max-w-4xl mx-auto w-full text-center text-white space-y-3 z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <div>
                <span className="text-xs text-red-400 font-bold uppercase tracking-wider block mb-0.5">
                  {selectedPhoto.institutionName} &bull; {selectedPhoto.category}
                </span>
                <h4 className="text-base sm:text-xl font-bold font-display text-white">
                  {selectedPhoto.title}
                </h4>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-1 max-w-2xl mx-auto leading-relaxed">
                  {selectedPhoto.description}
                </p>
                <p className="text-[11px] text-slate-400 mt-1 flex items-center justify-center gap-1">
                  <MapPin className="w-3 h-3 text-red-500" /> {selectedPhoto.location} &bull; {selectedPhoto.date}
                </p>
              </div>

              {/* Mini thumbnails strip */}
              <div className="flex items-center justify-center gap-2 pt-1 overflow-x-auto max-w-full px-4">
                {displayedPhotos.map((p, idx) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setSelectedIndex(idx)}
                    className={cn(
                      "w-12 h-12 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all cursor-pointer",
                      selectedIndex === idx
                        ? "border-red-500 ring-2 ring-red-500/50 scale-105"
                        : "border-white/20 opacity-60 hover:opacity-100"
                    )}
                  >
                    <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CampusPartnershipShowcase;
