import { store } from '../store.js';
import { PRODUCTS, REVIEWS } from '../data.js';
import { renderProductSvg } from '../components/ProductVisuals.js';
import { renderProductCard } from '../components/ProductCard.js';

export function renderProductDetailsPage() {
  const product = PRODUCTS.find(p => p.id === store.state.selectedProductId) || PRODUCTS[0];
  const isWish = store.isWishlisted(product.id);
  const primaryImage = product.images && product.images[0] ? product.images[0] : 'default';
  const cardColor = product.colors && product.colors[0] ? product.colors[0] : '#2563eb';
  const similarProducts = PRODUCTS.filter(p => p.id !== product.id && p.category === product.category).slice(0, 4);

  return `
    <div class="product-details-page-view py-6">
      <div class="container">
        <!-- Breadcrumb Navigation -->
        <nav aria-label="Breadcrumb" class="mb-4">
          <ol style="display: flex; align-items: center; gap: var(--space-2); list-style: none; font-size: var(--text-xs); color: var(--color-gray-500);">
            <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('home')" style="color: var(--color-blue-600);">Home</a></li>
            <li>/</li>
            <li><a href="javascript:void(0)" onclick="window.appRouter.navigate('category', { category: '${product.category}' })" style="color: var(--color-blue-600);">${product.category.toUpperCase()}</a></li>
            <li>/</li>
            <li><span style="color: var(--color-gray-600);">${product.brand}</span></li>
            <li>/</li>
            <li style="color: var(--color-gray-900); font-weight: 600;" aria-current="page">${product.title.slice(0, 35)}...</li>
          </ol>
        </nav>

        <!-- Main Product Hero Layout (Gallery on Left, Info on Right) -->
        <div class="grid-12 mb-12">
          <!-- Left Gallery (5 cols desktop) -->
          <div style="grid-column: span 5;">
            <div class="pdp-gallery-wrap">
              <!-- Vertical Thumbnails -->
              <div class="pdp-thumbnails">
                ${(product.images || [primaryImage]).map((img, idx) => `
                  <div 
                    class="pdp-thumbnail-item ${idx === 0 ? 'active' : ''}" 
                    onclick="window.appActions.changePdpImage('${img}', this)"
                    role="button"
                    tabindex="0"
                    aria-label="Thumbnail ${idx + 1}"
                  >
                    ${renderProductSvg(img, cardColor)}
                  </div>
                `).join('')}
              </div>

              <!-- Main Image Viewer with Hover Zoom -->
              <div class="pdp-main-image" id="pdp-main-image-container">
                <div id="pdp-svg-target" style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                  ${renderProductSvg(primaryImage, cardColor)}
                </div>

                <!-- Floating Wishlist Button -->
                <button 
                  class="btn-card-wishlist ${isWish ? 'active' : ''}" 
                  style="width: 44px; height: 44px; top: 16px; right: 16px;"
                  aria-label="${isWish ? 'Remove from wishlist' : 'Save to wishlist'}"
                  onclick="window.appStore.toggleWishlist('${product.id}')"
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="${isWish ? '#dc2626' : 'none'}" stroke="${isWish ? '#dc2626' : 'currentColor'}" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </button>
              </div>
            </div>

            <!-- Sticky CTA Action Buttons -->
            <div class="pdp-action-buttons">
              <button class="btn-add-to-cart" onclick="window.appActions.pdpAddToCart('${product.id}')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                ADD TO CART
              </button>

              <button class="btn-buy-now" onclick="window.appActions.pdpBuyNow('${product.id}')">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                BUY NOW
              </button>
            </div>
          </div>

          <!-- Right Product Details & Buy Box (7 cols desktop) -->
          <div style="grid-column: span 7;">
            <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-xl); padding: var(--space-8); box-shadow: var(--shadow-xs);">
              <!-- Brand & Trust Tag -->
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2);">
                <span style="font-size: var(--text-xs); font-weight: 800; text-transform: uppercase; letter-spacing: 1px; color: var(--color-blue-700);">
                  ${product.brand} Official Store
                </span>
                ${product.assured ? `
                  <span class="badge-nexora-assured" style="font-size: 11px; padding: 4px 8px;">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Nexora Assured Quality
                  </span>
                ` : ''}
              </div>

              <!-- Title -->
              <h1 style="font-size: var(--text-2xl); font-weight: 800; color: var(--color-gray-900); line-height: 1.3; margin-bottom: var(--space-3);">
                ${product.title}
              </h1>

              <!-- Ratings & Social Proof -->
              <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-5); flex-wrap: wrap;">
                <span class="rating-pill" style="font-size: 13px; padding: 3px 8px;">
                  ${product.rating}
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                </span>
                <span style="font-size: var(--text-xs); color: var(--color-gray-600); font-weight: 500;">
                  ${product.ratingCount.toLocaleString('en-IN')} Ratings & ${product.reviewCount.toLocaleString('en-IN')} Reviews
                </span>
                <span style="color: var(--color-gray-300);">|</span>
                <span style="font-size: var(--text-xs); color: var(--color-success); font-weight: 700; display: flex; align-items: center; gap: 4px;">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  Verified Purchase Safe
                </span>
              </div>

              <!-- Price Box with Indian E-Commerce Savings Hierarchy -->
              <div style="padding: var(--space-4) 0; border-top: 1px solid var(--color-gray-100); border-bottom: 1px solid var(--color-gray-100); margin-bottom: var(--space-5);">
                <div style="display: flex; align-items: baseline; gap: var(--space-3); margin-bottom: 4px;">
                  <span style="font-size: var(--text-3xl); font-weight: 800; color: var(--color-gray-900);">
                    ₹${product.price.toLocaleString('en-IN')}
                  </span>
                  <span style="font-size: var(--text-base); color: var(--color-gray-400); text-decoration: line-through;">
                    ₹${product.mrp.toLocaleString('en-IN')}
                  </span>
                  <span style="font-size: var(--text-lg); font-weight: 800; color: var(--color-success);">
                    ${product.discount}% OFF
                  </span>
                </div>
                <div style="font-size: var(--text-xs); color: var(--color-success-dark); font-weight: 600;">
                  Inclusive of all taxes • You save ₹${(product.mrp - product.price).toLocaleString('en-IN')}
                </div>
              </div>

              <!-- Bank Offers & Coupons Accordion (Amazon / Flipkart Pattern) -->
              <div class="bank-offers-box">
                <div style="font-weight: 800; font-size: var(--text-xs); color: var(--color-gray-900); text-transform: uppercase; margin-bottom: var(--space-3); display: flex; align-items: center; gap: 6px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                  Available Bank Offers & Discounts
                </div>
                <div class="bank-offer-item">
                  <span>🏷️</span>
                  <span><strong>Bank Offer:</strong> 10% Instant Discount up to ₹1,500 on HDFC Bank Credit Card EMI transactions.</span>
                </div>
                <div class="bank-offer-item">
                  <span>🏷️</span>
                  <span><strong>Special Price:</strong> Get extra 5% off (price inclusive of cashback/coupon).</span>
                </div>
                <div class="bank-offer-item">
                  <span>🏷️</span>
                  <span><strong>No Cost EMI:</strong> Avail No Cost EMI on select cards for orders above ₹3,000.</span>
                </div>
              </div>

              <!-- Variant 1: Color Selectors -->
              <div style="margin-bottom: var(--space-5);">
                <div style="font-size: var(--text-xs); font-weight: 700; color: var(--color-gray-800); margin-bottom: var(--space-2);">
                  Color: <span id="pdp-selected-color-label" style="font-weight: 500; color: var(--color-gray-600);">${product.colorNames ? product.colorNames[0] : 'Standard'}</span>
                </div>
                <div class="swatch-group">
                  ${(product.colors || ['#2563eb']).map((col, idx) => `
                    <div 
                      class="color-swatch ${idx === 0 ? 'active' : ''}" 
                      style="background-color: ${col};"
                      title="${product.colorNames ? product.colorNames[idx] : 'Color'}"
                      onclick="window.appActions.selectPdpColor('${col}', '${product.colorNames ? product.colorNames[idx] : ''}', this)"
                    ></div>
                  `).join('')}
                </div>
              </div>

              <!-- Variant 2: Size / Storage Selectors -->
              <div style="margin-bottom: var(--space-5);">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2);">
                  <div style="font-size: var(--text-xs); font-weight: 700; color: var(--color-gray-800);">
                    Select Option / Size:
                  </div>
                  <button 
                    onclick="window.appModals.openSizeGuideModal()" 
                    style="font-size: var(--text-xs); color: var(--color-blue-600); font-weight: 600;"
                  >
                    Size & Fit Guide
                  </button>
                </div>
                <div style="display: flex; gap: var(--space-2); flex-wrap: wrap;">
                  ${(product.sizes || ['Standard']).map((sz, idx) => `
                    <div 
                      class="size-pill ${idx === 0 ? 'active' : ''}" 
                      onclick="window.appActions.selectPdpSize('${sz}', this)"
                    >
                      ${sz}
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- Quantity Selector & Urgency -->
              <div style="display: flex; align-items: center; gap: var(--space-4); margin-bottom: var(--space-6); flex-wrap: wrap;">
                <div style="font-size: var(--text-xs); font-weight: 700; color: var(--color-gray-800);">Quantity:</div>
                <div class="quantity-stepper">
                  <button class="stepper-btn" onclick="window.appActions.adjustPdpQty(-1)">-</button>
                  <span class="stepper-val" id="pdp-qty-display">1</span>
                  <button class="stepper-btn" onclick="window.appActions.adjustPdpQty(1)">+</button>
                </div>
                ${product.stockLeft < 10 ? `
                  <span style="font-size: 11px; font-weight: 700; color: var(--color-danger); background: #fef2f2; padding: 4px 8px; border-radius: 4px;">
                    ⚡ Only ${product.stockLeft} units left in stock!
                  </span>
                ` : ''}
              </div>

              <!-- Pincode Delivery Checker (Flipkart Pattern) -->
              <div style="background: var(--color-gray-50); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-4); margin-bottom: var(--space-6);">
                <div style="font-size: var(--text-xs); font-weight: 700; color: var(--color-gray-800); margin-bottom: var(--space-2);">
                  Delivery & Service Check:
                </div>
                <div style="display: flex; gap: var(--space-2); max-width: 320px;">
                  <input 
                    type="text" 
                    id="pdp-pincode-input"
                    value="${store.state.pincode}" 
                    maxlength="6"
                    placeholder="Enter 6-digit Pincode"
                    style="flex: 1; padding: 6px 10px; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-size: var(--text-xs);"
                  />
                  <button 
                    class="btn-primary-login" 
                    style="padding: 6px 14px; font-size: var(--text-xs);"
                    onclick="window.appActions.checkPdpPincode()"
                  >
                    Check
                  </button>
                </div>
                <div id="pdp-delivery-status" style="margin-top: 8px; font-size: var(--text-xs); color: var(--color-success-dark); font-weight: 600;">
                  ✓ Free Express Delivery by <strong>${product.deliveryDays}</strong> to ${store.state.pincode} • Cash on Delivery Available
                </div>
              </div>

              <!-- Highlights Bullet List -->
              <div style="margin-bottom: var(--space-6);">
                <h3 style="font-size: var(--text-sm); font-weight: 800; color: var(--color-gray-900); margin-bottom: var(--space-3);">
                  Product Highlights
                </h3>
                <ul style="list-style: none; display: flex; flex-direction: column; gap: var(--space-2);">
                  ${product.highlights.map(hl => `
                    <li style="display: flex; align-items: flex-start; gap: var(--space-2); font-size: var(--text-xs); color: var(--color-gray-700); line-height: 1.4;">
                      <span style="color: var(--color-blue-600); font-weight: 800; margin-top: -1px;">•</span>
                      <span>${hl}</span>
                    </li>
                  `).join('')}
                </ul>
              </div>

              <!-- Technical Specifications Table -->
              <div>
                <h3 style="font-size: var(--text-sm); font-weight: 800; color: var(--color-gray-900); margin-bottom: var(--space-3);">
                  Technical Specifications
                </h3>
                <div style="border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); overflow: hidden;">
                  ${Object.entries(product.specs).map(([k, v], idx) => `
                    <div style="display: grid; grid-template-columns: 180px 1fr; padding: 10px 14px; font-size: var(--text-xs); background: ${idx % 2 === 0 ? 'var(--color-gray-50)' : 'var(--color-white)'}; border-bottom: 1px solid var(--color-gray-200);">
                      <span style="color: var(--color-gray-500); font-weight: 600;">${k}</span>
                      <span style="color: var(--color-gray-900); font-weight: 500;">${v}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Customer Ratings & Verified Reviews Section -->
        <section style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-xl); padding: var(--space-8); margin-bottom: var(--space-12);" aria-label="Customer Reviews">
          <h2 style="font-size: var(--text-xl); font-weight: 800; color: var(--color-gray-900); margin-bottom: var(--space-6);">
            Ratings & Customer Reviews
          </h2>

          <div class="grid-12" style="align-items: center; margin-bottom: var(--space-8);">
            <!-- Star Rating Overview -->
            <div style="grid-column: span 4; text-align: center; border-right: 1px solid var(--color-gray-200);">
              <div style="font-size: 3.5rem; font-weight: 800; color: var(--color-gray-900); line-height: 1;">${product.rating}</div>
              <div style="display: flex; justify-content: center; gap: 3px; margin: 8px 0;">
                ${Array(5).fill(0).map(() => `
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                `).join('')}
              </div>
              <p style="font-size: var(--text-xs); color: var(--color-gray-500);">
                ${product.ratingCount.toLocaleString('en-IN')} Verified Buyers
              </p>
            </div>

            <!-- Star Progress Bars -->
            <div style="grid-column: span 8; display: flex; flex-direction: column; gap: var(--space-2);">
              <div style="display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-xs);">
                <span style="width: 40px; font-weight: 600;">5 ★</span>
                <div style="flex: 1; height: 8px; background: var(--color-gray-200); border-radius: var(--radius-full); overflow: hidden;">
                  <div style="width: 78%; height: 100%; background: var(--color-success);"></div>
                </div>
                <span style="width: 40px; color: var(--color-gray-500); text-align: right;">78%</span>
              </div>
              <div style="display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-xs);">
                <span style="width: 40px; font-weight: 600;">4 ★</span>
                <div style="flex: 1; height: 8px; background: var(--color-gray-200); border-radius: var(--radius-full); overflow: hidden;">
                  <div style="width: 14%; height: 100%; background: var(--color-success);"></div>
                </div>
                <span style="width: 40px; color: var(--color-gray-500); text-align: right;">14%</span>
              </div>
              <div style="display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-xs);">
                <span style="width: 40px; font-weight: 600;">3 ★</span>
                <div style="flex: 1; height: 8px; background: var(--color-gray-200); border-radius: var(--radius-full); overflow: hidden;">
                  <div style="width: 5%; height: 100%; background: var(--color-yellow-400);"></div>
                </div>
                <span style="width: 40px; color: var(--color-gray-500); text-align: right;">5%</span>
              </div>
              <div style="display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-xs);">
                <span style="width: 40px; font-weight: 600;">2 ★</span>
                <div style="flex: 1; height: 8px; background: var(--color-gray-200); border-radius: var(--radius-full); overflow: hidden;">
                  <div style="width: 2%; height: 100%; background: #f97316;"></div>
                </div>
                <span style="width: 40px; color: var(--color-gray-500); text-align: right;">2%</span>
              </div>
              <div style="display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-xs);">
                <span style="width: 40px; font-weight: 600;">1 ★</span>
                <div style="flex: 1; height: 8px; background: var(--color-gray-200); border-radius: var(--radius-full); overflow: hidden;">
                  <div style="width: 1%; height: 100%; background: var(--color-danger);"></div>
                </div>
                <span style="width: 40px; color: var(--color-gray-500); text-align: right;">1%</span>
              </div>
            </div>
          </div>

          <!-- Individual Reviews List -->
          <div style="display: flex; flex-direction: column; gap: var(--space-6);">
            ${REVIEWS.map(rev => `
              <div style="border-top: 1px solid var(--color-gray-200); padding-top: var(--space-4);">
                <div style="display: flex; align-items: center; gap: var(--space-3); margin-bottom: var(--space-2);">
                  <span class="rating-pill">${rev.rating} ★</span>
                  <strong style="font-size: var(--text-sm); color: var(--color-gray-900);">${rev.title}</strong>
                </div>
                <p style="font-size: var(--text-xs); color: var(--color-gray-700); line-height: 1.5; margin-bottom: var(--space-3);">
                  ${rev.comment}
                </p>
                <div style="display: flex; align-items: center; justify-content: space-between; font-size: 11px; color: var(--color-gray-500);">
                  <div style="display: flex; align-items: center; gap: var(--space-2);">
                    <span style="font-weight: 700; color: var(--color-gray-800);">${rev.author}</span>
                    <span>•</span>
                    <span style="color: var(--color-success); font-weight: 600;">✓ Verified Buyer</span>
                    <span>•</span>
                    <span>${rev.city}</span>
                  </div>
                  <div>Helpful (${rev.helpfulCount})</div>
                </div>
              </div>
            `).join('')}
          </div>
        </section>

        <!-- Similar Products Section -->
        <section aria-label="Similar Products">
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
            <h2 style="font-size: var(--text-xl); font-weight: 800; color: var(--color-gray-900);">Similar Products</h2>
            <button 
              onclick="window.appRouter.navigate('category', { category: '${product.category}' })" 
              style="color: var(--color-blue-600); font-size: var(--text-xs); font-weight: 700;"
            >
              View More &rarr;
            </button>
          </div>
          <div class="grid-12">
            ${similarProducts.map(p => `
              <div style="grid-column: span 3;">
                ${renderProductCard(p)}
              </div>
            `).join('')}
          </div>
        </section>
      </div>
    </div>
  `;
}
