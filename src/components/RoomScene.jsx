import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function RoomScene(props) {
  const { scene } = useGLTF('/models/Room.glb');

  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    console.log("Room size:", size);
    console.log("Room center:", center);
  }, [scene]);

  return (
    <primitive object={scene} {...props} castShadow receiveShadow />
  );
}
