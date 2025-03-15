import TypingPractice from "@/components/TypingPractice";
import "@/styles/globals.css";

export default function TypingMatchingActivityPage() {
  return (
    <>
      <style jsx global>{`
        body {
          margin: 0; /* Remove default margin */
          padding: 0; /* Remove default padding */
          box-sizing: border-box;
        }
      `}</style>
      <TypingPractice />
    </>
  );
}