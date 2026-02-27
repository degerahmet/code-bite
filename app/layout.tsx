import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "CodeBite — Learn Code in 60 Seconds",
    description:
        "TikTok-style micro-learning for coding. Swipe through 60-second lessons, earn streaks, climb leaderboards, and get real-time AI feedback.",
    openGraph: {
        title: "CodeBite — Learn Code in 60 Seconds",
        description:
            "Bite-sized coding lessons. Swipe to level up. Ship faster.",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className="dark">
            <body className="antialiased">{children}</body>
        </html>
    );
}
