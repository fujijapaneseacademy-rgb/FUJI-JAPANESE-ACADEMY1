export interface QuizQuestion {
  id: number;
  question: string;
  context?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface QuizTopic {
  id: string;
  title: string;
  level: string;
  category: string;
  description: string;
  timeLimitMinutes: number;
  questions: QuizQuestion[];
}

export const PRACTICE_QUIZZES: Record<string, QuizTopic> = {
  'jlpt-n5-vocab': {
    id: 'jlpt-n5-vocab',
    title: 'JLPT N5 Vocabulary & Reading Drill',
    level: 'N5',
    category: 'Vocabulary (Goi)',
    description: 'Test your grasp of essential everyday Japanese words, hiragana readings, and word associations.',
    timeLimitMinutes: 15,
    questions: [
      {
        id: 1,
        question: 'あさごはんを たべます。 「あさ」の かんじは どれですか。',
        context: 'I eat breakfast. Which is the Kanji for "asa" (morning)?',
        options: ['昼', '朝', '夜', '夕'],
        correctIndex: 1,
        explanation: '「朝」(asa) means morning. 「昼」(hiru) is daytime/noon, 「夜」(yoru) is night, and 「夕」(yū) is evening.'
      },
      {
        id: 2,
        question: 'つくえの ___ に ねこが います。',
        context: 'There is a cat under the desk. (Choose the word for "under")',
        options: ['うえ', 'まえ', 'した', 'なか'],
        correctIndex: 2,
        explanation: 'した (shita) means "under" or "below". うえ (ue) is above, まえ (mae) is in front of, and なか (naka) is inside.'
      },
      {
        id: 3,
        question: 'きのうは ___ でした。',
        context: 'Yesterday was ___. (Indicating Sunday)',
        options: ['げつようび', 'すいようび', 'にちようび', 'きんようび'],
        correctIndex: 2,
        explanation: '「にちようび」(Nichiyoubi) is Sunday. げつようび is Monday, すいようび is Wednesday, and きんようび is Friday.'
      },
      {
        id: 4,
        question: 'この りんごは ___ ですか。 「ひとつ 150えんです。」',
        context: 'How much is this apple? "It is 150 yen each."',
        options: ['どこ', 'だれ', 'いつ', 'いくら'],
        correctIndex: 3,
        explanation: '「いくら」(ikura) asks "how much (price)". どこ asks where, だれ asks who, and いつ asks when.'
      },
      {
        id: 5,
        question: '「ともだち」の かんじは どれですか。',
        context: 'Which is the Kanji for "tomodachi" (friend)?',
        options: ['友人', '友達', '家族', '先生'],
        correctIndex: 1,
        explanation: '「友達」(tomodachi) is the standard N5 Kanji for friend. 友人 (yūjin) is more formal N3/N2 vocabulary.'
      },
      {
        id: 6,
        question: 'まいあさ コーヒーを ___。',
        context: 'Every morning I ___ coffee.',
        options: ['たべます', 'のみます', 'よみます', 'ききます'],
        correctIndex: 1,
        explanation: 'You drink (のみます - nomimasu) coffee. たべます is to eat, よみます is to read, and ききます is to listen.'
      },
      {
        id: 7,
        question: 'えんぴつが ___ あります。',
        context: 'There are ___ pencils. (Counter for long cylindrical objects)',
        options: ['さんまい', 'さんぼん', 'さんさつ', 'さんびき'],
        correctIndex: 1,
        explanation: 'Pencils are long and thin, counted with ~本 (~hon/bon/pon). Hence, さんぼん (sanbon). まい is for flat sheets, さつ is for bound books, and ひき is for small animals.'
      },
      {
        id: 8,
        question: 'きょうは てんきが ___ ですね。',
        context: 'Today the weather is ___ , isn\'t it?',
        options: ['たかい', 'おいしい', 'いい', 'はやい'],
        correctIndex: 2,
        explanation: '「いい」(ii) means good. Weather is described as いい てんき (good weather).'
      },
      {
        id: 9,
        question: '「車」の よみかたは どれですか。',
        context: 'What is the reading for the Kanji 「車」 (car)?',
        options: ['でんしゃ', 'じてんしゃ', 'ひこうき', 'くるま'],
        correctIndex: 3,
        explanation: '「車」 alone is read くるま (kuruma). でんしゃ is 電車 (electric train).'
      },
      {
        id: 10,
        question: 'えきまで バスで 10ぷん ___ かかります。',
        context: 'It takes ___ 10 minutes to the station by bus.',
        options: ['ごろ', 'ぐらい', 'だけ', 'あまり'],
        correctIndex: 1,
        explanation: '「ぐらい」(gurai) expresses approximate duration ("about 10 minutes"). ごろ (goro) is only used for approximate point in time (e.g. 3時ごろ - around 3 o\'clock).'
      }
    ]
  },
  'jlpt-n5-grammar': {
    id: 'jlpt-n5-grammar',
    title: 'JLPT N5 Particles & Grammar Drill',
    level: 'N5',
    category: 'Grammar (Bunpou)',
    description: 'Master Japanese particles (は, が, を, に, で, と) and basic sentence formulas.',
    timeLimitMinutes: 15,
    questions: [
      {
        id: 1,
        question: 'わたし ___ ラフルです。',
        context: 'I am Rahul.',
        options: ['が', 'は', 'を', 'に'],
        correctIndex: 1,
        explanation: 'The topic particle は (wa) is used to introduce the speaker as the topic: わたしは [Name] です。'
      },
      {
        id: 2,
        question: 'としょかんで 本 ___ よみます。',
        context: 'I read books at the library.',
        options: ['に', 'で', 'を', 'と'],
        correctIndex: 2,
        explanation: 'The particle を (o) marks the direct object (本 - book) being read.'
      },
      {
        id: 3,
        question: '日曜日 ___ ともだちと えいがを みました。',
        context: 'On Sunday, I watched a movie with my friend.',
        options: ['で', 'を', 'へ', 'に'],
        correctIndex: 3,
        explanation: 'Specific days of the week take the time particle に (ni): 日曜日に (on Sunday).'
      },
      {
        id: 4,
        question: 'くるま ___ 東京へ 行きました。',
        context: 'I went to Tokyo by car.',
        options: ['で', 'に', 'を', 'から'],
        correctIndex: 0,
        explanation: 'The particle で (de) indicates the means of transportation (by car = くるまで).'
      },
      {
        id: 5,
        question: '教室に 田中先生 ___ います。',
        context: 'Teacher Tanaka is in the classroom.',
        options: ['を', 'が', 'で', 'へ'],
        correctIndex: 1,
        explanation: 'Existence verbs (います / あります) take が (ga) to mark the subject that exists.'
      },
      {
        id: 6,
        question: 'きのうは どこ ___ 行きませんでした。',
        context: 'Yesterday, I did not go anywhere.',
        options: ['でも', 'をも', 'へも', 'かも'],
        correctIndex: 2,
        explanation: 'Question word + へも + negative verb means "nowhere / to nowhere": どこへも行きませんでした。'
      },
      {
        id: 7,
        question: 'あした いっしょに お茶を ___。',
        context: 'Would you like to drink tea together tomorrow? (Polite invitation)',
        options: ['のみましょうか', 'のみたいです', 'のみます', 'のみませんか'],
        correctIndex: 3,
        explanation: 'Verb-ません + か is the standard polite formula used to invite someone to do an activity together.'
      },
      {
        id: 8,
        question: 'この 部屋は ___ です。',
        context: 'This room is quiet.',
        options: ['しずか', 'しずかな', 'しずかだ', 'しずかくて'],
        correctIndex: 0,
        explanation: 'Before です, Na-adjectives drop the "na": しずかです (is quiet).'
      },
      {
        id: 9,
        question: '写真を ___ ください。',
        context: 'Please take a photo.',
        options: ['とる', 'とって', 'とり', 'とった'],
        correctIndex: 1,
        explanation: 'Requests use the Te-form of the verb + ください: とってください (Please take).'
      },
      {
        id: 10,
        question: '日本料理を ___ ことが あります。',
        context: 'I have had the experience of eating Japanese food.',
        options: ['たべる', 'たべて', 'たべた', 'たべます'],
        correctIndex: 2,
        explanation: 'The past plain Ta-form + ことがある expresses past life experience: たべたことがある。'
      }
    ]
  },
  'jlpt-n4-grammar': {
    id: 'jlpt-n4-grammar',
    title: 'JLPT N4 Grammar & Sentence Patterns',
    level: 'N4',
    category: 'Grammar (Bunpou)',
    description: 'Test conditionals (~tara, ~ba), potential forms, and giving/receiving actions.',
    timeLimitMinutes: 15,
    questions: [
      {
        id: 1,
        question: '時間が ___、映画を 見に行きましょう。',
        context: 'If we have time, let\'s go see a movie.',
        options: ['あって', 'あったら', 'あるなら', 'あれば'],
        correctIndex: 1,
        explanation: '「~たら」 is the most versatile conditional for casual invitations and sequential "if/when" events.'
      },
      {
        id: 2,
        question: '日本語が すこし ___ ように なりました。',
        context: 'I have become able to speak a little Japanese.',
        options: ['はなす', 'はなして', 'はなせる', 'はなさない'],
        correctIndex: 2,
        explanation: 'Potential verb form + ように + なる indicates acquiring a new ability over time (はなせるようになった).'
      },
      {
        id: 3,
        question: '先生が わたしに 本を ___。',
        context: 'The teacher gave a book to me.',
        options: ['あげました', 'もらいました', 'やりました', 'くださいました'],
        correctIndex: 3,
        explanation: 'When a superior gives something to the speaker, the respectful form of kureru (くださいました) is used.'
      },
      {
        id: 4,
        question: 'あした 雨が ___ かもしれません。',
        context: 'It might rain tomorrow.',
        options: ['ふる', 'ふって', 'ふり', 'ふった'],
        correctIndex: 0,
        explanation: '「~かもしれない」(might / perhaps) follows the plain dictionary form of verbs (ふる).'
      },
      {
        id: 5,
        question: '熱が あるので、きょうは 早く ___。',
        context: 'Because I have a fever, please let me go home early today.',
        options: ['帰ってください', '帰らせてください', '帰りましょう', '帰ればいいです'],
        correctIndex: 1,
        explanation: 'Causative Te-form + ください (帰らせてください) means "Please allow me to go home".'
      }
    ]
  },
  'jlpt-n5-kanji': {
    id: 'jlpt-n5-kanji',
    title: 'JLPT N5 Kanji & Radicals Drill',
    level: 'N5',
    category: 'Kanji (Kanji)',
    description: 'Master foundation N5 Kanji characters, onyomi/kunyomi readings, and essential compounds.',
    timeLimitMinutes: 12,
    questions: [
      {
        id: 1,
        question: '富士山は 日本で いちばん たかい ___ です。',
        context: 'Mount Fuji is the tallest mountain in Japan. (Kanji for mountain)',
        options: ['川', '木', '山', '田'],
        correctIndex: 2,
        explanation: '「山」(yama) means mountain. 「川」 is river, 「木」 is tree, and 「田」 is rice field.'
      },
      {
        id: 2,
        question: '「今週」の よみかたは どれですか。',
        context: 'What is the reading for 「今週」(this week)?',
        options: ['らいしゅう', 'せんしゅう', 'まいしゅう', 'こんしゅう'],
        correctIndex: 3,
        explanation: '「今週」 is read こんしゅう (konshū). らいしゅう is 来週 (next week), and せんしゅう is 先週 (last week).'
      },
      {
        id: 3,
        question: 'かれは 日本の ___ です。',
        context: 'He is a Japanese person. (Kanji for person/hito)',
        options: ['人', '入', '大', '天'],
        correctIndex: 0,
        explanation: '「人」(hito/jin/nin) means person. 日本人 = にほんじん (Japanese person).'
      },
      {
        id: 4,
        question: 'きょうは ___曜日です。',
        context: 'Today is Tuesday. (Kanji for fire / Tuesday)',
        options: ['水', '火', '木', '金'],
        correctIndex: 1,
        explanation: 'Tuesday is 火曜日 (Kayōbi), using the fire Kanji 「火」.'
      },
      {
        id: 5,
        question: '「学校」の よみかたは どれですか。',
        context: 'What is the reading for 「学校」(school)?',
        options: ['がくこう', 'かっこう', 'がっこう', 'がこう'],
        correctIndex: 2,
        explanation: '「学校」 is read がっこう (gakkō) with a small tsu double-consonant assimilation.'
      },
      {
        id: 6,
        question: '本を ___ さつ かいました。',
        context: 'I bought two books. (Kanji for two / ni)',
        options: ['一', '三', '四', '二'],
        correctIndex: 3,
        explanation: '「二」 is the Kanji for number 2 (ni). Books are counted with 冊 (satsu).'
      },
      {
        id: 7,
        question: 'みぎの かんじは どれですか。',
        context: 'Which is the Kanji for "migi" (right direction)?',
        options: ['右', '左', '上', '下'],
        correctIndex: 0,
        explanation: '「右」(migi) means right. 「左」(hidari) means left.'
      },
      {
        id: 8,
        question: '「何時」の よみかたは どれですか。',
        context: 'What is the reading for 「何時」(what time)?',
        options: ['なにじ', 'なんじ', 'いつじ', 'なんとき'],
        correctIndex: 1,
        explanation: 'Before counter 時 (ji), 「何」 is pronounced なん: なんじ (nanji).'
      }
    ]
  },
  'jlpt-n4-vocab': {
    id: 'jlpt-n4-vocab',
    title: 'JLPT N4 Everyday Vocabulary & Expressions',
    level: 'N4',
    category: 'Vocabulary (Goi)',
    description: 'Challenge yourself with essential N4 words for transit, business appointments, and travel.',
    timeLimitMinutes: 15,
    questions: [
      {
        id: 1,
        question: 'あしたの 会議の ___ を します。',
        context: 'I will make preparations for tomorrow\'s meeting.',
        options: ['案内', '準備', '連絡', '遠慮'],
        correctIndex: 1,
        explanation: '「準備」(junbi) means preparation. 会議の準備 (meeting preparations).'
      },
      {
        id: 2,
        question: 'パソコンが ___ しましたから、修理に だします。',
        context: 'The computer broke down, so I am sending it for repair.',
        options: ['事故', '失敗', '故障', '注意'],
        correctIndex: 2,
        explanation: '「故障」(koshō) means mechanical or electrical breakdown/malfunction.'
      },
      {
        id: 3,
        question: '駅の 改札口で ___ を して います。',
        context: 'I am making an appointment / promise at the station ticket gate.',
        options: ['案内', '相談', '紹介', '約束'],
        correctIndex: 3,
        explanation: '「約束」(yakusoku) means promise, appointment, or engagement.'
      },
      {
        id: 4,
        question: 'この 説明は ___ で、よく 分かりません。',
        context: 'This explanation is complicated, so I don\'t understand well.',
        options: ['複雑', '簡単', '親切', '便利'],
        correctIndex: 0,
        explanation: '「複雑」(fukuzatsu) means complicated or intricate.'
      },
      {
        id: 5,
        question: 'メールで ___ を ください。',
        context: 'Please get in touch / send communication by email.',
        options: ['遠慮', '連絡', '招待', '賛成'],
        correctIndex: 1,
        explanation: '「連絡」(renraku) means contact or communication.'
      }
    ]
  },
  'jlpt-n3-grammar': {
    id: 'jlpt-n3-grammar',
    title: 'JLPT N3 Intermediate Grammar Drill',
    level: 'N3',
    category: 'Grammar (Bunpou)',
    description: 'Bridge towards fluency with nuanced intermediate sentence patterns and connectors.',
    timeLimitMinutes: 15,
    questions: [
      {
        id: 1,
        question: '大事な 会議が あるので、休む ___ にはいかない。',
        context: 'Because there is an important meeting, I cannot afford to take a day off.',
        options: ['はず', 'わけ', 'もの', 'こと'],
        correctIndex: 1,
        explanation: '「〜わけにはいかない」 expresses inability to do something due to social or moral duty / strong reason.'
      },
      {
        id: 2,
        question: '兄は まじめな ___、弟は 遊んでばかりいる。',
        context: 'In contrast to my serious older brother, my younger brother only plays around.',
        options: ['によって', 'について', 'のに対して', 'を通じて'],
        correctIndex: 2,
        explanation: '「〜に対して」(ni taishite) highlights direct contrast between two entities.'
      },
      {
        id: 3,
        question: '日本に いる ___、一度 富士山に 登りたいです。',
        context: 'While I am still in Japan, I want to climb Mount Fuji once.',
        options: ['あいだ', 'まえに', 'あとで', 'うちに'],
        correctIndex: 3,
        explanation: '「〜うちに」 indicates taking advantage of a current temporal state before that situation changes.'
      },
      {
        id: 4,
        question: 'さっき 昼ごはんを ___ ばかりなのに、もう お腹が すいた。',
        context: 'Even though I just ate lunch a moment ago, I am already hungry.',
        options: ['食べた', '食べる', '食べて', '食べ'],
        correctIndex: 0,
        explanation: 'Verb past Ta-form + ばかり indicates that an action was completed just a very short time ago.'
      },
      {
        id: 5,
        question: '試験の 結果は インターネット ___ 発表されます。',
        context: 'The exam results will be announced through / via the internet.',
        options: ['に比べて', 'を通じて', 'につれて', 'をはじめ'],
        correctIndex: 1,
        explanation: '「〜を通じて」(o tsūjite) means "through the medium of / via".'
      }
    ]
  }
};
