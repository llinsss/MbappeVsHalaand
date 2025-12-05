import React, { useState, useEffect, useMemo } from 'react';

// Timer component that counts down to a date 5 years from now
const Timer = () => {
    // Fixed target date 5 years from the initial render
    const targetDate = useMemo(() => {
        const d = new Date();
        d.setFullYear(d.getFullYear() + 5);
        return d;
    }, []);

    const calculateRemaining = () => {
        const now = new Date();
        const diff = targetDate - now;
        if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        const seconds = Math.floor((diff / 1000) % 60);
        const minutes = Math.floor((diff / (1000 * 60)) % 60);
        const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        return { days, hours, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateRemaining());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateRemaining());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center text-gray-400 mb-6">
            <span className="font-mono">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left
            </span>
        </div>
    );
};

export default Timer;
