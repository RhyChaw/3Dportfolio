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

const colors = {
  webDev: '#FFDEAD',
  ai: '#ADD8E6'
};

export const top10Projects = [
  {
    title: 'G12',
    description: 'Startup App built using Vite React and Firebase',
    image: G12Proj,
    link: 'https://g12uni.com',
    category: 'Web Dev',
    backgroundColor: colors.webDev,
    date: 'June 2024'
  },
  {
    title: 'G12 Mobile App',
    description: 'Startup App built using Flutter and Firebase',
    image: G12Proj,
    link: 'https://g12uni.com',
    category: 'Web Dev',
    backgroundColor: colors.webDev,
    date: 'June 2024'
  },
  {
    title: 'Bhasha Web App',
    description: 'Startup App built using NextJS for Learning Indian Languages',
    image: Bhasha,
    category: 'Web Dev',
    backgroundColor: colors.webDev,
    date: 'May 2025'
  },
  {
    title: 'Bhasha Mobile App',
    description: 'Startup App built using Flutter Dart for Learning Indian Languages, backend in Supabase',
    image: Bhasha,
    category: 'Web Dev',
    backgroundColor: colors.webDev,
    date: 'June 2025'
  },
  {
    title: 'StrumSpace (SpurHacks Hackathon)',
    description: 'Computer Vision based 3D web dev app, which annotates chords on guitar Live using YOLOv8',
    image: StrumSpace,
    link: 'https://github.com/LuhemRevorg/StrumSpace',
    category: 'AI',
    backgroundColor: colors.ai,
    date: 'June 2025'
  },
  {
    title: 'Rhythm (Hack the Hill, Ottawa)',
    description: 'Voice modulation coach using LLMs and Audio Processing to make your speech better',
    image: Rhythm,
    link: 'https://devpost.com/software/rhythm-o8rwp4',
    category: 'AI',
    backgroundColor: colors.ai,
    date: 'September 2024'
  },
  {
    title: 'Zafari CC Design (FreeLance)',
    description: 'Web application for Zafari CC Design, built using NextJS',
    image: ZafariCC,
    link: 'https://www.zafariccdesign.com/',
    category: 'Web Dev',
    backgroundColor: colors.webDev,
    date: 'May 2025'
  },
  {
    title: 'MettaStars (FreeLance)',
    description: 'Web application for MettaStars, an NGO for mental health, finance and spirituality, built using Vite React',
    image: MettaStars,
    link: 'https://www.mettastars.com/',
    category: 'Web Dev',
    backgroundColor: colors.webDev,
    date: 'April 2025'
  },
  {
    title: 'MineGuard (Hack the Valley Hackathon)',
    description: 'AI based mining safety app which can detect unsafe conditions and alert workers',
    image: MineGuard,
    link: 'https://devpost.com/software/mineguard',
    category: 'Web Dev',
    backgroundColor: colors.webDev,
    date: 'October 2024'
  },
  {
    title: 'JADO AI',
    description: 'AI Chatbot which can scan through Youtube, Reddit, Wolfram Alpha, Resume scanner, People finder etc. (Addition of G12)',
    image: JadoAI,
    link: 'https://g12uni.com',
    category: 'AI',
    backgroundColor: colors.ai,
    date: 'July 2024'
  },
  {
    title: 'Doctor AI Project',
    description: 'Medically Fine-tuned LLM model built using Llama2(Meta) and trained on Hugging Face Data',
    image: DOCTORAI,
    link: 'https://colab.research.google.com/drive/1dJVq9tbPk0IwA3Tbpxvl0_9iZqKzXDaX',
    category: 'AI',
    backgroundColor: colors.ai,
    date: 'April 2024'
  },
  {
    title: 'CSGPTPRO Hackathon Project',
    description: 'App built using Python, Streamlit and Arctic',
    image: CSGPTPRO,
    link: 'https://github.com/jadechoghari/CSGPTPRO',
    category: 'AI',
    backgroundColor: colors.ai,
    date: 'March 2024'
  },
  {
    title: 'The Wild Oasis Project (Server)',
    description: 'Biggest Project using React Query, remote state, Dark mode, authentication, Statistic, styled components, Supabase backend',
    image: WildOasisProject,
    link: 'https://github.com/RhyChaw/The-wild-oasis-project',
    category: 'Web Dev',
    backgroundColor: colors.webDev,
    date: 'February 2024'
  },
  {
    title: 'VBOman Admin Panel (FreeLance)',
    description: 'REACT JS application with Firebase Backend for Restaurant Vasanta Bhavan based in Oman',
    image: VBOman,
    link: 'https://vboman.com',
    category: 'Web Dev',
    backgroundColor: colors.webDev,
    date: 'September 2023'
  },
  {
    title: 'WATisZine Website',
    description: 'REACT JS app with Auth, MongoDB Backend for Zine club at UW',
    image: WATisZine,
    link: 'https://watiszine.clubs.wusa.ca/',
    category: 'Web Dev',
    backgroundColor: colors.webDev,
    date: 'December 2023'
  },
  {
    title: 'PawPal (GeeseHacks Hackathon)',
    description: 'AI based Pet care app which can detect pet diseases, recommend food, and find pet sitters',
    image: PawPal,
    link: 'https://devpost.com/software/heads-up-for-tails',
    category: 'Web Dev',
    backgroundColor: colors.webDev,
    date: 'January 2025'
  },
  {
    title: 'Hestia | Your Next Home',
    description: 'Student Sublet finder built using HTML, CSS, and Django(Python) For backend. Hosted using AZURE Cloud',
    image: HestiaP,
    link: 'https://github.com/gsaujla/HestiaProject',
    category: 'Web Dev',
    backgroundColor: colors.webDev,
    date: 'October 2023'
  },
  {
    title: 'Rocket Landing AI Project',
    description: 'App built using Google Collab, Python and Gymnasium (Deep Q learning)',
    image: RocketLanding,
    link: 'https://colab.research.google.com/drive/1SgdMlL2zM2HERCBJ5yhpVtbO7QtdDGMh',
    category: 'AI',
    backgroundColor: colors.ai,
    date: 'September 2024'
  },
  {
    title: 'Redux Bank Project',
    description: 'REACT Project for Classical Redux and Redux toolkit(RTK), Thunks, and reducer hooks',
    image: ReduxBank,
    link: 'https://github.com/RhyChaw/redux-practice',
    category: 'Web Dev',
    backgroundColor: colors.webDev,
    date: 'July 2024'
  }
].sort((a, b) => new Date(b.date) - new Date(a.date));
