/**
 * Nexora Vector Product Visuals Generator
 * Produces crisp, beautiful, scalable vector illustrations for products
 * Completely original, copyright-free SVG artwork
 */

export function renderProductSvg(type, color = '#2563eb', angle = 1) {
  switch (type) {
    case 'headphone-1':
    case 'headphone-2':
    case 'headphone-3':
    case 'headphone-4':
      return `
        <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="hpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${color}" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>
            <filter id="hpShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="8" stdDeviation="6" flood-opacity="0.15" />
            </filter>
          </defs>
          <path d="M 45 105 A 55 55 0 0 1 155 105" stroke="url(#hpGrad)" stroke-width="14" stroke-linecap="round" filter="url(#hpShadow)" />
          <path d="M 50 100 A 50 50 0 0 1 150 100" stroke="#334155" stroke-width="3" stroke-dasharray="4 4" />
          <!-- Left Earcup -->
          <rect x="30" y="95" width="28" height="52" rx="14" fill="#1e293b" />
          <rect x="34" y="99" width="20" height="44" rx="10" fill="url(#hpGrad)" />
          <ellipse cx="44" cy="121" rx="5" ry="12" fill="#0f172a" opacity="0.6"/>
          <!-- Right Earcup -->
          <rect x="142" y="95" width="28" height="52" rx="14" fill="#1e293b" />
          <rect x="146" y="99" width="20" height="44" rx="10" fill="url(#hpGrad)" />
          <ellipse cx="156" cy="121" rx="5" ry="12" fill="#0f172a" opacity="0.6"/>
          <!-- Metal Pivot Accents -->
          <circle cx="44" cy="95" r="4" fill="#fbbf24" />
          <circle cx="156" cy="95" r="4" fill="#fbbf24" />
          <!-- ANC Wave Icon in background -->
          <path d="M 90 120 Q 95 110 100 120 T 110 120" stroke="#fbbf24" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.8"/>
        </svg>
      `;

    case 'phone-1':
    case 'phone-2':
    case 'phone-3':
    case 'phone-4':
      return `
        <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="phoneGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1e3a8a" />
              <stop offset="100%" stop-color="${color}" />
            </linearGradient>
            <linearGradient id="screenGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#0f172a" />
              <stop offset="50%" stop-color="#1e293b" />
              <stop offset="100%" stop-color="#2563eb" />
            </linearGradient>
          </defs>
          <!-- Phone Body -->
          <rect x="55" y="20" width="90" height="160" rx="16" fill="url(#phoneGrad)" stroke="#334155" stroke-width="2" />
          <!-- Screen -->
          <rect x="60" y="26" width="80" height="148" rx="12" fill="url(#screenGrad)" />
          <!-- Camera Punchhole -->
          <circle cx="100" cy="36" r="3" fill="#000000" />
          <!-- Screen UI Elements (Simulated 120Hz Wallpaper) -->
          <circle cx="100" cy="100" r="28" fill="url(#phoneGrad)" opacity="0.4" />
          <path d="M 68 140 Q 100 100 132 140" stroke="#f59e0b" stroke-width="2" fill="none" opacity="0.8"/>
          <!-- Home Indicator -->
          <line x1="88" y1="168" x2="112" y2="168" stroke="#ffffff" stroke-width="2.5" stroke-linecap="round" opacity="0.6"/>
        </svg>
      `;

    case 'shirt-1':
    case 'shirt-2':
    case 'shirt-3':
      return `
        <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shirtGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${color}" />
              <stop offset="100%" stop-color="#1e3a8a" />
            </linearGradient>
          </defs>
          <!-- Shirt Body -->
          <path d="M 60 50 L 80 40 L 100 56 L 120 40 L 140 50 L 160 85 L 140 95 L 136 175 L 64 175 L 60 95 L 40 85 Z" fill="url(#shirtGrad)" />
          <!-- Collar -->
          <path d="M 80 40 L 100 68 L 120 40 L 100 52 Z" fill="#ffffff" opacity="0.95" />
          <path d="M 80 40 L 100 68 L 94 72 L 76 46 Z" fill="#e2e8f0" />
          <path d="M 120 40 L 100 68 L 106 72 L 124 46 Z" fill="#cbd5e1" />
          <!-- Center Button Placket -->
          <line x1="100" y1="68" x2="100" y2="175" stroke="#ffffff" stroke-width="3" opacity="0.6"/>
          <!-- Buttons -->
          <circle cx="100" cy="85" r="2.5" fill="#ffffff" stroke="#94a3b8" />
          <circle cx="100" cy="115" r="2.5" fill="#ffffff" stroke="#94a3b8" />
          <circle cx="100" cy="145" r="2.5" fill="#ffffff" stroke="#94a3b8" />
          <!-- Chest Pocket -->
          <rect x="74" y="90" width="18" height="20" rx="2" fill="none" stroke="#ffffff" stroke-width="1.5" opacity="0.6"/>
        </svg>
      `;

    case 'chair-1':
    case 'chair-2':
    case 'chair-3':
      return `
        <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Ergonomic Mesh Backrest -->
          <rect x="76" y="25" width="48" height="75" rx="10" fill="#1e293b" stroke="#64748b" stroke-width="2" />
          <!-- Lumbar Support Arc -->
          <path d="M 72 75 Q 100 88 128 75" stroke="#3b82f6" stroke-width="4" stroke-linecap="round" fill="none" />
          <!-- Seat Cushion -->
          <rect x="66" y="102" width="68" height="18" rx="6" fill="#0f172a" />
          <!-- 3D Armrests -->
          <rect x="58" y="70" width="10" height="24" rx="3" fill="#475569" />
          <line x1="63" y1="94" x2="63" y2="108" stroke="#334155" stroke-width="4" />
          <rect x="132" y="70" width="10" height="24" rx="3" fill="#475569" />
          <line x1="137" y1="94" x2="137" y2="108" stroke="#334155" stroke-width="4" />
          <!-- Central Gas Lift Cylinder -->
          <rect x="96" y="120" width="8" height="30" fill="#94a3b8" />
          <!-- Star Base & Castors -->
          <path d="M 100 150 L 60 172 M 100 150 L 140 172 M 100 150 L 100 175 M 100 150 L 75 165 M 100 150 L 125 165" stroke="#334155" stroke-width="4" stroke-linecap="round"/>
          <circle cx="58" cy="174" r="4" fill="#0f172a" />
          <circle cx="142" cy="174" r="4" fill="#0f172a" />
          <circle cx="100" cy="177" r="4" fill="#0f172a" />
        </svg>
      `;

    case 'tv-1':
    case 'tv-2':
    case 'tv-3':
      return `
        <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="tvDisplay" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#1e3a8a" />
              <stop offset="50%" stop-color="#7c3aed" />
              <stop offset="100%" stop-color="#f59e0b" />
            </linearGradient>
          </defs>
          <!-- Frame -->
          <rect x="25" y="45" width="150" height="92" rx="4" fill="#0f172a" stroke="#475569" stroke-width="2" />
          <!-- Glowing Screen -->
          <rect x="29" y="49" width="142" height="84" rx="2" fill="url(#tvDisplay)" />
          <!-- Screen Content Silhouette (Cinematic Landscape) -->
          <path d="M 29 110 Q 75 80 120 115 T 171 100 L 171 133 L 29 133 Z" fill="#0f172a" opacity="0.6"/>
          <circle cx="130" cy="75" r="14" fill="#fbbf24" opacity="0.8"/>
          <!-- Soundbar / Bezel Indicator -->
          <circle cx="100" cy="139" r="1.5" fill="#38bdf8" />
          <!-- Sleek Metal TV Legs -->
          <line x1="50" y1="139" x2="40" y2="160" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
          <line x1="150" y1="139" x2="160" y2="160" stroke="#64748b" stroke-width="3" stroke-linecap="round"/>
        </svg>
      `;

    case 'serum-1':
    case 'serum-2':
      return `
        <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="vialGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stop-color="#b45309" />
              <stop offset="50%" stop-color="#f59e0b" />
              <stop offset="100%" stop-color="#78350f" />
            </linearGradient>
          </defs>
          <!-- Dropper Bulb -->
          <path d="M 94 30 C 94 24 106 24 106 30 L 106 42 L 94 42 Z" fill="#ffffff" stroke="#cbd5e1" stroke-width="1.5" />
          <!-- Dropper Cap Collar -->
          <rect x="90" y="42" width="20" height="14" rx="2" fill="#0f172a" />
          <line x1="90" y1="48" x2="110" y2="48" stroke="#334155" />
          <!-- Glass Vial Bottle -->
          <rect x="74" y="58" width="52" height="105" rx="8" fill="url(#vialGrad)" />
          <!-- Serum Liquid Level -->
          <rect x="76" y="75" width="48" height="86" rx="6" fill="#f59e0b" opacity="0.4"/>
          <!-- Minimalist Modern Label -->
          <rect x="79" y="80" width="42" height="60" rx="3" fill="#ffffff" />
          <line x1="84" y1="92" x2="116" y2="92" stroke="#0f172a" stroke-width="2" />
          <line x1="84" y1="100" x2="110" y2="100" stroke="#f59e0b" stroke-width="1.5" />
          <line x1="84" y1="108" x2="114" y2="108" stroke="#94a3b8" stroke-width="1" />
          <line x1="84" y1="114" x2="104" y2="114" stroke="#94a3b8" stroke-width="1" />
          <!-- Dropper Pipette Tip inside -->
          <line x1="100" y1="56" x2="100" y2="148" stroke="#ffffff" stroke-width="2" opacity="0.6"/>
        </svg>
      `;

    case 'watch-1':
    case 'watch-2':
    case 'watch-3':
      return `
        <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="meshStrap" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="#1e293b" />
              <stop offset="100%" stop-color="#0f172a" />
            </linearGradient>
            <linearGradient id="watchScreen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="#020617" />
              <stop offset="100%" stop-color="#1e1b4b" />
            </linearGradient>
          </defs>
          <!-- Top Strap -->
          <rect x="82" y="16" width="36" height="50" rx="4" fill="url(#meshStrap)" />
          <line x1="82" y1="28" x2="118" y2="28" stroke="#334155" stroke-dasharray="3 2" />
          <!-- Bottom Strap -->
          <rect x="82" y="134" width="36" height="50" rx="4" fill="url(#meshStrap)" />
          <line x1="82" y1="150" x2="118" y2="150" stroke="#334155" stroke-dasharray="3 2" />
          <!-- Watch Bezel Ring -->
          <circle cx="100" cy="100" r="46" fill="#334155" stroke="#e2e8f0" stroke-width="2" />
          <!-- Watch Screen -->
          <circle cx="100" cy="100" r="41" fill="url(#watchScreen)" />
          <!-- Digital Watchface UI -->
          <text x="100" y="98" fill="#ffffff" font-size="16" font-weight="bold" font-family="sans-serif" text-anchor="middle">10:42</text>
          <text x="100" y="112" fill="#38bdf8" font-size="9" font-family="sans-serif" text-anchor="middle">♥ 76 BPM</text>
          <!-- Circular Progress Track -->
          <circle cx="100" cy="100" r="35" stroke="#334155" stroke-width="2.5" fill="none" />
          <circle cx="100" cy="100" r="35" stroke="#fbbf24" stroke-width="2.5" stroke-dasharray="140 220" fill="none" stroke-linecap="round"/>
          <!-- Crown Button -->
          <rect x="146" y="92" width="5" height="16" rx="2.5" fill="#e2e8f0" />
        </svg>
      `;

    case 'shoe-1':
    case 'shoe-2':
    case 'shoe-3':
    default:
      return `
        <svg viewBox="0 0 200 200" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="shoeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${color}" />
              <stop offset="100%" stop-color="#1e3a8a" />
            </linearGradient>
          </defs>
          <!-- Sole Cushion -->
          <path d="M 30 145 C 55 145, 95 142, 125 146 C 145 148, 165 142, 175 136 C 178 144, 168 156, 140 156 C 90 156, 45 158, 30 150 Z" fill="#ffffff" stroke="#e2e8f0" stroke-width="1.5" />
          <path d="M 30 150 C 65 150, 120 150, 165 142 L 165 148 C 120 156, 65 156, 30 154 Z" fill="#fbbf24" />
          <!-- Upper Body -->
          <path d="M 32 145 C 32 125, 55 105, 80 102 C 95 100, 110 85, 125 90 C 135 94, 150 115, 172 135 C 160 142, 140 144, 125 144 C 95 142, 55 144, 32 145 Z" fill="url(#shoeGrad)" />
          <!-- Collar & Tongue -->
          <path d="M 80 102 C 85 92, 100 88, 112 92 C 108 100, 95 106, 80 102 Z" fill="#0f172a" />
          <!-- Lacing Details -->
          <line x1="95" y1="96" x2="115" y2="104" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="102" y1="102" x2="122" y2="110" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <line x1="110" y1="108" x2="130" y2="116" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
          <!-- Dynamic Swoosh / Speed Accent -->
          <path d="M 60 134 C 80 128, 110 118, 135 125 C 110 128, 85 138, 60 134 Z" fill="#fbbf24" />
        </svg>
      `;
  }
}
