import LandingPage from "@/components/landingpage";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "Telugu Voice Collection",
  description: "Thankyou For your Contribution.",
};

export default function Home() {
  return (
    <>
    <style jsx>{`
        body {
          margin: 0; /* Remove default margin */
          padding: 0; /* Remove default padding */
          box-sizing: border-box;
        }
      `}</style>
      <Analytics/>
      <LandingPage />
    </>
  );
}
