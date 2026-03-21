import React, { useEffect, useState } from 'react';

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
export const professionalExperience = [
  {
    title: 'Software Engineer Intern | Carta',
    logo: cartaLogo,
    detail: `- Built devtools-mcp, a Chrome extension + Node.js MCP server exposing 16 tools that stream live browser DevTools data (network, console, cookies, storage) directly into Claude Code, eliminating context-switching for engineers during debugging.
- Architected Project Atlas, a persistent context memory system for Claude, designing a .context/ repo structure and custom MCP server integrating Jira, Slack, and Confluence, reducing token consumption by ~86k tokens per investigation session across agent workflows.
- Reduced CI pipeline runtime by 42% (12 -> 7 min) on Jenkins; maintained 100+ contributions in first 90 days spanning Django, Python, Datadog, Sentry, CircleCI, and ArgoCD.
- Led 3 projects end-to-end from scoping to release as primary point of contact, including ERD design, feature flag orchestration, and production job execution on live data.`,
    year: 'Jan 2026 – Present',
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
export const freelanceWork = [
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
export const founderJourney = [
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
export const openSource = [
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
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [activeCategory, setActiveCategory] = useState('professional');

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const categories = [
    { id: 'professional', label: 'Engineering', items: professionalExperience },
    { id: 'founder', label: 'Founder Journey', items: founderJourney },
    { id: 'freelance', label: 'Freelance Work', items: freelanceWork },
    { id: 'opensource', label: 'Open Source / Research', items: openSource },
  ];

  return (
    <div
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
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Experience
      </h2>

      {isMobile ? (
        <div
          style={{
            marginBottom: 'var(--space-2xl)',
            paddingBottom: 'var(--space-sm)',
            borderBottom: '1px solid var(--border-glow)',
          }}
        >
          <label
            htmlFor="experience-category-select"
            style={{
              display: 'block',
              fontSize: 'var(--text-sm)',
              fontWeight: 700,
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-sm)',
              fontFamily: 'var(--font-family-primary)',
            }}
          >
            Category
          </label>
          <select
            id="experience-category-select"
            value={activeCategory}
            onChange={(e) => setActiveCategory(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '100%',
              boxSizing: 'border-box',
              padding: 'var(--space-md) var(--space-lg)',
              paddingRight: 'var(--space-2xl)',
              fontFamily: 'var(--font-family-primary)',
              fontSize: 'var(--text-base)',
              fontWeight: 700,
              color: 'var(--text-primary)',
              backgroundColor: 'rgba(255, 255, 255, 0.65)',
              border: '1px solid var(--border-glow)',
              borderRadius: '8px',
              cursor: 'pointer',
              appearance: 'none',
              WebkitAppearance: 'none',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath fill='%237a4b22' d='M1 1l5 5 5-5'/%3E%3C/svg%3E")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right var(--space-md) center',
              boxShadow: 'var(--shadow-sm)',
            }}
          >
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-md)',
            marginBottom: 'var(--space-2xl)',
            paddingBottom: 'var(--space-sm)',
            borderBottom: '1px solid var(--border-glow)',
          }}
        >
          {categories.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  borderBottom: `2px solid ${active ? 'var(--accent-primary)' : 'rgba(var(--accent-primary-rgb), 0.25)'}`,
                  padding: 0,
                  cursor: 'pointer',
                  color: active ? 'var(--accent-primary)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-family-primary)',
                  fontSize: 'var(--text-lg)',
                  fontWeight: active ? 900 : 700,
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      )}

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: isMobile ? 'var(--space-3xl)' : 'var(--space-4xl)',
        }}
      >
        {categories
          .filter((cat) => cat.id === activeCategory)
          .map((cat) => (
            <div
              key={cat.id}
              id={`experience-${cat.id}`}
              style={{
                scrollMarginTop: 24,
                paddingBottom: isMobile ? 'var(--space-3xl)' : 'var(--space-4xl)',
              }}
            >
              <h3
                style={{
                  fontSize: isMobile ? 'var(--text-xl)' : 'var(--text-3xl)',
                  color: 'var(--text-primary)',
                  fontWeight: 700,
                  margin: `0 0 ${isMobile ? 'var(--space-lg)' : 'var(--space-xl)'}`,
                }}
              >
                {cat.label}
              </h3>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: isMobile ? 'var(--space-2xl)' : 'var(--space-3xl)',
              }}
            >
              {cat.items.map((exp, index) => {
                return (
                  <div
                    key={`${cat.id}-${index}`}
                    id={`experience-${cat.id}-${index}`}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      borderRadius: 0,
                      borderBottom: '1px solid var(--border-glow)',
                      padding: isMobile ? 'var(--space-lg) 0' : 'var(--space-xl) 0',
                      backdropFilter: 'none',
                      boxShadow: 'none',
                      transition: 'none',
                      position: 'relative',
                      overflow: 'visible',
                    }}
                  >
                    {/* Year */}
                    <div
                      style={{
                        display: 'inline-block',
                        background: 'transparent',
                        color: 'var(--accent-primary)',
                        padding: 0,
                        borderRadius: 0,
                        fontSize: 'var(--text-sm)',
                        fontWeight: 700,
                        marginBottom: isMobile ? 'var(--space-sm)' : 'var(--space-md)',
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
                        position: 'relative',
                        zIndex: 1,
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
                            borderRadius: 8,
                            background: 'white',
                            padding: 4,
                            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.10)',
                          }}
                        />
                      )}
                      <h3
                        style={{
                          fontSize: isMobile ? 'var(--text-lg)' : 'var(--text-2xl)',
                          color: 'var(--text-primary)',
                          fontWeight: 700,
                          margin: 0,
                          lineHeight: 1.3,
                          transition: 'none',
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
                        lineHeight: isMobile ? 1.6 : 1.7,
                        whiteSpace: 'pre-line',
                        transition: 'color 0.2s ease',
                        position: 'relative',
                        zIndex: 1,
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
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      {(exp.techTags || []).map((tech, techIdx) => (
                        <span
                          key={techIdx}
                          style={{
                            fontSize: 'var(--text-sm)',
                            color: 'var(--accent-primary)',
                            background: 'transparent',
                            border: 'none',
                            padding: 0,
                            borderRadius: 0,
                            fontWeight: 500,
                            transition: 'none',
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
        ))}
      </div>
    </div>
  );
};

export default TradExp;
