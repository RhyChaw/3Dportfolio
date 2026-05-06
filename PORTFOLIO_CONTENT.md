# Portfolio content export (verbatim)

This file is an extraction of **human-readable / visitor-facing content** found in this repository. It includes:
- Shipped classic site route: `/` (component: `src/traditional/TraditionalHome.jsx`)
- Shipped 3D world route: `/naruto` (component: `src/pages/Home.jsx`)
- Other copy present in repo but **not currently routed**

No attempt is made to improve or rewrite the text here—this is for downstream review.

---

## 1) Every Project Entry — full details (`src/pages/ProjectsData.jsx`)

Projects are defined in `projectsData` and exported as `top10Projects = sortProjectsByDate(projectsData)` (note: despite the name, it exports the full array, not 10).

### Image imports (used by projects)

- `G12Proj` -> `../proj/G12Proj.png`
- `CSGPTPRO` -> `../proj/csgptpro.png`
- `WildOasisProject` -> `../proj/TheWildOasis.png`
- `WATisZine` -> `../proj/WATisZine.png`
- `HestiaP` -> `../proj/HestiaP.png`
- `RocketLanding` -> `../proj/RocketLanding.png`
- `ReduxBank` -> `../proj/ReduxBank.png`
- `StrumSpace` -> `../proj/StrumSpace.png`
- `Rhythm` -> `../proj/rhythm.png`
- `PawPal` -> `../proj/PawPal.png`
- `MineGuard` -> `../proj/MineGuard.png`
- `KungFuMaster` -> `../proj/KungFuMaster.png`
- `PizzaCompany` -> `../proj/PizzaCompanyREACT.png`
- `SnapSafe` -> `../proj/SnapSafe.png`
- `Spook` -> `../proj/Spook.png`
- `Watopoly` -> `../proj/watopoly.JPG`
- `ClashRoyaleAnalytics` -> `../proj/ClashRoyale.png`
- `DJAi` -> `../proj/DJAi.png`
- `Swarm` -> `../proj/swarm.png`
- `OneAddress` -> `../proj/OneAddress.png`
- `Poker` -> `../proj/poker.png`

### Project entries (in file order)

#### 1. Pipette Pro — Best Prototype, Google × UWaterloo Symposium
- **Title**: Pipette Pro — Best Prototype, Google × UWaterloo Symposium
- **Description**: Won Best Prototype at the Fall 2025 Google-UWaterloo Symposium on the Future of Learning. Pipette Pro reimagines how students learn essential lab techniques through an intuitive, guided, interactive experience built for real learning impact. Developed with Google mentorship (Chris Reardon, Jules Walter) as part of Prof. Edith Law's HCI lab and the Future of Work Institute.
- **Tech stack**: Next.js, TensorFlow, Firebase, Firestore, Three.js, HCI Research, EdTech
- **Date**: November 2025
- **Category**: Research / Hackathon
- **Links**:
  - **Live/Demo (`link`)**: https://pipettepro.vercel.app
- **award**: Best Prototype — Google × UWaterloo Symposium
- **inProgress**: (not set)
- **Image**: No (`image: null`)

#### 2. Clash Royale Analytics Platform
- **Title**: Clash Royale Analytics Platform
- **Description**: Engineered an end-to-end analytics platform for Clash Royale, automating ingestion of 50k+ battle logs via Python, transforming raw data into analytics-ready tables with dbt and PostgreSQL, and delivering live match outcome predictions through ML models (scikit-learn/XGBoost) served by FastAPI and visualized on an interactive Streamlit dashboard with AI-powered insights; implemented rigorous data quality checks, CI/CD, and containerization for production deployment.
- **Tech stack**: Python, PostgreSQL, dbt, FastAPI, Streamlit, scikit-learn, XGBoost, Docker, CI/CD, Data Engineering, Machine Learning, Analytics
- **Date**: October 2025
- **Category**: Data Engineering
- **Links**:
  - **Git**: https://github.com/RhyChaw/clashroyalestats
- **inProgress**: (not set)
- **Image**: Yes (`image: ClashRoyaleAnalytics` -> `../proj/ClashRoyale.png`)

#### 4. SWARM 2025 — Predator–Prey Swarm Robotics
- **Title**: SWARM 2025 — Predator–Prey Swarm Robotics
- **Description**: Built 10 full robots from the ground up at SWARM 2025 in Kitchener (100+ students, 500+ robots). From hands-on soldering to programming with Docker and ROS, we engineered emergent predator–prey behaviors inspired by nature. Grateful to GRAM, UW Robotics, sponsors, and mentors. Team: Aarjav Patni, Abhinav Jha, Arush Handa, Vedant Malhotra, Madhav Malik, Navkaran Handa.
- **Tech stack**: Robotics, ROS, Docker, Embedded Systems, Swarm Intelligence, Multi-Agent Systems, Hardware
- **Date**: October 2025
- **Category**: Robotics / Hackathon
- **Links**:
  - **Git**: https://github.com/AarjavPatni/hero-macos-arm64/
- **inProgress**: (not set)
- **Image**: Yes (`image: Swarm` -> `../proj/swarm.png`)

#### 5. Texas Hold'em Poker – Enhanced Professional Version
- **Title**: Texas Hold'em Poker – Enhanced Professional Version
- **Description**: Professional-grade C++ Texas Hold'em with SFML 3.0 graphics, modular architecture, and a full main menu + settings system. Features 2–6 players, customizable blinds/stacks, responsive UI, real-time stats, and AI with Monte Carlo simulation for decision-making. Clean C++17 codebase with RAII and robust error handling.
- **Tech stack**: C++17, SFML 3.0, CMake, Modular Architecture, Monte Carlo AI
- **Date**: October 2025
- **Category**: C++ / Game Dev
- **Links**:
  - **Git**: https://github.com/RhyChaw/poker
- **inProgress**: (not set)
- **Image**: Yes (`image: Poker` -> `../proj/poker.png`)

#### 6. DJ AI
- **Title**: DJ AI
- **Description**: A next-gen AI DJ system where each song gets mixed and mashed by an AI
- **Tech stack**: PyTorch, TensorFlow, Python, FastAPI, Three.js, WebGL, JavaScript, Web3, Ethereum, Smart Contracts, Reinforcement Learning, Bayesian ML, One-Shot Learning, Neural Networks
- **Date**: September 2025
- **Category**: AI/ML
- **Links**:
  - **Live/Demo (`link`)**: https://d-c1qmyx10z-rhychaws-projects.vercel.app/
  - **Git**: https://github.com/RhyChaw/DJAi
- **inProgress**: (not set)
- **Image**: Yes (`image: DJAi` -> `../proj/DJAi.png`)

#### 7. OneAddress – Chrome Extension
- **Title**: OneAddress – Chrome Extension
- **Description**: A powerful Chrome extension to manage and autofill multiple addresses (home, work, temporary) across the web with one click. Beautiful Skype‑blue UI, fast, secure, and fully local (no servers, no tracking). Includes dev build tooling and a Next.js web companion. Features: one‑click form filling, context‑menu fill, responsive popup, and local storage management.
- **Tech stack**: Chrome Extensions, Manifest V3, JavaScript, React/Next.js, Content Scripts, Service Workers, Chrome Storage
- **Date**: September 2025
- **Category**: Product / Extension
- **Links**:
  - **Git**: https://github.com/RhyChaw/oneAddress
- **inProgress**: (not set)
- **Image**: Yes (`image: OneAddress` -> `../proj/OneAddress.png`)

#### 12. Watopoly - Waterloo Monopoly
- **Title**: Watopoly - Waterloo Monopoly
- **Description**: Monopoly-inspired board game set on University of Waterloo campus! Features Waterloo landmarks, trading system, save/load functionality, and auction mechanics.
- **Tech stack**: C++, Object-Oriented Programming, Git
- **Date**: March 2025
- **Category**: Game Development
- **Links**:
  - **Git**: https://github.com/RhyChaw/watopoly
- **inProgress**: (not set)
- **Image**: Yes (`image: Watopoly` -> `../proj/watopoly.JPG`)

#### 14. SPOOK - Horror Game (Horror Hacks 2025)
- **Title**: SPOOK - Horror Game (Horror Hacks 2025)
- **Description**: Built an entire horror game for Horror Hacks September 2025. Features cinematic effects, immersive sound design, and 3D horror gameplay. Created a fully interactive horror experience with atmospheric lighting, sound effects, and engaging gameplay mechanics. Best played with sound on and headphones recommended for the full immersive experience.
- **Tech stack**: Next.js, Three.js, Vercel, JavaScript, WebGL
- **Date**: September 2025
- **Category**: Hackathon
- **Links**:
  - **Live/Demo (`link`)**: https://spooky-nu.vercel.app/
  - **Git**: https://github.com/RhyChaw/spooky
- **inProgress**: true
- **Image**: Yes (`image: Spook` -> `../proj/Spook.png`)

#### 15. SnapSafe (Hack the North 2025)
- **Title**: SnapSafe (Hack the North 2025)
- **Description**: Built SnapSafe, a real-time AR fire evacuation system on Snap AR glasses. Used depth caching, world query hits, and ray casting to dynamically detect exits and guide users with pathfinding arrows. Trained a custom fire-exit sign detection model on Roboflow, converted to ONNX, and integrated into Lens Studio with custom scripting—marking a breakthrough in safety-focused AR navigation.
- **Tech stack**: Snap AR, Lens Studio, Roboflow, ONNX, Computer Vision, AR/VR
- **Date**: September 2025
- **Category**: Hackathon
- **Links**:
  - **Live/Demo (`link`)**: https://www.youtube.com/watch?v=ajmASxcm4OA
  - **Git**: https://github.com/AshishA26/HackTheNorth2025
- **inProgress**: (not set)
- **Image**: Yes (`image: SnapSafe` -> `../proj/SnapSafe.png`)

#### 17. StrumSpace (SpurHacks Hackathon)
- **Title**: StrumSpace (SpurHacks Hackathon)
- **Description**: Computer Vision based 3D web dev app, which annotates chords on guitar Live using YOLOv8
- **Tech stack**: YOLOv8, Computer Vision, 3D Web, JavaScript, Machine Learning
- **Date**: June 2025
- **Category**: Hackathon
- **Links**:
  - **Git**: https://github.com/LuhemRevorg/StrumSpace
  - **Live/Demo (`link`)**: (not present)
- **inProgress**: (not set)
- **Image**: Yes (`image: StrumSpace` -> `../proj/StrumSpace.png`)

#### 20. PawPal (GeeseHacks Hackathon)
- **Title**: PawPal (GeeseHacks Hackathon)
- **Description**: AI based Pet care app which can detect pet diseases, recommend food, and find pet sitters
- **Tech stack**: AI/ML, Computer Vision, Mobile Development, Machine Learning
- **Date**: January 2025
- **Category**: Hackathon
- **Links**:
  - **Live/Demo (`link`)**: https://devpost.com/software/heads-up-for-tails
  - **Git**: https://github.com/LuhemRevorg/the-pet-project-GH-2025-
- **inProgress**: (not set)
- **Image**: Yes (`image: PawPal` -> `../proj/PawPal.png`)

#### 21. MineGuard (Hack the Valley Hackathon)
- **Title**: MineGuard (Hack the Valley Hackathon)
- **Description**: AI based mining safety app which can detect unsafe conditions and alert workers
- **Tech stack**: AI/ML, Computer Vision, Mobile Development, Safety Systems
- **Date**: October 2024
- **Category**: Hackathon
- **Links**:
  - **Live/Demo (`link`)**: https://devpost.com/software/mineguard
  - **Git**: https://github.com/RhyChaw/mineguard
- **inProgress**: (not set)
- **Image**: Yes (`image: MineGuard` -> `../proj/MineGuard.png`)

#### 22. Rhythm (Hack the Hill, Ottawa)
- **Title**: Rhythm (Hack the Hill, Ottawa)
- **Description**: Developed an AI-powered voice coach leveraging Meta's Wav2Vec2 model and Apple's SEP-28K dataset to detect stuttering and enhance speech clarity, helping users improve public speaking skills through real-time feedback. Engineered pitch and pace analysis features using OpenAI's API, librosa, and SciPy, delivering actionable insights on speech modulation and timing to ensure speakers can confidently convey their message. Designed an interactive and engaging front-end with React.js and advanced JavaScript libraries like Particle.js to create an intuitive user experience, promoting self-improvement through immersive technology.
- **Tech stack**: Wav2Vec2, OpenAI API, librosa, SciPy, React.js, Particle.js, Machine Learning
- **Date**: September 2024
- **Category**: Hackathon
- **Links**:
  - **Live/Demo (`link`)**: https://devpost.com/software/rhythm-o8rwp4
  - **Git**: https://github.com/LuhemRevorg/HTH_project
- **inProgress**: (not set)
- **Image**: Yes (`image: Rhythm` -> `../proj/rhythm.png`)

#### 27. Velocity - Grand River Hospital Innovation Challenge
- **Title**: Velocity - Grand River Hospital Innovation Challenge
- **Description**: Developed a comprehensive data management system for Grand River Hospital to restructure and organize their data efficiently. Built as a React-based mobile web application for quick demo purposes, providing real-time updates and streamlined data visualization to help hospital staff manage information more effectively.
- **Tech stack**: React, Data Visualization, Mobile Web, Healthcare Tech
- **Date**: June 2024
- **Category**: Full Stack
- **Links**:
  - **Git**: #
- **inProgress**: (not set)
- **Image**: No (`image` not present on this object)

#### 28. G12
- **Title**: G12
- **Description**: Startup App for university students
- **Tech stack**: Vite, React, Firebase, Web Development
- **Date**: June 2024
- **Category**: Full Stack
- **Links**:
  - **Live/Demo (`link`)**: https://g12uni.com
  - **Git**: https://github.com/Ejtehad/g12newver
- **inProgress**: (not set)
- **Image**: Yes (`image: G12Proj` -> `../proj/G12Proj.png`)

#### 29. G12 Mobile App
- **Title**: G12 Mobile App
- **Description**: Startup Mobile App for university students
- **Tech stack**: Flutter, Dart, Firebase, Mobile Development
- **Date**: June 2024
- **Category**: Full Stack
- **Links**:
  - **Git**: https://github.com/G12Uni/g12app
- **inProgress**: (not set)
- **Image**: Yes (`image: G12Proj` -> `../proj/G12Proj.png`)

#### 30. CSGPTPRO Hackathon Project
- **Title**: CSGPTPRO Hackathon Project
- **Description**: Developed "CS GPT PRO," an AI-powered chatbot designed to provide precise answers for university courses at UW and UofT, as well as French high school papers, improving accessibility to academic support. Engineered the solution using Arctic hosting, Streamlit, and CUDA, leveraging advanced AI training on course-specific datasets and high school papers to ensure accuracy and relevance in responses. Created the platform to streamline academic assistance for students, addressing knowledge gaps and enabling efficient, targeted learning through a user-friendly chatbot interface.
- **Tech stack**: Arctic Hosting, Streamlit, CUDA, AI/ML, Python, Academic AI
- **Date**: March 2024
- **Category**: Hackathon
- **Links**:
  - **Git**: https://github.com/jadechoghari/CSGPTPRO
- **inProgress**: (not set)
- **Image**: Yes (`image: CSGPTPRO` -> `../proj/csgptpro.png`)

#### 31. WATisZine Website
- **Title**: WATisZine Website
- **Description**: Built a comprehensive website for the WATisZine club (University of Waterloo) to centralize zines with an admin dashboard for easy management. Implemented secure authentication for authorized updates, dynamic content, animations, and smooth transitions. Connected to Firebase for backend functionality and hosted via cPanel. First official project—gained experience in full-stack web development and project management.
- **Tech stack**: HTML, CSS, JavaScript, Firebase, cPanel, Web Development
- **Date**: December 2023
- **Category**: Full Stack
- **Links**:
  - **Live/Demo (`link`)**: https://watiszine.clubs.wusa.ca/
  - **Git**: https://github.com/RhyChaw/watiszine
- **inProgress**: (not set)
- **Image**: Yes (`image: WATisZine` -> `../proj/WATisZine.png`)

#### 32. Hestia | Your Next Home
- **Title**: Hestia | Your Next Home
- **Description**: Student Sublet finder for university students
- **Tech stack**: HTML, CSS, Django, Python, Azure Cloud, Web Development
- **Date**: October 2023
- **Category**: Full Stack
- **Links**:
  - **Live/Demo (`link`)**: https://github.com/gsaujla/HestiaProject
  - **Git**: https://github.com/gsaujla/HestiaProject
- **inProgress**: (not set)
- **Image**: Yes (`image: HestiaP` -> `../proj/HestiaP.png`)

---

## 2) Every Experience Entry — full details

There are **two** experience datasets used by two different experiences UIs:
- 3D world popup experience: `src/pages/Experience.jsx`
- Classic site experience timeline: `src/traditional/TradExp.jsx` (multiple categories + tech tags + founder/open source copy)

### 2A) 3D world popup experience (`src/pages/Experience.jsx`)

Heading shown:
- `💼 Ninja Timeline: Experience`

Close button text:
- `Close Scroll`

Entries:

#### 1. Software Engineer Intern | Carta Maple Kitchener, ON
- **Company name**: Carta Maple
- **Title**: Software Engineer Intern
- **Date range**: Jan 2026 – Apr 2026
- **Bullets (verbatim)**:
  - Designed backend services in Python/Django for high-volume financial compensation pipelines, processing over 1M records per month with strict correctness and auditability guarantees.
  - Integrated gRPC APIs across distributed services, reducing end-to-end request latency by 30%.
  - Optimized PostgreSQL schemas and queries, balancing throughput, consistency, and maintainability; contributed production code under CI pipelines with unit/integration tests and MyPy static typing.
  - Leveraged a toolkit including Docker, Jenkins, Kubernetes, Datadog, Sentry, and Jira to ensure reliability, observability, and high system performance.
- **Tech tags listed**: (not listed as tags in this file; only present as text inside bullets)

#### 2. Associate Conversation Design Intern | Cresta AI (Series D)
- **Company name**: Cresta AI (Series D)
- **Title**: Associate Conversation Design Intern
- **Date range**: August 2025
- **Bullets (verbatim)**:
  - Built an LLM-powered redaction auditor that cut manual QA time by 60% across thousands of weekly transcripts.
  - Automated annotation workflows with Google Apps Script, saving the team 10+ hours/week.
  - Tuned Cresta's Opera and Director platforms for 10+ client deployments, improving bot accuracy by 30%.
- **Tech tags listed**: (not listed as tags in this file; only present as text inside bullets)

#### 3. Fullstack Developer| ZafariCC (Interior Design)
- **Company name**: ZafariCC (Interior Design)
- **Title**: Fullstack Developer
- **Date range**: May 2025
- **Bullets (verbatim)**:
  - Developed a modern, SEO-optimized website for an interior design company.
  - Built with Next.js for server-side rendering and performance.
  - Improved client search ranking and user experience.
- **Tech tags listed**: (not listed as tags in this file; only present as text inside bullets)

#### 4. Fullstack Developer | MettaStars (NGO)
- **Company name**: MettaStars (NGO)
- **Title**: Fullstack Developer
- **Date range**: May 2025
- **Bullets (verbatim)**:
  - Built a fullstack website for an education-focused NGO.
  - Implemented advanced CSS concepts for responsive, accessible design.
  - Connected frontend to a secure backend for real-time user data.
- **Tech tags listed**: (not listed as tags in this file; only present as text inside bullets)

#### 5. Software Engineer | G12Uni (Co-Founder)
- **Company name**: G12Uni
- **Title**: Software Engineer (Co-Founder)
- **Date range**: August 2024
- **Bullets (verbatim)**:
  - Co-founded a global student network with 1,500+ users.
  - Partnered with Google for Education Startups through eCoop & Conrad.
  - Redesigned the platform with ReactJS & Vite, built APIs for Meet, maps, avatars, and chat systems.
- **Tech tags listed**: (not listed as tags in this file; only present as text inside bullets)

#### 6. Student | Conrad Grebel School of Entrepreneurship
- **Company name**: Conrad Grebel School of Entrepreneurship
- **Title**: Student
- **Date range**: August 2024
- **Bullets (verbatim)**:
  - Completed entrepreneurship and venture design courses under eCoop with G12.
  - Partnered with Google for Education Startups for mentorship.
  - Built pitch decks, MVPs, and validated early-stage ideas.
- **Tech tags listed**: (not listed as tags in this file; only present as text inside bullets)

#### 7. Freelance Developer | Vasanta Bhavan Oman
- **Company name**: Vasanta Bhavan Oman
- **Title**: Freelance Developer
- **Date range**: March 2024
- **Bullets (verbatim)**:
  - Developed an admin panel using ReactJS and Firebase backend.
  - Built order tracking, staff management, and analytics dashboards.
  - Deployed the system for a restaurant franchise across Oman.
- **Tech tags listed**: (not listed as tags in this file; only present as text inside bullets)

#### 8. Member | Velocity Incubator, University of Waterloo
- **Company name**: Velocity Incubator, University of Waterloo
- **Title**: Member
- **Date range**: September 2023
- **Bullets (verbatim)**:
  - Participated in pitch competitions and startup mentorship.
  - Developed prototypes with support from Velocity advisors.
  - Networked with founders and industry partners.
- **Tech tags listed**: (not listed as tags in this file; only present as text inside bullets)

### 2B) Classic site timeline experience (`src/traditional/TradExp.jsx`)

Main section heading shown:
- `Experience`

Category labels shown (mobile select + desktop tabs):
- `Engineering`
- `Founder Journey`
- `Freelance Work`
- `Open Source / Research`

Label shown above tech tags in Founder Journey cards:
- `Topics`

Badge text shown on the first Founder Journey item:
- `Latest`

#### Founder Journey summary shown (verbatim)

I build products end-to-end—from first commit to real users—usually as a founder or technical co-founder. The thread through my work is education, language, and global communities: shipping platforms people actually use, iterating with partners and users, and staying close to the stack while owning product direction. What follows is a chronological wire of those ventures: the headlines, the build, and the tools behind each one.

#### Engineering (`professionalExperience`)

##### 1. Software Engineer Intern | Carta
- **Company name**: Carta
- **Title**: Software Engineer Intern
- **Date range**: Jan 2026 – Apr 2026
- **Bullets (verbatim)**:
  - Built devtools-mcp, a Chrome extension + Node.js MCP server exposing 16 tools that stream live browser DevTools data (network, console, cookies, storage) directly into Claude Code, eliminating context-switching for engineers during debugging.
  - Architected Project Atlas, a persistent context memory system for Claude, designing a .context/ repo structure and custom MCP server integrating Jira, Slack, and Confluence, reducing token consumption by ~86k tokens per investigation session across agent workflows.
  - Reduced CI pipeline runtime by 42% (12 -> 7 min) on Jenkins; maintained 100+ contributions in first 90 days spanning Django, Python, Datadog, Sentry, CircleCI, and ArgoCD.
  - Led 3 projects end-to-end from scoping to release as primary point of contact, including ERD design, feature flag orchestration, and production job execution on live data.
- **Tech tags listed**: Python · Django · gRPC · PostgreSQL · Docker · Jenkins · Kubernetes · Datadog · Sentry · Jira · MyPy · CI/CD

##### 2. Associate Conversation Design Intern | Cresta AI (Series D)
- **Company name**: Cresta AI (Series D)
- **Title**: Associate Conversation Design Intern
- **Date range**: August 2025
- **Bullets (verbatim)**:
  - Built an LLM-powered redaction auditor that accelerated QA by 98%, automatically flagging sensitive/policy-violating content across thousands of conversations
  - Developed a demo automation suite that improved QA efficiency by 50% and streamlined enterprise ops
  - Audited and optimized conversation workflows for 12 enterprise customers, collaborating cross-functionally with stakeholders
- **Tech tags listed**: Python · LLMs · Jupyter · Dialogflow CX · Google Apps Script · Enterprise AI

##### 3. Software Engineer | E-Coop @ Conrad School of Business
- **Company name**: E-Coop @ Conrad School of Business
- **Title**: Software Engineer
- **Date range**: August 2024
- **Bullets (verbatim)**:
  - Engineered full-stack platform rebuild with Vite ReactJS, Tailwind, and real-time APIs (Google Meet, maps, chat, avatars, bots)
  - Deployed and optimized NLP models for Reddit/YouTube intelligence pipelines on Docker + GCP
  - Collaborated with Conrad Grebel School of Entrepreneurship on venture design and early-stage product validation
- **Tech tags listed**: ReactJS · Vite · Tailwind · Python · Docker · GCP · NLP · ML Microservices

#### Freelance Work (`freelanceWork`)

##### 1. Zafari CC Design — Full Stack Developer
- **Company name**: Zafari CC Design
- **Title**: Full Stack Developer
- **Date range**: May 2025
- **Bullets (verbatim)**:
  - Built a modern, SEO-optimized website for an interior design company
  - Implemented server-side rendering with Next.js for optimal performance
  - Improved client search ranking and user experience
- **Tech tags listed**: Next.js · React · TypeScript · SEO · Server-Side Rendering

##### 2. Metta Stars Foundation — Full Stack Developer
- **Company name**: Metta Stars Foundation
- **Title**: Full Stack Developer
- **Date range**: April 2025
- **Bullets (verbatim)**:
  - Built a full-stack website for an NGO focused on mental health, finance, and spirituality
  - Implemented responsive design and modern UI/UX patterns
  - Integrated content management and user engagement features
- **Tech tags listed**: Vite · React · JavaScript · Web Development

##### 3. Vasanta Bhavan Oman — Full Stack Developer
- **Company name**: Vasanta Bhavan Oman
- **Title**: Full Stack Developer
- **Date range**: September 2023
- **Bullets (verbatim)**:
  - Developed an admin panel using ReactJS and Firebase backend
  - Built order tracking, staff management, and analytics dashboards
  - Deployed the system for a restaurant franchise across Oman
- **Tech tags listed**: ReactJS · Firebase · Admin Panel · Restaurant Management

#### Founder (`founderJourney`)

##### 1. Bhasha — Co-Founder
- **Company name**: Bhasha
- **Title**: Co-Founder
- **Date range**: May 2025
- **Bullets (verbatim)**:
  - Developed a learning platform for Indian languages with mobile and web apps
  - Built using Flutter, Dart, and Supabase for seamless cross-platform experience
  - Integrated backend services for user progress tracking and content delivery
- **Tech tags listed**: Flutter · Dart · Supabase · Next.js · React · TypeScript · Mobile Development

##### 2. G12Uni — Co-Founder & Software Engineer
- **Company name**: G12Uni
- **Title**: Co-Founder & Software Engineer
- **Date range**: August 2024
- **Bullets (verbatim)**:
  - Launched and scaled a global platform connecting 1,500+ university students across 10+ countries
  - Engineered full-stack rebuild with Vite ReactJS, Tailwind, and real-time APIs (Google Meet, maps, chat, avatars, bots)
  - Deployed and optimized NLP models on Docker + GCP, building scalable ML microservices
  - Partnered with Google for Education Startups through eCoop & Conrad Grebel School of Entrepreneurship
- **Tech tags listed**: ReactJS · Vite · Tailwind · Python · Flutter · Dart · Docker · GCP · NLP · Firebase

#### Open Source / Research (`openSource`)

##### 1. Gradio — Contributor | Hugging Face
- **Company name**: Hugging Face
- **Title**: Gradio — Contributor
- **Date range**: 2025
- **Bullets (verbatim)**:
  - Contributed to Gradio, the open-source Python library for building ML web interfaces
  - Enhanced UI components and improved accessibility features for ML demos
  - Collaborated with Hugging Face team on documentation and community support
  - Helped democratize ML by making it easier to share models and create interactive demos
- **Tech tags listed**: Python · Machine Learning · UI/UX · Open Source · Hugging Face

##### 2. Three.js — Contributor
- **Company name**: (not specified)
- **Title**: Three.js — Contributor
- **Date range**: 2024
- **Bullets (verbatim)**:
  - Contributed to Three.js, the popular JavaScript 3D graphics library
  - Improved documentation and created examples for 3D rendering techniques
  - Fixed bugs in shader implementations and optimized performance
  - Enhanced WebGL compatibility and added new helper utilities
- **Tech tags listed**: JavaScript · WebGL · 3D Graphics · Three.js · Open Source

##### 3. Pipette Pro — Core Contributor
- **Company name**: (not specified)
- **Title**: Pipette Pro — Core Contributor
- **Date range**: 2024
- **Bullets (verbatim)**:
  - Major contributor to Pipette Pro, an open-source laboratory management system
  - Developed core features for experiment tracking and data visualization
  - Built RESTful APIs for lab equipment integration
  - Implemented real-time collaboration features for research teams
- **Tech tags listed**: Python · React · Laboratory Management · Data Visualization · Open Source

##### 4. UW Flow — Contributor
- **Company name**: (not specified)
- **Title**: UW Flow — Contributor
- **Date range**: 2024
- **Bullets (verbatim)**:
  - Contributed to UW Flow, the course planning platform for University of Waterloo students
  - Improved course search and filtering algorithms for better user experience
  - Enhanced mobile responsiveness and UI components
  - Fixed bugs and optimized database queries for faster page loads
- **Tech tags listed**: React · Node.js · PostgreSQL · Full Stack · Open Source · Education

---

## 3) Every piece of static text on the site

This section collects visible headings, labels, UI text, tooltips, placeholders, and other copy found in the shipped routes.

### 3A) Classic site (`/`) — `src/traditional/TraditionalHome.jsx` + related components

#### Mobile top bar
- `Close menu` (aria-label when menu open)
- `Open menu` (aria-label when menu closed)
- `Rhythm Chawla`

#### Sidebar nav copy (buttons/labels)
- `Experience`
- `All Experience`
- `Engineering`
- `Founder`
- `Freelance`
- `Open Source / Research`
- `Projects`
- `All Projects`
- `Certifications`
- `View`
- `Resume`

#### Right top bar
- `Rhythm Chawla`

#### Footer
- `© 2025 Rhythm Chawla. All rights reserved.`

#### Floating tooltip on chibi Naruto link
- `Click to enter 3D World!`

#### Resume section button (`src/traditional/TradResume.jsx`)
- `Open Resume PDF`

#### Projects section UI copy (`src/traditional/TradProjCoffeeLines.jsx`)
- `Projects` (main h2)
- `Category` (label above category select)
- Search input placeholder: `Search by technology or project name...`
- Empty state: `No matching projects.`
- Detail section label: `Tech Stack`
- Link labels: `Demo →`, `GitHub →`
- Mobile list toggles:
  - `Show all {N} projects`
  - `Show top 5 only`

#### Certifications section UI copy (`src/traditional/TradCert.jsx`)
- Heading: `🏆 Certifications & Achievements`
- Mobile carousel:
  - `Previous certificate` (aria-label)
  - `Next certificate` (aria-label)
  - `{index} / {total}`
  - CTA: `View current certificate →`
- Desktop:
  - CTA: `View Certification →`

#### Experience section UI copy (`src/traditional/TradExp.jsx`)
- Heading: `Experience`
- Category label: `Category`
- Category names:
  - `Engineering`
  - `Founder Journey`
  - `Freelance Work`
  - `Open Source / Research`
- Founder timeline:
  - Badge: `Latest`
  - Tag label: `Topics`

#### Floating icons (classic site) (`src/components/FloatingIcons.jsx`)
- Resume icon label text: `CV`
- Devpost icon label text: `DP`
- Links (hrefs):
  - GitHub: https://github.com/RhyChaw
  - LinkedIn: https://linkedin.com/in/rhychaw
  - Resume PDF: /resumes/resume.pdf
  - Devpost: https://devpost.com/RhyChaw

### 3B) 3D world (`/naruto`) — `src/pages/Home.jsx` + popups/components

#### Floating labels in room (`src/pages/Home.jsx`)
- `💻 Links`
- `📄 Resume`
- `🏅 Certifications`
- `📁 Projects`
- `📬 Contact Us`
- `💼 Experience`
- `📸 Gallery`

#### Top-left instruction widget (`src/pages/Title.jsx`)

Collapsed button:
- `☰`

Expanded content:
- `🗡️ Rhythm's Portfolio`
- `🗺️ Explore: Move Naruto around your 3D room.`
- `🎮 Controls: Use arrow keys to walk. Click the radar to teleport.`
- `🌀 Discover: Click on different areas to learn about my work.`
- `📜 Tip: The minimap dots show different sections.`
- `Return to classic website`

#### NarutoBot chat widget
- Removed from the shipped 3D world until it works in production.

#### Links popup (`src/pages/Links.jsx`)
- Heading: `💻 Ninja Terminal`
- Description: `Find me across the Shinobi Web:`
- Labels:
  - `GitHub:`
  - `LinkedIn:`
  - `Email:`
- Link text values:
  - `github.com/RhyChaw`
  - `rhythm-chawla`
  - `r3chawla@uwaterloo.ca`
- Close button: `Close Scroll`

#### Resume popup (`src/pages/Resume.jsx`)
- Heading: `📄 Resume & CV`
- Close button: `Close`
- PDF fileUrl: `/resumes/resume.pdf`

#### Certifications popup (`src/pages/Certifications.jsx`)
- Heading: `🏆 Certifications & Achievements`
- Button text: `View Certificate →`
- Close button: `Close`

#### Projects popup (`src/pages/Projects.jsx`)
- Heading: `📁 Featured Projects`
- Filter labels shown: `All`, `Web Dev`, `AI`
- In-progress badge text: `In Progress`
- Close button: `Close`

#### Contact popup (`src/pages/Contact.jsx`)
- Heading: `📜 Summoning Scroll`
- Description: `Channel your chakra into this scroll to summon a message my way.`
- Input placeholders:
  - `Your Name`
  - `Your Email`
  - `Type your message like a hidden jutsu...`
- Submit button: `🌀 Summon My Message`
- Close button: `Close Scroll`
- Email target: `mailto:r3chawla@uwaterloo.ca`
- Email subject format: `Summoning Message from ${name}`

#### Gallery popup (`src/pages/PhotoGallery.jsx`)
- Heading: `📸 Ninja Memories: Coming Soon`
- Body text:
  - `I’m sealing these precious moments away in a hidden scroll for now.`
  - `Return soon to unveil snapshots of my ninja journey across Konoha and beyond!`
- Close button: `Close Scroll`

#### Radar minimap legend (`src/components/RadarMinimap.jsx`)
- Legend title: `🗺️ Legend`
- Legend rows:
  - `Naruto (You)`
  - `Links`
  - `Resume`
  - `Certifications`
  - `Projects`
  - `Contact Me`
  - `Experience`
  - `Photo Gallery`

#### 3D-world Navbar menu items (`src/components/Navbar.jsx`)

Non-mobile (top navbar) and mobile (scroll modal) both list the same labels (keys of `zones`):
- `Projects`
- `Certifications`
- `Links`
- `Resume`
- `Experience`
- `Gallery`
- `Naruto`

---

## 4) Navigation structure (items, destinations, whether destination has content)

### 4A) Router-level navigation (`src/App.jsx`)
- `/` -> renders `TraditionalHome` (classic site) **has content**
- `/naruto` -> renders `Home` (3D world) **has content**
- `*` -> redirects to `/`

### 4B) Classic site sidebar navigation (`src/traditional/TraditionalHome.jsx`)

#### Experience
- **Links to**:
  - `All Experience` -> scrollToId(`experience`) **has content**
  - Category buttons `Engineering`, `Founder`, `Freelance`, `Open Source / Research` -> expand nested list (then scroll to specific `experience-{cat}-{idx}`) **has content**
  - Nested entry label is `exp.title.split('|')[0].trim()` (so the button text is derived from each item’s `title`)

#### Projects
- **Links to**:
  - `All Projects` -> toggles a nested list, then each project button scrolls to `projects` and dispatches `traditional-select-project` with the title **has content**
  - Nested list item text: the full `proj.title`

#### Certifications
- **Links to**:
  - `View` -> scrollToId(`certifications`) **has content**

#### Resume
- **Links to**: `/resumes/resume.pdf` (opens in new tab) **has content (PDF)**

#### Chibi Naruto floating link
- **Links to**: `/naruto` **has content**

### 4C) 3D world navbar (`src/components/Navbar.jsx`)

Menu items and behavior:
- `Naruto` -> sets `window.location.href = '/naruto'` (stays in 3D world) **has content**
- `Projects` -> calls `onNavigate(zones.Projects)` (moves Naruto toward the Projects zone) **has content**
- `Certifications` -> moves Naruto toward Certifications zone **has content**
- `Links` -> moves Naruto toward Links zone **has content**
- `Resume` -> moves Naruto toward Resume zone **has content**
- `Experience` -> moves Naruto toward Experience zone **has content**
- `Gallery` -> moves Naruto toward Gallery zone **has content (but says “Coming Soon”)**

---

## 5) Certifications section — every certification (issuer + date)

Certifications are defined twice (same list) in:
- `src/pages/Certifications.jsx` (3D popup)
- `src/traditional/TradCert.jsx` (classic site)

### Certifications list (as defined)

#### 1) Introduction to Quantum Computing
- **Issuer**: Udemy
- **Completion date**: 06-06-2024
- **Image**: /images/certifications/Quantum.png
- **Certificate link**: https://www.udemy.com/certificate/UC-eb95898f-1e56-403c-8dab-466467fc17c5/

#### 2) Advanced CSS
- **Issuer**: Udemy
- **Completion date**: 04-07-2024
- **Image**: /images/certifications/AdvancedCSS.png
- **Certificate link**: https://www.udemy.com/certificate/UC-46fc113c-2139-4ce9-939e-0a9a2febb0fd/

#### 3) (typo in 3D popup only) “Maching Learning A-Z” / (classic site) “Machine Learning A-Z”
- **Issuer**: Udemy
- **Completion date**: 19-07-2024
- **Image**: /images/certifications/MachineLearning.png
- **Certificate link**: https://www.udemy.com/certificate/UC-a2ab1162-0958-487f-af70-a1f989323ac0/

#### 4) (typo in 3D popup only) “Artificial Intellingence A-Z” / (classic site) “Artificial Intelligence A-Z”
- **Issuer**: Udemy
- **Completion date**: 01-08-2024
- **Image**: /images/certifications/ArtificialIntellingenceA-Z.png
- **Certificate link**: https://www.udemy.com/certificate/UC-2065078c-6c73-4224-90ce-5b7e51498e2e/

#### 5) Ultimate React Course
- **Issuer**: Udemy
- **Completion date**: 17-08-2024
- **Image**: /images/certifications/UltimateReact.png
- **Certificate link**: https://www.udemy.com/certificate/UC-a72a253c-0919-4089-9a95-4a11dc2bbb36/

---

## 6) The 3D world content (labels/signs + interactive objects + behavior)

### Visible text in the 3D room

#### Floating labels (`src/pages/Home.jsx`)
- `💻 Links`
- `📄 Resume`
- `🏅 Certifications`
- `📁 Projects`
- `📬 Contact Us`
- `💼 Experience`
- `📸 Gallery`

#### Radar minimap legend (`src/components/RadarMinimap.jsx`)
- `🗺️ Legend`
- `● Naruto (You)`
- `● Links`
- `● Resume`
- `● Certifications`
- `● Projects`
- `● Contact Me`
- `● Experience`
- `● Photo Gallery`

#### 3D navbar menu labels (`src/components/Navbar.jsx`)
- `Projects`
- `Certifications`
- `Links`
- `Resume`
- `Experience`
- `Gallery`
- `Naruto`

#### Instruction widget text (`src/pages/Title.jsx`)
- `🗡️ Rhythm's Portfolio`
- `🗺️ Explore: Move Naruto around your 3D room.`
- `🎮 Controls: Use arrow keys to walk. Click the radar to teleport.`
- `🌀 Discover: Click on different areas to learn about my work.`
- `📜 Tip: The minimap dots show different sections.`
- `Return to classic website`

### Interactive objects / interactions and what they do

#### Player movement (Naruto)
- Model: `/models/naruto.glb`
- Controls (as stated in UI): `Use arrow keys to walk.`
- Also supports: `KeyW`, `KeyA`, `KeyS`, `KeyD`, `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`, sprint on `ShiftLeft` / `ShiftRight`.

#### Proximity-based popups (zone triggers) (`src/pages/Home.jsx`)
When Naruto is within threshold distance `2.5` of each zone target:
- **Links zone** -> opens `Links` popup
- **Resume zone** -> opens `Resume` popup
- **Certifications zone** -> opens `Certifications` popup
- **Projects zone** -> opens `Projects` popup
- **Contact zone** -> opens `Contact` popup
- **Experience zone** -> opens `Experience` popup
- **Gallery zone** -> opens `PhotoGallery` popup (Coming Soon)

Zone coordinates (from `Home.jsx` / `Navbar.jsx` / `RadarMinimap.jsx`):
- Links: `{ x: 10.25, y: 0.4, z: -5.63 }`
- Resume: `{ x: -0.03, y: 0.4, z: -9.67 }`
- Certifications: `{ x: 10.67, y: 0.4, z: 3.39 }`
- Projects: `{ x: -6.06, y: 0.4, z: 1.64 }`
- Contact: `{ x: -2.54, y: 0.4, z: 9.51 }`
- Experience: `{ x: 6.31, y: 0.4, z: -8.4 }`
- Gallery: `{ x: 5.33, y: 0.4, z: 9.10 }`

#### Radar minimap click-to-teleport (`src/components/RadarMinimap.jsx` + `src/pages/Home.jsx`)
- UI text says: `Click the radar to teleport.`
- Implementation: minimap calculates world coordinates and calls `onClickTeleport?.({ x: worldX, z: worldZ })`
- Note: in `src/pages/Home.jsx`, `handleRadarClick` is defined as `const handleRadarClick = () => {};` and `RadarMinimap` is rendered as `<RadarMinimap narutoPosition={coords} />` (so teleport handler does not appear wired in this file as written).

#### Navbar click-to-navigate in 3D world (`src/components/Navbar.jsx`)
- Clicking a label (e.g., `Projects`) calls `onNavigate(zones[label])` which, in `Home.jsx`, sets:
  - `setStartPos(narutoPos);`
  - `setTargetPos(pos);`
  (Navigation logic beyond that is not shown in this file’s current content export.)

#### ChatBot UI
- Removed from the shipped 3D world until it works in production.

---

## 7) Anything that looks outdated, broken, or embarrassing (evidence-based)

This section lists concrete issues found in the repo content and wiring.

### Dates that say “Present” but might not
- `src/traditional/TradExp.jsx` has: `Software Engineer Intern | Carta` with year `Jan 2026 – Apr 2026`
- `src/pages/Experience.jsx` has: `Software Engineer Intern | Carta Maple Kitchener, ON` with year `Jan 2026 – Apr 2026`
- `public/resumes/resume.pdf` text extraction has: `Software Engineer Intern Jan 2026 – Present` (PDF needs regeneration to match Apr 2026)

### Projects marked `inProgress: true`
In `src/pages/ProjectsData.jsx`, these projects have `inProgress: true`:
- (none; flags removed)

### Placeholder / “coming soon” copy still present
- `src/pages/PhotoGallery.jsx`:
  - `📸 Ninja Memories: Coming Soon`
  - `I’m sealing these precious moments away in a hidden scroll for now.`
  - `Return soon to unveil snapshots of my ninja journey across Konoha and beyond!`
- `src/traditional/TradGallery.jsx`:
  - `Gallery images coming soon...`
  - (and the `galleryImages` array is empty)

### Broken / placeholder links
- In `src/pages/ProjectsData.jsx`:
- In `src/traditional/TraditionalHome.jsx`:
  - Resume link: `/resumes/resume.pdf` (exists)
- In 3D chat:
  - Removed from the shipped 3D world until it works in production.

### Project filtering mismatch (3D Projects popup)
- `src/pages/Projects.jsx` filter categories are: `All`, `Web Dev`, `AI`
- In `src/pages/ProjectsData.jsx`, project categories are: `Data Engineering`, `Full Stack`, `Robotics / Hackathon`, `C++ / Game Dev`, `Full-Stack / Systems`, `AI/ML`, `Product / Extension`, `Systems / DevTools`, `Game Development`, `Full Stack / AI`, `Hackathon`, `ML`, `Free Lance`, etc.
- Result: filtering by `Web Dev` or `AI` likely yields empty / unexpected results.

### Gallery nav exists but gallery content is “Coming Soon”
- In 3D world:
  - Floating label: `📸 Gallery`
  - Navbar item: `Gallery`
  - Popup: `📸 Ninja Memories: Coming Soon`

### Unused / not routed content that still contains visitor-facing copy
- Previously: `src/pages/AestheticHome.jsx` (deleted)

### Potential broken image reference (project image import vs file name)
- `src/pages/ProjectsData.jsx` imports `Watopoly` from `../proj/watopoly.JPG`
- In `src/proj/`, the file present is `Watopoly.png` (capitalized) (actual file listing indicates `Watopoly.png` exists; a case-sensitive environment may fail this import).

### Projects missing images
- `Pipette Pro — Best Prototype, Google × UWaterloo Symposium` has `image: null` (comment in data: `// add image`)

---

## 8) Gallery section — every item (with caption/description)

### Classic site gallery (`src/traditional/TradGallery.jsx`)
- `galleryImages` array is currently empty (`[]`), so there are **no gallery items** defined.
- Placeholder shown:
  - Heading: `📸 Gallery`
  - Body: `Gallery images coming soon...`

### 3D world gallery (`src/pages/PhotoGallery.jsx`)
- There are **no gallery items**; it displays only a “Coming Soon” message:
  - `📸 Ninja Memories: Coming Soon`
  - `I’m sealing these precious moments away in a hidden scroll for now.`
  - `Return soon to unveil snapshots of my ninja journey across Konoha and beyond!`

---

## Appendix: Resume PDF text (visitor-visible content)

This is the extracted text content from `public/resumes/resume.pdf`:

Rhythm Chawla
Portfolio | +1 (437)-667-5557 | Email | Linkedin | Github
Work Experience
Software Engineer Intern Jan 2026 – Present
Carta | Python, Django, gRPC, Jenkins, CircleCI, ArgoCD, Datadog Kitchener, ON
– Built devtools-mcp, a Chrome extension + Node.js MCP server exposing 16 tools that stream live browser
DevTools data (network, console, cookies, storage) directly into Claude Code, eliminating context-switching
for engineers during debugging.
– Architected Project Atlas, a persistent context memory system for Claude, designing a .context/ repo
structure and custom MCP server integrating Jira, Slack, and Confluence, reducing token consumption by
∼86k tokens per investigation session across agent workflows.
– Reduced CI pipeline runtime by 42% (12 → 7 min) on Jenkins; maintained 100+ contributions in first 90
days spanning Django, Python, Datadog, Sentry, CircleCI, and ArgoCD.
– Led 3 projects end-to-end from scoping to release as primary point of contact, including ERD design, feature
flag orchestration, and production job execution on live data.
Associate Conversation Design Intern May 2025 – Aug 2025
Cresta | LLMs, Google Apps Script, Python Remote
– Built an LLM-powered auditing system that processed 10,000 conversation logs per run and cut manual QA
time by 98%, enabling reviewers to clear multi-week backlogs in under a day.
– Conducted QA for AI agent behavior detection across 12 enterprise clients including Royal Caribbean,
coordinating with customer-facing teams to validate conversation flows and surface edge cases for model
improvements.
Founding Engineer (Co-op Rating: Outstanding ) May 2024 – Aug 2024
Conrad Grebel School of Entrepreneurship | React, Next.js, Flutter, Firebase, GCP Waterloo, ON
– Founded G12Uni, an AI-powered university admissions platform, building the full-stack web app (React,
Next.js) and mobile app (Flutter, Swift) on Firebase for auth, hosting, and Firestore as the primary database.
– Built Jado, an LLM-powered research assistant extending Perplexity-style search with Reddit, YouTube, and
web scraping pipelines to surface richer university-specific insights for students.
– Scaled the platform to 40,000 monthly site visits and 2,000+ MAU; pitched to 24 high schools and secured 5
pilot agreements, validating product-market fit under university program requirements.
– Deployed containerized services on GCP with centralized logging and metrics, improving mean time to detect
production issues by 50% during peak traffic events.
Projects
Clash Royale Analytics Platform | github.com/RhyChaw/clashroyalestats
Python, PostgreSQL, dbt, FastAPI, Streamlit, scikit-learn, XGBoost
– Engineered an end-to-end analytics platform ingesting 50,000+ battle logs per day into PostgreSQL via batch
pipelines and dbt transformations with automated data quality checks.
– Trained and deployed ML models (scikit-learn/XGBoost) to serve live win-probability predictions, cutting
manual matchup analysis time by roughly 70%.
Technical Skills
Languages: Python, C++, C, Java, Rust, Go, Bash, JavaScript, TypeScript
Systems & Backend: Docker, Kubernetes, GCP, AWS, Django, FastAPI, Spring Boot, gRPC, PostgreSQL
Testing: pytest, unittest, JUnit, Jest, Testcontainers, integration testing, CI/CD pipelines
Education
University of Waterloo Sep 2024 – Apr 2028 (Expected)
BCS Honours COOP | AI & HCI Specialization, Minor in Entrepreneurship Waterloo, ON
– Coursework: Algorithms, Numerical Computation, Probability & Statistics, Linear Algebra, Data Structures.

