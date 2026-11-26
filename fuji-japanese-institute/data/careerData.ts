export interface CareerArticle {
  slug: string;
  title: string;
  badge: string;
  readTime: string;
  excerpt: string;
  heroImage: string;
  contentModules: {
    heading: string;
    text: string;
    bulletPoints?: string[];
    calloutBox?: {
      title: string;
      body: string;
      linkText?: string;
      linkUrl?: string;
    };
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const CAREER_ARTICLES: Record<string, CareerArticle> = {
  'japanese-for-it': {
    slug: 'japanese-for-it',
    title: 'Japanese for IT Professionals: Roadmap to Landing Software Engineering Jobs in Tokyo',
    badge: 'Tech Careers',
    readTime: '7 min read',
    excerpt: 'Japan is experiencing a severe deficit of over 400,000 software engineers. Learn how mastering Japanese to JLPT N3 or N2 unlocks high-paying developer roles in Tokyo.',
    heroImage: '/images/courses/japanese-for-it-professionals.jpg',
    contentModules: [
      {
        heading: 'Why Japan is Actively Recruiting Indian Tech Talent',
        text: 'With an aging domestic population and rapid digital transformation across automotive, banking, and retail, Japan\'s Ministry of Economy, Trade and Industry (METI) estimates a shortage of nearly 450,000 IT professionals by 2030. Companies in Tokyo, Osaka, and Fukuoka are heavily scouting Indian software engineers, cloud architects, and data scientists.',
        bulletPoints: [
          'High demand for full-stack JavaScript (React/Next.js/Node), Python, Go, Java, and AWS/GCP cloud engineers.',
          'Average tech salary ranges from ¥6,000,000 to ¥12,000,000 (~₹35,00,000 to ₹70,00,000+ per year).',
          'Fast-track Permanent Residency (PR) in just 1 to 3 years under the Highly Skilled Professional (HSP) visa.'
        ]
      },
      {
        heading: 'The Required Japanese Level: What Recruiters Actually Expect',
        text: 'While a handful of global companies (like Mercari and Rakuten) operate in English, over 90% of tech firms in Japan require functional Japanese. Passing JLPT N3 or N2 signals that you can understand Jira specifications, write clear pull request summaries, and attend daily standup syncs without friction.',
        calloutBox: {
          title: 'The N3 Sweet Spot',
          body: 'You do NOT need perfect native Japanese. Demonstrating JLPT N3 proficiency alongside solid coding capabilities places you in the top 5% of international applicant pools.'
        }
      },
      {
        heading: 'Essential Japanese IT Terminology (IT Yōgo)',
        text: 'Software engineering in Japan uses a blend of Katakana loanwords and native Kanji compounds. Learning these early makes technical documentation effortless:',
        bulletPoints: [
          '仕様書 (Shiyousho) - System Requirement Specifications',
          '開発 (Kaihatsu) - Software Development',
          '不具合 / バグ (Fuguai / Bagu) - Bug or Defect',
          'デプロイ (Depuroi) - Deployment',
          '確認 (Kakunin) - Verification or confirmation'
        ]
      },
      {
        heading: 'Tokyo Software Engineer Salary Benchmarks by JLPT Level (2026)',
        text: 'Compensation in Tokyo technology companies is heavily tied to Japanese communication proficiency. Here is the benchmark compensation across experience tiers:',
        bulletPoints: [
          'Junior Developer (1–3 yrs, JLPT N4–N3): ¥4,500,000 – ¥6,500,000 (~₹25L – ₹36L INR CTC)',
          'Mid-Level Engineer (3–6 yrs, JLPT N3–N2): ¥6,500,000 – ¥9,500,000 (~₹36L – ₹53L INR CTC)',
          'Senior Engineer / Architect (6–10 yrs, JLPT N2): ¥9,500,000 – ¥14,000,000 (~₹53L – ₹78L INR CTC)',
          'Bilingual Tech Lead / Engineering Manager (JLPT N2–N1): ¥14,000,000 – ¥20,000,000+ (~₹78L – ₹1.12 Cr+ INR CTC)'
        ],
        calloutBox: {
          title: 'The Bilingual Premium',
          body: 'Software engineers with verified JLPT N3/N2 credentials command 35% to 50% higher compensation in Japan because they eliminate translation friction during Scrum planning.'
        }
      }
    ],
    faqs: [
      {
        question: 'Do Japanese tech companies sponsor work visas for Indian engineers?',
        answer: 'Yes! Standard procedure is for the Japanese employer to sponsor a Certificate of Eligibility (COE) under the "Engineer / Specialist in Humanities" visa, which is converted to a visa at the Japanese embassy/consulate in India.'
      },
      {
        question: 'Can I find a job in Japan while still living in India?',
        answer: 'Absolutely. Most interviews are conducted virtually via Zoom or Google Meet. Fuji Academy partners with bilateral recruitment agencies to connect N3/N2 students directly with hiring managers.'
      }
    ]
  },
  'working-in-japan': {
    slug: 'working-in-japan',
    title: 'Complete Guide to Japan Work Visas, Taxes & Living Costs for Foreigners',
    badge: 'Visa & Life in Japan',
    readTime: '9 min read',
    excerpt: 'Everything you need to know about Engineer Visas, Specified Skilled Worker (SSW) programs, tax brackets, national healthcare, and living expenses in Tokyo.',
    heroImage: '/images/courses/business-japanese.jpg',
    contentModules: [
      {
        heading: 'Key Work Visa Categories for Indian Nationals',
        text: 'Japan offers transparent, merit-based visa pathways for professionals across engineering, skilled trades, and executive management:',
        bulletPoints: [
          'Engineer / Specialist in Humanities / International Services Visa: The standard visa for university graduates with tech, consulting, or marketing backgrounds.',
          'Specified Skilled Worker (SSW 1 & SSW 2): For candidates with JLPT N4 or JFT-Basic skills entering nursing care, hospitality, construction, food manufacturing, and aviation.',
          'Highly Skilled Professional (HSP) Visa: A points-based system granting 5-year residency and an accelerated 1-year path to Japan Permanent Residency (PR).'
        ]
      },
      {
        heading: 'Living Costs & Quality of Life: Tokyo vs. Regional Cities',
        text: 'Japan offers some of the highest safety, cleanest transit systems, and best healthcare in the world. While Tokyo rent is higher, regional hubs like Fukuoka, Kyoto, and Sendai offer affordable living with vibrant tech ecosystems.',
        bulletPoints: [
          'Average Tokyo 1K apartment rent: ¥70,000 to ¥100,000/month (~₹40,000 to ₹58,000).',
          'National Health Insurance (Shakai Hoken): Covers 70% of medical and dental expenses automatically.',
          'World-class public transit: Punctual subways and Shinkansen bullet trains.'
        ]
      }
    ],
    faqs: [
      {
        question: 'Can I bring my family/spouse to Japan on a work visa?',
        answer: 'Yes! Holders of the "Engineer/Specialist in Humanities" and "Highly Skilled Professional" visas can bring their spouse and dependent children under the Dependent Visa.'
      }
    ]
  },
  'japanese-jobs': {
    slug: 'japanese-jobs',
    title: 'Top Japanese Companies Hiring Foreign Talent & Best Job Portals',
    badge: 'Job Search',
    readTime: '6 min read',
    excerpt: 'Discover the top MNCs and tech startups hiring bilingual professionals in Tokyo, hiring seasons, and the best job boards for international candidates.',
    heroImage: '/images/courses/corporate-japanese-training.jpg',
    contentModules: [
      {
        heading: 'Top Enterprises Actively Hiring International Talent',
        text: 'Global Japanese conglomerates and high-growth internet companies consistently hire bilingual engineers and coordinators:',
        bulletPoints: [
          'Mercari & PayPay: Mobile commerce and fintech leaders with hybrid English/Japanese engineering cultures.',
          'Rakuten Group: E-commerce and fintech giant based in Futako-Tamagawa, Tokyo.',
          'Sony, Panasonic & Toyota: Automotive IoT, robotics, and embedded systems engineering.',
          'Global IT Services: Wipro Japan, TCS Japan, Infosys Japan, and Cognizant Tokyo delivery centers.'
        ]
      },
      {
        heading: 'Recommended Job Boards for Japan',
        text: 'Use these verified platforms to find openings with visa sponsorship:',
        bulletPoints: [
          'Daijob.com & CareerCross: Leading portals for bilingual English-Japanese professionals.',
          'TokyoDev & Japan Dev: Dedicated platforms for software engineering roles with transparent salary ranges.',
          'Wantedly & LinkedIn: Great for connecting directly with startup founders and hiring leads.'
        ]
      },
      {
        heading: 'Bilateral Corporate Sales & Business Development in India (NCR & Bengaluru Hubs)',
        text: 'Beyond developer opportunities in Tokyo, Japanese industrial corridors across Manesar, Gurugram, Neemrana, and Bengaluru are witnessing explosive demand for bilingual Executive Sales and Business Development managers. Roles require JLPT N2 or N1 plus an MBA, offering starting packages of ₹6 to ₹10+ LPA CTC.',
        bulletPoints: [
          'High demand across automotive components, electronics, factory automation, and IT GCC sectors.',
          'Key responsibilities: Japanese client liaison, contract negotiations, quotation drafting, and Japanese stakeholder alignment.',
          'Active direct hiring: Fuji Japanese Academy is currently hiring an Executive Sales / Business Development professional in Manesar, Haryana (6-10 LPA CTC).'
        ],
        calloutBox: {
          title: 'Direct Opening Alert: Executive Sales (Manesar, Haryana)',
          body: 'Looking for a lucrative Japan Sales career? Check out our open Executive Sales / Business Development position on our Careers portal (JLPT N2/N1 + MBA required). Direct email application available at fujijapaneseacademy@gmail.com.',
          linkText: 'View Role Details & Apply Now',
          linkUrl: '/careers#executive-sales-manesar'
        }
      }
    ],
    faqs: [
      {
        question: 'When is the main hiring season in Japan?',
        answer: 'Japan has two primary hiring cycles: the main Spring cycle (April start) and the Autumn cycle (October start). However, mid-career (Chuto Saiyo) tech hiring happens year-round.'
      }
    ]
  },
  'japanese-job-interview': {
    slug: 'japanese-job-interview',
    title: 'How to Ace a Japanese Job Interview: Rirekisho & Etiquette Guide',
    badge: 'Interview Mastery',
    readTime: '8 min read',
    excerpt: 'Step-by-step instructions for writing a Japanese resume (Rirekisho), structuring your Jikoshoukai (self-introduction), and mastering online interview manners.',
    heroImage: '/images/courses/jlpt-n2.jpg',
    contentModules: [
      {
        heading: 'Understanding the Japanese Resume: Rirekisho vs. Shokumu Keirekisho',
        text: 'Japanese job applications require two distinct documents:',
        bulletPoints: [
          '履歴書 (Rirekisho): Standard biographical form including date of birth, formal headshot photo, educational chronology, certifications (JLPT), and reason for applying (Shibou Douki).',
          '職務経歴書 (Shokumu Keirekisho): Detailed professional work history, technical stack proficiencies, project outcomes, and measurable achievements.'
        ]
      },
      {
        heading: 'Mastering the 1-Minute Jikoshoukai (Self-Introduction)',
        text: 'Every Japanese interview begins with "Jikoshoukai wo onegai shimasu". Structure your answer in three smooth parts:',
        bulletPoints: [
          '1. Name and nationality greeting: はじめまして、ラフルと申します。(Hajimemashite, Rahuru to moushimasu).',
          '2. Current role & experience: インドで5年間フルスタックエンジニアとして働いております。(I have worked as a full-stack engineer in India for 5 years).',
          '3. Courteous closing: 本日はよろしくお願いいたします。(Honjitsu wa yoroshiku onegai itashimasu).'
        ]
      }
    ],
    faqs: [
      {
        question: 'Do I need to wear formal business attire for a virtual interview with a Japanese company?',
        answer: 'Yes! Always wear a clean business suit (dark jacket, white shirt, and tie for men; dark blazer for women) even for Zoom interviews.'
      }
    ]
  }
};
