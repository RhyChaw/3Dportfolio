import React from 'react';

function Links({ onClose }) {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>💻 Ninja Terminal</h2>

      <p style={descStyle}>
        Find me across the Shinobi Web:
      </p>

      <ul style={listStyle}>
        <li>
         <strong>GitHub:</strong>{' '}
          <a href="https://github.com/RhyChaw" target="_blank" rel="noreferrer" style={linkStyle}>
            github.com/RhyChaw
          </a>
        </li>
        <li>
          <strong>LinkedIn:</strong>{' '}
          <a href="https://www.linkedin.com/in/rhythm-chawla-18723a231/" target="_blank" rel="noreferrer" style={linkStyle}>
            rhythm-chawla
          </a>
        </li>
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:r3chawla@uwaterloo.ca" style={linkStyle}>
            r3chawla@uwaterloo.ca
          </a>
        </li>
      </ul>

      <button onClick={onClose} style={closeStyle}>
        Close Scroll
      </button>
    </div>
  );
}

const containerStyle = {
  position: 'absolute',
  top: '15%',
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
  fontFamily: '"Noto Serif JP", "Papyrus", serif',
  border: '8px double #FFD700',
  boxShadow: '0 0 40px rgba(0,0,0,0.7)',
  backdropFilter: 'blur(6px)',
  textAlign: 'center'
};

const titleStyle = {
  fontSize: '32px',
  marginBottom: '20px',
  color: '#FFD700',
  textShadow: '2px 2px 4px #000',
  fontWeight: '700'
};

const descStyle = {
  fontSize: '18px',
  marginBottom: '24px',
  color: '#fffbe6',
  lineHeight: '1.6',
  textShadow: '1px 1px 2px #000'
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  fontSize: '16px',
  lineHeight: '1.8em',
  color: '#fffbe6',
  textShadow: '1px 1px 2px #000'
};

const linkStyle = {
  color: '#FFD700',
  textDecoration: 'none',
  fontWeight: '700',
  padding: '6px 10px',
  borderRadius: '10px',
  background: 'rgba(0,0,0,0.35)',
  border: '1px solid #FFD700',
  transition: 'all 0.2s ease',
  display: 'inline-block',
  margin: '6px'
};

const closeStyle = {
  marginTop: '30px',
  padding: '12px 24px',
  background: '#FF4500',
  border: 'none',
  borderRadius: '10px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto'
};

export default Links;
