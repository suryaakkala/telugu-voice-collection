import React, { useState, useRef } from 'react';

// Define a type for messages
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
        body: JSON.stringify({ message: input }),
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
    <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <div className="h-64 overflow-y-auto mb-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded-lg ${
              msg.sender === 'user' ? 'bg-blue-500 text-white self-end' : 'bg-gray-300'
            }`}
          >
            {msg.text}
            {msg.audioUrl && (
              <audio controls src={msg.audioUrl} className="mt-2">
                Your browser does not support the audio element.
              </audio>
            )}
            {msg.teluguTranscript && (
              <div className="mt-2 text-sm text-gray-700">Telugu: {msg.teluguTranscript}</div>
            )}
          </div>
        ))}
      </div>
      <div className="flex space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
          aria-label="Chat input"
          className="flex-1 p-2 border rounded-lg"
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
          Send
        </button>
        <button
          onClick={toggleRecording}
          className={`px-4 py-2 rounded-lg ${
            isRecording ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
          }`}
        >
          {isRecording ? 'Stop' : 'Record'}
        </button>
      </div>
      <div className="mt-4">
        <input
          type="file"
          onChange={handleFileUpload}
          aria-label="Upload a file"
          className="block w-full"
        />
      </div>
    </div>
  );
};

export default Chatbot;
