import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Servora Motion & Animation Engine
 * Smooth scroll reveals, counter milestones, 3D card tilt, and magnetic CTAs.
 * Features strict clearProps cleanup, RTL awareness, and Lenis integration.
 */
export function initAnimations() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';

  // 1. Sync Lenis with GSAP ScrollTrigger if Lenis exists
  if (window.ThemeManager && window.ThemeManager.lenisInstance) {
    try {
      window.ThemeManager.lenisInstance.on('scroll', ScrollTrigger.update);
    } catch (e) {
      console.warn('ScrollTrigger-Lenis sync notice:', e);
    }
  }

  // 2. Scroll Reveals for Elements with [data-reveal]
  const revealElements = document.querySelectorAll('[data-reveal]');
  revealElements.forEach((el) => {
    const direction = el.dataset.reveal || 'up';
    let x = 0;
    let y = 20;

    if (direction === 'down') y = -20;
    if (direction === 'left') { 
      x = isRtl ? 24 : -24; 
      y = 0; 
    }
    if (direction === 'right') { 
      x = isRtl ? -24 : 24; 
      y = 0; 
    }

    gsap.fromTo(el, 
      { opacity: 0, x, y },
      {
        opacity: 1,
        x: 0,
        y: 0,
        duration: 0.75,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: el,
          start: 'top 92%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // 3. Stagger Reveals for [data-stagger]
  const staggerContainers = document.querySelectorAll('[data-stagger]');
  staggerContainers.forEach((container) => {
    const children = container.children;
    gsap.fromTo(children,
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
        clearProps: 'transform',
        scrollTrigger: {
          trigger: container,
          start: 'top 88%',
          toggleActions: 'play none none none'
        }
      }
    );
  });

  // 4. Animated Counters [data-counter]
  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach((counter) => {
    const target = parseFloat(counter.dataset.counter) || 0;
    const prefix = counter.dataset.prefix || '';
    const suffix = counter.dataset.suffix || '';
    const decimals = parseInt(counter.dataset.decimals || '0', 10);

    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: counter,
      start: 'top 92%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            counter.textContent = prefix + (decimals > 0 ? obj.val.toFixed(decimals) : Math.round(obj.val).toLocaleString()) + suffix;
          }
        });
      }
    });
  });

  // 5. Card 3D Tilt on Hover [data-tilt]
  const tiltCards = document.querySelectorAll('[data-tilt]');
  tiltCards.forEach((card) => {
    const maxTilt = parseFloat(card.dataset.tiltMax || '6');

    const handleMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const xRot = ((y / rect.height) - 0.5) * -maxTilt * 2;
      const yRot = ((x / rect.width) - 0.5) * maxTilt * 2;

      card.style.transform = `perspective(1000px) rotateX(${xRot.toFixed(2)}deg) rotateY(${yRot.toFixed(2)}deg) translateY(-2px)`;
      card.style.transition = 'transform 0.1s ease-out';
    };

    const handleLeave = () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      card.style.transition = 'transform 0.4s ease-out';
    };

    card.addEventListener('mousemove', handleMove);
    card.addEventListener('mouseleave', handleLeave);
  });

  // 6. Magnetic Buttons [data-magnetic]
  const magneticButtons = document.querySelectorAll('[data-magnetic]');
  magneticButtons.forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      gsap.to(btn, {
        x: x * 0.2,
        y: y * 0.2,
        duration: 0.25,
        ease: 'power2.out'
      });
    });

    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.4,
        ease: 'power3.out'
      });
    });
  });
}

if (typeof window !== 'undefined') {
  window.initAnimations = initAnimations;
}
