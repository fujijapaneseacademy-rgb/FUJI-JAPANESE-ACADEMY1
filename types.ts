export enum CourseLevel {
  Beginner = 'Beginner',
  Intermediate = 'Intermediate',
  Advanced = 'Advanced',
  Special = 'Special'
}

export interface Course {
  id: string;
  title: string;
  level: CourseLevel;
  description: string;
  duration: string;
  price: string;
  features: string[];
  image: string;
  jlptLevel?: string; // e.g., N5, N4
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
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
}

export type EnrollmentStatus = 'idle' | 'submitting' | 'success' | 'error';
