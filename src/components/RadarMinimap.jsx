import React, { useEffect, useRef, useState } from 'react';

export default function RadarMinimap({ narutoPosition, onClickTeleport }) {
  const canvasRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  const size = isMobile ? 100 : 150;
  const scale = isMobile ? 3.5 : 5;

  useEffect(() => {
    const updateSize = () => setIsMobile(window.innerWidth < 768);
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const render = () => {
      ctx.clearRect(0, 0, size, size);
      ctx.fillStyle = '#111';
      ctx.fillRect(0, 0, size, size);

      // Zones
      const zones = [
        { x: 10.25, z: -5.63, color: 'cyan' },
        { x: -0.03, z: -9.67, color: 'yellow' },
        { x: 10.67, z: 3.39, color: 'lime' },
        { x: -6.06, z: 1.64, color: 'orange' },
        { x: -2.54, z: 9.51, color: 'pink' },
        { x: 6.31, z: -8.4, color: 'purple' },
        { x: 5.33, z: 9.10, color: 'maroon' }
      ];

      zones.forEach(zone => {
        ctx.fillStyle = zone.color;
        ctx.beginPath();
        ctx.arc(size / 2 + zone.x * scale, size / 2 + zone.z * scale, isMobile ? 3 : 5, 0, Math.PI * 2);
        ctx.fill();
      });

      // Naruto
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(size / 2 + narutoPosition.x * scale, size / 2 + narutoPosition.z * scale, isMobile ? 4 : 6, 0, Math.PI * 2);
      ctx.fill();
    };

    render();
  }, [narutoPosition, isMobile]);

  const handleClick = (e) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = size / 2;
    const centerY = size / 2;

    const worldX = (x - centerX) / scale;
    const worldZ = (y - centerY) / scale;

    onClickTeleport?.({ x: worldX, z: worldZ });
  };

  return (
    <div
      style={{
        position: 'absolute',
        top: isMobile ? 10 : 20,
        right: isMobile ? 10 : 20,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        onClick={handleClick}
        style={{
          border: '2px solid #444',
          backgroundColor: '#000',
          borderRadius: '50%',
          cursor: 'pointer',
          width: `${size}px`,
          height: `${size}px`,
        }}
      />

      {/* Legend Box */}
      <div
        style={{
          marginTop: isMobile ? '6px' : '10px',
          padding: isMobile ? '6px 8px' : '8px 12px',
          background: 'rgba(0, 0, 0, 0.75)',
          border: '2px solid #FFD700',
          borderRadius: '8px',
          color: '#fff',
          fontSize: isMobile ? '10px' : '12px',
          fontFamily: 'monospace',
          backdropFilter: 'blur(4px)',
          textAlign: 'left',
          width: isMobile ? '130px' : '160px',
        }}
      >
        <div style={{ fontWeight: 'bold', color: '#FFD700', marginBottom: '4px' }}>
          🗺️ Legend
        </div>
        <div><span style={{ color: 'red' }}>●</span> Naruto (You)</div>
        <div><span style={{ color: 'cyan' }}>●</span> Links</div>
        <div><span style={{ color: 'yellow' }}>●</span> Resume</div>
        <div><span style={{ color: 'lime' }}>●</span> Certifications</div>
        <div><span style={{ color: 'orange' }}>●</span> Projects</div>
        <div><span style={{ color: 'pink' }}>●</span> Contact Me</div>
        <div><span style={{ color: 'purple' }}>●</span> Experience</div>
        <div><span style={{ color: 'maroon' }}>●</span> Photo Gallery</div>
      </div>
    </div>
  );
}
