import CONFIG from '../data/siteConfig.js';

export function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  if (!grid || !lightbox) return;

  const photos = CONFIG.memories || [];
  
  if (photos.length === 0) {
    grid.innerHTML = '<p class="songs__empty">Adding memories soon...</p>';
    return;
  }

  // Populate grid
  const html = photos.map((photo, index) => `
    <div class="gallery__item reveal" data-index="${index}">
      <img src="${photo.src}" alt="${photo.caption || 'Memory'}" class="gallery__img" loading="lazy" />
      <div class="gallery__caption">
        ${photo.caption}
        ${photo.date ? `<span class="gallery__date">${photo.date}</span>` : ''}
      </div>
    </div>
  `).join('');

  grid.innerHTML = html;

  // Lightbox logic
  const lbImg = document.getElementById('lightboxImg');
  const lbCaption = document.getElementById('lightboxCaption');
  const lbCounter = document.getElementById('lightboxCounter');
  const lbClose = document.getElementById('lightboxClose');
  const lbPrev = document.getElementById('lightboxPrev');
  const lbNext = document.getElementById('lightboxNext');
  
  let currentIndex = 0;

  function openLightbox(index) {
    currentIndex = index;
    updateLightbox();
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(() => {
      lbImg.src = ''; // Clear source after transition
    }, 400);
  }

  function updateLightbox() {
    const photo = photos[currentIndex];
    lbImg.src = photo.src;
    lbCaption.innerHTML = `${photo.caption} ${photo.date ? `<br><small style="color:var(--text-muted)">${photo.date}</small>` : ''}`;
    lbCounter.textContent = `${currentIndex + 1} / ${photos.length}`;
  }

  function nextPhoto() {
    currentIndex = (currentIndex + 1) % photos.length;
    updateLightbox();
  }

  function prevPhoto() {
    currentIndex = (currentIndex - 1 + photos.length) % photos.length;
    updateLightbox();
  }

  // Event Listeners
  grid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery__item');
    if (item) {
      openLightbox(parseInt(item.dataset.index, 10));
    }
  });

  lbClose.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', nextPhoto);
  lbPrev.addEventListener('click', prevPhoto);

  // Close on background click
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });

  // Basic swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  lightbox.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    if (touchEndX < touchStartX - 50) nextPhoto();
    if (touchEndX > touchStartX + 50) prevPhoto();
  }
}
