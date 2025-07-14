import React, { useState } from 'react';
import axios from 'axios';

export default function ChatBox() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:3001/chat', { message: input });
      const narutoMessage = { role: 'naruto', text: res.data.reply };
      setMessages((prev) => [...prev, narutoMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'naruto', text: '⚠️ Shadow clone jutsu failed! Dattebayo!' }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h3 style={styles.header}>🌀 NarutoBot</h3>

      <div style={styles.chatLog}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.bubble,
              ...(msg.role === 'user' ? styles.userBubble : styles.narutoBubble)
            }}
          >
            {msg.text}
          </div>
        ))}

        {isLoading && (
          <div style={{ ...styles.bubble, ...styles.narutoBubble }}>
            <span className="dot-flashing"></span> Shadow clone jutsu...
          </div>
        )}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        placeholder="Ask Naruto..."
        style={styles.input}
      />

      <button onClick={handleSend} style={styles.button}>
        Believe it! ➤
      </button>

      <style>
        {`
          .dot-flashing {
            position: relative;
            width: 8px;
            height: 8px;
            background: #FFD700;
            border-radius: 5px;
            animation: dot-flashing 1s infinite linear alternate;
            margin-right: 8px;
          }
          .dot-flashing::before,
          .dot-flashing::after {
            content: '';
            display: inline-block;
            position: absolute;
            top: 0;
          }
          .dot-flashing::before {
            left: -12px;
            width: 8px;
            height: 8px;
            background: #FFD700;
            border-radius: 5px;
            animation: dot-flashing 1s infinite alternate;
            animation-delay: 0.3s;
          }
          .dot-flashing::after {
            left: 12px;
            width: 8px;
            height: 8px;
            background: #FFD700;
            border-radius: 5px;
            animation: dot-flashing 1s infinite alternate;
            animation-delay: 0.6s;
          }
          @keyframes dot-flashing {
            0% { background: #FFD700; }
            50%, 100% { background: rgba(255,215,0,0.2); }
          }
        `}
      </style>
    </div>
  );
}

const styles = {
  container: {
    position: 'fixed',
    bottom: 20,
    right: 20,
    width: 320,
    backgroundColor: 'rgba(0,0,0,0.85)',
    color: '#eee',
    padding: '20px',
    borderRadius: '15px',
    boxShadow: '0 0 20px rgba(0,0,0,0.7)',
    zIndex: 9999,
    fontFamily: '"Courier New", monospace',
    backdropFilter: 'blur(8px)',
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    margin: 0,
    marginBottom: 10,
    color: '#FFD700',
    fontWeight: 'bold',
    textShadow: '1px 1px #000'
  },
  chatLog: {
    flex: 1,
    maxHeight: '200px',
    overflowY: 'auto',
    marginBottom: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  bubble: {
    padding: '10px 12px',
    borderRadius: '12px',
    maxWidth: '85%',
    lineHeight: '1.4',
    animation: 'fadeIn 0.3s ease-in-out'
  },
  userBubble: {
    background: '#444',
    alignSelf: 'flex-end'
  },
  narutoBubble: {
    background: '#111',
    border: '1px solid #FFD700',
    color: '#FFD700',
    alignSelf: 'flex-start'
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #555',
    background: '#222',
    color: 'white',
    marginBottom: '10px'
  },
  button: {
    width: '100%',
    padding: '10px',
    background: '#FF4500',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: 'bold'
  }
};
