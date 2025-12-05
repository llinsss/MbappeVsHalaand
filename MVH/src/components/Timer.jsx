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
        if (diff <= 0) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
        const msInSecond = 1000;
        const msInMinute = msInSecond * 60;
        const msInHour = msInMinute * 60;
        const msInDay = msInHour * 24;
        const msInMonth = msInDay * 30; // approximate month as 30 days
        const msInYear = msInDay * 365; // approximate year as 365 days

        const years = Math.floor(diff / msInYear);
        const remainderAfterYears = diff % msInYear;
        const months = Math.floor(remainderAfterYears / msInMonth);
        const remainderAfterMonths = remainderAfterYears % msInMonth;
        const days = Math.floor(remainderAfterMonths / msInDay);
        const remainderAfterDays = remainderAfterMonths % msInDay;
        const hours = Math.floor(remainderAfterDays / msInHour);
        const remainderAfterHours = remainderAfterDays % msInHour;
        const minutes = Math.floor(remainderAfterHours / msInMinute);
        const seconds = Math.floor((remainderAfterHours % msInMinute) / msInSecond);
        return { years, months, days, hours, minutes, seconds };
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
                {timeLeft.years}y {timeLeft.months}mo {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s left
            </span>
        </div>
    );
};

export default Timer;
