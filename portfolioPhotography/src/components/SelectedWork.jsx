import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, SlidersHorizontal } from 'lucide-react';

export default function SelectedWork({ projects, onSelectProject, setCursorType }) {
  const [activeFilter, setActiveFilter] = useState('All');

  // Extract unique categories
  const categories = useMemo(() => {
    const list = ['All'];
    projects.forEach((p) => {
      if (!list.includes(p.category)) list.push(p.category);
    });
    return list;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    return projects.filter((p) => p.category === activeFilter);
  }, [projects, activeFilter]);

  return (
    <section id="works" className="py-24 md:py-36 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-border-subtle pb-8">
          <div>
            <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-3">
              [ 02 / SELECTED ARCHIVE ]
            </span>
            <h2 className="font-editorial-heading text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight">
              Selected Works
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono text-text-muted mr-2 hidden sm:inline-flex items-center gap-1">
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filter:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`text-xs font-mono tracking-wider px-3.5 py-1.5 rounded-full transition-all duration-300 ${
                  activeFilter === cat
                    ? 'bg-accent text-black font-semibold shadow-md shadow-accent/20'
                    : 'bg-bg-surface border border-border-subtle text-text-secondary hover:text-text-primary hover:border-border-highlight'
                }`}
                onMouseEnter={() => setCursorType && setCursorType('POINTER')}
                onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetric Masonry Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 md:gap-12 lg:gap-14"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => {
              // Asymmetric column spans and vertical offsets for an editorial rhythm
              const colSpan =
                index % 6 === 0
                  ? 'lg:col-span-7'
                  : index % 6 === 1
                  ? 'lg:col-span-5 lg:mt-20'
                  : index % 6 === 2
                  ? 'lg:col-span-5 lg:-mt-12'
                  : index % 6 === 3
                  ? 'lg:col-span-7'
                  : index % 6 === 4
                  ? 'lg:col-span-6'
                  : 'lg:col-span-6 lg:mt-16';

              return (
                <motion.article
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative flex flex-col ${colSpan} cursor-pointer`}
                  onClick={() => onSelectProject(project)}
                  onMouseEnter={() => setCursorType && setCursorType('VIEW')}
                  onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
                >
                  {/* Photo Container */}
                  <div
                    className={`relative w-full ${project.aspectRatio} overflow-hidden rounded-sm bg-bg-surface border border-border-subtle transition-all duration-500 group-hover:border-accent/40`}
                  >
                    <motion.img
                      src={project.coverImage}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-95 group-hover:brightness-105"
                    />

                    {/* Subtle Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                    {/* Floating corner index badge */}
                    <div className="absolute top-4 left-4 z-10 px-2.5 py-1 rounded bg-bg/80 backdrop-blur-md border border-border-subtle text-[10px] font-mono tracking-widest text-text-muted">
                      #{String(index + 1).padStart(2, '0')}
                    </div>

                    {/* View project arrow button */}
                    <div className="absolute bottom-4 right-4 z-10 w-10 h-10 rounded-full bg-accent text-black flex items-center justify-center opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Project Info Below Image */}
                  <div className="mt-4 flex items-start justify-between gap-4">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-3 mb-1">
                        <span className="text-[11px] font-mono tracking-widest text-accent uppercase">
                          {project.category}
                        </span>
                        <span className="text-text-muted text-[10px]">•</span>
                        <span className="text-[11px] font-mono text-text-muted">
                          {project.year}
                        </span>
                      </div>
                      <h3 className="font-editorial-heading text-2xl md:text-3xl text-text-primary group-hover:text-accent transition-colors duration-200">
                        {project.title}
                      </h3>
                      <p className="text-xs font-mono text-text-secondary mt-1 tracking-wide">
                        {project.subtitle}
                      </p>
                    </div>

                    {/* Camera/Location Tag snippet */}
                    <div className="hidden sm:flex flex-col items-end text-right">
                      <span className="text-[10px] font-mono text-text-muted">
                        {project.gear?.camera?.split(' ')[0] || 'Medium Format'}
                      </span>
                      <span className="text-[10px] font-mono text-text-secondary truncate max-w-[140px]">
                        {project.location.split('·')[0]}
                      </span>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
