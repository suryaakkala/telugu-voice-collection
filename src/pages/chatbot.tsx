import Chatbot from "../components/Chatbot";
// import "@/styles/globals.css";

export default function ChatbotPage() {
  return (
    <>
    <style jsx >{`
        body {
          margin: 0; /* Remove default margin */
          padding: 0; /* Remove default padding */
          box-sizing: border-box;
        }
      `}</style>
      <Chatbot />
    </>
  );
}
