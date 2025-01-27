import React, { useState, useRef, useEffect } from "react";

interface Sentence {
  English: string;
  Telugu: string;
}

const VoiceInputPractice: React.FC = () => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isRecording, setIsRecording] = useState<number | null>(null);
  const [results, setResults] = useState<(string | null)[]>([]); // Stores "correct", "incorrect", or null
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  // Fetch sentences from the API
  const fetchSentences = async () => {
    try {
      const response = await fetch(
        "https://61zfnp3s-5000.inc1.devtunnels.ms/voice-input-practice",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic: "Introducing Yourself",
            difficulty: "Beginner",
          }),
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch sentences: ${response.statusText}`);
      }

      const data = await response.json();

      if (data.status === "success") {
        if (!Array.isArray(data.data) || !data.data.length) {
          throw new Error("No sentences available.");
        }
        setSentences(data.data);
        setResults(Array(data.data.length).fill(null)); // Initialize results for each sentence
      } else {
        throw new Error(data.message || "Error fetching sentences.");
      }

      setLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
      setLoading(false);
    }
  };

  // Fetch sentences on component mount
  useEffect(() => {
    fetchSentences();
  }, []);

  // Handle recording audio for a specific sentence
  const toggleRecording = async (index: number) => {
    if (isRecording === index) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(null);
      }
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const chunks: BlobPart[] = [];
        chunksRef.current = chunks;

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: "audio/webm" });
          const formData = new FormData();
          formData.append("audio", audioBlob);

          // Add the corresponding sentence pair to the request
          const sentence = sentences[index];
          const payload = JSON.stringify({
            data: {
              English: sentence.English,
              Telugu: sentence.Telugu,
            },
          });

          formData.append("sentenceData", payload);

          // Send the audio and sentence pair to the backend for validation
          try {
            const response = await fetch(
              "https://61zfnp3s-5000.inc1.devtunnels.ms/voice-input-check",
              {
                method: "POST",
                body: formData,
              }
            );
            const result = await response.json();

            if (result.status === "success") {
              const updatedResults = [...results];
              updatedResults[index] = result.message === "correct" ? "correct" : "incorrect";
              setResults(updatedResults);
            } else {
              alert("Error validating the sentence. Please try again.");
            }
          } catch (error) {
            console.error("Error sending audio:", error);
          }

          // Stop all tracks to release the microphone
          const tracks = stream.getTracks();
          tracks.forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(index);
      } catch (error) {
        console.error("Error accessing microphone:", error);
      }
    }
  };

  if (loading) {
    return <div>Loading sentences...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="voice-practice-container">
      <h1 className="practice-title">Voice Input Practice</h1>
      <div className="practice-sentences">
        {sentences.map((sentence, index) => (
          <div key={index} className="sentence-pair">
            <div>
              <p className="english-sentence">
                <strong>English:</strong> {sentence.English}
              </p>
              <p className="telugu-sentence">
                <strong>Telugu:</strong> {sentence.Telugu}
              </p>
            </div>
            <button
              onClick={() => toggleRecording(index)}
              className={`record-btn ${isRecording === index ? "recording" : ""}`}
            >
              {isRecording === index ? "Stop Recording" : "Record"}
            </button>
            {results[index] && (
              <p
                className={`result ${
                  results[index] === "correct" ? "correct" : "incorrect"
                }`}
              >
                {results[index] === "correct" ? "✅ Correct" : "❌ Incorrect"}
              </p>
            )}
          </div>
        ))}
      </div>
      <style jsx>{`
        .voice-practice-container {
          font-family: Arial, sans-serif;
          max-width: 600px;
          margin: 20px auto;
          padding: 20px;
          border: 1px solid #ccc;
          border-radius: 8px;
          background: #f9f9f9;
        }
        .practice-title {
          font-size: 24px;
          margin-bottom: 20px;
          text-align: center;
        }
        .practice-sentences {
          margin-bottom: 20px;
        }
        .sentence-pair {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 15px;
        }
        .english-sentence {
          font-size: 18px;
        }
        .telugu-sentence {
          font-size: 16px;
          color: #555;
        }
        .record-btn {
          padding: 5px 15px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .record-btn.recording {
          background: #ff4136;
        }
        .record-btn:hover {
          background: #0056b3;
        }
        .result {
          margin-top: 5px;
          font-weight: bold;
        }
        .correct {
          color: green;
        }
        .incorrect {
          color: red;
        }
      `}</style>
    </div>
  );
};

export default VoiceInputPractice;

























// import React, { useState, useRef, useEffect } from "react";

// interface Sentence {
//   English: string;
//   Telugu: string;
// }

// const VoiceInputPractice: React.FC = () => {
//   const [sentences, setSentences] = useState<Sentence[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [isRecording, setIsRecording] = useState<boolean>(false);
//   const mediaRecorderRef = useRef<MediaRecorder | null>(null);
//   const chunksRef = useRef<BlobPart[]>([]);

//   // Fetch sentences from the API
//   const fetchSentences = async () => {
//     try {
//       const response = await fetch("https://61zfnp3s-5000.inc1.devtunnels.ms/voice-input-practice", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           topic: "Introducing Yourself",
//           difficulty: "Beginner",
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to fetch sentences: ${response.statusText}`);
//       }

//       const data = await response.json();

//       if (data.status === "success") {
//         setSentences(data.data);
//       } else {
//         throw new Error(data.message || "Unknown error occurred.");
//       }

//       setLoading(false);
//     } catch (err) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError("An unknown error occurred.");
//       }
//       setLoading(false);
//     }
//   };

//   // Fetch sentences on component mount
//   useEffect(() => {
//     fetchSentences();
//   }, []);

//   // Handle recording audio
//   const toggleRecording = async () => {
//     if (isRecording) {
//       // Stop recording
//       if (mediaRecorderRef.current) {
//         mediaRecorderRef.current.stop();
//         setIsRecording(false);
//       }
//     } else {
//       // Start recording
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//         const mediaRecorder = new MediaRecorder(stream);
//         mediaRecorderRef.current = mediaRecorder;

//         const chunks: BlobPart[] = [];
//         chunksRef.current = chunks;

//         mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
//         mediaRecorder.onstop = async () => {
//           const audioBlob = new Blob(chunks, { type: "audio/webm" });
//           const audioUrl = URL.createObjectURL(audioBlob);

//           // Display the recorded audio
//           const audioElement = document.createElement("audio");
//           audioElement.src = audioUrl;
//           audioElement.controls = true;
//           document.getElementById("recordings")?.appendChild(audioElement);
//         };

//         mediaRecorder.start();
//         setIsRecording(true);
//       } catch (error) {
//         console.error("Error accessing microphone:", error);
//       }
//     }
//   };

//   if (loading) {
//     return <div>Loading sentences...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="voice-practice-container">
//       <h1 className="practice-title">Voice Input Practice</h1>
//       <div className="practice-sentences">
//         {sentences.map((sentence, index) => (
//           <div key={index} className="sentence-pair">
//             <p className="english-sentence">
//               <strong>English:</strong> {sentence.English}
//             </p>
//             <p className="telugu-sentence">
//               <strong>Telugu:</strong> {sentence.Telugu}
//             </p>
//           </div>
//         ))}
//       </div>
//       <button
//         onClick={toggleRecording}
//         className={`record-btn ${isRecording ? "recording" : ""}`}
//       >
//         {isRecording ? "Stop Recording" : "Start Recording"}
//       </button>
//       <div id="recordings" className="recordings-container"></div>
//       <style jsx>{`
//         .voice-practice-container {
//           font-family: Arial, sans-serif;
//           max-width: 600px;
//           margin: 20px auto;
//           padding: 20px;
//           border: 1px solid #ccc;
//           border-radius: 8px;
//           background: #f9f9f9;
//         }
//         .practice-title {
//           font-size: 24px;
//           margin-bottom: 20px;
//           text-align: center;
//         }
//         .practice-sentences {
//           margin-bottom: 20px;
//         }
//         .sentence-pair {
//           margin-bottom: 15px;
//         }
//         .english-sentence {
//           font-size: 18px;
//           margin-bottom: 5px;
//         }
//         .telugu-sentence {
//           font-size: 16px;
//           color: #555;
//         }
//         .record-btn {
//           display: block;
//           margin: 20px auto;
//           padding: 10px 20px;
//           background: #007bff;
//           color: white;
//           border: none;
//           border-radius: 4px;
//           cursor: pointer;
//         }
//         .record-btn.recording {
//           background: #ff4136;
//         }
//         .record-btn:hover {
//           background: #0056b3;
//         }
//         .recordings-container {
//           margin-top: 20px;
//         }
//         audio {
//           display: block;
//           margin-top: 10px;
//         }
//       `}</style>
//     </div>
//   );
// };

// export default VoiceInputPractice;
