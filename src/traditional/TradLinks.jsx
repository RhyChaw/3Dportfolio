import React from 'react';

const TradLinks = () => {
  return (
    <section
      id="links"
      style={{
        padding: '2rem 1rem',
        maxWidth: '700px',
        margin: '0 auto',
        textAlign: 'center',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: '2rem',
          marginBottom: '0.5rem',
          color: '#0f172a', // Slate-900
        }}
      >
        💻 Find Me Online
      </h2>

      <p
        style={{
          fontSize: '1rem',
          color: '#334155', // Slate-700
          marginBottom: '1.5rem',
        }}
      >
        Connect with me on the Shinobi Web:
      </p>

      <ul
        style={{
          listStyle: 'none',
          padding: 0,
          margin: 0,
          fontSize: '1rem',
          lineHeight: '2',
        }}
      >
        <li>
          <strong>GitHub:</strong>{' '}
          <a
            href="https://github.com/RhyChaw"
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            github.com/RhyChaw
          </a>
        </li>
        <li>
          <strong>LinkedIn:</strong>{' '}
          <a
            href="https://www.linkedin.com/in/rhythm-chawla-18723a231/"
            target="_blank"
            rel="noreferrer"
            style={linkStyle}
          >
            rhythm-chawla
          </a>
        </li>
        <li>
          <strong>Email:</strong>{' '}
          <a
            href="mailto:r3chawla@uwaterloo.ca"
            style={linkStyle}
          >
            r3chawla@uwaterloo.ca
          </a>
        </li>
      </ul>
    </section>
  );
};

const linkStyle = {
  color: '#2563EB', // blue-600
  textDecoration: 'underline',
  fontWeight: '600',
};

export default TradLinks;
