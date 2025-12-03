import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, writeBatch } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_qwoarqEx4OOXAIML1baRlCt8h2VyoJc",
  authDomain: "portfolio-8b2b8.firebaseapp.com",
  projectId: "portfolio-8b2b8",
  storageBucket: "portfolio-8b2b8.firebasestorage.app",
  messagingSenderId: "256436097194",
  appId: "1:256436097194:web:2e7db3c59a174e1efac0d3",
  measurementId: "G-28Z67HXCL0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Helper function to create a URL-safe ID from title
function createId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Split projects by category
function categorizeProjects(projects) {
  const categories = {
    fullStack: [],
    aiMl: [],
    hackathon: [],
    freelance: [],
    dataEngineering: [],
    systems: [],
    gamedev: [],
    robotics: [],
  };

  projects.forEach(project => {
    const cat = project.category.toLowerCase().replace(/\s+/g, '');
    
    if (cat.includes('fullstack') || cat.includes('full-stack') || cat.includes('fullstack/ai')) {
      categories.fullStack.push(project);
    } else if (cat.includes('ai') || cat.includes('ml')) {
      categories.aiMl.push(project);
    } else if (cat.includes('hackathon')) {
      categories.hackathon.push(project);
    } else if (cat.includes('freelance') || cat.includes('freelance')) {
      categories.freelance.push(project);
    } else if (cat.includes('data') || cat.includes('engineering')) {
      categories.dataEngineering.push(project);
    } else if (cat.includes('systems') || cat.includes('devtools')) {
      categories.systems.push(project);
    } else if (cat.includes('game') || cat.includes('c++')) {
      categories.gamedev.push(project);
    } else if (cat.includes('robotics')) {
      categories.robotics.push(project);
    } else {
      categories.fullStack.push(project);
    }
  });

  return categories;
}

// Upload to Firebase using batched writes
async function uploadToFirebase() {
  try {
    console.log('🚀 Starting upload to Firebase Firestore...\n');

    const categorized = categorizeProjects(projectsData);

    // Upload each category
    for (const [categoryName, projects] of Object.entries(categorized)) {
      if (projects.length === 0) continue;

      console.log(`📦 Uploading ${projects.length} projects to "${categoryName}" collection...`);

      for (const project of projects) {
        const docId = createId(project.title);
        const docRef = doc(db, categoryName, docId);
        
        await setDoc(docRef, {
          ...project,
          id: docId,
          uploadedAt: new Date().toISOString(),
        });

        console.log(`  ✓ Uploaded: ${project.title}`);
      }
      console.log(`  💾 Completed ${categoryName}\n`);
    }

    // Upload all projects to master collection
    console.log(`📦 Uploading all ${projectsData.length} projects to "allProjects" collection...`);
    
    for (const project of projectsData) {
      const docId = createId(project.title);
      const docRef = doc(db, 'allProjects', docId);
      
      await setDoc(docRef, {
        ...project,
        id: docId,
        uploadedAt: new Date().toISOString(),
      });

      console.log(`  ✓ Uploaded: ${project.title}`);
    }
    console.log(`  💾 Completed allProjects\n`);

    console.log('\n✅ All data uploaded successfully!');
    console.log('\n📊 Collections created:');
    console.log('   - allProjects (master collection with all projects)');
    Object.entries(categorized).forEach(([cat, projects]) => {
      if (projects.length > 0) {
        console.log(`   - ${cat} (${projects.length} projects)`);
      }
    });

    console.log('\n🎉 Upload complete!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error uploading to Firebase:', error);
    process.exit(1);
  }
}

// All projects data from ProjectsData.jsx
const projectsData = [
  {
    title: 'Clash Royale Analytics Platform',
    description: 'Engineered an end-to-end analytics platform for Clash Royale, automating ingestion of 50k+ battle logs via Python, transforming raw data into analytics-ready tables with dbt and PostgreSQL, and delivering live match outcome predictions through ML models (scikit-learn/XGBoost) served by FastAPI and visualized on an interactive Streamlit dashboard with AI-powered insights; implemented rigorous data quality checks, CI/CD, and containerization for production deployment.',
    tech: 'Python, PostgreSQL, dbt, FastAPI, Streamlit, scikit-learn, XGBoost, Docker, CI/CD, Data Engineering, Machine Learning, Analytics',
    git: 'https://github.com/RhyChaw/clashroyalestats',
    category: 'Data Engineering',
    date: 'October 2025',
    imageName: 'ClashRoyale.png'
  },
  {
    title: 'SportSpark',
    description: 'A smart web platform that makes anyone confident enough to talk about any sport in 5 minutes. Features instant sport mastery, trends, newsletters, interactive learning across levels, rich sport overview pages (rules, vocab, competitions, players/teams, storylines, culture), responsive UI, dark mode, and fast performance.',
    tech: 'Next.js 14, React, TypeScript, Tailwind CSS, Headless UI, Lucide, Vercel',
    git: 'https://github.com/RhyChaw/ByteS',
    category: 'Full Stack',
    date: 'October 2025',
    imageName: 'SportSpark.png'
  },
  {
    title: 'SWARM 2025 — Predator–Prey Swarm Robotics',
    description: 'Built 10 full robots from the ground up at SWARM 2025 in Kitchener (100+ students, 500+ robots). From hands-on soldering to programming with Docker and ROS, we engineered emergent predator–prey behaviors inspired by nature. Grateful to GRAM, UW Robotics, sponsors, and mentors.',
    tech: 'Robotics, ROS, Docker, Embedded Systems, Swarm Intelligence, Multi-Agent Systems, Hardware',
    git: 'https://github.com/AarjavPatni/hero-macos-arm64/',
    category: 'Robotics / Hackathon',
    date: 'October 2025',
    imageName: 'swarm.png'
  },
  {
    title: "Texas Hold'em Poker – Enhanced Professional Version",
    description: 'Professional-grade C++ Texas Hold\'em with SFML 3.0 graphics, modular architecture, and a full main menu + settings system. Features 2–6 players, customizable blinds/stacks, responsive UI, real-time stats, and AI with Monte Carlo simulation for decision-making.',
    tech: 'C++17, SFML 3.0, CMake, Modular Architecture, Monte Carlo AI',
    git: 'https://github.com/RhyChaw/poker',
    category: 'C++ / Game Dev',
    date: 'October 2025',
    imageName: 'poker.png'
  },
  {
    title: 'marketSim',
    description: 'High-performance real-time market replay and simulation engine with deterministic OCaml core, pluggable strategy SDKs, and interactive dashboard for control and visualization.',
    tech: 'OCaml, Node.js, TypeScript, React, Next.js, Python, Rust, Yarn, PNPM, Parquet, Arrow, WebSocket, REST',
    git: 'https://github.com/RhyChaw/marketSim',
    category: 'Full-Stack / Systems',
    date: 'September 2025',
    inProgress: true,
    imageName: null
  },
  {
    title: 'DJ AI',
    description: 'A next-gen AI DJ system where each song gets mixed and mashed by an AI',
    tech: 'PyTorch, TensorFlow, Python, FastAPI, Three.js, WebGL, JavaScript, Web3, Ethereum, Smart Contracts, Reinforcement Learning, Bayesian ML, One-Shot Learning, Neural Networks',
    link: 'https://d-c1qmyx10z-rhychaws-projects.vercel.app/',
    git: 'https://github.com/RhyChaw/DJAi',
    category: 'AI/ML',
    date: 'September 2025',
    inProgress: true,
    imageName: 'DJAi.png'
  },
  {
    title: 'OneAddress – Chrome Extension',
    description: 'A powerful Chrome extension to manage and autofill multiple addresses (home, work, temporary) across the web with one click. Beautiful Skype‑blue UI, fast, secure, and fully local (no servers, no tracking).',
    tech: 'Chrome Extensions, Manifest V3, JavaScript, React/Next.js, Content Scripts, Service Workers, Chrome Storage',
    git: 'https://github.com/RhyChaw/oneAddress',
    category: 'Product / Extension',
    date: 'September 2025',
    imageName: 'OneAddress.png'
  },
  {
    title: 'NeuroClash – Adaptive Meta-AI Combatants',
    description: 'A next-gen self-evolving AI fighter system where each agent dynamically adapts its fighting style during battle based on opponent behavior, using Bayesian meta-learning + reinforcement learning + one-shot adaptation.',
    tech: 'PyTorch, TensorFlow, Python, FastAPI, Three.js, WebGL, JavaScript, Web3, Ethereum, Smart Contracts, Reinforcement Learning, Bayesian ML, One-Shot Learning, Neural Networks',
    git: 'https://github.com/RhyChaw/neuroclash',
    category: 'AI/ML',
    date: 'September 2025',
    inProgress: true,
    imageName: 'NeuroClash.png'
  },
  {
    title: 'Global Equity Simulator',
    description: 'Full-stack SaaS app to simulate global employee equity grants with country-specific tax and regulation rules, interactive cap table visualization, and automated compliance reporting.',
    tech: 'React, TypeScript, Django, DRF, Spring Boot, Java, Docker, Kubernetes, Helm',
    git: 'https://github.com/RhyChaw/global-equity-simulator',
    category: 'Full Stack',
    date: 'September 2025',
    inProgress: true,
    imageName: 'Equityy.png'
  },
  {
    title: 'PolyScale — Distributed AI-Accelerated Code Search & Refactor',
    description: 'Monorepo scaffold for a Google-scale code search and refactoring system: Gateway HTTP API (Go), in-memory search daemon (Go), ML service (Python/FastAPI) for embeddings and refactor suggestions.',
    tech: 'Go, Python, FastAPI, gRPC, Protobuf, Docker, Docker Compose, FAISS, Next.js',
    category: 'Systems / DevTools',
    git: 'https://github.com/RhyChaw/repofactor',
    date: 'September 2025',
    inProgress: true,
    imageName: null
  },
  {
    title: 'SPOOK - Horror Game (Horror Hacks 2025)',
    description: 'Built an entire horror game for Horror Hacks September 2025. Features cinematic effects, immersive sound design, and 3D horror gameplay.',
    tech: 'Next.js, Three.js, Vercel, JavaScript, WebGL',
    link: 'https://spooky-nu.vercel.app/',
    git: 'https://github.com/RhyChaw/spooky',
    category: 'Hackathon',
    date: 'September 2025',
    inProgress: true,
    imageName: 'Spook.png'
  },
  {
    title: 'SnapSafe (Hack the North 2025)',
    description: 'Built SnapSafe, a real-time AR fire evacuation system on Snap AR glasses. Used depth caching, world query hits, and ray casting to dynamically detect exits and guide users with pathfinding arrows.',
    tech: 'Snap AR, Lens Studio, Roboflow, ONNX, Computer Vision, AR/VR',
    link: 'https://www.youtube.com/watch?v=ajmASxcm4OA',
    git: 'https://github.com/AshishA26/HackTheNorth2025',
    category: 'Hackathon',
    date: 'September 2025',
    imageName: 'SnapSafe.png'
  },
  {
    title: 'Bhasha Mobile App',
    description: 'Startup App for Learning Indian Languages with backend integration',
    tech: 'Flutter, Dart, Supabase, Mobile Development',
    git: '#',
    category: 'Full Stack',
    date: 'June 2025',
    inProgress: true,
    imageName: 'Bhasha.png'
  },
  {
    title: 'StrumSpace (SpurHacks Hackathon)',
    description: 'Computer Vision based 3D web dev app, which annotates chords on guitar Live using YOLOv8',
    tech: 'YOLOv8, Computer Vision, 3D Web, JavaScript, Machine Learning',
    git: 'https://github.com/LuhemRevorg/StrumSpace',
    category: 'Hackathon',
    date: 'June 2025',
    imageName: 'StrumSpace.png'
  },
  {
    title: 'Bhasha Web App',
    description: 'Startup App for Learning Indian Languages',
    tech: 'Next.js, React, TypeScript, Web Development',
    git: 'https://github.com/RhyChaw/bhasha-web',
    link: 'https://learnwithbhasha.com/',
    category: 'Full Stack',
    date: 'May 2025',
    imageName: 'Bhasha.png'
  },
  {
    title: 'Zafari CC Design (FreeLance)',
    description: 'Web application for Zafari CC Design',
    tech: 'Next.js, React, TypeScript, Web Development',
    link: 'https://www.zafariccdesign.com/',
    category: 'Free Lance',
    date: 'May 2025',
    imageName: 'Zafari.png'
  },
  {
    title: 'Watopoly - Waterloo Monopoly',
    description: 'Monopoly-inspired board game set on University of Waterloo campus! Features Waterloo landmarks, trading system, save/load functionality, and auction mechanics.',
    tech: 'C++, Object-Oriented Programming, Git',
    git: 'https://github.com/RhyChaw/watopoly',
    category: 'Game Development',
    date: 'March 2025',
    imageName: 'watopoly.JPG'
  },
  {
    title: 'Velocity Health Innovation – Monorepo',
    description: 'Monorepo with a React web app, Expo React Native mobile app, and FastAPI backend using LangChain agents with OpenAI (LLM + Whisper), Pinecone vector store, and ElevenLabs TTS.',
    tech: 'React, React Native (Expo), FastAPI, LangChain, OpenAI, Whisper, Pinecone, ElevenLabs, Supabase',
    category: 'Full Stack / AI',
    date: 'March 2025',
    imageName: 'VelocityGRH.png'
  },
  {
    title: 'PawPal (GeeseHacks Hackathon)',
    description: 'AI based Pet care app which can detect pet diseases, recommend food, and find pet sitters',
    tech: 'AI/ML, Computer Vision, Mobile Development, Machine Learning',
    link: 'https://devpost.com/software/heads-up-for-tails',
    git: 'https://github.com/LuhemRevorg/the-pet-project-GH-2025-',
    category: 'Hackathon',
    date: 'January 2025',
    imageName: 'PawPal.png'
  },
  {
    title: 'MineGuard (Hack the Valley Hackathon)',
    description: 'AI based mining safety app which can detect unsafe conditions and alert workers',
    tech: 'AI/ML, Computer Vision, Mobile Development, Safety Systems',
    link: 'https://devpost.com/software/mineguard',
    git: 'https://github.com/RhyChaw/mineguard',
    category: 'Hackathon',
    date: 'October 2024',
    imageName: 'MineGuard.png'
  },
  {
    title: 'Rhythm (Hack the Hill, Ottawa)',
    description: 'Developed an AI-powered voice coach leveraging Meta\'s Wav2Vec2 model and Apple\'s SEP-28K dataset to detect stuttering and enhance speech clarity, helping users improve public speaking skills through real-time feedback.',
    tech: 'Wav2Vec2, OpenAI API, librosa, SciPy, React.js, Particle.js, Machine Learning',
    link: 'https://devpost.com/software/rhythm-o8rwp4',
    git: 'https://github.com/LuhemRevorg/HTH_project',
    category: 'Hackathon',
    date: 'September 2024',
    imageName: 'rhythm.png'
  },
  {
    title: 'Rocket Landing AI Project',
    description: 'App using Deep Q learning for rocket landing simulation',
    tech: 'Google Colab, Python, Gymnasium, Deep Q Learning, Reinforcement Learning',
    link: 'https://colab.research.google.com/drive/1SgdMlL2zM2HERCBJ5yhpVtbO7QtdDGMh',
    category: 'ML',
    date: 'September 2024',
    imageName: 'RocketLanding.png'
  },
  {
    title: 'Kung Fu Master AI Project',
    description: 'Developed an A3C reinforcement learning setup in Google Colab using Python and Gymnasium. Trained multiple asynchronous agents and built a robust environment for evaluating RL performance and training efficiency.',
    tech: 'Google Colab, Python, Gymnasium, A3C, Reinforcement Learning',
    link: 'https://colab.research.google.com/drive/1anhsl9AGsTMMapq3tuhQBghW0d4fqHmS',
    git: '#',
    category: 'ML',
    date: 'August 2024',
    imageName: 'KungFuMaster.png'
  },
  {
    title: 'JADO AI',
    description: 'Developed an AI-powered chatbot designed to assist university applicants by analyzing YouTube videos, providing links to academic papers, and offering resume feedback. Implemented advanced NLP models for Reddit scanning and personalized academic recommendations.',
    tech: 'Python, Docker, NLP, Machine Learning, AI, Containerization',
    git: 'https://github.com/RhyChaw/Jado',
    category: 'ML',
    date: 'July 2024',
    imageName: 'JadoAI.png'
  },
  {
    title: 'Doctor AI Project',
    description: 'Developed a medically fine-tuned LLM using Llama2 (Meta), trained on curated medical datasets from Hugging Face. Implemented advanced NLP preprocessing, data augmentation, and fine-tuning techniques.',
    tech: 'Llama2, Hugging Face, NLP, Medical AI, Fine-tuning, Data Augmentation',
    link: 'https://colab.research.google.com/drive/1dJVq9tbPk0IwA3Tbpxvl0_9iZqKzXDaX',
    category: 'ML',
    date: 'July 2024',
    imageName: 'DoctorAI.png'
  },
  {
    title: 'Velocity - Grand River Hospital Innovation Challenge',
    description: 'Developed a comprehensive data management system for Grand River Hospital to restructure and organize their data efficiently. Built as a React-based mobile web application.',
    tech: 'React, Data Visualization, Mobile Web, Healthcare Tech',
    git: 'https://github.com/RhyChaw/GRHVel',
    category: 'Full Stack',
    date: 'June 2024',
    imageName: 'VelocityGRH.png'
  },
  {
    title: 'G12',
    description: 'Startup App for university students',
    tech: 'Vite, React, Firebase, Web Development',
    link: 'https://g12uni.com',
    git: 'https://github.com/Ejtehad/g12newver',
    category: 'Full Stack',
    date: 'June 2024',
    imageName: 'G12Proj.png'
  },
  {
    title: 'G12 Mobile App',
    description: 'Startup Mobile App for university students',
    tech: 'Flutter, Dart, Firebase, Mobile Development',
    git: 'https://github.com/G12Uni/g12app',
    category: 'Full Stack',
    date: 'June 2024',
    imageName: 'G12Proj.png'
  },
  {
    title: 'CSGPTPRO Hackathon Project',
    description: 'Developed "CS GPT PRO," an AI-powered chatbot designed to provide precise answers for university courses at UW and UofT. Engineered using Arctic hosting, Streamlit, and CUDA.',
    tech: 'Arctic Hosting, Streamlit, CUDA, AI/ML, Python, Academic AI',
    git: 'https://github.com/jadechoghari/CSGPTPRO',
    category: 'Hackathon',
    date: 'March 2024',
    imageName: 'csgptpro.png'
  },
  {
    title: 'WATisZine Website',
    description: 'Built a comprehensive website for the WATisZine club (University of Waterloo) to centralize zines with an admin dashboard for easy management. Implemented secure authentication, dynamic content, and animations.',
    tech: 'HTML, CSS, JavaScript, Firebase, cPanel, Web Development',
    link: 'https://watiszine.clubs.wusa.ca/',
    git: 'https://github.com/RhyChaw/watiszine',
    category: 'Full Stack',
    date: 'December 2023',
    imageName: 'WATisZine.png'
  },
  {
    title: 'Hestia | Your Next Home',
    description: 'Student Sublet finder for university students',
    tech: 'HTML, CSS, Django, Python, Azure Cloud, Web Development',
    link: 'https://github.com/gsaujla/HestiaProject',
    git: 'https://github.com/gsaujla/HestiaProject',
    category: 'Full Stack',
    date: 'October 2023',
    imageName: 'HestiaP.png'
  },
  {
    title: 'VBOman Admin Panel (FreeLance)',
    description: 'REACT JS application with Firebase Backend for Restaurant Vasanta Bhavan based in Oman',
    tech: 'React.js, Firebase, JavaScript, Admin Panel, Restaurant Management',
    link: 'https://vboman.com',
    git: 'https://github.com/RhyChaw/VBOman',
    category: 'Free Lance',
    date: 'September 2023',
    imageName: 'VBoman.png'
  }
];

// Open Source contributions data
const openSourceData = [
  {
    title: 'Gradio — Contributor | Hugging Face',
    description: 'Contributed to Gradio, the open-source Python library for building ML web interfaces. Enhanced UI components and improved accessibility features.',
    tech: 'Python, Machine Learning, UI/UX, Open Source, Hugging Face',
    git: 'https://github.com/gradio-app/gradio',
    category: 'Open Source',
    date: '2025'
  },
  {
    title: 'Three.js — Contributor',
    description: 'Contributed to Three.js, the popular JavaScript 3D graphics library. Improved documentation and created examples for 3D rendering techniques.',
    tech: 'JavaScript, WebGL, 3D Graphics, Three.js, Open Source',
    git: 'https://github.com/mrdoob/three.js',
    category: 'Open Source',
    date: '2024'
  },
  {
    title: 'Pipette Pro — Core Contributor',
    description: 'Major contributor to Pipette Pro, an open-source laboratory management system. Developed core features for experiment tracking and data visualization.',
    tech: 'Python, React, Laboratory Management, Data Visualization, Open Source',
    git: '#',
    category: 'Open Source',
    date: '2024'
  },
  {
    title: 'UW Flow — Contributor',
    description: 'Contributed to UW Flow, the course planning platform for University of Waterloo students. Improved course search algorithms and mobile responsiveness.',
    tech: 'React, Node.js, PostgreSQL, Full Stack, Open Source, Education',
    git: 'https://github.com/UWFlow/uwflow',
    category: 'Open Source',
    date: '2024'
  }
];

// Upload open source data separately
async function uploadOpenSource() {
  console.log(`\n📦 Uploading ${openSourceData.length} open source contributions to "openSource" collection...`);
  
  for (const project of openSourceData) {
    const docId = createId(project.title);
    const docRef = doc(db, 'openSource', docId);
    
    await setDoc(docRef, {
      ...project,
      id: docId,
      uploadedAt: new Date().toISOString(),
    });

    console.log(`  ✓ Uploaded: ${project.title}`);
  }
  console.log(`  💾 Completed openSource\n`);
}

// Main execution
async function main() {
  console.log('⚡ Firebase Project Upload Script');
  console.log('================================\n');
  
  await uploadToFirebase();
  await uploadOpenSource();
}

main();
