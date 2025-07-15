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
        maxWidth: '700px',
        margin: '0 auto',
        padding: '2rem 1rem',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '1rem',
          color: '#0f172a'
        }}
      >
        📜 Contact Me
      </h2>

      <p
        style={{
          textAlign: 'center',
          marginBottom: '2rem',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto',
          color: '#475569',
          lineHeight: '1.5'
        }}
      >
        Have a question, opportunity, or just want to say hi? Fill out the form below and I’ll get back to you!
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
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
    </section>
  );
};

const inputStyle = {
  padding: '12px 14px',
  borderRadius: '6px',
  border: '1px solid #cbd5e1',
  fontSize: '16px',
  fontFamily: 'inherit',
  background: '#ffffff',
  color: '#0f172a',
  boxShadow: '0 0 4px rgba(0,0,0,0.05)',
  outline: 'none'
};

const submitStyle = {
  padding: '12px 18px',
  background: '#2563EB',
  border: 'none',
  borderRadius: '6px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'background 0.2s ease',
  alignSelf: 'flex-start'
};

export default TradContact;
