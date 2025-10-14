// ProjectsData.jsx
import G12Proj from '../proj/G12Proj.png';
import JadoAI from '../proj/JadoAI.png';
import DOCTORAI from '../proj/DoctorAI.png';
import CSGPTPRO from '../proj/csgptpro.png';
import WildOasisProject from '../proj/TheWildOasis.png';
import VBOman from '../proj/VBoman.png';
import WATisZine from '../proj/WATisZine.png';
import HestiaP from '../proj/HestiaP.png';
import RocketLanding from '../proj/RocketLanding.png';
import ReduxBank from '../proj/ReduxBank.png';
import StrumSpace from '../proj/StrumSpace.png';
import Rhythm from '../proj/rhythm.png';
import PawPal from '../proj/PawPal.png';
import MineGuard from '../proj/MineGuard.png';
import ZafariCC from '../proj/Zafari.png';
import MettaStars from '../proj/MettaStars.png';
import Bhasha from '../proj/Bhasha.png';
import KungFuMaster from '../proj/KungFuMaster.png';
import PizzaCompany from '../proj/PizzaCompanyREACT.png';
import SnapSafe from '../proj/SnapSafe.png';
import Spook from '../proj/Spook.png';
import Watopoly from '../proj/watopoly.JPG';
import NeuroClash from '../proj/NeuroClash.png';
import ClashRoyaleAnalytics from '../proj/ClashRoyale.png';
import DJAi from '../proj/DJAi.png';
import Equity from '../proj/Equityy.png';
import Swarm from '../proj/Swarm.jpg';

// Removed color constants as colors are no longer used in project data

const projectsData = [
  // 2025 Projects (Future/Planned)
  {
    title: 'Clash Royale Analytics Platform',
    description: 'Engineered an end-to-end analytics platform for Clash Royale, automating ingestion of 50k+ battle logs via Python, transforming raw data into analytics-ready tables with dbt and PostgreSQL, and delivering live match outcome predictions through ML models (scikit-learn/XGBoost) served by FastAPI and visualized on an interactive Streamlit dashboard with AI-powered insights; implemented rigorous data quality checks, CI/CD, and containerization for production deployment.',
    tech: 'Python, PostgreSQL, dbt, FastAPI, Streamlit, scikit-learn, XGBoost, Docker, CI/CD, Data Engineering, Machine Learning, Analytics',
    image: ClashRoyaleAnalytics,
    git: 'https://github.com/RhyChaw/clash-royale-analytics',
    category: 'Data Engineering',
    date: 'October 2025'
  },
  {
    title: 'SWARM 2025 — Predator–Prey Swarm Robotics',
    description: 'Built 10 full robots from the ground up at SWARM 2025 in Kitchener (100+ students, 500+ robots). From hands-on soldering to programming with Docker and ROS, we engineered emergent predator–prey behaviors inspired by nature. Grateful to GRAM, UW Robotics, sponsors, and mentors. Team: Aarjav Patni, Abhinav Jha, Arush Handa, Vedant Malhotra, Madhav Malik, Navkaran Handa.',
    tech: 'Robotics, ROS, Docker, Embedded Systems, Swarm Intelligence, Multi-Agent Systems, Hardware',
    image: Swarm,
    category: 'Robotics / Hackathon',
    date: 'October 2025'
  },
  {
    title: 'marketSim',
    description: 'High-performance real-time market replay and simulation engine with deterministic OCaml core, pluggable strategy SDKs, and interactive dashboard for control and visualization.',
    tech: 'OCaml, Node.js, TypeScript, React, Next.js, Python, Rust, Yarn, PNPM, Parquet, Arrow, WebSocket, REST',
    git: 'https://github.com/RhyChaw/marketSim', // replace with actual repo
    category: 'Full-Stack / Systems',
    date: 'September 2025',
    inProgress: true
  },  
  {
    title: 'DJ AI',
    description: 'A next-gen AI DJ system where each song gets mixed and mashed by an AI',
    tech: 'PyTorch, TensorFlow, Python, FastAPI, Three.js, WebGL, JavaScript, Web3, Ethereum, Smart Contracts, Reinforcement Learning, Bayesian ML, One-Shot Learning, Neural Networks',
    image: DJAi,
    link: 'https://d-c1qmyx10z-rhychaws-projects.vercel.app/',
    git: 'https://github.com/RhyChaw/DJAi',
    category: 'AI/ML',
    date: 'September 2025',
    inProgress: true
  },
  {
    title: 'NeuroClash – Adaptive Meta-AI Combatants',
    description: 'A next-gen self-evolving AI fighter system where each agent dynamically adapts its fighting style during battle based on opponent behavior, using Bayesian meta-learning + reinforcement learning + one-shot adaptation, all integrated into a mini Ethereum-powered game dApp. Features dynamic fight replay, NFT brain ownership, self-evolution mode, and meta-tournament capabilities.',
    tech: 'PyTorch, TensorFlow, Python, FastAPI, Three.js, WebGL, JavaScript, Web3, Ethereum, Smart Contracts, Reinforcement Learning, Bayesian ML, One-Shot Learning, Neural Networks',
    image: NeuroClash,
    git: 'https://github.com/RhyChaw/neuroclash',
    category: 'AI/ML',
    date: 'September 2025',
    inProgress: true
  },
  {
    title: 'Global Equity Simulator',
    description: 'Full-stack SaaS app to simulate global employee equity grants with country-specific tax and regulation rules, interactive cap table visualization, and automated compliance reporting.',
    tech: 'React, TypeScript, Django, DRF, Spring Boot, Java, Docker, Kubernetes, Helm',
    image: Equity,
    git: 'https://github.com/RhyChaw/global-equity-simulator',
    category: 'Full Stack',
    date: 'September 2025',
    inProgress: true
  },
  {
    title: 'Watopoly - Waterloo Monopoly',
    description: 'Monopoly-inspired board game set on University of Waterloo campus! Features Waterloo landmarks, trading system, save/load functionality, and auction mechanics.',
    tech: 'C++, Object-Oriented Programming, Git',
    image: Watopoly,
    git: 'https://github.com/RhyChaw/watopoly',
    category: 'Game Development',
    date: 'March 2025'
  },
  {
    title: 'SPOOK - Horror Game (Horror Hacks 2025)',
    description: 'Built an entire horror game for Horror Hacks September 2025. Features cinematic effects, immersive sound design, and 3D horror gameplay. Created a fully interactive horror experience with atmospheric lighting, sound effects, and engaging gameplay mechanics. Best played with sound on and headphones recommended for the full immersive experience.',
    tech: 'Next.js, Three.js, Vercel, JavaScript, WebGL',
    image: Spook,
    link: 'https://spooky-nu.vercel.app/',
    git: 'https://github.com/RhyChaw/spooky',
    category: 'Hackathon',
    date: 'September 2025',
    inProgress: true
  },
  {
    title: 'SnapSafe (Hack the North 2025)',
    description: 'Built SnapSafe, a real-time AR fire evacuation system on Snap AR glasses. Used depth caching, world query hits, and ray casting to dynamically detect exits and guide users with pathfinding arrows. Trained a custom fire-exit sign detection model on Roboflow, converted to ONNX, and integrated into Lens Studio with custom scripting—marking a breakthrough in safety-focused AR navigation.',
    tech: 'Snap AR, Lens Studio, Roboflow, ONNX, Computer Vision, AR/VR',
    image: SnapSafe,
    link: 'https://www.youtube.com/watch?v=ajmASxcm4OA',
    git: 'https://github.com/AshishA26/HackTheNorth2025',
    category: 'Hackathon',
    date: 'September 2025'
  },
  {
    title: 'Bhasha Mobile App',
    description: 'Startup App for Learning Indian Languages with backend integration',
    tech: 'Flutter, Dart, Supabase, Mobile Development',
    image: Bhasha,
    git: '#',
    category: 'Full Stack',
    date: 'June 2025',
    inProgress: true
  },
  {
    title: 'StrumSpace (SpurHacks Hackathon)',
    description: 'Computer Vision based 3D web dev app, which annotates chords on guitar Live using YOLOv8',
    tech: 'YOLOv8, Computer Vision, 3D Web, JavaScript, Machine Learning',
    image: StrumSpace,
    git: 'https://github.com/LuhemRevorg/StrumSpace',
    category: 'Hackathon',
    date: 'June 2025'
  },
  {
    title: 'Bhasha Web App',
    description: 'Startup App for Learning Indian Languages',
    tech: 'Next.js, React, TypeScript, Web Development',
    image: Bhasha,
    git: 'https://github.com/RhyChaw/bhasha-web',
    link: 'https://learnwithbhasha.com/',
    category: 'Full Stack',
    date: 'May 2025',
  },
  {
    title: 'Zafari CC Design (FreeLance)',
    description: 'Web application for Zafari CC Design',
    tech: 'Next.js, React, TypeScript, Web Development',
    image: ZafariCC,
    link: 'https://www.zafariccdesign.com/',
    category: 'Free Lance',
    date: 'May 2025'
  },
  {
    title: 'MettaStars (FreeLance)',
    description: 'Web application for MettaStars, an NGO for mental health, finance and spirituality',
    tech: 'Vite, React, JavaScript, Web Development',
    image: MettaStars,
    link: 'https://www.mettastars.com/',
    git: 'https://github.com/RhyChaw/mettastars',
    category: 'Free Lance',
    date: 'April 2025'
  },
  {
    title: 'PawPal (GeeseHacks Hackathon)',
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
    description: 'Developed an AI-powered voice coach leveraging Meta\'s Wav2Vec2 model and Apple\'s SEP-28K dataset to detect stuttering and enhance speech clarity, helping users improve public speaking skills through real-time feedback. Engineered pitch and pace analysis features using OpenAI\'s API, librosa, and SciPy, delivering actionable insights on speech modulation and timing to ensure speakers can confidently convey their message. Designed an interactive and engaging front-end with React.js and advanced JavaScript libraries like Particle.js to create an intuitive user experience, promoting self-improvement through immersive technology.',
    tech: 'Wav2Vec2, OpenAI API, librosa, SciPy, React.js, Particle.js, Machine Learning',
    image: Rhythm,
    link: 'https://devpost.com/software/rhythm-o8rwp4',
    git: 'https://github.com/LuhemRevorg/HTH_project',
    category: 'Hackathon',
    date: 'September 2024'
  },
  {
    title: 'Rocket Landing AI Project',
    description: 'App using Deep Q learning for rocket landing simulation',
    tech: 'Google Colab, Python, Gymnasium, Deep Q Learning, Reinforcement Learning',
    image: RocketLanding,
    link: 'https://colab.research.google.com/drive/1SgdMlL2zM2HERCBJ5yhpVtbO7QtdDGMh',
    category: 'ML',
    date: 'September 2024'
  },
  {
    title: 'Kung Fu Master AI Project',
    description: 'Developed an A3C reinforcement learning setup in Google Colab using Python and Gymnasium. Trained multiple asynchronous agents and built a robust environment for evaluating RL performance and training efficiency.',
    tech: 'Google Colab, Python, Gymnasium, A3C, Reinforcement Learning',
    image: KungFuMaster,
    link: 'https://colab.research.google.com/drive/1anhsl9AGsTMMapq3tuhQBghW0d4fqHmS',
    git: '#',
    category: 'ML',
    date: 'August 2024'
  },
  {
    title: 'JADO AI',
    description: 'Developed an AI-powered chatbot designed to assist university applicants by analyzing YouTube videos, providing links to academic papers, and offering resume feedback, streamlining the application process for users. Implemented advanced natural language processing (NLP) models trained on diverse datasets and theories to enable features like Reddit scanning, peer connections, and personalized academic recommendations, ensuring a comprehensive user experience. Built and deployed the system using Docker and Python, leveraging containerization for seamless scalability and cross-platform functionality, ensuring reliable performance for a global audience.',
    tech: 'Python, Docker, NLP, Machine Learning, AI, Containerization',
    image: JadoAI,
    git: 'https://github.com/RhyChaw/Jado',
    category: 'ML',
    date: 'July 2024'
  },
  {
    title: 'Doctor AI Project',
    description: 'Developed a medically fine-tuned LLM using Llama2 (Meta), trained on curated medical datasets from Hugging Face. Implemented advanced NLP preprocessing, data augmentation, and fine-tuning techniques to optimize accuracy and domain relevance for healthcare use cases. Focused on performance evaluation, safety, and reliability for medical contexts.',
    tech: 'Llama2, Hugging Face, NLP, Medical AI, Fine-tuning, Data Augmentation',
    image: DOCTORAI,
    link: 'https://colab.research.google.com/drive/1dJVq9tbPk0IwA3Tbpxvl0_9iZqKzXDaX',
    category: 'ML',
    date: 'July 2024'
  },
  {
    title: 'Redux Bank Project',
    description: 'REACT Project for Classical Redux and Redux toolkit(RTK), Thunks, and reducer hooks',
    tech: 'React, Redux, Redux Toolkit, JavaScript, State Management',
    image: ReduxBank,
    git: 'https://github.com/RhyChaw/redux-practice',
    category: 'Full Stack',
    date: 'July 2024'
  },
  {
    title: 'Demo Website for an imaginary Pizza company',
    description: 'React app using Redux Toolkit for state, API fetching for dynamic menus, custom hooks, and Tailwind CSS for a modern responsive UI. Built for performance, scalability, and maintainability.',
    tech: 'React, Redux Toolkit, Tailwind CSS, API Integration, Custom Hooks',
    image: PizzaCompany,
    git: 'https://github.com/RhyChaw/pizza-demo',
    category: 'Full Stack',
    date: 'July 2024'
  },
  {
    title: 'Velocity - Grand River Hospital Innovation Challenge',
    description: 'Developed a comprehensive data management system for Grand River Hospital to restructure and organize their data efficiently. Built as a React-based mobile web application for quick demo purposes, providing real-time updates and streamlined data visualization to help hospital staff manage information more effectively.',
    tech: 'React, Data Visualization, Mobile Web, Healthcare Tech',
    git: 'https://github.com/RhyChaw/GRHVel',
    category: 'Full Stack',
    date: 'June 2024'
  },
  {
    title: 'G12',
    description: 'Startup App for university students',
    tech: 'Vite, React, Firebase, Web Development',
    image: G12Proj,
    link: 'https://g12uni.com',
    git: 'https://github.com/Ejtehad/g12newver',
    category: 'Full Stack',
    date: 'June 2024'
  },
  {
    title: 'G12 Mobile App',
    description: 'Startup Mobile App for university students',
    tech: 'Flutter, Dart, Firebase, Mobile Development',
    image: G12Proj,
    git: 'https://github.com/G12Uni/g12app',
    category: 'Full Stack',
    date: 'June 2024'
  },
  {
    title: 'CSGPTPRO Hackathon Project',
    description: 'Developed "CS GPT PRO," an AI-powered chatbot designed to provide precise answers for university courses at UW and UofT, as well as French high school papers, improving accessibility to academic support. Engineered the solution using Arctic hosting, Streamlit, and CUDA, leveraging advanced AI training on course-specific datasets and high school papers to ensure accuracy and relevance in responses. Created the platform to streamline academic assistance for students, addressing knowledge gaps and enabling efficient, targeted learning through a user-friendly chatbot interface.',
    tech: 'Arctic Hosting, Streamlit, CUDA, AI/ML, Python, Academic AI',
    image: CSGPTPRO,
    git: 'https://github.com/jadechoghari/CSGPTPRO',
    category: 'Hackathon',
    date: 'March 2024'
  },
  {
    title: 'The Wild Oasis Project (Server)',
    description: 'Biggest Project using React Query, remote state, Dark mode, authentication, Statistic, styled components, Supabase backend',
    tech: 'React Query, Styled Components, Supabase, Authentication, Dark Mode',
    image: WildOasisProject,
    git: 'https://github.com/RhyChaw/The-wild-oasis-project',
    category: 'Full Stack',
    date: 'February 2024'
  },
  
  // 2023 Projects
  {
    title: 'WATisZine Website',
    description: 'Built a comprehensive website for the WATisZine club (University of Waterloo) to centralize zines with an admin dashboard for easy management. Implemented secure authentication for authorized updates, dynamic content, animations, and smooth transitions. Connected to Firebase for backend functionality and hosted via cPanel. First official project—gained experience in full-stack web development and project management.',
    tech: 'HTML, CSS, JavaScript, Firebase, cPanel, Web Development',
    image: WATisZine,
    link: 'https://watiszine.clubs.wusa.ca/',
    git: 'https://github.com/RhyChaw/watiszine',
    category: 'Full Stack',
    date: 'December 2023'
  },
  {
    title: 'Hestia | Your Next Home',
    description: 'Student Sublet finder for university students',
    tech: 'HTML, CSS, Django, Python, Azure Cloud, Web Development',
    image: HestiaP,
    link: 'https://github.com/gsaujla/HestiaProject',
    git: 'https://github.com/gsaujla/HestiaProject',
    category: 'Full Stack',
    date: 'October 2023'
  },
  {
    title: 'VBOman Admin Panel (FreeLance)',
    description: 'REACT JS application with Firebase Backend for Restaurant Vasanta Bhavan based in Oman',
    tech: 'React.js, Firebase, JavaScript, Admin Panel, Restaurant Management',
    image: VBOman,
    link: 'https://vboman.com',
    git: 'https://github.com/RhyChaw/VBOman',
    category: 'Free Lance',
    date: 'September 2023'
  }
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
