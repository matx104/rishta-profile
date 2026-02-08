// ─── Theme Toggle ───
function initTheme() {
  const saved = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');
  document.documentElement.setAttribute('data-theme', theme);
  updateThemeIcon(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateThemeIcon(next);
}

function updateThemeIcon(theme) {
  const btn = document.querySelector('.theme-toggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// ─── SPA Router ───
const pages = ['home', 'about', 'career', 'personality', 'looking-for', 'contact'];

function navigateTo(page) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  // Show target page
  const target = document.getElementById(`page-${page}`);
  if (target) {
    target.classList.add('active');
    // Trigger reveal animations
    setTimeout(() => {
      target.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
    }, 100);
  }
  // Update nav active state
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-page') === page);
  });
  // Close mobile nav
  document.querySelector('.nav-links')?.classList.remove('open');
  // Update URL hash
  history.pushState(null, '', `#${page}`);
  // Scroll to top
  window.scrollTo({ top: 0, behavior: 'smooth' });
  // Update page title
  const titles = {
    'home': 'Muhammad Abdullah Tariq — Rishta Profile',
    'about': 'About — Muhammad Abdullah Tariq',
    'career': 'Career — Muhammad Abdullah Tariq',
    'personality': 'Personality — Muhammad Abdullah Tariq',
    'looking-for': 'Looking For — Muhammad Abdullah Tariq',
    'contact': 'Contact — Muhammad Abdullah Tariq'
  };
  document.title = titles[page] || titles['home'];
}

function handleRoute() {
  const hash = window.location.hash.slice(1) || 'home';
  navigateTo(hash);
}

// ─── Mobile Nav Toggle ───
function toggleMobileNav() {
  document.querySelector('.nav-links')?.classList.toggle('open');
}

// ─── Scroll Reveal ───
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

// ─── Animate Numbers ───
function animateNumbers() {
  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    const suffix = el.getAttribute('data-suffix') || '';
    let current = 0;
    const increment = Math.ceil(target / 40);
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        current = target;
        clearInterval(timer);
      }
      el.textContent = current + suffix;
    }, 30);
  });
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  handleRoute();
  initScrollReveal();

  // Nav link clicks
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(a.getAttribute('data-page'));
    });
  });

  // Theme toggle
  document.querySelector('.theme-toggle')?.addEventListener('click', toggleTheme);

  // Mobile toggle
  document.querySelector('.mobile-toggle')?.addEventListener('click', toggleMobileNav);

  // Animate hero numbers on load
  setTimeout(animateNumbers, 500);

  // Close mobile nav on outside click
  document.addEventListener('click', (e) => {
    const nav = document.querySelector('.nav-links');
    const toggle = document.querySelector('.mobile-toggle');
    if (nav?.classList.contains('open') && !nav.contains(e.target) && !toggle.contains(e.target)) {
      nav.classList.remove('open');
    }
  });
});

// Handle back/forward
window.addEventListener('popstate', handleRoute);
