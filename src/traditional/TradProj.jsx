import React, { useState, useEffect } from 'react';
import { top10Projects } from '../pages/ProjectsData';

const TradProj = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchTerm, setSearchTerm] = useState('');

  // Utility: derive tech array from ProjectsData entry
  const getTechArray = (proj) => {
    if (!proj) return [];
    if (Array.isArray(proj.techStack)) return proj.techStack;
    if (typeof proj.tech === 'string') {
      return proj.tech
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
    }
    return [];
  };

  // Enhanced filtering with search functionality
  const filteredProjects = top10Projects.filter((proj) => {
    const matchesFilter = filter === 'All' || proj.category === filter;
    const techs = getTechArray(proj).map((t) => t.toLowerCase());
    const matchesSearch =
      searchTerm === '' ||
      techs.some((t) => t.includes(searchTerm.toLowerCase())) ||
      proj.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Animation effect for filter changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [filter]);

  // Reset selected project when filter changes
  useEffect(() => {
    setSelectedProject(0);
  }, [filter]);

  // Handle window resize for responsive design
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const selected = filteredProjects[selectedProject];
  const isShortDesc = selected && selected.description && selected.description.length < 160;

  return (
    <section
      id="projects"
      style={{
        padding: 'var(--space-2xl) var(--space-lg)',
        maxWidth: '1400px',
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
          background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        🎨 Project Gallery ({filteredProjects.length})
      </h2>

      {/* Filter and Search Section */}
      <div
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'stretch' : 'center',
          gap: 'var(--space-xl)',
          marginBottom: 'var(--space-3xl)',
          padding: 'var(--space-xl)',
          background: 'transparent',
          borderRadius: 0,
          border: 'none',
          backdropFilter: 'none',
          boxShadow: 'none',
        }}
      >
        {/* Filter Buttons */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--space-sm)',
            flexWrap: 'wrap',
            justifyContent: isMobile ? 'center' : 'flex-start',
          }}
        >
        {['All', 'Hackathon', 'Free Lance', 'Open Source', 'Full Stack', 'ML'].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={{
              padding: 'var(--space-sm) var(--space-lg)',
              background: filter === cat 
                ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))' 
                : 'rgba(255, 255, 255, 0.05)',
              color: filter === cat ? 'white' : 'var(--text-secondary)',
              border: `1px solid ${filter === cat ? 'var(--accent-primary)' : 'rgba(255, 255, 255, 0.1)'}`,
              borderRadius: 'var(--radius-full)',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: 'var(--text-sm)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: filter === cat 
                ? '0 8px 32px rgba(var(--accent-primary-rgb), 0.3), 0 0 0 1px rgba(var(--accent-primary-rgb), 0.2)'
                : '0 4px 16px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={(e) => {
              if (filter !== cat) {
                e.target.style.background = 'rgba(var(--accent-primary-rgb), 0.1)';
                e.target.style.borderColor = 'var(--accent-primary)';
                e.target.style.color = 'var(--accent-primary)';
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 12px 40px rgba(var(--accent-primary-rgb), 0.2)';
              }
            }}
            onMouseLeave={(e) => {
              if (filter !== cat) {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)';
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.target.style.color = 'var(--text-secondary)';
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.1)';
              }
            }}
          >
            {cat}
          </button>
        ))}
        </div>

        {/* Search Bar */}
        <div
          style={{
            position: 'relative',
            minWidth: isMobile ? '100%' : '300px',
            maxWidth: isMobile ? '100%' : '400px',
          }}
        >
          <input
            type="text"
            placeholder="🔍 Search by technology or project name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--space-md) var(--space-lg) var(--space-md) 3rem',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 'var(--radius-full)',
              color: 'var(--text-primary)',
              fontSize: 'var(--text-sm)',
              fontFamily: 'var(--font-family-primary)',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              outline: 'none',
              fontWeight: '500',
            }}
            onFocus={(e) => {
              e.target.style.borderColor = 'var(--accent-primary)';
              e.target.style.boxShadow = '0 0 0 3px rgba(var(--accent-primary-rgb), 0.15), 0 8px 32px rgba(var(--accent-primary-rgb), 0.1)';
              e.target.style.background = 'rgba(255, 255, 255, 0.08)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.target.style.boxShadow = 'none';
              e.target.style.background = 'rgba(255, 255, 255, 0.05)';
            }}
          />
          <span
            style={{
              position: 'absolute',
              left: 'var(--space-md)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-secondary)',
              fontSize: 'var(--text-lg)',
              pointerEvents: 'none',
              opacity: 0.7,
            }}
          >
            🔍
          </span>
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              style={{
                position: 'absolute',
                right: 'var(--space-md)',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: 'var(--text-lg)',
                padding: 'var(--space-xs)',
                borderRadius: 'var(--radius-full)',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--accent-primary)';
                e.target.style.background = 'rgba(var(--accent-primary-rgb), 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--text-secondary)';
                e.target.style.background = 'none';
              }}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Main Projects Layout */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 2fr',
          gap: 0,
          height: '80vh',
          opacity: isAnimating ? 0.7 : 1,
          transform: isAnimating ? 'scale(0.98)' : 'scale(1)',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      >
        {/* Left Side - Project List */}
        <div
          style={{
            background: 'transparent',
            borderRadius: 0,
            padding: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
            border: 'none',
            backdropFilter: 'none',
            boxShadow: 'none',
            height: '100%',
            overflowY: 'auto',
            position: isMobile ? 'static' : 'sticky',
            top: isMobile ? 'auto' : 'var(--space-xl)',
            order: isMobile ? 2 : 1,
          }}
        >
          <h3
            style={{
              fontSize: 'var(--text-xl)',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-lg)',
              fontWeight: '600',
              textAlign: 'center',
            }}
          >
            Projects
          </h3>
          
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-sm)',
            }}
          >
            {filteredProjects.map((proj, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedProject(idx)}
                style={{
                  padding: 'var(--space-md)',
                  background: selectedProject === idx 
                    ? 'linear-gradient(135deg, rgba(var(--accent-purple-rgb), 0.2), rgba(var(--accent-primary-rgb), 0.1))'
                    : 'transparent',
                  border: selectedProject === idx 
                    ? '1px solid var(--accent-purple)'
                    : '1px solid transparent',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={(e) => {
                  if (selectedProject !== idx) {
                    e.currentTarget.style.background = 'var(--bg-card)';
                    e.currentTarget.style.borderColor = 'var(--border-secondary)';
                    e.currentTarget.style.transform = 'translateX(8px)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedProject !== idx) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.borderColor = 'transparent';
                    e.currentTarget.style.transform = 'translateX(0)';
                  }
                }}
              >
                {proj.inProgress && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '8px',
                      right: '8px',
                      background: '#FFD700',
                      color: '#111',
                      padding: '2px 8px',
                      borderRadius: '9999px',
                      fontSize: '0.7rem',
                      fontWeight: 800,
                      border: '1px solid rgba(181,143,0,0.8)',
                      boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
                    }}
                  >
                    In Progress
                  </span>
                )}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: isMobile ? 'var(--space-xs)' : 'var(--space-sm)',
                    marginBottom: 'var(--space-xs)',
                  }}
                >
                  <span
                    style={{
                      fontSize: isMobile ? '0.7rem' : 'var(--text-xs)',
                      color: 'var(--accent-primary)',
                      background: 'rgba(var(--accent-primary-rgb), 0.1)',
                      border: '1px solid rgba(var(--accent-primary-rgb), 0.3)',
                      padding: isMobile ? '1px 4px' : '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: '600',
                      minWidth: isMobile ? '16px' : '20px',
                      textAlign: 'center',
                    }}
                  >
                    {idx + 1}
                  </span>
                  <h4
                    style={{
                      fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)',
                      color: selectedProject === idx ? 'var(--accent-purple)' : 'var(--text-primary)',
                      fontWeight: selectedProject === idx ? '600' : '500',
                      margin: 0,
                      transition: 'all 0.3s ease',
                    }}
                  >
                    {proj.title}
                  </h4>
                </div>
                
                {/* Tech Stack Tags */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: isMobile ? '2px' : 'var(--space-xs)',
                    marginTop: 'var(--space-xs)',
                  }}
                >
                  {(getTechArray(proj).length ? getTechArray(proj) : ['Various Technologies']).map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      style={{
                        fontSize: isMobile ? '0.65rem' : 'var(--text-xs)',
                        color: 'var(--accent-purple)',
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        padding: isMobile ? '1px 4px' : '2px 8px',
                        borderRadius: 'var(--radius-full)',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Project Details */}
        <div
          style={{
            background: 'transparent',
            borderRadius: 0,
            padding: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
            border: 'none',
            backdropFilter: 'none',
            boxShadow: 'none',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-lg)',
            order: isMobile ? 1 : 2,
            height: '100%',
            overflow: 'auto',
          }}
        >
          {selected && (
            <>
              {/* Project Image */}
              <div
                style={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'visible',
                  position: 'relative',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <img
                  src={selected.image}
                  alt={selected.title}
                  style={{
                    width: 'auto',
                    maxWidth: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    display: 'block',
                  }}
                />
                {selected.inProgress && (
                  <span
                    style={{
                      position: 'absolute',
                      top: '10px',
                      right: '10px',
                      background: '#FFD700',
                      color: '#111',
                      padding: '6px 10px',
                      borderRadius: '9999px',
                      fontSize: '12px',
                      fontWeight: 800,
                      border: '1px solid rgba(181,143,0,0.8)',
                      boxShadow: '0 6px 14px rgba(0,0,0,0.25)'
                    }}
                  >
                    In Progress
                  </span>
                )}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent, rgba(var(--accent-primary-rgb), 0.1), transparent)',
                    
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />
              </div>

              {/* Project Title */}
              <h3
                style={{
                  fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-2xl)',
                  color: 'var(--text-primary)',
                  fontWeight: '700',
                  marginBottom: isMobile ? 'var(--space-xs)' : 'var(--space-sm)',
                  background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {selected.title}
              </h3>

              {/* Project Date */}
              <p
                style={{
                  fontSize: isMobile ? 'var(--text-xs)' : 'var(--text-sm)',
                  color: 'var(--accent-primary)',
                  fontWeight: '500',
                  marginBottom: isMobile ? 'var(--space-sm)' : 'var(--space-md)',
                  textShadow: '0 0 10px var(--accent-primary)',
                }}
              >
                {selected.date}
              </p>

              {/* Project Description */}
              <p
                style={{
                  fontSize: isShortDesc ? (isMobile ? 'var(--text-base)' : 'var(--text-lg)') : (isMobile ? 'var(--text-sm)' : 'var(--text-base)'),
                  color: 'var(--text-secondary)',
                  lineHeight: isMobile ? '1.55' : '1.7',
                  marginBottom: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
                  fontWeight: isShortDesc ? 600 : 400
                }}
              >
                {selected.description}
              </p>

              {/* Tech Stack */}
              <div
                style={{
                  marginBottom: 'var(--space-lg)',
                }}
              >
                <h4
                  style={{
                    fontSize: 'var(--text-lg)',
                    color: 'var(--text-primary)',
                    fontWeight: '600',
                    marginBottom: 'var(--space-sm)',
                  }}
                >
                  Tech Stack
                </h4>
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 'var(--space-sm)',
                  }}
                >
                  {(getTechArray(selected).length ? getTechArray(selected) : ['Various Technologies']).map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      style={{
                        fontSize: 'var(--text-sm)',
                        color: 'var(--accent-purple)',
                        background: 'rgba(139, 92, 246, 0.15)',
                        border: '1px solid rgba(139, 92, 246, 0.4)',
                        padding: 'var(--space-xs) var(--space-sm)',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: '500',
                        transition: 'all 0.3s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = 'rgba(139, 92, 246, 0.25)';
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 8px rgba(139, 92, 246, 0.3)';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(139, 92, 246, 0.15)';
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div
                style={{
                  display: 'flex',
                  gap: 'var(--space-md)',
                  marginTop: 'auto',
                }}
              >
                {(() => {
                  const hasDemo = !!(selected.link && selected.link !== '#');
                  const commonStyle = {
                    flex: 1,
                    padding: 'var(--space-md) var(--space-lg)',
                    background: 'var(--bg-glass)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    borderRadius: '9999px',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 'var(--text-sm)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    border: '1px solid var(--border-glow)',
                    cursor: hasDemo ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-xs)',
                    opacity: hasDemo ? 1 : 0.6,
                    pointerEvents: hasDemo ? 'auto' : 'none'
                  };
                  return (
                    <a
                      href={hasDemo ? selected.link : undefined}
                      target={hasDemo ? '_blank' : undefined}
                      rel={hasDemo ? 'noreferrer' : undefined}
                      style={commonStyle}
                      onMouseEnter={(e) => {
                        if (!hasDemo) return;
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 14px 35px rgba(0,0,0,0.2)';
                        e.target.style.borderColor = 'var(--accent-primary)';
                      }}
                      onMouseLeave={(e) => {
                        if (!hasDemo) return;
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                        e.target.style.borderColor = 'var(--border-glow)';
                      }}
                    >
                      <span>Demo</span>
                    </a>
                  );
                })()}
 
                {(() => {
                  const hasGit = !!(selected.git && selected.git !== '#');
                  const commonStyle = {
                    flex: 1,
                    padding: 'var(--space-md) var(--space-lg)',
                    background: 'var(--bg-glass)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    borderRadius: '9999px',
                    textAlign: 'center',
                    fontWeight: '700',
                    fontSize: 'var(--text-sm)',
                    transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease, opacity 0.2s ease',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                    border: '1px solid var(--border-glow)',
                    cursor: hasGit ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-xs)',
                    opacity: hasGit ? 1 : 0.6,
                    pointerEvents: hasGit ? 'auto' : 'none'
                  };
                  return (
                    <a
                      href={hasGit ? selected.git : undefined}
                      target={hasGit ? '_blank' : undefined}
                      rel={hasGit ? 'noreferrer' : undefined}
                      style={commonStyle}
                      onMouseEnter={(e) => {
                        if (!hasGit) return;
                        e.target.style.transform = 'translateY(-3px)';
                        e.target.style.boxShadow = '0 14px 35px rgba(0,0,0,0.2)';
                        e.target.style.borderColor = 'var(--accent-primary)';
                      }}
                      onMouseLeave={(e) => {
                        if (!hasGit) return;
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 10px 25px rgba(0,0,0,0.1)';
                        e.target.style.borderColor = 'var(--border-glow)';
                      }}
                    >
                      <span>GitHub</span>
                    </a>
                  );
                })()}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TradProj;
