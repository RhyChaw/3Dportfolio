import React, { useState, useEffect } from 'react';

function TradNav() {
  const [activeLink, setActiveLink] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--space-lg) var(--space-xl)',
    background: isScrolled 
      ? 'var(--bg-glass)' 
      : 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-family-primary)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
    borderBottom: '1px solid var(--border-glow)',
    boxShadow: isScrolled ? 'var(--shadow-glow)' : 'var(--shadow-md)',
    backdropFilter: 'blur(20px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const logoStyle = {
    fontWeight: '700',
    fontSize: 'var(--text-xl)',
    letterSpacing: '1px',
    color: 'var(--accent-primary)',
    textShadow: 'var(--shadow-neon)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
  };

  const navLinksStyle = {
    display: 'flex',
    gap: 'var(--space-lg)',
    flexWrap: 'wrap',
  };

  const getLinkStyle = (linkName) => ({
    color: activeLink === linkName ? 'var(--accent-primary)' : 'var(--text-primary)',
    textDecoration: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: 'var(--text-sm)',
    padding: 'var(--space-sm) var(--space-md)',
    borderRadius: 'var(--radius-md)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: activeLink === linkName ? '1px solid var(--accent-primary)' : '1px solid transparent',
    background: activeLink === linkName ? 'var(--bg-glass)' : 'transparent',
    position: 'relative',
    overflow: 'hidden',
  });

  const handleMouseEnter = (e, linkName) => {
    e.target.style.background = 'var(--bg-glass)';
    e.target.style.borderColor = 'var(--accent-primary)';
    e.target.style.color = 'var(--accent-primary)';
    e.target.style.transform = 'translateY(-2px) scale(1.05)';
    e.target.style.boxShadow = 'var(--shadow-glow)';
  };

  const handleMouseLeave = (e, linkName) => {
    if (activeLink !== linkName) {
      e.target.style.background = 'transparent';
      e.target.style.borderColor = 'transparent';
      e.target.style.color = 'var(--text-primary)';
      e.target.style.transform = 'translateY(0) scale(1)';
      e.target.style.boxShadow = 'none';
    }
  };

  const handleClick = (e, linkName) => {
    e.preventDefault();
    setActiveLink(linkName);
    const element = document.getElementById(linkName.toLowerCase());
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const links = ['Experience', 'Projects', 'Certifications', 'Resume', 'Contact'];

  return (
    <nav style={navStyle}>
      <div 
        style={logoStyle}
        onMouseEnter={(e) => {
          e.target.style.transform = 'scale(1.1)';
          e.target.style.textShadow = '0 0 20px var(--accent-primary)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'scale(1)';
          e.target.style.textShadow = 'var(--shadow-neon)';
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        Rhythm Chawla
      </div>
      <div style={navLinksStyle}>
        {links.map((text) => (
          <a
            key={text}
            href={`#${text.toLowerCase()}`}
            style={getLinkStyle(text)}
            onMouseEnter={(e) => handleMouseEnter(e, text)}
            onMouseLeave={(e) => handleMouseLeave(e, text)}
            onClick={(e) => handleClick(e, text)}
          >
            {text}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default TradNav;
