import L from 'leaflet';

/**
 * Servora Leaflet OpenStreetMap Controller
 * Custom branded markers, popups, and responsive dark/light tiles.
 */
export function initContactMap(containerId = 'contact-map') {
  const container = document.getElementById(containerId);
  if (!container) return null;

  // Center on San Francisco / Tech District
  const coords = [37.788, -122.4075];
  const map = L.map(containerId, {
    center: coords,
    zoom: 14,
    scrollWheelZoom: false,
  });

  // OpenStreetMap Tile Layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Custom SVG Marker Icon
  const customIcon = L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="relative flex items-center justify-center w-10 h-10 -translate-x-1/2 -translate-y-full">
        <span class="absolute w-8 h-8 rounded-full bg-primary-500/30 animate-ping"></span>
        <div class="relative w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center shadow-lg border-2 border-white dark:border-slate-900">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"/>
          </svg>
        </div>
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -35]
  });

  // Add Marker with rich popup
  const marker = L.marker(coords, { icon: customIcon }).addTo(map);
  marker.bindPopup(`
    <div class="p-2 text-slate-900">
      <h4 class="font-bold text-sm text-primary-600">Servora Global HQ</h4>
      <p class="text-xs text-slate-600 mt-1">548 Market St, Suite 402<br>San Francisco, CA 94104</p>
      <p class="text-xs font-semibold text-emerald-600 mt-1.5">● Open Mon - Fri, 9am - 6pm PST</p>
    </div>
  `).openPopup();

  return map;
}

if (typeof window !== 'undefined') {
  window.initContactMap = initContactMap;
}

