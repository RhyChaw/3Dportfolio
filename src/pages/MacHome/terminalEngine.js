// terminalEngine.js — pure command interpreter for the rhythmOS terminal.
// execute(raw, cwd) returns { printLines, patch } where patch describes state
// changes for MacHome to apply (cwd / open section / launch game / clear / close).

const VFS = {
  '~': ['projects/', 'photos/', 'blog/', 'hobbies/', 'about.md', 'resume.pdf', 'contact.txt', '.secrets'],
  '~/projects': ['hokage-room.app', 'palace-ai.md', 'network-mcp.md', 'parmanu.md', 'pipette-pro.md'],
  '~/photos': ['drop-your-photos-here.txt'],
  '~/blog': ['post-placeholder.md'],
  '~/hobbies': ['piano.md', 'guitar.md', 'coffee.md', 'bouldering.md', 'badminton.md', 'chess.md', 'swimming.md', 'gym.md', 'basketball.md'],
};

const FILES = {
  'about.md': 'Rhythm Chawla — builder · founder · CS student · AI/ML engineer.\nTip: `open about` for the pretty version.',
  'contact.txt': 'email: r3chawla@uwaterloo.ca\ngithub: github.com/RhyChaw\nlinkedin: linkedin.com/in/rhythm-chawla-18723a231',
  'resume.pdf': '[binary blob] — try `open resume`',
  '.secrets': 'nice try. but here is one: type `naruto`',
  'hokage-room.app': '[executable] — try `open naruto`',
  'palace-ai.md': 'Memory palace for AI agents. 42x token reduction, zero API key.',
  'network-mcp.md': 'Ask your 1,700 LinkedIn connections in plain English.',
  'parmanu.md': 'Learned mesoscopic matter primitives. One engine, any material.',
  'pipette-pro.md': 'Best Prototype — Google × UWaterloo Symposium.',
  'coffee.md': 'daily driver: flat white, double shot.',
  'chess.md': '1. e4 — challenge me.',
  'piano.md': 'currently learning: something by Ludovico.',
  'bouldering.md': 'projecting V5. fingers hurt.',
};

const SECTIONS = ['projects', 'about', 'research', 'resume', 'photos', 'blog', 'hobbies', 'contact'];

export function execute(raw, cwd) {
  const promptLine = { text: `rhythm@world:${cwd}$ ${raw}`, color: '#8f8f8f' };
  const cmd = raw.trim();
  if (!cmd) return { printLines: [promptLine], patch: {} };

  const [c, ...args] = cmd.split(/\s+/);
  const a = args.join(' ');
  const out = [];
  const say = (text, color) => out.push({ text, color: color || '#e8e8e8' });

  switch (c) {
    case 'help':
      say('commands:', '#aaa');
      say('  ls · cd <dir> · cat <file> · pwd · clear · whoami · date');
      say('  open <section>   → ' + SECTIONS.join(' | '));
      say('  open naruto      → launch the 3D portfolio game');
      say('  neofetch · coffee · chess  → …try them', '#777');
      break;
    case 'ls': {
      const list = VFS[cwd];
      say(list ? list.filter(f => f !== '.secrets' || a === '-a').join('   ') : '');
      break;
    }
    case 'pwd': say(cwd.replace('~', '/home/rhythm')); break;
    case 'cd': {
      if (!a || a === '~' || a === '/') return { printLines: [promptLine], patch: { cwd: '~' } };
      if (a === '..') return { printLines: [promptLine], patch: { cwd: '~' } };
      const target = '~/' + a.replace(/\/$/, '').replace(/^~\//, '');
      if (VFS[target]) return { printLines: [promptLine], patch: { cwd: target } };
      say(`cd: no such directory: ${a}`, '#ff7b72');
      break;
    }
    case 'cat': {
      const f = a.replace(/\/$/, '');
      if (FILES[f]) FILES[f].split('\n').forEach(l => say(l));
      else if (!f) say('cat: missing file', '#ff7b72');
      else say(`cat: ${f}: no such file (or it's a placeholder)`, '#ff7b72');
      break;
    }
    case 'whoami': say('rhythm — builder · founder · ai engineer · student'); break;
    case 'date': say(new Date().toString()); break;
    case 'clear': return { printLines: [], patch: { clear: true } };
    case 'open': {
      const target = a.replace(/\/$/, '');
      if (target === 'naruto' || target === 'hokage-room.app' || target === 'game') return { printLines: [promptLine], patch: { showGame: true, closeTerm: true } };
      if (target === 'photography') return { printLines: [promptLine], patch: { sec: 'photos', closeTerm: true } };
      if (target === 'cv' || target === 'resume.pdf') return { printLines: [promptLine], patch: { sec: 'resume', closeTerm: true } };
      if (SECTIONS.includes(target)) return { printLines: [promptLine], patch: { sec: target, closeTerm: true } };
      say(`open: don't know how to open '${a}'`, '#ff7b72');
      break;
    }
    case 'naruto': return { printLines: [promptLine], patch: { showGame: true, closeTerm: true } };
    case 'neofetch':
      say('        ██████        rhythm@world', '#fff');
      say('      ██      ██      ------------', '#fff');
      say('     ██  ●  ●  ██     OS: rhythmOS 2.0 (monochrome)', '#ccc');
      say('     ██   ▽   ██      Shell: bash (simulated, sorry)', '#ccc');
      say('      ██      ██      Uptime: since 2004', '#ccc');
      say('        ██████        Theme: black & white [always]', '#ccc');
      say('                      Hobbies: 9 mounted at /hobbies', '#ccc');
      break;
    case 'coffee': say('☕ brewing… done. productivity +20%.'); break;
    case 'chess': say('♟ 1. e4 e5 2. Ke2!? — bongcloud opening. your move.'); break;
    case 'sudo': say('rhythm is not in the sudoers file. this incident will be reported. 👀'); break;
    case 'echo': say(a); break;
    case 'exit': return { printLines: [promptLine], patch: { closeTerm: true } };
    default: say(`bash: ${c}: command not found — try \`help\``, '#ff7b72');
  }
  return { printLines: [promptLine, ...out], patch: {} };
}
