import React, { useState, useRef, useEffect } from "react";
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

interface Sentence {
  English: string;
  Telugu: string;
}

const VoiceInputPractice: React.FC = () => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  // Fetch sentences from the API
  const fetchSentences = async () => {
    try {
      const response = await fetch(
        "https://374svx84-5000.inc1.devtunnels.ms/voice-input-practice",
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
      } else {
        throw new Error(data.message || "Error fetching sentences.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    }
  };

  // Fetch sentences on component mount
  useEffect(() => {
    fetchSentences();
  }, []);

  // useEffect(() => {
  //   // Mock data for testing
  //   const mockData = {
  //     status: "success",
  //     data: [
  //       { English: "Hello, my name is John.", Telugu: "హలో, నా పేరు జాన్." },
  //       { English: "I am from Hyderabad.", Telugu: "నేను హైదరాబాద్ నుండి వచ్చాను." },
  //       { English: "I like to read books.", Telugu: "నాకు పుస్తకాలు చదవడం ఇష్టం." },
  //     ],
  //   };

  //   if (mockData.status === "success") {
  //     setSentences(mockData.data);
  //   } else {
  //     setError("Failed to load mock data.");
  //   }
  // }, []);

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
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

          const sentence = sentences[currentIndex];
          formData.append(
            "data",
            JSON.stringify({
              English: sentence.English,
            })
          );

          // Send audio and sentence data to the backend
          try {
            const response = await fetch(
              "https://374svx84-5000.inc1.devtunnels.ms/voice-input-check",
              {
                method: "POST",
                body: formData,
              }
            );
            const result = await response.json();

            if (result.status === "success") {
              // Process transcription and word colors
              const words = sentence.English.split(" ").map((word, index) => {
                const color = result[`word${index + 1}`] || "black";
                return `<span style="color: ${color}">${word}</span>`;
              });

              setTranscription(words.join(" "));
            } else {
              setError("Error validating the sentence.");
            }
          } catch (err) {
            console.error("Error sending audio:", err);
          }

          // Stop all tracks to release the microphone
          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setTranscription(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevIndex) => prevIndex - 1);
      setTranscription(null);
    }
  };

  if (!sentences.length) {
    return <div>Loading sentences...</div>;
  }

  return (
    <div className={`min-h-screen bg-gray-100 ${inter.className}`}>
      <Header />
    <div className="voice-practice-container">
      <h1 className="practice-title">Voice Input Practice</h1>
      <div className="sentence-pair">
        <p className="english-sentence">
          <strong>English:</strong> {sentences[currentIndex].English}
        </p>
        <p className="telugu-sentence">
          <strong>Telugu:</strong> {sentences[currentIndex].Telugu}
        </p>
      </div>
      <div className="controls">
        <button onClick={handlePrev} disabled={currentIndex === 0}>
          Prev
        </button>
        <button onClick={toggleRecording} className={`record-btn ${isRecording ? "recording" : ""}`}>
          {isRecording ? "Stop Recording" : "Record"}
        </button>
        <button onClick={handleNext} disabled={currentIndex === sentences.length - 1}>
          Next
        </button>
      </div>
      {transcription && (
        <div
          className="transcription"
          dangerouslySetInnerHTML={{ __html: transcription }}
        ></div>
      )}
      {error && <p className="error">{error}</p>}
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
        .sentence-pair {
          margin-bottom: 15px;
        }
        .english-sentence {
          font-size: 18px;
          margin-bottom: 5px;
        }
        .telugu-sentence {
          font-size: 16px;
          color: #555;
        }
        .controls {
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
        }
        button {
          padding: 10px 20px;
          background: #007bff;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        button:disabled {
          background: #ccc;
          cursor: not-allowed;
        }
        .record-btn.recording {
          background: #ff4136;
        }
        .transcription {
          margin-top: 20px;
          font-size: 18px;
          line-height: 1.5;
        }
        .error {
          color: red;
          margin-top: 20px;
        }
      `}</style>
    </div>
    </div>
  );
};

export default VoiceInputPractice;
