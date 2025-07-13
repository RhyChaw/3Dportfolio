import React from 'react';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

function Resume({ onClose }) {
  return (
    <div style={{
      position: 'absolute',
      top: '10%',
      left: '10%',
      width: '80%',
      height: '80%',
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
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h2 style={{
        fontSize: '28px',
        textAlign: 'center',
        color: '#FFD700',
        textShadow: '1px 1px 2px #000',
        marginBottom: '15px'
      }}>📄 Resume Scroll</h2>

      {/* PDF Viewer */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        border: '2px solid rgba(255,255,255,0.2)',
        borderRadius: '8px',
        backgroundColor: 'rgba(0,0,0,0.3)'
      }}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
          <Viewer fileUrl="/resumes/resume.pdf" />
        </Worker>
      </div>

      {/* LinkedIn + Close */}
      <div style={{ textAlign: 'center', marginTop: '15px' }}>
        <a
          href="https://www.linkedin.com/in/rhythm-chawla-18723a231/"
          target="_blank"
          rel="noreferrer"
          style={{ color: '#0ff', fontSize: '16px', textDecoration: 'underline' }}
        >
          View LinkedIn
        </a>
        <br />
        <button
          onClick={onClose}
          style={{
            marginTop: '10px',
            padding: '10px 16px',
            background: '#e56c1f',
            border: 'none',
            borderRadius: '8px',
            color: 'white',
            fontWeight: 'bold',
            fontSize: '16px',
            cursor: 'pointer',
            boxShadow: '0 0 10px rgba(0,0,0,0.4)'
          }}
        >
          Close Scroll
        </button>
      </div>
    </div>
  );
}

export default Resume;
