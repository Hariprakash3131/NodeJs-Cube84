import { CATEGORIES } from '../data.js';

export function renderMegaMenu() {
  return `
    <nav class="category-nav-bar" aria-label="Product categories">
      <div class="container">
        <ul class="category-nav-list">
          <li class="category-nav-item">
            <a 
              href="javascript:void(0)" 
              class="category-nav-link"
              onclick="window.appRouter.navigate('category', { category: 'all' })"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
              </svg>
              All Categories
            </a>
          </li>

          ${CATEGORIES.map(cat => `
            <li class="category-nav-item" data-cat-id="${cat.id}">
              <a 
                href="javascript:void(0)" 
                class="category-nav-link"
                onclick="window.appRouter.navigate('category', { category: '${cat.id}' })"
              >
                ${cat.name}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </a>

              <!-- Mega Menu Dropdown Panel -->
              <div class="mega-menu-panel" role="region" aria-label="${cat.name} Subcategories">
                <div>
                  <h4 class="mega-menu-group-title">Trending in ${cat.name}</h4>
                  <ul class="mega-menu-sublinks">
                    ${cat.subcategories.slice(0, 3).map(sub => `
                      <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('category', { category: '${cat.id}' })">${sub.name}</a></li>
                    `).join('')}
                  </ul>
                </div>

                <div>
                  <h4 class="mega-menu-group-title">Popular Collections</h4>
                  <ul class="mega-menu-sublinks">
                    ${cat.subcategories.slice(2).map(sub => `
                      <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('category', { category: '${cat.id}' })">${sub.name}</a></li>
                    `).join('')}
                    <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('category', { category: '${cat.id}' })">View All ${cat.name} &rarr;</a></li>
                  </ul>
                </div>

                <div>
                  <h4 class="mega-menu-group-title">Featured Brands</h4>
                  <ul class="mega-menu-sublinks">
                    <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('category', { category: '${cat.id}' })">Nexora Signature</a></li>
                    <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('category', { category: '${cat.id}' })">Official Brand Stores</a></li>
                    <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('category', { category: '${cat.id}' })">New Season Releases</a></li>
                  </ul>
                </div>

                <!-- Promotional Micro Banner -->
                <div class="mega-promo-card">
                  <div>
                    <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: var(--color-blue-700); background: #dbeafe; padding: 2px 6px; border-radius: 4px;">Exclusive Deal</span>
                    <h5 style="font-size: 14px; font-weight: 800; color: #0f172a; margin-top: 8px;">${cat.discount}</h5>
                    <p style="font-size: 11px; color: #64748b; margin-top: 4px;">Verified authentic items with 7-day hassle-free replacement.</p>
                  </div>
                  <button 
                    onclick="window.appRouter.navigate('category', { category: '${cat.id}' })"
                    style="font-size: 11px; font-weight: 700; color: #1e40af; text-align: left; padding: 0;"
                  >
                    Explore Offers &rarr;
                  </button>
                </div>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    </nav>
  `;
}
