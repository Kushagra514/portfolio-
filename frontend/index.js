// ==============================
// LUCIDE ICONS INIT
// ==============================
document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initNav();
  initScrollReveal();
  initActiveNav();
});

// ==============================
// NAVBAR
// ==============================
function initNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  // Scroll shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.background = 'rgba(10,10,10,0.97)';
    } else {
      navbar.style.background = 'rgba(10,10,10,0.88)';
    }
  }, { passive: true });

  // Hamburger toggle
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
  });

  // Close mobile menu on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
    });
  });
}

// ==============================
// SCROLL REVEAL
// ==============================
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.project-card, .ach-card, .hobby-card, .skill-group, .stat-card, .contact-card, .about-text, .about-stats'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings slightly
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 60);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  targets.forEach(el => observer.observe(el));
}

// ==============================
// ACTIVE NAV HIGHLIGHT
// ==============================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.style.color = '';
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.style.color = 'var(--c-accent)';
          }
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => observer.observe(s));
}