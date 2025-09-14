import React, { useState, useEffect, useRef } from 'react';

const certificationsData = [
  {
    id: 1,
    image: "/images/certifications/Quantum.png",
    courseName: 'Introduction to Quantum Computing',
    certificateLink: 'https://www.udemy.com/certificate/UC-eb95898f-1e56-403c-8dab-466467fc17c5/',
    completionDate: '06-06-2024',
    issuingOrganization: 'Udemy'
  },
  {
    id: 2,
    image: "/images/certifications/AdvancedCSS.png",
    courseName: 'Advanced CSS',
    certificateLink: 'https://www.udemy.com/certificate/UC-46fc113c-2139-4ce9-939e-0a9a2febb0fd/',
    completionDate: '04-07-2024',
    issuingOrganization: 'Udemy'
  },
  {
    id: 3,
    image: "/images/certifications/MachineLearning.png",
    courseName: 'Machine Learning A-Z',
    certificateLink: 'https://www.udemy.com/certificate/UC-a2ab1162-0958-487f-af70-a1f989323ac0/',
    completionDate: '19-07-2024',
    issuingOrganization: 'Udemy'
  },
  {
    id: 4,
    image: "/images/certifications/ArtificialIntellingenceA-Z.png",
    courseName: 'Artificial Intelligence A-Z',
    certificateLink: 'https://www.udemy.com/certificate/UC-2065078c-6c73-4224-90ce-5b7e51498e2e/',
    completionDate: '01-08-2024',
    issuingOrganization: 'Udemy'
  },
  {
    id: 5,
    image: "/images/certifications/UltimateReact.png",
    courseName: 'Ultimate React Course',
    certificateLink: 'https://www.udemy.com/certificate/UC-a72a253c-0919-4089-9a95-4a11dc2bbb36/',
    completionDate: '17-08-2024',
    issuingOrganization: 'Udemy'
  },
];

const TradCert = () => {
  const [visibleCards, setVisibleCards] = useState([]);
  const [hoveredCard, setHoveredCard] = useState(null);
  const [flippedCards, setFlippedCards] = useState(new Set());
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate cards one by one
            certificationsData.forEach((_, index) => {
              setTimeout(() => {
                setVisibleCards(prev => [...prev, index]);
              }, index * 150);
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

  const handleCardClick = (cardId) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(cardId)) {
        newSet.delete(cardId);
      } else {
        newSet.add(cardId);
      }
      return newSet;
    });
  };

  return (
    <section
      ref={sectionRef}
      id="certifications"
      style={{
        padding: 'var(--space-2xl) var(--space-lg)',
        maxWidth: '1200px',
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
        🏆 Certifications & Achievements
      </h2>

      {/* Certifications Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: 'var(--space-lg)',
        }}
      >
        {certificationsData.map((cert, index) => {
          const isVisible = visibleCards.includes(index);
          const isHovered = hoveredCard === cert.id;
          const isFlipped = flippedCards.has(cert.id);
          
          return (
            <div
              key={cert.id}
              style={{
                background: 'var(--bg-glass)',
                border: `1px solid ${isHovered ? 'var(--accent-primary)' : 'var(--border-glow)'}`,
                borderRadius: 'var(--radius-lg)',
                overflow: 'hidden',
                boxShadow: isHovered ? 'var(--shadow-glow)' : 'var(--shadow-md)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                backdropFilter: 'blur(10px)',
                cursor: 'pointer',
                opacity: isVisible ? 1 : 0,
                transform: isVisible 
                  ? (isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)')
                  : 'translateY(50px)',
                animation: isVisible ? 'fadeInUp 0.6s ease-out forwards' : 'none',
                animationDelay: `${index * 0.15}s`,
                perspective: '1000px',
              }}
              onMouseEnter={() => setHoveredCard(cert.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => handleCardClick(cert.id)}
            >
            <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
              <img
                src={cert.image}
                alt={cert.courseName}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.1)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'scale(1)';
                }}
              />
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(45deg, transparent, rgba(0, 245, 255, 0.1), transparent)',
                opacity: isHovered ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }} />
            </div>
            <div style={{ padding: 'var(--space-lg)' }}>
              <h3
                style={{
                  fontSize: 'var(--text-lg)',
                  marginBottom: 'var(--space-sm)',
                  color: 'var(--text-primary)',
                  fontWeight: '600',
                  background: isHovered 
                    ? 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))'
                    : 'none',
                  WebkitBackgroundClip: isHovered ? 'text' : 'initial',
                  WebkitTextFillColor: isHovered ? 'transparent' : 'initial',
                  backgroundClip: isHovered ? 'text' : 'initial',
                  transition: 'all 0.3s ease',
                }}
              >
                {cert.courseName}
              </h3>
              <div style={{ marginBottom: 'var(--space-sm)' }}>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    marginBottom: 'var(--space-xs)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-xs)',
                  }}
                >
                  📅 {cert.completionDate}
                </p>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-xs)',
                  }}
                >
                  🏛 {cert.issuingOrganization}
                </p>
              </div>
              <a
                href={cert.certificateLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  fontSize: 'var(--text-sm)',
                  color: 'var(--accent-primary)',
                  textDecoration: 'none',
                  fontWeight: '500',
                  padding: 'var(--space-xs) var(--space-sm)',
                  background: isHovered ? 'var(--bg-card)' : 'var(--bg-secondary)',
                  borderRadius: 'var(--radius-sm)',
                  border: `1px solid ${isHovered ? 'var(--accent-primary)' : 'var(--border-glow)'}`,
                  boxShadow: isHovered ? 'var(--shadow-glow)' : 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--accent-primary)';
                  e.target.style.color = 'var(--text-primary)';
                  e.target.style.borderColor = 'var(--accent-primary)';
                  e.target.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = isHovered ? 'var(--bg-card)' : 'var(--bg-secondary)';
                  e.target.style.color = 'var(--accent-primary)';
                  e.target.style.borderColor = isHovered ? 'var(--accent-primary)' : 'var(--border-glow)';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                View Certificate →
              </a>
            </div>
          </div>
          );
        })}
      </div>
    </section>
  );
};

export default TradCert;
