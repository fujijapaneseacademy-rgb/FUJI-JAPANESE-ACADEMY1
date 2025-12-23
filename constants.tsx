
import React from 'react';
import { Course, CourseLevel, FacultyMember, Testimonial, BlogPost } from './types';
import { BookOpen, Users, Award, Globe, Briefcase, GraduationCap, Clock, MapPin } from 'lucide-react';

export const NAV_LINKS = [
  { name: 'Home', path: '/' },
  { name: 'Courses', path: '/courses' },
  { name: 'Free Courses', path: '/courses/free' },
  { name: 'About Us', path: '/about' },
  { name: 'Careers', path: '/careers' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export const FEATURES = [
  {
    icon: <BookOpen className="w-6 h-6 text-red-600" />,
    title: 'JLPT Focused',
    description: 'Comprehensive curriculum designed to help you pass JLPT N5 through N1.'
  },
  {
    icon: <Users className="w-6 h-6 text-red-600" />,
    title: 'Small Batches',
    description: 'Personalized attention with limited students per batch for better interaction.'
  },
  {
    icon: <Award className="w-6 h-6 text-red-600" />,
    title: 'Certified Faculty',
    description: 'Learn from native speakers and certified Indian instructors with years of experience.'
  },
  {
    icon: <Globe className="w-6 h-6 text-red-600" />,
    title: 'Cultural Immersion',
    description: 'Beyond language, understand the rich traditions and business etiquette of Japan.'
  }
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    title: 'JLPT N5 - Beginners',
    level: CourseLevel.Beginner,
    jlptLevel: 'N5',
    description: 'The foundation of Japanese language. Learn Hiragana, Katakana, basic Kanji, and everyday conversation.',
    duration: '3 Months (Weekend/Weekday)',
    price: '₹15,000',
    features: ['Reading & Writing Scripts', 'Basic Grammar', 'Listening Practice', 'Weekly Tests'],
    image: 'https://picsum.photos/id/20/800/600'
  },
  {
    id: 'c2',
    title: 'JLPT N4 - Basic',
    level: CourseLevel.Beginner,
    jlptLevel: 'N4',
    description: 'Advance your skills to basic communication. Essential for daily life in Japan and basic office interactions.',
    duration: '4 Months',
    price: '₹20,300',
    features: ['Advanced Grammar', '300 Kanji Characters', 'Conversational Drills', 'Mock Exams'],
    image: 'https://picsum.photos/id/26/800/600'
  },
  {
    id: 'c3',
    title: 'JLPT N3 - Intermediate',
    level: CourseLevel.Intermediate,
    jlptLevel: 'N3',
    description: 'Bridge the gap between basic and advanced. Understand everyday Japanese used in a variety of situations.',
    duration: '5 Months',
    price: '₹30,300',
    features: ['Business Japanese Intro', 'Reading Comprehension', 'Complex Grammar', 'Native Interaction'],
    image: 'https://picsum.photos/id/43/800/600'
  },
  {
    id: 'c4',
    title: 'JLPT N2 - Advanced',
    level: CourseLevel.Advanced,
    jlptLevel: 'N2',
    description: 'Achieve business-level proficiency. Capable of understanding complex news, magazines, and business situations.',
    duration: '6 Months',
    price: '₹40,200',
    features: ['Business Keigo Mastery', 'Newspaper Reading', 'Advanced Listening', 'Professional Writing'],
    image: 'https://picsum.photos/id/180/800/600'
  },
  {
    id: 'c5',
    title: 'JLPT N1 - Expert',
    level: CourseLevel.Advanced,
    jlptLevel: 'N1',
    description: 'Native-level fluency. For those aiming for translation careers, research, or complete mastery of Japanese nuances.',
    duration: '6 Months',
    price: '₹75,300',
    features: ['Research Paper Analysis', 'Classical Grammar', 'Translation Techniques', 'Debate Sessions'],
    image: 'https://picsum.photos/id/201/800/600'
  },
  {
    id: 'c6',
    title: 'Spoken Japanese',
    level: CourseLevel.Special,
    description: 'Focus purely on speaking and listening skills. Ideal for travelers and anime enthusiasts.',
    duration: '2 Months',
    price: '₹8,000',
    features: ['Pronunciation Correction', 'Role-play Scenarios', 'Slang & Dialects', 'No Script Learning needed'],
    image: 'https://picsum.photos/id/88/800/600'
  }
];

export const FACULTY: FacultyMember[] = [
  {
    id: 'f1',
    name: 'Hiroshi Tanaka',
    role: 'Head Instructor',
    bio: 'Native Japanese speaker with 15 years of teaching experience across Asia.',
    image: 'https://picsum.photos/id/64/400/400'
  },
  {
    id: 'f2',
    name: 'Priya Sharma',
    role: 'Senior N1 Trainer',
    bio: 'Certified N1 holder and former translator for Japanese MNCs.',
    image: 'https://picsum.photos/id/65/400/400'
  },
  {
    id: 'f3',
    name: 'Kenji Sato',
    role: 'Cultural Advisor',
    bio: 'Specializes in Japanese business etiquette and cultural workshops.',
    image: 'https://picsum.photos/id/91/400/400'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Aditya Raj',
    role: 'Software Engineer',
    content: 'Fuji Academy helped me clear N3 in just one attempt. The teachers are incredibly supportive!',
    courseTaken: 'JLPT N3',
    avatar: 'https://picsum.photos/id/55/100/100'
  },
  {
    id: 't2',
    name: 'Sneha Gupta',
    role: 'Student',
    content: 'I loved the cultural events. Learning Japanese is so much easier when you understand the context.',
    courseTaken: 'JLPT N5',
    avatar: 'https://picsum.photos/id/56/100/100'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Top 5 Tips to Crack JLPT N5',
    excerpt: 'Struggling with Kanji? Here are our top strategies to master the basics efficiently.',
    date: 'Oct 12, 2023',
    category: 'Study Tips',
    image: 'https://picsum.photos/id/24/800/400'
  },
  {
    id: 'b2',
    title: 'Understanding Japanese Business Etiquette',
    excerpt: 'Why bowing matters and how to exchange business cards correctly in Japan.',
    date: 'Sep 28, 2023',
    category: 'Culture',
    image: 'https://picsum.photos/id/160/800/400'
  }
];

export const OPEN_POSITIONS = [
  {
    id: 'j1',
    title: 'Senior Japanese Trainer (N1/N2)',
    department: 'Academics',
    type: 'Full-time',
    location: 'Bengaluru / Hybrid',
    description: 'We are looking for passionate trainers to lead our advanced JLPT batches.',
    requirements: ['JLPT N1 or N2 certified', '3+ years of teaching experience', 'Strong communication skills']
  },
  {
    id: 'j2',
    title: 'Native Japanese Language Expert',
    department: 'Academics',
    type: 'Full-time / Part-time',
    location: 'On-site',
    description: 'Engage with students for conversational fluency and cultural immersion workshops.',
    requirements: ['Native Japanese speaker', 'Intercultural communication skills', 'Passion for teaching']
  },
  {
    id: 'j3',
    title: 'Student Admission Counselor',
    department: 'Sales & Support',
    type: 'Full-time',
    location: 'Bengaluru',
    description: 'Help aspiring learners choose the right path for their Japanese education journey.',
    requirements: ['Excellent counseling skills', 'Familiarity with JLPT levels', 'Target-oriented approach']
  },
  {
    id: 'j4',
    title: 'Social Media Manager (Japan Focus)',
    department: 'Marketing',
    type: 'Remote',
    location: 'Global',
    description: 'Create engaging content about Japanese language and culture for our growing community.',
    requirements: ['Creative content creation', 'Interest in Anime/J-Culture', 'Basic Japanese knowledge is a plus']
  }
];
