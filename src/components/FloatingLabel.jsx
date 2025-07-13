// components/FloatingLabel.jsx
import React, { useRef } from 'react';
import { Text } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

export default function FloatingLabel({ text, position }) {
  const labelRef = useRef();

  useFrame(({ clock }) => {
    if (labelRef.current) {
      // Float up and down around the raised Y-position
      labelRef.current.position.y = position[1] + 1.2 + Math.sin(clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <Text
      ref={labelRef}
      position={[position[0], position[1] + 1.2, position[2]]}
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
