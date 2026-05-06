import React from 'react';

import PipetteProImg from '../proj/PipettePro.png';

const certificationsData = [
  {
    id: 1,
    image: PipetteProImg,
    courseName: 'Best Prototype — Google × UWaterloo Symposium',
    certificateLink: 'https://pipettepro.vercel.app',
    completionDate: 'November 2025',
    issuingOrganization: 'University of Waterloo · Future of Work Institute'
  },
  {
    id: 2,
    image: null,
    courseName: "President's Scholarship of Distinction",
    certificateLink: null,
    completionDate: 'September 2024',
    issuingOrganization: 'University of Waterloo'
  },
  {
    id: 3,
    image: null,
    courseName: 'Undergraduate Research Assistant (URA)',
    certificateLink: null,
    completionDate: 'December 2025',
    issuingOrganization: 'University of Waterloo · Prof. Edith Law'
  },
  {
    id: 4,
    image: null,
    courseName: 'TCPS 2 — Research Ethics Certification',
    certificateLink: null,
    completionDate: 'January 2026',
    issuingOrganization: 'Government of Canada'
  },
  {
    id: 5,
    image: null,
    courseName: 'Anthropic Claude 101',
    certificateLink: null,
    completionDate: '2026',
    issuingOrganization: 'Anthropic'
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
      }}>Achievements</h2>

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
            {cert.image ? (
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
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '200px',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(255,215,0,0.35)',
                  boxShadow: 'var(--shadow-sm)',
                  marginBottom: 'var(--space-md)',
                  background: 'rgba(0,0,0,0.20)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '16px',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  color: '#fffbe6',
                  fontWeight: 700,
                }}
              >
                {cert.courseName}
              </div>
            )}
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
