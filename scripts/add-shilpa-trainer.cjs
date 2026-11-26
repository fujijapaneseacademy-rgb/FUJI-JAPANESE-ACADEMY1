const fs = require('fs');
const path = require('path');

const repos = [
  path.resolve(__dirname, '../fuji-japanese-institute'),
  path.resolve(__dirname, '../fuji-japanese-in'),
];

const shilpaFacultyEntry = `  {
    id: 'f4',
    name: 'Shilpa S',
    role: 'Japanese Language Trainer',
    bio: 'Dedicated Japanese language trainer specializing in JLPT grammar, communicative sentence patterns, and foundational Japanese proficiency.',
    image: '/images/faculty/shilpa-s.jpg',
    badge: 'JLPT Trainer',
    experience: '7+ Years Exp',
    specialty: 'Beginner Foundations & JLPT Prep'
  },
`;

repos.forEach((repoDir) => {
  const repoName = path.basename(repoDir);
  console.log(`\nUpdating ${repoName}...`);

  // 1. Update constants.tsx
  const constantsPath = path.join(repoDir, 'constants.tsx');
  if (fs.existsSync(constantsPath)) {
    let content = fs.readFileSync(constantsPath, 'utf8');

    if (!content.includes("name: 'Shilpa S'")) {
      // Insert before Vikram
      const vikramTarget = /\{\s*id:\s*['"]f5['"],\s*name:\s*['"]Vikram['"]/;
      if (vikramTarget.test(content)) {
        content = content.replace(vikramTarget, (match) => `${shilpaFacultyEntry}  ${match}`);
        console.log(`  ✔ Added Shilpa S as Japanese Language Trainer in ${repoName}/constants.tsx`);
      } else {
        console.error(`  ❌ Could not find Vikram entry in ${repoName}/constants.tsx`);
      }
      fs.writeFileSync(constantsPath, content, 'utf8');
    } else {
      console.log(`  ℹ Shilpa S already in ${repoName}/constants.tsx`);
    }
  }

  // 2. Enhance image fallback in pages/About.tsx
  const aboutPath = path.join(repoDir, 'pages/About.tsx');
  if (fs.existsSync(aboutPath)) {
    let content = fs.readFileSync(aboutPath, 'utf8');

    const oldImageBlock = `<div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-100 shadow-md group-hover:scale-105 transition-transform duration-500">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>`;

    const newImageBlock = `<div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-100 shadow-md group-hover:scale-105 transition-transform duration-500 bg-slate-100 flex items-center justify-center">
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

    if (content.includes(oldImageBlock)) {
      content = content.replace(oldImageBlock, newImageBlock);
      console.log(`  ✔ Enhanced faculty image fallback in ${repoName}/pages/About.tsx`);
      fs.writeFileSync(aboutPath, content, 'utf8');
    }
  }
});
