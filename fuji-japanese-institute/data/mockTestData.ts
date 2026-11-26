export interface MockQuestion {
  id: number;
  section: 'Kanji & Vocab' | 'Grammar' | 'Reading';
  question: string;
  context?: string;
  readingPassage?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface MockExamLevel {
  id: 'N5' | 'N4' | 'N3';
  title: string;
  badge: string;
  description: string;
  durationMinutes: number;
  passingScorePercent: number;
  questions: MockQuestion[];
}

export const MOCK_EXAM_LEVELS: Record<'N5' | 'N4' | 'N3', MockExamLevel> = {
  N5: {
    id: 'N5',
    title: 'JLPT N5 Mini-Exam Simulator',
    badge: 'Beginner Foundation',
    description: '12 authentic questions testing Hiragana, Katakana, basic Kanji, essential particles, and short reading comprehension.',
    durationMinutes: 15,
    passingScorePercent: 60,
    questions: [
      {
        id: 1,
        section: 'Kanji & Vocab',
        question: '「日曜日」の よみかたは どれですか。',
        context: 'What is the reading of Sunday?',
        options: ['げつようび', 'にちようび', 'かようび', 'すいようび'],
        correctIndex: 1,
        explanation: '「日曜日」 is pronounced にちようび (Nichiyōbi). げつようび is Monday and かようび is Tuesday.'
      },
      {
        id: 2,
        section: 'Kanji & Vocab',
        question: 'きょうは ___ が ふっています。',
        context: 'Today it is raining. Choose the Kanji for "ame" (rain).',
        options: ['雪', '風', '雨', '雲'],
        correctIndex: 2,
        explanation: '「雨」(ame) means rain. 「雪」(yuki) is snow, and 「風」(kaze) is wind.'
      },
      {
        id: 3,
        section: 'Kanji & Vocab',
        question: 'いすの ___ に かばんが あります。',
        context: 'There is a bag under the chair. Choose the Kanji for "shita" (under/below).',
        options: ['下', '上', '中', '前'],
        correctIndex: 0,
        explanation: '「下」(shita) means under or below. 「上」(ue) means above/on top.'
      },
      {
        id: 4,
        section: 'Kanji & Vocab',
        question: '教室に がくせいが ___ います。',
        context: 'There are two students in the classroom. Choose the counter for 2 people.',
        options: ['いちにん', 'ふたつ', 'ふたにん', 'ふたり'],
        correctIndex: 3,
        explanation: 'Two people is an irregular counter reading: 二人 (ふたり - futari).'
      },
      {
        id: 5,
        section: 'Grammar',
        question: '毎朝 7時 ___ 起きます。',
        context: 'I wake up at 7 o\'clock every morning.',
        options: ['で', 'に', 'を', 'へ'],
        correctIndex: 1,
        explanation: 'Specific points of time take the particle に (ni): 7時に (at 7 o\'clock).'
      },
      {
        id: 6,
        section: 'Grammar',
        question: 'レストラン ___ ともだちと ご飯を 食べました。',
        context: 'I ate a meal with a friend at a restaurant.',
        options: ['に', 'へ', 'で', 'を'],
        correctIndex: 2,
        explanation: 'The location where an action takes place is marked with particle で (de).'
      },
      {
        id: 7,
        section: 'Grammar',
        question: 'ここに あなたの なまえを ___ ください。',
        context: 'Please write your name here.',
        options: ['書いて', '書く', '書き', '書いた'],
        correctIndex: 0,
        explanation: 'Polite requests use the verb Te-form + ください: 書いてください (Please write).'
      },
      {
        id: 8,
        section: 'Grammar',
        question: 'きのうは どこへも ___。',
        context: 'Yesterday I did not go anywhere.',
        options: ['行きました', '行きません', '行きませんでした', '行くでした'],
        correctIndex: 2,
        explanation: 'Past negative for polite verbs ends in 〜ませんでした: 行きませんでした (did not go).'
      },
      {
        id: 9,
        section: 'Grammar',
        question: 'これは ___ 車ですね。',
        context: 'This is a new car, isn\'t it?',
        options: ['新しくて', '新しい', '新し', '新しく'],
        correctIndex: 1,
        explanation: 'I-adjectives directly modify nouns in their plain dictionary form: 新しい車 (new car).'
      },
      {
        id: 10,
        section: 'Reading',
        question: '田中さんは 朝 何を食べますか。',
        readingPassage: '田中さんは 毎朝 7時に 起きます。シャワーを 浴びて、パンと 卵を 食べます。それから 8時半に 電車で 会社へ 行きます。会社は 9時から 6時までです。',
        context: 'Read the short passage and answer: What does Tanaka eat in the morning?',
        options: ['ご飯と 魚', 'パンと 卵', '果物と サラダ', '何も 食べない'],
        correctIndex: 1,
        explanation: 'The passage explicitly states: 「パンと 卵を 食べます」(eats bread and eggs).'
      },
      {
        id: 11,
        section: 'Reading',
        question: '田中さんは 何で 会社へ 行きますか。',
        readingPassage: '田中さんは 毎朝 7時に 起きます。シャワーを 浴びて、パンと 卵を 食べます。それから 8時半に 電車で 会社へ 行きます。会社は 9時から 6時までです。',
        context: 'How does Tanaka commute to work?',
        options: ['バスで', '車で', '歩いて', '電車で'],
        correctIndex: 3,
        explanation: 'The text specifies: 「8時半に 電車で 会社へ 行きます」(goes to company by train).'
      },
      {
        id: 12,
        section: 'Reading',
        question: '田中さんの 会社は 何時に 始まりますか。',
        readingPassage: '田中さんは 毎朝 7時に 起きます。シャワーを 浴びて、パンと 卵を 食べます。それから 8時半に 電車で 会社へ 行きます。会社は 9時から 6時までです。',
        context: 'What time does Tanaka\'s company workday start?',
        options: ['9時', '7時', '8時半', '6時'],
        correctIndex: 0,
        explanation: 'The text says: 「会社は 9時から 6時までです」(company is from 9 to 6), so work starts at 9:00.'
      }
    ]
  },
  N4: {
    id: 'N4',
    title: 'JLPT N4 Mini-Exam Simulator',
    badge: 'Basic Conversational',
    description: '12 questions assessing intermediate verb conjugations, conditionals, keigo basics, and workplace comprehension.',
    durationMinutes: 18,
    passingScorePercent: 60,
    questions: [
      {
        id: 1,
        section: 'Kanji & Vocab',
        question: '「案内」の よみかたは どれですか。',
        context: 'What is the reading for "guidance / information"?',
        options: ['あんない', 'ていねい', 'れんらく', 'べんきょう'],
        correctIndex: 0,
        explanation: '「案内」 is pronounced あんない (annai), meaning guide, tour, or information.'
      },
      {
        id: 2,
        section: 'Kanji & Vocab',
        question: '風邪を ひいたので、きょうの 飲み会は ___ します。',
        context: 'Because I caught a cold, I will refrain from attending today\'s drinking party.',
        options: ['準備', '経験', '遠慮', '安心'],
        correctIndex: 2,
        explanation: '「遠慮」(enryo) means to hold back, refrain, or decline politely.'
      },
      {
        id: 3,
        section: 'Kanji & Vocab',
        question: '風で 部屋の ドアが ___。',
        context: 'The room door opened due to the wind. (Intransitive verb)',
        options: ['開けました', '開きました', '閉めました', 'つけました'],
        correctIndex: 1,
        explanation: 'ドアが開く (aku) is the intransitive pair: the door opened on its own.'
      },
      {
        id: 4,
        section: 'Kanji & Vocab',
        question: '国へ 手紙を ___。',
        context: 'I send a letter to my home country. Choose the Kanji for "okuru" (send).',
        options: ['届る', '渡る', '持る', '送る'],
        correctIndex: 3,
        explanation: '「送る」(okuru) means to send or transmit.'
      },
      {
        id: 5,
        section: 'Grammar',
        question: 'あした 雨が ___、出かけません。',
        context: 'If it rains tomorrow, I will not go out.',
        options: ['ふったら', 'ふって', 'ふれば', 'ふるなら'],
        correctIndex: 0,
        explanation: 'The past conditional 〜たら (ふったら - if it rains) is natural for condition + future intention.'
      },
      {
        id: 6,
        section: 'Grammar',
        question: '先生が わたしに 辞書を ___。',
        context: 'The teacher kindly gave a dictionary to me. (Respectful speech)',
        options: ['あげました', 'もらいました', 'くださいました', 'くれました'],
        correctIndex: 2,
        explanation: 'When a superior gives something to the speaker, the respectful form くださいました is used.'
      },
      {
        id: 7,
        section: 'Grammar',
        question: '勉強した おかげで、漢字が ___ ようになりました。',
        context: 'Thanks to studying, I have become able to read Kanji.',
        options: ['読んだ', '読める', '読む', '読まない'],
        correctIndex: 1,
        explanation: 'Potential verb (読める - can read) + ようになる indicates acquiring a new ability.'
      },
      {
        id: 8,
        section: 'Grammar',
        question: '気分が 悪いので、早く ___ ください。',
        context: 'Because I feel unwell, please permit me to go home early.',
        options: ['帰って', '帰らせて', '帰りたくて', '帰れば'],
        correctIndex: 1,
        explanation: 'Causative Te-form + ください (帰らせてください) politely requests permission: "please let me go home".'
      },
      {
        id: 9,
        section: 'Grammar',
        question: '用事が ___ ので、お先に 失礼します。',
        context: 'Because I have an errand, I will take my leave first.',
        options: ['ある', 'あって', 'あったら', 'あり'],
        correctIndex: 0,
        explanation: 'The explanatory conjunction 〜ので takes the plain dictionary form of verbs (ある).'
      },
      {
        id: 10,
        section: 'Reading',
        question: '東京から 京都まで 新幹線で どのくらい かかりましたか。',
        readingPassage: '先週の土曜日、友人と京都へ行きました。東京から新幹線で2時間半かかりました。清水寺や金閣寺を見て、夜は京都の有名な豆腐料理を食べました。日曜日の夕方、お土産に八ツ橋を買って新幹線で東京へ帰りました。',
        context: 'How long did the Shinkansen ride take from Tokyo to Kyoto?',
        options: ['1時間半', '2時間半', '3時間', '半日'],
        correctIndex: 1,
        explanation: 'The text clearly specifies: 「新幹線で2時間半かかりました」(took 2 and a half hours).'
      },
      {
        id: 11,
        section: 'Reading',
        question: '土曜日の夜、何を食べましたか。',
        readingPassage: '先週の土曜日、友人と京都へ行きました。東京から新幹線で2時間半かかりました。清水寺や金閣寺を見て、夜は京都の有名な豆腐料理を食べました。日曜日の夕方、お土産に八ツ橋を買って新幹線で東京へ帰りました。',
        context: 'What did they eat on Saturday night?',
        options: ['八ツ橋', 'ラーメン', 'すし', '豆腐料理'],
        correctIndex: 3,
        explanation: 'The text records: 「夜は京都の有名な豆腐料理を食べました」(ate Kyoto\'s famous tofu cuisine at night).'
      },
      {
        id: 12,
        section: 'Reading',
        question: 'お土産に 何を 買いましたか。',
        readingPassage: '先週の土曜日、友人と京都へ行きました。東京から新幹線で2時間半かかりました。清水寺や金閣寺を見て、夜は京都の有名な豆腐料理を食べました。日曜日の夕方、お土産に八ツ橋を買って新幹線で東京へ帰りました。',
        context: 'What souvenir did they buy before heading home?',
        options: ['八ツ橋', 'お茶', '着物', 'お守り'],
        correctIndex: 0,
        explanation: 'The text says: 「お土産に八ツ橋を買って」(bought Yatsuhashi as a souvenir).'
      }
    ]
  },
  N3: {
    id: 'N3',
    title: 'JLPT N3 Mini-Exam Simulator',
    badge: 'Intermediate & IT Japanese',
    description: '12 questions testing intermediate nuance, contrastive discourse, professional workplace expressions, and workplace articles.',
    durationMinutes: 20,
    passingScorePercent: 60,
    questions: [
      {
        id: 1,
        section: 'Kanji & Vocab',
        question: '「複雑」の よみかたは どれですか。',
        context: 'What is the reading of the Kanji for "complex / complicated"?',
        options: ['ふくざつ', 'ふくさつ', 'ふくしょう', 'ふくぜつ'],
        correctIndex: 0,
        explanation: '「複雑」 is read ふくざつ (fukuzatsu).'
      },
      {
        id: 2,
        section: 'Kanji & Vocab',
        question: 'プロジェクトの ___ は 来週の金曜日です。',
        context: 'The project deadline is next Friday.',
        options: ['片付け', '打ち合わせ', '締め切り', '問い合わせ'],
        correctIndex: 2,
        explanation: '「締め切り」(shimekiri) means deadline or closing date.'
      },
      {
        id: 3,
        section: 'Kanji & Vocab',
        question: '長年の 努力が 実を結び、ついに 実験が ___ した。',
        context: 'Years of effort bore fruit, and the experiment finally succeeded. (Kanji for seikou)',
        options: ['成功', '成幸', '晴功', '清好'],
        correctIndex: 0,
        explanation: '「成功」(seikō) means success or accomplishment.'
      },
      {
        id: 4,
        section: 'Kanji & Vocab',
        question: 'システムエラーの 原因を 突き止め、無事に 問題を ___ した。',
        context: 'We pinned down the root cause of the system error and safely solved the problem.',
        options: ['破壊', '製造', '混雑', '解決'],
        correctIndex: 3,
        explanation: '「解決する」(kaiketsu suru) means to solve, resolve, or settle an issue.'
      },
      {
        id: 5,
        section: 'Grammar',
        question: 'これは クライアントとの 重要な 契約だから、失敗する ___。',
        context: 'Because this is a critical contract with a client, I cannot afford to fail.',
        options: ['はずがない', 'わけにはいかない', 'ことになっている', 'に違いない'],
        correctIndex: 1,
        explanation: '「〜わけにはいかない」 expresses inability to do something due to grave social responsibility or consequence.'
      },
      {
        id: 6,
        section: 'Grammar',
        question: '兄は まじめで 静かな ___、弟は 社交的で よく話す。',
        context: 'In contrast to my serious and quiet older brother, my younger brother is sociable and talks a lot.',
        options: ['につれて', 'によって', 'に対して', 'を通じて'],
        correctIndex: 2,
        explanation: '「〜に対して」(ni taishite) draws a direct contrast between two distinct entities.'
      },
      {
        id: 7,
        section: 'Grammar',
        question: '日本に 滞在している ___、できるだけ 多くの 観光地を 訪れたい。',
        context: 'While I am staying in Japan, I want to visit as many sightseeing spots as possible.',
        options: ['うちに', 'あいだに', 'まえに', 'あとで'],
        correctIndex: 0,
        explanation: '「〜うちに」 indicates making use of a current temporary condition before that situation expires.'
      },
      {
        id: 8,
        section: 'Grammar',
        question: 'この パソコンは 値段が 高い ___、動作が 遅い。',
        context: 'Considering its high price, this computer is surprisingly slow.',
        options: ['とおりに', 'わりに', 'ために', 'くせに'],
        correctIndex: 1,
        explanation: '「〜わりに」(warini) expresses that an outcome deviates unexpectedly from the benchmark/expectation.'
      },
      {
        id: 9,
        section: 'Grammar',
        question: '知人を ___、新しい IT企業に 転職することが できた。',
        context: 'Through an acquaintance, I was able to change jobs to a new IT firm.',
        options: ['について', 'にとって', 'を通じて', 'にかぎって'],
        correctIndex: 2,
        explanation: '「〜を通じて」(o tsūjite) expresses that something was achieved through an intermediary or medium.'
      },
      {
        id: 10,
        section: 'Reading',
        question: 'リモートワークの 普及によって、特に 何が 重視されるように なりましたか。',
        readingPassage: '最近、日本のIT企業ではリモートワークが急速に普及している。しかし、対面で会わない分、ビジネスチャットやメールでの丁寧な言葉遣い（敬語）や、迅速な返信が以前よりも重視されるようになった。情報共有が滞ると開発プロジェクト全体に遅れが生じるため、毎日の短い朝会（スタンドアップ）で進捗を確認する企業が多い。',
        context: 'What has become especially emphasized due to remote work?',
        options: ['毎日の出社義務', '丁寧な言葉遣いや素早い返信', '残業時間の増加', '書類の手書き提出'],
        correctIndex: 1,
        explanation: 'The text highlights: 「丁寧な言葉遣い（敬語）や、迅速な返信が以前よりも重視されるようになった」(polite language and prompt replies are emphasized).'
      },
      {
        id: 11,
        section: 'Reading',
        question: 'なぜ 多くの企業が 毎朝 スタンドアップ（朝会）を 行っていますか。',
        readingPassage: '最近、日本のIT企業ではリモートワークが急速に普及している。しかし、対面で会わない分、ビジネスチャットやメールでの丁寧な言葉遣い（敬語）や、迅速な返信が以前よりも重視されるようになった。情報共有が滞ると開発プロジェクト全体に遅れが生じるため、毎日の短い朝会（スタンドアップ）で進捗を確認する企業が多い。',
        context: 'Why do many companies hold a short daily morning standup?',
        options: ['日本語の試験を行うため', '社員を監視するため', '情報共有の滞りを防ぎ進捗を確認するため', '会議時間を長くするため'],
        correctIndex: 2,
        explanation: 'The text states that to prevent delays from blocked information sharing: 「毎日の短い朝会（スタンドアップ）で進捗を確認する企業が多い」。'
      },
      {
        id: 12,
        section: 'Reading',
        question: 'この 文章の 主題として 最も適切なものは どれですか。',
        readingPassage: '最近、日本のIT企業ではリモートワークが急速に普及している。しかし、対面で会わない分、ビジネスチャットやメールでの丁寧な言葉遣い（敬語）や、迅速な返信が以前よりも重視されるようになった。情報共有が滞ると開発プロジェクト全体に遅れが生じるため、毎日の短い朝会（スタンドアップ）で進捗を確認する企業が多い。',
        context: 'What is the main theme of this passage?',
        options: ['日本IT企業のリモートワーク環境とコミュニケーションの要点', 'リモートワークを廃止すべき理由', '敬語を使わなくてよい新しいIT文化', 'プログラミング言語の選び方'],
        correctIndex: 0,
        explanation: 'The passage analyzes remote work trends and the elevated importance of polite, prompt communication in Japanese tech companies.'
      }
    ]
  }
};
