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
  maxWidth: '700px',
  maxHeight: '70%',
  backgroundImage: 'url("/images/scroll-texture.jpg")',
  backgroundSize: 'cover',
  backgroundRepeat: 'no-repeat',
  padding: '36px 40px',
  borderRadius: '20px',
  color: '#1a1a1a',  // Base darker text fallback
  zIndex: 1000,
  fontFamily: '"Noto Serif JP", Papyrus, serif',
  border: '8px double #00CED1',
  boxShadow: '0 0 40px rgba(0,0,0,0.7)',
  backdropFilter: 'blur(6px)',
  overflowY: 'auto'
};

const titleStyle = {
  fontSize: '26px',
  textAlign: 'center',
  color: '#00CED1',
  textShadow: '1px 1px 2px #000',
  marginBottom: '20px'
};

const timelineStyle = {
  position: 'relative',
  marginTop: '20px',
  paddingLeft: '30px'
};

const lineStyle = {
  position: 'absolute',
  top: 0,
  left: '14px',
  width: '3px',
  height: '100%',
  backgroundColor: '#00CED1'
};

const itemStyle = {
  marginBottom: '40px',
  marginLeft: '30px',
  position: 'relative',
  paddingBottom: '10px'
};

const dotStyle = {
  width: '14px',
  height: '14px',
  borderRadius: '50%',
  backgroundColor: '#FF4500',
  position: 'absolute',
  left: '-30px',
  top: '5px',
  boxShadow: '0 0 10px #FF4500'
};

const companyStyle = {
  margin: 0,
  fontSize: '18px',
  color: '#111' // Darker heading
};

const descStyle = {
  margin: '10px 0',
  fontSize: '14px',
  color: '#222',  // Main body darker
  lineHeight: '1.6em',
  whiteSpace: 'pre-line'
};

const yearStyle = {
  fontSize: '12px',
  color: '#333' // Subtle year text
};

const buttonStyle = {
  marginTop: '20px',
  padding: '10px 18px',
  background: '#FF4500',
  border: 'none',
  borderRadius: '10px',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '15px',
  cursor: 'pointer',
  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
  display: 'block',
  marginLeft: 'auto',
  marginRight: 'auto'
};

export default Experience;
