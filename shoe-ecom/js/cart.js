// Central Shopping Cart, Wishlist, and Notification System
const CART_STORAGE_KEY = 'kickvault_cart';
const WISHLIST_STORAGE_KEY = 'kickvault_wishlist';
const PROMO_STORAGE_KEY = 'kickvault_promo';

// ----------------- TOAST SYSTEM -----------------
function showToast(message, type = 'success', icon = '✓') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-item';

  let iconBg = 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30';
  if (type === 'error') {
    iconBg = 'bg-rose-500/20 text-rose-400 border border-rose-500/30';
    icon = '✕';
  } else if (type === 'info') {
    iconBg = 'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30';
    icon = 'ℹ';
  }

  toast.innerHTML = `
    <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 ${iconBg}">
      ${icon}
    </div>
    <div class="flex-1 text-slate-100 text-sm font-medium leading-snug">
      ${message}
    </div>
    <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-white text-lg ml-2 leading-none cursor-pointer">&times;</button>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('leaving');
    setTimeout(() => {
      if (toast.parentElement) toast.remove();
    }, 300);
  }, 3500);
}

// ----------------- CART MANAGEMENT -----------------
function getCart() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Error reading cart from localStorage", e);
    return [];
  }
}

function saveCart(cart) {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    updateCartBadges();
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { cart } }));
  } catch (e) {
    console.error("Error saving cart to localStorage", e);
  }
}

function addToCart(productId, size, color, quantity = 1) {
  const product = PRODUCTS.find(p => p.id === Number(productId));
  if (!product) {
    showToast("Product not found!", "error");
    return;
  }

  // Default size and color if not provided
  const chosenSize = size || (product.sizes && product.sizes.length > 0 ? product.sizes[0] : 9);
  const chosenColor = color || (product.colors && product.colors.length > 0 ? product.colors[0].name : "Default");

  const cart = getCart();
  const existingIndex = cart.findIndex(
    item => item.productId === product.id && item.size === chosenSize && item.color === chosenColor
  );

  if (existingIndex > -1) {
    cart[existingIndex].quantity += Number(quantity);
  } else {
    cart.push({
      id: Date.now() + Math.random().toString(36).substring(2, 5),
      productId: product.id,
      name: product.name,
      brand: product.brand,
      image: product.image,
      price: product.price,
      originalPrice: product.originalPrice,
      size: chosenSize,
      color: chosenColor,
      quantity: Number(quantity)
    });
  }

  saveCart(cart);
  showToast(`Added <strong>${product.name}</strong> (Size: ${chosenSize}) to cart!`, 'success');
}

function removeFromCart(index) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    const removed = cart.splice(index, 1)[0];
    saveCart(cart);
    showToast(`Removed <strong>${removed.name}</strong> from bag.`, 'info');
  }
}

function updateCartQuantity(index, newQty) {
  const cart = getCart();
  if (index >= 0 && index < cart.length) {
    const qty = Math.max(1, Math.min(10, Number(newQty)));
    cart[index].quantity = qty;
    saveCart(cart);
  }
}

function clearCart() {
  saveCart([]);
  showToast("Your shopping cart has been cleared.", "info");
}

function getCartTotals() {
  const cart = getCart();
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const appliedPromo = getAppliedPromo();

  let discount = 0;
  let freeShippingFromPromo = false;

  if (appliedPromo && PROMO_CODES[appliedPromo]) {
    const promo = PROMO_CODES[appliedPromo];
    if (promo.discountPercent) {
      discount = Math.round((subtotal * promo.discountPercent) / 100);
    }
    if (promo.freeShipping) {
      freeShippingFromPromo = true;
    }
  }

  // Shipping rules: Free if subtotal after discount >= 150 or coupon gives free shipping
  const netSubtotal = Math.max(0, subtotal - discount);
  let shipping = 0;
  if (cart.length > 0) {
    if (netSubtotal >= 150 || freeShippingFromPromo) {
      shipping = 0;
    } else {
      shipping = 15;
    }
  }

  const tax = cart.length > 0 ? Math.round(netSubtotal * 0.08) : 0;
  const total = Math.max(0, netSubtotal + shipping + tax);

  return {
    itemCount: cart.reduce((sum, item) => sum + item.quantity, 0),
    subtotal,
    discount,
    shipping,
    tax,
    total,
    freeShippingThreshold: 150,
    amountUntilFreeShipping: Math.max(0, 150 - netSubtotal)
  };
}

// ----------------- PROMO CODES -----------------
function getAppliedPromo() {
  return localStorage.getItem(PROMO_STORAGE_KEY) || null;
}

function applyPromoCode(code) {
  const cleanCode = (code || '').trim().toUpperCase();
  if (!cleanCode) {
    showToast("Please enter a promo code", "error");
    return false;
  }
  if (PROMO_CODES[cleanCode]) {
    localStorage.setItem(PROMO_STORAGE_KEY, cleanCode);
    showToast(`Code <strong>${cleanCode}</strong> applied successfully!`, "success");
    window.dispatchEvent(new CustomEvent('cart-updated', { detail: { cart: getCart() } }));
    return true;
  } else {
    showToast("Invalid promo code. Try 'SNEAKER20' or 'KICK10'", "error");
    return false;
  }
}

function removePromoCode() {
  localStorage.removeItem(PROMO_STORAGE_KEY);
  showToast("Coupon removed.", "info");
  window.dispatchEvent(new CustomEvent('cart-updated', { detail: { cart: getCart() } }));
}

// ----------------- WISHLIST MANAGEMENT -----------------
function getWishlist() {
  try {
    const raw = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

function isWishlisted(productId) {
  const wishlist = getWishlist();
  return wishlist.includes(Number(productId));
}

function toggleWishlist(productId) {
  const id = Number(productId);
  let wishlist = getWishlist();
  const product = PRODUCTS.find(p => p.id === id);
  const name = product ? product.name : "Item";

  if (wishlist.includes(id)) {
    wishlist = wishlist.filter(item => item !== id);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    showToast(`Removed <strong>${name}</strong> from favorites.`, 'info');
  } else {
    wishlist.push(id);
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
    showToast(`Added <strong>${name}</strong> to your favorites!`, 'success');
  }

  updateWishlistBadges();
  window.dispatchEvent(new CustomEvent('wishlist-updated', { detail: { wishlist } }));
  return wishlist.includes(id);
}

// ----------------- BADGE UPDATERS -----------------
function updateCartBadges() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const badgeElements = document.querySelectorAll('.cart-badge-count');
  badgeElements.forEach(badge => {
    badge.textContent = totalCount;
    if (totalCount > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

function updateWishlistBadges() {
  const wishlist = getWishlist();
  const totalCount = wishlist.length;
  const badgeElements = document.querySelectorAll('.wishlist-badge-count');
  badgeElements.forEach(badge => {
    badge.textContent = totalCount;
    if (totalCount > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  });
}

// Initialize badges on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadges();
  updateWishlistBadges();
});
