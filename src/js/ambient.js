import CONFIG from '../data/siteConfig.js';

export function initAmbient() {
  const toggle = document.getElementById('ambientToggle');
  if (!toggle) return;

  const src = CONFIG.ambientTrack;
  if (!src) {
    toggle.style.display = 'none';
    return;
  }

  const audio = new Audio();
  audio.src = src;
  audio.loop = true;
  audio.volume = 0;
  audio.preload = 'none';

  let isPlaying = false;
  let fadeInterval = null;

  // Restore mute preference
  const stored = localStorage.getItem('ourspace-ambient');
  // Default is muted — only auto-play if user previously opted in
  // We'll still need user interaction to start, so we just mark intent
  let userWantsMusic = stored === 'on';

  function fadeIn() {
    clearInterval(fadeInterval);
    audio.play().catch(() => {});
    fadeInterval = setInterval(() => {
      if (audio.volume < 0.25) {
        audio.volume = Math.min(audio.volume + 0.01, 0.25);
      } else {
        clearInterval(fadeInterval);
      }
    }, 40);
    isPlaying = true;
    toggle.classList.add('is-playing');
    localStorage.setItem('ourspace-ambient', 'on');
  }

  function fadeOut() {
    clearInterval(fadeInterval);
    fadeInterval = setInterval(() => {
      if (audio.volume > 0.01) {
        audio.volume = Math.max(audio.volume - 0.01, 0);
      } else {
        audio.pause();
        clearInterval(fadeInterval);
      }
    }, 30);
    isPlaying = false;
    toggle.classList.remove('is-playing');
    localStorage.setItem('ourspace-ambient', 'off');
  }

  toggle.addEventListener('click', () => {
    if (isPlaying) {
      fadeOut();
    } else {
      fadeIn();
    }
  });

  // If user previously had music on, start on first interaction
  if (userWantsMusic) {
    const startOnInteraction = () => {
      fadeIn();
      document.removeEventListener('click', startOnInteraction);
      document.removeEventListener('touchstart', startOnInteraction);
    };
    document.addEventListener('click', startOnInteraction, { once: false });
    document.addEventListener('touchstart', startOnInteraction, { once: false });
  }
}
