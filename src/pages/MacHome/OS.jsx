import React from 'react';
import Sections from './Sections';

// OS.jsx — the rhythmOS desktop that lives on the open MacBook screen: menu bar,
// 3x3 launcher grid, the section overlay, the ⌘K terminal, and the Naruto game.
// Rendered inside MacHome's fixed 1280x823 <div> that gets projected into 3D.

const mono = "ui-monospace,Menlo,monospace";

const TILES = [
  { glyph: '▦', label: 'Projects', sub: 'things I have shipped', sec: 'projects' },
  { glyph: '◐', label: 'About', sub: 'who I am', sec: 'about' },
  { glyph: '§', label: 'Research', sub: 'papers & experience', sec: 'research' },
  { glyph: '☰', label: 'Resume', sub: 'the formal version', sec: 'resume' },
  { glyph: '▧', label: 'Photography', sub: 'through my lens', sec: 'photos' },
  { glyph: '✎', label: 'Blog', sub: 'occasional writing', sec: 'blog' },
  { glyph: '♟', label: 'Hobbies', sub: 'piano → bouldering', sec: 'hobbies' },
  { glyph: '✆', label: 'Contact', sub: 'say hello', sec: 'contact' },
  { glyph: '❯_', label: 'Terminal', sub: 'for the brave — ⌘K', term: true },
];

const TITLES = { projects: 'Projects', about: 'About Me', research: 'Research & Experience', resume: 'Resume', photos: 'Photography', blog: 'Blog', hobbies: 'Hobbies & Life', contact: 'Contact' };

export default function OS(props) {
  const {
    clock, sec, onOpenSection, onCloseSection, onOpenTerminal, onBackToTop, onOpenGame,
    termOpen, termLines, termInput, termPrompt, onTermInput, onTermKey, termInputRef, termScrollRef, onCloseTerminal, onFocusTerminal,
    showGame, onCloseGame,
  } = props;

  return (
    <>
      {/* menu bar */}
      <div style={{ height: 44, flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 22px', borderBottom: '1px solid #0a0a0a', fontFamily: mono, fontSize: 12.5, letterSpacing: '.06em' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#0a0a0a', display: 'inline-block' }} />
          <strong style={{ letterSpacing: '.12em' }}>rhythmOS</strong>
          <span style={{ color: '#999' }}>— Rhythm Chawla</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, color: '#666' }}>
          <button className="mh-btn" onClick={onOpenTerminal} style={{ all: 'unset', cursor: 'pointer', padding: '4px 10px', border: '1px solid #ccc', borderRadius: 5, fontFamily: 'inherit', fontSize: 11.5 }}>⌘K terminal</button>
          <span>{clock}</span>
          <button className="mh-ghost" onClick={onBackToTop} style={{ all: 'unset', cursor: 'pointer', color: '#999' }}>⏏ close lid</button>
        </div>
      </div>

      {/* launcher grid */}
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gridTemplateRows: 'repeat(3,1fr)', gap: 1, background: '#0a0a0a', borderBottom: '1px solid #0a0a0a' }}>
        {TILES.map((t) => (
          <button key={t.label} className="mh-tile" onClick={() => (t.term ? onOpenTerminal() : onOpenSection(t.sec))}
            style={{ all: 'unset', boxSizing: 'border-box', cursor: 'pointer', background: '#f7f7f5', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', padding: '26px 30px' }}>
            <span style={{ fontSize: 30, lineHeight: 1 }}>{t.glyph}</span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
              <span style={{ fontFamily: mono, fontSize: 15, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase' }}>{t.label}</span>
              <span style={{ fontSize: 13, opacity: 0.55 }}>{t.sub}</span>
            </span>
          </button>
        ))}
      </div>

      {/* section overlay */}
      {sec && (
        <div style={{ position: 'absolute', inset: '44px 0 0', background: '#f7f7f5', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 18, padding: '20px 34px', borderBottom: '1px solid #e2e2de' }}>
            <button className="mh-btn" onClick={onCloseSection} style={{ all: 'unset', cursor: 'pointer', fontFamily: mono, fontSize: 13, padding: '6px 12px', border: '1px solid #ccc', borderRadius: 6 }}>‹ back</button>
            <h2 style={{ margin: 0, fontFamily: mono, fontSize: 15, fontWeight: 700, letterSpacing: '.22em', textTransform: 'uppercase' }}>{TITLES[sec]}</h2>
          </div>
          <div style={{ flex: 1, overflow: 'auto', padding: '40px 44px' }}>
            <Sections sec={sec} openGame={onOpenGame} />
          </div>
        </div>
      )}

      {/* terminal */}
      {termOpen && (
        <div onClick={onCloseTerminal} style={{ position: 'absolute', inset: 0, zIndex: 5, background: 'rgba(10,10,10,.35)', backdropFilter: 'blur(3px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: 760, height: 490, background: '#0d0d0d', borderRadius: 10, boxShadow: '0 40px 90px rgba(0,0,0,.5)', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ flex: 'none', height: 38, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', background: '#1a1a1a' }}>
              <button className="mh-termdot" onClick={onCloseTerminal} style={{ all: 'unset', cursor: 'pointer', width: 12, height: 12, borderRadius: '50%', background: '#555' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#333' }} />
              <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#333' }} />
              <span style={{ flex: 1, textAlign: 'center', fontFamily: mono, fontSize: 12, color: '#777' }}>rhythm@world — bash</span>
            </div>
            <div ref={termScrollRef} onClick={onFocusTerminal} style={{ flex: 1, overflow: 'auto', padding: '16px 18px', fontFamily: "ui-monospace,'SF Mono',Menlo,monospace", fontSize: 13.5, lineHeight: 1.65, color: '#e8e8e8', cursor: 'text' }}>
              {termLines.map((ln, i) => (
                <div key={i} style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', color: ln.color }}>{ln.text}</div>
              ))}
              <div style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                <span style={{ color: '#888' }}>{termPrompt}</span>
                <input ref={termInputRef} value={termInput} onChange={onTermInput} onKeyDown={onTermKey} spellCheck={false} autoComplete="off"
                  style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#fff', fontFamily: 'inherit', fontSize: 'inherit', caretColor: '#fff' }} />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* naruto game */}
      {showGame && (
        <div style={{ position: 'absolute', inset: 0, zIndex: 6, background: '#0a0a0a', display: 'flex', flexDirection: 'column' }}>
          <div style={{ flex: 'none', height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 18px', background: '#0a0a0a', color: '#f7f7f5', fontFamily: mono, fontSize: 12.5 }}>
            <span style={{ letterSpacing: '.14em' }}>HOKAGE ROOM — 3D PORTFOLIO GAME</span>
            <button className="mh-btn" onClick={onCloseGame} style={{ all: 'unset', cursor: 'pointer', padding: '5px 14px', border: '1px solid #555', borderRadius: 6 }}>✕ close</button>
          </div>
          <iframe title="Hokage Room" src="/naruto" style={{ flex: 1, border: 'none', width: '100%' }} />
        </div>
      )}
    </>
  );
}
