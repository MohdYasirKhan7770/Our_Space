import CONFIG from '../data/siteConfig.js';

export function initLetters() {
  const grid = document.getElementById('lettersGrid');
  const modal = document.getElementById('letterModal');
  if (!grid || !modal) return;

  const letters = CONFIG.letters || [];
  
  if (letters.length === 0) {
    grid.innerHTML = '<p class="songs__empty">No letters written yet.</p>';
    return;
  }

  // Render Envelopes
  const html = letters.map((letter, index) => `
    <div class="envelope reveal" data-index="${index}">
      <div class="envelope__visual">
        <div class="envelope__body">
          <div class="envelope__left"></div>
          <div class="envelope__right"></div>
          <div class="envelope__bottom"></div>
          <div class="envelope__flap"></div>
          <div class="envelope__seal">💌</div>
        </div>
      </div>
      <div class="envelope__label">${letter.label}</div>
      <div class="envelope__hint">tap to open</div>
    </div>
  `).join('');

  grid.innerHTML = html;

  // Modal logic
  const modalContent = document.getElementById('letterContent');
  const modalClose = document.getElementById('letterClose');
  let openTimeouts = [];

  function openLetter(index, envelopeEl) {
    const letter = letters[index];
    if (!letter) return;

    // 1. Animate envelope flap open
    envelopeEl.classList.add('is-open');

    // 2. Wait, then show modal
    setTimeout(() => {
      // Build letter HTML
      let html = `<div class="letter-modal__salutation">${letter.salutation}</div>`;
      
      letter.lines.forEach(line => {
        if (line.trim() === '') {
          html += `<div class="letter-modal__line letter-modal__line--empty"></div>`;
        } else {
          html += `<div class="letter-modal__line">${line}</div>`;
        }
      });

      modalContent.innerHTML = html;
      modal.classList.add('is-open');
      document.body.style.overflow = 'hidden';

      // 3. Stagger reveal lines
      const lineEls = modalContent.querySelectorAll('.letter-modal__line');
      lineEls.forEach((el, i) => {
        const t = setTimeout(() => {
          el.classList.add('is-visible');
        }, 300 + (i * 250)); // Delay + stagger
        openTimeouts.push(t);
      });
      
    }, 800); // Wait for flap animation
  }

  function closeLetter() {
    modal.classList.remove('is-open');
    document.body.style.overflow = '';
    
    // Clear any pending line reveals
    openTimeouts.forEach(t => clearTimeout(t));
    openTimeouts = [];
    
    // Reset envelopes
    document.querySelectorAll('.envelope').forEach(env => env.classList.remove('is-open'));
  }

  // Event Listeners
  grid.addEventListener('click', (e) => {
    const env = e.target.closest('.envelope');
    if (env) {
      openLetter(parseInt(env.dataset.index, 10), env);
    }
  });

  modalClose.addEventListener('click', closeLetter);
  
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeLetter();
  });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-open')) closeLetter();
  });
}
