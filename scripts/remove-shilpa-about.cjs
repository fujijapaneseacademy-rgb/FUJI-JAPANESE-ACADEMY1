const fs = require('fs');
const path = require('path');

const repos = [
  path.resolve(__dirname, '../fuji-japanese-institute'),
  path.resolve(__dirname, '../fuji-japanese-in'),
];

repos.forEach((repoDir) => {
  const repoName = path.basename(repoDir);
  console.log(`\nProcessing ${repoName}...`);

  // 1. Update components/LeadershipTeam.tsx
  const leadershipPath = path.join(repoDir, 'components/LeadershipTeam.tsx');
  if (fs.existsSync(leadershipPath)) {
    let content = fs.readFileSync(leadershipPath, 'utf8');

    // Remove S Shilpa object from LEADERSHIP_PROFILES
    const shilpaProfileRegex = /,\s*\{\s*name:\s*['"]S Shilpa['"][\s\S]*?accentBorder:\s*['"][^'"]*['"]\s*\}/;
    if (shilpaProfileRegex.test(content)) {
      content = content.replace(shilpaProfileRegex, '');
      console.log(`  ✔ Removed S Shilpa from ${repoName}/components/LeadershipTeam.tsx`);
    } else {
      console.log(`  ℹ S Shilpa profile not matched by regex in LeadershipTeam.tsx, checking manual pattern...`);
    }

    // Update grid container to center single leader
    const oldGrid = '<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">';
    const newGrid = '<div className={`grid grid-cols-1 ${LEADERSHIP_PROFILES.length > 1 ? \'lg:grid-cols-2 max-w-6xl\' : \'max-w-3xl\'} gap-8 lg:gap-10 mx-auto`}>';
    if (content.includes(oldGrid)) {
      content = content.replace(oldGrid, newGrid);
      console.log(`  ✔ Updated grid layout in ${repoName}/components/LeadershipTeam.tsx`);
    }

    fs.writeFileSync(leadershipPath, content, 'utf8');
  }

  // 2. Update constants.tsx
  const constantsPath = path.join(repoDir, 'constants.tsx');
  if (fs.existsSync(constantsPath)) {
    let content = fs.readFileSync(constantsPath, 'utf8');

    // Remove Shilpa S faculty item
    const shilpaFacultyRegex = /,\s*\{\s*id:\s*['"]f4['"],\s*name:\s*['"]Shilpa S['"][\s\S]*?specialty:\s*['"][^'"]*['"]\s*\}/;
    const shilpaFacultyRegexNoComma = /\{\s*id:\s*['"]f4['"],\s*name:\s*['"]Shilpa S['"][\s\S]*?specialty:\s*['"][^'"]*['"]\s*\},?\s*/;
    
    if (shilpaFacultyRegex.test(content)) {
      content = content.replace(shilpaFacultyRegex, '');
      console.log(`  ✔ Removed Shilpa S from ${repoName}/constants.tsx FACULTY`);
    } else if (shilpaFacultyRegexNoComma.test(content)) {
      content = content.replace(shilpaFacultyRegexNoComma, '');
      console.log(`  ✔ Removed Shilpa S from ${repoName}/constants.tsx FACULTY (no leading comma)`);
    }

    fs.writeFileSync(constantsPath, content, 'utf8');
  }

  // 3. Update pages/About.tsx (schema founder)
  const aboutPath = path.join(repoDir, 'pages/About.tsx');
  if (fs.existsSync(aboutPath)) {
    let content = fs.readFileSync(aboutPath, 'utf8');

    // Remove S Shilpa from founder schema
    const shilpaSchemaRegex = /,\s*\{\s*"@type":\s*"Person",\s*"name":\s*"S Shilpa",\s*"jobTitle":\s*"Co-Founder & Executive Director"\s*\}/;
    if (shilpaSchemaRegex.test(content)) {
      content = content.replace(shilpaSchemaRegex, '');
      console.log(`  ✔ Removed S Shilpa from ${repoName}/pages/About.tsx founder schema`);
    }

    fs.writeFileSync(aboutPath, content, 'utf8');
  }
});
