export interface ResourceItem {
  id: string;
  title: string;
  japaneseTitle: string;
  category: 'hiragana' | 'katakana' | 'vocabulary' | 'grammar' | 'cheatsheet';
  level: 'Absolute Beginner' | 'JLPT N5' | 'Beginner' | 'All Levels';
  description: string;
  badge: string;
  fileFormat: string;
  fileSize: string;
  totalItems: string;
  tags: string[];
  features: string[];
  contentData: {
    summary: string;
    instructions: string[];
    gridItems?: {
      primary: string;
      secondary: string;
      tertiary?: string;
      note?: string;
    }[];
    tableHeaders?: string[];
    tableRows?: string[][];
    sections?: {
      title: string;
      items: { key: string; value: string; extra?: string }[];
    }[];
  };
}

export const FREE_RESOURCES: ResourceItem[] = [
  {
    id: 'hiragana-complete-chart',
    title: 'Complete Hiragana 46 Characters & Stroke Guide',
    japaneseTitle: 'ひらがな 50音表',
    category: 'hiragana',
    level: 'Absolute Beginner',
    description: 'The foundation of the Japanese language. Complete chart of all 46 basic Hiragana characters with romaji pronunciation, stroke tips, and sound guides.',
    badge: 'Essential #1',
    fileFormat: 'Printable Study Sheet (HTML/PDF)',
    fileSize: 'Instant Download',
    totalItems: '46 Characters + Diacritics',
    tags: ['Hiragana', '50 Sounds', 'Alphabet', 'Reading', 'Beginner'],
    features: [
      'Full 46 Seion (vowels & consonants)',
      'Dakuten & Handakuten (G, Z, D, B, P sounds)',
      'Yoon combinations (Kya, Kyu, Kyo)',
      'Print-ready high resolution layout'
    ],
    contentData: {
      summary: 'Hiragana is used for native Japanese words, verb endings, and grammatical particles. Mastering Hiragana is your first milestone in learning Japanese.',
      instructions: [
        'Practice writing each character with the correct stroke order: left to right, top to bottom.',
        'Say each syllable out loud as you write it.',
        'Review 10 characters per day to memorize the entire set in under 5 days.'
      ],
      gridItems: [
        { primary: 'あ', secondary: 'a', note: 'Like "ah" in father' },
        { primary: 'い', secondary: 'i', note: 'Like "ee" in feet' },
        { primary: 'う', secondary: 'u', note: 'Like "oo" in moon' },
        { primary: 'え', secondary: 'e', note: 'Like "e" in pet' },
        { primary: 'お', secondary: 'o', note: 'Like "o" in so' },

        { primary: 'か', secondary: 'ka', note: 'ka' },
        { primary: 'き', secondary: 'ki', note: 'ki' },
        { primary: 'く', secondary: 'ku', note: 'ku' },
        { primary: 'け', secondary: 'ke', note: 'ke' },
        { primary: 'こ', secondary: 'ko', note: 'ko' },

        { primary: 'さ', secondary: 'sa', note: 'sa' },
        { primary: 'し', secondary: 'shi', note: 'shi (not si)' },
        { primary: 'す', secondary: 'su', note: 'su' },
        { primary: 'せ', secondary: 'se', note: 'se' },
        { primary: 'そ', secondary: 'so', note: 'so' },

        { primary: 'た', secondary: 'ta', note: 'ta' },
        { primary: 'ち', secondary: 'chi', note: 'chi (not ti)' },
        { primary: 'つ', secondary: 'tsu', note: 'tsu (like tsunami)' },
        { primary: 'て', secondary: 'te', note: 'te' },
        { primary: 'と', secondary: 'to', note: 'to' },

        { primary: 'な', secondary: 'na', note: 'na' },
        { primary: 'に', secondary: 'ni', note: 'ni' },
        { primary: 'ぬ', secondary: 'nu', note: 'nu' },
        { primary: 'ね', secondary: 'ne', note: 'ne' },
        { primary: 'の', secondary: 'no', note: 'no' },

        { primary: 'は', secondary: 'ha', note: 'ha' },
        { primary: 'ひ', secondary: 'hi', note: 'hi' },
        { primary: 'ふ', secondary: 'fu', note: 'fu (soft blowing)' },
        { primary: 'へ', secondary: 'he', note: 'he' },
        { primary: 'ほ', secondary: 'ho', note: 'ho' },

        { primary: 'ま', secondary: 'ma', note: 'ma' },
        { primary: 'み', secondary: 'mi', note: 'mi' },
        { primary: 'む', secondary: 'mu', note: 'mu' },
        { primary: 'め', secondary: 'me', note: 'me' },
        { primary: 'も', secondary: 'mo', note: 'mo' },

        { primary: 'や', secondary: 'ya', note: 'ya' },
        { primary: 'ゆ', secondary: 'yu', note: 'yu' },
        { primary: 'よ', secondary: 'yo', note: 'yo' },

        { primary: 'ら', secondary: 'ra', note: 'ra (tap tongue)' },
        { primary: 'り', secondary: 'ri', note: 'ri' },
        { primary: 'る', secondary: 'ru', note: 'ru' },
        { primary: 'れ', secondary: 're', note: 're' },
        { primary: 'ろ', secondary: 'ro', note: 'ro' },

        { primary: 'わ', secondary: 'wa', note: 'wa' },
        { primary: 'を', secondary: 'wo/o', note: 'wo (particle)' },
        { primary: 'ん', secondary: 'n', note: 'n (nasal)' }
      ]
    }
  },
  {
    id: 'katakana-complete-chart',
    title: 'Complete Katakana 46 Characters & Foreign Loanwords Guide',
    japaneseTitle: 'カタカナ 50音表',
    category: 'katakana',
    level: 'Absolute Beginner',
    description: 'Master the sharp, geometric alphabet used for foreign loanwords, technology terms, international menus, and foreign names.',
    badge: 'Essential #2',
    fileFormat: 'Printable Study Sheet (HTML/PDF)',
    fileSize: 'Instant Download',
    totalItems: '46 Characters + Loanwords',
    tags: ['Katakana', 'Loanwords', 'Alphabet', 'Reading', 'Beginner'],
    features: [
      'All 46 core Katakana letters',
      'Common loanwords breakdown (Koohii, Pasokon, Sumaho)',
      'Differences between similar pairs (シ vs ツ, ソ vs ン)',
      'Instant printable worksheet'
    ],
    contentData: {
      summary: 'Katakana is used for foreign names, loan words, country names, onomatopoeia, and emphasis in signs and advertisements.',
      instructions: [
        'Pay special attention to angle of strokes: シ (shi) strokes go bottom-to-top, while ツ (tsu) goes top-to-bottom.',
        'Use straight, angular strokes compared to the curvier Hiragana strokes.'
      ],
      gridItems: [
        { primary: 'ア', secondary: 'a', note: 'a' },
        { primary: 'イ', secondary: 'i', note: 'i' },
        { primary: 'ウ', secondary: 'u', note: 'u' },
        { primary: 'エ', secondary: 'e', note: 'e' },
        { primary: 'オ', secondary: 'o', note: 'o' },

        { primary: 'カ', secondary: 'ka', note: 'ka' },
        { primary: 'キ', secondary: 'ki', note: 'ki' },
        { primary: 'ク', secondary: 'ku', note: 'ku' },
        { primary: 'ケ', secondary: 'ke', note: 'ke' },
        { primary: 'コ', secondary: 'ko', note: 'ko' },

        { primary: 'サ', secondary: 'sa', note: 'sa' },
        { primary: 'シ', secondary: 'shi', note: 'shi' },
        { primary: 'ス', secondary: 'su', note: 'su' },
        { primary: 'セ', secondary: 'se', note: 'se' },
        { primary: 'ソ', secondary: 'so', note: 'so' },

        { primary: 'タ', secondary: 'ta', note: 'ta' },
        { primary: 'チ', secondary: 'chi', note: 'chi' },
        { primary: 'ツ', secondary: 'tsu', note: 'tsu' },
        { primary: 'テ', secondary: 'te', note: 'te' },
        { primary: 'ト', secondary: 'to', note: 'to' },

        { primary: 'ナ', secondary: 'na', note: 'na' },
        { primary: 'ニ', secondary: 'ni', note: 'ni' },
        { primary: 'ヌ', secondary: 'nu', note: 'nu' },
        { primary: 'ネ', secondary: 'ne', note: 'ne' },
        { primary: 'ノ', secondary: 'no', note: 'no' },

        { primary: 'ハ', secondary: 'ha', note: 'ha' },
        { primary: 'ヒ', secondary: 'hi', note: 'hi' },
        { primary: 'フ', secondary: 'fu', note: 'fu' },
        { primary: 'ヘ', secondary: 'he', note: 'he' },
        { primary: 'ホ', secondary: 'ho', note: 'ho' },

        { primary: 'マ', secondary: 'ma', note: 'ma' },
        { primary: 'ミ', secondary: 'mi', note: 'mi' },
        { primary: 'ム', secondary: 'mu', note: 'mu' },
        { primary: 'メ', secondary: 'me', note: 'me' },
        { primary: 'モ', secondary: 'mo', note: 'mo' },

        { primary: 'ヤ', secondary: 'ya', note: 'ya' },
        { primary: 'ユ', secondary: 'yu', note: 'yu' },
        { primary: 'ヨ', secondary: 'yo', note: 'yo' },

        { primary: 'ラ', secondary: 'ra', note: 'ra' },
        { primary: 'リ', secondary: 'ri', note: 'ri' },
        { primary: 'ル', secondary: 'ru', note: 'ru' },
        { primary: 'レ', secondary: 're', note: 're' },
        { primary: 'ロ', secondary: 'ro', note: 'ro' },

        { primary: 'ワ', secondary: 'wa', note: 'wa' },
        { primary: 'ヲ', secondary: 'wo', note: 'wo' },
        { primary: 'ン', secondary: 'n', note: 'n' }
      ]
    }
  },
  {
    id: 'jlpt-n5-essential-vocab',
    title: 'JLPT N5 Top 100 Essential Vocabulary List',
    japaneseTitle: 'JLPT N5 必須単語 100選',
    category: 'vocabulary',
    level: 'JLPT N5',
    description: 'The highest-frequency vocabulary words tested on the JLPT N5 examination, categorized by everyday topics with kanji, hiragana, and English.',
    badge: 'JLPT Exam Prep',
    fileFormat: 'Printable Sheet & Vocabulary Guide',
    fileSize: 'Instant Download',
    totalItems: '100 Curated Words',
    tags: ['JLPT N5', 'Vocabulary', 'Test Prep', 'Kanji', 'Beginner'],
    features: [
      'Grouped into People, Time, Places, Food & Objects',
      'Includes Kanji + Hiragana reading (furigana)',
      'Clear English translations and usage examples',
      'High-yield exam vocabulary guaranteed on tests'
    ],
    contentData: {
      summary: 'The Japanese-Language Proficiency Test (JLPT) N5 requires knowing ~800 words. This cheat sheet focuses on the top most frequently appearing words.',
      instructions: [
        'Review words in flashcard order: read the Japanese first, guess the meaning, then check the translation.',
        'Try creating simple sentences using the verb and noun pairings.'
      ],
      tableHeaders: ['Kanji / Word', 'Hiragana / Romaji', 'Category', 'English Meaning'],
      tableRows: [
        ['私', 'わたし (watashi)', 'Pronoun', 'I, me, myself'],
        ['先生', 'せんせい (sensei)', 'People', 'Teacher, instructor, doctor'],
        ['学生', 'がくせい (gakusei)', 'People', 'Student'],
        ['友達', 'ともだち (tomodachi)', 'People', 'Friend'],
        ['今日', 'きょう (kyou)', 'Time', 'Today'],
        ['明日', 'あした (ashita)', 'Time', 'Tomorrow'],
        ['昨日', 'きのう (kinou)', 'Time', 'Yesterday'],
        ['今', 'いま (ima)', 'Time', 'Now'],
        ['時間', 'じかん (jikan)', 'Time', 'Time, hours'],
        ['毎日', 'まいにち (mainichi)', 'Time', 'Every day'],
        ['学校', 'がっこう (gakkou)', 'Places', 'School'],
        ['会社', 'かいしゃ (kaisha)', 'Places', 'Company, workplace'],
        ['駅', 'えき (eki)', 'Places', 'Train station'],
        ['家', 'いえ / うち (ie / uchi)', 'Places', 'House, home'],
        ['本', 'ほん (hon)', 'Objects', 'Book'],
        ['水', 'みず (mizu)', 'Food & Drink', 'Water (cold)'],
        ['お茶', 'おちゃ (ocha)', 'Food & Drink', 'Green tea'],
        ['ご飯', 'ごはん (gohan)', 'Food & Drink', 'Cooked rice, meal'],
        ['車', 'くるま (kuruma)', 'Transport', 'Car, automobile'],
        ['電話', 'でんわ (denwa)', 'Objects', 'Telephone, phone call']
      ]
    }
  },
  {
    id: 'top-50-verbs-conjugation',
    title: 'Top 50 Japanese Verbs & Polite (-Masu) Conjugation',
    japaneseTitle: '基本動詞50選と活用',
    category: 'grammar',
    level: 'Beginner',
    description: 'Master the most practical Japanese verbs with their dictionary forms, polite -masu forms, past forms, and negative forms.',
    badge: 'Grammar Booster',
    fileFormat: 'Conjugation Matrix Sheet',
    fileSize: 'Instant Download',
    totalItems: '50 Verbs x 4 Conjugations',
    tags: ['Verbs', 'Grammar', 'Masu Form', 'Conjugation', 'N5'],
    features: [
      'Group 1 (Godan), Group 2 (Ichidan), and Irregular verbs',
      'Dictionary form -> Polite (-masu)',
      'Polite Negative (-masen) & Past (-mashita)',
      'Practical everyday action verbs'
    ],
    contentData: {
      summary: 'Japanese verbs fall into 3 groups: Group 1 (Godan/u-verbs), Group 2 (Ichidan/ru-verbs), and Group 3 (Irregular: suru & kuru).',
      instructions: [
        'Group 1: Replace the "u" sound with "i" + masu (e.g. iku -> ikimasu).',
        'Group 2: Drop the "ru" and add masu (e.g. taberu -> tabemasu).',
        'Group 3: Suru becomes shimasu; Kuru becomes kimasu.'
      ],
      tableHeaders: ['Verb (Kanji)', 'Dictionary Form', 'Group', 'Polite Form (-masu)', 'English Meaning'],
      tableRows: [
        ['行く', 'いく (iku)', 'Group 1', 'いきます (ikimasu)', 'To go'],
        ['来る', 'くる (kuru)', 'Group 3 (Irreg)', 'きます (kimasu)', 'To come'],
        ['食べる', 'たべる (taberu)', 'Group 2', 'たべます (tabemasu)', 'To eat'],
        ['飲む', 'のむ (nomu)', 'Group 1', 'のみます (nomimasu)', 'To drink'],
        ['見る', 'みる (miru)', 'Group 2', 'みます (mimasu)', 'To look, to watch, to see'],
        ['聞く', 'きく (kiku)', 'Group 1', 'ききます (kikimasu)', 'To hear, to listen, to ask'],
        ['話す', 'はなす (hanasu)', 'Group 1', 'はなします (hanashimasu)', 'To speak, to talk'],
        ['読む', 'よむ (yomu)', 'Group 1', 'よみます (yomimasu)', 'To read'],
        ['書く', 'かく (kaku)', 'Group 1', 'かきます (kakimasu)', 'To write'],
        ['買う', 'かう (kau)', 'Group 1', 'かいます (kaimasu)', 'To buy'],
        ['する', 'する (suru)', 'Group 3 (Irreg)', 'します (shimasu)', 'To do'],
        ['会う', 'あう (au)', 'Group 1', 'あいます (aimasu)', 'To meet'],
        ['待つ', 'まつ (matsu)', 'Group 1', 'まちます (machimasu)', 'To wait'],
        ['分かる', 'わかる (wakaru)', 'Group 1', 'わかります (wakarimasu)', 'To understand'],
        ['教える', 'おしえる (oshieru)', 'Group 2', 'おしえます (oshiemasu)', 'To teach, to inform']
      ]
    }
  },
  {
    id: 'survival-japanese-phrases',
    title: 'Survival Japanese: 40 Essential Travel & Daily Phrases',
    japaneseTitle: '旅行・日常 サバイバル日本語',
    category: 'cheatsheet',
    level: 'All Levels',
    description: 'Quick-reference conversational phrases for asking directions, dining at restaurants, convenience stores, and emergency situations in Japan.',
    badge: 'Traveler Favorite',
    fileFormat: 'Quick-Pocket Reference Sheet',
    fileSize: 'Instant Download',
    totalItems: '40 Phrases',
    tags: ['Travel', 'Survival', 'Phrases', 'Conversation', 'Polite'],
    features: [
      'Greetings & Politeness basics',
      'Ordering food & paying bills in restaurants',
      'Subway navigation & asking directions',
      'Emergency & medical assistance expressions'
    ],
    contentData: {
      summary: 'These phrases are polite and immediately usable anywhere in Japan, from Tokyo to Kyoto, even if you do not know any Kanji yet.',
      instructions: [
        'Add "kudasai" (please) or "onegaishimasu" to make any request courteous.',
        'Use "Sumimasen" as both "Excuse me" and "I am sorry" to bridge 90% of conversations.'
      ],
      sections: [
        {
          title: 'Everyday Politeness & Greetings',
          items: [
            { key: 'こんにちは (Konnichiwa)', value: 'Hello / Good afternoon', extra: 'Standard daytime greeting' },
            { key: 'おはようございます (Ohayou gozaimasu)', value: 'Good morning', extra: 'Polite morning greeting' },
            { key: 'こんばんは (Konbanwa)', value: 'Good evening', extra: 'Polite evening greeting' },
            { key: 'ありがとうございます (Arigatou gozaimasu)', value: 'Thank you very much', extra: 'Formal gratitude' },
            { key: 'すみません (Sumimasen)', value: 'Excuse me / Sorry', extra: 'Use to call a waiter or apologize' },
            { key: 'ごめんなさい (Gomennasai)', value: "I'm sorry", extra: 'Personal apology' }
          ]
        },
        {
          title: 'Dining & Ordering Food',
          items: [
            { key: 'これをおねがいします (Kore o onegaishimasu)', value: 'This one please', extra: 'Point to menu item' },
            { key: 'おかいけいをおねがいします (Okaikei o onegaishimasu)', value: 'Bill / Check please', extra: 'When finishing meal' },
            { key: 'みずをおねがいします (Mizu o onegaishimasu)', value: 'Water please', extra: 'Free tap water in restaurants' },
            { key: 'おいしいです (Oishii desu)', value: 'It is delicious!', extra: 'Compliment the chef' }
          ]
        },
        {
          title: 'Directions & Finding Places',
          items: [
            { key: 'トイレはどこですか (Toire wa doko desu ka?)', value: 'Where is the restroom?', extra: 'Crucial travel question' },
            { key: 'えきはどこですか (Eki wa doko desu ka?)', value: 'Where is the station?', extra: 'Train/subway directions' },
            { key: 'えいごがはなせますか (Eigo ga hanasemasu ka?)', value: 'Can you speak English?', extra: 'Polite inquiry' }
          ]
        }
      ]
    }
  },
  {
    id: 'japanese-numbers-counters',
    title: 'Japanese Numbers, Counters & Time Reference Chart',
    japaneseTitle: '数字・数え方・時間の表',
    category: 'cheatsheet',
    level: 'Beginner',
    description: 'Complete guide to counting from 1 to 10,000, Japanese currency (Yen), days of the week, months, and essential object counter suffixes.',
    badge: 'Practical Quick Sheet',
    fileFormat: 'Reference Matrix Sheet',
    fileSize: 'Instant Download',
    totalItems: 'Numbers 1-10,000 + 8 Counters',
    tags: ['Numbers', 'Counters', 'Yen', 'Time', 'Days'],
    features: [
      'Basic numbers 1 through 10,000 (Man)',
      'Days of the week (Getsu, Ka, Sui, Moku, Kin, Do, Nichi)',
      'Essential counters: つ (general), 人 (people), 本 (long objects), 枚 (flat objects)',
      'Telling time: Hours (ji) & Minutes (fun/pun)'
    ],
    contentData: {
      summary: 'Japanese uses specific counter suffixes depending on what you are counting: bottles use "hon", sheets of paper use "mai", and people use "nin".',
      instructions: [
        'Watch out for irregular numbers: 4 (yon/shi), 7 (nana/shichi), 9 (kyuu/ku).',
        'For general things (ordering 1, 2, 3 items), use the native Japanese counter (Hitotsu, Futatsu, Mittsu).'
      ],
      tableHeaders: ['Number', 'Kanji', 'Hiragana', 'Romaji', 'Note / Irregular'],
      tableRows: [
        ['1', '一', 'いち', 'ichi', 'Base 1'],
        ['2', '二', 'に', 'ni', 'Base 2'],
        ['3', '三', 'さん', 'san', 'Base 3'],
        ['4', '四', 'よん / し', 'yon / shi', 'Yon is preferred in speech'],
        ['5', '五', 'ご', 'go', 'Base 5'],
        ['6', '六', 'ろく', 'roku', 'Base 6'],
        ['7', '七', 'なな / しち', 'nana / shichi', 'Nana is preferred'],
        ['8', '八', 'はち', 'hachi', 'Base 8'],
        ['9', '九', 'きゅう / く', 'kyuu / ku', 'Kyuu or ku'],
        ['10', '十', 'じゅう', 'juu', 'Base 10'],
        ['100', '百', 'ひゃく', 'hyaku', 'Hundred'],
        ['1,000', '千', 'せん', 'sen', 'Thousand'],
        ['10,000', '一万', 'いちまん', 'ichiman', 'Ten thousand unit in Japan']
      ]
    }
  }
];

export function generatePrintableResourceHtml(resource: ResourceItem): string {
  const { title, japaneseTitle, category, level, description, contentData } = resource;

  let contentBody = '';

  if (contentData.gridItems && contentData.gridItems.length > 0) {
    contentBody += `
      <div class="section-title">Character Matrix (${contentData.gridItems.length} Letters)</div>
      <div class="grid-container">
        ${contentData.gridItems.map(item => `
          <div class="grid-card">
            <div class="primary-char">${item.primary}</div>
            <div class="romaji-label">${item.secondary}</div>
            ${item.note ? `<div class="note-label">${item.note}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `;
  }

  if (contentData.tableHeaders && contentData.tableRows) {
    contentBody += `
      <div class="section-title">Reference Matrix</div>
      <table class="data-table">
        <thead>
          <tr>
            ${contentData.tableHeaders.map(h => `<th>${h}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${contentData.tableRows.map(row => `
            <tr>
              ${row.map((cell, idx) => `<td class="${idx === 0 ? 'highlight-cell' : ''}">${cell}</td>`).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    `;
  }

  if (contentData.sections && contentData.sections.length > 0) {
    contentBody += contentData.sections.map(sec => `
      <div class="section-title">${sec.title}</div>
      <div class="phrases-container">
        ${sec.items.map(p => `
          <div class="phrase-row">
            <div class="phrase-jp">${p.key}</div>
            <div class="phrase-en">${p.value}</div>
            ${p.extra ? `<div class="phrase-tag">${p.extra}</div>` : ''}
          </div>
        `).join('')}
      </div>
    `).join('');
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${title} - Fuji Japanese Academy</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700;900&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');
    
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      color: #1e293b;
      background: #f8fafc;
      padding: 32px 24px;
      line-height: 1.5;
    }
    .print-page {
      max-width: 900px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #e2e8f0;
      border-radius: 20px;
      padding: 40px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05);
    }
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 24px;
      margin-bottom: 28px;
    }
    .brand-logo {
      font-size: 20px;
      font-weight: 800;
      color: #0f172a;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .brand-tag {
      color: #dc2626;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      font-weight: 700;
      background: #fef2f2;
      padding: 4px 10px;
      border-radius: 9999px;
      border: 1px solid #fee2e2;
    }
    .main-title {
      font-size: 26px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 6px;
    }
    .jp-subtitle {
      font-family: 'Noto Sans JP', sans-serif;
      font-size: 18px;
      font-weight: 700;
      color: #dc2626;
      margin-bottom: 12px;
    }
    .desc {
      color: #64748b;
      font-size: 14px;
      margin-bottom: 24px;
      line-height: 1.6;
    }
    .tips-box {
      background: #f0fdf4;
      border-left: 4px solid #16a34a;
      padding: 16px;
      border-radius: 8px;
      margin-bottom: 28px;
      font-size: 13px;
      color: #166534;
    }
    .tips-box ul {
      margin-left: 20px;
      margin-top: 6px;
    }
    .section-title {
      font-size: 15px;
      font-weight: 700;
      color: #1e293b;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin: 24px 0 12px;
      padding-bottom: 6px;
      border-bottom: 1px solid #e2e8f0;
    }
    .grid-container {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 10px;
      margin-bottom: 24px;
    }
    .grid-card {
      border: 1px solid #e2e8f0;
      border-radius: 12px;
      padding: 12px 6px;
      text-align: center;
      background: #ffffff;
    }
    .primary-char {
      font-family: 'Noto Sans JP', sans-serif;
      font-size: 28px;
      font-weight: 900;
      color: #0f172a;
      line-height: 1.1;
    }
    .romaji-label {
      font-size: 12px;
      font-weight: 700;
      color: #dc2626;
      margin-top: 2px;
    }
    .note-label {
      font-size: 9px;
      color: #64748b;
      margin-top: 2px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .data-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 24px;
      font-size: 13px;
    }
    .data-table th {
      background: #f8fafc;
      padding: 10px 12px;
      text-align: left;
      font-weight: 700;
      color: #475569;
      border-bottom: 2px solid #e2e8f0;
    }
    .data-table td {
      padding: 10px 12px;
      border-bottom: 1px solid #f1f5f9;
      color: #334155;
    }
    .highlight-cell {
      font-family: 'Noto Sans JP', sans-serif;
      font-weight: 700;
      font-size: 15px;
      color: #0f172a;
    }
    .phrases-container {
      display: flex;
      flex-direction: column;
      gap: 8px;
      margin-bottom: 20px;
    }
    .phrase-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
      gap: 12px;
    }
    .phrase-jp {
      font-family: 'Noto Sans JP', sans-serif;
      font-weight: 700;
      font-size: 15px;
      color: #0f172a;
      flex: 1;
    }
    .phrase-en {
      font-size: 13px;
      color: #475569;
      flex: 1;
    }
    .phrase-tag {
      font-size: 11px;
      background: #e0f2fe;
      color: #0369a1;
      padding: 2px 8px;
      border-radius: 6px;
      white-space: nowrap;
    }
    .footer-note {
      margin-top: 40px;
      padding-top: 20px;
      border-top: 1px dashed #cbd5e1;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 11px;
      color: #94a3b8;
    }
    @media print {
      body { background: #fff; padding: 0; }
      .print-page { border: none; box-shadow: none; padding: 10px; max-width: 100%; }
      .no-print { display: none !important; }
    }
  </style>
</head>
<body>
  <div class="print-page">
    <div class="header">
      <div class="brand-logo">
        <span>🗻 Fuji Japanese Academy</span>
      </div>
      <div>
        <span class="brand-tag">${category.toUpperCase()} • ${level}</span>
      </div>
    </div>

    <div class="main-title">${title}</div>
    <div class="jp-subtitle">${japaneseTitle}</div>
    <div class="desc">${description}</div>

    <div class="tips-box">
      <strong>Study Sensei Tips:</strong>
      <ul>
        ${contentData.instructions.map(inst => `<li>${inst}</li>`).join('')}
      </ul>
    </div>

    ${contentBody}

    <div class="footer-note">
      <div>Official Fuji Japanese Academy Study Sheet • Bengaluru, Karnataka</div>
      <div>Contact: +91 6364924110 • fujijapaneseacademy.com</div>
    </div>
  </div>
</body>
</html>`;
}

export function triggerDirectDownload(resource: ResourceItem) {
  const htmlContent = generatePrintableResourceHtml(resource);
  const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  const cleanName = resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  link.download = `fuji-japanese-${cleanName}-worksheet.html`;
  
  document.body.appendChild(link);
  link.click();
  
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 100);
}
