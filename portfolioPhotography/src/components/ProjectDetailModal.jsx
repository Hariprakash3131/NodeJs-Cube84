import React, { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  ChevronLeft,
  ChevronRight,
  Camera,
  MapPin,
  Layers,
  Calendar,
  Sparkles,
} from 'lucide-react';

export default function ProjectDetailModal({
  project,
  allProjects,
  onClose,
  onSelectProject,
  setCursorType,
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Reset active image when project changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [project]);

  const currentIndex = allProjects.findIndex((p) => p.id === project.id);
  const prevProject = allProjects[(currentIndex - 1 + allProjects.length) % allProjects.length];
  const nextProject = allProjects[(currentIndex + 1) % allProjects.length];

  const handleNextProject = useCallback(() => {
    onSelectProject(nextProject);
  }, [nextProject, onSelectProject]);

  const handlePrevProject = useCallback(() => {
    onSelectProject(prevProject);
  }, [prevProject, onSelectProject]);

  // Keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        if (project.gallery && activeImageIndex < project.gallery.length - 1) {
          setActiveImageIndex((prev) => prev + 1);
        } else {
          handleNextProject();
        }
      } else if (e.key === 'ArrowLeft') {
        if (activeImageIndex > 0) {
          setActiveImageIndex((prev) => prev - 1);
        } else {
          handlePrevProject();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, handleNextProject, handlePrevProject, activeImageIndex, project]);

  if (!project) return null;

  const currentImageUrl =
    project.gallery && project.gallery[activeImageIndex]
      ? project.gallery[activeImageIndex]
      : project.coverImage;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 z-[90] flex items-center justify-center bg-bg/95 backdrop-blur-2xl overflow-y-auto"
        onClick={onClose}
      >
        <div
          className="relative w-full min-h-screen flex flex-col justify-between p-4 sm:p-6 md:p-10 max-w-7xl mx-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Top Header Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono tracking-widest text-accent uppercase">
                [ {project.category} · {project.year} ]
              </span>
              <span className="text-border-highlight hidden sm:inline">/</span>
              <span className="text-xs font-mono text-text-muted hidden sm:inline">
                PROJECT {String(currentIndex + 1).padStart(2, '0')} OF{' '}
                {String(allProjects.length).padStart(2, '0')}
              </span>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="group flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-border-subtle hover:border-accent text-xs font-mono text-text-secondary hover:text-accent transition-all duration-200"
              onMouseEnter={() => setCursorType && setCursorType('POINTER')}
              onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
            >
              <span>ESC</span>
              <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
            </button>
          </div>

          {/* Main Content Area */}
          <div className="my-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left 8 Cols: Large Primary Image Viewer & Gallery Strip */}
            <div className="lg:col-span-8 flex flex-col gap-4">
              <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] overflow-hidden rounded-sm bg-bg-surface border border-border-subtle shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageUrl}
                    src={currentImageUrl}
                    alt={project.title}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                {/* Left/Right Click Nav on Image */}
                {project.gallery && project.gallery.length > 1 && (
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none">
                    <button
                      onClick={() =>
                        setActiveImageIndex(
                          (prev) => (prev - 1 + project.gallery.length) % project.gallery.length
                        )
                      }
                      className="pointer-events-auto p-2 rounded-full bg-bg/70 backdrop-blur-md border border-border-subtle hover:border-accent text-text-primary hover:text-accent transition-all"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() =>
                        setActiveImageIndex((prev) => (prev + 1) % project.gallery.length)
                      }
                      className="pointer-events-auto p-2 rounded-full bg-bg/70 backdrop-blur-md border border-border-subtle hover:border-accent text-text-primary hover:text-accent transition-all"
                      aria-label="Next image"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                )}
              </div>

              {/* Gallery Thumbnails */}
              {project.gallery && project.gallery.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto py-2">
                  {project.gallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-sm overflow-hidden border transition-all duration-200 shrink-0 ${
                        activeImageIndex === idx
                          ? 'border-accent ring-2 ring-accent/30'
                          : 'border-border-subtle opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`Slide ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                  <span className="text-[11px] font-mono text-text-muted ml-auto hidden sm:inline">
                    {activeImageIndex + 1} / {project.gallery.length} Perspective
                  </span>
                </div>
              )}
            </div>

            {/* Right 4 Cols: Story & Technical Gear Specs */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:pl-4">
              <div>
                <h2 className="font-editorial-heading text-3xl sm:text-4xl text-text-primary mb-1">
                  {project.title}
                </h2>
                <p className="text-sm font-mono text-text-secondary tracking-wide">
                  {project.subtitle}
                </p>
              </div>

              {/* Story Narrative */}
              <div className="border-t border-border-subtle pt-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-accent block mb-2">
                  [ Narrative & Concept ]
                </span>
                <p className="text-sm font-sans text-text-secondary leading-relaxed font-light">
                  {project.story}
                </p>
              </div>

              {/* Metadata Box */}
              <div className="glass-panel p-4 rounded-sm space-y-3 text-xs font-mono">
                <div className="flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-text-muted block text-[10px] uppercase tracking-wider">
                      Client & Role
                    </span>
                    <span className="text-text-primary">{project.client}</span>
                    <span className="text-text-secondary block text-[11px]">{project.role}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-text-muted block text-[10px] uppercase tracking-wider">
                      Location Coordinates
                    </span>
                    <span className="text-text-primary">{project.location}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <Camera className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div>
                    <span className="text-text-muted block text-[10px] uppercase tracking-wider">
                      Technical Gear
                    </span>
                    <span className="text-text-primary block">{project.gear.camera}</span>
                    <span className="text-text-secondary text-[11px] block">{project.gear.lens}</span>
                    <span className="text-accent text-[11px] block mt-0.5">{project.gear.settings}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Footer Navigation */}
          <div className="border-t border-border-subtle pt-6 flex items-center justify-between">
            <button
              onClick={handlePrevProject}
              className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors group"
              onMouseEnter={() => setCursorType && setCursorType('POINTER')}
              onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
            >
              <div className="w-8 h-8 rounded-full border border-border-subtle group-hover:border-accent flex items-center justify-center">
                <ChevronLeft className="w-4 h-4" />
              </div>
              <div className="text-left hidden sm:block">
                <span className="text-[10px] font-mono text-text-muted block">PREVIOUS (←)</span>
                <span className="font-editorial-heading text-sm text-text-primary">
                  {prevProject.title}
                </span>
              </div>
            </button>

            <span className="text-xs font-mono text-text-muted hidden md:inline">
              Use ← / → keys to navigate · Esc to close
            </span>

            <button
              onClick={handleNextProject}
              className="flex items-center gap-3 text-text-secondary hover:text-accent transition-colors group"
              onMouseEnter={() => setCursorType && setCursorType('POINTER')}
              onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
            >
              <div className="text-right hidden sm:block">
                <span className="text-[10px] font-mono text-text-muted block">NEXT (→)</span>
                <span className="font-editorial-heading text-sm text-text-primary">
                  {nextProject.title}
                </span>
              </div>
              <div className="w-8 h-8 rounded-full border border-border-subtle group-hover:border-accent flex items-center justify-center">
                <ChevronRight className="w-4 h-4" />
              </div>
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
