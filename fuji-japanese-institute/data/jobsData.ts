import { JobPost } from '../types';

export const ADMIN_CAREERS_EMAIL = 'fujijapaneseacademy@gmail.com';

/**
 * Builds a structured mailto link for direct job applications
 */
export function getJobApplyMailto(jobTitle: string, location: string): string {
  const subject = `Application for ${jobTitle} - ${location}`;
  const body = `Dear Fuji Japanese Academy Recruitment Team,

I am writing to express my interest in the position of "${jobTitle}" based in ${location}.

My Profile Details:
- Full Name: 
- Contact Number: 
- Current Location: 
- JLPT Certification Level (N2 / N1 / Other): 
- Highest Educational Qualification (e.g., MBA / Masters): 
- Total Years of Experience (Sales / BD / Japanese Coordination): 
- Current CTC: 
- Expected CTC: 
- Notice Period: 

Brief Note on My Suitability:
[Please mention your Japanese language proficiency, B2B sales experience, or relevant academic background]

I have attached my updated Resume / CV for your evaluation. Looking forward to hearing from you.

Best regards,
[Your Name]`;

  return `mailto:${ADMIN_CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export const EXECUTIVE_SALES_JOB: JobPost = {
  id: 'executive-sales-manesar',
  title: 'Executive Sales / Business Development',
  department: 'Sales & Business Development',
  type: 'Full-time',
  location: 'Manesar, Haryana',
  salary: '6 to 10 LPA CTC (Fixed)',
  salaryNote: '6 to 10 LPA CTC (fixed); this may vary based on market standards / as per industry norms / Interview performance.',
  description: 'We are looking for a dynamic and result-oriented Japan Sales professional to develop and manage business opportunities with Japanese customers and clients. The role will involve client communication, business development, relationship management, and coordination with internal teams.',
  aboutRole: 'We are looking for a dynamic and result-oriented Japan Sales professional to develop and manage business opportunities with Japanese customers and clients. The role will involve client communication, business development, relationship management, and coordination with internal teams.',
  responsibilities: [
    'Develop new business opportunities with Japanese customers and companies.',
    'Build and maintain strong relationships with existing Japanese clients.',
    'Understand customer requirements and coordinate with internal teams for suitable solutions.',
    'Handle sales discussions, presentations, quotations, and negotiations.',
    'Coordinate with Japanese stakeholders and support smooth business communication.',
    'Identify market opportunities and contribute to sales growth.',
    'Travel for client meetings and business discussions as required.',
    'Maintain regular sales reports and track business development activities.'
  ],
  requirements: [
    'MBA in Sales, Marketing, International Business, or a related field',
    'JLPT N2 or N1 certification is mandatory',
    'Strong Japanese and English communication skills',
    'Good interpersonal, presentation, and negotiation skills',
    'Candidates with B2B sales/business development experience preferred',
    'Exposure to Japanese companies or Japanese business culture is an advantage',
    'Freshers with strong Japanese proficiency and an MBA may also be considered'
  ],
  eligibility: [
    'MBA in Sales, Marketing, International Business, or a related field.',
    'JLPT N2 or N1 certification is mandatory.',
    'Strong Japanese and English communication skills.',
    'Good interpersonal, presentation, and negotiation skills.',
    'Candidates with B2B sales/business development experience will be preferred.',
    'Exposure to Japanese companies or Japanese business culture will be an advantage.',
    'Freshers with strong Japanese proficiency and an MBA may also be considered.'
  ],
  applyEmail: ADMIN_CAREERS_EMAIL,
  featured: true,
  active: true
};

export const OPEN_POSITIONS: JobPost[] = [
  EXECUTIVE_SALES_JOB,
  {
    id: 'j1',
    title: 'Senior Japanese Trainer (N1/N2)',
    department: 'Academics',
    type: 'Full-time',
    location: 'Bengaluru / Hybrid',
    salary: '₹5,00,000 – ₹8,00,000 CTC',
    salaryNote: 'Based on JLPT certification level and prior teaching track record.',
    description: 'We are looking for passionate trainers to lead our advanced JLPT batches.',
    aboutRole: 'Lead advanced JLPT N2 and N1 certification batches, mentor students through Kanji and grammar nuances, and design mock evaluation papers.',
    responsibilities: [
      'Conduct interactive online and classroom training sessions for JLPT N2/N1 aspirants.',
      'Evaluate student mock test results and provide targeted grammatical feedback.',
      'Develop proprietary Kanji mnemonics and reading comprehension exercises.'
    ],
    requirements: ['JLPT N1 or N2 certified', '3+ years of teaching experience', 'Strong communication skills'],
    eligibility: ['JLPT N1 or N2 certification', 'Demonstrated pedagogy background in Japanese language'],
    applyEmail: ADMIN_CAREERS_EMAIL,
    active: true
  },
  {
    id: 'j2',
    title: 'Native Japanese Language Expert',
    department: 'Academics',
    type: 'Full-time / Part-time',
    location: 'Bengaluru / On-site',
    salary: 'Competitive & Commensurate with Experience',
    salaryNote: 'Includes relocation allowance and housing assistance for overseas candidates.',
    description: 'Engage with students for conversational fluency and cultural immersion workshops.',
    aboutRole: 'Facilitate native conversational sessions, teach Business Keigo nuances, and lead cultural immersion workshops.',
    responsibilities: [
      'Conduct conversation clinics focusing on authentic Tokyo accent and cadence.',
      'Teach Business Japanese (Keigo, Kenjougo, Sonkeigo) and corporate etiquette.',
      'Host cultural immersion workshops (Tea ceremony, Calligraphy, Business card exchange).'
    ],
    requirements: ['Native Japanese speaker', 'Intercultural communication skills', 'Passion for teaching'],
    eligibility: ['Native Japanese proficiency', 'Bachelor’s degree or equivalent teaching credentials'],
    applyEmail: ADMIN_CAREERS_EMAIL,
    active: true
  },
  {
    id: 'j3',
    title: 'Student Admission Counselor',
    department: 'Sales & Support',
    type: 'Full-time',
    location: 'Bengaluru',
    salary: '₹3,50,000 – ₹5,50,000 CTC + Incentives',
    salaryNote: 'Performance-linked monthly admission incentives.',
    description: 'Help aspiring learners choose the right path for their Japanese education journey.',
    aboutRole: 'Advise prospective learners on JLPT levels, course roadmaps, batch schedules, and career prospects in Japan.',
    responsibilities: [
      'Connect with incoming prospective students via phone, WhatsApp, and email.',
      'Understand their career goals (IT job in Tokyo, SSW visa, higher studies) and recommend suitable courses.',
      'Coordinate free demo class attendance and facilitate smooth enrollment.'
    ],
    requirements: ['Excellent counseling skills', 'Familiarity with JLPT levels', 'Target-oriented approach'],
    eligibility: ['Graduate in any discipline', 'Excellent English and Hindi communication skills'],
    applyEmail: ADMIN_CAREERS_EMAIL,
    active: true
  },
  {
    id: 'j4',
    title: 'Social Media Manager (Japan Focus)',
    department: 'Marketing',
    type: 'Remote',
    location: 'Global / Remote',
    salary: '₹3,00,000 – ₹5,00,000 CTC',
    salaryNote: 'Flexible remote engagement with performance bonuses.',
    description: 'Create engaging content about Japanese language and culture for our growing community.',
    aboutRole: 'Drive social presence across Instagram, LinkedIn, and YouTube with educational Reels, Kanji tips, and student success stories.',
    responsibilities: [
      'Script and produce high-engagement short-form video content on Japanese grammar and culture.',
      'Manage LinkedIn thought-leadership posts on Japan IT careers and visa policies.',
      'Engage with followers, address course queries, and build an active online community.'
    ],
    requirements: ['Creative content creation', 'Interest in Anime/J-Culture', 'Basic Japanese knowledge is a plus'],
    eligibility: ['Demonstrated social media portfolio or video editing expertise'],
    applyEmail: ADMIN_CAREERS_EMAIL,
    active: true
  }
];
