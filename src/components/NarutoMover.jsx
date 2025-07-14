import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import React, { useRef, useEffect } from 'react';

export default function NarutoMover({ startPos, targetPos, setNarutoPos, clearTarget }) {
  const startTimeRef = useRef(null);

  // Reset timer whenever a new target is set
  useEffect(() => {
    if (startPos && targetPos) {
      startTimeRef.current = performance.now();
    }
  }, [startPos, targetPos]);

  useFrame(() => {
    if (!startPos || !targetPos || startTimeRef.current === null) return;

    const elapsed = (performance.now() - startTimeRef.current) / 1000;
    const duration = 3;

    if (elapsed < duration) {
      const t = elapsed / duration;
      const x = THREE.MathUtils.lerp(startPos.x, targetPos.x, t);
      const y = THREE.MathUtils.lerp(startPos.y, targetPos.y, t);
      const z = THREE.MathUtils.lerp(startPos.z, targetPos.z, t);
      setNarutoPos({ x, y, z });
    } else {
      setNarutoPos(targetPos);
      clearTarget();
      startTimeRef.current = null;
    }
  });

  return null;
}
