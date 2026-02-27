"use client";

import { motion } from "framer-motion";

/* ─── Lesson Card ─── */
function LessonCard({
    title,
    tag,
    tagColor,
    code,
    xp,
    index,
}: {
    title: string;
    tag: string;
    tagColor: string;
    code: string[];
    xp: number;
    index: number;
}) {
    return (
        <motion.div
            className="rounded-2xl border border-gray-800/60 bg-cb-card/80 backdrop-blur-sm p-5 flex flex-col gap-3"
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{ y: -4, borderColor: "rgba(59,130,246,0.4)" }}
        >
            <div className="flex items-center justify-between">
                <span
                    className="px-2.5 py-0.5 text-xs font-bold rounded-full border"
                    style={{
                        color: tagColor,
                        borderColor: tagColor + "40",
                        backgroundColor: tagColor + "15",
                    }}
                >
                    {tag}
                </span>
                <span className="text-xs text-gray-500">60s</span>
            </div>
            <h4 className="text-sm font-bold text-white">{title}</h4>
            <div className="rounded-lg bg-[#0d1117] border border-gray-800/40 p-3 font-mono text-[11px] leading-relaxed text-gray-300 whitespace-pre">
                {code.join("\n")}
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500">
                <span className="text-amber-400">🔥 Streak +1</span>
                <span className="text-green-400">+{xp} XP</span>
            </div>
        </motion.div>
    );
}

/* ─── Feature Card ─── */
function FeatureCard({
    icon,
    title,
    description,
    index,
}: {
    icon: React.ReactNode;
    title: string;
    description: string;
    index: number;
}) {
    return (
        <motion.div
            className="group relative rounded-2xl border border-gray-800/60 bg-cb-card/50 p-6 hover:border-blue-500/40 transition-all duration-300"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
        >
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500/20 to-green-500/20 flex items-center justify-center text-2xl mb-4">
                    {icon}
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{description}</p>
            </div>
        </motion.div>
    );
}

/* ─── Swipe Feed Demo ─── */
function SwipeFeed() {
    const lessons = [
        {
            title: "Array Destructuring",
            tag: "JavaScript",
            tagColor: "#facc15",
            xp: 25,
            code: [
                "const colors = ['red', 'blue'];",
                "const [first, second] = colors;",
                "",
                "console.log(first);",
                '// → "red"',
            ],
        },
        {
            title: "List Comprehension",
            tag: "Python",
            tagColor: "#3b82f6",
            xp: 30,
            code: [
                "nums = [1, 2, 3, 4, 5]",
                "squares = [n**2 for n in nums]",
                "",
                "print(squares)",
                "# → [1, 4, 9, 16, 25]",
            ],
        },
        {
            title: "Optional Chaining",
            tag: "TypeScript",
            tagColor: "#3b82f6",
            xp: 20,
            code: [
                "const user = { profile: null };",
                "const name = user.profile?.name;",
                "",
                "console.log(name);",
                "// → undefined (no crash!)",
            ],
        },
    ];

    return (
        <div className="grid md:grid-cols-3 gap-4">
            {lessons.map((lesson, i) => (
                <LessonCard key={i} {...lesson} index={i} />
            ))}
        </div>
    );
}

/* ─── Product Demo Section ─── */
export default function ProductDemo() {
    const features = [
        {
            icon: "🤖",
            title: "AI Tutor",
            description:
                'Stuck? Ask "why did this fail?" and get plain-English explanations powered by Cortex AI. No more cryptic error messages.',
        },
        {
            icon: "🎯",
            title: "Adaptive Difficulty",
            description:
                "Lessons adjust to your skill level in real time. Too easy? We crank it up. Struggling? We break it down.",
        },
        {
            icon: "🔥",
            title: "Streaks & XP",
            description:
                "Keep your streak alive, earn XP, and climb the leaderboard. Learning should feel like a game, not a chore.",
        },
    ];

    return (
        <section id="demo" className="relative py-28 px-6">
            <div className="max-w-6xl mx-auto">
                {/* Section header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-blue-300 bg-blue-500/10 border border-blue-500/20 rounded-full">
                        How It Works
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        Swipe. Learn. <span className="gradient-text">Level Up.</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Every lesson is a code snack — small enough to finish in 60 seconds,
                        powerful enough to actually stick.
                    </p>
                </motion.div>

                {/* Swipe feed demo */}
                <div className="mb-20">
                    <motion.p
                        className="text-center text-sm text-gray-500 mb-6 flex items-center justify-center gap-2"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block w-8 h-px bg-gray-700" />
                        Your daily feed looks like this
                        <span className="inline-block w-8 h-px bg-gray-700" />
                    </motion.p>
                    <SwipeFeed />
                </div>

                {/* Divider */}
                <div className="section-divider mb-20" />

                {/* Feature cards */}
                <div className="grid md:grid-cols-3 gap-6">
                    {features.map((feature, i) => (
                        <FeatureCard key={i} {...feature} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}
