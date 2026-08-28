import CONFIG from '../data/siteConfig.js';

export function initSecrets() {
  const secrets = CONFIG.secrets || {};
  
  // 1. Konami Code
  let konamiIndex = 0;
  const konamiTarget = secrets.konamiSequence || ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight"];
  
  const overlay = document.getElementById('secretOverlay');
  const overlayText = document.getElementById('secretText');

  document.addEventListener('keydown', (e) => {
    if (e.key === konamiTarget[konamiIndex]) {
      konamiIndex++;
      if (konamiIndex === konamiTarget.length) {
        // Trigger Konami
        if (overlay && overlayText) {
          overlayText.textContent = secrets.konamiMessage || "You found the secret!";
          overlay.classList.add('is-visible');
        }
        konamiIndex = 0; // reset
      }
    } else {
      konamiIndex = 0; // reset on wrong key
    }
    
    // Close overlay on Escape
    if (e.key === 'Escape' && overlay && overlay.classList.contains('is-visible')) {
      overlay.classList.remove('is-visible');
    }
  });

  if (overlay) {
    overlay.addEventListener('click', () => overlay.classList.remove('is-visible'));
  }

  // 2. Click Count Easter Egg
  const footerHeart = document.getElementById('footerHeart');
  let clicks = 0;
  
  if (footerHeart) {
    footerHeart.addEventListener('click', () => {
      clicks++;
      const target = secrets.clickCountTarget || 7;
      
      if (clicks === target) {
        if (overlay && overlayText) {
          overlayText.textContent = secrets.clickCountMessage || "You found a secret!";
          overlay.classList.add('is-visible');
        }
        clicks = 0; // reset
      }
    });
  }

  // 3. Secret Star Hover
  // We need to track mouse position and check distance to the secret star in canvas
  const canvas = document.getElementById('particles-canvas');
  const tooltip = document.getElementById('secretStarTooltip');
  
  if (canvas && tooltip && secrets.starMessage) {
    tooltip.textContent = secrets.starMessage;
    
    document.addEventListener('mousemove', (e) => {
      const star = window.SECRET_STAR; // Expose from particles.js
      if (!star) return;
      
      const dx = e.clientX - star.x;
      const dy = e.clientY - star.y;
      const distance = Math.sqrt(dx*dx + dy*dy);
      
      // If mouse is within 30px of the secret star
      if (distance < 30) {
        tooltip.style.left = `${e.clientX + 15}px`;
        tooltip.style.top = `${e.clientY + 15}px`;
        tooltip.classList.add('is-visible');
      } else {
        tooltip.classList.remove('is-visible');
      }
    });
  }
}
