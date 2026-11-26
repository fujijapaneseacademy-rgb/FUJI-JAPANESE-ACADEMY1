/**
 * Authoritative registry of all indexable and utility routes for Fuji Japanese Academy
 * https://fujijapaneseacademy.com/
 */

export const BASE_URL = 'https://fujijapaneseacademy.com';

export const INDEXABLE_ROUTES = [
  // Core Academy Pages
  {
    path: '/',
    title: 'Top Japanese Language Institute in India, Bengaluru & Japan | Offline & Online Classes | Fuji Japanese Academy',
    description: "Join Fuji Japanese Academy, India's premier Japanese language institute. Expert online and classroom JLPT N5 to N1 coaching in Bengaluru, Study in Japan guidance, and tech job placements.",
    canonical: 'https://fujijapaneseacademy.com/',
    lastmod: '2026-10-13',
    changefreq: 'daily',
    priority: '1.0',
    h1: 'Master Japanese in Bengaluru & Online with Native Instructors',
    badge: 'Premier Japanese Academy'
  },
  {
    path: '/courses',
    title: 'Japanese Language & JLPT Courses (N5 to N1) | Fuji Japanese Academy',
    description: 'Ranked among the top Japanese language institutions in India & Japan. Fuji Japanese Academy offers offline classroom coaching in Bengaluru, live online JLPT N5–N1 classes across India (Chennai, Hyderabad, Mumbai, Palakkad, Kerala & all states), and direct Study & Work in Japan placement.',
    canonical: 'https://fujijapaneseacademy.com/courses',
    lastmod: '2026-10-13',
    changefreq: 'weekly',
    priority: '0.9',
    h1: 'Top Japanese Language Institute in India, Bengaluru & Japan — Offline Classroom & Live Online Classes'
  },
  {
    path: '/courses/jlpt-n5',
    title: 'JLPT N5 Course (Beginners Foundation) | Fuji Japanese Academy',
    description: 'Master Japanese foundation from scratch. Covers Hiragana, Katakana, 103 Kanji, and essential grammar. Small batches with native & bilingual senseis in Bengaluru & Online.',
    canonical: 'https://fujijapaneseacademy.com/courses/jlpt-n5',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'JLPT N5: Beginner Foundation Course',
    badge: 'JLPT Level N5'
  },
  {
    path: '/courses/jlpt-n4',
    title: 'JLPT N4 Course (Basic Conversational) | Fuji Japanese Academy',
    description: 'Achieve basic conversational Japanese proficiency. Learn 300 Kanji, 1,500 vocabulary words, and everyday conversational patterns. Weekend & weekday batches.',
    canonical: 'https://fujijapaneseacademy.com/courses/jlpt-n4',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'JLPT N4: Basic Conversational Course',
    badge: 'JLPT Level N4'
  },
  {
    path: '/courses/jlpt-n3',
    title: 'JLPT N3 Course (Intermediate Japanese for IT) | Fuji Japanese Academy',
    description: 'Bridge the gap between basic and business Japanese. The essential benchmark for software engineering jobs in Japan. 650 Kanji, complex grammar, and mock exams.',
    canonical: 'https://fujijapaneseacademy.com/courses/jlpt-n3',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'JLPT N3: Intermediate Japanese Course',
    badge: 'JLPT Level N3'
  },
  {
    path: '/courses/jlpt-n2',
    title: 'JLPT N2 Course (Advanced Business Fluency) | Fuji Japanese Academy',
    description: 'Advanced Japanese language training for career relocation and corporate environments in Tokyo. Master 1,000+ Kanji, newspaper reading, and technical business discussions.',
    canonical: 'https://fujijapaneseacademy.com/courses/jlpt-n2',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'JLPT N2: Advanced Business Fluency Course',
    badge: 'JLPT Level N2'
  },
  {
    path: '/courses/jlpt-n1',
    title: 'JLPT N1 Course (Master Level Fluency) | Fuji Japanese Academy',
    description: 'Highest level of Japanese language proficiency. Train with native Japanese sensei for full professional fluency, nuanced debate, and translation certification.',
    canonical: 'https://fujijapaneseacademy.com/courses/jlpt-n1',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'JLPT N1: Master Level Fluency Course',
    badge: 'JLPT Level N1'
  },
  {
    path: '/courses/spoken-japanese',
    title: 'Spoken Japanese & Conversational Fluency Course | Fuji Japanese Academy',
    description: 'Speak Japanese with natural pronunciation and speed. Practical everyday conversations, travel survival Japanese, anime idioms, and workplace dialogues.',
    canonical: 'https://fujijapaneseacademy.com/courses/spoken-japanese',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Spoken Japanese & Practical Conversation Course',
    badge: 'Conversational Fluency'
  },
  {
    path: '/courses/business-japanese',
    title: 'Business Japanese & Corporate Etiquette (Keigo) | Fuji Japanese Academy',
    description: 'Master Keigo (honorific Japanese), business email writing, client meetings, Meishi Koukan, and Hou-Ren-So communication drills for Japanese MNCs.',
    canonical: 'https://fujijapaneseacademy.com/courses/business-japanese',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Business Japanese & Corporate Etiquette (Keigo)',
    badge: 'Corporate Japanese'
  },
  {
    path: '/courses/japanese-for-it-professionals',
    title: 'Japanese for IT Professionals & Software Engineers | Fuji Japanese Academy',
    description: 'Specialized Japanese training for software developers, QA leads, and tech architects targeting jobs in Tokyo. Jira specs, code reviews, and IT standups in Japanese.',
    canonical: 'https://fujijapaneseacademy.com/courses/japanese-for-it-professionals',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Japanese for IT Professionals & Software Engineers',
    badge: 'Tech Careers'
  },
  {
    path: '/courses/corporate-japanese-training',
    title: 'Corporate Japanese Training for Companies & Teams | Fuji Japanese Academy',
    description: 'Customized B2B Japanese training programs for tech enterprises, global delivery teams, and automotive R&D centers. Flexible schedules and bilingual trainers.',
    canonical: 'https://fujijapaneseacademy.com/courses/corporate-japanese-training',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Corporate Japanese Language Training for Enterprises',
    badge: 'B2B Training'
  },
  {
    path: '/courses/free',
    title: 'Free Japanese Study Materials & Worksheets | Fuji Japanese Academy',
    description: 'Download free Japanese learning resources: Hiragana & Katakana stroke order charts, N5 Kanji worksheets, particle cheat sheets, and audio listening guides.',
    canonical: 'https://fujijapaneseacademy.com/courses/free',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Free Japanese Study Materials & PDF Worksheets',
    badge: 'Free Downloads'
  },

  // JLPT Knowledge Hub
  {
    path: '/jlpt',
    title: 'JLPT Guide & Syllabus (N5 to N1) | Japanese Language Proficiency Test | Fuji Academy',
    description: 'Complete guide to the JLPT (Japanese Language Proficiency Test) in India. Detailed syllabus, passing marks, exam patterns, and study tips for JLPT N5, N4, N3, N2, and N1.',
    canonical: 'https://fujijapaneseacademy.com/jlpt',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Master the JLPT: Complete Exam Roadmap & Syllabus',
    badge: 'JLPT Hub'
  },
  {
    path: '/jlpt/n5',
    title: 'JLPT N5 Syllabus, Exam Pattern & Passing Marks | Fuji Japanese Academy',
    description: 'Detailed JLPT N5 examination guide: 80/180 passing mark benchmark, 103 Kanji checklist, 800 vocabulary words, section time limits, and Indian test centers.',
    canonical: 'https://fujijapaneseacademy.com/jlpt/n5',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'JLPT N5 Examination Guide & Detailed Syllabus',
    badge: 'JLPT N5 Guide'
  },
  {
    path: '/jlpt/n4',
    title: 'JLPT N4 Syllabus, Marks Breakdown & Preparation | Fuji Japanese Academy',
    description: 'Comprehensive JLPT N4 exam guide: 90/180 passing score, 300 Kanji list, grammar points, listening comprehension strategies, and sample exam questions.',
    canonical: 'https://fujijapaneseacademy.com/jlpt/n4',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'JLPT N4 Examination Guide & Section Breakdown',
    badge: 'JLPT N4 Guide'
  },
  {
    path: '/jlpt/n3',
    title: 'JLPT N3 Syllabus, IT Benchmark & Study Plan | Fuji Japanese Academy',
    description: 'The official gateway to working in Japan: JLPT N3 passing score 95/180, 650 Kanji, intermediate grammar, and career opportunities for software developers.',
    canonical: 'https://fujijapaneseacademy.com/jlpt/n3',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'JLPT N3 Examination Guide & IT Career Benchmark',
    badge: 'JLPT N3 Guide'
  },
  {
    path: '/jlpt/n2',
    title: 'JLPT N2 Syllabus, Business Benchmark & Preparation | Fuji Japanese Academy',
    description: 'Advanced JLPT N2 guide: 90/180 passing cutoff, 1,000 Kanji, professional business reading, and Japan work visa points eligibility.',
    canonical: 'https://fujijapaneseacademy.com/jlpt/n2',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'JLPT N2 Examination Guide & Corporate Fluency',
    badge: 'JLPT N2 Guide'
  },
  {
    path: '/jlpt/n1',
    title: 'JLPT N1 Syllabus, Mastery Guide & Test Tips | Fuji Japanese Academy',
    description: 'Highest certification in Japanese: JLPT N1 score requirements 100/180, 2,000+ Kanji mastery, classical grammar patterns, and expert preparation strategies.',
    canonical: 'https://fujijapaneseacademy.com/jlpt/n1',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'JLPT N1 Examination Guide & Master Level Prep',
    badge: 'JLPT N1 Guide'
  },

  // Learn Japanese Hub
  {
    path: '/learn',
    title: 'Learn Japanese Free | Hiragana, Katakana, Kanji, Grammar & Vocabulary | Fuji Academy',
    description: 'Free Japanese learning resources from Fuji Japanese Academy. Master Hiragana & Katakana charts with pronunciation, essential N5 vocabulary, Japanese particles & Kanji.',
    canonical: 'https://fujijapaneseacademy.com/learn',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Learn Japanese Step by Step: Free Language Hub',
    badge: 'Educational Hub'
  },
  {
    path: '/learn/hiragana-katakana',
    title: 'Hiragana & Katakana Charts with Audio & Stroke Orders | Fuji Japanese Academy',
    description: 'Interactive phonetic Japanese alphabet charts. Practice all 46 Hiragana and 46 Katakana characters with native pronunciation audio and stroke order animations.',
    canonical: 'https://fujijapaneseacademy.com/learn/hiragana-katakana',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Complete Hiragana & Katakana Mastery Charts',
    badge: 'Kana Scripts'
  },
  {
    path: '/learn/vocabulary',
    title: 'JLPT N5 & N4 Vocabulary Bank with Audio | Fuji Japanese Academy',
    description: 'High-frequency Japanese vocabulary bank organized by theme: Greetings, Numbers, Daily Life, Work & IT. Kanji, Kana, Romaji, and English translations.',
    canonical: 'https://fujijapaneseacademy.com/learn/vocabulary',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Essential Japanese Vocabulary Bank for JLPT N5 & N4',
    badge: 'Vocabulary'
  },
  {
    path: '/learn/grammar',
    title: 'Japanese Particles & Grammar Rules Guide | Fuji Japanese Academy',
    description: 'Master tricky Japanese particles (wa, ga, o, ni, de, to, mo, e, kara, made) with clear sentence formulas, real-world examples, and common mistake warnings.',
    canonical: 'https://fujijapaneseacademy.com/learn/grammar',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Japanese Particles & Grammar Structure Guide',
    badge: 'Grammar'
  },
  {
    path: '/learn/kanji',
    title: 'Foundation Kanji for JLPT N5 & N4 (Radicals & Stroke Orders) | Fuji Japanese Academy',
    description: 'Learn the foundational 103 N5 Kanji characters using radicals and visual mnemonics. On\'yomi, Kun\'yomi, stroke orders, and high-yield compounds.',
    canonical: 'https://fujijapaneseacademy.com/learn/kanji',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Foundation Kanji for JLPT N5: Radicals & Readings',
    badge: 'Kanji'
  },

  // Practice Platform
  {
    path: '/practice',
    title: 'Interactive JLPT Practice Quizzes & Drills | Fuji Japanese Academy',
    description: 'Test your Japanese knowledge with free interactive quizzes: Hiragana reading drills, Katakana recognition, N5 vocabulary, and particle identification.',
    canonical: 'https://fujijapaneseacademy.com/practice',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Interactive Japanese & JLPT Practice Quizzes',
    badge: 'Practice Platform'
  },

  // Career in Japan Hub
  {
    path: '/career',
    title: 'Career in Japan & Japanese for IT Professionals | Fuji Japanese Academy',
    description: 'Unlock high-paying software engineering and tech careers in Tokyo. Guide to Japan work visas, tech hiring, Japanese resume (Rirekisho) writing & interview tips.',
    canonical: 'https://fujijapaneseacademy.com/career',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Launch Your Career in Japan: Tech Jobs & Visa Pathways',
    badge: 'Career Hub'
  },
  {
    path: '/career/japanese-for-it',
    title: 'Japanese for IT Professionals: Roadmap to Landing Software Engineering Jobs in Tokyo | Fuji Japanese Academy',
    description: 'Japan is experiencing a severe deficit of over 400,000 software engineers. Learn how mastering Japanese to JLPT N3 or N2 unlocks high-paying developer roles in Tokyo.',
    canonical: 'https://fujijapaneseacademy.com/career/japanese-for-it',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'Japanese for IT Professionals: Developer Jobs in Tokyo',
    badge: 'IT Careers'
  },
  {
    path: '/career/working-in-japan',
    title: 'Complete Guide to Japan Work Visas, Relocation & Living in Tokyo (2026) | Fuji Japanese Academy',
    description: 'Step-by-step breakdown of Japan\'s Engineer/Specialist in Humanities visa, Highly Skilled Professional (HSP) points system, living costs, and taxes in Tokyo.',
    canonical: 'https://fujijapaneseacademy.com/career/working-in-japan',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'Work Visas, Relocation & Living in Japan Guide (2026)',
    badge: 'Visas & Relocation'
  },
  {
    path: '/career/japanese-jobs',
    title: 'Top Japanese Companies Hiring Indian Engineers & High-Paying Tech Roles | Fuji Japanese Academy',
    description: 'Overview of Tokyo tech giants, global MNCs, and fast-growing Japanese startups actively sponsoring international visas for developers and data scientists.',
    canonical: 'https://fujijapaneseacademy.com/career/japanese-jobs',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'Top Companies in Japan Hiring International Engineers',
    badge: 'Job Market'
  },
  {
    path: '/career/japanese-job-interview',
    title: 'Japanese Resume (Rirekisho) Writing & Technical Interview Guide | Fuji Japanese Academy',
    description: 'How to draft an authentic Japanese resume (Rirekisho & Shokumu Keirekisho), navigate Keigo interview etiquette, and pass technical behavioral screens in Japan.',
    canonical: 'https://fujijapaneseacademy.com/career/japanese-job-interview',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'Japanese Resume (Rirekisho) & Technical Interview Preparation',
    badge: 'Interview Guide'
  },

  // Location Hubs
  {
    path: '/locations',
    title: 'Our Campuses & Classroom Locations in Bengaluru | Fuji Japanese Academy',
    description: 'Premier Japanese language classes and JLPT coaching across Bengaluru. Offline center in Electronic City Phase 1 and live interactive online batches.',
    canonical: 'https://fujijapaneseacademy.com/locations',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Our Campuses & Japanese Classroom Locations in Bengaluru',
    badge: 'Bengaluru Campus'
  },
    {
    path: '/locations/bangalore',
    title: 'Best Japanese Language Classes in Bengaluru (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Bengaluru, Karnataka. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Kannada, English & Hindi, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/bangalore',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Bengaluru, Karnataka — Live Online & Bengaluru Offline Campus',
    badge: 'Bengaluru Hub'
  },
  {
    path: '/locations/electronic-city',
    title: 'Best Japanese Language Classes in Electronic City (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Electronic City, Karnataka. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Kannada, English & Hindi, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/electronic-city',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Electronic City, Karnataka — Live Online & Bengaluru Offline Campus',
    badge: 'Electronic City Hub'
  },
  {
    path: '/locations/koramangala',
    title: 'Best Japanese Language Classes in Koramangala (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Koramangala, Karnataka. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Kannada, English & Hindi, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/koramangala',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Koramangala, Karnataka — Live Online & Bengaluru Offline Campus',
    badge: 'Koramangala Hub'
  },
  {
    path: '/locations/indiranagar',
    title: 'Best Japanese Language Classes in Indiranagar (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Indiranagar, Karnataka. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Kannada, English & Hindi, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/indiranagar',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Indiranagar, Karnataka — Live Online & Bengaluru Offline Campus',
    badge: 'Indiranagar Hub'
  },
  {
    path: '/locations/whitefield',
    title: 'Best Japanese Language Classes in Whitefield (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Whitefield, Karnataka. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Kannada, English & Hindi, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/whitefield',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Whitefield, Karnataka — Live Online & Bengaluru Offline Campus',
    badge: 'Whitefield Hub'
  },
  {
    path: '/locations/mysuru',
    title: 'Best Japanese Language Classes in Mysuru (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Mysuru, Karnataka. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Kannada & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/mysuru',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Mysuru, Karnataka — Live Online & Bengaluru Offline Campus',
    badge: 'Mysuru Hub'
  },
  {
    path: '/locations/mangaluru',
    title: 'Best Japanese Language Classes in Mangaluru (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Mangaluru, Karnataka. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Kannada, Tulu & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/mangaluru',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Mangaluru, Karnataka — Live Online & Bengaluru Offline Campus',
    badge: 'Mangaluru Hub'
  },
  {
    path: '/locations/hubballi',
    title: 'Best Japanese Language Classes in Hubballi-Dharwad (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Hubballi-Dharwad, Karnataka. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Kannada & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/hubballi',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Hubballi-Dharwad, Karnataka — Live Online & Bengaluru Offline Campus',
    badge: 'Hubballi-Dharwad Hub'
  },
  {
    path: '/locations/chennai',
    title: 'Best Japanese Language Classes in Chennai (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Chennai, Tamil Nadu. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Tamil & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/chennai',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Chennai, Tamil Nadu — Live Online & Bengaluru Offline Campus',
    badge: 'Chennai Hub'
  },
  {
    path: '/locations/coimbatore',
    title: 'Best Japanese Language Classes in Coimbatore (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Coimbatore, Tamil Nadu. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Tamil & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/coimbatore',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Coimbatore, Tamil Nadu — Live Online & Bengaluru Offline Campus',
    badge: 'Coimbatore Hub'
  },
  {
    path: '/locations/madurai',
    title: 'Best Japanese Language Classes in Madurai (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Madurai, Tamil Nadu. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Tamil & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/madurai',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Madurai, Tamil Nadu — Live Online & Bengaluru Offline Campus',
    badge: 'Madurai Hub'
  },
  {
    path: '/locations/trichy',
    title: 'Best Japanese Language Classes in Tiruchirappalli (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Tiruchirappalli, Tamil Nadu. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Tamil & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/trichy',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Tiruchirappalli, Tamil Nadu — Live Online & Bengaluru Offline Campus',
    badge: 'Tiruchirappalli Hub'
  },
  {
    path: '/locations/salem',
    title: 'Best Japanese Language Classes in Salem (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Salem, Tamil Nadu. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Tamil & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/salem',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Salem, Tamil Nadu — Live Online & Bengaluru Offline Campus',
    badge: 'Salem Hub'
  },
  {
    path: '/locations/krishnagiri',
    title: 'Best Japanese Language Classes in Krishnagiri (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Krishnagiri, Tamil Nadu. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Tamil, Telugu & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/krishnagiri',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Krishnagiri, Tamil Nadu — Live Online & Bengaluru Offline Campus',
    badge: 'Krishnagiri Hub'
  },
  {
    path: '/locations/hosur',
    title: 'Best Japanese Language Classes in Hosur (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Hosur, Tamil Nadu. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Tamil, Kannada & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/hosur',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Hosur, Tamil Nadu — Live Online & Bengaluru Offline Campus',
    badge: 'Hosur Hub'
  },
  {
    path: '/locations/karur',
    title: 'Best Japanese Language Classes in Karur (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Karur, Tamil Nadu. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Tamil & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/karur',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Karur, Tamil Nadu — Live Online & Bengaluru Offline Campus',
    badge: 'Karur Hub'
  },
  {
    path: '/locations/palakkad',
    title: 'Best Japanese Language Classes in Palakkad (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Palakkad, Kerala. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Malayalam, Tamil & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/palakkad',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Palakkad, Kerala — Live Online & Bengaluru Offline Campus',
    badge: 'Palakkad Hub'
  },
  {
    path: '/locations/kochi',
    title: 'Best Japanese Language Classes in Kochi (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Kochi, Kerala. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Malayalam & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/kochi',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Kochi, Kerala — Live Online & Bengaluru Offline Campus',
    badge: 'Kochi Hub'
  },
  {
    path: '/locations/trivandrum',
    title: 'Best Japanese Language Classes in Thiruvananthapuram (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Thiruvananthapuram, Kerala. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Malayalam & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/trivandrum',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Thiruvananthapuram, Kerala — Live Online & Bengaluru Offline Campus',
    badge: 'Thiruvananthapuram Hub'
  },
  {
    path: '/locations/kozhikode',
    title: 'Best Japanese Language Classes in Kozhikode (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Kozhikode, Kerala. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Malayalam & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/kozhikode',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Kozhikode, Kerala — Live Online & Bengaluru Offline Campus',
    badge: 'Kozhikode Hub'
  },
  {
    path: '/locations/thrissur',
    title: 'Best Japanese Language Classes in Thrissur (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Thrissur, Kerala. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Malayalam & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/thrissur',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Thrissur, Kerala — Live Online & Bengaluru Offline Campus',
    badge: 'Thrissur Hub'
  },
  {
    path: '/locations/hyderabad',
    title: 'Best Japanese Language Classes in Hyderabad (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Hyderabad, Telangana. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Telugu, Hindi & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/hyderabad',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Hyderabad, Telangana — Live Online & Bengaluru Offline Campus',
    badge: 'Hyderabad Hub'
  },
  {
    path: '/locations/visakhapatnam',
    title: 'Best Japanese Language Classes in Visakhapatnam (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Visakhapatnam, Andhra Pradesh. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Telugu & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/visakhapatnam',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Visakhapatnam, Andhra Pradesh — Live Online & Bengaluru Offline Campus',
    badge: 'Visakhapatnam Hub'
  },
  {
    path: '/locations/vijayawada',
    title: 'Best Japanese Language Classes in Vijayawada (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Vijayawada, Andhra Pradesh. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Telugu & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/vijayawada',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Vijayawada, Andhra Pradesh — Live Online & Bengaluru Offline Campus',
    badge: 'Vijayawada Hub'
  },
  {
    path: '/locations/mumbai',
    title: 'Best Japanese Language Classes in Mumbai (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Mumbai, Maharashtra. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Marathi, Hindi & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/mumbai',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Mumbai, Maharashtra — Live Online & Bengaluru Offline Campus',
    badge: 'Mumbai Hub'
  },
  {
    path: '/locations/pune',
    title: 'Best Japanese Language Classes in Pune (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Pune, Maharashtra. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Marathi, Hindi & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/pune',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Pune, Maharashtra — Live Online & Bengaluru Offline Campus',
    badge: 'Pune Hub'
  },
  {
    path: '/locations/nagpur',
    title: 'Best Japanese Language Classes in Nagpur (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Nagpur, Maharashtra. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Hindi, Marathi & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/nagpur',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Nagpur, Maharashtra — Live Online & Bengaluru Offline Campus',
    badge: 'Nagpur Hub'
  },
  {
    path: '/locations/delhi',
    title: 'Best Japanese Language Classes in Delhi NCR (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Delhi NCR, Delhi NCR. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Hindi & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/delhi',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Delhi NCR, Delhi NCR — Live Online & Bengaluru Offline Campus',
    badge: 'Delhi NCR Hub'
  },
  {
    path: '/locations/gurugram',
    title: 'Best Japanese Language Classes in Gurugram (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Gurugram, Haryana. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Hindi & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/gurugram',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Gurugram, Haryana — Live Online & Bengaluru Offline Campus',
    badge: 'Gurugram Hub'
  },
  {
    path: '/locations/noida',
    title: 'Best Japanese Language Classes in Noida (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Noida, Uttar Pradesh. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Hindi & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/noida',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Noida, Uttar Pradesh — Live Online & Bengaluru Offline Campus',
    badge: 'Noida Hub'
  },
  {
    path: '/locations/kolkata',
    title: 'Best Japanese Language Classes in Kolkata (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Kolkata, West Bengal. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Bengali, Hindi & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/kolkata',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Kolkata, West Bengal — Live Online & Bengaluru Offline Campus',
    badge: 'Kolkata Hub'
  },
  {
    path: '/locations/ahmedabad',
    title: 'Best Japanese Language Classes in Ahmedabad (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Ahmedabad, Gujarat. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in Gujarati, Hindi & English, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/ahmedabad',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Ahmedabad, Gujarat — Live Online & Bengaluru Offline Campus',
    badge: 'Ahmedabad Hub'
  },
  {
    path: '/locations/tokyo',
    title: 'Best Japanese Language Classes in Tokyo (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Tokyo, Japan. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in English & Japanese Immersion, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/tokyo',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Tokyo, Japan — Live Online & Bengaluru Offline Campus',
    badge: 'Tokyo Hub'
  },
  {
    path: '/locations/osaka',
    title: 'Best Japanese Language Classes in Osaka (Online & Offline Campus) | Fuji Japanese Academy',
    description: 'Top Japanese language institute for students in Osaka, Japan. JLPT N5–N1 coaching with certified native senseis, bilingual bridge in English & Japanese Immersion, and Tokyo IT jobs.',
    canonical: 'https://fujijapaneseacademy.com/locations/osaka',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Top Japanese Language Institute for Students in Osaka, Japan — Live Online & Bengaluru Offline Campus',
    badge: 'Osaka Hub'
  },

  // About & Contact & Careers & News
  {
    path: '/about',
    title: 'About Us | Premier Japanese Language Institute | Fuji Japanese Academy',
    description: 'Discover Fuji Japanese Academy\'s mission, certified native and bilingual faculty, Japanese cultural philosophy, and track record of JLPT success in Bengaluru.',
    canonical: 'https://fujijapaneseacademy.com/about',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'About Fuji Japanese Academy: Our Vision & Faculty',
    badge: 'About Us'
  },
  {
    path: '/careers/apply',
    title: 'Apply for Jobs — Master Job Roles & Recruitment Requirements Catalogue (2026–2036) | Fuji Japanese Academy',
    description: 'Permanent recruitment taxonomy and candidate-placement database for Fuji Japanese Academy across 15 job families, 100+ roles, JLPT N5–N1 and non-Japanese pathways in India and Tokyo.',
    canonical: 'https://fujijapaneseacademy.com/careers/apply',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.9',
    h1: 'Master Job Roles & Recruitment Requirements Catalogue (2026–2036)',
    badge: 'Candidate Placement Portal'
  },
  {
    path: '/locations/state/karnataka',
    title: 'Karnataka State Japanese Language Hub & Regional Centers | Fuji Japanese Academy',
    description: 'Premier Japanese coaching hub with physical Electronic City campus, native sensei faculty, and IT placement pipelines across Karnataka.',
    canonical: 'https://fujijapaneseacademy.com/locations/state/karnataka',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Karnataka Campus & State Hubs',
    badge: 'State Hub'
  },
  {
    path: '/locations/state/tamil-nadu',
    title: 'Tamil Nadu State Japanese Language Hub & Regional Centers | Fuji Japanese Academy',
    description: 'Expert Japanese faculty, small batches, and direct automotive and engineering job opportunities in Japan for Tamil Nadu learners.',
    canonical: 'https://fujijapaneseacademy.com/locations/state/tamil-nadu',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Tamil Nadu State Hubs',
    badge: 'State Hub'
  },
  {
    path: '/locations/state/kerala',
    title: 'Kerala State Japanese Language Hub & Healthcare SSW Centers | Fuji Japanese Academy',
    description: 'Healthcare, nursing SSW visa preparation, bilingual customer support, and hospitality coaching across Kerala centers.',
    canonical: 'https://fujijapaneseacademy.com/locations/state/kerala',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Kerala State Hubs',
    badge: 'State Hub'
  },
  {
    path: '/locations/state/telangana-andhra',
    title: 'Telangana & Andhra Pradesh Japanese Language Hub | Fuji Japanese Academy',
    description: 'Fast-track JLPT N5–N2 batches for tech and pharmaceutical graduates in Hyderabad, Visakhapatnam, and Vijayawada.',
    canonical: 'https://fujijapaneseacademy.com/locations/state/telangana-andhra',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Telangana & Andhra Pradesh State Hubs',
    badge: 'State Hub'
  },
  {
    path: '/locations/state/maharashtra',
    title: 'Maharashtra State Japanese Language Hub — Mumbai, Pune, Nagpur | Fuji Japanese Academy',
    description: 'Finance, automotive, corporate sales, and engineering Japanese training for Mumbai, Pune, and Nagpur learners with Marathi and Hindi support.',
    canonical: 'https://fujijapaneseacademy.com/locations/state/maharashtra',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Maharashtra State Hubs',
    badge: 'State Hub'
  },
  {
    path: '/locations/state/delhi-ncr',
    title: 'Delhi NCR & North India Japanese Language Hub — Gurugram, Noida | Fuji Japanese Academy',
    description: 'B2B sales executive, Japanese interpreter, embassy career pathways, and corporate manufacturing batches across Delhi NCR, Gurugram, and Noida.',
    canonical: 'https://fujijapaneseacademy.com/locations/state/delhi-ncr',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Delhi NCR & North India Regional Hubs',
    badge: 'Regional Hub'
  },
  {
    path: '/locations/state/west-bengal-gujarat',
    title: 'West Bengal & Gujarat Japanese Language Hub — Kolkata & Ahmedabad | Fuji Japanese Academy',
    description: 'N1 qualified & Indian instructors, flexible live online & offline batches, study abroad and business tie-ups connecting Kolkata and Ahmedabad.',
    canonical: 'https://fujijapaneseacademy.com/locations/state/west-bengal-gujarat',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'West Bengal & Gujarat Regional Hubs',
    badge: 'Regional Hub'
  },
  {
    path: '/locations/state/japan-onshore',
    title: 'Japan On-Shore Pathways — Tokyo & Kansai (Osaka) | Fuji Japanese Academy',
    description: 'On-shore higher education pathways, language school admissions, SSW and Engineer work visa sponsorships in Tokyo and Osaka.',
    canonical: 'https://fujijapaneseacademy.com/locations/state/japan-onshore',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Japan On-Shore Pathways (Tokyo & Kansai)',
    badge: 'On-Shore Hub'
  },
  {
    path: '/careers',
    title: 'Careers & Job Openings: Executive Sales & Japanese Trainers | Fuji Japanese Academy',
    description: 'Explore careers at Fuji Japanese Academy. Active opening: Executive Sales / Business Development in Manesar, Haryana (6-10 LPA CTC, JLPT N2/N1) & certified Japanese language trainers.',
    canonical: 'https://fujijapaneseacademy.com/careers',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Careers & Job Openings: Executive Sales & Japanese Faculty',
    badge: 'We Are Hiring'
  },
  {
    path: '/contact',
    title: 'Contact Us & Campus Location in Bengaluru | Fuji Japanese Academy',
    description: 'Get in touch with Fuji Japanese Academy. Visit our Electronic City campus, call our admissions desk at +91 63649 24110, or send an inquiry for Japanese classes.',
    canonical: 'https://fujijapaneseacademy.com/contact',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Contact Fuji Japanese Academy & Campus Location',
    badge: 'Admissions Desk'
  },
  {
    path: '/news',
    title: 'Academy News & JLPT Exam Updates | Fuji Japanese Academy',
    description: 'Latest announcements from Fuji Japanese Academy. Upcoming JLPT exam schedules, new weekend batch openings, student pass results, and cultural workshops.',
    canonical: 'https://fujijapaneseacademy.com/news',
    lastmod: '2026-10-13',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Academy News, Batch Announcements & Exam Bulletins',
    badge: 'News & Updates'
  },

  // Blog Hub & Articles
  {
    path: '/blog',
    title: 'Japanese Language & Culture Blog | Fuji Japanese Academy',
    description: 'Expert articles on mastering the JLPT, Japanese grammar tips, business Keigo etiquette, and tech career opportunities in Tokyo from Fuji Japanese Academy.',
    canonical: 'https://fujijapaneseacademy.com/blog',
    lastmod: '2026-10-13',
    changefreq: 'weekly',
    priority: '0.8',
    h1: 'Japanese Language, JLPT & Career Knowledge Hub',
    badge: 'Academy Blog'
  },
  {
    path: '/blog/complete-guide-to-jlpt-n5-exam-syllabus-strategy-passing-score',
    title: 'The Complete Guide to Passing JLPT N5 in 3 Months: Syllabus, Kanji, and Proven Strategy | Fuji Japanese Academy',
    description: 'Complete 3-month JLPT N5 preparation guide: syllabus, 103 Kanji list, 800 core vocabulary words, exam scoring breakdown, and expert study schedule from Fuji Japanese Academy.',
    canonical: 'https://fujijapaneseacademy.com/blog/complete-guide-to-jlpt-n5-exam-syllabus-strategy-passing-score',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'The Complete Guide to Passing JLPT N5 in 3 Months',
    badge: 'JLPT Preparation'
  },
  {
    path: '/blog/business-japanese-etiquette-for-it-professionals-in-japan',
    title: 'Business Japanese & Etiquette Guide: Essential Keigo and Office Manners for IT Professionals | Fuji Japanese Academy',
    description: 'Master Keigo honorifics, business card exchange etiquette, bowing rules, and professional email templates for IT professionals working in Japan with Fuji Japanese Academy.',
    canonical: 'https://fujijapaneseacademy.com/blog/business-japanese-etiquette-for-it-professionals-in-japan',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'Business Japanese & Etiquette Guide for IT Professionals',
    badge: 'Career & Culture'
  },
  {
    path: '/blog/how-to-learn-japanese-in-india-career-opportunities',
    title: 'How to Learn Japanese in India: From Absolute Zero to High-Paying Career in Tokyo | Fuji Japanese Academy',
    description: 'Roadmap to learning Japanese in India: JLPT N5 to N1 timeline, high-demand IT careers in Tokyo, MEXT scholarship guidance, and course options at Fuji Japanese Academy Bangalore.',
    canonical: 'https://fujijapaneseacademy.com/blog/how-to-learn-japanese-in-india-career-opportunities',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'How to Learn Japanese in India: Zero to Tokyo Tech Career',
    badge: 'Learning Tips'
  },
  {
    path: '/blog/japanese-particles-cheat-sheet-jlpt-n5-n4',
    title: 'Mastering the 10 Essential Japanese Particles: The Ultimate Cheat Sheet for JLPT N5 & N4 | Fuji Japanese Academy',
    description: 'Complete guide to Japanese particles: wa, ga, wo, ni, de, to, mo, e, kara, made. Clear formulas and example sentences for JLPT N5 and N4 learners.',
    canonical: 'https://fujijapaneseacademy.com/blog/japanese-particles-cheat-sheet-jlpt-n5-n4',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'Mastering the 10 Essential Japanese Particles: Cheat Sheet',
    badge: 'Grammar Guide'
  },
  {
    path: '/blog/tech-jobs-in-japan-for-indian-engineers',
    title: 'Top 7 In-Demand Tech Jobs in Japan for Indian Engineers & Developers | Fuji Japanese Academy',
    description: 'Guide to high-demand IT jobs in Japan for Indian software engineers: salaries, visa requirements, JLPT proficiency levels, and hiring trends in Tokyo.',
    canonical: 'https://fujijapaneseacademy.com/blog/tech-jobs-in-japan-for-indian-engineers',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'Top 7 In-Demand Tech Jobs in Japan for Indian Engineers',
    badge: 'Career Guide'
  },
  {
    path: '/blog/how-to-learn-kanji-fast-mnemonics-radicals',
    title: 'How to Learn 500 Kanji in 60 Days: The Radical and Mnemonics Method | Fuji Japanese Academy',
    description: 'Fast Kanji learning method using 214 radicals and visual mnemonics. Master JLPT N5 and N4 Kanji in 60 days with Fuji Japanese Academy technique.',
    canonical: 'https://fujijapaneseacademy.com/blog/how-to-learn-kanji-fast-mnemonics-radicals',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'How to Learn 500 Kanji in 60 Days: The Radical Method',
    badge: 'Kanji Strategy'
  },
  {
    path: '/blog/hiragana-and-katakana-mastery-guide-chart',
    title: 'Hiragana & Katakana Complete Mastery Guide: Stroke Orders, Audio Mnemonics & PDF Chart | Fuji Japanese Academy',
    description: 'Free comprehensive guide to Hiragana and Katakana charts, stroke orders, and visual mnemonics. Learn basic Japanese writing with Fuji Japanese Academy.',
    canonical: 'https://fujijapaneseacademy.com/blog/hiragana-and-katakana-mastery-guide-chart',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'Hiragana & Katakana Complete Mastery Guide & PDF Chart',
    badge: 'Kana Guide'
  },
  {
    path: '/blog/japan-work-visa-guide-for-foreigners-engineers',
    title: 'The Essential Guide to Japanese Work Visas for Foreign Professionals (2026 Edition) | Fuji Japanese Academy',
    description: 'Complete breakdown of Japanese work visa options for international engineers and professionals: eligibility, documentation, salary criteria, and timelines.',
    canonical: 'https://fujijapaneseacademy.com/blog/japan-work-visa-guide-for-foreigners-engineers',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'The Essential Guide to Japanese Work Visas for Foreigners',
    badge: 'Visa Guide'
  },
  {
    path: '/blog/essential-japanese-phrases-for-daily-life-and-travel',
    title: 'Top 10 Essential Japanese Phrases for Daily Life, Travel and Shopping | Fuji Japanese Academy',
    description: 'Essential survival Japanese phrases for tourists and new residents: polite greetings, restaurant ordering, shopping vocabulary with romaji and pronunciations.',
    canonical: 'https://fujijapaneseacademy.com/blog/essential-japanese-phrases-for-daily-life-and-travel',
    lastmod: '2026-10-13',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'Top 10 Essential Japanese Phrases for Daily Life & Travel',
    badge: 'Spoken Japanese'
  },
  {
    path: '/corporate',
    title: 'Corporate Japanese Language Training for IT GCCs | Fuji Japanese Academy',
    description: 'Custom Business Japanese & Technical Keigo training for IT GCCs, software developers, and engineering teams in Bengaluru and pan-India.',
    canonical: 'https://fujijapaneseacademy.com/corporate',
    lastmod: '2026-10-22',
    changefreq: 'monthly',
    priority: '0.9',
    h1: 'Corporate Japanese Training for IT Enterprises',
    badge: 'Enterprise Solutions'
  },
  {
    path: '/jlpt-exam-dates-india',
    title: 'India JLPT Exam Dates 2026, Registration Deadlines & Test Centers | Fuji Japanese Academy',
    description: 'Official 2026 JLPT exam dates, registration deadlines, fee breakdowns, and test center directory for Bengaluru, Chennai, New Delhi, Pune, Mumbai, and Kolkata.',
    canonical: 'https://fujijapaneseacademy.com/jlpt-exam-dates-india',
    lastmod: '2026-10-22',
    changefreq: 'weekly',
    priority: '0.9',
    h1: 'India JLPT Exam Dates, Deadlines & Test Center Directory',
    badge: 'Official Guide'
  },
  {
    path: '/mock-test',
    title: 'JLPT Mock Test Online | Free N5, N4, N3 Practice Exam | Fuji Japanese Academy',
    description: 'Take our free interactive JLPT mock test for N5, N4, and N3 levels. Timed simulated questions covering Kanji, Vocabulary, Grammar and Reading with instant certificate generation.',
    canonical: 'https://fujijapaneseacademy.com/mock-test',
    lastmod: '2026-10-22',
    changefreq: 'weekly',
    priority: '0.9',
    h1: 'JLPT Mini-Exam Simulator',
    badge: 'Exam Simulator'
  },
  // High-Authority Examination, College & Verification Portals
  {
    path: '/exam-calendar',
    title: 'India Japanese Exam Calendar 2026 — Dates, Fees & Centers | Fuji Japanese Academy',
    description: 'Official 2026 test dates for JLPT (July & Dec), NAT-TEST (6x/year), and JFT-Basic in India. Registration deadlines, fees, and test center directory for Bengaluru, Chennai, Mumbai, Delhi, Pune, Kolkata, Karur & Salem.',
    canonical: 'https://fujijapaneseacademy.com/exam-calendar',
    lastmod: '2026-10-24',
    changefreq: 'weekly',
    priority: '0.9',
    h1: 'India Japanese Exam Calendar 2026 — Official JLPT, NAT-TEST & JFT-Basic Schedule'
  },
  {
    path: '/college-partnerships',
    title: 'College & University Institutional MoUs — Campus Japanese & Japan Placements | Fuji Japanese Academy',
    description: 'Establish on-campus Japanese training and Tokyo placement cells for Engineering (B.Tech), BCA, MCA, and Degree colleges across India with Fuji Japanese Academy.',
    canonical: 'https://fujijapaneseacademy.com/college-partnerships',
    lastmod: '2026-10-24',
    changefreq: 'monthly',
    priority: '0.8',
    h1: 'Institutional MoUs & On-Campus Japanese Placement Cells for Colleges in India'
  },
  {
    path: '/verify-certificate',
    title: 'Official Certificate Verification Portal | Fuji Japanese Academy',
    description: 'Verify the authenticity of graduation certificates, JLPT completion records, and corporate credentials issued by Fuji Japanese Academy Private Limited, Bengaluru.',
    canonical: 'https://fujijapaneseacademy.com/verify-certificate',
    lastmod: '2026-10-24',
    changefreq: 'monthly',
    priority: '0.7',
    h1: 'Official Academy Certificate Verification Portal'
  }
];

export const UTILITY_NOINDEX_ROUTES = [
  {
    path: '/payment',
    title: 'Pay Course Fee Online | Official Payment Portal | Fuji Japanese Academy',
    description: 'Pay your Japanese language & JLPT course fees securely online at Fuji Japanese Academy. UPI, Cards, NetBanking, and Direct Bank Transfer supported.',
    canonical: 'https://fujijapaneseacademy.com/payment',
    robots: 'noindex, follow',
    h1: 'Course Fee Payment & Admissions Desk'
  },
  {
    path: '/qr',
    title: 'Official QR Code & Quick Connect Studio | Fuji Japanese Academy',
    description: 'Quick connect and official QR codes for Fuji Japanese Academy Bengaluru admissions.',
    canonical: 'https://fujijapaneseacademy.com/qr',
    robots: 'noindex, follow',
    h1: 'Official Academy QR Code Studio'
  },
  {
    path: '/enquire',
    title: 'Book a Free Japanese Demo Class & Course Counseling | Fuji Japanese Academy',
    description: 'Reserve your seat for a 1-on-1 Japanese demo class with Fuji Japanese Academy. Explore JLPT N5-N1 courses, live online & Bengaluru classroom batches.',
    canonical: 'https://fujijapaneseacademy.com/enquire',
    robots: 'noindex, follow',
    h1: 'Book a Free Japanese Demo Class & Counseling'
  },
  {
    path: '/connect',
    title: 'Connect With Us | Social Media & Bio Links | Fuji Japanese Academy',
    description: 'Connect with Fuji Japanese Academy on Instagram, YouTube, Facebook, LinkedIn, X, WhatsApp, Google Reviews, and more.',
    canonical: 'https://fujijapaneseacademy.com/connect',
    robots: 'noindex, follow',
    h1: 'Connect with Fuji Japanese Academy'
  },
  {
    path: '/terms',
    title: 'Terms & Conditions & Refund Policy | Fuji Japanese Academy',
    description: 'Terms & Conditions for Fuji Japanese Academy - Japanese language institute in Bengaluru.',
    canonical: 'https://fujijapaneseacademy.com/terms',
    robots: 'noindex, follow',
    h1: 'Terms & Conditions & Refund Policy'
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Fuji Japanese Academy',
    description: 'Privacy Policy for Fuji Japanese Academy - Japanese language institute in Bengaluru.',
    canonical: 'https://fujijapaneseacademy.com/privacy-policy',
    robots: 'noindex, follow',
    h1: 'Privacy Policy'
  },
  {
    path: '/login',
    title: 'Student Portal Login | Fuji Japanese Academy',
    description: 'Login to access your enrolled courses, Kanji workbooks, and JLPT practice materials.',
    canonical: 'https://fujijapaneseacademy.com/login',
    robots: 'noindex, nofollow',
    h1: 'Student Portal Sign In'
  },
  {
    path: '/signup',
    title: 'Create Student Account | Fuji Japanese Academy',
    description: 'Register for Fuji Japanese Academy learning portal.',
    canonical: 'https://fujijapaneseacademy.com/signup',
    robots: 'noindex, nofollow',
    h1: 'Student Registration'
  },
  {
    path: '/forgot-password',
    title: 'Reset Password | Fuji Japanese Academy',
    description: 'Recover access to your student portal account.',
    canonical: 'https://fujijapaneseacademy.com/forgot-password',
    robots: 'noindex, nofollow',
    h1: 'Reset Password'
  },
  {
    path: '/reset-password',
    title: 'Set New Password | Fuji Japanese Academy',
    description: 'Set a new password for your student portal account.',
    canonical: 'https://fujijapaneseacademy.com/reset-password',
    robots: 'noindex, nofollow',
    h1: 'Update Password'
  },
  {
    path: '/dashboard',
    title: 'Student Learning Dashboard | Fuji Japanese Academy',
    description: 'Personalized dashboard for enrolled students.',
    canonical: 'https://fujijapaneseacademy.com/dashboard',
    robots: 'noindex, nofollow',
    h1: 'Student Learning Dashboard'
  },
  {
    path: '/admin',
    title: 'Admin Portal | Fuji Japanese Academy',
    description: 'Fuji Academy administrative console.',
    canonical: 'https://fujijapaneseacademy.com/admin',
    robots: 'noindex, nofollow',
    h1: 'Academy Admin Console'
  }
];

export const REDIRECTS_MAP = [
  { from: '/links', to: '/connect', status: 301 },
  { from: '/qrcode', to: '/qr', status: 301 },
  { from: '/pay', to: '/payment', status: 301 },
  { from: '/n5', to: '/jlpt/n5', status: 301 },
  { from: '/n4', to: '/jlpt/n4', status: 301 },
  { from: '/n3', to: '/jlpt/n3', status: 301 },
  { from: '/n2', to: '/jlpt/n2', status: 301 },
  { from: '/n1', to: '/jlpt/n1', status: 301 },
  { from: '/enroll', to: '/enquire', status: 301 },
  { from: '/admissions', to: '/enquire', status: 301 }
];
