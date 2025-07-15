import React, { useState } from 'react';
import { top10Projects } from '../pages/ProjectsData'; // Adjust path

const TradProj = () => {
  const [filter, setFilter] = useState('All');

  const filteredProjects =
    filter === 'All'
      ? top10Projects
      : top10Projects.filter((proj) => proj.category === filter);

  // Example tech stack map
  const techStacks = {
    G12: 'React, Firebase',
    Bhasha: 'NextJS, Supabase, Flutter',
    StrumSpace: 'YOLOv8, ThreeJS',
    Rhythm: 'Python, Audio Processing',
    ZafariCC: 'NextJS',
    MettaStars: 'ReactJS',
    MineGuard: 'Python, ML',
    JADO: 'Python, LLMs',
    DoctorAI: 'HuggingFace, Llama2',
    CSGPTPRO: 'Python, Streamlit',
    WildOasis: 'React Query, Supabase',
    VBOman: 'ReactJS, Firebase',
    WATisZine: 'React, MongoDB',
    PawPal: 'Python, ML',
    Hestia: 'Django, Azure',
    RocketLanding: 'Python, Gymnasium',
    ReduxBank: 'React, Redux Toolkit',
  };

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

      {/* Split Grid: Marquee + Table */}
      <div
        style={{
          display: 'flex',
          gap: '2rem',
          flexWrap: 'wrap',
        }}
      >
        {/* Marquee container */}
        <div
          style={{
            flex: '2',
            overflowX: 'auto',
            scrollbarWidth: 'thin',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: '2rem',
              animation: 'scroll 30s linear infinite',
              width: 'max-content',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = 'running';
            }}
          >
            {[...filteredProjects, ...filteredProjects].map((proj, idx) => (
              <a
                key={idx}
                href={proj.link}
                target="_blank"
                rel="noreferrer"
                style={{
                  minWidth: '250px',
                  maxWidth: '250px',
                  flex: '0 0 auto',
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
                  e.currentTarget.style.boxShadow =
                    '0 12px 25px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'none';
                  e.currentTarget.style.boxShadow =
                    '0 6px 15px rgba(0,0,0,0.1)';
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
                  <h3
                    style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem' }}
                  >
                    {proj.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '0.8rem',
                      color: '#6b7280',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {proj.date}
                  </p>
                  <p style={{ fontSize: '0.95rem', color: '#374151' }}>
                    {proj.description}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>

        {/* Tech stack table */}
        <div
          style={{
            flex: '1',
            overflowY: 'auto',
            maxHeight: '400px',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
          }}
        >
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
            }}
          >
            <thead>
              <tr style={{ background: '#f3f4f6', textAlign: 'left' }}>
                <th style={{ padding: '0.5rem' }}>Project</th>
                <th style={{ padding: '0.5rem' }}>Tech Stack</th>
              </tr>
            </thead>
            <tbody>
              {filteredProjects.map((proj, idx) => (
                <tr
                  key={idx}
                  style={{
                    borderBottom: '1px solid #e5e7eb',
                  }}
                >
                  <td style={{ padding: '0.5rem' }}>{proj.title}</td>
                  <td style={{ padding: '0.5rem' }}>
                    {techStacks[proj.title] || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inline keyframes */}
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
};

export default TradProj;
