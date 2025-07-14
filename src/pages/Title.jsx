import React from 'react';

function Title() {
  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 9999,
      color: '#222', // Dark text for contrast
      textAlign: 'left',
      fontFamily: '"Noto Serif JP", "Papyrus", serif',
      backgroundImage: 'url("/images/scroll-texture.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      padding: '20px 25px',
      borderRadius: '20px',
      border: '4px double #FFD700',
      boxShadow: '0 0 20px rgba(0,0,0,0.6)',
      maxWidth: '320px',
      lineHeight: '1.5',
    }}>
      <h1 style={{
        margin: '0 0 10px',
        fontSize: '22px',
        color: '#000', // Headline extra dark
        textShadow: '1px 1px 0px #FFD700' // subtle highlight if needed
      }}>
        🗡️ Rhythm's Ninja Way
      </h1>

      <p style={{ margin: '4px 0', fontSize: '13px' }}>
        🗺️ <strong>Explore:</strong> Move Naruto around your 3D room.
      </p>
      <p style={{ margin: '4px 0', fontSize: '13px' }}>
        🎮 <strong>Controls:</strong> Use arrow keys to walk. Click the radar to teleport.
      </p>
      <p style={{ margin: '4px 0', fontSize: '13px' }}>
        🌀 <strong>Talk:</strong> Chat with Naruto to learn about projects.
      </p>
      <p style={{ margin: '4px 0', fontSize: '13px' }}>
        📜 <strong>Tip:</strong> The minimap dots show different sections.
      </p>
      <p style={{ margin: '4px 0', fontSize: '13px' }}>
        🌐 <a href="/" style={{ color: '#0070f3', textDecoration: 'underline' }}>
          Return to classic website
        </a>
      </p>
    </div>
  );
}

export default Title; 
