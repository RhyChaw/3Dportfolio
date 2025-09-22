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
        left: '15%',
        width: '70%',
        height: '80%',
        backgroundImage: 'url("/images/scroll-texture.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: '20px',
        padding: '40px',
        overflowY: 'auto',
        zIndex: 1000,
        fontFamily: '"Noto Serif JP", "Papyrus", serif',
        boxShadow: '0 0 40px rgba(0,0,0,0.7)',
        border: '8px double #FFD700',
        backdropFilter: 'blur(6px)',
        color: '#fffbe6',
      }}
    >
      <h2 style={{ 
        textAlign: 'center', 
        fontSize: '32px', 
        color: '#FFD700',
        fontWeight: '700',
        marginBottom: '24px',
        textShadow: '2px 2px 4px #000'
      }}>📁 Featured Projects</h2>

      {/* Filter Buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: '8px', 
        margin: '24px 0' 
      }}>
        {['All', 'Web Dev', 'AI'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '8px 14px',
              background: filter === cat 
                ? '#FF4500' 
                : 'rgba(0,0,0,0.35)',
              color: '#fffbe6',
              border: `1px solid ${filter === cat ? '#FF4500' : '#FFD700'}`,
              borderRadius: '10px',
              cursor: 'pointer',
              boxShadow: '0 0 10px rgba(0,0,0,0.4)',
              fontSize: '14px',
              fontWeight: '700',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              if (filter !== cat) {
                e.target.style.background = 'rgba(0,0,0,0.45)';
                e.target.style.borderColor = '#FFD700';
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== cat) {
                e.target.style.background = 'rgba(0,0,0,0.35)';
                e.target.style.borderColor = '#FFD700';
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
                background: 'rgba(0,0,0,0.35)',
                border: '1px solid #FFD700',
                borderRadius: '14px',
                overflow: 'hidden',
                boxShadow: '0 0 12px rgba(0,0,0,0.6)',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                fontFamily: 'inherit',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 0 18px rgba(0,0,0,0.7)';
                e.currentTarget.style.borderColor = '#FF4500';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 0 12px rgba(0,0,0,0.6)';
                e.currentTarget.style.borderColor = '#FFD700';
              }}
            >
              <a href={proj.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div style={{ width: '100%', maxHeight: '600px', overflow: 'auto', background: 'rgba(0,0,0,0.35)' }}>
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
                    color: '#fffbe6',
                    fontWeight: '700',
                    textShadow: '1px 1px 2px #000'
                  }}>{proj.title}</h3>
                  <p style={{ 
                    fontSize: 'var(--text-xs)', 
                    color: '#FFD700', 
                    marginBottom: 'var(--space-xs)',
                    fontWeight: '700'
                  }}>{proj.date}</p>
                  {proj.tech && (
                    <p style={{ 
                      fontSize: 'var(--text-xs)', 
                      color: '#FF4500', 
                      marginBottom: 'var(--space-xs)',
                      fontWeight: '700',
                      fontStyle: 'italic',
                      textShadow: '1px 1px 2px #000'
                    }}>{proj.tech}</p>
                  )}
                  <p style={{ 
                    fontSize: isShort ? 'var(--text-base)' : 'var(--text-sm)', 
                    color: '#fffbe6',
                    lineHeight: isShort ? '1.6' : '1.5',
                    fontWeight: isShort ? 600 : 400,
                    textShadow: '1px 1px 2px #000'
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
          marginTop: '30px',
          padding: '12px 24px',
          background: '#FF4500',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          fontWeight: 'bold',
          fontSize: '16px',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 0 14px rgba(0,0,0,0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        }}
      >
        Close
      </button>
    </div>
  );
};

export default Projects;
