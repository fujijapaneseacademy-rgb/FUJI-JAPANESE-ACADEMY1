const fs = require('fs');
const path = require('path');

const formServiceFiles = [
  path.resolve(__dirname, '../fuji-japanese-institute/services/formService.ts'),
  path.resolve(__dirname, '../fuji-japanese-in/services/formService.ts'),
];

formServiceFiles.forEach((file) => {
  if (!fs.existsSync(file)) return;

  let content = fs.readFileSync(file, 'utf8');

  if (content.includes('trackFormSubmission')) {
    console.log(`trackFormSubmission already in ${path.basename(path.dirname(file))}`);
    return;
  }

  // 1. Add import
  const importTarget = "import { sendConfirmationEmail } from './emailService';";
  content = content.replace(
    importTarget,
    `${importTarget}\nimport { trackFormSubmission } from '../src/lib/analytics';`
  );

  // 2. Add tracking call right before return isSuccess (or when lead is submitted)
  const trackSnippet = `
    // 4️⃣ Track Form Submission in GA4, GTM, and Google Ads Conversions
    trackFormSubmission(data.formType, {
      course: effectiveCourse,
      name: data.name,
      email: data.email,
      phone: data.phone,
      company: data.companyName || undefined,
      team_size: data.teamSize || undefined,
      payment_id: data.paymentId || undefined,
    });
`;

  const targetLine = "const isSuccess = leadSaved;";
  content = content.replace(targetLine, `${trackSnippet}\n    ${targetLine}`);

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated formService.ts in ${path.basename(path.dirname(file))}`);
});
