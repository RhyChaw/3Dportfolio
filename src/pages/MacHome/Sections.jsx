import React from 'react';
import { top10Projects as projectsData } from '../ProjectsData';
import sky from '../../assets/sky.jpg';
import konoha from '../../assets/konoha.jpg';
import sPhoto from '../../assets/s.jpg';

// Sections.jsx — the eight rhythmOS screens, wired to Rhythm's real content.
// This is the main place to edit "the inside of the macbook".

const mono = "ui-monospace,Menlo,monospace";

// ---- real experience timeline (from src/pages/Experience.jsx) ----
const RESEARCH = [
  { year: 'Jan–Apr 2026', title: 'Software Engineer Intern · Carta (Maple), Kitchener', detail: 'Backend services in Python/Django for high-volume financial compensation pipelines (1M+ records/mo). gRPC across distributed services cut latency 30%. Docker, Jenkins, Kubernetes, Datadog, Sentry.' },
  { year: 'Aug 2025', title: 'Associate Conversation Design Intern · Cresta AI (Series D)', detail: 'Built an LLM-powered redaction auditor that cut manual QA time 60%. Automated annotation workflows (Apps Script), saving 10+ hrs/week. Tuned Opera/Director for 10+ client deployments, +30% bot accuracy.' },
  { year: 'Aug 2024', title: 'Software Engineer · G12Uni (Co-Founder)', detail: 'Co-founded a global student network with 1,500+ users. Partnered with Google for Education Startups via eCoop & Conrad. Rebuilt the platform in React/Vite; APIs for Meet, maps, avatars, chat.' },
  { year: '2023–2025', title: 'Fullstack / Freelance · Zafari, MettaStars, Vasanta Bhavan', detail: 'SEO-optimized Next.js sites, an education NGO platform, and a ReactJS + Firebase admin panel (order tracking, staff, analytics) deployed across Oman.' },
];

const HOBBIES = [
  ['♪', 'Piano'], ['♬', 'Guitar'], ['◍', 'Coffee'], ['▲', 'Bouldering'],
  ['✦', 'Badminton'], ['♟', 'Chess'], ['≈', 'Swimming'], ['▣', 'Gym'], ['●', 'Basketball'],
];

const PHOTOS = [sky, konoha, sPhoto];

function ProjectCard({ p }) {
  const label = (p.category || '').toUpperCase();
  return (
    <a className="mh-card" href={p.link || p.git || '#'} target={p.link || p.git ? '_blank' : undefined} rel="noreferrer"
       style={{ border: '1px solid #d8d8d4', padding: 24, display: 'flex', flexDirection: 'column', gap: 10, textDecoration: 'none', color: 'inherit' }}>
      <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.16em', color: '#999' }}>{label}</span>
      <h3 style={{ margin: 0, fontSize: 22, letterSpacing: '-.02em' }}>{p.title}</h3>
      <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, color: '#666' }}>{p.hook || p.description}</p>
      {p.date && <span style={{ marginTop: 'auto', fontFamily: mono, fontSize: 11, color: '#bbb' }}>{p.date}</span>}
    </a>
  );
}

export default function Sections({ sec, openGame }) {
  switch (sec) {
    case 'projects':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))', gap: 20, maxWidth: 1200 }}>
          <div style={{ border: '1px solid #0a0a0a', padding: 24, display: 'flex', flexDirection: 'column', gap: 10, background: '#0a0a0a', color: '#f7f7f5' }}>
            <span style={{ fontFamily: mono, fontSize: 11, letterSpacing: '.16em', opacity: 0.6 }}>FEATURED · 3D GAME</span>
            <h3 style={{ margin: 0, fontSize: 22, letterSpacing: '-.02em' }}>Hokage Room</h3>
            <p style={{ margin: 0, fontSize: 14, lineHeight: 1.5, opacity: 0.75 }}>Naruto runs around a 3D room and interacts with live sections of my portfolio.</p>
            <button className="mh-playbtn" onClick={openGame} style={{ all: 'unset', cursor: 'pointer', marginTop: 6, alignSelf: 'flex-start', padding: '8px 16px', border: '1px solid #f7f7f5', borderRadius: 6, fontFamily: mono, fontSize: 12.5 }}>▶ play</button>
          </div>
          {projectsData.map((p, i) => <ProjectCard key={i} p={p} />)}
        </div>
      );

    case 'about':
      return (
        <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <p style={{ margin: 0, fontSize: 'clamp(24px,2.6vw,34px)', fontWeight: 600, letterSpacing: '-.02em', lineHeight: 1.3, textWrap: 'pretty' }}>
            Builder, founder, and CS student at the University of Waterloo — I ship AI products, do ML research, and spend the rest of my time on walls, keys, and boards.
          </p>
          <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: '#555' }}>
            Right now: Software Engineer at Carta and building tools like palace-ai and Network MCP. Previously co-founded G12Uni (1,500+ users) and worked on conversation AI at Cresta. I like turning hard, ambiguous problems into things people can actually use.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
            {HOBBIES.map(([, label]) => (
              <span key={label} style={{ padding: '6px 14px', border: '1px solid #0a0a0a', borderRadius: 999, fontFamily: mono, fontSize: 12 }}>{label.toLowerCase()}</span>
            ))}
          </div>
        </div>
      );

    case 'research':
      return (
        <div style={{ maxWidth: 820, display: 'flex', flexDirection: 'column' }}>
          {RESEARCH.map((r, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 24, padding: '26px 0', borderBottom: i < RESEARCH.length - 1 ? '1px solid #e2e2de' : 'none' }}>
              <span style={{ fontFamily: mono, fontSize: 13, color: '#999' }}>{r.year}</span>
              <div>
                <h3 style={{ margin: '0 0 6px', fontSize: 20, letterSpacing: '-.02em' }}>{r.title}</h3>
                <p style={{ margin: 0, fontSize: 14.5, lineHeight: 1.6, color: '#555' }}>{r.detail}</p>
              </div>
            </div>
          ))}
        </div>
      );

    case 'resume':
      return (
        <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 20, alignItems: 'flex-start' }}>
          <a className="mh-card" href="/resumes/resume.pdf" target="_blank" rel="noreferrer"
             style={{ width: '100%', border: '1px solid #0a0a0a', padding: 34, display: 'flex', alignItems: 'center', gap: 22, textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: 40 }}>☰</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <strong style={{ fontSize: 19, letterSpacing: '-.01em' }}>rhythm_chawla_resume.pdf</strong>
              <span style={{ fontFamily: mono, fontSize: 12, color: '#999' }}>click to open →</span>
            </div>
          </a>
          <span style={{ fontFamily: mono, fontSize: 12.5, color: '#999' }}>tip: `open resume` works in the terminal too</span>
        </div>
      );

    case 'photos':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(280px,1fr))', gap: 14, maxWidth: 1200 }}>
          {PHOTOS.map((src, i) => (
            <img key={i} src={src} alt={`Photo ${i + 1}`} style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block', border: '1px solid #e2e2de' }} />
          ))}
        </div>
      );

    case 'blog':
      return (
        <div style={{ maxWidth: 760, display: 'flex', flexDirection: 'column' }}>
          <a className="mh-link" href="#" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'baseline', padding: '24px 0', borderBottom: '1px solid #e2e2de', textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-.02em' }}>Writing coming soon</span>
            <span style={{ fontFamily: mono, fontSize: 12.5, color: '#999' }}>2026</span>
          </a>
          <a className="mh-link" href="https://github.com/RhyChaw" target="_blank" rel="noreferrer" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 20, alignItems: 'baseline', padding: '24px 0', textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: 20, fontWeight: 600, letterSpacing: '-.02em' }}>Until then, see what I'm building on GitHub</span>
            <span style={{ fontFamily: mono, fontSize: 12.5, color: '#999' }}>→</span>
          </a>
        </div>
      );

    case 'hobbies':
      return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,minmax(200px,280px))', gap: 1, background: '#0a0a0a', border: '1px solid #0a0a0a', width: 'fit-content' }}>
          {HOBBIES.map(([glyph, label]) => (
            <div key={label} className="mh-hobby" style={{ background: '#f7f7f5', padding: 28, display: 'flex', flexDirection: 'column', gap: 8 }}>
              <span style={{ fontSize: 26 }}>{glyph}</span>
              <strong style={{ fontFamily: mono, fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase' }}>{label}</strong>
            </div>
          ))}
        </div>
      );

    case 'contact':
      return (
        <div style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 0 }}>
          <p style={{ margin: '0 0 30px', fontSize: 'clamp(26px,3vw,38px)', fontWeight: 700, letterSpacing: '-.03em' }}>Let's build something<span style={{ color: '#999' }}>.</span></p>
          <a className="mh-link" href="mailto:r3chawla@uwaterloo.ca" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderTop: '1px solid #0a0a0a', textDecoration: 'none', color: 'inherit', fontFamily: mono, fontSize: 14 }}><span>email</span><span style={{ color: '#999' }}>r3chawla@uwaterloo.ca →</span></a>
          <a className="mh-link" href="https://github.com/RhyChaw" target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderTop: '1px solid #0a0a0a', textDecoration: 'none', color: 'inherit', fontFamily: mono, fontSize: 14 }}><span>github</span><span style={{ color: '#999' }}>github.com/RhyChaw →</span></a>
          <a className="mh-link" href="https://www.linkedin.com/in/rhythm-chawla-18723a231/" target="_blank" rel="noreferrer" style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderTop: '1px solid #0a0a0a', borderBottom: '1px solid #0a0a0a', textDecoration: 'none', color: 'inherit', fontFamily: mono, fontSize: 14 }}><span>linkedin</span><span style={{ color: '#999' }}>in/rhythm-chawla →</span></a>
        </div>
      );

    default:
      return null;
  }
}
