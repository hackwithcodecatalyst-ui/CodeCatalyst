// Theme toggle with localStorage
(function () {
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('cc-theme');
  if (stored) document.documentElement.setAttribute('data-theme', stored);
  toggle?.addEventListener('click', () => {
    const current = root.getAttribute('data-theme') || 'dark';
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('cc-theme', next);
  });
})();

// Mobile nav toggle
(function () {
  const nav = document.querySelector('.site-nav');
  const button = document.getElementById('navToggle');
  button?.addEventListener('click', () => {
    const expanded = button.getAttribute('aria-expanded') === 'true';
    button.setAttribute('aria-expanded', String(!expanded));
    nav?.classList.toggle('open');
  });
})();

// Smooth scroll for internal links
(function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (!href || href.length < 2) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();

// Reveal on scroll
(function () {
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.15 }
  );
  document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
})();

// Particles background (no deps)
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let width = 0, height = 0, rafId = 0;

  const colors = [
    'rgba(124, 58, 237, 0.8)',
    'rgba(34, 211, 238, 0.8)',
    'rgba(6, 182, 212, 0.8)'
  ];

  const particles = Array.from({ length: 90 }, () => ({
    x: Math.random(),
    y: Math.random(),
    vx: (Math.random() - 0.5) * 0.08,
    vy: (Math.random() - 0.5) * 0.08,
    r: Math.random() * 1.8 + 0.6,
    c: colors[Math.floor(Math.random() * colors.length)]
  }));

  function resize() {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
    canvas.width = Math.floor(width * DPR);
    canvas.height = Math.floor(height * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }
  resize();
  window.addEventListener('resize', resize);

  function draw() {
    ctx.clearRect(0, 0, width, height);
    // subtle starfield
    for (let i = 0; i < 40; i++) {
      const sx = (i * 97) % width;
      const sy = (i * 53) % height;
      ctx.fillStyle = 'rgba(255,255,255,0.03)';
      ctx.fillRect(sx, sy, 2, 2);
    }
    // move and draw particles
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > 1) p.vx *= -1;
      if (p.y < 0 || p.y > 1) p.vy *= -1;
      const px = p.x * width;
      const py = p.y * height;
      ctx.beginPath();
      ctx.arc(px, py, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.c;
      ctx.globalCompositeOperation = 'lighter';
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
    }
    // connect close particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i];
        const b = particles[j];
        const dx = (a.x - b.x) * width;
        const dy = (a.y - b.y) * height;
        const d2 = dx * dx + dy * dy;
        if (d2 < 120 * 120) {
          const alpha = 1 - d2 / (120 * 120);
          ctx.strokeStyle = `rgba(124,58,237,${0.08 * alpha})`;
          ctx.beginPath();
          ctx.moveTo(a.x * width, a.y * height);
          ctx.lineTo(b.x * width, b.y * height);
          ctx.stroke();
        }
      }
    }
    rafId = requestAnimationFrame(draw);
  }

  draw();

  // clock year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear().toString();

  // cleanup if needed (SPA hooks could cancel)
  window.addEventListener('beforeunload', () => cancelAnimationFrame(rafId));
})();


