import { useState } from "react";
import { useId } from "react";
import { Send } from "lucide-react";


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
