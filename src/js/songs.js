import CONFIG from '../data/siteConfig.js';

export function initSongs() {
  const container = document.getElementById('songsContainer');
  if (!container) return;

  const songs = CONFIG.songs || [];
  
  if (songs.length === 0) {
    container.innerHTML = '<p class="songs__empty">Our playlist is empty right now.</p>';
    return;
  }

  // Render HTML
  const html = songs.map((song, index) => {
    const hasAudio = !!song.audioSrc;
    const coverHtml = song.cover 
      ? `<img src="${song.cover}" alt="${song.title} cover" loading="lazy">`
      : `🎵`;
      
    return `
      <div class="song-card reveal">
        <div class="song-card__cover">${coverHtml}</div>
        <div class="song-card__info">
          <h4 class="song-card__title">${song.title}</h4>
          <div class="song-card__artist">${song.artist}</div>
          <div class="song-card__note">"${song.note}"</div>
        </div>
        <button class="song-card__play" data-src="${hasAudio ? song.audioSrc : ''}" data-index="${index}" ${!hasAudio ? 'disabled title="No preview available"' : 'title="Play preview"'}>
          ▶
        </button>
      </div>
    `;
  }).join('');

  container.innerHTML = html;

  // Audio Logic
  let currentAudio = null;
  let currentlyPlayingBtn = null;
  
  // Create a single reusable audio element
  const audioEl = new Audio();
  
  // Respect user's previous volume/mute preference if we implement it later
  audioEl.volume = 0.5;

  audioEl.addEventListener('ended', () => {
    if (currentlyPlayingBtn) {
      currentlyPlayingBtn.textContent = '▶';
      currentlyPlayingBtn.classList.remove('is-playing');
      currentlyPlayingBtn = null;
    }
  });

  container.addEventListener('click', (e) => {
    const btn = e.target.closest('.song-card__play');
    if (!btn || btn.disabled) return;

    const src = btn.dataset.src;
    if (!src) return;

    // If clicking the currently playing song, pause it
    if (currentlyPlayingBtn === btn) {
      audioEl.pause();
      btn.textContent = '▶';
      btn.classList.remove('is-playing');
      currentlyPlayingBtn = null;
      return;
    }

    // If another song is playing, reset its button
    if (currentlyPlayingBtn) {
      currentlyPlayingBtn.textContent = '▶';
      currentlyPlayingBtn.classList.remove('is-playing');
    }

    // Play new song
    audioEl.src = src;
    audioEl.play().catch(err => console.warn('Audio play failed:', err));
    
    btn.textContent = '❚❚';
    btn.classList.add('is-playing');
    currentlyPlayingBtn = btn;
  });
}
