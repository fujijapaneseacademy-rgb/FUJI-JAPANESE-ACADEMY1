import React, { useState, useEffect, useMemo } from 'react';
import { Volume2 } from 'lucide-react';

const WORDS = [
  { kanji: '希望', hiragana: 'きぼう', romaji: 'kibou', meaning: 'Hope' },
  { kanji: '家族', hiragana: 'かぞく', romaji: 'kazoku', meaning: 'Family' },
  { kanji: '平和', hiragana: 'へいわ', romaji: 'heiwa', meaning: 'Peace' },
  { kanji: '未来', hiragana: 'みらい', romaji: 'mirai', meaning: 'Future' },
  { kanji: '努力', hiragana: 'どりょく', romaji: 'doryoku', meaning: 'Effort' },
  { kanji: '成功', hiragana: 'せいこう', romaji: 'seikou', meaning: 'Success' },
  { kanji: '挑戦', hiragana: 'ちょうせん', romaji: 'chousen', meaning: 'Challenge' },
  { kanji: '経験', hiragana: 'けいけん', romaji: 'keiken', meaning: 'Experience' },
  { kanji: '感謝', hiragana: 'かんしゃ', romaji: 'kansha', meaning: 'Gratitude' },
  { kanji: '幸運', hiragana: 'こううん', romaji: 'kouun', meaning: 'Good luck' }
];

export default function WordOfTheDayWidget() {
  const [playing, setPlaying] = useState(false);
  
  const dailyWord = useMemo(() => {
    const day = new Date().getDate();
    return WORDS[day % WORDS.length];
  }, []);

  const playAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(dailyWord.kanji);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.8;
      utterance.onend = () => setPlaying(false);
      utterance.onerror = () => setPlaying(false);
      setPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 flex flex-col items-center justify-center text-center max-w-sm mx-auto my-8">
      <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-4">Japanese Word of the Day</h3>
      <div className="text-5xl font-bold text-gray-900 mb-2">{dailyWord.kanji}</div>
      <div className="text-xl text-fuji-red mb-1">{dailyWord.hiragana}</div>
      <div className="text-sm text-gray-500 mb-4">{dailyWord.romaji}</div>
      <div className="text-lg font-semibold text-gray-800 mb-6 border-t border-gray-100 pt-4 w-full">&quot;{dailyWord.meaning}&quot;</div>
      
      <button 
        onClick={playAudio}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold transition-colors ${playing ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
      >
        <Volume2 className="w-4 h-4" />
        {playing ? 'Playing...' : 'Pronounce'}
      </button>
    </div>
  );
}
