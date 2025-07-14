import React from 'react';

function Links({ onClose }) {
  return (
    <div style={{
      position: 'absolute',
      top: '15%',
      left: 'calc(50% - 250px)',
      width: '500px',
      height: 'auto',
      backgroundImage: 'url("/images/scroll-texture.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      padding: '24px 30px',
      borderRadius: '16px',
      color: '#fffbe6',
      zIndex: 1000,
      fontFamily: '"Noto Serif JP", "Papyrus", serif',
      border: '6px double #c4f0f7',
      boxShadow: '0 0 30px rgba(0,0,0,0.6)',
      backdropFilter: 'blur(5px)',
      textAlign: 'center'
    }}>
      <h2 style={{
        fontSize: '22px',
        marginBottom: '12px',
        color: '#00FFFF',
        textShadow: '1px 1px 2px #000'
      }}>
        💻 Ninja Terminal
      </h2>

      <p style={{ fontSize: '14px', marginBottom: '18px' }}>
        Find me across the Shinobi Web:
      </p>

      <ul style={{ listStyle: 'none', padding: 0, fontSize: '15px', lineHeight: '1.9em' }}>
        <li>
          🐙 <strong>GitHub:</strong>&nbsp;
          <a href="https://github.com/RhyChaw" target="_blank" rel="noreferrer"
            style={{ color: '#87eaf2', textDecoration: 'underline' }}>
            github.com/RhyChaw
          </a>
        </li>
        <li>
          💼 <strong>LinkedIn:</strong>&nbsp;
          <a href="https://www.linkedin.com/in/rhythm-chawla-18723a231/" target="_blank" rel="noreferrer"
            style={{ color: '#87eaf2', textDecoration: 'underline' }}>
            rhythm-chawla
          </a>
        </li>
        <li>
          📧 <strong>Email:</strong>&nbsp;
          <a href="mailto:r3chawla@uwaterloo.ca"
            style={{ color: '#87eaf2', textDecoration: 'underline' }}>
            r3chawla@uwaterloo.ca
          </a>
        </li>
      </ul>

      <button
        onClick={onClose}
        style={{
          marginTop: '20px',
          padding: '8px 16px',
          background: '#ff5c2a',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '14px',
          cursor: 'pointer',
          boxShadow: '0 0 10px rgba(0,0,0,0.4)'
        }}
      >
        Close
      </button>
    </div>
  );
}

export default Links;
