import React, { useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function FloatingLabel({ text, position }) {
  const labelRef = useRef();
  const center = new THREE.Vector3(0, 0, 0); // Center to face

  useFrame(({ clock }) => {
    if (labelRef.current) {
      // Floating animation
      labelRef.current.position.y = position[1] + 1.2 + Math.sin(clock.elapsedTime * 2) * 0.1;

      // Make the label face the center
      labelRef.current.lookAt(center);
    }
  });

  return (
    <Text
      ref={labelRef}
      position={[position[0], position[1] + 3, position[2]]}
      fontSize={0.4}
      color="white"
      anchorX="center"
      anchorY="middle"
      outlineColor="black"
      outlineWidth={0.02}
    >
      {text}
    </Text>
  );
}
