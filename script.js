document.addEventListener('DOMContentLoaded', () => {
  const $ = (s, root = document) => root.querySelector(s), $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const header = $('.header'), nav = $('.nav'), toggle = $('.menu-toggle'), preloader = $('.preloader'), reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const menuLabels = document.documentElement.lang === 'hi' ? { open: 'नेविगेशन खोलें', close: 'नेविगेशन बंद करें' } : { open: 'Open navigation', close: 'Close navigation' };
  $('#year').textContent = new Date().getFullYear();
  const closeMenu = () => { nav.classList.remove('open'); toggle.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); toggle.setAttribute('aria-label', menuLabels.open) };
  toggle?.addEventListener('click', () => { const open = !nav.classList.contains('open'); nav.classList.toggle('open', open); toggle.classList.toggle('open', open); toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? menuLabels.close : menuLabels.open) });
  $$('.nav a').forEach(a => a.addEventListener('click', closeMenu));
  const sections = $$('main section[id]'), links = $$('.nav-link');
  const onScroll = () => { header.classList.toggle('scrolled', scrollY > 20); const max = document.documentElement.scrollHeight - innerHeight; $('.scroll-progress span').style.width = (max > 0 ? scrollY / max * 100 : 0) + '%' };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  const observer = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id)) } }), { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach(s => observer.observe(s));
  // Accessible portfolio filtering and image preview.
  const filterButtons = $$('.filter-btn'), portfolioItems = $$('.portfolio-item');
  filterButtons.forEach(btn => btn.addEventListener('click', () => { filterButtons.forEach(b => b.classList.toggle('active', b === btn)); const f = btn.dataset.filter; portfolioItems.forEach(item => { const show = f === 'all' || item.dataset.category === f; item.classList.toggle('filtered-out', !show); if (window.gsap && !reduced && show) gsap.fromTo(item, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: .4, ease: 'power2.out' }) }) }));
  const lightbox = $('.lightbox'), lightImg = lightbox ? $('img', lightbox) : null, lightText = lightbox ? $('p', lightbox) : null, closeLightbox = () => { lightbox?.classList.remove('open'); document.body.style.overflow = '' };
  portfolioItems.forEach(item => item.addEventListener('click', () => { if (!lightbox || !lightImg || !lightText) return; const img = $('img', item); lightImg.src = img.src; lightImg.alt = img.alt; lightText.textContent = item.dataset.title || img.alt; lightbox.classList.add('open'); document.body.style.overflow = 'hidden' }));
  $('.lightbox-close')?.addEventListener('click', closeLightbox); lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox() }); document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeLightbox(); closeMenu() } });
  // WhatsApp enquiry form: validates locally and prepares a message for the business number.
  const contactForm = $('#contactForm');
  contactForm?.addEventListener('submit', e => {
    e.preventDefault();
    if (!contactForm.reportValidity()) return;
    const data = new FormData(contactForm);
    const message = ['Hello GEN Z STUDIO & ACADEMY, I would like to discuss a project.', '', `Name: ${data.get('name')}`, `Phone: ${data.get('phone')}`, `Service: ${data.get('service')}`, `Project details: ${data.get('message') || 'Not provided'}`].join('\n');
    window.open('https://wa.me/919351166386?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  });
  // Progressive enhancement: content remains visible if GSAP is unavailable or motion is reduced.
  if (window.gsap && window.ScrollTrigger && !reduced) {
    gsap.registerPlugin(ScrollTrigger);
    const intro = gsap.timeline({ defaults: { ease: 'power3.out' }, onComplete: () => { preloader?.remove() } });
    intro.to('.loader-track i', { scaleX: 1, duration: .65, ease: 'power2.inOut' }).to(preloader, { autoAlpha: 0, duration: .45 }, '+=.08');
    intro.from('.hero-copy .eyebrow', { y: 14, opacity: 0, duration: .5 }, '-=.25').from('.hero h1', { y: 38, opacity: 0, duration: .85 }, '-=.18').from('.hero-lead,.hero-actions,.hero-meta', { y: 18, opacity: 0, stagger: .12, duration: .6 }, '-=.4').from('.hero-photo-main', { clipPath: 'inset(0 0 100% 0)', duration: 1.05, ease: 'power4.out' }, '-=.85').from('.hero-photo-small,.hero-stamp', { y: 18, opacity: 0, stagger: .13, duration: .55 }, '-=.55');
    $$('.section-label,.section-title,.section-aside,.about-intro,.about-belief,.why-copy,.location-copy>p').forEach(el => gsap.fromTo(el, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .75, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
    $$('.service-card,.benefit,.process-step,.insight-card,.faq-item,.value-item,.founder,.contact-line').forEach((el, i) => gsap.fromTo(el, { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .65, delay: (i % 3) * .06, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%', once: true } }));
    $$('.about-photo,.portfolio-item,.location-visual').forEach(el => gsap.fromTo(el, { clipPath: 'inset(12% 0 12% 0)', opacity: .55 }, { clipPath: 'inset(0% 0 0% 0)', opacity: 1, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', once: true } }));
    gsap.to('.hero-photo-main img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 } });
    gsap.to('.image-break-bg img', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '.image-break', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    gsap.to('.final-cta-image img', { yPercent: 8, ease: 'none', scrollTrigger: { trigger: '.final-cta', start: 'top bottom', end: 'bottom top', scrub: 1 } });
    gsap.from('.about-feature', { y: 25, opacity: 0, duration: .8, ease: 'power3.out', scrollTrigger: { trigger: '.about-feature', start: 'top 80%', once: true } });
    gsap.from('.marquee-track', { x: 80, ease: 'none', scrollTrigger: { trigger: '.marquee', start: 'top bottom', end: 'bottom top', scrub: 1 } });
  } else { preloader?.remove(); $$('.reveal').forEach(el => { el.style.opacity = 1; el.style.transform = 'none' }) }
});