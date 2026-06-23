/* =============================================
   RentConnect — main.js
   Global utilities: nav, theme, toast, scroll
   ============================================= */

// ── Page Loader ──────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('page-loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 900);
  }
  document.body.classList.add('page-transition');
});

// ── Theme Toggle ─────────────────────────────
const savedTheme = localStorage.getItem('rc_theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

function initThemeToggle() {
  const toggles = document.querySelectorAll('.theme-toggle');
  toggles.forEach(btn => {
    updateThemeIcon(btn);
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('rc_theme', next);
      toggles.forEach(b => updateThemeIcon(b));
    });
  });
}

function updateThemeIcon(btn) {
  const theme = document.documentElement.getAttribute('data-theme');
  btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
}

// ── Navbar ───────────────────────────────────
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  const hamburger = document.querySelector('.hamburger');
  const mobileNav = document.querySelector('.mobile-nav');
  if (!navbar) return;

  // Scroll effect
  const onScroll = () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Hamburger toggle
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileNav.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on outside click
    document.addEventListener('click', e => {
      if (!navbar.contains(e.target) && !mobileNav.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── Toast Notifications ──────────────────────
function showToast(message, type = 'info', duration = 4000) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const icons = { success: '✅', error: '❌', warning: '⚠️', info: 'ℹ️' };
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.innerHTML = `
    <span class="toast-icon">${icons[type] || icons.info}</span>
    <span class="toast-msg">${message}</span>
    <span class="toast-close" onclick="this.parentElement.remove()">✕</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('exit');
    setTimeout(() => toast.remove(), 320);
  }, duration);
}

// ── Scroll Reveal ────────────────────────────
function initScrollReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => observer.observe(el));
}

// ── Button Ripple ────────────────────────────
function initRipple() {
  document.addEventListener('click', e => {
    const btn = e.target.closest('.btn');
    if (!btn) return;
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      width:${size}px; height:${size}px;
      left:${e.clientX - rect.left - size/2}px;
      top:${e.clientY - rect.top - size/2}px;
    `;
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);
  });
}

// ── Counter Animation ────────────────────────
function animateCounter(el, target, duration = 1800, suffix = '') {
  const start = performance.now();
  const startVal = 0;
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3); // ease-out cubic
    const current = Math.round(startVal + (target - startVal) * ease);
    el.textContent = current.toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.counter);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, 2000, suffix);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ── Smooth Scroll for anchor links ───────────
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ── Favorites (LocalStorage) ─────────────────
function getFavorites() {
  return JSON.parse(localStorage.getItem('rc_favorites') || '[]');
}
function toggleFavorite(id) {
  const favs = getFavorites();
  const idx = favs.indexOf(id);
  if (idx === -1) {
    favs.push(id);
    showToast('Added to favourites ❤️', 'success');
  } else {
    favs.splice(idx, 1);
    showToast('Removed from favourites', 'info');
  }
  localStorage.setItem('rc_favorites', JSON.stringify(favs));
  return favs.indexOf(id) !== -1;
}
function isFavorite(id) {
  return getFavorites().includes(id);
}

// ── Format price ─────────────────────────────
function formatPrice(amount, currency = 'UGX') {
  if (currency === 'UGX') {
    return `UGX ${amount.toLocaleString()}`;
  }
  return `${currency} ${amount.toLocaleString()}`;
}

// ── Navbar HTML builder (reused across pages) ─
function buildNavbar(activePage = '') {
  const links = [
    { href: 'index.html',      label: 'Home' },
    { href: 'properties.html', label: 'Properties' },
    { href: 'about.html',      label: 'About' },
    { href: 'contact.html',    label: 'Contact' },
  ];

  const navLinks = links.map(l =>
    `<a href="${l.href}" class="nav-link${activePage === l.href ? ' active' : ''}">${l.label}</a>`
  ).join('');

  const mobileLinks = links.map(l =>
    `<a href="${l.href}" class="nav-link${activePage === l.href ? ' active' : ''}">${l.label}</a>`
  ).join('');

  const isLoggedIn = !!localStorage.getItem('rc_user');
  const authButtons = isLoggedIn
    ? `<a href="dashboard.html" class="btn btn-ghost btn-sm">Dashboard</a>`
    : `<a href="login.html" class="nav-link">Login</a><a href="register.html" class="btn btn-coral btn-sm">List Property</a>`;

  return `
    <nav class="navbar" id="navbar">
      <div class="container navbar-inner">
        <a href="index.html" class="logo">
          <div class="logo-icon">🏠</div>
          <span class="logo-text">RentConnect</span>
        </a>
        <div class="nav-links">${navLinks}</div>
        <div class="nav-cta">
          <button class="theme-toggle" aria-label="Toggle theme">🌙</button>
          ${authButtons}
          <button class="hamburger" id="hamburger" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </nav>
    <div class="mobile-nav" id="mobile-nav">
      ${mobileLinks}
      <div class="mobile-nav-cta">
        ${isLoggedIn
          ? `<a href="dashboard.html" class="btn btn-primary">Dashboard</a>`
          : `<a href="login.html" class="btn btn-outline">Login</a><a href="register.html" class="btn btn-coral">List Property</a>`}
      </div>
    </div>
  `;
}

// ── Footer HTML builder ───────────────────────
function buildFooter() {
  return `
    <footer class="footer">
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="logo">
              <div class="logo-icon">🏠</div>
              <span class="logo-text">RentConnect</span>
            </div>
            <p>Uganda's premier rental marketplace connecting landlords and renters seamlessly since 2022.</p>
            <div class="footer-social">
              <a href="#" class="social-icon" aria-label="Facebook">📘</a>
              <a href="#" class="social-icon" aria-label="Twitter">🐦</a>
              <a href="#" class="social-icon" aria-label="Instagram">📸</a>
              <a href="#" class="social-icon" aria-label="LinkedIn">💼</a>
            </div>
          </div>
          <div class="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="about.html">About Us</a></li>
              <li><a href="contact.html">Contact</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Rentals</h4>
            <ul>
              <li><a href="properties.html">Browse Properties</a></li>
              <li><a href="landlords.html">List Your Property</a></li>
              <li><a href="#">Pricing</a></li>
              <li><a href="#">Featured Listings</a></li>
              <li><a href="#">New Listings</a></li>
            </ul>
          </div>
          <div class="footer-col">
            <h4>Support</h4>
            <ul>
              <li><a href="contact.html#faq">FAQ</a></li>
              <li><a href="#">Help Centre</a></li>
              <li><a href="#">Safety Tips</a></li>
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <p>© ${new Date().getFullYear()} RentConnect Uganda. All rights reserved.</p>
          <p>Made with ❤️ in Kampala</p>
        </div>
      </div>
    </footer>
  `;
}

// ── Property Card builder ─────────────────────
function buildPropertyCard(prop, compact = false) {
  const fav = isFavorite(prop.id);
  const price = formatPrice(prop.price, prop.currency);
  const bedroomText = prop.bedrooms === 0 ? 'Studio' : `${prop.bedrooms} bed`;

  return `
    <article class="prop-card reveal" onclick="window.location='property-details.html?id=${prop.id}'">
      <div class="prop-card-img">
        <img src="${prop.images[0]}" alt="${prop.title}" loading="lazy">
        <span class="prop-card-badge">${prop.type}</span>
        <button class="prop-card-fav ${fav ? 'active' : ''}"
          onclick="event.stopPropagation(); handleFavClick(this, ${prop.id})"
          aria-label="Toggle favourite">
          ${fav ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="prop-card-body">
        <div class="prop-card-type">${prop.type}</div>
        <h3 class="prop-card-title">${prop.title}</h3>
        <p class="prop-card-loc">📍 ${prop.location}</p>
        <div class="prop-card-meta">
          <span>🛏 ${bedroomText}</span>
          <span>🚿 ${prop.bathrooms} bath</span>
          <span>📐 ${prop.area}m²</span>
        </div>
        <div class="prop-card-footer">
          <div class="prop-price">
            ${price}
            <small>/month</small>
          </div>
          <span class="prop-available ${prop.available ? 'yes' : 'no'}">
            ${prop.available ? '● Available' : '● Rented'}
          </span>
        </div>
      </div>
    </article>
  `;
}

function handleFavClick(btn, id) {
  const isNowFav = toggleFavorite(id);
  btn.classList.toggle('active', isNowFav);
  btn.innerHTML = isNowFav ? '❤️' : '🤍';
}

// ── Init everything ───────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initThemeToggle();
  initScrollReveal();
  initRipple();
  initCounters();
  initSmoothScroll();
});
