// ==========================================================================
// Diksha Singh Portfolio — interactions
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

  if (window.lucide) { lucide.createIcons(); }

  /* ---------------- Navbar scroll state ---------------- */
  const navbar = document.getElementById('navbar');
  const toTop = document.getElementById('toTop');

  function onScroll(){
    if (window.scrollY > 24) { navbar.classList.add('scrolled'); }
    else { navbar.classList.remove('scrolled'); }

    if (window.scrollY > 600) { toTop.classList.add('show'); }
    else { toTop.classList.remove('show'); }
  }
  window.addEventListener('scroll', onScroll, { passive:true });
  onScroll();

  toTop.addEventListener('click', () => {
    window.scrollTo({ top:0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  });

  function prefersReducedMotion(){
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  /* ---------------- Mobile menu ---------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  /* ---------------- Smooth scroll + close mobile menu on nav click ---------------- */
  document.querySelectorAll('[data-nav]').forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block:'start' });
        }
        if (mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      }
    });
  });

  /* ---------------- Active section highlighting ---------------- */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navAnchors = Array.from(document.querySelectorAll('.nav-links a[data-nav]'));

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      const navLink = navAnchors.find(a => a.getAttribute('href') === '#' + id);
      if (!navLink) return;
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        navLink.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });

  sections.forEach(sec => sectionObserver.observe(sec));

  /* ---------------- Scroll reveal ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------- Certificate filter + search ---------------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const certCards = document.querySelectorAll('.cert-card');
  const certSearch = document.getElementById('certSearch');
  const noResults = document.getElementById('noResults');
  let currentFilter = 'all';

  function applyCertFilters(){
    const query = (certSearch.value || '').trim().toLowerCase();
    let visibleCount = 0;

    certCards.forEach(card => {
      const cat = card.getAttribute('data-cat');
      const name = card.getAttribute('data-name') || '';
      const matchesFilter = currentFilter === 'all' || cat === currentFilter;
      const matchesSearch = query === '' || name.includes(query);

      if (matchesFilter && matchesSearch) {
        card.classList.remove('hidden');
        visibleCount++;
      } else {
        card.classList.add('hidden');
      }
    });

    noResults.classList.toggle('show', visibleCount === 0);
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.getAttribute('data-filter');
      applyCertFilters();
    });
  });

  certSearch.addEventListener('input', applyCertFilters);

  /* ---------------- Certificate modal ---------------- */
  const certData = [
    {
      cat: 'Database / Cloud',
      title: 'Oracle Certified Foundations Associate',
      issuer: 'Oracle University',
      img: 'cert-oracle.png',
      details: [
        ['Program', 'Oracle Data Platform 2025 Certified Foundations Associate'],
        ['Date', 'June 5, 2026'],
        ['Certificate ID', '103469688OCI25DCFA']
      ],
      verifyUrl: null
    },
    {
      cat: 'Programming',
      title: 'Computer Programming',
      issuer: 'NeoColab (iamNeo, an NIIT Venture)',
      img: 'cert-neocolab.png',
      details: [
        ['Duration', '150 Hours (Jan 18 – May 20, 2026)'],
        ['Issued', 'May 21, 2026'],
        ['Certificate No.', '17bg5dh7Ai0B11D63BJ1']
      ],
      verifyUrl: null
    },
    {
      cat: 'Python',
      title: 'Introduction to Python',
      issuer: 'Infosys Springboard',
      img: 'cert-python-intro.png',
      details: [
        ['Completed', 'June 16, 2026'],
        ['Issued', 'July 20, 2026']
      ],
      verifyUrl: 'https://verify.onwingspan.com'
    },
    {
      cat: 'Python',
      title: 'Programming Fundamentals using Python – Part 1',
      issuer: 'Infosys Springboard',
      img: 'cert-python-fundamentals.png',
      details: [
        ['Completed / Issued', 'July 20, 2026']
      ],
      verifyUrl: 'https://verify.onwingspan.com'
    },
    {
      cat: 'AI / Cyber Security',
      title: 'Introduction to Cyber Security',
      issuer: 'Infosys Springboard',
      img: 'cert-cybersecurity.png',
      details: [
        ['Completed / Issued', 'March 25, 2026']
      ],
      verifyUrl: 'https://verify.onwingspan.com'
    },
    {
      cat: 'Other',
      title: 'ESL001: Elementary English as a Second Language',
      issuer: 'Saylor Academy',
      img: 'cert-esl-saylor.png',
      details: [
        ['Issue Date', 'April 26, 2026'],
        ['Certificate ID', '0914417415DS']
      ],
      verifyUrl: null
    }
  ];

  const modal = document.getElementById('certModal');
  const modalImg = document.getElementById('modalImg');
  const modalCat = document.getElementById('modalCat');
  const modalTitle = document.getElementById('modalTitle');
  const modalIssuer = document.getElementById('modalIssuer');
  const modalDetails = document.getElementById('modalDetails');
  const modalActions = document.getElementById('modalActions');
  const modalClose = document.getElementById('modalClose');
  let lastFocusedEl = null;

  function openModal(index){
    const cert = certData[index];
    if (!cert) return;

    modalImg.src = cert.img;
    modalImg.alt = cert.title + ' certificate';
    modalCat.textContent = cert.cat;
    modalTitle.textContent = cert.title;
    modalIssuer.textContent = cert.issuer;

    modalDetails.innerHTML = '';
    cert.details.forEach(([label, value]) => {
      const row = document.createElement('div');
      row.className = 'modal-detail-row';
      row.innerHTML = `<span>${label}</span><span>${value}</span>`;
      modalDetails.appendChild(row);
    });

    modalActions.innerHTML = '';
    if (cert.verifyUrl) {
      const a = document.createElement('a');
      a.href = cert.verifyUrl;
      a.target = '_blank';
      a.rel = 'noopener';
      a.className = 'btn btn-primary btn-sm';
      a.textContent = 'Verify Certificate';
      modalActions.appendChild(a);
    }
    const download = document.createElement('a');
    download.href = cert.img;
    download.target = '_blank';
    download.rel = 'noopener';
    download.className = 'btn btn-outline btn-sm';
    download.textContent = 'Open Full Image';
    modalActions.appendChild(download);

    lastFocusedEl = document.activeElement;
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }

  function closeModal(){
    modal.classList.remove('open');
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  document.querySelectorAll('[data-modal-trigger]').forEach(el => {
    el.addEventListener('click', () => openModal(parseInt(el.getAttribute('data-modal-trigger'), 10)));
    if (el.tagName === 'DIV') {
      el.setAttribute('tabindex', '0');
      el.setAttribute('role', 'button');
      el.setAttribute('aria-label', 'View certificate full size');
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openModal(parseInt(el.getAttribute('data-modal-trigger'), 10)); }
      });
    }
  });

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('open')) closeModal(); });

  /* ---------------- Contact form ---------------- */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:diksha11singh05@gmail.com?subject=${subject}&body=${body}`;

    formNote.textContent = 'Opening your email client with this message pre-filled…';
    formNote.classList.add('show');
  });

});
