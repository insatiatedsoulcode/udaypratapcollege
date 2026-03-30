'use client';

import React, { useEffect, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    duration?: number;
    label: string;
    colorTheme?: 'indigo' | 'emerald' | 'amber' | 'rose';
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
    value,
    suffix = '',
    duration = 2,
    label,
    colorTheme = 'indigo'
}) => {
    const [count, setCount] = useState(0);
    const ref = React.useRef(null);
    // Removed strict negative margin which can cause it to never trigger on shorter screens
    const isInView = useInView(ref, { once: true, margin: "0px" });
    const controls = useAnimation();

    useEffect(() => {
        if (isInView) {
            controls.start({
                opacity: 1,
                y: 0,
                transition: { duration: 0.8, ease: "easeOut" }
            });

            let startTimestamp: number | null = null;
            const step = (timestamp: number) => {
                if (!startTimestamp) startTimestamp = timestamp;
                const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);

                // Easing function for smoother slowdown at the end
                const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                setCount(Math.floor(easeOutQuart * value));

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                } else {
                    setCount(value); // Ensure it hits the exact target
                }
            };

            window.requestAnimationFrame(step);
        }
    }, [isInView, value, duration, controls]);

    // Define vibrant color themes
    const themeClasses = {
        indigo: 'bg-gradient-to-br from-indigo-500 to-indigo-700 shadow-indigo-500/20',
        emerald: 'bg-gradient-to-br from-emerald-500 to-emerald-700 shadow-emerald-500/20',
        amber: 'bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20',
        rose: 'bg-gradient-to-br from-rose-500 to-rose-700 shadow-rose-500/20',
    };

    const activeTheme = themeClasses[colorTheme];

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            className={`relative flex flex-col items-center justify-center p-8 rounded-[2rem] shadow-lg ${activeTheme} border border-white/20 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 overflow-hidden cursor-pointer group`}
        >
            {/* Soft inner glow effect */}
            <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

            <span className="relative z-10 text-5xl md:text-6xl font-black text-white mb-3 drop-shadow-md">
                {count}{suffix}
            </span>
            <span className="relative z-10 text-lg font-bold text-white/90 uppercase tracking-widest drop-shadow-sm">
                {label}
            </span>

            {/* Background floating blob */}
            <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700" />
            <div className="absolute -top-10 -left-10 w-24 h-24 bg-black/10 rounded-full blur-xl pointer-events-none" />
        </motion.div>
    );
};

export default AnimatedCounter;
