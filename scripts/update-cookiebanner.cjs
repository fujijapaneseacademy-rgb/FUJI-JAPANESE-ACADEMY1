const fs = require('fs');
const path = require('path');

const cookieFiles = [
  path.resolve(__dirname, '../fuji-japanese-institute/components/CookieBanner.tsx'),
  path.resolve(__dirname, '../fuji-japanese-in/components/CookieBanner.tsx'),
];

cookieFiles.forEach((file) => {
  if (!fs.existsSync(file)) return;

  let content = fs.readFileSync(file, 'utf8');

  if (content.includes('updateGoogleConsent')) {
    console.log(`updateGoogleConsent already present in ${path.basename(path.dirname(file))}`);
    return;
  }

  // 1. Add import
  const importTarget = "import { ShieldCheck, Cookie, X, Settings2 } from 'lucide-react';";
  content = content.replace(
    importTarget,
    `${importTarget}\nimport { updateGoogleConsent } from '../src/lib/analytics';`
  );

  // 2. Call updateGoogleConsent in saveConsent
  const targetSave = "localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({ ...prefs, timestamp: Date.now() }));\n    } catch {}";
  const targetSaveCRLF = "localStorage.setItem(COOKIE_STORAGE_KEY, JSON.stringify({ ...prefs, timestamp: Date.now() }));\r\n    } catch {}";

  const addition = "\n      updateGoogleConsent(Boolean(prefs.functional || prefs.marketing));";
  const additionCRLF = "\r\n      updateGoogleConsent(Boolean(prefs.functional || prefs.marketing));";

  if (content.includes(targetSaveCRLF)) {
    content = content.replace(targetSaveCRLF, targetSaveCRLF + additionCRLF);
  } else if (content.includes(targetSave)) {
    content = content.replace(targetSave, targetSave + addition);
  }

  fs.writeFileSync(file, content, 'utf8');
  console.log(`Updated CookieBanner.tsx in ${path.basename(path.dirname(file))}`);
});
