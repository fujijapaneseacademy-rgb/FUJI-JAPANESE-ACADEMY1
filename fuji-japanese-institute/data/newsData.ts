export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: 'JLPT Updates' | 'New Batches' | 'Academy Events' | 'Student Success';
  badge: string;
  summary: string;
  ctaText?: string;
  ctaLink?: string;
}

export const ACADEMY_NEWS: NewsItem[] = [
  {
    id: 'n1',
    title: 'Upcoming JLPT N5 & N4 Weekend Batches Announced for Bengaluru & Online',
    date: 'September 15, 2026',
    category: 'New Batches',
    badge: 'Admissions Open',
    summary: 'New weekend morning and weekday evening batches for JLPT N5 (Beginner Foundation) and JLPT N4 are now open for enrollment. Limited to 12 students per batch with certified bilingual and native instructors.',
    ctaText: 'Book Free Demo',
    ctaLink: '/enquire'
  },
  {
    id: 'n2',
    title: 'Important Notification: December 2026 JLPT Exam Hall Tickets & Preparation Tips',
    date: 'September 8, 2026',
    category: 'JLPT Updates',
    badge: 'Exam Alert',
    summary: 'All candidates registered for the December JLPT across Indian test centers (Bengaluru, Chennai, Delhi, Pune, Hyderabad, Kolkata) can download hall tickets starting mid-November. Join our 6-week intensive mock test series.',
    ctaText: 'Take Practice Drill',
    ctaLink: '/practice'
  },
  {
    id: 'n3',
    title: 'Fuji Academy Achieves 98% First-Attempt Pass Rate in JLPT N5 July Exam',
    date: 'August 28, 2026',
    category: 'Student Success',
    badge: 'Result Highlight',
    summary: 'Congratulations to our July batch students! 48 out of 49 enrolled students cleared the official JLPT examination on their first attempt, with 14 students scoring above 150/180 points.',
    ctaText: 'View Course Syllabus',
    ctaLink: '/courses/jlpt-n5'
  },
  {
    id: 'n4',
    title: 'Free Workshop: How to Crack Tokyo Tech Interviews & Format Japanese Resumes',
    date: 'August 14, 2026',
    category: 'Academy Events',
    badge: 'Free Seminar',
    summary: 'Join senior Tokyo tech recruiter Kenji Sato and Fuji faculty for a live 90-minute masterclass on preparing Rirekisho, navigating Shokumu Keirekisho, and answering live technical interview questions in Japanese.',
    ctaText: 'Read Career Guide',
    ctaLink: '/career/japanese-job-interview'
  }
];
