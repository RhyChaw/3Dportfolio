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
        padding: '2rem 1rem',
        maxWidth: '900px',
        margin: '0 auto',
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: '2rem',
          marginBottom: '1rem',
          color: '#111827',
        }}
      >
        📄 My Resume
      </h2>

      {/* PDF Viewer */}
      <div
        style={{
          height: '600px',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
          marginBottom: '1rem',
        }}
      >
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
          <Viewer fileUrl="/resumes/resume.pdf" />
        </Worker>
      </div>

      {/* LinkedIn link */}
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <a
          href="https://www.linkedin.com/in/rhythm-chawla-18723a231/"
          target="_blank"
          rel="noreferrer"
          style={{
            color: '#2563EB',
            textDecoration: 'underline',
            fontWeight: 600,
            fontSize: '1rem',
          }}
        >
          View my LinkedIn Profile
        </a>
      </div>
    </section>
  );
};

export default TradResume;
