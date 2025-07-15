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
  return (
    <section
      id="certifications"
      style={{
        padding: '2rem 1rem',
        maxWidth: '1100px',
        margin: '0 auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
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
        🌀 My Certifications
      </h2>

      {/* Marquee container */}
      <div
        style={{
          overflowX: 'auto',
          scrollbarWidth: 'thin',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'nowrap',
            gap: '1.5rem',
            animation: 'scrollCerts 25s linear infinite',
            width: 'max-content',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.animationPlayState = 'paused';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.animationPlayState = 'running';
          }}
        >
          {/* Duplicate for seamless loop */}
          {[...certificationsData, ...certificationsData].map(cert => (
            <div
              key={`${cert.id}-${Math.random()}`}
              style={{
                minWidth: '250px',
                maxWidth: '250px',
                flex: '0 0 auto',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 0 10px rgba(0,0,0,0.05)',
                backgroundColor: '#ffffff',
                transition: 'transform 0.2s ease',
              }}
            >
              <img
                src={cert.image}
                alt={cert.courseName}
                style={{
                  width: '100%',
                  height: 'auto',
                  display: 'block',
                }}
              />
              <div style={{ padding: '1rem' }}>
                <h3
                  style={{
                    fontSize: '1.1rem',
                    marginBottom: '0.5rem',
                    color: '#1f2937',
                  }}
                >
                  {cert.courseName}
                </h3>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#4b5563',
                    marginBottom: '0.25rem',
                  }}
                >
                  📅 {cert.completionDate}
                </p>
                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#4b5563',
                    marginBottom: '0.5rem',
                  }}
                >
                  🏛 {cert.issuingOrganization}
                </p>
                <a
                  href={cert.certificateLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    fontSize: '0.9rem',
                    color: '#2563EB',
                    textDecoration: 'underline',
                    fontWeight: '500',
                  }}
                >
                  View Certificate →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>
        {`
          @keyframes scrollCerts {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
    </section>
  );
};

export default TradCert;
