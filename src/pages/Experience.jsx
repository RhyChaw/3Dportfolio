import React from 'react';

function Experience({ onClose }) {
const experiences = [
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
  maxWidth: '800px',
  maxHeight: '70%',
  background: 'var(--bg-card)',
  padding: 'var(--space-2xl)',
  borderRadius: 'var(--radius-xl)',
  color: 'var(--text-primary)',
  zIndex: 1000,
  fontFamily: 'var(--font-family-primary)',
  border: '1px solid var(--border-primary)',
  boxShadow: 'var(--shadow-xl)',
  backdropFilter: 'blur(8px)',
  overflowY: 'auto'
};

const titleStyle = {
  fontSize: 'var(--text-2xl)',
  textAlign: 'center',
  color: 'var(--accent-primary)',
  textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  marginBottom: 'var(--space-xl)',
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
  background: 'var(--bg-secondary)',
  padding: 'var(--space-lg)',
  borderRadius: 'var(--radius-lg)',
  border: '1px solid var(--border-primary)',
  boxShadow: 'var(--shadow-sm)',
  transition: 'all var(--transition-normal)'
};

const dotStyle = {
  width: '16px',
  height: '16px',
  borderRadius: '50%',
  background: 'linear-gradient(135deg, var(--accent-secondary), #ff8c42)',
  position: 'absolute',
  left: '-var(--space-2xl)',
  top: 'var(--space-lg)',
  boxShadow: '0 0 12px var(--accent-secondary)',
  zIndex: 2
};

const companyStyle = {
  margin: 0,
  fontSize: 'var(--text-lg)',
  color: 'var(--text-primary)',
  fontWeight: '600',
  marginBottom: 'var(--space-sm)'
};

const descStyle = {
  margin: 'var(--space-sm) 0',
  fontSize: 'var(--text-sm)',
  color: 'var(--text-secondary)',
  lineHeight: '1.6em',
  whiteSpace: 'pre-line'
};

const yearStyle = {
  fontSize: 'var(--text-xs)',
  color: 'var(--accent-primary)',
  fontWeight: '500',
  background: 'var(--bg-card)',
  padding: 'var(--space-xs) var(--space-sm)',
  borderRadius: 'var(--radius-full)',
  border: '1px solid var(--border-primary)',
  display: 'inline-block'
};

const buttonStyle = {
  marginTop: 'var(--space-xl)',
  padding: 'var(--space-sm) var(--space-lg)',
  background: 'linear-gradient(135deg, var(--accent-secondary), #ff8c42)',
  border: 'none',
  borderRadius: 'var(--radius-md)',
  color: 'var(--text-primary)',
  fontWeight: '600',
  fontSize: 'var(--text-sm)',
  cursor: 'pointer',
  boxShadow: 'var(--shadow-md)',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto',
  transition: 'all var(--transition-fast)'
};

export default Experience;
