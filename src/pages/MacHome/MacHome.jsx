import React from 'react';
import './macHome.css';
import Landing from './Landing';
import OS from './OS';
import { createMacbookScene } from './macbookScene';
import { quadTransform } from './homography';
import { execute } from './terminalEngine';

// MacHome.jsx — the "/" homepage. Orchestrates the scroll choreography: it owns
// state + refs, runs the rAF loop that drives the three.js MacBook (macbookScene)
// and projects the rhythmOS <div> onto the open screen (homography). Ported from
// the original rhythmOS design's DCLogic class.

const ROT_WORDS = ['builder', 'founder', 'ai engineer', 'ml engineer', 'software dev', 'entrepreneur', 'student'];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
const ease = (x) => x * x * (3 - 2 * x);

export default class MacHome extends React.Component {
  state = {
    rotIdx: 0,
    clock: '',
    sec: null,
    termOpen: false,
    termLines: [
      { text: 'rhythmOS v2.0 — type `help` to get started', color: '#888' },
      { text: '', color: '#888' },
    ],
    termInput: '',
    cwd: '~',
    showGame: false,
  };

  canvasWrap = React.createRef();
  landing = React.createRef();
  hint = React.createRef();
  tag1 = React.createRef();
  tag2 = React.createRef();
  os = React.createRef();
  termInputEl = React.createRef();
  termScroll = React.createRef();

  hist = [];
  histIdx = null;
  smooth = 0;

  componentDidMount() {
    this._mounted = true;
    this.rotTimer = setInterval(() => this.setState((s) => ({ rotIdx: (s.rotIdx + 1) % ROT_WORDS.length })), 2100);
    this.clockTimer = setInterval(this.tickClock, 1000);
    this.tickClock();
    this.raf = requestAnimationFrame(this.loop);

    this.keyHandler = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); this.setState((s) => ({ termOpen: !s.termOpen })); }
      else if (e.key === 'Escape') {
        if (this.state.showGame) this.setState({ showGame: false });
        else if (this.state.termOpen) this.setState({ termOpen: false });
        else if (this.state.sec) this.setState({ sec: null });
      }
    };
    window.addEventListener('keydown', this.keyHandler);

    if (this.canvasWrap.current) {
      const wrap = this.canvasWrap.current;
      createMacbookScene(wrap, { laptopColor: this.props.laptopColor || 'silver' }).then((scene) => {
        if (!scene) return;
        if (!this._mounted || this.canvasWrap.current !== wrap) { scene.dispose(); return; }
        if (this.scene) this.scene.dispose();
        this.scene = scene;
      });
    }

    if (this.props.skipIntro) {
      setTimeout(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        window.scrollTo(0, max); this.smooth = max;
      }, 60);
    }
  }

  componentWillUnmount() {
    this._mounted = false;
    clearInterval(this.rotTimer);
    clearInterval(this.clockTimer);
    cancelAnimationFrame(this.raf);
    window.removeEventListener('keydown', this.keyHandler);
    if (this.scene) this.scene.dispose();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.termOpen && !prevState.termOpen) setTimeout(() => this.termInputEl.current && this.termInputEl.current.focus(), 30);
    if (this.termScroll.current) this.termScroll.current.scrollTop = this.termScroll.current.scrollHeight;
    if (this.scene && prevProps.laptopColor !== this.props.laptopColor) this.scene.applyBodyColor(this.props.laptopColor || 'silver');
  }

  tickClock = () => {
    const t = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    if (t !== this.state.clock) this.setState({ clock: t });
  };

  loop = (t) => {
    this.raf = requestAnimationFrame(this.loop);
    const vh = innerHeight;
    const target = scrollY;
    this.smooth += (target - this.smooth) * 0.085;
    if (Math.abs(target - this.smooth) < 0.3) this.smooth = target;
    const p = this.smooth / vh;
    const range = (a, b) => clamp((p - a) / (b - a), 0, 1);

    // landing fade/lift
    const landing = this.landing.current;
    if (landing) {
      const out = ease(range(0.05, 0.9));
      landing.style.opacity = String(1 - out);
      landing.style.transform = `translateY(${-out * 26}vh) scale(${1 - out * 0.06})`;
      landing.style.pointerEvents = out > 0.5 ? 'none' : '';
      landing.style.visibility = out >= 1 ? 'hidden' : 'visible';
    }
    // taglines
    if (this.tag1.current) this.tag1.current.style.opacity = String(ease(range(1.15, 1.5)) * (1 - ease(range(2.0, 2.4))));
    if (this.tag2.current) this.tag2.current.style.opacity = String(ease(range(2.5, 2.9)) * (1 - ease(range(3.3, 3.7))));

    // three.js MacBook + OS projection
    const os = this.os.current;
    if (this.scene) {
      const r = this.scene.update(p, t);
      if (os) {
        if (r.hideOs) { os.style.opacity = '0'; os.style.pointerEvents = 'none'; }
        else {
          os.style.transform = quadTransform(1280, 823, r.quad);
          os.style.opacity = String(r.osIn);
          os.style.pointerEvents = r.osInteractive ? 'auto' : 'none';
        }
      }
    } else if (os) {
      // WebGL unavailable → plain full-screen OS
      const osIn = ease(range(4.6, 5.2));
      const scv = Math.min(innerWidth / 1280, innerHeight / 823);
      os.style.transform = `translate(${(innerWidth - 1280 * scv) / 2}px,${(innerHeight - 823 * scv) / 2}px) scale(${scv})`;
      os.style.opacity = String(osIn);
      os.style.pointerEvents = osIn > 0.85 ? 'auto' : 'none';
    }
  };

  runCommand = (raw) => {
    const { printLines, patch } = execute(raw, this.state.cwd);
    this.setState((s) => {
      const next = {};
      next.termLines = patch.clear ? [] : [...s.termLines, ...printLines].slice(-200);
      if (patch.cwd) next.cwd = patch.cwd;
      if (patch.sec) { next.sec = patch.sec; next.termOpen = false; }
      if (patch.showGame) { next.showGame = true; next.termOpen = false; }
      if (patch.closeTerm) next.termOpen = false;
      return next;
    });
  };

  onTermKey = (e) => {
    if (e.key === 'Enter') {
      const v = this.state.termInput;
      if (v.trim()) this.hist.push(v);
      this.histIdx = null;
      this.setState({ termInput: '' });
      this.runCommand(v);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (this.hist.length) {
        this.histIdx = this.histIdx === null ? this.hist.length - 1 : Math.max(0, this.histIdx - 1);
        this.setState({ termInput: this.hist[this.histIdx] });
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (this.histIdx !== null) {
        this.histIdx = Math.min(this.hist.length - 1, this.histIdx + 1);
        this.setState({ termInput: this.hist[this.histIdx] });
      }
    }
  };

  render() {
    const s = this.state;
    const tagStyle = { position: 'fixed', inset: 0, zIndex: 2, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '12vh', pointerEvents: 'none', opacity: 0 };
    const pStyle = { margin: 0, fontSize: 'clamp(28px,3.6vw,48px)', fontWeight: 700, letterSpacing: '-0.03em', textAlign: 'center' };
    return (
      <div className="mh-root">
        {/* fixed 3D stage */}
        <div ref={this.canvasWrap} style={{ position: 'fixed', inset: 0, zIndex: 0 }} />

        <Landing landingRef={this.landing} hintRef={this.hint} rotWord={ROT_WORDS[s.rotIdx]} />

        {/* tagline beats */}
        <div ref={this.tag1} style={tagStyle}><p style={pStyle}>Everything I build.<span style={{ color: '#999' }}> Everything I am.</span></p></div>
        <div ref={this.tag2} style={tagStyle}><p style={pStyle}>One machine.<span style={{ color: '#999' }}> Keep scrolling.</span></p></div>

        {/* scroll spacer */}
        <div style={{ height: '660vh' }} />

        {/* rhythmOS — projected onto the MacBook screen */}
        <div ref={this.os} style={{ position: 'fixed', left: 0, top: 0, width: 1280, height: 823, zIndex: 3, background: '#f7f7f5', opacity: 0, pointerEvents: 'none', display: 'flex', flexDirection: 'column', transformOrigin: '0 0', overflow: 'hidden', borderRadius: 8, willChange: 'transform' }}>
          <OS
            clock={s.clock}
            sec={s.sec}
            onOpenSection={(sec) => this.setState({ sec })}
            onCloseSection={() => this.setState({ sec: null })}
            onOpenTerminal={() => this.setState({ termOpen: true })}
            onBackToTop={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            onOpenGame={() => this.setState({ showGame: true })}
            termOpen={s.termOpen}
            termLines={s.termLines}
            termInput={s.termInput}
            termPrompt={`rhythm@world:${s.cwd}$`}
            onTermInput={(e) => this.setState({ termInput: e.target.value })}
            onTermKey={this.onTermKey}
            termInputRef={this.termInputEl}
            termScrollRef={this.termScroll}
            onCloseTerminal={() => this.setState({ termOpen: false })}
            onFocusTerminal={() => this.termInputEl.current && this.termInputEl.current.focus()}
            showGame={s.showGame}
            onCloseGame={() => this.setState({ showGame: false })}
          />
        </div>
      </div>
    );
  }
}
