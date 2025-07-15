import React, { useState } from 'react';
import { top10Projects } from '../pages/ProjectsData'; // Adjust the import path as necessary

const TradProj = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects =
    filter === 'All'
      ? top10Projects
      : top10Projects.filter((proj) => proj.category === filter);

  return (
    <section
      id="projects"
      style={{
        padding: '2rem 1rem',
        maxWidth: '1100px',
        margin: '0 auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '1rem',
          color: '#111827',
        }}
      >
        📁 My Projects
      </h2>

      {/* Filter Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '1rem',
          marginBottom: '2rem',
          flexWrap: 'wrap',
        }}
      >
        {['All', 'Web Dev', 'AI'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: '8px 16px',
              backgroundColor: filter === cat ? '#2563EB' : '#E5E7EB',
              color: filter === cat ? '#fff' : '#111827',
              border: 'none',
              borderRadius: '9999px',
              cursor: 'pointer',
              fontWeight: 600,
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '2rem',
        }}
      >
        {filteredProjects.map((proj, idx) => (
          <a
            key={idx}
            href={proj.link}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: 'none',
              color: '#1f2937',
              background: '#fff',
              borderRadius: '12px',
              boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
              overflow: 'hidden',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-5px)';
              e.currentTarget.style.boxShadow = '0 12px 25px rgba(0,0,0,0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'none';
              e.currentTarget.style.boxShadow = '0 6px 15px rgba(0,0,0,0.1)';
            }}
          >
            <img
              src={proj.image}
              alt={proj.title}
              style={{
                width: '100%',
                height: '160px',
                objectFit: 'cover',
              }}
            />
            <div style={{ padding: '1rem' }}>
              <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}>
                {proj.title}
              </h3>
              <p style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '0.5rem' }}>
                {proj.date}
              </p>
              <p style={{ fontSize: '0.95rem', color: '#374151' }}>
                {proj.description}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default TradProj;
