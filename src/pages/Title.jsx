import React, { useState, useEffect, useRef } from 'react';

function Title() {
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef();

  useEffect(() => {
    const checkScreenSize = () => setIsMobile(window.innerWidth <= 768);
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Auto-close on mobile after 5 seconds
  useEffect(() => {
    if (isMobile && isVisible) {
      const timer = setTimeout(() => setIsVisible(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [isMobile, isVisible]);

  // Tap outside to close
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsVisible(false);
      }
    };
    if (isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isMobile]);

  const containerStyle = {
    position: 'absolute',
    top: 10,
    left: 10,
    zIndex: 9999,
    fontFamily: '"Noto Serif JP", "Papyrus", serif',
  };

  const boxStyle = {
    backgroundImage: 'url("/images/scroll-texture.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    padding: isMobile ? '14px 16px' : '20px 25px',
    borderRadius: '20px',
    border: '4px double #FFD700',
    boxShadow: '0 0 20px rgba(0,0,0,0.6)',
    maxWidth: isMobile ? '85vw' : '320px',
    lineHeight: '1.5',
    textAlign: isMobile ? 'center' : 'left',
    color: '#222',
  };

  const h1Style = {
    margin: '0 0 10px',
    fontSize: isMobile ? '17px' : '22px',
    color: '#000',
    textShadow: '1px 1px 0px #FFD700',
  };

  const pStyle = {
    margin: '4px 0',
    fontSize: isMobile ? '11.5px' : '13px',
  };

  const hamburgerStyle = {
    backgroundImage: 'url("/images/scroll-texture.jpg")',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    width: '42px',
    height: '42px',
    borderRadius: '50%',
    border: '2px solid #FFD700',
    boxShadow: '0 0 10px rgba(0,0,0,0.4)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#FFD700',
    textShadow: '1px 1px black'
  };

  return (
    <div style={containerStyle} ref={wrapperRef}>
      {isVisible ? (
        <div style={boxStyle}>
          <h1 style={h1Style}>🗡️ Rhythm's Ninja Way</h1>

          <p style={pStyle}>🗺️ <strong>Explore:</strong> Move Naruto around your 3D room.</p>
          <p style={pStyle}>🎮 <strong>Controls:</strong> Use arrow keys to walk. Click the radar to teleport.</p>
          <p style={pStyle}>🌀 <strong>Talk:</strong> Chat with Naruto to learn about projects.</p>
          <p style={pStyle}>📜 <strong>Tip:</strong> The minimap dots show different sections.</p>
          <p style={pStyle}>🌐 <a href="/" style={{ color: '#0070f3', textDecoration: 'underline' }}>
            Return to classic website
          </a></p>
        </div>
      ) : (
        <div onClick={() => setIsVisible(true)} style={hamburgerStyle}>
          ☰
        </div>
      )}
    </div>
  );
}

export default Title;
