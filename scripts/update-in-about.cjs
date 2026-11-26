const fs = require('fs');
const path = require('path');

const targetFile = path.resolve(__dirname, '../fuji-japanese-in/pages/About.tsx');
let content = fs.readFileSync(targetFile, 'utf8');

const regex = /<div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-100 shadow-md group-hover:scale-105 transition-transform duration-500">[\s\S]*?<img[\s\S]*?src=\{member\.image\}[\s\S]*?\/>[\s\S]*?<\/div>/;

const replacement = `<div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-100 shadow-md group-hover:scale-105 transition-transform duration-500 bg-slate-100 flex items-center justify-center">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget;
                        target.style.display = 'none';
                        if (target.parentElement) {
                          target.parentElement.classList.add('bg-gradient-to-br', 'from-rose-50', 'to-indigo-50');
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-rose-50 to-indigo-50 text-fuji-indigo">
                      <GraduationCap className="w-10 h-10 text-fuji-red mb-1" />
                      <span className="text-[11px] font-bold text-gray-700">{member.name}</span>
                    </div>
                  )}
                </div>`;

if (regex.test(content)) {
  content = content.replace(regex, replacement);
  fs.writeFileSync(targetFile, content, 'utf8');
  console.log('Successfully updated fuji-japanese-in/pages/About.tsx');
} else {
  console.log('Regex did not match in fuji-japanese-in/pages/About.tsx');
}
