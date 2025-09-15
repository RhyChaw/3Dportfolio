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

// Removed color constants as colors are no longer used in project data

export const top10Projects = [
  // 2025 Projects (Future/Planned)
  {
    title: 'SnapSafe (Hack the North 2025)',
    description: 'Built SnapSafe, a real-time AR fire evacuation system on Snap AR glasses. Used depth caching, world query hits, and ray casting to dynamically detect exits and guide users with pathfinding arrows. Trained a custom fire-exit sign detection model on Roboflow, converted to ONNX, and integrated into Lens Studio with custom scripting—marking a breakthrough in safety-focused AR navigation.',
    image: SnapSafe,
    link: 'https://www.youtube.com/watch?v=ajmASxcm4OA',
    git: 'https://github.com/AshishA26/HackTheNorth2025',
    category: 'Hackathon',
    date: 'September 2025'
  },
  {
    title: 'Bhasha Mobile App',
    description: 'Startup App built using Flutter Dart for Learning Indian Languages, backend in Supabase',
    image: Bhasha,
    git: '#',
    category: 'Full Stack',
    date: 'June 2025'
  },
  {
    title: 'StrumSpace (SpurHacks Hackathon)',
    description: 'Computer Vision based 3D web dev app, which annotates chords on guitar Live using YOLOv8',
    image: StrumSpace,
    git: 'https://github.com/LuhemRevorg/StrumSpace',
    category: 'Hackathon',
    date: 'June 2025'
  },
  {
    title: 'Bhasha Web App',
    description: 'Startup App built using NextJS for Learning Indian Languages',
    image: Bhasha,
    git: 'https://github.com/RhyChaw/bhasha-web',
    category: 'Full Stack',
    date: 'May 2025'
  },
  {
    title: 'Zafari CC Design (FreeLance)',
    description: 'Web application for Zafari CC Design, built using NextJS',
    image: ZafariCC,
    link: 'https://www.zafariccdesign.com/',
    category: 'Free Lance',
    date: 'May 2025'
  },
  {
    title: 'MettaStars (FreeLance)',
    description: 'Web application for MettaStars, an NGO for mental health, finance and spirituality, built using Vite React',
    image: MettaStars,
    link: 'https://www.mettastars.com/',
    category: 'Free Lance',
    date: 'April 2025'
  },
  {
    title: 'PawPal (GeeseHacks Hackathon)',
    description: 'AI based Pet care app which can detect pet diseases, recommend food, and find pet sitters',
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
    image: MineGuard,
    link: 'https://devpost.com/software/mineguard',
    git: 'https://github.com/RhyChaw/mineguard',
    category: 'Hackathon',
    date: 'October 2024'
  },
  {
    title: 'Rhythm (Hack the Hill, Ottawa)',
    description: 'Developed an AI-powered voice coach leveraging Meta\'s Wav2Vec2 model and Apple\'s SEP-28K dataset to detect stuttering and enhance speech clarity, helping users improve public speaking skills through real-time feedback. Engineered pitch and pace analysis features using OpenAI\'s API, librosa, and SciPy, delivering actionable insights on speech modulation and timing to ensure speakers can confidently convey their message. Designed an interactive and engaging front-end with React.js and advanced JavaScript libraries like Particle.js to create an intuitive user experience, promoting self-improvement through immersive technology.',
    image: Rhythm,
    link: 'https://devpost.com/software/rhythm-o8rwp4',
    git: 'https://github.com/LuhemRevorg/HTH_project',
    category: 'Hackathon',
    date: 'September 2024'
  },
  {
    title: 'Rocket Landing AI Project',
    description: 'App built using Google Collab, Python and Gymnasium (Deep Q learning)',
    image: RocketLanding,
    link: 'https://colab.research.google.com/drive/1SgdMlL2zM2HERCBJ5yhpVtbO7QtdDGMh',
    category: 'ML',
    date: 'September 2024'
  },
  {
    title: 'Kung Fu Master AI Project',
    description: 'Developed an A3C reinforcement learning setup in Google Colab using Python and Gymnasium. Trained multiple asynchronous agents and built a robust environment for evaluating RL performance and training efficiency.',
    image: KungFuMaster,
    link: 'https://colab.research.google.com/drive/1anhsl9AGsTMMapq3tuhQBghW0d4fqHmS',
    git: '#',
    category: 'ML',
    date: 'August 2024'
  },
  {
    title: 'JADO AI',
    description: 'Developed an AI-powered chatbot designed to assist university applicants by analyzing YouTube videos, providing links to academic papers, and offering resume feedback, streamlining the application process for users. Implemented advanced natural language processing (NLP) models trained on diverse datasets and theories to enable features like Reddit scanning, peer connections, and personalized academic recommendations, ensuring a comprehensive user experience. Built and deployed the system using Docker and Python, leveraging containerization for seamless scalability and cross-platform functionality, ensuring reliable performance for a global audience.',
    image: JadoAI,
    git: 'https://github.com/RhyChaw/Jado',
    category: 'ML',
    date: 'July 2024'
  },
  {
    title: 'Doctor AI Project',
    description: 'Developed a medically fine-tuned LLM using Llama2 (Meta), trained on curated medical datasets from Hugging Face. Implemented advanced NLP preprocessing, data augmentation, and fine-tuning techniques to optimize accuracy and domain relevance for healthcare use cases. Focused on performance evaluation, safety, and reliability for medical contexts.',
    image: DOCTORAI,
    link: 'https://colab.research.google.com/drive/1dJVq9tbPk0IwA3Tbpxvl0_9iZqKzXDaX',
    category: 'ML',
    date: 'July 2024'
  },
  {
    title: 'Redux Bank Project',
    description: 'REACT Project for Classical Redux and Redux toolkit(RTK), Thunks, and reducer hooks',
    image: ReduxBank,
    git: 'https://github.com/RhyChaw/redux-practice',
    category: 'Full Stack',
    date: 'July 2024'
  },
  {
    title: 'Demo Website for an imaginary Pizza company',
    description: 'React app using Redux Toolkit for state, API fetching for dynamic menus, custom hooks, and Tailwind CSS for a modern responsive UI. Built for performance, scalability, and maintainability.',
    image: PizzaCompany,
    git: 'https://github.com/RhyChaw/pizza-demo',
    category: 'Full Stack',
    date: 'July 2024'
  },
  {
    title: 'G12',
    description: 'Startup App built using Vite React and Firebase',
    image: G12Proj,
    link: 'https://g12uni.com',
    git: 'https://github.com/Ejtehad/g12newver',
    category: 'Full Stack',
    date: 'June 2024'
  },
  {
    title: 'G12 Mobile App',
    description: 'Startup App built using Flutter and Firebase',
    image: G12Proj,
    git: 'https://github.com/G12Uni/g12app',
    category: 'Full Stack',
    date: 'June 2024'
  },
  {
    title: 'CSGPTPRO Hackathon Project',
    description: 'Developed "CS GPT PRO," an AI-powered chatbot designed to provide precise answers for university courses at UW and UofT, as well as French high school papers, improving accessibility to academic support. Engineered the solution using Arctic hosting, Streamlit, and CUDA, leveraging advanced AI training on course-specific datasets and high school papers to ensure accuracy and relevance in responses. Created the platform to streamline academic assistance for students, addressing knowledge gaps and enabling efficient, targeted learning through a user-friendly chatbot interface.',
    image: CSGPTPRO,
    git: 'https://github.com/jadechoghari/CSGPTPRO',
    category: 'Hackathon',
    date: 'March 2024'
  },
  {
    title: 'The Wild Oasis Project (Server)',
    description: 'Biggest Project using React Query, remote state, Dark mode, authentication, Statistic, styled components, Supabase backend',
    image: WildOasisProject,
    git: 'https://github.com/RhyChaw/The-wild-oasis-project',
    category: 'Full Stack',
    date: 'February 2024'
  },
  
  // 2023 Projects
  {
    title: 'WATisZine Website',
    description: 'Built a comprehensive website for the WATisZine club (University of Waterloo) to centralize zines with an admin dashboard for easy management. Implemented secure authentication for authorized updates, dynamic content, animations, and smooth transitions. Connected to Firebase for backend functionality and hosted via cPanel. First official project—gained experience in full-stack web development and project management.',
    image: WATisZine,
    link: 'https://watiszine.clubs.wusa.ca/',
    git: 'https://github.com/RhyChaw/watiszine',
    category: 'Full Stack',
    date: 'December 2023'
  },
  {
    title: 'Hestia | Your Next Home',
    description: 'Student Sublet finder built using HTML, CSS, and Django(Python) For backend. Hosted using AZURE Cloud',
    image: HestiaP,
    link: 'https://github.com/gsaujla/HestiaProject',
    git: 'https://github.com/gsaujla/HestiaProject',
    category: 'Full Stack',
    date: 'October 2023'
  },
  {
    title: 'VBOman Admin Panel (FreeLance)',
    description: 'REACT JS application with Firebase Backend for Restaurant Vasanta Bhavan based in Oman',
    image: VBOman,
    link: 'https://vboman.com',
    git: 'https://github.com/RhyChaw/VBOman',
    category: 'Free Lance',
    date: 'September 2023'
  }
];
