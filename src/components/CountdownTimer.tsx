"use client";
import React, { useEffect, useState } from 'react';

interface CountdownTimerProps {
  targetDate: Date;
}

const CounterComponent = ({ targetDate } : CountdownTimerProps) => {
  const [timeRemaining, setTimeRemaining] = useState<string>('00:00:00:00');

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setTimeRemaining('00:00:00:00');
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeRemaining(
          `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
        );
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="text-center text-6xl font-bold">
      {timeRemaining}
      <h1 className='py-10'>Time To Alpha 2</h1>
    </div>
  );
}

export default CounterComponent;
