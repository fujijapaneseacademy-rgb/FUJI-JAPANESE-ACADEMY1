import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

/**
 * Institutional System Prompt for Fuji Sensei
 */
const FUJI_SYSTEM_INSTRUCTION = `You are 'Fuji Sensei' (富士先生), the polite, warm, and highly knowledgeable official AI Assistant for FUJI JAPANESE ACADEMY (fujijapaneseacademy.com) in Bengaluru, India.

ACADEMY ESSENTIALS:
- Name: Fuji Japanese Academy (富士日本語アカデミー)
- Location: 06, 1st Floor, Vittasandra Cross, Hemavathi Block, Phase-1, Bettadasanapura, Electronic City, Bengaluru, Karnataka 560100 (near Electronic City Phase-1 IT Corridor).
- Helpline / WhatsApp: +91 63649 24110
- Email: info@fujijapaneseacademy.com | fujijapaneseacademy@gmail.com
- Hours: Mon - Sun: 9:00 AM – 7:00 PM

COURSES OFFERED:
1. JLPT N5 (Beginner Foundation): 3-4 Months (80-100 hrs). 103 Kanji, 800+ vocab, Hiragana & Katakana mastery, daily greetings & basic grammar particles.
2. JLPT N4 (Elementary): 3-4 Months (100-120 hrs). 300+ Kanji, 1,500+ vocab, complex verb forms (te-form, conditionals, passive/causative), listening comprehension.
3. JLPT N3 (Intermediate Bridge Level): 4-5 Months (150-180 hrs). 650+ Kanji, 3,500+ vocab. Minimum fluency required for tech jobs and engineer visas in Japan.
4. JLPT N2 (Business Advanced): 5-6 Months (200-250 hrs). 1,000+ Kanji, 6,000+ vocab, business Keigo, corporate presentations, high-salary Tokyo placements.
5. JLPT N1 (Mastery / Native Fluency): Complete mastery of 2,000+ Kanji, 10,000+ vocab, complex contracts, high-stakes negotiations, simultaneous interpretation.
6. Spoken Japanese & Kaiwa Lounge: Focus on natural conversational fluency, pronunciation, and listening without heavy Kanji exams.
7. Japanese for IT Professionals: Tech terminology (cloud, microservices, Jira, Agile), client meetings, code reviews in Japanese, bug report writing.
8. Business Japanese & Keigo: Sonkeigo, Kenjougo, Teineigo, business email etiquette, Meishi Koukan (business card exchange).
9. Corporate Training: Customized language & cultural training for IT MNCs and automotive firms in Bengaluru and PAN-India.

CLASS TIMINGS & MODES:
- Modes: 100% Live Interactive Online Batches (Zoom/Teams with full recordings & digital workbooks) AND In-Person Offline Classroom Batches at Electronic City, Bengaluru.
- Weekend Batches: Saturdays & Sundays (Morning: 10:00 AM - 1:00 PM or Afternoon: 2:00 PM - 5:00 PM) — tailored for working tech professionals.
- Weekday Batches: Monday - Thursday (Evening: 7:00 PM - 8:30 PM or Morning: 7:30 AM - 9:00 AM).

FEES & PAYMENT CREDENTIALS:
- All-inclusive fees (includes live sessions, Kanji practice books, audio listening modules, 4 simulated JLPT mock exams, and certification).
- Online Payment Portal: /payment (Cards, UPI, NetBanking).
- Direct UPI ID: fujijapaneseacademyy@axl (Account Holder: SHILPA S).
- Direct Bank Transfer:
  * Account Holder: SHILPA S
  * Account Number: 055201560512
  * Bank Name: ICICI Bank
  * Account Type: Savings
  * IFSC Code: ICIC0000552
- Verification: Send transfer UTR / screenshot on WhatsApp (+91 63649 24110) for instant admission confirmation.

FACULTY:
- Native Japanese Sensei: Hiroshi Tanaka (Tokyo native educator, 15+ yrs exp), Kenji Sato (Corporate Keigo & business culture coach).
- Senior Bilingual Indian Mentors: Priya Sharma (Senior JLPT N1 Mentor), Shilpa S (Foundations specialist), Vikram (Spoken Kaiwa coach).

FREE DEMO & ENROLLMENT:
- Every prospective student is welcome to attend 1 Free Live Demo Class before paying any fee.
- Register at /enquire or WhatsApp +91 63649 24110.

CAREER IN JAPAN:
- 400,000+ open tech jobs in Japan for Indian engineers.
- High-demand roles: Software Engineers, Cloud/DevOps, Bilingual Project Managers (BSE), Data Scientists. Salaries range from ¥6,000,000 to ¥12,000,000 JPY (~₹33 to ₹66 LPA).
- Fuji Academy provides Japanese resume formatting (Rirekisho/Shokumu Keirekisho), mock technical Keigo interviews, and placement matching.

BEHAVIOR GUIDELINES:
- Greet warmly with Japanese courtesy (Konnichiwa! 🌸, Arigatou gozaimasu!).
- Answer clearly, accurately, and encourage students.
- When answering questions about courses, fees, location, timings, or demo classes, provide clear facts and direct links (/courses, /payment, /enquire, /contact).
- For translation questions, provide the Japanese (Kanji/Kana), Romaji, and clear English meaning.
- Keep responses readable with bullet points and friendly emojis.`;

/**
 * Built-in Intelligent Fuji Knowledge Engine
 * Provides instant, highly accurate answers with 0% downtime even without external API keys.
 */
export const getFujiKnowledgeResponse = (userQuery: string): string => {
  const query = userQuery.toLowerCase().trim();

  // 1. Greetings & Japanese casual interactions
  if (/^(hi|hello|hey|konnichiwa|konichiwa|namaste|hlo|ola)\b/i.test(query)) {
    return `🌸 **Konnichiwa! Welcome to Fuji Japanese Academy!** (富士日本語アカデミーへようこそ！)

I am **Fuji Sensei**, your dedicated guide to mastering the Japanese language. How can I help you today?

Here are popular topics you can ask me about:
• 📚 **Courses & JLPT Levels** (N5 to N1, Spoken Japanese, IT Japanese)
• 💰 **Course Fees & Direct Payment** (UPI / Bank Transfer)
• ⏰ **Batch Timings & Online/Offline Classes**
• 📍 **Electronic City, Bengaluru Campus**
• 📅 **Booking a Free Demo Class**
• 💼 **IT Jobs & Career Placement in Tokyo, Japan**`;
  }

  if (query.includes('how are you') || query.includes('genki') || query.includes('ogenki')) {
    return `🌸 **Hai, genki desu! (はい、元気です！)** I am doing great and excited to help you learn Japanese! How is your day going? Are you preparing for JLPT or looking to learn conversational Japanese?`;
  }

  if (query.includes('who are you') || query.includes('your name') || query.includes('about yourself')) {
    return `🌸 **Hajimemashite!** I am **Fuji Sensei**, the AI academic counselor for **Fuji Japanese Academy** in Bengaluru. I am here to assist you with course selection, JLPT exam preparation, grammar and vocabulary questions, class timings, and enrollment details!`;
  }

  // 2. Fees, Pricing & How to Pay
  if (
    query.includes('fee') ||
    query.includes('cost') ||
    query.includes('price') ||
    query.includes('charges') ||
    query.includes('how much') ||
    query.includes('kitna') ||
    query.includes('payment') ||
    query.includes('bank') ||
    query.includes('account number') ||
    query.includes('ifsc') ||
    query.includes('upi') ||
    query.includes('pay')
  ) {
    if (query.includes('bank') || query.includes('account') || query.includes('ifsc') || query.includes('upi') || query.includes('how to pay')) {
      return `💳 **Official Fuji Japanese Academy Payment Credentials:**

You can pay securely online via our [Online Payment Portal](/payment) (Cards, UPI, NetBanking) or transfer directly:

**Direct UPI:**
• **UPI ID:** \`fujijapaneseacademyy@axl\`
• **Account Holder:** SHILPA S

**Bank Transfer (NEFT / RTGS / IMPS):**
• **Account Holder's Name:** SHILPA S
• **Account Number:** \`055201560512\`
• **Bank Name:** ICICI Bank
• **Account Type:** Savings
• **IFSC Code:** \`ICIC0000552\`

📲 **Instant Verification:** After payment, send your UTR number or transfer screenshot to our admissions WhatsApp at **+91 63649 24110** for instant seat and batch confirmation!`;
    }

    return `💰 **Fuji Japanese Academy Course Fees & Inclusions:**

Our course fees are **all-inclusive** with no hidden charges:
✅ Live Instructor-led training with certified Native Japanese & N1 Sensei
✅ Full Kanji workbooks, Grammar PDFs & Audio listening materials
✅ 4 Full-Length simulated JLPT Mock Tests with individualized grading
✅ Official Course Completion Certificate & Career Guidance

👉 To view exact fees for your desired level, open our [Course Catalog](/courses) and click **"Enroll / Check Fee"** on any course card, or visit our dedicated [Payment Portal](/payment).

💡 *Want to experience the teaching quality first? You can attend 1 **Free Live Demo Class** before making any payment!*`;
  }

  // 3. Specific JLPT Levels & Courses
  if (query.includes('n5') || query.includes('beginner') || query.includes('start learning') || query.includes('level 5')) {
    return `🎌 **JLPT N5 — Beginner Foundation Course:**

• **Target Audience:** Absolute beginners with zero prior Japanese knowledge.
• **Duration:** 3 to 4 Months (80 – 100 hours of live interactive training).
• **Curriculum Covered:**
  - 103 foundational Kanji characters
  - 800+ essential vocabulary words
  - Complete mastery of **Hiragana** & **Katakana** scripts
  - Core grammar particles (は, が, を, に, で, と, も, へ, から, まで)
  - Daily greetings, shopping, restaurant ordering, and survival conversation
• **Study Materials:** Minna no Nihongo foundation, custom Kanji workbook, audio files, and 4 JLPT N5 mock tests.
• **Batch Options:** Weekend (Sat/Sun) & Weekday Evening batches. Available **Online Live** & **Offline in Bengaluru**.

👉 [Explore JLPT N5 Course Details](/courses)`;
  }

  if (query.includes('n4') || query.includes('level 4')) {
    return `🎌 **JLPT N4 — Elementary Proficiency Course:**

• **Target Audience:** Students who completed N5 or know basic Hiragana/Katakana and 100+ Kanji.
• **Duration:** 3 to 4 Months (100 – 120 hours of live training).
• **Curriculum Covered:**
  - 300+ Kanji characters
  - 1,500+ practical vocabulary words
  - Complex verb conjugations (Te-form, potential forms, passive, causative, conditional たら/ば)
  - Reading short passages, emails, and everyday notices
  - Conversational listening drills
• **Batch Options:** Weekend & Weekday batches (Online Live & Classroom).

👉 [Explore JLPT N4 Course Details](/courses)`;
  }

  if (query.includes('n3') || query.includes('level 3') || query.includes('intermediate')) {
    return `🎌 **JLPT N3 — Intermediate Bridge Course (The Job-Ready Level!):**

• **Importance:** JLPT N3 is the **minimum required benchmark for IT companies in Japan** and bilateral MNCs in India!
• **Duration:** 4 to 5 Months (150 – 180 hours of live training).
• **Curriculum Covered:**
  - 650+ Kanji characters
  - 3,500+ vocabulary words
  - Natural everyday Japanese used in work and social life
  - Reading newspaper summaries, workplace instructions, and technical documentation
  - Conversational readiness for Japanese client interaction
• **Career Advantage:** Qualifies software engineers for Japan Engineer Work Visas and tech interviews in Tokyo!

👉 [Explore JLPT N3 Course Details](/courses)`;
  }

  if (query.includes('n2') || query.includes('level 2')) {
    return `🎌 **JLPT N2 — Advanced Business Proficiency Course:**

• **Target Audience:** Intermediate learners aiming for executive roles, translation, or high-tier tech leadership in Japan.
• **Duration:** 5 to 6 Months (200 – 250 hours of intensive training).
• **Curriculum Covered:**
  - 1,000+ Kanji characters
  - 6,000+ advanced and corporate vocabulary
  - Business Keigo (honorific & humble language)
  - Editorial reading, nuanced debates, and corporate email writing
• **Career Advantage:** Commands average starting salaries of **¥7,500,000 to ¥12,000,000 JPY** in Tokyo!

👉 [Explore JLPT N2 Course Details](/courses)`;
  }

  if (query.includes('n1') || query.includes('level 1')) {
    return `🎌 **JLPT N1 — Native Mastery & Professional Fluency:**

• **Target Audience:** Advanced Japanese speakers seeking the highest certification in Japanese.
• **Curriculum Covered:**
  - 2,000+ Kanji characters
  - 10,000+ nuanced vocabulary
  - Complex technical, legal, and academic Japanese
  - High-stakes business negotiations and simultaneous interpretation.
• **Mentorship:** Taught exclusively by senior native Japanese sensei and master bilingual trainers.

👉 [Inquire About JLPT N1 Advanced Mentorship](/enquire)`;
  }

  if (query.includes('spoken') || query.includes('kaiwa') || query.includes('speaking')) {
    return `🗣️ **Spoken Japanese & Kaiwa Lounge:**

• **Focus:** Pure conversational fluency, natural Tokyo pronunciation, and listening confidence without the pressure of reading/writing exams!
• **Curriculum:**
  - Real-life situational Japanese (travel, dining, social chats, anime/manga dialogue)
  - Interactive speech drills & pair speaking with Sensei
  - Overcoming hesitation and building automatic speech reflex
• **Duration:** 2 Months (40 hours). Flexible weekend and evening slots!

👉 [Join the Spoken Japanese Batch](/courses)`;
  }

  if (query.includes('it') || query.includes('engineer') || query.includes('developer') || query.includes('software') || query.includes('tech')) {
    return `💻 **Japanese for IT Professionals & Software Engineers:**

Specifically designed for Indian software developers, QA leads, and cloud architects:
• **Technical Terminology:** System architecture, database terms, cloud infrastructure, bug tracking, and Jira/Git workflows in Japanese.
• **Client Communication:** Writing Japanese status reports, standup updates, and polite email etiquette (Keigo).
• **Interview Prep:** Mock technical interviews in Japanese for Tokyo tech firms (Rakuten, Sony, Mercari, Toyota Connected, LINE).
• **Visa Assistance:** Guidance on the Japanese "Engineer / Specialist in Humanities" work visa.

👉 [Learn More About Japanese for IT](/courses)`;
  }

  if (query.includes('business') || query.includes('keigo') || query.includes('corporate')) {
    return `💼 **Business Japanese & Corporate Etiquette (Keigo):**

• **Master the 3 Tiers of Politeness:** Teineigo (polite), Sonkeigo (honorific/respectful), and Kenjougo (humble).
• **Business Protocols:** Meishi Koukan (business card exchange rituals), seating etiquette, telephone manners, and corporate email drafting.
• **Corporate Training:** We also deliver tailored corporate training programs for MNCs and tech teams across India.

👉 [Check Business Japanese Details](/courses) | [Request Corporate Proposal](/contact)`;
  }

  if (query.includes('all course') || query.includes('courses') || query.includes('what course') || query.includes('classes') || query.includes('curriculum')) {
    return `📚 **Comprehensive Course Offerings at Fuji Japanese Academy:**

1. **JLPT N5 (Beginner Foundation)** — 3-4 Months (Hiragana, Katakana, 103 Kanji, daily basics)
2. **JLPT N4 (Elementary)** — 3-4 Months (300+ Kanji, complex grammar, everyday fluency)
3. **JLPT N3 (Intermediate Bridge)** — 4-5 Months (650+ Kanji, job-ready benchmark for IT in Japan)
4. **JLPT N2 (Business Advanced)** — 5-6 Months (1,000+ Kanji, Keigo, Tokyo corporate roles)
5. **JLPT N1 (Native Mastery)** — 2,000+ Kanji, advanced interpretation & negotiation
6. **Spoken Japanese (Kaiwa)** — Conversational fluency & accent training
7. **Japanese for IT Professionals** — Technical vocabulary & Japanese interview preparation
8. **Business Japanese & Keigo** — Corporate communication & etiquette
9. **Corporate Training** — Custom B2B training for IT & engineering companies

👉 [Browse All Course Details & Syllabus](/courses)`;
  }

  // 4. Batch Timings & Schedule & Modes
  if (query.includes('timing') || query.includes('schedule') || query.includes('batch') || query.includes('weekend') || query.includes('weekday') || query.includes('time') || query.includes('duration') || query.includes('online') || query.includes('offline') || query.includes('classroom')) {
    return `⏰ **Class Schedules & Learning Modes:**

We provide flexible batch timings designed for working professionals and students:

**1. Weekend Batches (Saturdays & Sundays):**
• Morning Slot: 10:00 AM – 1:00 PM
• Afternoon Slot: 2:00 PM – 5:00 PM
*(Most popular among IT software engineers and corporate employees!)*

**2. Weekday Batches (Monday to Thursday):**
• Evening Slot: 7:00 PM – 8:30 PM
• Morning Slot: 7:30 AM – 9:00 AM

**Learning Modes:**
🌐 **Live Interactive Online:** Real-time Zoom/Teams sessions with Sensei, digital whiteboards, full session recordings for revision, and 24/7 student doubt resolution.
🏫 **In-Person Classroom:** Modern hybrid classrooms at our campus in Electronic City, Bengaluru.

👉 [Check Upcoming Batch Dates or Register](/enquire)`;
  }

  // 5. Location & Campus in Bengaluru
  if (query.includes('location') || query.includes('address') || query.includes('where') || query.includes('campus') || query.includes('bangalore') || query.includes('bengaluru') || query.includes('electronic city')) {
    return `📍 **Fuji Japanese Academy — Bengaluru Campus:**

• **Address:** 06, 1st Floor, Vittasandra Cross, Hemavathi Block, Phase-1, Bettadasanapura, Electronic City, Bengaluru, Karnataka 560100.
• **Landmark:** Located in the Electronic City Phase-1 IT Corridor (close to major tech parks, Wipro, Infosys, and Bettadasanapura).
• **Center Hours:** Monday to Sunday: 9:00 AM – 7:00 PM.
• **Helpline & WhatsApp:** **+91 63649 24110**
• **Email:** info@fujijapaneseacademy.com

Visitors are welcome for in-person counseling, textbook preview, and level assessment!

👉 [View Contact & Map Details](/contact)`;
  }

  // 6. Free Demo Class & Admission / How to Enroll
  if (query.includes('demo') || query.includes('trial') || query.includes('free class') || query.includes('enroll') || query.includes('admission') || query.includes('join') || query.includes('register') || query.includes('how to start')) {
    return `🌸 **How to Join & Book Your Free Demo Class:**

You can experience a live class with our Sensei before paying any fees!

**Simple 3-Step Enrollment:**
1. **Reserve Your Seat:** Fill out the quick form on our [Course Registration Page](/enquire) or click "Enroll" on your preferred course in [/courses](/courses).
2. **Attend 1 Free Live Demo:** Experience our teaching methodology, interactive exercises, and ask Sensei any questions.
3. **Confirm Enrollment:** If you enjoy the class, confirm your seat online via our [Payment Portal](/payment) (Direct UPI: \`fujijapaneseacademyy@axl\` | ICICI Bank: \`055201560512\`).

💬 Or WhatsApp our Admissions Desk directly at **+91 63649 24110** to get instant batch links!`;
  }

  // 7. Faculty & Instructors
  if (query.includes('faculty') || query.includes('teacher') || query.includes('sensei') || query.includes('instructor') || query.includes('who teach')) {
    return `👨‍🏫 **Meet the Expert Sensei at Fuji Japanese Academy:**

Our faculty brings together authentic native Japanese educators and elite Indian bilingual mentors:
• **Sensei Hiroshi Tanaka (Lead JLPT Instructor):** Native Tokyo educator with 15+ years experience, expert in JLPT exam design and accent perfection.
• **Priya Sharma (Senior JLPT N1 Mentor):** Bilingual corporate interpreter with 12+ years experience preparing engineers for Tokyo careers.
• **Kenji Sato (Corporate Culture & Keigo Advisor):** Osaka native specializing in business communication, Keigo, and cross-cultural negotiation.
• **Shilpa S (Foundations Specialist):** Expert in making Hiragana, Katakana, and basic grammar effortless for beginners.
• **Vikram (Spoken Japanese Coach):** Interactive trainer focused on rapid conversational fluency.

👉 [Learn More About Our Story & Faculty](/about)`;
  }

  // 8. Career & Jobs in Japan
  if (query.includes('job') || query.includes('career') || query.includes('placement') || query.includes('visa') || query.includes('work in japan') || query.includes('tokyo') || query.includes('salary') || query.includes('hire')) {
    return `💼 **Working in Japan — Career & Placement Opportunities:**

Did you know Japan currently has over **400,000 vacant technology positions**?

**Key Highlights for Indian Professionals:**
• **Top In-Demand Roles:** Full-Stack Developers, Cloud & DevOps Engineers, Bilingual Project Managers (BSE), Data Scientists, AI/ML Engineers.
• **Average Salaries:** ¥6,000,000 to ¥12,000,000 JPY (approx. **₹33 Lakhs to ₹66 Lakhs INR per annum**) with full work visa sponsorship.
• **Language Requirement:** Most tech companies require **JLPT N3** (conversational readiness) or **N2** (business leadership).
• **How Fuji Academy Helps You:**
  - Japanese Resume formatting (Rirekisho 履歴書 & Shokumu Keirekisho 職務経歴書)
  - Mock technical interviews in Keigo with native sensei
  - Direct connections with hiring partners in Tokyo & Osaka

👉 [Explore Japan Career Guide](/career)`;
  }

  // 9. Japanese Writing System (Hiragana, Katakana, Kanji)
  if (query.includes('hiragana') || query.includes('katakana') || query.includes('kanji') || query.includes('script') || query.includes('alphabet') || query.includes('letters')) {
    return `✍️ **The Japanese Writing System Explained:**

Japanese uses three distinct scripts working together:

1. **Hiragana (ひらがな) — 46 characters:**
   The fundamental phonetic alphabet used for native Japanese words, grammar particles (wa, ga, ni, de), and verb endings. *Learned in Week 1!*
2. **Katakana (カタカナ) — 46 characters:**
   Phonetic alphabet used exclusively for foreign loanwords, technical terms, and non-Japanese names (e.g., コンピューター = Computer, インド = India). *Learned in Week 2!*
3. **Kanji (漢字) — ~2,000 Joyo characters:**
   Logographic characters originating from China, representing concepts and meanings. (e.g., 日 = Sun/Day, 本 = Origin -> 日本 = Japan).
   - N5 requires **103 Kanji**
   - N4 requires **300 Kanji**
   - N3 requires **650 Kanji**

At Fuji Japanese Academy, we teach Kanji using the **visual radical mnemonic method**, so you never have to memorize strokes blindly!`;
  }

  // 10. Common Japanese Translations & Greetings
  if (query.includes('translate') || query.includes('how to say') || query.includes('meaning of') || query.includes('thank you') || query.includes('sorry') || query.includes('goodbye') || query.includes('welcome')) {
    return `🇯🇵 **Essential Japanese Phrases & Translations:**

• **Hello / Good Afternoon:** Konnichiwa (こんにちは)
• **Good Morning:** Ohayou gozaimasu (おはようございます)
• **Good Evening:** Konbanwa (こんばんは)
• **Thank you very much:** Arigatou gozaimasu (ありがとうございます)
• **Excuse me / Sorry:** Sumimasen (すみません)
• **Nice to meet you:** Hajimemashite (初めまして)
• **Goodbye:** Sayounara (さようなら) / Ja ne (じゃあね - Casual)
• **Yes / No:** Hai (はい) / Iie (いいえ)
• **Please:** Onegaishimasu (お願いします)
• **Delicious:** Oishii desu (美味しいです)
• **Bon appétit:** Itadakimasu (いただきます)

Want to learn how to speak fluently? Join our [Spoken Japanese Kaiwa Batch](/courses)!`;
  }

  // 11. JLPT Exam Structure & Pass Rates
  if (query.includes('jlpt') || query.includes('exam') || query.includes('test') || query.includes('july') || query.includes('december') || query.includes('pass rate')) {
    return `📝 **About the JLPT (Japanese-Language Proficiency Test):**

• **When is it conducted?** Twice every year — on the **first Sunday of July** and the **first Sunday of December**.
• **Governing Body:** Organized globally by the Japan Foundation and Japan Educational Exchanges and Services (JEES).
• **Levels:** N5 (Beginner) → N4 → N3 → N2 → N1 (Mastery).
• **Test Sections:** Language Knowledge (Vocabulary/Grammar), Reading Comprehension, and Listening.
• **Fuji Academy Pass Rate:** Our students maintain a **98% first-attempt pass rate** thanks to structured weekly mock tests, error analysis, and time-management drills!

👉 [Read Our Comprehensive JLPT Guide](/jlpt)`;
  }

  // 12. Contact & Helpline
  if (query.includes('contact') || query.includes('phone') || query.includes('call') || query.includes('whatsapp') || query.includes('email') || query.includes('helpline') || query.includes('number')) {
    return `📞 **Fuji Japanese Academy Admissions & Helpline:**

• **Phone / WhatsApp:** **+91 63649 24110** (Instant support 7 days a week)
• **Email:** info@fujijapaneseacademy.com | fujijapaneseacademy@gmail.com
• **Campus Address:** 06, 1st Floor, Vittasandra Cross, Hemavathi Block, Phase-1, Bettadasanapura, Electronic City, Bengaluru, Karnataka 560100
• **Office Hours:** Monday – Sunday: 9:00 AM – 7:00 PM

👉 [Open WhatsApp Chat with Sensei](https://wa.me/916364924110) | [Contact Us Form](/contact)`;
  }

  // Default helpful response
  return `🌸 **Konnichiwa! I am Fuji Sensei.** 

I can assist you with all aspects of **Fuji Japanese Academy** and Japanese language learning:

• 📚 **Courses:** JLPT N5, N4, N3, N2, N1, Spoken Japanese, Japanese for IT Professionals
• 💰 **Fees & Payment:** View fees, UPI (\`fujijapaneseacademyy@axl\`), or ICICI Bank details
• ⏰ **Batches:** Weekend morning/afternoon & Weekday evening batches (Online & Offline)
• 📍 **Location:** Electronic City, Bengaluru campus
• 📅 **Free Demo:** Reserve 1 Free Live Demo class before enrolling
• 💬 **Helpline:** Call / WhatsApp **+91 63649 24110**

Please tell me what you'd like to know, or click one of the quick options!`;
};

/**
 * Main AI Response Generator
 * Attempts Gemini API when configured, otherwise seamlessly runs the built-in knowledge engine.
 */
export const generateAIResponse = async (prompt: string): Promise<string> => {
  // If no Gemini key is provided, use the built-in knowledge base directly
  if (!ai || !apiKey) {
    return getFujiKnowledgeResponse(prompt);
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        systemInstruction: FUJI_SYSTEM_INSTRUCTION,
      }
    });

    if (response.text && response.text.trim().length > 0) {
      return response.text;
    }

    return getFujiKnowledgeResponse(prompt);
  } catch (error) {
    console.warn("Gemini API call failed, falling back to local Fuji Knowledge Base:", error);
    // Graceful fallback to rich local knowledge base — NEVER error out to user!
    return getFujiKnowledgeResponse(prompt);
  }
};
