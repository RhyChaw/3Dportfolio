import React, { useState } from 'react';
import axios from 'axios';

export default function NarutoBot() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');

  const handleSend = async () => {
    const res = await axios.post('http://localhost:3001/chat', { message: input });
    setResponse(res.data.reply);
  };

  return (
    <div style={{ padding: '20px', background: '#111', color: '#eee', borderRadius: '10px' }}>
      <h2>🌀 NarutoBot</h2>
      <input
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Ask Naruto anything..."
        style={{ width: '80%', padding: '10px' }}
      />
      <button onClick={handleSend} style={{ padding: '10px 20px', marginLeft: '10px' }}>
        Send
      </button>
      <div style={{ marginTop: '20px', whiteSpace: 'pre-wrap' }}>{response}</div>
    </div>
  );
}
