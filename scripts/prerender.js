import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { INDEXABLE_ROUTES, UTILITY_NOINDEX_ROUTES, BASE_URL } from './routes-data.js';
import { writeSitemaps } from './generate-sitemap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const distDir = path.join(rootDir, 'dist');

function generateNavHtml() {
  return `
    <header class="site-header bg-white border-b border-gray-100 py-3">
      <div class="container mx-auto px-4 flex justify-between items-center">
        <a href="/" class="flex items-center gap-3">
          <img src="/logo.png" alt="Fuji Japanese Academy" width="48" height="48" />
          <span class="font-bold text-xl text-red-600">FUJI JAPANESE ACADEMY</span>
        </a>
        <nav aria-label="Main Navigation" class="hidden md:flex gap-4 text-sm font-semibold text-gray-700">
          <a href="/courses">Courses</a>
          <a href="/jlpt">JLPT Hub</a>
          <a href="/learn">Learn</a>
          <a href="/practice">Practice</a>
          <a href="/career">Career</a>
          <a href="/careers">Careers</a>
          <a href="/locations">Locations</a>
          <a href="/news">News</a>
          <a href="/blog">Blog</a>
          <a href="/about">About Us</a>
          <a href="/contact">Contact</a>
        </nav>
      </div>
    </header>
  `;
}

function generateFooterHtml() {
  return `
    <footer class="site-footer bg-[#1E1B4B] text-white py-12 mt-16">
      <div class="container mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8 text-sm">
        <div>
          <h3 class="font-bold text-lg mb-1">Fuji Japanese Academy</h3>
          <p class="text-xs text-amber-300 font-semibold mb-3">FUJI JAPANESE ACADEMY PRIVATE LIMITED</p>
          <p class="text-gray-300 mb-4">India's premier Japanese language &amp; JLPT institute. Native &amp; bilingual instructors in Electronic City Bengaluru and live interactive online batches.</p>
          <p class="text-amber-300 font-semibold">📞 +91 63649 24110</p>
          <p class="text-gray-300">✉ info@fujijapaneseacademy.com</p>
        </div>
        <div>
          <h4 class="font-bold mb-3 text-amber-300">JLPT Courses</h4>
          <ul class="space-y-1.5 text-gray-300">
            <li><a href="/courses/jlpt-n5">JLPT N5 Foundation</a></li>
            <li><a href="/courses/jlpt-n4">JLPT N4 Basic</a></li>
            <li><a href="/courses/jlpt-n3">JLPT N3 Intermediate</a></li>
            <li><a href="/courses/jlpt-n2">JLPT N2 Business</a></li>
            <li><a href="/courses/jlpt-n1">JLPT N1 Mastery</a></li>
            <li><a href="/courses/spoken-japanese">Spoken Japanese</a></li>
            <li><a href="/courses/business-japanese">Business Japanese (Keigo)</a></li>
            <li><a href="/courses/japanese-for-it-professionals">Japanese for IT</a></li>
            <li><a href="/courses/corporate-japanese-training">Corporate Training</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3 text-amber-300">JLPT &amp; Learning Hubs</h4>
          <ul class="space-y-1.5 text-gray-300">
            <li><a href="/jlpt">JLPT Overview</a></li>
            <li><a href="/jlpt/n5">JLPT N5 Marks &amp; Syllabus</a></li>
            <li><a href="/jlpt/n4">JLPT N4 Breakdown</a></li>
            <li><a href="/jlpt/n3">JLPT N3 IT Benchmark</a></li>
            <li><a href="/learn/hiragana-katakana">Kana Charts &amp; Audio</a></li>
            <li><a href="/learn/vocabulary">Vocabulary Bank</a></li>
            <li><a href="/learn/grammar">Particles Guide</a></li>
            <li><a href="/learn/kanji">Foundation Kanji</a></li>
            <li><a href="/practice">Interactive Quizzes</a></li>
            <li><a href="/mock-test">JLPT Mock Exam Simulator</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold mb-3 text-amber-300">Careers &amp; Campuses</h4>
          <ul class="space-y-1.5 text-gray-300">
            <li><a href="/career/japanese-for-it">Software Jobs in Japan</a></li>
            <li><a href="/career/working-in-japan">Japan Work Visas</a></li>
            <li><a href="/career/japanese-job-interview">Japanese Resume (Rirekisho)</a></li>
            <li><a href="/locations/electronic-city">Electronic City Campus</a></li>
            <li><a href="/locations/bangalore">Bengaluru Classes</a></li>
            <li><a href="/about">About Academy</a></li>
            <li><a href="/contact">Contact Support</a></li>
            <li><a href="/careers" class="text-white font-bold">Careers &amp; Open Positions [HIRING]</a></li>
            <li><a href="/careers#executive-sales-manesar" class="text-amber-300">↳ Executive Sales (Manesar, Haryana)</a></li>
            <li><a href="/news">Academy News</a></li>
          </ul>
        </div>
      </div>
      <div class="container mx-auto px-4 mt-8 pt-6 border-t border-white/10 text-xs text-gray-400 flex flex-wrap justify-between">
        <p>© 2026 FUJI JAPANESE ACADEMY PRIVATE LIMITED. All rights reserved.</p>
        <div class="flex gap-4">
          <a href="/privacy-policy" rel="nofollow">Privacy Policy</a>
          <a href="/terms" rel="nofollow">Terms &amp; Refund Policy</a>
        </div>
      </div>
    </footer>
  `;
}

function getRouteSpecificBody(route) {
  const p = route.path;

  // 1. Homepage
  if (p === '/') {
    return `
      <section class="space-y-8 my-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h2 class="text-xl font-bold text-[#1E1B4B] mb-2">Native Japanese Sensei</h2>
            <p class="text-gray-600 text-sm">Learn accurate Tokyo pronunciation, cultural nuances, and business Keigo from experienced native instructors.</p>
          </div>
          <div class="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h2 class="text-xl font-bold text-[#1E1B4B] mb-2">100% JLPT Pass Track Record</h2>
            <p class="text-gray-600 text-sm">Structured preparation for JLPT N5, N4, N3, N2, and N1 with 4+ full-length simulated mock exams.</p>
          </div>
          <div class="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h2 class="text-xl font-bold text-[#1E1B4B] mb-2">Tokyo IT Career Placement</h2>
            <p class="text-gray-600 text-sm">Direct resume formatting (Rirekisho), Keigo interview coaching, and engineering job placement assistance in Japan.</p>
          </div>
        </div>

        <div class="my-8">
          <h2 class="text-2xl font-bold text-[#1E1B4B] mb-4">Japanese Language Certification Programs</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <a href="/courses/jlpt-n5" class="p-5 rounded-xl border border-gray-200 hover:border-red-500 bg-white block shadow-sm">
              <span class="text-xs font-bold text-red-600 uppercase">Level N5</span>
              <h3 class="font-bold text-[#1E1B4B] mt-1">JLPT N5 Foundation</h3>
              <p class="text-xs text-gray-500 mt-1">103 Kanji • 800+ Vocab • Hiragana &amp; Katakana</p>
            </a>
            <a href="/courses/jlpt-n4" class="p-5 rounded-xl border border-gray-200 hover:border-red-500 bg-white block shadow-sm">
              <span class="text-xs font-bold text-red-600 uppercase">Level N4</span>
              <h3 class="font-bold text-[#1E1B4B] mt-1">JLPT N4 Basic</h3>
              <p class="text-xs text-gray-500 mt-1">300 Kanji • 1,500 Vocab • Everyday Conversation</p>
            </a>
            <a href="/courses/jlpt-n3" class="p-5 rounded-xl border border-gray-200 hover:border-red-500 bg-white block shadow-sm">
              <span class="text-xs font-bold text-red-600 uppercase">Level N3</span>
              <h3 class="font-bold text-[#1E1B4B] mt-1">JLPT N3 Intermediate</h3>
              <p class="text-xs text-gray-500 mt-1">650 Kanji • Bridge to IT Careers in Tokyo</p>
            </a>
            <a href="/courses/jlpt-n2" class="p-5 rounded-xl border border-gray-200 hover:border-red-500 bg-white block shadow-sm">
              <span class="text-xs font-bold text-red-600 uppercase">Level N2</span>
              <h3 class="font-bold text-[#1E1B4B] mt-1">JLPT N2 Advanced</h3>
              <p class="text-xs text-gray-500 mt-1">1,000 Kanji • Business Keigo • Tokyo Relocation</p>
            </a>
          </div>
        </div>

        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h2 class="text-xl font-bold text-[#1E1B4B] mb-2">Classroom &amp; Online Learning Modes</h2>
          <p class="text-gray-700 text-sm mb-4">Choose between in-person classroom batches at Electronic City Phase 1 Bengaluru or live interactive virtual batches with session recordings, native pronunciation drills, and digital workbooks.</p>
          <div class="flex flex-wrap gap-3 text-xs font-semibold text-gray-700 mb-6">
            <span class="px-3 py-1.5 bg-white rounded-lg border">Weekend Batches (Sat &amp; Sun)</span>
            <span class="px-3 py-1.5 bg-white rounded-lg border">Weekday Evening Batches</span>
            <span class="px-3 py-1.5 bg-white rounded-lg border">Small Batches (10-12 Students)</span>
          </div>

          <h3 class="text-sm font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">Bengaluru Centers &amp; Hubs</h3>
          <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
            <a href="/locations/electronic-city" class="p-2.5 bg-white border border-gray-200 rounded-xl block hover:border-red-500 font-medium text-gray-800">
              <strong class="block text-[#1E1B4B]">Electronic City</strong>
              <span class="text-gray-500 text-[11px]">Classroom Campus</span>
            </a>
            <a href="/locations/koramangala" class="p-2.5 bg-white border border-gray-200 rounded-xl block hover:border-red-500 font-medium text-gray-800">
              <strong class="block text-[#1E1B4B]">Koramangala</strong>
              <span class="text-gray-500 text-[11px]">Weekend Batches</span>
            </a>
            <a href="/locations/indiranagar" class="p-2.5 bg-white border border-gray-200 rounded-xl block hover:border-red-500 font-medium text-gray-800">
              <strong class="block text-[#1E1B4B]">Indiranagar</strong>
              <span class="text-gray-500 text-[11px]">Hybrid Classes</span>
            </a>
            <a href="/locations/whitefield" class="p-2.5 bg-white border border-gray-200 rounded-xl block hover:border-red-500 font-medium text-gray-800">
              <strong class="block text-[#1E1B4B]">Whitefield</strong>
              <span class="text-gray-500 text-[11px]">IT Corridor</span>
            </a>
            <a href="/locations/bangalore" class="p-2.5 bg-white border border-gray-200 rounded-xl block hover:border-red-500 font-medium text-gray-800">
              <strong class="block text-[#1E1B4B]">All Bengaluru</strong>
              <span class="text-gray-500 text-[11px]">City Overview</span>
            </a>
          </div>
        </div>

        <div class="p-6 bg-white rounded-2xl border border-red-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span class="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider mb-2">Career Opportunity • Manesar, Haryana</span>
            <h3 class="text-xl md:text-2xl font-bold text-[#1E1B4B]">Now Hiring: Executive Sales / Business Development</h3>
            <p class="text-sm text-gray-600 mt-1 max-w-2xl">Salary: <strong>6 to 10 LPA CTC (Fixed)</strong> • Mandatory JLPT N2/N1 + MBA in Sales/Marketing. Develop and manage bilateral business opportunities with Japanese corporate clients.</p>
          </div>
          <div class="flex flex-wrap gap-3">
            <a href="/careers#executive-sales-manesar" class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-xs md:text-sm rounded-xl shadow-md whitespace-nowrap">
              View Role &amp; Apply &rarr;
            </a>
          </div>
        </div>
      </section>
    `;
  }

  // 2. Courses Catalog
  if (p === '/courses') {
    return `
      <section class="space-y-6 my-8">
        <p class="text-gray-700 leading-relaxed">Fuji Japanese Academy offers structured Japanese language courses mapped to the official Japan Foundation JLPT curriculum. Whether you are an absolute beginner starting with Hiragana and Katakana or an experienced software engineer preparing for bilingual tech roles in Tokyo, our native and JLPT N1 faculty guide you at every milestone.</p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <span class="text-xs font-bold text-red-600 uppercase">Beginner To Intermediate</span>
            <h2 class="text-2xl font-bold text-[#1E1B4B] mt-1 mb-2">JLPT Certification Track</h2>
            <p class="text-sm text-gray-600 mb-4">Targeted courses for official Japanese Language Proficiency Test levels N5, N4, N3, N2, and N1. Includes grammar formulas, kanji drills, audio listening modules, and 4 simulated mock exams.</p>
            <ul class="space-y-2 text-sm text-gray-700">
              <li>• <a href="/courses/jlpt-n5" class="text-red-600 font-medium hover:underline">JLPT N5 Foundation Course</a> (3-4 Months, 80-100 hrs)</li>
              <li>• <a href="/courses/jlpt-n4" class="text-red-600 font-medium hover:underline">JLPT N4 Basic Conversational</a> (3-4 Months, 100-120 hrs)</li>
              <li>• <a href="/courses/jlpt-n3" class="text-red-600 font-medium hover:underline">JLPT N3 Intermediate for IT</a> (4-5 Months, 150-180 hrs)</li>
              <li>• <a href="/courses/jlpt-n2" class="text-red-600 font-medium hover:underline">JLPT N2 Advanced Business Fluency</a> (5-6 Months, 200-250 hrs)</li>
              <li>• <a href="/courses/jlpt-n1" class="text-red-600 font-medium hover:underline">JLPT N1 Master Level</a> (Mastery level with native sensei)</li>
            </ul>
          </div>

          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <span class="text-xs font-bold text-blue-600 uppercase">Professional &amp; Specialized</span>
            <h2 class="text-2xl font-bold text-[#1E1B4B] mt-1 mb-2">Spoken &amp; Corporate Japanese</h2>
            <p class="text-sm text-gray-600 mb-4">Focused courses for spoken conversational fluency, corporate communication etiquette, and technical Japanese for engineers.</p>
            <ul class="space-y-2 text-sm text-gray-700">
              <li>• <a href="/courses/spoken-japanese" class="text-blue-600 font-medium hover:underline">Spoken Japanese &amp; Kaiwa Lounge</a></li>
              <li>• <a href="/courses/business-japanese" class="text-blue-600 font-medium hover:underline">Business Japanese &amp; Corporate Keigo</a></li>
              <li>• <a href="/courses/japanese-for-it-professionals" class="text-blue-600 font-medium hover:underline">Japanese for IT Professionals &amp; Developers</a></li>
              <li>• <a href="/courses/corporate-japanese-training" class="text-blue-600 font-medium hover:underline">Corporate Training for Enterprises</a></li>
              <li>• <a href="/courses/free" class="text-blue-600 font-medium hover:underline">Free Japanese Study Materials &amp; PDFs</a></li>
            </ul>
          </div>
        </div>
      </section>
    `;
  }

  // 3. Course Detail Pages
  if (p.startsWith('/courses/')) {
    return `
      <section class="space-y-6 my-8">
        <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h2 class="text-2xl font-bold text-[#1E1B4B] mb-3">Course Curriculum &amp; Learning Outcomes</h2>
          <p class="text-gray-700 mb-4">${route.description}</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-sm">
            <div class="p-4 bg-red-50 rounded-xl">
              <span class="font-bold text-red-900 block">Class Formats</span>
              <span class="text-gray-700">Classroom (Electronic City, Bengaluru) &amp; Live Online Zoom Batches</span>
            </div>
            <div class="p-4 bg-blue-50 rounded-xl">
              <span class="font-bold text-blue-900 block">Batch Timings</span>
              <span class="text-gray-700">Weekend (Sat/Sun 10am-1pm or 2pm-5pm) &amp; Weekday Evening Batches</span>
            </div>
            <div class="p-4 bg-emerald-50 rounded-xl">
              <span class="font-bold text-emerald-900 block">Certificates &amp; Materials</span>
              <span class="text-gray-700">Official Course Completion Certificate + Physical Kanji Practice Books &amp; Audio</span>
            </div>
          </div>
          <h3 class="text-lg font-bold text-[#1E1B4B] mb-2">What You Will Master in this Course</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li>✓ Comprehensive syllabus coverage aligned with Japan Foundation guidelines</li>
            <li>✓ Native Japanese pronunciation, conversational drills, and listening modules</li>
            <li>✓ Reading comprehension, Kanji stroke orders, and grammar particle formulas</li>
            <li>✓ 4 Full-length simulated mock exams with personal instructor feedback</li>
            <li>✓ Free 1-on-1 doubt clearing sessions with senior bilingual Indian and native Japanese senseis</li>
          </ul>
        </div>

        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h2 class="text-xl font-bold text-[#1E1B4B] mb-2">Related Courses &amp; Sequential Levels</h2>
          <p class="text-sm text-gray-600 mb-3">Explore our complete JLPT certification pathway:</p>
          <div class="flex flex-wrap gap-2 text-xs mb-6">
            <a href="/courses/jlpt-n5" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">JLPT N5</a>
            <a href="/courses/jlpt-n4" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">JLPT N4</a>
            <a href="/courses/jlpt-n3" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">JLPT N3</a>
            <a href="/courses/jlpt-n2" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">JLPT N2</a>
            <a href="/courses/jlpt-n1" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">JLPT N1</a>
            <a href="/courses/spoken-japanese" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Spoken Japanese</a>
            <a href="/courses/japanese-for-it-professionals" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Japanese for IT</a>
          </div>

          <h3 class="text-sm font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">Classroom Coaching in Bengaluru &amp; Resources</h3>
          <p class="text-xs text-gray-600 mb-3">Attend in-person weekend batches at our Electronic City center or explore official exam syllabi and career opportunities:</p>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/locations/electronic-city" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Electronic City Campus</a>
            <a href="/locations/bangalore" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Bengaluru Hubs</a>
            <a href="/locations/koramangala" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Koramangala</a>
            <a href="/locations/whitefield" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Whitefield</a>
            <a href="/jlpt" class="px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg font-semibold text-red-700">JLPT Exam Guide</a>
            <a href="/career/japanese-for-it" class="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg font-semibold text-blue-700">Software Jobs in Japan</a>
            <a href="/learn/hiragana-katakana" class="px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg font-semibold text-emerald-700">Free Kana Charts</a>
          </div>
        </div>
      </section>
    `;
  }

  // 4. JLPT Knowledge Hub Pages
  if (p.startsWith('/jlpt')) {
    return `
      <section class="space-y-6 my-8">
        <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h2 class="text-2xl font-bold text-[#1E1B4B] mb-3">JLPT Exam Breakdown &amp; Benchmark Criteria</h2>
          <p class="text-gray-700 leading-relaxed mb-4">${route.description}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-sm">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span class="font-bold text-[#1E1B4B] block mb-1">Official Test Dates</span>
              <span class="text-gray-600">Held twice annually worldwide on the first Sunday of July and December.</span>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span class="font-bold text-[#1E1B4B] block mb-1">Test Centers in India</span>
              <span class="text-gray-600">Bengaluru (Bangalore University Jnana Bharathi), New Delhi, Mumbai, Pune, Chennai, Kolkata.</span>
            </div>
          </div>
          <h3 class="text-lg font-bold text-[#1E1B4B] mb-2">Sectional Score Requirements</h3>
          <p class="text-sm text-gray-700 mb-3">To pass any JLPT exam, candidate scores must satisfy two distinct conditions: (1) Total score exceeds the overall pass mark, AND (2) Every individual section (Language Knowledge, Reading, Listening) exceeds the minimum sectional cutoff score.</p>
        </div>

        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h2 class="text-xl font-bold text-[#1E1B4B] mb-2">Explore All JLPT Levels</h2>
          <div class="flex flex-wrap gap-2 text-xs pt-2 mb-6">
            <a href="/jlpt/n5" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">JLPT N5 Syllabus</a>
            <a href="/jlpt/n4" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">JLPT N4 Breakdown</a>
            <a href="/jlpt/n3" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">JLPT N3 IT Benchmark</a>
            <a href="/jlpt/n2" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">JLPT N2 Business</a>
            <a href="/jlpt/n1" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">JLPT N1 Mastery</a>
          </div>

          <h3 class="text-sm font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">JLPT Courses &amp; Bengaluru Classroom Centers</h3>
          <p class="text-xs text-gray-600 mb-3">Enroll in classroom coaching at Electronic City Bengaluru or live online batches:</p>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/courses/jlpt-n5" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-red-600">JLPT N5 Course</a>
            <a href="/courses/jlpt-n4" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-red-600">JLPT N4 Course</a>
            <a href="/courses/jlpt-n3" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-red-600">JLPT N3 Course</a>
            <a href="/locations/electronic-city" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Electronic City Center</a>
            <a href="/locations/bangalore" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Bengaluru Center</a>
            <a href="/career/japanese-for-it" class="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg font-semibold text-blue-700">Software Jobs in Japan</a>
          </div>
        </div>
      </section>
    `;
  }

  // 5. Learn Hub & Study Materials
  if (p.startsWith('/learn')) {
    return `
      <section class="space-y-6 my-8">
        <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h2 class="text-2xl font-bold text-[#1E1B4B] mb-3">Self-Study Guides &amp; Japanese Foundations</h2>
          <p class="text-gray-700 leading-relaxed mb-4">${route.description}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 my-6 text-sm">
            <a href="/learn/hiragana-katakana" class="p-4 bg-red-50/50 rounded-xl border border-red-100 hover:border-red-300 block">
              <span class="font-bold text-red-900 block">Kana Writing</span>
              <span class="text-xs text-gray-600">46 Hiragana &amp; 46 Katakana with stroke orders.</span>
            </a>
            <a href="/learn/vocabulary" class="p-4 bg-blue-50/50 rounded-xl border border-blue-100 hover:border-blue-300 block">
              <span class="font-bold text-blue-900 block">Vocabulary Bank</span>
              <span class="text-xs text-gray-600">High-yield JLPT N5 &amp; N4 vocab lists.</span>
            </a>
            <a href="/learn/grammar" class="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100 hover:border-emerald-300 block">
              <span class="font-bold text-emerald-900 block">Particles Guide</span>
              <span class="text-xs text-gray-600">Clear rules for wa, ga, o, ni, de, to, mo.</span>
            </a>
            <a href="/learn/kanji" class="p-4 bg-purple-50/50 rounded-xl border border-purple-100 hover:border-purple-300 block">
              <span class="font-bold text-purple-900 block">Foundation Kanji</span>
              <span class="text-xs text-gray-600">Radicals, mnemonics, on'yomi &amp; kun'yomi.</span>
            </a>
          </div>
        </div>
      </section>
    `;
  }

  // 6. Career in Japan Pages
  if (p === '/career' || p.startsWith('/career/')) {
    return `
      <section class="space-y-6 my-8">
        <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h2 class="text-2xl font-bold text-[#1E1B4B] mb-3">Japan Tech Careers, Salaries &amp; Visa Roadmap</h2>
          <p class="text-gray-700 leading-relaxed mb-4">${route.description}</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-sm">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span class="font-bold text-[#1E1B4B] block mb-1">Tech Talent Shortage</span>
              <span class="text-gray-600">400,000+ open IT roles in Japan across cloud, full-stack, data, and bilingual project management.</span>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span class="font-bold text-[#1E1B4B] block mb-1">Starting Salaries</span>
              <span class="text-gray-600">¥6,000,000 – ¥14,000,000 JPY annually (~₹33 to ₹77 LPA) with full company relocation support.</span>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span class="font-bold text-[#1E1B4B] block mb-1">Visa Eligibility</span>
              <span class="text-gray-600">Engineer / Specialist in Humanities work visa or Highly Skilled Professional (HSP) points system.</span>
            </div>
          </div>
          <h3 class="text-lg font-bold text-[#1E1B4B] mb-2">Career Advisory &amp; Placement Services</h3>
          <p class="text-sm text-gray-700">Fuji Japanese Academy provides end-to-end guidance for working in Japan, including Rirekisho &amp; Shokumu Keirekisho formatting, mock Japanese behavioral interviews, and introductions to Tokyo hiring partners.</p>
        </div>

        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h2 class="text-xl font-bold text-[#1E1B4B] mb-2">Explore Career Guides &amp; Hiring Openings</h2>
          <div class="flex flex-wrap gap-2 text-xs pt-2 mb-6">
            <a href="/careers#executive-sales-manesar" class="px-3 py-1.5 bg-red-600 text-white rounded-lg font-bold shadow-sm">🔥 Opening: Executive Sales (Manesar)</a>
            <a href="/careers" class="px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg font-bold">All Open Positions</a>
            <a href="/career/japanese-for-it" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Software Jobs in Tokyo</a>
            <a href="/career/working-in-japan" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Japan Work Visas</a>
            <a href="/career/japanese-jobs" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Companies Hiring Foreigners</a>
            <a href="/career/japanese-job-interview" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Japanese Resume (Rirekisho)</a>
          </div>

          <h3 class="text-sm font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">Recommended Courses for IT &amp; Classroom Batches</h3>
          <p class="text-xs text-gray-600 mb-3">Prepare for Japan relocation with specialized courses at our Electronic City center or live online:</p>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/courses/japanese-for-it-professionals" class="px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg font-semibold text-purple-700">Japanese for IT Professionals</a>
            <a href="/courses/jlpt-n3" class="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg font-semibold text-blue-700">JLPT N3 Intermediate</a>
            <a href="/courses/business-japanese" class="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg font-semibold text-amber-700">Business Japanese</a>
            <a href="/locations/electronic-city" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Electronic City Campus</a>
            <a href="/locations/bangalore" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Bengaluru Hubs</a>
          </div>
        </div>
      </section>
    `;
  }

  // 7. Location Pages
  if (p.startsWith('/locations')) {
    return `
      <section class="space-y-6 my-8">
        <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h2 class="text-2xl font-bold text-[#1E1B4B] mb-3">Campus Address, Landmarks &amp; Batch Timings</h2>
          <p class="text-gray-700 leading-relaxed mb-4">${route.description}</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 text-sm">
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span class="font-bold text-[#1E1B4B] block mb-1">Classroom Center Address</span>
              <address class="not-italic text-gray-600 leading-relaxed">
                06, 1st Floor, Vittasandra Cross, Hemavathi Block, Phase-1, Bettadasanapura, Electronic City, Bengaluru, Karnataka 560100
              </address>
            </div>
            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <span class="font-bold text-[#1E1B4B] block mb-1">Campus Contact &amp; Hours</span>
              <p class="text-gray-600 leading-relaxed">
                Phone / WhatsApp: <strong>+91 63649 24110</strong><br />
                Email: info@fujijapaneseacademy.com<br />
                Mon – Sun: 9:00 AM – 7:30 PM IST
              </p>
            </div>
          </div>
          <h3 class="text-lg font-bold text-[#1E1B4B] mb-2">Transit &amp; Accessibility</h3>
          <p class="text-sm text-gray-700">Easily accessible from Electronic City Phase 1 IT corridor, Infosys Gate 1, Wipro Campus, NICE Ring Road, and Hosur Road Elevated Tollway. Weekend classroom batches and daily live interactive online batches available.</p>
        </div>

        <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h2 class="text-xl font-bold text-[#1E1B4B] mb-2">Japanese Courses Available at this Location</h2>
          <p class="text-sm text-gray-700 mb-4">Join classroom sessions at Electronic City Phase 1 or attend live interactive Zoom batches:</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs mb-4">
            <a href="/courses/jlpt-n5" class="p-3 bg-gray-50 border rounded-xl block hover:border-red-500">
              <strong class="text-red-600 block">JLPT N5 Foundation</strong>
              <span class="text-gray-600">Beginner course with Hiragana, Katakana &amp; 103 Kanji.</span>
            </a>
            <a href="/courses/jlpt-n4" class="p-3 bg-gray-50 border rounded-xl block hover:border-red-500">
              <strong class="text-red-600 block">JLPT N4 Basic</strong>
              <span class="text-gray-600">Conversational Japanese with 300 Kanji.</span>
            </a>
            <a href="/courses/jlpt-n3" class="p-3 bg-gray-50 border rounded-xl block hover:border-red-500">
              <strong class="text-blue-600 block">JLPT N3 for IT</strong>
              <span class="text-gray-600">Software engineer benchmark for Japan jobs.</span>
            </a>
            <a href="/courses/japanese-for-it-professionals" class="p-3 bg-gray-50 border rounded-xl block hover:border-red-500">
              <strong class="text-purple-600 block">Japanese for IT</strong>
              <span class="text-gray-600">Standups, JIRA, code reviews &amp; tech interviews.</span>
            </a>
            <a href="/courses/spoken-japanese" class="p-3 bg-gray-50 border rounded-xl block hover:border-red-500">
              <strong class="text-amber-600 block">Spoken Japanese</strong>
              <span class="text-gray-600">Everyday conversation &amp; pronunciation drills.</span>
            </a>
            <a href="/courses/corporate-japanese-training" class="p-3 bg-gray-50 border rounded-xl block hover:border-red-500">
              <strong class="text-emerald-600 block">Corporate Training</strong>
              <span class="text-gray-600">On-campus and onsite programs for Bengaluru tech MNCs.</span>
            </a>
          </div>
          <div class="flex flex-wrap gap-2 text-xs pt-2 border-t border-gray-100">
            <a href="/jlpt" class="text-red-600 font-bold hover:underline">JLPT Exam Guide</a> • 
            <a href="/career/japanese-for-it" class="text-blue-600 font-bold hover:underline">Tokyo Tech Careers</a> • 
            <a href="/career/working-in-japan" class="text-blue-600 font-bold hover:underline">Japan Work Visas</a> • 
            <a href="/learn/hiragana-katakana" class="text-gray-700 font-bold hover:underline">Free Kana Study</a>
          </div>
        </div>

        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h2 class="text-xl font-bold text-[#1E1B4B] mb-2">Bengaluru Centers &amp; Hubs</h2>
          <div class="flex flex-wrap gap-2 text-xs pt-2">
            <a href="/locations/electronic-city" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Electronic City Center</a>
            <a href="/locations/bangalore" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Bengaluru City Hub</a>
            <a href="/locations/koramangala" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Koramangala</a>
            <a href="/locations/indiranagar" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Indiranagar</a>
            <a href="/locations/whitefield" class="px-3 py-1.5 bg-white border rounded-lg hover:border-red-500 font-semibold text-gray-800">Whitefield</a>
          </div>
        </div>
      </section>
    `;
  }

  // 8. Blog & Article Pages
  if (p.startsWith('/blog')) {
    return `
      <section class="space-y-6 my-8">
        <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h2 class="text-2xl font-bold text-[#1E1B4B] mb-3">Article Overview &amp; Learning Strategy</h2>
          <p class="text-gray-700 leading-relaxed mb-4">${route.description}</p>
          <div class="p-4 bg-amber-50 rounded-xl border border-amber-200 text-sm text-amber-900 my-4">
            <strong>Key Study Insight:</strong> At Fuji Japanese Academy, our curriculum integrates authentic communicative context, native listening drills, and exam-proven particle formulas to guarantee long-term retention.
          </div>
          <h3 class="text-lg font-bold text-[#1E1B4B] mb-2">Related Articles in Knowledge Hub</h3>
          <ul class="space-y-2 text-sm text-gray-700 mb-6">
            <li>• <a href="/blog/complete-guide-to-jlpt-n5-exam-syllabus-strategy-passing-score" class="text-red-600 hover:underline">Complete Guide to Passing JLPT N5 in 3 Months</a></li>
            <li>• <a href="/blog/business-japanese-etiquette-for-it-professionals-in-japan" class="text-red-600 hover:underline">Business Japanese &amp; Keigo Guide for IT Professionals</a></li>
            <li>• <a href="/blog/japanese-particles-cheat-sheet-jlpt-n5-n4" class="text-red-600 hover:underline">Mastering the 10 Essential Japanese Particles Cheat Sheet</a></li>
            <li>• <a href="/blog/tech-jobs-in-japan-for-indian-engineers" class="text-red-600 hover:underline">Top 7 In-Demand Tech Jobs in Tokyo for Indian Developers</a></li>
            <li>• <a href="/blog/how-to-learn-kanji-fast-mnemonics-radicals" class="text-red-600 hover:underline">How to Learn 500 Kanji in 60 Days: Radicals &amp; Mnemonics</a></li>
          </ul>

          <h3 class="text-sm font-bold text-[#1E1B4B] uppercase tracking-wider mb-2">Featured Courses &amp; Bengaluru Campus</h3>
          <p class="text-xs text-gray-600 mb-3">Learn with certified senseis via weekend offline classes in Electronic City or live online:</p>
          <div class="flex flex-wrap gap-2 text-xs">
            <a href="/courses/jlpt-n5" class="px-3 py-1.5 bg-red-50 border border-red-200 rounded-lg font-semibold text-red-700">JLPT N5 Foundation</a>
            <a href="/courses/jlpt-n3" class="px-3 py-1.5 bg-blue-50 border border-blue-200 rounded-lg font-semibold text-blue-700">JLPT N3 Intermediate</a>
            <a href="/courses/japanese-for-it-professionals" class="px-3 py-1.5 bg-purple-50 border border-purple-200 rounded-lg font-semibold text-purple-700">Japanese for IT</a>
            <a href="/locations/electronic-city" class="px-3 py-1.5 bg-slate-50 border rounded-lg font-semibold hover:border-red-500 text-gray-800">Electronic City Center</a>
            <a href="/locations/bangalore" class="px-3 py-1.5 bg-slate-50 border rounded-lg hover:border-red-500 font-semibold text-gray-800">Bengaluru Classes</a>
          </div>
        </div>
      </section>
    `;
  }

  // 9. Enterprise Corporate Training
  if (p === '/corporate') {
    return `
      <section class="space-y-8 my-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h2 class="text-xl font-bold text-[#1E1B4B] mb-2">Technical Keigo &amp; Agile Drills</h2>
            <p class="text-gray-600 text-sm">Role-played daily scrums (Choukai), code reviews, Jira tickets, and Japanese client escalation protocols.</p>
          </div>
          <div class="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h2 class="text-xl font-bold text-[#1E1B4B] mb-2">On-Premise &amp; Virtual Cohorts</h2>
            <p class="text-gray-600 text-sm">Flexible on-premise classes across Bengaluru tech hubs and secure Zoom virtual classrooms pan-India.</p>
          </div>
          <div class="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <h2 class="text-xl font-bold text-[#1E1B4B] mb-2">Native Sensei Faculty</h2>
            <p class="text-gray-600 text-sm">Corporate Tokyo native and bilingual trainers with verified engineering and business consulting backgrounds.</p>
          </div>
        </div>

        <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h2 class="text-2xl font-bold text-[#1E1B4B] mb-4">Enterprise Corporate Training Modules</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="p-4 rounded-xl border border-gray-100 bg-slate-50">
              <h3 class="font-bold text-[#1E1B4B]">Module 1: Business Japanese &amp; Email Keigo</h3>
              <p class="text-xs text-gray-600 mt-1">Formal Sonkeigo, Kenjougo, client email formatting, business card exchange (Meishi Koukan), and bowing etiquette.</p>
            </div>
            <div class="p-4 rounded-xl border border-gray-100 bg-slate-50">
              <h3 class="font-bold text-[#1E1B4B]">Module 2: Technical IT &amp; Engineering Japanese</h3>
              <p class="text-xs text-gray-600 mt-1">System Architecture (Sekkei-sho), Specification Sheets (Shiyousho), bug tracking, and release management terminology.</p>
            </div>
            <div class="p-4 rounded-xl border border-gray-100 bg-slate-50">
              <h3 class="font-bold text-[#1E1B4B]">Module 3: Fast-Track JLPT Certification Cohorts</h3>
              <p class="text-xs text-gray-600 mt-1">Intensive JLPT N5 to N3 preparation cohorts with official mock exams and guaranteed pass metrics.</p>
            </div>
            <div class="p-4 rounded-xl border border-gray-100 bg-slate-50">
              <h3 class="font-bold text-[#1E1B4B]">Module 4: Cross-Cultural Negotiation &amp; Onsite Readiness</h3>
              <p class="text-xs text-gray-600 mt-1">Preparation for engineers on Japan business trips or multi-year onsite deputations in Tokyo and Osaka.</p>
            </div>
          </div>
        </div>

        <div class="p-6 bg-slate-900 text-white rounded-2xl shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span class="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">Careers in Japan Sales</span>
            <h3 class="text-xl font-bold text-white">Now Hiring: Executive Sales / Business Development (Manesar, Haryana)</h3>
            <p class="text-xs text-slate-300 mt-1 max-w-2xl">Salary: 6 to 10 LPA CTC (Fixed) • JLPT N2/N1 + MBA in Sales/Marketing. Manage B2B Japanese accounts, client communication, and cross-border partnerships.</p>
          </div>
          <a href="/careers#executive-sales-manesar" class="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold text-xs rounded-xl shadow-md whitespace-nowrap">
            View Opening &rarr;
          </a>
        </div>
      </section>
    `;
  }

  // 10. JLPT Exam Dates India Hub
  if (p === '/jlpt-exam-dates-india') {
    return `
      <section class="space-y-8 my-8">
        <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h2 class="text-2xl font-bold text-[#1E1B4B] mb-4">Official JLPT Exam Schedule 2026 (India)</h2>
          <div class="overflow-x-auto">
            <table class="w-full text-left text-sm border-collapse">
              <thead>
                <tr class="bg-slate-100 border-b border-gray-200 text-[#1E1B4B]">
                  <th class="p-3 font-bold">Exam Session</th>
                  <th class="p-3 font-bold">Official Exam Date</th>
                  <th class="p-3 font-bold">Registration Window</th>
                  <th class="p-3 font-bold">Levels Conducted</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-100">
                <tr>
                  <td class="p-3 font-semibold text-red-600">July Session (Summer)</td>
                  <td class="p-3 font-bold">Sunday, July 5, 2026</td>
                  <td class="p-3 text-gray-600">Early March – Late March 2026</td>
                  <td class="p-3">N1, N2, N3, N4, N5</td>
                </tr>
                <tr>
                  <td class="p-3 font-semibold text-indigo-600">December Session (Winter)</td>
                  <td class="p-3 font-bold">Sunday, December 6, 2026</td>
                  <td class="p-3 text-gray-600">Early August – Late August 2026</td>
                  <td class="p-3">N1, N2, N3, N4, N5</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h2 class="text-xl font-bold text-[#1E1B4B] mb-3">Authorized JLPT Test Centers in India</h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs">
            <div class="p-3 bg-white rounded-xl border border-gray-200">
              <strong class="block text-[#1E1B4B]">Bengaluru Center</strong>
              <span class="text-gray-500">Bangalore University / BNMIT</span>
            </div>
            <div class="p-3 bg-white rounded-xl border border-gray-200">
              <strong class="block text-[#1E1B4B]">New Delhi Center</strong>
              <span class="text-gray-500">MOSAI (Mavlankar Auditorium)</span>
            </div>
            <div class="p-3 bg-white rounded-xl border border-gray-200">
              <strong class="block text-[#1E1B4B]">Chennai Center</strong>
              <span class="text-gray-500">ABK-AOTS DOSOKAI</span>
            </div>
            <div class="p-3 bg-white rounded-xl border border-gray-200">
              <strong class="block text-[#1E1B4B]">Pune Center</strong>
              <span class="text-gray-500">Jaltap Pune / Tilak Maharashtra Vidyapeeth</span>
            </div>
            <div class="p-3 bg-white rounded-xl border border-gray-200">
              <strong class="block text-[#1E1B4B]">Mumbai Center</strong>
              <span class="text-gray-500">Teachers Association / University of Mumbai</span>
            </div>
            <div class="p-3 bg-white rounded-xl border border-gray-200">
              <strong class="block text-[#1E1B4B]">Kolkata Center</strong>
              <span class="text-gray-500">Indo-Japan Welfare Center</span>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  // 11. JLPT Mock Test Simulator Hub
  if (p === '/mock-test') {
    return `
      <section class="space-y-8 my-8">
        <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
          <h2 class="text-2xl font-bold text-[#1E1B4B] mb-3">Simulated JLPT Examination Benchmark</h2>
          <p class="text-gray-700 leading-relaxed mb-4">${route.description}</p>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 text-sm">
            <div class="p-4 bg-red-50 rounded-xl border border-red-100">
              <span class="font-bold text-red-900 block text-base">JLPT N5 Mini-Exam</span>
              <span class="text-gray-600 text-xs">15 Questions • 25 Minutes • Kanji, Vocabulary, Grammar &amp; Reading</span>
            </div>
            <div class="p-4 bg-amber-50 rounded-xl border border-amber-100">
              <span class="font-bold text-amber-900 block text-base">JLPT N4 Mini-Exam</span>
              <span class="text-gray-600 text-xs">15 Questions • 30 Minutes • Daily Conversations &amp; Practical Passages</span>
            </div>
            <div class="p-4 bg-indigo-50 rounded-xl border border-indigo-100">
              <span class="font-bold text-indigo-900 block text-base">JLPT N3 Mini-Exam</span>
              <span class="text-gray-600 text-xs">15 Questions • 35 Minutes • IT Workplace Scenarios &amp; Complex Reading</span>
            </div>
          </div>
          <h3 class="text-lg font-bold text-[#1E1B4B] mb-2">Real Exam Simulation Features</h3>
          <ul class="space-y-2 text-sm text-gray-700">
            <li>✓ Strict countdown timer simulating real testing pressure</li>
            <li>✓ Authentic section weighting across Language Knowledge, Grammar, and Reading</li>
            <li>✓ Detailed score breakdown and section-by-section accuracy analysis</li>
            <li>✓ Instant downloadable Certificate of Performance with verified score badge</li>
          </ul>
        </div>

        <div class="p-6 bg-slate-50 rounded-2xl border border-slate-200">
          <h2 class="text-xl font-bold text-[#1E1B4B] mb-3">Prepare for the Official JLPT in India</h2>
          <p class="text-sm text-gray-600 mb-4">Fuji Japanese Academy conducts over 8 full-length simulated mock exams with personal sensei feedback for all enrolled students. Explore our targeted level courses below.</p>
          <div class="flex flex-wrap gap-3">
            <a href="/courses/jlpt-n5" class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-red-600 hover:border-red-500">JLPT N5 Foundation Course →</a>
            <a href="/courses/jlpt-n4" class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-red-600 hover:border-red-500">JLPT N4 Basic Course →</a>
            <a href="/courses/jlpt-n3" class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-red-600 hover:border-red-500">JLPT N3 Intermediate Course →</a>
            <a href="/jlpt-exam-dates-india" class="px-4 py-2 bg-white border border-gray-200 rounded-xl text-xs font-bold text-indigo-600 hover:border-indigo-500">2026 Exam Dates &amp; Centers →</a>
          </div>
        </div>
      </section>
    `;
  }

  // 12. Careers & Job Openings
  if (p === '/careers') {
    const execMailto = `mailto:fujijapaneseacademy@gmail.com?subject=${encodeURIComponent('Application for Executive Sales / Business Development - Manesar, Haryana')}&body=${encodeURIComponent('Dear Fuji Japanese Academy Recruitment Team,\n\nI am writing to express my interest in the position of "Executive Sales / Business Development" based in Manesar, Haryana.\n\nMy Profile Details:\n- Full Name: \n- Contact Number: \n- Current Location: \n- JLPT Certification Level (N2 / N1 / Other): \n- Highest Educational Qualification (e.g., MBA / Masters): \n- Total Years of Experience (Sales / BD / Japanese Coordination): \n- Current CTC: \n- Expected CTC: \n- Notice Period: \n\nBrief Note on My Suitability:\n[Please mention your Japanese language proficiency, B2B sales experience, or relevant academic background]\n\nI have attached my updated Resume / CV for your evaluation. Looking forward to hearing from you.\n\nBest regards,\n[Your Name]')}`;

    return `
      <section class="space-y-8 my-8">
        <div class="p-8 bg-white rounded-2xl border border-gray-200 shadow-sm" id="executive-sales-manesar">
          <div class="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div class="flex flex-wrap gap-2 text-xs font-bold uppercase">
              <span class="px-3 py-1 bg-red-100 text-red-700 rounded-md">Sales &amp; Business Development</span>
              <span class="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-md">Full-time</span>
              <span class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-md">6 to 10 LPA CTC (Fixed)</span>
            </div>
            <span class="px-3 py-1 bg-red-600 text-white text-xs font-bold uppercase rounded-full">🔥 Urgent Opening</span>
          </div>

          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h2 class="text-2xl md:text-3xl font-bold text-[#1E1B4B]">Executive Sales / Business Development</h2>
              <p class="text-sm text-red-600 font-semibold mt-1">Location: Manesar, Haryana | CTC: 6 to 10 LPA (Fixed)</p>
            </div>
            <a href="${execMailto}" class="inline-block px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-bold text-sm rounded-xl whitespace-nowrap shadow-md">
              Apply Now via Email &rarr;
            </a>
          </div>

          <div class="p-4 bg-amber-50 border border-amber-200 rounded-xl text-xs md:text-sm text-amber-950 mb-6">
            <strong>Compensation Details:</strong> 6 to 10 LPA CTC (fixed); this may vary based on market standards / as per industry norms / Interview performance.
          </div>

          <div class="space-y-4 text-sm text-gray-700">
            <div>
              <h3 class="font-bold text-[#1E1B4B] text-base mb-1">About the Role</h3>
              <p class="leading-relaxed">We are looking for a dynamic and result-oriented Japan Sales professional to develop and manage business opportunities with Japanese customers and clients. The role will involve client communication, business development, relationship management, and coordination with internal teams.</p>
            </div>

            <div>
              <h3 class="font-bold text-[#1E1B4B] text-base mb-2">Key Responsibilities</h3>
              <ul class="list-disc list-inside space-y-1 text-gray-600">
                <li>Develop new business opportunities with Japanese customers and companies.</li>
                <li>Build and maintain strong relationships with existing Japanese clients.</li>
                <li>Understand customer requirements and coordinate with internal teams for suitable solutions.</li>
                <li>Handle sales discussions, presentations, quotations, and negotiations.</li>
                <li>Coordinate with Japanese stakeholders and support smooth business communication.</li>
                <li>Identify market opportunities and contribute to sales growth.</li>
                <li>Travel for client meetings and business discussions as required.</li>
                <li>Maintain regular sales reports and track business development activities.</li>
              </ul>
            </div>

            <div>
              <h3 class="font-bold text-[#1E1B4B] text-base mb-2">Eligibility &amp; Requirements</h3>
              <ul class="list-disc list-inside space-y-1 text-gray-600">
                <li><strong>MBA in Sales, Marketing, International Business</strong>, or a related field.</li>
                <li><strong>JLPT N2 or N1 certification is mandatory.</strong></li>
                <li>Strong Japanese and English communication skills.</li>
                <li>Good interpersonal, presentation, and negotiation skills.</li>
                <li>Candidates with B2B sales/business development experience will be preferred.</li>
                <li>Exposure to Japanese companies or Japanese business culture will be an advantage.</li>
                <li>Freshers with strong Japanese proficiency and an MBA may also be considered.</li>
              </ul>
            </div>
          </div>

          <div class="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-50 p-4 rounded-xl">
            <span class="text-xs text-gray-600">Submit your resume directly to: <strong class="text-indigo-950">fujijapaneseacademy@gmail.com</strong></span>
            <a href="${execMailto}" class="px-6 py-2.5 bg-[#1E1B4B] hover:bg-black text-white font-bold text-xs rounded-xl whitespace-nowrap">
              Send Resume via Email &rarr;
            </a>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <span class="text-xs font-bold text-red-600 uppercase">Academics</span>
            <h3 class="text-xl font-bold text-[#1E1B4B] mt-1">Senior Japanese Trainer (N1/N2)</h3>
            <p class="text-xs text-gray-500 mt-1">Location: Bengaluru / Hybrid &bull; Full-time</p>
            <p class="text-xs text-gray-600 mt-2">Lead advanced JLPT batches, curriculum delivery, and student mentoring.</p>
            <a href="mailto:fujijapaneseacademy@gmail.com?subject=Application%20for%20Senior%20Japanese%20Trainer" class="inline-block mt-3 text-xs font-bold text-red-600 hover:underline">Apply via Email &rarr;</a>
          </div>
          <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
            <span class="text-xs font-bold text-red-600 uppercase">Academics</span>
            <h3 class="text-xl font-bold text-[#1E1B4B] mt-1">Native Japanese Language Expert</h3>
            <p class="text-xs text-gray-500 mt-1">Location: Bengaluru / On-site &bull; Full-time / Part-time</p>
            <p class="text-xs text-gray-600 mt-2">Engage students in authentic Tokyo cadence, conversational workshops, and Keigo training.</p>
            <a href="mailto:fujijapaneseacademy@gmail.com?subject=Application%20for%20Native%20Japanese%20Expert" class="inline-block mt-3 text-xs font-bold text-red-600 hover:underline">Apply via Email &rarr;</a>
          </div>
        </div>
      </section>
    `;
  }

  // Default fallback for About, Contact, News, Practice
  return `
    <section class="space-y-6 my-8">
      <div class="p-6 bg-white rounded-2xl border border-gray-200 shadow-sm">
        <h2 class="text-2xl font-bold text-[#1E1B4B] mb-3">About Fuji Japanese Academy</h2>
        <p class="text-gray-700 leading-relaxed mb-4">${route.description}</p>
        <p class="text-sm text-gray-600">Our academy offers certified Japanese language training from JLPT N5 to N1 with native Japanese faculty, bilingual Indian mentors, cultural workshops, and Tokyo software engineering placement assistance.</p>
        <div class="mt-4 pt-4 border-t border-gray-100 flex flex-wrap gap-4 text-xs font-semibold text-gray-700">
          <span>Campus: Electronic City Phase 1, Bengaluru</span>
          <span>Helpline: +91 63649 24110</span>
          <span>Email: info@fujijapaneseacademy.com</span>
        </div>
      </div>
    </section>
  `;
}

function generateRouteContent(route) {
  const nav = generateNavHtml();
  const footer = generateFooterHtml();

  let breadcrumbs = `<nav aria-label="Breadcrumb" class="container mx-auto px-4 py-3 text-xs text-gray-500">
    <a href="/" class="hover:underline">Home</a> &gt; <span>${route.badge || route.h1}</span>
  </nav>`;

  if (route.path === '/') {
    breadcrumbs = '';
  }

  const routeBody = getRouteSpecificBody(route);

  return `
    ${nav}
    ${breadcrumbs}
    <main class="container mx-auto px-4 py-8 max-w-5xl">
      <div class="mb-6">
        ${route.badge ? `<span class="inline-block px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">${route.badge}</span>` : ''}
        <h1 class="text-3xl md:text-5xl font-extrabold text-[#1E1B4B] tracking-tight mb-4">${route.h1}</h1>
        <p class="text-lg md:text-xl text-gray-600 leading-relaxed max-w-3xl">${route.description}</p>
      </div>

      ${routeBody}

      <div class="p-6 bg-red-50/60 rounded-2xl border border-red-100 my-8">
        <h2 class="text-xl font-bold text-red-800 mb-2">Admissions &amp; Free 1-on-1 Demo Session</h2>
        <p class="text-sm text-gray-700 mb-3">Enrolment is open for upcoming weekday and weekend batches. Call our admissions team directly at <strong>+91 63649 24110</strong> or email <strong>info@fujijapaneseacademy.com</strong>.</p>
        <div class="flex flex-wrap gap-3">
          <a href="/courses" class="inline-block px-5 py-2.5 bg-red-600 text-white font-bold rounded-xl text-sm hover:bg-red-700">Explore All Courses</a>
          <a href="/contact" class="inline-block px-5 py-2.5 bg-[#1E1B4B] text-white font-bold rounded-xl text-sm hover:bg-blue-950">Visit Campus Center</a>
        </div>
      </div>
    </main>
    ${footer}
  `;
}

function generateRouteSchema(route) {
  const p = route.path;
  const schemas = [];

  // 1. Breadcrumbs for all pages except homepage
  if (p !== '/') {
    const segments = p.split('/').filter(Boolean);
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://fujijapaneseacademy.com'
      }
    ];

    if (segments.length === 1) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: route.badge || route.h1 || segments[0],
        item: route.canonical
      });
    } else if (segments.length >= 2) {
      const sectionName = segments[0].charAt(0).toUpperCase() + segments[0].slice(1);
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: sectionName,
        item: `https://fujijapaneseacademy.com/${segments[0]}`
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: route.badge || route.h1 || segments[1],
        item: route.canonical
      });
    }

    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems
    });
  }

  // 2. Course Schema for /courses/*
  if (p.startsWith('/courses/')) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: route.h1 || route.title,
      description: route.description,
      provider: {
        '@type': 'EducationalOrganization',
        name: 'Fuji Japanese Academy',
        legalName: 'FUJI JAPANESE ACADEMY PRIVATE LIMITED',
        url: 'https://fujijapaneseacademy.com',
        logo: 'https://fujijapaneseacademy.com/logo.png'
      },
      hasCourseInstance: {
        '@type': 'CourseInstance',
        courseMode: ['Blended', 'Onsite', 'Online'],
        location: {
          '@type': 'Place',
          name: 'Fuji Japanese Academy Electronic City Campus',
          address: {
            '@type': 'PostalAddress',
            streetAddress: '06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Electronic City',
            addressLocality: 'Bengaluru',
            postalCode: '560100',
            addressRegion: 'Karnataka',
            addressCountry: 'IN'
          }
        }
      }
    });
  }

  // 3. LocalBusiness & EducationalOrganization Schema for /locations/*
  if (p.startsWith('/locations/')) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': ['LanguageSchool', 'EducationalOrganization', 'LocalBusiness'],
      name: `Fuji Japanese Academy - ${route.badge || 'Bengaluru Center'}`,
      legalName: 'FUJI JAPANESE ACADEMY PRIVATE LIMITED',
      url: route.canonical,
      telephone: '+916364924110',
      email: 'info@fujijapaneseacademy.com',
      priceRange: '₹₹',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Electronic City',
        addressLocality: 'Bengaluru',
        postalCode: '560100',
        addressRegion: 'Karnataka',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 12.8466666,
        longitude: 77.6711111
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
          opens: '09:00',
          closes: '19:30'
        }
      ]
    });
  }

  // 4. BlogPosting Schema for /blog/*
  if (p.startsWith('/blog/')) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: route.h1 || route.title,
      description: route.description,
      publisher: {
        '@type': 'EducationalOrganization',
        name: 'Fuji Japanese Academy',
        legalName: 'FUJI JAPANESE ACADEMY PRIVATE LIMITED',
        logo: {
          '@type': 'ImageObject',
          url: 'https://fujijapaneseacademy.com/logo.png'
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': route.canonical
      }
    });
  }

  // 4b. JobPosting Schema for /careers
  if (p === '/careers') {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'JobPosting',
      title: 'Executive Sales / Business Development',
      description: '<p>We are looking for a dynamic and result-oriented Japan Sales professional to develop and manage business opportunities with Japanese customers and clients. The role will involve client communication, business development, relationship management, and coordination with internal teams.</p><h3>Key Responsibilities:</h3><ul><li>Develop new business opportunities with Japanese customers and companies.</li><li>Build and maintain strong relationships with existing Japanese clients.</li><li>Understand customer requirements and coordinate with internal teams for suitable solutions.</li><li>Handle sales discussions, presentations, quotations, and negotiations.</li><li>Coordinate with Japanese stakeholders and support smooth business communication.</li><li>Identify market opportunities and contribute to sales growth.</li><li>Travel for client meetings and business discussions as required.</li><li>Maintain regular sales reports and track business development activities.</li></ul><h3>Eligibility & Requirements:</h3><ul><li>MBA in Sales, Marketing, International Business, or a related field.</li><li>JLPT N2 or N1 certification is mandatory.</li><li>Strong Japanese and English communication skills.</li><li>Good interpersonal, presentation, and negotiation skills.</li><li>Candidates with B2B sales/business development experience will be preferred.</li><li>Exposure to Japanese companies or Japanese business culture will be an advantage.</li><li>Freshers with strong Japanese proficiency and an MBA may also be considered.</li></ul>',
      identifier: {
        '@type': 'PropertyValue',
        name: 'Fuji Japanese Academy',
        value: 'executive-sales-manesar'
      },
      datePosted: '2026-10-24',
      validThrough: '2026-12-31',
      employmentType: 'FULL_TIME',
      hiringOrganization: {
        '@type': 'Organization',
        name: 'Fuji Japanese Academy',
        sameAs: 'https://fujijapaneseacademy.com',
        logo: 'https://fujijapaneseacademy.com/logo.png'
      },
      jobLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Manesar',
          addressRegion: 'Haryana',
          addressCountry: 'IN'
        }
      },
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'INR',
        value: {
          '@type': 'QuantitativeValue',
          minValue: 600000,
          maxValue: 1000000,
          unitText: 'YEAR'
        }
      },
      qualifications: 'MBA in Sales, Marketing, International Business; JLPT N2 or N1 certification mandatory; Japanese and English fluency',
      applicantLocationRequirements: {
        '@type': 'Country',
        name: 'India'
      },
      directApply: true
    });
  }

  // 5. FAQPage Schema for High-Ranking Informational Routes
  const FAQ_MAP = {
    '/': [
      {
        q: 'Which is the best Japanese language institute in Bangalore?',
        a: "Fuji Japanese Academy is Bangalore's premier Japanese language school, featuring certified native Japanese trainers, high JLPT pass rates across N5 through N1, physical classrooms in Electronic City Phase 1, and live interactive Zoom batches across India."
      },
      {
        q: 'How long does it take to learn Japanese and clear JLPT N5?',
        a: 'At Fuji Japanese Academy, our structured JLPT N5 foundation course takes approximately 3 months (70+ hours of live training), covering Hiragana, Katakana, 103 Kanji, essential vocabulary, and official mock tests.'
      },
      {
        q: 'Are online Japanese classes as effective as classroom coaching?',
        a: 'Yes! Our live online batches feature interactive breakout rooms, real-time speaking drills with native teachers, digital whiteboards, instant doubt clearing, and lifetime access to HD class recordings.'
      },
      {
        q: 'Can learning Japanese help Indian software engineers get jobs in Japan?',
        a: 'Yes, clearing JLPT N3 or N2 opens high-paying software engineering, bilingual project management, and data science opportunities in Tokyo and across Japan, with starting packages between 6M and 12M JPY and full visa sponsorship.'
      },
      {
        q: 'Where can I take Japanese classes near Electronic City, Koramangala, and Whitefield?',
        a: 'Fuji Japanese Academy has a physical classroom center at Vittasandra Cross, Electronic City Phase 1, and dedicated hybrid & online cohorts tailored for professionals in Koramangala, Indiranagar, and Whitefield.'
      },
      {
        q: 'Can I attend a free demo session before paying the course fee?',
        a: 'Absolutely! We offer a 100% free, 45-minute live demo class where you can meet your sensei, experience our intuitive teaching methodology, ask questions about batch timings, and receive a personalized learning roadmap.'
      }
    ],
    '/courses/jlpt-n5': [
      {
        q: 'Is JLPT N5 sufficient for getting a job in Japan?',
        a: 'JLPT N5 is the foundational entry level. While most corporate engineering jobs in Japan require N3 or N2, N5 is an essential prerequisite for SSW (Specified Skilled Worker) visas and student visas in Japanese language institutes.'
      },
      {
        q: 'How long does it take to prepare for JLPT N5?',
        a: "With Fuji Japanese Academy's structured 3-month curriculum (4-6 hours of live instruction per week + 2 hours of home practice), complete beginners comfortably clear JLPT N5."
      },
      {
        q: 'Are study materials and mock tests included in the course fee?',
        a: 'Yes! All digital study materials, JLPT N5 Kanji workbooks, grammar summary PDFs, audio listening files, and 4 full-length mock tests are included in the course fee.'
      },
      {
        q: 'Can I attend a free demo class before enrolling?',
        a: 'Absolutely. We offer a 100% free live interactive demo class where you can meet the instructor, experience our teaching style, and ask all your questions.'
      }
    ],
    '/courses/jlpt-n4': [
      {
        q: 'Is JLPT N4 required for Specified Skilled Worker (SSW) visas in Japan?',
        a: 'Yes! Passing JLPT N4 (or JFT-Basic) is the mandatory language benchmark set by the Immigration Services Agency of Japan for SSW visa categories across caregiving, hospitality, construction, and manufacturing.'
      },
      {
        q: 'I learned N5 on my own. Can I join this N4 course directly?',
        a: 'Yes! We conduct a quick 15-minute diagnostic evaluation test to confirm your current level before onboarding you into the N4 batch.'
      }
    ],
    '/courses/jlpt-n3': [
      {
        q: 'Why is JLPT N3 considered the turning point for Japanese jobs?',
        a: 'N3 is the benchmark where companies in Japan start hiring international software engineers and tech talent. It proves you can live independently in Japan and collaborate with Japanese team members without an interpreter.'
      },
      {
        q: 'Do you help with job placements upon clearing JLPT N3?',
        a: 'Yes! Fuji Japanese Academy partners with leading recruitment agencies and Japanese IT enterprises in India and Tokyo. We assist with Japanese resume (Rirekisho) writing and mock interviews.'
      }
    ],
    '/courses/jlpt-n2': [
      {
        q: 'Does JLPT N2 qualify me for the Highly Skilled Professional (HSP) Visa in Japan?',
        a: "Yes! JLPT N2 awards 10 bonus points on Japan's Highly Skilled Professional immigration scorecard, expediting your path to Japan Permanent Residency (PR)."
      }
    ],
    '/courses/jlpt-n1': [
      {
        q: 'What is the pass percentage of JLPT N1 at Fuji Japanese Academy?',
        a: 'Globally, the JLPT N1 pass rate hovers around 30%. At Fuji Japanese Academy, our intensive coaching methodology and 10 mock test series achieve an industry-leading 88% pass rate among enrolled students.'
      }
    ],
    '/courses/spoken-japanese': [
      {
        q: 'Do I need to learn Hiragana or Kanji for this course?',
        a: 'No! This course is designed purely for speaking and listening. All materials use Romaji (English alphabet) and high-quality audio files so you can start conversing immediately.'
      },
      {
        q: 'Can I switch to JLPT N5 later after completing Spoken Japanese?',
        a: 'Yes! Many of our students start with Spoken Japanese, fall in love with the language, and smoothly transition into our JLPT N5 certification course.'
      }
    ],
    '/courses/business-japanese': [
      {
        q: 'Is this course suitable if I only have JLPT N5?',
        a: 'Students with high N5 or conversational experience can join, though having completed N4 is ideal. We provide supplemental grammar sheets to ensure you follow all Keigo patterns.'
      },
      {
        q: 'Will I learn practical business email writing and Keigo?',
        a: 'Yes! Every student submits actual business email drafts that are reviewed line-by-line by native and bilingual instructors with corporate Tokyo experience.'
      }
    ],
    '/courses/japanese-for-it-professionals': [
      {
        q: 'Why do Indian software engineers in Japan need specialized IT Japanese?',
        a: 'While code is written in standard programming languages, team syncs, system requirements specifications (Yōken Teigi), Jira boards, and design reviews in Japanese companies are conducted entirely in Japanese. Knowing IT Yōgo sets you apart from 95% of candidates.'
      },
      {
        q: 'Does this course assist with job referrals in Tokyo?',
        a: 'Yes! Fuji Japanese Academy has direct relationships with tech recruitment firms and IT consulting companies hiring engineers for Tokyo, Osaka, and Fukuoka.'
      }
    ],
    '/courses/corporate-japanese-training': [
      {
        q: 'Can corporate training programs be customized for our enterprise team?',
        a: 'Yes! We tailor curriculum, scheduling, and industry-specific vocabulary for software teams, automotive engineers, translation units, and executive delegations.'
      },
      {
        q: 'Do you deliver training on-site at client premises in Bengaluru?',
        a: 'Yes, we provide both on-premise classroom training across Bengaluru tech parks and secure live virtual classrooms for globally distributed teams.'
      }
    ],
    '/jlpt': [
      {
        q: 'What is the JLPT (Japanese Language Proficiency Test)?',
        a: 'The JLPT is the official standardized test evaluated by the Japan Foundation and JEES to certify Japanese language proficiency for non-native speakers worldwide across 5 levels from N5 (introductory) to N1 (advanced).'
      },
      {
        q: 'How often is the JLPT held in India?',
        a: 'The JLPT is conducted twice each year - on the first Sunday of July and the first Sunday of December - across authorized exam centers in Bengaluru, New Delhi, Chennai, Pune, Mumbai, and Kolkata.'
      }
    ],
    '/locations/electronic-city': [
      {
        q: 'Where is Fuji Japanese Academy located in Electronic City?',
        a: 'Our campus is located at 06, 1st Floor, Vittasandra Cross Hemavathi Block, Phase-1, Bettadasanapura, Electronic City, Bengaluru, Karnataka 560100.'
      },
      {
        q: 'Are weekend classroom batches available at Electronic City?',
        a: 'Yes! We run dedicated Saturday and Sunday physical batches tailored for software engineers and college students in Electronic City.'
      }
    ],
    '/locations/bangalore': [
      {
        q: 'What Japanese training programs are offered in Bengaluru?',
        a: 'We offer beginner to advanced JLPT N5-N1 coaching, Spoken Japanese, Business Keigo, and Japanese for IT Professionals both in-person at our Electronic City center and online.'
      }
    ],
    '/corporate': [
      {
        q: 'What corporate Japanese training formats do you offer for IT enterprises?',
        a: 'We deliver on-premise classroom training across Bengaluru tech parks, live interactive virtual cohorts pan-India, and hybrid models focused on Technical Keigo and Agile standup communication.'
      },
      {
        q: 'Can corporate training programs be customized for our engineering team?',
        a: 'Yes! Our native Japanese sensei tailor vocabulary, mock code reviews, and client presentation scenarios directly to your tech stack and deliverables.'
      }
    ],
    '/jlpt-exam-dates-india': [
      {
        q: 'When are the JLPT exam dates in India for 2026?',
        a: 'The official 2026 JLPT exam dates in India are Sunday, July 5, 2026 (Summer session) and Sunday, December 6, 2026 (Winter session).'
      },
      {
        q: 'Where are the JLPT test centers located in India?',
        a: 'Authorized test centers operate in Bengaluru, New Delhi, Chennai, Pune, Mumbai, and Kolkata.'
      }
    ],
    '/mock-test': [
      {
        q: 'Is the JLPT mock test free to take?',
        a: 'Yes! The Fuji Japanese Academy JLPT Mini-Exam simulator is 100% free with instant score calculation, detailed answer explanations, and downloadable certificate generation.'
      },
      {
        q: 'Which JLPT levels are supported in the online mock test?',
        a: 'The simulator supports JLPT N5 (Beginners), JLPT N4 (Elementary), and JLPT N3 (Intermediate), featuring timed questions covering Kanji, Vocabulary, Grammar, and Reading comprehension.'
      }
    ]
  };

  const routeFaqs = FAQ_MAP[p];
  if (routeFaqs && routeFaqs.length > 0) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: routeFaqs.map(faq => ({
        '@type': 'Question',
        name: faq.q,
        acceptedAnswer: {
          '@type': 'Answer',
          text: faq.a
        }
      }))
    });
  }

  if (schemas.length === 0) return '';

  return schemas.map(s => `<script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n</script>`).join('\n');
}

function processHtmlTemplate(template, meta) {
  let html = template;

  // 1. Replace or insert Title
  if (html.includes('<title>')) {
    html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(meta.title)}</title>`);
  } else {
    html = html.replace('</head>', `<title>${escapeHtml(meta.title)}</title>\n</head>`);
  }

  // 2. Replace or insert Meta Description
  if (html.includes('name="description"')) {
    html = html.replace(/<meta\s+name="description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta name="description" content="${escapeHtml(meta.description)}" />`);
  } else {
    html = html.replace('</head>', `<meta name="description" content="${escapeHtml(meta.description)}" />\n</head>`);
  }

  // 3. Replace or insert Canonical URL (EXACTLY ONE self-referencing canonical)
  const canonicalTag = `<link rel="canonical" href="${meta.canonical}" />`;
  if (html.includes('rel="canonical"')) {
    html = html.replace(/<link\s+rel="canonical"\s+href="[\s\S]*?"\s*\/?>/i, canonicalTag);
  } else {
    html = html.replace('</head>', `${canonicalTag}\n</head>`);
  }

  // 4. Replace or insert Robots meta tag
  const robotsDirective = meta.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1';
  const robotsTag = `<meta name="robots" content="${robotsDirective}" />`;
  if (html.includes('name="robots"')) {
    html = html.replace(/<meta\s+name="robots"\s+content="[\s\S]*?"\s*\/?>/i, robotsTag);
  } else {
    html = html.replace('</head>', `${robotsTag}\n</head>`);
  }

  // 5. Replace Open Graph tags
  if (html.includes('property="og:url"')) {
    html = html.replace(/<meta\s+property="og:url"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:url" content="${meta.canonical}" />`);
  }
  if (html.includes('property="og:title"')) {
    html = html.replace(/<meta\s+property="og:title"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:title" content="${escapeHtml(meta.title)}" />`);
  }
  if (html.includes('property="og:description"')) {
    html = html.replace(/<meta\s+property="og:description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta property="og:description" content="${escapeHtml(meta.description)}" />`);
  }

  // 6. Replace Twitter tags
  if (html.includes('name="twitter:title"')) {
    html = html.replace(/<meta\s+name="twitter:title"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`);
  }
  if (html.includes('name="twitter:description"')) {
    html = html.replace(/<meta\s+name="twitter:description"\s+content="[\s\S]*?"\s*\/?>/i,
      `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`);
  }

  // 7. Inject Route-Specific JSON-LD Schema
  const routeSchema = generateRouteSchema(meta);
  if (routeSchema) {
    html = html.replace('</head>', `${routeSchema}\n</head>`);
  }

  // 8. Inject Semantic HTML inside <div id="root">
  const rootContent = generateRouteContent(meta);
  html = html.replace('<div id="root"></div>', `<div id="root">${rootContent}</div>`);

  return html;
}

function escapeHtml(str) {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export function runPrerender() {
  console.log('[Prerender] Starting static site generation...');

  if (!fs.existsSync(distDir)) {
    throw new Error(`dist directory does not exist at ${distDir}. Run vite build first.`);
  }

  const indexHtmlPath = path.join(distDir, 'index.html');
  const baseHtml = fs.readFileSync(indexHtmlPath, 'utf8');

  // 1. Process all indexable routes
  let count = 0;
  for (const route of INDEXABLE_ROUTES) {
    const pageHtml = processHtmlTemplate(baseHtml, route);

    let targetFile;
    if (route.path === '/') {
      targetFile = indexHtmlPath;
    } else {
      const cleanPath = route.path.replace(/^\//, '');
      targetFile = path.join(distDir, `${cleanPath}.html`);
      const parentDir = path.dirname(targetFile);
      if (!fs.existsSync(parentDir)) {
        fs.mkdirSync(parentDir, { recursive: true });
      }

      // If an old directory index.html exists, remove it so Netlify doesn't force a trailing slash
      const oldSubDirIndex = path.join(distDir, cleanPath, 'index.html');
      if (fs.existsSync(oldSubDirIndex)) {
        fs.unlinkSync(oldSubDirIndex);
      }
    }

    fs.writeFileSync(targetFile, pageHtml, 'utf8');
    count++;
  }
  console.log(`[Prerender] Successfully generated ${count} indexable pages (.html files for zero-redirect 200 responses).`);

  // 2. Clean up any utility directories or legacy index.html files from dist
  for (const route of UTILITY_NOINDEX_ROUTES) {
    const cleanPath = route.path.replace(/^\//, '');
    const targetDir = path.join(distDir, cleanPath);
    if (fs.existsSync(targetDir)) {
      fs.rmSync(targetDir, { recursive: true, force: true });
    }
    const legacyHtml = path.join(distDir, `${cleanPath}.html`);
    if (fs.existsSync(legacyHtml)) {
      fs.unlinkSync(legacyHtml);
    }
  }
  console.log('[Prerender] Utility/private routes kept as client-side SPA rewrites (excluded from static output & sitemap).');

  // 3. Generate custom 404.html (Returns real HTTP 404)
  const notFoundMeta = {
    path: '/404',
    title: '404 - Page Not Found | Fuji Japanese Academy',
    description: 'The requested page could not be found. Return to Fuji Japanese Academy homepage or explore courses.',
    canonical: 'https://fujijapaneseacademy.com/404',
    robots: 'noindex, nofollow',
    h1: '404 - Page Not Found'
  };
  const notFoundHtml = processHtmlTemplate(baseHtml, notFoundMeta);
  fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf8');
  console.log('[Prerender] Generated dist/404.html with noindex, nofollow.');

  // 4. Write authoritative sitemap.xml into dist/
  writeSitemaps();
  const sitemapXml = fs.readFileSync(path.join(rootDir, 'public', 'sitemap.xml'), 'utf8');
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf8');
  const distLegacySitemap = path.join(distDir, 'sitemap-academy.xml');
  if (fs.existsSync(distLegacySitemap)) {
    fs.unlinkSync(distLegacySitemap);
  }

  // 5. Copy robots.txt to dist/
  const robotsTxt = fs.readFileSync(path.join(rootDir, 'public', 'robots.txt'), 'utf8');
  fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf8');

  // 6. Ensure _redirects, _headers, and deploy-safe netlify.toml in dist/
  if (fs.existsSync(path.join(rootDir, 'public', '_redirects'))) {
    fs.copyFileSync(path.join(rootDir, 'public', '_redirects'), path.join(distDir, '_redirects'));
  }
  if (fs.existsSync(path.join(rootDir, 'public', '_headers'))) {
    fs.copyFileSync(path.join(rootDir, 'public', '_headers'), path.join(distDir, '_headers'));
  }

  const deployNetlifyToml = `
# Production Netlify Deployment Configuration for Fuji Japanese Academy

[[plugins]]
  package = "@netlify/plugin-sitemap"
  [plugins.inputs]
    baseUrl = "https://fujijapaneseacademy.com"
    exclude = [
      './404.html',
      '404.html',
      '**/404.html',
      '**/**/404.html',
      '**/404/**'
    ]
`;
  fs.writeFileSync(path.join(distDir, 'netlify.toml'), deployNetlifyToml.trim(), 'utf8');

  console.log('[Prerender] Prerendering and asset deployment complete!');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runPrerender();
}
