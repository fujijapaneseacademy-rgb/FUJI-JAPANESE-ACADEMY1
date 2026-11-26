
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

export const ADMIN_EMAIL = 'fujijapaneseacademy@gmail.com';

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
    slug: 'jlpt-n5',
    title: 'JLPT N5 - Beginners Foundation',
    level: CourseLevel.Beginner,
    jlptLevel: 'N5',
    description: 'The complete starting foundation of the Japanese language. Master Hiragana, Katakana, 103 basic Kanji, everyday greetings, and essential sentence structures.',
    duration: '3 Months (Weekend/Weekday)',
    price: '₹15,000',
    originalPrice: 25000,
    discountPercent: 40,
    features: ['Hiragana & Katakana Mastery', '103 Essential Kanji Characters', 'Basic Grammar & Sentence Patterns', 'Weekly Listening Drills & Mock Exams'],
    image: '/images/courses/jlpt-n5.jpg',
    badge: 'Most Popular for Starters',
    targetAudience: 'Absolute beginners, college students, anime/manga fans, and software professionals preparing for Japan IT careers.',
    prerequisites: 'None. Zero prior Japanese language knowledge required.',
    kanjiCount: '103 Kanji Characters',
    vocabularyCount: '800+ Vocabulary Words',
    grammarPoints: '40+ Essential Sentence Patterns',
    hoursRequired: '120-150 Study Hours',
    examPassingCriteria: 'Overall 80/180 points (minimum 38/120 in Language Knowledge & Reading, 19/60 in Listening)',
    batchSchedule: [
      'Weekend Morning: Sat & Sun (10:00 AM - 1:00 PM IST)',
      'Weekday Evening: Mon, Wed, Fri (7:00 PM - 8:30 PM IST)',
      'Sunday Intensive: Sun (9:00 AM - 3:00 PM IST)'
    ],
    syllabus: [
      {
        title: 'Module 1: Japanese Writing Systems (Orthography)',
        description: 'Master reading, writing, and stroke orders for phonetic Japanese scripts.',
        items: ['Hiragana (46 basic characters + Dakuon, Handakuon, Yoon)', 'Katakana (46 loan-word characters + foreign phonetic sounds)', 'Pronunciation nuances: long vowels (Chōon), double consonants (Sokuon)']
      },
      {
        title: 'Module 2: Essential Vocabulary & Daily Phrases',
        description: 'Build core vocabulary for everyday interactions, family, time, and shopping.',
        items: ['Greetings, classroom expressions, numbers & counters (tsu, ko, nin)', 'Time, days, months, family relations, hobbies, and directions', '800+ high-frequency N5 vocabulary with flashcards']
      },
      {
        title: 'Module 3: Core Grammar & Particles',
        description: 'Understand fundamental Japanese sentence structure (SOV) and basic particles.',
        items: ['Particles: は (wa), が (ga), を (o), に (ni), で (de), と (to), も (mo)', 'Verbs: Masu form, Te form (requests, continuous action), Nai form (negation)', 'Adjectives: I-adjectives and Na-adjectives conjugation', 'Giving and receiving permissions, basic desire (~tai desu)']
      },
      {
        title: 'Module 4: Kanji & Reading Comprehension',
        description: 'Learn radical analysis, stroke order, On\'yomi & Kun\'yomi readings.',
        items: ['103 standard N5 Kanji with stroke orders and meaning associations', 'Reading short notes, notices, train signs, and simple dialogues', 'Techniques for skimming and locating key answers in reading passages']
      },
      {
        title: 'Module 5: JLPT N5 Listening & Full Mock Tests',
        description: 'Train your ear to natural conversational speeds and test formats.',
        items: ['Task-based listening and point comprehension drills', '4 Full-length simulated JLPT N5 mock examinations with negative marking check', 'Individual performance review, scoring breakdown, and doubt clearing']
      }
    ],
    faqs: [
      {
        question: 'Is JLPT N5 sufficient for getting a job in Japan?',
        answer: 'JLPT N5 is the foundational entry level. While most corporate engineering jobs in Japan require N3 or N2, N5 is an essential prerequisite for SSW (Specified Skilled Worker) visas and student visas in Japanese language institutes.'
      },
      {
        question: 'How long does it take to prepare for JLPT N5?',
        answer: 'With Fuji Japanese Academy’s structured 3-month curriculum (4–6 hours of live instruction per week + 2 hours of home practice), complete beginners comfortably clear JLPT N5.'
      },
      {
        question: 'Are study materials and mock tests included in the course fee?',
        answer: 'Yes! All digital study materials, JLPT N5 Kanji workbooks, grammar summary PDFs, audio listening files, and 4 full-length mock tests are included in the course fee.'
      },
      {
        question: 'Can I attend a free demo class before enrolling?',
        answer: 'Absolutely. We offer a 100% free live interactive demo class where you can meet the instructor, experience our teaching style, and ask all your questions.'
      }
    ],
    metaTitle: 'JLPT N5 Course Online & Classroom | Japanese for Beginners | Fuji Academy',
    metaDescription: 'Enroll in JLPT N5 Japanese coaching at Fuji Japanese Academy. Learn Hiragana, Katakana, 103 Kanji & grammar with certified native & bilingual teachers. Book a free demo class!'
  },
  {
    id: 'c2',
    slug: 'jlpt-n4',
    title: 'JLPT N4 - Basic Conversational Proficiency',
    level: CourseLevel.Beginner,
    jlptLevel: 'N4',
    description: 'Advance your skills to practical everyday communication. Essential for daily life in Japan, office interactions, and technical intern training programs.',
    duration: '4 Months',
    price: '₹20,300',
    originalPrice: 32000,
    discountPercent: 37,
    features: ['Advanced Elementary Grammar', '300 Total Kanji Characters', 'Conversational Drills & Listening', '5 Full-length Mock Exams'],
    image: '/images/courses/jlpt-n4.jpg',
    badge: 'SSW Visa Requirement',
    targetAudience: 'Students who completed JLPT N5 or equivalent, SSW visa aspirants, and professionals aiming for foundational business Japanese.',
    prerequisites: 'JLPT N5 certification or knowledge of Hiragana, Katakana, and basic 100 Kanji.',
    kanjiCount: '300 Kanji Characters (including N5)',
    vocabularyCount: '1,500+ Vocabulary Words',
    grammarPoints: '80+ Essential Grammar Structures',
    hoursRequired: '200-250 Study Hours',
    examPassingCriteria: 'Overall 90/180 points (minimum 38/120 in Language Knowledge & Reading, 19/60 in Listening)',
    batchSchedule: [
      'Weekend Afternoon: Sat & Sun (2:00 PM - 5:00 PM IST)',
      'Weekday Evening: Tue, Thu, Sat (7:30 PM - 9:00 PM IST)'
    ],
    syllabus: [
      {
        title: 'Module 1: Complex Verb Forms & Compound Sentences',
        description: 'Master conditional sentences, causative forms, and potential verbs.',
        items: ['Potential forms (~eru/rareru), Volitional forms (~ou/you)', 'Conditionals: ~tara, ~ba, ~nara, ~to differences and nuances', 'Giving & receiving actions: ageru, kureru, morau and polite variations']
      },
      {
        title: 'Module 2: 1,500 High-Frequency N4 Words & Idioms',
        description: 'Vocabulary for office situations, hospital visits, travel, and renting apartments.',
        items: ['Expressing assumptions: ~sou desu, ~rashii desu, ~you desu', 'Purpose clauses (~tameni vs. ~youni), indirect questions (~ka douka)']
      },
      {
        title: 'Module 3: 300 Kanji Reading & Compound Words',
        description: 'Read everyday notices, newspaper headlines, recipes, and transport timetables.',
        items: ['Radical decomposition, multi-reading kanji compounds (Jukugo)', 'Contextual guessing strategies for unfamiliar Kanji compounds']
      },
      {
        title: 'Module 4: Conversational Fluency & Listening Practice',
        description: 'Speed-listening drills based on actual JLPT past paper questions.',
        items: ['Rapid-response audio questions, situational task dialogue comprehension', '5 full-scale mock exams with timing strategies and error analytics']
      }
    ],
    faqs: [
      {
        question: 'Is JLPT N4 required for Specified Skilled Worker (SSW) visas in Japan?',
        answer: 'Yes! Passing JLPT N4 (or JFT-Basic) is the mandatory language benchmark set by the Immigration Services Agency of Japan for SSW visa categories across caregiving, hospitality, construction, and manufacturing.'
      },
      {
        question: 'I learned N5 on my own. Can I join this N4 course directly?',
        answer: 'Yes! We conduct a quick 15-minute diagnostic evaluation test to confirm your current level before onboarding you into the N4 batch.'
      }
    ],
    metaTitle: 'JLPT N4 Course Coaching Online & Classroom | Fuji Japanese Academy',
    metaDescription: 'Master JLPT N4 with Fuji Japanese Academy. 300 Kanji, 1500 words, practical conversational drills & SSW visa preparation. Enroll or book a free trial class today.'
  },
  {
    id: 'c3',
    slug: 'jlpt-n3',
    title: 'JLPT N3 - Intermediate Business Japanese',
    level: CourseLevel.Intermediate,
    jlptLevel: 'N3',
    description: 'Bridge the critical gap between basic and advanced Japanese. Understand everyday workplace Japanese, read newspaper articles, and converse smoothly in business environments.',
    duration: '5 Months',
    price: '₹30,300',
    originalPrice: 48000,
    discountPercent: 37,
    features: ['Intermediate Business Grammar', '650 Kanji Characters', 'Japanese Corporate Culture & Keigo', '6 Mock Exams & Interview Prep'],
    image: '/images/courses/jlpt-n3.jpg',
    badge: 'Career Accelerator',
    targetAudience: 'Software engineers, bilingual coordinators, and students aiming to land jobs in Tokyo and Japanese MNCs.',
    prerequisites: 'JLPT N4 certification or equivalent conversational capability.',
    kanjiCount: '650 Kanji Characters',
    vocabularyCount: '3,750+ Vocabulary Words',
    grammarPoints: '110+ Intermediate Grammar Patterns',
    hoursRequired: '400-450 Study Hours',
    examPassingCriteria: 'Overall 95/180 points (minimum 19/60 in each section)',
    batchSchedule: [
      'Weekend Batches: Sat & Sun (10:00 AM - 1:30 PM IST)',
      'Weekday Fast-track: Mon to Thu (8:00 PM - 9:30 PM IST)'
    ],
    syllabus: [
      {
        title: 'Module 1: Intermediate Grammar Patterns & Nuances',
        description: 'Understand sentence connectors, passive-causative structures, and nuanced expressions.',
        items: ['Nuanced connectors: ~wake da, ~koto ni natte iru, ~bakari ka', 'Expressing expectations, regret, certainty, and hypothetical outcomes', 'Differences between similar grammar patterns tested on the JLPT N3 exam']
      },
      {
        title: 'Module 2: Business Keigo & Workplace Communication',
        description: 'Honorific (Sonkeigo), Humble (Kenjougo), and Polite (Teineigo) speech.',
        items: ['Business email writing standards and telephone etiquette in Japanese', 'Conducting meetings and delivering technical presentations in Japanese']
      },
      {
        title: 'Module 3: Extended Reading & Kanji Mastery',
        description: 'Read op-eds, technical articles, and instructional manuals with ease.',
        items: ['650 Kanji characters with multi-syllable compound mastery', 'Skimming, scanning, and identifying the author\'s main assertion under time limits']
      },
      {
        title: 'Module 4: Audio Comprehension & Exam Strategy',
        description: 'Extensive audio drills with natural native cadence and background noise.',
        items: ['Point comprehension, summary comprehension, and quick response questions', '6 computer-based and offline simulated mock examinations']
      }
    ],
    faqs: [
      {
        question: 'Why is JLPT N3 considered the "turning point" for Japanese jobs?',
        answer: 'N3 is the benchmark where companies in Japan start hiring international software engineers and tech talent. It proves you can live independently in Japan and collaborate with Japanese team members without an interpreter.'
      },
      {
        question: 'Do you help with job placements upon clearing JLPT N3?',
        answer: 'Yes! Fuji Japanese Academy partners with leading recruitment agencies and Japanese IT enterprises in India and Tokyo. We assist with Japanese resume (Rirekisho) writing and mock interviews.'
      }
    ],
    metaTitle: 'JLPT N3 Coaching Online & Bangalore | Intermediate Japanese | Fuji Academy',
    metaDescription: 'Crack JLPT N3 with Fuji Japanese Academy. Bridge to business fluency with 650 Kanji, Keigo corporate communication, and job placement assistance. Book a free demo class.'
  },
  {
    id: 'c4',
    slug: 'jlpt-n2',
    title: 'JLPT N2 - Advanced Business & Professional',
    level: CourseLevel.Advanced,
    jlptLevel: 'N2',
    description: 'Achieve true business-level proficiency. Understand complex editorials, business negotiations, contract clauses, and television broadcasts with confidence.',
    duration: '6 Months',
    price: '₹40,200',
    originalPrice: 65000,
    discountPercent: 38,
    features: ['Advanced Keigo & Business Etiquette', '1,000+ Kanji Characters', 'Newspaper & Contract Reading', 'Corporate Interview Coaching'],
    image: '/images/courses/jlpt-n2.jpg',
    badge: 'Corporate Gold Standard',
    targetAudience: 'Engineers, translators, business consultants, and executives targeting high-salary positions in Japan.',
    prerequisites: 'JLPT N3 certification or passed diagnostic test.',
    kanjiCount: '1,000+ Kanji Characters',
    vocabularyCount: '6,000+ Words',
    grammarPoints: '150+ Advanced Grammar Structures',
    hoursRequired: '600-800 Study Hours',
    examPassingCriteria: 'Overall 90/180 points (minimum 19/60 in each section)',
    batchSchedule: ['Weekend Intensive: Sat & Sun (9:00 AM - 1:00 PM IST)'],
    syllabus: [
      {
        title: 'Module 1: Advanced Grammatical Structures & Written Nuances',
        description: 'Master formal literary patterns, business proposals, and legal terminology.',
        items: ['Formal written connectors: ~ni mo kakawarazu, ~wo motte, ~ni oite', 'Analyzing argument structures in academic and business prose']
      },
      {
        title: 'Module 2: 1,000+ Kanji & Business Vocabulary',
        description: 'Read Nikkei articles, corporate annual reports, and contractual agreements.',
        items: ['Advanced Kanji combinations, financial, legal, and tech industry terms']
      },
      {
        title: 'Module 3: Speed Reading for JLPT N2 Exam',
        description: 'Techniques to tackle long passages and opinion pieces within the 105-minute limit.',
        items: ['Comparative passage analysis, theme deduction, and time management drills']
      },
      {
        title: 'Module 4: Advanced Listening Drills & Mock Tests',
        description: 'High-speed audio with background office discussions and press conferences.',
        items: ['8 Full-length mock examinations with detailed individual feedback']
      }
    ],
    faqs: [
      {
        question: 'Does JLPT N2 qualify me for the Highly Skilled Professional (HSP) Visa?',
        answer: 'Yes! JLPT N2 awards 10 bonus points on Japan\'s Highly Skilled Professional immigration scorecard, expediting your path to Japan Permanent Residency (PR).'
      }
    ],
    metaTitle: 'JLPT N2 Course Online & Classroom | Advanced Japanese | Fuji Academy',
    metaDescription: 'Achieve business fluency with JLPT N2 training at Fuji Japanese Academy. 1000+ Kanji, Keigo mastery, contract reading & corporate placement support.'
  },
  {
    id: 'c5',
    slug: 'jlpt-n1',
    title: 'JLPT N1 - Near-Native Fluency & Mastery',
    level: CourseLevel.Advanced,
    jlptLevel: 'N1',
    description: 'The pinnacle of Japanese language certification. For professionals aiming for high-level legal/medical translation, diplomatic careers, or university research in Japan.',
    duration: '6 Months',
    price: '₹75,300',
    originalPrice: 120000,
    discountPercent: 37,
    features: ['2,000+ Kanji Mastery', 'Classical & Literary Expressions', 'Technical Translation Training', 'Bilingual Executive Mentorship'],
    image: '/images/courses/jlpt-n1.jpg',
    badge: 'Mastery Level',
    targetAudience: 'Senior translators, researchers, and candidates for Japanese bar/civil examinations.',
    prerequisites: 'JLPT N2 certification.',
    kanjiCount: '2,136 Joyo Kanji',
    vocabularyCount: '10,000+ Words',
    grammarPoints: '200+ Classical & Literary Patterns',
    hoursRequired: '900-1,200 Study Hours',
    examPassingCriteria: 'Overall 100/180 points (minimum 19/60 in each section)',
    batchSchedule: ['Weekend Batches: Sat & Sun (2:00 PM - 6:00 PM IST)'],
    syllabus: [
      {
        title: 'Module 1: Joyo Kanji & Classical Nuances',
        description: 'Complete mastery of all Joyo Kanji and archaic sentence endings.',
        items: ['Nuances in abstract editorials, political debates, and philosophy', '2,136 Kanji characters with obscure readings and historical origins']
      },
      {
        title: 'Module 2: Professional Translation & Interpretation',
        description: 'Simultaneous and consecutive interpretation fundamentals.',
        items: ['English-to-Japanese and Japanese-to-English translation accuracy drills']
      }
    ],
    faqs: [
      {
        question: 'What is the pass percentage of JLPT N1?',
        answer: 'Globally, the JLPT N1 pass rate hovers around 30%. At Fuji Japanese Academy, our intensive coaching methodology and 10 mock test series achieve an industry-leading 88% pass rate among enrolled students.'
      }
    ],
    metaTitle: 'JLPT N1 Course Coaching | Expert Japanese Certification | Fuji Academy',
    metaDescription: 'Master near-native Japanese with JLPT N1 coaching at Fuji Japanese Academy. 2000+ Kanji, literary grammar, technical translation, and executive mentorship.'
  },
  {
    id: 'c6',
    slug: 'spoken-japanese',
    title: 'Spoken Japanese & Conversational Fluency',
    level: CourseLevel.Special,
    description: 'Focus 100% on real-world speaking and listening skills. Ideal for travelers, anime enthusiasts, and business travelers who want to communicate without memorizing Kanji.',
    duration: '2 Months',
    price: '₹8,000',
    originalPrice: 15000,
    discountPercent: 47,
    features: ['Practical Conversational Dialogues', 'Pronunciation & Accent Training', 'Cultural Etiquette & Slang', 'Zero Kanji Required — Romaji Friendly'],
    image: '/images/courses/spoken-japanese.jpg',
    badge: 'Quick Conversational',
    targetAudience: 'Tourists traveling to Japan, anime/manga fans, spouses of professionals in Japan, and business delegates.',
    prerequisites: 'None! No script or prior knowledge required.',
    kanjiCount: '0 (Romaji & Spoken Audio based)',
    vocabularyCount: '600+ Everyday Spoken Words',
    grammarPoints: 'Essential Conversational Formulas',
    hoursRequired: '40 Study Hours',
    batchSchedule: [
      'Weekday Evening: Mon, Wed, Fri (8:30 PM - 9:30 PM IST)',
      'Weekend Morning: Sat & Sun (11:30 AM - 1:00 PM IST)'
    ],
    syllabus: [
      {
        title: 'Module 1: Essential Travel & Everyday Scenarios',
        description: 'Real-world simulations for navigation, restaurants, hotels, and shopping.',
        items: ['Ordering food at Izakayas, ramen shops, and convenience stores (Konbini)', 'Asking for directions in Tokyo stations, subways, and bullet trains (Shinkansen)', 'Checking into hotels, tax-free shopping, and emergency medical phrases']
      },
      {
        title: 'Module 2: Natural Pronunciation, Slang & Anime Expressions',
        description: 'Speak naturally without sounding like an old textbook.',
        items: ['Casual speech contractions: ~tte, ~chau, ~janai', 'Common anime expressions vs. polite real-life speech', 'Intonation, pitch accent fundamentals, and active listening reactions (Aizuchi)']
      }
    ],
    faqs: [
      {
        question: 'Do I need to learn Hiragana or Kanji for this course?',
        answer: 'No! This course is designed purely for speaking and listening. All materials use Romaji (English alphabet) and high-quality audio files so you can start conversing immediately.'
      },
      {
        question: 'Can I switch to JLPT N5 later after completing Spoken Japanese?',
        answer: 'Yes! Many of our students start with Spoken Japanese, fall in love with the language, and smoothly transition into our JLPT N5 certification course.'
      }
    ],
    metaTitle: 'Spoken Japanese Classes Online | Conversational Japanese | Fuji Academy',
    metaDescription: 'Learn spoken Japanese in 2 months with Fuji Japanese Academy. Focus on travel phrases, practical dialogue, pronunciation & anime expressions. Zero Kanji needed!'
  },
  {
    id: 'c7',
    slug: 'business-japanese',
    title: 'Business Japanese & Corporate Etiquette',
    level: CourseLevel.Intermediate,
    description: 'Master formal corporate communication, Keigo (honorific, humble, and polite speech), Japanese business emails, meeting negotiations, and Omotenashi workplace etiquette.',
    duration: '3 Months',
    price: '₹22,500',
    originalPrice: 38000,
    discountPercent: 41,
    features: ['Keigo (Honorific & Humble Speech)', 'Japanese Business Email Conventions', 'Meeting Conduct & Presentation Skills', 'Meishi (Business Card) & Office Etiquette'],
    image: '/images/courses/business-japanese.jpg',
    badge: 'Corporate Readiness',
    targetAudience: 'Working professionals in Japanese MNCs, bilingual project managers, IT liaisons, and executives relocating to Japan.',
    prerequisites: 'Basic knowledge of Japanese (JLPT N4 or completed N5 with conversational confidence).',
    kanjiCount: '250 Essential Business Kanji',
    vocabularyCount: '1,200+ Corporate Words & Phrases',
    grammarPoints: '50+ Formal Business Speech Patterns',
    hoursRequired: '80-100 Study Hours',
    batchSchedule: [
      'Weekend Evening: Sat & Sun (6:00 PM - 8:30 PM IST)',
      'Weekday Night: Tue & Thu (8:00 PM - 9:30 PM IST)'
    ],
    syllabus: [
      {
        title: 'Module 1: The Three Tiers of Keigo (Honorific Language)',
        description: 'Understand Sonkeigo (respectful), Kenjougo (humble), and Teineigo (polite) applications.',
        items: ['Transforming everyday verbs into honorific and humble counterparts (e.g., suru -> nasaru / itasu)', 'Common Keigo mistakes to avoid in front of Japanese clients and superiors']
      },
      {
        title: 'Module 2: Japanese Business Email & Written Correspondence',
        description: 'Format formal business emails according to Japanese corporate standards.',
        items: ['Opening greetings (Osewa ni natte orimasu), body structure, request phrasing, and polite sign-offs', 'Scheduling appointments, apologizing gracefully for delays, and submitting project status reports']
      },
      {
        title: 'Module 3: Office Manners, Phone Etiquette & Meishi Exchange',
        description: 'Invaluable real-world cultural protocols for Japanese corporate environments.',
        items: ['The sacred art of Meishi Koukan (business card exchange) and seating arrangements (Kamiza vs. Shimoza)', 'Receiving and transferring phone calls professionally in Japanese']
      },
      {
        title: 'Module 4: Client Meetings, Negotiations & Presentations',
        description: 'Presenting technical proposals and navigating consensus-building (Nemawashi).',
        items: ['Pitching ideas politely, handling objections with discretion, and closing discussions diplomatically']
      }
    ],
    faqs: [
      {
        question: 'Is this course suitable if I only have JLPT N5?',
        answer: 'Students with high N5 or conversational experience can join, though having completed N4 is ideal. We provide supplemental grammar sheets to ensure you follow all Keigo patterns.'
      },
      {
        question: 'Will I learn practical business email writing?',
        answer: 'Yes! Every student submits actual business email drafts that are reviewed line-by-line by native and bilingual instructors with corporate Tokyo experience.'
      }
    ],
    metaTitle: 'Business Japanese Course & Corporate Etiquette | Fuji Japanese Academy',
    metaDescription: 'Learn Business Japanese with Fuji Japanese Academy. Master Keigo, business email writing, client meetings, and corporate etiquette for Japanese MNCs. Book a demo!'
  },
  {
    id: 'c8',
    slug: 'japanese-for-it-professionals',
    title: 'Japanese for IT Professionals & Software Engineers',
    level: CourseLevel.Special,
    description: 'Purpose-built for software engineers, QA testers, and tech leads working with Japanese clients or preparing to relocate to Tokyo tech hubs. Learn IT yōgo, Agile standup updates, and tech interview skills.',
    duration: '3 Months',
    price: '₹24,000',
    originalPrice: 40000,
    discountPercent: 40,
    features: ['Software & Tech Vocabulary (IT Yōgo)', 'Agile Daily Standup & Sprint Japanese', 'Bug Tracking & Code Review Communication', 'Tokyo Tech Resume (Rirekisho) & Interview Prep'],
    image: '/images/courses/japanese-for-it-professionals.jpg',
    badge: 'High In-Demand',
    targetAudience: 'Software developers, QA engineers, cloud architects, scrum masters, and tech leads aiming for high-paying Tokyo IT jobs.',
    prerequisites: 'Elementary Japanese (N5 or beginner basics recommended; enthusiastic beginners welcome).',
    kanjiCount: '150 Key Tech Kanji',
    vocabularyCount: '900+ Technical IT Expressions',
    grammarPoints: '45+ Workplace Tech Patterns',
    hoursRequired: '90 Study Hours',
    batchSchedule: [
      'Weekend Morning: Sat & Sun (8:30 AM - 11:00 AM IST)',
      'Weekday Evening: Wed & Fri (8:00 PM - 9:30 PM IST)'
    ],
    syllabus: [
      {
        title: 'Module 1: Core IT & Software Engineering Terminology (IT Yōgo)',
        description: 'Master technical katakana loan words and native Kanji software terms.',
        items: ['Architecture, frontend/backend terms, deployment, database schemas, and CI/CD pipelines in Japanese', 'Pronunciation and Katakana phonetics for modern tech jargon (kuraudo, mikurosābisu, API)']
      },
      {
        title: 'Module 2: Agile Ceremonies & Daily Standup Dialogues',
        description: 'Deliver confident, concise status updates in Scrum meetings.',
        items: ['Reporting yesterday\'s completed tasks, today\'s deliverables, and blockers (shōgai / kadai)', 'Sprint planning, estimating user stories, and retro discussions in Japanese']
      },
      {
        title: 'Module 3: Code Reviews, Bug Reports & Jira/Slack Communication',
        description: 'Write clear Jira bug tickets, pull request descriptions, and Slack comments.',
        items: ['Describing reproduce steps, expected vs. actual behavior, and severity levels respectfully', 'Constructive PR reviews and accepting feedback using professional tech phrasing']
      },
      {
        title: 'Module 4: Tokyo Tech Job Interviews & Portfolio Presentation',
        description: 'Prepare your Japanese resume (Rirekisho & Shokumu Keirekisho) and crack interviews.',
        items: ['Articulating past technical projects, system design decisions, and problem-solving methodologies', 'Mock technical interviews with personalized feedback on cadence and clarity']
      }
    ],
    faqs: [
      {
        question: 'Why do Indian software engineers in Japan need specialized IT Japanese?',
        answer: 'While code is written in standard programming languages, team syncs, system requirements specifications (Yōken Teigi), Jira boards, and design reviews in Japanese companies are conducted entirely in Japanese. Knowing IT Yōgo sets you apart from 95% of candidates.'
      },
      {
        question: 'Does this course assist with job referrals in Tokyo?',
        answer: 'Yes! Fuji Japanese Academy has direct relationships with tech recruitment firms and IT consulting companies hiring engineers for Tokyo, Osaka, and Fukuoka.'
      }
    ],
    metaTitle: 'Japanese for IT Professionals & Software Engineers | Fuji Japanese Academy',
    metaDescription: 'Master Japanese for Software Engineers at Fuji Japanese Academy. Learn IT vocabulary, Agile standup Japanese, bug reports, and Tokyo tech interview preparation.'
  },
  {
    id: 'c9',
    slug: 'corporate-japanese-training',
    title: 'Corporate Japanese Training for Enterprises',
    level: CourseLevel.Special,
    description: 'Customized language and cross-cultural training programs tailored for multinational corporations, IT service providers, and engineering centers in Bengaluru and across India.',
    duration: 'Customized (1 to 6 Months)',
    price: 'Custom Corporate Quote',
    features: ['Tailored Industry-Specific Curriculum', 'Flexible Onsite (Bengaluru) or Remote Live', 'Pre & Post Assessment Benchmarking', 'Dedicated Account Manager & Attendance Analytics'],
    image: '/images/courses/corporate-japanese-training.jpg',
    badge: 'B2B Enterprise Solution',
    targetAudience: 'Engineering teams, global delivery centers, automotive R&D firms, and IT services companies with Japanese clients.',
    prerequisites: 'Customized per batch according to employee baseline assessment.',
    kanjiCount: 'Custom per program tier',
    vocabularyCount: 'Custom domain-specific',
    grammarPoints: 'Structured to client requirements',
    hoursRequired: 'Flexible (40 - 200 Hours)',
    batchSchedule: [
      'Flexible corporate hours scheduled according to client shift timings'
    ],
    syllabus: [
      {
        title: 'Module 1: Enterprise Baseline Assessment & Custom Path Design',
        description: 'Evaluate employee starting levels and design a bespoke roadmap.',
        items: ['Pre-training language diagnostics, milestone definition, and role-based learning tracks']
      },
      {
        title: 'Module 2: Cross-Cultural Business Sensitization (Ibunka Rikai)',
        description: 'Understand Japanese corporate culture, decision-making (Ringisho), and client expectations.',
        items: ['The concept of Hou-Ren-So (Report, Communicate, Consult), punctuality norms, and customer satisfaction']
      },
      {
        title: 'Module 3: Industry-Specific Language Coaching',
        description: 'Automotive, IT, FinTech, Semiconductor, or Pharma domain vocabulary.',
        items: ['Reading specifications, customer presentation rehearsals, and technical compliance discussions']
      },
      {
        title: 'Module 4: Performance Tracking & JLPT Certification Support',
        description: 'Continuous telemetry on employee progress and JLPT exam sponsorship preparation.',
        items: ['Monthly HR progress reports, attendance analytics, and simulated JLPT benchmarks']
      }
    ],
    faqs: [
      {
        question: 'Can classes be conducted at our office in Bengaluru?',
        answer: 'Yes! We conduct both onsite training at corporate campuses in Bengaluru (Electronic City, Outer Ring Road, Whitefield, Manyata) as well as interactive live virtual classes for distributed teams across India.'
      },
      {
        question: 'How do we request a corporate proposal and syllabus?',
        answer: 'You can submit an inquiry via our /enquire page or contact our corporate relations team directly at corporate@fujijapaneseacademy.com or +91 63649 24110.'
      }
    ],
    metaTitle: 'Corporate Japanese Language Training for Enterprises | Fuji Japanese Academy',
    metaDescription: 'Empower your engineering teams with Corporate Japanese training from Fuji Japanese Academy. Custom B2B training for IT companies in Bengaluru and online.'
  }
];

export const FACULTY: FacultyMember[] = [
  {
    id: 'f1',
    name: 'Hiroshi Tanaka',
    role: 'Head Instructor & Academic Director',
    bio: 'Native Tokyo speaker with 15+ years of teaching experience across Asia. Specializes in advanced JLPT prep and natural conversational cadence.',
    image: '/images/faculty/hiroshi-tanaka.jpg',
    badge: 'Native Japanese Sensei',
    experience: '15+ Years Exp',
    specialty: 'JLPT N2/N1 & Pronunciation'
  },
  {
    id: 'f2',
    name: 'Priya Sharma',
    role: 'Senior N1 Trainer & Lead Pedagogy',
    bio: 'Certified JLPT N1 holder and former corporate translator for Japanese multinational conglomerates in Tokyo and Bengaluru.',
    image: '/images/faculty/priya-sharma.jpg',
    badge: 'JLPT N1 Certified',
    experience: '10+ Years Exp',
    specialty: 'Kanji Mastery & Grammar'
  },
  {
    id: 'f3',
    name: 'Kenji Sato',
    role: 'Cultural Advisor & Corporate Coach',
    bio: 'Born in Osaka, specializing in Keigo (business honorifics), IT engineering workplace etiquette, and interview training for jobs in Japan.',
    image: '/images/faculty/kenji-sato.jpg',
    badge: 'Business Culture Specialist',
    experience: '12+ Years Exp',
    specialty: 'Keigo & Job Placement'
  },
    {
    id: 'f4',
    name: 'Shilpa S',
    role: 'Japanese Language Trainer',
    bio: 'Dedicated Japanese language trainer specializing in JLPT grammar, communicative sentence patterns, and foundational Japanese proficiency.',
    image: '/images/faculty/shilpa-s.jpg',
    badge: 'JLPT Trainer',
    experience: '7+ Years Exp',
    specialty: 'Beginner Foundations & JLPT Prep'
  },
  {
    id: 'f5',
    name: 'Vikram',
    role: 'Spoken Japanese & Phonetics Coach',
    bio: 'Dynamic language coach specializing in conversational fluency, anime Japanese idioms, and rapid speaking confidence for professionals.',
    image: '/images/faculty/vikram.jpg',
    badge: 'Conversation Specialist',
    experience: '6+ Years Exp',
    specialty: 'Spoken Fluency & Accent'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't1',
    name: 'Aditya Raj',
    role: 'Software Engineer',
    content: 'Fuji Academy helped me clear N3 in just one attempt. The teachers are incredibly supportive!',
    courseTaken: 'JLPT N3',
    avatar: '/images/testimonials/aditya-raj.jpg'
  },
  {
    id: 't2',
    name: 'Sneha Gupta',
    role: 'Student',
    content: 'I loved the cultural events. Learning Japanese is so much easier when you understand the context.',
    courseTaken: 'JLPT N5',
    avatar: '/images/testimonials/sneha-gupta.jpg'
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'b1',
    title: 'Top 5 Tips to Crack JLPT N5 in 3 Months',
    slug: 'complete-guide-to-jlpt-n5-exam-syllabus-strategy-passing-score',
    excerpt: 'Struggling with Kanji and particles? Here are our top strategies from native instructors to master the basics efficiently.',
    date: 'Sep 8, 2026',
    category: 'JLPT Preparation',
    image: '/images/courses/jlpt-n5.jpg'
  },
  {
    id: 'b2',
    title: 'Business Japanese & Etiquette Guide for IT Professionals',
    slug: 'business-japanese-etiquette-for-it-professionals-in-japan',
    excerpt: 'Master Keigo honorific speech, business card exchange (meishi koukan), and corporate communication in Japan.',
    date: 'Sep 7, 2026',
    category: 'Career & Culture',
    image: '/images/courses/business-japanese.jpg'
  },
  {
    id: 'b3',
    title: 'How to Learn Japanese in India: Career Pathways in Tokyo',
    slug: 'how-to-learn-japanese-in-india-career-opportunities',
    excerpt: 'A comprehensive roadmap for Indian engineers and students: JLPT benchmarks, IT demand, and work visas in Japan.',
    date: 'Sep 6, 2026',
    category: 'Learning Tips',
    image: '/images/courses/japanese-for-it-professionals.jpg'
  }
];

export { OPEN_POSITIONS } from './data/jobsData';
