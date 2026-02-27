"use client";

import { motion } from "framer-motion";

export default function Footer() {
    return (
        <footer className="relative py-20 px-6 border-t border-gray-800/40">
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Final CTA */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-black mb-4">
                        Ready to{" "}
                        <span className="gradient-text">Ship Faster?</span>
                    </h2>
                    <p className="text-lg text-gray-400 max-w-md mx-auto mb-8">
                        Stop watching. Start coding. Your first lesson is 60 seconds away.
                    </p>
                    <motion.a
                        href="#hero"
                        className="group relative inline-flex items-center gap-2 px-10 py-5 rounded-2xl font-bold text-lg bg-gradient-to-r from-blue-500 to-green-500 text-white overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(59,130,246,0.4)]"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative z-10 flex items-center gap-2">
                            Start Learning — It&apos;s Free
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
                </motion.div>

                {/* Divider */}
                <div className="section-divider mb-10" />

                {/* Bottom row */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <img src="/logo.png" alt="CodeBite Logo" className="w-10 h-10 object-contain rounded-xl bg-gray-900 border border-gray-800 p-1" />
                        <span className="text-xl font-black">
                            Code<span className="gradient-text">Bite</span>
                        </span>
                    </div>

                    {/* Snowflake badge */}
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-gray-800 bg-gray-900/50">
                        <svg
                            className="w-4 h-4 text-blue-400"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                        >
                            <path d="M12 0l1.5 3.5L17 2l-1 3.5L20 7l-3.5 1L18 12l-3.5-1.5L13 14l-1-3.5L8 12l1.5-3.5L6 7l3.5-1.5L8 2l3.5 1.5z" />
                        </svg>
                        <span className="text-xs text-gray-400 font-medium">
                            Powered by Snowflake AI Data Cloud
                        </span>
                    </div>

                    {/* Copyright */}
                    <p className="text-sm text-gray-600">
                        © {new Date().getFullYear()} CodeBite. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
