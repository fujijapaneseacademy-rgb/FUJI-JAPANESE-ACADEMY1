import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Volume2, Sparkles, CheckCircle2, XCircle, Download,
  Flame, BookOpen, Clock, FileText, ArrowRight, HelpCircle, Target
} from 'lucide-react';
import { cn } from '../lib/utils';

export interface DailyVocabularyItem {
  day: number;
  kanji: string;
  furigana: string;
  romaji: string;
  meaning: string;
  jlptLevel: 'N5' | 'N4' | 'N3';
  partOfSpeech: string;
  sentenceJapanese: string;
  sentenceRomaji: string;
  sentenceEnglish: string;
}

export const MONTHLY_DAILY_VOCABULARY: DailyVocabularyItem[] = [
  {
    day: 1,
    kanji: '希望',
    furigana: 'きぼう',
    romaji: 'kibou',
    meaning: 'Hope / Aspiration',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: '日本で 働く 希望が あります。',
    sentenceRomaji: 'Nihon de hataraku kibou ga arimasu.',
    sentenceEnglish: 'I have the hope of working in Japan.'
  },
  {
    day: 2,
    kanji: '挑戦',
    furigana: 'ちょうせん',
    romaji: 'chousen',
    meaning: 'Challenge / Undertaking',
    jlptLevel: 'N3',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: '新しい 言語に 挑戦します。',
    sentenceRomaji: 'Atarashii gengo ni chousen shimasu.',
    sentenceEnglish: 'I will take on the challenge of a new language.'
  },
  {
    day: 3,
    kanji: '桜',
    furigana: 'さくら',
    romaji: 'sakura',
    meaning: 'Cherry Blossom',
    jlptLevel: 'N5',
    partOfSpeech: 'Noun',
    sentenceJapanese: '春に 桜が 美しく 咲きます。',
    sentenceRomaji: 'Haru ni sakura ga utsukushiku sakimasu.',
    sentenceEnglish: 'Cherry blossoms bloom beautifully in spring.'
  },
  {
    day: 4,
    kanji: '努力',
    furigana: 'どりょく',
    romaji: 'doryoku',
    meaning: 'Effort / Dedication',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: '毎日の 努力が 大切です。',
    sentenceRomaji: 'Mainichi no doryoku ga taisetsu desu.',
    sentenceEnglish: 'Daily dedication is essential.'
  },
  {
    day: 5,
    kanji: '友達',
    furigana: 'ともだち',
    romaji: 'tomodachi',
    meaning: 'Friend',
    jlptLevel: 'N5',
    partOfSpeech: 'Noun',
    sentenceJapanese: 'クラスで 新しい 友達が できました。',
    sentenceRomaji: 'Kurasu de atarashii tomodachi ga dekimashita.',
    sentenceEnglish: 'I made new friends in class.'
  },
  {
    day: 6,
    kanji: '会話',
    furigana: 'かいわ',
    romaji: 'kaiwa',
    meaning: 'Conversation / Dialogue',
    jlptLevel: 'N5',
    partOfSpeech: 'Noun',
    sentenceJapanese: '先生と 日本語で 会話を しました。',
    sentenceRomaji: 'Sensei to Nihongo de kaiwa wo shimashita.',
    sentenceEnglish: 'I practiced conversation in Japanese with my teacher.'
  },
  {
    day: 7,
    kanji: '未来',
    furigana: 'みらい',
    romaji: 'mirai',
    meaning: 'Future (Distant/Global)',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun',
    sentenceJapanese: '明るい 未来を 目指します。',
    sentenceRomaji: 'Akarui mirai wo mezashimasu.',
    sentenceEnglish: 'We aim for a bright future.'
  },
  {
    day: 8,
    kanji: '成功',
    furigana: 'せいこう',
    romaji: 'seikou',
    meaning: 'Success',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: 'JLPT試験に 成功しました！',
    sentenceRomaji: 'JLPT shiken ni seikou shimashita!',
    sentenceEnglish: 'I succeeded in the JLPT exam!'
  },
  {
    day: 9,
    kanji: '技術',
    furigana: 'ぎじゅつ',
    romaji: 'gijutsu',
    meaning: 'Technology / Technique',
    jlptLevel: 'N3',
    partOfSpeech: 'Noun',
    sentenceJapanese: '日本の 最新 技術を 学びたいです。',
    sentenceRomaji: 'Nihon no saishin gijutsu wo manabitai desu.',
    sentenceEnglish: 'I want to study Japan\'s cutting-edge technology.'
  },
  {
    day: 10,
    kanji: '勉強',
    furigana: 'べんきょう',
    romaji: 'benkyou',
    meaning: 'Study / Learning',
    jlptLevel: 'N5',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: '毎日 二時間 日本語を 勉強します。',
    sentenceRomaji: 'Mainichi ni-jikan Nihongo wo benkyou shimasu.',
    sentenceEnglish: 'I study Japanese for two hours every day.'
  },
  {
    day: 11,
    kanji: '感謝',
    furigana: 'かんしゃ',
    romaji: 'kansha',
    meaning: 'Gratitude / Thankfulness',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: '先生の 指導に 感謝します。',
    sentenceRomaji: 'Sensei no shidou ni kansha shimasu.',
    sentenceEnglish: 'I am deeply grateful for the teacher\'s guidance.'
  },
  {
    day: 12,
    kanji: '文化',
    furigana: 'ぶんか',
    romaji: 'bunka',
    meaning: 'Culture',
    jlptLevel: 'N5',
    partOfSpeech: 'Noun',
    sentenceJapanese: '日本の 伝統 文化は 興味深いです。',
    sentenceRomaji: 'Nihon no dentou bunka wa kyoumibukai desu.',
    sentenceEnglish: 'Traditional Japanese culture is deeply fascinating.'
  },
  {
    day: 13,
    kanji: '仕事',
    furigana: 'しごと',
    romaji: 'shigoto',
    meaning: 'Work / Job',
    jlptLevel: 'N5',
    partOfSpeech: 'Noun',
    sentenceJapanese: '東京の IT企業で 仕事を しています。',
    sentenceRomaji: 'Tokyo no IT kigyou de shigoto wo shite imasu.',
    sentenceEnglish: 'I am working at an IT enterprise in Tokyo.'
  },
  {
    day: 14,
    kanji: '準備',
    furigana: 'じゅんび',
    romaji: 'junbi',
    meaning: 'Preparation',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: '面接の 準備を しっかり 行います。',
    sentenceRomaji: 'Mensetsu no junbi wo shikkari okonaimasu.',
    sentenceEnglish: 'I thoroughly prepare for the interview.'
  },
  {
    day: 15,
    kanji: '理解',
    furigana: 'りかい',
    romaji: 'rikai',
    meaning: 'Comprehension / Understanding',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: '文法の ルールを 理解しました。',
    sentenceRomaji: 'Bumpou no ruuru wo rikai shimashita.',
    sentenceEnglish: 'I understood the grammatical rule.'
  },
  {
    day: 16,
    kanji: '約束',
    furigana: 'やくそく',
    romaji: 'yakusoku',
    meaning: 'Promise / Appointment',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: '午後三時に 約束が あります。',
    sentenceRomaji: 'Gogo san-ji ni yakusoku ga arimasu.',
    sentenceEnglish: 'I have an appointment at 3:00 PM.'
  },
  {
    day: 17,
    kanji: '習慣',
    furigana: 'しゅうかん',
    romaji: 'shuukan',
    meaning: 'Habit / Custom',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun',
    sentenceJapanese: '毎日 単語を 覚える 習慣を つけましょう。',
    sentenceRomaji: 'Mainichi tango wo oboeru shuukan wo tsukemashou.',
    sentenceEnglish: 'Let\'s build the habit of memorizing vocabulary daily.'
  },
  {
    day: 18,
    kanji: '笑顔',
    furigana: 'えがお',
    romaji: 'egao',
    meaning: 'Smiling Face / Smile',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun',
    sentenceJapanese: '笑顔で 挨拶を しましょう。',
    sentenceRomaji: 'Egao de aisatsu wo shimashou.',
    sentenceEnglish: 'Let\'s greet people with a warm smile.'
  },
  {
    day: 19,
    kanji: '時間',
    furigana: 'じかん',
    romaji: 'jikan',
    meaning: 'Time / Hours',
    jlptLevel: 'N5',
    partOfSpeech: 'Noun',
    sentenceJapanese: '時間は 大切な 宝物です。',
    sentenceRomaji: 'Jikan wa taisetsu na takaramono desu.',
    sentenceEnglish: 'Time is a precious treasure.'
  },
  {
    day: 20,
    kanji: '大切',
    furigana: 'たいせつ',
    romaji: 'taisetsu',
    meaning: 'Important / Precious',
    jlptLevel: 'N5',
    partOfSpeech: 'Na-adjective',
    sentenceJapanese: '健康が 最も 大切です。',
    sentenceRomaji: 'Kenkou ga mottomo taisetsu desu.',
    sentenceEnglish: 'Health is the most important thing.'
  },
  {
    day: 21,
    kanji: '発音',
    furigana: 'はつおん',
    romaji: 'hatsuon',
    meaning: 'Pronunciation',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: 'ネイティブの 発音を 聞いて 練習します。',
    sentenceRomaji: 'Neitibu no hatsuon wo kiite renshuu shimasu.',
    sentenceEnglish: 'I practice by listening to native pronunciation.'
  },
  {
    day: 22,
    kanji: '安心',
    furigana: 'あんしん',
    romaji: 'anshin',
    meaning: 'Peace of mind / Relief',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: '合格して 安心しました。',
    sentenceRomaji: 'Goukaku shite anshin shimashita.',
    sentenceEnglish: 'I was relieved after passing.'
  },
  {
    day: 23,
    kanji: '旅行',
    furigana: 'りょこう',
    romaji: 'ryokou',
    meaning: 'Travel / Trip',
    jlptLevel: 'N5',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: 'いつか 京都へ 旅行したいです。',
    sentenceRomaji: 'Itsuka Kyoto e ryokou shitai desu.',
    sentenceEnglish: 'I want to travel to Kyoto someday.'
  },
  {
    day: 24,
    kanji: '敬語',
    furigana: 'けいご',
    romaji: 'keigo',
    meaning: 'Honorific / Polite Japanese',
    jlptLevel: 'N3',
    partOfSpeech: 'Noun',
    sentenceJapanese: '日本の ビジネスでは 敬語を 使います。',
    sentenceRomaji: 'Nihon no bijinesu dewa keigo wo tsukaimasu.',
    sentenceEnglish: 'In Japanese business, we use polite honorific speech.'
  },
  {
    day: 25,
    kanji: '自然',
    furigana: 'しぜん',
    romaji: 'shizen',
    meaning: 'Nature / Natural',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun / Na-adjective',
    sentenceJapanese: '富士山の 周りには 美しい 自然が あります。',
    sentenceRomaji: 'Fujisan no mawari niwa utsukushii shizen ga arimasu.',
    sentenceEnglish: 'Around Mount Fuji, there is beautiful nature.'
  },
  {
    day: 26,
    kanji: '経験',
    furigana: 'けいけん',
    romaji: 'keiken',
    meaning: 'Experience',
    jlptLevel: 'N4',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: '日本での 生活は 素晴らしい 経験です。',
    sentenceRomaji: 'Nihon de no seikatsu wa subarashii keiken desu.',
    sentenceEnglish: 'Life in Japan is a wonderful experience.'
  },
  {
    day: 27,
    kanji: '丁寧',
    furigana: 'ていねい',
    romaji: 'teinei',
    meaning: 'Polite / Courteous',
    jlptLevel: 'N4',
    partOfSpeech: 'Na-adjective',
    sentenceJapanese: '丁寧な 言葉遣いを 心がけます。',
    sentenceRomaji: 'Teinei na kotobazukai wo kokorogakemasu.',
    sentenceEnglish: 'I strive to use courteous phrasing.'
  },
  {
    day: 28,
    kanji: '成長',
    furigana: 'せいちょう',
    romaji: 'seichou',
    meaning: 'Growth / Development',
    jlptLevel: 'N3',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: '毎日 少しずつ 成長しています。',
    sentenceRomaji: 'Mainichi sukoshizutsu seichou shite imasu.',
    sentenceEnglish: 'I am growing little by little every day.'
  },
  {
    day: 29,
    kanji: '仲間',
    furigana: 'なかま',
    romaji: 'nakama',
    meaning: 'Companion / Teammate',
    jlptLevel: 'N3',
    partOfSpeech: 'Noun',
    sentenceJapanese: 'クラスの 仲間と 一緒に 勉強します。',
    sentenceRomaji: 'Kurasu no nakama to issho ni benkyou shimasu.',
    sentenceEnglish: 'I study together with my classroom peers.'
  },
  {
    day: 30,
    kanji: '夢',
    furigana: 'ゆめ',
    romaji: 'yume',
    meaning: 'Dream',
    jlptLevel: 'N5',
    partOfSpeech: 'Noun',
    sentenceJapanese: '私の 夢は 日本で エンジニアに なることです。',
    sentenceRomaji: 'Watashi no yume wa Nihon de enjinia ni naru koto desu.',
    sentenceEnglish: 'My dream is to become an engineer in Japan.'
  },
  {
    day: 31,
    kanji: '完成',
    furigana: 'かんせい',
    romaji: 'kansei',
    meaning: 'Completion',
    jlptLevel: 'N3',
    partOfSpeech: 'Noun / Suru-verb',
    sentenceJapanese: 'JLPT N5 コースを 完成しました！',
    sentenceRomaji: 'JLPT N5 koosu wo kansei shimashita!',
    sentenceEnglish: 'I have completed the JLPT N5 course!'
  }
];

export const DAILY_PARTICLE_DRILLS = [
  {
    prompt: '京都 ______ 新幹線で 行きます。',
    promptEnglish: 'I will go to Kyoto by Shinkansen (bullet train).',
    options: ['へ (e)', 'を (wo)', 'で (de)', 'が (ga)'],
    correct: 0,
    explanation: 'The particle へ (pronounced "e") indicates the direction or destination of movement (towards Kyoto).'
  },
  {
    prompt: '朝ごはん ______ パンを 食べました。',
    promptEnglish: 'For breakfast, I ate bread.',
    options: ['で (de)', 'に (ni)', 'は (wa)', 'を (wo)'],
    correct: 1,
    explanation: 'The particle に indicates the purpose or time frame category (as / for breakfast).'
  },
  {
    prompt: 'ペン ______ 手紙を 書きます。',
    promptEnglish: 'I write a letter with/using a pen.',
    options: ['に (ni)', 'と (to)', 'で (de)', 'を (wo)'],
    correct: 2,
    explanation: 'The particle で specifies the tool, instrument, or means by which an action is performed (with a pen).'
  },
  {
    prompt: '田中さん ______ 一緒に カフェへ 行きました。',
    promptEnglish: 'I went to the cafe together with Tanaka-san.',
    options: ['に (ni)', 'で (de)', 'は (wa)', 'と (to)'],
    correct: 3,
    explanation: 'The particle と denotes accompaniment ("together with [person]").'
  }
];

export const DOWNLOADABLE_STUDY_CARDS = [
  {
    id: 'kanji-workbook',
    title: 'JLPT N5 103 Kanji Complete Stroke-Order Guide',
    format: 'PDF • 28 Pages',
    size: '4.2 MB',
    tag: 'Foundational',
    link: '/courses/free',
    description: 'Every official JLPT N5 Kanji with stroke sequence, On/Kun readings, and writing practice grids.'
  },
  {
    id: 'particle-matrix',
    title: 'Essential Japanese Particles Cheat-Sheet',
    format: 'PDF • 6 Pages',
    size: '1.8 MB',
    tag: 'Grammar Master',
    link: '/learn/grammar',
    description: 'Quick-reference matrix comparing は vs が, に vs で, and directional particles with visual examples.'
  },
  {
    id: 'tokyo-it-standup',
    title: 'Tokyo IT Engineers Standup & Agile Vocabulary',
    format: 'PDF • 12 Pages',
    size: '2.5 MB',
    tag: 'Career Special',
    link: '/career',
    description: 'Bilingual Japanese IT phrases for daily Scrum, pull request reviews, deployment, and Slack etiquette.'
  },
  {
    id: 'rirekisho-template',
    title: 'Standard Japanese Resume (Rirekisho) Blank Form',
    format: 'DOCX & PDF • 4 Pages',
    size: '1.2 MB',
    tag: 'Job Application',
    link: '/careers/apply',
    description: 'Standard Japan Ministry of Health, Labour and Welfare format resume template ready for editing.'
  }
];

interface DailyStudyResourceHubProps {
  className?: string;
}

export const DailyStudyResourceHub: React.FC<DailyStudyResourceHubProps> = ({
  className = ''
}) => {
  // Current day index (1-31)
  const [dayOfMonth, setDayOfMonth] = useState<number>(1);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [streakCount, setStreakCount] = useState<number>(1);

  // Particle drill state
  const [selectedParticleOpt, setSelectedParticleOpt] = useState<number | null>(null);
  const [hasAnsweredDrill, setHasAnsweredDrill] = useState(false);

  // Initialize day and streak tracking safely on client
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const today = new Date();
      const currentDay = today.getDate();
      setDayOfMonth(currentDay);

      // Manage Study Streak in localStorage
      const todayString = today.toISOString().split('T')[0];
      const savedDate = localStorage.getItem('fuji_last_study_date');
      const savedStreak = parseInt(localStorage.getItem('fuji_study_streak') || '1', 10);

      if (savedDate) {
        const lastDate = new Date(savedDate);
        const diffDays = Math.round((today.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

        if (diffDays === 1) {
          // Consecutive day visit!
          const newStreak = savedStreak + 1;
          setStreakCount(newStreak);
          localStorage.setItem('fuji_study_streak', newStreak.toString());
          localStorage.setItem('fuji_last_study_date', todayString);
        } else if (diffDays === 0) {
          // Same day visit
          setStreakCount(savedStreak);
        } else {
          // Streak reset
          setStreakCount(1);
          localStorage.setItem('fuji_study_streak', '1');
          localStorage.setItem('fuji_last_study_date', todayString);
        }
      } else {
        localStorage.setItem('fuji_study_streak', '1');
        localStorage.setItem('fuji_last_study_date', todayString);
      }
    } catch {
      // LocalStorage error resilience
    }
  }, []);

  const currentVocab = MONTHLY_DAILY_VOCABULARY[(dayOfMonth - 1) % MONTHLY_DAILY_VOCABULARY.length] || MONTHLY_DAILY_VOCABULARY[0];
  const currentDrill = DAILY_PARTICLE_DRILLS[(dayOfMonth - 1) % DAILY_PARTICLE_DRILLS.length];

  const handlePlayAudio = () => {
    if (isPlayingAudio) return;
    setIsPlayingAudio(true);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentVocab.kanji + '。' + currentVocab.sentenceJapanese);
        utterance.lang = 'ja-JP';
        utterance.rate = 0.85;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      } catch {
        setIsPlayingAudio(false);
      }
    } else {
      setTimeout(() => setIsPlayingAudio(false), 1200);
    }
  };

  const handleParticleOptionSelect = (idx: number) => {
    if (hasAnsweredDrill) return;
    setSelectedParticleOpt(idx);
    setHasAnsweredDrill(true);
  };

  return (
    <div className={cn("w-full space-y-8", className)}>
      {/* Top Banner: Daily Habit & Streak */}
      <div className="bg-gradient-to-r from-fuji-indigo via-[#261f58] to-[#1a153f] p-6 sm:p-8 rounded-3xl text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-fuji-red/15 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-amber-300 mb-2">
              <Sparkles className="w-3.5 h-3.5" /> Daily Japanese Practice Engine
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-bold">
              Today’s Study Hub &amp; Micro-Practice
            </h2>
            <p className="text-gray-300 text-xs sm:text-sm mt-1 max-w-xl">
              Rotate through 30+ JLPT core Kanji, challenge today’s 60-second particle drill, and download authoritative study worksheets.
            </p>
          </div>

          {/* Streak Flame Badge */}
          <div className="flex items-center gap-3.5 bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/15 shadow-inner">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 to-fuji-red flex items-center justify-center text-white shadow-md animate-pulse">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] text-gray-300 uppercase tracking-widest font-bold block">Study Streak</span>
              <span className="text-base font-bold text-amber-300">
                {streakCount}-Day Practice Streak! 🔥
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Word of the Day + 60s Particle Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Word of the Day (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-fuji-red animate-ping" />
                <span className="text-xs font-bold uppercase tracking-wider text-fuji-slate/70">
                  Word &amp; Kanji of the Day (Day {dayOfMonth})
                </span>
              </div>
              <span className="text-xs font-bold text-fuji-indigo bg-fuji-indigo/10 px-3 py-1 rounded-full">
                JLPT {currentVocab.jlptLevel}
              </span>
            </div>

            {/* Main Word Display */}
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-6">
              <div>
                <ruby className="text-4xl sm:text-5xl font-display font-bold text-fuji-indigo tracking-wider leading-none">
                  {currentVocab.kanji}
                  <rt className="text-sm font-sans text-fuji-red font-medium tracking-normal mb-1">
                    {currentVocab.furigana}
                  </rt>
                </ruby>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-xs font-mono text-fuji-slate/60 font-semibold">{currentVocab.romaji}</span>
                  <span className="text-xs text-gray-300">•</span>
                  <span className="text-xs text-fuji-slate/70 italic">{currentVocab.partOfSpeech}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handlePlayAudio}
                disabled={isPlayingAudio}
                className={cn(
                  "p-3 rounded-2xl flex items-center gap-2 text-xs font-bold transition-all shadow-sm cursor-pointer",
                  isPlayingAudio
                    ? "bg-fuji-red text-white scale-95"
                    : "bg-red-50 text-fuji-red hover:bg-red-100"
                )}
                title="Listen to native Japanese pronunciation"
              >
                <Volume2 className={cn("w-4 h-4", isPlayingAudio && "animate-spin")} />
                <span>{isPlayingAudio ? 'Playing...' : 'Audio Pronunciation'}</span>
              </button>
            </div>

            {/* Meaning & Context */}
            <div className="space-y-4">
              <div className="p-4 bg-slate-50 rounded-2xl border border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-fuji-slate/60 block mb-1">
                  English Meaning
                </span>
                <span className="text-base sm:text-lg font-bold text-fuji-indigo">
                  {currentVocab.meaning}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-gray-100 space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-fuji-slate/60 block mb-1">
                  Example Sentence Usage
                </span>
                <p className="text-sm sm:text-base font-bold text-fuji-slate">
                  {currentVocab.sentenceJapanese}
                </p>
                <p className="text-xs font-mono text-fuji-slate/60">
                  {currentVocab.sentenceRomaji}
                </p>
                <p className="text-xs text-fuji-slate/80 font-medium pt-1 border-t border-gray-200/60">
                  "{currentVocab.sentenceEnglish}"
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs text-fuji-slate/60">
            <span>Rotates every 24 hours at 00:00 IST</span>
            <a href="/learn/vocabulary" className="text-fuji-red font-bold hover:underline inline-flex items-center gap-1">
              <span>View Full N5 Vocabulary Bank</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Right: 60-Second Daily Particle Drill (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-fuji-slate/70 flex items-center gap-2">
                <Target className="w-4 h-4 text-fuji-red" /> 60s Daily Particle Challenge
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                Interactive Drill
              </span>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-gray-100 mb-5">
              <p className="text-lg font-bold text-fuji-indigo leading-relaxed font-sans">
                {currentDrill.prompt}
              </p>
              <p className="text-xs text-fuji-slate/70 mt-1">
                {currentDrill.promptEnglish}
              </p>
            </div>

            {/* Options */}
            <div className="space-y-2.5">
              {currentDrill.options.map((opt, idx) => {
                const isSelected = selectedParticleOpt === idx;
                const isCorrect = currentDrill.correct === idx;
                const showState = hasAnsweredDrill;

                let optClass = "border-gray-200 bg-white hover:border-fuji-red/50 text-fuji-slate";
                if (showState) {
                  if (isCorrect) {
                    optClass = "border-emerald-500 bg-emerald-50 text-emerald-900 font-bold";
                  } else if (isSelected && !isCorrect) {
                    optClass = "border-red-400 bg-red-50 text-red-900";
                  } else {
                    optClass = "border-gray-200 bg-gray-50 opacity-50";
                  }
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    disabled={hasAnsweredDrill}
                    onClick={() => handleParticleOptionSelect(idx)}
                    className={cn(
                      "w-full p-3 rounded-xl border-2 text-left text-sm font-semibold transition-all flex items-center justify-between cursor-pointer",
                      optClass
                    )}
                  >
                    <span>{opt}</span>
                    {showState && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                    {showState && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-500" />}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {hasAnsweredDrill && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-950 space-y-1"
                >
                  <span className="font-bold block">💡 Explanation:</span>
                  <p>{currentDrill.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="pt-4 mt-6 border-t border-gray-100 flex items-center justify-between text-xs">
            <span className="text-fuji-slate/60">New question every morning</span>
            <a href="/learn/grammar" className="text-fuji-red font-bold hover:underline inline-flex items-center gap-1">
              <span>All 40 Particle Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* Free Downloadable Study Guides Vault */}
      <div className="bg-slate-50/80 rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-200 pb-4">
          <div>
            <h3 className="text-xl font-display font-bold text-fuji-indigo">
              Free Downloadable Japanese Study Guides
            </h3>
            <p className="text-xs sm:text-sm text-fuji-slate/70 mt-0.5">
              High-resolution printable PDF workbooks and reference sheets curated by certified senseis.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full w-fit">
            100% Free Downloads
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {DOWNLOADABLE_STUDY_CARDS.map((card) => (
            <div
              key={card.id}
              className="bg-white p-5 rounded-2xl border border-gray-200 hover:border-fuji-red/40 hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-fuji-red bg-red-50 px-2 py-0.5 rounded-md">
                    {card.tag}
                  </span>
                  <span className="text-[10px] text-fuji-slate/60 font-mono">
                    {card.size}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-gray-100 text-fuji-indigo flex items-center justify-center mb-3 group-hover:bg-fuji-indigo group-hover:text-white transition-colors">
                  <FileText className="w-5 h-5" />
                </div>

                <h4 className="text-sm font-bold text-fuji-indigo leading-snug mb-2 group-hover:text-fuji-red transition-colors">
                  {card.title}
                </h4>

                <p className="text-[11px] text-fuji-slate/70 leading-relaxed mb-4">
                  {card.description}
                </p>
              </div>

              <div>
                <a
                  href={card.link}
                  className="w-full py-2.5 px-3 bg-slate-50 hover:bg-fuji-red hover:text-white text-fuji-indigo rounded-xl text-xs font-bold border border-gray-200 hover:border-fuji-red transition-all flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download {card.format.split('•')[0].trim()}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DailyStudyResourceHub;
