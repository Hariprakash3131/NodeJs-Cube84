import Alpine from 'alpinejs';
import Lenis from 'lenis';

// Export to window for global availability
window.Alpine = Alpine;
window.Lenis = Lenis;

// Theme Controller
export const ThemeManager = {
  THEME_KEY: 'servora_theme',
  COLOR_KEY: 'servora_color_theme',
  DIR_KEY: 'servora_dir',
  LENIS_KEY: 'servora_lenis',

  init() {
    this.applyTheme(this.getTheme());
    this.applyColor(this.getColor());
    this.applyDir(this.getDir());
    this.initLenis();
    this.bindEvents();
  },

  getTheme() {
    return localStorage.getItem(this.THEME_KEY) || 
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  },

  setTheme(theme) {
    localStorage.setItem(this.THEME_KEY, theme);
    this.applyTheme(theme);
    window.dispatchEvent(new CustomEvent('servora:theme-changed', { detail: { theme } }));
  },

  toggleTheme() {
    const next = document.documentElement.classList.contains('dark') ? 'light' : 'dark';
    this.setTheme(next);
  },

  applyTheme(theme) {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  getColor() {
    return localStorage.getItem(this.COLOR_KEY) || 'default';
  },

  setColor(color) {
    localStorage.setItem(this.COLOR_KEY, color);
    this.applyColor(color);
    window.dispatchEvent(new CustomEvent('servora:color-changed', { detail: { color } }));
  },

  applyColor(color) {
    if (color === 'default') {
      document.documentElement.removeAttribute('data-theme');
    } else {
      document.documentElement.setAttribute('data-theme', color);
    }
  },

  getDir() {
    return localStorage.getItem(this.DIR_KEY) || 'ltr';
  },

  setDir(dir) {
    localStorage.setItem(this.DIR_KEY, dir);
    this.applyDir(dir);
    window.dispatchEvent(new CustomEvent('servora:dir-changed', { detail: { dir } }));
  },

  toggleDir() {
    const next = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
    this.setDir(next);
  },

  applyDir(dir) {
    document.documentElement.setAttribute('dir', dir);
    document.documentElement.setAttribute('lang', dir === 'rtl' ? 'ar' : 'en');
  },

  lenisInstance: null,

  initLenis() {
    const enabled = localStorage.getItem(this.LENIS_KEY) !== 'false';
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (enabled && !prefersReducedMotion && !this.lenisInstance) {
      try {
        this.lenisInstance = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
        });

        const raf = (time) => {
          if (this.lenisInstance) {
            this.lenisInstance.raf(time);
            requestAnimationFrame(raf);
          }
        };
        requestAnimationFrame(raf);
      } catch (e) {
        console.warn('Lenis initialization error:', e);
      }
    }
  },

  toggleLenis(enable) {
    localStorage.setItem(this.LENIS_KEY, enable ? 'true' : 'false');
    if (enable) {
      if (!this.lenisInstance) this.initLenis();
    } else if (this.lenisInstance) {
      this.lenisInstance.destroy();
      this.lenisInstance = null;
    }
  },

  bindEvents() {
    // Listen to system theme change if not manually set
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(this.THEME_KEY)) {
        this.applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
};

window.ThemeManager = ThemeManager;

// Robust start routine handling both initial loading and post-load execution
function startServora() {
  ThemeManager.init();
  if (!window._servoraAlpineStarted) {
    window._servoraAlpineStarted = true;
    try {
      Alpine.start();
    } catch (e) {
      console.warn('Alpine start warning:', e);
    }
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', startServora);
} else {
  startServora();
}

