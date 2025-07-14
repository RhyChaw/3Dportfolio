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
import axios from 'axios';

const Home = () => {
  const [narutoPos, setNarutoPos] = useState({ x: 0, y: 0.4, z: 0 });
  const [startPos, setStartPos] = useState(null);
  const [targetPos, setTargetPos] = useState(null);
  const controlsRef = useRef();

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
      controlsRef.current.target.set(0, 5, 0);
      controlsRef.current.update();
    }
  }, []);

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
    </div>
  );
};

export default Home;
