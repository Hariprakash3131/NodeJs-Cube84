import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import HeroCanvas from './Hero3D/HeroCanvas';

export default function HeroSection({
  photographer,
  heroGallery,
  onPhotoClick,
  setCursorType,
}) {
  // Staggered reveal animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.14,
        delayChildren: 0.2,
      },
    },
  };

  const lineVariants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-between pt-28 md:pt-36 pb-12 overflow-hidden">
      {/* Top Header Text: Name & Positioning Statement */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4 max-w-4xl"
        >
          {/* Subheading meta label */}
          <motion.div
            variants={lineVariants}
            className="flex items-center gap-3 text-xs md:text-sm font-mono tracking-widest text-accent uppercase"
          >
            <span>[ {photographer.tagline} ]</span>
            <span className="w-12 h-[1px] bg-accent/40 hidden sm:inline-block" />
            <span className="text-text-muted hidden sm:inline-block">
              {photographer.location}
            </span>
          </motion.div>

          {/* Main Hero Title */}
          <div className="overflow-hidden">
            <motion.h1
              variants={lineVariants}
              className="font-editorial-heading text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light tracking-tight text-text-primary leading-[0.92]"
            >
              {photographer.name}
            </motion.h1>
          </div>

          {/* One-line positioning statement */}
          <div className="overflow-hidden pt-2">
            <motion.p
              variants={lineVariants}
              className="font-sans text-base sm:text-lg md:text-xl text-text-secondary max-w-2xl font-light leading-relaxed tracking-wide"
            >
              {photographer.positioningStatement}
            </motion.p>
          </div>

          {/* Specialties Badges */}
          <motion.div
            variants={lineVariants}
            className="flex flex-wrap gap-2 pt-2"
          >
            {photographer.specialties.map((spec) => (
              <span
                key={spec}
                className="text-[11px] font-mono tracking-wider px-3 py-1 rounded-full bg-bg-surface/80 border border-border-subtle text-text-secondary"
              >
                {spec}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* 3D Interactive Floating Photo Gallery */}
      <div className="w-full relative my-auto py-4 z-20">
        <HeroCanvas
          galleryItems={heroGallery}
          onPhotoClick={onPhotoClick}
          setCursorType={setCursorType}
        />
      </div>

      {/* Bottom Row: Interaction Hint & Scroll Indicator */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 w-full flex items-end justify-between z-10">
        {/* Interaction Hint */}
        <div className="hidden sm:flex items-center gap-3 text-xs font-mono text-text-muted">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          <span>Interactive 3D Space · Drag to orbit · Click photo to expand</span>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#works"
          className="flex items-center gap-3 group ml-auto"
          onMouseEnter={() => setCursorType && setCursorType('POINTER')}
          onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
          aria-label="Scroll to selected works"
        >
          <span className="text-xs font-mono tracking-widest text-text-secondary group-hover:text-accent transition-colors uppercase">
            Scroll to explore
          </span>
          <div className="w-8 h-8 rounded-full border border-border-subtle group-hover:border-accent flex items-center justify-center transition-all duration-300">
            <ArrowDown className="w-3.5 h-3.5 text-text-secondary group-hover:text-accent transition-transform duration-300 group-hover:translate-y-0.5" />
          </div>
        </a>
      </div>
    </section>
  );
}
