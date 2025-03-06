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
        backgroundColor: "#DFF6FF",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <img src="/klu.png" alt="Left Logo" style={{ height: "40px" }} />
      <img src="/klug.png" alt="Right Logo" style={{ height: "40px" }} />
    </header>
  );
};


export default function Home() {
  return (
    <div className={` ${inter.className}`} style={{ overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <Analytics/>
      <Header />
      <LandingPage />
    </div>
  );
}
