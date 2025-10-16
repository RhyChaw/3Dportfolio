import React, { useMemo } from 'react';

// Auto-import all images from src/compLogos
// Supports common formats; you can add more extensions if needed
const imagesImport = import.meta.glob('/src/compLogos/*.{png,jpg,jpeg,svg,webp,gif}', { eager: true, import: 'default' });

const LogosBelt = () => {
  const logos = useMemo(() => {
    return Object.values(imagesImport)
      .filter(Boolean)
      .map((src) => String(src));
  }, []);

  if (!logos.length) return null;

  // Split into two rows for a denser belt
  const rowA = logos.filter((_, i) => i % 2 === 0);
  const rowB = logos.filter((_, i) => i % 2 === 1);

  // Ensure there is never visible empty space by repeating the base sequence
  // Then create two identical halves for perfectly seamless looping
  const repeatTimes = 4; // increase if you ever see gaps
  const baseA = Array.from({ length: repeatTimes }).flatMap(() => rowA);
  const baseB = Array.from({ length: repeatTimes }).flatMap(() => rowB);
  const loopA = [...baseA, ...baseA];
  const loopB = [...baseB, ...baseB];

  return (
    <section
      aria-label="company-logos"
      style={{
        width: '100%',
        overflow: 'hidden',
        padding: 'var(--space-xl) 0',
        display: 'block'
      }}
    >
      {/* Centered container at 75% width with 12.5% side margins */}
      <div
        style={{
          width: '75%',
          margin: '0 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-md)'
        }}
      >
        {/* Row A */}
        <div
          style={{
            position: 'relative',
            maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3xl)',
              animation: 'logos-marquee 24s linear infinite',
              willChange: 'transform',
            }}
          >
            {loopA.map((src, idx) => (
              <img
                key={`rowA-${idx}`}
                src={src}
                alt="Company logo"
                style={{
                  height: '72px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            ))}
          </div>
        </div>

        {/* Row B (opposite direction for visual interest) */}
        <div
          style={{
            position: 'relative',
            maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)',
            WebkitMaskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)'
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-3xl)',
              animation: 'logos-marquee-reverse 26s linear infinite',
              willChange: 'transform',
            }}
          >
            {loopB.map((src, idx) => (
              <img
                key={`rowB-${idx}`}
                src={src}
                alt="Company logo"
                style={{
                  height: '72px',
                  width: 'auto',
                  objectFit: 'contain',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Keyframes injected inline to keep component self-contained */}
      <style>
        {`
          @keyframes logos-marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          @keyframes logos-marquee-reverse {
            0% { transform: translateX(-50%); }
            100% { transform: translateX(0); }
          }
        `}
      </style>
    </section>
  );
};

export default LogosBelt;


