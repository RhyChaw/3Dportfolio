import React, { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';

const KunaiIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFD700"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2l6 6-6 6-6-6 6-6z" />
    <line x1="12" y1="14" x2="12" y2="22" />
  </svg>
);

const zones = {
  Projects: { x: -6.06, y: 0.4, z: 1.64 },
  Certifications: { x: 10.67, y: 0.4, z: 3.39 },
  Links: { x: 10.25, y: 0.4, z: -5.63 },
  Resume: { x: -0.03, y: 0.4, z: -9.67 },
  Contact: { x: -2.54, y: 0.4, z: 9.51 },
  Experience: { x: 6.31, y: 0.4, z: -8.4 },
  Gallery: { x: 5.33, y: 0.4, z: 9.10 },
};

const Navbar = ({ onNavigate }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = (label) => {
    const pos = zones[label];
    if (pos && onNavigate) onNavigate(pos);
    if (isMobile) setOpen(false);
  };

  // Close modal if clicked outside menu (backdrop)
  const handleBackdropClick = () => {
    setOpen(false);
  };

  if (!isMobile) {
    return (
      <nav className={styles.navbar}>
        <ul>
          {Object.keys(zones).map((label) => (
            <li key={label} onClick={() => handleClick(label)}>
              {label}
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <>
      {/* Circle button with Kunai icon */}
      <button
        aria-label="Toggle navigation"
        onClick={() => setOpen(!open)}
        style={{
          position: 'fixed',
          top: 70,
          left: 10,
          width: 48,
          height: 48,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #6b4226, #a97448)',
          border: '3px solid #3e2618',
          boxShadow: '0 0 10px rgba(0,0,0,0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 10000,
          padding: 0,
        }}
      >
        <KunaiIcon />
      </button>

      {/* Modal backdrop and centered menu */}
      {open && (
        <div
          onClick={handleBackdropClick}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            zIndex: 9998,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Stop propagation to prevent closing when clicking inside menu */}
          <nav
            onClick={(e) => e.stopPropagation()}
            className={styles.navbar}
            style={{
              background: 'rgba(43, 27, 8, 0.95)',
              borderRadius: 16,
              padding: '20px 40px',
              boxShadow: '0 8px 30px rgba(0,0,0,0.8)',
              color: '#fdf5e6',
              fontFamily: "'Papyrus', cursive, sans-serif",
              fontSize: '20px',
              minWidth: '220px',
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {Object.keys(zones).map((label) => (
                <li
                  key={label}
                  onClick={() => handleClick(label)}
                  style={{ padding: '12px 0', cursor: 'pointer', userSelect: 'none' }}
                >
                  {label}
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
