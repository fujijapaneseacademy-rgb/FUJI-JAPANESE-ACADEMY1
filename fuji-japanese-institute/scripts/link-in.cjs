const fs = require('fs');
const footerPath = 'c:/Users/CSC/Documents/Fuji japanese/fuji-japanese-institute/components/Footer.tsx';
let content = fs.readFileSync(footerPath, 'utf8');

const target = '<NavLink to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</NavLink>';
const replacement = `<a href="https://fujijapaneseacademy.in" target="_blank" rel="noopener noreferrer" className="text-amber-400 font-bold hover:text-white transition-colors flex items-center gap-1">Fuji Academy India (.in) ↗</a>\n            <NavLink to="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</NavLink>`;

if (!content.includes('fujijapaneseacademy.in')) {
  content = content.replace(target, replacement);
  fs.writeFileSync(footerPath, content, 'utf8');
  console.log('✓ Linked .in domain in .com footer');
}
