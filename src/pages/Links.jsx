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
        Close Terminal
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
  maxWidth: '480px',
  backgroundImage: 'url("/images/scroll-texture.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  padding: '32px 36px',
  borderRadius: '18px',
  color: '#1c1c1c',
  zIndex: 1000,
  fontFamily: '"Noto Serif JP", Papyrus, serif',
  border: '6px double #00CED1',
  boxShadow: '0 0 35px rgba(0,0,0,0.5)',
  backdropFilter: 'blur(5px)',
  textAlign: 'center'
};

const titleStyle = {
  fontSize: '24px',
  marginBottom: '12px',
  color: '#00CED1',
  textShadow: '1px 1px 2px #000'
};

const descStyle = {
  fontSize: '15px',
  marginBottom: '20px'
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  fontSize: '15px',
  lineHeight: '1.8em',
  color: '#222'
};

const linkStyle = {
  color: '#006666',
  textDecoration: 'underline',
  fontWeight: 'bold'
};

const closeStyle = {
  marginTop: '24px',
  padding: '10px 18px',
  background: '#FF4500',
  border: 'none',
  borderRadius: '8px',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '15px',
  cursor: 'pointer',
  boxShadow: '0 0 10px rgba(0,0,0,0.4)'
};

export default Links;
