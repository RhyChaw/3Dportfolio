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
        left: '10%',
        width: '80%',
        height: '80%',
        backgroundImage: 'url("/images/scroll-texture.jpg")',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        borderRadius: '20px',
        padding: '20px',
        overflowY: 'auto',
        zIndex: 1000,
        fontFamily: '"Noto Serif JP", serif',
        boxShadow: '0 0 30px rgba(0,0,0,0.6)',
        border: '6px double #fff',
        backdropFilter: 'blur(6px)',
        color: '#fffbe6',
      }}
    >
      <h2 style={{ textAlign: 'center', fontSize: '28px', color: '#FFA500' }}>📁 Rhythm's Mission Scroll: Projects</h2>

      {/* Filter Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', margin: '20px 0' }}>
        {['All', 'Web Dev', 'AI'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === cat ? '#FF4500' : '#222',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              boxShadow: '0 0 8px rgba(0,0,0,0.3)'
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Cards */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px',
          justifyContent: 'center',
        }}
      >
        {filteredProjects.map((proj, idx) => (
          <div
            key={idx}
            style={{
              backgroundColor: proj.backgroundColor,
              width: '220px',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 0 15px rgba(0,0,0,0.5)',
              transition: 'transform 0.3s ease-in-out',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
          >
            <a href={proj.link} target="_blank" rel="noreferrer" style={{ textDecoration: 'none', color: 'black' }}>
              <img src={proj.image} alt={proj.title} style={{ width: '100%', height: '140px', objectFit: 'cover' }} />
              <div style={{ padding: '10px' }}>
                <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{proj.title}</h3>
                <p style={{ fontSize: '14px' }}>{proj.description}</p>
              </div>
            </a>
          </div>
        ))}
      </div>

      {/* Close Button */}
      <button
        onClick={onClose}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          backgroundColor: '#FF4500',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          cursor: 'pointer',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}
      >
        Close Scroll
      </button>
    </div>
  );
};

export default Projects;
