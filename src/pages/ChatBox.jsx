import React, { useState } from 'react'

function ChatBox() {
    const [input, setInput] = useState('');
    const [response, setResponse] = useState('');
    const handleSend = async () => {
        if (!input.trim()) return;
        try {
          const res = await axios.post('http://localhost:3001/chat', { message: input });
          setResponse(res.data.reply);
        } catch (error) {
          setResponse('⚠️ Failed to contact NarutoBot.');
          console.error(error);
        }
      };

  return (
    <div style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: '300px',
        backgroundColor: 'rgba(25,25,25,0.85)',
        color: '#eee',
        padding: '15px',
        borderRadius: '15px',
        boxShadow: '0 0 15px rgba(0,0,0,0.6)',
        zIndex: 9999,
        fontFamily: 'monospace',
        backdropFilter: 'blur(6px)'
      }}>
        <h3 style={{ marginTop: 0, color: '#FFD700' }}>🌀 NarutoBot</h3>
        <textarea
          value={response}
          readOnly
          rows={6}
          style={{
            width: '100%',
            resize: 'none',
            padding: '8px',
            background: '#111',
            color: '#0f0',
            borderRadius: '8px',
            marginBottom: '10px',
            border: '1px solid #444'
          }}
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Naruto..."
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #666',
            background: '#222',
            color: 'white',
            marginBottom: '8px'
          }}
        />
        <button
          onClick={handleSend}
          style={{
            width: '100%',
            padding: '10px',
            background: '#FF4500',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Believe it! ➤
        </button>
      </div>
  )
}

export default ChatBox