import CONFIG from '../data/siteConfig.js';

export function initTimeline() {
  const timelineContainer = document.getElementById('timelineContainer');
  if (!timelineContainer) return;

  const entries = CONFIG.timeline || [];
  
  if (entries.length === 0) {
    timelineContainer.innerHTML = '<p class="songs__empty">Our story is just beginning...</p>';
    return;
  }

  const html = entries.map((entry, index) => {
    // Alternate fade directions based on index (desktop only visually due to CSS)
    const revealClass = index % 2 === 0 ? 'reveal--right' : 'reveal--left';
    
    return `
      <div class="timeline__entry reveal ${revealClass}">
        <div class="timeline__dot"></div>
        <div class="timeline__card">
          ${entry.photo ? `<img src="${entry.photo}" alt="${entry.title}" class="timeline__image" loading="lazy" />` : ''}
          <div class="timeline__body">
            <div class="timeline__date">${entry.date}</div>
            <h3 class="timeline__title">${entry.title}</h3>
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
    `;
  }).join('');

  timelineContainer.innerHTML = html;
}
