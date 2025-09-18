import React, { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';

const ScrollIcon = ({ isOpen }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#8B4513"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{
      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
      transition: 'transform 0.3s ease-in-out'
    }}
  >
    {/* Scroll body */}
    <rect x="3" y="2" width="18" height="20" rx="2" ry="2" fill="#F5E6D3" stroke="#8B4513" strokeWidth="1.5"/>
    {/* Scroll lines */}
    <line x1="7" y1="6" x2="17" y2="6" stroke="#8B4513" strokeWidth="1"/>
    <line x1="7" y1="9" x2="17" y2="9" stroke="#8B4513" strokeWidth="1"/>
    <line x1="7" y1="12" x2="17" y2="12" stroke="#8B4513" strokeWidth="1"/>
    <line x1="7" y1="15" x2="17" y2="15" stroke="#8B4513" strokeWidth="1"/>
    {/* Scroll handles */}
    <circle cx="6" cy="3" r="1.5" fill="#8B4513"/>
    <circle cx="18" cy="3" r="1.5" fill="#8B4513"/>
    <circle cx="6" cy="21" r="1.5" fill="#8B4513"/>
    <circle cx="18" cy="21" r="1.5" fill="#8B4513"/>
  </svg>
);

const zones = {
  Projects: { x: -6.06, y: 0.4, z: 1.64 },
  Certifications: { x: 10.67, y: 0.4, z: 3.39 },
  Links: { x: 10.25, y: 0.4, z: -5.63 },
  Resume: { x: -0.03, y: 0.4, z: -9.67 },
  Experience: { x: 6.31, y: 0.4, z: -8.4 },
  Gallery: { x: 5.33, y: 0.4, z: 9.10 },
  Naruto: null,
};

const Navbar = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [isCompact, setIsCompact] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = (label) => {
    if (label === 'Naruto') {
      window.location.href = '/naruto';
    } else {
      const pos = zones[label];
      if (pos && onNavigate) onNavigate(pos);
    }
    if (isMobile) setOpen(false);
  };

  useEffect(() => {
    const onScroll = () => {
      setIsCompact(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close modal if clicked outside menu (backdrop)
  const handleBackdropClick = () => {
    setOpen(false);
  };

  if (!isMobile) {
    return (
      <nav 
        className={`${styles.navbar} ${isCompact ? styles.compact : ''}`}
        style={{
          background: 'linear-gradient(145deg, #F5E6D3, #E6D3B7)',
          border: '2px solid #8B4513',
          boxShadow: '0 4px 16px rgba(139, 69, 19, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          fontFamily: 'serif',
        }}
      >
        <ul>
          {Object.keys(zones).map((label) => (
            <li 
              key={label} 
              onClick={() => handleClick(label)}
              style={{
                color: '#5D4037',
                fontWeight: '500',
                letterSpacing: '0.5px',
                border: '1px solid transparent',
                background: 'transparent',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'linear-gradient(145deg, rgba(139, 69, 19, 0.1), rgba(139, 69, 19, 0.05))';
                e.target.style.borderColor = '#8B4513';
                e.target.style.color = '#8B4513';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 2px 8px rgba(139, 69, 19, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.borderColor = 'transparent';
                e.target.style.color = '#5D4037';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              {label}
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <>
      {/* Scroll button */}
      <button
        aria-label="Toggle navigation"
        onClick={() => setOpen(!open)}
        className={styles.scrollButton}
        style={{
          position: 'fixed',
          top: 70,
          left: 10,
          width: 56,
          height: 56,
          borderRadius: '8px',
          background: 'linear-gradient(145deg, #F5E6D3, #E6D3B7)',
          border: '2px solid #8B4513',
          boxShadow: '0 4px 12px rgba(139, 69, 19, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 10000,
          padding: 0,
          transition: 'all 0.3s ease',
          transform: open ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = open ? 'scale(1.15) rotate(8deg)' : 'scale(1.05) rotate(2deg)';
          e.target.style.boxShadow = '0 6px 16px rgba(139, 69, 19, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.4)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = open ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)';
          e.target.style.boxShadow = '0 4px 12px rgba(139, 69, 19, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.3)';
        }}
      >
        <ScrollIcon isOpen={open} />
      </button>

      {/* Modal backdrop and centered scroll menu */}
      {open && (
        <div
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            zIndex: 9998,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(8px)',
            animation: 'fadeIn 0.3s ease-out',
          }}
        >
          {/* Stop propagation to prevent closing when clicking inside menu */}
          <nav
            onClick={(e) => e.stopPropagation()}
            className={`${styles.scrollMenu} ${open ? styles.scrollOpen : ''}`}
            style={{
              background: 'linear-gradient(145deg, #F5E6D3, #E6D3B7)',
              borderRadius: '12px',
              padding: '2rem 2.5rem',
              boxShadow: '0 8px 32px rgba(139, 69, 19, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.3)',
              color: '#5D4037',
              fontFamily: 'serif',
              fontSize: '1.1rem',
              minWidth: '320px',
              border: '3px solid #8B4513',
              position: 'relative',
              transform: open ? 'scale(1) rotate(0deg)' : 'scale(0.8) rotate(-5deg)',
              opacity: open ? 1 : 0,
              transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
            }}
          >
            {/* Scroll decorative elements */}
            <div style={{
              position: 'absolute',
              top: '10px',
              left: '10px',
              right: '10px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #8B4513, transparent)',
              borderRadius: '1px',
            }} />
            <div style={{
              position: 'absolute',
              bottom: '10px',
              left: '10px',
              right: '10px',
              height: '2px',
              background: 'linear-gradient(90deg, transparent, #8B4513, transparent)',
              borderRadius: '1px',
            }} />
            
            <ul style={{ listStyle: 'none', margin: '1rem 0', padding: 0 }}>
              {Object.keys(zones).map((label, index) => (
                <li
                  key={label}
                  onClick={() => handleClick(label)}
                  style={{ 
                    padding: '0.8rem 1rem', 
                    cursor: 'pointer', 
                    userSelect: 'none',
                    borderBottom: '1px solid rgba(139, 69, 19, 0.2)',
                    transition: 'all 0.3s ease',
                    borderRadius: '6px',
                    marginBottom: '0.5rem',
                    position: 'relative',
                    background: 'transparent',
                    color: '#5D4037',
                    fontWeight: '500',
                    letterSpacing: '0.5px',
                    animation: `slideInFromLeft 0.4s ease-out ${index * 0.1}s both`,
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'linear-gradient(145deg, rgba(139, 69, 19, 0.1), rgba(139, 69, 19, 0.05))';
                    e.target.style.color = '#8B4513';
                    e.target.style.paddingLeft = '1.5rem';
                    e.target.style.transform = 'translateX(5px)';
                    e.target.style.boxShadow = 'inset 3px 0 0 #8B4513';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = '#5D4037';
                    e.target.style.paddingLeft = '1rem';
                    e.target.style.transform = 'translateX(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  <span style={{
                    position: 'relative',
                    zIndex: 1,
                  }}>
                    {label}
                  </span>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </>
  );
};

export default Navbar;
