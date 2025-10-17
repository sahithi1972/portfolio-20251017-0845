// ...existing code...
document.addEventListener('DOMContentLoaded', () => {
  const navMenu = document.querySelector('.nav-menu');
  const hamburger = document.querySelector('.hamburger');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navbar = document.querySelector('.navbar');
  const yearEl = document.getElementById('year');

  // Toggle mobile menu
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navMenu.classList.toggle('open');
      hamburger.classList.toggle('is-active');
    });

    // close when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !hamburger.contains(e.target)) {
        navMenu.classList.remove('open');
        hamburger.classList.remove('is-active');
      }
    });

    // close on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        navMenu.classList.remove('open');
        hamburger.classList.remove('is-active');
      }
    });
  }

  // Smooth scroll with offset for fixed navbar
  function scrollToHash(hash) {
    const target = document.querySelector(hash);
    if (!target) return;
    const navHeight = navbar ? navbar.offsetHeight : 70;
    const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight - 8;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        scrollToHash(href);
        // close mobile menu after click
        if (navMenu && navMenu.classList.contains('open')) {
          navMenu.classList.remove('open');
          hamburger.classList.remove('is-active');
        }
      }
    });
  });

  // Scrollspy: set .active on nav-link
  const setActiveLink = () => {
    const scrollPos = window.pageYOffset;
    const navHeight = navbar ? navbar.offsetHeight : 70;
    let currentId = sections[0] ? sections[0].id : '';

    sections.forEach(sec => {
      const top = sec.offsetTop - navHeight - 32;
      if (scrollPos >= top) currentId = sec.id;
    });

    navLinks.forEach(a => {
      const href = a.getAttribute('href') || '';
      if (href === `#${currentId}`) a.classList.add('active');
      else a.classList.remove('active');
    });
  };

  setActiveLink();
  window.addEventListener('scroll', () => {
    if (!window._rafSpy) {
      window._rafSpy = requestAnimationFrame(() => {
        setActiveLink();
        window._rafSpy = null;
      });
    }
  });

  // footer year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // profile image fallback (generates SVG with initials if image fails)
  const profileImg = document.querySelector('.profile-img');
  if (profileImg) {
    profileImg.addEventListener('error', () => {
      const nameText = (document.querySelector('.nav-logo')?.textContent || 'Sahithi').trim();
      const initials = nameText.split(/\s+/).map(n => n[0]).slice(0,2).join('').toUpperCase();
      const bg = '#667eea';
      const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='100%' height='100%' fill='${bg}'/><text x='50%' y='52%' font-size='100' fill='white' font-family='Segoe UI, Arial' text-anchor='middle' dominant-baseline='middle'>${initials}</text></svg>`;
      profileImg.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
    });
    if (!profileImg.complete || profileImg.naturalWidth === 0) {
      profileImg.dispatchEvent(new Event('error'));
    }
  }

  // contact form handler (if present) — opens mail client
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const fm = new FormData(contactForm);
      const name = fm.get('name') || '';
      const email = fm.get('email') || '';
      const message = fm.get('message') || '';
      const to = 'sahithiujwal@gmail.com'; // <-- confirm this matches index.html
      const subject = `Portfolio contact from ${name || email || 'website'}`;
      const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
      window.location.href = `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  }

  // Scroll animation for sections (IntersectionObserver)
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
  });

  // Project card hover effect enhancement
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.cursor = 'pointer';
    });
  });

  // Console welcome message
  console.log('%c🚀 Welcome to Sahithi\\'s Portfolio!', 'font-size: 20px; color: #667eea; font-weight: bold;');
  console.log('%cExplore the code and connect on GitHub: https://github.com/yourusername', 'font-size: 14px; color: #764ba2;');
  console.log('%cBuilt with HTML, CSS & JavaScript | 2025', 'font-size: 12px; color: #999;');
});
// ...existing code...