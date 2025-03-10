"use client";

import React, { useState, useRef, useEffect } from "react";
import { Inter } from "next/font/google";
import { Spinner } from "@/components/ui/spinner";
import "./tdc.css";

const inter = Inter({ subsets: ["latin"] });

const Header: React.FC = () => {
  return (
    <header className="header">
      <img src="/klu.png" alt="Left Logo" className="logo" />
      <img src="/klug.png" alt="Right Logo" className="logo" />
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
        "https://rwhmdthc-5000.inc1.devtunnels.ms/telugu-data",
        {
          method: "POST",
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
          { Telugu: "నేను హైదరాబాద్ నుండి వచ్చాను." },
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
          <Spinner variant="pinwheel" style={{ width: "3rem", height: "3rem", color: "#3b82f6" }} />
          <p className="loading-text">Loading Sentences Please Wait...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`container ${inter.className}`}>
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
  );
};

export default TDC;