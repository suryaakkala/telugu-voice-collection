import React, { useState, useEffect } from "react";
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

interface MatchingPair {
  "Column A": string;
  "Column B": string;
}

const TextMatchingActivity: React.FC = () => {
  const [pairs, setPairs] = useState<MatchingPair[]>([]);
  const [columnB, setColumnB] = useState<string[]>([]);
  const [selectedMatches, setSelectedMatches] = useState<Map<string, string>>(
    new Map()
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Shuffle an array (for randomizing Column B)
  const shuffleArray = (array: string[]) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  useEffect(() => {
    const fetchPairs = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "https://374svx84-5000.inc1.devtunnels.ms/text-matching-activity",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              main_topic: "Basic Vocabulary",
              difficulty: "Beginner",
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const data: MatchingPair[] = await response.json();
        setPairs(data); // Set the fetched data
        setColumnB(shuffleArray(data.map((pair) => pair["Column B"]))); // Populate Column B
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setLoading(false);
      }
      
    };

    fetchPairs();

    // Commenting out the sample data
    // const samplePairs = [
    //   {
    //     "Column A": "1) Apple",
    //     "Column B": "A) పండు",
    //   },
    //   {
    //     "Column A": "2) Book",
    //     "Column B": "B) పుస్తకం",
    //   },
    //   {
    //     "Column A": "3) Chair",
    //     "Column B": "C) కూర్చీ",
    //   },
    //   {
    //     "Column A": "4) Tree",
    //     "Column B": "D) చెట్టు",
    //   },
    //   {
    //     "Column A": "5) Water",
    //     "Column B": "E) నీరు",
    //   },
    // ];

    // setPairs(samplePairs); // Set the hardcoded data
    // setColumnB(shuffleArray(samplePairs.map((pair) => pair["Column B"]))); // Populate Column B
  }, []);

  // Handle selecting a match
  const handleMatch = (colA: string, colB: string) => {
    const updatedMatches = new Map(selectedMatches);
    updatedMatches.set(colA, colB);
    setSelectedMatches(updatedMatches);
  };

  // Check if the user has completed the activity correctly
  const checkAnswers = () => {
    let allCorrect = true;
    for (const pair of pairs) {
      if (selectedMatches.get(pair["Column A"]) !== pair["Column B"]) {
        allCorrect = false;
        break;
      }
    }
    alert(allCorrect ? "✅ All answers are correct!" : "❌ Some answers are incorrect.");
  };

  if (loading) {
    return <div className="loading">Loading activity...</div>;
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${inter.className}`}>
      <Header />
      <div className="text-matching-container">
        <h1 className="activity-title">Text Matching Activity</h1>
        <div className="matching-grid">
          <div className="column column-a">
            <h2>Column A</h2>
            {pairs.map((pair) => (
              <div key={pair["Column A"]} className="item">
                {pair["Column A"]}
              </div>
            ))}
          </div>
          <div className="column matching-input">
            <h2>Match</h2>
            {pairs.map((pair, index) => (
              <div key={pair["Column A"]} className="matching-row">
                <label htmlFor={`match-${index}`} className="sr-only">
                  Match for {pair["Column A"]}
                </label>
                <select
                  id={`match-${index}`}
                  value={selectedMatches.get(pair["Column A"]) || ""}
                  onChange={(e) => handleMatch(pair["Column A"], e.target.value)}
                  title={`Match for ${pair["Column A"]}`}
                >
                  <option value="" disabled>
                    Select
                  </option>
                  {columnB.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
          <div className="column column-b">
            <h2>Column B</h2>
            {columnB.map((item) => (
              <div
                key={item}
                className={`item ${
                  Array.from(selectedMatches.values()).includes(item) ? "selected" : ""
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <button className="submit-btn" onClick={checkAnswers}>
          Submit
        </button>
        <style jsx>{`
        .text-matching-container {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: #f9f9f9;
        }
        .activity-title {
          font-size: 24px;
          margin-bottom: 20px;
          text-align: center;
        }
        .matching-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
        }
        .column {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .column h2 {
          font-size: 18px;
          margin-bottom: 10px;
        }
        .item {
          padding: 10px;
          margin: 5px 0;
          border: 1px solid #ccc;
          border-radius: 4px;
          background: #fff;
          cursor: pointer;
          text-align: center;
        }
        .item.selected {
          background: #007bff;
          color: white;
        }
        .matching-input select {
          margin: 5px 0;
          padding: 5px;
          width: 100%;
        }
        .submit-btn {
          margin-top: 20px;
          padding: 10px 20px;
          background: #28a745;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .submit-btn:hover {
          background: #218838;
        }
        .error-message {
          color: red;
          text-align: center;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          border: 0;
        }
      `}</style>
      </div>
    </div>
  );
};

export default TextMatchingActivity;
