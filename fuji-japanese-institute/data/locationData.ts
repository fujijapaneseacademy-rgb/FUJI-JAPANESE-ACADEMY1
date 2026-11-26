export interface LocationDetail {
  slug: string; // 'bangalore' | 'electronic-city' | 'koramangala' | 'indiranagar' | 'whitefield'
  title: string;
  heroHeadline: string;
  tagline: string;
  badge: string;
  address: string;
  subLocality?: string;
  postalCode?: string;
  geoCoordinates?: {
    latitude: number;
    longitude: number;
  };
  phone: string;
  email: string;
  visitingHours: string;
  overview: string;
  highlights: {
    title: string;
    description: string;
  }[];
  nearbyTechParks?: string[];
  jlptCenterInfo?: {
    centerName: string;
    location: string;
    transportTips: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
}

export const LOCATIONS_DATA: Record<string, LocationDetail> = {
  bangalore: {
    slug: 'bangalore',
    title: 'Japanese Language Classes in Bengaluru (Bangalore)',
    heroHeadline: 'Bengaluru’s Premier Japanese Language & JLPT Coaching Institute',
    tagline: 'Empowering India’s Tech Capital with Japanese Fluency',
    badge: 'Bengaluru Hub',
    address: 'Electronic City, 06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Karnataka 560100',
    subLocality: 'Electronic City / All Bengaluru',
    postalCode: '560100',
    geoCoordinates: {
      latitude: 12.8466666,
      longitude: 77.6711111
    },
    phone: '+91 63649 24110',
    email: 'info@fujijapaneseacademy.com',
    visitingHours: 'Monday – Sunday: 9:00 AM – 7:30 PM IST',
    overview: 'As the Silicon Valley of India, Bengaluru hosts the highest concentration of Japanese MNCs, bilateral IT delivery centers, and automotive R&D labs in the country. Fuji Japanese Academy provides premier JLPT N5–N1 training, spoken Japanese classes, and corporate language programs across Bengaluru through live interactive Zoom sessions and our Electronic City physical center.',
    highlights: [
      {
        title: 'Proximity to 45+ Japanese Tech Centers',
        description: 'Bengaluru is home to major engineering hubs including Rakuten India, Sony India Software Centre, Toyota Connected, Hitachi Energy, and Panasonic Innovation Labs.'
      },
      {
        title: 'Official Bangalore JLPT Test Center Support',
        description: 'The official JLPT in Bengaluru is conducted twice yearly at Bangalore University Jnana Bharathi Campus. We guide students through test registration, mock exams, and exam day logistics.'
      },
      {
        title: 'Hybrid Learning Flexibility',
        description: 'Whether you live in Whitefield, Indiranagar, HSR Layout, Koramangala, or Electronic City, attend our live interactive online batches or visit our Electronic City classroom.'
      },
      {
        title: 'Corporate B2B Language Training',
        description: 'Tailored enterprise Japanese training programs for software delivery teams and global in-house centers (GICs) across Bengaluru.'
      }
    ],
    nearbyTechParks: [
      'Electronic City Phase 1 & 2',
      'Embassy TechVillage (Outer Ring Road)',
      'Manyata Embassy Business Park (Hebbal)',
      'International Tech Park Bangalore (ITPB Whitefield)',
      'Prestige Tech Park & Cessna Business Park'
    ],
    jlptCenterInfo: {
      centerName: 'Bangalore University (Jnana Bharathi Campus)',
      location: 'Mysore Road, Bengaluru, Karnataka 560056',
      transportTips: 'Accessible via the Namma Metro Purple Line (Jnana Bharati Metro Station) directly to the university entrance.'
    },
    faqs: [
      {
        question: 'Where is the official JLPT examination held in Bengaluru?',
        answer: 'In Bengaluru, the JLPT is organized by the Bangalore Nihongo Kyooshikai (BNK) and held at the Jnana Bharathi Campus of Bangalore University (Mysore Road) on the first Sunday of July and December.'
      },
      {
        question: 'Can I learn Japanese online if I cannot travel to Electronic City?',
        answer: 'Yes! More than 60% of our Bengaluru students learn via live interactive Zoom batches. You get real-time speaking drills, teacher Q&A, and full recordings if you work unpredictable IT shifts.'
      },
      {
        question: 'What is the course fee for JLPT classes in Bangalore?',
        answer: 'JLPT N5 starts at budget-friendly student and professional rates, with installment payment plans, study materials, mock tests, and certification assistance included.'
      }
    ]
  },
  'electronic-city': {
    slug: 'electronic-city',
    title: 'Japanese Language Classes in Electronic City, Bengaluru',
    heroHeadline: 'Japanese Coaching & JLPT Institute in Electronic City Phase 1',
    tagline: 'Walking Distance from Major IT Campuses & Tech Parks',
    badge: 'Physical Classroom Center',
    address: 'Electronic City, 06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Karnataka 560100',
    subLocality: 'Electronic City Phase 1',
    postalCode: '560100',
    geoCoordinates: {
      latitude: 12.8466666,
      longitude: 77.6711111
    },
    phone: '+91 63649 24110',
    email: 'info@fujijapaneseacademy.com',
    visitingHours: 'Monday – Sunday: 9:00 AM – 7:30 PM IST',
    overview: 'Located at Vittasandra Cross, Hemavathi Block, Electronic City Phase 1, Bettadasanapura, Fuji Japanese Academy’s physical classroom center offers state-of-the-art multimedia classrooms, an extensive Japanese book and manga library, and regular weekend batch sessions tailored for tech professionals in Electronic City.',
    highlights: [
      {
        title: 'Prime Tech Hub Location',
        description: 'Steps away from Infosys, Wipro, Tech Mahindra, Siemens, Tata Consultancy Services, and Hewlett Packard Enterprise.'
      },
      {
        title: 'Physical Japanese Library & Study Lounge',
        description: 'Browse over 300 original Japanese textbooks, JLPT prep workbooks, graded readers, and manga collections.'
      },
      {
        title: 'Weekend & Evening Batches for Engineers',
        description: 'Batches scheduled on Saturday and Sunday mornings/afternoons to accommodate IT work schedules with zero work interference.'
      },
      {
        title: 'Direct Metro & Expressway Connectivity',
        description: 'Convenient access via the Electronic City Elevated Expressway and the Yellow Line Metro.'
      }
    ],
    nearbyTechParks: [
      'Infosys Electronic City Campus (Opposite)',
      'Wipro Technologies Campus (5 mins)',
      'Tech Mahindra Electronics City (3 mins)',
      'Siemens Electronic City (7 mins)',
      'Velankani Tech Park & Cyber Park'
    ],
    faqs: [
      {
        question: 'Can I visit the Electronic City center for a free in-person counseling session?',
        answer: 'Yes! You are welcome to walk in Monday through Sunday (9:00 AM to 7:30 PM). Meet our faculty, review our Minna no Nihongo and Shin Kanzen study materials, and take a free level evaluation.'
      },
      {
        question: 'Is parking available at the Electronic City center?',
        answer: 'Yes, designated parking for two-wheelers and four-wheelers is available directly at our campus premises at Vittasandra Cross, Electronic City Phase 1.'
      },
      {
        question: 'How far is the center from Infosys and Wipro gates?',
        answer: 'Our academy is situated right at Vittasandra Cross, approximately 5 to 8 minutes from Infosys Gate 1 and Wipro Electronic City campus.'
      }
    ]
  },
  koramangala: {
    slug: 'koramangala',
    title: 'Japanese Language Classes in Koramangala, Bengaluru',
    heroHeadline: 'Premier Japanese Language & JLPT Coaching for Koramangala Tech Pros',
    tagline: 'Master Japanese in Bengaluru’s Vibrant Startup & Tech Corridor',
    badge: 'Koramangala Hub',
    address: 'Accessible from Koramangala 1st to 8th Blocks; Classroom Hub in Electronic City (15 mins via Elevated Tollway) + Live Online Batches',
    subLocality: 'Koramangala',
    postalCode: '560034',
    geoCoordinates: {
      latitude: 12.9352,
      longitude: 77.6245
    },
    phone: '+91 63649 24110',
    email: 'info@fujijapaneseacademy.com',
    visitingHours: 'Monday – Sunday: 9:00 AM – 7:30 PM IST',
    overview: 'Koramangala is the innovation heartbeat of Bengaluru, housing startup founders, tech unicorns, and Japanese venture-backed enterprises. Fuji Japanese Academy delivers flexible hybrid and live interactive online Japanese training for software engineers, product managers, and consultants across Koramangala Blocks 1 through 8.',
    highlights: [
      {
        title: 'Direct Expressway Commute to Physical Center',
        description: 'Reach our Electronic City physical campus in just 15 minutes straight down the Hosur Road Elevated Tollway from Silk Board / Koramangala.'
      },
      {
        title: 'Engineered for Koramangala Tech Schedules',
        description: 'Interactive evening and weekend batches allowing startup builders and software leads to learn without interrupting release cycles.'
      },
      {
        title: 'Startup & Tech Translation Opportunities',
        description: 'Specialized modules in Business Japanese (Keigo), technical documentation, and cross-border collaboration with Tokyo engineering teams.'
      },
      {
        title: 'Native Japanese Faculty & JLPT Guarantee',
        description: 'Comprehensive coaching from JLPT N5 to N1 with mock tests mirroring the official Bangalore JLPT exam standards.'
      }
    ],
    nearbyTechParks: [
      'Embassy GolfLinks Business Park (EGL Domlur/Koramangala)',
      'Bosch Koramangala Campus',
      'Flipkart & Myntra Corporate Campuses',
      'Prestige Blue Chip & Salarpuria Tech Parks',
      'Silk Board Tech Corridor'
    ],
    jlptCenterInfo: {
      centerName: 'Bangalore University (Jnana Bharathi Campus)',
      location: 'Mysore Road, Bengaluru, Karnataka 560056',
      transportTips: 'Quick transit via Green Line to Majestic or Purple Line interchange directly to Jnana Bharati Metro Station.'
    },
    faqs: [
      {
        question: 'Are there Japanese classes physically in Koramangala or online?',
        answer: 'We provide high-impact live interactive online batches with native instructors for Koramangala students, with optional offline classroom access at our Electronic City center just 15 minutes via the Elevated Expressway.'
      },
      {
        question: 'Can I balance JLPT prep with high-pressure tech startup hours?',
        answer: 'Yes! Our weekend batches (Saturday & Sunday) and recorded session repository are crafted specifically for high-intensity startup engineers and managers.'
      },
      {
        question: 'Do you help Koramangala engineers get recruited by Japanese tech firms?',
        answer: 'Yes. We provide bilingual resume formatting, technical mock interviews, and direct referrals to Japanese MNCs including Rakuten, Mercari, and Sony.'
      }
    ]
  },
  indiranagar: {
    slug: 'indiranagar',
    title: 'Japanese Language Classes in Indiranagar, Bengaluru',
    heroHeadline: 'Executive Japanese Coaching & JLPT Prep in Indiranagar',
    tagline: 'Direct Metro Connectivity to Central Bangalore & JLPT Test Center',
    badge: 'Indiranagar Hub',
    address: 'Serving 100 Feet Road, 12th Main, CMH Road Indiranagar; Direct Metro to Jnana Bharathi JLPT Center & Hybrid Classroom Options',
    subLocality: 'Indiranagar',
    postalCode: '560038',
    geoCoordinates: {
      latitude: 12.9784,
      longitude: 77.6408
    },
    phone: '+91 63649 24110',
    email: 'info@fujijapaneseacademy.com',
    visitingHours: 'Monday – Sunday: 9:00 AM – 7:30 PM IST',
    overview: 'Indiranagar is Bengaluru’s premier commercial and executive district, home to senior engineering directors, expats, and cross-border consultants. Fuji Japanese Academy offers executive-tier Japanese language and cultural immersion programs for Indiranagar residents and professionals across CMH Road, 100 Feet Road, and surrounding tech zones.',
    highlights: [
      {
        title: 'Purple Line Direct Metro Access to JLPT Test Center',
        description: 'Indiranagar Metro Station connects directly on the Purple Line straight to Jnana Bharati Metro Station—the official exam center at Bangalore University.'
      },
      {
        title: 'Executive Japanese & Keigo for Senior Leaders',
        description: 'Focused programs in Business Japanese, Hou-Ren-So communication, and executive stakeholder negotiation with Tokyo headquarters.'
      },
      {
        title: 'Proximity to Bagmane Tech Park & EGL',
        description: 'Ideal for tech leaders and consultants commuting from Bagmane Tech Park (CV Raman Nagar) and Embassy GolfLinks.'
      },
      {
        title: 'Small Cohort Personalized Mentorship',
        description: 'Interactive batches capped at small groups ensuring 1-on-1 pronunciation coaching and conversational fluency drills.'
      }
    ],
    nearbyTechParks: [
      'Bagmane Tech Park (CV Raman Nagar / Indiranagar)',
      'Embassy GolfLinks Business Park (EGL)',
      'RMZ Infinity (Old Madras Road)',
      'Kalyani Tech Park',
      'Old Airport Road Tech Corridor'
    ],
    jlptCenterInfo: {
      centerName: 'Bangalore University (Jnana Bharathi Campus)',
      location: 'Mysore Road, Bengaluru, Karnataka 560056',
      transportTips: 'Direct zero-transfer ride from Indiranagar Metro Station to Jnana Bharati Metro Station on the Namma Metro Purple Line.'
    },
    faqs: [
      {
        question: 'Why is Indiranagar ideal for students taking the JLPT exam?',
        answer: 'Indiranagar is directly on the Purple Line Namma Metro, providing a smooth single-train ride straight to Jnana Bharati station right outside the Bangalore University official JLPT exam hall.'
      },
      {
        question: 'Do you offer 1-on-1 private tutoring for Indiranagar executives?',
        answer: 'Yes, we provide tailored 1-on-1 executive coaching focusing on business negotiations, intercultural leadership, and high-frequency technical Japanese.'
      },
      {
        question: 'Can I join free demo sessions before committing?',
        answer: 'Absolutely. You can schedule a 1-on-1 counseling and demo session with our native faculty directly on our website.'
      }
    ]
  },
  whitefield: {
    slug: 'whitefield',
    title: 'Japanese Language Classes in Whitefield, Bengaluru',
    heroHeadline: 'Premier JLPT Coaching for Whitefield Tech Parks & Automotive R&D',
    tagline: 'Empowering Engineers at ITPB, EPIP Zone, and Japanese R&D Labs',
    badge: 'Whitefield Hub',
    address: 'Serving ITPB, EPIP Zone, ITPL Main Road Whitefield; Direct Purple Line Metro & Live Interactive Batches',
    subLocality: 'Whitefield / ITPB',
    postalCode: '560066',
    geoCoordinates: {
      latitude: 12.9698,
      longitude: 77.7500
    },
    phone: '+91 63649 24110',
    email: 'info@fujijapaneseacademy.com',
    visitingHours: 'Monday – Sunday: 9:00 AM – 7:30 PM IST',
    overview: 'Whitefield is the epicenter of Bengaluru’s international IT hubs and automotive electronics innovation, housing major Japanese engineering centers such as Toyota Connected, Hitachi, Honda R&D, and Denso partners. Fuji Japanese Academy provides comprehensive JLPT N5–N1 coaching and specialized Automotive/IT Japanese programs for Whitefield engineers.',
    highlights: [
      {
        title: 'Catering to Japanese Automotive & IT MNCs',
        description: 'Specialized technical Japanese curriculum tailored for embedded systems, automotive firmware, robotics, and cloud engineering.'
      },
      {
        title: 'Namma Metro Purple Line Direct Link',
        description: 'Whitefield (Kadugodi) Metro connects seamlessly across the city and right to the Jnana Bharathi JLPT exam center.'
      },
      {
        title: 'Custom B2B Corporate Batches for Tech Teams',
        description: 'On-site and live virtual group training programs for IT companies located in ITPB, EPIP Zone, and Prestige Shantiniketan.'
      },
      {
        title: 'Japan Work Visa & Career Fast-Track',
        description: 'Direct pipeline for Whitefield software engineers aiming for relocation to Tokyo, Nagoya, and Osaka technology centers.'
      }
    ],
    nearbyTechParks: [
      'International Tech Park Bangalore (ITPB / ITPL)',
      'EPIP Zone Whitefield',
      'Prestige Shantiniketan Commercial Complex',
      'Sigma Soft Tech Park',
      'Brigade Tech Park & GR Tech Park'
    ],
    jlptCenterInfo: {
      centerName: 'Bangalore University (Jnana Bharathi Campus)',
      location: 'Mysore Road, Bengaluru, Karnataka 560056',
      transportTips: 'Direct journey from Whitefield (Kadugodi) Metro Station on the Purple Line directly to Jnana Bharati Metro Station without changing trains.'
    },
    faqs: [
      {
        question: 'Do you offer Japanese classes tailored for automotive and embedded engineers in Whitefield?',
        answer: 'Yes! We offer specialized Technical & Automotive Japanese training covering Japanese engineering vocabulary, specification sheet reading, and client communication for engineers working with Japanese OEMs.'
      },
      {
        question: 'How do Whitefield students attend classes without traffic delays?',
        answer: 'Most Whitefield engineers attend our live interactive weekend batches on Zoom. You get native Japanese instructor guidance, live speaking practice, and HD recordings without battling Silk Board or Outer Ring Road traffic.'
      },
      {
        question: 'What JLPT level is needed for software engineer jobs in Japan?',
        answer: 'Most Tokyo tech employers require JLPT N3 or N2 certification along with practical conversational skills. Fuji Japanese Academy has guided over 120+ software engineers to successful Japan relocation.'
      }
    ]
  }
};
