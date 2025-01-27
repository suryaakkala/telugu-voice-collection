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
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch quiz questions from API
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://your-api-endpoint.com/quiz", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: "Learning English from Telugu",
            num_questions: 5,
            difficulty: "Beginner",
          }),
        });
    
        if (!response.ok) {
          throw new Error(`Failed to fetch quiz data: ${response.statusText}`);
        }
    
        const data: Question[] = await response.json();
        setQuizData(data);
        setLoading(false);
      } catch (err) {
        // Safely handle 'err' with type guard
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
        setLoading(false);
      }
    };    
    fetchQuiz();
  }, []);

  const handleOptionChange = (questionNumber: number, option: string) => {
    setUserAnswers({ ...userAnswers, [questionNumber]: option });
  };

  const handleSubmit = () => {
    let totalScore = 0;
    quizData.forEach((question) => {
      if (userAnswers[question.question_number] === question.answer) {
        totalScore += 1;
      }
    });
    setScore(totalScore);
  };

  if (loading) {
    return <div>Loading quiz questions...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="quiz-container">
      <h1 className="quiz-title">Quiz: Learning English from Telugu</h1>
      {quizData.map((question) => (
        <div key={question.question_number} className="quiz-question">
          <h2>{question.question_number}. {question.question}</h2>
          <div className="quiz-options">
            {question.options.map((option) => (
              <label key={option} className="quiz-option">
                <input
                  type="radio"
                  name={`question-${question.question_number}`}
                  value={option}
                  onChange={() => handleOptionChange(question.question_number, option)}
                  checked={userAnswers[question.question_number] === option}
                />
                {option}
              </label>
            ))}
          </div>
        </div>
      ))}
      <button onClick={handleSubmit} className="quiz-submit-btn">
        Submit
      </button>
      {score !== null && (
        <div className="quiz-result">
          <h2>Your Score: {score}/{quizData.length}</h2>
        </div>
      )}
      <style jsx>{`
        .quiz-container {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: #f9f9f9;
        }
        .quiz-title {
          font-size: 24px;
          margin-bottom: 20px;
          text-align: center;
        }
        .quiz-question {
          margin-bottom: 20px;
        }
        .quiz-options {
          display: flex;
          flex-direction: column;
        }
        .quiz-option {
          margin-bottom: 10px;
        }
        .quiz-submit-btn {
          display: block;
          margin: 20px auto;
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .quiz-submit-btn:hover {
          background: #0056b3;
        }
        .quiz-result {
          margin-top: 20px;
          text-align: center;
          font-size: 18px;
        }
      `}</style>
    </div>
  );
};

export default QuizGenerator;
