import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer({ photographer, setCursorType }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border-subtle py-12 md:py-16 bg-bg relative">
      <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-8">
        {/* Left: Brand & Statement */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="font-editorial-heading text-lg font-medium text-text-primary tracking-wide">
              {photographer.name}
            </span>
          </div>
          <p className="text-[11px] font-mono text-text-muted">
            All photography © {new Date().getFullYear()} {photographer.name}. All rights reserved worldwide.
          </p>
        </div>

        {/* Center: Colophon info */}
        <div className="text-center">
          <span className="text-[10px] font-mono text-text-muted block">
            TYPESET IN CORMORANT GARAMOND & INTER
          </span>
          <span className="text-[10px] font-mono text-text-secondary">
            THREE.JS · REACT · GSAP · LENIS
          </span>
        </div>

        {/* Right: Back to top button */}
        <button
          onClick={scrollToTop}
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-border-subtle hover:border-accent text-xs font-mono text-text-secondary hover:text-accent transition-all duration-300 group"
          onMouseEnter={() => setCursorType && setCursorType('POINTER')}
          onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
          aria-label="Scroll back to top"
        >
          <span>BACK TO TOP</span>
          <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>
    </footer>
  );
}
