import React, { useRef, Suspense } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import PhotoPlane from './PhotoPlane';

// Coordinate layouts for a dramatic curved arc gallery in 3D
const GALLERY_LAYOUT = [
  {
    index: 0,
    position: [-4.6, 0.4, -1.8],
    rotation: [0.05, 0.32, -0.04],
    scale: [2.4, 3.2, 1],
  },
  {
    index: 1,
    position: [-2.2, -0.2, -0.6],
    rotation: [-0.02, 0.16, 0.02],
    scale: [2.5, 3.5, 1],
  },
  {
    index: 2,
    position: [0.2, 0.5, 0.2],
    rotation: [0.02, -0.05, -0.02],
    scale: [2.6, 3.6, 1],
  },
  {
    index: 3,
    position: [2.6, -0.4, -0.7],
    rotation: [0.04, -0.22, 0.03],
    scale: [2.4, 3.3, 1],
  },
  {
    index: 4,
    position: [4.9, 0.3, -2.0],
    rotation: [-0.03, -0.36, -0.03],
    scale: [2.3, 3.1, 1],
  },
  {
    index: 5,
    position: [0.0, -3.2, -1.2],
    rotation: [-0.15, 0.0, 0.0],
    scale: [3.2, 2.0, 1],
  }
];

export default function FloatingGalleryScene({
  galleryItems,
  onPhotoClick,
  setCursorType,
  scrollY = 0,
}) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    // Subtle floating idle motion
    const time = state.clock.elapsedTime;
    const idleY = Math.sin(time * 0.7) * 0.08;
    const idleRot = Math.cos(time * 0.5) * 0.015;

    // Mouse parallax dampening
    const targetParallaxX = state.pointer.x * 0.45;
    const targetParallaxY = state.pointer.y * 0.3;

    // Scroll influence: as user scrolls down, push the gallery upward and slightly deeper
    const scrollFactor = Math.min(scrollY / window.innerHeight, 1.2);
    const targetScrollY = -scrollFactor * 2.8;
    const targetScrollZ = -scrollFactor * 3.5;
    const targetScrollRotX = scrollFactor * 0.15;

    // Smooth lerping of group position & rotation
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      targetParallaxX,
      delta * 2.5
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      idleY + targetParallaxY + targetScrollY,
      delta * 2.5
    );
    groupRef.current.position.z = THREE.MathUtils.lerp(
      groupRef.current.position.z,
      targetScrollZ,
      delta * 2.5
    );

    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      idleRot + state.pointer.x * 0.1,
      delta * 2.5
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetScrollRotX - state.pointer.y * 0.08,
      delta * 2.5
    );
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Cinematic subtle point lights */}
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 8, 5]} intensity={1.2} />
      <pointLight position={[-4, 2, 2]} intensity={0.8} color="#D9FF3D" distance={12} />
      <pointLight position={[4, -2, 3]} intensity={0.5} color="#ffffff" distance={10} />

      {/* Render 3D Photo Planes */}
      <Suspense fallback={null}>
        {galleryItems.slice(0, 6).map((item, idx) => {
          const layout = GALLERY_LAYOUT[idx] || GALLERY_LAYOUT[0];
          return (
            <PhotoPlane
              key={item.id}
              position={layout.position}
              rotation={layout.rotation}
              scale={layout.scale}
              imageUrl={item.url}
              title={item.title}
              category={item.category}
              onSelect={() => onPhotoClick(idx)}
              setCursorType={setCursorType}
            />
          );
        })}
      </Suspense>
    </group>
  );
}
