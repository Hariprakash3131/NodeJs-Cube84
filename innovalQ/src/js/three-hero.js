import * as THREE from 'three';

/**
 * Servora Three.js Hero 3D Scene
 * Floating glassmorphic geometric shapes with MeshPhysicalMaterial,
 * responsive brand lighting, smooth mouse parallax, and performance guardrails.
 */
export function initHeroThreeScene(containerId = 'hero-3d-canvas-wrap') {
  const container = document.getElementById(containerId);
  if (!container) return null;

  // Accessibility: Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  // Mobile check: Fall back to CSS gradient for < 768px if configured
  if (window.innerWidth < 768 || prefersReducedMotion) {
    const fallback = container.querySelector('.hero-fallback');
    if (fallback) fallback.classList.remove('hidden');
    return null;
  }

  // WebGL Availability Check & Canvas creation
  const canvas = container.querySelector('canvas') || document.createElement('canvas');
  if (!container.contains(canvas)) {
    canvas.setAttribute('aria-hidden', 'true');
    canvas.className = 'w-full h-full block absolute inset-0';
    container.appendChild(canvas);
  }

  let gl;
  try {
    gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
  } catch (e) {
    console.warn('WebGL not supported, using fallback');
    const fallback = container.querySelector('.hero-fallback');
    if (fallback) fallback.classList.remove('hidden');
    return null;
  }
  if (!gl) return null;

  // Scene setup
  const scene = new THREE.Scene();

  const width = container.clientWidth || 500;
  const height = container.clientHeight || 520;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 7.5);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  // Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
  scene.add(ambientLight);

  const dirLight = new THREE.DirectionalLight(0xffffff, 1.4);
  dirLight.position.set(5, 8, 6);
  scene.add(dirLight);

  // Dynamic Brand Point Lights
  const brandPointLight1 = new THREE.PointLight(0x6366f1, 3.0, 25);
  brandPointLight1.position.set(-3.5, 2.5, 3.5);
  scene.add(brandPointLight1);

  const brandPointLight2 = new THREE.PointLight(0x06b6d4, 2.5, 25);
  brandPointLight2.position.set(3.5, -2.5, 3.0);
  scene.add(brandPointLight2);

  // Helper to extract RGB triplet from CSS variables
  function getThemeColor(varName, fallbackHex) {
    const raw = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
    if (!raw) return fallbackHex;
    const parts = raw.split(/\s+/).map(Number);
    if (parts.length >= 3) {
      return (parts[0] << 16) | (parts[1] << 8) | parts[2];
    }
    return fallbackHex;
  }

  // Materials
  const glassMaterial = new THREE.MeshPhysicalMaterial({
    roughness: 0.12,
    transmission: 0.92,
    thickness: 1.4,
    ior: 1.5,
    reflectivity: 0.7,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    color: 0xffffff,
    attenuationColor: new THREE.Color(0x6366f1),
    attenuationDistance: 2.2,
  });

  const chromeMaterial = new THREE.MeshPhysicalMaterial({
    metalness: 0.45,
    roughness: 0.18,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    color: 0x818cf8,
    reflectivity: 0.8,
  });

  const accentMaterial = new THREE.MeshPhysicalMaterial({
    metalness: 0.25,
    roughness: 0.2,
    clearcoat: 0.9,
    color: 0x06b6d4,
  });

  const ringMaterial = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    metalness: 0.6,
    roughness: 0.25,
    wireframe: false,
    transparent: true,
    opacity: 0.65,
  });

  function updateBrandColors() {
    const primaryColor = getThemeColor('--primary-500', 0x6366f1);
    const secondaryColor = getThemeColor('--secondary-500', 0x06b6d4);
    
    brandPointLight1.color.setHex(primaryColor);
    brandPointLight2.color.setHex(secondaryColor);
    glassMaterial.attenuationColor.setHex(primaryColor);
    chromeMaterial.color.setHex(primaryColor);
    accentMaterial.color.setHex(secondaryColor);
    ringMaterial.color.setHex(primaryColor);

    const isDark = document.documentElement.classList.contains('dark');
    ambientLight.intensity = isDark ? 0.5 : 0.9;
    dirLight.intensity = isDark ? 1.0 : 1.4;
    glassMaterial.roughness = isDark ? 0.16 : 0.1;
  }

  // Geometries & Meshes
  const geometries = [];
  const meshes = [];

  // 1. Central Torus Knot Centerpiece
  const torusKnotGeo = new THREE.TorusKnotGeometry(1.25, 0.36, 128, 32);
  geometries.push(torusKnotGeo);
  const torusKnot = new THREE.Mesh(torusKnotGeo, glassMaterial);
  torusKnot.position.set(0, 0, 0);
  scene.add(torusKnot);
  meshes.push({ mesh: torusKnot, rx: 0.003, ry: 0.005, rz: 0.002, floatSpeed: 0.8, floatDist: 0.15, basePosY: 0 });

  // 2. Floating Icosahedron (Top Left of container)
  const icoGeo = new THREE.IcosahedronGeometry(0.65, 0);
  geometries.push(icoGeo);
  const icoMesh = new THREE.Mesh(icoGeo, chromeMaterial);
  icoMesh.position.set(-1.6, 1.25, 0.5);
  scene.add(icoMesh);
  meshes.push({ mesh: icoMesh, rx: 0.006, ry: -0.005, rz: 0.003, floatSpeed: 1.1, floatDist: 0.2, basePosY: 1.25 });

  // 3. Floating Glass Sphere (Bottom Right of container)
  const sphereGeo = new THREE.SphereGeometry(0.55, 32, 32);
  geometries.push(sphereGeo);
  const sphereMesh = new THREE.Mesh(sphereGeo, glassMaterial);
  sphereMesh.position.set(1.6, -1.1, 0.8);
  scene.add(sphereMesh);
  meshes.push({ mesh: sphereMesh, rx: 0.002, ry: 0.003, rz: 0, floatSpeed: 0.9, floatDist: 0.18, basePosY: -1.1 });

  // 4. Floating Accent Octahedron (Top Right of container)
  const octGeo = new THREE.OctahedronGeometry(0.48);
  geometries.push(octGeo);
  const octMesh = new THREE.Mesh(octGeo, accentMaterial);
  octMesh.position.set(1.5, 1.35, -0.4);
  scene.add(octMesh);
  meshes.push({ mesh: octMesh, rx: -0.005, ry: 0.007, rz: 0.002, floatSpeed: 1.3, floatDist: 0.18, basePosY: 1.35 });

  // 5. Floating Orbital Accent Ring
  const ringGeo = new THREE.TorusGeometry(2.35, 0.025, 16, 100);
  geometries.push(ringGeo);
  const ringMesh = new THREE.Mesh(ringGeo, ringMaterial);
  ringMesh.rotation.x = Math.PI / 3.2;
  ringMesh.rotation.y = Math.PI / 6;
  scene.add(ringMesh);
  meshes.push({ mesh: ringMesh, rx: 0.001, ry: 0.002, rz: 0.001, floatSpeed: 0.6, floatDist: 0.1, basePosY: 0 });

  // Mouse Parallax
  let targetMouseX = 0;
  let targetMouseY = 0;
  let currentMouseX = 0;
  let currentMouseY = 0;

  const onMouseMove = (e) => {
    const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
    const factor = isRtl ? -1 : 1;
    targetMouseX = ((e.clientX / window.innerWidth) * 2 - 1) * factor;
    targetMouseY = -(e.clientY / window.innerHeight) * 2 + 1;
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  // Performance Controls: Visibility & IntersectionObserver
  let isVisible = true;
  let isTabActive = true;
  let animationFrameId = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
      if (isVisible && isTabActive && !animationFrameId) {
        tick();
      }
    });
  }, { threshold: 0.05 });
  observer.observe(container);

  const onVisibilityChange = () => {
    isTabActive = !document.hidden;
    if (isVisible && isTabActive && !animationFrameId) {
      tick();
    } else if (!isTabActive && animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
  };
  document.addEventListener('visibilitychange', onVisibilityChange);

  // Resize handling
  const onResize = () => {
    const w = container.clientWidth || 500;
    const h = container.clientHeight || 520;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  };
  window.addEventListener('resize', onResize, { passive: true });

  // Theme & Color Listeners
  window.addEventListener('servora:theme-changed', updateBrandColors);
  window.addEventListener('servora:color-changed', updateBrandColors);
  window.addEventListener('servora:dir-changed', updateBrandColors);
  updateBrandColors();

  // Animation Loop
  let clock = new THREE.Clock();

  function tick() {
    if (!isVisible || !isTabActive) {
      animationFrameId = null;
      return;
    }

    const elapsedTime = clock.getElapsedTime();

    // Lerp mouse parallax
    currentMouseX += (targetMouseX - currentMouseX) * 0.05;
    currentMouseY += (targetMouseY - currentMouseY) * 0.05;

    camera.position.x = currentMouseX * 0.6;
    camera.position.y = currentMouseY * 0.45;
    camera.lookAt(0, 0, 0);

    // Rotate and float meshes
    meshes.forEach(({ mesh, rx, ry, rz, floatSpeed, floatDist, basePosY }) => {
      mesh.rotation.x += rx;
      mesh.rotation.y += ry;
      mesh.rotation.z += rz;
      mesh.position.y = basePosY + Math.sin(elapsedTime * floatSpeed) * floatDist;
    });

    renderer.render(scene, camera);
    animationFrameId = requestAnimationFrame(tick);
  }

  // Start loop
  tick();

  // Teardown Method
  return {
    destroy() {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      window.removeEventListener('servora:theme-changed', updateBrandColors);
      window.removeEventListener('servora:color-changed', updateBrandColors);
      window.removeEventListener('servora:dir-changed', updateBrandColors);
      observer.disconnect();

      geometries.forEach(g => g.dispose());
      glassMaterial.dispose();
      chromeMaterial.dispose();
      accentMaterial.dispose();
      ringMaterial.dispose();
      renderer.dispose();
      if (container.contains(canvas)) {
        container.removeChild(canvas);
      }
    }
  };
}

if (typeof window !== 'undefined') {
  window.initHeroThreeScene = initHeroThreeScene;
}
