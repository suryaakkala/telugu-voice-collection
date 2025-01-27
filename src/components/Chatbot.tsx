import React, { useState, useRef } from 'react';

interface Message {
  text: string;
  audioUrl?: string;
  teluguTranscript?: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'text', prompt: input }),
      });
      const data = await response.json();

      const botMessage: Message = {
        text: data.response,
        audioUrl: data.audioUrl,
        teluguTranscript: data.teluguTranscript,
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
    setInput('');
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      const botMessage: Message = {
        text: data.response,
        audioUrl: data.audioUrl,
        teluguTranscript: data.teluguTranscript,
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      if (mediaRecorderRef.current) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      }
    } else {
      // Start recording
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const chunks: BlobPart[] = [];
        chunksRef.current = chunks;

        mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
        mediaRecorder.onstop = async () => {
          const audioBlob = new Blob(chunks, { type: 'audio/webm' });
          const formData = new FormData();
          formData.append('file', audioBlob);

          try {
            const response = await fetch('/api/chat', {
              method: 'POST',
              body: formData,
            });
            const data = await response.json();

            const botMessage: Message = {
              text: data.response,
              audioUrl: data.audioUrl,
              teluguTranscript: data.teluguTranscript,
              sender: 'bot',
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
          } catch (error) {
            console.error('Error:', error);
          }
        };

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <div className="message-container">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            {msg.text}
            {msg.audioUrl && (
              <audio controls src={msg.audioUrl} className="audio-player">
                Your browser does not support the audio element.
              </audio>
            )}
            {msg.teluguTranscript && (
              <div className="telugu-transcript">Telugu: {msg.teluguTranscript}</div>
            )}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          className="text-input"
        />
        <button onClick={sendMessage} className="send-button">
          Send
        </button>
        <button onClick={toggleRecording} className={`record-button ${isRecording ? 'recording' : ''}`}>
          {isRecording ? 'Stop' : 'Record'}
        </button>
      </div>
      <div className="file-upload-container">
        <input type="file" onChange={handleFileUpload} className="file-upload" />
      </div>

      <style jsx>{`
        .chatbot-container {
          background-color: white;
          border-radius: 8px;
          padding: 16px;
          max-width: 400px;
          margin: 0 auto;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .message-container {
          height: 300px;
          overflow-y: auto;
          margin-bottom: 16px;
        }

        .message {
          padding: 8px;
          border-radius: 8px;
          margin-bottom: 8px;
        }

        .user-message {
          background-color: #3b82f6;
          color: white;
          text-align: right;
        }

        .bot-message {
          background-color: #e5e7eb;
          color: black;
        }

        .audio-player {
          margin-top: 8px;
          display: block;
        }

        .telugu-transcript {
          margin-top: 4px;
          font-size: 0.9em;
          color: #4b5563;
        }

        .input-container {
          display: flex;
          gap: 8px;
        }

        .text-input {
          flex: 1;
          padding: 8px;
          border: 1px solid #d1d5db;
          border-radius: 8px;
        }

        .send-button,
        .record-button {
          padding: 8px 16px;
          border: none;
          border-radius: 8px;
          color: white;
          cursor: pointer;
        }

        .send-button {
          background-color: #3b82f6;
        }

        .record-button {
          background-color: #10b981;
        }

        .record-button.recording {
          background-color: #ef4444;
        }

        .file-upload-container {
          margin-top: 16px;
        }

        .file-upload {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Chatbot;
