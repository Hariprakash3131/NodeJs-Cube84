import React, { useState, useEffect, useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import FloatingGalleryScene from './FloatingGalleryScene';
import HeroFallback from './HeroFallback';

export default function HeroCanvas({ galleryItems, onPhotoClick, setCursorType }) {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  // Detect mobile & prefers-reduced-motion
  useEffect(() => {
    const checkViewport = () => {
      setIsMobile(window.innerWidth < 768);
    };

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    const handleMotionChange = (e) => setPrefersReducedMotion(e.matches);
    motionQuery.addEventListener('change', handleMotionChange);

    checkViewport();
    window.addEventListener('resize', checkViewport);

    // Track scroll for camera parallax push
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('resize', checkViewport);
      motionQuery.removeEventListener('change', handleMotionChange);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Performance optimization: Pause 3D canvas when off-screen
  useEffect(() => {
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  // Render 2D fallback on mobile or reduced-motion
  if (isMobile || prefersReducedMotion) {
    return (
      <div ref={containerRef} className="w-full">
        <HeroFallback
          galleryItems={galleryItems}
          onPhotoClick={onPhotoClick}
          setCursorType={setCursorType}
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[65vh] md:h-[80vh] lg:h-[88vh] cursor-grab active:cursor-grabbing"
      onMouseEnter={() => setCursorType && setCursorType('DRAG')}
      onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
    >
      <Canvas
        frameloop={isVisible ? 'always' : 'never'}
        camera={{ position: [0, 0, 7.8], fov: 48, near: 0.1, far: 30 }}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
        gl={{
          antialias: true,
          powerPreference: 'high-performance',
          alpha: true,
        }}
        className="w-full h-full"
      >
        <FloatingGalleryScene
          galleryItems={galleryItems}
          onPhotoClick={onPhotoClick}
          setCursorType={setCursorType}
          scrollY={scrollY}
        />
      </Canvas>

      {/* Subtle bottom gradient fade into the content */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-bg to-transparent" />
    </div>
  );
}
