import React, { useState, useEffect, useRef } from 'react';

const experiences = [
  {
    title: 'Full Stack Software Engineering Co-op (Upcoming) | Carta - Hire & Retain',
    detail: `Tech I will use and what for:
- React + TypeScript: build and iterate on CTC and employee workflow UIs.
- Python + Django: implement backend APIs/services for hiring planners, offer letters, and pay band workflows.
- gRPC: define and integrate service-to-service contracts across backend systems.
- Java + Spring: contribute to backend services where applicable within the platform.
- Docker, Kubernetes, Helm: containerize services and participate in deploy/ops workflows in a cloud-native environment.`,
    year: 'Winter 2026 (Upcoming)',
    techTags: ['React', 'TypeScript', 'Python', 'Django', 'gRPC', 'Java', 'Spring', 'Docker', 'Kubernetes', 'Helm'],
  },
  {
    title: 'Associate Conversation Design Intern | Cresta (Series D AI Startup)',
    detail: `- Audited and optimized conversation workflows for 12 enterprise customers, collaborating cross-functionally and consistently receiving positive feedback from stakeholders.
- Built an LLM-powered redaction auditor that accelerated QA by 98%, automatically flagging sensitive/policy-violating content across thousands of conversations.
- Developed a demo automation suite (tabular autofill, natural language search over monitoring scripts, AIA management) that improved QA efficiency by 50% and streamlined enterprise ops.`,
    year: 'August 2025',
  },
  {
    title: 'Software Engineer & Founding Member | G12Uni, Enterprise COOP',
    detail: `- Launched and scaled a global platform connecting 1,500+ university students across 10+ countries, driving mentorship, innovation, and cross-border collaboration opportunities.
- Engineered a full-stack rebuild of the platform with Vite ReactJS, Tailwind, and real-time APIs (Google Meet, maps, chat, avatars, bots), elevating engagement and retention through sleek SaaS-driven design.
- Deployed and optimized NLP models for Reddit/YouTube intelligence pipelines on Docker + GCP, building scalable ML microservices that enabled continuous feature delivery.
- Partnered with Google for Education Startups through eCoop & Conrad.`,
    year: 'August 2024',
  }
];

const TradExp = () => {
  const [visibleItems, setVisibleItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate items one by one
            experiences.forEach((_, index) => {
              setTimeout(() => {
                setVisibleItems(prev => [...prev, index]);
              }, index * 300);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

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
      ref={sectionRef}
      id="experience"
      style={{
        padding: isMobile ? 'var(--space-2xl) var(--space-md)' : 'var(--space-3xl) var(--space-lg)',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'var(--font-family-primary)',
        position: 'relative',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: isMobile ? 'var(--text-2xl)' : 'var(--text-4xl)',
          marginBottom: isMobile ? 'var(--space-2xl)' : 'var(--space-3xl)',
          color: 'var(--text-primary)',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        💼 Professional Experience
      </h2>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 'var(--space-2xl)' : 'var(--space-3xl)',
        }}
      >
        {experiences.map((exp, index) => {
          const isVisible = visibleItems.includes(index);
          const isHovered = hoveredItem === index;
          
          return (
            <div
              key={index}
              style={{
                background: 'var(--bg-glass)',
                border: `1px solid ${isHovered ? 'var(--accent-primary)' : 'var(--border-glow)'}`,
                borderRadius: isMobile ? 'var(--radius-xl)' : 'var(--radius-2xl)',
                padding: isMobile ? 'var(--space-lg)' : 'var(--space-2xl)',
                backdropFilter: 'blur(10px)',
                boxShadow: isHovered ? 'var(--shadow-glow)' : 'var(--shadow-lg)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(50px)',
                animation: isVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                animationDelay: `${index * 0.3}s`,
                position: 'relative',
                overflow: 'hidden',
              }}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              {/* Gradient overlay on hover */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: isHovered 
                    ? 'linear-gradient(135deg, rgba(0, 245, 255, 0.05), rgba(139, 92, 246, 0.05))'
                    : 'transparent',
                  transition: 'all 0.3s ease',
                  pointerEvents: 'none',
                }}
              />

              {/* Company badge */}
              <div
                style={{
                  display: 'inline-block',
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))',
                  color: 'var(--text-primary)',
                  padding: 'var(--space-xs) var(--space-md)',
                  borderRadius: 'var(--radius-full)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  marginBottom: 'var(--space-lg)',
                  boxShadow: 'var(--shadow-md)',
                }}
              >
                {exp.year}
              </div>

              {/* Job title */}
              <h3
                style={{
                  fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-2xl)',
                  color: 'var(--text-primary)',
                  fontWeight: '700',
                  marginBottom: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
                  lineHeight: '1.3',
                  background: isHovered 
                    ? 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))'
                    : 'none',
                  WebkitBackgroundClip: isHovered ? 'text' : 'initial',
                  WebkitTextFillColor: isHovered ? 'transparent' : 'initial',
                  backgroundClip: isHovered ? 'text' : 'initial',
                  transition: 'all 0.3s ease',
                }}
              >
                {exp.title}
              </h3>

              {/* Job description */}
              <div
                style={{
                  fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)',
                  color: 'var(--text-secondary)',
                  lineHeight: isMobile ? '1.6' : '1.7',
                  whiteSpace: 'pre-line',
                  transition: 'color 0.3s ease',
                }}
              >
                {exp.detail}
              </div>

              {/* Tech stack tags */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 'var(--space-sm)',
                  marginTop: 'var(--space-lg)',
                }}
              >
                {(exp.techTags ?? (index === 1
                  ? ['Python', 'LLMs', 'Jupyter', 'Dialogflow CX', 'Google Apps Script', 'Enterprise AI']
                  : ['ReactJS', 'Python', 'Flutter', 'Dart', 'Docker', 'GCP', 'NLP', 'ML Microservices']
                )).map((tech, techIdx) => (
                  <span
                    key={techIdx}
                    style={{
                      fontSize: 'var(--text-sm)',
                      color: 'var(--accent-primary)',
                      background: 'rgba(0, 245, 255, 0.15)',
                      border: '1px solid rgba(0, 245, 255, 0.4)',
                      padding: 'var(--space-xs) var(--space-sm)',
                      borderRadius: 'var(--radius-md)',
                      fontWeight: '500',
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background = 'rgba(0, 245, 255, 0.25)';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 4px 8px rgba(0, 245, 255, 0.3)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background = 'rgba(0, 245, 255, 0.15)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = 'none';
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default TradExp;
