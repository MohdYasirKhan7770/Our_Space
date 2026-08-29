import CONFIG from '../data/siteConfig.js';

export function initGallery() {
  const grid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const filterContainer = document.getElementById('memoryFilters');
  const searchInput = document.getElementById('memorySearch');
  const surpriseBtn = document.getElementById('surpriseBtn');
  
  if (!grid || !lightbox) return;

  const photos = CONFIG.memories || [];
  const tags = CONFIG.memoryTags || [{ id: 'all', label: 'All' }];
  
  if (photos.length === 0) {
    grid.innerHTML = '<p class="songs__empty">Adding memories soon...</p>';
    return;
  }

  let activeTag = 'all';
  let searchQuery = '';

  // ── Render Filter Pills ──────────────────────────────────────
  if (filterContainer) {
    filterContainer.innerHTML = tags.map(tag => `
      <button class="memory-filter ${tag.id === 'all' ? 'is-active' : ''}" data-tag="${tag.id}">
        ${tag.label}
      </button>
    `).join('');

    filterContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.memory-filter');
      if (!btn) return;
      
      activeTag = btn.dataset.tag;
      filterContainer.querySelectorAll('.memory-filter').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      renderGrid();
    });
  }

  // ── Search ───────────────────────────────────────────────────
  if (searchInput) {
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        searchQuery = e.target.value.toLowerCase().trim();
        renderGrid();
      }, 250);
    });
  }

  // ── Surprise Me ──────────────────────────────────────────────
  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      const randomIndex = Math.floor(Math.random() * photos.length);
      openLightbox(randomIndex);
      
      // Add a fun bounce effect
      surpriseBtn.classList.add('is-bouncing');
      setTimeout(() => surpriseBtn.classList.remove('is-bouncing'), 600);
    });
  }

  // ── Render Grid ──────────────────────────────────────────────
  function getFilteredPhotos() {
    return photos.filter((photo, index) => {
      const matchTag = activeTag === 'all' || 
        (photo.tags && photo.tags.includes(activeTag));
      const matchSearch = !searchQuery || 
        (photo.caption && photo.caption.toLowerCase().includes(searchQuery)) ||
        (photo.story && photo.story.toLowerCase().includes(searchQuery)) ||
        (photo.date && photo.date.toLowerCase().includes(searchQuery));
      return matchTag && matchSearch;
    });
  }

  function renderGrid() {
    const filtered = getFilteredPhotos();
    
    if (filtered.length === 0) {
      grid.innerHTML = '<p class="songs__empty">No memories match your search.</p>';
      return;
    }

    const html = filtered.map((photo) => {
      const originalIndex = photos.indexOf(photo);
      const hasStory = photo.story && photo.story.trim().length > 0;
      
      return `
        <div class="gallery__item ${hasStory ? 'has-story' : ''}" data-index="${originalIndex}">
          <div class="gallery__item-inner">
            <div class="gallery__item-front">
              <img src="${photo.src}" alt="${photo.caption || 'Memory'}" class="gallery__img" loading="lazy" />
              <div class="gallery__caption">
                ${photo.caption}
                ${photo.date ? `<span class="gallery__date">${photo.date}</span>` : ''}
              </div>
              ${hasStory ? '<div class="gallery__flip-hint">tap & hold for story</div>' : ''}
            </div>
            ${hasStory ? `
              <div class="gallery__item-back">
                <div class="gallery__story handwritten">${photo.story}</div>
              </div>
            ` : ''}
          </div>
        </div>
      `;
    }).join('');

    grid.innerHTML = html;
    
    // Trigger staggered reveals
    setTimeout(() => {
      grid.querySelectorAll('.gallery__item').forEach((item, i) => {
        setTimeout(() => {
          item.classList.add('is-visible');
        }, i * 80);
      });
    }, 50);

    // Setup flip interaction for items with stories
    setupFlipInteraction();
  }

  // ── Flip Interaction ─────────────────────────────────────────
  function setupFlipInteraction() {
    let longPressTimer;
    let flippedCard = null;

    grid.querySelectorAll('.gallery__item.has-story').forEach(item => {
      // Long press to flip
      item.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        longPressTimer = setTimeout(() => {
          e.preventDefault();
          flipCard(item);
        }, 500);
      });

      item.addEventListener('mouseup', () => clearTimeout(longPressTimer));
      item.addEventListener('mouseleave', () => clearTimeout(longPressTimer));

      // Touch long press
      item.addEventListener('touchstart', (e) => {
        longPressTimer = setTimeout(() => {
          flipCard(item);
        }, 500);
      }, { passive: true });

      item.addEventListener('touchend', () => clearTimeout(longPressTimer));
      item.addEventListener('touchmove', () => clearTimeout(longPressTimer));
    });

    function flipCard(item) {
      // Unflip any previously flipped card
      if (flippedCard && flippedCard !== item) {
        flippedCard.classList.remove('is-flipped');
      }
      
      item.classList.toggle('is-flipped');
      flippedCard = item.classList.contains('is-flipped') ? item : null;
    }

    // Click outside to unflip
    document.addEventListener('click', (e) => {
      if (flippedCard && !flippedCard.contains(e.target)) {
        flippedCard.classList.remove('is-flipped');
        flippedCard = null;
      }
    });
  }

  // ── Initial Render ───────────────────────────────────────────
  renderGrid();

  // ── Lightbox Logic ───────────────────────────────────────────
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
      lbImg.src = '';
    }, 400);
  }

  function updateLightbox() {
    const photo = photos[currentIndex];
    lbImg.src = photo.src;
    
    let captionHtml = photo.caption;
    if (photo.date) captionHtml += `<br><small style="color:var(--text-muted)">${photo.date}</small>`;
    if (photo.story) captionHtml += `<br><span class="handwritten" style="color:var(--accent-warm);font-size:1.1rem;margin-top:0.5rem;display:block">${photo.story}</span>`;
    
    lbCaption.innerHTML = captionHtml;
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

  // Event Listeners — use event delegation on grid
  grid.addEventListener('click', (e) => {
    const item = e.target.closest('.gallery__item');
    if (!item) return;
    // Don't open lightbox if card is flipped
    if (item.classList.contains('is-flipped')) return;
    
    openLightbox(parseInt(item.dataset.index, 10));
  });

  lbClose.addEventListener('click', closeLightbox);
  lbNext.addEventListener('click', nextPhoto);
  lbPrev.addEventListener('click', prevPhoto);

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') nextPhoto();
    if (e.key === 'ArrowLeft') prevPhoto();
  });

  // Touch swipe in lightbox
  let touchStartX = 0;
  lightbox.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  lightbox.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 50) nextPhoto();
    if (touchEndX > touchStartX + 50) prevPhoto();
  }, { passive: true });
}
