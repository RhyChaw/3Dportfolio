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
    <div style={containerStyle}>
      <h2 style={titleStyle}>📜 Summoning Scroll</h2>

      <p style={descStyle}>
        Channel your chakra into this scroll to summon a message my way.
      </p>

      <form onSubmit={handleSubmit} style={formStyle}>
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
          style={{ ...inputStyle, resize: 'none', lineHeight: '1.4' }}
        />
        <button type="submit" style={submitStyle}>
          🌀 Summon My Message
        </button>
      </form>

      <button onClick={onClose} style={closeStyle}>
        Close Scroll
      </button>
    </div>
  );
}

const containerStyle = {
  position: 'absolute',
  top: '10%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '90%',
  maxWidth: '600px',
  backgroundImage: 'url("/images/scroll-texture.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  padding: '40px',
  borderRadius: '20px',
  color: '#fffbe6',
  zIndex: 1000,
  fontFamily: '"Noto Serif JP", Papyrus, serif',
  border: '6px double #00BFFF',
  boxShadow: '0 0 40px rgba(0,0,0,0.7)',
  backdropFilter: 'blur(6px)',
  overflowY: 'auto',
  textAlign: 'center'
};

const titleStyle = {
  fontSize: '30px',
  color: '#00BFFF',
  textShadow: '2px 2px 3px #000',
  marginBottom: '15px'
};

const descStyle = {
  fontSize: '16px',
  marginBottom: '25px',
  lineHeight: '1.5',
  maxWidth: '500px',
  margin: '0 auto 25px'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '18px',
  maxWidth: '500px',
  margin: '0 auto'
};

const inputStyle = {
  padding: '12px 14px',
  borderRadius: '8px',
  border: '2px solid #87cefa',
  fontSize: '16px',
  fontFamily: '"Noto Serif JP", serif',
  background: 'rgba(255, 255, 255, 0.12)',
  color: 'white',
  boxShadow: '0 0 6px rgba(0,191,255, 0.3)',
  outline: 'none'
};

const submitStyle = {
  padding: '14px',
  background: '#00BFFF',
  border: 'none',
  borderRadius: '10px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '17px',
  cursor: 'pointer',
  textShadow: '1px 1px 2px #000',
  boxShadow: '0 0 12px rgba(0,191,255,0.7)',
  transition: 'background 0.2s ease'
};

const closeStyle = {
  marginTop: '30px',
  padding: '10px 20px',
  background: '#e56c1f',
  border: 'none',
  borderRadius: '8px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  boxShadow: '0 0 10px rgba(0,0,0,0.4)'
};

export default Contact;
