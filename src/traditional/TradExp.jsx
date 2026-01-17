import React, { useState, useEffect, useRef } from 'react';

// Import company logos
import cartaLogo from '../compLogos/carta.png';
import crestaLogo from '../compLogos/cresta.jpg';
import conradLogo from '../compLogos/conrad.png';
import bhashaLogo from '../compLogos/bhasha.jpeg';
import g12Logo from '../compLogos/g12.jpeg';
import vbLogo from '../compLogos/vb.jpeg';
import zafariLogo from '../compLogos/zafari.jpeg';
import mettaStarsLogo from '../compLogos/mettastars.jpeg';

// Professional Experience
const professionalExperience = [
  {
    title: 'Software Engineer Intern (Ongoing) | Carta Maple Kitchener, ON',
    logo: cartaLogo,
    detail: `- Designed backend services in Python/Django for high-volume financial compensation pipelines, processing over 1M records per month with strict correctness and auditability guarantees
- Integrated gRPC APIs across distributed services, reducing end-to-end request latency by 30%
- Optimized PostgreSQL schemas and queries, balancing throughput, consistency, and maintainability; contributed production code under CI pipelines with unit/integration tests and MyPy static typing
- Leveraged a toolkit including Docker, Jenkins, Kubernetes, Datadog, Sentry, and Jira to ensure reliability, observability, and high system performance`,
    year: 'Jan 2026 – Apr 2026',
    techTags: ['Python', 'Django', 'gRPC', 'PostgreSQL', 'Docker', 'Jenkins', 'Kubernetes', 'Datadog', 'Sentry', 'Jira', 'MyPy', 'CI/CD'],
  },
  {
    title: 'Associate Conversation Design Intern | Cresta AI (Series D)',
    logo: crestaLogo,
    detail: `- Built an LLM-powered redaction auditor that accelerated QA by 98%, automatically flagging sensitive/policy-violating content across thousands of conversations
- Developed a demo automation suite that improved QA efficiency by 50% and streamlined enterprise ops
- Audited and optimized conversation workflows for 12 enterprise customers, collaborating cross-functionally with stakeholders`,
    year: 'August 2025',
    techTags: ['Python', 'LLMs', 'Jupyter', 'Dialogflow CX', 'Google Apps Script', 'Enterprise AI'],
  },
  {
    title: 'Software Engineer | E-Coop @ Conrad School of Business',
    logo: conradLogo,
    detail: `- Engineered full-stack platform rebuild with Vite ReactJS, Tailwind, and real-time APIs (Google Meet, maps, chat, avatars, bots)
- Deployed and optimized NLP models for Reddit/YouTube intelligence pipelines on Docker + GCP
- Collaborated with Conrad Grebel School of Entrepreneurship on venture design and early-stage product validation`,
    year: 'August 2024',
    techTags: ['ReactJS', 'Vite', 'Tailwind', 'Python', 'Docker', 'GCP', 'NLP', 'ML Microservices'],
  },
];

// Freelance Work (Latest first)
const freelanceWork = [
  {
    title: 'Zafari CC Design — Full Stack Developer',
    logo: zafariLogo,
    detail: `- Built a modern, SEO-optimized website for an interior design company
- Implemented server-side rendering with Next.js for optimal performance
- Improved client search ranking and user experience`,
    year: 'May 2025',
    techTags: ['Next.js', 'React', 'TypeScript', 'SEO', 'Server-Side Rendering'],
  },
  {
    title: 'Metta Stars Foundation — Full Stack Developer',
    logo: mettaStarsLogo,
    detail: `- Built a full-stack website for an NGO focused on mental health, finance, and spirituality
- Implemented responsive design and modern UI/UX patterns
- Integrated content management and user engagement features`,
    year: 'April 2025',
    techTags: ['Vite', 'React', 'JavaScript', 'Web Development'],
  },
  {
    title: 'Vasanta Bhavan Oman — Full Stack Developer',
    logo: vbLogo,
    detail: `- Developed an admin panel using ReactJS and Firebase backend
- Built order tracking, staff management, and analytics dashboards
- Deployed the system for a restaurant franchise across Oman`,
    year: 'September 2023',
    techTags: ['ReactJS', 'Firebase', 'Admin Panel', 'Restaurant Management'],
  },
];

// Founder Journey (Latest first)
const founderJourney = [
  {
    title: 'Strata — Co-Founder',
    logo: null, // Add Strata logo when available
    detail: `- Building AI-powered solutions for [add specific details about Strata]
- Leading product development and technical strategy
- Scaling from concept to production`,
    year: '2025',
    techTags: ['AI/ML', 'Product Development', 'Startup'],
  },
  {
    title: 'Bhasha — Co-Founder',
    logo: bhashaLogo,
    detail: `- Developed a learning platform for Indian languages with mobile and web apps
- Built using Flutter, Dart, and Supabase for seamless cross-platform experience
- Integrated backend services for user progress tracking and content delivery`,
    year: 'May 2025',
    techTags: ['Flutter', 'Dart', 'Supabase', 'Next.js', 'React', 'TypeScript', 'Mobile Development'],
  },
  {
    title: 'G12Uni — Co-Founder & Software Engineer',
    logo: g12Logo,
    detail: `- Launched and scaled a global platform connecting 1,500+ university students across 10+ countries
- Engineered full-stack rebuild with Vite ReactJS, Tailwind, and real-time APIs (Google Meet, maps, chat, avatars, bots)
- Deployed and optimized NLP models on Docker + GCP, building scalable ML microservices
- Partnered with Google for Education Startups through eCoop & Conrad Grebel School of Entrepreneurship`,
    year: 'August 2024',
    techTags: ['ReactJS', 'Vite', 'Tailwind', 'Python', 'Flutter', 'Dart', 'Docker', 'GCP', 'NLP', 'Firebase'],
  },
];

// Open Source (Latest first)
const openSource = [
  {
    title: 'Gradio — Contributor | Hugging Face',
    logo: null,
    detail: `- Contributed to Gradio, the open-source Python library for building ML web interfaces
- Enhanced UI components and improved accessibility features for ML demos
- Collaborated with Hugging Face team on documentation and community support
- Helped democratize ML by making it easier to share models and create interactive demos`,
    year: '2025',
    techTags: ['Python', 'Machine Learning', 'UI/UX', 'Open Source', 'Hugging Face'],
  },
  {
    title: 'Three.js — Contributor',
    logo: null,
    detail: `- Contributed to Three.js, the popular JavaScript 3D graphics library
- Improved documentation and created examples for 3D rendering techniques
- Fixed bugs in shader implementations and optimized performance
- Enhanced WebGL compatibility and added new helper utilities`,
    year: '2024',
    techTags: ['JavaScript', 'WebGL', '3D Graphics', 'Three.js', 'Open Source'],
  },
  {
    title: 'Pipette Pro — Core Contributor',
    logo: null,
    detail: `- Major contributor to Pipette Pro, an open-source laboratory management system
- Developed core features for experiment tracking and data visualization
- Built RESTful APIs for lab equipment integration
- Implemented real-time collaboration features for research teams`,
    year: '2024',
    techTags: ['Python', 'React', 'Laboratory Management', 'Data Visualization', 'Open Source'],
  },
  {
    title: 'UW Flow — Contributor',
    logo: null,
    detail: `- Contributed to UW Flow, the course planning platform for University of Waterloo students
- Improved course search and filtering algorithms for better user experience
- Enhanced mobile responsiveness and UI components
- Fixed bugs and optimized database queries for faster page loads`,
    year: '2024',
    techTags: ['React', 'Node.js', 'PostgreSQL', 'Full Stack', 'Open Source', 'Education'],
  },
];

const TradExp = () => {
  const [activeTab, setActiveTab] = useState('professional');
  const [visibleItems, setVisibleItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  // Get current experiences based on active tab
  const getCurrentExperiences = () => {
    switch (activeTab) {
      case 'professional':
        return professionalExperience;
      case 'founder':
        return founderJourney;
      case 'freelance':
        return freelanceWork;
      case 'opensource':
        return openSource;
      default:
        return professionalExperience;
    }
  };

  // Reset and animate items when tab changes
  useEffect(() => {
    setVisibleItems([]);
    const currentExperiences = getCurrentExperiences();
    
    // Animate items one by one
    currentExperiences.forEach((_, index) => {
      setTimeout(() => {
        setVisibleItems(prev => [...prev, index]);
      }, index * 200);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

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
        💼 Experience
      </h2>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: isMobile ? 'var(--space-sm)' : 'var(--space-md)',
          marginBottom: isMobile ? 'var(--space-2xl)' : 'var(--space-3xl)',
          flexWrap: 'wrap',
        }}
      >
        {[
          { id: 'professional', label: 'Professional Experience' },
          { id: 'founder', label: 'Founder Journey' },
          { id: 'freelance', label: 'Freelance' },
          { id: 'opensource', label: 'Open Source' },
        ].map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                padding: isMobile ? 'var(--space-sm) var(--space-md)' : 'var(--space-md) var(--space-lg)',
                fontSize: isMobile ? 'var(--text-sm)' : 'var(--text-base)',
                fontWeight: '600',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive
                  ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))'
                  : 'var(--bg-glass)',
                border: `2px solid ${isActive ? 'var(--accent-primary)' : 'var(--border-glow)'}`,
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: isActive ? 'var(--shadow-glow)' : 'var(--shadow-md)',
                backdropFilter: 'blur(10px)',
                transform: isActive ? 'translateY(-2px)' : 'translateY(0)',
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.target.style.background = 'rgba(0, 245, 255, 0.1)';
                  e.target.style.borderColor = 'var(--accent-primary)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.target.style.background = 'var(--bg-glass)';
                  e.target.style.borderColor = 'var(--border-glow)';
                }
              }}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div ref={contentRef}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: isMobile ? 'var(--space-2xl)' : 'var(--space-3xl)',
          }}
        >
          {getCurrentExperiences().map((exp, index) => {
            const isVisible = visibleItems.includes(index);
            const isHovered = hoveredItem === `${activeTab}-${index}`;
          
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
              onMouseEnter={() => setHoveredItem(`${activeTab}-${index}`)}
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

              {/* Job title with logo */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-md)',
                  marginBottom: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
                }}
              >
                {exp.logo && (
                  <img
                    src={exp.logo}
                    alt={`${exp.title} logo`}
                    style={{
                      width: isMobile ? '40px' : '50px',
                      height: isMobile ? '40px' : '50px',
                      objectFit: 'contain',
                      borderRadius: '8px',
                      background: 'white',
                      padding: '4px',
                      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
                    }}
                  />
                )}
                <h3
                  style={{
                    fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-2xl)',
                    color: 'var(--text-primary)',
                    fontWeight: '700',
                    margin: 0,
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
              </div>

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
                {(exp.techTags || []).map((tech, techIdx) => (
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
      </div>
    </section>
  );
};

export default TradExp;
