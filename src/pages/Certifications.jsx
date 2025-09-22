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
      backdropFilter: 'blur(6px)'
    }}>
      <h2 style={{
        fontSize: '32px',
        textAlign: 'center',
        color: '#FFD700',
        textShadow: '2px 2px 4px #000',
        marginBottom: '24px',
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
            background: 'rgba(0,0,0,0.35)',
            padding: 'var(--space-lg)',
            borderRadius: '14px',
            border: '1px solid #FFD700',
            boxShadow: '0 0 12px rgba(0,0,0,0.6)',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.boxShadow = '0 0 18px rgba(0,0,0,0.7)';
            e.currentTarget.style.borderColor = '#FF4500';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 0 12px rgba(0,0,0,0.6)';
            e.currentTarget.style.borderColor = '#FFD700';
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
                fontWeight: '700',
                color: '#fffbe6',
                marginBottom: 'var(--space-sm)',
                textAlign: 'center',
                textShadow: '1px 1px 2px #000'
              }}>
                {cert.courseName}
              </h3>
              <p style={{ 
                fontSize: 'var(--text-sm)', 
                color: '#fffbe6', 
                margin: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-xs)',
                textShadow: '1px 1px 2px #000'
              }}>
                📅 <strong>{cert.completionDate}</strong>
              </p>
              <p style={{ 
                fontSize: 'var(--text-sm)', 
                color: '#fffbe6', 
                margin: 'var(--space-xs) 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-xs)',
                textShadow: '1px 1px 2px #000'
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
                  color: '#FFD700',
                  fontSize: 'var(--text-sm)',
                  textDecoration: 'none',
                  fontWeight: '700',
                  padding: '6px 10px',
                  background: 'rgba(0,0,0,0.35)',
                  borderRadius: '10px',
                  border: '1px solid #FFD700',
                  transition: 'all 0.2s ease',
                  marginTop: 'var(--space-sm)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = '#FF4500';
                  e.target.style.color = '#fff';
                  e.target.style.borderColor = '#FF4500';
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = 'rgba(0,0,0,0.35)';
                  e.target.style.color = '#FFD700';
                  e.target.style.borderColor = '#FFD700';
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
          marginTop: '30px',
          padding: '12px 24px',
          background: '#FF4500',
          border: 'none',
          borderRadius: '10px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          transition: 'all 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = '0 0 14px rgba(0,0,0,0.6)';
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        }}
      >
        Close
      </button>
    </div>
  );
}

export default Certifications;
