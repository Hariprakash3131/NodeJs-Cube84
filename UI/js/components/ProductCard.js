import { store } from '../store.js';
import { renderProductSvg } from './ProductVisuals.js';

export function renderProductCard(product) {
  const isWish = store.isWishlisted(product.id);
  const primaryImage = product.images && product.images[0] ? product.images[0] : 'default';
  const cardColor = product.colors && product.colors[0] ? product.colors[0] : '#2563eb';

  return `
    <article class="product-card" data-product-id="${product.id}">
      <!-- Image Container -->
      <div class="card-image-wrap" onclick="window.appRouter.navigate('product', { productId: '${product.id}' })" style="cursor: pointer;">
        <div class="card-image-inner">
          ${renderProductSvg(primaryImage, cardColor)}
        </div>

        <!-- Badges -->
        <div class="card-badge-container">
          ${product.discount >= 40 ? `<span class="badge-discount">${product.discount}% OFF</span>` : ''}
          ${product.bestseller ? `<span class="badge-bestseller">★ Bestseller</span>` : ''}
          ${product.assured ? `
            <span class="badge-nexora-assured">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
              Assured
            </span>
          ` : ''}
        </div>

        <!-- Wishlist Button -->
        <button 
          class="btn-card-wishlist ${isWish ? 'active' : ''}" 
          aria-label="${isWish ? 'Remove from wishlist' : 'Add to wishlist'}"
          onclick="event.stopPropagation(); window.appStore.toggleWishlist('${product.id}')"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="${isWish ? '#dc2626' : 'none'}" stroke="${isWish ? '#dc2626' : 'currentColor'}" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </button>
      </div>

      <!-- Card Details -->
      <div class="card-details">
        <span class="card-brand">${product.brand}</span>
        <h3 
          class="card-title" 
          title="${product.title}" 
          onclick="window.appRouter.navigate('product', { productId: '${product.id}' })"
          style="cursor: pointer;"
        >
          ${product.title}
        </h3>

        <!-- Rating Row -->
        <div class="card-rating-row">
          <span class="rating-pill">
            ${product.rating}
            <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
            </svg>
          </span>
          <span class="rating-count">(${Number(product.ratingCount).toLocaleString('en-IN')})</span>
        </div>

        <!-- Pricing Row -->
        <div class="card-price-row">
          <span class="current-price">₹${product.price.toLocaleString('en-IN')}</span>
          <span class="original-mrp">₹${product.mrp.toLocaleString('en-IN')}</span>
          <span class="discount-percent">${product.discount}% off</span>
        </div>

        <!-- Delivery & Stock Info -->
        <div class="delivery-tag">
          Free Delivery <strong>${product.deliveryDays}</strong>
        </div>

        <!-- Quick Add to Cart Button -->
        <button 
          class="btn-card-add" 
          onclick="event.stopPropagation(); window.appStore.addToCart('${product.id}')"
          aria-label="Add ${product.brand} to cart"
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Add to Cart
        </button>
      </div>
    </article>
  `;
}
