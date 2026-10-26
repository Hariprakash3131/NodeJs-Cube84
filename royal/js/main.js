/**
 * ROYAL SPORTS ACADEMY — Main Interactive Script
 * Handles navigation, carousel, animated counters, modal details, form validation, and toast
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  const backToTopBtn = document.querySelector('.back-to-top');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollY > 400) {
      backToTopBtn?.classList.add('visible');
    } else {
      backToTopBtn?.classList.remove('visible');
    }
  });

  // 2. Mobile Drawer Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const mobileDrawer = document.querySelector('.mobile-nav-drawer');
  const mobileCloseBtn = document.querySelector('.mobile-close-btn');
  const drawerBackdrop = document.querySelector('.drawer-backdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openDrawer() {
    mobileDrawer.classList.add('open');
    drawerBackdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    mobileDrawer.classList.remove('open');
    drawerBackdrop.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggle?.addEventListener('click', openDrawer);
  mobileCloseBtn?.addEventListener('click', closeDrawer);
  drawerBackdrop?.addEventListener('click', closeDrawer);

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  // 3. Smooth Active Nav Link Spying
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 150;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // 4. Interactive Carousel (Programs / Disciplines)
  const carouselTrack = document.getElementById('programsCarouselTrack');
  const prevBtn = document.getElementById('carouselPrevBtn');
  const nextBtn = document.getElementById('carouselNextBtn');
  const filterTabs = document.querySelectorAll('.filter-tab');

  if (carouselTrack && prevBtn && nextBtn) {
    const cardWidth = 360; // card + gap

    nextBtn.addEventListener('click', () => {
      carouselTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
      carouselTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    });

    // Filter cards
    filterTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        filterTabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const filter = tab.getAttribute('data-filter');
        const cards = carouselTrack.querySelectorAll('.discipline-card');

        cards.forEach((card) => {
          const category = card.getAttribute('data-category');
          if (filter === 'all' || category.includes(filter)) {
            card.style.display = 'flex';
            card.style.opacity = '1';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0';
          }
        });
      });
    });
  }

  // 5. Stat Counter Numbers Animation
  const statNumbers = document.querySelectorAll('.stat-number');
  let animated = false;

  const countUp = (el, target, suffix = '+') => {
    let start = 0;
    const duration = 1800;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        el.textContent = `${target}${suffix}`;
        clearInterval(timer);
      } else {
        el.textContent = `${Math.floor(start)}${suffix}`;
      }
    }, stepTime);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animated) {
          animated = true;
          statNumbers.forEach((stat) => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            countUp(stat, target);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  const statsSection = document.querySelector('.mission-section');
  if (statsSection) {
    observer.observe(statsSection);
  }

  // 6. Discipline Details Modal Data & Handlers
  const disciplineData = {
    karate: {
      title: 'Shotokan Karate & Kumite',
      badge: 'Olympic Discipline',
      age: 'Ages 5+ (Kids, Teens & Adults)',
      image: 'assets/images/discipline-karate.jpg',
      lead: 'Sensei Rajesh (6th Dan Black Belt)',
      desc: 'Master the traditional art of Shotokan Karate combined with modern Olympic Kumite point-sparring techniques. Build explosive reflexes, unwavering discipline, and core striking precision.',
      curriculum: [
        'Kihon: Fundamental Stances, Punches, Blocks & Kicks',
        'Kata: Ancient Choreographed Battle Sequences',
        'Kumite: Safe Olympic Sparring with Body Armor',
        'Belt Progression: White to Master 6th Dan Black Belt',
        'National Tournament Participation & Grading Certification'
      ],
      timing: 'Mon / Wed / Fri: 6:00 AM - 7:30 AM & 5:00 PM - 6:30 PM'
    },
    silambam: {
      title: 'Traditional Silambam Combat',
      badge: 'Heritage Weaponry',
      age: 'Ages 6+ (All Skill Levels)',
      image: 'assets/images/discipline-silambam.jpg',
      lead: 'Coach Priya (National Champion)',
      desc: 'The ancient Tamil weapon-based martial art utilizing flexible bamboo staffs. Renowned for enhancing 360-degree situational awareness, high-speed wrist dexterity, and footwork agility.',
      curriculum: [
        'Por Silambam: High-Speed Rotational Staff Strikes',
        'Footwork (Kaaladi): 18 Ancient Traditional Stances',
        'Maduvu (Deer Horn) & Surul Vaal Blade Techniques',
        'Self Defense & Close-Quarter Disarming Moves',
        'State & National Federation Championship Training'
      ],
      timing: 'Tue / Thu / Sat: 6:00 AM - 7:30 AM & 5:30 PM - 7:00 PM'
    },
    yoga: {
      title: 'Power & Ashtanga Yoga',
      badge: 'Mind & Body Core',
      age: 'All Ages Welcome',
      image: 'assets/images/discipline-yoga.jpg',
      lead: 'Master Anand (Certified International Yogacharya)',
      desc: 'Integrate athletic conditioning, profound joint mobility, deep core activation, and advanced breath control (Pranayama) to maximize mental focus and muscular resilience.',
      curriculum: [
        'Surya Namaskar Dynamic Series & Flow Sequences',
        'Advanced Inversions & Arm Balance Postures',
        'Myofascial Release & Deep Flexibility Restoration',
        'Pranayama Breathwork for Peak Athletic VO2 Max',
        'Stress Regulation & Mindfulness Meditation'
      ],
      timing: 'Daily Morning Batch: 5:30 AM - 6:30 AM & 6:45 AM - 7:45 AM'
    },
    skating: {
      title: 'Speed Skating & Inline Slalom',
      badge: 'High-Speed Track',
      age: 'Ages 4 to 18 Years',
      image: 'assets/images/discipline-skating.jpg',
      lead: 'Coach Vikram (International Speed Skater)',
      desc: 'High-adrenaline speed roller and inline skating conducted on our dedicated indoor polished wood tracks. Develop phenomenal lower-body strength, aerodynamics, and balance.',
      curriculum: [
        'Quads & Inline Skate Mechanics & Stride Mastery',
        'High-Speed Cornering & Aerodynamic Drafting',
        'Freestyle Slalom & Cone Agility Drills',
        'Safety Drills, Controlled Sliding & Impact Absorption',
        'National Speed Roller Federation Trials'
      ],
      timing: 'Mon / Wed / Sat: 5:00 PM - 6:30 PM & 6:30 PM - 8:00 PM'
    },
    gymnastics: {
      title: 'Artistic Gymnastics & Acrobatics',
      badge: 'Olympic Apparatus',
      age: 'Ages 4+ Early Foundation',
      image: 'assets/images/discipline-gymnastics.jpg',
      lead: 'Coach Elena & Master Karthik',
      desc: 'The gold standard for total body athleticism, spatial orientation, and flexibility. Students train on sprung floors, balance beams, parallel bars, and foam landing pits.',
      curriculum: [
        'Floor Acrobatics: Flips, Somersaults & Handsprings',
        'Balance Beam Precision & Core Alignment',
        'Vault Apparatus Launching & Safe Landings',
        'Flexibility Splits & Isometric Upper-Body Strength',
        'District & National Gymnastics League Coaching'
      ],
      timing: 'Tue / Thu / Fri: 4:30 PM - 6:00 PM & 6:00 PM - 7:30 PM'
    },
    judo: {
      title: 'Olympic Judo & Grappling',
      badge: 'Combat & Throws',
      age: 'Ages 7+ (Youth & Adults)',
      image: 'assets/images/discipline-judo.jpg',
      lead: 'Sensei Rajesh & Coach Arun (Black Belt)',
      desc: 'The Olympic gentle way martial art focusing on utilizing an opponents momentum through throws (Nage-waza), pins (Osaekomi), and joint leverage on thick cushioned tatami mats.',
      curriculum: [
        'Ukemi: Art of Safe Falling & Zero Impact Landings',
        'Nage-waza: Shoulder, Hip & Foot Sweeps (Ippon Seoi)',
        'Ne-waza: Ground Control, Pins & Tactical Escapes',
        'Self-Defense Scenarios against Real-World Attackers',
        'Official Judo Federation Belt Grading'
      ],
      timing: 'Wed / Fri / Sun: 6:00 AM - 7:30 AM & 6:00 PM - 7:30 PM'
    }
  };

  const modalOverlay = document.getElementById('disciplineModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImage = document.getElementById('modalImg');
  const modalBadge = document.getElementById('modalBadge');
  const modalTitle = document.getElementById('modalTitle');
  const modalAge = document.getElementById('modalAge');
  const modalLead = document.getElementById('modalLead');
  const modalDesc = document.getElementById('modalDesc');
  const modalList = document.getElementById('modalList');
  const modalTiming = document.getElementById('modalTiming');
  const modalEnrollBtn = document.getElementById('modalEnrollBtn');

  document.querySelectorAll('.open-discipline-modal').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.getAttribute('data-id');
      const data = disciplineData[id];
      if (!data) return;

      modalImage.src = data.image;
      modalImage.alt = data.title;
      modalBadge.textContent = data.badge;
      modalTitle.textContent = data.title;
      modalAge.textContent = data.age;
      modalLead.textContent = data.lead;
      modalDesc.textContent = data.desc;
      modalTiming.textContent = data.timing;

      modalList.innerHTML = '';
      data.curriculum.forEach((item) => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fa-solid fa-circle-check text-cyan" style="margin-right: 8px;"></i> ${item}`;
        li.style.color = 'var(--text-secondary)';
        li.style.fontSize = '0.9rem';
        li.style.marginBottom = '0.5rem';
        modalList.appendChild(li);
      });

      // Set target on enroll button
      modalEnrollBtn.setAttribute('data-target-discipline', id);

      modalOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeModal() {
    modalOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  modalCloseBtn?.addEventListener('click', closeModal);
  modalOverlay?.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Pre-fill enroll form from modal
  modalEnrollBtn?.addEventListener('click', () => {
    const disciplineId = modalEnrollBtn.getAttribute('data-target-discipline');
    const select = document.getElementById('disciplineSelect');
    if (select && disciplineId) {
      select.value = disciplineId;
    }
    closeModal();
    const enrollSection = document.getElementById('enroll');
    if (enrollSection) {
      enrollSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // 7. Enrollment Form Submission & Toast
  const enrollForm = document.getElementById('enrollForm');
  const toastContainer = document.getElementById('toastContainer');

  function showToast(title, message) {
    const toast = document.createElement('div');
    toast.className = 'toast toast-success';
    toast.innerHTML = `
      <div class="toast-icon"><i class="fa-solid fa-circle-check"></i></div>
      <div class="toast-text">
        <h5>${title}</h5>
        <p>${message}</p>
      </div>
    `;

    toastContainer.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 100);

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  enrollForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const parentName = document.getElementById('parentName').value.trim();
    const studentName = document.getElementById('studentName').value.trim();
    const phone = document.getElementById('phoneNumber').value.trim();
    const discipline = document.getElementById('disciplineSelect').value;

    if (!parentName || !studentName || !phone || !discipline) {
      alert('Please fill out all required fields.');
      return;
    }

    const submitBtn = enrollForm.querySelector('.btn-enroll-submit');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Processing Application...`;
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      enrollForm.reset();

      showToast(
        'Enrollment Confirmed!',
        `Welcome ${studentName}! Sensei Rajesh will contact you at ${phone} shortly.`
      );
    }, 1200);
  });

  // 8. Event Countdown Clocks
  function updateCountdown() {
    const championshipDate = new Date();
    championshipDate.setDate(championshipDate.getDate() + 24); // 24 days away

    const gradingDate = new Date();
    gradingDate.setDate(gradingDate.getDate() + 11); // 11 days away

    const now = new Date().getTime();

    // Championship Timer
    const diffChamp = championshipDate.getTime() - now;
    if (diffChamp > 0) {
      const days = Math.floor(diffChamp / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffChamp % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const mins = Math.floor((diffChamp % (1000 * 60 * 60)) / (1000 * 60));
      const secs = Math.floor((diffChamp % (1000 * 60)) / 1000);

      document.getElementById('champDays').textContent = String(days).padStart(2, '0');
      document.getElementById('champHours').textContent = String(hours).padStart(2, '0');
      document.getElementById('champMins').textContent = String(mins).padStart(2, '0');
      document.getElementById('champSecs').textContent = String(secs).padStart(2, '0');
    }

    // Grading Timer
    const diffGrading = gradingDate.getTime() - now;
    if (diffGrading > 0) {
      const days = Math.floor(diffGrading / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diffGrading % (1000 * 60 * 60)) / (1000 * 60));
      const mins = Math.floor((diffGrading % (1000 * 60)) / (1000 * 60));
      const secs = Math.floor((diffGrading % (1000 * 60)) / 1000);

      document.getElementById('gradeDays').textContent = String(days).padStart(2, '0');
      document.getElementById('gradeHours').textContent = String(hours).padStart(2, '0');
      document.getElementById('gradeMins').textContent = String(mins).padStart(2, '0');
      document.getElementById('gradeSecs').textContent = String(secs).padStart(2, '0');
    }
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();
});
