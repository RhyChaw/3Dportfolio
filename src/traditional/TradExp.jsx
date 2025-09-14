import React, { useState, useEffect, useRef } from 'react';

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
  const [visibleItems, setVisibleItems] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
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
              }, index * 200);
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

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        padding: 'var(--space-2xl) var(--space-lg)',
        maxWidth: '1000px',
        margin: '0 auto',
        fontFamily: 'var(--font-family-primary)',
        position: 'relative',
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
        💼 Professional Experience
      </h2>

      {/* Animated Vertical line */}
      <div
        style={{
          position: 'absolute',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '3px',
          height: 'calc(100% - 80px)',
          background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-purple), var(--accent-secondary))',
          zIndex: 0,
          borderRadius: 'var(--radius-full)',
          boxShadow: 'var(--shadow-glow)',
          animation: 'pulse 2s ease-in-out infinite',
        }}
      />

      {experiences.map((exp, index) => {
        // Alternate sides
        const isLeft = index % 2 === 0;
        const isVisible = visibleItems.includes(index);
        const isHovered = hoveredItem === index;
        
        return (
          <div
            key={index}
            style={{
              position: 'relative',
              width: '45%',
              marginBottom: 'var(--space-2xl)',
              padding: 'var(--space-lg)',
              left: isLeft ? 0 : '55%',
              textAlign: isLeft ? 'right' : 'left',
              zIndex: 1,
              background: isHovered ? 'var(--bg-card)' : 'var(--bg-glass)',
              border: `1px solid ${isHovered ? 'var(--accent-primary)' : 'var(--border-glow)'}`,
              borderRadius: 'var(--radius-lg)',
              boxShadow: isHovered ? 'var(--shadow-glow)' : 'var(--shadow-md)',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              backdropFilter: 'blur(10px)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible 
                ? (isLeft ? 'translateX(0)' : 'translateX(0)') 
                : (isLeft ? 'translateX(-50px)' : 'translateX(50px)'),
              animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none',
              animationDelay: `${index * 0.2}s`,
            }}
            onMouseEnter={() => setHoveredItem(index)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            {/* Animated Dot */}
            <div
              style={{
                position: 'absolute',
                top: 'var(--space-lg)',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                background: isHovered 
                  ? 'linear-gradient(135deg, var(--accent-primary), var(--accent-purple))'
                  : 'linear-gradient(135deg, var(--accent-secondary), #ff8c42)',
                boxShadow: isHovered 
                  ? 'var(--shadow-glow)' 
                  : '0 0 12px var(--accent-secondary)',
                [isLeft ? 'right' : 'left']: '-32px',
                zIndex: 2,
                transition: 'all 0.3s ease',
                animation: isVisible ? 'pulse 2s ease-in-out infinite' : 'none',
                animationDelay: `${index * 0.2}s`,
              }}
            />
            <h3
              style={{
                margin: 0,
                fontSize: 'var(--text-lg)',
                color: 'var(--text-primary)',
                fontWeight: '600',
                marginBottom: 'var(--space-sm)',
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
            <p
              style={{
                margin: 'var(--space-sm) 0',
                fontSize: 'var(--text-sm)',
                color: 'var(--text-secondary)',
                lineHeight: '1.6em',
                whiteSpace: 'pre-line',
                transition: 'color 0.3s ease',
              }}
            >
              {exp.detail}
            </p>
            <span
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--accent-primary)',
                fontWeight: '500',
                background: isHovered ? 'var(--bg-card)' : 'var(--bg-secondary)',
                padding: 'var(--space-xs) var(--space-sm)',
                borderRadius: 'var(--radius-full)',
                border: `1px solid ${isHovered ? 'var(--accent-primary)' : 'var(--border-glow)'}`,
                boxShadow: isHovered ? 'var(--shadow-glow)' : 'none',
                textShadow: isHovered ? '0 0 10px var(--accent-primary)' : 'none',
                transition: 'all 0.3s ease',
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
