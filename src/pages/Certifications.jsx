import React from 'react';

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
    courseName: 'Maching Learning A-Z',
    certificateLink: 'https://www.udemy.com/certificate/UC-a2ab1162-0958-487f-af70-a1f989323ac0/',
    completionDate: '19-07-2024',
    issuingOrganization: 'Udemy'
  },
  {
    id: 4,
    image: "/images/certifications/ArtificialIntellingenceA-Z.png",
    courseName: 'Artificial Intellingence A-Z',
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

function Certifications({ onClose }) {
  return (
    <div style={{
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '80%',
      height: '80%',
      overflowY: 'auto',
      background: 'var(--bg-card)',
      padding: 'var(--space-xl)',
      borderRadius: 'var(--radius-xl)',
      color: 'var(--text-primary)',
      zIndex: 1000,
      fontFamily: 'var(--font-family-primary)',
      border: '1px solid var(--border-primary)',
      boxShadow: 'var(--shadow-xl)',
      backdropFilter: 'blur(8px)'
    }}>
      <h2 style={{
        fontSize: 'var(--text-2xl)',
        textAlign: 'center',
        color: 'var(--accent-primary)',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        marginBottom: 'var(--space-xl)',
        fontWeight: '700'
      }}>🏆 Certifications & Achievements</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: 'var(--space-lg)',
        marginTop: 'var(--space-xl)'
      }}>
        {certificationsData.map(cert => (
          <div key={cert.id} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'var(--bg-secondary)',
            padding: 'var(--space-lg)',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-primary)',
            boxShadow: 'var(--shadow-md)',
            transition: 'all var(--transition-normal)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
            e.currentTarget.style.borderColor = 'var(--border-accent)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            e.currentTarget.style.borderColor = 'var(--border-primary)';
          }}>
            <img
              src={cert.image}
              alt={cert.courseName}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-primary)',
                boxShadow: 'var(--shadow-sm)',
                marginBottom: 'var(--space-md)'
              }}
            />
            <div style={{ textAlign: 'center' }}>
              <h3 style={{
                fontSize: 'var(--text-lg)',
                fontWeight: '600',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-sm)',
                textAlign: 'center'
              }}>
                {cert.courseName}
              </h3>
              <p style={{ 
                fontSize: 'var(--text-sm)', 
                color: 'var(--text-secondary)', 
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-xs)'
              }}>
                📅 <strong>{cert.completionDate}</strong>
              </p>
              <p style={{ 
                fontSize: 'var(--text-sm)', 
                color: 'var(--text-secondary)', 
                margin: 'var(--space-xs) 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-xs)'
              }}>
                🏛 {cert.issuingOrganization}
              </p>
              <a
                href={cert.certificateLink}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--space-xs)',
                  color: 'var(--accent-primary)',
                  fontSize: 'var(--text-sm)',
                  textDecoration: 'none',
                  fontWeight: '500',
                  padding: 'var(--space-xs) var(--space-sm)',
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--border-primary)',
                  transition: 'all var(--transition-fast)',
                  marginTop: 'var(--space-sm)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = 'var(--accent-primary)';
                  e.target.style.color = 'var(--text-primary)';
                  e.target.style.borderColor = 'var(--accent-primary)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'var(--bg-card)';
                  e.target.style.color = 'var(--accent-primary)';
                  e.target.style.borderColor = 'var(--border-primary)';
                }}
              >
                View Certificate →
              </a>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: 'var(--space-xl)',
          padding: 'var(--space-sm) var(--space-lg)',
          background: 'linear-gradient(135deg, var(--accent-secondary), #ff8c42)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          color: 'var(--text-primary)',
          fontWeight: '600',
          fontSize: 'var(--text-sm)',
          cursor: 'pointer',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxShadow: 'var(--shadow-md)',
          transition: 'all var(--transition-fast)'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = 'var(--shadow-lg)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = 'var(--shadow-md)';
        }}
      >
        Close
      </button>
    </div>
  );
}

export default Certifications;
