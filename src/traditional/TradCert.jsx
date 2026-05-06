import React, { useEffect, useState } from 'react';

import PipetteProImg from '../proj/PipettePro.png';

const certificationsData = [
  {
    id: 1,
    image: PipetteProImg,
    courseName: 'Best Prototype — Google × UWaterloo Symposium',
    certificateLink: 'https://pipettepro.vercel.app',
    completionDate: 'November 2025',
    issuingOrganization: 'University of Waterloo · Future of Work Institute',
  },
  {
    id: 2,
    image: null,
    courseName: "President's Scholarship of Distinction",
    certificateLink: null,
    completionDate: 'September 2024',
    issuingOrganization: 'University of Waterloo',
  },
  {
    id: 3,
    image: null,
    courseName: 'Undergraduate Research Award (URA)',
    certificateLink: null,
    completionDate: 'December 2025',
    issuingOrganization: 'University of Waterloo · Prof. Edith Law',
  },
  {
    id: 4,
    image: null,
    courseName: 'TCPS 2 — Research Ethics Certification',
    certificateLink: 'https://tcps2core.ca',
    completionDate: 'January 2026',
    issuingOrganization: 'Government of Canada',
  },
  {
    id: 5,
    image: null,
    courseName: 'Anthropic Claude 101',
    certificateLink: null,
    completionDate: '2026',
    issuingOrganization: 'Anthropic',
  },
];

const AUTO_MS = 5000;

const arrowBtnStyle = {
  flexShrink: 0,
  width: '44px',
  height: '44px',
  borderRadius: '50%',
  border: '1px solid var(--border-glow)',
  background: 'rgba(255, 255, 255, 0.75)',
  color: 'var(--accent-primary)',
  fontSize: '1.25rem',
  fontFamily: 'var(--font-family-primary)',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: 'var(--shadow-sm)',
};

const TradCert = () => {
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selected = certificationsData[selectedIndex] || certificationsData[0];

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Restart timer whenever the visible slide changes so each cert gets a full 5s
  useEffect(() => {
    if (!isMobile) return undefined;
    const id = window.setInterval(() => {
      setSelectedIndex((i) => (i + 1) % certificationsData.length);
    }, AUTO_MS);
    return () => window.clearInterval(id);
  }, [isMobile, selectedIndex]);

  const goPrev = () => {
    setSelectedIndex((i) => (i - 1 + certificationsData.length) % certificationsData.length);
  };

  const goNext = () => {
    setSelectedIndex((i) => (i + 1) % certificationsData.length);
  };

  return (
    <section
      id="certifications"
      style={{
        padding: isMobile ? 'var(--space-2xl) var(--space-md)' : 'var(--space-2xl) var(--space-lg)',
        maxWidth: '1200px',
        margin: '0 auto',
        fontFamily: 'var(--font-family-primary)',
      }}
    >
      <h2
        style={{
          textAlign: 'center',
          fontSize: isMobile ? 'var(--text-2xl)' : 'var(--text-3xl)',
          marginBottom: 'var(--space-2xl)',
          color: 'var(--text-primary)',
          fontWeight: '700',
          textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
          background: 'linear-gradient(45deg, var(--text-primary), var(--accent-primary))',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
      >
        Achievements
      </h2>

      {isMobile ? (
        <div
          style={{
            background: 'var(--bg-glass)',
            border: '1px solid var(--border-glow)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-md)',
            padding: 'var(--space-lg)',
          }}
        >
          {/* Full-width certificate — no side arrows */}
          <div
            style={{
              width: '100%',
              minWidth: 0,
              maxHeight: 'min(72vh, 640px)',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.5)',
              border: '1px solid var(--border-glow)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 'var(--space-lg)',
            }}
          >
            {selected.image ? (
              <img
                key={selected.id}
                src={selected.image}
                alt={selected.courseName}
                style={{
                  width: '100%',
                  maxHeight: 'min(72vh, 640px)',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  padding: 'var(--space-xl)',
                  boxSizing: 'border-box',
                  textAlign: 'center',
                  color: 'var(--text-primary)',
                }}
              >
                <div style={{ fontWeight: 800, fontSize: 'var(--text-lg)', marginBottom: 'var(--space-sm)' }}>
                  {selected.courseName}
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-sm)', lineHeight: 1.6 }}>
                  {selected.issuingOrganization}
                  <br />
                  {selected.completionDate}
                  <br />
                  {selected.certificateLink ? (
                    <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>Link: {selected.certificateLink}</span>
                  ) : (
                    <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Link: —</span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Bottom bar: navigation + details + CTA */}
          <div aria-live="polite" aria-atomic="true">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 'var(--space-md)',
                marginBottom: 'var(--space-lg)',
                paddingTop: 'var(--space-sm)',
                borderTop: '1px solid var(--border-glow)',
              }}
            >
              <button
                type="button"
                aria-label="Previous certificate"
                onClick={goPrev}
                style={arrowBtnStyle}
              >
                ‹
              </button>
              <span
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-family-primary)',
                }}
              >
                {selectedIndex + 1} / {certificationsData.length}
              </span>
              <button
                type="button"
                aria-label="Next certificate"
                onClick={goNext}
                style={arrowBtnStyle}
              >
                ›
              </button>
            </div>

            <p
              style={{
                margin: '0 0 var(--space-md)',
                textAlign: 'center',
                color: 'var(--text-primary)',
                fontWeight: 700,
                fontSize: 'var(--text-base)',
                lineHeight: 1.4,
              }}
            >
              {selected.courseName}
            </p>
            <p
              style={{
                margin: '0 0 var(--space-lg)',
                textAlign: 'center',
                color: 'var(--text-secondary)',
                fontSize: 'var(--text-sm)',
              }}
            >
              {selected.issuingOrganization} · {selected.completionDate}
            </p>

            <div style={{ textAlign: 'center' }}>
              {selected.certificateLink ? (
                <a
                  href={selected.certificateLink}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-block',
                    color: 'var(--accent-primary)',
                    textDecoration: 'none',
                    fontWeight: 700,
                    border: '1px solid var(--accent-primary)',
                    padding: 'var(--space-md) var(--space-xl)',
                    borderRadius: 'var(--radius-md)',
                    background: 'rgba(255, 255, 255, 0.55)',
                  }}
                >
                  View current certificate →
                </a>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '30% 70%',
            gap: 'var(--space-xl)',
          }}
        >
          <aside
            style={{
              background: 'var(--bg-glass)',
              border: '1px solid var(--border-glow)',
              borderRadius: 'var(--radius-lg)',
              boxShadow: 'var(--shadow-md)',
              overflow: 'hidden',
            }}
          >
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, maxHeight: '70vh', overflow: 'auto' }}>
              {certificationsData.map((cert, idx) => {
                const isActive = idx === selectedIndex;
                return (
                  <li
                    key={cert.id}
                    onClick={() => setSelectedIndex(idx)}
                    style={{
                      padding: 'var(--space-md) var(--space-lg)',
                      cursor: 'pointer',
                      borderBottom: '1px solid var(--border-glow)',
                      background: isActive ? 'var(--bg-secondary)' : 'transparent',
                      color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                      fontWeight: isActive ? 600 : 500,
                      transition: 'background 0.2s ease',
                    }}
                  >
                    {cert.courseName}
                  </li>
                );
              })}
            </ul>
          </aside>

          <div>
            <div
              style={{
                background: 'var(--bg-glass)',
                border: '1px solid var(--border-glow)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: 'var(--shadow-md)',
                padding: 'var(--space-lg)',
              }}
            >
              <div
                style={{
                  width: '100%',
                  maxHeight: '60vh',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {selected.image ? (
                  <img
                    src={selected.image}
                    alt={selected.courseName}
                    style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '60vh',
                      padding: 'var(--space-xl)',
                      boxSizing: 'border-box',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      color: 'var(--text-primary)',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 800, fontSize: 'var(--text-xl)', marginBottom: 'var(--space-sm)' }}>
                        {selected.courseName}
                      </div>
                      <div style={{ color: 'var(--text-secondary)', fontSize: 'var(--text-base)', lineHeight: 1.8 }}>
                        {selected.issuingOrganization}
                        <br />
                        {selected.completionDate}
                        <br />
                        {selected.certificateLink ? (
                          <span style={{ color: 'var(--accent-primary)', fontWeight: 700 }}>Link: {selected.certificateLink}</span>
                        ) : (
                          <span style={{ color: 'var(--text-muted)', fontWeight: 700 }}>Link: —</span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div style={{ marginTop: 'var(--space-lg)' }}>
                {selected.certificateLink ? (
                  <a
                    href={selected.certificateLink}
                    target="_blank"
                    rel="noreferrer"
                    style={{
                      display: 'inline-block',
                      color: 'var(--accent-primary)',
                      textDecoration: 'none',
                      fontWeight: 600,
                      border: '1px solid var(--accent-primary)',
                      padding: 'var(--space-sm) var(--space-md)',
                      borderRadius: 'var(--radius-sm)',
                    }}
                  >
                    View Certification →
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TradCert;
