import React, { useState, useEffect } from 'react';
import { top10Projects } from '../pages/ProjectsData';

const TradProj = () => {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchTerm, setSearchTerm] = useState('');

  // Enhanced tech stack mapping with diverse and unique technologies
  const techStacks = {
    'SnapSafe (Hack the North 2025)': ['Lens Studio', 'Snap AR', 'Depth Caching', 'Ray Casting', 'Roboflow', 'ONNX', 'AR Navigation', 'Computer Vision'],
    'G12': ['React', 'Firebase', 'Vite', 'Framer Motion', 'Chart.js', 'Stripe API'],
    'G12 Mobile App': ['Flutter', 'Dart', 'Firebase', 'Provider', 'Google Maps', 'Push Notifications'],
    'Bhasha Web App': ['NextJS', 'Supabase', 'TypeScript', 'Prisma', 'Vercel', 'i18n'],
    'Bhasha Mobile App': ['Flutter', 'Dart', 'Supabase', 'Riverpod', 'Audio Players', 'Offline Storage'],
    'StrumSpace (SpurHacks Hackathon)': ['YOLOv8', 'ThreeJS', 'Computer Vision', 'WebRTC', 'TensorFlow.js', 'WebGL'],
    'Rhythm (Hack the Hill, Ottawa)': ['Wav2Vec2', 'OpenAI API', 'librosa', 'SciPy', 'Particle.js', 'Web Audio API'],
    'Zafari CC Design (FreeLance)': ['NextJS', 'TypeScript', 'Tailwind', 'Framer Motion', 'Sanity CMS', 'Vercel'],
    'MettaStars (FreeLance)': ['React', 'Vite', 'CSS3', 'GSAP', 'Swiper.js', 'EmailJS'],
    'MineGuard (Hack the Valley Hackathon)': ['Python', 'OpenCV', 'TensorFlow', 'Flask', 'WebSocket', 'Raspberry Pi'],
    'JADO AI': ['Python', 'Docker', 'NLP', 'OpenAI', 'FastAPI', 'PostgreSQL'],
    'Doctor AI Project': ['HuggingFace', 'Llama2', 'Python', 'Transformers', 'PyTorch', 'Gradio'],
    'CSGPTPRO Hackathon Project': ['Python', 'Streamlit', 'Arctic', 'CUDA', 'Pandas', 'NumPy'],
    'The Wild Oasis Project (Server)': ['React Query', 'Supabase', 'Styled Components', 'React Hook Form', 'Recharts', 'React Router'],
    'VBOman Admin Panel (FreeLance)': ['React', 'Firebase', 'Material-UI', 'Redux', 'Cloud Functions', 'Stripe'],
    'WATisZine Website': ['React', 'MongoDB', 'Node.js', 'Express', 'JWT', 'Multer'],
    'PawPal (GeeseHacks Hackathon)': ['Python', 'TensorFlow', 'Flask', 'OpenCV', 'SQLite', 'Heroku'],
    'Hestia | Your Next Home': ['Django', 'Python', 'Azure', 'PostgreSQL', 'Celery', 'Redis'],
    'Rocket Landing AI Project': ['Python', 'Gymnasium', 'Deep Q Learning', 'PyTorch', 'Matplotlib', 'Jupyter'],
    'Redux Bank Project': ['React', 'Redux Toolkit', 'JavaScript', 'RTK Query', 'React Router', 'JSON Server'],
  };

  // Enhanced filtering with search functionality
  const filteredProjects = top10Projects.filter((proj) => {
    const matchesFilter = filter === 'All' || proj.category === filter;
    const matchesSearch = searchTerm === '' || 
      techStacks[proj.title]?.some(tech => 
        tech.toLowerCase().includes(searchTerm.toLowerCase())
      ) || 
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
          background: 'var(--bg-glass)',
          borderRadius: 'var(--radius-2xl)',
          border: '1px solid var(--border-glow)',
          backdropFilter: 'blur(20px)',
          boxShadow: 'var(--shadow-lg)',
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
                ? '0 8px 32px rgba(0, 245, 255, 0.3), 0 0 0 1px rgba(0, 245, 255, 0.2)' 
                : '0 4px 16px rgba(0, 0, 0, 0.1)',
              backdropFilter: 'blur(10px)',
              position: 'relative',
              overflow: 'hidden',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
            onMouseEnter={(e) => {
              if (filter !== cat) {
                e.target.style.background = 'rgba(0, 245, 255, 0.1)';
                e.target.style.borderColor = 'var(--accent-primary)';
                e.target.style.color = 'var(--accent-primary)';
                e.target.style.transform = 'translateY(-3px) scale(1.05)';
                e.target.style.boxShadow = '0 12px 40px rgba(0, 245, 255, 0.2)';
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
              e.target.style.boxShadow = '0 0 0 3px rgba(0, 245, 255, 0.15), 0 8px 32px rgba(0, 245, 255, 0.1)';
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
                e.target.style.background = 'rgba(0, 245, 255, 0.1)';
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
            background: 'var(--bg-glass)',
            borderRadius: isMobile ? 'var(--radius-xl) var(--radius-xl) 0 0' : 'var(--radius-xl) 0 0 var(--radius-xl)',
            padding: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
            border: '1px solid var(--border-glow)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'var(--shadow-lg)',
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
                    ? 'linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(0, 245, 255, 0.1))'
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
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-sm)',
                    marginBottom: 'var(--space-xs)',
                  }}
                >
                  <span
                    style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--accent-primary)',
                      background: 'rgba(0, 245, 255, 0.1)',
                      border: '1px solid rgba(0, 245, 255, 0.3)',
                      padding: '2px 6px',
                      borderRadius: 'var(--radius-sm)',
                      fontWeight: '600',
                      minWidth: '20px',
                      textAlign: 'center',
                    }}
                  >
                    {idx + 1}
                  </span>
                  <h4
                    style={{
                      fontSize: 'var(--text-base)',
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
                    gap: 'var(--space-xs)',
                    marginTop: 'var(--space-xs)',
                  }}
                >
                  {(techStacks[proj.title] || ['Various Technologies']).map((tech, techIdx) => (
                    <span
                      key={techIdx}
                      style={{
                        fontSize: 'var(--text-xs)',
                        color: 'var(--accent-purple)',
                        background: 'rgba(139, 92, 246, 0.1)',
                        border: '1px solid rgba(139, 92, 246, 0.3)',
                        padding: '2px 8px',
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
            background: 'var(--bg-glass)',
            borderRadius: isMobile ? '0 0 var(--radius-xl) var(--radius-xl)' : '0 var(--radius-xl) var(--radius-xl) 0',
            padding: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
            border: '1px solid var(--border-glow)',
            backdropFilter: 'blur(10px)',
            boxShadow: 'var(--shadow-lg)',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-lg)',
            order: isMobile ? 1 : 2,
            height: '100%',
            overflowY: 'auto',
          }}
        >
          {filteredProjects[selectedProject] && (
            <>
              {/* Project Image */}
              <div
                style={{
                  width: '100%',
                  height: isMobile ? '200px' : '300px',
                  borderRadius: 'var(--radius-lg)',
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                <img
                  src={filteredProjects[selectedProject].image}
                  alt={filteredProjects[selectedProject].title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.4s ease',
                  }}
                />
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, transparent, rgba(0, 245, 255, 0.1), transparent)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}
                />
              </div>

              {/* Project Title */}
              <h3
                style={{
                  fontSize: 'var(--text-2xl)',
                  color: 'var(--text-primary)',
                  fontWeight: '700',
                  marginBottom: 'var(--space-sm)',
                  background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {filteredProjects[selectedProject].title}
              </h3>

              {/* Project Date */}
              <p
                style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--accent-primary)',
                  fontWeight: '500',
                  marginBottom: 'var(--space-md)',
                  textShadow: '0 0 10px var(--accent-primary)',
                }}
              >
                {filteredProjects[selectedProject].date}
              </p>

              {/* Project Description */}
              <p
                style={{
                  fontSize: 'var(--text-base)',
                  color: 'var(--text-secondary)',
                  lineHeight: '1.6',
                  marginBottom: 'var(--space-lg)',
                }}
              >
                {filteredProjects[selectedProject].description}
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
                  {(techStacks[filteredProjects[selectedProject].title] || ['Various Technologies']).map((tech, techIdx) => (
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
                <a
                  href={filteredProjects[selectedProject].link || '#'}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1,
                    padding: 'var(--space-md) var(--space-lg)',
                    background: 'linear-gradient(135deg, var(--accent-primary), #0099cc)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: 'var(--text-sm)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: 'var(--shadow-md)',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-xs)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = 'var(--shadow-lg)';
                    e.target.style.background = 'linear-gradient(135deg, #0099cc, var(--accent-primary))';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'var(--shadow-md)';
                    e.target.style.background = 'linear-gradient(135deg, var(--accent-primary), #0099cc)';
                  }}
                >
                  <span>🔗</span>
                  <span>Demo</span>
                </a>
                
                <a
                  href={filteredProjects[selectedProject].link || '#'}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    flex: 1,
                    padding: 'var(--space-md) var(--space-lg)',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    textDecoration: 'none',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center',
                    fontWeight: '600',
                    fontSize: 'var(--text-sm)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    boxShadow: 'var(--shadow-md)',
                    border: '1px solid var(--border-primary)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 'var(--space-xs)',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = 'var(--shadow-lg)';
                    e.target.style.background = 'var(--bg-card)';
                    e.target.style.borderColor = 'var(--accent-primary)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'var(--shadow-md)';
                    e.target.style.background = 'var(--bg-secondary)';
                    e.target.style.borderColor = 'var(--border-primary)';
                  }}
                >
                  <span>📁</span>
                  <span>GitHub</span>
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default TradProj;
