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
import { initCursor } from './cursor.js';
import { initAmbient } from './ambient.js';
import { initMap } from './map.js';

document.addEventListener('DOMContentLoaded', () => {
  // Hero CTA smooth scroll
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
  initCursor();
  initAmbient();
  initMap();

  // Populate dynamic text from CONFIG
  populateDynamicContent();
  
  // Setup intersection observers for scroll reveals
  setupScrollReveals();

  // Setup navigation
  setupNavigation();

  // Setup future section sub-navigation
  setupFutureNav();
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
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  });

  document.querySelectorAll('.reveal').forEach((el, index) => {
    // Add stagger delay for siblings within the same parent
    const parent = el.parentElement;
    if (parent) {
      const siblings = parent.querySelectorAll(':scope > .reveal');
      if (siblings.length > 1) {
        const sibIndex = Array.from(siblings).indexOf(el);
        if (sibIndex > 0) {
          el.style.setProperty('--reveal-delay', `${sibIndex * 0.1}s`);
        }
      }
    }
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

function setupFutureNav() {
  const navBtns = document.querySelectorAll('.future-nav__btn');
  const sections = document.querySelectorAll('.future-section');

  if (navBtns.length === 0) return;

  navBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.section;

      navBtns.forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');

      sections.forEach(s => {
        s.classList.toggle('is-active', s.id === target);
      });
    });
  });
}
