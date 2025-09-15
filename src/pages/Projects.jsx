import React, { useState } from 'react';
import { top10Projects } from './ProjectsData';

const Projects = ({ onClose }) => {
  const [filter, setFilter] = useState('All');

  const filteredProjects =
    filter === 'All'
      ? top10Projects
      : top10Projects.filter((proj) => proj.category === filter);

  return (
    <div
      style={{
        position: 'absolute',
        top: '10%',
        left: '20%',
        width: '60%',
        height: '80%',
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-xl)',
        overflowY: 'auto',
        zIndex: 1000,
        fontFamily: 'var(--font-family-primary)',
        boxShadow: 'var(--shadow-xl)',
        border: '1px solid var(--border-primary)',
        backdropFilter: 'blur(8px)',
        color: 'var(--text-primary)',
      }}
    >
      <h2 style={{ 
        textAlign: 'center', 
        fontSize: 'var(--text-2xl)', 
        color: 'var(--accent-primary)',
        fontWeight: '700',
        marginBottom: 'var(--space-xl)',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
      }}>📁 Featured Projects</h2>

      {/* Filter Buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 'var(--space-sm)', 
        margin: 'var(--space-xl) 0' 
      }}>
        {['All', 'Web Dev', 'AI'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: 'var(--space-sm) var(--space-md)',
              background: filter === cat 
                ? 'linear-gradient(135deg, var(--accent-primary), #0099cc)' 
                : 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: `1px solid ${filter === cat ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              boxShadow: 'var(--shadow-sm)',
              fontSize: 'var(--text-sm)',
              fontWeight: '500',
              transition: 'all var(--transition-fast)'
            }}
            onMouseEnter={(e) => {
              if (filter !== cat) {
                e.target.style.background = 'var(--bg-tertiary)';
                e.target.style.borderColor = 'var(--border-secondary)';
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== cat) {
                e.target.style.background = 'var(--bg-secondary)';
                e.target.style.borderColor = 'var(--border-primary)';
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 'var(--space-lg)',
            justifyContent: 'center',
          }}
        >
          {filteredProjects.map((proj, idx) => {
            const isShort = proj.description && proj.description.length < 140;
            return (
            <div
              key={idx}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: 'var(--shadow-md)',
                transition: 'all var(--transition-normal)',
                cursor: 'pointer',
                fontFamily: 'inherit',
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
              <a href={proj.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '100%', maxHeight: '600px', overflow: 'auto', background: 'var(--bg-card)' }}>
                  <img src={proj.image} alt={proj.title} style={{ 
                    width: '100%', 
                    height: 'auto', 
                    objectFit: 'contain' 
                  }} />
                </div>
                <div style={{ padding: 'var(--space-md)' }}>
                  <h3 style={{ 
                    margin: '0 0 var(--space-sm) 0', 
                    fontSize: 'var(--text-lg)',
                    color: 'var(--text-primary)',
                    fontWeight: '600'
                  }}>{proj.title}</h3>
                  <p style={{ 
                    fontSize: 'var(--text-xs)', 
                    color: 'var(--accent-primary)', 
                    marginBottom: 'var(--space-xs)',
                    fontWeight: '500'
                  }}>{proj.date}</p>
                  <p style={{ 
                    fontSize: isShort ? 'var(--text-base)' : 'var(--text-sm)', 
                    color: 'var(--text-secondary)',
                    lineHeight: isShort ? '1.6' : '1.5',
                    fontWeight: isShort ? 600 : 400
                  }}>{proj.description}</p>
                </div>
              </a>
            </div>
          )})}
        </div>


      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          marginTop: 'var(--space-xl)',
          padding: 'var(--space-sm) var(--space-lg)',
          background: 'linear-gradient(135deg, var(--accent-secondary), #ff8c42)',
          color: 'var(--text-primary)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          fontWeight: '600',
          fontSize: 'var(--text-sm)',
          boxShadow: 'var(--shadow-md)',
          transition: 'all var(--transition-fast)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = 'var(--shadow-lg)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'var(--shadow-md)';
        }}
      >
        Close
      </button>
    </div>
  );
};

export default Projects;
