import React, { useState, useRef } from 'react';

interface Message {
  text: string;
  audioUrl?: string;
  sender: 'user' | 'bot';
  explanation?: string;
}

const Header: React.FC<{ toggleTheme: () => void, isDarkMode: boolean }> = ({ toggleTheme, isDarkMode }) => {
  return (
    <header
      style={{
        backgroundColor: isDarkMode ? "#333333" : "#DFF6FF",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "space-between",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <img src="/klu.png" alt="Left Logo" style={{ height: "40px" }} />
      <button
        onClick={toggleTheme}
        style={{
          padding: "10px 15px",
          border: "none",
          borderRadius: "8px",
          fontSize: "14px",
          cursor: "pointer",
          backgroundColor: isDarkMode ? "#ffffff" : "#47B5FF",
          color: isDarkMode ? "#000000" : "white",
          transition: "background-color 0.3s",
        }}
        onMouseOver={(e) => (e.currentTarget.style.backgroundColor = isDarkMode ? "#cccccc" : "#256D85")}
        onMouseOut={(e) => (e.currentTarget.style.backgroundColor = isDarkMode ? "#ffffff" : "#47B5FF")}
        onMouseDown={(e) => (e.currentTarget.style.backgroundColor = isDarkMode ? "#999999" : "#06283D")}
        onMouseUp={(e) => (e.currentTarget.style.backgroundColor = isDarkMode ? "#cccccc" : "#256D85")}
      >
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <img src="/klug.png" alt="Right Logo" style={{ height: "40px" }} />
    </header>
  );
};

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<BlobPart[]>([]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { text: input, sender: 'user' };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const formData = new FormData();
      formData.append('type', 'text');
      formData.append('query_message', input);

      const response = await fetch('https://qpc28cj1-5000.inc1.devtunnels.ms/get-response', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      const botMessage: Message = {
        text: data.data,
        audioUrl: data.audio,
        explanation: data.explanation, // Include explanation field
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
    formData.append('type', 'audio');
    formData.append('audio', file);

    try {
      const response = await fetch('https://qpc28cj1-5000.inc1.devtunnels.ms/audio_trans', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      const botMessage: Message = {
        text: data.message,
        // audioUrl: data.audio,
        // explanation: data.explanation, // Include explanation field
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }
  };

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
          const audioBlob = new Blob(chunks, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob); // Create URL for the recorded audio
          const formData = new FormData();
          formData.append('audio', audioBlob, 'recorded_audio.wav'); // Ensure correct key is used
        
          try {
            const response = await fetch('https://qpc28cj1-5000.inc1.devtunnels.ms/audio_trans', { 
              method: 'POST',
              body: formData,
            });
        
            const data = await response.json();
            console.log('API Response:', data); // Debugging log
        
            const botMessage: Message = {
              text: data.data,
              audioUrl: data.audio,
              explanation: data.explanation, 
              sender: 'user',
            };
            setMessages((prev) => [...prev, botMessage]);
            const audiorespastext = new FormData();
            audiorespastext.append('type', 'text');
            audiorespastext.append('query_message', data.data);
            
            // Send the response to another API
            const secondApiResponse = await fetch('https://qpc28cj1-5000.inc1.devtunnels.ms/get-response', {
              method: 'POST',
              body: audiorespastext ,
            });

            const secondApiData = await secondApiResponse.json();
            console.log('Second API Response:', secondApiData);
            const botMessage2: Message = {
              text: secondApiData.data,
              // audioUrl: data.audio,
              explanation: secondApiData.explanation, 
              sender: 'bot',
            };
            setMessages((prevMessages) => [...prevMessages, botMessage2]);
          } catch (error) {
            console.error('Error sending audio:', error);
          }

          // Add the recorded audio message to the chat
          const recordedMessage: Message = {
            text: 'Recorded audio',
            audioUrl: audioUrl,
            sender: 'user',
          };
          setMessages((prevMessages) => [...prevMessages, recordedMessage]);
        };
        

        mediaRecorder.start();
        setIsRecording(true);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const showExplanation = (index: number) => {
    const explanationMessage: Message = {
      text: messages[index].explanation || 'No explanation provided.',
      sender: 'bot',
    };
    setMessages((prevMessages) => [...prevMessages, explanationMessage]);
  };

  return (
    <>
      <style jsx global>{`
        body {
          margin: 0; /* Remove default margin */
          padding: 0; /* Remove default padding */
          box-sizing: border-box;
        }
      `}</style>
    <div
      style={{
        backgroundColor: isDarkMode ? '#1a202c' : '#f7fafc',
        color: isDarkMode ? '#ffffff' : '#000000',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
        margin: 0,
        overflow: 'hidden', // Prevent body scroll
      }}
    >
      <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
      <div className="chat-container" style={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        maxWidth: '800px',
        border: '1px solid #e0e0e0',
        borderRadius: '12px',
        padding: '15px',
        backgroundColor: isDarkMode ? '#333333' : '#ffffff',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        flex: 1,
        marginTop: '45px', // Adjust for header height
        marginBottom: 0,
        overflow: 'hidden', // Prevent container scroll
      }}>
        <div className="messages" style={{
          flex: 1,
          overflowY: 'auto',
          padding: '10px',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          backgroundColor: isDarkMode ? '#444444' : '#f7f7f7',
        }}>
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}`} style={{
              marginBottom: '12px',
              padding: '8px 12px',
              borderRadius: '8px',
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              textAlign: msg.sender === 'user' ? 'right' : 'left',
              color: '#ffffff',
              backgroundColor: msg.sender === 'user' ? '#47B5FF' : '#256D85',
            }}>
              <p>{msg.text}</p>
              {msg.audioUrl && <audio controls src={msg.audioUrl}></audio>}
              {msg.explanation && msg.sender === 'bot' && (
                <button
                  className="explain-button"
                  onClick={() => showExplanation(index)}
                  style={{
                    marginTop: '5px',
                    padding: '5px 10px',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    backgroundColor: '#06283D',
                    color: 'white',
                    fontSize: '12px',
                  }}
                >
                  Explain
                </button>
              )}
            </div>
          ))}
        </div>
        <div className="input-container" style={{
          display: 'flex',
          gap: '10px',
          flexWrap: 'wrap',
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            style={{
              flex: 1,
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '8px',
              fontSize: '14px',
              backgroundColor: isDarkMode ? '#444444' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#000000',
            }}
          />
          <button onClick={sendMessage} style={{
            padding: '10px 15px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: isDarkMode ? '#ffffff' : '#47B5FF',
            color: isDarkMode ? '#000000' : 'white',
            transition: 'background-color 0.3s',
          }}>
            Send
          </button>
          <button onClick={toggleRecording} style={{
            padding: '10px 15px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: isDarkMode ? '#ffffff' : '#47B5FF',
            color: isDarkMode ? '#000000' : 'white',
            transition: 'background-color 0.3s',
          }}>
            {isRecording ? 'Stop' : 'Record'}
          </button>
          <input type="file" onChange={handleFileUpload} className="file-input" style={{
            padding: '10px 15px',
            border: 'none',
            borderRadius: '8px',
            fontSize: '14px',
            cursor: 'pointer',
            backgroundColor: isDarkMode ? '#ffffff' : '#47B5FF',
            color: isDarkMode ? '#000000' : 'white',
            transition: 'background-color 0.3s',
          }} />
        </div>
      </div>
    </div>
    </>
  );
};

export default Chatbot;
