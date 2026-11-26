import React, { useState } from 'react';
import { Volume2, RefreshCw, Eye, EyeOff, CheckCircle } from 'lucide-react';
import { VOCABULARY_LIST } from '../data/learningHubData';

const FlashcardSystem: React.FC = () => {
  const [deck] = useState(VOCABULARY_LIST);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [showHiragana, setShowHiragana] = useState(true);
  
  // Progress counters
  const [stats, setStats] = useState({ new: deck.length, reviewing: 0, mastered: 0 });

  const speakText = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      window.speechSynthesis.speak(utterance);
    }
  };

  const currentCard = deck[currentIndex];

  const handleRating = (rating: 'again' | 'good' | 'easy') => {
    // In a real app, this would use an SRS algorithm (like SuperMemo-2) 
    // and update spaced repetition intervals. For UI mockup:
    if (rating === 'again') {
      setStats(prev => ({ ...prev, new: Math.max(0, prev.new - 1), reviewing: prev.reviewing + 1 }));
    } else if (rating === 'easy') {
      setStats(prev => ({ ...prev, new: Math.max(0, prev.new - 1), mastered: prev.mastered + 1 }));
    } else {
      setStats(prev => ({ ...prev, new: Math.max(0, prev.new - 1), reviewing: prev.reviewing + 1 }));
    }

    // Move to next card
    if (currentIndex < deck.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      // Loop back to start (in a real SRS, we'd query due cards)
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  if (!currentCard) return null;

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm max-w-2xl mx-auto">
      {/* Header & Stats */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <RefreshCw className="w-5 h-5 text-indigo-500" />
          SRS Flashcards
        </h3>
        <div className="flex gap-4 text-sm font-semibold">
          <span className="text-blue-500">New: {stats.new}</span>
          <span className="text-orange-500">Reviewing: {stats.reviewing}</span>
          <span className="text-green-500">Mastered: {stats.mastered}</span>
        </div>
      </div>

      {/* Flashcard */}
      <div 
        className="w-full h-80 relative perspective-1000 cursor-pointer group"
        onClick={() => !isFlipped && setIsFlipped(true)}
      >
        <div className={`w-full h-full absolute transition-transform duration-500 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          
          {/* FRONT */}
          <div className="absolute w-full h-full backface-hidden bg-gray-50 border-2 border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 hover:border-red-300 transition-colors shadow-inner">
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              onClick={(e) => { e.stopPropagation(); setShowHiragana(!showHiragana); }}
              title="Toggle Furigana/Hiragana"
            >
              {showHiragana ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
            </button>

            <span className="text-6xl font-black text-gray-900 mb-4">{currentCard.japanese}</span>
            {showHiragana && (
              <span className="text-xl text-red-600 font-medium">{currentCard.kana}</span>
            )}
            
            <p className="absolute bottom-6 text-sm text-gray-400">Click card to reveal answer</p>
          </div>

          {/* BACK */}
          <div className="absolute w-full h-full backface-hidden rotate-y-180 bg-white border-2 border-red-100 rounded-2xl flex flex-col p-8 shadow-lg overflow-y-auto">
            <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-4">
              <div>
                <span className="text-3xl font-black text-gray-900 block">{currentCard.japanese}</span>
                <span className="text-lg text-red-600 font-medium">{currentCard.kana} ({currentCard.romaji})</span>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); speakText(currentCard.japanese); }}
                className="bg-red-50 p-3 rounded-full text-red-600 hover:bg-red-100 transition-colors"
              >
                <Volume2 className="w-6 h-6" />
              </button>
            </div>
            
            <div className="flex-1">
              <p className="text-xl font-bold text-indigo-900 mb-4">{currentCard.english}</p>
              
              {currentCard.exampleSentence && (
                <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                  <p className="font-bold text-gray-800 text-lg mb-1">{currentCard.exampleSentence}</p>
                  <p className="text-sm text-gray-600">{currentCard.exampleEnglish}</p>
                  <button 
                    onClick={(e) => { e.stopPropagation(); speakText(currentCard.exampleSentence!); }}
                    className="mt-2 text-xs text-red-600 font-bold hover:underline flex items-center gap-1"
                  >
                    <Volume2 className="w-3 h-3" /> Listen Sentence
                  </button>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>

      {/* SRS Rating Buttons */}
      {isFlipped && (
        <div className="grid grid-cols-3 gap-4 mt-6">
          <button 
            onClick={() => handleRating('again')}
            className="py-3 bg-rose-50 text-rose-700 border border-rose-200 font-bold rounded-xl hover:bg-rose-100 transition-colors flex flex-col items-center"
          >
            <span>Again</span>
            <span className="text-[10px] opacity-70">&lt; 1m</span>
          </button>
          <button 
            onClick={() => handleRating('good')}
            className="py-3 bg-blue-50 text-blue-700 border border-blue-200 font-bold rounded-xl hover:bg-blue-100 transition-colors flex flex-col items-center"
          >
            <span>Good</span>
            <span className="text-[10px] opacity-70">10m</span>
          </button>
          <button 
            onClick={() => handleRating('easy')}
            className="py-3 bg-emerald-50 text-emerald-700 border border-emerald-200 font-bold rounded-xl hover:bg-emerald-100 transition-colors flex flex-col items-center"
          >
            <span>Easy</span>
            <span className="text-[10px] opacity-70">4d</span>
          </button>
        </div>
      )}
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .transform-style-preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </div>
  );
};

export default FlashcardSystem;
