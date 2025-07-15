import React, { useRef, useEffect, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export default function PlayableNaruto(props) {
  const { scene } = useGLTF('/models/naruto.glb');
  const narutoRef = useRef();
  const cameraTarget = useRef(new THREE.Vector3());
  const { camera } = useThree();

  const [keysPressed, setKeysPressed] = useState({});

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
    const speed = 15;
    const direction = new THREE.Vector3();

    // Movement input
    if (keysPressed['w'] || keysPressed['arrowup']) direction.z -= 1;
    if (keysPressed['s'] || keysPressed['arrowdown']) direction.z += 1;
    if (keysPressed['a'] || keysPressed['arrowleft']) direction.x -= 1;
    if (keysPressed['d'] || keysPressed['arrowright']) direction.x += 1;

    direction.normalize().multiplyScalar(speed * delta);

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
      const offsetDistance = 6; // Distance behind Naruto
      const offsetHeight = 3; // Height above Naruto

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
      camera.position.lerp(desiredPosition, 0.1);

      // Lerp camera target to Naruto’s position smoothly
      cameraTarget.current.lerp(narutoRef.current.position, 0.1);

      // Make camera look at the target
      camera.lookAt(cameraTarget.current);

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

      // Optional: Debug position log
      // console.log(`Naruto Position → x: ${narutoPos.x.toFixed(2)} y: ${narutoPos.y.toFixed(2)} z: ${narutoPos.z.toFixed(2)}`);
    }
  });

  return (
    <group ref={narutoRef} {...props}>
      <primitive object={scene} scale={[1, 1, 1]} />
    </group>
  );
}
