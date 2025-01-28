import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    const mockData: Question[] = [
      {
        question_number: 1,
        question: "Translate the word 'tree' into Telugu.",
        options: ["A) చెట్టు", "B) పూలు", "C) కాపురం", "D) ఇల్లు"],
        answer: "A) చెట్టు",
      },
      {
        question_number: 2,
        question: "Translate the word 'book' into Telugu.",
        options: ["A) పుస్తకం", "B) చెట్టు", "C) కూర్చీ", "D) నీరు"],
        answer: "A) పుస్తకం",
      },
      {
        question_number: 3,
        question: "Translate the word 'water' into Telugu.",
        options: ["A) చెట్టు", "B) పూలు", "C) నీరు", "D) ఇల్లు"],
        answer: "C) నీరు",
      },
      {
        question_number: 4,
        question: "Translate the word 'chair' into Telugu.",
        options: ["A) చెట్టు", "B) కూర్చీ", "C) పూలు", "D) ఇల్లు"],
        answer: "B) కూర్చీ",
      },
      {
        question_number: 5,
        question: "Translate the word 'house' into Telugu.",
        options: ["A) చెట్టు", "B) పూలు", "C) ఇల్లు", "D) కూర్చీ"],
        answer: "C) ఇల్లు",
      },
    ];
    setQuizData(mockData);
    setLoading(false);
  }, []);

  const handleOptionChange = (option: string) => {
    setUserAnswers({ ...userAnswers, [quizData[currentQuestionIndex].question_number]: option });
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

  const handleBackToMain = () => {
    window.location.reload(); // Replace with navigation logic if using a router
  };

  const calculateScore = () => {
    let totalScore = 0;
    quizData.forEach((question) => {
      const userAnswer = userAnswers[question.question_number];
      if (userAnswer === question.answer) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
  };

  if (loading) {
    return <div className="loading">Loading quiz questions...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz: Learning English from Telugu</h1>
      {score === null ? (
        <div className="quiz-question">
          <h2>
            {quizData[currentQuestionIndex].question_number}. {quizData[currentQuestionIndex].question}
          </h2>
          <div className="quiz-options">
            {quizData[currentQuestionIndex].options.map((option) => (
              <label
                key={option}
                className={`quiz-option ${userAnswers[quizData[currentQuestionIndex].question_number] === option ? "selected-option" : ""}`}
              >
                <input
                  type="radio"
                  name={`question-${quizData[currentQuestionIndex].question_number}`}
                  value={option}
                  onChange={() => handleOptionChange(option)}
                  checked={userAnswers[quizData[currentQuestionIndex].question_number] === option}
                />
                {option}
              </label>
            ))}
          </div>
          <div className="quiz-navigation">
            <button onClick={handlePrevQuestion} className="quiz-prev-btn" disabled={currentQuestionIndex === 0}>
              Previous
            </button>
            <button onClick={handleNextQuestion} className="quiz-next-btn">
              {currentQuestionIndex < quizData.length - 1 ? "Next" : "Submit"}
            </button>
          </div>
        </div>
      ) : (
        <div className="quiz-result">
          <h2>Your Score: {score}/{quizData.length}</h2>
          <div className="quiz-result-buttons">
            <button onClick={handleRetakeQuiz} className="quiz-retake-btn">
              Retake Quiz
            </button>
            <button onClick={handleBackToMain} className="quiz-back-btn">
              Back to Main
            </button>
          </div>
        </div>
      )}
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
          background-image: url("https://media.gettyimages.com/id/1428791839/video/questions-marks-animated-4k-chroma-key-loopable.jpg?s=640x640&k=20&c=ghH4BOgglK5lr6OGD03PeMn-QuyLU6xn7DpU8ISojNE=");
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
      `}</style>
    </div>
  );
};

export default QuizGenerator;