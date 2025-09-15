import React from 'react';

const TradLinks = () => {
  const links = [
    {
      name: 'GitHub',
      url: 'https://github.com/RhyChaw',
      icon: '💻',
      description: 'Check out my code and projects'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/rhythm-chawla-18723a231/',
      icon: '💼',
      description: 'Connect with me professionally'
    },
    {
      name: 'Email',
      url: 'mailto:r3chawla@uwaterloo.ca',
      icon: '📧',
      description: 'Send me a message directly'
    }
  ];

  return (
    <section
      id="links"
      style={{
        padding: 'var(--space-2xl) var(--space-lg)',
        maxWidth: '800px',
        margin: '0 auto',
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      <h2
        style={{
          fontSize: 'var(--text-3xl)',
          marginBottom: 'var(--space-lg)',
          color: 'var(--text-primary)',
          fontWeight: '700',
          textAlign: 'center',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        🌐 Connect With Me
      </h2>

      <p
        style={{
          fontSize: 'var(--text-lg)',
          color: 'var(--text-secondary)',
          marginBottom: 'var(--space-2xl)',
          textAlign: 'center',
          lineHeight: '1.6',
        }}
      >
        Let's connect and collaborate on amazing projects!
      </p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--space-lg)',
        }}
      >
        {links.map((link, index) => (
          <a
            key={index}
            href={link.url}
            target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
            rel="noreferrer"
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: 'var(--space-xl)',
              background: 'var(--bg-card)',
              border: '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-lg)',
              textDecoration: 'none',
              color: 'inherit',
              transition: 'all var(--transition-normal)',
              boxShadow: 'var(--shadow-md)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              e.currentTarget.style.borderColor = 'var(--border-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--border-primary)';
            }}
          >
            <div
              style={{
                fontSize: 'var(--text-4xl)',
                marginBottom: 'var(--space-md)',
              }}
            >
              {link.icon}
            </div>
            <h3
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-sm)',
              }}
            >
              {link.name}
            </h3>
            <p
              style={{
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                textAlign: 'center',
                lineHeight: '1.5',
              }}
            >
              {link.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TradLinks;
