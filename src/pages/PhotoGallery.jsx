import React from 'react';

function PhotoGallery({ onClose }) {
  return (
    <div style={{
      position: 'absolute',
      top: '10%',
      left: '15%',
      width: '70%',
      maxHeight: '75%',
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
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <h2 style={{
        fontSize: '32px',
        color: '#FFD700',
        textShadow: '2px 2px 4px #000',
        marginBottom: '30px'
      }}>
        📸 Ninja Memories: Coming Soon
      </h2>

      <p style={{
        fontSize: '18px',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.6',
        color: '#fffbe6',
        textShadow: '1px 1px 2px #000'
      }}>
        I’m sealing these precious moments away in a hidden scroll for now.
        Return soon to unveil snapshots of my ninja journey across Konoha and beyond!
      </p>

      <div style={{
        marginTop: '40px',
        fontSize: '50px',
        animation: 'pulse 2s infinite'
      }}>
        🌀
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: '40px',
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
        }}
      >
        Close Scroll
      </button>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.15); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

export default PhotoGallery;
