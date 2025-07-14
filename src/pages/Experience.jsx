import React from 'react';

function Experience({ onClose }) {
  const experiences = [
    {
      title: 'Cresta AI (Intern)',
      detail: 'Worked on real-time AI tooling and assistant development. Developed internal automation tools, contributed to improving LLM-based workflows, and participated in performance benchmarking of AI systems.',
      year: '2025',
    },
    {
      title: 'G12 (Co-Founder)',
      detail: 'Built an ed-tech platform that connects high school and university students globally. Led frontend development in React with Firebase backend, managed partnerships, and scaled the platform to multiple schools.',
      year: '2023 – Present',
    },
    {
      title: 'Vasanta Bhavan (Freelance Dev)',
      detail: 'Created a custom Firebase admin panel for a restaurant chain based in Oman. Implemented order management, analytics dashboard, and staff access system.',
      year: '2024',
    },
    {
      title: 'Residence Ambassador, UW',
      detail: 'Facilitated student onboarding, led campus tours, and coordinated residence life programming to enhance community engagement at University of Waterloo.',
      year: '2023 – 2024',
    }
  ];

  return (
    <div style={{
      position: 'absolute',
      top: '15%',
      left: '25%',
      width: '50%',
      maxHeight: '70%',
      backgroundImage: 'url("/images/scroll-texture.jpg")',
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      padding: '30px',
      borderRadius: '20px',
      color: '#fffbe6',
      zIndex: 1000,
      fontFamily: '"Noto Serif JP", "Papyrus", serif',
      border: '8px double #FFD700',
      boxShadow: '0 0 40px rgba(0,0,0,0.7)',
      backdropFilter: 'blur(6px)',
      overflowY: 'auto'
    }}>
      <h2 style={{
        fontSize: '28px',
        textAlign: 'center',
        color: '#FFD700',
        textShadow: '1px 1px 2px #000'
      }}>
        💼 Ninja Timeline: Experience
      </h2>

      <div style={{ position: 'relative', marginTop: '30px', paddingLeft: '25px' }}>
        {/* Vertical line */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: '14px',
          width: '3px',
          height: '100%',
          backgroundColor: '#FFD700'
        }} />

        {/* Timeline items */}
        {experiences.map((exp, index) => (
          <div key={index} style={{
            marginBottom: '40px',
            marginLeft: '30px',
            position: 'relative',
            paddingBottom: '10px'
          }}>
            <div style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: '#FF4500',
              position: 'absolute',
              left: '-30px',
              top: '5px',
              boxShadow: '0 0 10px #FF4500'
            }} />
            <h3 style={{ margin: 0, fontSize: '20px', color: '#87eaf2' }}>{exp.title}</h3>
            <p style={{ margin: '8px 0', fontSize: '14px', color: '#fff', lineHeight: '1.5em' }}>
              {exp.detail}
            </p>
            <span style={{ fontSize: '12px', color: '#ccc' }}>{exp.year}</span>
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: '20px',
          padding: '10px 16px',
          background: '#FF4500',
          border: 'none',
          borderRadius: '10px',
          color: 'white',
          fontWeight: 'bold',
          fontSize: '16px',
          cursor: 'pointer',
          boxShadow: '0 0 10px rgba(0,0,0,0.5)',
          alignSelf: 'center'
        }}
      >
        Close Scroll
      </button>
    </div>
  );
}

export default Experience;
