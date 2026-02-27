"use client";

import { motion } from "framer-motion";
import { useEffect, useState, useRef } from "react";

/* ─── Animated Counter ─── */
function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;
                    const duration = 2000;
                    const steps = 60;
                    const increment = target / steps;
                    let current = 0;
                    const interval = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            setCount(target);
                            clearInterval(interval);
                        } else {
                            setCount(Math.floor(current));
                        }
                    }, duration / steps);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [target]);

    return (
        <span ref={ref}>
            {count.toLocaleString()}
            {suffix}
        </span>
    );
}

/* ─── Stats ─── */
function Stats() {
    const stats = [
        { value: 12, suffix: "M+", label: "Lessons Completed" },
        { value: 500, suffix: "K+", label: "Active Learners" },
        { value: 98, suffix: "%", label: "Completion Rate" },
        { value: 4, suffix: ".9★", label: "App Store Rating" },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, i) => (
                <motion.div
                    key={i}
                    className="text-center p-6 rounded-2xl border border-gray-800/60 bg-cb-card/50"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                >
                    <div className="text-3xl md:text-4xl font-black gradient-text mb-1">
                        <Counter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                </motion.div>
            ))}
        </div>
    );
}

/* ─── Leaderboard Table ─── */
function LeaderboardTable() {
    const users = [
        { rank: 1, badge: "🥇", name: "sarahcodes", xp: 24850, streak: 47, avatar: "#a855f7" },
        { rank: 2, badge: "🥈", name: "devin.py", xp: 22300, streak: 32, avatar: "#3b82f6" },
        { rank: 3, badge: "🥉", name: "rustacean_max", xp: 21100, streak: 28, avatar: "#22c55e" },
        { rank: 4, badge: "4", name: "byte_queen", xp: 19750, streak: 21, avatar: "#f59e0b" },
        { rank: 5, badge: "5", name: "loopmaster", xp: 18200, streak: 19, avatar: "#ec4899" },
        { rank: 6, badge: "6", name: "js_ninja_42", xp: 16800, streak: 15, avatar: "#14b8a6" },
        { rank: 7, badge: "7", name: "async_alex", xp: 15300, streak: 12, avatar: "#f97316" },
        { rank: 8, badge: "8", name: "code_nomad", xp: 14100, streak: 9, avatar: "#8b5cf6" },
    ];

    return (
        <div className="rounded-2xl border border-gray-800/60 bg-cb-card/80 backdrop-blur-sm overflow-hidden">
            {/* Header */}
            <div className="px-6 py-4 border-b border-gray-800/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <span className="text-xl">🏆</span>
                    <h3 className="text-lg font-bold text-white">Live Leaderboard</h3>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                    </span>
                    <span className="text-xs text-green-400 font-medium">Live</span>
                </div>
            </div>

            {/* Column headers */}
            <div className="grid grid-cols-[50px_1fr_100px_80px] md:grid-cols-[60px_1fr_120px_100px] px-6 py-2 text-xs font-semibold text-gray-500 uppercase tracking-wider border-b border-gray-800/30">
                <span>Rank</span>
                <span>Player</span>
                <span className="text-right">XP</span>
                <span className="text-right">Streak</span>
            </div>

            {/* Rows */}
            {users.map((user, i) => (
                <motion.div
                    key={user.rank}
                    className="grid grid-cols-[50px_1fr_100px_80px] md:grid-cols-[60px_1fr_120px_100px] px-6 py-3 items-center border-b border-gray-800/20 hover:bg-white/[0.02] transition-colors"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}
                    viewport={{ once: true }}
                >
                    {/* Rank */}
                    <span className="text-sm font-bold text-gray-400">
                        {user.rank <= 3 ? (
                            <span className="text-lg">{user.badge}</span>
                        ) : (
                            user.badge
                        )}
                    </span>

                    {/* Player */}
                    <div className="flex items-center gap-3">
                        <div
                            className="w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold text-white"
                            style={{ background: user.avatar }}
                        >
                            {user.name.slice(0, 2).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-white">{user.name}</span>
                    </div>

                    {/* XP */}
                    <span className="text-sm font-semibold text-blue-400 text-right">
                        {user.xp.toLocaleString()} XP
                    </span>

                    {/* Streak */}
                    <span className="text-sm text-right">
                        <span className="text-amber-400">🔥</span>{" "}
                        <span className="font-medium text-gray-300">{user.streak}d</span>
                    </span>
                </motion.div>
            ))}
        </div>
    );
}

/* ─── Testimonials ─── */
function Testimonials() {
    const testimonials = [
        {
            name: "Maya Chen",
            role: "CS Student, Stanford",
            text: "I learned more Python in one weekend of CodeBite than a month of YouTube tutorials. The AI tutor actually explains things like a friend would.",
            avatar: "#a855f7",
        },
        {
            name: "Jordan Lee",
            role: "Career Switcher",
            text: "The 60-second format is genius. I do 10 lessons on the train to work and I've already landed my first freelance gig. My streak is at 34 days!",
            avatar: "#3b82f6",
        },
        {
            name: "Alex Rivera",
            role: "Bootcamp Grad",
            text: "CodeBite fills in all the gaps my bootcamp left. The adaptive difficulty means I'm never bored and never lost. It just... works.",
            avatar: "#22c55e",
        },
    ];

    return (
        <div className="grid md:grid-cols-3 gap-4 mt-12">
            {testimonials.map((t, i) => (
                <motion.div
                    key={i}
                    className="rounded-2xl border border-gray-800/60 bg-cb-card/50 p-5"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -4, borderColor: "rgba(59,130,246,0.3)" }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                            style={{ background: t.avatar }}
                        >
                            {t.name
                                .split(" ")
                                .map((w) => w[0])
                                .join("")}
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-white">{t.name}</p>
                            <p className="text-xs text-gray-500">{t.role}</p>
                        </div>
                    </div>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        &ldquo;{t.text}&rdquo;
                    </p>
                    <div className="flex gap-0.5 mt-3">
                        {[...Array(5)].map((_, j) => (
                            <span key={j} className="text-xs text-yellow-400">
                                ★
                            </span>
                        ))}
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

/* ─── Leaderboard Section ─── */
export default function Leaderboard() {
    return (
        <section id="leaderboard" className="relative py-28 px-6">
            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 rounded-full">
                        Compete & Climb
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        Keep Your Streak{" "}
                        <span className="gradient-text">Alive.</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Every lesson counts. Earn XP, maintain your streak, and see how you
                        stack up against learners worldwide.
                    </p>
                </motion.div>

                {/* Stats */}
                <Stats />

                {/* Leaderboard */}
                <LeaderboardTable />

                {/* Testimonials */}
                <Testimonials />
            </div>
        </section>
    );
}
