import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useGLTF, useKeyboardControls } from '@react-three/drei';
import * as THREE from 'three';

export default function ThirdPersonController({
  modelPath = '/models/naruto.glb',
  scale = [0.5, 0.5, 0.5],
  initialPosition = [0, 0.4, 0],
  followDistance = 8,
  followHeight = 4,
  moveSpeed = 7.5,
  strafeMultiplier = 0.45,
  onPositionChange,
}) {
  const { scene } = useGLTF(modelPath);
  const playerRef = useRef();
  const { camera } = useThree();

  const forward = useKeyboardControls((s) => s.forward);
  const back = useKeyboardControls((s) => s.back);
  const left = useKeyboardControls((s) => s.left);
  const right = useKeyboardControls((s) => s.right);
  const sprint = useKeyboardControls((s) => s.sprint);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.position.set(...initialPosition);
    }
  }, []);

  useFrame((_, delta) => {
    if (!playerRef.current) return;

    const player = playerRef.current;
    const speed = moveSpeed * (sprint ? 1.5 : 1.0);

    // Compute movement relative to camera yaw (XZ plane)
    const inputZ = (forward ? 1 : 0) + (back ? -1 : 0);
    const inputX = (right ? 1 : 0) + (left ? -1 : 0);

    const moveDir = new THREE.Vector3();
    if (inputZ !== 0 || inputX !== 0) {
      const camDir = new THREE.Vector3();
      camera.getWorldDirection(camDir);
      camDir.y = 0; camDir.normalize();

      const rightDir = new THREE.Vector3();
      rightDir.crossVectors(camDir, new THREE.Vector3(0, 1, 0)).normalize();

      moveDir.addScaledVector(camDir, inputZ);
      // Reduce lateral sensitivity considerably
      moveDir.addScaledVector(rightDir, inputX * strafeMultiplier);
      if (moveDir.lengthSq() > 0) moveDir.normalize();
      moveDir.multiplyScalar(speed * delta);
    }

    // Apply movement and clamp to room bounds
    player.position.add(moveDir);
    player.position.x = THREE.MathUtils.clamp(player.position.x, -7.5, 10.5);
    player.position.z = THREE.MathUtils.clamp(player.position.z, -8.4, 9.1);
    player.position.y = 0.4;

    // Rotate player to face movement direction
    if (moveDir.lengthSq() > 0) {
      player.rotation.y = Math.atan2(moveDir.x, moveDir.z);
    }

    // Smooth follow camera behind player using player's facing
    const rotationY = player.rotation.y;
    const offsetX = Math.sin(rotationY) * followDistance;
    const offsetZ = Math.cos(rotationY) * followDistance;

    const desiredCam = new THREE.Vector3(
      player.position.x - offsetX,
      player.position.y + followHeight,
      player.position.z - offsetZ
    );

    // Slightly smoother camera follow to reduce perceived side sensitivity
    camera.position.lerp(desiredCam, 0.06);
    camera.lookAt(player.position.x, player.position.y + 1, player.position.z);

    onPositionChange?.({ x: player.position.x, y: player.position.y, z: player.position.z });
  });

  return (
    <group ref={playerRef}>
      <primitive object={scene} scale={scale} />
    </group>
  );
}


