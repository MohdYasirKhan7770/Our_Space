// ── Custom cursor glow (desktop only) ──────────────────────────
export function initCursor() {
  // Skip on touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const glow = document.getElementById('cursorGlow');
  if (!glow) return;

  let mouseX = -500, mouseY = -500;
  let glowX = -500, glowY = -500;
  let rafId;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  // Smooth follow with lerp
  function animate() {
    glowX += (mouseX - glowX) * 0.12;
    glowY += (mouseY - glowY) * 0.12;
    glow.style.transform = `translate3d(${glowX - 200}px, ${glowY - 200}px, 0)`;
    rafId = requestAnimationFrame(animate);
  }

  // Only start animation when mouse enters the viewport
  document.addEventListener('mouseenter', () => {
    glow.style.opacity = '1';
  });

  document.addEventListener('mouseleave', () => {
    glow.style.opacity = '0';
  });

  animate();
}
