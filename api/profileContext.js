// Grounding context for the portfolio chatbot — the facts Claude is allowed to
// use. Kept in sync with the Notion hub / mcp/data/profile.json. Public-facing only.

export const PROFILE_CONTEXT = `
# Rhythm Chawla — profile (the only facts you may use)

CS @ University of Waterloo (BCS Honours Co-op, AI & HCI Specialization, Minor in Entrepreneurship, Sep 2024 – Apr 2028 expected). Seeking a Fall 2026 co-op.
Links: GitHub github.com/RhyChaw · LinkedIn linkedin.com/in/rhychaw · Email r3chawla@uwaterloo.ca · Portfolio rhythmchawla.vercel.app
Through-line: a systems-thinking generalist drawn to emergent and decentralized intelligence — agentic AI, multi-agent systems, swarm robotics — with a founder's instinct for spotting problems and the engineering to ship the fix.

## Work experience
- Agentic AI Solutions Engineer — Franchise Foundry (May 2026 – Present). Architected an end-to-end multimodal agentic AI pipeline: ingests franchise-disclosure PDFs, runs LLM prompt synthesis with PDF grounding (Anthropic/Gemini), deploys production voice sales agents on Vapi — a 7-step automated workflow. Built agent orchestration (resumable step-persisted builds, idempotent queue jobs, structured logs). Tech: Laravel, PHP, Anthropic, Gemini, Vapi, Twilio, LiveKit.
- Software Engineer Intern — Carta (Jan 2026 – Apr 2026). Built Carta's first MCP plugin (compensation benchmarking) for natural-language salary queries through Claude. Architected Project Atlas, a persistent context-memory system for Claude agents over Jira/Slack/Confluence (~86K tokens saved per investigation). Built devtools-mcp (Chrome ext + Node.js MCP, 22 tools); 150+ contributions in 90 days. Reduced CI runtime 42%. Tech: Python, Django, gRPC, Kafka, MCP, Node.js, Datadog.
- Associate Conversation Design Intern — Cresta AI (May 2025 – Aug 2025). Engineered an LLM-powered auditing & evaluation system processing 10,000 conversation logs per run, cutting manual QA time ~98%. Built labelled evaluation datasets, ran QA for AI-agent behaviour across 12 enterprise clients, ~30% bot-accuracy lift. Tech: Python, LLMs, evaluation, prompting.
- Founding Engineer — Conrad School of Entrepreneurship / G12Uni (May 2024 – Aug 2024). Co-founded G12Uni, an AI university-admissions platform; scaled to 40,000 monthly visits, 2,000+ MAU across 10+ countries; selected for Google for Startups. Built Jado, an LLM research assistant. NLP pipelines on Docker + GCP.
- Freelance full-stack: Zafari CC Design (Next.js, SEO), Metta Stars Foundation NGO (Vite/React), Vasanta Bhavan Oman (React + Firebase admin panel).

## Founder ventures
- G12Uni — AI university-admissions platform (40K monthly visits; learned when to wind it down).
- Bhasha — co-founding a learning platform for Indian languages (Flutter, Supabase).

## Projects (selected, newest first)
- daimon — local-first agentic macOS assistant; bounded propose→gate→execute→observe loop, Touch ID gating, swappable Ollama/Claude inference; a 3-arm ablation benchmark raised agent pass rate 5/10→9/10 at ~13% token overhead, driving an eval-gated roadmap. (Python, Ollama, Claude API, eval harness, RAG)
- palace-ai — pip-installable Python CLI turning any repo into a navigable memory palace for AI agents; 10–42x token reduction; Claude Code integration. (Python, AST, pgvector, MCP, PyPI)
- Network MCP — MCP server embedding 1,700+ LinkedIn connections + notes with pgvector + OpenAI embeddings, answering natural-language queries with ranked results. (Python, FastAPI, pgvector, Docker)
- Carta farewell treasure hunt — mobile office treasure-hunt web app for his team's last day; QR checkpoints, real-time Supabase leaderboard. (React, Vite, Supabase)
- Parmanu — research paper (cs.GR, Jan 2026) on a learned particle-physics engine where material behavior emerges from learned kernels. (PyTorch, SPH, ROS)
- Pipette Pro — won Best Prototype at the Google × UWaterloo Symposium; HCI lab work with Prof. Edith Law. (Next.js, TensorFlow, Three.js)
- Clash Royale Analytics — pipeline ingesting 50k+ logs/day (dbt, PostgreSQL), productionized scikit-learn/XGBoost win-probability predictions via FastAPI.
- SWARM 2025 — built 10 predator-prey robots from scratch (ROS, Docker, embedded).
- Others: SnapSafe (AR fire-evac on Snap glasses), DJ AI (RL audio mixing), OneAddress (Chrome extension), Poker (C++17 + Monte Carlo AI), Watopoly, StrumSpace (YOLOv8 guitar chords), PawPal, MineGuard (solo 36h hackathon), Rhythm (stutter detection, Wav2Vec2), CSGPTPRO, WATisZine, Hestia. ~21 projects total on GitHub.

## Achievements
Best Prototype — Google × UWaterloo Symposium (Pipette Pro, Nov 2025); President's Scholarship of Distinction; Undergraduate Research Assistant (Prof. Edith Law); TCPS 2 Research Ethics; Anthropic Claude 101; Parmanu research paper (cs.GR).

## Skills
Languages: Python, C/C++, TypeScript, JavaScript, Java, Go, Rust, Bash. LLM & agents: orchestration, multi-step tool-use loops, RAG, embeddings (pgvector), agent evaluation & benchmarking (ablation studies), MCP, Ollama, Anthropic/Gemini APIs, Claude Code. ML: PyTorch, TensorFlow, Hugging Face, scikit-learn, XGBoost, RL (DQN, A3C). Systems: Django, FastAPI, gRPC, Kafka, PostgreSQL, dbt, Docker, Kubernetes, GCP, AWS, CI/CD, Datadog, Sentry.

## Reading (how he thinks)
The Starfish and the Spider (decentralized orgs — mirrors his swarm/multi-agent work), The Wisdom of Crowds, Range (generalist thesis), The Psychology of Money, The Five Dysfunctions of a Team, First Break All the Rules, Parable of the Sower, The Book Thief.

## Off the clock
Climbing, swimming, badminton, photography, chess, piano.
`.trim();
