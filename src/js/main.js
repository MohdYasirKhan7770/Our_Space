import CONFIG from '../data/siteConfig.js';
import { initParticles } from './particles.js';
import { initCounter } from './counter.js';
import { initTimeline } from './timeline.js';
import { initGallery } from './gallery.js';
import { initReasons } from './reasons.js';
import { initSongs } from './songs.js';
import { initLetters } from './letters.js';
import { initFuture } from './future.js';
import { initSecrets } from './secrets.js';

document.addEventListener('DOMContentLoaded', () => {
  // Wait for user to interact to start (hero CTA)
  const heroCta = document.getElementById('heroCta');
  if (heroCta) {
    heroCta.addEventListener('click', (e) => {
      e.preventDefault();
      document.querySelector('#universe').scrollIntoView({ behavior: 'smooth' });
    });
  }

  // Init all modules
  initParticles();
  initCounter();
  initTimeline();
  initGallery();
  initReasons();
  initSongs();
  initLetters();
  initFuture();
  initSecrets();

  // Populate dynamic text from CONFIG
  populateDynamicContent();
  
  // Setup intersection observers for scroll reveals
  setupScrollReveals();

  // Setup navigation
  setupNavigation();
});

function populateDynamicContent() {
  // Hero
  setText('heroLine1', CONFIG.hero.line1);
  setText('heroLine2', CONFIG.hero.line2);
  setText('heroCta', CONFIG.hero.cta);

  // Universe
  setText('universeMessage', CONFIG.universe.message);
  setSrc('universePhoto', CONFIG.universe.photo);

  // Birthday
  setText('birthdayIntro', CONFIG.birthday.intro);
  setText('birthdayCta', CONFIG.birthday.cta);
  const birthdayBtn = document.getElementById('birthdayCta');
  if (birthdayBtn) {
    birthdayBtn.onclick = () => {
      window.location.href = CONFIG.birthday.href;
    };
  }

  // Closing
  setText('closingLine1', CONFIG.closing.line1);
  setText('closingLine2', CONFIG.closing.line2);
  const closingNames = document.getElementById('closingNames');
  if (closingNames) {
    const names = CONFIG.closing.names || `${CONFIG.myName} <span>×</span> ${CONFIG.herName}`;
    closingNames.innerHTML = names;
  }
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el && text) el.textContent = text;
}

function setSrc(id, src) {
  const el = document.getElementById(id);
  if (el && src) el.src = src;
}

function setupScrollReveals() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Stop observing once revealed
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  });

  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });
}

function setupNavigation() {
  const nav = document.querySelector('.nav');
  const hamburger = document.querySelector('.nav__hamburger');
  const mobileOverlay = document.querySelector('.nav__mobile-overlay');
  const mobileLinks = document.querySelectorAll('.nav__mobile-link');

  // Scroll effect on nav background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('is-scrolled');
    } else {
      nav.classList.remove('is-scrolled');
    }
  }, { passive: true });

  // Mobile menu toggle
  if (hamburger && mobileOverlay) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-open');
      mobileOverlay.classList.toggle('is-open');
      document.body.style.overflow = mobileOverlay.classList.contains('is-open') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        mobileOverlay.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }
}
