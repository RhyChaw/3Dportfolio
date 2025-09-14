import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import RoomScene from '../components/RoomScene';
import PlayableNaruto from '../components/PlayableNaruto';
import FloatingLabel from '../components/FloatingLabel';
import RadarMinimap from '../components/RadarMinimap';
import Links from './Links';
import Resume from './Resume';
import Certifications from './Certifications';
import Projects from './Projects';
import Contact from './Contact';
import Navbar from '../components/Navbar';
import ChatBox from './ChatBox';
import Title from './Title';
import NarutoMover from '../components/NarutoMover';
import Experience from './Experience';
import skyImage from '../assets/sky.jpg';
import PhotoGallery from './PhotoGallery';
import Joystick from '../components/Joystick';
import axios from 'axios';

const Home = () => {
  const [narutoPos, setNarutoPos] = useState({ x: 0, y: 0.4, z: 0 });
  const [startPos, setStartPos] = useState(null);
  const [targetPos, setTargetPos] = useState(null);
  const controlsRef = useRef();

  // FPS Control states
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const [popupVisible, setPopupVisible] = useState(false);
  const [resumeVisible, setResumeVisible] = useState(false);
  const [certificationsVisible, setCertificationsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [experienceVisible, setExperienceVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);

  const handleRadarClick = ({ x, z }) => {
    setNarutoPos((prev) => ({ ...prev, x, z }));
    const zones = [
      { x: 10.25, z: -5.63, set: setPopupVisible },
      { x: -0.03, z: -9.67, set: setResumeVisible },
      { x: 10.67, z: 3.39, set: setCertificationsVisible },
      { x: -6.06, z: 1.64, set: setProjectsVisible },
      { x: -2.54, z: 9.51, set: setContactVisible },
      { x: 6.31, z: -8.4, set: setExperienceVisible }
    ];
    zones.forEach(({ x: zx, z: zz, set }) => {
      const dist = Math.hypot(zx - x, zz - z);
      set(dist < 2.5);
    });
  };

  const handleNavigate = (pos) => {
    setStartPos(narutoPos);
    setTargetPos(pos);
  };

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 2, 0);
      controlsRef.current.update();
    }
  }, []);

  // FPS Control handlers
  const handlePointerLockChange = () => {
    const isLocked = document.pointerLockElement === document.body;
    setIsPointerLocked(isLocked);
    setShowInstructions(!isLocked);
  };

  const handlePointerLockError = () => {
    console.error('Pointer lock failed');
  };

  useEffect(() => {
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.addEventListener('pointerlockerror', handlePointerLockError);
    
    return () => {
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.removeEventListener('pointerlockerror', handlePointerLockError);
    };
  }, []);

  // Movement is now handled by PlayableNaruto component

  let keysPressed = new Set();

const dispatchKey = (type, code) => {
  window.dispatchEvent(new KeyboardEvent(type, {
    code,
    key: codeToKey(code),
    bubbles: true,
  }));
};

const codeToKey = (code) => {
  switch (code) {
    case 'KeyW': return 'w';
    case 'KeyA': return 'a';
    case 'KeyS': return 's';
    case 'KeyD': return 'd';
    default: return '';
  }
};

const handleJoystickMove = ({ x, y }) => {
  // Determine which keys should be pressed based on joystick position
  const newKeys = new Set();

  if (y > 0.1) newKeys.add('KeyW');    // Up => W
  if (y < -0.1) newKeys.add('KeyS');   // Down => S
  if (x < -0.1) newKeys.add('KeyA');   // Left => A
  if (x > 0.1) newKeys.add('KeyD');    // Right => D

  // Dispatch keydown for newly pressed keys
  newKeys.forEach(code => {
    if (!keysPressed.has(code)) {
      dispatchKey('keydown', code);
    }
  });

  // Dispatch keyup for keys no longer pressed
  keysPressed.forEach(code => {
    if (!newKeys.has(code)) {
      dispatchKey('keyup', code);
    }
  });

  keysPressed = newKeys;
};

// When joystick is released (no input)
const handleJoystickEnd = () => {
  keysPressed.forEach(code => {
    dispatchKey('keyup', code);
  });
  keysPressed.clear();
};

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
        position: 'relative',
      }}
    >
      <Navbar onNavigate={handleNavigate} />

      <Canvas
        shadows
        camera={{ position: [0, 8, 12], fov: 50 }}
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
            position={[narutoPos.x, narutoPos.y, narutoPos.z]}
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
            onNearExperience={() => setExperienceVisible(true)}
            onFarFromExperience={() => setExperienceVisible(false)}
            onNearGallery={() => setGalleryVisible(true)}
            onFarFromGallery={() => setGalleryVisible(false)}
          />

          <NarutoMover
            startPos={startPos}
            targetPos={targetPos}
            setNarutoPos={setNarutoPos}
            clearTarget={() => {
              setTargetPos(null);
              setStartPos(null);
            }}
          />

          {/* Labels */}
          <FloatingLabel text="💻 Links" position={[10.25, 2, -5.63]} />
          <FloatingLabel text="📄 Resume" position={[-0.03, 2, -9.67]} />
          <FloatingLabel text="🏅 Certifications" position={[10.67, 2, 3.39]} />
          <FloatingLabel text="📁 Projects" position={[-6.06, 2, 1.64]} />
          <FloatingLabel text="📬 Contact Us" position={[-2.54, 2, 9.51]} />
          <FloatingLabel text="💼 Experience" position={[6.31, 2, -8.4]} />
          <FloatingLabel text="📸 Gallery" position={[5.33, 2, 9.10]} />

          <OrbitControls
            ref={controlsRef}
            enableZoom
            enablePan={false}
            minPolarAngle={0}
            maxPolarAngle={Math.PI}
            makeDefault
          />
        </Suspense>
      </Canvas>

      {window.innerWidth <= 768 && <Joystick onMove={handleJoystickMove} />}

      <RadarMinimap narutoPosition={narutoPos} onClickTeleport={handleRadarClick} />
      <Title />
      <ChatBox />

      {popupVisible && <Links onClose={() => setPopupVisible(false)} />}
      {resumeVisible && <Resume onClose={() => setResumeVisible(false)} />}
      {certificationsVisible && <Certifications onClose={() => setCertificationsVisible(false)} />}
      {projectsVisible && <Projects onClose={() => setProjectsVisible(false)} />}
      {contactVisible && <Contact onClose={() => setContactVisible(false)} />}
      {experienceVisible && <Experience onClose={() => setExperienceVisible(false)} />}
      {galleryVisible && <PhotoGallery onClose={() => setGalleryVisible(false)} />}

      {/* FPS Control Instructions - Small overlay in corner */}
      {showInstructions && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            maxWidth: '300px',
            backgroundColor: 'var(--bg-secondary)',
            padding: '1rem',
            borderRadius: 'var(--border-radius)',
            border: '1px solid var(--border-color)',
            zIndex: 1000,
            color: 'white',
            fontFamily: 'var(--font-family-primary)',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <h3 style={{ color: 'var(--accent-primary)', fontSize: '1rem', margin: 0 }}>
              🥷 FPS Controls
            </h3>
            <button
              onClick={() => setShowInstructions(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--text-secondary)',
                cursor: 'pointer',
                fontSize: '1.2rem',
                padding: '0',
                lineHeight: '1',
              }}
              onMouseEnter={(e) => {
                e.target.style.color = 'var(--accent-primary)';
              }}
              onMouseLeave={(e) => {
                e.target.style.color = 'var(--text-secondary)';
              }}
            >
              ×
            </button>
          </div>
          <div style={{ fontSize: '0.9rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            <div>🖱️ <strong>Mouse:</strong> Look around</div>
            <div>⌨️ <strong>WASD:</strong> Move around</div>
            <div>🚶 <strong>Walk:</strong> Near objects to interact</div>
            <div>📱 <strong>ESC:</strong> Exit controls</div>
          </div>
          <button
            onClick={() => {
              document.body.requestPointerLock();
            }}
            style={{
              backgroundColor: 'var(--accent-primary)',
              color: 'var(--bg-primary)',
              border: 'none',
              padding: '0.5rem 1rem',
              fontSize: '0.9rem',
              borderRadius: 'var(--border-radius)',
              cursor: 'pointer',
              fontWeight: 'bold',
              transition: 'all 0.3s ease',
              width: '100%',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = 'var(--accent-hover)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = 'var(--accent-primary)';
            }}
          >
            Start FPS Mode
          </button>
        </div>
      )}

      {/* Crosshair */}
      {isPointerLocked && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '20px',
            height: '20px',
            border: '2px solid var(--accent-primary)',
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 1000,
          }}
        />
      )}
    </div>
  );
};

export default Home;
