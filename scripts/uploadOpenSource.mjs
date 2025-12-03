import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

function createId(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

const openSourceData = [
  {
    title: 'Gradio — Contributor | Hugging Face',
    description: 'Contributed to Gradio, the open-source Python library for building ML web interfaces. Enhanced UI components and improved accessibility features.',
    tech: 'Python, Machine Learning, UI/UX, Open Source, Hugging Face',
    git: 'https://github.com/gradio-app/gradio',
    category: 'Open Source',
    year: '2025'
  },
  {
    title: 'Three.js — Contributor',
    description: 'Contributed to Three.js, the popular JavaScript 3D graphics library. Improved documentation and created examples for 3D rendering techniques.',
    tech: 'JavaScript, WebGL, 3D Graphics, Three.js, Open Source',
    git: 'https://github.com/mrdoob/three.js',
    category: 'Open Source',
    year: '2024'
  },
  {
    title: 'Pipette Pro — Core Contributor',
    description: 'Major contributor to Pipette Pro, an open-source laboratory management system. Developed core features for experiment tracking and data visualization.',
    tech: 'Python, React, Laboratory Management, Data Visualization, Open Source',
    git: '#',
    category: 'Open Source',
    year: '2024'
  },
  {
    title: 'UW Flow — Contributor',
    description: 'Contributed to UW Flow, the course planning platform for University of Waterloo students. Improved course search algorithms and mobile responsiveness.',
    tech: 'React, Node.js, PostgreSQL, Full Stack, Open Source, Education',
    git: 'https://github.com/UWFlow/uwflow',
    category: 'Open Source',
    year: '2024'
  }
];

async function uploadOpenSource() {
  try {
    console.log('⚡ Firebase Open Source Upload Script');
    console.log('=====================================\n');
    console.log(`📦 Uploading ${openSourceData.length} open source contributions to "openSource" collection...\n`);
    
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
    
    console.log(`\n💾 Completed openSource collection`);
    console.log('\n✅ All open source data uploaded successfully!');
    console.log('\n🎉 Upload complete!');
    process.exit(0);

  } catch (error) {
    console.error('\n❌ Error uploading to Firebase:', error);
    process.exit(1);
  }
}

uploadOpenSource();

