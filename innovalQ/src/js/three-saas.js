import * as THREE from 'three';

/**
 * Servora SaaS Interactive Particle Field
 * Dynamic floating particles with brand-reactive colors and mouse displacement.
 */
export function initSaaSParticles(containerId = 'saas-particles-canvas') {
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

  const width = container.clientWidth || window.innerWidth;
  const height = container.clientHeight || 550;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
  camera.position.z = 25;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false });
  } catch (e) {
    return null;
  }
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));

  const particleCount = 200;
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);

  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 45;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    scales[i] = Math.random() * 2 + 1;
  }

  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  const material = new THREE.PointsMaterial({
    color: 0x6366f1,
    size: 0.35,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  let mouseX = 0;
  let mouseY = 0;
  const onMouseMove = (e) => {
    mouseX = (e.clientX / window.innerWidth - 0.5) * 4;
    mouseY = -(e.clientY / window.innerHeight - 0.5) * 4;
  };
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  let animId = null;
  let isVisible = true;
  let isTabActive = true;

  const observer = new IntersectionObserver(([entry]) => {
    isVisible = entry.isIntersecting;
    if (isVisible && isTabActive && !animId) tick();
  }, { threshold: 0.05 });
  observer.observe(container);

  const onVisChange = () => {
    isTabActive = !document.hidden;
    if (isVisible && isTabActive && !animId) tick();
    else if (!isTabActive && animId) {
      cancelAnimationFrame(animId);
      animId = null;
    }
  };
  document.addEventListener('visibilitychange', onVisChange);

  let clock = new THREE.Clock();

  function tick() {
    if (!isVisible || !isTabActive) {
      animId = null;
      return;
    }

    const elapsed = clock.getElapsedTime();
    particles.rotation.y = elapsed * 0.05 + mouseX * 0.1;
    particles.rotation.x = elapsed * 0.02 + mouseY * 0.1;

    renderer.render(scene, camera);
    animId = requestAnimationFrame(tick);
  }

  tick();

  const onResize = () => {
    const w = container.clientWidth || window.innerWidth;
    const h = container.clientHeight || 550;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  };
  window.addEventListener('resize', onResize, { passive: true });

  return {
    destroy() {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisChange);
      observer.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    }
  };
}

/**
 * Interactive 3D Device Tilt
 */
export function initDeviceTilt(elementSelector = '[data-tilt-device]') {
  const elements = document.querySelectorAll(elementSelector);
  if (!elements.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  elements.forEach((el) => {
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    };

    const handleLeave = () => {
      el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    };

    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
  });
}

if (typeof window !== 'undefined') {
  window.initSaaSParticles = initSaaSParticles;
  window.initDeviceTilt = initDeviceTilt;
}

