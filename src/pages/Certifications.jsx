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
    certificateLink: 'https://www.udemy.com/certificate/UC-46fc113c-2139-4ce9-939e-0a9a2febb0fd/?utm_campaign=email&utm_medium=email&utm_source=sendgrid.com',
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
      overflowY: 'scroll',
      backgroundImage: 'url("/images/scroll-texture.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      padding: '30px',
      borderRadius: '20px',
      color: '#fffbe6',
      zIndex: 1000,
      fontFamily: '"Noto Serif JP", "Papyrus", serif',
      border: '8px double #5a3a1c',
      boxShadow: '0 0 40px rgba(0,0,0,0.7)',
      backdropFilter: 'blur(6px)'
    }}>
      <h2 style={{
        fontSize: '28px',
        textAlign: 'center',
        color: '#ffcb4a',
        textShadow: '1px 1px 2px #000'
      }}>🌀 Certifications Scroll</h2>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        marginTop: '20px'
      }}>
        {certificationsData.map(cert => (
  <div key={cert.id} style={{
    display: 'flex',
    alignItems: 'flex-start',
    gap: '20px',
    background: 'rgba(245, 222, 179, 0.1)',
    padding: '20px',
    borderRadius: '15px',
    border: '3px groove #f4d180',
    boxShadow: '0 0 12px rgba(255, 223, 128, 0.3)',
    transition: 'transform 0.2s ease',
    backdropFilter: 'blur(1px)'
  }}>
    <img
      src={cert.image}
      alt={cert.courseName}
      style={{
        width: '130px',
        height: 'auto',
        borderRadius: '8px',
        border: '2px solid #d2b48c',
        boxShadow: '2px 2px 8px rgba(0,0,0,0.4)'
      }}
    />
    <div style={{ flex: 1 }}>
      <h3 style={{
        margin: '0 0 8px',
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#ffe78c',
        textShadow: '1px 1px 1px #000'
      }}>
        {cert.courseName}
      </h3>
      <p style={{ margin: '0 0 4px', fontSize: '15px', color: '#ffefc2' }}>
        📅 <strong>{cert.completionDate}</strong>
      </p>
      <p style={{ margin: '0 0 6px', fontSize: '15px', color: '#ffefc2' }}>
        🏛 {cert.issuingOrganization}
      </p>
      <a
        href={cert.certificateLink}
        target="_blank"
        rel="noreferrer"
        style={{
          color: '#0ff',
          fontSize: '15px',
          textDecoration: 'underline',
          fontWeight: 'bold'
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
          marginTop: '25px',
          padding: '10px 16px',
          background: '#e56c1f',
          border: 'none',
          borderRadius: '8px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
          display: 'block',
          marginLeft: 'auto',
          marginRight: 'auto',
          boxShadow: '0 0 10px rgba(0,0,0,0.4)'
        }}
      >
        Close Scroll
      </button>
    </div>
  );
}

export default Certifications;
