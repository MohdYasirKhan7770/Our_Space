import CONFIG from '../data/siteConfig.js';

export function initTimeline() {
  const timelineContainer = document.getElementById('timelineContainer');
  if (!timelineContainer) return;

  const entries = CONFIG.timeline || [];
  
  if (entries.length === 0) {
    timelineContainer.innerHTML = '<p class="songs__empty">Our story is just beginning...</p>';
    return;
  }

  // Build the animated progress line
  const progressLine = document.createElement('div');
  progressLine.className = 'timeline__progress';
  timelineContainer.appendChild(progressLine);

  const html = entries.map((entry, index) => {
    const revealClass = index % 2 === 0 ? 'reveal--right' : 'reveal--left';
    
    return `
      <div class="timeline__entry reveal ${revealClass}" data-index="${index}">
        <div class="timeline__dot">
          <div class="timeline__dot-ring"></div>
        </div>
        <div class="timeline__card" role="button" tabindex="0" aria-expanded="false">
          <div class="timeline__preview">
            ${entry.photo ? `<div class="timeline__thumb-wrap"><img src="${entry.photo}" alt="${entry.title}" class="timeline__thumb" loading="lazy" /></div>` : ''}
            <div class="timeline__header">
              <div class="timeline__date">${entry.date}</div>
              <h3 class="timeline__title">${entry.title}</h3>
              <div class="timeline__expand-hint">tap to read more</div>
            </div>
          </div>
          <div class="timeline__expanded">
            ${entry.photo ? `<img src="${entry.photo}" alt="${entry.title}" class="timeline__image" loading="lazy" />` : ''}
            <div class="timeline__body">
              <p class="timeline__desc">${entry.description}</p>
              ${(entry.location || entry.song) ? `
                <div class="timeline__meta">
                  ${entry.location ? `<span>📍 ${entry.location}</span>` : ''}
                  ${entry.song ? `<span>🎵 ${entry.song}</span>` : ''}
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');

  timelineContainer.insertAdjacentHTML('beforeend', html);

  // Click to expand/collapse
  timelineContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.timeline__card');
    if (!card) return;

    const isExpanded = card.classList.contains('is-expanded');
    
    // Collapse all others
    timelineContainer.querySelectorAll('.timeline__card.is-expanded').forEach(c => {
      if (c !== card) {
        c.classList.remove('is-expanded');
        c.setAttribute('aria-expanded', 'false');
      }
    });

    // Toggle this card
    card.classList.toggle('is-expanded');
    card.setAttribute('aria-expanded', !isExpanded);
  });

  // Keyboard support
  timelineContainer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const card = e.target.closest('.timeline__card');
      if (card) {
        e.preventDefault();
        card.click();
      }
    }
  });

  // Animated progress line on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Animate the dot
        const dot = entry.target.querySelector('.timeline__dot');
        if (dot) dot.classList.add('is-active');
      }
    });
  }, {
    root: null,
    rootMargin: '0px',
    threshold: 0.3,
  });

  timelineContainer.querySelectorAll('.timeline__entry').forEach(entry => {
    observer.observe(entry);
  });

  // Progress line fill on scroll
  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const rect = timelineContainer.getBoundingClientRect();
        const progress = Math.min(1, Math.max(0,
          (window.innerHeight - rect.top) / (rect.height + window.innerHeight)
        ));
        progressLine.style.transform = `scaleY(${progress})`;
      }
    });
  }, { threshold: Array.from({ length: 20 }, (_, i) => i / 19) });

  timelineObserver.observe(timelineContainer);

  // Update progress on scroll
  window.addEventListener('scroll', () => {
    const rect = timelineContainer.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progress = Math.min(1, Math.max(0,
        (window.innerHeight - rect.top) / (rect.height + window.innerHeight * 0.5)
      ));
      progressLine.style.transform = `scaleY(${progress})`;
    }
  }, { passive: true });
}
