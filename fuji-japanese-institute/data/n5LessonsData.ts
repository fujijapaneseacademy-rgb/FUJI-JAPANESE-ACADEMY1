export interface Lesson {
  id: number;
  title: string;
  japaneseTitle: string;
  duration: string;
  topic: string;
  summary: string;
  grammarPoints: string[];
  keyVocab: { word: string; reading: string; meaning: string }[];
  keyKanji: { kanji: string; onyomi: string; kunyomi: string; meaning: string }[];
  practiceDrill: { question: string; options: string[]; answer: number; explanation: string };
}

export const JLPT_N5_25_LESSONS: Lesson[] = [
  {
    id: 1,
    title: 'Lesson 1: Japanese Self-Introduction & Greetings',
    japaneseTitle: '第1課：自己紹介と挨拶 (Jikoshoukai to Aisatsu)',
    duration: '45 mins',
    topic: 'Greetings, Names, Nationalities, Occupations',
    summary: 'Master the fundamental sentence structure A は B です (A is B), negative form ではありません, and question marker か.',
    grammarPoints: [
      'N1 は N2 です (N1 is N2)',
      'N1 は N2 ではありません (N1 is not N2)',
      'S か (Question particle ka)',
      'N も (Also / Too)',
      'N1 の N2 (Possessive / Association particle no)'
    ],
    keyVocab: [
      { word: '私', reading: 'わたし (watashi)', meaning: 'I / Me' },
      { word: '学生', reading: 'がくせい (gakusei)', meaning: 'Student' },
      { word: '先生', reading: 'せんせい (sensei)', meaning: 'Teacher' },
      { word: '会社員', reading: 'かいしゃいん (kaishain)', meaning: 'Company employee' },
      { word: '初めまして', reading: 'はじめまして (hajimemashite)', meaning: 'Nice to meet you (First time)' }
    ],
    keyKanji: [
      { kanji: '一', onyomi: 'イチ (ichi)', kunyomi: 'ひと (hito)', meaning: 'One' },
      { kanji: '人', onyomi: 'ジン・ニン (jin/nin)', kunyomi: 'ひと (hito)', meaning: 'Person' },
      { kanji: '日', onyomi: 'ニチ (nichi)', kunyomi: 'ひ (hi)', meaning: 'Sun / Day' }
    ],
    practiceDrill: {
      question: 'Choose the correct particle: 私はインド人____学生です。(I am an Indian student.)',
      options: ['は', 'の', 'も', 'が'],
      answer: 1,
      explanation: 'Use の (no) to connect two nouns: インド人の学生 (Indian student).'
    }
  },
  {
    id: 2,
    title: 'Lesson 2: Demonstratives (This, That, That Over There)',
    japaneseTitle: '第2課：指示詞 (これ・それ・あれ・この・その・あの)',
    duration: '40 mins',
    topic: 'Identifying Objects, Belongings, Asking What Something Is',
    summary: 'Learn the Ko-So-A-Do system: これ (this near speaker), それ (that near listener), あれ (that far from both), and どれ (which).',
    grammarPoints: [
      'これ / それ / あれ は N です',
      'この / その / あの N は ... です',
      'そうです / そうではありません',
      'S1 ですか、S2 ですか (Alternative questions)',
      '何 (なん / なに - What)'
    ],
    keyVocab: [
      { word: '本', reading: 'ほん (hon)', meaning: 'Book' },
      { word: '辞書', reading: 'じしょ (jisho)', meaning: 'Dictionary' },
      { word: '時計', reading: 'とけい (tokei)', meaning: 'Watch / Clock' },
      { word: '傘', reading: 'かさ (kasa)', meaning: 'Umbrella' },
      { word: '鍵', reading: 'かぎ (kagi)', meaning: 'Key' }
    ],
    keyKanji: [
      { kanji: '本', onyomi: 'ホン (hon)', kunyomi: 'もと (moto)', meaning: 'Book / Origin' },
      { kanji: '何', onyomi: 'カ (ka)', kunyomi: 'なに・なん (nani/nan)', meaning: 'What' }
    ],
    practiceDrill: {
      question: 'Which word goes in the blank? ______ ほんは だれの ですか。(Whose book is this?)',
      options: ['これ', 'この', 'ここ', 'こちら'],
      answer: 1,
      explanation: 'この (kono) must directly precede a noun (この本).'
    }
  },
  {
    id: 3,
    title: 'Lesson 3: Locations, Department Stores & Prices',
    japaneseTitle: '第3課：場所と値段 (ここ・そこ・あそこ・いくら)',
    duration: '50 mins',
    topic: 'Asking for Directions, Floor Numbers, Prices & Shopping',
    summary: 'Master words for places: ここ, そこ, あそこ, どこ, polite forms こちら, そちら, あちら, and asking prices with いくら.',
    grammarPoints: [
      'ここ / そこ / あそこ は N (place) です',
      'N1 (person/item) は N2 (place) です',
      'どこ / どちら (Where / Which direction - polite)',
      'N1 は いくら ですか (How much is N1?)'
    ],
    keyVocab: [
      { word: '教室', reading: 'きょうしつ (kyoushitsu)', meaning: 'Classroom' },
      { word: '事務所', reading: 'じむしょ (jimusho)', meaning: 'Office' },
      { word: '受付', reading: 'うけつけ (uketsuke)', meaning: 'Reception desk' },
      { word: '部屋', reading: 'へや (heya)', meaning: 'Room' },
      { word: '百', reading: 'ひゃく (hyaku)', meaning: '100' }
    ],
    keyKanji: [
      { kanji: '百', onyomi: 'ヒャク (hyaku)', kunyomi: 'もも (momo)', meaning: 'Hundred' },
      { kanji: '千', onyomi: 'セン (sen)', kunyomi: 'ち (chi)', meaning: 'Thousand' },
      { kanji: '万', onyomi: 'マン (man)', kunyomi: 'よろず (yorozu)', meaning: 'Ten Thousand' }
    ],
    practiceDrill: {
      question: 'How do you politely ask "Where is the restroom?"',
      options: ['トイレはだれですか。', 'おてあらいはどこですか。', 'トイレはいくらですか。', 'ここはトイレですか。'],
      answer: 1,
      explanation: 'おてあらい (or トイレ) はどこ (or どちら) ですか is the correct phrasing.'
    }
  },
  {
    id: 4,
    title: 'Lesson 4: Time, Days of the Week & Daily Routine Verbs',
    japaneseTitle: '第4課：時間・曜日・動詞 (ます形)',
    duration: '50 mins',
    topic: 'Telling Time, Minutes, Days of the week, Verb ~ます & ~ました',
    summary: 'Master the Japanese clock, days of the week, and verb inflection for present, future, past, and negative (~ます, ~ません, ~ました, ~ませんでした).',
    grammarPoints: [
      '今 〜時 〜分 です (Telling time)',
      'V-ます (Non-past affirmative) / V-ません (Non-past negative)',
      'V-ました (Past affirmative) / V-ませんでした (Past negative)',
      'Time に V (Specific point in time)',
      '〜から 〜まで (From ... until ...)'
    ],
    keyVocab: [
      { word: '起きます', reading: 'おきます (okimasu)', meaning: 'Wake up' },
      { word: '寝ます', reading: 'ねます (nemasu)', meaning: 'Sleep' },
      { word: '働きます', reading: 'はたらきます (hatarakimasu)', meaning: 'Work' },
      { word: '勉強します', reading: 'べんきょうします (benkyoushimasu)', meaning: 'Study' },
      { word: '休みます', reading: 'やすみます (yasumimasu)', meaning: 'Rest / Take holiday' }
    ],
    keyKanji: [
      { kanji: '時', onyomi: 'ジ (ji)', kunyomi: 'とき (toki)', meaning: 'Time / Hour' },
      { kanji: '分', onyomi: 'フン・ブン (fun/bun)', kunyomi: 'わ (wa)', meaning: 'Minute / Part' }
    ],
    practiceDrill: {
      question: 'Complete the sentence: 毎朝 7時____ 起きます。(I wake up at 7 every morning.)',
      options: ['で', 'に', 'を', 'へ'],
      answer: 1,
      explanation: 'Use particle に for specific clock times (7時に).'
    }
  },
  {
    id: 5,
    title: 'Lesson 5: Going, Coming, Returning & Transportation',
    japaneseTitle: '第5課：移動動詞 (行きます・来ます・帰ります)',
    duration: '45 mins',
    topic: 'Destinations with へ, Transportation with で, Calendar Dates',
    summary: 'Master verbs of movement 行きます (go), 来ます (come), 帰ります (return), days of the month (1st to 31st), and vehicle particle で.',
    grammarPoints: [
      'Place へ 行きます / 来ます / 帰ります (Movement to a destination)',
      'どこ[へ]も 行きません (Nowhere negative)',
      'Vehicle で 行きます (Means of transportation)',
      'Person と 行きます (Accompanying person with と)',
      'いつ (When question word)'
    ],
    keyVocab: [
      { word: '行きます', reading: 'いきます (ikimasu)', meaning: 'To go' },
      { word: '来ます', reading: 'きます (kimasu)', meaning: 'To come' },
      { word: '帰ります', reading: 'かえります (kaerimasu)', meaning: 'To return home' },
      { word: '電車', reading: 'でんしゃ (densha)', meaning: 'Train' },
      { word: '飛行機', reading: 'ひこうき (hikouki)', meaning: 'Airplane' }
    ],
    keyKanji: [
      { kanji: '行', onyomi: 'コウ・ギョウ (kou)', kunyomi: 'い・ゆ (i/yu)', meaning: 'To go' },
      { kanji: '来', onyomi: 'ライ (rai)', kunyomi: 'く・き (ku/ki)', meaning: 'To come' },
      { kanji: '車', onyomi: 'シャ (sha)', kunyomi: 'くるま (kuruma)', meaning: 'Car / Vehicle' }
    ],
    practiceDrill: {
      question: 'Select the correct particle: 電車____ 東京へ 行きます。(I go to Tokyo by train.)',
      options: ['に', 'で', 'を', 'と'],
      answer: 1,
      explanation: 'Particle で marks means or transportation method (電車で).'
    }
  },
  {
    id: 6,
    title: 'Lesson 6: Transitive Verbs, Direct Objects & Places of Action',
    japaneseTitle: '第6課：他動詞と助詞を・で・ませんか',
    duration: '45 mins',
    topic: 'Food, Drinks, Direct Objects with を, Action locations with で, Invitations',
    summary: 'Learn how to describe daily activities: eating, drinking, watching, buying with particle を, location of action with で, and proposing activities with 〜ませんか.',
    grammarPoints: [
      'Noun を Verb (Direct object)',
      'Place で Verb (Location where action happens)',
      'Verb-ませんか (Won’t you...? Invitation)',
      'Verb-ましょう (Let’s... Suggestion)'
    ],
    keyVocab: [
      { word: '食べます', reading: 'たべます (tabemasu)', meaning: 'Eat' },
      { word: '飲みます', reading: 'のみます (nomimasu)', meaning: 'Drink' },
      { word: '見ます', reading: 'みます (mimasu)', meaning: 'See / Watch' },
      { word: '聞きます', reading: 'ききます (kikimasu)', meaning: 'Hear / Listen' },
      { word: '買います', reading: 'かいます (kaimasu)', meaning: 'Buy' }
    ],
    keyKanji: [
      { kanji: '食', onyomi: 'ショク (shoku)', kunyomi: 'た (ta)', meaning: 'Eat' },
      { kanji: '飲', onyomi: 'イン (in)', kunyomi: 'の (no)', meaning: 'Drink' },
      { kanji: '見', onyomi: 'ケン (ken)', kunyomi: 'み (mi)', meaning: 'See' }
    ],
    practiceDrill: {
      question: 'How do you say "Let’s drink coffee together" politely?',
      options: ['コーヒーを飲みました。', 'コーヒーを飲みませんか。', 'コーヒーを飲みます。', 'コーヒーは飲みません。'],
      answer: 1,
      explanation: '〜ませんか is the standard polite invitation form.'
    }
  },
  {
    id: 7,
    title: 'Lesson 7: Tools, Languages & Giving / Receiving',
    japaneseTitle: '第7課：手段と授受動詞 (あげます・もらいます)',
    duration: '50 mins',
    topic: 'Tools/Instruments, Foreign word translation, あげます & もらいます',
    summary: 'Express means/tools with で (e.g., eat with chopsticks, write in Japanese), and learn basic gift exchange with あげます and もらいます.',
    grammarPoints: [
      'Tool / Language で V (Using a tool or language)',
      'Word は 〜語で 何ですか (What is [Word] in [Language]?)',
      'Person に あげます (Give to person)',
      'Person に/から もらいます (Receive from person)',
      'もう V-ました (Already done) / まだです (Not yet)'
    ],
    keyVocab: [
      { word: '箸', reading: 'はし (hashi)', meaning: 'Chopsticks' },
      { word: '手紙', reading: 'てがみ (tegami)', meaning: 'Letter' },
      { word: 'あげます', reading: 'あげます (agemasu)', meaning: 'To give' },
      { word: 'もらいます', reading: 'もらいます (moraimasu)', meaning: 'To receive' },
      { word: '荷物', reading: 'にもつ (nimotsu)', meaning: 'Luggage / Package' }
    ],
    keyKanji: [
      { kanji: '手', onyomi: 'シュ (shu)', kunyomi: 'て (te)', meaning: 'Hand' },
      { kanji: '紙', onyomi: 'シ (shi)', kunyomi: 'かみ (kami)', meaning: 'Paper' }
    ],
    practiceDrill: {
      question: 'Translate: "I write a letter in Japanese."',
      options: ['日本語で手紙を書きます。', '日本語を手紙で書きます。', '日本語に手紙を書きます。', '日本語へ手紙を書きます。'],
      answer: 0,
      explanation: '日本語で (by means of Japanese language) + 手紙を書きます (write a letter).'
    }
  },
  {
    id: 8,
    title: 'Lesson 8: Japanese Adjectives (い-Adjectives & な-Adjectives)',
    japaneseTitle: '第8課：形容詞 (い形容詞とな形容詞)',
    duration: '55 mins',
    topic: 'Describing Things, Colors, Weather, People & Feelings',
    summary: 'Master the two adjective classes: い-adjectives (e.g., 高い, 面白い) and な-adjectives (e.g., 静かな, 親切な), plus present/past/negative conjugations.',
    grammarPoints: [
      'い-Adj: 〜いです / 〜くないです (Negative)',
      'な-Adj: 〜です / 〜ではありません (Negative)',
      'Adj + Noun (Modifying nouns)',
      'とても (Very) vs あまり + Negative (Not very)',
      'どんな Noun (What kind of Noun?)'
    ],
    keyVocab: [
      { word: '大きい', reading: 'おおきい (ookii)', meaning: 'Big' },
      { word: '小さい', reading: 'ちいさい (chiisai)', meaning: 'Small' },
      { word: '美味しい', reading: 'おいしい (oishii)', meaning: 'Delicious' },
      { word: '静か[な]', reading: 'しずか (shizuka)', meaning: 'Quiet' },
      { word: '有名[な]', reading: 'ゆうめい (yuumei)', meaning: 'Famous' }
    ],
    keyKanji: [
      { kanji: '大', onyomi: 'ダイ・タイ (dai/tai)', kunyomi: 'おお (oo)', meaning: 'Big / Great' },
      { kanji: '小', onyomi: 'ショウ (shou)', kunyomi: 'ちい (chii)', meaning: 'Small' },
      { kanji: '高', onyomi: 'コウ (kou)', kunyomi: 'たか (taka)', meaning: 'High / Expensive' }
    ],
    practiceDrill: {
      question: 'What is the negative form of 熱い (atsui - hot)?',
      options: ['熱くないです', '熱いではありません', '熱くないでした', '熱いでした'],
      answer: 0,
      explanation: 'For い-adjectives, drop the final い and append くない (熱くないです).'
    }
  },
  {
    id: 9,
    title: 'Lesson 9: Likes, Dislikes, Skills & Possession (好き・上手・わかります)',
    japaneseTitle: '第9課：嗜好・能力・所有 (好き・上手・下手・あります)',
    duration: '45 mins',
    topic: 'Expressing Preferences, Talents, Understanding & Reasons with から',
    summary: 'Express what you like (好き), dislike (嫌い), are good at (上手), and understand (分かります) using particle が.',
    grammarPoints: [
      'Noun が 好き / 嫌い です (Like / Dislike)',
      'Noun が 上手 / 下手 です (Good at / Poor at)',
      'Noun が 分かります / あります (Understand / Have)',
      'どうして (Why?) and 〜から (Because / Therefore)'
    ],
    keyVocab: [
      { word: '好き[な]', reading: 'すき (suki)', meaning: 'Like / Fond of' },
      { word: '嫌い[な]', reading: 'きらい (kirai)', meaning: 'Dislike / Hate' },
      { word: '上手[な]', reading: 'じょうず (jouzu)', meaning: 'Skilled / Good at' },
      { word: '分かります', reading: 'わかります (wakarimasu)', meaning: 'Understand' },
      { word: '時間', reading: 'じかん (jikan)', meaning: 'Time' }
    ],
    keyKanji: [
      { kanji: '好', onyomi: 'コウ (kou)', kunyomi: 'す・この (su/kono)', meaning: 'Like' },
      { kanji: '上', onyomi: 'ジョウ (jou)', kunyomi: 'うえ・あ (ue/a)', meaning: 'Up / Above' },
      { kanji: '下', onyomi: 'カ・ゲ (ka/ge)', kunyomi: 'した・さ (shita/sa)', meaning: 'Down / Below' }
    ],
    practiceDrill: {
      question: 'Fill in the blank: 私は日本語____分かります。(I understand Japanese.)',
      options: ['を', 'が', 'で', 'に'],
      answer: 1,
      explanation: 'Verbs of ability/comprehension (分かる, できる) use particle が.'
    }
  },
  {
    id: 10,
    title: 'Lesson 10: Existence & Position of People and Things (あります・います)',
    japaneseTitle: '第10課：存在動詞 (あります・います) と位置詞',
    duration: '50 mins',
    topic: 'Inanimate vs Animate Existence, Positional Words (Above, Below, Inside)',
    summary: 'Distinguish あります (inanimate objects, plants) from います (living beings, animals, humans), and express locations (上, 下, 前, 後ろ, 中, 隣).',
    grammarPoints: [
      'Place に Noun が あります / います (There is Noun in Place)',
      'Noun は Place に あります / います (Noun is in Place)',
      'N1 (place) の Position に N2 が あります/います',
      'N1 や N2 (Non-exhaustive list: N1, N2 and so on)'
    ],
    keyVocab: [
      { word: 'あります', reading: 'あります (arimasu)', meaning: 'Exist (Inanimate)' },
      { word: 'います', reading: 'います (imasu)', meaning: 'Exist (Living beings)' },
      { word: '犬', reading: 'いぬ (inu)', meaning: 'Dog' },
      { word: '猫', reading: 'ねこ (neko)', meaning: 'Cat' },
      { word: '机', reading: 'つくえ (tsukue)', meaning: 'Desk' }
    ],
    keyKanji: [
      { kanji: '中', onyomi: 'チュウ (chuu)', kunyomi: 'なか (naka)', meaning: 'Inside / Middle' },
      { kanji: '前', onyomi: 'ゼン (zen)', kunyomi: 'まえ (mae)', meaning: 'Front / Before' },
      { kanji: '後', onyomi: 'ゴ・コウ (go/kou)', kunyomi: 'うし・あと (ushi/ato)', meaning: 'Behind / After' }
    ],
    practiceDrill: {
      question: 'Which is correct for: "There is a cat under the desk."?',
      options: ['机の下に猫があります。', '机の下に猫がいます。', '机の猫が下にあります。', '猫の下に机がいます。'],
      answer: 1,
      explanation: 'Cats are living animals, so they take います (机の下に猫がいます).'
    }
  },
  {
    id: 11,
    title: 'Lesson 11: Japanese Counters, Quantifiers & Frequency',
    japaneseTitle: '第11課：助数詞 (ひとつ、ひとり、台、枚、本) と頻度',
    duration: '50 mins',
    topic: 'Counting Objects, People, Machines, Frequency & Durations',
    summary: 'Master the Japanese counter system: native counters ひとつ〜とお, 冊, 枚, 台, 人, and expressing frequency (e.g., twice a week).',
    grammarPoints: [
      'Native counters: ひとつ、ふたつ、みっつ...',
      'Specific counters: 〜人 (people), 〜台 (machines), 〜枚 (flat sheets), 〜本 (cylindrical)',
      'Quantity どのくらい / いくつ (How many / How long?)',
      'Period に 〜回 (Frequency: twice per week)'
    ],
    keyVocab: [
      { word: 'りんご', reading: 'りんご (ringo)', meaning: 'Apple' },
      { word: '切手', reading: 'きって (kitte)', meaning: 'Postage stamp' },
      { word: '車', reading: 'くるま (kuruma)', meaning: 'Car' },
      { word: 'どのくらい', reading: 'どのくらい (dono kurai)', meaning: 'How long / How much' },
      { word: '週間', reading: 'しゅうかん (shuukan)', meaning: 'Weeks duration' }
    ],
    keyKanji: [
      { kanji: '年', onyomi: 'ネン (nen)', kunyomi: 'とし (toshi)', meaning: 'Year' },
      { kanji: '月', onyomi: 'ゲツ・ガツ (getsu/gatsu)', kunyomi: 'つき (tsuki)', meaning: 'Month / Moon' }
    ],
    practiceDrill: {
      question: 'How do you say "two cars" in Japanese?',
      options: ['車が二本', '車が二枚', '車が二台', '車が二人'],
      answer: 2,
      explanation: 'Vehicles, appliances and machinery use the counter 台 (だい - dai).'
    }
  },
  {
    id: 12,
    title: 'Lesson 12: Past Tense of Adjectives & Comparative Expressions',
    japaneseTitle: '第12課：形容詞の過去形と比較 (より・一番)',
    duration: '55 mins',
    topic: 'Past Tense Adjectives, Comparing Two Things, Superlatives',
    summary: 'Learn past affirmative and past negative of adjectives, and master comparisons with より and superlatives with 一番.',
    grammarPoints: [
      'い-Adj Past: 〜かったです / 〜くなかったです',
      'な-Adj Past: 〜でした / 〜ではありませんでした',
      'N1 は N2 より Adj です (N1 is more Adj than N2)',
      'N1 と N2 と どちらが Adj ですか (Which is more Adj, N1 or N2?)',
      'Group の 中で 何/どこ/だれ が 一番 Adj ですか (Superlative)'
    ],
    keyVocab: [
      { word: '雨', reading: 'あめ (ame)', meaning: 'Rain' },
      { word: '雪', reading: 'ゆき (yuki)', meaning: 'Snow' },
      { word: '曇り', reading: 'くもり (kumori)', meaning: 'Cloudy' },
      { word: '一番', reading: 'いちばん (ichiban)', meaning: 'Number one / Most' },
      { word: '旅行', reading: 'りょこう (ryokou)', meaning: 'Trip / Travel' }
    ],
    keyKanji: [
      { kanji: '雨', onyomi: 'ウ (u)', kunyomi: 'あめ (ame)', meaning: 'Rain' },
      { kanji: '天', onyomi: 'テン (ten)', kunyomi: 'あめ・あま (ame)', meaning: 'Heaven / Sky' },
      { kanji: '気', onyomi: 'キ (ki)', kunyomi: 'いき (iki)', meaning: 'Spirit / Air' }
    ],
    practiceDrill: {
      question: 'Translate: "Tokyo is bigger than Kyoto."',
      options: ['東京は京都より大きいです。', '京都は東京より大きいです。', '東京と京都は一番大きいです。', '東京は京都が好きです。'],
      answer: 0,
      explanation: 'A は B より [Adj] です = A is more [Adj] than B.'
    }
  },
  {
    id: 13,
    title: 'Lesson 13: Desires & Purpose of Movement (欲しい・たい・に行く)',
    japaneseTitle: '第13課：願望 (欲しい・〜たい) と移動の目的',
    duration: '45 mins',
    topic: 'Desiring Objects with 欲しい, Desiring Actions with 〜たい, Purpose with に行く',
    summary: 'Express what you want to have (欲しい) and what you want to do (V-たい), and learn purpose of motion: Place へ Action に 行きます.',
    grammarPoints: [
      'Noun が 欲しい です (I want Noun)',
      'V-ます stem + たい です (I want to do Verb)',
      'Place へ Verb stem / Noun に 行きます / 来ます (Go/come to do something)',
      'どこか (Somewhere) / 何か (Something)'
    ],
    keyVocab: [
      { word: '欲しい', reading: 'ほしい (hoshii)', meaning: 'Want (Object)' },
      { word: '遊びます', reading: 'あそびます (asobimasu)', meaning: 'Play / Have fun' },
      { word: '泳ぎます', reading: 'およぎます (oyogimasu)', meaning: 'Swim' },
      { word: '買い物', reading: 'かいもの (kaimono)', meaning: 'Shopping' },
      { word: '散歩', reading: 'さんぽ (sanpo)', meaning: 'Walk / Stroll' }
    ],
    keyKanji: [
      { kanji: '友', onyomi: 'ユウ (yuu)', kunyomi: 'とも (tomo)', meaning: 'Friend' },
      { kanji: '買', onyomi: 'バイ (bai)', kunyomi: 'か (ka)', meaning: 'Buy' }
    ],
    practiceDrill: {
      question: 'How do you say "I want to go to Japan"?',
      options: ['日本へ行きたいです。', '日本へ行きます。', '日本が欲しいです。', '日本へ行きませんでした。'],
      answer: 0,
      explanation: 'Verb stem of 行きます is 行き + たいです = 行きたいです.'
    }
  },
  {
    id: 14,
    title: 'Lesson 14: Verb Groups & The Essential Te-Form (て形)',
    japaneseTitle: '第14課：動詞のグループ分けと「て形」',
    duration: '60 mins',
    topic: 'Group 1, 2, 3 Verbs, Te-Form Rules, Please do (てください), Present Continuous',
    summary: 'The most critical grammar milestone of JLPT N5: classifying Japanese verbs into 3 groups and mastering the ~て conjugation for requests and continuous actions.',
    grammarPoints: [
      'Group 1 (Godan), Group 2 (Ichidan), Group 3 (Irregular: します, 来ます)',
      'Te-Form conjugation rules',
      'V-てください (Please do...)',
      'V-ています (Present continuous action / In-progress)'
    ],
    keyVocab: [
      { word: '待ちます', reading: 'まちます (machimasu)', meaning: 'Wait' },
      { word: '呼びます', reading: 'よびます (yobimasu)', meaning: 'Call / Invite' },
      { word: '急ぎます', reading: 'いそぎます (isogimasu)', meaning: 'Hurry' },
      { word: '開けます', reading: 'あけます (akemasu)', meaning: 'Open' },
      { word: '閉めます', reading: 'しめます (shimemasu)', meaning: 'Close' }
    ],
    keyKanji: [
      { kanji: '立', onyomi: 'リツ (ritsu)', kunyomi: 'た (ta)', meaning: 'Stand' },
      { kanji: '休', onyomi: 'キュウ (kyuu)', kunyomi: 'やす (yasu)', meaning: 'Rest' }
    ],
    practiceDrill: {
      question: 'What is the Te-form of 待ちます (machimasu - wait)?',
      options: ['まちて', 'まって', 'まちいで', 'またて'],
      answer: 1,
      explanation: 'Verbs ending in ち/り/い conjugate to って (待ちます -> 待って).'
    }
  },
  {
    id: 15,
    title: 'Lesson 15: Permission & Prohibition (てもいいです・てはいけません)',
    japaneseTitle: '第15課：許可 (てもいい) と禁止 (てはいけない)',
    duration: '45 mins',
    topic: 'Asking Permission, Prohibiting Actions, Continuing States with ています',
    summary: 'Learn how to ask for permission with 〜てもいいですか, forbid actions with 〜てはいけません, and describe habitual occupation or marital status with 〜ています.',
    grammarPoints: [
      'V-てもいいですか (May I do...?)',
      'V-てはいけません (You must not do... Prohibition)',
      'V-ています (Resulting state: 知っています, 結婚しています, 住んでいます)'
    ],
    keyVocab: [
      { word: '写真', reading: 'しゃしん (shashin)', meaning: 'Photograph' },
      { word: '撮ります', reading: 'とります (torimasu)', meaning: 'Take (Photo)' },
      { word: 'タバコ', reading: 'たばこ (tabako)', meaning: 'Tobacco / Cigarette' },
      { word: '吸います', reading: 'すいます (suimasu)', meaning: 'Smoke / Inhale' },
      { word: '住んでいます', reading: 'すんでいます (sundeimasu)', meaning: 'Living in' }
    ],
    keyKanji: [
      { kanji: '写', onyomi: 'シャ (sha)', kunyomi: 'うつ (utsu)', meaning: 'Copy / Photograph' },
      { kanji: '真', onyomi: 'シン (shin)', kunyomi: 'ま (ma)', meaning: 'True / Reality' }
    ],
    practiceDrill: {
      question: 'How do you say: "You must not take photos here"?',
      options: ['ここで写真を撮ってもいいです。', 'ここで写真を撮ってはいけません。', 'ここで写真を撮りません。', 'ここで写真を撮りたいです。'],
      answer: 1,
      explanation: '〜てはいけません expresses prohibition (撮ってはいけません).'
    }
  },
  {
    id: 16,
    title: 'Lesson 16: Sequential Actions & Connecting Sentences (て、それから)',
    japaneseTitle: '第16課：動作の順序 (〜てから) と文の接続',
    duration: '50 mins',
    topic: 'Connecting Multiple Verbs, Describing Physical Attributes, 〜てから',
    summary: 'Chain consecutive actions chronologically using the Te-form (V1て, V2て, V3ます), express "after doing X" with 〜てから, and connect adjectives.',
    grammarPoints: [
      'V1-て, V2-て, V3-ます (Sequential actions)',
      'V1-てから, V2 (After doing V1, then V2)',
      'N1 は N2 (body part) が [Adj] (e.g. Maria has long hair)',
      'い-Adj 〜くて / な-Adj 〜で (Connecting adjectives)'
    ],
    keyVocab: [
      { word: '乗ります', reading: 'のります (norimasu)', meaning: 'Get on / Ride' },
      { word: '降ります', reading: 'おります (orimasu)', meaning: 'Get off' },
      { word: '乗り換えます', reading: 'のりかえます (norikaemasu)', meaning: 'Transfer trains' },
      { word: 'シャワー', reading: 'しゃわー (shawaa)', meaning: 'Shower' },
      { word: '浴びます', reading: 'あびます (abimasu)', meaning: 'Take (Shower)' }
    ],
    keyKanji: [
      { kanji: '入', onyomi: 'ニュウ (nyuu)', kunyomi: 'はい・い (hai/i)', meaning: 'Enter' },
      { kanji: '出', onyomi: 'シュツ (shutsu)', kunyomi: 'で・だ (de/da)', meaning: 'Exit / Leave' }
    ],
    practiceDrill: {
      question: 'Choose the correct order: 朝起きて、顔を_____、朝ご飯を食べます。(Wake up, wash face, eat breakfast.)',
      options: ['洗います', '洗って', '洗った', '洗いた'],
      answer: 1,
      explanation: 'Sequential actions chain together with Te-form (洗って).'
    }
  },
  {
    id: 17,
    title: 'Lesson 17: Negative Verb Forms & Obligations (ない形・なければなりません)',
    japaneseTitle: '第17課：「ない形」と義務 (なければならない)',
    duration: '55 mins',
    topic: 'Nai-Form Rules, Please do not (ないでください), Must do (なければなりません)',
    summary: 'Conjugate verbs into plain negative (ない形), express "please do not do" with 〜ないでください, and express necessity/obligation with 〜なければなりません.',
    grammarPoints: [
      'Nai-Form conjugation rules across Groups 1, 2, 3',
      'V-ないでください (Please don’t...)',
      'V-なければなりません (Must do / Obligation)',
      'V-なくてもいいです (Don’t have to / Need not)'
    ],
    keyVocab: [
      { word: '忘れます', reading: 'わすれます (wasuremasu)', meaning: 'Forget' },
      { word: 'なくします', reading: 'なくします (nakushimasu)', meaning: 'Lose (something)' },
      { word: '払います', reading: 'はらいます (haraimasu)', meaning: 'Pay' },
      { word: '薬', reading: 'くすり (kusuri)', meaning: 'Medicine' },
      { word: '保険証', reading: 'ほけんしょう (hokenshou)', meaning: 'Health insurance card' }
    ],
    keyKanji: [
      { kanji: '無', onyomi: 'ム・ブ (mu/bu)', kunyomi: 'な (na)', meaning: 'Nothing / Without' },
      { kanji: '名', onyomi: 'メイ・ミョウ (mei/myou)', kunyomi: 'な (na)', meaning: 'Name' }
    ],
    practiceDrill: {
      question: 'What is the Nai-form of 書きます (kakimasu - write)?',
      options: ['かきない', 'かかない', 'かくない', 'かけない'],
      answer: 1,
      explanation: 'Group 1 verbs change the "i" column to "a" column + ない (かき -> かかない).'
    }
  },
  {
    id: 18,
    title: 'Lesson 18: Dictionary Form & Potential Ability (辞書形・ことができます)',
    japaneseTitle: '第18課：「辞書形」と能力・趣味 (〜ができる)',
    duration: '50 mins',
    topic: 'Dictionary Plain Form, Expressing Ability with ことができる, Hobbies, Before doing',
    summary: 'Learn the dictionary (infinitive) plain form of verbs, how to express skills or ability with 〜ことができます, talk about hobbies, and express "before" with 〜まえに.',
    grammarPoints: [
      'Dictionary form (辞書形) rules',
      'Noun / V-辞書形 ことが できます (Can do / Able to)',
      '私の 趣味は Noun / V-辞書形 こと です (My hobby is...)',
      'V1-辞書形 / Noun の まえに, V2 (Before doing V1, V2)'
    ],
    keyVocab: [
      { word: 'できます', reading: 'できます (dekimasu)', meaning: 'Can do' },
      { word: '運転します', reading: 'うんてんします (untenshimasu)', meaning: 'Drive' },
      { word: '趣味', reading: 'しゅみ (shumi)', meaning: 'Hobby' },
      { word: 'ピアノ', reading: 'ぴあの (piano)', meaning: 'Piano' },
      { word: '弾きます', reading: 'ひきます (hikimasu)', meaning: 'Play (String/Piano)' }
    ],
    keyKanji: [
      { kanji: '話', onyomi: 'ワ (wa)', kunyomi: 'はな・はなし (hana/hanashi)', meaning: 'Speak / Story' },
      { kanji: '語', onyomi: 'ゴ (go)', kunyomi: 'かた (kata)', meaning: 'Language' }
    ],
    practiceDrill: {
      question: 'How do you say "I can swim"?',
      options: ['泳ぐことができます。', '泳ぎることができます。', '泳ぐ前に行きます。', '泳ぎたいです。'],
      answer: 0,
      explanation: 'Dictionary form (泳ぐ) + ことができます.'
    }
  },
  {
    id: 19,
    title: 'Lesson 19: Past Plain Ta-Form & Experiences (た形・ことがある)',
    japaneseTitle: '第19課：「た形」と経験 (〜たことがある・〜たり〜たり)',
    duration: '50 mins',
    topic: 'Ta-Form Rules, Past Experience with たことがある, Listing Actions with たり',
    summary: 'Master the past plain form (た形), express personal life experiences with 〜たことがあります (I have done...), and list non-chronological actions with 〜たり〜たりします.',
    grammarPoints: [
      'Ta-Form (た形) conjugation (mirrors Te-form rules)',
      'V-た ことが あります (Have the experience of...)',
      'V1-たり, V2-たり します (Do things like V1 and V2)',
      'Adj / Noun に / く なります (To become / Change of state)'
    ],
    keyVocab: [
      { word: '登ります', reading: 'のぼります (noborimasu)', meaning: 'Climb' },
      { word: '泊まります', reading: 'とまります (tomarimasu)', meaning: 'Stay (At a hotel)' },
      { word: '掃除します', reading: 'そうじします (soujishimasu)', meaning: 'Clean' },
      { word: '洗濯します', reading: 'せんたくします (sentakushimasu)', meaning: 'Do laundry' },
      { word: '一度', reading: 'いちど (ichido)', meaning: 'Once' }
    ],
    keyKanji: [
      { kanji: '男', onyomi: 'ダン・ナン (dan/nan)', kunyomi: 'おとこ (otoko)', meaning: 'Man / Male' },
      { kanji: '女', onyomi: 'ジョ (jo)', kunyomi: 'おんな (onna)', meaning: 'Woman / Female' }
    ],
    practiceDrill: {
      question: 'Translate: "Have you ever climbed Mt. Fuji?"',
      options: ['富士山に登りましたか。', '富士山に登ったことがありますか。', '富士山に登りたいですか。', '富士山に登りましょうか。'],
      answer: 1,
      explanation: 'Experience is expressed using V-たことがありますか.'
    }
  },
  {
    id: 20,
    title: 'Lesson 20: Informal / Plain Casual Speech (普通形)',
    japaneseTitle: '第20課：普通形 (タメ口・会話の基本)',
    duration: '55 mins',
    topic: 'Casual vs Polite Style, Talking to Friends, Dropping Particles',
    summary: 'Transition between Polite style (丁寧体: です・ます) and Casual style (普通体: だ・辞書形・ない形・た形) used among friends, peers, and family.',
    grammarPoints: [
      'Converting です / ます sentences to Plain Form (普通形)',
      'Plain form conversational conventions (dropping か, rising pitch)',
      'けど (Casual "but / although")',
      'Casual conversation vocabulary conversions'
    ],
    keyVocab: [
      { word: '要る', reading: 'いる (iru)', meaning: 'Need (Casual)' },
      { word: '調べる', reading: 'しらべる (shiraberu)', meaning: 'Investigate / Look up' },
      { word: '直す', reading: 'なおす (naosu)', meaning: 'Repair / Correct' },
      { word: '今度', reading: 'こんど (kondo)', meaning: 'Next time' },
      { word: 'うん / ううん', reading: 'un / uun', meaning: 'Yeah / Nah (Casual Yes/No)' }
    ],
    keyKanji: [
      { kanji: '目', onyomi: 'モク (moku)', kunyomi: 'め (me)', meaning: 'Eye' },
      { kanji: '耳', onyomi: 'ジ (ji)', kunyomi: 'みみ (mimi)', meaning: 'Ear' }
    ],
    practiceDrill: {
      question: 'What is the casual plain equivalent of "明日は行きません"?',
      options: ['明日は行かない。', '明日は行かないだ。', '明日は行きます。', '明日は行かないです。'],
      answer: 0,
      explanation: 'Non-past negative in plain form is simply the Nai-form (行かない).'
    }
  },
  {
    id: 21,
    title: 'Lesson 21: Expressing Opinions & Quotations (〜と思う・〜と言った)',
    japaneseTitle: '第21課：意見と引用 (〜と思う・〜と言いました)',
    duration: '50 mins',
    topic: 'Expressing Thoughts with と思う, Quoting Speech with と言いました, Agreement',
    summary: 'Express your personal thoughts and opinions using [Plain Form] + と思います (I think that...), and report or quote what someone said using と言いました.',
    grammarPoints: [
      '[Plain form] と 思います (I think that...)',
      '[Speech / Plain form] と 言いました (Quoting: Said that...)',
      '[Plain form] でしょう (Isn’t it? Right? Seeking agreement)'
    ],
    keyVocab: [
      { word: '思います', reading: 'おもいます (omoimasu)', meaning: 'Think' },
      { word: '言います', reading: 'いいます (iimasu)', meaning: 'Say' },
      { word: '勝ちます', reading: 'かちます (kachimasu)', meaning: 'Win' },
      { word: '負けます', reading: 'まけます (makemasu)', meaning: 'Lose' },
      { word: '役に立ちます', reading: 'やくにたちます (yakunitachimasu)', meaning: 'Be useful' }
    ],
    keyKanji: [
      { kanji: '思', onyomi: 'シ (shi)', kunyomi: 'おも (omo)', meaning: 'Think' },
      { kanji: '言', onyomi: 'ゲン・ゴン (gen/gon)', kunyomi: 'い・こと (i/koto)', meaning: 'Word / Say' }
    ],
    practiceDrill: {
      question: 'How do you say "I think tomorrow will be fine weather"?',
      options: ['明日は晴れると思います。', '明日は晴れると言いました。', '明日は晴れるでしょう。', '明日は晴れます。'],
      answer: 0,
      explanation: 'Plain form (晴れる) + と思います expresses personal belief.'
    }
  },
  {
    id: 22,
    title: 'Lesson 22: Noun Modification & Relative Clauses (修飾節)',
    japaneseTitle: '第22課：連体修飾節 (文で名詞を説明する)',
    duration: '60 mins',
    topic: 'Describing Nouns with Full Clauses, Relative Pronouns in Japanese',
    summary: 'Learn how Japanese constructs relative clauses without pronouns like "who" or "which": simply place the plain form clause directly before the noun being described.',
    grammarPoints: [
      '[Plain verb / clause] + Noun (The book that I read, The person who bought the car)',
      'Subordinate clause subjects take が instead of は',
      'Time / Place / Object modified clauses'
    ],
    keyVocab: [
      { word: '着ます', reading: 'きます (kimasu)', meaning: 'Wear (Upper body)' },
      { word: '履きます', reading: 'はきます (hakimasu)', meaning: 'Wear (Lower body/shoes)' },
      { word: 'かぶります', reading: 'かぶります (kaburimasu)', meaning: 'Put on (Hat)' },
      { word: '眼鏡', reading: 'めがね (megane)', meaning: 'Glasses' },
      { word: '約束', reading: 'やくそく (yakusoku)', meaning: 'Promise / Appointment' }
    ],
    keyKanji: [
      { kanji: '父', onyomi: 'フ (fu)', kunyomi: 'ちち・とう (chichi/tou)', meaning: 'Father' },
      { kanji: '母', onyomi: 'ボ (bo)', kunyomi: 'はは・かあ (haha/kaa)', meaning: 'Mother' }
    ],
    practiceDrill: {
      question: 'Translate: "The man who is wearing glasses."',
      options: ['眼鏡をかけている人', '眼鏡の人がかけている', '人眼鏡をかけます', '人が眼鏡をかける'],
      answer: 0,
      explanation: 'Relative clauses directly precede the noun: [眼鏡をかけている] 人.'
    }
  },
  {
    id: 23,
    title: 'Lesson 23: Conditions & Temporal Milestones (〜とき・〜と)',
    japaneseTitle: '第23課：時 (〜とき) と条件・結果 (〜と)',
    duration: '50 mins',
    topic: 'When Doing Something (とき), Natural Consequences & Directions with と',
    summary: 'Express "when" using 〜とき with verbs, adjectives, and nouns, and describe natural inevitable consequences or navigation directions using Verb-辞書形 + と.',
    grammarPoints: [
      'V-辞書形 / V-た / い-Adj / な-Adj な / Noun の + とき (When...)',
      'V-辞書形 + と (If / When this happens, that inevitably follows - navigation, mechanics)',
      'Place を 渡ります / 曲がります (Cross / Turn at location)'
    ],
    keyVocab: [
      { word: '渡ります', reading: 'わたります (watarimasu)', meaning: 'Cross (Bridge/street)' },
      { word: '曲がります', reading: 'まがります (magarimasu)', meaning: 'Turn' },
      { word: '交差点', reading: 'こうさてん (kousaten)', meaning: 'Intersection' },
      { word: '橋', reading: 'はし (hashi)', meaning: 'Bridge' },
      { word: '信号', reading: 'しんごう (shingou)', meaning: 'Traffic light' }
    ],
    keyKanji: [
      { kanji: '道', onyomi: 'ドウ (dou)', kunyomi: 'みち (michi)', meaning: 'Road / Way' },
      { kanji: '右', onyomi: 'ウ・ユウ (u/yuu)', kunyomi: 'みぎ (migi)', meaning: 'Right' },
      { kanji: '左', onyomi: 'サ (sa)', kunyomi: 'ひだり (hidari)', meaning: 'Left' }
    ],
    practiceDrill: {
      question: 'Translate: "If you turn right at the traffic light, there is a bank."',
      options: ['信号を右へ曲がると、銀行があります。', '信号を右へ曲がれば、銀行です。', '信号を右へ曲がって、銀行に行きます。', '信号の右に銀行があります。'],
      answer: 0,
      explanation: 'V-辞書形 + と indicates predictable physical consequence in giving directions.'
    }
  },
  {
    id: 24,
    title: 'Lesson 24: Favor Exchange (てくれます・てもらいます・てあげます)',
    japaneseTitle: '第24課：授受表現 (〜てあげる・〜てもらう・〜てくれる)',
    duration: '55 mins',
    topic: 'Doing Favors for Others, Receiving Kind Acts, Someone Doing a Favor for Me',
    summary: 'Master the nuance of Japanese favors: V-てあげます (do something for someone), V-てもらいます (have someone do something for you), and V-てくれます (someone does something for me).',
    grammarPoints: [
      'Person に V-て あげます (Do a favor for someone)',
      'Person に V-て もらいます (Receive a favor from someone)',
      'Person が [私に] V-て くれます (Someone kindly does a favor for me)'
    ],
    keyVocab: [
      { word: '直してくれます', reading: 'なおしてくれます (naoshite kuremasu)', meaning: 'Repairs for me' },
      { word: '連れて行きます', reading: 'つれていきます (tsurete ikimasu)', meaning: 'Take someone along' },
      { word: '送ります', reading: 'おくります (okurimasu)', meaning: 'Send / Escort' },
      { word: '案内します', reading: 'あんないします (annaishimasu)', meaning: 'Guide / Show around' },
      { word: '説明します', reading: 'せつめいします (setsumeishimasu)', meaning: 'Explain' }
    ],
    keyKanji: [
      { kanji: '友', onyomi: 'ユウ (yuu)', kunyomi: 'とも (tomo)', meaning: 'Friend' },
      { kanji: '達', onyomi: 'タツ (tatsu)', kunyomi: 'たち (tachi)', meaning: 'Plural / Reach' }
    ],
    practiceDrill: {
      question: 'Which is correct when Sensei explains Japanese grammar to you?',
      options: ['先生に日本語を説明してあげました。', '先生が日本語を説明してくれました。', '先生を日本語で説明しました。', '私が先生に説明してくれました。'],
      answer: 1,
      explanation: 'When someone does a kind favor for the speaker, use 〜てくれました.'
    }
  },
  {
    id: 25,
    title: 'Lesson 25: Conditionals & Concessives (〜たら・〜ても - JLPT N5 Capstone)',
    japaneseTitle: '第25課：仮定条件 (〜たら) と確定条件 (〜ても) - 総復習',
    duration: '60 mins',
    topic: 'Conditional "If/When" with たら, Even If with ても, JLPT N5 Complete Exam Review',
    summary: 'The final capstone lesson of Minna no Nihongo / JLPT N5: forming conditional statements with 〜たら (if/when), and concessive "even if" statements with 〜ても, completing your full N5 syllabus.',
    grammarPoints: [
      'V-たら / い-Adj かったら / な-Adj だったら (If / When condition happens)',
      'V-ても / い-Adj くても / な-Adj でも (Even if / Although)',
      'もし (If - emphasizing hypothesis)',
      'いくら 〜ても (No matter how much...)'
    ],
    keyVocab: [
      { word: '考えます', reading: 'かんがえます (kangaemasu)', meaning: 'Think / Consider' },
      { word: '着きます', reading: 'つきます (tsukimasu)', meaning: 'Arrive' },
      { word: '留学します', reading: 'りゅうがくします (ryuugakushimasu)', meaning: 'Study abroad' },
      { word: '頑張ります', reading: 'がんばります (ganbarimasu)', meaning: 'Do one’s best' },
      { word: '合格', reading: 'ごうかく (goukaku)', meaning: 'Passing an exam' }
    ],
    keyKanji: [
      { kanji: '合', onyomi: 'ゴウ・ガッ (gou/gatsu)', kunyomi: 'あ (a)', meaning: 'Fit / Match' },
      { kanji: '格', onyomi: 'カク・コウ (kaku/kou)', kunyomi: 'いた (ita)', meaning: 'Status / Standard' }
    ],
    practiceDrill: {
      question: 'Translate: "If I pass the JLPT N5 exam, I will travel to Japan."',
      options: ['N5試験に合格したら、日本へ旅行します。', 'N5試験に合格しても、日本へ行きます。', 'N5試験に合格する前に、日本へ行きます。', 'N5試験に合格したいです。'],
      answer: 0,
      explanation: 'V-たら indicates condition: [合格したら] (if/once I pass).'
    }
  }
];
