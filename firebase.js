// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

console.log('%c════════════════════════════════════════════════════════════', 'color: #f97316; font-weight: bold;');
console.log('%c🔥 FIREBASE INITIALIZATION STARTING 🔥', 'color: #f97316; font-size: 16px; font-weight: bold;');
console.log('%c════════════════════════════════════════════════════════════', 'color: #f97316; font-weight: bold;');

// Check if environment variables are loaded
const envVarsLoaded = !!import.meta.env.VITE_FIREBASE_PROJECT_ID;
console.log('%c📋 Environment Variables:', 'color: #3b82f6; font-weight: bold;');
console.log('   Status:', envVarsLoaded ? '✅ LOADED' : '❌ NOT LOADED');
console.log('   VITE_FIREBASE_PROJECT_ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID || '❌ MISSING');
console.log('   VITE_FIREBASE_API_KEY:', import.meta.env.VITE_FIREBASE_API_KEY ? '✅ Present' : '❌ MISSING');

if (!envVarsLoaded) {
  console.error('%c❌ ERROR: Environment variables not loaded!', 'color: red; font-size: 14px; font-weight: bold;');
  console.error('%c📝 Did you create .env file?', 'color: orange;');
  console.error('%c🔄 Did you restart dev server after creating .env?', 'color: orange;');
  throw new Error('Firebase environment variables not loaded. Please check .env file and restart dev server.');
}

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

console.log('%c📦 Firebase Config:', 'color: #3b82f6; font-weight: bold;');
console.log('   Project ID:', firebaseConfig.projectId);
console.log('   Storage Bucket:', firebaseConfig.storageBucket);

// Initialize Firebase
let app, analytics, db, storage;

try {
  app = initializeApp(firebaseConfig);
  analytics = getAnalytics(app);
  db = getFirestore(app);
  storage = getStorage(app);

  console.log('%c✅ FIREBASE INITIALIZED SUCCESSFULLY!', 'color: #22c55e; font-size: 14px; font-weight: bold;');
  console.log('%c📊 Firestore:', 'color: #3b82f6; font-weight: bold;', db.app.options.projectId);
  console.log('%c📦 Storage:', 'color: #3b82f6; font-weight: bold;', storage.app.options.storageBucket);
  console.log('%c🌐 Data Source:', 'color: #3b82f6; font-weight: bold;', 'FIREBASE CLOUD (Not local files)');
  console.log('%c════════════════════════════════════════════════════════════', 'color: #22c55e; font-weight: bold;');
  
} catch (error) {
  console.error('%c════════════════════════════════════════════════════════════', 'color: red; font-weight: bold;');
  console.error('%c❌ FIREBASE INITIALIZATION FAILED!', 'color: red; font-size: 16px; font-weight: bold;');
  console.error('%c════════════════════════════════════════════════════════════', 'color: red; font-weight: bold;');
  console.error('Error:', error);
  console.error('%c⚠️  Your data will load from LOCAL FILES instead of Firebase!', 'color: orange; font-weight: bold;');
  throw error;
}

export { app, analytics, db, storage };
export default app;