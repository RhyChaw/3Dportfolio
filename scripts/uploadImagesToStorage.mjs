import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { readFileSync, readdirSync, statSync, writeFileSync } from "fs";
import { join, basename, extname } from "path";

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
const storage = getStorage(app);
const db = getFirestore(app);

// Directories to upload
const IMAGE_DIRECTORIES = [
  { local: 'src/proj', remote: 'projects', description: 'Project images' },
  { local: 'src/compLogos', remote: 'company-logos', description: 'Company logos' },
  { local: 'src/assets', remote: 'assets', description: 'General assets' },
  { local: 'src/traditional', remote: 'traditional', description: 'Traditional home images' }
];

// Image extensions to upload
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.webp', '.svg'];

// Track uploaded images
const uploadedImages = {
  projects: {},
  companyLogos: {},
  assets: {},
  traditional: {}
};

/**
 * Get all image files from a directory
 */
function getImageFiles(dirPath) {
  try {
    const files = readdirSync(dirPath);
    return files.filter(file => {
      const ext = extname(file).toLowerCase();
      return IMAGE_EXTENSIONS.includes(ext);
    });
  } catch (error) {
    console.warn(`⚠️  Directory not found: ${dirPath}`);
    return [];
  }
}

/**
 * Upload a single image to Firebase Storage
 */
async function uploadImage(localPath, remotePath) {
  try {
    const fileBuffer = readFileSync(localPath);
    const storageRef = ref(storage, remotePath);
    
    // Determine content type based on extension
    const ext = extname(localPath).toLowerCase();
    const contentType = {
      '.png': 'image/png',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.gif': 'image/gif',
      '.webp': 'image/webp',
      '.svg': 'image/svg+xml'
    }[ext] || 'image/png';

    await uploadBytes(storageRef, fileBuffer, {
      contentType,
      cacheControl: 'public, max-age=31536000', // Cache for 1 year
    });

    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error(`❌ Error uploading ${localPath}:`, error.message);
    return null;
  }
}

/**
 * Upload all images from specified directories
 */
async function uploadAllImages() {
  console.log('🚀 Starting Firebase Storage upload...\n');
  
  let totalUploaded = 0;
  let totalFailed = 0;

  for (const dir of IMAGE_DIRECTORIES) {
    const { local, remote, description } = dir;
    
    console.log(`📁 Processing: ${description} (${local})`);
    
    const imageFiles = getImageFiles(local);
    
    if (imageFiles.length === 0) {
      console.log(`   ⚠️  No images found\n`);
      continue;
    }

    console.log(`   Found ${imageFiles.length} images`);
    
    for (const filename of imageFiles) {
      const localPath = join(local, filename);
      const remotePath = `${remote}/${filename}`;
      
      console.log(`   📤 Uploading: ${filename}...`);
      
      const downloadURL = await uploadImage(localPath, remotePath);
      
      if (downloadURL) {
        console.log(`   ✅ Uploaded: ${filename}`);
        
        // Store mapping
        const category = remote.replace(/-/g, '');
        if (!uploadedImages[category]) uploadedImages[category] = {};
        uploadedImages[category][filename] = downloadURL;
        
        totalUploaded++;
      } else {
        totalFailed++;
      }
    }
    
    console.log('');
  }

  console.log(`\n📊 Upload Summary:`);
  console.log(`   ✅ Uploaded: ${totalUploaded} images`);
  if (totalFailed > 0) {
    console.log(`   ❌ Failed: ${totalFailed} images`);
  }
  
  return { totalUploaded, totalFailed };
}

/**
 * Update Firestore documents with Storage URLs
 */
async function updateFirestoreWithUrls() {
  console.log('\n🔄 Updating Firestore documents with Storage URLs...\n');

  const collections = ['allProjects', 'fullStack', 'aiMl', 'hackathon', 
                      'freelance', 'dataEngineering', 'systems', 'gamedev', 'openSource'];
  
  let updatedCount = 0;

  for (const collectionName of collections) {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      
      for (const document of querySnapshot.docs) {
        const data = document.data();
        
        // Check if document has an imageName field
        if (data.imageName && uploadedImages.projects[data.imageName]) {
          const imageUrl = uploadedImages.projects[data.imageName];
          
          // Update document with imageUrl
          await updateDoc(doc(db, collectionName, document.id), {
            imageUrl: imageUrl,
            imageStoragePath: `projects/${data.imageName}`
          });
          
          console.log(`   ✅ Updated ${collectionName}/${document.id}: ${data.imageName}`);
          updatedCount++;
        }
      }
    } catch (error) {
      console.error(`   ❌ Error updating ${collectionName}:`, error.message);
    }
  }

  console.log(`\n📊 Updated ${updatedCount} Firestore documents with image URLs`);
}

/**
 * Generate URL mapping file for easy reference
 */
function generateUrlMapping() {
  console.log('\n📝 Generating URL mapping file...');
  
  const mappingData = {
    generatedAt: new Date().toISOString(),
    totalImages: Object.values(uploadedImages).reduce((sum, cat) => 
      sum + Object.keys(cat).length, 0),
    categories: uploadedImages
  };

  // Write to JSON file
  writeFileSync(
    'IMAGE_URL_MAPPING.json',
    JSON.stringify(mappingData, null, 2)
  );

  console.log('   ✅ Created IMAGE_URL_MAPPING.json');
}

/**
 * Main execution
 */
async function main() {
  console.log('╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║      🔥 Firebase Storage Image Upload Script 🔥           ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');

  try {
    // Step 1: Upload all images
    const { totalUploaded, totalFailed } = await uploadAllImages();

    if (totalUploaded === 0) {
      console.log('\n⚠️  No images were uploaded. Exiting.');
      process.exit(0);
    }

    // Step 2: Update Firestore documents
    await updateFirestoreWithUrls();

    // Step 3: Generate mapping file
    await generateUrlMapping();

    console.log('\n╔════════════════════════════════════════════════════════════╗');
    console.log('║                                                            ║');
    console.log('║              ✅ Upload Complete! ✅                        ║');
    console.log('║                                                            ║');
    console.log('╚════════════════════════════════════════════════════════════╝\n');

    console.log('🎯 Next Steps:');
    console.log('   1. Check IMAGE_URL_MAPPING.json for all URLs');
    console.log('   2. Update your components to use Firebase Storage URLs');
    console.log('   3. Test that images load correctly');
    console.log('   4. Run "node scripts/cleanupLocalImages.mjs" to remove local images');
    console.log('   5. Commit and push lighter repo!\n');

    console.log('📊 Space Saved:');
    console.log(`   Approximately ${Math.round(totalUploaded * 0.3)} MB removed from git repo\n`);

    process.exit(0);

  } catch (error) {
    console.error('\n❌ Fatal error:', error);
    process.exit(1);
  }
}

main();

