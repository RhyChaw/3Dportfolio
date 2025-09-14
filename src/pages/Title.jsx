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
    fontFamily: 'var(--font-family-primary)',
  };

  const boxStyle = {
    background: 'var(--bg-card)',
    padding: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border-primary)',
    boxShadow: 'var(--shadow-xl)',
    maxWidth: isMobile ? '85vw' : '400px',
    lineHeight: '1.6',
    textAlign: isMobile ? 'center' : 'left',
    color: 'var(--text-primary)',
    backdropFilter: 'blur(8px)',
  };

  const h1Style = {
    margin: '0 0 var(--space-sm)',
    fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-xl)',
    color: 'var(--accent-primary)',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
    fontWeight: '700',
  };

  const pStyle = {
    margin: 'var(--space-xs) 0',
    fontSize: isMobile ? 'var(--text-xs)' : 'var(--text-sm)',
    color: 'var(--text-secondary)',
    lineHeight: '1.5',
  };

  const hamburgerStyle = {
    background: 'var(--bg-card)',
    width: '48px',
    height: '48px',
    borderRadius: 'var(--radius-full)',
    border: '1px solid var(--border-primary)',
    boxShadow: 'var(--shadow-md)',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'var(--text-lg)',
    fontWeight: 'bold',
    color: 'var(--accent-primary)',
    transition: 'all var(--transition-fast)',
  };

  return (
    <div style={containerStyle} ref={wrapperRef}>
      {isVisible ? (
        <div style={boxStyle}>
          <h1 style={h1Style}>🗡️ Rhythm's Portfolio</h1>

          <p style={pStyle}>🗺️ <strong>Explore:</strong> Move Naruto around your 3D room.</p>
          <p style={pStyle}>🎮 <strong>Controls:</strong> Use arrow keys to walk. Click the radar to teleport.</p>
          <p style={pStyle}>🌀 <strong>Discover:</strong> Click on different areas to learn about my work.</p>
          <p style={pStyle}>📜 <strong>Tip:</strong> The minimap dots show different sections.</p>
          <p style={pStyle}>🌐 <a href="/" style={{ 
            color: 'var(--accent-primary)', 
            textDecoration: 'none',
            fontWeight: '500',
            padding: 'var(--space-xs) var(--space-sm)',
            background: 'var(--bg-secondary)',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-primary)',
            display: 'inline-block',
            marginTop: 'var(--space-sm)',
            transition: 'all var(--transition-fast)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--accent-primary)';
            e.target.style.color = 'var(--text-primary)';
            e.target.style.borderColor = 'var(--accent-primary)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'var(--bg-secondary)';
            e.target.style.color = 'var(--accent-primary)';
            e.target.style.borderColor = 'var(--border-primary)';
          }}>
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
