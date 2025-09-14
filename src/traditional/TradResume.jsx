import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';

// Import styles for react-pdf-viewer
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const TradResume = () => {
  return (
    <section
      id="resume"
      style={{
        padding: 'var(--space-2xl) var(--space-lg)',
        maxWidth: '1000px',
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
        📄 Resume & CV
      </h2>

      {/* PDF Viewer */}
      <div
        style={{
          height: '700px',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          marginBottom: 'var(--space-xl)',
          background: 'var(--bg-card)',
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
        gap: 'var(--space-lg)',
        flexWrap: 'wrap',
      }}>
        <a
          href="/resumes/resume.pdf"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            padding: 'var(--space-sm) var(--space-lg)',
            background: 'linear-gradient(135deg, var(--accent-primary), #0099cc)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: 'var(--text-sm)',
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
          📥 Download PDF
        </a>
        <a
          href="https://www.linkedin.com/in/rhythm-chawla-18723a231/"
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            padding: 'var(--space-sm) var(--space-lg)',
            background: 'var(--bg-card)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: 'var(--text-sm)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--border-primary)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'all var(--transition-fast)',
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'var(--bg-tertiary)';
            e.target.style.borderColor = 'var(--border-accent)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'var(--bg-card)';
            e.target.style.borderColor = 'var(--border-primary)';
            e.target.style.transform = 'translateY(0)';
          }}
        >
          💼 LinkedIn Profile
        </a>
      </div>
    </section>
  );
};

export default TradResume;
