import React, { useRef, useEffect, useState } from 'react';
import { useGLTF, Html } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function PlayableNaruto(props) {
  const { scene } = useGLTF('/models/naruto.glb');
  const narutoRef = useRef();
  const { camera, controls } = useThree();

  const [keysPressed, setKeysPressed] = useState({});
  const [showInstruction, setShowInstruction] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem('narutoInstructionSeen')) {
      setShowInstruction(true);
    }
  }, []);

  const {
    onNearComputer,
    onFarFromComputer,
    onNearResume,
    onFarFromResume,
    onNearCertifications,
    onFarFromCertifications,
    onNearProjects,
    onFarFromProjects,
    updateNarutoPosition,
    onNearContact,
    onFarFromContact,
    onNearExperience,
    onFarFromExperience,
    onNearGallery,
    onFarFromGallery
  } = props;

  let wasNearComputer = useRef(false);
  let wasNearResume = useRef(false);
  let wasNearCertifications = useRef(false);
  let wasNearProjects = useRef(false);
  let wasNearContact = useRef(false);
  let wasNearExperience = useRef(false);
  let wasNearGallery = useRef(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      setKeysPressed((prev) => ({ ...prev, [e.key.toLowerCase()]: true }));
    };
    const handleKeyUp = (e) => {
      setKeysPressed((prev) => ({ ...prev, [e.key.toLowerCase()]: false }));
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const speed = 7.5;
    const direction = new THREE.Vector3();

    // Movement input - Restrict to W only (forward)
    let forward = 0;
    let right = 0;

    if (keysPressed['w']) forward = 1; // Only allow forward via W key

    // Convert relative movement to world coordinates based on camera direction
    if (forward !== 0 || right !== 0) {
      // Get camera direction (ignoring Y component for horizontal movement)
      const cameraDirection = new THREE.Vector3();
      camera.getWorldDirection(cameraDirection);
      cameraDirection.y = 0; // Keep movement on horizontal plane
      cameraDirection.normalize();

      // Calculate right direction (perpendicular to forward)
      const rightDirection = new THREE.Vector3();
      rightDirection.crossVectors(cameraDirection, new THREE.Vector3(0, 1, 0));
      rightDirection.normalize();

      // Calculate final movement direction
      direction.addVectors(
        cameraDirection.clone().multiplyScalar(forward),
        rightDirection.clone().multiplyScalar(right)
      );
      
      direction.normalize().multiplyScalar(speed * delta);
    }

    if (narutoRef.current) {
      // Move Naruto
      narutoRef.current.position.add(direction);

      // Clamp position inside room bounds
      narutoRef.current.position.x = THREE.MathUtils.clamp(narutoRef.current.position.x, -7.5, 10.5);
      narutoRef.current.position.z = THREE.MathUtils.clamp(narutoRef.current.position.z, -8.4, 9.1);
      narutoRef.current.position.y = 0.4;

      // Update Naruto position in parent state
      updateNarutoPosition?.({
        x: narutoRef.current.position.x,
        y: narutoRef.current.position.y,
        z: narutoRef.current.position.z
      });

      // Rotate Naruto to face movement direction (only if moving)
      if (direction.length() > 0) {
        narutoRef.current.rotation.y = Math.atan2(direction.x, direction.z);
      }

      // Smooth third-person camera follow
      const rotationY = narutoRef.current.rotation.y;
      const offsetDistance = 8; // Distance behind Naruto
      const offsetHeight = 4; // Height above Naruto

      // Calculate camera offset based on Naruto's rotation (behind him)
      const offsetX = Math.sin(rotationY) * offsetDistance;
      const offsetZ = Math.cos(rotationY) * offsetDistance;

      // Desired camera position
      const desiredPosition = new THREE.Vector3(
        narutoRef.current.position.x - offsetX,
        narutoRef.current.position.y + offsetHeight,
        narutoRef.current.position.z - offsetZ
      );

      // Lerp camera position smoothly
      camera.position.lerp(desiredPosition, 0.08);

      // Lerp camera target to slightly above Naruto's position
      const targetPosition = new THREE.Vector3(
        narutoRef.current.position.x,
        narutoRef.current.position.y + 1, // Look slightly above Naruto
        narutoRef.current.position.z
      );

      // Update OrbitControls target
      if (controls) {
        controls.target.lerp(targetPosition, 0.08);
        controls.update();
      }

      // Check distances for triggering zones
      const narutoPos = narutoRef.current.position;

      const distCheck = (target, wasNear, onNear, onFar) => {
        const distance = narutoPos.distanceTo(target);
        if (distance < 2.5) {
          if (!wasNear.current) {
            onNear?.();
            wasNear.current = true;
          }
        } else {
          if (wasNear.current) {
            onFar?.();
            wasNear.current = false;
          }
        }
      };

      distCheck(new THREE.Vector3(10.25, 0.4, -5.63), wasNearComputer, onNearComputer, onFarFromComputer);
      distCheck(new THREE.Vector3(-0.03, 0.4, -9.67), wasNearResume, onNearResume, onFarFromResume);
      distCheck(new THREE.Vector3(10.67, 0.4, 3.39), wasNearCertifications, onNearCertifications, onFarFromCertifications);
      distCheck(new THREE.Vector3(-6.06, 0.4, 1.64), wasNearProjects, onNearProjects, onFarFromProjects);
      distCheck(new THREE.Vector3(-2.54, 0.4, 9.51), wasNearContact, onNearContact, onFarFromContact);
      distCheck(new THREE.Vector3(6.31, 0.4, -8.4), wasNearExperience, onNearExperience, onFarFromExperience);
      distCheck(new THREE.Vector3(5.33, 0.4, 9.10), wasNearGallery, onNearGallery, onFarFromGallery);
    }
  });

  return (
    <group ref={narutoRef} {...props}>
      <primitive object={scene} scale={[1, 1, 1]} />

      {showInstruction && (
        <Html fullscreen>
          <div
            onClick={() => {
              setShowInstruction(false);
              localStorage.setItem('narutoInstructionSeen', '1');
            }}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.5)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              zIndex: 99999,
              cursor: 'pointer'
            }}
          >
            <div
              style={{
                width: 'min(900px, 95vw)',
                padding: '2.5rem',
                background: `url(/images/scroll-texture.jpg) center/cover no-repeat`,
                border: '2px solid var(--border-glow)',
                borderRadius: '16px',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                color: '#1f2937',
                textAlign: 'center',
                backdropFilter: 'blur(2px)'
              }}
            >
              <h2 style={{ margin: '0 0 0.75rem 0', fontSize: '2rem', color: '#111827' }}>Welcome to the 3D World</h2>
              <p style={{ margin: 0, fontSize: '1.1rem', color: '#111827', fontWeight: 700 }}>Controls</p>
              <ul style={{ listStyle: 'none', padding: 0, margin: '1rem 0 1.5rem 0', color: '#111827', fontSize: '1.05rem', lineHeight: 1.6 }}>
                <li>• Press W to move forward</li>
                <li>• Hold mouse button and move to look around</li>
              </ul>
              <div style={{ fontSize: '1rem', color: '#111827', fontWeight: 500 }}>(Click anywhere to begin)</div>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
