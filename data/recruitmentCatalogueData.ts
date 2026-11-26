export interface JobFamily {
  id: string;
  code: string;
  name: string;
  description: string;
  targetQualifications: string[];
  roles: string[];
}

export interface ProficiencyTier {
  level: string;
  badge: string;
  targetAudience: string;
  suggestedOpportunities: string;
  visaRelevance: string;
}

export interface StandardRecruitmentRole {
  role: string;
  eligibility: string;
  japaneseTarget: string;
  experience: string;
  category: string;
}

export const RECRUITMENT_STATS = {
  jobFamiliesCount: 15,
  targetRolesCount: '100+',
  languageLevels: 'N5–N1 & Non-Japanese',
  hiringMarkets: 2, // India & Japan
  experienceRange: 'Fresher / Entry level to 15+ yrs Senior'
};

export const MASTER_JOB_FAMILIES: JobFamily[] = [
  {
    id: 'it-software',
    code: 'A',
    name: 'Software Development & IT',
    description: 'Enterprise, cloud, web, and mobile software engineering for Indian tech GCCs and Tokyo MNCs.',
    targetQualifications: ['B.E. / B.Tech (CS/IT/ECE)', 'MCA', 'BCA', 'B.Sc Computer Science'],
    roles: [
      'Java Developer', 'Spring Boot Developer', 'React Developer', 'Angular Developer',
      'Python Developer', 'Full Stack Developer', 'Frontend Developer', 'Backend Developer',
      '.NET Developer', 'C/C++ Developer', 'Mobile App Developer', 'Software Tester',
      'Automation QA Engineer', 'Business Analyst', 'System Engineer', 'Application Support Engineer'
    ]
  },
  {
    id: 'ai-data',
    code: 'B',
    name: 'AI, Data & Emerging Technology',
    description: 'Next-generation intelligence systems, generative models, analytics, and data infrastructure.',
    targetQualifications: ['B.Tech / M.Tech AI/Data Science', 'MCA', 'M.Sc Statistics/Maths'],
    roles: [
      'AI Engineer', 'Machine Learning Engineer', 'Generative AI Engineer', 'LLM Engineer',
      'AI Agent Developer', 'Data Scientist', 'Data Analyst', 'Data Engineer',
      'BI Developer', 'MLOps Engineer', 'Computer Vision Engineer', 'AI Solutions Architect'
    ]
  },
  {
    id: 'cloud-devops',
    code: 'C',
    name: 'Cloud, DevOps & Security',
    description: 'Infrastructure automation, multi-cloud platforms, ITSM, and cybersecurity defense.',
    targetQualifications: ['B.E. / B.Tech', 'BCA / MCA', 'Cloud Certifications (AWS/Azure/GCP)'],
    roles: [
      'AWS Engineer', 'Azure Engineer', 'GCP Engineer', 'DevOps Engineer',
      'Kubernetes Engineer', 'Terraform Engineer', 'Cloud Architect', 'Linux Administrator',
      'Network Engineer', 'ServiceNow Developer', 'ITSM Specialist', 'Cybersecurity Analyst',
      'SOC Analyst', 'Information Security Engineer'
    ]
  },
  {
    id: 'sap-erp',
    code: 'D',
    name: 'SAP, ERP & Enterprise Systems',
    description: 'Core business workflow systems, ERP migrations, and bilingual corporate software integration.',
    targetQualifications: ['B.E. / B.Tech', 'B.Com / M.Com', 'MBA', 'SAP Certified Consultants'],
    roles: [
      'SAP FICO Consultant', 'SAP MM Consultant', 'SAP SD Consultant', 'SAP ABAP Developer',
      'SAP Basis Consultant', 'SAP PP Consultant', 'Oracle ERP Consultant', 'Salesforce Developer',
      'ERP Functional Consultant', 'ERP Support Engineer'
    ]
  },
  {
    id: 'semiconductor-engineering',
    code: 'E',
    name: 'Electronics, Semiconductor & Engineering',
    description: 'Silicon design, verification, embedded systems, automotive R&D, and hardware engineering.',
    targetQualifications: ['B.E. / B.Tech (ECE/EEE/Mechanical/Civil)', 'M.Tech VLSI / Embedded', 'Diploma'],
    roles: [
      'DFT Engineer', 'VLSI Design Engineer', 'RTL Design Engineer', 'Physical Design Engineer',
      'Embedded Systems Engineer', 'Firmware Engineer', 'PCB Design Engineer', 'Electronics Engineer',
      'Electrical Engineer', 'Mechanical Design Engineer', 'Civil Engineer', 'CAD Engineer',
      'Automotive Design Engineer', 'Robotics Engineer'
    ]
  },
  {
    id: 'accounting-finance',
    code: 'F',
    name: 'Accounting, Finance & Commerce',
    description: 'Corporate accounting, tax reporting, audit, and bilingual financial ledger management.',
    targetQualifications: ['B.Com', 'M.Com', 'MBA Finance', 'CA / CMA / Inter CA', 'BBA'],
    roles: [
      'Accountant', 'Junior Accountant', 'Accounts Executive', 'Japanese Bilingual Accountant',
      'Accounts Payable Specialist', 'Accounts Receivable Specialist', 'General Ledger Accountant',
      'Finance Analyst', 'Financial Reporting Analyst', 'Audit Associate', 'Tax Executive',
      'GST Executive', 'Cost Accountant', 'Financial Controller'
    ]
  },
  {
    id: 'business-sales',
    code: 'G',
    name: 'Business, Management & Sales',
    description: 'B2B cross-border trade, Japanese enterprise sales, key account growth, and operational management.',
    targetQualifications: ['MBA (Sales/Marketing/IB)', 'BBA', 'Any Graduate with B2B Experience'],
    roles: [
      'Business Development Executive', 'Japan Sales Executive', 'International Sales Executive',
      'B2B Sales Manager', 'Key Account Manager', 'Account Manager', 'Relationship Manager',
      'Operations Executive', 'Project Coordinator', 'Project Manager', 'Program Manager',
      'Business Operations Manager', 'Management Trainee', 'Strategy Analyst'
    ]
  },
  {
    id: 'japanese-language',
    code: 'H',
    name: 'Japanese Language & Communication',
    description: 'Linguistic bridging, high-precision translation, boardroom simultaneous interpretation, and localization.',
    targetQualifications: ['JLPT N3–N1 Certified', 'BA / MA Japanese', 'Certified Interpreters'],
    roles: [
      'Japanese Interpreter', 'Japanese Translator', 'Japanese Bilingual Coordinator',
      'Japanese Language Trainer', 'Japanese Corporate Trainer', 'Localization Specialist',
      'Japanese Content Reviewer', 'Japanese Customer Support Executive', 'Japanese Technical Support Specialist',
      'Japanese Executive Assistant', 'Japanese Document Specialist', 'Japanese Linguist'
    ]
  },
  {
    id: 'hr-recruitment',
    code: 'I',
    name: 'HR, Recruitment & Administration',
    description: 'Talent acquisition, Japanese bilingual staffing, employee relations, and office governance.',
    targetQualifications: ['MBA HR', 'MSW / MHRM', 'BBA / Any Graduate'],
    roles: [
      'HR Executive', 'Japanese Bilingual Recruiter', 'Talent Acquisition Specialist',
      'Japan Recruitment Coordinator', 'HR Operations Executive', 'Payroll Specialist',
      'HRBP', 'Office Administrator', 'Executive Assistant', 'Administration Manager',
      'Compliance Executive'
    ]
  },
  {
    id: 'manufacturing-skilled',
    code: 'J',
    name: 'Manufacturing & Skilled Labour',
    description: 'Precision machining, industrial fabrication, robotic line maintenance, and quality control.',
    targetQualifications: ['ITI (Fitter/Turner/Machinist/Electrician/Welder)', 'Polytechnic Diploma', 'Trade Certified'],
    roles: [
      'CNC Operator', 'CNC Programmer', 'CNC Machinist', 'Machine Operator', 'Welder',
      'Fabricator', 'Fitter', 'Electrician', 'Plumber', 'Industrial Maintenance Technician',
      'Automobile Mechanic', 'Tool & Die Maker', 'Quality Inspector', 'Production Technician',
      'Assembly Technician', 'Machine Maintenance Technician'
    ]
  },
  {
    id: 'operational-workforce',
    code: 'K',
    name: 'Entry-Level & Operational Workforce',
    description: 'Plant production, packaging lines, agricultural operations, and logistics execution.',
    targetQualifications: ['10th / 12th Pass', 'ITI', 'Vocational Training Certificate'],
    roles: [
      'Factory Production Worker', 'Packaging Worker', 'Food Processing Worker', 'Warehouse Worker',
      'Building Cleaning Worker', 'Laundry Processing Worker', 'Agriculture Worker', 'Forestry Worker',
      'Fish Processing Worker', 'Hotel Housekeeping Worker', 'Kitchen Support Worker', 'Logistics Assistant'
    ]
  },
  {
    id: 'healthcare-caregiving',
    code: 'L',
    name: 'Healthcare & Caregiving',
    description: 'Elderly care, nursing assistance, hospital operations, and specialized caregiving in Japan.',
    targetQualifications: ['ANM / GNM / B.Sc Nursing', 'Caregiver Certified Course', 'Physiotherapy Diploma'],
    roles: [
      'Nursing Care Worker', 'Caregiver', 'Elderly Care Assistant', 'Nursing Assistant',
      'Hospital Support Staff', 'Rehabilitation Assistant', 'Healthcare Coordinator',
      'Medical Interpreter', 'Biomedical Engineer'
    ]
  },
  {
    id: 'hospitality-tourism',
    code: 'M',
    name: 'Hospitality, Tourism & Aviation',
    description: 'Luxury hotel guest relations, culinary arts, travel management, and ground aviation services.',
    targetQualifications: ['BHM / Hotel Management Diploma', 'BBA Aviation / Tourism', 'Culinary Diploma'],
    roles: [
      'Hotel Front Office Executive', 'Guest Relations Executive', 'Hotel Operations Executive',
      'Restaurant Service Staff', 'Chef', 'Japanese Cuisine Chef', 'Food Production Staff',
      'Travel Coordinator', 'Tour Guide', 'Airport Ground Handling Worker', 'Aviation Maintenance Technician'
    ]
  },
  {
    id: 'logistics-procurement',
    code: 'N',
    name: 'Logistics, Supply Chain & Procurement',
    description: 'Cross-border import/export documentation, supply chain planning, and warehouse governance.',
    targetQualifications: ['B.Com / BBA / MBA Supply Chain', 'Diploma in International Trade'],
    roles: [
      'Logistics Executive', 'Supply Chain Analyst', 'Procurement Executive', 'Purchase Executive',
      'Import–Export Executive', 'International Trade Coordinator', 'Inventory Controller',
      'Warehouse Supervisor', 'Logistics Coordinator', 'Shipping Documentation Executive',
      'Japanese Bilingual Procurement Specialist'
    ]
  },
  {
    id: 'senior-leadership',
    code: 'O',
    name: 'Senior Leadership & Specialist Roles',
    description: 'Director-level engineering delivery, plant management, strategic alliances, and general management.',
    targetQualifications: ['10–20+ Years Track Record', 'B.Tech + MBA / Advanced Degree'],
    roles: [
      'Technical Lead', 'Engineering Manager', 'IT Delivery Manager', 'Solution Architect',
      'Finance Manager', 'Operations Manager', 'Country Coordinator', 'Japan Market Development Manager',
      'Japanese Client Relationship Manager', 'Delivery Head', 'Plant Manager', 'General Manager'
    ]
  }
];

export const JAPANESE_PROFICIENCY_MATRIX: ProficiencyTier[] = [
  {
    level: 'No Japanese',
    badge: 'India Hubs & Technical',
    targetAudience: 'Skilled engineers, accountants & management professionals building domain competence.',
    suggestedOpportunities: 'India-based technical, accounting, management and operations jobs; select Japan opportunities subject to employer sponsorship and visa requirements.',
    visaRelevance: 'Requires on-the-job language training for eventual Japan relocation.'
  },
  {
    level: 'JLPT N5',
    badge: 'Beginner Trainee',
    targetAudience: 'Learners grasping basic scripts (Hiragana/Katakana) and fundamental 100+ Kanji.',
    suggestedOpportunities: 'Beginner trainees, Japanese language learners, selected entry-level engineering & support roles with further company training.',
    visaRelevance: 'Foundation stage for SSW skill evaluations.'
  },
  {
    level: 'JLPT N4',
    badge: 'Specified Skilled Worker',
    targetAudience: 'Conversational daily Japanese, 300+ Kanji, basic workplace vocabulary.',
    suggestedOpportunities: 'Selected specified-skilled-worker (SSW) pathways, manufacturing technicians, hotel service, and basic workplace Japanese roles.',
    visaRelevance: 'Official prerequisite threshold for Japan SSW Type 1 visa across 19 recognized industries.'
  },
  {
    level: 'JLPT N3',
    badge: 'Tokyo Tech Gateway',
    targetAudience: 'Intermediate conversational and business Japanese; capable of understanding daily technical standups.',
    suggestedOpportunities: 'Junior bilingual operations, support, hospitality, production coordination, and software developer relocation to Tokyo.',
    visaRelevance: 'Widely recognized benchmark for Engineer/Specialist in Humanities work visas.'
  },
  {
    level: 'JLPT N2',
    badge: 'Bilingual Professional',
    targetAudience: 'Fluent business Japanese, keigo comprehension, technical specifications, and corporate negotiations.',
    suggestedOpportunities: 'Japanese bilingual IT, interpreter, translator, accountant, HR, recruiter, sales, business development and engineering roles.',
    visaRelevance: 'Premium starting packages in Tokyo (¥6M–¥12M+) with high-skilled professional visa points.'
  },
  {
    level: 'JLPT N1',
    badge: 'Native-Level Specialist',
    targetAudience: 'Highest accreditation level; abstract cultural, legal, academic, and executive communication mastery.',
    suggestedOpportunities: 'Advanced interpreter, professional translator, senior bilingual specialist, Japan-facing management, corporate training and negotiation-heavy roles.',
    visaRelevance: 'Direct eligibility for Japan Highly Skilled Professional (HSP) fast-track permanent residency.'
  }
];

export const FEATURED_EMPLOYER_REQUIREMENTS = [
  {
    id: 'employer-1-sales-manesar',
    roleTitle: 'Executive Sales / Business Development',
    employerCategory: 'Japanese Automotive & Industrial Enterprise Partner',
    location: 'Manesar, Haryana',
    employmentType: 'Full-time, Permanent',
    ctc: '₹6–10 LPA (Based on experience & JLPT level)',
    japaneseProficiency: 'JLPT N2 / N1 Mandatory',
    qualifications: 'MBA in Sales, Marketing, International Business or related discipline.',
    experience: 'B2B sales and Japanese-client experience preferred. Freshers with strong Japanese proficiency (N2/N1) and an MBA will also be considered.',
    responsibilities: [
      'Japanese client acquisition, commercial proposals, and relationship management',
      'B2B sales presentations, contract negotiations, and technical coordination with internal teams',
      'Client visits, on-site travel, and senior leadership sales reporting'
    ],
    classification: 'Sales & Management / Japanese Bilingual / Fresher or Experienced'
  },
  {
    id: 'employer-2-indo-sakura',
    roleTitle: 'Japanese Bilingual IT & Engineering Professionals',
    employerCategory: 'Indo-Sakura Software (Recruitment Partner)',
    location: 'Bengaluru / Tokyo / Hybrid',
    employmentType: 'Full-time / Client Placement',
    ctc: 'Industry Leading + Japan Relocation Allowances',
    japaneseProficiency: 'JLPT N1–N5 (Employer seeking candidate visibility across all levels)',
    qualifications: 'B.E./B.Tech, MCA, BCA, M.Tech in CS/IT/ECE or related fields.',
    experience: '0 to 8+ years across Software, Cloud, DevOps, ERP, and Semiconductors.',
    specializations: [
      { area: 'Software Developer', skills: 'Java, Spring Boot, React, Angular, Python' },
      { area: 'Cloud Engineer', skills: 'AWS, Azure' },
      { area: 'DevOps Engineer', skills: 'Kubernetes, Terraform, CI/CD' },
      { area: 'Enterprise IT', skills: 'ServiceNow, ITSM' },
      { area: 'Security Specialist', skills: 'Cybersecurity, SOC, Compliance' },
      { area: 'SAP Consultant', skills: 'SAP FICO, SAP MM, SAP SD' },
      { area: 'Semiconductor Engineer', skills: 'DFT (Design For Testability), VLSI' }
    ],
    classification: 'IT & Software / Emerging Tech / Bilingual Engineering'
  }
];

export const STANDARD_RECRUITMENT_ROLES: StandardRecruitmentRole[] = [
  { role: 'Java / Spring Boot Developer', eligibility: 'B.E., B.Tech, MCA, BCA; Java, SQL, REST APIs', japaneseTarget: 'N3–N2', experience: '0–5 years', category: 'Software Development & IT' },
  { role: 'Full Stack Developer', eligibility: 'React/Angular, Java/Python, SQL', japaneseTarget: 'N3–N2', experience: '1–5 years', category: 'Software Development & IT' },
  { role: 'AI / ML Engineer', eligibility: 'Python, ML, model integration, API development', japaneseTarget: 'N3–N2', experience: '1–5 years', category: 'AI, Data & Emerging Tech' },
  { role: 'Cloud / DevOps Engineer', eligibility: 'AWS/Azure, CI/CD, Docker, Kubernetes', japaneseTarget: 'N3–N2', experience: '1–6 years', category: 'Cloud, DevOps & Security' },
  { role: 'SAP Consultant', eligibility: 'SAP module knowledge, ERP experience', japaneseTarget: 'N3–N2', experience: '2–8 years', category: 'SAP, ERP & Enterprise' },
  { role: 'DFT Engineer', eligibility: 'ECE/EEE, scan, ATPG, semiconductor testing', japaneseTarget: 'N3–N2', experience: '1–8 years', category: 'Semiconductor & Hardware' },
  { role: 'Japanese Interpreter', eligibility: 'Fluency in Japanese and English; interpretation ability', japaneseTarget: 'N2–N1', experience: '0–5 years', category: 'Language & Translation' },
  { role: 'Japanese Translator', eligibility: 'Translation, proofreading, terminology knowledge', japaneseTarget: 'N2–N1', experience: '0–5 years', category: 'Language & Translation' },
  { role: 'Japanese Accountant', eligibility: 'B.Com/M.Com/MBA Finance, accounting, Excel', japaneseTarget: 'N3–N2', experience: '0–5 years', category: 'Accounting & Finance' },
  { role: 'Finance Analyst', eligibility: 'B.Com/M.Com/MBA Finance, reporting, analysis', japaneseTarget: 'N3–N2', experience: '1–5 years', category: 'Accounting & Finance' },
  { role: 'Japanese Recruiter', eligibility: 'HR background, sourcing, screening, Japanese communication', japaneseTarget: 'N3–N2', experience: '0–5 years', category: 'HR & Administration' },
  { role: 'Japan Business Development', eligibility: 'MBA/BBA, presentation, client management, B2B sales', japaneseTarget: 'N2–N1', experience: '0–8 years', category: 'Business, Sales & Mgmt' },
  { role: 'Japanese Project Coordinator', eligibility: 'Project documentation, Excel, stakeholder communication', japaneseTarget: 'N3–N2', experience: '0–5 years', category: 'Business, Sales & Mgmt' },
  { role: 'Mechanical / Electrical Engineer', eligibility: 'Engineering degree, CAD/PLC/electrical fundamentals', japaneseTarget: 'N4–N2', experience: '0–5 years', category: 'Manufacturing & Engineering' },
  { role: 'CNC Operator / Technician', eligibility: 'ITI/Diploma, machining, drawings, machine operation', japaneseTarget: 'N4–N3', experience: '0–5 years', category: 'Manufacturing & Skilled' },
  { role: 'Welder / Fitter / Electrician', eligibility: 'ITI or proven technical trade skills', japaneseTarget: 'N4–N3', experience: '0–5 years', category: 'Manufacturing & Skilled' },
  { role: 'Production / Quality Worker', eligibility: 'Relevant training, shop-floor skills, safety knowledge', japaneseTarget: 'N4–N3', experience: '0–3 years', category: 'Operations & Production' },
  { role: 'Caregiver / Nursing Care', eligibility: 'Caregiving training, physical assistance and communication skills', japaneseTarget: 'N4–N3', experience: '0–5 years', category: 'Healthcare & Caregiving' },
  { role: 'Hotel / Hospitality Staff', eligibility: 'Hospitality qualification or relevant service experience', japaneseTarget: 'N4–N2', experience: '0–5 years', category: 'Hospitality & Tourism' },
  { role: 'Warehouse / Logistics Worker', eligibility: 'Inventory handling, safety, physical work suitability', japaneseTarget: 'N4–N3', experience: '0–3 years', category: 'Logistics & Supply Chain' }
];

export const OPERATIONAL_DIVISIONS = [
  {
    number: '01',
    name: 'Japanese Bilingual Professional Recruitment',
    scope: 'IT, engineering, accounting, finance, HR, translation, interpretation and executive management.',
    focus: 'Focus on JLPT N3–N1 candidates with professional degrees (B.Tech, MCA, MBA, CA).'
  },
  {
    number: '02',
    name: 'Japan Skilled Workforce & SSW',
    scope: 'Manufacturing, caregiving, hospitality, agriculture, construction, automotive and official 19 Type 1 SSW fields.',
    focus: 'Appropriate sector skill certification, JFT/JLPT N4 language benchmark, and COE immigration compliance.'
  },
  {
    number: '03',
    name: 'Freshers & Campus Placement',
    scope: 'Direct campus hiring from engineering colleges, BCA/MCA universities, commerce colleges, polytechnics, and ITIs.',
    focus: 'Pre-placement Japanese coaching batches, mock interview training, and corporate internship drives.'
  },
  {
    number: '04',
    name: 'Corporate & Experienced Hiring',
    scope: 'Senior specialists, delivery heads, bilingual plant managers, and Japanese client account executives.',
    focus: 'Confidential executive search, cross-border leadership transitions, and bilingual GCC staffing.'
  }
];
