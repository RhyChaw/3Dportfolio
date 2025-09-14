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
        padding: 'var(--space-2xl) var(--space-lg)',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: 'var(--text-3xl)',
          marginBottom: 'var(--space-2xl)',
          color: 'var(--text-primary)',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        }}
      >
        📁 Featured Projects
      </h2>

      {/* Filter Buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-md)',
          marginBottom: 'var(--space-2xl)',
          flexWrap: 'wrap',
        }}
      >
        {['All', 'Web Dev', 'AI'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: 'var(--space-sm) var(--space-lg)',
              background: filter === cat 
                ? 'linear-gradient(135deg, var(--accent-primary), #0099cc)' 
                : 'var(--bg-card)',
              color: filter === cat ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: `1px solid ${filter === cat ? 'var(--accent-primary)' : 'var(--border-primary)'}`,
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: 'var(--text-sm)',
              transition: 'all var(--transition-fast)',
              boxShadow: filter === cat ? 'var(--shadow-md)' : 'var(--shadow-sm)',
            }}
            onMouseEnter={(e) => {
              if (filter !== cat) {
                e.target.style.background = 'var(--bg-tertiary)';
                e.target.style.borderColor = 'var(--border-secondary)';
                e.target.style.color = 'var(--text-primary)';
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== cat) {
                e.target.style.background = 'var(--bg-card)';
                e.target.style.borderColor = 'var(--border-primary)';
                e.target.style.color = 'var(--text-secondary)';
              }
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Project Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-lg)',
          marginBottom: 'var(--space-2xl)',
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
              color: 'inherit',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
              transition: 'all var(--transition-normal)',
              border: '1px solid var(--border-primary)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              e.currentTarget.style.borderColor = 'var(--border-accent)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--border-primary)';
            }}
          >
            <img
              src={proj.image}
              alt={proj.title}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
            <div style={{ padding: 'var(--space-lg)' }}>
              <h3
                style={{ 
                  margin: '0 0 var(--space-sm) 0', 
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                }}
              >
                {proj.title}
              </h3>
              <p
                style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--accent-primary)',
                  marginBottom: 'var(--space-sm)',
                  fontWeight: '500',
                }}
              >
                {proj.date}
              </p>
              <p style={{ 
                fontSize: 'var(--text-sm)', 
                color: 'var(--text-secondary)',
                lineHeight: '1.5',
                marginBottom: 'var(--space-sm)',
              }}>
                {proj.description}
              </p>
              <div style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-muted)',
                fontFamily: 'var(--font-family-mono)',
                background: 'var(--bg-secondary)',
                padding: 'var(--space-xs) var(--space-sm)',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-primary)',
              }}>
                {techStacks[proj.title] || 'Various Technologies'}
              </div>
            </div>
          </a>
        ))}
      </div>

    </section>
  );
};

export default TradProj;
