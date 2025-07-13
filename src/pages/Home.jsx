import React, { Suspense, useState, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import RoomScene from '../components/RoomScene';
import PlayableNaruto from '../components/PlayableNaruto';
import skyImage from '../assets/sky.jpg';
import axios from 'axios';
import FloatingLabel from '../components/FloatingLabel';
import RadarMinimap from '../components/RadarMinimap';
import Links from './Links';
import Resume from './Resume';
import Certifications from './Certifications';
import Projects from './Projects';
import Contact from './Contact';
import Navbar from '../components/Navbar';

const Home = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [narutoPos, setNarutoPos] = useState({ x: 0, y: 0, z: 0 });

  const handleRadarClick = ({ x, z }) => {
    setNarutoPos((prev) => ({
      ...prev,
      x,
      z
    }));

    // Check which popup to show
    const zones = [
      { name: 'Computer', x: 10.25, z: -5.63, set: setPopupVisible },
      { name: 'Resume', x: -0.03, z: -9.67, set: setResumeVisible },
      { name: 'Certifications', x: 10.67, z: 3.39, set: setCertificationsVisible },
      { name: 'Projects', x: -6.06, z: 1.64, set: setProjectsVisible },
      { name: 'Contact', x: -2.54, z: 9.51, set: setContactVisible }
    ];

    zones.forEach(({ x: zx, z: zz, set }) => {
      const dist = Math.hypot(zx - x, zz - z);
      set(dist < 2.5); // Show if close
    });
  };

  // 🌀 NarutoBot interaction
  const handleSend = async () => {
    if (!input.trim()) return;
    try {
      const res = await axios.post('http://localhost:3001/chat', { message: input });
      setResponse(res.data.reply);
    } catch (error) {
      setResponse('⚠️ Failed to contact NarutoBot.');
      console.error(error);
    }
  };

  // extras
  const [popupVisible, setPopupVisible] = useState(false);
  const [resumeVisible, setResumeVisible] = useState(false);
  const [certificationsVisible, setCertificationsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);



  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundImage: `url(${skyImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        position: 'relative'
      }}
    >
      {/* 3D Canvas */}
      <Navbar onNavigate={(pos) => setNarutoPos({ x: pos.x, y: 0.4, z: pos.z })} />
      <Canvas
        shadows
        camera={{ position: [0, 5, 10], fov: 60 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />

        <Suspense fallback={<Html><p style={{ color: 'white' }}>Loading Room...</p></Html>}>
          <RoomScene scale={[2, 2, 2]} position={[15, 0, 0]} />
          <PlayableNaruto
            scale={[0.5, 0.5, 0.5]}
            position={[0, 0.4, 0]}
            onNearComputer={() => setPopupVisible(true)}
            onFarFromComputer={() => setPopupVisible(false)}
            onNearResume={() => setResumeVisible(true)}
            onFarFromResume={() => setResumeVisible(false)}
            onNearCertifications={() => setCertificationsVisible(true)}
            onFarFromCertifications={() => setCertificationsVisible(false)}
            onNearProjects={() => setProjectsVisible(true)}
            onFarFromProjects={() => setProjectsVisible(false)}
            updateNarutoPosition={(pos) => setNarutoPos(pos)}
            onNearContact={() => setContactVisible(true)}
            onFarFromContact={() => setContactVisible(false)}
          />
        </Suspense>

        <FloatingLabel text="💻 Computer" position={[10.25, 2, -5.63]} />
        <FloatingLabel text="📄 Resume" position={[-0.03, 2, -9.67]} />
        <FloatingLabel text="🏅 Certifications" position={[10.67, 2, 3.39]} />
        <FloatingLabel text="📁 Projects" position={[-6.06, 2, 1.64]} />
        <FloatingLabel text="📬 Contact Us" position={[-2.54, 2, 9.51]} />


        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={Math.PI / 2}
          maxPolarAngle={Math.PI / 2}
          target={[0, 3, 0]}
          minDistance={2}
          maxDistance={100}
        />

     

        <axesHelper args={[10]} />
        <gridHelper args={[10, 10]} />
      </Canvas>

      <RadarMinimap narutoPosition={narutoPos} onClickTeleport={handleRadarClick} />


      {popupVisible && (
        <Links />
      )}

      {resumeVisible && <Resume onClose={() => setResumeVisible(false)} />}


      {certificationsVisible && (
       <Certifications />
      )}

      {projectsVisible && (
        <Projects />
      )}

      {contactVisible && (
        <Contact />
      )}


      {/* UI Top Left */}
      <div style={{
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 9999,
        color: 'white',
        textAlign: 'left',
        fontSize: '14px',
        fontFamily: 'sans-serif',
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: '10px',
        borderRadius: '10px'
      }}>
        <h1 style={{ margin: 0, fontSize: '20px' }}>Rhythm's Ninja Way</h1>
        <p style={{ margin: 0 }}>Explore the room and talk to Naruto!</p>
      </div>

      {/* NarutoBot Chat Box - Bottom Right */}
      <div style={{
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: '300px',
        backgroundColor: 'rgba(25,25,25,0.85)',
        color: '#eee',
        padding: '15px',
        borderRadius: '15px',
        boxShadow: '0 0 15px rgba(0,0,0,0.6)',
        zIndex: 9999,
        fontFamily: 'monospace',
        backdropFilter: 'blur(6px)'
      }}>
        <h3 style={{ marginTop: 0, color: '#FFD700' }}>🌀 NarutoBot</h3>
        <textarea
          value={response}
          readOnly
          rows={6}
          style={{
            width: '100%',
            resize: 'none',
            padding: '8px',
            background: '#111',
            color: '#0f0',
            borderRadius: '8px',
            marginBottom: '10px',
            border: '1px solid #444'
          }}
        />
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Naruto..."
          style={{
            width: '100%',
            padding: '8px',
            borderRadius: '6px',
            border: '1px solid #666',
            background: '#222',
            color: 'white',
            marginBottom: '8px'
          }}
        />
        <button
          onClick={handleSend}
          style={{
            width: '100%',
            padding: '10px',
            background: '#FF4500',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          Believe it! ➤
        </button>
      </div>
    </div>
  );
};

export default Home;
