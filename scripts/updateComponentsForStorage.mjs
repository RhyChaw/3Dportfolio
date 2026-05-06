import { readFileSync, writeFileSync } from 'fs';

/**
 * This script helps update your components to use Firebase Storage URLs
 * instead of local image imports.
 * 
 * BEFORE running this, make sure you've:
 * 1. Uploaded images to Firebase Storage
 * 2. Generated IMAGE_URL_MAPPING.json
 */

console.log('╔════════════════════════════════════════════════════════════╗');
console.log('║                                                            ║');
console.log('║     📝 Component Update Helper 📝                         ║');
console.log('║                                                            ║');
console.log('╚════════════════════════════════════════════════════════════╝\n');

// Check if mapping exists
try {
  const mapping = JSON.parse(readFileSync('IMAGE_URL_MAPPING.json', 'utf8'));
  
  console.log('✅ Found IMAGE_URL_MAPPING.json\n');
  console.log('📊 Available images:\n');
  
  for (const [category, images] of Object.entries(mapping.categories)) {
    const imageCount = Object.keys(images).length;
    if (imageCount > 0) {
      console.log(`   ${category}: ${imageCount} images`);
    }
  }
  
  console.log('\n📝 How to use Firebase Storage URLs in your components:\n');
  
  console.log('1️⃣  OPTION 1: Fetch from Firestore (Recommended)');
  console.log('   Since your Firestore documents now have "imageUrl" field:');
  console.log('');
  console.log('   ```javascript');
  console.log('   // Fetch project with image URL from Firestore');
  console.log('   const project = await getDoc(doc(db, "allProjects", projectId));');
  console.log('   const imageUrl = project.data().imageUrl;');
  console.log('   ');
  console.log('   <img src={imageUrl} alt={project.title} />');
  console.log('   ```\n');
  
  console.log('2️⃣  OPTION 2: Use mapping file directly');
  console.log('   Import the JSON mapping:');
  console.log('');
  console.log('   ```javascript');
  console.log('   import imageMapping from "../IMAGE_URL_MAPPING.json";');
  console.log('   ');
  console.log('   const imageUrl = imageMapping.categories.projects["ClashRoyale.png"];');
  console.log('   <img src={imageUrl} alt="Clash Royale Analytics Platform" />');
  console.log('   ```\n');
  
  console.log('3️⃣  OPTION 3: Fetch directly from Storage');
  console.log('   Use Firebase Storage SDK:');
  console.log('');
  console.log('   ```javascript');
  console.log('   import { storage } from "../firebase";');
  console.log('   import { ref, getDownloadURL } from "firebase/storage";');
  console.log('   ');
  console.log('   const imageUrl = await getDownloadURL(');
  console.log('     ref(storage, "projects/ClashRoyale.png")');
  console.log('   );');
  console.log('   ```\n');
  
  console.log('📚 Files to update:\n');
  console.log('   - src/pages/ProjectsData.jsx (if using local imports)');
  console.log('   - src/traditional/TradProjects.jsx');
  console.log('   - Any component importing images from src/proj/\n');
  
  console.log('🔍 Search for these patterns and replace:');
  console.log('   Find: import SomeImage from "../proj/SomeImage.png"');
  console.log('   Replace with: Fetch from Firestore or use mapping\n');
  
  console.log('✨ Example updates have been saved to:');
  console.log('   COMPONENT_UPDATE_EXAMPLES.md\n');
  
  // Create example file
  const examples = `# Component Update Examples

## Using Firebase Storage URLs

Now that your images are in Firebase Storage, here's how to update your components:

---

## Example 1: ProjectsData.jsx - Fetch from Firestore

\`\`\`javascript
// OLD: Local imports
import ClashRoyaleAnalytics from '../proj/ClashRoyale.png';
import DJAi from '../proj/DJAi.png';

export const projectsData = [
  {
    title: 'Clash Royale Analytics Platform',
    image: ClashRoyaleAnalytics, // ❌ Local import
  },
  // ...
];

// NEW: Fetch from Firestore
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useState, useEffect } from 'react';

export function useProjects() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      const snapshot = await getDocs(collection(db, 'allProjects'));
      const projectsData = snapshot.docs.map(doc => ({
        ...doc.data(),
        image: doc.data().imageUrl // ✅ Firebase Storage URL
      }));
      setProjects(projectsData);
    };
    fetchProjects();
  }, []);

  return projects;
}
\`\`\`

---

## Example 2: TradProjects.jsx - Fetch from Firestore

\`\`\`javascript
// OLD: Mapping local imports
const allProjects = projectsData.map(proj => ({
  ...proj,
  image: proj.image // Local import
}));

// NEW: Use Firestore data with imageUrl
import { useProjects } from '../pages/ProjectsData';

function TradProjects() {
  const projects = useProjects(); // Fetches from Firestore
  
  return (
    <div>
      {projects.map(project => (
        <div key={project.id}>
          <img 
            src={project.imageUrl} // ✅ Firebase Storage URL
            alt={project.title} 
          />
          <h3>{project.title}</h3>
        </div>
      ))}
    </div>
  );
}
\`\`\`

---

## Example 3: Using IMAGE_URL_MAPPING.json

\`\`\`javascript
import imageMapping from '../IMAGE_URL_MAPPING.json';

function ProjectCard({ imageName, title }) {
  const imageUrl = imageMapping.categories.projects[imageName];
  
  return (
    <div>
      <img src={imageUrl} alt={title} />
      <h3>{title}</h3>
    </div>
  );
}
\`\`\`

---

## Example 4: Company Logos in TradExp.jsx

\`\`\`javascript
// OLD: Local imports
import CartaLogo from '../compLogos/carta.png';
import CrestaLogo from '../compLogos/cresta.jpg';

const professionalExperience = [
  {
    title: 'Carta',
    logo: CartaLogo, // ❌ Local import
  }
];

// NEW: Fetch logo URLs from mapping
import imageMapping from '../IMAGE_URL_MAPPING.json';

const professionalExperience = [
  {
    title: 'Carta',
    logo: imageMapping.categories.companyLogos['carta.png'], // ✅ Storage URL
  },
  {
    title: 'Cresta',
    logo: imageMapping.categories.companyLogos['cresta.jpg'],
  }
];
\`\`\`

---

## Example 5: Dynamic Image Loading with Error Handling

\`\`\`javascript
function ProjectImage({ imageUrl, fallbackUrl, alt }) {
  const [imgSrc, setImgSrc] = useState(imageUrl);

  const handleError = () => {
    setImgSrc(fallbackUrl || '/placeholder.png');
  };

  return (
    <img 
      src={imgSrc} 
      alt={alt} 
      onError={handleError}
      loading="lazy" // ✅ Lazy load for performance
    />
  );
}
\`\`\`

---

## Quick Migration Steps:

1. ✅ Upload images: \`node scripts/uploadImagesToStorage.mjs\`
2. ✅ Verify in Firebase Console
3. ✅ Update components (see examples above)
4. ✅ Test locally: \`npm run dev\`
5. ✅ Remove local images: \`node scripts/cleanupLocalImages.mjs\`
6. ✅ Commit & push

---

## Benefits:

- 🚀 Faster git operations (smaller repo)
- 🌐 CDN-backed image delivery
- 📱 Optimized for mobile
- 🔄 Update images without redeploying
- 💾 Automatic caching
`;

  writeFileSync('COMPONENT_UPDATE_EXAMPLES.md', examples);
  console.log('✅ Created COMPONENT_UPDATE_EXAMPLES.md\n');

} catch (error) {
  console.log('❌ ERROR: IMAGE_URL_MAPPING.json not found!\n');
  console.log('Please run "node scripts/uploadImagesToStorage.mjs" first.\n');
  process.exit(1);
}

