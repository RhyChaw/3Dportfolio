import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function PlayableNaruto(props) {
  const { scene } = useGLTF('/models/naruto.glb');
  const narutoRef = useRef();
  const [keysPressed, setKeysPressed] = useState({});
  const { camera } = useThree();

  // for the computer
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
    onFarFromContact
  } = props;
  // for resume
  let wasNearComputer = useRef(false);
  let wasNearResume = useRef(false);
  let wasNearCertifications = useRef(false);
  let wasNearProjects = useRef(false);
  let wasNearContact = useRef(false);



  // Track key presses
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

  // Log Naruto's position + update movement + camera
  useFrame((_, delta) => {
    const speed = 15;
    const direction = new THREE.Vector3();

    if (keysPressed['w'] || keysPressed['arrowup']) direction.z -= 1;
    if (keysPressed['s'] || keysPressed['arrowdown']) direction.z += 1;
    if (keysPressed['a'] || keysPressed['arrowleft']) direction.x -= 1;
    if (keysPressed['d'] || keysPressed['arrowright']) direction.x += 1;

    direction.normalize().multiplyScalar(speed * delta);

    if (narutoRef.current) {
      narutoRef.current.position.add(direction);
      updateNarutoPosition?.({
      x: narutoRef.current.position.x,
      y: narutoRef.current.position.y,
      z: narutoRef.current.position.z
    });


      // Rotate to face movement
      if (direction.length() > 0) {
        narutoRef.current.rotation.y = Math.atan2(direction.x, direction.z);
      }

      // 🧭 Camera follow
      const pos = narutoRef.current.position;
      camera.position.lerp(new THREE.Vector3(pos.x, pos.y, pos.z + 10), 0.1);
      camera.lookAt(pos);

      const narutoPos = narutoRef.current.position;

      // for computer
      const computerPos = new THREE.Vector3(10.25, 0.40, -5.63);
      const distanceToComputer = narutoPos.distanceTo(computerPos);

      if (distanceToComputer < 2.5) {
        if (!wasNearComputer.current) {
          onNearComputer?.();
          wasNearComputer.current = true;
        }
      } else {
        if (wasNearComputer.current) {
          onFarFromComputer?.();
          wasNearComputer.current = false;
        }
      }


      // 🎓 Resume Position Check
      const resumePos = new THREE.Vector3(-0.03, 0.40, -9.67);
      const distanceToResume = narutoPos.distanceTo(resumePos);

      if (distanceToResume < 2.5) {
        if (!wasNearResume.current) {
          onNearResume?.();
          wasNearResume.current = true;
        }
      } else {
        if (wasNearResume.current) {
          onFarFromResume?.();
          wasNearResume.current = false;
        }
      }

      // 🏅 Certifications Check
      const certPos = new THREE.Vector3(10.67, 0.40, 3.39);
      const distanceToCert = narutoPos.distanceTo(certPos);

      if (distanceToCert < 2.5) {
        if (!wasNearCertifications.current) {
          onNearCertifications?.();
          wasNearCertifications.current = true;
        }
      } else {
        if (wasNearCertifications.current) {
          onFarFromCertifications?.();
          wasNearCertifications.current = false;
        }
      }

      // 📁 Projects Check
      const projectsPos = new THREE.Vector3(-6.06, 0.40, 1.64);
      const distanceToProjects = narutoPos.distanceTo(projectsPos);

      if (distanceToProjects < 2.5) {
        if (!wasNearProjects.current) {
          onNearProjects?.();
          wasNearProjects.current = true;
        }
      } else {
        if (wasNearProjects.current) {
          onFarFromProjects?.();
          wasNearProjects.current = false;
        }
      }

      // 📬 Contact Us Check
      const contactPos = new THREE.Vector3(-2.54, 0.40, 9.51);
      const distanceToContact = narutoPos.distanceTo(contactPos);

      if (distanceToContact < 2.5) {
        if (!wasNearContact.current) {
          onNearContact?.();
          wasNearContact.current = true;
        }
      } else {
        if (wasNearContact.current) {
          onFarFromContact?.();
          wasNearContact.current = false;
        }
      }



      // 🧭 Console position
      console.log(`Naruto Position → x: ${pos.x.toFixed(2)} y: ${pos.y.toFixed(2)} z: ${pos.z.toFixed(2)}`);
    }
  });

  return (
    <group ref={narutoRef} {...props}>
      <primitive object={scene} scale={[1, 1, 1]} />s
    </group>
  );
}
