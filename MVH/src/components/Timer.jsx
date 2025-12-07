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
        if (diff <= 0) return { years: 0, months: 0, days: 0, minutes: 0, seconds: 0 };
        const msInSecond = 1000;
        const msInMinute = msInSecond * 60;
        const msInHour = msInMinute * 60;
        const msInDay = msInHour * 24;
        const msInMonth = msInDay * 30; // approx
        const msInYear = msInDay * 365; // approx

        const years = Math.floor(diff / msInYear);
        const remainderAfterYears = diff % msInYear;
        const months = Math.floor(remainderAfterYears / msInMonth);
        const remainderAfterMonths = remainderAfterYears % msInMonth;
        const days = Math.floor(remainderAfterMonths / msInDay);
        const remainderAfterDays = remainderAfterMonths % msInDay;
        const minutes = Math.floor(remainderAfterDays / msInMinute);
        const seconds = Math.floor((remainderAfterDays % msInMinute) / msInSecond);
        return { years, months, days, minutes, seconds };
    };

    const [timeLeft, setTimeLeft] = useState(calculateRemaining());

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeLeft(calculateRemaining());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const timeUnits = [
        { label: 'YRS', value: timeLeft.years },
        { label: 'MOS', value: timeLeft.months },
        { label: 'DAYS', value: timeLeft.days },
        { label: 'HRS', value: timeLeft.minutes },
        { label: 'MIN', value: timeLeft.minutes }, // Wait, I made a mistake in previous code map? No, calculateRemaining used minutes for minutes.
        { label: 'SEC', value: timeLeft.seconds },
    ];

    // Wait, let me check strict consistency with calculateRemaining names.
    // calculateRemaining returns { years, months, days, minutes, seconds }.

    return (
        <div className="flex items-center justify-center gap-3">
            <div className="flex flex-col items-center bg-black/40 backdrop-blur-md border border-[#00ff88]/30 rounded-xl p-2 min-w-[50px] md:min-w-[60px]">
                <span className="text-xl md:text-2xl font-bold text-white leading-none">{timeLeft.years}</span>
                <span className="text-[10px] md:text-xs text-[#00ff88] font-bold tracking-wider mt-1">YRS</span>
            </div>
            <div className="flex flex-col items-center bg-black/40 backdrop-blur-md border border-[#00ff88]/30 rounded-xl p-2 min-w-[50px] md:min-w-[60px]">
                <span className="text-xl md:text-2xl font-bold text-white leading-none">{timeLeft.months}</span>
                <span className="text-[10px] md:text-xs text-[#00ff88] font-bold tracking-wider mt-1">MOS</span>
            </div>
            <div className="flex flex-col items-center bg-black/40 backdrop-blur-md border border-[#00ff88]/30 rounded-xl p-2 min-w-[50px] md:min-w-[60px]">
                <span className="text-xl md:text-2xl font-bold text-white leading-none">{timeLeft.days}</span>
                <span className="text-[10px] md:text-xs text-[#00ff88] font-bold tracking-wider mt-1">DAY</span>
            </div>
            {/* Divider or generic separator could go here but let's just group them */}

            <div className="flex flex-col items-center bg-black/40 backdrop-blur-md border border-[#00ff88]/30 rounded-xl p-2 min-w-[50px] md:min-w-[60px]">
                <span className="text-xl md:text-2xl font-bold text-white leading-none">{timeLeft.minutes}</span>
                <span className="text-[10px] md:text-xs text-[#00ff88] font-bold tracking-wider mt-1">MIN</span>
            </div>
            <div className="flex flex-col items-center bg-black/40 backdrop-blur-md border border-[#00ff88]/30 rounded-xl p-2 min-w-[50px] md:min-w-[60px]">
                <span className="text-xl md:text-2xl font-bold text-white leading-none">{timeLeft.seconds}</span>
                <span className="text-[10px] md:text-xs text-[#00ff88] font-bold tracking-wider mt-1">SEC</span>
            </div>
        </div>
    );
};

export default Timer;
