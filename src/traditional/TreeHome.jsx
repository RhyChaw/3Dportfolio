import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import './TreeHome.css';
import GlobeViewer from './GlobeViewer';
import {
  SECTIONS,
  HOBBIES,
  READING,
  LINKS,
  answerQuery,
  INTRO_MESSAGE,
  CHIPS,
} from './treeData';

const TREE_GLB = 'https://static.poly.pizza/712dc981-3f74-4e74-b31d-d8060709759f.glb';
const NODE_COLORS = [0xefe9e0, 0x7dd3a8, 0xd98b5f, 0xb88adb, 0xe8c98f];

const GLOBE_CREDIT =
  '“Vintage globe” (https://skfb.ly/6TRUM) by AnnaBelle Fibonacci is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).';

const INTRO_HTML = `
  <div style="font-family:'IBM Plex Mono',monospace;font-size:12px;letter-spacing:0.18em;color:#cdbfa6;text-transform:uppercase;margin-bottom:18px;text-shadow:0 2px 18px #000;">Seeking Fall 2026 co-op</div>
  <div style="font-family:'Instrument Serif',serif;font-size:66px;line-height:0.98;letter-spacing:-0.01em;text-shadow:0 4px 40px rgba(0,0,0,0.9);">Everything I build<br>grows from one root.</div>
  <div style="font-size:15px;color:#cdc5b7;margin-top:18px;line-height:1.55;max-width:480px;margin-left:auto;margin-right:auto;text-shadow:0 2px 18px #000;">CS at Waterloo (AI + HCI). Agentic AI engineer · founder · researcher — production systems at Carta, Cresta &amp; Franchise Foundry, co-founded G12Uni. Scroll down through the branches, then click one to dive in.</div>`;

const NAV_LINKS = [
  { label: 'GitHub', href: LINKS.github },
  { label: 'LinkedIn', href: LINKS.linkedin },
  { label: 'Email', href: `mailto:${LINKS.email}` },
  { label: 'Résumé ↗', href: LINKS.resume },
];

export default function TreeHome() {
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'a', text: INTRO_MESSAGE }]);
  const [activeSection, setActiveSection] = useState(null);
  const [expGroup, setExpGroup] = useState(0);
  const [pending, setPending] = useState(false);

  const rafRef = useRef(null);
  const streamRef = useRef(null);
  const targetP = useRef(0);
  const openSectionRef = useRef(() => {});
  const messagesRef = useRef([]);
  useEffect(() => { messagesRef.current = messages; }, [messages]);

  const openSection = useCallback((i) => {
    if (SECTIONS[i] && SECTIONS[i].kind === 'experience') setExpGroup(0);
    setActiveSection(i);
    const w = document.getElementById('world');
    if (w) { w.style.transform = 'scale(0.9) translateX(-5%)'; w.style.filter = 'blur(8px) brightness(0.45)'; }
    document.body.style.overflow = 'hidden';
  }, []);
  const closeSection = useCallback(() => {
    setActiveSection(null);
    const w = document.getElementById('world');
    if (w) { w.style.transform = ''; w.style.filter = ''; }
    document.body.style.overflow = '';
  }, []);
  const nextSection = useCallback(() => {
    setActiveSection((cur) => {
      const next = cur >= SECTIONS.length - 1 ? 1 : cur + 1;
      if (SECTIONS[next] && SECTIONS[next].kind === 'experience') setExpGroup(0);
      setTimeout(() => setActiveSection(next), 70);
      return null;
    });
  }, []);
  useEffect(() => { openSectionRef.current = openSection; }, [openSection]);

  const jumpTo = useCallback((p) => {
    const root = document.getElementById('scrollRoot');
    if (!root) return;
    const total = root.offsetHeight - window.innerHeight;
    window.scrollTo({ top: root.offsetTop + p * total, behavior: 'smooth' });
  }, []);

  // ---- chat ----
  const scrollChat = () => requestAnimationFrame(() => {
    const c = document.getElementById('chatScroll');
    if (c) c.scrollTop = c.scrollHeight;
  });
  const stream = useCallback((full) => {
    let idx;
    setMessages((m) => { idx = m.length; return [...m, { role: 'a', text: '' }]; });
    let i = 0;
    clearInterval(streamRef.current);
    streamRef.current = setInterval(() => {
      i += 2;
      setMessages((m) => {
        const copy = m.slice();
        if (copy[idx]) copy[idx] = { role: 'a', text: full.slice(0, i) };
        return copy;
      });
      scrollChat();
      if (i >= full.length) clearInterval(streamRef.current);
    }, 14);
  }, []);
  const send = useCallback((q) => {
    const text = (q != null ? q : input).trim();
    if (!text) return;
    setMessages((m) => [...m, { role: 'u', text }]);
    setInput('');
    setPending(true);
    scrollChat();
    const history = (messagesRef.current || [])
      .filter((m) => m.text && m.text.trim())
      .map((m) => ({ role: m.role === 'u' ? 'user' : 'assistant', content: m.text }));
    (async () => {
      let answer;
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ message: text, history }),
        });
        if (!res.ok) throw new Error('chat unavailable');
        const data = await res.json();
        answer = data && data.reply ? data.reply : answerQuery(text);
      } catch {
        answer = answerQuery(text); // graceful fallback to local answers
      }
      setPending(false);
      stream(answer);
    })();
  }, [input, stream]);
  const askChip = useCallback((label) => { setChatOpen(true); send(label); }, [send]);

  // ---- build the 3D world, overlays, rail, floats (imperative) ----
  useEffect(() => {
    const rail = document.getElementById('rail');
    if (rail && !rail.dataset.built) {
      rail.dataset.built = '1';
      SECTIONS.forEach((s, i) => {
        const row = document.createElement('div');
        row.style.cssText = 'display:flex;align-items:center;justify-content:flex-end;gap:10px;cursor:pointer;padding:7px 0;';
        row.onclick = () => jumpTo(s.p + (i === 0 ? 0 : 0.001));
        row.innerHTML =
          '<span class="rl" style="font-family:IBM Plex Mono,monospace;font-size:11px;letter-spacing:0.04em;color:#7a7163;transition:color .3s,opacity .3s;opacity:.5;">' + s.label + '</span>' +
          '<span class="rd" style="width:9px;height:9px;border-radius:50%;border:1px solid #5a5247;background:transparent;transition:all .3s;flex:none;"></span>';
        rail.appendChild(row);
      });
    }
    const ov = document.getElementById('overlays');
    if (ov && !ov.dataset.built) {
      ov.dataset.built = '1';
      SECTIONS.forEach((s, i) => {
        const el = document.createElement('div');
        el.id = 'ovl-' + i;
        el.style.cssText = 'position:absolute;left:7%;top:50%;transform:translateY(-50%);max-width:420px;opacity:0;transition:opacity .45s ease, transform .45s ease;will-change:opacity;';
        if (i === 0) {
          el.style.left = '50%'; el.style.top = '32%'; el.style.transform = 'translate(-50%,-50%)';
          el.style.textAlign = 'center'; el.style.maxWidth = '660px';
          el.innerHTML = INTRO_HTML;
        } else {
          el.style.cursor = 'pointer'; el.style.pointerEvents = 'auto';
          el.onclick = () => openSectionRef.current(i);
          el.innerHTML =
            '<div style="background:linear-gradient(135deg, rgba(12,9,6,0.82), rgba(12,9,6,0.5)); backdrop-filter:blur(10px); border:1px solid #2c271f; border-left:3px solid ' + s.color + '; border-radius:16px; padding:24px 26px; box-shadow:0 24px 60px rgba(0,0,0,0.55); transition:transform .25s ease;" ' +
              'onmouseover="this.style.transform=\'translateX(6px)\';" onmouseout="this.style.transform=\'\';">' +
              '<div style="display:flex;align-items:center;gap:11px;margin-bottom:14px;"><span style="width:10px;height:10px;border-radius:50%;background:' + s.color + ';box-shadow:0 0 16px ' + s.color + ';flex:none;"></span>' +
                '<span style="font-family:IBM Plex Mono,monospace;font-size:12px;letter-spacing:0.12em;text-transform:uppercase;color:' + s.color + ';">' + String(i).padStart(2, '0') + ' · branch · 0' + (SECTIONS.length - 1) + '</span></div>' +
              '<div style="font-family:Instrument Serif,serif;font-size:50px;line-height:1.0;color:#f4efe4;">' + s.short + '</div>' +
              '<div style="font-size:14.5px;color:#bcb4a5;margin-top:13px;line-height:1.55;">' + (s.blurb || '') + '</div>' +
              '<div style="display:inline-flex;align-items:center;gap:8px;margin-top:20px;font-size:13px;font-weight:600;color:#0c0a08;background:' + s.color + ';border-radius:22px;padding:9px 18px;">Explore ' + s.short + ' <span style="font-size:15px;">→</span></div>' +
            '</div>';
        }
        ov.appendChild(el);
      });
    }
    const fl = document.getElementById('floats');
    if (fl && !fl.dataset.built) {
      fl.dataset.built = '1';
      HOBBIES.forEach((h, i) => {
        const c = document.createElement('div');
        c.id = 'hob-' + i;
        c.style.cssText = 'position:absolute;left:' + h.x + ';top:' + h.y + ';opacity:0;transition:opacity .6s;animation:tree-drift ' + (9 + i * 1.6) + 's ease-in-out infinite;animation-delay:' + (i * 0.7) + 's;';
        c.innerHTML = '<div style="width:96px;height:118px;border-radius:12px;background:repeating-linear-gradient(135deg,#1b1813 0 9px,#221e17 9px 18px);border:1px solid #2c271f;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;box-shadow:0 14px 34px rgba(0,0,0,0.5);">' +
          '<span style="font-size:30px;">' + h.e + '</span>' +
          '<span style="font-family:IBM Plex Mono,monospace;font-size:9px;color:#8a8270;letter-spacing:0.04em;">' + h.l + '</span></div>';
        fl.appendChild(c);
      });
    }

    const onScroll = () => {
      const root = document.getElementById('scrollRoot');
      if (!root) return;
      const rect = root.getBoundingClientRect();
      const total = root.offsetHeight - window.innerHeight;
      targetP.current = Math.min(1, Math.max(0, -rect.top / total));
      const hint = document.getElementById('scrollHint');
      if (hint) hint.style.opacity = targetP.current > 0.02 ? '0' : '1';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const canvas = document.getElementById('treeCanvas');
    const W = canvas.clientWidth || window.innerWidth;
    const H = canvas.clientHeight || window.innerHeight;
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x070503, 0.017);
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 400);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xffe1b0, 1.6); key.position.set(6, 16, 9); scene.add(key);
    const rim = new THREE.DirectionalLight(0x86b6ff, 0.75); rim.position.set(-9, 5, -7); scene.add(rim);
    const under = new THREE.PointLight(0xe8c98f, 1.1, 70); under.position.set(0, -11, 5); scene.add(under);

    const group = new THREE.Group(); scene.add(group);
    const TOP = 15, BOT = -15;
    const lookY = (p) => (TOP - p * (TOP - BOT)) - 1.8;

    const nodes = SECTIONS.map((s, i) => {
      const c = NODE_COLORS[i % NODE_COLORS.length];
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.26, 18, 18),
        new THREE.MeshStandardMaterial({ color: c, emissive: c, emissiveIntensity: 1.4 })
      );
      m.position.set(0, lookY(s.p), 1.6); group.add(m); return m;
    });

    const TREE_H = 13.5;
    const loader = new GLTFLoader();
    loader.load(TREE_GLB, (gltf) => {
      const model = gltf.scene;
      const box = new THREE.Box3().setFromObject(model);
      const size = new THREE.Vector3(); box.getSize(size);
      const center = new THREE.Vector3(); box.getCenter(center);
      const scale = TREE_H / size.y;
      model.scale.setScalar(scale);
      model.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
      model.traverse((o) => { if (o.isMesh && o.material) { o.material.roughness = Math.min(1, (o.material.roughness ?? 0.6) + 0.15); } });
      const canopy = new THREE.Group(); canopy.add(model); group.add(canopy);
      const rootPivot = canopy.clone(true);
      rootPivot.rotation.x = Math.PI;
      rootPivot.traverse((o) => { if (o.isMesh && o.material) { o.material = o.material.clone(); if (o.material.color) o.material.color.multiplyScalar(0.5); if (o.material.emissive) o.material.emissive.setHex(0x140b05); o.material.roughness = 0.95; } });
      group.add(rootPivot);
    }, undefined, () => {});

    const onResize = () => {
      const w = canvas.clientWidth, h = canvas.clientHeight;
      camera.aspect = w / h; camera.updateProjectionMatrix(); renderer.setSize(w, h, false);
    };
    window.addEventListener('resize', onResize);

    const updateOverlays = (p) => {
      const sm = (c, w) => Math.max(0, 1 - Math.abs(p - c) / w);
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById('ovl-' + i); if (!el) return;
        const w = i === 0 ? 0.07 : 0.085;
        const o = sm(s.p, w);
        el.style.opacity = o.toFixed(3);
        if (i !== 0) el.style.transform = 'translateY(calc(-50% + ' + ((1 - o) * 26) + 'px))';
        el.style.pointerEvents = o > 0.4 ? 'auto' : 'none';
      });
      let active = 0, best = 9;
      SECTIONS.forEach((s, i) => { const d = Math.abs(p - s.p); if (d < best) { best = d; active = i; } });
      const railEl = document.getElementById('rail');
      if (railEl) [...railEl.children].forEach((row, i) => {
        const dot = row.querySelector('.rd'), lab = row.querySelector('.rl');
        const on = i === active;
        if (dot) { dot.style.background = on ? '#e8c98f' : 'transparent'; dot.style.borderColor = on ? '#e8c98f' : '#5a5247'; dot.style.transform = on ? 'scale(1.35)' : 'scale(1)'; dot.style.boxShadow = on ? '0 0 12px #e8c98f' : 'none'; }
        if (lab) { lab.style.color = on ? '#efe9e0' : '#7a7163'; lab.style.opacity = on ? '1' : '.5'; }
      });
      const flEl = document.getElementById('floats');
      if (flEl) {
        const base = Math.max(0, Math.min(1, (p - 0.32) / 0.18)) * Math.max(0.35, 1 - Math.max(0, (p - 0.95) / 0.05));
        [...flEl.children].forEach((c, i) => { c.style.opacity = (base * (0.7 + 0.3 * Math.sin(i))).toFixed(3); });
      }
    };

    let p = 0;
    const clock = new THREE.Clock();
    const tick = () => {
      const t = clock.getElapsedTime();
      p += (targetP.current - p) * 0.08;
      const camY = TOP - p * (TOP - BOT);
      // Camera is fixed on the trunk centerline — no cursor parallax.
      camera.position.set(0, camY, 12.5);
      camera.lookAt(0, camY - 1.8, 0);
      group.rotation.y += 0.0016 + p * 0.004;
      nodes.forEach((m, i) => { m.material.emissiveIntensity = 0.9 + Math.sin(t * 2 + i) * 0.5; });
      renderer.render(scene, camera);
      updateOverlays(p);
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      clearInterval(streamRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
      document.body.style.overflow = '';
    };
  }, [jumpTo]);

  const active = activeSection != null && SECTIONS[activeSection] ? SECTIONS[activeSection] : null;
  const nextIdx = activeSection >= SECTIONS.length - 1 ? 1 : activeSection + 1;

  const cardBox = (c, ci, color) => {
    const inner = (
      <div style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid #2a251e', borderRadius: 16, padding: '24px 26px', height: '100%', animation: `tree-riseIn .6s cubic-bezier(.2,.7,.2,1) ${(0.34 + ci * 0.06).toFixed(2)}s both` }}>
        <div style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", letterSpacing: '0.08em', color }}>{c.tag}</div>
        <div style={{ fontSize: 21, fontWeight: 600, color: '#f2ece0', marginTop: 12, letterSpacing: '-0.01em' }}>{c.t}</div>
        <div style={{ fontSize: 14.5, color: '#a89f90', marginTop: 9, lineHeight: 1.55 }}>{c.d}</div>
      </div>
    );
    return c.href
      ? <a key={ci} href={c.href} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>{inner}</a>
      : <div key={ci}>{inner}</div>;
  };

  return (
    <div className="tree-root">
      <div style={{ position: 'relative', height: '680vh', background: '#050505' }} id="scrollRoot">
        <div id="stage" style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', background: 'radial-gradient(130% 100% at 50% 0%, #14100c 0%, #070707 55%, #040404 100%)', fontFamily: "'Space Grotesk',sans-serif", color: '#efe9e0' }}>
          <div id="world" style={{ position: 'absolute', inset: 0, transition: 'transform .7s cubic-bezier(.2,.7,.2,1), filter .7s ease', transformOrigin: '50% 50%' }}>
            <canvas id="treeCanvas" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', background: 'radial-gradient(120% 90% at 50% 50%, transparent 55%, rgba(0,0,0,0.55) 100%)' }} />

            {/* navbar — all connect links live here */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 30px', zIndex: 30, pointerEvents: 'none', flexWrap: 'wrap', gap: 10 }}>
              <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 22, pointerEvents: 'auto' }}>Rhythm Chawla</div>
              <div style={{ display: 'flex', gap: 16, alignItems: 'center', pointerEvents: 'auto' }}>
                {NAV_LINKS.map((l) => (
                  <a key={l.label} href={l.href} target="_blank" rel="noreferrer" style={{ fontSize: 12.5, fontWeight: 500, color: '#cfc6b6', textDecoration: 'none' }}>{l.label}</a>
                ))}
                <div onClick={() => setChatOpen(true)} style={{ fontSize: 12, fontWeight: 600, color: '#0c0a08', background: '#e8c98f', borderRadius: 20, padding: '8px 16px', cursor: 'pointer' }}>Ask my AI</div>
              </div>
            </div>

            <div id="scrollHint" style={{ position: 'absolute', bottom: 96, left: '50%', transform: 'translateX(-50%)', zIndex: 20, textAlign: 'center', transition: 'opacity .5s', pointerEvents: 'none' }}>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.14em', color: '#9a8f7e', textTransform: 'uppercase' }}>scroll to descend the tree</div>
              <div style={{ fontSize: 18, color: '#e8c98f', marginTop: 6, animation: 'tree-pulse 1.8s infinite' }}>↓</div>
            </div>

            <div id="rail" style={{ position: 'absolute', right: 26, top: '50%', transform: 'translateY(-50%)', zIndex: 30, display: 'flex', flexDirection: 'column', gap: 2 }} />
            <div id="floats" style={{ position: 'absolute', inset: 0, zIndex: 15, pointerEvents: 'none' }} />
            <div id="overlays" style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }} />
          </div>

          {/* chatbot */}
          <div style={{ position: 'absolute', left: '50%', bottom: 26, transform: 'translateX(-50%)', zIndex: 40, width: 'min(680px,92vw)' }}>
            {chatOpen ? (
              <div style={{ background: 'rgba(16,14,11,0.92)', backdropFilter: 'blur(14px)', border: '1px solid #2c271f', borderRadius: 18, overflow: 'hidden', boxShadow: '0 24px 60px rgba(0,0,0,0.55)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', borderBottom: '1px solid #221e18' }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center', fontSize: 12, color: '#7dd3a8', fontFamily: "'IBM Plex Mono',monospace" }}>
                    <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#7dd3a8', animation: 'tree-pulse 1.6s infinite' }} />rhythm's agent · knows everything
                  </div>
                  <div onClick={() => setChatOpen(false)} style={{ fontSize: 16, color: '#8a8270', cursor: 'pointer', lineHeight: 1 }}>✕</div>
                </div>
                <div id="chatScroll" style={{ maxHeight: 230, overflowY: 'auto', padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {messages.map((m, i) => (
                    <div key={i} style={{ display: 'flex', justifyContent: m.role === 'u' ? 'flex-end' : 'flex-start' }}>
                      <div style={m.role === 'u'
                        ? { maxWidth: '78%', background: '#e8c98f', color: '#16120c', padding: '9px 13px', borderRadius: '14px 14px 4px 14px', fontSize: 13.5, lineHeight: 1.5, whiteSpace: 'pre-wrap' }
                        : { maxWidth: '84%', background: '#201c16', color: '#e3dccd', padding: '9px 13px', borderRadius: '14px 14px 14px 4px', fontSize: 13.5, lineHeight: 1.55, whiteSpace: 'pre-wrap' }}>{m.text}</div>
                    </div>
                  ))}
                  {pending && (
                    <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                      <div style={{ background: '#201c16', color: '#8a8270', padding: '9px 13px', borderRadius: '14px 14px 14px 4px', fontSize: 13.5 }}>
                        <span style={{ animation: 'tree-pulse 1.2s infinite' }}>● ● ●</span>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', padding: '0 18px 12px' }}>
                  {CHIPS.map((label) => (
                    <div key={label} onClick={() => askChip(label)} style={{ fontSize: 11, border: '1px solid #322c24', color: '#cfc6b6', borderRadius: 20, padding: '6px 12px', cursor: 'pointer' }}>{label}</div>
                  ))}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, borderTop: '1px solid #221e18', padding: '12px 16px' }}>
                  <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); send(); } }} placeholder="Ask anything about Rhythm…" style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', color: '#efe9e0', fontFamily: "'Space Grotesk',sans-serif", fontSize: 14 }} />
                  <div onClick={() => send()} style={{ width: 32, height: 32, borderRadius: '50%', background: '#e8c98f', color: '#0c0a08', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, cursor: 'pointer', flex: 'none' }}>↑</div>
                </div>
              </div>
            ) : (
              <div onClick={() => setChatOpen(true)} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'rgba(16,14,11,0.92)', backdropFilter: 'blur(14px)', border: '1px solid #2c271f', borderRadius: 30, padding: '13px 20px', cursor: 'pointer', boxShadow: '0 18px 44px rgba(0,0,0,0.5)' }}>
                <span style={{ width: 9, height: 9, borderRadius: '50%', background: '#7dd3a8', animation: 'tree-pulse 1.6s infinite', flex: 'none' }} />
                <span style={{ fontSize: 14, color: '#cfc6b6', flex: 1 }}>Ask anything about Rhythm — my AI actually knows</span>
                <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 10, color: '#8a8270' }}>↵</span>
              </div>
            )}
          </div>

          {/* branch detail page */}
          {active && (
            <div style={{ position: 'absolute', inset: 0, zIndex: 55, overflowY: 'auto', animation: 'tree-fadeIn .45s ease both', background: `radial-gradient(120% 90% at 80% 0%, ${active.color}22 0%, rgba(6,5,4,0.86) 45%, rgba(5,4,3,0.96) 100%)`, backdropFilter: 'blur(2px)' }}>
              <div style={{ minHeight: '100%', maxWidth: 1040, margin: '0 auto', padding: '84px 56px 64px', boxSizing: 'border-box' }}>
                <div onClick={closeSection} style={{ display: 'inline-flex', alignItems: 'center', gap: 9, fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: '#b7ada0', cursor: 'pointer', padding: '8px 14px 8px 0', animation: 'tree-riseIn .5s ease .02s both' }}>← back to the tree</div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 24, flexWrap: 'wrap' }}>
                  <div style={{ flex: '1 1 380px' }}>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 13, letterSpacing: '0.16em', textTransform: 'uppercase', color: active.color, marginTop: 26, animation: 'tree-riseIn .6s ease .08s both' }}>{String(activeSection).padStart(2, '0')} · branch · 0{SECTIONS.length - 1}</div>
                    <div style={{ fontFamily: "'Instrument Serif',serif", fontSize: 84, lineHeight: 0.98, marginTop: 14, animation: 'tree-riseIn .7s ease .14s both' }}>{active.short}</div>
                    <div style={{ height: 3, width: 84, background: active.color, borderRadius: 2, marginTop: 26, transformOrigin: 'left', animation: 'tree-lineGrow .6s cubic-bezier(.2,.7,.2,1) .26s both' }} />
                    <div style={{ fontSize: 20, lineHeight: 1.55, color: '#cdc5b7', marginTop: 26, maxWidth: 620, animation: 'tree-riseIn .7s ease .3s both' }}>{active.blurb}</div>
                  </div>
                  {active.kind === 'experience' && (
                    <div style={{ flex: '0 0 auto', textAlign: 'center', animation: 'tree-fadeIn .8s ease .3s both' }}>
                      <GlobeViewer size={260} />
                    </div>
                  )}
                </div>

                {/* EXPERIENCE — subsections */}
                {active.kind === 'experience' && (
                  <div style={{ marginTop: 40 }}>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 26 }}>
                      {active.groups.map((g, gi) => {
                        const on = gi === expGroup;
                        return (
                          <div key={g.id} onClick={() => setExpGroup(gi)} style={{ fontSize: 13, fontWeight: 600, cursor: 'pointer', padding: '9px 18px', borderRadius: 22, border: '1px solid ' + (on ? active.color : '#322c24'), color: on ? '#0c0a08' : '#cfc6b6', background: on ? active.color : 'transparent', transition: 'all .2s' }}>{g.label}</div>
                        );
                      })}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                      {active.groups[expGroup].items.map((it, ii) => (
                        <div key={ii} style={{ background: 'rgba(255,255,255,0.035)', border: '1px solid #2a251e', borderRadius: 16, padding: '24px 26px', animation: `tree-riseIn .5s cubic-bezier(.2,.7,.2,1) ${(0.05 + ii * 0.06).toFixed(2)}s both` }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 14, minWidth: 0 }}>
                              {it.logo && (
                                <img src={it.logo} alt={`${it.org} logo`} style={{ width: 40, height: 40, borderRadius: 9, objectFit: 'cover', background: '#fff', padding: 3, flex: 'none' }} />
                              )}
                              <div style={{ fontSize: 21, fontWeight: 600, color: '#f2ece0' }}>{it.title}{it.org ? <span style={{ color: '#a89f90', fontWeight: 400 }}> · {it.org}</span> : null}</div>
                            </div>
                            <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: active.color }}>{it.year}</div>
                          </div>
                          <ul style={{ margin: '14px 0 0', paddingLeft: 18, color: '#bcb4a5', fontSize: 14.5, lineHeight: 1.6 }}>
                            {it.bullets.map((b, bi) => <li key={bi} style={{ marginBottom: 6 }}>{b}</li>)}
                          </ul>
                          {it.tags.length > 0 && (
                            <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap', marginTop: 14 }}>
                              {it.tags.map((tg) => <span key={tg} style={{ fontSize: 11, fontFamily: "'IBM Plex Mono',monospace", color: '#9a907e', border: '1px solid #2c271f', borderRadius: 14, padding: '4px 10px' }}>{tg}</span>)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div style={{ marginTop: 30, fontSize: 11, lineHeight: 1.5, color: '#6f6757' }}>{GLOBE_CREDIT}</div>
                  </div>
                )}

                {/* CARDS — projects & certifications */}
                {active.kind === 'cards' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18, marginTop: 46 }}>
                    {(active.cards || []).map((c, ci) => cardBox(c, ci, active.color))}
                  </div>
                )}

                {/* ME — reading + hobbies */}
                {active.kind === 'me' && (
                  <div style={{ marginTop: 40 }}>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: active.color, marginBottom: 16 }}>Off the clock</div>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 36 }}>
                      {HOBBIES.map((h) => (
                        <div key={h.l} style={{ display: 'flex', alignItems: 'center', gap: 8, border: '1px solid #2c271f', borderRadius: 22, padding: '9px 16px', fontSize: 14, color: '#cfc6b6' }}><span style={{ fontSize: 18 }}>{h.e}</span>{h.l}</div>
                      ))}
                    </div>
                    <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, letterSpacing: '0.12em', textTransform: 'uppercase', color: active.color, marginBottom: 16 }}>On the shelf</div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 18 }}>
                      {READING.map((b, ci) => cardBox({ t: b.title, d: b.takeaway, tag: `📖 ${b.author}` }, ci, active.color))}
                    </div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: 10, marginTop: 46, flexWrap: 'wrap', animation: 'tree-riseIn .7s ease .5s both' }}>
                  <div onClick={nextSection} style={{ fontSize: 13, fontWeight: 600, color: '#0c0a08', background: active.color, borderRadius: 24, padding: '11px 20px', cursor: 'pointer' }}>Next: {SECTIONS[nextIdx].short} →</div>
                  <div onClick={() => { const a = active; closeSection(); setChatOpen(true); setTimeout(() => send('Tell me about your ' + a.short.toLowerCase()), 300); }} style={{ fontSize: 13, fontWeight: 500, color: '#efe9e0', border: '1px solid #3a342c', borderRadius: 24, padding: '11px 20px', cursor: 'pointer' }}>Ask my AI about this ↗</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <a href="/naruto" style={{ position: 'fixed', bottom: 18, right: 18, zIndex: 60, fontFamily: "'IBM Plex Mono',monospace", fontSize: 11, letterSpacing: '0.08em', color: '#8a8270', background: 'rgba(16,14,11,0.85)', border: '1px solid #2c271f', borderRadius: 20, padding: '8px 14px', textDecoration: 'none' }}>enter 3D world ↗</a>
    </div>
  );
}
