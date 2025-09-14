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
  background: 'var(--bg-card)',
  padding: 'var(--space-2xl)',
  borderRadius: 'var(--radius-xl)',
  color: 'var(--text-primary)',
  zIndex: 1000,
  fontFamily: 'var(--font-family-primary)',
  border: '1px solid var(--border-primary)',
  boxShadow: 'var(--shadow-xl)',
  backdropFilter: 'blur(8px)',
  overflowY: 'auto',
  textAlign: 'center'
};

const titleStyle = {
  fontSize: 'var(--text-2xl)',
  color: 'var(--accent-primary)',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  marginBottom: 'var(--space-lg)',
  fontWeight: '700'
};

const descStyle = {
  fontSize: 'var(--text-sm)',
  marginBottom: 'var(--space-xl)',
  lineHeight: '1.6',
  maxWidth: '500px',
  margin: '0 auto var(--space-xl)',
  color: 'var(--text-secondary)'
};

const formStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-lg)',
  maxWidth: '500px',
  margin: '0 auto'
};

const inputStyle = {
  padding: 'var(--space-sm) var(--space-md)',
  borderRadius: 'var(--radius-md)',
  border: '1px solid var(--border-primary)',
  fontSize: 'var(--text-sm)',
  fontFamily: 'var(--font-family-primary)',
  background: 'var(--bg-secondary)',
  color: 'var(--text-primary)',
  boxShadow: 'var(--shadow-sm)',
  outline: 'none',
  transition: 'all var(--transition-fast)'
};

const submitStyle = {
  padding: 'var(--space-sm) var(--space-lg)',
  background: 'linear-gradient(135deg, var(--accent-primary), #0099cc)',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  fontWeight: '600',
  fontSize: 'var(--text-sm)',
  cursor: 'pointer',
  boxShadow: 'var(--shadow-md)',
  transition: 'all var(--transition-fast)'
};

const closeStyle = {
  marginTop: 'var(--space-xl)',
  padding: 'var(--space-sm) var(--space-lg)',
  background: 'linear-gradient(135deg, var(--accent-secondary), #ff8c42)',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  fontWeight: '600',
  fontSize: 'var(--text-sm)',
  cursor: 'pointer',
  boxShadow: 'var(--shadow-md)',
  transition: 'all var(--transition-fast)'
};

export default Contact;
