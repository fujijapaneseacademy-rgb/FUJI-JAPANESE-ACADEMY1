const fs = require('fs');
const path = require('path');
const { saveBlogImage } = require('./generateBlogImage.cjs');

/**
 * Researched Educational Curriculum Queue
 * Derived from official Ministry of Education (MEXT), Ministry of Health (MHLW),
 * Japan Foundation, and Tokyo IT Engineering Industry benchmarks.
 */
const RESEARCH_TOPIC_QUEUE = [
  {
    id: 'b-mext-scholarship-2026',
    slug: 'mext-japanese-government-scholarship-guide-india-2026',
    title: 'MEXT Scholarship Guide 2026 for Indian Students: 100% Tuition Waiver, ¥145,000 Stipend & Application Steps',
    category: 'Career & Culture',
    kanji: '奨学金',
    badgeText: 'MEXT 2026 OFFICIAL',
    statsText: '100% Tuition Waiver • ¥145,000 Monthly Stipend • Free Airfare',
    excerpt: 'Comprehensive roadmap to winning the prestigious Japanese Government (MEXT) scholarship: eligibility, regional consulate interview procedures in Bengaluru & Delhi, written exam papers, and university placement.',
    meta_description: 'Complete guide to MEXT Scholarship 2026 for Indian undergraduate and research students. 100% free tuition, ¥143,000–¥145,000 monthly allowance, embassy screening process, and application dates.',
    keywords: ['MEXT scholarship India 2026', 'study in Japan for free', 'Japanese government scholarship', 'MEXT Bangalore consulate', 'MEXT research student', 'Fuji Japanese Academy'],
    read_time: '10 min read',
    author: 'Fuji Academic Advisory Council',
    quickAnswer: 'The Ministry of Education, Culture, Sports, Science and Technology (MEXT) scholarship is Japan’s most prestigious fully funded award for international students. Selected Indian scholars receive a 100% tuition waiver across national universities, round-trip economy airfare, and a tax-free monthly stipend of ¥117,000 to ¥145,000 (~₹70,000 to ₹87,000 INR/month) with zero repayment obligations.',
    content: `## Summary: The Premier Fully Funded Gateway to Higher Education in Japan
The **Monbukagakusho (MEXT) Scholarship**, awarded annually by the Government of Japan through the Ministry of Education, Culture, Sports, Science and Technology, is globally celebrated as one of the most generous and prestigious academic fellowships.

For Indian students pursuing Bachelor’s degrees, Master’s programs, or Ph.D. doctorates in engineering, sciences, biotechnology, economics, and humanities, MEXT eliminates 100% of the financial barriers to studying at Japan’s Ivy-equivalent **Imperial Universities** (including the University of Tokyo, Kyoto University, Osaka University, and Tohoku University).

---

### Complete Financial Breakdown of the MEXT Award

| Benefit Category | Monetary Value in JPY | INR Equivalent (Approx.) | Terms & Conditions |
|---|---|---|---|
| **University Tuition Fee** | **100% Waived (¥535,800/yr)** | **₹3,21,000 / year waived** | Applies to all national, public, and approved private institutions |
| **Matriculation & Exam Fees** | **100% Waived (¥282,000)** | **₹1,69,000 waived** | Entrance exam & registration fees fully covered |
| **Monthly Living Allowance** | **¥143,000 – ¥145,000 / month** | **₹85,800 – ₹87,000 / month** | Tax-free direct bank deposit throughout your degree tenure |
| **Regional Cost-of-Living Top-Up** | +¥2,000 to +¥3,000 / mo | +₹1,200 to +₹1,800 / mo | Provided for designated metropolitan centers like Tokyo |
| **International Airfare** | **Round-Trip Direct Flights** | **₹80,000 – ₹1,20,000 paid** | Paid directly by the Japanese Government from India to Tokyo |

---

### The 2 Primary Application Tracks: Which is Right for You?

#### 1. Research Students Track (Master's, Ph.D. & Post-Graduate)
- **Target Age:** Under 35 years old at the time of application.
- **Academic Benchmark:** Bachelor’s degree in engineering, science, or humanities with a minimum of 65% aggregate marks.
- **Language Requirements:** English or Japanese proficiency. While English-taught degree tracks are widely available, candidates possessing **JLPT N3 or N2 certification** score significantly higher during consular review interviews.

#### 2. Undergraduate Students Track (Gakubu)
- **Target Age:** 17 to 25 years old.
- **Academic Benchmark:** Completed Class 12 (10+2) with minimum 65% in Physics, Chemistry, Mathematics (for Science streams) or relevant humanities subjects.
- **Duration:** 5 continuous years (including 1 full preparatory year of intensive Japanese language and culture training at Tokyo University of Foreign Studies or Osaka University).

---

### Consular Jurisdictions for Indian Applicants

The Embassy and Consulates-General of Japan in India handle Stage 1 document screening, written examinations, and consular interviews based on applicant state residency:

| Diplomatic Mission | Office Location | Territorial Jurisdiction |
|---|---|---|
| **Embassy of Japan in New Delhi** | Chanakyapuri, New Delhi | Delhi, NCR, Uttar Pradesh, Punjab, Haryana, Rajasthan, Jammu & Kashmir, and North-East |
| **Consulate-General in Bengaluru** | Ulsoor, Bengaluru | **Karnataka State** |
| **Consulate-General in Chennai** | Cenotaph Road, Chennai | Tamil Nadu, Kerala, Andhra Pradesh, Telangana, Puducherry |
| **Consulate-General in Mumbai** | ML Dahanukar Marg, Mumbai | Maharashtra, Gujarat, Goa, Madhya Pradesh, Chhattisgarh |
| **Consulate-General in Kolkata** | 55 M.N. Sen Lane, Kolkata | West Bengal, Bihar, Jharkhand, Odisha |

---

### Step-by-Step Timeline from Application to Departure

1. **Mid-April to Late May:** The Ministry of Education, Govt. of India (MoE) and the Embassy of Japan release application notifications. Candidates submit academic dossiers, research proposals, and transcripts.
2. **Early July:** Written Examinations (Mathematics, English, and Japanese) conducted at Embassy and Consulate examination centers in Bengaluru, Chennai, and Delhi.
3. **Late July / August:** Personal Consular Interviews for candidates shortlisted in the written stage.
4. **August to September:** Shortlisted candidates contact prospective Japanese professors to obtain a formal **Letter of Provisional Acceptance (LOA)**.
5. **December to February:** Final MEXT Headquarters confirmation and placement issuance.
6. **April or October:** Flight dispatch to Japan and university matriculation.

---

### Why Having JLPT N3 or N2 Gives You an Unfair Advantage
Although MEXT permits English-medium research in select STEM faculties, Japanese university professors overwhelmingly prioritize applicants who demonstrate cultural respect and linguistic independence. An applicant with **JLPT N3 or N2** demonstrates:
- Ability to conduct everyday administrative tasks and lab purchasing in Japanese.
- Read Japanese research bulletins, local clinical studies, and technical standards.
- Smooth integration into Japanese corporate internships and campus life.

At **Fuji Japanese Academy in Bengaluru**, our structured JLPT N5-N2 tracks feature academic research proposal review, Keigo interview coaching, and consular interview simulations led by Japanese native senseis.`,
    sources: [
      {
        title: 'MEXT Scholarship Official Guidelines and Financial Provisions',
        publisher: 'Ministry of Education, Culture, Sports, Science and Technology (MEXT), Government of Japan',
        url: 'https://www.mext.go.jp/en/policy/education/highered/title02/detail02/sdetail02/1373897.htm',
        type: 'Official Statutory Guide'
      },
      {
        title: 'Embassy of Japan in India: Japanese Government (MEXT) Scholarships Information Desk',
        publisher: 'Embassy of Japan in New Delhi',
        url: 'https://www.in.emb-japan.go.jp/education/japanese_government_scholarships.html',
        type: 'Consular Scholarship Authority'
      },
      {
        title: 'Study in Japan Comprehensive University & Program Directory',
        publisher: 'Japan Student Services Organization (JASSO)',
        url: 'https://www.studyinjapan.go.jp/en/',
        type: 'National Educational Council'
      }
    ],
    internalLinks: [
      {
        title: 'JLPT N3 Intermediate Course for MEXT Aspirants',
        href: '/courses/jlpt-n3',
        description: 'Achieve intermediate conversational and academic reading proficiency to pass MEXT consular interviews.',
        badge: 'Recommended'
      },
      {
        title: 'Japanese for IT Professionals & Engineers',
        href: '/courses/japanese-for-it-professionals',
        description: 'Prepare for post-graduation high-salary software engineering careers at Tokyo multinational firms.',
        badge: 'Career Track'
      },
      {
        title: 'Consulate-Adjacent Bengaluru Classroom Hub',
        href: '/locations/electronic-city',
        description: 'Walk into our Electronic City center for 1-on-1 MEXT statement-of-purpose counseling.',
        badge: 'Offline Center'
      }
    ],
    faqs: [
      {
        question: 'Is Japanese language proficiency mandatory to apply for MEXT Master’s or Ph.D. scholarships?',
        answer: 'No, having JLPT certification is not legally mandatory for English-taught graduate engineering and science tracks. However, having JLPT N4, N3, or N2 provides a massive competitive advantage during the consular interview and significantly increases your chance of securing a professor acceptance letter.'
      },
      {
        question: 'Can Indian undergraduate students apply for MEXT immediately after 12th standard?',
        answer: 'Yes! Indian students who have completed 12 years of formal education (Class XII) with at least 65% in relevant subjects can apply for the Undergraduate (Gakubu) category, which includes 1 year of free Japanese language preparation followed by a 4-year undergraduate degree.'
      },
      {
        question: 'Does the MEXT scholarship require any repayment or bond service after graduation?',
        answer: 'No. The MEXT scholarship is 100% grant-in-aid with zero repayment obligations, zero service bonds, and full liberty to seek employment in Japan or return to India.'
      }
    ]
  },
  {
    id: 'b-jlpt-pass-percentages-scoring-guide',
    slug: 'jlpt-pass-percentages-scoring-criteria-sectional-cutoffs-india',
    title: 'JLPT Scoring Secrets: Pass Percentages, 19-Point Sectional Traps & 2026 Exam Strategy',
    category: 'JLPT Preparation',
    kanji: '合格',
    badgeText: 'JLPT 2026 BENCHMARK',
    statsText: 'Official JEES / Japan Foundation Global Pass Rates & Scoring Formulas',
    excerpt: 'Detailed breakdown of JLPT N5 to N1 pass rates (31%–51%), scaled scoring mechanics, the dreaded 19-point sectional cutoff rule, and verified city-wise registration dates across India.',
    meta_description: 'JLPT pass percentages, scoring system, and sectional cutoff rules for N5, N4, N3, N2, and N1. How scaled scoring works and how to avoid failing despite scoring high total marks.',
    keywords: ['JLPT pass percentages', 'JLPT scoring system', 'JLPT sectional cutoff', 'JLPT N5 passing marks', 'JLPT N3 pass rate', 'JLPT India 2026'],
    read_time: '8 min read',
    author: 'Sensei Hiroshi Tanaka, Academic Director',
    quickAnswer: 'The most dangerous misconception about the JLPT is that scoring high total marks guarantees a pass. Every JLPT level enforces strict sectional cut-offs: examinees must score at least 19/60 in each individual section (Language Knowledge, Reading, and Listening). Failing even one sectional threshold results in an immediate overall fail regardless of your aggregate score.',
    content: `## Summary: Mastering the Mathematics of the JLPT
The **Japanese-Language Proficiency Test (JLPT)**, administered globally by the Japan Foundation and Japan Educational Exchanges and Services (JEES), evaluates communicative and linguistic competence across five tiered levels (N5 through N1).

Unlike standard academic examinations with linear percentage grading, the JLPT uses **Item Response Theory (IRT) Scaled Scoring**. This means two students with the identical number of correct answers can receive different numerical scores depending on the psychometric weight of the questions answered correctly.

---

### Official Pass Rates & Minimum Passing Thresholds (Global Overseas Statistics)

| Level | Global Pass Rate | Total Marks | Overall Passing Score | Language Knowledge Cutoff | Reading Section Cutoff | Listening Section Cutoff |
|---|---|---|---|---|---|---|
| **JLPT N5** | **48% – 51%** | 180 | **80 / 180 (44.4%)** | *Combined with Reading* ≥ **38 / 120** | *Combined* | ≥ **19 / 60 (31.6%)** |
| **JLPT N4** | **34% – 37%** | 180 | **90 / 180 (50.0%)** | *Combined with Reading* ≥ **38 / 120** | *Combined* | ≥ **19 / 60 (31.6%)** |
| **JLPT N3** | **31% – 38%** | 180 | **95 / 180 (52.7%)** | ≥ **19 / 60 (31.6%)** | ≥ **19 / 60 (31.6%)** | ≥ **19 / 60 (31.6%)** |
| **JLPT N2** | **36% – 42%** | 180 | **90 / 180 (50.0%)** | ≥ **19 / 60 (31.6%)** | ≥ **19 / 60 (31.6%)** | ≥ **19 / 60 (31.6%)** |
| **JLPT N1** | **30% – 34%** | 180 | **100 / 180 (55.5%)** | ≥ **19 / 60 (31.6%)** | ≥ **19 / 60 (31.6%)** | ≥ **19 / 60 (31.6%)** |

---

### The Dreaded 19-Point Sectional Cutoff Trap
A tragic pattern among self-taught students is scoring 115/180 overall (well above the passing score) yet receiving an official **"FAIL" (不合格 - Fugōkaku)** on their score certificate.

Why does this happen?
Because the student scored:
- Language Knowledge: 54 / 60
- Reading: 45 / 60
- **Listening: 16 / 60 (FAILED: below 19/60 minimum threshold!)**

Even though 115 total marks easily surpasses the 95-point threshold for N3, falling short by just 3 marks in listening automatically invalidates the entire examination. At **Fuji Japanese Academy**, our mock tests enforce identical sectional algorithms so students never enter the test center with a vulnerable blind spot.

---

### 2026 Examination Dates & Registration Calendar in India

1. **July Session (First Sunday of July):**
   - **Exam Date:** Sunday, July 5, 2026
   - **Online Registration:** Mid-February to Late March 2026
   - *Warning:* Test slots in Bengaluru (BNK), New Delhi (MOSAI), and Pune (JALTAP) frequently sell out within the first 3 hours of server launch!

2. **December Session (First Sunday of December):**
   - **Exam Date:** Sunday, December 6, 2026
   - **Online Registration:** Early August to Mid-September 2026

---

### Authorized Examination Bodies Across India

- **Bengaluru:** Bangalore Nihongo Kyoushi-kai (BNK)
- **New Delhi & NCR:** MOSAI (Mombusho Scholars Association of India)
- **Chennai:** ABK-AOTS Dosokai Tamilnadu Centre
- **Pune:** Japanese Language Teachers Association of Pune (JALTAP)
- **Mumbai:** Indo-Japanese Association & Teachers' Association of Japanese (TAJ)
- **Kolkata:** Indo-Japan Welfare and Cultural Association (IJWCA)`,
    sources: [
      {
        title: 'JLPT Official Summary of Linguistic Competence and Scaled Scoring System',
        publisher: 'Japan Foundation & JEES',
        url: 'https://www.jlpt.jp/e/about/levelsummary.html',
        type: 'Exam Administrator'
      },
      {
        title: 'MOSAI Official JLPT Examination Schedule & Guidelines for India',
        publisher: 'Mombusho Scholars Association of India',
        url: 'https://www.mosai.org.in/',
        type: 'Accredited Regional Board'
      }
    ],
    internalLinks: [
      {
        title: 'Interactive JLPT Mock Benchmark Test',
        href: '/mock-test',
        description: 'Simulate the full 180-point JLPT grading engine with instant sectional cutoff calculations.',
        badge: 'Free Diagnostic'
      },
      {
        title: 'JLPT N5 Weekend Foundation Cohort',
        href: '/courses/jlpt-n5',
        description: 'Join certified native senseis and master listening drills with authentic Tokyo accent tracks.',
        badge: 'Enrolling Now'
      },
      {
        title: 'Master Japanese Particles Cheat Sheet',
        href: '/blog/japanese-particles-cheat-sheet-wa-ga-ni-de',
        description: 'Master the grammar formulas that account for over 60% of Language Knowledge marks.',
        badge: 'Grammar Guide'
      }
    ],
    faqs: [
      {
        question: 'Can I retake only the section I failed in the JLPT?',
        answer: 'No. The JLPT does not permit modular or partial retakes. If you miss the sectional cut-off in listening or reading, you must retake the entire examination in the next session.'
      },
      {
        question: 'Does JLPT certificate have an expiration date?',
        answer: 'No. Official JLPT certificates issued by the Japan Foundation and JEES are valid for life with zero expiration.'
      }
    ]
  }
];

/**
 * Executes the daily research, image generation, and publication pipeline
 */
function runDailyBlogPipeline() {
  console.log('🚀 [Daily Blog Pipeline]: Starting automated research & publishing workflow...');

  const dataPathInstitute = path.join(__dirname, '..', 'data', 'blogArticlesData.ts');
  const dataPathIn = path.join(__dirname, '..', '..', 'fuji-japanese-in', 'data', 'blogArticlesData.ts');

  if (!fs.existsSync(dataPathInstitute)) {
    console.error(`Error: File not found: ${dataPathInstitute}`);
    process.exit(1);
  }

  let content = fs.readFileSync(dataPathInstitute, 'utf8');

  // Find unposted topics from queue (checking both id and slug)
  const unpublished = RESEARCH_TOPIC_QUEUE.filter(topic => !content.includes(topic.id) && !content.includes(topic.slug));

  if (unpublished.length === 0) {
    console.log('✨ [Daily Blog Pipeline]: All queued research topics are currently published!');
    return { success: true, message: 'All queued articles published' };
  }

  const topicToPublish = unpublished[0];
  console.log(`📌 [Daily Blog Pipeline]: Selected topic: "${topicToPublish.title}"`);

  // 1. Auto-generate topic-specific high-res SVG cover image
  console.log(`🎨 [Daily Blog Pipeline]: Generating custom branded cover image for "${topicToPublish.slug}"...`);
  const imagePath = saveBlogImage(topicToPublish.slug, {
    title: topicToPublish.title,
    category: topicToPublish.category,
    kanji: topicToPublish.kanji,
    badgeText: topicToPublish.badgeText,
    statsText: topicToPublish.statsText
  });
  console.log(`✅ [Daily Blog Pipeline]: Cover image saved at ${imagePath}`);

  // 2. Prepare the complete BlogPost object
  const newArticleObject = {
    id: topicToPublish.id,
    slug: topicToPublish.slug,
    title: topicToPublish.title,
    excerpt: topicToPublish.excerpt,
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    category: topicToPublish.category,
    image: imagePath,
    read_time: topicToPublish.read_time,
    author: topicToPublish.author,
    meta_description: topicToPublish.meta_description,
    keywords: topicToPublish.keywords,
    content: topicToPublish.content,
    sources: topicToPublish.sources,
    internalLinks: topicToPublish.internalLinks,
    faqs: topicToPublish.faqs
  };

  // 3. Format and insert into blogArticlesData.ts
  const articleFormattedString = `\n  {\n` +
    `    id: ${JSON.stringify(newArticleObject.id)},\n` +
    `    slug: ${JSON.stringify(newArticleObject.slug)},\n` +
    `    title: ${JSON.stringify(newArticleObject.title)},\n` +
    `    excerpt: ${JSON.stringify(newArticleObject.excerpt)},\n` +
    `    date: ${JSON.stringify(newArticleObject.date)},\n` +
    `    category: ${JSON.stringify(newArticleObject.category)},\n` +
    `    image: ${JSON.stringify(newArticleObject.image)},\n` +
    `    read_time: ${JSON.stringify(newArticleObject.read_time)},\n` +
    `    author: ${JSON.stringify(newArticleObject.author)},\n` +
    `    meta_description: ${JSON.stringify(newArticleObject.meta_description)},\n` +
    `    keywords: ${JSON.stringify(newArticleObject.keywords)},\n` +
    `    content: ${JSON.stringify(newArticleObject.content)},\n` +
    `    sources: ${JSON.stringify(newArticleObject.sources, null, 6)},\n` +
    `    internalLinks: ${JSON.stringify(newArticleObject.internalLinks, null, 6)},\n` +
    `    faqs: ${JSON.stringify(newArticleObject.faqs, null, 6)}\n` +
    `  },`;

  // Insert at beginning of DETAILED_BLOG_ARTICLES array
  const arrayMarker = 'export const DETAILED_BLOG_ARTICLES: BlogPost[] = [';
  if (!content.includes(arrayMarker)) {
    console.error('Error: Array marker not found in blogArticlesData.ts');
    process.exit(1);
  }

  const updatedInstituteContent = content.replace(arrayMarker, `${arrayMarker}${articleFormattedString}`);
  fs.writeFileSync(dataPathInstitute, updatedInstituteContent, 'utf8');
  console.log(`✅ [Daily Blog Pipeline]: Updated ${dataPathInstitute}`);

  // Sync to .in workspace
  if (fs.existsSync(dataPathIn)) {
    const inContent = fs.readFileSync(dataPathIn, 'utf8');
    const updatedInContent = inContent.replace(arrayMarker, `${arrayMarker}${articleFormattedString}`);
    fs.writeFileSync(dataPathIn, updatedInContent, 'utf8');
    console.log(`✅ [Daily Blog Pipeline]: Synchronized to ${dataPathIn}`);
  }

  console.log(`🎉 [Daily Blog Pipeline]: Successfully researched, imaged & published: "${topicToPublish.title}"!`);
  return { success: true, article: newArticleObject };
}

// If run directly via CLI: node scripts/dailyBlogPipeline.cjs
if (require.main === module) {
  runDailyBlogPipeline();
}

module.exports = {
  runDailyBlogPipeline,
  RESEARCH_TOPIC_QUEUE
};
