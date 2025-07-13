import React, { useState } from 'react';

function Contact({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, message } = formData;
    const subject = `Summoning Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:r3chawla@uwaterloo.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <div style={{
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '80%',
      height: '80%',
      backgroundImage: 'url("/images/scroll-texture.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      padding: '30px',
      borderRadius: '20px',
      color: '#fffbe6',
      zIndex: 1000,
      fontFamily: '"Noto Serif JP", "Papyrus", serif',
      border: '8px double #00BFFF',
      boxShadow: '0 0 40px rgba(0,0,0,0.7)',
      backdropFilter: 'blur(6px)',
      overflowY: 'auto'
    }}>
      <h2 style={{
        fontSize: '28px',
        textAlign: 'center',
        color: '#00BFFF',
        textShadow: '1px 1px 2px #000'
      }}>📜 Summoning Scroll</h2>

      <p style={{ textAlign: 'center', marginBottom: '20px' }}>
        Channel your chakra into this scroll to summon a message my way.
      </p>

      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
        maxWidth: '500px',
        margin: '0 auto'
      }}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          onChange={handleChange}
          style={inputStyle}
        />
        <textarea
          name="message"
          placeholder="Type your message like a hidden jutsu..."
          rows="5"
          required
          onChange={handleChange}
          style={{ ...inputStyle, resize: 'none' }}
        />
        <button type="submit" style={submitStyle}>
          🌀 Summon My Message
        </button>
      </form>

      <button
        onClick={onClose}
        style={{
          marginTop: '25px',
          padding: '10px 16px',
          background: '#e56c1f',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxShadow: '0 0 10px rgba(0,0,0,0.4)'
        }}
      >
        Close Scroll
      </button>
    </div>
  );
}

const inputStyle = {
  padding: '10px',
  borderRadius: '8px',
  border: '2px solid #87cefa',
  fontSize: '15px',
  fontFamily: '"Noto Serif JP", serif',
  background: 'rgba(255, 255, 255, 0.1)',
  color: 'white',
  boxShadow: '0 0 4px rgba(0,191,255, 0.3)'
};

const submitStyle = {
  padding: '12px',
  background: '#00BFFF',
  border: 'none',
  borderRadius: '10px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  textShadow: '1px 1px 1px #000',
  boxShadow: '0 0 10px rgba(0,191,255,0.6)'
};

export default Contact;
