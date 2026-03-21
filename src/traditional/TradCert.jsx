import React, { useEffect, useState } from 'react';

const certificationsData = [
  {
    id: 1,
    image: '/images/certifications/Quantum.png',
    courseName: 'Introduction to Quantum Computing',
    certificateLink: 'https://www.udemy.com/certificate/UC-eb95898f-1e56-403c-8dab-466467fc17c5/',
    completionDate: '06-06-2024',
    issuingOrganization: 'Udemy',
  },
  {
    id: 2,
    image: '/images/certifications/AdvancedCSS.png',
    courseName: 'Advanced CSS',
    certificateLink: 'https://www.udemy.com/certificate/UC-46fc113c-2139-4ce9-939e-0a9a2febb0fd/',
    completionDate: '04-07-2024',
    issuingOrganization: 'Udemy',
  },
  {
    id: 3,
    image: '/images/certifications/MachineLearning.png',
    courseName: 'Machine Learning A-Z',
    certificateLink: 'https://www.udemy.com/certificate/UC-a2ab1162-0958-487f-af70-a1f989323ac0/',
    completionDate: '19-07-2024',
    issuingOrganization: 'Udemy',
  },
  {
    id: 4,
    image: '/images/certifications/ArtificialIntellingenceA-Z.png',
    courseName: 'Artificial Intelligence A-Z',
    certificateLink: 'https://www.udemy.com/certificate/UC-2065078c-6c73-4224-90ce-5b7e51498e2e/',
    completionDate: '01-08-2024',
    issuingOrganization: 'Udemy',
  },
  {
    id: 5,
    image: '/images/certifications/UltimateReact.png',
    courseName: 'Ultimate React Course',
    certificateLink: 'https://www.udemy.com/certificate/UC-a72a253c-0919-4089-9a95-4a11dc2bbb36/',
    completionDate: '17-08-2024',
    issuingOrganization: 'Udemy',
  },
];

const AUTO_MS = 5000;

const arrowBtnStyle = {
  flexShrink: 0,
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  border: '1px solid var(--border-glow)',
  background: 'rgba(255, 255, 255, 0.75)',
  color: 'var(--accent-primary)',
  fontSize: '1.25rem',
  fontFamily: 'var(--font-family-primary)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 'var(--shadow-sm)',
};

const TradCert = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = certificationsData[selectedIndex] || certificationsData[0];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Restart timer whenever the visible slide changes so each cert gets a full 5s
  useEffect(() => {
    if (!isMobile) return undefined;
    const id = window.setInterval(() => {
      setSelectedIndex((i) => (i + 1) % certificationsData.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [isMobile, selectedIndex]);

  const goPrev = () => {
    setSelectedIndex((i) => (i - 1 + certificationsData.length) % certificationsData.length);
  };

  const goNext = () => {
    setSelectedIndex((i) => (i + 1) % certificationsData.length);
  };

  return (
    <section
      id="certifications"
      style={{
        padding: isMobile ? 'var(--space-2xl) var(--space-md)' : 'var(--space-2xl) var(--space-lg)',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: isMobile ? 'var(--text-2xl)' : 'var(--text-3xl)',
          marginBottom: 'var(--space-2xl)',
          color: 'var(--text-primary)',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        🏆 Certifications & Achievements
      </h2>

      {isMobile ? (
        <div
          style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            padding: 'var(--space-lg)',
          }}
        >
          {/* Full-width certificate — no side arrows */}
          <div
            style={{
              width: '100%',
              minWidth: 0,
              maxHeight: 'min(72vh, 640px)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.5)',
              border: '1px solid var(--border-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-lg)',
            }}
          >
            <img
              key={selected.id}
              src={selected.image}
              alt={selected.courseName}
              style={{
                width: '100%',
                maxHeight: 'min(72vh, 640px)',
                height: 'auto',
                objectFit: 'contain',
                display: 'block',
              }}
            />
          </div>

          {/* Bottom bar: navigation + details + CTA */}
          <div aria-live="polite" aria-atomic="true">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-md)',
                marginBottom: 'var(--space-lg)',
                paddingTop: 'var(--space-sm)',
                borderTop: '1px solid var(--border-glow)',
              }}
            >
              <button
                type="button"
                aria-label="Previous certificate"
                onClick={goPrev}
                style={arrowBtnStyle}
              >
                ‹
              </button>
              <span
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-family-primary)',
                }}
              >
                {selectedIndex + 1} / {certificationsData.length}
              </span>
              <button
                type="button"
                aria-label="Next certificate"
                onClick={goNext}
                style={arrowBtnStyle}
              >
                ›
              </button>
            </div>

            <p
              style={{
                margin: '0 0 var(--space-md)',
                textAlign: 'center',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: 'var(--text-base)',
                lineHeight: 1.4,
              }}
            >
              {selected.courseName}
            </p>
            <p
              style={{
                margin: '0 0 var(--space-lg)',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-sm)',
              }}
            >
              {selected.issuingOrganization} · {selected.completionDate}
            </p>

            <div style={{ textAlign: 'center' }}>
              <a
                href={selected.certificateLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-block',
                  color: 'var(--accent-primary)',
                  textDecoration: 'none',
                  fontWeight: 700,
                  border: '1px solid var(--accent-primary)',
                  padding: 'var(--space-md) var(--space-xl)',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255, 255, 255, 0.55)',
                }}
              >
                View current certificate →
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '30% 70%',
            gap: 'var(--space-xl)',
          }}
        >
          <aside
            style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glow)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxHeight: '70vh', overflow: 'auto' }}>
              {certificationsData.map((cert, idx) => {
                const isActive = idx === selectedIndex;
                return (
                  <li
                    key={cert.id}
                    onClick={() => setSelectedIndex(idx)}
                    style={{
                      padding: 'var(--space-md) var(--space-lg)',
                      cursor: 'pointer',
                      borderBottom: '1px solid var(--border-glow)',
                      background: isActive ? 'var(--bg-secondary)' : 'transparent',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: isActive ? 600 : 500,
                      transition: 'background 0.2s ease',
                    }}
                  >
                    {cert.courseName}
                  </li>
                );
              })}
            </ul>
          </aside>

          <div>
            <div
              style={{
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-glow)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                padding: 'var(--space-lg)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  maxHeight: '60vh',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  src={selected.image}
                  alt={selected.courseName}
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ marginTop: 'var(--space-lg)' }}>
                <a
                  href={selected.certificateLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    color: 'var(--accent-primary)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    border: '1px solid var(--accent-primary)',
                    padding: 'var(--space-sm) var(--space-md)',
                    borderRadius: 'var(--radius-sm)',
                  }}
                >
                  View Certification →
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TradCert;
