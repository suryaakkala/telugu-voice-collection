import React, { useState, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  return (
    <header
      style={{
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        backgroundColor: "#023047", // Dark Blue
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        padding: "5px",
        top: 0,
        left: 0,
        zIndex: 1000,
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
  const router = useRouter();
  const handleBackToMain = () => {
    router.push("/");
  };
  // Shuffle an array (for randomizing Column B)
  const shuffleArray = (array: string[]) => {
    return array
      .map((item) => ({ item, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ item }) => item);
  };

  useEffect(() => {
    // const fetchPairs = async () => {
    //   setLoading(true);
    //   setError(null);
    //   try {
    //     const response = await fetch(
    //       "https://rwhmdthc-5000.inc1.devtunnels.ms/text-matching-activity",
    //       {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           main_topic: "Basic Vocabulary",
    //           difficulty: "Beginner",
    //         }),
    //       }
    //     );

    //     if (!response.ok) {
    //       throw new Error(`Error: ${response.statusText}`);
    //     }

    //     const data: MatchingPair[] = await response.json();
    //     setPairs(data); // Set the fetched data
    //     setColumnB(shuffleArray(data.map((pair) => pair["Column B"]))); // Populate Column B
    //   } catch (err: unknown) {
    //     if (err instanceof Error) {
    //       setError(err.message);
    //     } else {
    //       setError("An unknown error occurred.");
    //     }
    //   } finally {
    //     setLoading(false);
    //   }
      
    // };

    // fetchPairs();

    // Commenting out the sample data
    const samplePairs = [
      {
        "Column A": "Apple",
        "Column B": "పండు",
      },
      {
        "Column A": "Book",
        "Column B": "పుస్తకం",
      },
      {
        "Column A": "Chair",
        "Column B": "కూర్చీ",
      },
      {
        "Column A": "Tree",
        "Column B": "చెట్టు",
      },
      {
        "Column A": "Water",
        "Column B": "నీరు",
      },
    ];

    setPairs(samplePairs); // Set the hardcoded data
    setColumnB(shuffleArray(samplePairs.map((pair) => pair["Column B"]))); // Populate Column B
    setLoading(false);
    setError(null);
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

  if (loading)
      return (
      <div>
        <div className="center-screen">
          <Spinner variant="pinwheel" className="w-12 h-12 text-blue-500" />
          <p className="loading-text">Loading Text Matching Activity Please Wait...</p>
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
    <>
    <div className="textmatch" >
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
                  className="input-field"
                >
                  <option value="" disabled >
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
          body {
            margin: 0; /* Remove default margin */
            padding: 0; /* Remove default padding */
            box-sizing: border-box;
            height: 100vh;
          }
        .textmatch {
          margin: 0;
          background: rgb(0 255 137 / 25%);
          height: 100vh;
          padding-top: 60px;
        }
        .text-matching-container {
          font-family: Arial, sans-serif;
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: #219EBC;
        }
        .activity-title {
          color: #023047;
          font-size: 24px;
          margin-bottom: 20px;
          text-align: center;
        }
        .matching-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
          color: #023047;
        }
        .column {
          color: #023047;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .column h2 {
          font-size: 18px;
          margin-bottom: 10px;
          color : #023047;
        }
        .item {
          padding: 10px;
          margin: 5px 0;
          border-radius: 4px;
          background: #FB8500;
          cursor: pointer;
          text-align: center;
        }
        .item.selected {
          background: #00458f;
          color: #ffb703;
        }
        .matching-input select {
          margin: 5px 0;
          padding: 5px;
          width: 100%;
        }
        .matching-row{
          display: flex;
          flex-direction: column;
          align-items: center;

        }
        .input-field {
          padding: 8px;
          border-radius: 4px;
          background-color:rgba(251, 134, 0, 0.73);
          color: #023047;
          font-size: 16px;
          width: 100%;
        }
        .input-field:focus {
          outline: none;
          border-color: #FFB703;
          background-color: #fb8500;
        }
        .submit-btn {
          margin-top: 20px;
          padding: 10px 20px;
          background: #023047;
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
          Background: #023047;
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
    </>
  );
};

export default TextMatchingActivity;
