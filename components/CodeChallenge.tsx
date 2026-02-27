"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const MonacoEditor = dynamic(
    () => import("@monaco-editor/react").then((mod) => mod.default),
    {
        ssr: false,
        loading: () => (
            <div className="h-[260px] rounded-xl bg-[#1e1e1e] flex items-center justify-center">
                <div className="flex items-center gap-3 text-gray-500">
                    <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                    Loading editor...
                </div>
            </div>
        ),
    }
);

/* ─── Challenge Data ─── */
interface Challenge {
    id: string;
    title: string;
    difficulty: "Easy" | "Medium" | "Hard";
    difficultyColor: string;
    description: string;
    starterCode: string;
    solution: string;
    testFn: (code: string) => boolean;
    hint: string;
    xp: number;
    language: string;
}

const challenges: Challenge[] = [
    {
        id: "reverse",
        title: "Reverse a String",
        difficulty: "Easy",
        difficultyColor: "#22c55e",
        description:
            'Complete the function so it returns the reversed version of the input string. For example, "hello" → "olleh".',
        starterCode: `function reverseString(str) {
  // Your code here
  
}`,
        solution: 'str.split("").reverse().join("")',
        testFn: (code: string) => {
            try {
                const fn = new Function(
                    code + '\nreturn reverseString("hello");'
                );
                return fn() === "olleh";
            } catch {
                return false;
            }
        },
        hint: 'Try: split("") → reverse() → join("")',
        xp: 25,
        language: "javascript",
    },
    {
        id: "fizzbuzz",
        title: "FizzBuzz Single",
        difficulty: "Medium",
        difficultyColor: "#f59e0b",
        description:
            'Given a number n, return "Fizz" if divisible by 3, "Buzz" if by 5, "FizzBuzz" if by both, else the number as a string.',
        starterCode: `function fizzBuzz(n) {
  // Your code here
  
}`,
        solution: "FizzBuzz",
        testFn: (code: string) => {
            try {
                const fn = new Function(code + "\nreturn [fizzBuzz(15), fizzBuzz(3), fizzBuzz(5), fizzBuzz(7)];");
                const result = fn();
                return (
                    result[0] === "FizzBuzz" &&
                    result[1] === "Fizz" &&
                    result[2] === "Buzz" &&
                    result[3] === "7"
                );
            } catch {
                return false;
            }
        },
        hint: "Check divisible by 15 first, then 3, then 5, else return String(n)",
        xp: 40,
        language: "javascript",
    },
    {
        id: "palindrome",
        title: "Palindrome Check",
        difficulty: "Hard",
        difficultyColor: "#ef4444",
        description:
            'Return true if the given string reads the same forwards and backwards (case-insensitive). E.g. "Racecar" → true.',
        starterCode: `function isPalindrome(str) {
  // Your code here
  
}`,
        solution: "palindrome",
        testFn: (code: string) => {
            try {
                const fn = new Function(
                    code +
                    '\nreturn [isPalindrome("Racecar"), isPalindrome("hello"), isPalindrome("madam")];'
                );
                const result = fn();
                return result[0] === true && result[1] === false && result[2] === true;
            } catch {
                return false;
            }
        },
        hint: "Convert to lowercase, then compare with its reverse",
        xp: 60,
        language: "javascript",
    },
];

/* ─── Result Banner ─── */
function ResultBanner({
    passed,
    xp,
    onTryAgain,
}: {
    passed: boolean;
    xp: number;
    onTryAgain: () => void;
}) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`mt-4 rounded-xl p-4 flex items-center justify-between ${passed
                ? "bg-green-500/10 border border-green-500/30"
                : "bg-red-500/10 border border-red-500/30"
                }`}
        >
            <div className="flex items-center gap-3">
                <span className="text-2xl">{passed ? "🎉" : "❌"}</span>
                <div>
                    <p
                        className={`font-bold text-sm ${passed ? "text-green-400" : "text-red-400"
                            }`}
                    >
                        {passed ? "All tests passed!" : "Not quite — keep going!"}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {passed ? `+${xp} XP earned` : "Check the hint and try again"}
                    </p>
                </div>
            </div>
            {!passed && (
                <button
                    onClick={onTryAgain}
                    className="px-4 py-1.5 text-xs font-semibold rounded-lg bg-gray-800 text-gray-300 hover:bg-gray-700 transition-colors"
                >
                    Try Again
                </button>
            )}
        </motion.div>
    );
}

/* ─── Code Challenge Section ─── */
export default function CodeChallenge() {
    const [activeIdx, setActiveIdx] = useState(0);
    const [codes, setCodes] = useState<Record<string, string>>(
        Object.fromEntries(challenges.map((c) => [c.id, c.starterCode]))
    );
    const [result, setResult] = useState<"pass" | "fail" | null>(null);
    const [showHint, setShowHint] = useState(false);
    const [isRunning, setIsRunning] = useState(false);

    const challenge = challenges[activeIdx];

    const handleRun = useCallback(() => {
        setIsRunning(true);
        setResult(null);
        // Simulate execution delay for UX
        setTimeout(() => {
            const passed = challenge.testFn(codes[challenge.id]);
            setResult(passed ? "pass" : "fail");
            setIsRunning(false);
        }, 600);
    }, [challenge, codes]);

    const handleReset = useCallback(() => {
        setCodes((prev) => ({ ...prev, [challenge.id]: challenge.starterCode }));
        setResult(null);
        setShowHint(false);
    }, [challenge]);

    return (
        <section id="challenge" className="relative py-28 px-6">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-semibold text-green-300 bg-green-500/10 border border-green-500/20 rounded-full">
                        Try It Now
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        Don&apos;t Just Read. <span className="gradient-text">Code.</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Here&apos;s a real CodeBite challenge. Write your solution, hit Run, and see
                        if you pass — right here on this page.
                    </p>
                </motion.div>

                {/* Challenge tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {challenges.map((c, i) => (
                        <button
                            key={c.id}
                            onClick={() => {
                                setActiveIdx(i);
                                setResult(null);
                                setShowHint(false);
                            }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all duration-200 ${activeIdx === i
                                ? "bg-blue-500/20 border border-blue-500/40 text-blue-300"
                                : "bg-gray-800/50 border border-gray-800 text-gray-400 hover:text-gray-300 hover:border-gray-700"
                                }`}
                        >
                            <span
                                className="w-2 h-2 rounded-full"
                                style={{ backgroundColor: c.difficultyColor }}
                            />
                            {c.title}
                        </button>
                    ))}
                </div>

                {/* Editor card */}
                <motion.div
                    className="rounded-2xl border border-gray-800/60 bg-cb-card/80 backdrop-blur-sm overflow-hidden"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    {/* Card header */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-gray-800/60">
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1.5">
                                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                            </div>
                            <span className="text-sm font-semibold text-white">
                                {challenge.title}
                            </span>
                            <span
                                className="px-2 py-0.5 text-[10px] font-bold rounded-full"
                                style={{
                                    color: challenge.difficultyColor,
                                    backgroundColor: challenge.difficultyColor + "20",
                                }}
                            >
                                {challenge.difficulty}
                            </span>
                        </div>
                        <span className="text-xs text-gray-500">+{challenge.xp} XP</span>
                    </div>

                    {/* Description */}
                    <div className="px-5 py-3 border-b border-gray-800/40">
                        <p className="text-sm text-gray-300">{challenge.description}</p>
                    </div>

                    {/* Monaco editor */}
                    <div className="p-4" key={challenge.id}>
                        <MonacoEditor
                            height="200px"
                            language={challenge.language}
                            theme="vs-dark"
                            value={codes[challenge.id]}
                            onChange={(value) =>
                                setCodes((prev) => ({
                                    ...prev,
                                    [challenge.id]: value || "",
                                }))
                            }
                            options={{
                                minimap: { enabled: false },
                                fontSize: 14,
                                fontFamily: "'JetBrains Mono', monospace",
                                lineNumbers: "on",
                                scrollBeyondLastLine: false,
                                renderLineHighlight: "all",
                                padding: { top: 12, bottom: 12 },
                                overviewRulerLanes: 0,
                                hideCursorInOverviewRuler: true,
                                overviewRulerBorder: false,
                                scrollbar: { vertical: "hidden" },
                                wordWrap: "on",
                            }}
                        />
                    </div>

                    {/* Action bar */}
                    <div className="flex items-center justify-between px-5 py-3 border-t border-gray-800/40">
                        <div className="flex gap-2">
                            <button
                                onClick={() => setShowHint(!showHint)}
                                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-colors"
                            >
                                {showHint ? "Hide Hint" : "💡 Hint"}
                            </button>
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 text-xs font-semibold rounded-lg bg-gray-800 text-gray-400 hover:text-gray-200 hover:bg-gray-700 transition-colors"
                            >
                                ↺ Reset
                            </button>
                        </div>
                        <motion.button
                            onClick={handleRun}
                            disabled={isRunning}
                            className="relative px-6 py-2.5 text-sm font-bold rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 text-white overflow-hidden disabled:opacity-50 transition-all hover:shadow-[0_0_30px_rgba(59,130,246,0.4)]"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.97 }}
                        >
                            {isRunning ? (
                                <span className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                    Running...
                                </span>
                            ) : (
                                "▶ Run Code"
                            )}
                        </motion.button>
                    </div>

                    {/* Hint */}
                    <AnimatePresence>
                        {showHint && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="overflow-hidden"
                            >
                                <div className="px-5 py-3 bg-amber-500/5 border-t border-amber-500/20">
                                    <p className="text-sm text-amber-300">
                                        💡 <span className="font-semibold">Hint:</span>{" "}
                                        {challenge.hint}
                                    </p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Result */}
                    <div className="px-5 pb-4">
                        <AnimatePresence mode="wait">
                            {result && (
                                <ResultBanner
                                    passed={result === "pass"}
                                    xp={challenge.xp}
                                    onTryAgain={handleReset}
                                />
                            )}
                        </AnimatePresence>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
