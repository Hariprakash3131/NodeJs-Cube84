import React, { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Custom distortion/ripple shader for photography planes
const PhotoShaderMaterial = {
  vertexShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform float uHover;
    uniform float uTime;

    void main() {
      vUv = uv;
      vNormal = normal;

      vec3 pos = position;

      // Subtle curvature and ripple wave when hovered
      float wave = sin(pos.x * 2.5 + uTime * 3.0) * cos(pos.y * 2.5 + uTime * 2.0) * 0.05 * uHover;
      pos.z += wave;

      // Soft cylindrical curve
      pos.z -= (pos.x * pos.x) * 0.02;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  fragmentShader: `
    varying vec2 vUv;
    varying vec3 vNormal;
    uniform sampler2D uTexture;
    uniform float uHover;
    uniform float uTime;

    void main() {
      vec2 uv = vUv;

      // Chromatic aberration and fluid ripple wave on hover
      vec2 ripple = vec2(
        sin(uv.y * 12.0 + uTime * 2.5) * 0.015 * uHover,
        cos(uv.x * 12.0 + uTime * 2.5) * 0.015 * uHover
      );

      float r = texture2D(uTexture, uv + ripple * 1.2).r;
      float g = texture2D(uTexture, uv + ripple).g;
      float b = texture2D(uTexture, uv + ripple * 0.8).b;
      
      vec4 texColor = vec4(r, g, b, 1.0);

      // Contrast and film tone lift on hover
      vec3 finalColor = mix(texColor.rgb * 0.92, texColor.rgb * 1.08, uHover);
      
      // Subtle vignette border on the photo plane
      float vignette = smoothstep(0.7, 0.48, length(uv - 0.5));
      finalColor = mix(finalColor * 0.88, finalColor, vignette);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
};

export default function PhotoPlane({
  position,
  rotation,
  scale = [2.2, 3.0, 1],
  imageUrl,
  title,
  category,
  onSelect,
  setCursorType,
}) {
  const meshRef = useRef();
  const materialRef = useRef();
  const [hovered, setHovered] = useState(false);

  // Lazy-load texture
  const texture = useTexture(imageUrl);
  texture.generateMipmaps = true;
  texture.minFilter = THREE.LinearMipmapLinearFilter;

  // Shader uniforms
  const uniforms = useMemo(
    () => ({
      uTexture: { value: texture },
      uHover: { value: 0 },
      uTime: { value: 0 },
    }),
    [texture]
  );

  // Target values for smooth lerp
  const targetPos = useMemo(() => new THREE.Vector3(...position), [position]);
  const targetRot = useMemo(() => new THREE.Euler(...rotation), [rotation]);

  useFrame((state, delta) => {
    if (!materialRef.current || !meshRef.current) return;

    // Smooth hover uniform transition (0 -> 1)
    const targetHover = hovered ? 1 : 0;
    materialRef.current.uniforms.uHover.value = THREE.MathUtils.lerp(
      materialRef.current.uniforms.uHover.value,
      targetHover,
      delta * 6
    );

    // Update time for subtle wave motion
    materialRef.current.uniforms.uTime.value = state.clock.elapsedTime;

    // Pull forward in z-space and scale slightly when hovered
    const zOffset = hovered ? 0.7 : 0;
    const targetZ = position[2] + zOffset;
    meshRef.current.position.z = THREE.MathUtils.lerp(
      meshRef.current.position.z,
      targetZ,
      delta * 5
    );

    // Micro tilt towards pointer
    const pointerTiltX = (state.pointer.y * 0.1) * (hovered ? 1.5 : 0.4);
    const pointerTiltY = (-state.pointer.x * 0.1) * (hovered ? 1.5 : 0.4);

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      rotation[0] + pointerTiltX,
      delta * 4
    );
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      rotation[1] + pointerTiltY,
      delta * 4
    );

    // Subtle scale bump
    const currentScale = hovered ? 1.08 : 1.0;
    meshRef.current.scale.lerp(
      new THREE.Vector3(scale[0] * currentScale, scale[1] * currentScale, 1),
      delta * 6
    );
  });

  return (
    <group>
      <mesh
        ref={meshRef}
        position={position}
        rotation={rotation}
        scale={scale}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          if (setCursorType) setCursorType('VIEW');
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          if (setCursorType) setCursorType('DEFAULT');
        }}
        onClick={(e) => {
          e.stopPropagation();
          if (onSelect) onSelect();
        }}
      >
        {/* Plane with slight density for the wave shader */}
        <planeGeometry args={[1, 1, 32, 32]} />
        <shaderMaterial
          ref={materialRef}
          vertexShader={PhotoShaderMaterial.vertexShader}
          fragmentShader={PhotoShaderMaterial.fragmentShader}
          uniforms={uniforms}
          transparent={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
