import CONFIG from '../data/siteConfig.js';

export function initCounter() {
  const yearsEl = document.getElementById('countYears');
  const monthsEl = document.getElementById('countMonths');
  const daysEl = document.getElementById('countDays');
  const hoursEl = document.getElementById('countHours');
  const minsEl = document.getElementById('countMins');
  const secsEl = document.getElementById('countSecs');

  if (!yearsEl || !CONFIG.relationshipStart) return;

  const startDate = new Date(CONFIG.relationshipStart).getTime();

  function updateCounter() {
    const now = new Date().getTime();
    const diff = Math.max(0, now - startDate); // Prevent negative if future date

    const seconds = Math.floor((diff / 1000) % 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    
    // Approximate days, months, years for UI purposes
    const totalDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    // Accurate date math for years/months/days
    const startObj = new Date(CONFIG.relationshipStart);
    const nowObj = new Date();
    
    let years = nowObj.getFullYear() - startObj.getFullYear();
    let months = nowObj.getMonth() - startObj.getMonth();
    let days = nowObj.getDate() - startObj.getDate();

    if (days < 0) {
      months--;
      // Get days in previous month
      const prevMonth = new Date(nowObj.getFullYear(), nowObj.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    
    // Prevent negative when now < start (handled by Math.max above for seconds, but let's zero these)
    if (diff <= 0) {
      years = 0; months = 0; days = 0;
    }

    if (yearsEl) yearsEl.textContent = String(years).padStart(2, '0');
    if (monthsEl) monthsEl.textContent = String(months).padStart(2, '0');
    if (daysEl) daysEl.textContent = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
    if (minsEl) minsEl.textContent = String(minutes).padStart(2, '0');
    if (secsEl) secsEl.textContent = String(seconds).padStart(2, '0');

    requestAnimationFrame(updateCounter);
  }

  requestAnimationFrame(updateCounter);
}
