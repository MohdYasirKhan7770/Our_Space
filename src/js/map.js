import CONFIG from '../data/siteConfig.js';

export function initMap() {
  const container = document.getElementById('mapContainer');
  if (!container) return;

  // Gather memories with valid coordinates
  const memories = (CONFIG.memories || []).filter(m => 
    m.location && m.location.lat && m.location.lng
  );

  // Also check timeline entries
  const timelineWithCoords = (CONFIG.timeline || []).filter(t => 
    t.lat && t.lng
  );

  // If no geo-tagged memories, hide the entire map section
  if (memories.length === 0 && timelineWithCoords.length === 0) {
    const section = document.getElementById('places');
    if (section) section.style.display = 'none';
    return;
  }

  // Check if Leaflet is available
  if (typeof L === 'undefined') {
    console.warn('Leaflet not loaded — map disabled');
    container.innerHTML = '<p class="songs__empty">Map loading failed.</p>';
    return;
  }

  const center = CONFIG.mapCenter || { lat: 20.5937, lng: 78.9629 };
  const zoom = CONFIG.mapZoom || 5;

  // Create map with dark romantic tiles
  const map = L.map(container, {
    center: [center.lat, center.lng],
    zoom: zoom,
    scrollWheelZoom: false,
    attributionControl: false,
  });

  // Dark-toned tile layer
  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    maxZoom: 19,
  }).addTo(map);

  // Custom heart-shaped SVG icon
  const heartIcon = L.divIcon({
    className: 'map-pin',
    html: `<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
    </svg>`,
    iconSize: [28, 28],
    iconAnchor: [14, 28],
    popupAnchor: [0, -30],
  });

  const bounds = [];

  // Add memory pins
  memories.forEach((memory, index) => {
    const loc = memory.location;
    const latlng = [loc.lat, loc.lng];
    bounds.push(latlng);

    const popupContent = `
      <div class="map-popup">
        <img src="${memory.src}" alt="" class="map-popup__img" loading="lazy" />
        <div class="map-popup__body">
          <div class="map-popup__caption">${memory.caption}</div>
          ${loc.name ? `<div class="map-popup__place">📍 ${loc.name}</div>` : ''}
          ${memory.date ? `<div class="map-popup__date">${memory.date}</div>` : ''}
        </div>
      </div>
    `;

    L.marker(latlng, { icon: heartIcon })
      .bindPopup(popupContent, { 
        maxWidth: 260, 
        className: 'map-popup-wrapper' 
      })
      .addTo(map);
  });

  // Fit bounds if we have pins
  if (bounds.length > 1) {
    map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
  } else if (bounds.length === 1) {
    map.setView(bounds[0], 10);
  }

  // Invalidate size once section becomes visible (fixes rendering in hidden sections)
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => map.invalidateSize(), 100);
        observer.unobserve(entry.target);
      }
    });
  });
  observer.observe(container);
}
