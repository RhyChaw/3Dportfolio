import React, { Suspense, useState, useRef, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Html, KeyboardControls, PointerLockControls } from '@react-three/drei';
import RoomScene from '../components/RoomScene';
import ThirdPersonController from '../components/ThirdPersonController';
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
import Experience from './Experience';
import skyImage from '../assets/sky.jpg';
import PhotoGallery from './PhotoGallery';
// import Joystick from '../components/Joystick';


const Home = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0.4, z: 0 });
  const [startPos, setStartPos] = useState(null);
  const [targetPos, setTargetPos] = useState(null);
  const controlsRef = useRef();
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  const wasNearComputer = useRef(false);
  const wasNearResume = useRef(false);
  const wasNearCertifications = useRef(false);
  const wasNearProjects = useRef(false);
  const wasNearContact = useRef(false);
  const wasNearExperience = useRef(false);
  const wasNearGallery = useRef(false);


  const [popupVisible, setPopupVisible] = useState(false);
  const [resumeVisible, setResumeVisible] = useState(false);
  const [certificationsVisible, setCertificationsVisible] = useState(false);
  const [projectsVisible, setProjectsVisible] = useState(false);
  const [contactVisible, setContactVisible] = useState(false);
  const [experienceVisible, setExperienceVisible] = useState(false);
  const [galleryVisible, setGalleryVisible] = useState(false);

  const handleRadarClick = () => {};

  const handleNavigate = (pos) => {
    setStartPos(narutoPos);
    setTargetPos(pos);
  };

  useEffect(() => {}, []);

  // Proximity detection for opening/closing popups based on Naruto's position
  useEffect(() => {
    const distance = (a, b) => {
      const dx = a.x - b.x;
      const dy = a.y - b.y;
      const dz = a.z - b.z;
      return Math.sqrt(dx * dx + dy * dy + dz * dz);
    };

    const threshold = 2.5;

    const sections = [
      {
        key: 'computer',
        target: { x: 10.25, y: 0.4, z: -5.63 },
        wasNear: wasNearComputer,
        onNear: () => setPopupVisible(true),
        onFar: () => setPopupVisible(false),
      },
      {
        key: 'resume',
        target: { x: -0.03, y: 0.4, z: -9.67 },
        wasNear: wasNearResume,
        onNear: () => setResumeVisible(true),
        onFar: () => setResumeVisible(false),
      },
      {
        key: 'certifications',
        target: { x: 10.67, y: 0.4, z: 3.39 },
        wasNear: wasNearCertifications,
        onNear: () => setCertificationsVisible(true),
        onFar: () => setCertificationsVisible(false),
      },
      {
        key: 'projects',
        target: { x: -6.06, y: 0.4, z: 1.64 },
        wasNear: wasNearProjects,
        onNear: () => setProjectsVisible(true),
        onFar: () => setProjectsVisible(false),
      },
      {
        key: 'contact',
        target: { x: -2.54, y: 0.4, z: 9.51 },
        wasNear: wasNearContact,
        onNear: () => setContactVisible(true),
        onFar: () => setContactVisible(false),
      },
      {
        key: 'experience',
        target: { x: 6.31, y: 0.4, z: -8.4 },
        wasNear: wasNearExperience,
        onNear: () => setExperienceVisible(true),
        onFar: () => setExperienceVisible(false),
      },
      {
        key: 'gallery',
        target: { x: 5.33, y: 0.4, z: 9.1 },
        wasNear: wasNearGallery,
        onNear: () => setGalleryVisible(true),
        onFar: () => setGalleryVisible(false),
      },
    ];

    sections.forEach(({ target, wasNear, onNear, onFar }) => {
      const d = distance(coords, target);
      if (d < threshold) {
        if (!wasNear.current) {
          wasNear.current = true;
          onNear();
        }
      } else if (wasNear.current) {
        wasNear.current = false;
        onFar();
      }
    });
  }, [coords]);


  // Movement handled by FirstPersonController

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

      <KeyboardControls
        map={[
          { name: 'forward', keys: ['KeyW', 'ArrowUp'] },
          { name: 'back', keys: ['KeyS', 'ArrowDown'] },
          { name: 'left', keys: ['KeyA', 'ArrowLeft'] },
          { name: 'right', keys: ['KeyD', 'ArrowRight'] },
          { name: 'sprint', keys: ['ShiftLeft', 'ShiftRight'] },
        ]}
      >
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

            <ThirdPersonController onPositionChange={setCoords} />

          {/* Labels */}
          <FloatingLabel text="💻 Links" position={[10.25, 2, -5.63]} />
          <FloatingLabel text="📄 Resume" position={[-0.03, 2, -9.67]} />
          <FloatingLabel text="🏅 Certifications" position={[10.67, 2, 3.39]} />
          <FloatingLabel text="📁 Projects" position={[-6.06, 2, 1.64]} />
          <FloatingLabel text="📬 Contact Us" position={[-2.54, 2, 9.51]} />
          <FloatingLabel text="💼 Experience" position={[6.31, 2, -8.4]} />
          <FloatingLabel text="📸 Gallery" position={[5.33, 2, 9.10]} />

          {/* Optional: could add OrbitControls targeting player, but TPS controller already controls camera */}
        </Suspense>
        </Canvas>
      </KeyboardControls>

      {/* Joystick disabled in FPS mode */}

      <RadarMinimap narutoPosition={coords} />
      <Title />
      <ChatBox />

      {popupVisible && <Links onClose={() => setPopupVisible(false)} />}
      {resumeVisible && <Resume onClose={() => setResumeVisible(false)} />}
      {certificationsVisible && <Certifications onClose={() => setCertificationsVisible(false)} />}
      {projectsVisible && <Projects onClose={() => setProjectsVisible(false)} />}
      {contactVisible && <Contact onClose={() => setContactVisible(false)} />}
      {experienceVisible && <Experience onClose={() => setExperienceVisible(false)} />}
      {galleryVisible && <PhotoGallery onClose={() => setGalleryVisible(false)} />}


    </div>
  );
};

export default Home;
