// Simple test to confirm Firebase is loading
console.log('%c════════════════════════════════════════════════════════════', 'background: #000; color: #f97316; font-size: 20px;');
console.log('%c🔥 FIREBASE TEST FILE LOADED! 🔥', 'background: #000; color: #f97316; font-size: 24px; font-weight: bold; padding: 10px;');
console.log('%c════════════════════════════════════════════════════════════', 'background: #000; color: #f97316; font-size: 20px;');

import { db } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';

console.log('%c✅ Firebase imported successfully!', 'color: #22c55e; font-size: 18px; font-weight: bold;');
console.log('📊 Firestore object:', db);

// Immediately test Firestore
console.log('%c🧪 Testing Firestore connection...', 'color: #3b82f6; font-size: 16px;');

getDocs(collection(db, 'allProjects'))
  .then(snapshot => {
    console.log('%c', 'font-size: 1px;'); // Spacer
    console.log('%c════════════════════════════════════════════════════════════', 'background: #22c55e; color: white; font-size: 16px;');
    console.log('%c✅ SUCCESS! DATA FROM FIREBASE CLOUD! ✅', 'background: #22c55e; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
    console.log('%c════════════════════════════════════════════════════════════', 'background: #22c55e; color: white; font-size: 16px;');
    console.log(`%c📊 Projects fetched: ${snapshot.size}`, 'color: #3b82f6; font-size: 16px; font-weight: bold;');
    console.log('%c🌐 Source: FIREBASE CLOUD (Not local files!)', 'color: #3b82f6; font-size: 16px; font-weight: bold;');
    console.log('%c', 'font-size: 1px;'); // Spacer
    
    // Show first 3 projects
    console.log('%c📦 Sample Projects:', 'color: #8b5cf6; font-size: 14px; font-weight: bold;');
    snapshot.docs.slice(0, 3).forEach(doc => {
      const data = doc.data();
      console.log(`   • ${data.title} (${data.category})`);
    });
    
    console.log('%c', 'font-size: 1px;'); // Spacer
    console.log('%c🎉 Firebase is working perfectly! 🎉', 'background: #22c55e; color: white; font-size: 18px; font-weight: bold; padding: 5px;');
  })
  .catch(error => {
    console.error('%c════════════════════════════════════════════════════════════', 'background: #ef4444; color: white; font-size: 16px;');
    console.error('%c❌ FIREBASE ERROR! ❌', 'background: #ef4444; color: white; font-size: 20px; font-weight: bold; padding: 10px;');
    console.error('%c════════════════════════════════════════════════════════════', 'background: #ef4444; color: white; font-size: 16px;');
    console.error('Error:', error);
    console.error('%c⚠️  Data will load from LOCAL FILES instead!', 'color: #f97316; font-size: 16px; font-weight: bold;');
  });

export default true;
