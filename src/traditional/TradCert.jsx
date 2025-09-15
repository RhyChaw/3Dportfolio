import React, { useState } from 'react';

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
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = certificationsData[selectedIndex] || certificationsData[0];

  return (
    <section
      id="certifications"
      style={{
        padding: 'var(--space-2xl) var(--space-lg)',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'var(--font-family-primary)'
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
          background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        🏆 Certifications & Achievements
      </h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '30% 70%',
          gap: 'var(--space-xl)'
        }}
      >
        {/* Left: list */}
        <aside
          style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            overflow: 'hidden'
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
                    transition: 'background 0.2s ease'
                  }}
                >
                  {cert.courseName}
                </li>
              );
            })}
          </ul>
        </aside>

        {/* Right: preview */}
        <div>
          <div
            style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glow)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              padding: 'var(--space-lg)'
            }}
          >
            <div style={{ width: '100%', maxHeight: '60vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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
                  borderRadius: 'var(--radius-sm)'
                }}
              >
                View Certification →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TradCert;
