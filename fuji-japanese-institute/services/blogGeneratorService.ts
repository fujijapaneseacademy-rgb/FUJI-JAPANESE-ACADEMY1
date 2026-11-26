import { supabase } from '../src/lib/supabaseClient';
import { BlogPost, BlogFAQ } from '../types';

interface TopicBlueprint {
  title: string;
  slug: string;
  category: 'JLPT Preparation' | 'Career & Culture' | 'Learning Tips';
  image: string;
  excerpt: string;
  meta_description: string;
  keywords: string[];
  negative_keywords: string[];
  read_time: string;
  author: string;
  quickAnswer: string;
  sections: { heading: string; text: string; table?: { headers: string[]; rows: string[][] } }[];
  faqs: BlogFAQ[];
}

export const TOPIC_CURRICULUM: TopicBlueprint[] = [
  {
    title: 'Mastering the 10 Essential Japanese Particles: The Ultimate Cheat Sheet for JLPT N5 & N4',
    slug: 'japanese-particles-cheat-sheet-jlpt-n5-n4',
    category: 'JLPT Preparation',
    image: '/images/courses/jlpt-n5.jpg',
    excerpt: 'Confused between は (wa) and が (ga)? Master the 10 core Japanese particles with real conversational examples, contrast formulas, and JLPT practice drills.',
    meta_description: 'Complete guide to Japanese particles: wa, ga, wo, ni, de, to, mo, e, kara, made. Clear formulas and example sentences for JLPT N5 and N4 learners.',
    keywords: ['Japanese particles', 'wa vs ga', 'JLPT N5 grammar', 'learn Japanese particles', 'Japanese particle cheat sheet', 'Fuji Japanese Academy'],
    negative_keywords: ['free cartoon download', 'pirated japanese textbook'],
    read_time: '6 min read',
    author: 'Sensei Tanaka, Lead JLPT Instructor',
    quickAnswer: 'Particles (助詞, joshi) act as postpositions in Japanese sentences, marking the grammatical role of the noun they follow. The most common pitfall is は (wa) vs が (ga): は marks the overall topic or known information ("Speaking of A..."), while が marks the specific subject or new information emphasizing WHO did the action.',
    sections: [
      {
        heading: 'The 10 Fundamental Japanese Particles at a Glance',
        text: 'Mastering these 10 particles accounts for over 65% of all grammar questions on the JLPT N5 and N4 exams:',
        table: {
          headers: ['Particle', 'Pronunciation', 'Primary Function', 'Example Sentence', 'English Translation'],
          rows: [
            ['は', 'wa', 'Topic Marker', '私は学生です (Watashi wa gakusei desu)', 'As for me, I am a student.'],
            ['が', 'ga', 'Subject / Identifier', '誰が来ましたか (Dare ga kimashita ka)', 'Who came?'],
            ['を', 'wo / o', 'Direct Object', '本を読みます (Hon o yomimasu)', 'I read a book.'],
            ['に', 'ni', 'Specific Time / Destination', '7時に起きます (Shichiji ni okimasu)', 'I wake up at 7 o’clock.'],
            ['で', 'de', 'Location of Action / Means', '電車で行きます (Densha de ikimasu)', 'I go by train.'],
            ['と', 'to', 'Exhaustive "And" / With', '友達と話します (Tomodachi to hanashimasu)', 'I talk with a friend.'],
            ['も', 'mo', 'Inclusive "Also / Too"', '私も行きます (Watashi mo ikimasu)', 'I will go too.'],
            ['へ', 'e', 'Direction of Movement', '東京へ行きます (Toukyou e ikimasu)', 'Heading toward Tokyo.'],
            ['から', 'kara', 'Starting Point / From', '9時から始まります (Kuji kara hajimarimasu)', 'Starts from 9:00.'],
            ['まで', 'made', 'Ending Point / Until', '5時まで働きます (Goji made hatarakimasu)', 'I work until 5:00.']
          ]
        }
      },
      {
        heading: 'Deep Dive: The Ultimate Rule for は (wa) vs が (ga)',
        text: '1. Topic vs Subject: Use は when introducing an established topic. Use が when introducing new information or answering a question with "who" or "what".\n\n2. Question Words: If the question word is the subject (e.g. 誰 - dare), always pair it with が (誰が来ましたか？). If the question word comes after the topic, use は (山田さんはどこですか？).\n\n3. Contrasting Statements: は is used when contrasting two items: 魚は食べますが、肉は食べません (I eat fish, but I don’t eat meat).'
      },
      {
        heading: 'How to Practice Particles for JLPT Exam Success',
        text: 'At Fuji Japanese Academy, our native senseis drill particle accuracy through contextual conversation rather than rote translation. When you speak aloud with a native speaker in live batches, your intuition for correct particle usage develops naturally.'
      }
    ],
    faqs: [
      {
        question: 'Why is the particle は pronounced "wa" instead of "ha"?',
        answer: 'Historical kana orthography reforms preserved the traditional "wa" pronunciation for the particle は to distinguish its grammatical grammatical function from regular words starting with the syllable "ha".'
      },
      {
        question: 'What is the difference between に (ni) and で (de) for locations?',
        answer: 'で (de) marks the location where an action takes place (e.g. 図書館で勉強する - study AT the library). に (ni) marks the location of existence or destination (e.g. 部屋にいる - exist IN the room, 東京に行く - go TO Tokyo).'
      }
    ]
  },
  {
    title: 'Top 7 In-Demand Tech Jobs in Japan for Indian Engineers & Developers',
    slug: 'tech-jobs-in-japan-for-indian-engineers',
    category: 'Career & Culture',
    image: '/images/courses/japanese-for-it-professionals.jpg',
    excerpt: 'Explore high-paying tech roles in Tokyo: software engineering, cloud architecture, AI engineering, and bilingual project management with visa sponsorship.',
    meta_description: 'Guide to high-demand IT jobs in Japan for Indian software engineers: salaries, visa requirements, JLPT proficiency levels, and hiring trends in Tokyo.',
    keywords: ['jobs in Japan for Indians', 'software engineer jobs Tokyo', 'work visa Japan', 'JLPT for engineers', 'Fuji Japanese Academy placement'],
    negative_keywords: ['illegal visa agents', 'free cracked software'],
    read_time: '7 min read',
    author: 'Fuji Career Advisory Team',
    quickAnswer: 'Japan currently has over 400,000 vacant technology positions, projected to reach 800,000 by 2030. Indian developers with 2+ years of experience and JLPT N3 or N2 certification are in prime demand, commanding starting salaries of 6,000,000 to 11,000,000 JPY with complete work visa sponsorship.',
    sections: [
      {
        heading: 'The Top 5 High-Demand Tech Roles in Tokyo',
        text: 'The demand for bilingual engineers spans multinational tech hubs, Japanese conglomerates, and hyper-growth fintech startups:',
        table: {
          headers: ['Role', 'Primary Tech Stack', 'Required JLPT Level', 'Average Annual Salary (JPY)'],
          rows: [
            ['Cloud / DevOps Engineer', 'AWS, Kubernetes, Terraform', 'JLPT N3', '¥7,500,000 - ¥12,000,000'],
            ['Full-Stack Developer', 'React, Node.js, Python, Go', 'JLPT N3 / N2', '¥6,000,000 - ¥9,500,000'],
            ['Bilingual Project Manager (BSE)', 'Agile, JIRA, System Architecture', 'JLPT N2 / N1', '¥8,500,000 - ¥14,000,000'],
            ['Data Scientist / AI Engineer', 'Python, PyTorch, BigQuery', 'JLPT N3', '¥8,000,000 - ¥13,000,000'],
            ['Embedded / Automotive Engineer', 'C, C++, RTOS, MATLAB', 'JLPT N3 / N2', '¥6,500,000 - ¥10,000,000']
          ]
        }
      },
      {
        heading: 'Why Learn Japanese at Fuji Japanese Academy for Your Japan Career?',
        text: 'Unlike general language schools, Fuji Japanese Academy prepares engineers for Japanese technical interviews, technical documentation in Keigo, and corporate culture integration. Our graduates work at leading companies in Tokyo and Bengaluru.'
      }
    ],
    faqs: [
      {
        question: 'Do I need JLPT N1 to work in Japan as an engineer?',
        answer: 'No. Most tech companies in Japan only require JLPT N3 for conversational readiness and N2 for managerial responsibilities. Technical competence carries immense weight.'
      },
      {
        question: 'How does the Engineer/Specialist in Humanities work visa work?',
        answer: 'The Engineer Visa requires a recognized bachelor degree in engineering or relevant IT fields, plus a job offer from an employer registered in Japan. Fuji Japanese Academy provides interview preparation and job matching.'
      }
    ]
  },
  {
    title: 'How to Learn 500 Kanji in 60 Days: The Radical and Mnemonics Method',
    slug: 'how-to-learn-kanji-fast-mnemonics-radicals',
    category: 'Learning Tips',
    image: '/images/sections/kanji-library.jpg',
    excerpt: 'Stop writing Kanji 100 times mindlessly. Discover how to deconstruct Japanese Kanji into radicals and memorable stories to remember 500 characters in 60 days.',
    meta_description: 'Fast Kanji learning method using 214 radicals and visual mnemonics. Master JLPT N5 and N4 Kanji in 60 days with Fuji Japanese Academy technique.',
    keywords: ['how to learn Kanji', 'Kanji radicals method', 'JLPT N5 Kanji list', 'remember Kanji mnemonics', 'Japanese language classes'],
    negative_keywords: ['cheat codes', 'fake certifications'],
    read_time: '6 min read',
    author: 'Sensei Tanaka, Lead JLPT Instructor',
    quickAnswer: 'Instead of memorizing thousands of isolated strokes, Kanji should be learned through their component radicals (building blocks). By mastering the 50 most common radicals, every complex Kanji becomes a simple visual story that takes seconds to understand and retain.',
    sections: [
      {
        heading: 'Understanding Kanji Radicals (部首, Bushu)',
        text: 'All 2,136 Joyo Kanji are constructed from just 214 radicals. Here is how common radicals form intuitive meanings:',
        table: {
          headers: ['Radical', 'Meaning', 'Composite Kanji', 'Kanji Meaning', 'Mnemonic Story'],
          rows: [
            ['木 (ki)', 'Tree', '林 (hayashi)', 'Grove', 'Two trees together make a small grove.'],
            ['木 (ki)', 'Tree', '森 (mori)', 'Forest', 'Three trees together make a dense forest.'],
            ['日 (hi)', 'Sun', '明 (akarui)', 'Bright', 'The Sun and the Moon (月) combined create brightness.'],
            ['休 (kyuu)', 'Rest', '休む (yasumu)', 'To rest', 'A person (亻) leaning against a tree (木) to rest.'],
            ['言 (i)', 'Words/Speech', '語 (go)', 'Language', 'Words (言) spoken by five (五) mouths (口) form a language.']
          ]
        }
      }
    ],
    faqs: [
      {
        question: 'How many Kanji are required for JLPT N5?',
        answer: 'JLPT N5 requires knowing 103 basic Kanji characters including numbers, days, directions, and common verbs.'
      },
      {
        question: 'What is the difference between On\'yomi and Kun\'yomi?',
        answer: 'On\'yomi is the original Chinese-derived reading used in compound words, while Kun\'yomi is the native Japanese reading used when Kanji stands alone.'
      }
    ],
  },
  {
    title: 'Hiragana & Katakana Complete Mastery Guide: Stroke Orders, Audio Mnemonics & PDF Chart',
    slug: 'hiragana-and-katakana-mastery-guide-chart',
    category: 'Learning Tips',
    image: '/images/courses/jlpt-n4.jpg',
    excerpt: 'The absolute starting point of Japanese literacy: how to read, write, and remember all 46 Hiragana and 46 Katakana characters in under 7 days.',
    meta_description: 'Free comprehensive guide to Hiragana and Katakana charts, stroke orders, and visual mnemonics. Learn basic Japanese writing with Fuji Japanese Academy.',
    keywords: ['Hiragana chart', 'Katakana chart', 'learn Hiragana', 'Japanese alphabet', 'Fuji Japanese Academy'],
    negative_keywords: ['pirated worksheets', 'fake anime subs'],
    read_time: '6 min read',
    author: 'Sensei Tanaka, Lead JLPT Instructor',
    quickAnswer: 'Japanese uses three writing systems: Hiragana (native grammatical words and verb endings), Katakana (foreign loanwords and technical names), and Kanji (logographic conceptual characters). Beginners should master Hiragana first in 4 to 5 days, followed immediately by Katakana, before touching Kanji.',
    sections: [
      {
        heading: 'The Structure of the Japanese Kana System',
        text: 'Both Hiragana and Katakana share the same phonetic sound grid consisting of 5 vowels (a, i, u, e, o) combined with consonant stems (k, s, t, n, h, m, y, r, w):',
        table: {
          headers: ['Row (Gyou)', 'Vowels (A - I - U - E - O)', 'Example Hiragana', 'Example Katakana', 'Loanword Usage'],
          rows: [
            ['A-Row (あ行)', 'a, i, u, e, o', 'あ、い、う、え、お', 'ア、イ、ウ、エ、オ', 'アイス (Aisu - Ice cream)'],
            ['Ka-Row (か行)', 'ka, ki, ku, ke, ko', 'か、き、く、け、こ', 'カ、キ、ク、ケ、コ', 'カメラ (Kamera - Camera)'],
            ['Sa-Row (さ行)', 'sa, shi, su, se, so', 'さ、し、す、せ、そ', 'サ、シ、ス、セ、ソ', 'サラダ (Sarada - Salad)'],
            ['Ta-Row (た行)', 'ta, chi, tsu, te, to', 'た、ち、つ、て、と', 'タ、チ、ツ、テ、ト', 'タクシー (Takushii - Taxi)'],
            ['Na-Row (な行)', 'na, ni, nu, ne, no', 'な、に、ぬ、ね、の', 'ナ、ニ、ヌ、ネ、ノ', 'ノート (Nooto - Notebook)']
          ]
        }
      },
      {
        heading: 'Top 3 Memory Techniques for Fast Kana Retention',
        text: '1. Visual Association: Connect character shapes to familiar objects (e.g. Hiragana "き" looks like a key, "す" looks like a straw in a cup).\n\n2. Dual Writing Drills: Write out loanwords you use daily (coffee -> コーヒー, smartphone -> スマホ) to drill Katakana effortlessly.\n\n3. Audio Repetition: Always pronounce the sound aloud with native accent pitch while drawing the strokes.'
      }
    ],
    faqs: [
      {
        question: 'How long does it take to learn Hiragana and Katakana?',
        answer: 'With 30 minutes of daily dedicated practice, learners at Fuji Japanese Academy comfortably master reading and writing both scripts within 7 to 10 days.'
      },
      {
        question: 'Why does Japanese have both Hiragana and Katakana?',
        answer: 'Hiragana provides the grammatical skeleton of sentences (particles, verb and adjective inflections), whereas Katakana visually isolates foreign loanwords, onomatopoeia, and scientific terms for instant clarity.'
      }
    ]
  },
  {
    title: 'The Essential Guide to Japanese Work Visas for Foreign Professionals (2026 Edition)',
    slug: 'japan-work-visa-guide-for-foreigners-engineers',
    category: 'Career & Culture',
    image: '/images/courses/jlpt-n2.jpg',
    excerpt: 'Detailed breakdown of Japan Engineer/Specialist in Humanities work visas, Specified Skilled Worker (SSW), and the High-Skilled Professional point system.',
    meta_description: 'Complete breakdown of Japanese work visa options for international engineers and professionals: eligibility, documentation, salary criteria, and timelines.',
    keywords: ['Japan work visa', 'Engineer visa Japan', 'SSW visa Japan', 'move to Japan from India', 'Japanese jobs'],
    negative_keywords: ['visa scam', 'illegal immigration'],
    read_time: '8 min read',
    author: 'Fuji Career Advisory Team',
    quickAnswer: 'The primary route for educated professionals to work in Japan is the "Engineer / Specialist in Humanities / International Services" visa. Requirements include an employment contract with a Japanese entity, a bachelor’s degree in a related field (or 10 years verified industry experience), and conversational Japanese proficiency (JLPT N3 or N2 strongly preferred).',
    sections: [
      {
        heading: 'Comparing the 3 Most Common Japanese Visa Types',
        text: 'Choosing the right visa category depends on your educational background, years of technical experience, and JLPT proficiency level:',
        table: {
          headers: ['Visa Category', 'Target Demographic', 'Japanese Requirement', 'Permanent Residency Path'],
          rows: [
            ['Engineer / Specialist in Humanities', 'Software engineers, architects, translators, business leads', 'JLPT N3 recommended (not legally mandatory)', '10 years (or 1-3 years via HSP)'],
            ['Highly Skilled Professional (HSP)', 'Top-tier tech leaders, researchers, corporate managers', 'JLPT N1 (+15 pts) or N2 (+10 pts)', 'Fast-track: 1 to 3 years!'],
            ['Specified Skilled Worker (SSW 1 & 2)', 'Caregivers, hospitality, food manufacturing, construction', 'JLPT N4 or JFT-Basic + Skill exam', 'Eligible for family sponsorship on SSW 2']
          ]
        }
      },
      {
        heading: 'Step-by-Step Certificate of Eligibility (COE) Process',
        text: '1. Secure a Job Offer: Receive an official offer letter and employment agreement from an employer in Japan.\n\n2. COE Application: Your Japanese employer submits the Certificate of Eligibility application to the Immigration Services Agency in Japan.\n\n3. Visa Stamping: Once the COE is issued (typically 4 to 8 weeks), present it to your local Japanese Embassy or Consulate in India to receive your passport visa stamp within 5 business days.'
      }
    ],
    faqs: [
      {
        question: 'Can I bring my family to Japan on an Engineer work visa?',
        answer: 'Yes! Holders of the Engineer / Specialist in Humanities visa can sponsor Dependent Visas (Kazoku Taizai) for their legally married spouse and dependent children.'
      },
      {
        question: 'Does Fuji Japanese Academy help with Japan job placement and interviews?',
        answer: 'Yes, our career wing provides resume localization in Japanese format (Rirekisho & Shokumu Keirekisho), mock Keigo interviews, and connections to hiring partners in Tokyo and Osaka.'
      }
    ]
  },
  {
    title: 'Top 10 Essential Japanese Phrases for Daily Life, Travel and Shopping',
    slug: 'essential-japanese-phrases-for-daily-life-and-travel',
    category: 'Learning Tips',
    image: '/images/courses/spoken-japanese.jpg',
    excerpt: 'Traveling to Tokyo, Kyoto or Osaka? Master the 10 polite survival phrases that make ordering ramen, riding the Shinkansen, and asking directions seamless.',
    meta_description: 'Essential survival Japanese phrases for tourists and new residents: polite greetings, restaurant ordering, shopping vocabulary with romaji and pronunciations.',
    keywords: ['survival Japanese', 'Japanese travel phrases', 'useful Japanese words', 'ordering food in Japan', 'Fuji Japanese Academy'],
    negative_keywords: ['slang words', 'offensive japanese'],
    read_time: '5 min read',
    author: 'Sensei Tanaka, Lead JLPT Instructor',
    quickAnswer: 'The single most versatile Japanese phrase for daily life and travel is "Sumimasen" (すみません). It functions as "Excuse me", "Pardon me", "I am sorry", and an appreciative "Thank you" when someone goes out of their way to assist you.',
    sections: [
      {
        heading: 'The 10 Golden Survival Phrases',
        text: 'These 10 polite phrases unlock friendly interactions across convenience stores (Konbini), train stations, and traditional Izakaya restaurants:',
        table: {
          headers: ['Phrase (Kanji/Kana)', 'Romaji Pronunciation', 'English Meaning', 'When & How to Use'],
          rows: [
            ['すみません', 'Sumimasen', 'Excuse me / Sorry / Thank you', 'To call a waiter, apologize, or thank a stranger.'],
            ['これをお願いします', 'Kore o onegai shimasu', 'This one please', 'Pointing at a menu item or shop product.'],
            ['いくらですか', 'Ikura desu ka?', 'How much is it?', 'Asking prices while shopping or dining.'],
            ['お会計をお願いします', 'O-kaikei o onegai shimasu', 'The bill, please', 'Asking for the check at restaurants.'],
            ['トイレはどこですか', 'Toire wa doko desu ka?', 'Where is the restroom?', 'Navigating train stations, malls, and restaurants.'],
            ['大丈夫です', 'Daijoubu desu', 'I am okay / No thank you', 'Declining a plastic bag or receipt politely.'],
            ['英語を話せますか', 'Eigo o hanasemasu ka?', 'Can you speak English?', 'Asking staff politely if they know English.'],
            ['ありがとうございます', 'Arigatou gozaimasu', 'Thank you very much (Polite)', 'Showing genuine gratitude to service staff.'],
            ['いただきます', 'Itadakimasu', 'I humbly receive (Bon appétit)', 'Said with hands together right before eating.'],
            ['ごちそうさまでした', 'Gochisousama deshita', 'Thank you for the feast', 'Said to restaurant staff upon finishing your meal.']
          ]
        }
      }
    ],
    faqs: [
      {
        question: 'What is the polite way to say thank you in a Japanese restaurant?',
        answer: 'When finishing your meal, bow slightly and say "Gochisousama deshita" (Thank you for the feast) to the chef or cashier.'
      }
    ]
  }
];

/**
 * Publishes a new automated blog post into Supabase.
 * If a topic from the blueprint is not published yet, it publishes it.
 * Otherwise, it creates an updated daily educational guide.
 */
export const publishDailyBlog = async (): Promise<{ success: boolean; blog?: BlogPost; message: string }> => {
  try {
    // 1. Check existing slugs in Supabase
    const { data: existingBlogs, error: fetchErr } = await supabase
      .from('blogs')
      .select('slug');

    if (fetchErr) {
      console.error("Error fetching existing blogs:", fetchErr);
    }

    const existingSlugs = new Set((existingBlogs || []).map(b => b.slug));

    // 2. Find the first blueprint not yet published
    let selectedBlueprint = TOPIC_CURRICULUM.find(b => !existingSlugs.has(b.slug));

    // 3. If all blueprints exist, dynamically generate a fresh daily post with date stamp
    if (!selectedBlueprint) {
      const todayStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const slugTimestamp = Date.now();
      selectedBlueprint = {
        title: `Daily Japanese Lesson & JLPT Vocabulary Insights (${todayStr})`,
        slug: `daily-japanese-lesson-jlpt-insights-${slugTimestamp}`,
        category: 'JLPT Preparation',
        image: '/images/courses/jlpt-n5.jpg',
        excerpt: `Daily JLPT study bite: Essential Japanese vocabulary, grammar particle tips, and cultural etiquette for students and professionals.`,
        meta_description: `Daily Japanese language lesson from Fuji Japanese Academy: JLPT exam preparation, high-frequency Kanji drills, and vocabulary usage.`,
        keywords: ['daily Japanese lesson', 'JLPT preparation', 'Japanese grammar', 'learn Japanese online'],
        negative_keywords: ['free anime stream', 'pirated books'],
        read_time: '5 min read',
        author: 'Sensei Tanaka, Lead JLPT Instructor',
        quickAnswer: `Consistency is the golden key to fluency in Japanese. Studying just 20 minutes every day yields 5x better retention than studying 3 hours once a week. Focus on active recall and conversational output with native instructors.`,
        sections: [
          {
            heading: 'Today’s High-Frequency JLPT Vocabulary',
            text: 'Here are 5 high-yield words tested frequently on JLPT examinations:',
            table: {
              headers: ['Kanji', 'Kana', 'Meaning', 'Example Sentence'],
              rows: [
                ['毎日', 'まいにち (mainichi)', 'Every day', '毎日日本語を勉強します (I study Japanese every day)'],
                ['頑張る', 'がんばる (ganbaru)', "To do one's best", '試験を頑張ってください (Do your best on the exam)'],
                ['大切', 'たいせつ (taisetsu)', 'Important / Precious', '時間は大切です (Time is precious)'],
                ['約束', 'やくそく (yakusoku)', 'Promise / Appointment', '友達と約束があります (I have an appointment with a friend)'],
                ['準備', 'じゅんび (junbi)', 'Preparation', '旅行の準備をします (I prepare for the trip)']
              ]
            }
          }
        ],
        faqs: [
          {
            question: 'How can I enroll in Fuji Japanese Academy batches?',
            answer: 'Visit fujijapaneseacademy.com/courses to explore upcoming cohorts, or book a free consultation with our admissions counselors.'
          }
        ]
      };
    }

    // Build markdown content string
    let markdownContent = `## Quick Answer: ${selectedBlueprint.title}\n${selectedBlueprint.quickAnswer}\n\n---\n\n`;

    selectedBlueprint.sections.forEach(sec => {
      markdownContent += `### ${sec.heading}\n${sec.text}\n\n`;
      if (sec.table) {
        markdownContent += `| ${sec.table.headers.join(' | ')} |\n`;
        markdownContent += `| ${sec.table.headers.map(() => ':---').join(' | ')} |\n`;
        sec.table.rows.forEach(row => {
          markdownContent += `| ${row.join(' | ')} |\n`;
        });
        markdownContent += '\n';
      }
    });

    const newPost: BlogPost = {
      id: `blog-${Date.now()}`,
      title: selectedBlueprint.title,
      slug: selectedBlueprint.slug,
      excerpt: selectedBlueprint.excerpt,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      category: selectedBlueprint.category,
      image: selectedBlueprint.image,
      content: markdownContent,
      meta_description: selectedBlueprint.meta_description,
      keywords: selectedBlueprint.keywords,
      negative_keywords: selectedBlueprint.negative_keywords,
      faqs: selectedBlueprint.faqs,
      read_time: selectedBlueprint.read_time,
      author: selectedBlueprint.author,
      is_published: true,
      published_at: new Date().toISOString()
    };

    const { error: insertErr } = await supabase
      .from('blogs')
      .insert([newPost]);

    if (insertErr) {
      if (import.meta.env.DEV) console.error("Error inserting blog to Supabase:", insertErr);
      return { success: false, message: insertErr.message };
    }

    return { success: true, blog: newPost, message: "Blog published successfully!" };

  } catch (err: any) {
    if (import.meta.env.DEV) console.error("Critical failure in publishDailyBlog:", err);
    return { success: false, message: err.message || "Failed to publish blog." };
  }
};
