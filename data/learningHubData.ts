export interface KanaCharacter {
  kana: string;
  romaji: string;
  type: 'hiragana' | 'katakana';
  category: 'vowel' | 'k' | 's' | 't' | 'n' | 'h' | 'm' | 'y' | 'r' | 'w' | 'n_single';
}

export interface VocabWord {
  japanese: string;
  kana: string;
  romaji: string;
  english: string;
  category: string;
  exampleSentence?: string;
  exampleEnglish?: string;
}

export interface GrammarPoint {
  pattern: string;
  meaning: string;
  explanation: string;
  formation: string;
  examples: {
    japanese: string;
    romaji: string;
    english: string;
  }[];
}

export interface KanjiItem {
  kanji: string;
  onyomi: string;
  kunyomi: string;
  meaning: string;
  strokes: number;
  examples: {
    word: string;
    reading: string;
    meaning: string;
  }[];
}

// 46 Standard Hiragana Characters
export const HIRAGANA_DATA = [
  { kana: 'あ', romaji: 'a' }, { kana: 'い', romaji: 'i' }, { kana: 'う', romaji: 'u' }, { kana: 'え', romaji: 'e' }, { kana: 'お', romaji: 'o' },
  { kana: 'か', romaji: 'ka' }, { kana: 'き', romaji: 'ki' }, { kana: 'く', romaji: 'ku' }, { kana: 'け', romaji: 'ke' }, { kana: 'こ', romaji: 'ko' },
  { kana: 'さ', romaji: 'sa' }, { kana: 'し', romaji: 'shi' }, { kana: 'す', romaji: 'su' }, { kana: 'せ', romaji: 'se' }, { kana: 'そ', romaji: 'so' },
  { kana: 'た', romaji: 'ta' }, { kana: 'ち', romaji: 'chi' }, { kana: 'つ', romaji: 'tsu' }, { kana: 'て', romaji: 'te' }, { kana: 'と', romaji: 'to' },
  { kana: 'な', romaji: 'na' }, { kana: 'に', romaji: 'ni' }, { kana: 'ぬ', romaji: 'nu' }, { kana: 'ね', romaji: 'ne' }, { kana: 'の', romaji: 'no' },
  { kana: 'は', romaji: 'ha' }, { kana: 'ひ', romaji: 'hi' }, { kana: 'ふ', romaji: 'fu' }, { kana: 'へ', romaji: 'he' }, { kana: 'ほ', romaji: 'ho' },
  { kana: 'ま', romaji: 'ma' }, { kana: 'み', romaji: 'mi' }, { kana: 'む', romaji: 'mu' }, { kana: 'め', romaji: 'me' }, { kana: 'も', romaji: 'mo' },
  { kana: 'や', romaji: 'ya' }, { kana: 'ゆ', romaji: 'yu' }, { kana: 'よ', romaji: 'yo' },
  { kana: 'ら', romaji: 'ra' }, { kana: 'り', romaji: 'ri' }, { kana: 'る', romaji: 'ru' }, { kana: 'れ', romaji: 're' }, { kana: 'ろ', romaji: 'ro' },
  { kana: 'わ', romaji: 'wa' }, { kana: 'を', romaji: 'wo' }, { kana: 'ん', romaji: 'n' }
];

// 46 Standard Katakana Characters
export const KATAKANA_DATA = [
  { kana: 'ア', romaji: 'a' }, { kana: 'イ', romaji: 'i' }, { kana: 'ウ', romaji: 'u' }, { kana: 'エ', romaji: 'e' }, { kana: 'オ', romaji: 'o' },
  { kana: 'カ', romaji: 'ka' }, { kana: 'キ', romaji: 'ki' }, { kana: 'ク', romaji: 'ku' }, { kana: 'ケ', romaji: 'ke' }, { kana: 'コ', romaji: 'ko' },
  { kana: 'サ', romaji: 'sa' }, { kana: 'シ', romaji: 'shi' }, { kana: 'ス', romaji: 'su' }, { kana: 'セ', romaji: 'se' }, { kana: 'ソ', romaji: 'so' },
  { kana: 'タ', romaji: 'ta' }, { kana: 'チ', romaji: 'chi' }, { kana: 'ツ', romaji: 'tsu' }, { kana: 'テ', romaji: 'te' }, { kana: 'ト', romaji: 'to' },
  { kana: 'ナ', romaji: 'na' }, { kana: 'ニ', romaji: 'ni' }, { kana: 'ヌ', romaji: 'nu' }, { kana: 'ネ', romaji: 'ne' }, { kana: 'ノ', romaji: 'no' },
  { kana: 'ハ', romaji: 'ha' }, { kana: 'ヒ', romaji: 'hi' }, { kana: 'フ', romaji: 'fu' }, { kana: 'ヘ', romaji: 'he' }, { kana: 'ホ', romaji: 'ho' },
  { kana: 'マ', romaji: 'ma' }, { kana: 'ミ', romaji: 'mi' }, { kana: 'ム', romaji: 'mu' }, { kana: 'メ', romaji: 'me' }, { kana: 'モ', romaji: 'mo' },
  { kana: 'ヤ', romaji: 'ya' }, { kana: 'ユ', romaji: 'yu' }, { kana: 'ヨ', romaji: 'yo' },
  { kana: 'ラ', romaji: 'ra' }, { kana: 'リ', romaji: 'ri' }, { kana: 'ル', romaji: 'ru' }, { kana: 'レ', romaji: 're' }, { kana: 'ロ', romaji: 'ro' },
  { kana: 'ワ', romaji: 'wa' }, { kana: 'ヲ', romaji: 'wo' }, { kana: 'ン', romaji: 'n' }
];

export const VOCABULARY_LIST: VocabWord[] = [
  // Greetings
  { japanese: 'おはようございます', kana: 'おはようございます', romaji: 'ohayou gozaimasu', english: 'Good morning (polite)', category: 'Greetings', exampleSentence: '田中先生、おはようございます。', exampleEnglish: 'Good morning, Teacher Tanaka.' },
  { japanese: 'こんにちは', kana: 'こんにちは', romaji: 'konnichiwa', english: 'Good afternoon / Hello', category: 'Greetings', exampleSentence: '皆さん、こんにちは！', exampleEnglish: 'Hello, everyone!' },
  { japanese: 'こんばんは', kana: 'こんばんは', romaji: 'konbanwa', english: 'Good evening', category: 'Greetings', exampleSentence: 'こんばんは、お元気ですか？', exampleEnglish: 'Good evening, how are you?' },
  { japanese: 'ありがとうございます', kana: 'ありがとうございます', romaji: 'arigatou gozaimasu', english: 'Thank you very much (polite)', category: 'Greetings', exampleSentence: '手伝ってくれてありがとうございます。', exampleEnglish: 'Thank you very much for helping.' },
  { japanese: 'すみません', kana: 'すみません', romaji: 'sumimasen', english: 'Excuse me / Sorry', category: 'Greetings', exampleSentence: 'すみません、駅はどこですか？', exampleEnglish: 'Excuse me, where is the station?' },
  { japanese: 'はじめまして', kana: 'はじめまして', romaji: 'hajimemashite', english: 'Nice to meet you (first time)', category: 'Greetings', exampleSentence: 'はじめまして、ラフルです。', exampleEnglish: 'Nice to meet you, I am Rahul.' },

  // Numbers & Counting
  { japanese: '一', kana: 'いち', romaji: 'ichi', english: 'One (1)', category: 'Numbers' },
  { japanese: '二', kana: 'に', romaji: 'ni', english: 'Two (2)', category: 'Numbers' },
  { japanese: '三', kana: 'さん', romaji: 'san', english: 'Three (3)', category: 'Numbers' },
  { japanese: '四', kana: 'よん / し', romaji: 'yon / shi', english: 'Four (4)', category: 'Numbers' },
  { japanese: '五', kana: 'ご', romaji: 'go', english: 'Five (5)', category: 'Numbers' },
  { japanese: '百', kana: 'ひゃく', romaji: 'hyaku', english: 'Hundred (100)', category: 'Numbers' },
  { japanese: '千', kana: 'せん', romaji: 'sen', english: 'Thousand (1,000)', category: 'Numbers' },
  { japanese: '万', kana: 'まん', romaji: 'man', english: 'Ten Thousand (10,000)', category: 'Numbers' },

  // Daily Essentials
  { japanese: '水', kana: 'みず', romaji: 'mizu', english: 'Water', category: 'Daily Life', exampleSentence: 'お水をください。', exampleEnglish: 'Water, please.' },
  { japanese: '本', kana: 'ほん', romaji: 'hon', english: 'Book', category: 'Daily Life', exampleSentence: '日本語の本を読みます。', exampleEnglish: 'I read a Japanese book.' },
  { japanese: '車', kana: 'くるま', romaji: 'kuruma', english: 'Car', category: 'Daily Life' },
  { japanese: '電車', kana: 'でんしゃ', romaji: 'densha', english: 'Train', category: 'Daily Life', exampleSentence: '電車で会社へ行きます。', exampleEnglish: 'I go to the company by train.' },
  { japanese: '駅', kana: 'えき', romaji: 'eki', english: 'Train Station', category: 'Daily Life' },
  { japanese: '学校', kana: 'がっこう', romaji: 'gakkou', english: 'School', category: 'Daily Life' },
  { japanese: '会社', kana: 'かいしゃ', romaji: 'kaisha', english: 'Company / Workplace', category: 'Daily Life' },

  // Technology & Work
  { japanese: '開発', kana: 'かいはつ', romaji: 'kaihatsu', english: 'Software Development', category: 'Tech & Career' },
  { japanese: '設計', kana: 'せっけい', romaji: 'sekkei', english: 'Design / Architecture', category: 'Tech & Career' },
  { japanese: '確認', kana: 'かくにん', romaji: 'kakunin', english: 'Confirmation / Check', category: 'Tech & Career', exampleSentence: '仕様書を確認してください。', exampleEnglish: 'Please verify the specification document.' },
  { japanese: '会議', kana: 'かいぎ', romaji: 'kaigi', english: 'Meeting / Conference', category: 'Tech & Career' }
];

export const GRAMMAR_POINTS: GrammarPoint[] = [
  {
    pattern: 'Noun + は (wa) + Predicate',
    meaning: 'Topic Marker: Speaking of [Noun], ...',
    explanation: 'The particle は (written "ha", pronounced "wa") marks the overarching theme or topic of the sentence. It introduces what the speaker wants to talk about.',
    formation: '[Topic] は [Information] です。',
    examples: [
      { japanese: 'わたしはエンジニアです。', romaji: 'Watashi wa enjinia desu.', english: 'I am a software engineer.' },
      { japanese: 'これは日本の本です。', romaji: 'Kore wa Nihon no hon desu.', english: 'This is a Japanese book.' }
    ]
  },
  {
    pattern: 'Noun + を (o) + Transitive Verb',
    meaning: 'Direct Object Marker',
    explanation: 'The particle を (written "wo", pronounced "o") indicates the direct object receiving the action of a transitive verb.',
    formation: '[Object] を [Verb] ます。',
    examples: [
      { japanese: '日本語をべんきょうします。', romaji: 'Nihongo o benkyou shimasu.', english: 'I study Japanese.' },
      { japanese: 'コーヒーをのみます。', romaji: 'Koohii o nomimasu.', english: 'I drink coffee.' }
    ]
  },
  {
    pattern: 'Place + で (de) + Action Verb',
    meaning: 'Location of Action / By means of',
    explanation: 'Marks the specific physical location where an active event takes place, or the tool/transportation used to perform the action.',
    formation: '[Location] で [Action Verb] ます。',
    examples: [
      { japanese: '図書館で勉強します。', romaji: 'Toshokan de benkyou shimasu.', english: 'I study at the library.' },
      { japanese: '電車で東京へ行きます。', romaji: 'Densha de Toukyou e ikimasu.', english: 'I go to Tokyo by train.' }
    ]
  },
  {
    pattern: 'Time/Location + に (ni) + Movement Verb',
    meaning: 'Target Destination, Point in Time, or Location of Existence',
    explanation: 'The multipurpose particle に marks specific clock times, days of the week, arrival destinations, and passive existence with あります/います.',
    formation: '[Time/Place] に [Verb] ます。',
    examples: [
      { japanese: '7時に起きます。', romaji: 'Shichiji ni okimasu.', english: 'I wake up at 7 o\'clock.' },
      { japanese: '日本に行きます。', romaji: 'Nihon ni ikimasu.', english: 'I am going to Japan.' }
    ]
  }
];

export const KANJI_LIST: KanjiItem[] = [
  {
    kanji: '日',
    onyomi: 'ニチ, ジツ (nichi, jitsu)',
    kunyomi: 'ひ, -び, -か (hi, bi, ka)',
    meaning: 'Day, Sun, Japan',
    strokes: 4,
    examples: [
      { word: '日本', reading: 'にほん (Nihon)', meaning: 'Japan' },
      { word: '日曜日', reading: 'にちようび (Nichiyoubi)', meaning: 'Sunday' },
      { word: '毎日', reading: 'まいにち (Mainichi)', meaning: 'Every day' }
    ]
  },
  {
    kanji: '本',
    onyomi: 'ホン (hon)',
    kunyomi: 'もと (moto)',
    meaning: 'Book, Origin, Real',
    strokes: 5,
    examples: [
      { word: '本', reading: 'ほん (Hon)', meaning: 'Book' },
      { word: '日本語', reading: 'にほんご (Nihongo)', meaning: 'Japanese Language' }
    ]
  },
  {
    kanji: '人',
    onyomi: 'ジン, ニン (jin, nin)',
    kunyomi: 'ひと (hito)',
    meaning: 'Person, Human',
    strokes: 2,
    examples: [
      { word: '日本人', reading: 'にほんじん (Nihonjin)', meaning: 'Japanese person' },
      { word: 'インド人', reading: 'インドじん (Indojin)', meaning: 'Indian person' },
      { word: '大人', reading: 'おとな (Otona)', meaning: 'Adult' }
    ]
  },
  {
    kanji: '学',
    onyomi: 'ガク (gaku)',
    kunyomi: 'まな・ぶ (mana-bu)',
    meaning: 'Study, Learning, Science',
    strokes: 8,
    examples: [
      { word: '学生', reading: 'がくせい (Gakusei)', meaning: 'Student' },
      { word: '大学', reading: 'だいがく (Daigaku)', meaning: 'University' },
      { word: '学ぶ', reading: 'まなぶ (Manabu)', meaning: 'To learn' }
    ]
  },
  {
    kanji: '生',
    onyomi: 'セイ, ショウ (sei, shou)',
    kunyomi: 'い・きる, う・まれる (i-kiru, u-mareru)',
    meaning: 'Life, Birth, Genuine',
    strokes: 5,
    examples: [
      { word: '先生', reading: 'せんせい (Sensei)', meaning: 'Teacher / Instructor' },
      { word: '生活', reading: 'せいかつ (Seikatsu)', meaning: 'Daily life' }
    ]
  }
];
