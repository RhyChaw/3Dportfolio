import React from 'react';

const photoUrls = [
  '/gallery/photo1.jpg',
  '/gallery/photo2.jpg',
  '/gallery/photo3.jpg',
  '/gallery/photo4.jpg',
  '/gallery/photo5.jpg',
  '/gallery/photo6.jpg'
  // Add more as needed
];

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
      padding: '30px',
      borderRadius: '20px',
      color: '#fffbe6',
      zIndex: 1000,
      fontFamily: '"Noto Serif JP", "Papyrus", serif',
      border: '8px double #FFD700',
      boxShadow: '0 0 40px rgba(0,0,0,0.7)',
      backdropFilter: 'blur(6px)',
      overflowY: 'auto'
    }}>
      <h2 style={{
        fontSize: '28px',
        textAlign: 'center',
        color: '#FFD700',
        textShadow: '1px 1px 2px #000',
        marginBottom: '20px'
      }}>
        📸 Ninja Memories: Gallery
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
        gap: '20px',
        padding: '10px'
      }}>
        {photoUrls.map((url, index) => (
          <div key={index} style={{
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 0 10px #FFD700',
            transition: 'transform 0.3s ease',
          }}>
            <img
              src={url}
              alt={`Gallery ${index}`}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.3s ease-in-out'
              }}
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
        ))}
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
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        Close Scroll
      </button>
    </div>
  );
}

export default PhotoGallery;
