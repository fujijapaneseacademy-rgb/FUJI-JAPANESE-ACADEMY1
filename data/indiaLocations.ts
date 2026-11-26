export interface IndiaLocation {
  cityName: string;
  slug: string;
  state: string;
  country: string;
  nativeLanguageSupport: string; // e.g., 'Kannada, Tamil & English', 'Malayalam & English', etc.
  popularPrograms: string[];
  localContext: string;
  heroHeadline?: string;
  deliveryMode: 'Offline Campus & Online' | 'Live Online Interactive & Tokyo Pathways';
  isPhysicalCampus?: boolean;
}

export interface StateLocationGroup {
  stateName: string;
  slug: string;
  posterImage: string;
  tagline: string;
  description: string;
  landmarks: string[];
  cities: IndiaLocation[];
}

export const INDIA_LOCATIONS: IndiaLocation[] = [
  // --- KARNATAKA ---
  {
    cityName: 'Bengaluru',
    slug: 'bangalore',
    state: 'Karnataka',
    country: 'India',
    nativeLanguageSupport: 'Kannada, English & Hindi',
    popularPrograms: ['JLPT N5-N1', 'Bilingual IT Engineer', 'Study in Japan', 'Corporate Keigo'],
    localContext: 'Bengaluru is India’s Silicon Valley, home to 45+ Japanese tech firms including Rakuten, Sony, Toyota, and Hitachi. Attend classes at our Electronic City classroom or live online.',
    deliveryMode: 'Offline Campus & Online',
    isPhysicalCampus: true
  },
  {
    cityName: 'Electronic City',
    slug: 'electronic-city',
    state: 'Karnataka',
    country: 'India',
    nativeLanguageSupport: 'Kannada, English & Hindi',
    popularPrograms: ['JLPT N5-N1', 'Weekend Batches', 'Corporate Training', 'IT Keigo'],
    localContext: 'Our physical headquarters at Vittasandra Cross, Phase 1 Electronic City offers state-of-the-art audiovisual classrooms, a curated Manga/Kanji library, and native senseis.',
    deliveryMode: 'Offline Campus & Online',
    isPhysicalCampus: true
  },
  {
    cityName: 'Koramangala',
    slug: 'koramangala',
    state: 'Karnataka',
    country: 'India',
    nativeLanguageSupport: 'Kannada, English & Hindi',
    popularPrograms: ['JLPT N5-N3', 'Weekend Fast-Track', 'Startup & Tech Placements'],
    localContext: 'Tailored weekend & evening batches for tech startup professionals in Koramangala with direct commuting access to our Electronic City campus or Zoom live rooms.',
    deliveryMode: 'Offline Campus & Online',
    isPhysicalCampus: false
  },
  {
    cityName: 'Indiranagar',
    slug: 'indiranagar',
    state: 'Karnataka',
    country: 'India',
    nativeLanguageSupport: 'Kannada, English & Hindi',
    popularPrograms: ['JLPT N5-N2', 'Spoken Japanese', 'MEXT Scholarships'],
    localContext: 'Flexible hybrid schedules for professionals and students across East Bengaluru with seamless Purple Line Metro connectivity to official Bengaluru JLPT test centers.',
    deliveryMode: 'Offline Campus & Online',
    isPhysicalCampus: false
  },
  {
    cityName: 'Whitefield',
    slug: 'whitefield',
    state: 'Karnataka',
    country: 'India',
    nativeLanguageSupport: 'Kannada, English & Hindi',
    popularPrograms: ['Japanese for IT Professionals', 'JLPT N3 / N2', 'Corporate GCC Batches'],
    localContext: 'Ideal for software engineers working in ITPB and EPIP Zone seeking high-paying bilingual developer jobs in Tokyo MNCs with full visa sponsorship.',
    deliveryMode: 'Offline Campus & Online',
    isPhysicalCampus: false
  },
  {
    cityName: 'Mysuru',
    slug: 'mysuru',
    state: 'Karnataka',
    country: 'India',
    nativeLanguageSupport: 'Kannada & English',
    popularPrograms: ['JLPT N5-N3', 'Study in Japan', 'Engineering Bridge'],
    localContext: 'Direct live online interactive batches for engineering students from NIE, SJCE, and Mysore University with complete MEXT scholarship guidance.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Mangaluru',
    slug: 'mangaluru',
    state: 'Karnataka',
    country: 'India',
    nativeLanguageSupport: 'Kannada, Tulu & English',
    popularPrograms: ['JLPT N5-N3', 'Healthcare SSW Visa', 'Study Abroad'],
    localContext: 'Live interactive classes with certified senseis for coastal Karnataka learners pursuing nursing SSW visas and Japanese tech degrees.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Hubballi-Dharwad',
    slug: 'hubballi',
    state: 'Karnataka',
    country: 'India',
    nativeLanguageSupport: 'Kannada & English',
    popularPrograms: ['JLPT N5-N4', 'Engineering Fast-Track', 'Student Visa'],
    localContext: 'Empowering North Karnataka’s top engineering minds with JLPT coaching and direct interview pathways to Tokyo manufacturing and IT firms.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },

  // --- TAMIL NADU ---
  {
    cityName: 'Chennai',
    slug: 'chennai',
    state: 'Tamil Nadu',
    country: 'India',
    nativeLanguageSupport: 'Tamil & English',
    popularPrograms: ['JLPT N5-N1', 'Automotive Japanese', 'ABK-AOTS JLPT Prep', 'SSW Visa'],
    localContext: 'Chennai is the Detroit of India and hosts massive Japanese automotive and electronics investments. Our students benefit from Tamil-to-Japanese bilingual grammatical parallels (SOV word order).',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Coimbatore',
    slug: 'coimbatore',
    state: 'Tamil Nadu',
    country: 'India',
    nativeLanguageSupport: 'Tamil & English',
    popularPrograms: ['JLPT N5-N3', 'Mechanical & Embedded Japanese', 'Higher Studies Japan'],
    localContext: 'Targeted batches for Coimbatore’s premier engineering and textile colleges with native speaking practice and official JLPT mock exam series.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Madurai',
    slug: 'madurai',
    state: 'Tamil Nadu',
    country: 'India',
    nativeLanguageSupport: 'Tamil & English',
    popularPrograms: ['JLPT N5-N4', 'Study in Japan', 'Specified Skilled Worker (SSW)'],
    localContext: 'Structured live online training helping South Tamil Nadu youth secure Japanese employment opportunities in tech and skilled sectors.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Tiruchirappalli (Trichy)',
    slug: 'trichy',
    state: 'Tamil Nadu',
    country: 'India',
    nativeLanguageSupport: 'Tamil & English',
    popularPrograms: ['JLPT N5-N3', 'NIT Trichy Pathways', 'Japan University Admissions'],
    localContext: 'Specialized coaching cohorts for Trichy university and engineering scholars targeting Tokyo internships, research scholarships, and bilateral jobs.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Salem',
    slug: 'salem',
    state: 'Tamil Nadu',
    country: 'India',
    nativeLanguageSupport: 'Tamil & English',
    popularPrograms: ['JLPT N5-N4', 'Technical Japanese', 'SSW Visa'],
    localContext: 'Comprehensive beginner to intermediate online coaching with flexible morning and evening hours for Salem learners.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Krishnagiri',
    slug: 'krishnagiri',
    state: 'Tamil Nadu',
    country: 'India',
    nativeLanguageSupport: 'Tamil, Telugu & English',
    popularPrograms: ['JLPT N5-N3', 'Automotive Corridors', 'Bengaluru Campus Commute'],
    localContext: 'Located adjacent to Hosur and Electronic City Bengaluru, Krishnagiri students can attend our Bengaluru physical campus or join live online batches.',
    deliveryMode: 'Offline Campus & Online'
  },
  {
    cityName: 'Hosur',
    slug: 'hosur',
    state: 'Tamil Nadu',
    country: 'India',
    nativeLanguageSupport: 'Tamil, Kannada & English',
    popularPrograms: ['JLPT N5-N2', 'Manufacturing & EV Japanese', 'Corporate Batches'],
    localContext: 'Just a 25-minute drive to our Electronic City Bengaluru campus. Ideal for EV, manufacturing, and automotive engineers seeking Japanese MNC promotions.',
    deliveryMode: 'Offline Campus & Online'
  },
  {
    cityName: 'Karur',
    slug: 'karur',
    state: 'Tamil Nadu',
    country: 'India',
    nativeLanguageSupport: 'Tamil & English',
    popularPrograms: ['JLPT N5-N4', 'Business Keigo', 'Export & Trade Japanese'],
    localContext: 'Learn Japanese online from home with certified native educators for international trade and industrial careers in Japan.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },

  // --- KERALA ---
  {
    cityName: 'Palakkad',
    slug: 'palakkad',
    state: 'Kerala',
    country: 'India',
    nativeLanguageSupport: 'Malayalam, Tamil & English',
    popularPrograms: ['JLPT N5-N2', 'SSW Nursing Visa', 'Japan IT Placement', 'Study Abroad'],
    localContext: 'Palakkad students leverage Malayalam’s exact Subject-Object-Verb (SOV) structure and agglutinative particle grammar to learn Japanese twice as fast.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Kochi',
    slug: 'kochi',
    state: 'Kerala',
    country: 'India',
    nativeLanguageSupport: 'Malayalam & English',
    popularPrograms: ['JLPT N5-N1', 'Infopark IT Career in Tokyo', 'SSW Caregiver Visa'],
    localContext: 'Leading the bridge from Infopark Kochi to Tokyo software hubs. Live online coaching with native senseis, simulated timer exams, and interview prep.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Thiruvananthapuram',
    slug: 'trivandrum',
    state: 'Kerala',
    country: 'India',
    nativeLanguageSupport: 'Malayalam & English',
    popularPrograms: ['JLPT N5-N3', 'Technopark IT Bridge', 'MEXT Research Fellowships'],
    localContext: 'Dedicated weekend & evening batches for Technopark professionals and Trivandrum scholars aiming for Japan COE issuance and bilingual engineering.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Kozhikode',
    slug: 'kozhikode',
    state: 'Kerala',
    country: 'India',
    nativeLanguageSupport: 'Malayalam & English',
    popularPrograms: ['JLPT N5-N3', 'Study in Japan', 'Spoken Fluency'],
    localContext: 'Interactive online classes for Malabar learners with audio drills, Kanji flashcard apps, and direct Japan university admissions guidance.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Thrissur',
    slug: 'thrissur',
    state: 'Kerala',
    country: 'India',
    nativeLanguageSupport: 'Malayalam & English',
    popularPrograms: ['JLPT N5-N4', 'SSW Visa Training', 'Student Pathways'],
    localContext: 'Kerala’s cultural capital meets Tokyo culture. High pass-rate coaching tailored for medical, engineering, and diploma holders.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },

  // --- TELANGANA & ANDHRA PRADESH ---
  {
    cityName: 'Hyderabad',
    slug: 'hyderabad',
    state: 'Telangana',
    country: 'India',
    nativeLanguageSupport: 'Telugu, Hindi & English',
    popularPrograms: ['JLPT N5-N2', 'HITEC City Japanese for IT', 'Tokyo Visa Support'],
    localContext: 'Hyderabad’s premier online Japanese academy for HITEC City, Gachibowli, and Financial District software developers targeting Tokyo salaries of ₹33L–₹77L+ PA.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Visakhapatnam',
    slug: 'visakhapatnam',
    state: 'Andhra Pradesh',
    country: 'India',
    nativeLanguageSupport: 'Telugu & English',
    popularPrograms: ['JLPT N5-N3', 'Maritime & Tech Japanese', 'Study in Japan'],
    localContext: 'Comprehensive virtual cohorts with certified teachers for Vizag techies and university students preparing for official JLPT examinations.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Vijayawada',
    slug: 'vijayawada',
    state: 'Andhra Pradesh',
    country: 'India',
    nativeLanguageSupport: 'Telugu & English',
    popularPrograms: ['JLPT N5-N4', 'Engineering Abroad', 'SSW Visa'],
    localContext: 'Rigorous Japanese foundation coaching with native pronunciation guidance and complete visa documentation assistance.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },

  // --- MAHARASHTRA ---
  {
    cityName: 'Mumbai',
    slug: 'mumbai',
    state: 'Maharashtra',
    country: 'India',
    nativeLanguageSupport: 'Marathi, Hindi & English',
    popularPrograms: ['JLPT N5-N1', 'Financial Keigo', 'Mumbai JLPT Test Prep', 'Corporate Japanese'],
    localContext: 'Mumbai is India’s financial headquarters with heavy bilateral trade with Tokyo. We offer executive evening & weekend batches with official Mumbai University JLPT center prep.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Pune',
    slug: 'pune',
    state: 'Maharashtra',
    country: 'India',
    nativeLanguageSupport: 'Marathi, Hindi & English',
    popularPrograms: ['JLPT N5-N1', 'Automotive Keigo', 'Hinjewadi IT Bridge Engineer', 'JALT Pune'],
    localContext: 'Pune is a historic hub of Indo-Japanese collaboration. Our live cohorts give Pune engineering and auto professionals the bilingual edge for Tokyo MNC careers.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Nagpur',
    slug: 'nagpur',
    state: 'Maharashtra',
    country: 'India',
    nativeLanguageSupport: 'Hindi, Marathi & English',
    popularPrograms: ['JLPT N5-N3', 'Engineering Pathways', 'Study in Japan'],
    localContext: 'Interactive online classes with native senseis bringing premier Bengaluru-level Japanese coaching right to Central India learners.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },

  // --- DELHI NCR ---
  {
    cityName: 'Delhi NCR',
    slug: 'delhi',
    state: 'Delhi NCR',
    country: 'India',
    nativeLanguageSupport: 'Hindi & English',
    popularPrograms: ['JLPT N5-N1', 'Embassy & Diplomatic Japanese', 'MEXT Scholarships', 'MNC Placements'],
    localContext: 'Connecting North India learners to top Japanese educational institutions and diplomatic corps with 100% first-attempt JLPT success track record.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Gurugram (Gurgaon)',
    slug: 'gurugram',
    state: 'Haryana',
    country: 'India',
    nativeLanguageSupport: 'Hindi & English',
    popularPrograms: ['Corporate Keigo', 'JLPT N3-N1', 'CyberCity IT Japanese'],
    localContext: 'High-impact corporate language training and executive batches for Japanese multinationals located along Golf Course Road and CyberCity.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Noida',
    slug: 'noida',
    state: 'Uttar Pradesh',
    country: 'India',
    nativeLanguageSupport: 'Hindi & English',
    popularPrograms: ['JLPT N5-N3', 'Tech & Telecom Japanese', 'Study Abroad'],
    localContext: 'Fast-track JLPT coaching with live interactive virtual cohorts, Kanji workbooks, and simulated computer mock tests.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },

  // --- WEST BENGAL & EAST INDIA ---
  {
    cityName: 'Kolkata',
    slug: 'kolkata',
    state: 'West Bengal',
    country: 'India',
    nativeLanguageSupport: 'Bengali, Hindi & English',
    popularPrograms: ['JLPT N5-N1', 'Indo-Japan Cultural Exchange', 'Salt Lake IT Japanese'],
    localContext: 'Kolkata has the oldest cultural ties with Japan in India (Rabindranath Tagore & Tenshin Okakura). We bridge that rich heritage with modern Tokyo IT job placements.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },

  // --- GUJARAT ---
  {
    cityName: 'Ahmedabad',
    slug: 'ahmedabad',
    state: 'Gujarat',
    country: 'India',
    nativeLanguageSupport: 'Gujarati, Hindi & English',
    popularPrograms: ['JLPT N5-N3', 'Mandal Japanese Industrial Park', 'Business Keigo'],
    localContext: 'Direct training for Gujarat’s rapidly growing Japanese manufacturing corridors and GIFT City professionals seeking bilateral trade fluency.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },

  // --- JAPAN (ON-SHORE / PATHWAYS) ---
  {
    cityName: 'Tokyo',
    slug: 'tokyo',
    state: 'Kanto',
    country: 'Japan',
    nativeLanguageSupport: 'English & Japanese Immersion',
    popularPrograms: ['Business Keigo Bootcamp', 'Rirekisho Formatting', 'Tokyo MNC Job Placement', 'Language School Pathway'],
    localContext: 'On-shore coaching, university transfer pathways, and direct IT engineering job matching for Indian professionals already in or relocating to Tokyo.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  },
  {
    cityName: 'Osaka',
    slug: 'osaka',
    state: 'Kansai',
    country: 'Japan',
    nativeLanguageSupport: 'English & Japanese Immersion',
    popularPrograms: ['Kansai Business Japanese', 'Kansai University Admissions', 'SSW Visa Placement'],
    localContext: 'Connect with our partner language academies and corporate employers across Osaka, Kyoto, and Kobe for direct placement support.',
    deliveryMode: 'Live Online Interactive & Tokyo Pathways'
  }
];

export const STATE_LOCATION_GROUPS: StateLocationGroup[] = [
  {
    stateName: 'Karnataka (Campus & State Hubs)',
    slug: 'karnataka',
    posterImage: '/images/locations/karnataka-hub.png',
    tagline: 'Campus & State Hubs — Live Online & Offline',
    description: 'Premier Japanese coaching hub with physical Electronic City campus, native sensei faculty, and IT placement pipelines for Bengaluru, Mysuru, Mangaluru, and Hubballi.',
    landmarks: ['Vidhana Soudha', 'Mysore Palace', 'Stone Chariot Hampi', 'Electronic City Campus'],
    cities: INDIA_LOCATIONS.filter(l => l.state === 'Karnataka')
  },
  {
    stateName: 'Tamil Nadu',
    slug: 'tamil-nadu',
    posterImage: '/images/locations/tamil-nadu-hub.png',
    tagline: 'From Tamil Nadu to Japan — A Brighter Tomorrow',
    description: 'Expert Japanese faculty, small batches with personal attention, JLPT preparation, and direct automotive and engineering job opportunities in Japan.',
    landmarks: ['Meenakshi Temple', 'Brihadeeswarar Temple', 'Shore Temple Mahabalipuram', 'Marina Coast'],
    cities: INDIA_LOCATIONS.filter(l => l.state === 'Tamil Nadu')
  },
  {
    stateName: 'Kerala',
    slug: 'kerala',
    posterImage: '/images/locations/kerala-hub.png',
    tagline: 'State Hubs — Learn Japanese, Build a Brighter Future',
    description: 'Healthcare, nursing SSW visa preparation, bilingual customer support, and hospitality coaching across Palakkad, Kochi, Thiruvananthapuram, Kozhikode, and Thrissur.',
    landmarks: ['Chinese Fishing Nets', 'Padmanabhaswamy Temple', 'Kathakali Art', 'Kerala Backwaters'],
    cities: INDIA_LOCATIONS.filter(l => l.state === 'Kerala')
  },
  {
    stateName: 'Telangana & Andhra Pradesh',
    slug: 'telangana-andhra',
    posterImage: '/images/locations/all-states-hubs.png',
    tagline: 'Cyberabad to Tokyo Tech Gateway — Live Online & Hybrid',
    description: 'Fast-track JLPT N5–N2 batches for tech and pharmaceutical graduates in Hyderabad, Visakhapatnam, and Vijayawada with Telugu & Hindi bilingual bridging.',
    landmarks: ['Charminar', 'HITEC City', 'Visakhapatnam Coast', 'Prakasam Barrage'],
    cities: INDIA_LOCATIONS.filter(l => l.state === 'Telangana' || l.state === 'Andhra Pradesh')
  },
  {
    stateName: 'Maharashtra',
    slug: 'maharashtra',
    posterImage: '/images/locations/maharashtra-hub.png',
    tagline: 'Language • People • Opportunities — Global Opportunities from Maharashtra',
    description: 'Finance, automotive, corporate sales, and engineering Japanese training for Mumbai, Pune, and Nagpur learners with Marathi and Hindi support.',
    landmarks: ['Gateway of India', 'Shaniwar Wada', 'Deekshabhoomi Nagpur', 'Mumbai Marine Drive'],
    cities: INDIA_LOCATIONS.filter(l => l.state === 'Maharashtra')
  },
  {
    stateName: 'Delhi NCR & North India',
    slug: 'delhi-ncr',
    posterImage: '/images/locations/delhi-ncr-hub.png',
    tagline: 'Regional Hubs — Delhi NCR, Gurugram (Gurgaon), Noida',
    description: 'B2B sales executive, Japanese interpreter, embassy career pathways, and corporate manufacturing batches across Delhi NCR, Gurugram, and Noida.',
    landmarks: ['India Gate', 'Lotus Temple', 'Qutub Minar', 'Cyber City Gurugram'],
    cities: INDIA_LOCATIONS.filter(l => l.state === 'Delhi NCR' || l.state === 'Haryana' || l.state === 'Uttar Pradesh')
  },
  {
    stateName: 'West Bengal & Gujarat',
    slug: 'west-bengal-gujarat',
    posterImage: '/images/locations/west-bengal-gujarat-hub.png',
    tagline: 'A Brighter Tomorrow with Japanese — Kolkata & Ahmedabad',
    description: 'N1 qualified & Indian instructors, flexible live online & offline batches, study abroad and business tie-ups connecting eastern and western industrial corridors to Japan.',
    landmarks: ['Howrah Bridge', 'Victoria Memorial', 'Sidi Saiyyed Mosque', 'Sabarmati Riverfront'],
    cities: INDIA_LOCATIONS.filter(l => l.state === 'West Bengal' || l.state === 'Gujarat')
  },
  {
    stateName: 'Japan On-Shore Pathways (Tokyo & Kansai)',
    slug: 'japan-onshore',
    posterImage: '/images/locations/japan-onshore-hub.png',
    tagline: 'Learn in Japan, Connect to the World, Build Your Future',
    description: 'On-shore higher education pathways, language school admissions, SSW and Engineer work visa sponsorships in Tokyo and Osaka with certified Japanese senseis.',
    landmarks: ['Mount Fuji', 'Tokyo Tower', 'Osaka Castle', 'Shibuya Crossing'],
    cities: INDIA_LOCATIONS.filter(l => l.country === 'Japan')
  }
];
