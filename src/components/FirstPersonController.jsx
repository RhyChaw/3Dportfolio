import React, { useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

export default function FirstPersonController({ speed = 6, sprintMultiplier = 1.5, onPositionChange }) {
  const { camera } = useThree();
  const forward = useKeyboardControls((state) => state.forward);
  const back = useKeyboardControls((state) => state.back);
  const left = useKeyboardControls((state) => state.left);
  const right = useKeyboardControls((state) => state.right);
  const sprint = useKeyboardControls((state) => state.sprint);

  // Ensure a default eye height
  useEffect(() => {
    if (camera && (camera.position.y === 0 || camera.position.y < 1)) {
      camera.position.y = 1.6;
    }
  }, [camera]);

  useFrame((_, delta) => {
    if (!camera) return;

    // Determine intended direction on XZ plane
    const moveZ = (forward ? 1 : 0) + (back ? -1 : 0);
    const moveX = (right ? 1 : 0) + (left ? -1 : 0);

    if (moveZ === 0 && moveX === 0) return;

    const velocity = speed * (sprint ? sprintMultiplier : 1) * delta;

    // Camera basis vectors on XZ plane
    const camDir = new THREE.Vector3();
    camera.getWorldDirection(camDir);
    camDir.y = 0;
    camDir.normalize();

    const rightDir = new THREE.Vector3();
    rightDir.crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();

    const moveVec = new THREE.Vector3();
    moveVec.addScaledVector(camDir, moveZ);
    moveVec.addScaledVector(rightDir, moveX);
    if (moveVec.lengthSq() > 0) moveVec.normalize();
    moveVec.multiplyScalar(velocity);

    camera.position.add(moveVec);
    camera.position.y = 1.6; // keep eye level constant

    onPositionChange?.({ x: camera.position.x, y: camera.position.y, z: camera.position.z });
  });

  return null;
}


