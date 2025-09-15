import React, { useState, useEffect } from 'react';

function TradNav() {
  const [activeLink, setActiveLink] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: isScrolled
      ? (isMobile ? 'var(--space-sm) var(--space-lg)' : 'var(--space-sm) var(--space-xl)')
      : (isMobile ? 'var(--space-md) var(--space-lg)' : 'var(--space-lg) var(--space-xl)'),
    background: isScrolled 
      ? 'var(--bg-glass)'
      : 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-family-primary)',
    position: isScrolled ? 'fixed' : 'sticky',
    top: isScrolled ? '8px' : 0,
    left: isScrolled ? '50%' : 'auto',
    transform: isScrolled ? 'translateX(-50%)' : 'none',
    width: isScrolled ? (isMobile ? '92%' : '80%') : '100%',
    margin: isScrolled ? '0 auto' : '0',
    zIndex: 1000,
    border: '1px solid var(--border-glow)',
    borderBottom: isScrolled ? '1px solid var(--border-glow)' : '1px solid var(--border-glow)',
    borderRadius: isScrolled ? 'var(--radius-full)' : 0,
    boxShadow: isScrolled ? 'var(--shadow-xl)' : 'var(--shadow-md)',
    backdropFilter: 'blur(20px)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  };

  const logoStyle = {
    fontWeight: '700',
    fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-xl)',
    letterSpacing: '1px',
    color: 'var(--accent-primary)',
    textShadow: 'var(--shadow-neon)',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    position: 'relative',
  };

  const navLinksStyle = {
    display: isMobile ? (isMenuOpen ? 'flex' : 'none') : 'flex',
    flexDirection: isMobile ? 'column' : 'row',
    gap: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
    flexWrap: 'wrap',
    position: isMobile ? 'absolute' : 'static',
    top: isMobile ? '100%' : 'auto',
    left: isMobile ? '0' : 'auto',
    right: isMobile ? '0' : 'auto',
    background: isMobile ? 'var(--bg-glass)' : 'transparent',
    backdropFilter: isMobile ? 'blur(20px)' : 'none',
    border: isMobile ? '1px solid var(--border-glow)' : 'none',
    borderRadius: isMobile ? '0 0 var(--radius-xl) var(--radius-xl)' : '0',
    padding: isMobile ? 'var(--space-lg)' : '0',
    boxShadow: isMobile ? 'var(--shadow-lg)' : 'none',
    zIndex: 1001,
  };

  const getLinkStyle = (linkName) => ({
    color: activeLink === linkName ? 'var(--accent-primary)' : 'var(--text-primary)',
    textDecoration: 'none',
    fontWeight: '500',
    cursor: 'pointer',
    fontSize: isMobile ? 'var(--text-base)' : 'var(--text-sm)',
    padding: isMobile ? 'var(--space-md) var(--space-lg)' : 'var(--space-sm) var(--space-md)',
    borderRadius: 'var(--radius-md)',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    border: activeLink === linkName ? '1px solid var(--accent-primary)' : '1px solid transparent',
    background: activeLink === linkName ? 'var(--bg-glass)' : 'transparent',
    position: 'relative',
    overflow: 'hidden',
    textAlign: isMobile ? 'center' : 'left',
    width: isMobile ? '100%' : 'auto',
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
    setIsMenuOpen(false);
    const element = document.getElementById(linkName.toLowerCase());
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const links = ['Experience', 'Projects', 'Certifications', 'Resume', 'Naruto'];

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
      
      {isMobile && (
        <button
          onClick={toggleMenu}
          style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            padding: 'var(--space-sm)',
            cursor: 'pointer',
            fontSize: 'var(--text-lg)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '40px',
            height: '40px',
            backdropFilter: 'blur(10px)',
            boxShadow: 'var(--shadow-sm)',
          }}
          onMouseEnter={(e) => {
            e.target.style.borderColor = 'var(--accent-primary)';
            e.target.style.color = 'var(--accent-primary)';
            e.target.style.boxShadow = 'var(--shadow-glow)';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.borderColor = 'var(--border-glow)';
            e.target.style.color = 'var(--text-primary)';
            e.target.style.boxShadow = 'var(--shadow-sm)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '3px',
              width: '20px',
              height: '16px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: '100%',
                height: '2px',
                background: 'currentColor',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                transform: isMenuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none',
              }}
            />
            <div
              style={{
                width: '100%',
                height: '2px',
                background: 'currentColor',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                opacity: isMenuOpen ? '0' : '1',
              }}
            />
            <div
              style={{
                width: '100%',
                height: '2px',
                background: 'currentColor',
                borderRadius: '1px',
                transition: 'all 0.3s ease',
                transform: isMenuOpen ? 'rotate(-45deg) translate(7px, -6px)' : 'none',
              }}
            />
          </div>
        </button>
      )}
      
      <div style={navLinksStyle}>
        {links.map((text) => (
          <a
            key={text}
            href={text === 'Naruto' ? '/naruto' : `#${text.toLowerCase()}`}
            style={getLinkStyle(text)}
            onMouseEnter={(e) => handleMouseEnter(e, text)}
            onMouseLeave={(e) => handleMouseLeave(e, text)}
            onClick={(e) => {
              if (text === 'Naruto') {
                e.preventDefault();
                window.location.href = '/naruto';
                return;
              }
              handleClick(e, text);
            }}
          >
            {text}
          </a>
        ))}
      </div>
    </nav>
  );
}

export default TradNav;
