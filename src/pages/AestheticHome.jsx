import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  Sphere, 
  Box, 
  Torus, 
  Center, 
  Stars,
  Float,
  OrbitControls,
  Html
} from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import './AestheticHome.css';

// Animated Background Particles
function ParticleField() {
  const particlesRef = useRef();
  
  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      particlesRef.current.rotation.x = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <group ref={particlesRef}>
      {Array.from({ length: 50 }).map((_, i) => (
        <Float
          key={i}
          speed={1 + Math.random() * 2}
          rotationIntensity={0.5}
          floatIntensity={0.5}
        >
          <Sphere
            position={[
              (Math.random() - 0.5) * 50,
              (Math.random() - 0.5) * 50,
              (Math.random() - 0.5) * 50
            ]}
            args={[0.2, 8, 8]}
          >
            <meshBasicMaterial
              color={new THREE.Color().setHSL(Math.random() * 0.1 + 0.6, 0.8, 0.6)}
              transparent
              opacity={0.6}
            />
          </Sphere>
        </Float>
      ))}
    </group>
  );
}

// Floating Geometric Shapes
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
        <Box position={[5, 0, 0]} args={[1, 1, 1]}>
          <meshStandardMaterial
            color="#ff6b6b"
            transparent
            opacity={0.8}
          />
        </Box>
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
        <Torus position={[-5, 0, 0]} args={[1, 0.4, 16, 32]}>
          <meshStandardMaterial
            color="#4ecdc4"
            transparent
            opacity={0.8}
          />
        </Torus>
      </Float>
      
      <Float speed={3} rotationIntensity={2} floatIntensity={3}>
        <Sphere position={[0, 3, -5]} args={[0.8, 16, 16]}>
          <meshStandardMaterial
            color="#45b7d1"
            transparent
            opacity={0.7}
          />
        </Sphere>
      </Float>
    </group>
  );
}

// Main 3D Scene
function Scene() {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);
  }, [camera]);

  return (
    <>
      <ambientLight intensity={0.2} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ecdc4" />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#ff6b6b" />
      
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade />
      <ParticleField />
      <FloatingShapes />
      
      <Center position={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[8, 2, 0.5]} />
          <meshStandardMaterial color="#ffffff" transparent opacity={0.8} />
        </mesh>
      </Center>
      
      <Center position={[0, -2, 0]}>
        <mesh>
          <boxGeometry args={[6, 1, 0.3]} />
          <meshStandardMaterial color="#4ecdc4" transparent opacity={0.8} />
        </mesh>
      </Center>
    </>
  );
}

// Navigation Component
function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="aesthetic-nav">
      <div className="nav-container">
        <div className="nav-logo">
          <span className="logo-text">RHYCHAW</span>
        </div>
        
        <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
          <Link to="/naruto" className="nav-link">
            <span className="nav-link-text">3D Portfolio</span>
            <div className="nav-link-underline"></div>
          </Link>
          <a href="#about" className="nav-link">
            <span className="nav-link-text">About</span>
            <div className="nav-link-underline"></div>
          </a>
          <a href="#projects" className="nav-link">
            <span className="nav-link-text">Projects</span>
            <div className="nav-link-underline"></div>
          </a>
          <a href="#contact" className="nav-link">
            <span className="nav-link-text">Contact</span>
            <div className="nav-link-underline"></div>
          </a>
        </div>
        
        <button 
          className="nav-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <div className="hero-text">
          <h1 className="hero-title">
            <span className="title-line">Welcome to</span>
            <span className="title-line highlight">RHYCHAW's</span>
            <span className="title-line">Digital Universe</span>
          </h1>
          <p className="hero-description">
            Full Stack Developer crafting immersive digital experiences with cutting-edge technologies
          </p>
          <div className="hero-buttons">
            <Link to="/naruto" className="btn btn-primary">
              <span>Explore 3D Portfolio</span>
              <div className="btn-glow"></div>
            </Link>
            <a href="#about" className="btn btn-secondary">
              <span>Learn More</span>
            </a>
          </div>
        </div>
      </div>
      
      <div className="hero-visual">
        <Canvas
          camera={{ position: [0, 5, 15], fov: 60 }}
          style={{ background: 'transparent' }}
          gl={{ 
            antialias: false,
            alpha: true,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={<Html><div className="loading">Loading 3D Scene...</div></Html>}>
            <Scene />
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.5}
              enableDamping
              dampingFactor={0.05}
            />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
}

// Skills Section
function SkillsSection() {
  const skills = [
    { name: 'React', level: 95, color: '#61dafb' },
    { name: 'Node.js', level: 90, color: '#68a063' },
    { name: 'Three.js', level: 85, color: '#000000' },
    { name: 'Python', level: 88, color: '#3776ab' },
    { name: 'TypeScript', level: 92, color: '#3178c6' },
    { name: 'WebGL', level: 80, color: '#990000' }
  ];

  return (
    <section id="about" className="skills-section">
      <div className="container">
        <h2 className="section-title">Technical Expertise</h2>
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <div key={index} className="skill-item">
              <div className="skill-header">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-percentage">{skill.level}%</span>
              </div>
              <div className="skill-bar">
                <div 
                  className="skill-progress"
                  style={{ 
                    width: `${skill.level}%`,
                    backgroundColor: skill.color,
                    '--skill-color': skill.color
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('3D Scene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>3D Scene Unavailable</h2>
          <p>Your browser may not support WebGL or there was an error loading the 3D scene.</p>
          <Link to="/naruto" className="btn btn-primary">
            <span>Go to 3D Portfolio</span>
          </Link>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main AestheticHome Component
function AestheticHome() {
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
    <div className="aesthetic-home">
      <div 
        className="parallax-bg"
        style={{
          transform: `translate(${mousePosition.x * 20}px, ${mousePosition.y * 20}px)`
        }}
      ></div>
      
      <Navigation />
      <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>
      <SkillsSection />
      
      <footer className="aesthetic-footer">
        <div className="container">
          <p>&copy; 2024 RHYCHAW. Crafted with passion and precision.</p>
        </div>
      </footer>
    </div>
  );
}

export default AestheticHome;
