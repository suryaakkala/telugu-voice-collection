"use client";

import React, { useState, useRef, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";
import "@/styles/globals.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src="/klu.png" alt="Left Logo" className="logo" />
      <img src="/klug.png" alt="Right Logo" className="logo" />
      <style jsx>{`
        .header {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          position: fixed;
          top: 0;
          z-index: 1000;
          background: #004E64;
          padding: 5px;
        }
        .logo {
          margin-left: 10px;
          margin-right: 10px;
          height: 40px;
        }
      `}</style>
    </header>
  );
};

interface Sentence {
  Telugu: string;
}

const TDC: React.FC = () => {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [transcription, setTranscription] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const fetchSentences = async () => {
    try {
      const response = await fetch(
        "https://rwhmdthc-5000.inc1.devtunnels.ms/telugu-sentences",
        {
          method: " GET",
          headers: {
            "Content-Type": "application/json",
          },
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
      const mockData = {
        status: "success",
        data: [
          { Telugu: "హలో, నా పేరు జాన్." },
          { Telugu: "నేను Hyderabad నుండి వచ్చాను." },
          { Telugu: "నాకు పుస్తకాలు చదవడం ఇష్టం." },
        ],
      };

      if (mockData.status === "success") {
        setSentences(mockData.data);
      } else {
        setError(err instanceof Error ? err.message : "An unknown error occurred.");
      }
    }
  };

  useEffect(() => {
    fetchSentences();
  }, []);

  const toggleRecording = async () => {
    if (isRecording) {
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
          formData.append("data", sentences[currentIndex].Telugu);

          try {
            await fetch(
              "https://rwhmdthc-5000.inc1.devtunnels.ms/telugu-data-collection",
              {
                method: "POST",
                body: formData,
              }
            );
          } catch (err) {
            console.error("Error sending audio:", err);
            setError("Failed to upload audio recording.");
          }

          stream.getTracks().forEach((track) => track.stop());
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (err) {
        console.error("Error accessing microphone:", err);
        setError("Failed to access microphone. Please ensure microphone permissions are granted.");
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
    return (
      <div className="loading-container">
        <div className="loading-content">
          <Spinner variant="pinwheel" style={{ width: "3rem", height: "3rem", color: "rgb(222,222,222)" }} />
          <p className="loading-text">Loading Sentences Please Wait...</p>
        </div>
      </div>
    );
  }

  return (
    <>
    <div className="container">
      <Header />
      <div className="main-content">
        <h1 className="title">Voice Input Practice</h1>
        <div className="sentence-container">
          <p className="sentence">
            <strong>Telugu:</strong>{" "}
            <span>{sentences[currentIndex].Telugu}</span>
          </p>
        </div>
        <div className="controls">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            className="button button-primary"
          >
            Previous
          </button>
          <button
            onClick={toggleRecording}
            className={`button ${isRecording ? "button-recording" : "button-record"}`}
          >
            {isRecording ? "Stop Recording" : "Start Recording"}
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === sentences.length - 1}
            className="button button-primary"
          >
            Next
          </button>
        </div>
        {transcription && (
          <div className="transcription">
            <p dangerouslySetInnerHTML={{ __html: transcription }}></p>
          </div>
        )}
        {error && (
          <div className="error">
            {error}
          </div>
        )}
      </div>
      </div>
      <style jsx global>{`
        body {
          margin: 0; /* Remove default margin */
          padding: 0; /* Remove default padding */
          box-sizing: border-box;
          height: 100vh;
        }
        .container {
          background-color: #fff9ad;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-top: 60px;
          height: 100%;
        }
        .title{
          font-size: 1.5rem;
          font-weight: bold;
          text-align: center;
          font-family: Lato, sans-serif;
          color:rgb(1, 37, 47);
          margin-bottom: 20px;
        }
        .main-content {
          min-height: 250px;
          max-width: 42rem;
          background-color: #547AA5;
          padding: 24px;
          border-radius: 8px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          margin-bottom: 20px;
        }
        .sentence-container {
          padding: 16px;
          background-color: #D72638;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        .sentence {
          font-size: 1.125rem;
          color: #fbff00;
        }
        .controls {
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }
        .button {
          padding: 8px 16px;
          border-radius: 6px;
          border: none;
          color: white;
          cursor: pointer;
          transition: background-color 0.2s;
        }
        .button-primary {
          background-color: #004E64;
          color: #fff;
        }
        .button:disabled {
          background-color: #d1d5db;
          color: #3f3737;
          cursor: not-allowed;
        }
        .button-record {
          background-color: #77e547;
          color: #000;
        }
        .button-recording {
          background-color: #ef4444;
          color: #fff;
        }
      `}</style>
    </>
  );
};

export default TDC;