import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <Helmet>
        <title>Privacy Policy | Fuji Japanese Academy</title>
        <meta name="description" content="Privacy Policy for Fuji Japanese Academy - Japanese language institute in Bengaluru." />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://fujijapaneseacademy.com/privacy-policy" />
      </Helmet>
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-display font-bold text-fuji-indigo mb-2 text-center">FUJI JAPANESE ACADEMY PRIVATE LIMITED</h1>
        <h2 className="text-2xl font-display font-semibold text-fuji-red mb-8 text-center">PRIVACY POLICY</h2>
        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-sm prose prose-slate max-w-none space-y-6 text-fuji-slate">
          <p className="text-gray-500 mb-6 italic text-sm border-b pb-4">Last Updated: 13 August 2026</p>
          <p>Fuji Japanese Academy Private Limited ("Fuji Japanese Academy", "Academy", "we", "our", or "us") respects the privacy of individuals whose personal information is collected or processed in connection with our website, educational programmes, Japanese-language courses, JLPT preparation, study-abroad assistance, career and professional services, admission processes, enquiries and related activities.</p>
          <p>This Privacy Policy explains the categories of personal information that Fuji Japanese Academy may collect, the purposes for which such information may be processed, the circumstances in which information may be disclosed, the measures used to protect such information, and the rights and choices available under applicable law.</p>
          <p className="text-sm bg-fuji-indigo/5 p-3 rounded-lg border border-fuji-indigo/10">
            <strong>Website:</strong>
            {" "}https://fujijapaneseacademy.com/
            <br />
            <em>This Privacy Policy concerns privacy and personal-data processing only. It does not constitute or replace Fuji Japanese Academy's separate Terms & Conditions, Refund Policy, Course Policies, Admission Policies or other contractual documents.</em>
          </p>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">1. INFORMATION WE MAY COLLECT</h3>
            <p>Fuji Japanese Academy may collect personal information that is reasonably necessary for providing, administering, improving, securing or legally supporting our services. The information collected will depend upon the particular service, programme, course, country, institution, employer, examination, visa, immigration, travel or professional process involved.</p>
            <div className="mt-3 space-y-2">
              <p>
                <strong>1.1 Personal and Contact Information:</strong>
                {" "}Full name, date of birth, age, gender (where applicable), photograph, email address, telephone/mobile number, residential address, mailing address, country of residence, nationality, emergency-contact details.
              </p>
              <p>
                <strong>1.2 Educational and Professional Information:</strong>
                {" "}Educational qualifications, academic records, school/college/university info, course details, employment history, Japanese proficiency, JLPT level and results, certificates, CV/resume.
              </p>
              <p>
                <strong>1.3 Admission and Registration Information:</strong>
                {" "}Admission forms, registration forms, identification documents, certificates, photographs, signatures, and supporting documents.
              </p>
            </div>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">2. COUNTRY-SPECIFIC, STUDY-ABROAD, VISA, IMMIGRATION AND PROFESSIONAL INFORMATION</h3>
            <p>Individuals requesting study-abroad, overseas education, visa, immigration, employment, or placement services may be required to provide passport details, visa info, government ID, KYC info, financial info/bank statements, proof of funds, sponsor details, salary/income info, medical certificates, vaccination records, insurance info, travel details, and background verification documents as required by authorities.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">3. MEDICAL AND HEALTH-RELATED INFORMATION</h3>
            <p>Certain programmes or overseas processes may require medical fitness certificates, examination reports, blood group info, and vaccination records as mandated by institutions, employers, or immigration authorities.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">4. FINANCIAL, BANKING AND KYC INFORMATION</h3>
            <p>Where required for study-abroad, visa, or employment processes, we collect bank statements, proof of funds, income records, sponsorship financial info, tax documents, and government-issued ID.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">5. PARENT, GUARDIAN, SPONSOR AND FAMILY INFORMATION</h3>
            <p>For minors, sponsorships, or visa applications, we may collect names, contact details, identification, and financial support information regarding parents, legal guardians, or sponsors in accordance with applicable law.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">6. PAYMENT AND TRANSACTION INFORMATION</h3>
            <p>We process transaction reference numbers, dates, amounts, billing info, and invoices. Payments are handled via secure third-party payment gateways. We do not store complete card credentials on our servers.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">7. AUDIO, VIDEO, PHOTOGRAPHS AND IMAGES</h3>
            <p>We may collect class photos, event photos, online class recordings, audio, and screenshots for educational, administrative, security, quality-control, or promotional purposes where permitted by law.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">8. TECHNICAL AND WEBSITE INFORMATION</h3>
            <p>Automatically collected site data includes IP address, browser type, device type, operating system, time zone, referring website, and pages visited for analytics, operational security, and troubleshooting.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">9. HOW WE COLLECT INFORMATION</h3>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Direct Interactions:</strong>
                {" "}Forms, applications, emails, calls, chats, and class participation.
              </li>
              <li>
                <strong>Automated Technologies:</strong>
                {" "}Cookies, analytics, server logs, pixels.
              </li>
              <li>
                <strong>Third Parties:</strong>
                {" "}Payment providers, institutions, employers, examination bodies, and social platforms.
              </li>
            </ul>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">10. PURPOSES OF PROCESSING</h3>
            <p>We process personal information for educational services, admission administration, study-abroad/visa support, placement assistance, payment administration, document verification, site improvement, security/fraud prevention, legal compliance, and marketing (with appropriate consent).</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">11. DATA ACCURACY AND DOCUMENT VERIFICATION</h3>
            <p>Users must provide accurate information. We may verify documents with official sources where necessary to ensure authenticity and process integrity.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">12. COOKIES AND SIMILAR TECHNOLOGIES</h3>
            <p>Cookies are used for site functionality, performance, security, and analytics. Users can manage cookie preferences via browser settings.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">13. GOOGLE ANALYTICS AND GOOGLE ADVERTISING</h3>
            <p>We use Google Analytics and Google Ads to evaluate traffic and campaign effectiveness. Google processes data independently in accordance with its privacy policies and Google Consent Mode.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">14. PERSONALIZED ADVERTISING AND REMARKETING</h3>
            <p>Remarketing technologies may be used with consent to display relevant advertisements across partner networks. Preferences can be managed through Google Ad Settings.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">15. THIRD-PARTY SERVICE PROVIDERS</h3>
            <p>We work with trusted providers for hosting, email, cloud storage (Google Workspace, Drive, Classroom), video conferencing, and analytics.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">16. SHARING AND DISCLOSURE OF INFORMATION</h3>
            <p>We do not sell personal data. Information is disclosed only as necessary to service providers, educational institutions, employers, examination boards, visa authorities, or legal/regulatory authorities.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">17. INTERNATIONAL, STUDY-ABROAD AND VISA-RELATED DISCLOSURE</h3>
            <p>Documents required for international studies or visas are shared directly with target universities, embassies, and immigration departments as requested by the applicant.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">18. INTERNATIONAL PROCESSING</h3>
            <p>Data may be processed across secure servers in India or other locations by cloud infrastructure providers adhering to cross-border transfer standards.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">19. DATA SECURITY</h3>
            <p>We deploy technical and organizational measures (encryption, access controls) to protect personal data against unauthorized access, loss, or misuse.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">20. DATA RETENTION</h3>
            <p>Personal data is retained for the period necessary to fulfill educational, legal, accounting, or regulatory requirements, after which it is securely deleted or anonymized.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">21. DATA MINIMISATION</h3>
            <p>We strictly limit collection to data essential for the requested course or service.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">22. PERSONAL INFORMATION PROVIDED BY OR CONCERNING OTHER INDIVIDUALS</h3>
            <p>When providing info regarding third parties (parents, emergency contacts), you confirm you have appropriate consent or authority to do so.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">23. CHILDREN AND MINORS</h3>
            <p>Students under 18 require parental/guardian consent prior to data collection or enrollment.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">24. MARKETING COMMUNICATIONS</h3>
            <p>You can opt out of promotional emails anytime via unsubscribe links or emailing us directly.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">25. YOUR PRIVACY RIGHTS</h3>
            <p>Depending on your jurisdiction, rights include access, correction, erasure, withdrawal of consent, restriction of processing, and data portability.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">26. WITHDRAWAL OF CONSENT</h3>
            <p>Consent for data processing may be withdrawn at any time, subject to essential administrative and legal requirements.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">27. DATA BREACHES AND SECURITY INCIDENTS</h3>
            <p>In the event of a security incident, we take immediate investigative and corrective actions and notify affected individuals/authorities as required by law.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">28. THIRD-PARTY WEBSITES</h3>
            <p>External links on our site are subject to their respective privacy policies.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">29. APPLICABLE PRIVACY AND DATA-PROTECTION LAWS</h3>
            <p>We comply with the Digital Personal Data Protection (DPDP) Act 2023, Digital Personal Data Protection Rules 2025, Information Technology Act 2000, GDPR, UK Data Protection legislation, and applicable US state privacy laws.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">30. INDIA – DATA PROTECTION</h3>
            <p>Indian resident data is processed in compliance with the DPDP Act 2023 and DPDP Rules 2025 as phased in by MeitY.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">31. EUROPEAN ECONOMIC AREA, UNITED KINGDOM AND SWITZERLAND</h3>
            <p>EEA/UK/Swiss resident data is processed under GDPR standards including rights of access, rectification, erasure, and legal transfer safeguards.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">32. CALIFORNIA AND OTHER U.S. PRIVACY LAWS</h3>
            <p>Complies with CCPA/CPRA rights regarding access, deletion, and non-sale of personal data.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">33. PRIVACY REQUESTS</h3>
            <p>
              Submit privacy requests to:{" "}
              <strong>fujijapaneseacademy@gmail.com</strong>
              {" "}or call <a href="tel:+916364924110" className="text-fuji-indigo hover:text-fuji-red">+91 63649 24110</a>.
            </p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">34. PRIVACY GRIEVANCES</h3>
            <p>Grievances regarding personal data processing should be addressed to our administrative officer at fujijapaneseacademy@gmail.com.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">35. IDENTITY VERIFICATION FOR PRIVACY REQUESTS</h3>
            <p>Reasonable verification steps may be taken before fulfilling data requests to safeguard personal security.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">36. CHANGES TO THIS PRIVACY POLICY</h3>
            <p>Periodic updates will be posted with a revised "Last Updated" date.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">37. SEVERABILITY</h3>
            <p>Invalidity of any clause under law does not affect remaining provisions.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">38. NO WAIVER OF MANDATORY LEGAL RIGHTS</h3>
            <p>Mandatory legal protections take precedence over policy terms in case of inconsistency.</p>
          </section>
          <section>
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">39. PRIVACY POLICY ONLY</h3>
            <p>
              This document governs privacy only. Course fees, refunds, and academic terms are governed by our separate{" "}
              <Link to="/terms" className="underline text-fuji-indigo hover:text-fuji-red font-medium">Terms & Conditions and Refund Policy</Link>
              .
            </p>
          </section>
          <section className="bg-gray-50 p-6 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-fuji-indigo mb-3">40. CONTACT INFORMATION</h3>
            <p className="font-bold">FUJI JAPANESE ACADEMY PRIVATE LIMITED</p>
            <p>Electronic City, 06, 1st Floor, Vittasandra Cross Hemavathi Block</p>
            <p>Phase-1, Bettadasanapura, Karnataka 560100, India</p>
            <p>
              <strong>Phone:</strong>
              {" "}<a href="tel:+916364924110" className="text-fuji-indigo hover:text-fuji-red">+91 63649 24110</a>
            </p>
            <p>
              <strong>Email:</strong>
              {" "}<a href="mailto:fujijapaneseacademy@gmail.com" className="text-fuji-indigo hover:text-fuji-red">fujijapaneseacademy@gmail.com</a>
            </p>
            <p>
              <strong>Website:</strong>
              {" "}<a href="https://fujijapaneseacademy.com/" className="text-fuji-indigo hover:text-fuji-red" target="_blank" rel="noopener noreferrer">https://fujijapaneseacademy.com/</a>
            </p>
          </section>
          <div className="border-t pt-6 text-center text-xs text-gray-500">
            <p className="font-bold text-fuji-indigo">FUJI JAPANESE ACADEMY PRIVATE LIMITED</p>
            <p>Last Updated: 13 August 2026</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
