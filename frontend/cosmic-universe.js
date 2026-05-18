// =============================
// COSMIC UNIVERSE ANIMATIONS
// =============================

document.addEventListener('DOMContentLoaded', () => {
  initCosmicCanvas();
  initCosmicAnimations();
  initParticleSystem();
  initOrbitals();
});

// =============================
// ADVANCED STARFIELD (Canvas)
// =============================
function initCosmicCanvas() {
  // Create stars canvas if not already present
  let canvas = document.getElementById('cosmic-starfield');
  
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'cosmic-starfield';
    canvas.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 0;
      pointer-events: none;
    `;
    document.body.insertBefore(canvas, document.body.firstChild);
  }
  
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  
  // Create star field
  const stars = [];
  const starCount = Math.floor((canvas.width * canvas.height) / 15000);
  
  for (let i = 0; i < starCount; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random() * 0.5 + 0.5,
      twinkleSpeed: Math.random() * 0.03 + 0.01,
      twinklePhase: Math.random() * Math.PI * 2,
      color: Math.random() > 0.5 ? 
        `rgba(0, 217, 255, ` : 
        `rgba(224, 224, 255, `,
    });
  }
  
  let lastStarfieldFrame = 0;

  function drawStars(now) {
    if (now - lastStarfieldFrame < 50) {
      requestAnimationFrame(drawStars);
      return;
    }

    lastStarfieldFrame = now;

    // Clear with deep space background
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
      // Update twinkling
      star.twinklePhase += star.twinkleSpeed;
      star.opacity = 0.3 + 0.7 * (Math.sin(star.twinklePhase) + 1) / 2;
      
      // Draw star
      ctx.fillStyle = star.color + star.opacity + ')';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw glow
      ctx.fillStyle = star.color + (star.opacity * 0.3) + ')';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius * 3, 0, Math.PI * 2);
      ctx.fill();
    });
    
    requestAnimationFrame(drawStars);
  }
  
  requestAnimationFrame(drawStars);
  
  // Handle resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// =============================
// COSMIC SECTION ANIMATIONS
// =============================
function initCosmicAnimations() {
  const sections = document.querySelectorAll('section[id]');
  
  sections.forEach(section => {
    section.classList.add(`section-${section.id}`);
    
    // Add parallax effect
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY;
      const sectionTop = section.offsetTop;
      const parallaxOffset = (scrollPos - sectionTop) * 0.3;
      
      section.style.backgroundPosition = `0 ${parallaxOffset}px`;
    }, { passive: true });
  });
}

// =============================
// PARTICLE SYSTEM
// =============================
function initParticleSystem() {
  // Add floating particles to hero section
  const hero = document.getElementById('hero');
  if (!hero) return;
  
  const particles = [];
  const particleCount = 30;
  
  // Create particles
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      background: radial-gradient(circle, rgba(0, 217, 255, 0.8), transparent);
      border-radius: 50%;
      pointer-events: none;
      box-shadow: 0 0 ${Math.random() * 5 + 2}px rgba(0, 217, 255, 0.6);
    `;
    
    const duration = Math.random() * 3 + 2;
    const delay = Math.random() * 2;
    
    particle.style.animation = `floatParticle ${duration}s ease-in-out ${delay}s infinite`;
    
    hero.appendChild(particle);
    
    particles.push({
      element: particle,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration,
      delay,
    });
  }
  
  // Add animation if not exists
  if (!document.querySelector('style[data-particles]')) {
    const style = document.createElement('style');
    style.setAttribute('data-particles', 'true');
    style.textContent = `
      @keyframes floatParticle {
        0% {
          left: var(--x);
          top: var(--y);
          opacity: 0;
        }
        10% {
          opacity: 1;
        }
        90% {
          opacity: 1;
        }
        100% {
          left: calc(var(--x) + ${Math.random() * 100 - 50}px);
          top: calc(var(--y) - ${Math.random() * 150 + 50}px);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);
  }
  
  particles.forEach(p => {
    p.element.style.setProperty('--x', p.x + '%');
    p.element.style.setProperty('--y', p.y + '%');
  });
}

// =============================
// ORBITAL MECHANICS
// =============================
function initOrbitals() {
  // Animate orbital rings
  const rings = document.querySelectorAll('.orbital-ring');
  
  rings.forEach((ring, index) => {
    const duration = 15 + index * 5;
    ring.style.animation = `spin ${duration}s linear infinite`;
  });
  
  // Animate orbit dots with glow
  const orbitDots = document.querySelectorAll('.orbit-dot');
  
  orbitDots.forEach((dot, index) => {
    const colors = [
      'rgba(0, 217, 255, 0.8)',
      'rgba(176, 48, 255, 0.8)',
      'rgba(255, 107, 53, 0.8)',
    ];
    
    dot.style.background = colors[index] || colors[0];
    dot.style.boxShadow = `0 0 20px ${colors[index] || colors[0]}`;
  });
  
  // Avatar glow effect
  const avatarCore = document.querySelector('.avatar-core');
  if (avatarCore) {
    avatarCore.style.animation = 'avatarGlow 3s ease-in-out infinite';
  }
}

// =============================
// MOUSE-TRACKING LIGHT EFFECT
// =============================
let mouseVarsQueued = false;
let mouseVarX = 0.5;
let mouseVarY = 0.5;

document.addEventListener('mousemove', (e) => {
  mouseVarX = e.clientX / window.innerWidth;
  mouseVarY = e.clientY / window.innerHeight;

  if (mouseVarsQueued) return;
  mouseVarsQueued = true;

  requestAnimationFrame(() => {
    document.documentElement.style.setProperty('--mouse-x', mouseVarX);
    document.documentElement.style.setProperty('--mouse-y', mouseVarY);
    mouseVarsQueued = false;
  });
}, { passive: true });

// =============================
// SCROLL-TRIGGERED COSMIC REVEALS
// =============================
window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;
  const windowHeight = window.innerHeight;
  
  const reveals = document.querySelectorAll('.reveal');
  
  reveals.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('visible');
      
      // Add cosmic entrance animation
      if (!element.hasAttribute('data-cosmic-revealed')) {
        element.style.animation = 'cosmicEntrance 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards';
        element.setAttribute('data-cosmic-revealed', 'true');
      }
    }
  });
}, { passive: true });

// =============================
// COSMIC ENTRANCE ANIMATION
// =============================
const style = document.createElement('style');
style.textContent = `
  @keyframes cosmicEntrance {
    0% {
      opacity: 0;
      transform: scale(0.8) translateY(30px);
      filter: blur(10px);
    }
    50% {
      filter: blur(5px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
      filter: blur(0);
    }
  }
  
  @keyframes floatParticle {
    0% {
      transform: translate(0, 0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translate(var(--tx, 0), var(--ty, -100px));
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// =============================
// PLANETARY HOVER EFFECTS
// =============================
document.addEventListener('DOMContentLoaded', () => {
  const planets = document.querySelectorAll('.project-card, .skill-group, .ach-card, .hobby-card');
  
  planets.forEach(planet => {
    planet.addEventListener('mouseenter', function() {
      // Create burst effect
      const rect = this.getBoundingClientRect();
      const burstX = rect.left + rect.width / 2;
      const burstY = rect.top + rect.height / 2;
      
      // Emit particles
      for (let i = 0; i < 5; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
          position: fixed;
          left: ${burstX}px;
          top: ${burstY}px;
          width: 4px;
          height: 4px;
          background: radial-gradient(circle, rgba(0, 217, 255, 1), transparent);
          border-radius: 50%;
          pointer-events: none;
          box-shadow: 0 0 8px rgba(0, 217, 255, 0.8);
          z-index: 1000;
        `;
        
        document.body.appendChild(particle);
        
        const angle = (Math.PI * 2 * i) / 5;
        const velocity = 150;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;
        
        let x = burstX, y = burstY;
        let time = 0;
        const duration = 0.6;
        const startTime = Date.now();
        
        const animate = () => {
          time = (Date.now() - startTime) / 1000;
          
          if (time < duration) {
            x = burstX + vx * time;
            y = burstY + vy * time;
            
            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = 1 - time / duration;
            
            requestAnimationFrame(animate);
          } else {
            particle.remove();
          }
        };
        
        animate();
      }
    });
  });
});

// =============================
// COSMIC CUSTOM CURSOR - SPACE EDITION
// =============================
function initCosmicCursor() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  const trailCanvas = document.createElement('canvas');
  trailCanvas.id = 'cosmic-cursor-trail';
  trailCanvas.setAttribute('aria-hidden', 'true');
  document.body.appendChild(trailCanvas);

  const cursor = document.createElement('div');
  cursor.id = 'cosmic-cursor';
  cursor.innerHTML = `
    <div class="cursor-orbit orbit-1"></div>
    <div class="cursor-orbit orbit-2"></div>
    <div class="cursor-core"></div>
  `;

  document.body.appendChild(cursor);
  document.body.classList.add('cosmic-cursor-active');

  const ctx = trailCanvas.getContext('2d', { alpha: true });
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let targetX = window.innerWidth / 2;
  let targetY = window.innerHeight / 2;
  let currentX = targetX;
  let currentY = targetY;
  let previousX = currentX;
  let previousY = currentY;
  let lastEmitX = currentX;
  let lastEmitY = currentY;
  let lastTime = performance.now();
  let smoothedSpeed = 0;
  let starAccumulator = 0;
  let planetAccumulator = 0;
  const trailPoints = [];
  const stars = [];
  const planets = [];
  const maxTrailPoints = 34;
  const maxStars = 0;
  const maxPlanets = 0;

  const easeOutCubic = value => 1 - Math.pow(1 - value, 3);
  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  function resizeTrailCanvas() {
    trailCanvas.width = Math.floor(window.innerWidth * dpr);
    trailCanvas.height = Math.floor(window.innerHeight * dpr);
    trailCanvas.style.width = '100vw';
    trailCanvas.style.height = '100vh';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function addTrailPoint(x, y, speed) {
    const lastPoint = trailPoints[trailPoints.length - 1];
    if (lastPoint && Math.hypot(x - lastPoint.x, y - lastPoint.y) < 1.5) return;

    trailPoints.push({
      x,
      y,
      speed,
      age: 0,
      life: 0.28,
    });

    if (trailPoints.length > maxTrailPoints) {
      trailPoints.splice(0, trailPoints.length - maxTrailPoints);
    }
  }

  function addStar(x, y, vx, vy, speed) {
    const angle = Math.random() * Math.PI * 2;
    const spread = 8 + Math.random() * 26;
    const lag = clamp(speed * 0.018, 8, 42);

    stars.push({
      x: x - vx * lag + Math.cos(angle) * spread,
      y: y - vy * lag + Math.sin(angle) * spread,
      dx: -vx * (18 + Math.random() * 22) + Math.cos(angle) * (16 + Math.random() * 34),
      dy: -vy * (18 + Math.random() * 22) + Math.sin(angle) * (16 + Math.random() * 34),
      age: 0,
      life: 0.55 + Math.random() * 0.28,
      size: 1 + Math.random() * 2.2,
      twinkle: Math.random() * Math.PI * 2,
    });

    if (stars.length > maxStars) {
      stars.splice(0, stars.length - maxStars);
    }
  }

  function addPlanetSpark(x, y, vx, vy, speed) {
    const angle = Math.random() * Math.PI * 2;
    const distance = 18 + Math.random() * 34;

    planets.push({
      x: x - vx * clamp(speed * 0.014, 6, 32) + Math.cos(angle) * distance,
      y: y - vy * clamp(speed * 0.014, 6, 32) + Math.sin(angle) * distance,
      dx: -vx * 14 + Math.cos(angle) * 22,
      dy: -vy * 14 + Math.sin(angle) * 22,
      age: 0,
      life: 0.7 + Math.random() * 0.18,
      radius: 3.4 + Math.random() * 2.8,
      spin: Math.random() * Math.PI,
    });

    if (planets.length > maxPlanets) {
      planets.splice(0, planets.length - maxPlanets);
    }
  }

  function emitTrail(dt, speed, vx, vy) {
    const distance = Math.hypot(currentX - lastEmitX, currentY - lastEmitY);
    if (distance > 3 && speed > 16) {
      const steps = Math.min(Math.ceil(distance / 8), 7);

      for (let i = 1; i <= steps; i++) {
        const t = i / steps;
        const x = lastEmitX + (currentX - lastEmitX) * t;
        const y = lastEmitY + (currentY - lastEmitY) * t;
        addTrailPoint(x, y, speed);
      }

      lastEmitX = currentX;
      lastEmitY = currentY;
    }

    starAccumulator += dt * clamp(speed / 70, 0, 8);
    while (starAccumulator >= 1) {
      if (maxStars > 0) addStar(currentX, currentY, vx, vy, speed);
      starAccumulator -= 1;
    }

    planetAccumulator += dt * clamp(speed / 260, 0, 2);
    while (planetAccumulator >= 1) {
      if (maxPlanets > 0) addPlanetSpark(currentX, currentY, vx, vy, speed);
      planetAccumulator -= 1;
    }
  }

  function drawTrailLayer(widthMultiplier, alphaMultiplier, colorStops, blur) {
    if (trailPoints.length < 2) return;

    ctx.save();
    ctx.globalCompositeOperation = 'source-over';
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.shadowBlur = blur;
    ctx.shadowColor = 'rgba(255, 255, 255, 0.35)';

    for (let i = 1; i < trailPoints.length; i++) {
      const prev = trailPoints[i - 1];
      const point = trailPoints[i];
      const progress = clamp(point.age / point.life, 0, 1);
      const fade = 1 - easeOutCubic(progress);
      if (fade <= 0.01) continue;

      const next = trailPoints[i + 1] || point;
      const midX = (point.x + next.x) * 0.5;
      const midY = (point.y + next.y) * 0.5;
      const width = clamp(point.speed * 0.0018, 1.8, 4.2) * widthMultiplier;
      const alpha = fade * alphaMultiplier;

      ctx.lineWidth = width;
      ctx.strokeStyle = colorStops[1](alpha);
      ctx.beginPath();
      ctx.moveTo(prev.x, prev.y);
      ctx.quadraticCurveTo(point.x, point.y, midX, midY);
      ctx.stroke();
    }

    ctx.restore();
  }

  function drawMeteorTrail() {
    drawTrailLayer(1.65, 0.22, [
      alpha => `rgba(210, 230, 255, ${alpha})`,
      alpha => `rgba(210, 230, 255, ${alpha})`,
      alpha => `rgba(210, 230, 255, ${alpha})`,
    ], 5);

    drawTrailLayer(0.72, 0.74, [
      alpha => `rgba(255, 255, 255, ${alpha})`,
      alpha => `rgba(255, 255, 255, ${alpha})`,
      alpha => `rgba(255, 255, 255, ${alpha})`,
    ], 0);
  }

  function drawStar(star) {
    const progress = clamp(star.age / star.life, 0, 1);
    const drift = easeOutCubic(progress);
    const alpha = (1 - easeOutCubic(progress)) * (0.62 + Math.sin(star.twinkle + progress * Math.PI * 4) * 0.2);
    const x = star.x + star.dx * drift * 0.035;
    const y = star.y + star.dy * drift * 0.035;

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = `rgba(245, 250, 255, ${Math.max(alpha, 0)})`;
    ctx.shadowBlur = 10 * alpha;
    ctx.shadowColor = 'rgba(0, 217, 255, 0.85)';
    ctx.beginPath();
    ctx.arc(x, y, star.size * (1 - progress * 0.55), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function drawPlanet(planet) {
    const progress = clamp(planet.age / planet.life, 0, 1);
    const alpha = 0.8 * (1 - easeOutCubic(progress));
    const drift = easeOutCubic(progress);
    const x = planet.x + planet.dx * drift * 0.03;
    const y = planet.y + planet.dy * drift * 0.03;
    const radius = planet.radius * (1 + progress * 0.25);

    ctx.save();
    ctx.globalCompositeOperation = 'lighter';
    ctx.translate(x, y);
    ctx.rotate(planet.spin + progress * Math.PI * 0.65);
    ctx.fillStyle = `rgba(176, 48, 255, ${0.45 * alpha})`;
    ctx.shadowBlur = 14 * alpha;
    ctx.shadowColor = 'rgba(176, 48, 255, 0.9)';
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = `rgba(210, 235, 255, ${0.55 * alpha})`;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(0, 0, radius * 1.8, radius * 0.55, 0, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();
  }

  // ===== Mouse Movement Handler =====
  document.addEventListener('pointermove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
  }, { passive: true });

  // ===== Smooth Cursor Following =====
  function animateCursor(now) {
    const dt = clamp((now - lastTime) / 1000, 0.001, 0.033);
    const follow = 1 - Math.exp(-dt * 42);

    previousX = currentX;
    previousY = currentY;
    currentX += (targetX - currentX) * follow;
    currentY += (targetY - currentY) * follow;

    const vx = (currentX - previousX) / dt;
    const vy = (currentY - previousY) / dt;
    const speed = Math.hypot(vx, vy);
    smoothedSpeed += (speed - smoothedSpeed) * (1 - Math.exp(-dt * 18));

    emitTrail(dt, smoothedSpeed, vx / Math.max(smoothedSpeed, 1), vy / Math.max(smoothedSpeed, 1));

    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

    for (let i = trailPoints.length - 1; i >= 0; i--) {
      trailPoints[i].age += dt;
      if (trailPoints[i].age >= trailPoints[i].life) {
        trailPoints.splice(i, 1);
      }
    }

    drawMeteorTrail();

    for (let i = stars.length - 1; i >= 0; i--) {
      stars[i].age += dt;
      if (stars[i].age >= stars[i].life) {
        stars.splice(i, 1);
      } else {
        drawStar(stars[i]);
      }
    }

    for (let i = planets.length - 1; i >= 0; i--) {
      planets[i].age += dt;
      if (planets[i].age >= planets[i].life) {
        planets.splice(i, 1);
      } else {
        drawPlanet(planets[i]);
      }
    }

    cursor.style.transform = `translate3d(${currentX - 26}px, ${currentY - 26}px, 0)`;
    lastTime = now;
    requestAnimationFrame(animateCursor);
  }

  resizeTrailCanvas();
  window.addEventListener('resize', resizeTrailCanvas, { passive: true });
  requestAnimationFrame(animateCursor);
}

document.addEventListener('DOMContentLoaded', initCosmicCursor);

// =============================
// COSMIC TEXT ANIMATIONS
// =============================
function animateCosmicText() {
  const cosmicTexts = document.querySelectorAll('.section-title, .hero-name');
  
  cosmicTexts.forEach(text => {
    const originalText = text.textContent;
    text.style.opacity = '0';
    
    setTimeout(() => {
      text.style.transition = 'opacity 1s ease, text-shadow 1s ease';
      text.style.opacity = '1';
      text.style.textShadow = '0 0 20px rgba(0, 217, 255, 0.5)';
    }, 100);
  });
}

window.addEventListener('load', animateCosmicText);
