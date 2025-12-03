import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";

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

// Projects data (from ProjectsData.jsx - without image imports)
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
  // Add all other projects here...
];

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
    openSource: []
  };

  projects.forEach(project => {
    const cat = project.category.toLowerCase().replace(/\s+/g, '');
    
    if (cat.includes('fullstack') || cat.includes('full-stack')) {
      categories.fullStack.push(project);
    } else if (cat.includes('ai') || cat.includes('ml')) {
      categories.aiMl.push(project);
    } else if (cat.includes('hackathon')) {
      categories.hackathon.push(project);
    } else if (cat.includes('freelance') || cat.includes('free lance')) {
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
      categories.fullStack.push(project); // Default to full stack
    }
  });

  return categories;
}

// Upload to Firebase
async function uploadToFirebase() {
  try {
    console.log('Starting upload to Firebase...');

    const categorized = categorizeProjects(projectsData);

    // Upload each category as a separate collection
    for (const [categoryName, projects] of Object.entries(categorized)) {
      if (projects.length === 0) continue;

      console.log(`\nUploading ${projects.length} projects to ${categoryName} collection...`);

      for (let i = 0; i < projects.length; i++) {
        const project = projects[i];
        const docId = `${categoryName}_${i + 1}`;
        
        await setDoc(doc(db, categoryName, docId), {
          ...project,
          id: docId,
          uploadedAt: new Date().toISOString()
        });

        console.log(`✓ Uploaded: ${project.title}`);
      }
    }

    // Also upload all projects to a master collection
    console.log('\n\nUploading all projects to master collection...');
    for (let i = 0; i < projectsData.length; i++) {
      const project = projectsData[i];
      const docId = `project_${i + 1}`;
      
      await setDoc(doc(db, 'allProjects', docId), {
        ...project,
        id: docId,
        uploadedAt: new Date().toISOString()
      });

      console.log(`✓ Uploaded: ${project.title}`);
    }

    console.log('\n✅ All data uploaded successfully!');
    console.log('\nCollections created:');
    console.log('- allProjects (master collection)');
    Object.keys(categorized).forEach(cat => {
      if (categorized[cat].length > 0) {
        console.log(`- ${cat} (${categorized[cat].length} projects)`);
      }
    });

  } catch (error) {
    console.error('❌ Error uploading to Firebase:', error);
  }
}

// Run the upload
uploadToFirebase();

