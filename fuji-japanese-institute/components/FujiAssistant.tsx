import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Sparkles, RotateCcw, ExternalLink } from 'lucide-react';
import { generateAIResponse } from '../services/gemini';

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

const QUICK_PROMPTS = [
  { label: '🌸 Courses & Levels', query: 'What courses and JLPT levels do you offer?' },
  { label: '💰 Fees & How to Pay', query: 'What are the course fees and how can I pay?' },
  { label: '⏰ Batch Timings', query: 'What are the class timings and weekend batch schedules?' },
  { label: '📍 Bengaluru Campus', query: 'Where is your Electronic City Bengaluru campus located?' },
  { label: '📅 Book Free Demo', query: 'How can I book a free live demo class?' },
  { label: '💼 Jobs in Japan', query: 'What are the tech job opportunities and visa requirements in Japan?' },
  { label: '📞 Contact & WhatsApp', query: 'What is your admissions contact number and WhatsApp?' }
];

const INITIAL_MESSAGE: ChatMessage = {
  role: 'assistant',
  text: `Konnichiwa! I am **Fuji Sensei** (富士先生) 🌸 

Welcome to **Fuji Japanese Academy**! How can I help you today?

Ask me anything about:
• **JLPT Courses** (N5 to N1, Spoken Japanese, IT Japanese)
• **Course Fees & Direct Payment** (UPI / Bank Transfer)
• **Batch Timings & Online/Classroom Batches**
• **Booking a Free Live Demo Class**
• **Campus Address in Electronic City, Bengaluru**`
};

/**
 * Parses markdown-like text with bold, inline code, links, and bullet points.
 */
const renderFormattedMessage = (text: string) => {
  const lines = text.split('\n');

  return (
    <div className="space-y-1.5 text-xs sm:text-sm leading-relaxed">
      {lines.map((line, lineIdx) => {
        if (!line.trim()) {
          return <div key={lineIdx} className="h-1.5" />;
        }

        // Parse inline [label](url), **bold**, and `code`
        const parseLineContent = (str: string) => {
          // Tokenize markdown links [label](url), bold **bold**, and code `code`
          const regex = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|`[^`]+`)/g;
          const parts = str.split(regex);

          return parts.map((part, partIdx) => {
            if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
              const label = part.substring(1, part.indexOf(']('));
              const url = part.substring(part.indexOf('](') + 2, part.length - 1);
              const isExternal = url.startsWith('http') || url.startsWith('https://wa.me');

              return (
                <a
                  key={partIdx}
                  href={url}
                  target={isExternal ? '_blank' : '_self'}
                  rel={isExternal ? 'noopener noreferrer' : undefined}
                  className="text-fuji-red font-bold underline hover:text-red-700 inline-flex items-center gap-0.5 mx-0.5"
                >
                  <span>{label}</span>
                  {isExternal && <ExternalLink className="w-2.5 h-2.5 inline" />}
                </a>
              );
            }

            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={partIdx} className="font-bold text-gray-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }

            if (part.startsWith('`') && part.endsWith('`')) {
              return (
                <code
                  key={partIdx}
                  className="bg-indigo-50 text-fuji-indigo px-1.5 py-0.5 rounded font-mono text-[11px] font-semibold border border-indigo-100"
                >
                  {part.slice(1, -1)}
                </code>
              );
            }

            return part;
          });
        };

        const isBullet = line.trim().startsWith('•') || line.trim().startsWith('-') || line.trim().startsWith('✅');

        return (
          <div
            key={lineIdx}
            className={`${isBullet ? 'pl-2 text-gray-800' : 'text-gray-800'}`}
          >
            {parseLineContent(line)}
          </div>
        );
      })}
    </div>
  );
};

const FujiAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, isLoading]);

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim() || isLoading) return;

    const userMsg = queryText.trim();
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await generateAIResponse(userMsg);
      setMessages(prev => [...prev, { role: 'assistant', text: response }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: `Konnichiwa! For admissions, fees, or direct WhatsApp support with Sensei, please contact us at **+91 63649 24110** or visit our [Contact Page](/contact).`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSendQuery(input);
    }
  };

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    setInput('');
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 right-4 sm:right-6 lg:bottom-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? 'bg-fuji-red rotate-90' : 'bg-fuji-indigo hover:bg-[#1a1740]'
        } text-white flex items-center justify-center cursor-pointer border-2 border-white/20`}
        aria-label="Open Fuji AI Sensei Assistant"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Interface Drawer */}
      {isOpen && (
        <div className="fixed bottom-20 lg:bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col h-[560px] max-h-[75vh] sm:max-h-[82vh] animate-in slide-in-from-bottom-5 duration-200">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-fuji-indigo via-[#26235b] to-slate-900 p-4 text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="bg-white/15 p-2 rounded-xl border border-white/20 relative">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full absolute -top-0.5 -right-0.5 border-2 border-fuji-indigo" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-sm sm:text-base tracking-wide text-white">Fuji Sensei AI</h3>
                  <span className="text-[10px] bg-white/20 text-white font-bold px-1.5 py-0.5 rounded">Online</span>
                </div>
                <p className="text-[11px] text-indigo-200">Fuji Japanese Academy Academic Counselor</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                title="Restart Chat"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
                className="p-1.5 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/80">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[88%] px-4 py-3 rounded-2xl shadow-sm ${
                    msg.role === 'user'
                      ? 'bg-fuji-indigo text-white rounded-br-none text-xs sm:text-sm'
                      : 'bg-white text-gray-900 border border-gray-200/80 rounded-bl-none'
                  }`}
                >
                  {msg.role === 'user' ? (
                    <span className="leading-relaxed font-medium">{msg.text}</span>
                  ) : (
                    renderFormattedMessage(msg.text)
                  )}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-none border border-gray-200 shadow-sm flex items-center gap-2">
                  <div className="w-2 h-2 bg-fuji-red rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-fuji-red rounded-full animate-bounce [animation-delay:150ms]" />
                  <div className="w-2 h-2 bg-fuji-red rounded-full animate-bounce [animation-delay:300ms]" />
                  <span className="text-[11px] text-gray-500 font-medium ml-1">Fuji Sensei is typing...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestion Chips */}
          <div className="px-3 py-2 bg-white border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {QUICK_PROMPTS.map((prompt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSendQuery(prompt.query)}
                disabled={isLoading}
                className="whitespace-nowrap px-2.5 py-1 rounded-full bg-slate-100 hover:bg-red-50 hover:text-fuji-red text-gray-700 text-[11px] font-semibold transition-all border border-gray-200/80 shrink-0 cursor-pointer disabled:opacity-50"
              >
                {prompt.label}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white border-t border-gray-200/80 flex gap-2 items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask about JLPT, courses, fees, timings..."
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-gray-200 rounded-xl focus:outline-none focus:bg-white focus:ring-2 focus:ring-fuji-indigo/20 text-xs sm:text-sm text-gray-900 transition-all placeholder:text-gray-400"
            />
            <button
              type="button"
              onClick={() => handleSendQuery(input)}
              disabled={isLoading || !input.trim()}
              className="p-2.5 bg-fuji-indigo text-white rounded-xl hover:bg-fuji-red disabled:opacity-40 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm shrink-0"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default FujiAssistant;
