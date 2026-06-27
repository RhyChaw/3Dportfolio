import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';

const BASE = '/models/vintage-globe';
const TEX = `${BASE}/textures`;

// Vintage globe — OBJ + JPG textures applied by material name (no MTL shipped).
export default function GlobeViewer({ size = 300 }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
    camera.position.set(0, 0.5, 6);
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(size, size, false);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const key = new THREE.DirectionalLight(0xffe9c8, 1.5); key.position.set(4, 6, 6); scene.add(key);
    const rim = new THREE.DirectionalLight(0x9ab6ff, 0.6); rim.position.set(-5, 2, -4); scene.add(rim);

    const texLoader = new THREE.TextureLoader();
    const srgb = (file) => { const t = texLoader.load(`${TEX}/${file}`); t.colorSpace = THREE.SRGBColorSpace; return t; };
    const lin = (file) => texLoader.load(`${TEX}/${file}`);

    const globeMat = new THREE.MeshStandardMaterial({
      map: srgb('Globe_BaseColor.jpg'),
      normalMap: lin('Globe_Normal.jpg'),
      roughnessMap: lin('Globe_Roughness.jpg'),
      metalnessMap: lin('Globe_Metallic.jpg'),
      metalness: 0.6,
      roughness: 0.8,
    });
    const wireMat = new THREE.MeshStandardMaterial({
      map: srgb('wire_135110008_BaseColor.jpg'),
      roughnessMap: lin('wire_135110008_Roughness.jpg'),
      alphaMap: lin('wire_135110008_Opacity.jpg'),
      transparent: true,
      metalness: 0.7,
      roughness: 0.6,
    });

    const group = new THREE.Group();
    scene.add(group);

    const loader = new OBJLoader();
    loader.load(
      `${BASE}/source/Globus.obj`,
      (obj) => {
        obj.traverse((o) => {
          if (o.isMesh) {
            const name = (o.material && o.material.name ? o.material.name : '').toLowerCase();
            o.material = name.includes('wire') ? wireMat : globeMat;
          }
        });
        const box = new THREE.Box3().setFromObject(obj);
        const sz = new THREE.Vector3(); box.getSize(sz);
        const center = new THREE.Vector3(); box.getCenter(center);
        const scale = 3.4 / Math.max(sz.x, sz.y, sz.z);
        obj.scale.setScalar(scale);
        obj.position.set(-center.x * scale, -center.y * scale, -center.z * scale);
        group.add(obj);
      },
      undefined,
      () => {},
    );

    const tick = () => {
      group.rotation.y += 0.0035;
      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(rafRef.current);
      renderer.dispose();
      globeMat.dispose();
      wireMat.dispose();
    };
  }, [size]);

  return <canvas ref={canvasRef} style={{ width: size, height: size, display: 'block' }} />;
}
