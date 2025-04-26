'use client';

import React, { Suspense } from 'react';
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF } from '@react-three/drei';
import { DirectionalLight, AmbientLight } from 'three';

// Extend JSX elements
extend({ DirectionalLight, AmbientLight });

// Declare module augmentation for JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      primitive: any;
      ambientLight: any;
      directionalLight: any;
    }
  }
}

function Model() {
  const gltf = useGLTF('/models/cyberpunk_charatcer.glb');
  return <primitive object={gltf.scene} />;
}

export default function Avatar3D() {
  return (
    <Canvas camera={{ position: [0, 1, 5], fov: 50 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 5]} intensity={1} />
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
      <Suspense fallback={null}>
        <Model />
      </Suspense>
    </Canvas>
  );
}

// Preload the 3D model
useGLTF.preload('/models/cyberpunk_avatar.glb');