(() => {
  'use strict';
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const siteNav = document.querySelector('.site-nav');
  const preloader = document.querySelector('.preloader');
  const backToTop = document.querySelector('.back-to-top');

  window.addEventListener('load', () => {
    window.setTimeout(() => preloader?.classList.add('is-done'), reducedMotion ? 0 : 650);
  });

  const closeMenu = () => {
    menuToggle?.setAttribute('aria-expanded', 'false');
    siteNav?.classList.remove('open');
    document.body.classList.remove('menu-open');
  };
  menuToggle?.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    siteNav?.classList.toggle('open', !expanded);
    document.body.classList.toggle('menu-open', !expanded);
  });
  siteNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

  const onScroll = () => {
    header?.classList.toggle('scrolled', window.scrollY > 30);
    backToTop?.classList.toggle('is-visible', window.scrollY > 700);
    document.querySelectorAll('[data-parallax]').forEach(el => {
      if (reducedMotion) return;
      const speed = Number(el.dataset.parallax || 0.08);
      const rect = el.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) el.style.transform = `translate3d(0, ${rect.top * speed * -0.18}px, 0) scale(1.04)`;
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el => revealObserver.observe(el));

  const countObserver = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target; const target = Number(el.dataset.count || 0); const duration = reducedMotion ? 0 : 1300; const start = performance.now();
    const tick = now => { const progress = duration ? Math.min((now - start) / duration, 1) : 1; el.textContent = Math.floor(progress * target).toLocaleString('en-IN'); if (progress < 1) requestAnimationFrame(tick); };
    requestAnimationFrame(tick); countObserver.unobserve(el);
  }), { threshold: 0.8 });
  document.querySelectorAll('[data-count]').forEach(el => countObserver.observe(el));

  const treeGrid = document.querySelector('#tree-grid');
  if (treeGrid) {
    for (let i = 0; i < 20; i++) { const tree = document.createElement('span'); tree.className = 'tree-dot'; tree.setAttribute('aria-label', `Tree ${i + 1}`); treeGrid.appendChild(tree); }
    const treeObserver = new IntersectionObserver(entries => { if (entries[0].isIntersecting) { treeGrid.querySelectorAll('.tree-dot').forEach((tree, i) => window.setTimeout(() => tree.classList.add('is-visible'), reducedMotion ? 0 : i * 65)); treeObserver.disconnect(); } }, { threshold: .3 });
    treeObserver.observe(treeGrid);
  }

  const priceInput = document.querySelector('#plotPrice'); const monthsInput = document.querySelector('#emiMonths'); const monthOutput = document.querySelector('#monthOutput'); const emiOutput = document.querySelector('#emiOutput');
  const updateEmi = () => { const price = Number(priceInput?.value || 0); const months = Number(monthsInput?.value || 12); if (monthOutput) monthOutput.textContent = months; if (emiOutput) emiOutput.textContent = price > 0 ? `₹${Math.round(price / months).toLocaleString('en-IN')}` : '—'; };
  priceInput?.addEventListener('input', updateEmi); monthsInput?.addEventListener('input', updateEmi); updateEmi();

  const horizonRange = document.querySelector('#horizonRange'); const horizonOutput = document.querySelector('#horizonOutput'); const horizonTitle = document.querySelector('#horizonTitle');
  const horizonLabels = { 12: 'Early maturity review', 13: 'Care & valuation review', 14: 'Readiness review', 15: 'Maturity window review' };
  horizonRange?.addEventListener('input', () => { const value = horizonRange.value; if (horizonOutput) horizonOutput.textContent = `${value} years`; if (horizonTitle) horizonTitle.textContent = horizonLabels[value] || 'Planning review'; });

  const sections = [...document.querySelectorAll('main section[id]')]; const navLinks = [...document.querySelectorAll('.site-nav a[href^="#"]')];
  const activeObserver = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`)); }), { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(section => activeObserver.observe(section));

  document.querySelectorAll('[data-brochure]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' }); window.setTimeout(() => document.querySelector('#message')?.focus(), 500); }));

  const lightbox = document.querySelector('#lightbox'); const lightboxImage = lightbox?.querySelector('img'); const lightboxCaption = lightbox?.querySelector('p'); const closeLightbox = () => { lightbox?.classList.remove('open'); lightbox?.setAttribute('aria-hidden', 'true'); document.body.classList.remove('menu-open'); };
  document.querySelectorAll('[data-lightbox]').forEach(item => item.addEventListener('click', () => { if (!lightbox) return; lightboxImage.src = item.dataset.lightbox; lightboxImage.alt = item.querySelector('img')?.alt || ''; lightboxCaption.textContent = item.dataset.caption || ''; lightbox.classList.add('open'); lightbox.setAttribute('aria-hidden', 'false'); document.body.classList.add('menu-open'); lightbox.querySelector('.lightbox-close')?.focus(); }));
  lightbox?.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox); lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); }); document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeLightbox(); closeMenu(); } });

  const form = document.querySelector('#enquiryForm'); const status = document.querySelector('#formStatus');
  form?.addEventListener('submit', event => { event.preventDefault(); let valid = true; form.querySelectorAll('.field').forEach(field => { const input = field.querySelector('input,textarea,select'); const error = field.querySelector('.field-error'); if (input?.required && !input.value.trim()) { valid = false; if (error) error.textContent = 'Please add this detail.'; input?.setAttribute('aria-invalid', 'true'); } else if (input?.type === 'tel' && input.value.trim() && !/[0-9+()\-\s]{8,}/.test(input.value)) { valid = false; if (error) error.textContent = 'Please check the phone number.'; input?.setAttribute('aria-invalid', 'true'); } else if (input?.type === 'email' && input.value.trim() && !/^\S+@\S+\.\S+$/.test(input.value)) { valid = false; if (error) error.textContent = 'Please check the email address.'; input?.setAttribute('aria-invalid', 'true'); } else { if (error) error.textContent = ''; input?.removeAttribute('aria-invalid'); } }); if (!valid) { status.textContent = 'Please check the highlighted fields.'; status.className = 'form-status error'; form.querySelector('[aria-invalid="true"]')?.focus(); return; } status.textContent = 'Thank you. Your enquiry is ready for an approved Pentora follow-up workflow.'; status.className = 'form-status'; form.reset(); updateEmi(); });

  document.querySelector('#year')?.append(new Date().getFullYear());
})();
