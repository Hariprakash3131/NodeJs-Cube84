import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ photographer, setCursorType }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [timeNY, setTimeNY] = useState('');
  const [timeParis, setTimeParis] = useState('');

  // Live dual-timezone studio clock
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimeNY(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/New_York',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
      setTimeParis(
        now.toLocaleTimeString('en-US', {
          timeZone: 'Europe/Paris',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Background blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Works', href: '#works' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'glass-nav py-4' : 'py-6 md:py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Logo & Monogram */}
          <a
            href="#"
            className="flex items-center gap-3 group"
            onMouseEnter={() => setCursorType && setCursorType('POINTER')}
            onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-accent group-hover:scale-125 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-editorial-heading text-lg md:text-xl font-semibold tracking-wide text-text-primary group-hover:text-accent transition-colors">
                {photographer.name}
              </span>
              <span className="text-[10px] font-mono tracking-widest text-text-muted uppercase">
                {photographer.role}
              </span>
            </div>
          </a>

          {/* Center: Live Studio Clocks (Desktop) */}
          <div className="hidden lg:flex items-center gap-6 text-[11px] font-mono tracking-wider text-text-secondary border-x border-border-subtle px-6">
            <div className="flex items-center gap-2">
              <span className="text-text-muted">NYC</span>
              <span className="text-text-primary">{timeNY || '--:--'}</span>
            </div>
            <span className="text-border-highlight">/</span>
            <div className="flex items-center gap-2">
              <span className="text-text-muted">PAR</span>
              <span className="text-text-primary">{timeParis || '--:--'}</span>
            </div>
            <span className="text-border-highlight">/</span>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              <span className="text-accent text-[10px] uppercase tracking-widest">
                Available
              </span>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest uppercase">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-text-secondary hover:text-accent transition-colors duration-200 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-accent hover:after:w-full after:transition-all after:duration-300"
                onMouseEnter={() => setCursorType && setCursorType('POINTER')}
                onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
              >
                {link.name}
              </a>
            ))}
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-border-subtle hover:border-accent text-text-primary hover:text-accent transition-all duration-300 text-[11px]"
              onMouseEnter={() => setCursorType && setCursorType('POINTER')}
              onMouseLeave={() => setCursorType && setCursorType('DEFAULT')}
            >
              <span>Inquire</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-text-primary hover:text-accent transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col justify-between p-8 pt-28 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-editorial-heading text-3xl text-text-primary hover:text-accent transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="border-t border-border-subtle pt-6 flex flex-col gap-4 text-xs font-mono text-text-secondary">
              <div className="flex justify-between">
                <span>NEW YORK</span>
                <span className="text-text-primary">{timeNY}</span>
              </div>
              <div className="flex justify-between">
                <span>PARIS</span>
                <span className="text-text-primary">{timeParis}</span>
              </div>
              <p className="text-accent text-[11px] pt-2">
                ● Currently accepting selected 2025/2026 commissions
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
