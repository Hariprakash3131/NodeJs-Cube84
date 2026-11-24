import { store } from '../store.js';
import { PRODUCTS } from '../data.js';

export function renderFilterSidebar(state) {
  const currentFilters = state.filters;
  
  // Extract unique brands
  const allBrands = Array.from(new Set(PRODUCTS.map(p => p.brand)));

  return `
    <aside class="filter-sidebar" aria-label="Product filters">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
        <h3 style="font-size: var(--text-base); font-weight: var(--font-bold); color: var(--color-gray-900);">Filters</h3>
        <button 
          onclick="window.appStore.clearFilters()" 
          style="font-size: var(--text-xs); color: var(--color-blue-600); font-weight: var(--font-semibold);"
        >
          Clear All
        </button>
      </div>

      <!-- Search Inside Category Filter -->
      <div class="filter-group">
        <label class="filter-group-header" for="filter-search-inside">Search in Category</label>
        <input 
          type="text" 
          id="filter-search-inside"
          class="filter-search-input" 
          placeholder="e.g. Wireless, AMOLED..."
          value="${currentFilters.searchInside || ''}"
          oninput="window.appStore.updateFilters({ searchInside: this.value })"
        />
      </div>

      <!-- Nexora Assured Quick Toggle (Flipkart F-Assured Pattern) -->
      <div class="filter-group">
        <label class="filter-checkbox-label" style="font-weight: 700; color: var(--color-blue-900);">
          <input 
            type="checkbox" 
            class="filter-checkbox" 
            ${currentFilters.assuredOnly ? 'checked' : ''}
            onchange="window.appStore.updateFilters({ assuredOnly: this.checked })"
          />
          <span class="badge-nexora-assured" style="margin-left: 2px;">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
              <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            Nexora Assured
          </span>
        </label>
      </div>

      <!-- Price Range Slider & Inputs -->
      <div class="filter-group">
        <div class="filter-group-header">
          <span>Price Range</span>
          <span style="font-size: 11px; color: var(--color-gray-500);">₹${currentFilters.priceMin} - ₹${currentFilters.priceMax.toLocaleString('en-IN')}</span>
        </div>
        <div class="range-slider-wrap">
          <input 
            type="range" 
            min="0" 
            max="65000" 
            step="1000" 
            value="${currentFilters.priceMax}"
            style="accent-color: var(--color-blue-600); width: 100%; cursor: pointer;"
            oninput="window.appStore.updateFilters({ priceMax: Number(this.value) })"
          />
          <div class="range-inputs">
            <input 
              type="number" 
              class="range-input-box" 
              placeholder="Min" 
              value="${currentFilters.priceMin}"
              onchange="window.appStore.updateFilters({ priceMin: Number(this.value) || 0 })"
            />
            <span style="color: var(--color-gray-400);">-</span>
            <input 
              type="number" 
              class="range-input-box" 
              placeholder="Max" 
              value="${currentFilters.priceMax}"
              onchange="window.appStore.updateFilters({ priceMax: Number(this.value) || 65000 })"
            />
          </div>
        </div>
      </div>

      <!-- Brand Filter -->
      <div class="filter-group">
        <div class="filter-group-header">Brand</div>
        <ul class="filter-options-list">
          ${allBrands.map(brand => {
            const isChecked = currentFilters.brands.includes(brand);
            const count = PRODUCTS.filter(p => p.brand === brand).length;
            return `
              <li>
                <label class="filter-checkbox-label">
                  <input 
                    type="checkbox" 
                    class="filter-checkbox" 
                    ${isChecked ? 'checked' : ''}
                    onchange="window.appActions.toggleBrandFilter('${brand}', this.checked)"
                  />
                  <span>${brand}</span>
                  <span class="filter-count">(${count})</span>
                </label>
              </li>
            `;
          }).join('')}
        </ul>
      </div>

      <!-- Customer Ratings Filter -->
      <div class="filter-group">
        <div class="filter-group-header">Customer Ratings</div>
        <ul class="filter-options-list">
          ${[4, 3, 2].map(star => `
            <li>
              <label class="filter-checkbox-label">
                <input 
                  type="radio" 
                  name="rating-filter" 
                  class="filter-checkbox"
                  ${currentFilters.minRating === star ? 'checked' : ''}
                  onchange="window.appStore.updateFilters({ minRating: ${star} })"
                />
                <span style="display: flex; align-items: center; gap: 4px;">
                  <span class="rating-pill">${star} ★</span> & above
                </span>
              </label>
            </li>
          `).join('')}
        </ul>
      </div>

      <!-- Delivery Options Filter -->
      <div class="filter-group">
        <div class="filter-group-header">Delivery Speed</div>
        <ul class="filter-options-list">
          <li>
            <label class="filter-checkbox-label">
              <input 
                type="checkbox" 
                class="filter-checkbox"
                ${currentFilters.fastDeliveryOnly ? 'checked' : ''}
                onchange="window.appStore.updateFilters({ fastDeliveryOnly: this.checked })"
              />
              <span>Delivery by Tomorrow</span>
            </label>
          </li>
          <li>
            <label class="filter-checkbox-label">
              <input type="checkbox" class="filter-checkbox" checked />
              <span>Free Delivery Eligible</span>
            </label>
          </li>
        </ul>
      </div>
    </aside>
  `;
}
