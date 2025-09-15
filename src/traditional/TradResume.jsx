import React, { useState, useEffect } from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';

// Import styles for react-pdf-viewer
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const TradResume = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <section
      id="resume"
      style={{
        padding: isMobile ? 'var(--space-xl) var(--space-md)' : 'var(--space-2xl) var(--space-lg)',
        maxWidth: '1000px',
        margin: '0 auto',
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: isMobile ? 'var(--text-2xl)' : 'var(--text-3xl)',
          marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-2xl)',
          color: 'var(--text-primary)',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}
      >
        Resume
      </h2>

      {/* PDF Viewer */}
      <div
        style={{
          border: '1px solid var(--border-glow)',
          borderRadius: 'var(--radius-xl)',
          overflow: 'visible',
          boxShadow: 'var(--shadow-xl)',
          marginBottom: isMobile ? 'var(--space-lg)' : 'var(--space-xl)',
          background: 'var(--bg-primary)',
          padding: isMobile ? 'var(--space-sm)' : 'var(--space-md)'
        }}
      >
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
          <Viewer fileUrl="/resumes/resume.pdf" />
        </Worker>
      </div>

      {/* Action buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: isMobile ? 'var(--space-md)' : 'var(--space-lg)',
        flexWrap: 'wrap',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
      }}>
        <a
          href="/resumes/resume.pdf"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            padding: isMobile ? 'var(--space-md) var(--space-lg)' : 'var(--space-sm) var(--space-lg)',
            background: 'linear-gradient(135deg, var(--accent-primary), #0099cc)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: isMobile ? 'var(--text-base)' : 'var(--text-sm)',
            width: isMobile ? '200px' : 'auto',
            borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-md)',
            transition: 'all var(--transition-fast)',
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
          Download PDF
        </a>
      </div>
    </section>
  );
};

export default TradResume;
