// ProjectsData.jsx
import G12Proj from '../proj/G12Proj.png';
import CSGPTPRO from '../proj/csgptpro.png';
import WATisZine from '../proj/WATisZine.png';
import HestiaP from '../proj/HestiaP.png';
import StrumSpace from '../proj/StrumSpace.png';
import Rhythm from '../proj/rhythm.png';
import PawPal from '../proj/PawPal.png';
import MineGuard from '../proj/MineGuard.png';
// NOTE: tutorial/course project images removed from curated list (kept in src/proj but not imported here)
import SnapSafe from '../proj/SnapSafe.png';
import Spook from '../proj/Spook.png';
import Watopoly from '../proj/Watopoly.png';
import ClashRoyaleAnalytics from '../proj/ClashRoyale.png';
import DJAi from '../proj/DJAi.png';
import Swarm from '../proj/swarm.png';
import OneAddress from '../proj/OneAddress.png';
import Poker from '../proj/poker.png';
import PalaceAI from '../proj/PalaceAI.png';
import TreasureCarta from '../proj/Treasure_Carta.png';
import PipettePro from '../proj/PipettePro.png';

// Removed color constants as colors are no longer used in project data

const projectsData = [
  // 2026 Projects
  {
    title: 'daimon: Local-First Agentic macOS Assistant',
    hook: 'Eval-gated agent. 5/10 → 9/10 with memory.',
    description: 'A local-first agentic macOS assistant: a bounded multi-step agent loop (propose → gate → execute → observe) over a capability whitelist with Touch ID privilege gating, and a swappable inference backend serving local (Ollama) or cloud (Claude) models with persistent episodic + factual memory. A 3-arm ablation benchmark isolated memory\'s contribution to agent task success: with the model held fixed, structured query-relevant memory raised pass rate from 5/10 to 9/10 at ~13% token overhead, driving an eval-gated roadmap.',
    tech: 'Python, Ollama, Claude API, palace-ai, macOS, Agentic Loop, Eval Harness, RAG',
    git: 'https://github.com/RhyChaw/daimon',
    category: 'AI / Developer Tools',
    date: 'June 2026',
    featured: true,
    image: null
  },
  // 2025 Projects (Future/Planned)
  {
    title: 'palace-ai: Memory Palace for AI Agents',
    hook: '42x token reduction. Zero API key.',
    description: 'Turns any code repository into a navigable memory palace for AI agents: generating a typed associative network, per-module room files, and a self-contained graph visualizer. Agents traverse rooms by association rather than search, achieving 10–42x token reduction with zero API key required. Ships as a pip-installable CLI with Claude Code integration via `palace install claude`. Built as a personal implementation of the Atlas context system concept.',
    tech: 'Python, AST parsing, pgvector, Claude Code MCP, Graph Visualization, CLI, PyPI',
    git: 'https://github.com/RhyChaw/palace-ai',
    category: 'AI / Developer Tools',
    date: 'May 2026',
    featured: true,
    image: PalaceAI
  },
  {
    title: 'Network MCP: Personal Network Memory Layer',
    hook: 'Ask your 1,700 connections in plain English.',
    description: 'An MCP server that ingests LinkedIn connections + personal notes, embeds them with pgvector, and answers natural language queries to surface the right people at the right time. Built to solve the real problem of having 1,700 connections but no way to leverage them. Ask "investors who care about edtech" and get ranked results. Phase 0: data ingestion + embeddings. Phase 1: query CLI. Phase 4: full frontend.',
    tech: 'Python, TypeScript, PostgreSQL, pgvector, OpenAI Embeddings, FastAPI, Docker, MCP',
    git: 'https://github.com/RhyChaw/network-mcp',
    category: 'AI / Developer Tools',
    date: 'April 2026',
    image: null
  },
  {
    title: 'Lost in the Office Jungle: Carta Farewell App',
    hook: 'A treasure hunt I built for my team\'s last day.',
    description: 'Mobile-first office treasure hunt web app built as a surprise for the Carta team on the last day of co-op. 10 QR-gated checkpoints across the office, real-time leaderboard via Supabase subscriptions, jungle fairy mascot named Fairy. Client-side routing, no auth: player UUID in sessionStorage.',
    tech: 'React 18, Vite, Supabase, React Router, Framer Motion, TypeScript',
    git: 'https://github.com/RhyChaw/carta-treasure',
    category: 'Full Stack',
    date: 'April 2026',
    image: TreasureCarta
  },
  {
    title: 'Parmanu: Learned Mesoscopic Matter Primitives',
    hook: 'One engine, any material. Water, honey, sand — same primitive.',
    description: 'A particle-based physics engine where material behavior emerges from learned interaction kernels rather than hand-coded solvers. Each parmanu carries a latent material embedding z: water, honey, sand, and soft tissue share one primitive, different z. Hybrid analytic + PyTorch learned kernels, spatial hashing for O(n) neighbor search, ROS bridge for humanoid robotics simulation. Authored a research paper on the system (cs.GR, Jan 2026).',
    tech: 'Python, PyTorch, SPH, Open3D, ROS, NumPy',
    git: 'https://github.com/RhyChaw/parmanu',
    category: 'Research / Simulation',
    date: 'January 2026',
    award: 'Research Paper: cs.GR, Jan 2026',
    image: null
  },
  {
    title: 'Pipette Pro: Best Prototype, Google × UWaterloo Symposium',
    hook: 'Best Prototype · Google × UWaterloo Symposium.',
    description: "Won Best Prototype at the Fall 2025 Google-UWaterloo Symposium on the Future of Learning. Pipette Pro reimagines how students learn essential lab techniques through an intuitive, guided, interactive experience built for real learning impact. Developed with Google mentorship (Chris Reardon, Jules Walter) as part of Prof. Edith Law's HCI lab and the Future of Work Institute.",
    tech: 'Next.js, TensorFlow, Firebase, Firestore, Three.js, HCI Research, EdTech',
    image: PipettePro,
    link: 'https://pipettepro.vercel.app',
    category: 'Research / Hackathon',
    date: 'November 2025',
    award: 'Best Prototype: Google × UWaterloo Symposium'
  },
  {
    title: 'Clash Royale Analytics Platform',
    hook: '50K battle logs → live win probability in real time.',
    description: 'Engineered an end-to-end analytics platform for Clash Royale, automating ingestion of 50k+ battle logs via Python, transforming raw data into analytics-ready tables with dbt and PostgreSQL, and delivering live match outcome predictions through ML models (scikit-learn/XGBoost) served by FastAPI and visualized on an interactive Streamlit dashboard with AI-powered insights; implemented rigorous data quality checks, CI/CD, and containerization for production deployment.',
    tech: 'Python, PostgreSQL, dbt, FastAPI, Streamlit, scikit-learn, XGBoost, Docker, CI/CD, Data Engineering, Machine Learning, Analytics',
    image: ClashRoyaleAnalytics,
    git: 'https://github.com/RhyChaw/clashroyalestats',
    category: 'Data Engineering',
    date: 'October 2025'
  },
  {
    title: 'SWARM 2025: Predator-Prey Swarm Robotics',
    hook: '10 robots from scratch. 500 total. Predator–prey behaviours.',
    description: 'Built 10 full robots from the ground up at SWARM 2025 in Kitchener (100+ students, 500+ robots). From hands-on soldering to programming with Docker and ROS, we engineered emergent predator–prey behaviors inspired by nature. Grateful to GRAM, UW Robotics, sponsors, and mentors. Team: Aarjav Patni, Abhinav Jha, Arush Handa, Vedant Malhotra, Madhav Malik, Navkaran Handa.',
    tech: 'Robotics, ROS, Docker, Embedded Systems, Swarm Intelligence, Multi-Agent Systems, Hardware',
    image: Swarm,
    git: 'https://github.com/AarjavPatni/hero-macos-arm64/',
    category: 'Robotics / Hackathon',
    date: 'October 2025'
  },
  {
    title: "Texas Hold'em Poker – Enhanced Professional Version",
    hook: 'C++17 Texas Hold\'em with Monte Carlo AI.',
    description: 'Professional-grade C++ Texas Hold\'em with SFML 3.0 graphics, modular architecture, and a full main menu + settings system. Features 2–6 players, customizable blinds/stacks, responsive UI, real-time stats, and AI with Monte Carlo simulation for decision-making. Clean C++17 codebase with RAII and robust error handling.',
    tech: 'C++17, SFML 3.0, CMake, Modular Architecture, Monte Carlo AI',
    image: Poker,
    git: 'https://github.com/RhyChaw/poker',
    category: 'C++ / Game Dev',
    date: 'October 2025'
  },
  {
    title: 'DJ AI',
    hook: 'An AI that mixes your songs in real time.',
    description: 'An experimental AI DJ system that performs real-time audio mixing using reinforcement learning: agents learn mixing policies from track features, beat grids, and crowd response signals. Built with PyTorch for the RL core and Three.js for a live visual interface.',
    tech: 'PyTorch, TensorFlow, Python, FastAPI, Three.js, WebGL, JavaScript, Web3, Ethereum, Smart Contracts, Reinforcement Learning, Bayesian ML, One-Shot Learning, Neural Networks',
    image: DJAi,
    link: 'https://d-c1qmyx10z-rhychaws-projects.vercel.app/',
    git: 'https://github.com/RhyChaw/DJAi',
    category: 'AI/ML',
    date: 'September 2025'
  },
  {
    title: 'OneAddress – Chrome Extension',
    hook: 'One click. Any address form. Fully local.',
    description: 'A powerful Chrome extension to manage and autofill multiple addresses (home, work, temporary) across the web with one click. Beautiful Skype‑blue UI, fast, secure, and fully local (no servers, no tracking). Includes dev build tooling and a Next.js web companion. Features: one‑click form filling, context‑menu fill, responsive popup, and local storage management.',
    tech: 'Chrome Extensions, Manifest V3, JavaScript, React/Next.js, Content Scripts, Service Workers, Chrome Storage',
    image: OneAddress,
    git: 'https://github.com/RhyChaw/oneAddress',
    category: 'Product / Extension',
    date: 'September 2025'
  },
  {
    title: 'Watopoly - Waterloo Monopoly',
    hook: 'Monopoly but it\'s UWaterloo campus.',
    description: 'Monopoly-inspired board game set on University of Waterloo campus! Features Waterloo landmarks, trading system, save/load functionality, and auction mechanics.',
    tech: 'C++, Object-Oriented Programming, Git',
    image: Watopoly,
    category: 'Game Development',
    date: 'March 2025'
  },
  {
    title: 'SnapSafe (Hack the North 2025)',
    hook: 'Real-time AR fire evacuation on Snap glasses.',
    description: 'Built SnapSafe, a real-time AR fire evacuation system on Snap AR glasses. Used depth caching, world query hits, and ray casting to dynamically detect exits and guide users with pathfinding arrows. Trained a custom fire-exit sign detection model on Roboflow, converted to ONNX, and integrated into Lens Studio with custom scripting. This marked a breakthrough in safety-focused AR navigation.',
    tech: 'Snap AR, Lens Studio, Roboflow, ONNX, Computer Vision, AR/VR',
    image: SnapSafe,
    link: 'https://www.youtube.com/watch?v=ajmASxcm4OA',
    git: 'https://github.com/AshishA26/HackTheNorth2025',
    category: 'Hackathon',
    date: 'September 2025'
  },
  {
    title: 'StrumSpace (SpurHacks Hackathon)',
    hook: 'YOLOv8 sees your guitar chords in real time.',
    description: 'Computer Vision based 3D web dev app, which annotates chords on guitar Live using YOLOv8',
    tech: 'YOLOv8, Computer Vision, 3D Web, JavaScript, Machine Learning',
    image: StrumSpace,
    git: 'https://github.com/LuhemRevorg/StrumSpace',
    category: 'Hackathon',
    date: 'June 2025'
  },
  {
    title: 'PawPal (GeeseHacks Hackathon)',
    hook: 'An AI vet in your pocket. Built for Benji.',
    description: 'AI based Pet care app which can detect pet diseases, recommend food, and find pet sitters',
    tech: 'AI/ML, Computer Vision, Mobile Development, Machine Learning',
    image: PawPal,
    link: 'https://devpost.com/software/heads-up-for-tails',
    git: 'https://github.com/LuhemRevorg/the-pet-project-GH-2025-',
    category: 'Hackathon',
    date: 'January 2025'
  },
  
  // 2024 Projects
  {
    title: 'MineGuard (Hack the Valley Hackathon)',
    hook: 'Solo. 36 hours. AI safety system for miners.',
    description: 'AI based mining safety app which can detect unsafe conditions and alert workers',
    tech: 'AI/ML, Computer Vision, Mobile Development, Safety Systems',
    image: MineGuard,
    link: 'https://devpost.com/software/mineguard',
    git: 'https://github.com/RhyChaw/mineguard',
    category: 'Hackathon',
    date: 'October 2024'
  },
  {
    title: 'Rhythm (Hack the Hill, Ottawa)',
    hook: 'Detects stuttering in real time using Meta\'s Wav2Vec2.',
    description: 'Developed an AI-powered voice coach leveraging Meta\'s Wav2Vec2 model and Apple\'s SEP-28K dataset to detect stuttering and enhance speech clarity, helping users improve public speaking skills through real-time feedback. Engineered pitch and pace analysis features using OpenAI\'s API, librosa, and SciPy, delivering actionable insights on speech modulation and timing to ensure speakers can confidently convey their message. Designed an interactive and engaging front-end with React.js and advanced JavaScript libraries like Particle.js to create an intuitive user experience, promoting self-improvement through immersive technology.',
    tech: 'Wav2Vec2, OpenAI API, librosa, SciPy, React.js, Particle.js, Machine Learning',
    image: Rhythm,
    link: 'https://devpost.com/software/rhythm-o8rwp4',
    git: 'https://github.com/LuhemRevorg/HTH_project',
    category: 'Hackathon',
    date: 'September 2024'
  },
  {
    title: 'G12',
    hook: '40K monthly visits. Google for Startups.',
    description: 'Co-founded G12Uni: An AI-powered university admissions platform connecting students with university communities. Built full-stack web app (Vite + React) and mobile app (Flutter + Dart) on Firebase. Scaled to 40,000 monthly visits and 2,000+ MAU across 10+ countries. Selected for Google for Startups. Pitched to 24 high schools, secured 5 pilot agreements. Deployed NLP pipelines on GCP for Reddit and YouTube intelligence.',
    tech: 'Vite, React, Flutter, Dart, Firebase, GCP, NLP, TypeScript, Web Development',
    image: G12Proj,
    link: 'https://g12uni.com',
    git: 'https://github.com/Ejtehad/g12newver',
    category: 'Full Stack',
    date: 'June 2024'
  },
  {
    title: 'CSGPTPRO Hackathon Project',
    hook: 'AI tutor trained on UW and UofT course content.',
    description: 'Developed "CS GPT PRO," an AI-powered chatbot designed to provide precise answers for university courses at UW and UofT, as well as French high school papers, improving accessibility to academic support. Engineered the solution using Arctic hosting, Streamlit, and CUDA, leveraging advanced AI training on course-specific datasets and high school papers to ensure accuracy and relevance in responses. Created the platform to streamline academic assistance for students, addressing knowledge gaps and enabling efficient, targeted learning through a user-friendly chatbot interface.',
    tech: 'Arctic Hosting, Streamlit, CUDA, AI/ML, Python, Academic AI',
    image: CSGPTPRO,
    git: 'https://github.com/jadechoghari/CSGPTPRO',
    category: 'Hackathon',
    date: 'March 2024'
  },
  
  // 2023 Projects
  {
    title: 'WATisZine Website',
    hook: 'First project. Still running.',
    description: 'Built a comprehensive website for the WATisZine club (University of Waterloo) to centralize zines with an admin dashboard for easy management. Implemented secure authentication for authorized updates, dynamic content, animations, and smooth transitions. Connected to Firebase for backend functionality and hosted via cPanel. First official project - gained experience in full-stack web development and project management.',
    tech: 'HTML, CSS, JavaScript, Firebase, cPanel, Web Development',
    image: WATisZine,
    link: 'https://watiszine.clubs.wusa.ca/',
    git: 'https://github.com/RhyChaw/watiszine',
    category: 'Full Stack',
    date: 'December 2023'
  },
  {
    title: 'Hestia | Your Next Home',
    hook: 'Student sublet finder for university students.',
    description: 'Student Sublet finder for university students',
    tech: 'HTML, CSS, Django, Python, Azure Cloud, Web Development',
    image: HestiaP,
    link: 'https://github.com/gsaujla/HestiaProject',
    git: 'https://github.com/gsaujla/HestiaProject',
    category: 'Full Stack',
    date: 'October 2023'
  },
];

// Sort projects by date (newest first)
const sortProjectsByDate = (projects) => {
  return projects.sort((a, b) => {
    // Convert date strings to comparable format
    const parseDate = (dateStr) => {
      const [month, year] = dateStr.split(' ');
      const monthMap = {
        'January': 1, 'February': 2, 'March': 3, 'April': 4, 'May': 5, 'June': 6,
        'July': 7, 'August': 8, 'September': 9, 'October': 10, 'November': 11, 'December': 12
      };
      return parseInt(year) * 12 + monthMap[month];
    };
    
    return parseDate(b.date) - parseDate(a.date);
  });
};

// Export the sorted projects
export const top10Projects = sortProjectsByDate(projectsData);


