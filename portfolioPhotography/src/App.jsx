import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import { PORTFOLIO_CONFIG } from './data/portfolioData';

// Components
import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import HeroSection from './components/HeroSection';
import SelectedWork from './components/SelectedWork';
import ProjectDetailModal from './components/ProjectDetailModal';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  // Cursor state ('DEFAULT' | 'VIEW' | 'DRAG' | 'POINTER')
  const [cursorType, setCursorType] = useState('DEFAULT');

  // Active project for full-screen lightbox modal
  const [selectedProject, setSelectedProject] = useState(null);

  // Pre-selected service for inquiry form
  const [prefilledInquiry, setPrefilledInquiry] = useState('');

  // Initialize Lenis smooth scroll
  useEffect(() => {
    // Respect user's reduced motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.5,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Handler when clicking on a photo in the 3D Hero Gallery
  const handleHeroPhotoClick = (index) => {
    const project = PORTFOLIO_CONFIG.projects[index % PORTFOLIO_CONFIG.projects.length];
    if (project) {
      setSelectedProject(project);
    }
  };

  // Handler when clicking "Request Commission Brief" in Services
  const handleSelectServiceInquiry = (serviceTitle) => {
    setPrefilledInquiry(serviceTitle);
  };

  return (
    <div className="relative min-h-screen bg-bg text-text-primary selection:bg-accent selection:text-black">
      {/* Film Grain Ambient Texture Overlay */}
      <div className="film-grain" />

      {/* Interactive Custom Cursor */}
      <CustomCursor cursorType={cursorType} />

      {/* Top Editorial Navbar */}
      <Navbar
        photographer={PORTFOLIO_CONFIG.photographer}
        setCursorType={setCursorType}
      />

      {/* Main Content Flow */}
      <main>
        {/* 1. Hero Section with 3D Canvas */}
        <HeroSection
          photographer={PORTFOLIO_CONFIG.photographer}
          heroGallery={PORTFOLIO_CONFIG.heroGallery}
          onPhotoClick={handleHeroPhotoClick}
          setCursorType={setCursorType}
        />

        {/* 2. Selected Work Section (Asymmetric Masonry Grid) */}
        <SelectedWork
          projects={PORTFOLIO_CONFIG.projects}
          onSelectProject={(project) => setSelectedProject(project)}
          setCursorType={setCursorType}
        />

        {/* 3. About Section (Portrait, Bio, Philosophy, Clients) */}
        <AboutSection
          photographer={PORTFOLIO_CONFIG.photographer}
          clients={PORTFOLIO_CONFIG.clients}
          setCursorType={setCursorType}
        />

        {/* 4. Services Section (Offerings, Deliverables, Timeline) */}
        <ServicesSection
          services={PORTFOLIO_CONFIG.services}
          onSelectServiceInquiry={handleSelectServiceInquiry}
          setCursorType={setCursorType}
        />

        {/* 5. Contact Section (Direct Studio Details, Socials, Inquiry Form) */}
        <ContactSection
          contact={PORTFOLIO_CONFIG.contact}
          prefilledInquiry={prefilledInquiry}
          setCursorType={setCursorType}
        />
      </main>

      {/* Studio Footer */}
      <Footer
        photographer={PORTFOLIO_CONFIG.photographer}
        setCursorType={setCursorType}
      />

      {/* Full-screen Lightbox / Project Detail Modal with Keyboard Navigation */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          allProjects={PORTFOLIO_CONFIG.projects}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(project) => setSelectedProject(project)}
          setCursorType={setCursorType}
        />
      )}
    </div>
  );
}
