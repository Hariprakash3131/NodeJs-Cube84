import * as THREE from 'three';

/**
 * Servora 404 Floating Space Geometry Scene
 * Interactive floating low-poly space beacon/satellite built with primitives.
 */
export function init404ThreeScene(containerId = 'canvas-404-wrap') {
  const container = document.getElementById(containerId);
  if (!container) return null;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return null;
  }

  const canvas = container.querySelector('canvas') || document.createElement('canvas');
  if (!container.contains(canvas)) {
    canvas.setAttribute('aria-hidden', 'true');
    canvas.className = 'w-full h-full block absolute inset-0';
    container.appendChild(canvas);
  }

  const width = container.clientWidth || 400;
  const height = container.clientHeight || 400;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
  camera.position.set(0, 0, 8);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  } catch (e) {
    return null;
  }
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lights
  const ambLight = new THREE.AmbientLight(0xffffff, 0.8);
  scene.add(ambLight);

  const pLight1 = new THREE.PointLight(0x6366f1, 3, 20);
  pLight1.position.set(4, 5, 4);
  scene.add(pLight1);

  const pLight2 = new THREE.PointLight(0x06b6d4, 2.5, 20);
  pLight2.position.set(-4, -4, 3);
  scene.add(pLight2);

  // Group for the satellite
  const group = new THREE.Group();

  // Core Polyhedron
  const coreGeo = new THREE.DodecahedronGeometry(1.6, 0);
  const coreMat = new THREE.MeshStandardMaterial({
    color: 0x4f46e5,
    roughness: 0.2,
    metalness: 0.8,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  group.add(core);

  // Outer Wireframe Cage
  const cageGeo = new THREE.IcosahedronGeometry(2.3, 1);
  const cageMat = new THREE.MeshBasicMaterial({
    color: 0xa5b4fc,
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });
  const cage = new THREE.Mesh(cageGeo, cageMat);
  group.add(cage);

  // Floating Rings
  const ringGeo = new THREE.TorusGeometry(3.0, 0.04, 16, 100);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    metalness: 0.9,
    roughness: 0.1,
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 3;
  group.add(ring);

  scene.add(group);

  let mouseX = 0;
  let mouseY = 0;
  let isDragging = false;
  let previousMouseX = 0;
  let previousMouseY = 0;

  const onMouseDown = (e) => {
    isDragging = true;
    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
  };

  const onMouseMove = (e) => {
    if (!isDragging) {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = -(e.clientY / window.innerHeight - 0.5) * 2;
      return;
    }
    const deltaX = e.clientX - previousMouseX;
    const deltaY = e.clientY - previousMouseY;

    group.rotation.y += deltaX * 0.01;
    group.rotation.x += deltaY * 0.01;

    previousMouseX = e.clientX;
    previousMouseY = e.clientY;
  };

  const onMouseUp = () => {
    isDragging = false;
  };

  window.addEventListener('mousedown', onMouseDown);
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseup', onMouseUp);

  let animId = null;
  let clock = new THREE.Clock();

  function tick() {
    const elapsed = clock.getElapsedTime();

    if (!isDragging) {
      group.rotation.y += 0.008;
      group.rotation.x += 0.004;
      group.position.y = Math.sin(elapsed * 1.5) * 0.25;
    }

    cage.rotation.y -= 0.005;
    ring.rotation.z += 0.01;

    renderer.render(scene, camera);
    animId = requestAnimationFrame(tick);
  }

  tick();

  return {
    destroy() {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      coreGeo.dispose();
      cageGeo.dispose();
      ringGeo.dispose();
      coreMat.dispose();
      cageMat.dispose();
      ringMat.dispose();
      renderer.dispose();
    }
  };
}

if (typeof window !== 'undefined') {
  window.init404ThreeScene = init404ThreeScene;
}

