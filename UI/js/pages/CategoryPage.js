import { store } from '../store.js';
import { PRODUCTS, CATEGORIES } from '../data.js';
import { renderProductCard } from '../components/ProductCard.js';
import { renderFilterSidebar } from '../components/FilterSidebar.js';

export function renderCategoryPage() {
  const currentFilters = store.state.filters;

  // Filter products based on active filters
  let filtered = PRODUCTS.filter(p => {
    // Category match
    if (currentFilters.category !== 'all' && p.category !== currentFilters.category) {
      return false;
    }
    // Search inside category
    if (currentFilters.searchInside) {
      const q = currentFilters.searchInside.toLowerCase();
      const match = p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Global search query
    if (store.state.searchQuery) {
      const q = store.state.searchQuery.toLowerCase();
      const match = p.title.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
      if (!match) return false;
    }
    // Price range
    if (p.price < currentFilters.priceMin || p.price > currentFilters.priceMax) {
      return false;
    }
    // Rating
    if (currentFilters.minRating > 0 && p.rating < currentFilters.minRating) {
      return false;
    }
    // Brands
    if (currentFilters.brands.length > 0 && !currentFilters.brands.includes(p.brand)) {
      return false;
    }
    // Assured only
    if (currentFilters.assuredOnly && !p.assured) {
      return false;
    }
    // Fast delivery
    if (currentFilters.fastDeliveryOnly && !p.deliveryDays.includes('Tomorrow')) {
      return false;
    }

    return true;
  });

  // Sorting
  if (currentFilters.sortBy === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentFilters.sortBy === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentFilters.sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (currentFilters.sortBy === 'discount') {
    filtered.sort((a, b) => b.discount - a.discount);
  }

  const categoryObj = CATEGORIES.find(c => c.id === currentFilters.category);
  const categoryTitle = categoryObj ? categoryObj.name : 'All Products & Deals';

  return `
    <div class="category-page-view py-6">
      <div class="container">
        <!-- Breadcrumbs -->
        <nav aria-label="Breadcrumb" class="mb-4">
          <ol style="display: flex; align-items: center; gap: var(--space-2); list-style: none; font-size: var(--text-xs); color: var(--color-gray-500);">
            <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('home')" style="color: var(--color-blue-600);">Home</a></li>
            <li>/</li>
            <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('category', { category: 'all' })" style="color: var(--color-blue-600);">Catalogue</a></li>
            <li>/</li>
            <li style="color: var(--color-gray-800); font-weight: 600;" aria-current="page">${categoryTitle}</li>
          </ol>
        </nav>

        <div class="grid-12">
          <!-- Left Filter Sidebar (3 cols desktop) -->
          <div style="grid-column: span 3;">
            ${renderFilterSidebar(store.state)}
          </div>

          <!-- Right Product Grid Area (9 cols desktop) -->
          <div style="grid-column: span 9;">
            <!-- Header bar with Title, Item count & Sort dropdown -->
            <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-4) var(--space-5); margin-bottom: var(--space-4); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
              <div>
                <h1 style="font-size: var(--text-xl); font-weight: 800; color: var(--color-gray-900);">${categoryTitle}</h1>
                <p style="font-size: var(--text-xs); color: var(--color-gray-500); margin-top: 2px;">
                  Showing <strong>${filtered.length}</strong> verified items
                </p>
              </div>

              <!-- Sort Dropdown -->
              <div style="display: flex; align-items: center; gap: var(--space-3);">
                <label for="plp-sort-select" style="font-size: var(--text-xs); font-weight: 600; color: var(--color-gray-600);">
                  Sort by:
                </label>
                <select 
                  id="plp-sort-select"
                  style="border: 1.5px solid var(--color-gray-300); border-radius: var(--radius-md); padding: 6px 12px; font-size: var(--text-xs); font-weight: 600; color: var(--color-gray-800); background: #ffffff; cursor: pointer; outline: none;"
                  onchange="window.appStore.updateFilters({ sortBy: this.value })"
                >
                  <option value="popularity" ${currentFilters.sortBy === 'popularity' ? 'selected' : ''}>Popularity (Default)</option>
                  <option value="price-low" ${currentFilters.sortBy === 'price-low' ? 'selected' : ''}>Price: Low to High</option>
                  <option value="price-high" ${currentFilters.sortBy === 'price-high' ? 'selected' : ''}>Price: High to Low</option>
                  <option value="rating" ${currentFilters.sortBy === 'rating' ? 'selected' : ''}>Customer Rating</option>
                  <option value="discount" ${currentFilters.sortBy === 'discount' ? 'selected' : ''}>Highest Discount</option>
                </select>
              </div>
            </div>

            <!-- Active Filter Chips -->
            ${(currentFilters.brands.length > 0 || currentFilters.assuredOnly || currentFilters.minRating > 0 || currentFilters.searchInside || currentFilters.category !== 'all') ? `
              <div class="active-filters-row">
                <span style="font-size: var(--text-xs); font-weight: 700; color: var(--color-gray-500);">Active Filters:</span>
                ${currentFilters.category !== 'all' ? `
                  <span class="filter-chip">
                    Category: ${categoryTitle}
                    <span class="filter-chip-remove" onclick="window.appStore.updateFilters({ category: 'all' })">&times;</span>
                  </span>
                ` : ''}
                ${currentFilters.assuredOnly ? `
                  <span class="filter-chip">
                    Nexora Assured
                    <span class="filter-chip-remove" onclick="window.appStore.updateFilters({ assuredOnly: false })">&times;</span>
                  </span>
                ` : ''}
                ${currentFilters.minRating > 0 ? `
                  <span class="filter-chip">
                    ${currentFilters.minRating}★ & above
                    <span class="filter-chip-remove" onclick="window.appStore.updateFilters({ minRating: 0 })">&times;</span>
                  </span>
                ` : ''}
                ${currentFilters.brands.map(b => `
                  <span class="filter-chip">
                    ${b}
                    <span class="filter-chip-remove" onclick="window.appActions.toggleBrandFilter('${b}', false)">&times;</span>
                  </span>
                `).join('')}
                <button 
                  onclick="window.appStore.clearFilters()"
                  style="font-size: var(--text-xs); color: var(--color-danger); font-weight: 700; margin-left: 6px;"
                >
                  Clear All
                </button>
              </div>
            ` : ''}

            <!-- Product Grid -->
            ${filtered.length > 0 ? `
              <div class="grid-12" style="row-gap: var(--space-6);">
                ${filtered.map(product => `
                  <div style="grid-column: span 4;">
                    ${renderProductCard(product)}
                  </div>
                `).join('')}
              </div>
            ` : `
              <!-- Empty State Component -->
              <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-xl); padding: var(--space-12); text-align: center;">
                <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--color-gray-100); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-4); color: var(--color-gray-400);">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <h3 style="font-size: var(--text-lg); font-weight: 700; color: var(--color-gray-900); margin-bottom: 4px;">No products found</h3>
                <p style="font-size: var(--text-xs); color: var(--color-gray-500); max-width: 380px; margin: 0 auto var(--space-4);">
                  We couldn't find matches with the currently selected filters. Try broadening your price range or removing active filters.
                </p>
                <button class="btn-primary-login" onclick="window.appStore.clearFilters()">
                  Reset All Filters
                </button>
              </div>
            `}

            <!-- Pagination Controls -->
            <div style="display: flex; align-items: center; justify-content: center; gap: var(--space-2); margin-top: var(--space-8);">
              <button 
                style="padding: 8px 14px; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-size: var(--text-xs); font-weight: 600; color: var(--color-gray-500); background: #ffffff;"
                disabled
              >
                &larr; Previous
              </button>
              <button style="padding: 8px 14px; border: 1px solid var(--color-blue-600); border-radius: var(--radius-md); font-size: var(--text-xs); font-weight: 700; background: var(--color-blue-600); color: #ffffff;">
                1
              </button>
              <button style="padding: 8px 14px; border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); font-size: var(--text-xs); font-weight: 600; color: var(--color-gray-700); background: #ffffff;">
                2
              </button>
              <button style="padding: 8px 14px; border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); font-size: var(--text-xs); font-weight: 600; color: var(--color-gray-700); background: #ffffff;">
                3
              </button>
              <span style="color: var(--color-gray-400); padding: 0 4px;">...</span>
              <button style="padding: 8px 14px; border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); font-size: var(--text-xs); font-weight: 600; color: var(--color-gray-700); background: #ffffff;">
                12
              </button>
              <button style="padding: 8px 14px; border: 1px solid var(--color-blue-600); border-radius: var(--radius-md); font-size: var(--text-xs); font-weight: 700; color: var(--color-blue-600); background: #ffffff;">
                Next &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
