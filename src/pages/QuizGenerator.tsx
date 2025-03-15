import QuizGenerator from "@/components/QuizGenerator";
import "@/styles/globals.css";

export default function QuizGeneratorPage() {
  return (
    <>
    <style jsx global>{`
        body {
          margin: 0; /* Remove default margin */
          padding: 0; /* Remove default padding */
          box-sizing: border-box;
        }
      `}</style>
      <QuizGenerator />
    </>
  );
}
