import React from 'react';

const experiences = [
  {
    title: 'Associate Conversation Design Intern | Cresta AI (Series D)',
    detail: `- Built an LLM-powered redaction auditor that cut manual QA time by 60% across thousands of weekly transcripts.
- Automated annotation workflows with Google Apps Script, saving the team 10+ hours/week.
- Tuned Cresta's Opera and Director platforms for 10+ client deployments, improving bot accuracy by 30%.`,
    year: 'August 2025',
  },
  {
    title: 'Fullstack Developer | ZafariCC (Interior Design)',
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

const TradExp = () => {
  return (
    <section
      id="experience"
      style={{
        padding: '2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        position: 'relative',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '1rem',
          color: '#0f172a',
        }}
      >
        💼 My Experience
      </h2>

      {/* Vertical line */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '4px',
          height: '100%',
          backgroundColor: '#2563EB',
          zIndex: 0,
        }}
      />

      {experiences.map((exp, index) => {
        // Alternate sides
        const isLeft = index % 2 === 0;
        return (
          <div
            key={index}
            style={{
              position: 'relative',
              width: '45%',
              marginBottom: '40px',
              padding: '20px',
              left: isLeft ? 0 : '55%',
              textAlign: isLeft ? 'right' : 'left',
              zIndex: 1,
            }}
          >
            {/* Dot */}
            <div
              style={{
                position: 'absolute',
                top: '20px',
                width: '14px',
                height: '14px',
                borderRadius: '50%',
                backgroundColor: '#FF4500',
                boxShadow: '0 0 8px #FF4500',
                [isLeft ? 'right' : 'left']: '-30px',
              }}
            />
            <h3
              style={{
                margin: 0,
                fontSize: '1.2rem',
                color: '#111827',
              }}
            >
              {exp.title}
            </h3>
            <p
              style={{
                margin: '8px 0',
                fontSize: '0.95rem',
                color: '#374151',
                lineHeight: '1.6em',
                whiteSpace: 'pre-line',
              }}
            >
              {exp.detail}
            </p>
            <span
              style={{
                fontSize: '0.8rem',
                color: '#6b7280',
              }}
            >
              {exp.year}
            </span>
          </div>
        );
      })}
    </section>
  );
};

export default TradExp;
