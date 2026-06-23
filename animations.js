/* =============================================
   RentConnect — animations.js
   Advanced animations: tilt, parallax, counters
   ============================================= */

// ── Card tilt effect ──────────────────────────
function initTiltCards() {
  document.querySelectorAll('.tilt-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg) translateZ(10px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateY(0) rotateX(0) translateZ(0)';
    });
  });
}

// ── Parallax hero ─────────────────────────────
function initParallax() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  window.addEventListener('scroll', () => {
    const offset = window.scrollY;
    const blobs = hero.querySelectorAll('.hero-blob');
    blobs.forEach((blob, i) => {
      blob.style.transform = `translateY(${offset * (0.1 + i * 0.05)}px)`;
    });
  }, { passive: true });
}

// ── Typewriter effect ─────────────────────────
function typeWriter(el, texts, speed = 80, pause = 2000) {
  let ti = 0, ci = 0, deleting = false;

  function tick() {
    const current = texts[ti];
    if (deleting) {
      el.textContent = current.substring(0, ci--);
      if (ci < 0) { deleting = false; ti = (ti + 1) % texts.length; setTimeout(tick, 500); return; }
    } else {
      el.textContent = current.substring(0, ci++);
      if (ci > current.length) { deleting = true; setTimeout(tick, pause); return; }
    }
    setTimeout(tick, deleting ? speed / 2 : speed);
  }
  tick();
}

function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;
  const texts = el.dataset.texts ? JSON.parse(el.dataset.texts) : ['in Kampala', 'in Kololo', 'in Nakasero', 'near you'];
  typeWriter(el, texts);
}

// ── Sticky navbar colour morph ────────────────
function initNavMorph() {
  const nav = document.querySelector('.navbar');
  if (!nav) return;
  // Already handled in main.js scroll listener — this adds a subtle indigo tint at top
}

// ── Image lazy load with fade-in ─────────────
function initLazyImages() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  if (!imgs.length || !('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.addEventListener('load', () => img.classList.add('loaded'));
        observer.unobserve(img);
      }
    });
  });
  imgs.forEach(img => observer.observe(img));
}

// ── Hero floating cards ───────────────────────
function initHeroCards() {
  const cards = document.querySelectorAll('.hero-visual-card');
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.8}s`;
  });
}

// ── Scroll progress bar ───────────────────────
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:3px; z-index:9999;
    background:linear-gradient(90deg, var(--indigo-mid), var(--coral));
    width:0%; transition:width 0.1s linear; pointer-events:none;
  `;
  document.body.appendChild(bar);

  window.addEventListener('scroll', () => {
    const total = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
  }, { passive: true });
}

// ── Section number reveal ─────────────────────
function initSectionNumbers() {
  const sections = document.querySelectorAll('.section[data-num]');
  sections.forEach(section => {
    const num = section.dataset.num;
    const numEl = document.createElement('div');
    numEl.textContent = num;
    numEl.style.cssText = `
      position:absolute; left:-20px; top:0;
      font-family:var(--font-display); font-size:8rem; font-weight:900;
      color:var(--border); opacity:0.4; line-height:1; pointer-events:none;
      z-index:0; user-select:none;
    `;
    section.style.position = 'relative';
    section.appendChild(numEl);
  });
}

// ── Init all animations ───────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initTiltCards();
  initParallax();
  initTypewriter();
  initLazyImages();
  initHeroCards();
  initScrollProgress();
});
