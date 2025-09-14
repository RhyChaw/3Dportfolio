import React from 'react';

function TradNav() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--space-lg) var(--space-xl)',
    background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-family-primary)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid var(--border-primary)',
    boxShadow: 'var(--shadow-md)',
    backdropFilter: 'blur(8px)',
  };

  const logoStyle = {
    fontWeight: '700',
    fontSize: 'var(--text-xl)',
    letterSpacing: '1px',
    color: 'var(--accent-primary)',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const navLinksStyle = {
    display: 'flex',
    gap: 'var(--space-lg)',
    flexWrap: 'wrap',
  };

  const linkStyle = {
    color: 'var(--text-primary)',
    textDecoration: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: 'var(--text-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    borderRadius: 'var(--radius-md)',
    transition: 'all var(--transition-fast)',
    border: '1px solid transparent',
  };

  const handleMouseEnter = (e) => {
    e.target.style.background = 'var(--bg-card)';
    e.target.style.borderColor = 'var(--border-accent)';
    e.target.style.color = 'var(--accent-primary)';
    e.target.style.transform = 'translateY(-1px)';
  };

  const handleMouseLeave = (e) => {
    e.target.style.background = 'transparent';
    e.target.style.borderColor = 'transparent';
    e.target.style.color = 'var(--text-primary)';
    e.target.style.transform = 'translateY(0)';
  };

  const links = ['Experience', 'Projects', 'Certifications', 'Resume', 'Contact'];

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>Rhythm Chawla</div>
      <div style={navLinksStyle}>
        {links.map((text) => (
          <a
            key={text}
            href={`#${text.toLowerCase()}`}
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {text}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default TradNav;
