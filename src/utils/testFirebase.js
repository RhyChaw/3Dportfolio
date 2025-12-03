import { db, storage } from '../../firebase';
import { collection, getDocs, doc, getDoc } from 'firebase/firestore';
import { ref, getDownloadURL } from 'firebase/storage';

/**
 * Test Firebase Firestore connection
 * Call this from your component to verify data is coming from Firebase
 */
export async function testFirestoreConnection() {
  console.log('\n🧪 Testing Firestore Connection...\n');
  
  try {
    // Test 1: Fetch all projects
    console.log('📊 Fetching projects from Firestore...');
    const projectsSnapshot = await getDocs(collection(db, 'allProjects'));
    const projectCount = projectsSnapshot.size;
    
    console.log(`✅ Successfully fetched ${projectCount} projects from Firestore Cloud!`);
    
    // Test 2: Fetch a specific project
    if (!projectsSnapshot.empty) {
      const firstProject = projectsSnapshot.docs[0];
      console.log('\n📄 Sample Project from Firestore:', {
        id: firstProject.id,
        title: firstProject.data().title,
        category: firstProject.data().category,
        imageUrl: firstProject.data().imageUrl ? '✅ Has Firebase Storage URL' : '❌ No URL',
        source: '🔥 Firebase Cloud'
      });
      
      // Show the actual data
      console.log('\n📦 Full Project Data:', firstProject.data());
    }
    
    // Test 3: Count projects by category
    console.log('\n📊 Fetching categories...');
    const categories = ['fullStack', 'aiMl', 'hackathon', 'freelance', 'openSource'];
    
    for (const category of categories) {
      const snapshot = await getDocs(collection(db, category));
      if (snapshot.size > 0) {
        console.log(`   • ${category}: ${snapshot.size} projects`);
      }
    }
    
    console.log('\n✅ Firestore is working! Data is coming from Firebase Cloud!\n');
    
    return {
      success: true,
      projectCount,
      message: 'All data successfully loaded from Firebase!'
    };
    
  } catch (error) {
    console.error('❌ Firestore Error:', error);
    console.error('⚠️  Data might be loading from local files instead!');
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Test Firebase Storage connection
 */
export async function testStorageConnection() {
  console.log('\n🧪 Testing Firebase Storage...\n');
  
  try {
    // Try to get a download URL for a known image
    console.log('📸 Fetching image from Firebase Storage...');
    const imageRef = ref(storage, 'projects/SportSpark.png');
    const downloadURL = await getDownloadURL(imageRef);
    
    console.log('✅ Successfully retrieved image URL from Storage!');
    console.log('🔗 Image URL:', downloadURL);
    console.log('📦 Source: Firebase Cloud Storage (CDN)');
    
    return {
      success: true,
      url: downloadURL,
      message: 'Images are being served from Firebase Storage!'
    };
    
  } catch (error) {
    console.error('❌ Storage Error:', error);
    console.error('⚠️  Images might be loading from local files instead!');
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Run all Firebase tests
 */
export async function runAllFirebaseTests() {
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                                                            ║');
  console.log('║           🔥 Firebase Connection Tests 🔥                 ║');
  console.log('║                                                            ║');
  console.log('╚════════════════════════════════════════════════════════════╝\n');
  
  const firestoreResult = await testFirestoreConnection();
  const storageResult = await testStorageConnection();
  
  console.log('\n╔════════════════════════════════════════════════════════════╗');
  console.log('║                     Test Results                           ║');
  console.log('╚════════════════════════════════════════════════════════════╝');
  console.log(`Firestore: ${firestoreResult.success ? '✅ Connected' : '❌ Failed'}`);
  console.log(`Storage:   ${storageResult.success ? '✅ Connected' : '❌ Failed'}`);
  
  if (firestoreResult.success && storageResult.success) {
    console.log('\n🎉 All data is coming from Firebase Cloud! 🎉\n');
  } else {
    console.log('\n⚠️  Some data might be loading from local files!\n');
  }
  
  return {
    firestore: firestoreResult,
    storage: storageResult,
    allPassed: firestoreResult.success && storageResult.success
  };
}

/**
 * Quick test - fetch one project and log source
 */
export async function quickFirebaseTest() {
  try {
    const snapshot = await getDocs(collection(db, 'allProjects'));
    if (!snapshot.empty) {
      const project = snapshot.docs[0].data();
      console.log('🔥 Firebase Test Result:', {
        dataSource: 'FIREBASE CLOUD ✅',
        projectTitle: project.title,
        hasImageUrl: !!project.imageUrl,
        totalProjects: snapshot.size
      });
      return true;
    }
  } catch (error) {
    console.error('❌ Firebase connection failed:', error);
    return false;
  }
}

