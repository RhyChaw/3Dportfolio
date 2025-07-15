import React, { useRef, useState, useEffect } from 'react';

const Joystick = ({ onMove, size = 100 }) => {
  const baseRef = useRef(null);
  const knobRef = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  // Reset knob to center
  const reset = () => {
    setPosition({ x: 0, y: 0 });
    if (onMove) onMove({ x: 0, y: 0 });
  };

  const handlePointerDown = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const handlePointerMove = (e) => {
    if (!dragging) return;
    e.preventDefault();

    const base = baseRef.current.getBoundingClientRect();
    let x = e.clientX - base.left - base.width / 2;
    let y = e.clientY - base.top - base.height / 2;

    // Limit joystick knob to radius (half size)
    const maxRadius = base.width / 2;
    const dist = Math.sqrt(x * x + y * y);
    if (dist > maxRadius) {
      x = (x / dist) * maxRadius;
      y = (y / dist) * maxRadius;
    }

    setPosition({ x, y });

    // Normalize to -1 to 1 range
    if (onMove) onMove({ x: x / maxRadius, y: -y / maxRadius }); // invert y for screen coordinates
  };

  const handlePointerUp = (e) => {
    e.preventDefault();
    setDragging(false);
    reset();
  };

  useEffect(() => {
    if (dragging) {
      window.addEventListener('pointerup', handlePointerUp);
      window.addEventListener('pointermove', handlePointerMove);
    } else {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    }
    return () => {
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointermove', handlePointerMove);
    };
  }, [dragging]);

  return (
    <div
      ref={baseRef}
      onPointerDown={handlePointerDown}
      style={{
        position: 'fixed',
        bottom: 20,
        left: 20,
        width: size,
        height: size,
        borderRadius: '50%',
        background: 'rgba(255, 215, 0, 0.2)',
        border: '2px solid #FFD700',
        touchAction: 'none',
        zIndex: 10000,
        userSelect: 'none',
      }}
    >
      <div
        ref={knobRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: size / 2,
          height: size / 2,
          marginLeft: position.x,
          marginTop: position.y,
          background: '#FFD700',
          borderRadius: '50%',
          transform: 'translate(-50%, -50%)',
          boxShadow: '0 0 8px #FFD700',
        }}
      />
    </div>
  );
};

export default Joystick;
