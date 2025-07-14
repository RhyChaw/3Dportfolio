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
    backgroundColor: colors.webDev
  },
  {
    title: 'JADO AI',
    description: 'AI Chatbot which can scan through Youtube, Reddit, Wolfram Alpha, Resume scanner, People finder etc. (Addition of G12)',
    image: JadoAI,
    link: 'https://g12uni.com',
    category: 'AI',
    backgroundColor: colors.ai
  },
  {
    title: 'Doctor AI Project',
    description: 'Medically Fine-tuned LLM model built using Llama2(Meta) and trained on Hugging Face Data',
    image: DOCTORAI,
    link: 'https://colab.research.google.com/drive/1dJVq9tbPk0IwA3Tbpxvl0_9iZqKzXDaX',
    category: 'AI',
    backgroundColor: colors.ai
  },
  {
    title: 'CSGPTPRO Hackathon Project',
    description: 'App built using Python, Streamlit and Arctic',
    image: CSGPTPRO,
    link: 'https://github.com/jadechoghari/CSGPTPRO',
    category: 'AI',
    backgroundColor: colors.ai
  },
  {
    title: 'The Wild Oasis Project(Server)',
    description: 'Biggest Project using React Query, remote state, Dark mode, authentication, Statistic, styled components, Supabase backend',
    image: WildOasisProject,
    link: 'https://github.com/RhyChaw/The-wild-oasis-project',
    category: 'Web Dev',
    backgroundColor: colors.webDev
  },
  {
    title: 'VBOman Admin Panel (FreeLance)',
    description: 'REACT JS application with Firebase Backend for Restaurant Vasanta Bhavan based in Oman',
    image: VBOman,
    link: 'https://vboman.com',
    category: 'Web Dev',
    backgroundColor: colors.webDev
  },
  {
    title: 'WATisZine Website',
    description: 'REACT JS app with Auth, MongoDB Backend for Zine club at UW',
    image: WATisZine,
    link: 'https://watiszine.clubs.wusa.ca/',
    category: 'Web Dev',
    backgroundColor: colors.webDev
  },
  {
    title: 'Hestia | Your Next Home',
    description: 'Student Sublet finder built using HTML, CSS, and Django(Python) For backend. Hosted using AZURE Cloud',
    image: HestiaP,
    link: 'https://github.com/gsaujla/HestiaProject',
    category: 'Web Dev',
    backgroundColor: colors.webDev
  },
  {
    title: 'Rocket Landing AI Project',
    description: 'App built using Google Collab, Python and Gymnasium (Deep Q learning)',
    image: RocketLanding,
    link: 'https://colab.research.google.com/drive/1SgdMlL2zM2HERCBJ5yhpVtbO7QtdDGMh',
    category: 'AI',
    backgroundColor: colors.ai
  },
  {
    title: 'Redux Bank Project',
    description: 'REACT Project for Classical Redux and Redux toolkit(RTK), Thunks, and reducer hooks',
    image: ReduxBank,
    link: 'https://github.com/RhyChaw/redux-practice',
    category: 'Web Dev',
    backgroundColor: colors.webDev
  }
];
