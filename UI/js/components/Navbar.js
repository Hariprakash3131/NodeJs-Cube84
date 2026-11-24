import { store } from '../store.js';
import { CATEGORIES } from '../data.js';

export function renderNavbar(state) {
  const cartCount = state.cart.reduce((sum, item) => sum + item.qty, 0);
  const wishCount = state.wishlist.length;
  const userName = state.user?.name ? state.user.name.split(' ')[0] : 'Sign In';

  return `
    <header class="site-header" id="site-header" role="banner">
      <div class="container">
        <div class="header-top">
          <!-- Brand Logo -->
          <div class="brand-logo" onclick="window.appRouter.navigate('home')" role="button" tabindex="0" aria-label="Nexora Home">
            <div class="brand-crest">N</div>
            <div class="brand-text-container">
              <span class="brand-title">Nex<span>ora</span></span>
              <span class="brand-tagline">Premium Commerce</span>
            </div>
          </div>

          <!-- Location Selector (Amazon / Flipkart Pattern) -->
          <div class="location-selector" onclick="window.appModals.openAddressModal()" role="button" tabindex="0" aria-label="Change Delivery Location">
            <div class="location-icon">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
            </div>
            <div class="location-text">
              <div class="location-label">Deliver to Bengaluru</div>
              <div class="location-val">
                <span>${state.pincode}</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>
          </div>

          <!-- Search Bar with Live Suggestions Dropdown -->
          <div class="search-container">
            <form class="search-box" id="header-search-form" onsubmit="event.preventDefault(); window.appActions.handleSearchSubmit();">
              <select class="search-category-select" id="header-search-category" aria-label="Select Search Category">
                <option value="all">All Categories</option>
                <option value="mobiles">Mobiles</option>
                <option value="electronics">Electronics</option>
                <option value="fashion">Fashion</option>
                <option value="appliances">Appliances</option>
                <option value="home">Home & Kitchen</option>
              </select>

              <input 
                type="text" 
                class="search-input" 
                id="header-search-input"
                placeholder="Search 1,00,000+ premium products, brands and deals..." 
                autocomplete="off"
                aria-label="Search products"
                oninput="window.appActions.handleSearchInput(this.value)"
                onfocus="window.appActions.showSearchDropdown()"
              />

              <div class="search-actions">
                <button type="button" class="header-action-btn" title="Visual Search" style="padding: 6px;" onclick="window.appStore.showToast('Visual Search ready. Upload or drop photo.', 'info')">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
                    <circle cx="12" cy="13" r="4"></circle>
                  </svg>
                </button>
                <button type="submit" class="search-btn" aria-label="Submit search">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </button>
              </div>
            </form>

            <!-- Search Suggestions Dropdown -->
            <div class="search-dropdown" id="search-dropdown-menu">
              <div class="suggestion-item" onclick="window.appActions.selectSuggestion('ANC Wireless Headphones')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <span><strong>ANC Wireless</strong> Over-Ear Headphones in Electronics</span>
              </div>
              <div class="suggestion-item" onclick="window.appActions.selectSuggestion('5G Ultra Pro Smartphone')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <span><strong>5G Ultra Pro</strong> 120Hz Curved AMOLED Smartphone</span>
              </div>
              <div class="suggestion-item" onclick="window.appActions.selectSuggestion('Ergonomic Office Chair')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <span><strong>Ergonomic</strong> SpineAlign High-Back Chair</span>
              </div>
              <div class="suggestion-item" onclick="window.appActions.selectSuggestion('Oxford Cotton Shirt')">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                <span><strong>Pure Cotton</strong> Casual Oxford Shirt</span>
              </div>
            </div>
          </div>

          <!-- Header Right Actions (Account, Wishlist, Cart) -->
          <nav class="header-actions" aria-label="Account and Cart">
            <!-- User Dashboard / Account -->
            <button 
              class="header-action-btn" 
              onclick="window.appRouter.navigate('dashboard')"
              aria-label="User Account"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>${userName}</span>
            </button>

            <!-- Wishlist Button -->
            <button 
              class="header-action-btn" 
              onclick="window.appRouter.navigate('dashboard', { dashboardTab: 'wishlist' })"
              aria-label="Wishlist with ${wishCount} items"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>Wishlist</span>
              ${wishCount > 0 ? `<span class="badge-count">${wishCount}</span>` : ''}
            </button>

            <!-- Cart Button -->
            <button 
              class="header-action-btn" 
              onclick="window.appRouter.navigate('cart')"
              aria-label="Cart with ${cartCount} items"
              style="font-weight: 700; color: var(--color-blue-700);"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span>Cart</span>
              ${cartCount > 0 ? `<span class="badge-count" style="background-color: var(--color-yellow-400);">${cartCount}</span>` : ''}
            </button>
          </nav>
        </div>
      </div>
    </header>
  `;
}
