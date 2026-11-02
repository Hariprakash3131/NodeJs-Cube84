import React from 'react';
import { motion } from 'framer-motion';
import { Award, Compass, Eye, ShieldCheck } from 'lucide-react';

export default function AboutSection({ photographer, clients, setCursorType }) {
  return (
    <section id="about" className="py-24 md:py-36 relative border-t border-border-subtle overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        {/* Section Tag */}
        <div className="mb-12">
          <span className="text-xs font-mono tracking-widest text-accent uppercase block mb-3">
            [ 03 / ARTIST & PRACTICE ]
          </span>
          <h2 className="font-editorial-heading text-4xl sm:text-5xl md:text-6xl font-light text-text-primary tracking-tight">
            About the Studio
          </h2>
        </div>

        {/* 2-Column Editorial Grid: Portrait & Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Portrait & Stats */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <div
              className="relative aspect-[3/4] w-full rounded-sm overflow-hidden bg-bg-surface border border-border-subtle group shadow-2xl"
              onMouseEnter={() => setCursorType && setCursorType('VIEW')}
              onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
            >
              <img
                src={photographer.portraitUrl}
                alt={photographer.portraitAlt}
                loading="lazy"
                className="w-full h-full object-cover filter grayscale contrast-105 group-hover:grayscale-0 transition-all duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                <div>
                  <span className="text-xs font-mono tracking-widest text-accent uppercase block">
                    {photographer.name}
                  </span>
                  <span className="text-sm font-editorial-heading text-text-primary">
                    Photographer & Visual Director
                  </span>
                </div>
                <div className="text-[10px] font-mono text-text-muted text-right">
                  NYC / PAR
                </div>
              </div>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-sm bg-bg-surface/50 border border-border-subtle">
              {photographer.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="font-editorial-heading text-2xl sm:text-3xl text-accent font-light">
                    {stat.value}
                  </span>
                  <span className="text-[10px] font-mono tracking-wider text-text-muted uppercase mt-1">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Narrative Bio & Philosophy */}
          <div className="lg:col-span-7 flex flex-col gap-8">
            <div className="space-y-6">
              <h3 className="font-editorial-heading text-2xl sm:text-3xl md:text-4xl font-light text-text-primary leading-snug">
                "We do not merely document spaces and silhouettes — we isolate the emotional pulse of light colliding with matter."
              </h3>

              {photographer.bio.map((paragraph, index) => (
                <p
                  key={index}
                  className="font-sans text-base sm:text-lg text-text-secondary leading-relaxed font-light"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Core Values / Methodology Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-border-subtle">
              <div className="flex items-start gap-3 p-4 rounded-sm bg-bg-surface/30 border border-border-subtle">
                <Compass className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono text-text-primary uppercase tracking-wider mb-1">
                    Authentic Optics
                  </h4>
                  <p className="text-xs text-text-muted leading-normal">
                    Prioritizing unhurried medium-format capture, natural ambient light, and physical tactile grain.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 rounded-sm bg-bg-surface/30 border border-border-subtle">
                <ShieldCheck className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-mono text-text-primary uppercase tracking-wider mb-1">
                    Archival Precision
                  </h4>
                  <p className="text-xs text-text-muted leading-normal">
                    Museum-grade color calibrating, raw film processing, and certified high-resolution prints.
                  </p>
                </div>
              </div>
            </div>

            {/* Clients & Publications */}
            <div className="pt-6 border-t border-border-subtle">
              <span className="text-xs font-mono tracking-widest text-text-muted uppercase block mb-4">
                Selected Editorial Clients & Publications
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                {clients.map((client) => (
                  <div
                    key={client.name}
                    className="p-3 rounded-sm border border-border-subtle hover:border-accent/40 bg-bg-surface/30 transition-all duration-300 group"
                    onMouseEnter={() => setCursorType && setCursorType('POINTER')}
                    onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
                  >
                    <span className="text-xs font-editorial-heading text-text-secondary group-hover:text-accent transition-colors block font-medium">
                      {client.name}
                    </span>
                    <span className="text-[9px] font-mono text-text-muted uppercase tracking-wider block mt-0.5">
                      {client.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
