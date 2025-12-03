import { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';

/**
 * Temporary component to test Firebase connection
 * Add this to your App.jsx or any page to verify Firebase is working
 */
export default function FirebaseTest() {
  const [status, setStatus] = useState('Testing Firebase...');
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function testFirebase() {
      try {
        console.log('🔥 Starting Firebase test...');
        
        // Fetch projects from Firebase
        const snapshot = await getDocs(collection(db, 'allProjects'));
        
        console.log('\n╔════════════════════════════════════════╗');
        console.log('║     FIREBASE CONNECTION TEST          ║');
        console.log('╚════════════════════════════════════════╝');
        console.log(`✅ Connected to Firebase!`);
        console.log(`📊 Projects fetched: ${snapshot.size}`);
        console.log(`🔥 Data source: FIREBASE CLOUD (Not local files)`);
        
        const projectsData = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log(`   • ${data.title} (${data.category})`);
          return data;
        });
        
        console.log('\n📦 Sample Project Data:');
        console.log(projectsData[0]);
        
        console.log('\n✅ SUCCESS: All data is from Firebase Cloud!\n');
        
        setProjects(projectsData);
        setStatus(`✅ Connected! Loaded ${projectsData.length} projects from Firebase`);
        
      } catch (error) {
        console.error('❌ Firebase Error:', error);
        setStatus(`❌ Error: ${error.message}`);
      }
    }
    
    testFirebase();
  }, []);

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      background: '#1a1a1a',
      color: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      maxWidth: '400px',
      zIndex: 9999,
      fontFamily: 'monospace'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>🔥 Firebase Test</h3>
      <p style={{ margin: '0 0 10px 0' }}>{status}</p>
      
      {projects.length > 0 && (
        <>
          <p style={{ margin: '10px 0', color: '#4ade80' }}>
            ✅ Data from: <strong>Firebase Cloud</strong>
          </p>
          <div style={{ fontSize: '12px', color: '#888' }}>
            <p>Sample project: {projects[0]?.title}</p>
            <p>Has image URL: {projects[0]?.imageUrl ? '✅' : '❌'}</p>
          </div>
        </>
      )}
      
      <button 
        onClick={() => window.location.reload()}
        style={{
          marginTop: '10px',
          padding: '8px 12px',
          background: '#3b82f6',
          border: 'none',
          borderRadius: '4px',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        Re-test
      </button>
    </div>
  );
}

