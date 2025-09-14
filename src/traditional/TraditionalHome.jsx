import React, { useState, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, Box, Torus, Float, Stars, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import Navbar from './TradNav';
import Links from './TradLinks';
import Resume from './TradResume';
import Certifications from './TradCert';
import Projects from './TradProj';
import Contact from './TradContact';
import Experience from './TradExp';

import styles from './TraditionalHome.module.css';
import chibiNaruto from './ChibiB.jpg';  // make sure path is correct!

// 3D Background Components
function FloatingShapes() {
  const groupRef = useRef();
  
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.rotation.x = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <Box position={[8, 2, -10]} args={[1, 1, 1]}>
          <meshStandardMaterial color="#4ecdc4" transparent opacity={0.6} />
        </Box>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Torus position={[-8, 1, -8]} args={[1, 0.4, 16, 32]}>
          <meshStandardMaterial color="#ff6b6b" transparent opacity={0.6} />
        </Torus>
      </Float>
      
      <Float speed={3} rotationIntensity={2} floatIntensity={3}>
        <Sphere position={[0, 3, -12]} args={[0.8, 16, 16]}>
          <meshStandardMaterial color="#45b7d1" transparent opacity={0.5} />
        </Sphere>
      </Float>
    </group>
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#4ecdc4" />
      <pointLight position={[10, 10, 10]} intensity={0.3} color="#ff6b6b" />
      
      <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade />
      <FloatingShapes />
    </>
  );
}

const TraditionalHome = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className={styles.container}>
      {/* 3D Background */}
      <div className={styles.background3D}>
        <Canvas
          camera={{ position: [0, 5, 15], fov: 60 }}
          style={{ background: 'transparent' }}
          gl={{ 
            antialias: false,
            alpha: true,
            powerPreference: "high-performance"
          }}
        >
          <Scene3D />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            enableDamping
            dampingFactor={0.05}
          />
        </Canvas>
      </div>

      {/* Parallax Background */}
      <div 
        className={styles.parallaxBg}
        style={{
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
        }}
      ></div>

      <Navbar />
      
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            <span className={styles.titleLine}>Welcome to</span>
            <span className={styles.titleLine + ' ' + styles.highlight}>RHYCHAW's</span>
            <span className={styles.titleLine}>Digital Universe</span>
          </h1>
          <p className={styles.heroDescription}>
            Full Stack Developer crafting immersive digital experiences with cutting-edge technologies
          </p>
          
          <div className={styles.navLinks}>
            <a href="#experience" className={styles.navButton}>
              <span>Experience</span>
              <div className={styles.buttonGlow}></div>
            </a>
            <a href="#projects" className={styles.navButton}>
              <span>Projects</span>
              <div className={styles.buttonGlow}></div>
            </a>
            <a href="#certifications" className={styles.navButton}>
              <span>Certifications</span>
              <div className={styles.buttonGlow}></div>
            </a>
            <a href="#resume" className={styles.navButton}>
              <span>Resume</span>
              <div className={styles.buttonGlow}></div>
            </a>
            <a href="#contact" className={styles.navButton}>
              <span>Contact</span>
              <div className={styles.buttonGlow}></div>
            </a>
          </div>
        </div>
      </div>

      <main className={styles.main}>
        <section id="experience" className={styles.section}>
          <Experience />
        </section>
        
        <section id="projects" className={styles.section}>
          <Projects />
        </section>
        
        <section id="certifications" className={styles.section}>
          <Certifications />
        </section>
        
        <section id="resume" className={styles.section}>
          <Resume />
        </section>
        
        <section id="contact" className={styles.section}>
          <Contact />
        </section>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2024 Rhythm Chawla. All rights reserved.</p>
        <p>Built with React & ❤️</p>
      </footer>

      {/* Floating Chibi Naruto */}
      <a href="/naruto" className={styles.chibiWrapper}>
        <img src={chibiNaruto} alt="Chibi Naruto" className={styles.chibiNaruto} />
        <div className={styles.tooltip}>
          Click me to enter the 3D Ninja Experience!  
          <br /> Learn everything the cool way, dattebayo!
        </div>
      </a>
    </div>
  );
};

export default TraditionalHome;
