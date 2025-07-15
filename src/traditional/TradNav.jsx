import React from 'react';

function TradNav() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#1e293b', // dark blue-gray
    color: 'white',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  const logoStyle = {
    fontWeight: 'bold',
    fontSize: '1.5rem',
    letterSpacing: '2px',
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '1.5rem',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 600,
    cursor: 'pointer',
    fontSize: '1rem',
    transition: 'color 0.3s ease',
  };

  // Hover effect with inline styles requires a little workaround, so we can add a simple onMouseEnter/onMouseLeave event
  // but to keep it simple, we will skip hover here.

  const links = ['Links', 'Resume', 'Certifications', 'Projects', 'Experience', 'Contact'];

  return (
    <nav style={navStyle}>
      <div style={logoStyle}>Rhythm Chawla</div>
      <div style={navLinksStyle}>
        {links.map((text) => (
          <a
            key={text}
            href={`#${text.toLowerCase()}`}
            style={linkStyle}
          >
            {text}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default TradNav;
