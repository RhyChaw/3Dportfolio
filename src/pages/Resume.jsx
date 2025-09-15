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
      background: 'var(--bg-card)',
      padding: 'var(--space-xl)',
      borderRadius: 'var(--radius-xl)',
      color: 'var(--text-primary)',
      zIndex: 1000,
      fontFamily: 'var(--font-family-primary)',
      border: '1px solid var(--border-primary)',
      boxShadow: 'var(--shadow-xl)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <h2 style={{
        fontSize: 'var(--text-2xl)',
        textAlign: 'center',
        color: 'var(--accent-primary)',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
        marginBottom: 'var(--space-lg)',
        fontWeight: '700'
      }}>📄 Resume & CV</h2>

      {/* PDF Viewer */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-md)',
        backgroundColor: 'var(--bg-secondary)',
        boxShadow: 'var(--shadow-sm)'
      }}>
        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js`}>
          <Viewer fileUrl="/resumes/resume.pdf" />
        </Worker>
      </div>

      {/* Action buttons */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        gap: 'var(--space-lg)',
        marginTop: 'var(--space-lg)',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={onClose}
          style={{
            padding: 'var(--space-sm) var(--space-lg)',
            background: 'linear-gradient(135deg, var(--accent-secondary), #ff8c42)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-primary)',
            fontWeight: '600',
            fontSize: 'var(--text-sm)',
            cursor: 'pointer',
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
    </div>
  );
}

export default Resume;
