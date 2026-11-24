import { store } from './store.js';
import { PRODUCTS, USER_PROFILE } from './data.js';
import { renderNavbar } from './components/Navbar.js';
import { renderMegaMenu } from './components/MegaMenu.js';
import { renderFooter } from './components/Footer.js';
import { Modals } from './components/Modals.js';
import { renderProductSvg } from './components/ProductVisuals.js';

import { renderHomePage } from './pages/HomePage.js';
import { renderCategoryPage } from './pages/CategoryPage.js';
import { renderProductDetailsPage } from './pages/ProductDetailsPage.js';
import { renderCartPage } from './pages/CartPage.js';
import { renderCheckoutPage } from './pages/CheckoutPage.js';
import { renderDashboardPage } from './pages/DashboardPage.js';

// Expose globals for onclick handlers
window.appStore = store;
window.appModals = Modals;

// Router
export const Router = {
  navigate(page, payload = {}) {
    window.location.hash = page;
    store.setPage(page, payload);
  },

  init() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.replace('#', '') || 'home';
      if (store.state.currentPage !== hash) {
        store.setPage(hash);
      }
    });

    const initial = window.location.hash.replace('#', '') || 'home';
    store.state.currentPage = initial;
  }
};
window.appRouter = Router;

// Global Actions
window.appActions = {
  handleSearchSubmit() {
    const input = document.getElementById('header-search-input');
    const query = input ? input.value.trim() : '';
    if (query) {
      store.state.searchQuery = query;
      Router.navigate('category', { category: 'all' });
    }
    const dropdown = document.getElementById('search-dropdown-menu');
    if (dropdown) dropdown.classList.remove('open');
  },

  handleSearchInput(val) {
    const dropdown = document.getElementById('search-dropdown-menu');
    if (dropdown) {
      if (val.trim().length > 1) {
        dropdown.classList.add('open');
      } else {
        dropdown.classList.remove('open');
      }
    }
  },

  showSearchDropdown() {
    const input = document.getElementById('header-search-input');
    const dropdown = document.getElementById('search-dropdown-menu');
    if (input && input.value.trim().length > 0 && dropdown) {
      dropdown.classList.add('open');
    }
  },

  selectSuggestion(text) {
    const input = document.getElementById('header-search-input');
    if (input) input.value = text;
    store.state.searchQuery = text;
    const dropdown = document.getElementById('search-dropdown-menu');
    if (dropdown) dropdown.classList.remove('open');
    Router.navigate('category', { category: 'all' });
  },

  toggleBrandFilter(brand, checked) {
    let brands = [...store.state.filters.brands];
    if (checked) {
      if (!brands.includes(brand)) brands.push(brand);
    } else {
      brands = brands.filter(b => b !== brand);
    }
    store.updateFilters({ brands });
  },

  changePdpImage(imgName, el) {
    document.querySelectorAll('.pdp-thumbnail-item').forEach(item => item.classList.remove('active'));
    if (el) el.classList.add('active');
    const container = document.getElementById('pdp-svg-target');
    if (container) {
      const product = PRODUCTS.find(p => p.id === store.state.selectedProductId) || PRODUCTS[0];
      const color = product.colors && product.colors[0] ? product.colors[0] : '#2563eb';
      container.innerHTML = renderProductSvg(imgName, color);
    }
  },

  selectPdpColor(colorHex, colorName, el) {
    document.querySelectorAll('.color-swatch').forEach(s => s.classList.remove('active'));
    if (el) el.classList.add('active');
    const label = document.getElementById('pdp-selected-color-label');
    if (label) label.textContent = colorName;
    const container = document.getElementById('pdp-svg-target');
    if (container) {
      const product = PRODUCTS.find(p => p.id === store.state.selectedProductId) || PRODUCTS[0];
      const img = product.images && product.images[0] ? product.images[0] : 'default';
      container.innerHTML = renderProductSvg(img, colorHex);
    }
  },

  selectPdpSize(sz, el) {
    document.querySelectorAll('.size-pill').forEach(s => s.classList.remove('active'));
    if (el) el.classList.add('active');
  },

  adjustPdpQty(delta) {
    const el = document.getElementById('pdp-qty-display');
    if (!el) return;
    let qty = parseInt(el.textContent, 10) || 1;
    qty = Math.max(1, qty + delta);
    el.textContent = qty;
  },

  checkPdpPincode() {
    const input = document.getElementById('pdp-pincode-input');
    const status = document.getElementById('pdp-delivery-status');
    if (!input || !status) return;

    const val = input.value.trim();
    if (val.length === 6 && /^\d+$/.test(val)) {
      store.state.pincode = val;
      status.innerHTML = `✓ Free Express Delivery available for <strong>${val}</strong> • Usually dispatched in 12 hours`;
      status.style.color = 'var(--color-success-dark)';
      store.showToast(`Pincode ${val} verified for express delivery`, 'success');
    } else {
      status.innerHTML = `⚠️ Please enter a valid 6-digit Indian PIN code.`;
      status.style.color = 'var(--color-danger)';
    }
  },

  pdpAddToCart(productId) {
    const qtyEl = document.getElementById('pdp-qty-display');
    const qty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
    const colorLabel = document.getElementById('pdp-selected-color-label');
    const color = colorLabel ? colorLabel.textContent : null;
    const activeSize = document.querySelector('.size-pill.active');
    const size = activeSize ? activeSize.textContent.trim() : null;

    store.addToCart(productId, qty, color, size);
  },

  pdpBuyNow(productId) {
    this.pdpAddToCart(productId);
    Router.navigate('checkout');
  },

  handlePlaceOrder() {
    const order = store.placeOrder();
    Modals.openOrderSuccessModal(order);
  },

  updatePincode(newPin) {
    if (newPin && newPin.trim().length === 6) {
      store.state.pincode = newPin.trim();
      store.showToast(`Delivery location set to PIN ${newPin}`, 'success');
      Modals.closeModal();
      store.notify();
    } else {
      store.showToast('Please enter a valid 6-digit Indian PIN code', 'error');
    }
  },

  selectAddress(id, pin) {
    store.state.selectedAddressId = id;
    store.state.pincode = pin;
    store.showToast(`Selected address (${pin})`, 'success');
    Modals.closeModal();
    store.notify();
  }
};

// Main App Controller
class App {
  constructor() {
    this.appRoot = document.getElementById('app-root');
    this.headerSlot = document.getElementById('header-slot');
    this.megaMenuSlot = document.getElementById('mega-menu-slot');
    this.footerSlot = document.getElementById('footer-slot');
  }

  init() {
    Router.init();
    store.subscribe(() => this.render());
    this.render();
    this.initFlashCountdown();
    this.initKeyboardAccessibility();

    // Close search dropdown on click outside
    document.addEventListener('click', (e) => {
      const searchBox = document.querySelector('.search-container');
      const dropdown = document.getElementById('search-dropdown-menu');
      if (searchBox && dropdown && !searchBox.contains(e.target)) {
        dropdown.classList.remove('open');
      }
    });
  }

  render() {
    // 1. Header & Navigation
    if (this.headerSlot) {
      this.headerSlot.innerHTML = renderNavbar(store.state);
    }

    // 2. Mega Menu (shown on home & category pages)
    if (this.megaMenuSlot) {
      if (store.state.currentPage === 'home' || store.state.currentPage === 'category') {
        this.megaMenuSlot.innerHTML = renderMegaMenu();
        this.megaMenuSlot.style.display = 'block';
      } else {
        this.megaMenuSlot.innerHTML = '';
        this.megaMenuSlot.style.display = 'none';
      }
    }

    // 3. Main Page Body
    if (this.appRoot) {
      let pageHtml = '';
      switch (store.state.currentPage) {
        case 'category':
          pageHtml = renderCategoryPage();
          break;
        case 'product':
          pageHtml = renderProductDetailsPage();
          break;
        case 'cart':
          pageHtml = renderCartPage();
          break;
        case 'checkout':
          pageHtml = renderCheckoutPage();
          break;
        case 'dashboard':
          pageHtml = renderDashboardPage();
          break;
        case 'home':
        default:
          pageHtml = renderHomePage();
          break;
      }
      this.appRoot.innerHTML = pageHtml;
    }

    // 4. Footer
    if (this.footerSlot) {
      this.footerSlot.innerHTML = renderFooter();
    }

    // 5. Update mobile bottom nav active classes
    document.querySelectorAll('.mobile-nav-btn').forEach(btn => {
      const target = btn.getAttribute('data-nav-target');
      if (target === store.state.currentPage) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  initFlashCountdown() {
    let totalSeconds = 3 * 3600 + 42 * 60 + 18; // 3h 42m 18s
    setInterval(() => {
      if (totalSeconds > 0) totalSeconds--;
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      const elH = document.getElementById('timer-hours');
      const elM = document.getElementById('timer-minutes');
      const elS = document.getElementById('timer-seconds');

      if (elH) elH.textContent = String(h).padStart(2, '0');
      if (elM) elM.textContent = String(m).padStart(2, '0');
      if (elS) elS.textContent = String(s).padStart(2, '0');
    }, 1000);
  }

  initKeyboardAccessibility() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        Modals.closeModal();
      }
    });
  }
}

// Bootstrap on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
