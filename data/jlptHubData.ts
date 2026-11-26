export interface JLPTLevelDetail {
  level: string; // 'n5', 'n4', 'n3', 'n2', 'n1'
  title: string;
  kanjiTitle: string;
  tagline: string;
  badge: string;
  heroImage: string;
  overview: string;
  cefrEquivalent: string;
  studyHours: string;
  kanjiTarget: string;
  vocabTarget: string;
  grammarTarget: string;
  totalMarks: number;
  passingMarks: number;
  sectionCutoffs: {
    section: string;
    maxScore: number;
    passScore: number;
    description: string;
  }[];
  examTiming: {
    sectionName: string;
    duration: string;
    questionsCount: string;
  }[];
  keyTopics: {
    title: string;
    description: string;
    examples: string[];
  }[];
  careerOpportunities: string[];
  recommendedBooks: {
    title: string;
    purpose: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  courseSlug: string;
  practiceSlug?: string;
}

export const JLPT_LEVELS: Record<string, JLPTLevelDetail> = {
  n5: {
    level: 'n5',
    title: 'JLPT N5 Examination Guide & Syllabus',
    kanjiTitle: '日本語能力試験 N5',
    tagline: 'The Foundational Gateway to the Japanese Language',
    badge: 'Beginner Level',
    heroImage: '/images/courses/jlpt-n5.jpg',
    overview: 'The JLPT N5 is the introductory certification of the Japanese Language Proficiency Test. It assesses the ability to understand basic Japanese characters (Hiragana, Katakana, and ~103 Kanji) and comprehend typical expressions and sentences encountered in daily life and classroom environments.',
    cefrEquivalent: 'A1 (Basic User)',
    studyHours: '120 – 150 Hours',
    kanjiTarget: '103 Kanji Characters',
    vocabTarget: '800+ Vocabulary Words',
    grammarTarget: '40+ Core Sentence Patterns',
    totalMarks: 180,
    passingMarks: 80,
    sectionCutoffs: [
      {
        section: 'Language Knowledge (Vocabulary & Grammar) & Reading',
        maxScore: 120,
        passScore: 38,
        description: 'Tests Kanji readings, orthography, contextual word use, particle placement, and short reading comprehension passages.'
      },
      {
        section: 'Listening (Choukai)',
        maxScore: 60,
        passScore: 19,
        description: 'Tests ability to understand short, slowly-spoken dialogues in everyday situations like classrooms, train stations, and convenience stores.'
      }
    ],
    examTiming: [
      { sectionName: 'Language Knowledge (Vocabulary)', duration: '20 Minutes', questionsCount: '25 Questions' },
      { sectionName: 'Language Knowledge (Grammar) & Reading', duration: '40 Minutes', questionsCount: '26 Questions' },
      { sectionName: 'Listening', duration: '30 Minutes', questionsCount: '20 Questions' }
    ],
    keyTopics: [
      {
        title: 'Writing Systems (Hiragana & Katakana)',
        description: 'Instant phonetic reading and stroke order of all 46 basic syllables, Dakuten (が, ざ, だ, ば), Handakuten (ぱ), and Yoon contracted sounds (きゃ, しゅ, ちょ).',
        examples: ['きょうかしょ (Kyōkasho - Textbook)', 'コンピューター (Konpyūtā - Computer)', 'とうきょう (Tōkyō)']
      },
      {
        title: 'Essential Particles (Joshi)',
        description: 'Mastery of basic grammatical relationship markers connecting nouns, verbs, and adjectives.',
        examples: ['は (wa) - Topic marker', 'が (ga) - Subject marker', 'を (o) - Direct object', 'に (ni) - Direction, time, location', 'で (de) - Tool, method, location of action']
      },
      {
        title: 'Verb & Adjective Conjugation',
        description: 'Polite speech forms (Masu-form), continuous present (Te-form), and plain past/negative forms.',
        examples: ['たべます -> たべて -> たべない', 'いきます -> いって -> いかない', 'おおきい (i-adj) vs. しずかな (na-adj)']
      }
    ],
    careerOpportunities: [
      'Eligibility for Japan Language School Student Visas',
      'First mandatory milestone for Specified Skilled Worker (SSW) visas',
      'Foundation for IT engineers preparing for Tokyo relocation',
      'Demonstrated commitment on corporate resumes for Japanese MNCs'
    ],
    recommendedBooks: [
      { title: 'Minna no Nihongo Shokyu 1', purpose: 'Standard textbook for comprehensive grammar and sentence patterns' },
      { title: 'Genki 1: An Integrated Course in Elementary Japanese', purpose: 'Popular English-friendly communicative guide' },
      { title: 'Nihongo Sou Matome N5', purpose: 'Structured 6-week JLPT question drills and vocabulary breakdown' }
    ],
    faqs: [
      {
        question: 'Can I clear JLPT N5 without any prior knowledge of Japanese?',
        answer: 'Yes, 100%! Our 3-month JLPT N5 coaching program begins from stroke one of Hiragana. Zero Japanese knowledge is needed to start.'
      },
      {
        question: 'When is the JLPT N5 exam held in India?',
        answer: 'The JLPT is held twice every year on the first Sunday of July and the first Sunday of December at test centers across India (including Bengaluru, Chennai, Delhi, Pune, Mumbai, Kolkata, and Hyderabad).'
      },
      {
        question: 'Is there negative marking in the JLPT exam?',
        answer: 'No! There is no negative marking in any level of the JLPT. You should attempt every single multiple-choice question.'
      }
    ],
    courseSlug: 'jlpt-n5',
    practiceSlug: 'jlpt-n5-vocab'
  },
  n4: {
    level: 'n4',
    title: 'JLPT N4 Examination Guide & Syllabus',
    kanjiTitle: '日本語能力試験 N4',
    tagline: 'Achieve Everyday Conversational and Practical Proficiency',
    badge: 'Elementary Level',
    heroImage: '/images/courses/jlpt-n4.jpg',
    overview: 'JLPT N4 demonstrates the ability to understand and communicate in basic Japanese encountered in daily life. It is the benchmark level required by the Japanese Government for Specified Skilled Worker (SSW) visas and technical intern trainees.',
    cefrEquivalent: 'A2 (Waystage)',
    studyHours: '200 – 250 Hours',
    kanjiTarget: '300 Kanji Characters (including N5)',
    vocabTarget: '1,500+ Words',
    grammarTarget: '80+ Essential Patterns',
    totalMarks: 180,
    passingMarks: 90,
    sectionCutoffs: [
      {
        section: 'Language Knowledge (Vocabulary)',
        maxScore: 60,
        passScore: 19,
        description: 'Tests Kanji orthography, contextual vocabulary usage, and paraphrasing.'
      },
      {
        section: 'Language Knowledge (Grammar) & Reading',
        maxScore: 60,
        passScore: 19,
        description: 'Tests compound sentence logic, conjunctions, and 200–350 word short reading passages.'
      },
      {
        section: 'Listening (Choukai)',
        maxScore: 60,
        passScore: 19,
        description: 'Tests comprehension of natural-speed everyday dialogues in stores, workplaces, and train stations.'
      }
    ],
    examTiming: [
      { sectionName: 'Language Knowledge (Vocabulary)', duration: '25 Minutes', questionsCount: '28 Questions' },
      { sectionName: 'Language Knowledge (Grammar) & Reading', duration: '55 Minutes', questionsCount: '35 Questions' },
      { sectionName: 'Listening', duration: '35 Minutes', questionsCount: '21 Questions' }
    ],
    keyTopics: [
      {
        title: 'Potential, Volitional, and Passive Forms',
        description: 'Expressing ability, suggestions, and actions received or endured.',
        examples: ['はなせる (Can speak)', 'いこう (Let\'s go)', 'ほめられる (To be praised)']
      },
      {
        title: 'Conditionals (~tara, ~ba, ~to, ~nara)',
        description: 'Crucial distinctions between hypothetical, general truth, and consequence conditionals.',
        examples: ['やすかったら (If it is cheap)', 'はるになると (When spring arrives)', 'いけば (If you go)']
      },
      {
        title: 'Giving and Receiving Actions (Te-form + ageru/kureru/morau)',
        description: 'Cultural dynamics of favors and mutual assistance.',
        examples: ['おしえてあげる (I will teach you)', 'てつだってもらう (To have someone help me)']
      }
    ],
    careerOpportunities: [
      'Official prerequisite for Specified Skilled Worker (SSW) Visas in Japan',
      'Hospitality, Nursing, Construction, and Food Service jobs in Tokyo/Osaka',
      'Entry-level technical coordinator roles in Japanese MNCs in Bengaluru',
      'Smooth integration into Japanese universities and language institutes'
    ],
    recommendedBooks: [
      { title: 'Minna no Nihongo Shokyu 2', purpose: 'Standard core curriculum for N4 grammar and vocabulary' },
      { title: 'Shin Kanzen Master N4 (Bunpou & Dokkai)', purpose: 'Rigorous question drills with deep grammar analysis' },
      { title: 'JLPT Official Practice Workbook Vol. 1 & 2', purpose: 'Authentic exam simulations with original audio tracks' }
    ],
    faqs: [
      {
        question: 'Is JLPT N4 sufficient to work in Japan?',
        answer: 'Yes, for the Specified Skilled Worker (SSW 1) visa categories, N4 or JFT-Basic is the official immigration requirement set by the Ministry of Justice, Japan.'
      },
      {
        question: 'How many months does it take to prepare for N4 after N5?',
        answer: 'Typically 3.5 to 4 months of structured study (4–6 hours of weekly live instruction + 3 hours of weekly practice) at Fuji Japanese Academy.'
      }
    ],
    courseSlug: 'jlpt-n4',
    practiceSlug: 'jlpt-n4-grammar'
  },
  n3: {
    level: 'n3',
    title: 'JLPT N3 Examination Guide & Syllabus',
    kanjiTitle: '日本語能力試験 N3',
    tagline: 'The Turning Point to Workplace Fluency & IT Hiring in Japan',
    badge: 'Intermediate Benchmark',
    heroImage: '/images/courses/jlpt-n3.jpg',
    overview: 'JLPT N3 bridges basic Japanese and advanced business fluency. It validates the ability to comprehend newspaper headlines, workplace emails, technical instructions, and conversational dialogues spoken at near-natural speed.',
    cefrEquivalent: 'B1 (Threshold)',
    studyHours: '400 – 450 Hours',
    kanjiTarget: '650 Kanji Characters',
    vocabTarget: '3,750+ Words',
    grammarTarget: '110+ Intermediate Patterns',
    totalMarks: 180,
    passingMarks: 95,
    sectionCutoffs: [
      {
        section: 'Language Knowledge (Vocabulary)',
        maxScore: 60,
        passScore: 19,
        description: 'Compound kanji words (Jukugo), nuanced synonyms, and idiomatic phrases.'
      },
      {
        section: 'Language Knowledge (Grammar) & Reading',
        maxScore: 60,
        passScore: 19,
        description: 'Complex sentence structures, opinion essays, and informational scanning passages.'
      },
      {
        section: 'Listening (Choukai)',
        maxScore: 60,
        passScore: 19,
        description: 'Point comprehension, task listening, and quick-response drills at native conversation tempo.'
      }
    ],
    examTiming: [
      { sectionName: 'Language Knowledge (Vocabulary)', duration: '30 Minutes', questionsCount: '33 Questions' },
      { sectionName: 'Language Knowledge (Grammar) & Reading', duration: '70 Minutes', questionsCount: '39 Questions' },
      { sectionName: 'Listening', duration: '40 Minutes', questionsCount: '24 Questions' }
    ],
    keyTopics: [
      {
        title: 'Intermediate Connectors & Discourse Nuances',
        description: 'Grammar that links paragraphs, sets conditions, and conveys personal convictions.',
        examples: ['~わけだ (That is why / naturally)', '~ことになっている (It is ruled/scheduled that)', '~に違いない (Must definitely be)']
      },
      {
        title: 'Business Keigo Fundamentals',
        description: 'Beginning Sonkeigo (respectful) and Kenjougo (humble) speech patterns for office interactions.',
        examples: ['お越しになります (Honorific for to come)', '伺います (Humble for to ask/visit)']
      },
      {
        title: '650 Kanji & Multi-Reading Compounds',
        description: 'Reading notices, contracts, travel schedules, and tech documentation.',
        examples: ['確認 (Kakunin - Confirmation)', '開発 (Kaihatsu - Development)', '納期 (Nōki - Delivery deadline)']
      }
    ],
    careerOpportunities: [
      'Minimum benchmark for Software Engineers & Tech Talent moving to Japan',
      'Bilingual QA and IT project coordinator roles in Indian MNCs',
      'Visa sponsorship by Japanese recruiting agencies (Mercari, Rakuten, SoftBank)',
      'High-paying translation and customer service opportunities'
    ],
    recommendedBooks: [
      { title: 'Shin Kanzen Master N3 (Grammar & Reading)', purpose: 'The ultimate standard for intermediate test success' },
      { title: 'Nihongo Sou Matome N3 (Kanji & Vocab)', purpose: 'Bite-sized daily study format with English translations' },
      { title: 'Tobira: Gateway to Advanced Japanese', purpose: 'Comprehensive immersion into cultural and authentic readings' }
    ],
    faqs: [
      {
        question: 'Why is JLPT N3 called the "golden gate" for Indian software engineers?',
        answer: 'Because N3 proves you can independently participate in agile standup meetings, understand Jira tickets, write status emails, and live comfortably in Tokyo without needing an interpreter.'
      },
      {
        question: 'Does Fuji Academy assist with job interviews upon completing N3?',
        answer: 'Yes! We conduct mock tech interviews, help you craft a Japanese format resume (Rirekisho), and connect you with corporate recruiting partners in Tokyo and Bengaluru.'
      }
    ],
    courseSlug: 'jlpt-n3'
  },
  n2: {
    level: 'n2',
    title: 'JLPT N2 Examination Guide & Syllabus',
    kanjiTitle: '日本語能力試験 N2',
    tagline: 'The Corporate Standard for True Business & Professional Fluency',
    badge: 'Advanced Business Level',
    heroImage: '/images/courses/jlpt-n2.jpg',
    overview: 'JLPT N2 represents comprehensive professional competence in Japanese. Passing N2 proves you can read complex newspaper articles, understand business negotiations, comprehend television documentaries, and work seamlessly in any Japanese corporate office.',
    cefrEquivalent: 'B2 (Vantage)',
    studyHours: '600 – 800 Hours',
    kanjiTarget: '1,000+ Kanji Characters',
    vocabTarget: '6,000+ Words',
    grammarTarget: '150+ Advanced Grammar Structures',
    totalMarks: 180,
    passingMarks: 90,
    sectionCutoffs: [
      {
        section: 'Language Knowledge (Vocabulary & Grammar)',
        maxScore: 60,
        passScore: 19,
        description: 'Tests formal written Japanese expressions, literary connectors, and advanced vocabulary.'
      },
      {
        section: 'Reading (Dokkai)',
        maxScore: 60,
        passScore: 19,
        description: 'Tests comprehension of 900+ word essays, editorials, business proposals, and comparing opposing arguments.'
      },
      {
        section: 'Listening (Choukai)',
        maxScore: 60,
        passScore: 19,
        description: 'Tests full-speed native business discussions, broadcast news clips, and complex reasoning dialogues.'
      }
    ],
    examTiming: [
      { sectionName: 'Language Knowledge & Reading (Integrated)', duration: '105 Minutes', questionsCount: '75 Questions' },
      { sectionName: 'Listening', duration: '50 Minutes', questionsCount: '32 Questions' }
    ],
    keyTopics: [
      {
        title: 'Advanced Formal Expressions & Written Connectors',
        description: 'Grammar predominantly used in newspapers, business contracts, and official announcements.',
        examples: ['~にもかかわらず (In spite of / despite)', '~を問わず (Regardless of)', '~を契機に (As a turning point/trigger)']
      },
      {
        title: 'High-Level Keigo & Client Communication',
        description: 'Flawless corporate etiquette during high-stakes presentations and negotiations.',
        examples: ['申し送ります (Humble hand-off)', 'ご高配を賜り (Expressing gratitude in formal correspondence)']
      }
    ],
    careerOpportunities: [
      '10 Bonus Points on Japan\'s Highly Skilled Professional (HSP) Visa scorecard',
      'Fast-track Japan Permanent Residency (PR) in just 1 to 3 years',
      'Senior bilingual software architect, engineering lead, and management positions',
      'Direct hiring by top Japanese conglomerates with Tokyo compensation packages'
    ],
    recommendedBooks: [
      { title: 'Shin Kanzen Master N2 (All 5 Volumes)', purpose: 'Essential gold standard for passing JLPT N2' },
      { title: 'Speed Master N2 Reading & Listening', purpose: 'Time-pressured drills for fast comprehension' }
    ],
    faqs: [
      {
        question: 'Does JLPT N2 qualify me for fast-track Japan Permanent Residency (PR)?',
        answer: 'Yes! JLPT N2 automatically awards 10 points on the Japanese Immigration Highly Skilled Professional (HSP) visa scoring matrix, dramatically reducing your waiting period for PR.'
      }
    ],
    courseSlug: 'jlpt-n2'
  },
  n1: {
    level: 'n1',
    title: 'JLPT N1 Examination Guide & Syllabus',
    kanjiTitle: '日本語能力試験 N1',
    tagline: 'The Pinnacle of Japanese Language Mastery & Interpretation',
    badge: 'Mastery Level',
    heroImage: '/images/courses/jlpt-n1.jpg',
    overview: 'JLPT N1 is the highest level of Japanese language proficiency. It certifies near-native fluency, permitting holders to read philosophical essays, legal texts, technical research dissertations, and interpret simultaneous business negotiations at the highest executive levels.',
    cefrEquivalent: 'C1 / C2 (Proficient User)',
    studyHours: '900 – 1,200 Hours',
    kanjiTarget: '2,136 Joyo Kanji',
    vocabTarget: '10,000+ Words',
    grammarTarget: '200+ Classical & Nuanced Patterns',
    totalMarks: 180,
    passingMarks: 100,
    sectionCutoffs: [
      {
        section: 'Language Knowledge (Vocabulary & Grammar)',
        maxScore: 60,
        passScore: 19,
        description: 'Classical nuances, rare idioms, four-character idioms (Yojijukugo), and nuanced literary phrases.'
      },
      {
        section: 'Reading (Dokkai)',
        maxScore: 60,
        passScore: 19,
        description: 'Complex abstracts, literary critiques, editorials, and comparative passages under strict 110-minute timing.'
      },
      {
        section: 'Listening (Choukai)',
        maxScore: 60,
        passScore: 19,
        description: 'Unrehearsed native debates, broadcast talk shows, and integrated listening-reading task scenarios.'
      }
    ],
    examTiming: [
      { sectionName: 'Language Knowledge & Reading (Integrated)', duration: '110 Minutes', questionsCount: '71 Questions' },
      { sectionName: 'Listening', duration: '55 Minutes', questionsCount: '35 Questions' }
    ],
    keyTopics: [
      {
        title: 'Classical & Archaic Sentence Endings',
        description: 'Expressions rooted in literary and historical Japanese.',
        examples: ['~であれ (Be it that)', '~ごとき (Like / as if)', '~を余儀なくされる (To be forced to)']
      },
      {
        title: 'Executive Level Keigo & High Diplomacy',
        description: 'Flawless precision in legal, governmental, and executive board meetings.',
        examples: ['~にあって (In the context/situation of)', '~を皮切りに (Starting with)', '~にたえない (Cannot bear to)']
      }
    ],
    careerOpportunities: [
      '15 Bonus Points on Japan\'s Highly Skilled Professional Visa scorecard',
      'Professional conference interpreter, legal translator, and diplomat',
      'Executive director & country head in Japanese corporations',
      'Qualified for Japanese National Bar and Medical examinations'
    ],
    recommendedBooks: [
      { title: 'Shin Kanzen Master N1 (Complete Set)', purpose: 'Deep grammatical nuance breakdowns and authentic exam drills' },
      { title: 'Nihongo Sou Matome N1', purpose: 'Systematic daily reviews for Kanji and vocabulary retention' }
    ],
    faqs: [
      {
        question: 'What is the pass percentage for JLPT N1 globally?',
        answer: 'Globally, only ~30% of candidates pass the JLPT N1 exam. However, with Fuji Japanese Academy\'s intensive mentorship and 10 full-length mock series, our students achieve an 88% pass rate.'
      }
    ],
    courseSlug: 'jlpt-n1'
  }
};
