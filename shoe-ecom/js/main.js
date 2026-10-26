// Main UI Controller for Home / Catalog Page
let activeCategory = 'all';
let searchQuery = '';
let activeSort = 'featured';
let selectedQuickViewShoe = null;
let quickViewSelectedSize = null;
let quickViewSelectedColor = null;
let quickViewQuantity = 1;

// Mobile Navigation Toggle
function initMobileMenu() {
  const toggleBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-close-btn');
  const drawer = document.getElementById('mobile-drawer');
  const backdrop = document.getElementById('mobile-drawer-backdrop');

  if (!toggleBtn || !drawer || !backdrop) return;

  function openMenu() {
    drawer.classList.remove('translate-x-full');
    backdrop.classList.remove('opacity-0', 'pointer-events-none');
    backdrop.classList.add('opacity-100');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    drawer.classList.add('translate-x-full');
    backdrop.classList.remove('opacity-100');
    backdrop.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  toggleBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);
  backdrop.addEventListener('click', closeMenu);
}

// Render Products Grid
function renderProducts() {
  const container = document.getElementById('products-grid');
  const countBadge = document.getElementById('product-count-badge');
  if (!container) return;

  let filtered = [...PRODUCTS];

  // Category filter
  if (activeCategory !== 'all') {
    filtered = filtered.filter(p => p.category.toLowerCase() === activeCategory.toLowerCase());
  }

  // Search filter
  if (searchQuery.trim() !== '') {
    const q = searchQuery.toLowerCase().trim();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q)
    );
  }

  // Sorting
  if (activeSort === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (activeSort === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (activeSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (countBadge) {
    countBadge.textContent = `${filtered.length} shoes found`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full py-16 text-center">
        <div class="w-20 h-20 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center text-3xl">👟</div>
        <h3 class="text-xl font-bold text-slate-800 mb-2">No matching kicks found</h3>
        <p class="text-slate-500 max-w-md mx-auto text-sm">We couldn't find any shoes matching your search. Try resetting filters or searching for "Air", "Running", or "Retro".</p>
        <button onclick="resetFilters()" class="mt-5 px-6 py-2.5 bg-slate-900 text-white rounded-full text-sm font-semibold hover:bg-red-500 transition cursor-pointer">
          Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(shoe => {
    const wishlisted = isWishlisted(shoe.id);
    const badgeColor = shoe.badgeType === 'sale' ? 'bg-amber-500 text-white' :
                       shoe.badgeType === 'new' ? 'bg-blue-600 text-white' :
                       shoe.badgeType === 'limited' ? 'bg-purple-600 text-white' : 'bg-red-500 text-white';

    const defaultSize = shoe.sizes[0];
    const defaultColor = shoe.colors[0].name;

    return `
      <div class="product-card group relative bg-white rounded-3xl p-5 border border-slate-100/80 shadow-sm flex flex-col justify-between overflow-hidden">
        
        <!-- Top Tags & Wishlist -->
        <div class="flex items-center justify-between mb-2 z-10">
          <span class="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider ${badgeColor} shadow-sm">
            ${shoe.badge}
          </span>
          <button onclick="toggleWishlistBtn(${shoe.id}, this)" class="w-9 h-9 rounded-full bg-slate-50 hover:bg-red-50 border border-slate-100 flex items-center justify-center transition cursor-pointer group/wish" title="Add to Wishlist">
            <svg class="w-5 h-5 ${wishlisted ? 'fill-red-500 text-red-500' : 'text-slate-400 group-hover/wish:text-red-500'} transition" fill="${wishlisted ? 'currentColor' : 'none'}" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
            </svg>
          </button>
        </div>

        <!-- Shoe Image Container -->
        <div class="relative w-full h-52 sm:h-56 flex items-center justify-center my-2 cursor-pointer" onclick="openQuickView(${shoe.id})">
          <div class="absolute inset-0 bg-radial from-slate-100/90 to-transparent rounded-2xl -z-0"></div>
          <img src="${shoe.image}" alt="${shoe.name}" class="product-img w-full h-full object-contain drop-shadow-xl z-10" loading="lazy" />
          
          <!-- Hover Quick View Pill -->
          <div class="absolute bottom-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-20">
            <span class="px-4 py-1.5 rounded-full text-xs font-bold bg-slate-900/90 backdrop-blur text-white flex items-center gap-1.5 shadow-lg">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              Quick View
            </span>
          </div>
        </div>

        <!-- Product Info -->
        <div class="pt-2">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1">
            <span class="uppercase tracking-wider text-red-500">${shoe.brand}</span>
            <div class="flex items-center gap-1 text-amber-500 font-bold">
              <span>★</span>
              <span>${shoe.rating}</span>
              <span class="text-slate-400 font-normal">(${shoe.reviewsCount})</span>
            </div>
          </div>

          <h3 class="font-bold text-slate-900 text-lg leading-tight group-hover:text-red-500 transition cursor-pointer mb-2 line-clamp-1" onclick="openQuickView(${shoe.id})">
            ${shoe.name}
          </h3>

          <!-- Size Pills Quick View -->
          <div class="flex items-center gap-1 mb-4 flex-wrap">
            <span class="text-[11px] text-slate-400 mr-1 font-medium">Sizes:</span>
            ${shoe.sizes.slice(0, 4).map(s => `
              <span class="text-[11px] px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 font-medium">${s}</span>
            `).join('')}
            ${shoe.sizes.length > 4 ? `<span class="text-[10px] text-slate-400">+${shoe.sizes.length - 4}</span>` : ''}
          </div>

          <!-- Price & Action -->
          <div class="flex items-center justify-between pt-3 border-t border-slate-100">
            <div>
              <div class="flex items-baseline gap-2">
                <span class="text-xl font-extrabold text-slate-900">$${shoe.price}</span>
                ${shoe.originalPrice ? `<span class="text-xs text-slate-400 line-through">$${shoe.originalPrice}</span>` : ''}
              </div>
            </div>

            <button onclick="addToCart(${shoe.id}, ${defaultSize}, '${defaultColor}', 1)" class="px-4 py-2.5 rounded-2xl bg-slate-900 hover:bg-red-500 text-white font-semibold text-xs flex items-center gap-2 transition duration-200 shadow-md shadow-slate-900/10 hover:shadow-red-500/20 active:scale-95 cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
              <span>Add</span>
            </button>
          </div>

        </div>

      </div>
    `;
  }).join('');
}

// Wishlist button click on card
function toggleWishlistBtn(id, btnEl) {
  const active = toggleWishlist(id);
  const svg = btnEl.querySelector('svg');
  if (svg) {
    if (active) {
      svg.setAttribute('fill', 'currentColor');
      svg.classList.remove('text-slate-400');
      svg.classList.add('fill-red-500', 'text-red-500');
    } else {
      svg.setAttribute('fill', 'none');
      svg.classList.remove('fill-red-500', 'text-red-500');
      svg.classList.add('text-slate-400');
    }
  }
}

// Reset all filters
function resetFilters() {
  activeCategory = 'all';
  searchQuery = '';
  activeSort = 'featured';

  const searchInput = document.getElementById('search-input');
  if (searchInput) searchInput.value = '';

  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) sortSelect.value = 'featured';

  document.querySelectorAll('.cat-pill').forEach(btn => {
    if (btn.dataset.category === 'all') {
      btn.classList.add('bg-slate-900', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-600');
    } else {
      btn.classList.remove('bg-slate-900', 'text-white');
      btn.classList.add('bg-white', 'text-slate-600');
    }
  });

  renderProducts();
}

// Category filter button init
function initCategoryPills() {
  const pills = document.querySelectorAll('.cat-pill');
  pills.forEach(btn => {
    btn.addEventListener('click', () => {
      pills.forEach(b => {
        b.classList.remove('bg-slate-900', 'text-white');
        b.classList.add('bg-white', 'text-slate-600');
      });
      btn.classList.add('bg-slate-900', 'text-white');
      btn.classList.remove('bg-white', 'text-slate-600');

      activeCategory = btn.dataset.category;
      renderProducts();
    });
  });
}

// Sort dropdown init
function initSortSelect() {
  const sortSelect = document.getElementById('sort-select');
  if (!sortSelect) return;
  sortSelect.addEventListener('change', (e) => {
    activeSort = e.target.value;
    renderProducts();
  });
}

// Search bar input
function initSearch() {
  const searchInput = document.getElementById('search-input');
  if (!searchInput) return;

  searchInput.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
  });

  // Mobile search if present
  const mobileSearchInput = document.getElementById('mobile-search-input');
  if (mobileSearchInput) {
    mobileSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      if (searchInput) searchInput.value = searchQuery;
      renderProducts();
    });
  }
}

// Quick View Modal System
function openQuickView(id) {
  const product = PRODUCTS.find(p => p.id === Number(id));
  if (!product) return;

  selectedQuickViewShoe = product;
  quickViewSelectedSize = product.sizes[0];
  quickViewSelectedColor = product.colors[0].name;
  quickViewQuantity = 1;

  const modal = document.getElementById('quickview-modal');
  const content = document.getElementById('quickview-content');
  if (!modal || !content) return;

  content.innerHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      
      <!-- Shoe Photo with Glow -->
      <div class="relative bg-slate-50 rounded-3xl p-8 flex items-center justify-center border border-slate-100 overflow-hidden">
        <div class="absolute w-56 h-56 bg-red-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <img id="quickview-img" src="${product.image}" alt="${product.name}" class="w-full h-64 md:h-80 object-contain drop-shadow-2xl transform -rotate-12 hover:rotate-0 transition-transform duration-500" />
        <span class="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full uppercase bg-slate-900 text-white">
          ${product.brand}
        </span>
      </div>

      <!-- Details -->
      <div>
        <div class="flex items-center gap-2 mb-2">
          <span class="text-xs font-bold px-2.5 py-0.5 rounded-full bg-red-100 text-red-600 uppercase tracking-wider">
            ${product.badge}
          </span>
          <div class="flex items-center gap-1 text-amber-500 text-sm font-semibold">
            <span>★</span>
            <span>${product.rating}</span>
            <span class="text-slate-400 font-normal">(${product.reviewsCount} reviews)</span>
          </div>
        </div>

        <h2 class="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2 leading-tight">${product.name}</h2>
        
        <div class="flex items-baseline gap-3 mb-4">
          <span class="text-3xl font-black text-slate-900">$${product.price}</span>
          ${product.originalPrice ? `<span class="text-base text-slate-400 line-through">$${product.originalPrice}</span>` : ''}
          <span class="text-xs font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-700">In Stock</span>
        </div>

        <p class="text-sm text-slate-600 mb-6 leading-relaxed">
          ${product.description}
        </p>

        <!-- Color Selector -->
        <div class="mb-5">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span>Colorway:</span>
            <span id="quickview-color-label" class="text-red-500 font-bold">${quickViewSelectedColor}</span>
          </div>
          <div class="flex gap-2">
            ${product.colors.map((c, i) => `
              <button onclick="selectQuickViewColor('${c.name}', this)" class="w-8 h-8 rounded-full border-2 ${i === 0 ? 'border-red-500 scale-110 shadow-sm' : 'border-slate-200'} transition cursor-pointer p-0.5" title="${c.name}">
                <span class="block w-full h-full rounded-full" style="background-color: ${c.hex}"></span>
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Size Selector -->
        <div class="mb-6">
          <div class="flex items-center justify-between text-xs font-semibold text-slate-700 mb-2">
            <span>Select Size (US):</span>
            <span class="text-slate-400">Standard fit</span>
          </div>
          <div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
            ${product.sizes.map((s, i) => `
              <button onclick="selectQuickViewSize(${s}, this)" class="py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${i === 0 ? 'bg-slate-900 text-white border-slate-900' : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-slate-400'}">
                ${s}
              </button>
            `).join('')}
          </div>
        </div>

        <!-- Quantity & Add to Cart -->
        <div class="flex items-center gap-4">
          <div class="flex items-center border border-slate-200 rounded-2xl bg-slate-50 p-1">
            <button onclick="adjustQuickViewQty(-1)" class="w-8 h-8 rounded-xl bg-white text-slate-700 font-bold flex items-center justify-center hover:bg-slate-200 transition cursor-pointer">-</button>
            <span id="quickview-qty" class="w-10 text-center font-bold text-sm text-slate-800">1</span>
            <button onclick="adjustQuickViewQty(1)" class="w-8 h-8 rounded-xl bg-white text-slate-700 font-bold flex items-center justify-center hover:bg-slate-200 transition cursor-pointer">+</button>
          </div>

          <button onclick="addQuickViewToCart()" class="flex-1 py-3.5 px-6 rounded-2xl bg-red-500 hover:bg-red-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-500/25 active:scale-98 transition cursor-pointer">
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span>Add to Shopping Bag</span>
          </button>
        </div>

        <!-- Extra perks -->
        <div class="grid grid-cols-2 gap-3 mt-6 pt-5 border-t border-slate-100 text-xs text-slate-500">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <span>100% Authentic Guarantee</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
            <span>Free Express Delivery >$150</span>
          </div>
        </div>

      </div>

    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quickview-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
}

function selectQuickViewColor(colorName, btnEl) {
  quickViewSelectedColor = colorName;
  const label = document.getElementById('quickview-color-label');
  if (label) label.textContent = colorName;

  btnEl.parentElement.querySelectorAll('button').forEach(b => {
    b.classList.remove('border-red-500', 'scale-110', 'shadow-sm');
    b.classList.add('border-slate-200');
  });
  btnEl.classList.remove('border-slate-200');
  btnEl.classList.add('border-red-500', 'scale-110', 'shadow-sm');
}

function selectQuickViewSize(sizeVal, btnEl) {
  quickViewSelectedSize = sizeVal;
  btnEl.parentElement.querySelectorAll('button').forEach(b => {
    b.classList.remove('bg-slate-900', 'text-white', 'border-slate-900');
    b.classList.add('bg-slate-50', 'text-slate-700', 'border-slate-200');
  });
  btnEl.classList.remove('bg-slate-50', 'text-slate-700', 'border-slate-200');
  btnEl.classList.add('bg-slate-900', 'text-white', 'border-slate-900');
}

function adjustQuickViewQty(delta) {
  quickViewQuantity = Math.max(1, Math.min(10, quickViewQuantity + delta));
  const qtyEl = document.getElementById('quickview-qty');
  if (qtyEl) qtyEl.textContent = quickViewQuantity;
}

function addQuickViewToCart() {
  if (!selectedQuickViewShoe) return;
  addToCart(selectedQuickViewShoe.id, quickViewSelectedSize, quickViewSelectedColor, quickViewQuantity);
  closeQuickView();
}

// Hero shoe colorway interactive switcher
function initHeroColorSwitcher() {
  const dots = document.querySelectorAll('.hero-color-dot');
  const heroImg = document.getElementById('hero-shoe-image');
  if (!dots.length || !heroImg) return;

  const colorMap = [
    {
      img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=900&auto=format&fit=crop&q=80",
      glow: "rgba(239, 68, 68, 0.4)",
      label: "Infierno Red"
    },
    {
      img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=900&auto=format&fit=crop&q=80",
      glow: "rgba(37, 99, 235, 0.4)",
      label: "Royal Chicago"
    },
    {
      img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=900&auto=format&fit=crop&q=80",
      glow: "rgba(16, 185, 129, 0.4)",
      label: "Cyber Emerald"
    }
  ];

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      dots.forEach(d => d.classList.remove('ring-4', 'ring-red-400/50', 'scale-125'));
      dot.classList.add('ring-4', 'ring-red-400/50', 'scale-125');

      if (colorMap[index]) {
        heroImg.style.opacity = '0';
        heroImg.style.transform = 'translateY(10px) scale(0.95)';
        setTimeout(() => {
          heroImg.src = colorMap[index].img;
          heroImg.style.opacity = '1';
          heroImg.style.transform = 'translateY(0) scale(1)';
        }, 200);
      }
    });
  });
}

// Newsletter form handling
function initNewsletter() {
  const form = document.getElementById('newsletter-form');
  if (!form) return;
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = form.querySelector('input[type="email"]').value;
    if (email) {
      showToast(`Thank you! <strong>15% VIP promo code</strong> sent to ${email}`, 'success');
      form.reset();
    }
  });
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  renderProducts();
  initCategoryPills();
  initSortSelect();
  initSearch();
  initHeroColorSwitcher();
  initNewsletter();

  // Close modal on backdrop click or Escape
  const modal = document.getElementById('quickview-modal');
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeQuickView();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeQuickView();
  });
});
