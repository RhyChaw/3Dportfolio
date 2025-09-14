import React, { useState, useEffect } from 'react';
import styles from '../styles/Navbar.module.css';

const KunaiIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="var(--accent-primary)"
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
          borderRadius: 'var(--radius-full)',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-primary)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'pointer',
          zIndex: 10000,
          padding: 0,
          transition: 'all var(--transition-fast)',
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.borderColor = 'var(--border-accent)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.borderColor = 'var(--border-primary)';
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
            backgroundColor: 'var(--bg-overlay)',
            zIndex: 9998,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          {/* Stop propagation to prevent closing when clicking inside menu */}
          <nav
            onClick={(e) => e.stopPropagation()}
            className={styles.navbar}
            style={{
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-xl)',
              padding: 'var(--space-xl) var(--space-2xl)',
              boxShadow: 'var(--shadow-xl)',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--text-lg)',
              minWidth: '280px',
              border: '1px solid var(--border-primary)',
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {Object.keys(zones).map((label) => (
                <li
                  key={label}
                  onClick={() => handleClick(label)}
                  style={{ 
                    padding: 'var(--space-md) 0', 
                    cursor: 'pointer', 
                    userSelect: 'none',
                    borderBottom: '1px solid var(--border-primary)',
                    transition: 'all var(--transition-fast)',
                    borderRadius: 'var(--radius-sm)',
                    marginBottom: 'var(--space-xs)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--bg-secondary)';
                    e.target.style.color = 'var(--accent-primary)';
                    e.target.style.paddingLeft = 'var(--space-sm)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent';
                    e.target.style.color = 'var(--text-primary)';
                    e.target.style.paddingLeft = '0';
                  }}
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
