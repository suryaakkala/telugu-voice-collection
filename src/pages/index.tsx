import LandingPage from "@/components/landingpage";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Telugu Chat Bot",
  description: "Experience the power of conversing in Telugu with our advanced AI chatbot.",
};

const Header: React.FC = () => {
  return (
    <header
      style={{
        width: "100%",
        backgroundColor: "white",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "8px 16px",
      }}
    >
      <img src="/klu.png" alt="Left Logo" style={{ height: "40px" }} />
      <img src="/klug.png" alt="Right Logo" style={{ height: "40px" }} />
    </header>
  );
};


export default function Home() {
  return (
    <div className={`min-h-screen bg-gray-100 ${inter.className}`}>
      <Analytics/>
      <Header />
      <main className="flex items-center justify-center h-full">
        <LandingPage />
      </main>
    </div>
  );
}
