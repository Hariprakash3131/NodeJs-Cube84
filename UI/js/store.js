import { PRODUCTS, USER_PROFILE, COUPONS } from './data.js';

class Store {
  constructor() {
    this.state = {
      currentPage: 'home',
      selectedProductId: 'nx-prod-101',
      cart: [
        {
          productId: 'nx-prod-101',
          qty: 1,
          selectedColor: 'Midnight Obsidian',
          selectedSize: 'Standard Fit'
        }
      ],
      savedForLater: [
        {
          productId: 'nx-prod-103',
          qty: 1,
          selectedColor: 'Classic Navy',
          selectedSize: 'L (42)'
        }
      ],
      wishlist: ['nx-prod-102', 'nx-prod-107'],
      filters: {
        category: 'all',
        searchInside: '',
        priceMin: 0,
        priceMax: 50000,
        minRating: 0,
        brands: [],
        assuredOnly: false,
        fastDeliveryOnly: false,
        sortBy: 'popularity'
      },
      searchQuery: '',
      appliedCoupon: null,
      user: USER_PROFILE,
      activeDashboardTab: 'orders',
      selectedAddressId: 'addr-1',
      selectedPaymentMethod: 'upi',
      pincode: '560102',
      pincodeVerified: true,
      lastPlacedOrder: null
    };

    this.listeners = new Set();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  notify() {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  // Navigation
  setPage(page, payload = {}) {
    this.state.currentPage = page;
    if (payload.productId) {
      this.state.selectedProductId = payload.productId;
    }
    if (payload.category) {
      this.state.filters.category = payload.category;
    }
    if (payload.dashboardTab) {
      this.state.activeDashboardTab = payload.dashboardTab;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.notify();
  }

  // Cart Operations
  addToCart(productId, qty = 1, color = null, size = null) {
    const existing = this.state.cart.find(item => item.productId === productId);
    const product = PRODUCTS.find(p => p.id === productId);

    if (existing) {
      existing.qty += qty;
    } else {
      this.state.cart.push({
        productId,
        qty,
        selectedColor: color || (product?.colorNames ? product.colorNames[0] : null),
        selectedSize: size || (product?.sizes ? product.sizes[0] : null)
      });
    }

    this.showToast(`Added ${product?.brand || 'item'} to your cart!`, 'success');
    this.notify();
  }

  updateCartQty(productId, delta) {
    const item = this.state.cart.find(i => i.productId === productId);
    if (!item) return;

    item.qty += delta;
    if (item.qty <= 0) {
      this.removeFromCart(productId);
      return;
    }
    this.notify();
  }

  removeFromCart(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    this.state.cart = this.state.cart.filter(i => i.productId !== productId);
    this.showToast(`Removed ${product?.brand || 'item'} from cart`, 'info');
    this.notify();
  }

  saveForLater(productId) {
    const item = this.state.cart.find(i => i.productId === productId);
    if (!item) return;

    this.state.cart = this.state.cart.filter(i => i.productId !== productId);
    this.state.savedForLater.push(item);
    this.showToast('Item moved to Saved for Later', 'info');
    this.notify();
  }

  moveToCartFromSaved(productId) {
    const item = this.state.savedForLater.find(i => i.productId === productId);
    if (!item) return;

    this.state.savedForLater = this.state.savedForLater.filter(i => i.productId !== productId);
    this.state.cart.push(item);
    this.showToast('Item moved back to Cart', 'success');
    this.notify();
  }

  // Wishlist Operations
  toggleWishlist(productId) {
    const exists = this.state.wishlist.includes(productId);
    const product = PRODUCTS.find(p => p.id === productId);

    if (exists) {
      this.state.wishlist = this.state.wishlist.filter(id => id !== productId);
      this.showToast(`Removed from Wishlist`, 'info');
    } else {
      this.state.wishlist.push(productId);
      this.showToast(`Saved to Wishlist!`, 'success');
    }
    this.notify();
  }

  isWishlisted(productId) {
    return this.state.wishlist.includes(productId);
  }

  // Coupons & Pricing Calculations
  applyCoupon(code) {
    const found = COUPONS.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      this.showToast('Invalid or expired coupon code', 'error');
      return false;
    }

    const { totalMrp, totalSavings } = this.getCartPricing();
    const currentSubtotal = totalMrp - totalSavings;

    if (currentSubtotal < found.minOrder) {
      this.showToast(`Order must be at least ₹${found.minOrder} to use ${found.code}`, 'error');
      return false;
    }

    this.state.appliedCoupon = found;
    this.showToast(`Coupon ${found.code} applied successfully!`, 'success');
    this.notify();
    return true;
  }

  removeCoupon() {
    this.state.appliedCoupon = null;
    this.showToast('Coupon removed', 'info');
    this.notify();
  }

  getCartPricing() {
    let totalMrp = 0;
    let finalAmount = 0;
    let totalItems = 0;

    for (const item of this.state.cart) {
      const product = PRODUCTS.find(p => p.id === item.productId);
      if (product) {
        totalMrp += product.mrp * item.qty;
        finalAmount += product.price * item.qty;
        totalItems += item.qty;
      }
    }

    let couponDiscount = 0;
    if (this.state.appliedCoupon) {
      if (this.state.appliedCoupon.discount) {
        couponDiscount = this.state.appliedCoupon.discount;
      } else if (this.state.appliedCoupon.discountPercent) {
        couponDiscount = Math.round((finalAmount * this.state.appliedCoupon.discountPercent) / 100);
        if (this.state.appliedCoupon.maxDiscount) {
          couponDiscount = Math.min(couponDiscount, this.state.appliedCoupon.maxDiscount);
        }
      }
    }

    const deliveryFee = finalAmount > 499 ? 0 : 70;
    const packagingFee = finalAmount > 0 ? 29 : 0;
    const grandTotal = Math.max(0, finalAmount - couponDiscount + deliveryFee + packagingFee);
    const totalSavings = (totalMrp - finalAmount) + couponDiscount;

    return {
      totalMrp,
      productTotal: finalAmount,
      couponDiscount,
      deliveryFee,
      packagingFee,
      grandTotal,
      totalSavings,
      totalItems
    };
  }

  // Filter Updates
  updateFilters(updates) {
    this.state.filters = { ...this.state.filters, ...updates };
    this.notify();
  }

  clearFilters() {
    this.state.filters = {
      category: 'all',
      searchInside: '',
      priceMin: 0,
      priceMax: 50000,
      minRating: 0,
      brands: [],
      assuredOnly: false,
      fastDeliveryOnly: false,
      sortBy: 'popularity'
    };
    this.notify();
  }

  // Place Order Simulation
  placeOrder() {
    const { grandTotal } = this.getCartPricing();
    const newOrder = {
      orderId: `NX-${Math.floor(100000 + Math.random() * 900000)}-IN`,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      total: grandTotal,
      status: 'Order Confirmed',
      currentStep: 1,
      estimatedDelivery: 'Tomorrow by 8:00 PM',
      items: this.state.cart.map(c => {
        const p = PRODUCTS.find(prod => prod.id === c.productId);
        return {
          productId: c.productId,
          title: p?.title || 'Product Item',
          color: c.selectedColor,
          size: c.selectedSize,
          qty: c.qty,
          price: p?.price || 0
        };
      })
    };

    this.state.user.orders.unshift(newOrder);
    this.state.lastPlacedOrder = newOrder;
    this.state.cart = []; // clear cart
    this.state.appliedCoupon = null;
    this.notify();
    return newOrder;
  }

  // Toast System
  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    
    let iconSvg = '';
    if (type === 'success') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>`;
    } else if (type === 'error') {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" stroke-width="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      ${iconSvg}
      <span style="flex: 1;">${message}</span>
      <button style="color: #94a3b8; font-size: 16px; margin-left: 8px;" onclick="this.parentElement.remove()">&times;</button>
    `;

    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  }
}

export const store = new Store();
