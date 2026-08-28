import CONFIG from '../data/siteConfig.js';

export function initReasons() {
  const cardText = document.getElementById('reasonText');
  const cardNum = document.getElementById('reasonNum');
  const cardWrapper = document.getElementById('reasonCard');
  const nextBtn = document.getElementById('nextReasonBtn');
  const counter = document.getElementById('reasonCounter');
  
  if (!cardText || !cardWrapper) return;

  let reasons = [...CONFIG.reasons];
  
  if (reasons.length === 0) {
    cardText.textContent = "I love everything about you.";
    cardNum.textContent = "Reason #01";
    if (nextBtn) nextBtn.style.display = 'none';
    return;
  }

  // Shuffle array for random order each session
  for (let i = reasons.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [reasons[i], reasons[j]] = [reasons[j], reasons[i]];
  }

  let currentIndex = -1; // -1 means unrevealed state

  function revealFirst() {
    if (currentIndex > -1) return; // Already revealed
    
    currentIndex = 0;
    updateCard();
  }

  function nextReason(e) {
    if (e) e.stopPropagation();
    if (currentIndex === -1) {
      revealFirst();
      return;
    }
    
    // Hide current text
    cardText.classList.remove('is-revealed');
    
    // Wait for fade out, then update and fade in
    setTimeout(() => {
      currentIndex = (currentIndex + 1) % reasons.length;
      updateCard();
    }, 400); // Matches CSS transition duration
  }

  function updateCard() {
    cardText.textContent = reasons[currentIndex];
    cardNum.textContent = `Reason #${String(currentIndex + 1).padStart(2, '0')}`;
    if (counter) counter.textContent = `${currentIndex + 1} / ${reasons.length}`;
    
    // Force reflow
    void cardText.offsetWidth;
    
    // Fade in
    cardText.classList.add('is-revealed');
    
    if (nextBtn) nextBtn.textContent = "Another reason →";
  }

  // Initial state setup
  cardText.textContent = "Tap to reveal...";
  cardText.classList.add('is-revealed');
  
  cardWrapper.addEventListener('click', () => {
    if (currentIndex === -1) revealFirst();
    else nextReason();
  });
  
  if (nextBtn) {
    nextBtn.addEventListener('click', nextReason);
  }
}
