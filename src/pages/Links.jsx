import React from 'react';

function Links({ onClose }) {
  return (
    <div style={{
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '80%',
      height: '70%',
      backgroundImage: 'url("/images/scroll-texture.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      padding: '30px',
      borderRadius: '20px',
      color: '#fffbe6',
      zIndex: 1000,
      fontFamily: '"Noto Serif JP", "Papyrus", serif',
      border: '8px double #fff',
      boxShadow: '0 0 40px rgba(0,0,0,0.7)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <div>
        <h2 style={{
          fontSize: '28px',
          textAlign: 'center',
          color: '#00FFFF',
          textShadow: '1px 1px 2px #000'
        }}>💻 Ninja Terminal: Access Links</h2>

        <p style={{ textAlign: 'center', marginBottom: '20px' }}>
          Here's where you can find me across the Shinobi web:
        </p>

        <ul style={{ listStyle: 'none', paddingLeft: 0, fontSize: '18px', lineHeight: '2em' }}>
          <li>
            🐙 GitHub:&nbsp;
            <a
              href="https://github.com/RhyChaw"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#87eaf2', textDecoration: 'underline' }}
            >
              github.com/RhyChaw
            </a>
          </li>
          <li>
            💼 LinkedIn:&nbsp;
            <a
              href="https://www.linkedin.com/in/rhythm-chawla-18723a231/"
              target="_blank"
              rel="noreferrer"
              style={{ color: '#87eaf2', textDecoration: 'underline' }}
            >
              rhythm-chawla
            </a>
          </li>
          <li>
            📧 Email:&nbsp;
            <a
              href="mailto:r3chawla@uwaterloo.ca"
              style={{ color: '#87eaf2', textDecoration: 'underline' }}
            >
              r3chawla@uwaterloo.ca
            </a>
          </li>
        </ul>
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: '20px',
          padding: '10px 16px',
          background: '#FF4500',
          border: 'none',
          borderRadius: '10px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          alignSelf: 'center'
        }}
      >
        Close Scroll
      </button>
    </div>
  );
}

export default Links;
