import React from 'react';

function Experience({ onClose }) {
const experiences = [
  {
    title: 'Software Engineer Intern | Carta Maple Kitchener, ON',
    detail: `- Designed backend services in Python/Django for high-volume financial compensation pipelines, processing over 1M records per month with strict correctness and auditability guarantees.
- Integrated gRPC APIs across distributed services, reducing end-to-end request latency by 30%.
- Optimized PostgreSQL schemas and queries, balancing throughput, consistency, and maintainability; contributed production code under CI pipelines with unit/integration tests and MyPy static typing.
- Leveraged a toolkit including Docker, Jenkins, Kubernetes, Datadog, Sentry, and Jira to ensure reliability, observability, and high system performance.`,
    year: 'Jan 2026 – Apr 2026',
  },
  {
    title: 'Associate Conversation Design Intern | Cresta AI (Series D)',
    detail: `- Built an LLM-powered redaction auditor that cut manual QA time by 60% across thousands of weekly transcripts.
- Automated annotation workflows with Google Apps Script, saving the team 10+ hours/week.
- Tuned Cresta's Opera and Director platforms for 10+ client deployments, improving bot accuracy by 30%.`,
    year: 'August 2025',
  },
  {
    title: 'Fullstack Developer| ZafariCC (Interior Design)',
    detail: `- Developed a modern, SEO-optimized website for an interior design company.
- Built with Next.js for server-side rendering and performance.
- Improved client search ranking and user experience.`,
    year: 'May 2025',
  },
  {
    title: 'Fullstack Developer | MettaStars (NGO)',
    detail: `- Built a fullstack website for an education-focused NGO.
- Implemented advanced CSS concepts for responsive, accessible design.
- Connected frontend to a secure backend for real-time user data.`,
    year: 'May 2025',
  },
  {
    title: 'Software Engineer | G12Uni (Co-Founder)',
    detail: `- Co-founded a global student network with 1,500+ users.
- Partnered with Google for Education Startups through eCoop & Conrad.
- Redesigned the platform with ReactJS & Vite, built APIs for Meet, maps, avatars, and chat systems.`,
    year: 'August 2024',
  },
  {
    title: 'Student | Conrad Grebel School of Entrepreneurship',
    detail: `- Completed entrepreneurship and venture design courses under eCoop with G12.
- Partnered with Google for Education Startups for mentorship.
- Built pitch decks, MVPs, and validated early-stage ideas.`,
    year: 'August 2024',
  },
  {
    title: 'Freelance Developer | Vasanta Bhavan Oman',
    detail: `- Developed an admin panel using ReactJS and Firebase backend.
- Built order tracking, staff management, and analytics dashboards.
- Deployed the system for a restaurant franchise across Oman.`,
    year: 'March 2024',
  },
  {
    title: 'Member | Velocity Incubator, University of Waterloo',
    detail: `- Participated in pitch competitions and startup mentorship.
- Developed prototypes with support from Velocity advisors.
- Networked with founders and industry partners.`,
    year: 'September 2023',
  },
];


  return (
    <div style={containerStyle}>
      <h2 style={titleStyle}>💼 Ninja Timeline: Experience</h2>

      <div style={timelineStyle}>
        {/* Vertical line */}
        <div style={lineStyle} />

        {experiences.map((exp, index) => (
          <div key={index} style={itemStyle}>
            <div style={dotStyle} />
            <h3 style={companyStyle}>{exp.title}</h3>
            <p style={descStyle}>{exp.detail}</p>
            <span style={yearStyle}>{exp.year}</span>
          </div>
        ))}
      </div>

      <button onClick={onClose} style={buttonStyle}>Close Scroll</button>
    </div>
  );
}

const containerStyle = {
  position: 'absolute',
  top: '15%',
  left: '50%',
  transform: 'translateX(-50%)',
  width: '90%',
  maxWidth: '900px',
  maxHeight: '70%',
  backgroundImage: 'url("/images/scroll-texture.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  padding: '40px',
  borderRadius: '20px',
  color: '#fffbe6',
  zIndex: 1000,
  fontFamily: '"Noto Serif JP", "Papyrus", serif',
  border: '8px double #FFD700',
  boxShadow: '0 0 40px rgba(0,0,0,0.7)',
  backdropFilter: 'blur(6px)',
  overflowY: 'auto'
};

const titleStyle = {
  fontSize: '32px',
  textAlign: 'center',
  color: '#FFD700',
  textShadow: '2px 2px 4px #000',
  marginBottom: '24px',
  fontWeight: '700'
};

const timelineStyle = {
  position: 'relative',
  marginTop: 'var(--space-xl)',
  paddingLeft: 'var(--space-xl)'
};

const lineStyle = {
  position: 'absolute',
  top: 0,
  left: 'var(--space-lg)',
  width: '3px',
  height: '100%',
  background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary))',
  borderRadius: 'var(--radius-full)'
};

const itemStyle = {
  marginBottom: 'var(--space-2xl)',
  marginLeft: 'var(--space-xl)',
  position: 'relative',
  paddingBottom: 'var(--space-sm)',
  background: 'rgba(0,0,0,0.35)',
  padding: 'var(--space-lg)',
  borderRadius: '14px',
  border: '1px solid #FFD700',
  boxShadow: '0 0 12px rgba(0,0,0,0.6)',
  transition: 'all 0.3s ease'
};

const dotStyle = {
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  background: '#FF4500',
  position: 'absolute',
  left: '-var(--space-2xl)',
  top: 'var(--space-lg)',
  boxShadow: '0 0 12px #FF4500',
  zIndex: 2
};

const companyStyle = {
  margin: 0,
  fontSize: 'var(--text-lg)',
  color: '#fffbe6',
  fontWeight: '700',
  marginBottom: 'var(--space-sm)',
  textShadow: '1px 1px 2px #000'
};

const descStyle = {
  margin: 'var(--space-sm) 0',
  fontSize: 'var(--text-sm)',
  color: '#fffbe6',
  lineHeight: '1.6em',
  whiteSpace: 'pre-line',
  textShadow: '1px 1px 2px #000'
};

const yearStyle = {
  fontSize: 'var(--text-xs)',
  color: '#FFD700',
  fontWeight: '700',
  background: 'rgba(0,0,0,0.35)',
  padding: 'var(--space-xs) var(--space-sm)',
  borderRadius: 'var(--radius-full)',
  border: '1px solid #FFD700',
  display: 'inline-block'
};

const buttonStyle = {
  marginTop: '30px',
  padding: '12px 24px',
  background: '#FF4500',
  border: 'none',
  borderRadius: '10px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '16px',
  cursor: 'pointer',
  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  transition: 'all 0.2s ease'
};

export default Experience;
