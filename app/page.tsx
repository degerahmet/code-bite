import Hero from "@/components/Hero";
import ProductDemo from "@/components/ProductDemo";
import CodeChallenge from "@/components/CodeChallenge";
import Leaderboard from "@/components/Leaderboard";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main>
            <Hero />
            <div className="section-divider" />
            <ProductDemo />
            <div className="section-divider" />
            <CodeChallenge />
            <div className="section-divider" />
            <Leaderboard />
            <Footer />
        </main>
    );
}
