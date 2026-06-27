// treeData.js
// Maps the SAME real data the rest of the site (and the Notion/MCP hub) uses into
// the Tree experience's branches, and powers the local chatbot. Single source of
// truth: ProjectsData + TradExp exports. Keep this matching the Notion hub.

import { top10Projects } from '../pages/ProjectsData';
import {
  professionalExperience,
  founderJourney,
  freelanceWork,
  openSource,
} from './TradExp';

const cleanRole = (title) => title.split('|')[0].trim();
const orgOf = (title) => (title.split('|')[1] || '').trim();
const bulletsOf = (detail) =>
  String(detail || '')
    .split('\n')
    .map((b) => b.replace(/^[-*]\s*/, '').trim())
    .filter(Boolean);
const firstBullet = (detail) => bulletsOf(detail)[0] || '';

const projByTitle = (needle) =>
  top10Projects.find((p) => p.title.toLowerCase().includes(needle.toLowerCase()));

// Experience entry → rich item (for the Experience subsections).
const expItem = (e) => ({
  title: cleanRole(e.title),
  org: orgOf(e.title),
  logo: e.logo || null,
  year: e.year,
  bullets: bulletsOf(e.detail),
  tags: e.techTags || [],
});

// Project → card.
const projCardOf = (p) => ({
  t: p.title.split(':')[0].split('(')[0].trim(),
  d: p.hook || (p.description || '').slice(0, 130),
  tag: (p.tech || '').split(',').slice(0, 2).map((s) => s.trim()).join(' · '),
  href: p.git || p.link || null,
});

// ---- Reading (from the Notion Reading database) ----------------------------
export const READING = [
  { title: 'The Starfish and the Spider', author: 'Brafman & Beckstrom', takeaway: 'Decentralized, leaderless orgs — mirrors my swarm-robotics & multi-agent work.' },
  { title: 'The Wisdom of Crowds', author: 'James Surowiecki', takeaway: 'Collective intelligence and emergence from many independent agents.' },
  { title: 'Range', author: 'David Epstein', takeaway: 'Breadth beats early specialization — the generalist thesis I live by.' },
  { title: 'The Psychology of Money', author: 'Morgan Housel', takeaway: 'Behavior matters more than spreadsheets.' },
  { title: 'The Five Dysfunctions of a Team', author: 'Patrick Lencioni', takeaway: 'Trust is the foundation of high-performing teams.' },
  { title: 'First, Break All the Rules', author: 'Buckingham & Coffman', takeaway: 'Build on strengths rather than fixing weaknesses.' },
  { title: 'Parable of the Sower', author: 'Octavia E. Butler', takeaway: 'Resilience and building community amid collapse.' },
  { title: 'The Book Thief', author: 'Markus Zusak', takeaway: 'The power of words and stories.' },
];

// ---- Certifications / achievements (from the Notion Achievements database) --
export const CERTS = [
  { t: 'Best Prototype — Google × UWaterloo Symposium', d: 'University of Waterloo · Future of Work Institute', tag: 'Nov 2025', href: 'https://pipettepro.vercel.app' },
  { t: "President's Scholarship of Distinction", d: 'University of Waterloo', tag: 'Sep 2024' },
  { t: 'Undergraduate Research Assistant (URA)', d: 'University of Waterloo · Prof. Edith Law', tag: 'Dec 2025' },
  { t: 'TCPS 2 — Research Ethics Certification', d: 'Government of Canada', tag: 'Jan 2026', href: 'https://tcps2core.ca' },
  { t: 'Anthropic Claude 101', d: 'Anthropic', tag: '2026' },
  { t: 'Research Paper — Parmanu (cs.GR)', d: 'arXiv · cs.GR', tag: 'Jan 2026' },
];

// ---- Hobbies (the floating cards around the tree) --------------------------
export const HOBBIES = [
  { e: '📷', l: 'Photography', x: '8%', y: '24%' },
  { e: '🧗', l: 'Climbing', x: '82%', y: '30%' },
  { e: '🏊', l: 'Swimming', x: '14%', y: '62%' },
  { e: '🏸', l: 'Badminton', x: '78%', y: '66%' },
  { e: '♟️', l: 'Chess', x: '22%', y: '40%' },
  { e: '🎹', l: 'Piano', x: '70%', y: '48%' },
];

export const LINKS = {
  github: 'https://github.com/RhyChaw',
  linkedin: 'https://linkedin.com/in/rhychaw',
  email: 'r3chawla@uwaterloo.ca',
  resume: '/resumes/resume.pdf',
};

// ---- Branches (the tree's checkpoints) -------------------------------------
export const SECTIONS = [
  { id: 'leaves', p: 0.0, label: 'Hello', short: 'Hello', color: '#efe9e0' },
  {
    id: 'experience',
    p: 0.24,
    label: 'Experience',
    short: 'Experience',
    color: '#7dd3a8',
    kind: 'experience',
    blurb: 'Engineering, founding, freelance, and research — the work, grouped.',
    groups: [
      { id: 'engineering', label: 'Engineering', items: professionalExperience.map(expItem) },
      { id: 'founder', label: 'Founder', items: founderJourney.map(expItem) },
      { id: 'freelance', label: 'Freelance', items: freelanceWork.map(expItem) },
      { id: 'research', label: 'Research', items: openSource.map(expItem) },
    ],
  },
  {
    id: 'projects',
    p: 0.46,
    label: 'Projects',
    short: 'Projects',
    color: '#d98b5f',
    kind: 'cards',
    blurb: `${top10Projects.length} things I've shipped — AI tooling, full-stack, research, and hackathon builds.`,
    cards: top10Projects.map(projCardOf),
  },
  {
    id: 'certs',
    p: 0.68,
    label: 'Certifications',
    short: 'Certifications',
    color: '#b88adb',
    kind: 'cards',
    blurb: 'Awards, scholarships, certifications, and research output.',
    cards: CERTS,
  },
  {
    id: 'me',
    p: 0.9,
    label: 'Me',
    short: 'Me',
    color: '#e8c98f',
    kind: 'me',
    blurb:
      "What it all grows from. Off the clock I'm climbing, swimming, shooting photos, at the board, or at the piano — and always reading.",
  },
];

// ---- Local chatbot brain (searches the real data) --------------------------
const flagship = ['palace-ai', 'network-mcp', 'daimon'];

const projectMatches = (q) =>
  top10Projects
    .map((p) => {
      const hay = `${p.title} ${p.hook || ''} ${p.description || ''} ${p.tech || ''} ${p.category || ''}`.toLowerCase();
      const score = q.split(/\s+/).reduce((n, t) => (t.length > 2 && hay.includes(t) ? n + 1 : n), 0);
      return { p, score };
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((x) => x.p);

export function answerQuery(raw) {
  const q = String(raw || '').toLowerCase().trim();
  if (!q) return 'Ask me about my experience, projects, certifications, the tech I use, what I read, or what I do for fun.';

  if (/\b(hire|why|intern|co-?op|recruit|fall 2026|2026)\b/.test(q)) {
    return "Three reasons: I ship fast, I've worn every hat — engineer (Carta, Cresta, Franchise Foundry), founder (G12Uni → 40K monthly visits), freelancer, and HCI researcher — and I obsess over how things feel and evaluate. I'm after a Fall 2026 co-op where I can build agentic AI people actually use.";
  }
  if (/\b(fun|hobby|hobbies|life|climb|photo|swim|chess|piano|badminton|off)\b/.test(q)) {
    return "Off the clock I'm climbing, swimming, playing badminton, shooting photos, playing chess, or at the piano — the cards drifting around the tree are the real thing. I read a lot too: Range, The Starfish and the Spider, The Wisdom of Crowds.";
  }
  if (/\b(read|reading|book|books)\b/.test(q)) {
    const top = READING.slice(0, 3).map((b) => `“${b.title}” (${b.author})`).join(', ');
    return `I read across leadership, systems, and fiction. Recent: ${top}. There's a through-line — decentralized/emergent intelligence — that shows up in my swarm and multi-agent work too.`;
  }
  if (/\b(cert|certs|certification|award|scholarship|prototype|achievement)\b/.test(q)) {
    return 'Highlights: Best Prototype at the Google × UWaterloo Symposium (Pipette Pro), President\'s Scholarship of Distinction, URA in Prof. Edith Law\'s HCI lab, and a research paper (Parmanu, cs.GR Jan 2026).';
  }
  if (/\b(tech|stack|language|languages|skill|skills|tool|tools)\b/.test(q)) {
    return 'Day to day: Python, TypeScript/React, Django, FastAPI, Rust, Go, Postgres, Docker, Kubernetes. AI/agents: LLM orchestration, RAG, embeddings (pgvector), agent evaluation & benchmarking, MCP, Ollama, Anthropic/Gemini APIs. Comfortable from frontend feel to infra to ML systems.';
  }
  if (/\b(research|paper|ml|lab|hci|parmanu)\b/.test(q)) {
    return "I'm a software engineer in Prof. Edith Law's HCI lab (AI literacy in healthcare) and won Best Prototype at the Google × UWaterloo Symposium for Pipette Pro. I also authored Parmanu, a research paper on a learned particle-physics engine (cs.GR, Jan 2026).";
  }
  if (/\b(founder|found|startup|company|marketplace|g12|bhasha)\b/.test(q)) {
    return 'I co-founded G12Uni (an AI university-admissions platform) and scaled it to 40,000 monthly visits, 2,000+ MAU across 10+ countries, selected for Google for Startups — then learned when to wind it down. I\'m also co-founding Bhasha, a learning platform for Indian languages.';
  }
  if (/\b(experience|work|worked|job|carta|cresta|foundry|intern)\b/.test(q)) {
    const lines = professionalExperience.slice(0, 3).map((e) => `• ${cleanRole(e.title)} — ${firstBullet(e.detail)}`);
    return `My professional experience:\n${lines.join('\n')}`;
  }
  if (/\b(build|built|project|projects|ship|made|palace|network|daimon)\b/.test(q) || projectMatches(q).length) {
    const matches = projectMatches(q);
    if (matches.length) {
      const top = matches.slice(0, 3).map((p) => `• ${p.title.split(':')[0].split('(')[0].trim()} — ${p.hook || (p.description || '').slice(0, 90)}`);
      return `${top.join('\n')}${matches.length > 3 ? `\n…and ${matches.length - 3} more.` : ''}`;
    }
    const f = flagship.map((name) => projByTitle(name)).filter(Boolean);
    const top = f.map((p) => `• ${p.title.split(':')[0].trim()} — ${p.hook}`);
    return `I've shipped ${top10Projects.length} projects. Flagships:\n${top.join('\n')}\nAsk about any one, or a tech like “embeddings” or “React”.`;
  }
  const matches = projectMatches(q);
  if (matches.length) {
    return `Closest matches:\n${matches.slice(0, 3).map((p) => `• ${p.title.split(':')[0].trim()} — ${p.hook || ''}`).join('\n')}`;
  }
  return "Good question. I've wired this around everything I've built — try asking about my experience, projects, certifications, tech stack, research, what I read, or what I do for fun.";
}

export const INTRO_MESSAGE =
  "Hi — I'm Rhythm's AI, wired over everything he's built (experience, projects, research, reading). Ask me anything.";

export const CHIPS = [
  'What have you built?',
  'Why hire you for co-op?',
  'Tell me about your experience',
  'What do you do for fun?',
];
