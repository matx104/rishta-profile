// ─── Share Modal ───
const SHARE_URL = 'https://matx104.github.io/rishta-profile/';
const SHARE_LINKS = '\n🌐 Profile: https://matx104.github.io/rishta-profile/\n💼 LinkedIn: https://linkedin.com/in/matx104\n💻 GitHub: https://github.com/matx104\n🏆 Certifications: https://credly.com/users/matx104\n🔗 All Links: https://linktr.ee/matx104';
const SHARE_DUA = '\n\nJazakAllahu Khairan.\nMay Allah guide us all to what is best. Ameen. 🤲';

const SHARE_MSGS = {
  whatsapp: {
    formal: `Assalamu Alaikum wa Rahmatullahi wa Barakatuh,\n\nWe would like to share the Rishta profile of Muhammad Abdullah Tariq.\n\nHe is a Hafiz-ul-Qur'an, CISSP-certified Multi-Cloud Security Architect with 60+ global certifications and 6+ years of enterprise experience. He comes from a respected, religious, and family-oriented household in Karachi.\n\nPlease view his full profile and verify credentials here:${SHARE_LINKS}${SHARE_DUA}`,
    casual: `Assalamu Alaikum! 👋\n\nCheck out Muhammad Abdullah Tariq's Rishta Profile — Hafiz-ul-Qur'an, CISSP, Cloud Security Architect, 60+ certs, speaks 7 languages, and much more.${SHARE_LINKS}${SHARE_DUA}`
  },
  telegram: {
    formal: `Assalamu Alaikum wa Rahmatullahi wa Barakatuh,\n\nSharing the Rishta profile of Muhammad Abdullah Tariq — Hafiz-ul-Qur'an, CISSP & CCSP certified, Lead CloudOps Manager with 60+ certifications across AWS, GCP, and Azure. Based in Karachi, Pakistan.${SHARE_LINKS}${SHARE_DUA}`,
    casual: `Assalamu Alaikum! 👋\n\nHave a look at Muhammad Abdullah Tariq's profile — Hafiz, CISSP, Cloud Security Architect, 60+ certs, gamer, anime fan, speaks 7 languages. The full package 💪${SHARE_LINKS}${SHARE_DUA}`
  },
  sms: {
    formal: `Assalamu Alaikum wa Rahmatullahi wa Barakatuh. Sharing Rishta profile of Muhammad Abdullah Tariq — Hafiz-ul-Qur'an, CISSP, Multi-Cloud Security Architect (60+ certs). Karachi-based, respected family.${SHARE_LINKS}${SHARE_DUA}`,
    casual: `Assalamu Alaikum! Check out Muhammad Abdullah Tariq's rishta profile — Hafiz, CISSP, Cloud Security, 60+ certs and much more.${SHARE_LINKS}${SHARE_DUA}`
  },
  email: {
    formal: {
      subject: 'Rishta Profile — Muhammad Abdullah Tariq (Hafiz-ul-Qur\'an, CISSP)',
      body: `Assalamu Alaikum wa Rahmatullahi wa Barakatuh,\n\nI hope this message finds you in the best of health and Imaan.\n\nI would like to share with you the Rishta Biodata of Muhammad Abdullah Tariq.\n\nAbout him:\n• Hafiz-ul-Qur'an with 4 years of Islamic Sciences education\n• CISSP & CCSP certified Multi-Cloud Security Architect\n• 60+ global certifications (AWS, GCP, Azure, CompTIA, and more)\n• 6+ years of enterprise experience\n• Eldest of 4 brothers, from a respected family in Karachi\n\nFull Interactive Profile & Verification:${SHARE_LINKS}${SHARE_DUA}`
    },
    casual: {
      subject: 'Check out this profile! — Muhammad Abdullah Tariq',
      body: `Assalamu Alaikum! 👋\n\nWanted to share Muhammad Abdullah Tariq's rishta profile with you — Hafiz-ul-Qur'an, CISSP, Cloud Security Architect with 60+ certs, speaks 7 languages, into anime, gaming, sports, and more.\n\nHave a look:${SHARE_LINKS}${SHARE_DUA}`
    }
  }
};

function openShareModal() {
  const overlay = document.getElementById('share-overlay');
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeShareModal() {
  document.getElementById('share-overlay').classList.remove('active');
  document.body.style.overflow = '';
}

function shareVia(platform, tone) {
  if (platform === 'email') {
    const msg = SHARE_MSGS.email[tone];
    window.location.href = `mailto:?subject=${encodeURIComponent(msg.subject)}&body=${encodeURIComponent(msg.body)}`;
  } else if (platform === 'whatsapp') {
    window.open(`https://wa.me/?text=${encodeURIComponent(SHARE_MSGS.whatsapp[tone])}`, '_blank');
  } else if (platform === 'telegram') {
    window.open(`https://t.me/share/url?url=${encodeURIComponent(SHARE_URL)}&text=${encodeURIComponent(SHARE_MSGS.telegram[tone])}`, '_blank');
  } else if (platform === 'sms') {
    window.location.href = `sms:?body=${encodeURIComponent(SHARE_MSGS.sms[tone])}`;
  }
}

function copyShareLink() {
  navigator.clipboard.writeText(SHARE_URL).then(() => {
    const label = document.getElementById('copy-label');
    label.textContent = 'Copied!';
    setTimeout(() => { label.textContent = 'Copy Link'; }, 2000);
  }).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = SHARE_URL;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    const label = document.getElementById('copy-label');
    label.textContent = 'Copied!';
    setTimeout(() => { label.textContent = 'Copy Link'; }, 2000);
  });
}

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
const pages = ['home', 'about', 'deen', 'dunya', 'career', 'personality', 'philosophy', 'realm', 'projects', 'vision', 'naseeb', 'qualities', 'questions', 'gallery', 'contact'];

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
  // Load gallery if navigating to gallery page
  if (page === 'gallery') loadGallery();
  // Update page title
  const titles = {
    'home': 'Muhammad Abdullah Tariq — Rishta Profile',
    'about': 'About — Muhammad Abdullah Tariq',
    'deen': 'Deen — Muhammad Abdullah Tariq',
    'dunya': 'Dunya — Muhammad Abdullah Tariq',
    'career': 'Career — Muhammad Abdullah Tariq',
    'personality': 'Personality — Muhammad Abdullah Tariq',
    'philosophy': 'Philosophy — Muhammad Abdullah Tariq',
    'realm': 'Realm — Muhammad Abdullah Tariq',
    'projects': 'Projects — Muhammad Abdullah Tariq',
    'vision': 'Vision — Muhammad Abdullah Tariq',
    'naseeb': 'Naseeb — Muhammad Abdullah Tariq',
    'qualities': 'Qualities — Muhammad Abdullah Tariq',
    'questions': 'Questions — Muhammad Abdullah Tariq',
    'gallery': 'Gallery — Muhammad Abdullah Tariq',
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
  const nav = document.querySelector('.nav-links');
  const toggle = document.querySelector('.mobile-toggle');
  const isOpen = nav?.classList.toggle('open');
  if (toggle) toggle.textContent = isOpen ? '✕' : '☰';
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

// ─── Gallery Loader ───
function loadGallery() {
  const grid = document.getElementById('gallery-grid');
  const empty = document.getElementById('gallery-empty');
  if (!grid) return;

  const extensions = ['jpeg', 'jpg', 'png', 'webp'];
  const maxPhotos = 50;
  let loaded = 0;
  let checked = 0;
  const found = new Set();

  grid.innerHTML = '';

  for (let i = 1; i <= maxPhotos; i++) {
    for (const ext of extensions) {
      const num = i;
      const img = new Image();
      const src = `photos/${num}.${ext}`;
      img.src = src;
      img.onload = () => {
        if (found.has(num)) return; // skip duplicate extensions for same number
        found.add(num);
        img.alt = `Photo ${num}`;
        img.className = 'gallery-item';
        img.style.cursor = 'pointer';
        grid.appendChild(img);
        loaded++;
        empty.style.display = 'none';
        img.addEventListener('click', () => openLightbox(img.src, img.alt));
      };
      img.onerror = () => {
        checked++;
        if (checked >= maxPhotos * extensions.length && loaded === 0) {
          empty.style.display = 'block';
        }
      };
    }
  }

  // Fallback timeout
  setTimeout(() => {
    if (loaded === 0) empty.style.display = 'block';
  }, 3000);
}

function openLightbox(src, alt) {
  const overlay = document.createElement('div');
  overlay.className = 'lightbox-overlay';
  overlay.innerHTML = `<img src="${src}" alt="${alt}"><span class="lightbox-close">&times;</span>`;
  overlay.addEventListener('click', () => overlay.remove());
  document.body.appendChild(overlay);
}

// ─── Monarch Particle System ───
function initMonarchParticles() {
  const canvas = document.getElementById('monarch-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles, veins;
  const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark';

  function resize() {
    w = canvas.width = window.innerWidth;
    h = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    const count = Math.min(Math.floor((w * h) / 18000), 80);
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        type: Math.random() < 0.5 ? 'gold' : (Math.random() < 0.5 ? 'silver' : 'emerald'),
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.005
      });
    }
  }

  function createVeins() {
    veins = [];
    const veinCount = Math.min(Math.floor(w / 200), 6);
    for (let i = 0; i < veinCount; i++) {
      const points = [];
      const startY = Math.random() * h;
      let x = -50, y = startY;
      while (x < w + 50) {
        points.push({ x, y });
        x += Math.random() * 80 + 40;
        y += (Math.random() - 0.5) * 60;
      }
      veins.push({
        points,
        type: Math.random() < 0.4 ? 'gold' : (Math.random() < 0.5 ? 'silver' : 'obsidian'),
        width: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.06 + 0.02,
        offset: Math.random() * 1000
      });
    }
  }

  function draw(time) {
    ctx.clearRect(0, 0, w, h);
    const dark = isDark();

    // Draw veins
    veins.forEach(v => {
      const shift = Math.sin(time * 0.0003 + v.offset) * 5;
      ctx.beginPath();
      ctx.moveTo(v.points[0].x, v.points[0].y + shift);
      for (let i = 1; i < v.points.length - 1; i++) {
        const xc = (v.points[i].x + v.points[i + 1].x) / 2;
        const yc = (v.points[i].y + v.points[i + 1].y + shift) / 2;
        ctx.quadraticCurveTo(v.points[i].x, v.points[i].y + shift, xc, yc);
      }
      const colors = {
        gold: dark ? 'rgba(212,175,55,' : 'rgba(160,120,20,',
        silver: dark ? 'rgba(168,178,188,' : 'rgba(110,120,130,',
        obsidian: dark ? 'rgba(200,200,200,' : 'rgba(10,10,10,'
      };
      const veinOpacity = v.opacity * (dark ? 1 : 1.8) * (0.8 + Math.sin(time * 0.001 + v.offset) * 0.2);
      ctx.strokeStyle = colors[v.type] + veinOpacity + ')';
      ctx.lineWidth = v.width;
      ctx.stroke();
    });

    // Draw particles
    particles.forEach(p => {
      p.x += p.dx;
      p.y += p.dy;
      p.pulse += p.pulseSpeed;

      if (p.x < -10) p.x = w + 10;
      if (p.x > w + 10) p.x = -10;
      if (p.y < -10) p.y = h + 10;
      if (p.y > h + 10) p.y = -10;

      const glow = 0.3 + Math.sin(p.pulse) * 0.2;
      const colors = {
        gold: dark ? `rgba(212,175,55,${glow})` : `rgba(170,130,20,${glow * 0.85})`,
        silver: dark ? `rgba(176,184,193,${glow * 0.8})` : `rgba(120,130,140,${glow * 0.7})`,
        emerald: dark ? `rgba(46,204,113,${glow * 0.7})` : `rgba(15,61,54,${glow * 0.6})`
      };

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * (0.8 + Math.sin(p.pulse) * 0.2), 0, Math.PI * 2);
      ctx.fillStyle = colors[p.type];
      ctx.fill();

      // Glow
      if (p.r > 1.2) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
        const glowColor = p.type === 'gold' ? `rgba(197,152,30,${glow * (dark ? 0.08 : 0.12)})` :
                          p.type === 'silver' ? `rgba(140,150,160,${glow * (dark ? 0.06 : 0.10)})` :
                          `rgba(15,61,54,${glow * (dark ? 0.06 : 0.10)})`;
        ctx.fillStyle = glowColor;
        ctx.fill();
      }
    });

    requestAnimationFrame(draw);
  }

  resize();
  createParticles();
  createVeins();
  requestAnimationFrame(draw);
  window.addEventListener('resize', () => { resize(); createParticles(); createVeins(); });
}

// ─── Init ───
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initMonarchParticles();
  handleRoute();
  initScrollReveal();

  // Nav link clicks
  document.querySelectorAll('.nav-links a[data-page]').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      navigateTo(a.getAttribute('data-page'));
      // Close mobile nav
      const nav = document.querySelector('.nav-links');
      const toggle = document.querySelector('.mobile-toggle');
      if (nav?.classList.contains('open')) {
        nav.classList.remove('open');
        if (toggle) toggle.textContent = '☰';
      }
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
      if (toggle) toggle.textContent = '☰';
    }
  });
});

// Handle back/forward
window.addEventListener('popstate', handleRoute);
