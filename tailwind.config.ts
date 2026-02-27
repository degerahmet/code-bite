import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        "cb-bg": "#050816",
        "cb-card": "#0b1020",
        "cb-accent": "#3b82f6",
        "cb-accent-alt": "#a3e635"
      },
      boxShadow: {
        "glow-blue": "0 0 25px rgba(59,130,246,0.6)",
        "glow-green": "0 0 25px rgba(163,230,53,0.6)"
      }
    }
  },
  plugins: []
};

export default config;

