"use client";

import React, { useState, useRef, useEffect } from "react";
import { Spinner } from "@/components/ui/spinner";

const DISTRICTS = [
  "Adilabad", "Anantapur", "Chittoor", "East Godavari", "Guntur", 
  "Hyderabad", "Jagtial", "Jangaon", "Jayashankar Bhupalpally", 
  "Jogulamba Gadwal", "Kamareddy", "Karimnagar", "Khammam", 
  "Kumuram Bheem", "Mahabubabad", "Mahabubnagar", "Mancherial", 
  "Medak", "Medchal", "Mulugu", "Nagarkurnool", "Nalgonda", 
  "Narayanpet", "Nellore", "Nirmal", "Nizamabad", "Peddapalli", 
  "Rajanna Sircilla", "Ranga Reddy", "Sangareddy", "Siddipet", 
  "Suryapet", "Vikarabad", "Wanaparthy", "Warangal Rural", 
  "Warangal Urban", "Yadadri Bhuvanagiri"
];

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
  const [district, setDistrict] = useState<string>("");
  const [speed, setSpeed] = useState<number>(1);
  const [currentWordIndex, setCurrentWordIndex] = useState<number>(-1);
  const [error, setError] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const fetchSentences = async () => {
    try {
      const response = await fetch("https://qpc28cj1-8000.inc1.devtunnels.ms/telugu-sentences");
      if (!response.ok) throw new Error('Failed to fetch sentences');
      
      const data = await response.json();
      if (data.status === "success") {
        setSentences(data.data);
      } else {
        throw new Error(data.message || "Error fetching sentences");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      // Fallback mock data
      setSentences([
        { Telugu: "హలో, నా పేరు జాన్." },
        { Telugu: "నేను Hyderabad నుండి వచ్చాను." },
        { Telugu: "నాకు పుస్తకాలు చదవడం ఇష్టం." },
      ]);
    }
  };

  useEffect(() => { fetchSentences(); }, []);

  useEffect(() => {
    if (isRecording) {
      const words = sentences[currentIndex]?.Telugu.split(" ") || [];
      intervalRef.current = setInterval(() => {
        setCurrentWordIndex(prev => {
          if (prev >= words.length - 1) {
            clearInterval(intervalRef.current!);
            return -1;
          }
          return prev + 1;
        });
      }, 1000 / speed);
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isRecording, speed, currentIndex]);

  const toggleRecording = async () => {
    if (isRecording) {
      mediaRecorderRef.current?.stop();
      setIsRecording(false);
      return;
    }

    if (!district) {
      setError("Please select your district before recording");
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      chunksRef.current = [];

      mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data);
      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(chunksRef.current, { type: "audio/webm" });
        const formData = new FormData();
        formData.append("audio", audioBlob);
        formData.append("data", JSON.stringify({
          sentence: sentences[currentIndex].Telugu,
          district,
          speed,
          timestamp: new Date().toISOString()
        }));

        await fetch("https://qpc28cj1-8000.inc1.devtunnels.ms/telugu-data-collection", {
          method: "POST",
          body: formData,
        });

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Microphone access required for recording");
    }
  };

  const handleNext = () => {
    if (currentIndex < sentences.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setCurrentWordIndex(-1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setCurrentWordIndex(-1);
    }
  };

  if (!sentences.length) {
    return (
      <div className="center-screen">
        <Spinner variant="pinwheel" className="w-12 h-12 text-blue-500" />
        <p className="loading-text">Loading Sentences Please Wait...</p>
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
  }

  const words = sentences[currentIndex].Telugu.split(" ");

  return (
    <div className="container">
      <Header />
      <div className="main-content">
        <div className="config-section">
          <label htmlFor="district-select" className="sr-only">Select Your District</label>
          <select
            id="district-select"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            className="district-select"
          >
            <option value="">Select Your District</option>
            {DISTRICTS.map(d => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>

          <div className="speed-control">
            <label>Highlight Speed: {speed}x</label>
            <input
              type="range"
              min="0.5"
              max="2"
              step="0.1"
              value={speed}
              onChange={(e) => setSpeed(Number(e.target.value))}
              className="speed-slider"
            />
          </div>
        </div>

        <h1 className="title">Voice Input Practice</h1>
        <div className="sentence-container">
          <p className="sentence">
            {words.map((word, index) => (
              <span
                key={index}
                className={`word ${index === currentWordIndex ? 'highlight' : ''}`}
              >
                {word}
              </span>
            ))}
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
            className={`button ${isRecording ? 'button-recording' : 'button-record'}`}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
          <button
            onClick={handleNext}
            disabled={currentIndex === sentences.length - 1}
            className="button button-primary"
          >
            Next
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}
      </div>

      <style jsx>{`
        .container {
          background-color: #fff9ad;
          min-height: 100vh;
          padding-top: 60px;
        }
        .main-content {
          max-width: 800px;
          margin: 20px auto;
          padding: 20px;
          background: #547AA5;
          border-radius: 10px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .config-section {
          display: flex;
          gap: 20px;
          margin-bottom: 25px;
          flex-wrap: wrap;
        }
        .sr-only{
          align-items: center;
          display: flex;
        }  

        .district-select {
          flex: 1;
          padding: 8px;
          border-radius: 5px;
          min-width: 200px;
        }
        .speed-control {
          flex: 2;
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 250px;
        }
        .speed-slider {
          flex-grow: 1;
          allign-items: center;
          appearance: none;
          height: 8px;
          background: #ddd;
          border-radius: 5px;
          outline: none;
          transition: background 0.3s ease;
        }
        
        .speed-slider::-webkit-slider-thumb {
          appearance: none;
          width: 16px;
          height: 16px;
          background: #004E64; /* Thumb color */
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          margin-top: -4px;
        }
        
        .speed-slider::-moz-range-thumb {
          width: 16px;
          height: 16px;
          background: #004E64; /* Thumb color */
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          margin-top: -4px;
        }
        
        .speed-slider::-webkit-slider-runnable-track {
          background: linear-gradient(to right,rgb(0, 255, 0),rgb(255, 0, 0));
          height: 8px;
          border-radius: 5px;
        }
        .title {
          font-size: 2rem;
          color: #fff;
          text-align: center;
        }
        .sentence-container {
          background: #D72638;
          padding: 20px;
          border-radius: 8px;
          margin: 20px 0;
          text-align: center;
        }
        .sentence {
          font-size: 1.2rem;
          color: #fbff00;
          line-height: 1.6;
        }
        .word {
          transition: background-color 0.3s ease;
          padding: 2px 4px;
          border-radius: 3px;
        }
        .highlight {
          background-color: #ffeb3b;
          color: #000;
        }
        .controls {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 20px;
        }
        .button {
          padding: 10px 20px;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        }
        .button-primary {
          background: #004E64;
          color: white;
        }
        .button-record {
          background: #77e547;
          color: #000;
        }
        .button-recording {
          background: #ef4444;
          color: white;
        }
        .error-message {
          color: #dc2626;
          margin-top: 15px;
          text-align: center;
        }
        .center-screen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }
        .loading-text {
          margin-top: 15px;
          font-size: 1.2rem;
          color: #000;
        }
      `}</style>
    </div>
  );
};

export default TDC;