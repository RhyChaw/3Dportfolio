import React, { useState } from 'react';

const TradContact = () => {
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
    const subject = `Message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:r3chawla@uwaterloo.ca?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      id="contact"
      style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: 'var(--space-2xl) var(--space-lg)',
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: 'var(--text-3xl)',
          marginBottom: 'var(--space-lg)',
          color: 'var(--text-primary)',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        📬 Get In Touch
      </h2>

      <p
        style={{
          textAlign: 'center',
          marginBottom: 'var(--space-2xl)',
          maxWidth: '600px',
          marginLeft: 'auto',
          marginRight: 'auto',
          color: 'var(--text-secondary)',
          lineHeight: '1.6',
          fontSize: 'var(--text-lg)',
        }}
      >
        Have a question, opportunity, or just want to say hi? I'd love to hear from you!
      </p>

      <div style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-2xl)',
        boxShadow: 'var(--shadow-lg)',
      }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-lg)',
          }}
        >
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            value={formData.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            value={formData.email}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="message"
            placeholder="Your Message..."
            rows="5"
            required
            value={formData.message}
            onChange={handleChange}
            style={{ ...inputStyle, resize: 'vertical' }}
          />
          <button
            type="submit"
            style={submitStyle}
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
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
  transition: 'all var(--transition-fast)',
};

const submitStyle = {
  padding: 'var(--space-sm) var(--space-xl)',
  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  fontWeight: '600',
  fontSize: 'var(--text-sm)',
  cursor: 'pointer',
  transition: 'all var(--transition-fast)',
  alignSelf: 'flex-start',
  boxShadow: 'var(--shadow-md)',
};

export default TradContact;
