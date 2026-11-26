import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface BatchCountdownTimerProps {
  onEnroll: () => void;
}

export default function BatchCountdownTimer({ onEnroll }: BatchCountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    // Official upcoming cohort commences on the 1st / 15th of the month
    const now = new Date();
    const targetDate = new Date(now.getFullYear(), now.getMonth(), now.getDate() <= 15 ? 15 : 1, 23, 59, 59);
    if (now.getDate() > 15) {
      targetDate.setMonth(targetDate.getMonth() + 1);
    }

    const updateTimer = () => {
      const current = new Date();
      const difference = targetDate.getTime() - current.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-gradient-to-r from-red-600 to-red-800 rounded-2xl shadow-2xl p-6 md:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 max-w-5xl mx-auto my-8">
      <div className="flex-1 text-center md:text-left">
        <div className="inline-flex items-center gap-2 bg-red-900/50 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3">
          <Calendar className="w-4 h-4" /> Upcoming JLPT Cohort Intake
        </div>
        <h3 className="text-2xl md:text-3xl font-bold mb-2">New Batch Starting Soon</h3>
        <p className="text-red-100 text-sm md:text-base">Admissions open for weekday evening and weekend batches with certified native senseis.</p>
      </div>

      <div className="flex items-center gap-3 md:gap-4">
        {[
          { label: 'Days', value: timeLeft.days },
          { label: 'Hours', value: timeLeft.hours },
          { label: 'Mins', value: timeLeft.minutes },
          { label: 'Secs', value: timeLeft.seconds }
        ].map((item, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <div className="bg-white text-red-700 w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-xl md:text-3xl font-bold shadow-inner">
              {item.value.toString().padStart(2, '0')}
            </div>
            <span className="text-[10px] md:text-xs font-medium uppercase mt-2 opacity-80">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="w-full md:w-auto">
        <button 
          onClick={onEnroll}
          className="w-full md:w-auto bg-white text-red-700 hover:bg-gray-100 px-8 py-4 rounded-full font-bold shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          Reserve Seat Now
        </button>
      </div>
    </div>
  );
}
