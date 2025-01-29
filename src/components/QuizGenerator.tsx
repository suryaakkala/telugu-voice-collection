import React, { useEffect, useState } from "react";
import { Inter } from "next/font/google";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";


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

interface Question {
  question_number: number;
  question: string;
  options: string[];
  answer: string;
}

const QuizGenerator: React.FC = () => {
  const [quizData, setQuizData] = useState<Question[]>([]);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const handleBackToMain = () => {
    router.push("/");
  };


  useEffect(() => {
    const fetchQuizData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://rwhmdthc-5000.inc1.devtunnels.ms/quiz-generator", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic: "Learning English from Telugu",
            num_questions: 5,
            difficulty: "Beginner",
          }),
        });
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data: Question[] = await response.json();
        setQuizData(data);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizData();
  }, []);

  const handleOptionChange = (option: string) => {
    setUserAnswers({
      ...userAnswers,
      [quizData[currentQuestionIndex].question_number]: option.trim(),
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleRetakeQuiz = () => {
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setScore(null);
  };


  const calculateScore = () => {
    let totalScore = 0;
    quizData.forEach((question) => {
      const userAnswer = userAnswers[question.question_number]?.trim();
      const correctAnswer = question.answer.trim();
      if (userAnswer === correctAnswer) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
  };

  if (loading)
    return (
    <div>
      <div className="center-screen">
        <Spinner variant="pinwheel" className="w-12 h-12 text-blue-500" />
        <p className="loading-text">Loading Quiz Please Wait...</p>
      </div>
      <style jsx>{`
        .center-screen {
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 100vw;
          height: 100vh;
          background: rgba(255, 255, 255, 0.8); /* Optional: Light overlay */
        }
        .loading-text {
          margin-top: 1rem;
          font-size: 1.25rem;
          color: #000;
          font-family: 'Arial', sans-serif; /* Change the font family */
          font-weight: bold; /* Make the text bold */
        }
      `}</style>
    </div>
    );
  
  if (error) {
    handleBackToMain();
    return null; // Ensure the component stops rendering
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${inter.className}`}>
      <Header />
      <div className="quiz-container">
        <h1 className="quiz-title">Quiz: Learning English from Telugu</h1>
        {score === null ? (
          <div>
            <h2>
              {quizData[currentQuestionIndex].question_number}. {quizData[currentQuestionIndex].question}
            </h2>
            <div className="quiz-options">
              {quizData[currentQuestionIndex].options.map((option) => {
                const isSelected = userAnswers[quizData[currentQuestionIndex].question_number] === option.trim();
                const isCorrect = quizData[currentQuestionIndex].answer.trim() === option.trim();
                return (
                  <label
                    key={option}
                    className={`quiz-option ${isSelected ? "selected-option" : ""} ${isCorrect ? "correct-option" : ""}`}
                  >
                    <input
                      type="radio"
                      name={`question-${quizData[currentQuestionIndex].question_number}`}
                      value={option}
                      onChange={() => handleOptionChange(option)}
                      checked={isSelected}
                    />
                    {option}
                  </label>
                );
              })}
            </div>
            <div>
              <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>Previous</button>
              <button onClick={handleNextQuestion}>
                {currentQuestionIndex < quizData.length - 1 ? "Next" : "Submit"}
              </button>
            </div>
          </div>
        ) : (
          <div>
            <h2>Your Score: {score}/{quizData.length}</h2>
            <button onClick={handleRetakeQuiz}>Retake Quiz</button>
            <button onClick={handleBackToMain}>Back to Main</button>
          </div>
        )}
      </div>
        <style jsx>{`
        :root {
          --primary-color: #0ff1ce;
          --secondary-color: #1a1a2e;
          --text-color: #e0e0e0;
          --bg-color: #0f0f1f;
          --selected-option-color: #0f0;
        }

        .quiz-container {
          font-family: 'Arial', sans-serif;
          max-width: 700px;
          margin: 50px auto;
          padding: 30px;
          border-radius: 20px;
          background: var(--bg-color);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          color: var(--text-color);
          text-align: center;
          // background-image: url("https://media.gettyimages.com/id/1428791839/video/questions-marks-animated-4k-chroma-key-loopable.jpg?s=640x640&k=20&c=ghH4BOgglK5lr6OGD03PeMn-QuyLU6xn7DpU8ISojNE=");
        }

        .quiz-title {
          font-size: 2.5rem;
          color: var(--primary-color);
          margin-bottom: 20px;
          background: linear-gradient(to right,rgb(218, 241, 15),rgb(219, 52, 94));
          -webkit-background-clip: text;
          color: transparent;
        }

        .quiz-question {
          margin-bottom: 20px;
          text-align: left;
        }

        .quiz-question h2 {
          font-size: 1.5rem;
          margin-bottom: 10px;
        }

        .quiz-options {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .quiz-option {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px;
          background: var(--secondary-color);
          border-radius: 10px;
          box-shadow: inset 5px 5px 15px rgba(0, 0, 0, 0.5), inset -5px -5px 15px rgba(255, 255, 255, 0.1);
          cursor: pointer;
          transition: transform 0.2s, background 0.3s;
        }

        .quiz-option:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 255, 255, 0.2);
        }

        .quiz-option input {
          accent-color: var(--primary-color);
        }

       .selected-option {
          background:orange !important; /* Use a green color */
          color: #ffffff; /* Make the text white for better contrast */
        }


        .quiz-navigation {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }

        .quiz-prev-btn,
        .quiz-next-btn {
          padding: 15px 30px;
          border: none;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
        }

        .quiz-prev-btn {
          background: #3498db;
          color: var(--bg-color);
        }

        .quiz-prev-btn:hover {
          background: #0ff1ce;
        }

        .quiz-prev-btn:disabled {
          background: #555;
          cursor: not-allowed;
        }

        .quiz-next-btn {
          background: var(--primary-color);
          color: var(--bg-color);
        }

        .quiz-next-btn:hover {
          background: #3498db;
        }

        .quiz-result {
          margin-top: 20px;
          font-size: 1.2rem;
          color: var(--primary-color);
        }

        .quiz-result-buttons {
          margin-top: 20px;
          display: flex;
          gap: 20px;
          justify-content: center;
        }

        .quiz-retake-btn,
        .quiz-back-btn {
          padding: 15px 30px;
          border: none;
          border-radius: 30px;
          font-size: 1rem;
          font-weight: bold;
          cursor: pointer;
          transition: background 0.3s;
          background: var(--primary-color);
          color: var(--bg-color);
        }

        .quiz-retake-btn:hover,
        .quiz-back-btn:hover {
          background: #3498db;
        }
          .correct-option {
          background: green !important;
          color: white !important;
        }
      `}</style>
    </div>
  );
};

export default QuizGenerator;
