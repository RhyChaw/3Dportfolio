import React from 'react';
import portrait from '../../assets/rhythm-photo.jpg';

// Landing.jsx — the ink-splash hero: portrait, "Rhythm Chawla.", and a rotating
// role tag. It fades/lifts away as you scroll (MacHome drives that on landingRef).
export default function Landing({ landingRef, hintRef, rotWord }) {
  return (
    <div ref={landingRef} style={{ position: 'fixed', inset: 0, zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
      <svg width="0" height="0" style={{ position: 'absolute' }}>
        <defs>
          <filter id="mh-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="9" result="b" />
            <feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 22 -10" />
          </filter>
        </defs>
      </svg>

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, pointerEvents: 'auto' }}>
        <div style={{ position: 'relative', width: 400, height: 400 }}>
          <div style={{ position: 'absolute', inset: 0, filter: 'url(#mh-goo)' }}>
            {[
              { w: 250, h: 250, l: 75, t: 75, d: 0 },
              { w: 64, h: 64, l: 38, t: 96, d: 0.08 },
              { w: 44, h: 44, l: 300, t: 80, d: 0.14 },
              { w: 78, h: 78, l: 286, t: 250, d: 0.1 },
              { w: 34, h: 34, l: 70, t: 280, d: 0.18 },
              { w: 16, h: 16, l: 24, t: 196, d: 0.26 },
              { w: 12, h: 12, l: 356, t: 170, d: 0.3 },
              { w: 9, h: 9, l: 196, t: 16, d: 0.34 },
              { w: 10, h: 10, l: 180, t: 372, d: 0.38 },
            ].map((b, i) => (
              <div key={i} style={{ position: 'absolute', width: b.w, height: b.h, borderRadius: '50%', background: '#0a0a0a', left: b.l, top: b.t, animation: `mh-inkIn .9s cubic-bezier(.2,.9,.3,1.2) ${b.d}s both` }} />
            ))}
          </div>
          <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}>
            <div style={{ animation: 'mh-fadeUp .8s ease .45s both' }}>
              <img src={portrait} alt="Rhythm Chawla" style={{ width: 216, height: 216, display: 'block', border: '3px solid #f7f7f5', borderRadius: '50%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>

        <h1 style={{ margin: '28px 0 0', fontSize: 'clamp(48px,7vw,92px)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1, animation: 'mh-fadeUp .8s ease .6s both' }}>
          Rhythm Chawla<span style={{ opacity: 0.35 }}>.</span>
        </h1>
        <div style={{ marginTop: 18, fontFamily: "ui-monospace,'SF Mono',Menlo,monospace", fontSize: 15, letterSpacing: '.14em', textTransform: 'uppercase', color: '#555', animation: 'mh-fadeUp .8s ease .75s both', display: 'flex', gap: 8, alignItems: 'baseline' }}>
          <span style={{ opacity: 0.4 }}>[</span>
          <span>{rotWord}</span>
          <span style={{ animation: 'mh-blink 1.1s step-end infinite' }}>▮</span>
          <span style={{ opacity: 0.4 }}>]</span>
        </div>
      </div>

      <div ref={hintRef} style={{ position: 'absolute', bottom: 34, left: '50%', transform: 'translateX(-50%)', fontFamily: 'ui-monospace,Menlo,monospace', fontSize: 12, letterSpacing: '.22em', color: '#999', animation: 'mh-bob 2.2s ease-in-out infinite' }}>
        SCROLL ▾
      </div>
    </div>
  );
}
