export enum CourseLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Special = 'Special'
}

export interface CourseCurriculumModule {
  title: string;
  description: string;
  items: string[];
}

export interface CourseFAQ {
  question: string;
  answer: string;
}

export interface Course {
  id: string;
  title: string;
  slug?: string;
  level: CourseLevel;
  description: string;
  duration: string;
  price: string;
  originalPrice?: number;
  discountPercent?: number;
  features: string[];
  image: string;
  jlptLevel?: string; // e.g., N5, N4
  badge?: string;
  targetAudience?: string;
  prerequisites?: string;
  kanjiCount?: string;
  vocabularyCount?: string;
  grammarPoints?: string;
  hoursRequired?: string;
  examPassingCriteria?: string;
  batchSchedule?: string[];
  syllabus?: CourseCurriculumModule[];
  faqs?: CourseFAQ[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  avatar: string;
  courseTaken: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  badge?: string;
  experience?: string;
  specialty?: string;
}

export interface BlogFAQ {
  question: string;
  answer: string;
}

export interface BlogSource {
  title: string;
  url: string;
  publisher: string;
  type?: string;
}

export interface InternalCrossLink {
  title: string;
  href: string;
  description?: string;
  badge?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug?: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  relatedLink?: string;
  content?: string;
  meta_description?: string;
  keywords?: string[];
  negative_keywords?: string[];
  faqs?: BlogFAQ[];
  sources?: BlogSource[];
  internalLinks?: InternalCrossLink[];
  read_time?: string;
  author?: string;
  is_published?: boolean;
  published_at?: string;
}

export interface FreeCourse {
  id: string;
  title: string;
  description: string;
  type: string;
  duration: string;
  image: string;
  resourceLink?: string;
}

export type EnrollmentStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject?: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

export interface JobPost {
  id: string;
  title: string;
  department: string;
  type: string; // Full-time, Part-time
  location: string;
  description: string;
  requirements: string[];
  active: boolean;
  salary?: string;
  salaryNote?: string;
  aboutRole?: string;
  responsibilities?: string[];
  eligibility?: string[];
  applyEmail?: string;
  featured?: boolean;
}

export interface UserProfile {
  id: string; // auth.uid
  email?: string;
  full_name?: string;
  phone?: string;
  role?: 'user' | 'admin';
  created_at?: string;
}
