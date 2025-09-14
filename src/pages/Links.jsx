import React from 'react';

function Links({ onClose }) {
  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>💻 Ninja Terminal</h2>

      <p style={descStyle}>
        Find me across the Shinobi Web:
      </p>

      <ul style={listStyle}>
        <li>
         <strong>GitHub:</strong>{' '}
          <a href="https://github.com/RhyChaw" target="_blank" rel="noreferrer" style={linkStyle}>
            github.com/RhyChaw
          </a>
        </li>
        <li>
          <strong>LinkedIn:</strong>{' '}
          <a href="https://www.linkedin.com/in/rhythm-chawla-18723a231/" target="_blank" rel="noreferrer" style={linkStyle}>
            rhythm-chawla
          </a>
        </li>
        <li>
          <strong>Email:</strong>{' '}
          <a href="mailto:r3chawla@uwaterloo.ca" style={linkStyle}>
            r3chawla@uwaterloo.ca
          </a>
        </li>
      </ul>

      <button onClick={onClose} style={closeStyle}>
        Close Terminal
      </button>
    </div>
  );
}

const containerStyle = {
  position: 'absolute',
  top: '15%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '90%',
  maxWidth: '500px',
  background: 'var(--bg-card)',
  padding: 'var(--space-2xl)',
  borderRadius: 'var(--radius-xl)',
  color: 'var(--text-primary)',
  zIndex: 1000,
  fontFamily: 'var(--font-family-primary)',
  border: '1px solid var(--border-primary)',
  boxShadow: 'var(--shadow-xl)',
  backdropFilter: 'blur(8px)',
  textAlign: 'center'
};

const titleStyle = {
  fontSize: 'var(--text-2xl)',
  marginBottom: 'var(--space-lg)',
  color: 'var(--accent-primary)',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  fontWeight: '700'
};

const descStyle = {
  fontSize: 'var(--text-sm)',
  marginBottom: 'var(--space-xl)',
  color: 'var(--text-secondary)',
  lineHeight: '1.6'
};

const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  fontSize: 'var(--text-sm)',
  lineHeight: '1.8em',
  color: 'var(--text-primary)'
};

const linkStyle = {
  color: 'var(--accent-primary)',
  textDecoration: 'none',
  fontWeight: '500',
  padding: 'var(--space-xs) var(--space-sm)',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--bg-secondary)',
  border: '1px solid var(--border-primary)',
  transition: 'all var(--transition-fast)',
  display: 'inline-block',
  margin: 'var(--space-xs)'
};

const closeStyle = {
  marginTop: 'var(--space-xl)',
  padding: 'var(--space-sm) var(--space-lg)',
  background: 'linear-gradient(135deg, var(--accent-secondary), #ff8c42)',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  fontWeight: '600',
  fontSize: 'var(--text-sm)',
  cursor: 'pointer',
  boxShadow: 'var(--shadow-md)',
  transition: 'all var(--transition-fast)'
};

export default Links;
