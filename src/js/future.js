import CONFIG from '../data/siteConfig.js';

export function initFuture() {
  initBucketList();
  initCountdown();
  initFutureLetters();
  initDreams();
}

// ════════════════════════════════════════════════════════════════
// BUCKET LIST
// ════════════════════════════════════════════════════════════════
function initBucketList() {
  const container = document.getElementById('bucketListContainer');
  const progressFill = document.getElementById('bucketProgress');
  const progressText = document.getElementById('bucketProgressText');
  const treeContainer = document.getElementById('growthTree');

  if (!container) return;

  const items = CONFIG.bucketList || [];
  if (items.length === 0) {
    container.innerHTML = '<p class="songs__empty">Your bucket list is empty — add dreams to siteConfig.js!</p>';
    return;
  }

  // Load checked state from localStorage
  const storageKey = 'ourspace-bucketlist';
  let checkedState = {};
  try {
    checkedState = JSON.parse(localStorage.getItem(storageKey)) || {};
  } catch (e) { checkedState = {}; }

  function save() {
    localStorage.setItem(storageKey, JSON.stringify(checkedState));
  }

  function getCompletionPercent() {
    const done = items.filter(item => checkedState[item.id]).length;
    return Math.round((done / items.length) * 100);
  }

  function updateProgress() {
    const percent = getCompletionPercent();
    if (progressFill) {
      progressFill.style.width = `${percent}%`;
    }
    if (progressText) {
      progressText.textContent = `${percent}% complete`;
    }
    updateTree(percent);
  }

  // Render bucket list items
  const html = items.map(item => {
    const isChecked = checkedState[item.id];
    return `
      <label class="bucket-item ${isChecked ? 'is-done' : ''}" data-id="${item.id}">
        <input type="checkbox" class="bucket-item__check" ${isChecked ? 'checked' : ''} />
        <span class="bucket-item__box">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </span>
        <span class="bucket-item__text">${item.title}</span>
        ${item.category ? `<span class="bucket-item__tag">${item.category}</span>` : ''}
      </label>
    `;
  }).join('');

  container.innerHTML = html;

  // Handle checkbox changes
  container.addEventListener('change', (e) => {
    const checkbox = e.target.closest('.bucket-item__check');
    if (!checkbox) return;
    
    const label = checkbox.closest('.bucket-item');
    const id = label.dataset.id;
    
    checkedState[id] = checkbox.checked;
    label.classList.toggle('is-done', checkbox.checked);
    
    // Celebration micro-animation
    if (checkbox.checked) {
      label.classList.add('is-celebrating');
      setTimeout(() => label.classList.remove('is-celebrating'), 800);
    }
    
    save();
    updateProgress();
  });

  // ── Growth Tree ────────────────────────────────────────────
  function updateTree(percent) {
    if (!treeContainer) return;
    
    const leaves = Math.ceil((percent / 100) * 12);
    const hasFlower = percent >= 80;
    
    treeContainer.innerHTML = `
      <svg viewBox="0 0 200 260" class="growth-tree" xmlns="http://www.w3.org/2000/svg">
        <!-- Trunk -->
        <path d="M100 260 Q100 200 95 170 Q90 140 100 110" 
              stroke="hsl(25, 30%, 35%)" stroke-width="6" fill="none" stroke-linecap="round"/>
        <path d="M100 260 Q100 210 105 180 Q110 150 100 120" 
              stroke="hsl(25, 25%, 30%)" stroke-width="4" fill="none" stroke-linecap="round"/>
        
        <!-- Branches -->
        <path d="M100 170 Q70 150 55 135" stroke="hsl(25, 30%, 35%)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M100 155 Q130 135 145 125" stroke="hsl(25, 30%, 35%)" stroke-width="3" fill="none" stroke-linecap="round"/>
        <path d="M100 135 Q65 115 50 95" stroke="hsl(25, 30%, 35%)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M100 125 Q135 100 150 85" stroke="hsl(25, 30%, 35%)" stroke-width="2.5" fill="none" stroke-linecap="round"/>
        <path d="M100 110 Q80 85 65 70" stroke="hsl(25, 30%, 35%)" stroke-width="2" fill="none" stroke-linecap="round"/>
        <path d="M100 105 Q120 80 135 65" stroke="hsl(25, 30%, 35%)" stroke-width="2" fill="none" stroke-linecap="round"/>
        
        <!-- Leaves (fill based on progress) -->
        ${generateLeaves(leaves)}
        
        <!-- Flower at top when nearly complete -->
        ${hasFlower ? `
          <circle cx="100" cy="55" r="8" fill="hsl(350, 45%, 55%)" opacity="0.9">
            <animate attributeName="r" values="7;9;7" dur="3s" repeatCount="indefinite"/>
          </circle>
          <circle cx="100" cy="55" r="4" fill="hsl(38, 55%, 58%)"/>
        ` : ''}
        
        <!-- Ground -->
        <ellipse cx="100" cy="258" rx="30" ry="4" fill="hsl(25, 20%, 18%)" opacity="0.4"/>
      </svg>
    `;
  }

  function generateLeaves(count) {
    const positions = [
      { x: 50, y: 130, r: -20 }, { x: 60, y: 100, r: 15 },
      { x: 55, y: 65, r: -10 }, { x: 145, y: 120, r: 20 },
      { x: 150, y: 80, r: -15 }, { x: 135, y: 60, r: 25 },
      { x: 70, y: 145, r: -25 }, { x: 130, y: 140, r: 30 },
      { x: 45, y: 90, r: -30 }, { x: 155, y: 95, r: 20 },
      { x: 75, y: 75, r: 10 }, { x: 125, y: 70, r: -15 },
    ];

    return positions.slice(0, count).map((pos, i) => `
      <ellipse cx="${pos.x}" cy="${pos.y}" rx="10" ry="6" 
               fill="hsl(${140 + i * 3}, ${30 + i * 2}%, ${35 + i}%)" 
               opacity="0.8"
               transform="rotate(${pos.r} ${pos.x} ${pos.y})">
        <animate attributeName="opacity" values="0.6;0.9;0.6" dur="${2 + i * 0.3}s" repeatCount="indefinite"/>
      </ellipse>
    `).join('');
  }

  updateProgress();
}

// ════════════════════════════════════════════════════════════════
// COUNTDOWN
// ════════════════════════════════════════════════════════════════
function initCountdown() {
  const container = document.getElementById('countdownContainer');
  if (!container) return;

  const cd = CONFIG.countdown;
  if (!cd || !cd.date) {
    container.style.display = 'none';
    return;
  }

  const targetDate = new Date(cd.date).getTime();
  const label = cd.label || 'Until something special';
  const emoji = cd.emoji || '💕';

  container.innerHTML = `
    <div class="countdown__label reveal">${emoji} ${label}</div>
    <div class="countdown__display reveal">
      <div class="countdown__unit">
        <span class="countdown__value" id="cdDays">000</span>
        <span class="countdown__unit-label">days</span>
      </div>
      <div class="countdown__separator">:</div>
      <div class="countdown__unit">
        <span class="countdown__value" id="cdHours">00</span>
        <span class="countdown__unit-label">hours</span>
      </div>
      <div class="countdown__separator">:</div>
      <div class="countdown__unit">
        <span class="countdown__value" id="cdMins">00</span>
        <span class="countdown__unit-label">mins</span>
      </div>
      <div class="countdown__separator">:</div>
      <div class="countdown__unit">
        <span class="countdown__value" id="cdSecs">00</span>
        <span class="countdown__unit-label">secs</span>
      </div>
    </div>
  `;

  const daysEl = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minsEl = document.getElementById('cdMins');
  const secsEl = document.getElementById('cdSecs');

  function updateCountdown() {
    const now = Date.now();
    const diff = Math.max(0, targetDate - now);

    if (diff <= 0) {
      container.querySelector('.countdown__label').textContent = `${emoji} The day is here!`;
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minsEl.textContent = '00';
      secsEl.textContent = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((diff / (1000 * 60)) % 60);
    const secs = Math.floor((diff / 1000) % 60);

    daysEl.textContent = String(days).padStart(3, '0');
    hoursEl.textContent = String(hours).padStart(2, '0');
    minsEl.textContent = String(mins).padStart(2, '0');
    secsEl.textContent = String(secs).padStart(2, '0');

    requestAnimationFrame(updateCountdown);
  }

  requestAnimationFrame(updateCountdown);

  // Trigger reveals
  setTimeout(() => {
    container.querySelectorAll('.reveal').forEach(el => el.classList.add('is-visible'));
  }, 200);
}

// ════════════════════════════════════════════════════════════════
// FUTURE LETTERS (time-locked)
// ════════════════════════════════════════════════════════════════
function initFutureLetters() {
  const container = document.getElementById('futureLettersContainer');
  if (!container) return;

  const letters = CONFIG.futureLetters || [];
  if (letters.length === 0) {
    container.style.display = 'none';
    return;
  }

  const now = new Date();

  const html = letters.map((letter, index) => {
    const unlockDate = new Date(letter.unlockDate);
    const isLocked = now < unlockDate;
    const formattedDate = unlockDate.toLocaleDateString('en-US', { 
      month: 'long', day: 'numeric', year: 'numeric' 
    });

    if (isLocked) {
      // Calculate days until unlock
      const daysLeft = Math.ceil((unlockDate - now) / (1000 * 60 * 60 * 24));
      
      return `
        <div class="future-letter future-letter--locked">
          <div class="future-letter__lock">🔒</div>
          <div class="future-letter__label">${letter.label}</div>
          <div class="future-letter__unlock-date">Opens ${formattedDate}</div>
          <div class="future-letter__countdown">${daysLeft} days to go</div>
        </div>
      `;
    } else {
      return `
        <div class="future-letter future-letter--unlocked" data-index="${index}">
          <div class="future-letter__lock">💌</div>
          <div class="future-letter__label">${letter.label}</div>
          <div class="future-letter__unlock-date">Unlocked!</div>
          <div class="future-letter__hint">tap to read</div>
        </div>
      `;
    }
  }).join('');

  container.innerHTML = html;

  // Open unlocked future letters using the existing letter modal
  container.addEventListener('click', (e) => {
    const card = e.target.closest('.future-letter--unlocked');
    if (!card) return;

    const index = parseInt(card.dataset.index, 10);
    const letter = letters[index];
    if (!letter) return;

    const modal = document.getElementById('letterModal');
    const modalContent = document.getElementById('letterContent');
    if (!modal || !modalContent) return;

    let contentHtml = `<div class="letter-modal__salutation">${letter.salutation}</div>`;
    letter.lines.forEach(line => {
      if (line.trim() === '') {
        contentHtml += `<div class="letter-modal__line letter-modal__line--empty"></div>`;
      } else {
        contentHtml += `<div class="letter-modal__line">${line}</div>`;
      }
    });

    modalContent.innerHTML = contentHtml;
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    // Stagger reveal
    const lineEls = modalContent.querySelectorAll('.letter-modal__line');
    lineEls.forEach((el, i) => {
      setTimeout(() => el.classList.add('is-visible'), 300 + (i * 250));
    });
  });
}

// ════════════════════════════════════════════════════════════════
// DREAMS / PROMISES / GOALS (original tab system, enhanced)
// ════════════════════════════════════════════════════════════════
function initDreams() {
  const tabsContainer = document.getElementById('futureTabs');
  const gridContainer = document.getElementById('futureGrid');
  
  if (!tabsContainer || !gridContainer) return;

  const futureData = CONFIG.future || {};
  const categories = Object.keys(futureData);
  
  if (categories.length === 0) {
    gridContainer.innerHTML = '<p class="songs__empty">The future is unwritten.</p>';
    return;
  }

  // Category display names
  const catNames = {
    places: '✈ Places',
    dreams: '🌙 Dreams',
    promises: '💛 Promises',
    goals: '🎯 Goals',
  };

  // Render Tabs
  tabsContainer.innerHTML = categories.map((cat, index) => `
    <button class="future__tab ${index === 0 ? 'is-active' : ''}" data-category="${cat}">
      ${catNames[cat] || cat}
    </button>
  `).join('');

  function renderCards(category) {
    const items = futureData[category] || [];
    
    if (items.length === 0) {
      gridContainer.innerHTML = '<p class="songs__empty">Nothing here yet.</p>';
      return;
    }

    gridContainer.innerHTML = items.map(item => `
      <div class="future__card">
        <div class="future__card-inner">
          <div class="future__card-front">
            <h4 class="future__card-title">${item.title}</h4>
            <div class="future__card-hint">tap to read</div>
          </div>
          <div class="future__card-back">
            <p class="future__card-desc handwritten">${item.description}</p>
          </div>
        </div>
      </div>
    `).join('');
    
    // Stagger reveal
    setTimeout(() => {
      gridContainer.querySelectorAll('.future__card').forEach((el, i) => {
        setTimeout(() => el.classList.add('is-visible'), i * 100);
      });
    }, 50);
  }

  // Initial render
  renderCards(categories[0]);

  // Tab switching
  tabsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('future__tab')) {
      document.querySelectorAll('.future__tab').forEach(t => t.classList.remove('is-active'));
      e.target.classList.add('is-active');
      renderCards(e.target.dataset.category);
    }
  });

  // Card flip on click
  gridContainer.addEventListener('click', (e) => {
    const card = e.target.closest('.future__card');
    if (card) {
      card.classList.toggle('is-flipped');
    }
  });
}
