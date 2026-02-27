"use client";

import { motion } from "framer-motion";

/* ─── Floating Particles (deterministic to avoid hydration mismatch) ─── */
const PARTICLES = [
    { w: 6, h: 7, left: 15, top: 20, dur: 5.2, del: 0.3 },
    { w: 8, h: 5, left: 55, top: 65, dur: 6.1, del: 1.1 },
    { w: 5, h: 9, left: 30, top: 45, dur: 4.8, del: 0.7 },
    { w: 7, h: 6, left: 75, top: 30, dur: 5.9, del: 1.6 },
    { w: 9, h: 8, left: 45, top: 80, dur: 6.5, del: 0.5 },
    { w: 6, h: 7, left: 85, top: 15, dur: 4.4, del: 1.9 },
];

function Particles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {PARTICLES.map((p, i) => (
                <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        width: p.w,
                        height: p.h,
                        left: `${p.left}%`,
                        top: `${p.top}%`,
                        background:
                            i % 2 === 0
                                ? "rgba(59,130,246,0.5)"
                                : "rgba(163,230,53,0.4)",
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: p.dur,
                        repeat: Infinity,
                        delay: p.del,
                    }}
                />
            ))}
        </div>
    );
}

/* ─── Phone Mockup ─── */
function PhoneMockup() {
    const codeLines = [
        { text: "function greet(name) {", color: "#c084fc" },
        { text: '  return `Hello, ${name}!`;', color: "#a3e635" },
        { text: "}", color: "#c084fc" },
        { text: "", color: "" },
        { text: "// 🎯 Challenge:", color: "#64748b" },
        { text: "// Make greet() work with", color: "#64748b" },
        { text: "// a default name", color: "#64748b" },
        { text: "", color: "" },
        { text: 'greet("CodeBite");', color: "#3b82f6" },
        { text: '// → "Hello, CodeBite!"', color: "#22c55e" },
    ];

    return (
        <motion.div
            className="relative mx-auto"
            style={{ width: 280, height: 560 }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
        >
            {/* Phone frame */}
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-b from-gray-800 to-gray-900 p-[3px]">
                <div className="h-full w-full rounded-[38px] bg-cb-bg overflow-hidden relative">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-gray-900 rounded-b-2xl z-10" />

                    {/* Status bar */}
                    <div className="flex justify-between items-center px-6 pt-8 pb-2 text-[10px] text-gray-500">
                        <span>9:41</span>
                        <div className="flex gap-1">
                            <div className="w-3 h-2 rounded-sm bg-gray-600" />
                            <div className="w-4 h-2 rounded-sm bg-green-500" />
                        </div>
                    </div>

                    {/* Lesson card */}
                    <div className="px-4 mt-2">
                        {/* Topic tag */}
                        <div className="flex items-center gap-2 mb-3">
                            <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30">
                                JavaScript
                            </span>
                            <span className="text-[10px] text-gray-500">60s</span>
                            <div className="ml-auto flex items-center gap-1">
                                <span className="text-[10px] text-amber-400">🔥 12</span>
                            </div>
                        </div>

                        <h3 className="text-sm font-bold text-white mb-1">
                            Default Parameters
                        </h3>
                        <p className="text-[11px] text-gray-400 mb-3">
                            Make your functions flexible with fallback values
                        </p>

                        {/* Code block */}
                        <div className="rounded-xl bg-[#0d1117] border border-gray-800/50 p-3 font-mono text-[11px] leading-relaxed">
                            {codeLines.map((line, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.8 + i * 0.1 }}
                                    style={{ color: line.color || "#e2e8f0" }}
                                >
                                    {line.text || "\u00A0"}
                                </motion.div>
                            ))}
                        </div>

                        {/* Progress bar */}
                        <div className="mt-4 h-1 rounded-full bg-gray-800 overflow-hidden">
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-green-400"
                                initial={{ width: "0%" }}
                                animate={{ width: "65%" }}
                                transition={{ duration: 1.5, delay: 1.5 }}
                            />
                        </div>
                        <div className="flex justify-between mt-1.5 text-[10px] text-gray-500">
                            <span>3 of 5 lessons</span>
                            <span>+25 XP</span>
                        </div>
                    </div>

                    {/* Bottom nav */}
                    <div className="absolute bottom-0 left-0 right-0 flex justify-around items-center py-3 px-4 border-t border-gray-800/50 bg-cb-bg/80 backdrop-blur-sm">
                        {["🏠", "🔍", "🏆", "👤"].map((icon, i) => (
                            <span
                                key={i}
                                className={`text-lg ${i === 0 ? "opacity-100" : "opacity-40"}`}
                            >
                                {icon}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* Glow behind phone */}
            <div className="absolute -inset-10 bg-gradient-to-br from-blue-500/10 to-green-500/10 blur-3xl rounded-full -z-10" />
        </motion.div>
    );
}

/* ─── Hero Section ─── */
export default function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center grid-bg overflow-hidden"
        >
            <Particles />

            {/* Radial gradient overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.08),transparent_70%)]" />

            <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center w-full">
                {/* Left — Copy */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    {/* Badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full border border-blue-500/30 bg-blue-500/10 text-sm text-blue-300"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                        </span>
                        Now in early access
                    </motion.div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight mb-6">
                        Learn to Code
                        <br />
                        in <span className="gradient-text">60 Seconds</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-400 max-w-lg mb-8 leading-relaxed">
                        Swipe through bite-sized coding lessons like TikTok. Earn streaks,
                        climb leaderboards, and actually remember what you learned.
                        No lectures. No fluff. Just <span className="text-white font-medium">code snacks</span>.
                    </p>

                    {/* CTAs */}
                    <div className="flex flex-wrap gap-4">
                        <motion.a
                            href="#challenge"
                            className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-500 to-blue-600 text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.5)]"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <span className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative z-10 flex items-center gap-2">
                                Start Learning
                                <svg
                                    className="w-5 h-5 transition-transform group-hover:translate-x-1"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2.5}
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                    />
                                </svg>
                            </span>
                        </motion.a>

                        <motion.a
                            href="#demo"
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-semibold text-lg border border-gray-700 text-gray-300 hover:border-blue-500/50 hover:text-white transition-all duration-300"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            See How It Works
                        </motion.a>
                    </div>

                    {/* Social proof mini */}
                    <div className="flex items-center gap-3 mt-10">
                        <div className="flex -space-x-2">
                            {["🟣", "🔵", "🟢", "🟡"].map((c, i) => (
                                <div
                                    key={i}
                                    className="w-8 h-8 rounded-full border-2 border-cb-bg flex items-center justify-center text-sm"
                                    style={{
                                        background: `linear-gradient(135deg, ${["#7c3aed", "#3b82f6", "#22c55e", "#eab308"][i]
                                            }, ${["#a855f7", "#60a5fa", "#4ade80", "#facc15"][i]})`,
                                    }}
                                >
                                    <span className="text-[10px]">
                                        {["RJ", "KL", "AM", "TS"][i]}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <span className="text-sm text-gray-400">
                            <span className="text-white font-semibold">12,400+</span> learners
                            already swiping
                        </span>
                    </div>
                </motion.div>

                {/* Right — Phone */}
                <div className="flex justify-center lg:justify-end">
                    <PhoneMockup />
                </div>
            </div>

            {/* Bottom fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cb-bg to-transparent" />
        </section>
    );
}
