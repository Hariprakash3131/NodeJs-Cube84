/**
 * AURA MOBILE COMMERCE - JAVASCRIPT APPLICATION CORE
 * Complete state management, interactive UI, cart, wishlist, checkout flow & modals.
 */

// ============================================================================
// 1. PRODUCT CATALOG DATA
// ============================================================================
const PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Apple iPhone 16 Pro Max 256GB',
    category: 'tech',
    categoryLabel: 'Smartphones',
    price: 1199,
    originalPrice: 1399,
    discount: '15% OFF',
    rating: 4.9,
    reviewCount: '2.4k',
    isFlashDeal: true,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=600&auto=format&fit=crop&q=80',
    colors: ['#3e3d40', '#dcd7cd', '#2b2c30', '#c5b49e'],
    colorNames: ['Black Titanium', 'White Titanium', 'Natural Titanium', 'Desert Titanium'],
    sizes: ['128 GB', '256 GB', '512 GB', '1 TB'],
    description: 'Forged in titanium and featuring the groundbreaking A18 Pro chip, customizable Action button, and the most powerful iPhone camera system ever.',
    features: ['A18 Pro Bionic chip', '48MP Fusion Camera', 'Super Retina XDR OLED', 'Up to 33 hrs battery']
  },
  {
    id: 'prod-2',
    name: 'Sony WH-1000XM5 Noise Cancelling',
    category: 'tech',
    categoryLabel: 'Audio',
    price: 348,
    originalPrice: 399,
    discount: '12% OFF',
    rating: 4.8,
    reviewCount: '1.8k',
    isFlashDeal: true,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    colors: ['#1c1c1e', '#e5e3df', '#1e293b'],
    colorNames: ['Midnight Black', 'Silver Ecru', 'Navy Blue'],
    sizes: ['Standard'],
    description: 'Industry-leading noise cancellation optimized with two processors and 8 microphones. Exceptional sound engineered to perfection with High-Res Audio.',
    features: ['30-hour battery life', 'Ultra-comfortable fit', 'Multipoint connection', 'Speak-to-Chat']
  },
  {
    id: 'prod-3',
    name: 'Nike Air Jordan 1 Retro High OG',
    category: 'footwear',
    categoryLabel: 'Sneakers',
    price: 180,
    originalPrice: 220,
    discount: '18% OFF',
    rating: 4.9,
    reviewCount: '3.1k',
    isFlashDeal: false,
    image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=600&auto=format&fit=crop&q=80',
    colors: ['#dc2626', '#2563eb', '#18181b'],
    colorNames: ['Chicago Red', 'Royal Blue', 'Shadow Black'],
    sizes: ['US 8', 'US 9', 'US 10', 'US 11'],
    description: 'The sneaker that started it all. Premium genuine leather construction with encapsulated Air-Sole cushioning delivers legendary comfort and heritage aesthetic.',
    features: ['Encapsulated Air unit', 'Genuine leather upper', 'Solid rubber outsole', 'Iconic Wings logo']
  },
  {
    id: 'prod-4',
    name: 'Apple Watch Ultra 2 Titanium GPS',
    category: 'tech',
    categoryLabel: 'Wearables',
    price: 799,
    originalPrice: 849,
    discount: '6% OFF',
    rating: 4.9,
    reviewCount: '950',
    isFlashDeal: true,
    image: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=600&auto=format&fit=crop&q=80',
    colors: ['#e2e8f0', '#f97316', '#0284c7'],
    colorNames: ['Titanium Orange', 'Trail Loop Grey', 'Ocean Blue'],
    sizes: ['49mm'],
    description: 'The most rugged and capable Apple Watch. Built for endurance athletes, outdoor adventurers, and water sports lovers with an all-new S9 SiP.',
    features: ['3000 nits display', 'Precision dual-frequency GPS', 'Up to 72 hrs battery', '100m water resistance']
  },
  {
    id: 'prod-5',
    name: 'Heavyweight Fleece Boxy Hoodie',
    category: 'fashion',
    categoryLabel: 'Apparel',
    price: 85,
    originalPrice: 120,
    discount: '30% OFF',
    rating: 4.7,
    reviewCount: '820',
    isFlashDeal: false,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=600&auto=format&fit=crop&q=80',
    colors: ['#334155', '#e2e8f0', '#451a03'],
    colorNames: ['Washed Charcoal', 'Off-White', 'Earthy Mocha'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Crafted from 480GSM premium french terry cotton. Features a relaxed drop-shoulder silhouette, double-layered hood, and ribbed hems for everyday comfort.',
    features: ['100% Organic Cotton', '480GSM Heavyweight', 'Drop shoulder fit', 'Pre-shrunk fabric']
  },
  {
    id: 'prod-6',
    name: 'Ray-Ban Wayfarer Polarized Sunglasses',
    category: 'accessories',
    categoryLabel: 'Eyewear',
    price: 165,
    originalPrice: 210,
    discount: '22% OFF',
    rating: 4.8,
    reviewCount: '1.2k',
    isFlashDeal: false,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&auto=format&fit=crop&q=80',
    colors: ['#0f172a', '#78350f', '#047857'],
    colorNames: ['Gloss Black', 'Tortoise Brown', 'Forest Green'],
    sizes: ['50mm Standard', '54mm Large'],
    description: 'An iconic symbol of effortless style since 1956. Polarized crystal lenses eliminate glare, enhance contrast, and provide 100% UV400 protection.',
    features: ['Polarized UV400 lenses', 'Handmade acetate frame', 'Signature silver rivets', 'Includes leather case']
  },
  {
    id: 'prod-7',
    name: 'Peak Design Everyday Sling 6L',
    category: 'accessories',
    categoryLabel: 'Bags',
    price: 119,
    originalPrice: 140,
    discount: '15% OFF',
    rating: 4.9,
    reviewCount: '640',
    isFlashDeal: false,
    image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=600&auto=format&fit=crop&q=80',
    colors: ['#1e293b', '#64748b', '#064e3b'],
    colorNames: ['Black', 'Ash Grey', 'Midnight Forest'],
    sizes: ['6 Liters'],
    description: 'The ideal compact, versatile sling for camera gear or daily essentials. Weatherproof 100% recycled nylon canvas shell with custom FlexFold dividers.',
    features: ['Weatherproof 400D nylon', 'FlexFold interior dividers', 'External carry straps', 'Dedicated tablet sleeve']
  },
  {
    id: 'prod-8',
    name: 'New Balance 9060 Moon Daze',
    category: 'footwear',
    categoryLabel: 'Sneakers',
    price: 150,
    originalPrice: 175,
    discount: '14% OFF',
    rating: 4.8,
    reviewCount: '1.1k',
    isFlashDeal: true,
    image: 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=600&auto=format&fit=crop&q=80',
    colors: ['#94a3b8', '#0f172a', '#e2e8f0'],
    colorNames: ['Grey Cloud', 'Castlerock', 'Sea Salt'],
    sizes: ['US 7', 'US 8', 'US 9', 'US 10', 'US 11'],
    description: 'A futuristic expression of refined style. Featuring ABZORB and SBS cushioning along with an undulating sculpted midsole for supreme daily comfort.',
    features: ['Dual-density ABZORB midsole', 'Mesh and pigskin suede upper', 'Diamond outsole pattern', 'Heritage 99X cues']
  }
];

// ============================================================================
// 2. STATE MANAGEMENT
// ============================================================================
const AppState = {
  products: [...PRODUCTS],
  cart: [],
  wishlist: ['prod-1', 'prod-3'], // default saved items for instant demonstration
  activeCategory: 'all',
  activeTab: 'home',
  searchQuery: '',
  sortBy: 'popular',
  appliedPromo: null,
  promoDiscountRatio: 0,
  selectedProductForDetail: null,
  activeDetailColorIndex: 0,
  activeDetailSize: null
};

// ============================================================================
// 3. INITIALIZATION & LIFECYCLE
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initClock();
  initTheme();
  initStories();
  initCategoryChips();
  initProductGrid();
  initSearch();
  initSort();
  initBottomNav();
  initSheets();
  initFlashTimer();
  initPromoSystem();
  initCheckoutFlow();
  updateCartBadge();
  updateWishlistBadge();
});

// Real-time mobile clock
function initClock() {
  const clockEl = document.getElementById('statusClock');
  if (!clockEl) return;
  const update = () => {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${hours}:${minutes}`;
  };
  update();
  setInterval(update, 10000);
}

// Dark/Light Mode Theme
function initTheme() {
  const savedTheme = localStorage.getItem('aura_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  const themeBtn = document.getElementById('themeToggleBtn');
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('aura_theme', next);
      updateThemeIcon(next);
      showToast(`Switched to ${next} mode`, '🌓');
    });
  }
}

function updateThemeIcon(theme) {
  const btn = document.getElementById('themeToggleBtn');
  if (!btn) return;
  btn.innerHTML = theme === 'dark' 
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
}

// Device Switcher Toolbar (for desktop preview testing)
window.setDevicePreview = function(mode) {
  const container = document.getElementById('mobileDeviceContainer');
  const btns = document.querySelectorAll('.device-btn');
  btns.forEach(b => b.classList.remove('active'));
  
  if (mode === 'iphone') {
    container.style.maxWidth = '430px';
    container.style.height = '900px';
    container.style.borderRadius = '44px';
    document.getElementById('btnIphone')?.classList.add('active');
  } else if (mode === 'pixel') {
    container.style.maxWidth = '390px';
    container.style.height = '844px';
    container.style.borderRadius = '38px';
    document.getElementById('btnPixel')?.classList.add('active');
  } else if (mode === 'fluid') {
    container.style.maxWidth = '600px';
    container.style.height = '100vh';
    container.style.borderRadius = '0px';
    document.getElementById('btnFluid')?.classList.add('active');
  }
};

// ============================================================================
// 4. STORIES & HIGHLIGHTS
// ============================================================================
const STORIES = [
  { id: 1, title: 'Flash Deals', img: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=120&auto=format&fit=crop&q=80' },
  { id: 2, title: 'New Drops', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&auto=format&fit=crop&q=80' },
  { id: 3, title: 'Sneakers', img: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=120&auto=format&fit=crop&q=80' },
  { id: 4, title: 'Audio Lab', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=120&auto=format&fit=crop&q=80' },
  { id: 5, title: 'Apparel', img: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=120&auto=format&fit=crop&q=80' },
  { id: 6, title: 'Accessories', img: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=120&auto=format&fit=crop&q=80' }
];

function initStories() {
  const container = document.getElementById('storiesContainer');
  if (!container) return;
  container.innerHTML = STORIES.map(s => `
    <div class="story-item" onclick="filterByCategory('${s.title.toLowerCase().includes('sneaker') ? 'footwear' : s.title.toLowerCase().includes('audio') ? 'tech' : s.title.toLowerCase().includes('apparel') ? 'fashion' : 'all'}')">
      <div class="story-avatar-ring">
        <img class="story-avatar-img" src="${s.img}" alt="${s.title}" loading="lazy" />
      </div>
      <span class="story-label">${s.title}</span>
    </div>
  `).join('');
}

// Flash Deal Countdown Timer
function initFlashTimer() {
  let secondsRemaining = 4 * 3600 + 28 * 60 + 45; // 4 hours 28 mins
  const hEl = document.getElementById('timerH');
  const mEl = document.getElementById('timerM');
  const sEl = document.getElementById('timerS');

  if (!hEl || !mEl || !sEl) return;

  setInterval(() => {
    if (secondsRemaining <= 0) secondsRemaining = 24 * 3600;
    secondsRemaining--;

    const h = Math.floor(secondsRemaining / 3600);
    const m = Math.floor((secondsRemaining % 3600) / 60);
    const s = secondsRemaining % 60;

    hEl.textContent = String(h).padStart(2, '0');
    mEl.textContent = String(m).padStart(2, '0');
    sEl.textContent = String(s).padStart(2, '0');
  }, 1000);
}

// ============================================================================
// 5. CATEGORIES & FILTERING
// ============================================================================
const CATEGORIES = [
  { id: 'all', name: 'All Products', icon: '✨' },
  { id: 'tech', name: 'Electronics', icon: '⚡' },
  { id: 'footwear', name: 'Sneakers', icon: '👟' },
  { id: 'fashion', name: 'Fashion', icon: '👕' },
  { id: 'accessories', name: 'Accessories', icon: '🎒' }
];

function initCategoryChips() {
  const container = document.getElementById('categoryChips');
  if (!container) return;
  container.innerHTML = CATEGORIES.map(cat => `
    <button class="category-chip ${cat.id === AppState.activeCategory ? 'active' : ''}" 
            onclick="filterByCategory('${cat.id}')">
      <span>${cat.icon}</span>
      <span>${cat.name}</span>
    </button>
  `).join('');
}

window.filterByCategory = function(catId) {
  AppState.activeCategory = catId;
  initCategoryChips();
  renderProducts();
};

// Search handling
function initSearch() {
  const input = document.getElementById('searchInput');
  const clearBtn = document.getElementById('searchClearBtn');
  if (!input) return;

  input.addEventListener('input', (e) => {
    AppState.searchQuery = e.target.value.trim().toLowerCase();
    if (AppState.searchQuery.length > 0) {
      clearBtn.classList.add('active');
    } else {
      clearBtn.classList.remove('active');
    }
    renderProducts();
  });

  clearBtn.addEventListener('click', () => {
    input.value = '';
    AppState.searchQuery = '';
    clearBtn.classList.remove('active');
    renderProducts();
    input.focus();
  });
}

// Sort handling
function initSort() {
  const select = document.getElementById('sortSelect');
  if (!select) return;
  select.addEventListener('change', (e) => {
    AppState.sortBy = e.target.value;
    renderProducts();
  });
}

// ============================================================================
// 6. PRODUCT RENDERING & INTERACTIONS
// ============================================================================
function initProductGrid() {
  renderProducts();
}

function renderProducts() {
  const grid = document.getElementById('productsGrid');
  const countEl = document.getElementById('resultsCount');
  if (!grid) return;

  // 1. Filter
  let list = AppState.products.filter(p => {
    const matchCat = AppState.activeCategory === 'all' || p.category === AppState.activeCategory;
    const matchSearch = AppState.searchQuery === '' || 
      p.name.toLowerCase().includes(AppState.searchQuery) || 
      p.categoryLabel.toLowerCase().includes(AppState.searchQuery);
    return matchCat && matchSearch;
  });

  // 2. Sort
  if (AppState.sortBy === 'price-low') {
    list.sort((a, b) => a.price - b.price);
  } else if (AppState.sortBy === 'price-high') {
    list.sort((a, b) => b.price - a.price);
  } else if (AppState.sortBy === 'rating') {
    list.sort((a, b) => b.rating - a.rating);
  }

  if (countEl) {
    countEl.textContent = `${list.length} item${list.length === 1 ? '' : 's'}`;
  }

  if (list.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 40px 10px; color: var(--text-secondary);">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 10px; opacity: 0.5;">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <p style="font-weight: 700; font-size: 15px; margin-bottom: 4px;">No products match your search</p>
        <p style="font-size: 13px;">Try clearing filters or search with another term.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = list.map(prod => {
    const isWishlisted = AppState.wishlist.includes(prod.id);
    const cartItem = AppState.cart.find(c => c.productId === prod.id);
    const qty = cartItem ? cartItem.quantity : 0;

    return `
      <div class="product-card" onclick="openProductDetail('${prod.id}')">
        <div class="product-image-box">
          <img class="product-card-img" src="${prod.image}" alt="${prod.name}" loading="lazy" />
          <span class="discount-tag">${prod.discount}</span>
          <button class="fav-btn ${isWishlisted ? 'active' : ''}" 
                  onclick="event.stopPropagation(); toggleWishlist('${prod.id}')"
                  title="Save to Wishlist">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="${isWishlisted ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2.2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
        </div>

        <div class="product-info">
          <div class="product-rating">
            <svg class="star-icon" width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            <strong>${prod.rating}</strong>
            <span class="rating-count">(${prod.reviewCount})</span>
          </div>

          <h3 class="product-title">${prod.name}</h3>

          <div class="price-row">
            <span class="current-price">$${prod.price}</span>
            <span class="original-price">$${prod.originalPrice}</span>
          </div>

          <div class="card-action-row" onclick="event.stopPropagation()">
            ${qty > 0 ? `
              <div class="card-stepper">
                <button class="stepper-btn" onclick="updateCartQuantity('${cartItem.id}', -1)">-</button>
                <span class="stepper-val">${qty}</span>
                <button class="stepper-btn" onclick="updateCartQuantity('${cartItem.id}', 1)">+</button>
              </div>
            ` : `
              <button class="card-add-btn" onclick="quickAddToCart('${prod.id}')">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M12 5v14M5 12h14"/>
                </svg>
                <span>Add to Cart</span>
              </button>
            `}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// ============================================================================
// 7. WISHLIST MANAGEMENT
// ============================================================================
window.toggleWishlist = function(productId) {
  const index = AppState.wishlist.indexOf(productId);
  const prod = AppState.products.find(p => p.id === productId);
  if (index >= 0) {
    AppState.wishlist.splice(index, 1);
    showToast(`Removed from saved items`, '🤍');
  } else {
    AppState.wishlist.push(productId);
    showToast(`Saved to wishlist!`, '❤️');
  }
  updateWishlistBadge();
  renderProducts();
  if (AppState.activeTab === 'wishlist') {
    renderWishlistTab();
  }
};

function updateWishlistBadge() {
  const badge = document.getElementById('wishlistNavBadge');
  if (!badge) return;
  const count = AppState.wishlist.length;
  badge.textContent = count;
  badge.style.display = count > 0 ? 'flex' : 'none';
}

function renderWishlistTab() {
  const container = document.getElementById('wishlistItemsContainer');
  if (!container) return;

  const savedProds = AppState.products.filter(p => AppState.wishlist.includes(p.id));

  if (savedProds.length === 0) {
    container.innerHTML = `
      <div class="empty-state-card">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
        <h4 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Your Wishlist is Empty</h4>
        <p style="font-size: 13px;">Explore our catalog and tap the heart icon on items you love.</p>
        <button class="btn-primary" style="margin: 20px auto 0 auto; max-width: 200px;" onclick="switchTab('home')">
          Explore Products
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = savedProds.map(prod => `
    <div class="cart-item-row" style="margin-bottom: 10px;">
      <img class="cart-item-img" src="${prod.image}" alt="${prod.name}" />
      <div class="cart-item-details">
        <div>
          <h4 class="cart-item-title">${prod.name}</h4>
          <span class="cart-item-variant">${prod.categoryLabel}</span>
        </div>
        <div class="cart-item-bottom">
          <span class="cart-item-price">$${prod.price}</span>
          <button class="card-add-btn" style="width: auto; padding: 0 12px;" onclick="quickAddToCart('${prod.id}')">
            Move to Cart
          </button>
        </div>
      </div>
      <button class="cart-remove-btn" onclick="toggleWishlist('${prod.id}')" title="Remove">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `).join('');
}

// ============================================================================
// 8. CART MANAGEMENT & PROMO CODES
// ============================================================================
window.quickAddToCart = function(productId) {
  const prod = AppState.products.find(p => p.id === productId);
  if (!prod) return;

  const defaultColor = prod.colorNames[0];
  const defaultSize = prod.sizes[0];

  addToCart(prod, defaultColor, defaultSize, 1);
};

function addToCart(product, color, size, qty = 1) {
  const itemKey = `${product.id}-${color}-${size}`;
  const existing = AppState.cart.find(c => c.id === itemKey);

  if (existing) {
    existing.quantity += qty;
  } else {
    AppState.cart.push({
      id: itemKey,
      productId: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedColor: color,
      selectedSize: size,
      quantity: qty
    });
  }

  updateCartBadge();
  renderProducts();
  renderCartSheet();
  showToast(`Added to cart!`, '🛍️');
}

window.updateCartQuantity = function(cartItemId, delta) {
  const item = AppState.cart.find(c => c.id === cartItemId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    AppState.cart = AppState.cart.filter(c => c.id !== cartItemId);
    showToast(`Item removed from cart`, '🗑️');
  }

  updateCartBadge();
  renderProducts();
  renderCartSheet();
};

window.removeCartItem = function(cartItemId) {
  AppState.cart = AppState.cart.filter(c => c.id !== cartItemId);
  showToast(`Item removed`, '🗑️');
  updateCartBadge();
  renderProducts();
  renderCartSheet();
};

function updateCartBadge() {
  const badge = document.getElementById('cartNavBadge');
  const headerBadge = document.getElementById('cartHeaderBadge');
  const count = AppState.cart.reduce((sum, item) => sum + item.quantity, 0);

  if (badge) {
    badge.textContent = count;
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
  if (headerBadge) {
    headerBadge.textContent = count;
    headerBadge.style.display = count > 0 ? 'flex' : 'none';
  }
}

function renderCartSheet() {
  const listEl = document.getElementById('cartItemsList');
  const subtotalEl = document.getElementById('summarySubtotal');
  const discountEl = document.getElementById('summaryDiscount');
  const shippingEl = document.getElementById('summaryShipping');
  const taxEl = document.getElementById('summaryTax');
  const totalEl = document.getElementById('summaryTotal');
  const checkoutBtn = document.getElementById('cartCheckoutBtn');

  if (!listEl) return;

  if (AppState.cart.length === 0) {
    listEl.innerHTML = `
      <div class="empty-state-card">
        <svg class="empty-state-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/>
          <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
        </svg>
        <h4 style="font-size: 16px; font-weight: 700; color: var(--text-primary); margin-bottom: 6px;">Your Bag is Empty</h4>
        <p style="font-size: 13px;">Looks like you haven't added any items to your shopping bag yet.</p>
        <button class="btn-primary" style="margin: 20px auto 0 auto; max-width: 200px;" onclick="closeBottomSheet('cartSheet'); switchTab('home')">
          Start Shopping
        </button>
      </div>
    `;
    if (subtotalEl) subtotalEl.textContent = '$0.00';
    if (discountEl) discountEl.textContent = '-$0.00';
    if (shippingEl) shippingEl.textContent = '$0.00';
    if (taxEl) taxEl.textContent = '$0.00';
    if (totalEl) totalEl.textContent = '$0.00';
    if (checkoutBtn) checkoutBtn.disabled = true;
    return;
  }

  if (checkoutBtn) checkoutBtn.disabled = false;

  listEl.innerHTML = AppState.cart.map(item => `
    <div class="cart-item-row">
      <img class="cart-item-img" src="${item.image}" alt="${item.name}" />
      <div class="cart-item-details">
        <div>
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-variant">${item.selectedColor} • ${item.selectedSize}</span>
        </div>
        <div class="cart-item-bottom">
          <span class="cart-item-price">$${item.price}</span>
          <div class="cart-stepper-box">
            <button class="cart-stepper-btn" onclick="updateCartQuantity('${item.id}', -1)">−</button>
            <span style="font-size: 13px; font-weight: 700; min-width: 16px; text-align: center;">${item.quantity}</span>
            <button class="cart-stepper-btn" onclick="updateCartQuantity('${item.id}', 1)">+</button>
          </div>
        </div>
      </div>
      <button class="cart-remove-btn" onclick="removeCartItem('${item.id}')" title="Remove">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
  `).join('');

  // Calculate totals
  const subtotal = AppState.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const discountVal = subtotal * AppState.promoDiscountRatio;
  const shippingVal = (subtotal > 100 || AppState.appliedPromo === 'FREESHIP') ? 0 : 15;
  const taxVal = (subtotal - discountVal) * 0.08; // 8% sales tax
  const totalVal = Math.max(0, subtotal - discountVal + shippingVal + taxVal);

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (discountEl) discountEl.textContent = `-$${discountVal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = shippingVal === 0 ? 'FREE' : `$${shippingVal.toFixed(2)}`;
  if (taxEl) taxEl.textContent = `$${taxVal.toFixed(2)}`;
  if (totalEl) totalEl.textContent = `$${totalVal.toFixed(2)}`;
}

// Promo code engine
function initPromoSystem() {
  const applyBtn = document.getElementById('applyPromoBtn');
  const input = document.getElementById('promoInput');

  if (!applyBtn || !input) return;

  applyBtn.addEventListener('click', () => {
    const code = input.value.trim().toUpperCase();
    if (!code) return;

    if (code === 'SAVE20') {
      AppState.appliedPromo = code;
      AppState.promoDiscountRatio = 0.20;
      showToast('20% Discount applied! 🎉', '🏷️');
    } else if (code === 'FREESHIP') {
      AppState.appliedPromo = code;
      AppState.promoDiscountRatio = 0;
      showToast('Free Express Shipping applied! 🚀', '📦');
    } else if (code === 'AURA10') {
      AppState.appliedPromo = code;
      AppState.promoDiscountRatio = 0.10;
      showToast('10% VIP Discount applied! ✨', '💎');
    } else {
      showToast('Invalid promo code. Try SAVE20', '⚠️');
      return;
    }

    renderCartSheet();
  });
}

// ============================================================================
// 9. PRODUCT DETAIL BOTTOM SHEET
// ============================================================================
window.openProductDetail = function(productId) {
  const prod = AppState.products.find(p => p.id === productId);
  if (!prod) return;

  AppState.selectedProductForDetail = prod;
  AppState.activeDetailColorIndex = 0;
  AppState.activeDetailSize = prod.sizes[0];

  const sheet = document.getElementById('productDetailSheet');
  const backdrop = document.getElementById('sheetBackdrop');

  document.getElementById('detailImage').src = prod.image;
  document.getElementById('detailCategory').textContent = prod.categoryLabel;
  document.getElementById('detailTitle').textContent = prod.name;
  document.getElementById('detailRating').textContent = prod.rating;
  document.getElementById('detailReviews').textContent = `(${prod.reviewCount} reviews)`;
  document.getElementById('detailPrice').textContent = `$${prod.price}`;
  document.getElementById('detailOldPrice').textContent = `$${prod.originalPrice}`;
  document.getElementById('detailDiscount').textContent = prod.discount;
  document.getElementById('detailDescription').textContent = prod.description;

  // Render Color Swatches
  const colorContainer = document.getElementById('detailColorSwatches');
  const colorLabel = document.getElementById('selectedColorLabel');
  colorLabel.textContent = prod.colorNames[0];

  colorContainer.innerHTML = prod.colors.map((c, idx) => `
    <div class="color-swatch ${idx === 0 ? 'active' : ''}" 
         style="background-color: ${c};" 
         onclick="selectDetailColor(${idx})"
         title="${prod.colorNames[idx]}"></div>
  `).join('');

  // Render Size Chips
  const sizeContainer = document.getElementById('detailSizeChips');
  sizeContainer.innerHTML = prod.sizes.map((s, idx) => `
    <button class="size-chip ${idx === 0 ? 'active' : ''}" onclick="selectDetailSize('${s}', this)">
      ${s}
    </button>
  `).join('');

  // Render Feature Highlights
  const featContainer = document.getElementById('detailFeatures');
  featContainer.innerHTML = prod.features.map(f => `
    <div class="guarantee-card">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
      <span>${f}</span>
    </div>
  `).join('');

  sheet.classList.add('active');
  backdrop.classList.add('active');
};

window.selectDetailColor = function(idx) {
  AppState.activeDetailColorIndex = idx;
  const prod = AppState.selectedProductForDetail;
  document.getElementById('selectedColorLabel').textContent = prod.colorNames[idx];

  const swatches = document.querySelectorAll('.color-swatch');
  swatches.forEach((s, i) => s.classList.toggle('active', i === idx));
};

window.selectDetailSize = function(size, btnEl) {
  AppState.activeDetailSize = size;
  const chips = document.querySelectorAll('.size-chip');
  chips.forEach(c => c.classList.remove('active'));
  btnEl.classList.add('active');
};

window.addCurrentDetailToCart = function() {
  const prod = AppState.selectedProductForDetail;
  if (!prod) return;

  const colorName = prod.colorNames[AppState.activeDetailColorIndex];
  const size = AppState.activeDetailSize || prod.sizes[0];

  addToCart(prod, colorName, size, 1);
  closeBottomSheet('productDetailSheet');
};

window.buyNowCurrentDetail = function() {
  addCurrentDetailToCart();
  closeBottomSheet('productDetailSheet');
  openCartSheet();
  setTimeout(() => {
    openCheckout();
  }, 300);
};

// ============================================================================
// 10. CHECKOUT FLOW & CELEBRATION MODAL
// ============================================================================
function initCheckoutFlow() {
  const form = document.getElementById('checkoutForm');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    processOrder();
  });
}

window.openCheckout = function() {
  if (AppState.cart.length === 0) {
    showToast('Your cart is empty', '⚠️');
    return;
  }
  closeBottomSheet('cartSheet');
  const sheet = document.getElementById('checkoutSheet');
  const backdrop = document.getElementById('sheetBackdrop');
  sheet.classList.add('active');
  backdrop.classList.add('active');

  const totalEl = document.getElementById('summaryTotal');
  const checkoutAmountEl = document.getElementById('checkoutAmount');
  if (checkoutAmountEl && totalEl) {
    checkoutAmountEl.textContent = totalEl.textContent;
  }
};

window.selectPaymentMethod = function(cardEl) {
  const cards = document.querySelectorAll('.payment-option-card');
  cards.forEach(c => c.classList.remove('selected'));
  cardEl.classList.add('selected');
  const radio = cardEl.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;
};

function processOrder() {
  const submitBtn = document.getElementById('placeOrderBtn');
  if (submitBtn) {
    submitBtn.innerHTML = `<span>Processing payment...</span>`;
    submitBtn.disabled = true;
  }

  setTimeout(() => {
    closeBottomSheet('checkoutSheet');
    if (submitBtn) {
      submitBtn.innerHTML = `<span>Place Order & Pay</span>`;
      submitBtn.disabled = false;
    }

    const orderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
    const orderTotal = document.getElementById('summaryTotal')?.textContent || '$0.00';

    // Show celebration screen
    document.getElementById('receiptOrderId').textContent = orderId;
    document.getElementById('receiptAmount').textContent = orderTotal;
    document.getElementById('receiptItemCount').textContent = `${AppState.cart.length} unique products`;

    const successSheet = document.getElementById('orderSuccessSheet');
    const backdrop = document.getElementById('sheetBackdrop');
    successSheet.classList.add('active');
    backdrop.classList.add('active');

    // Trigger Confetti
    launchConfetti();

    // Reset Cart
    AppState.cart = [];
    AppState.appliedPromo = null;
    AppState.promoDiscountRatio = 0;
    updateCartBadge();
    renderProducts();
    renderCartSheet();
  }, 1200);
}

// Celebration Confetti Effect
function launchConfetti() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  canvas.width = canvas.parentElement.clientWidth;
  canvas.height = canvas.parentElement.clientHeight;

  const particles = [];
  const colors = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#3b82f6'];

  for (let i = 0; i < 60; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 12,
      vy: (Math.random() - 0.8) * 14,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      rotation: Math.random() * 360,
      vRot: (Math.random() - 0.5) * 10
    });
  }

  function frame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let activeCount = 0;

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.35; // gravity
      p.alpha -= 0.015;
      p.rotation += p.vRot;

      if (p.alpha > 0) {
        activeCount++;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      }
    });

    if (activeCount > 0) {
      requestAnimationFrame(frame);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  requestAnimationFrame(frame);
}

// ============================================================================
// 11. NAVIGATION & BOTTOM SHEETS
// ============================================================================
function initBottomNav() {
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.dataset.tab;
      switchTab(tab);
    });
  });
}

window.switchTab = function(tabName) {
  AppState.activeTab = tabName;

  // Update nav buttons
  const tabBtns = document.querySelectorAll('.nav-tab-btn');
  tabBtns.forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabName);
  });

  const mainHome = document.getElementById('homeTabContent');
  const wishlistView = document.getElementById('wishlistView');
  const profileView = document.getElementById('profileView');

  if (tabName === 'home' || tabName === 'explore') {
    if (mainHome) mainHome.style.display = 'block';
    if (wishlistView) wishlistView.classList.remove('active');
    if (profileView) profileView.classList.remove('active');
    if (tabName === 'explore') {
      document.getElementById('searchInput')?.focus();
    }
  } else if (tabName === 'wishlist') {
    if (mainHome) mainHome.style.display = 'none';
    if (wishlistView) wishlistView.classList.add('active');
    if (profileView) profileView.classList.remove('active');
    renderWishlistTab();
  } else if (tabName === 'cart') {
    openCartSheet();
  } else if (tabName === 'profile') {
    if (mainHome) mainHome.style.display = 'none';
    if (wishlistView) wishlistView.classList.remove('active');
    if (profileView) profileView.classList.add('active');
  }
};

window.openCartSheet = function() {
  renderCartSheet();
  const sheet = document.getElementById('cartSheet');
  const backdrop = document.getElementById('sheetBackdrop');
  sheet.classList.add('active');
  backdrop.classList.add('active');
};

function initSheets() {
  const backdrop = document.getElementById('sheetBackdrop');
  if (!backdrop) return;

  backdrop.addEventListener('click', () => {
    closeAllSheets();
  });
}

window.closeBottomSheet = function(sheetId) {
  const sheet = document.getElementById(sheetId);
  const backdrop = document.getElementById('sheetBackdrop');
  if (sheet) sheet.classList.remove('active');
  if (backdrop) backdrop.classList.remove('active');
};

window.closeAllSheets = function() {
  document.querySelectorAll('.bottom-sheet').forEach(s => s.classList.remove('active'));
  document.getElementById('sheetBackdrop')?.classList.remove('active');
};

// ============================================================================
// 12. TOAST NOTIFICATION UTILITY
// ============================================================================
window.showToast = function(msg, icon = '✨') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast-message';
  toast.innerHTML = `<span>${icon}</span> <span>${msg}</span>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2800);
};
