import LandingPage from "@/components/landingpage";
import { Inter } from "next/font/google"
import type { Metadata } from "next"
import "@/styles/globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Telugu Chat Bot",
  description: "Experience the power of conversing in Telugu with our advanced AI chatbot.",
}

export default function Home() {
  return (
    <div className={`min-h-screen bg-gray-100 flex items-center justify-center ${inter.className}`}>
      <LandingPage />
    </div>
  )
}
