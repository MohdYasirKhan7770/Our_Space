import CONFIG from '../data/siteConfig.js';

export function initFuture() {
  const tabsContainer = document.getElementById('futureTabs');
  const gridContainer = document.getElementById('futureGrid');
  
  if (!tabsContainer || !gridContainer) return;

  const futureData = CONFIG.future || {};
  const categories = Object.keys(futureData);
  
  if (categories.length === 0) {
    gridContainer.innerHTML = '<p class="songs__empty">The future is unwritten.</p>';
    return;
  }

  // Render Tabs
  tabsContainer.innerHTML = categories.map((cat, index) => `
    <button class="future__tab ${index === 0 ? 'is-active' : ''}" data-category="${cat}">
      ${cat}
    </button>
  `).join('');

  function renderCards(category) {
    const items = futureData[category] || [];
    
    if (items.length === 0) {
      gridContainer.innerHTML = '<p class="songs__empty">Nothing here yet.</p>';
      return;
    }

    gridContainer.innerHTML = items.map(item => `
      <div class="future__card reveal reveal--scale">
        <h4 class="future__card-title">${item.title}</h4>
        <div class="future__card-hint">tap to read</div>
        <p class="future__card-desc">${item.description}</p>
      </div>
    `).join('');
    
    // Trigger reveals
    setTimeout(() => {
      document.querySelectorAll('.future__card.reveal').forEach(el => {
        el.classList.add('is-visible');
      });
    }, 50);
  }

  // Initial render
  renderCards(categories[0]);

  // Tab switching
  tabsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('future__tab')) {
      // Update active tab
      document.querySelectorAll('.future__tab').forEach(t => t.classList.remove('is-active'));
      e.target.classList.add('is-active');
      
      // Render new cards
      renderCards(e.target.dataset.category);
    }
  });

  // Card expanding
  gridContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.future__card');
    if (card) {
      // Toggle current
      card.classList.toggle('is-expanded');
      
      // Optionally collapse others
      // document.querySelectorAll('.future__card').forEach(c => {
      //   if (c !== card) c.classList.remove('is-expanded');
      // });
    }
  });
}
