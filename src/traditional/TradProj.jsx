import React, { useState, useEffect } from 'react';
import { top10Projects } from '../pages/ProjectsData'; // Adjust path

const TradProj = () => {
  const [filter, setFilter] = useState('All');
  const [visibleProjects, setVisibleProjects] = useState([]);
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredProjects =
    filter === 'All'
      ? top10Projects
      : top10Projects.filter((proj) => proj.category === filter);

  // Animation effect for filter changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setVisibleProjects(filteredProjects);
      setIsAnimating(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [filter]);

  // Initial load animation
  useEffect(() => {
    setVisibleProjects(filteredProjects);
  }, []);

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
                ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))' 
                : 'var(--bg-glass)',
              color: filter === cat ? 'var(--text-primary)' : 'var(--text-secondary)',
              border: `1px solid ${filter === cat ? 'var(--accent-primary)' : 'var(--border-glow)'}`,
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              fontWeight: '500',
              fontSize: 'var(--text-sm)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: filter === cat ? 'var(--shadow-glow)' : 'var(--shadow-sm)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
            }}
            onMouseEnter={(e) => {
              if (filter !== cat) {
                e.target.style.background = 'var(--bg-card)';
                e.target.style.borderColor = 'var(--accent-primary)';
                e.target.style.color = 'var(--accent-primary)';
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = 'var(--shadow-glow)';
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== cat) {
                e.target.style.background = 'var(--bg-glass)';
                e.target.style.borderColor = 'var(--border-glow)';
                e.target.style.color = 'var(--text-secondary)';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = 'var(--shadow-sm)';
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
          opacity: isAnimating ? 0.5 : 1,
          transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {visibleProjects.map((proj, idx) => (
          <a
            key={idx}
            href={proj.link}
            target="_blank"
            rel="noreferrer"
            style={{
              textDecoration: 'none',
              color: 'inherit',
              background: 'var(--bg-glass)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              border: '1px solid var(--border-glow)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              animationDelay: `${idx * 0.1}s`,
              animation: 'fadeInUp 0.6s ease-out forwards',
              opacity: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glow), 0 20px 40px rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.borderColor = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
              e.currentTarget.style.borderColor = 'var(--border-glow)';
            }}
          >
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src={proj.image}
                alt={proj.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, transparent, rgba(0, 245, 255, 0.1), transparent)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
              }} />
            </div>
            <div style={{ padding: 'var(--space-lg)' }}>
              <h3
                style={{ 
                  margin: '0 0 var(--space-sm) 0', 
                  fontSize: 'var(--text-lg)',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
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
                  textShadow: '0 0 10px var(--accent-primary)',
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
                border: '1px solid var(--border-glow)',
                backdropFilter: 'blur(5px)',
                transition: 'all 0.3s ease',
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
