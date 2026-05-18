// ==============================
// PREMIUM ANIMATIONS & INTERACTIONS
// ==============================

document.addEventListener('DOMContentLoaded', () => {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  initNav();
  initScrollReveal();
  initActiveNav();
  initHoverEffects();
  initScrollProgress();
});

// ==============================
// NAVBAR WITH SMOOTH TRANSITIONS
// ==============================
function initNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  // Smooth scroll shadow
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const scrollPos = window.scrollY;
    
    // Subtle background transition on scroll
    if (scrollPos > 20) {
      navbar.style.background = 'rgba(10,10,10,0.97)';
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.3)';
    } else {
      navbar.style.background = 'rgba(10,10,10,0.88)';
      navbar.style.boxShadow = 'none';
    }
    
    lastScroll = scrollPos;
  }, { passive: true });

  // Hamburger menu with smooth toggle
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    hamburger.style.transform = mobileMenu.classList.contains('open') 
      ? 'rotate(90deg)' 
      : 'rotate(0deg)';
  });

  // Close mobile menu on link click with fade
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.style.transform = 'rotate(0deg)';
    });
  });
}

// ==============================
// SOPHISTICATED SCROLL REVEAL
// ==============================
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.project-card, .ach-card, .hobby-card, .skill-group, .stat-card, .contact-card, .about-text, .about-stats'
  );

  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger animation with premium easing
        const siblings = [...entry.target.parentElement.children];
        const idx = siblings.indexOf(entry.target);
        
        setTimeout(() => {
          entry.target.classList.add('visible');
          // Add subtle scale animation on reveal
          entry.target.style.animation = 'scaleIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        }, idx * 80);
        
        observer.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.08, 
    rootMargin: '0px 0px -60px 0px' 
  });

  targets.forEach(el => observer.observe(el));
}

// ==============================
// ACTIVE NAV HIGHLIGHT WITH SMOOTH TRANSITION
// ==============================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a, .mobile-menu a');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          
          if (isActive) {
            link.style.color = 'var(--c-accent)';
            link.style.textShadow = '0 0 8px rgba(200, 169, 110, 0.4)';
          } else {
            link.style.color = '';
            link.style.textShadow = '';
          }
        });
      }
    });
  }, { threshold: 0.45 });

  sections.forEach(s => observer.observe(s));
}

// ==============================
// ENHANCED HOVER EFFECTS
// ==============================
function initHoverEffects() {
  // Project cards with depth
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });

  // Achievement cards with elevation
  document.querySelectorAll('.ach-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
    });
  });

  // Hobby cards with lift
  document.querySelectorAll('.hobby-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      const icon = this.querySelector('.hobby-icon');
      if (icon) {
        icon.style.transform = 'scale(1.15) rotate(5deg)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const icon = this.querySelector('.hobby-icon');
      if (icon) {
        icon.style.transform = 'scale(1) rotate(0deg)';
      }
    });
  });

  // Button interactions
  document.querySelectorAll('.btn-primary, .btn-ghost').forEach(btn => {
    btn.addEventListener('mousedown', function() {
      this.style.transform = 'scale(0.98)';
    });
    
    btn.addEventListener('mouseup', function() {
      this.style.transform = '';
    });
  });

  // Stat cards
  document.querySelectorAll('.stat-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
      const num = this.querySelector('.stat-num');
      if (num) {
        num.style.color = '#e0c080';
        num.style.transform = 'scale(1.1)';
      }
    });
    
    card.addEventListener('mouseleave', function() {
      const num = this.querySelector('.stat-num');
      if (num) {
        num.style.color = 'var(--c-accent)';
        num.style.transform = 'scale(1)';
      }
    });
  });
}

// ==============================
// SCROLL PROGRESS INDICATOR (Optional Enhancement)
// ==============================
function initScrollProgress() {
  // Create progress bar if needed
  const progressBar = document.createElement('div');
  progressBar.id = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 64px;
    left: 0;
    height: 1px;
    background: linear-gradient(90deg, #c8a96e 0%, #8a7045 100%);
    width: 0%;
    z-index: 1000;
    transition: width 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
  }, { passive: true });
}

// ==============================
// PARALLAX EFFECT (Optional - light version)
// ==============================
function initParallax() {
  const heroContent = document.querySelector('.hero-content');
  const heroVisual = document.querySelector('.hero-visual');

  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      const parallaxAmount = window.scrollY * 0.5;
      if (heroContent) heroContent.style.transform = `translateY(${parallaxAmount}px)`;
      if (heroVisual) heroVisual.style.transform = `translateY(${parallaxAmount * 0.3}px)`;
    }
  }, { passive: true });
}

// Call parallax on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParallax);
} else {
  initParallax();
}
