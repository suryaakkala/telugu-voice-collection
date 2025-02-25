import { useState } from "react";
import { useId } from "react";
import { Send } from "lucide-react";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

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


const fetchApi = "https://telugu-chatbot.herokuapp.com/api/get-sentences";
const checkApi = "https://telugu-chatbot.herokuapp.com/api/check-sentence";

interface Feedback {
  "correct sentence": string;
  "your sentence": string;
  status: string;
}

const TypingPractice = () => {
  const [teluguSentence, setTeluguSentence] = useState("");
  const [englishInput, setEnglishInput] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const id = useId();

    const router = useRouter();
    const handleBackToMain = () => {
      router.push("/");
    };
  
  const fetchSentence = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(fetchApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user: "rahul", difficulty_level: "easy" }),
      });

      if (!response.ok) throw new Error("Failed to fetch sentence");

      const data = await response.json();
      if (data.status === "success" && data.sentences?.length > 0) {
        setTeluguSentence(data.sentences[0].sen1);
      } else {
        setError("No sentence received.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  const checkSentence = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(checkApi, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ telugu: teluguSentence, english: englishInput }),
      });

      if (!response.ok) throw new Error("Failed to check sentence");

      const data = await response.json();
      setFeedback(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error occurred");
    } finally {
      setLoading(false);
    }
  };

  // if (loading)
  //     return (
  //     <div>
  //       <div className="center-screen">
  //         <Spinner variant="pinwheel" className="w-12 h-12 text-blue-500" />
  //         <p className="loading-text">Loading Quiz Please Wait...</p>
  //       </div>
  //       <style jsx>{`
  //         .center-screen {
  //           position: fixed;
  //           top: 50%;
  //           left: 50%;
  //           transform: translate(-50%, -50%);
  //           display: flex;
  //           flex-direction: column;
  //           align-items: center;
  //           justify-content: center;
  //           width: 100vw;
  //           height: 100vh;
  //           background: rgba(255, 255, 255, 0.8); /* Optional: Light overlay */
  //         }
  //         .loading-text {
  //           margin-top: 1rem;
  //           font-size: 1.25rem;
  //           color: #000;
  //           font-family: 'Arial', sans-serif; /* Change the font family */
  //           font-weight: bold; /* Make the text bold */
  //         }
  //       `}</style>
  //     </div>
  //     );

  if (error) {
    handleBackToMain();
    return null; // Ensure the component stops rendering
  }

  return (
    <div className="container">
      <style>
        {`
          .container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 16px;
            padding: 24px;
            background-color: #1e1e1e;
            color: white;
            font-family: Arial, sans-serif;
          }
          .heading {
            font-size: 24px;
            font-weight: bold;
          }
          .sentence {
            font-size: 18px;
            font-weight: bold;
            margin-top: 16px;
          }
          .button {
            margin-top: 16px;
            padding: 10px 20px;
            border: none;
            background-color: #007bff;
            color: white;
            cursor: pointer;
            border-radius: 5px;
          }
          .input-container {
            position: relative;
            width: 100%;
            max-width: 400px;
          }
          .input {
            width: 100%;
            padding: 10px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .send-button {
            position: absolute;
            right: 10px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            cursor: pointer;
          }
          .error {
            color: red;
            margin-top: 10px;
          }
          .feedback {
            margin-top: 16px;
            padding: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #333;
          }
        `}
      </style>
      <p className="heading">Telugu Typing Practice</p>
      <div className="text-center">
        <p>Translate the given Telugu sentence into English:</p>
        <p className="sentence">{teluguSentence || "Click below to get a sentence"}</p>
        <button className="button" onClick={fetchSentence} disabled={loading}>
          {loading ? "Loading..." : "Get Sentence"}
        </button>
      </div>
      <label htmlFor={id}>Type the English equivalent here...</label>
      <div className="input-container">
        <input
          id={id}
          className="input"
          placeholder="Type here..."
          type="text"
          value={englishInput}
          onChange={(e) => setEnglishInput(e.target.value)}
        />
        <button className="send-button" aria-label="Submit" onClick={checkSentence}>
          <Send size={16} strokeWidth={2} aria-hidden="true" />
        </button>
      </div>
      {error && <p className="error">{error}</p>}
      {feedback && (
        <div className="feedback">
          <p><strong>Correct Sentence:</strong> {feedback["correct sentence"]}</p>
          <p><strong>Your Sentence:</strong> {feedback["your sentence"]}</p>
          <p><strong>Status:</strong> {feedback.status}</p>
        </div>
      )}
    </div>
  );
};

export default TypingPractice;
