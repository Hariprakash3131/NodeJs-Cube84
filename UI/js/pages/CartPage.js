import { store } from '../store.js';
import { PRODUCTS, COUPONS } from '../data.js';
import { renderProductSvg } from '../components/ProductVisuals.js';

export function renderCartPage() {
  const { cart, savedForLater, appliedCoupon } = store.state;
  const pricing = store.getCartPricing();

  if (cart.length === 0 && savedForLater.length === 0) {
    return `
      <div class="cart-empty-view py-12">
        <div class="container" style="max-width: 600px; text-align: center;">
          <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-xl); padding: var(--space-12); box-shadow: var(--shadow-sm);">
            <div style="width: 80px; height: 80px; border-radius: 50%; background: var(--color-blue-50); color: var(--color-blue-600); display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-4);">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h2 style="font-size: var(--text-2xl); font-weight: 800; color: var(--color-gray-900); margin-bottom: var(--space-2);">Your Cart is Empty!</h2>
            <p style="font-size: var(--text-sm); color: var(--color-gray-500); margin-bottom: var(--space-6);">
              Explore our trending festival drops and discover premium brands at unmatched prices.
            </p>
            <button class="btn-primary-login" onclick="window.appRouter.navigate('home')">
              Start Shopping
            </button>
          </div>
        </div>
      </div>
    `;
  }

  return `
    <div class="cart-page-view py-6">
      <div class="container">
        <!-- Delivery Address Bar in Cart (Flipkart Pattern) -->
        <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-4) var(--space-6); margin-bottom: var(--space-6); display: flex; align-items: center; justify-content: space-between; box-shadow: var(--shadow-xs);">
          <div style="display: flex; align-items: center; gap: var(--space-3);">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-blue-600)" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
              <circle cx="12" cy="10" r="3"></circle>
            </svg>
            <div>
              <span style="font-size: var(--text-xs); color: var(--color-gray-500);">Deliver to: <strong>Aarav Sharma, 560102</strong></span>
              <p style="font-size: var(--text-xs); color: var(--color-gray-800);">Flat 402, Skyline Heights, HSR Layout Sector 3, Bengaluru</p>
            </div>
          </div>
          <button 
            onclick="window.appModals.openAddressModal()"
            style="border: 1px solid var(--color-gray-300); padding: 6px 12px; border-radius: var(--radius-md); font-size: var(--text-xs); font-weight: 700; color: var(--color-blue-700);"
          >
            Change Address
          </button>
        </div>

        <div class="grid-12">
          <!-- Left Column: Cart Items (8 cols desktop) -->
          <div style="grid-column: span 8;">
            <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-4) var(--space-6); margin-bottom: var(--space-4); font-weight: 800; font-size: var(--text-base); color: var(--color-gray-900);">
              My Cart (${pricing.totalItems} items)
            </div>

            <!-- Cart Items List -->
            ${cart.map(item => {
              const product = PRODUCTS.find(p => p.id === item.productId);
              if (!product) return '';
              const primaryImage = product.images && product.images[0] ? product.images[0] : 'default';

              return `
                <div class="cart-item-card">
                  <!-- Visual Thumbnail -->
                  <div style="width: 100px; height: 100px; background: #f8fafc; border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); padding: 8px; flex-shrink: 0; display: flex; align-items: center; justify-content: center;">
                    ${renderProductSvg(primaryImage, product.colors ? product.colors[0] : '#2563eb')}
                  </div>

                  <!-- Details -->
                  <div style="flex: 1;">
                    <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 4px;">
                      <div>
                        <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; color: var(--color-gray-500);">${product.brand}</span>
                        <h3 
                          style="font-size: var(--text-sm); font-weight: 700; color: var(--color-gray-900); cursor: pointer;"
                          onclick="window.appRouter.navigate('product', { productId: '${product.id}' })"
                        >
                          ${product.title}
                        </h3>
                      </div>
                      <div style="font-size: 11px; color: var(--color-gray-500); text-align: right;">
                        Delivery by <strong>${product.deliveryDays}</strong>
                      </div>
                    </div>

                    <!-- Selected Variants -->
                    <div style="font-size: var(--text-xs); color: var(--color-gray-500); margin-bottom: var(--space-3);">
                      ${item.selectedColor ? `Color: <strong>${item.selectedColor}</strong>` : ''}
                      ${item.selectedSize ? ` • Size: <strong>${item.selectedSize}</strong>` : ''}
                    </div>

                    <!-- Price Row -->
                    <div style="display: flex; align-items: baseline; gap: var(--space-2); margin-bottom: var(--space-4);">
                      <span style="font-size: var(--text-lg); font-weight: 800; color: var(--color-gray-900);">₹${(product.price * item.qty).toLocaleString('en-IN')}</span>
                      <span style="font-size: var(--text-xs); color: var(--color-gray-400); text-decoration: line-through;">₹${(product.mrp * item.qty).toLocaleString('en-IN')}</span>
                      <span style="font-size: var(--text-xs); font-weight: 800; color: var(--color-success);">${product.discount}% off</span>
                    </div>

                    <!-- Actions: Quantity Stepper & Save for Later -->
                    <div style="display: flex; align-items: center; gap: var(--space-4); border-top: 1px solid var(--color-gray-100); padding-top: var(--space-3);">
                      <div class="quantity-stepper">
                        <button class="stepper-btn" onclick="window.appStore.updateCartQty('${product.id}', -1)">-</button>
                        <span class="stepper-val">${item.qty}</span>
                        <button class="stepper-btn" onclick="window.appStore.updateCartQty('${product.id}', 1)">+</button>
                      </div>

                      <button 
                        onclick="window.appStore.saveForLater('${product.id}')"
                        style="font-size: var(--text-xs); font-weight: 700; color: var(--color-gray-700);"
                      >
                        SAVE FOR LATER
                      </button>

                      <button 
                        onclick="window.appStore.removeFromCart('${product.id}')"
                        style="font-size: var(--text-xs); font-weight: 700; color: var(--color-danger);"
                      >
                        REMOVE
                      </button>
                    </div>
                  </div>
                </div>
              `;
            }).join('')}

            <!-- Saved For Later Shelf -->
            ${savedForLater.length > 0 ? `
              <div style="margin-top: var(--space-8);">
                <h3 style="font-size: var(--text-base); font-weight: 800; color: var(--color-gray-900); margin-bottom: var(--space-4);">
                  Saved For Later (${savedForLater.length})
                </h3>
                ${savedForLater.map(item => {
                  const product = PRODUCTS.find(p => p.id === item.productId);
                  if (!product) return '';
                  return `
                    <div class="cart-item-card" style="opacity: 0.9;">
                      <div style="width: 80px; height: 80px; background: #f8fafc; border-radius: var(--radius-md); padding: 6px; flex-shrink: 0;">
                        ${renderProductSvg(product.images[0] || 'default', product.colors[0] || '#2563eb')}
                      </div>
                      <div style="flex: 1;">
                        <h4 style="font-size: var(--text-xs); font-weight: 700;">${product.title}</h4>
                        <div style="font-size: var(--text-sm); font-weight: 800; margin: 4px 0;">₹${product.price.toLocaleString('en-IN')}</div>
                        <button 
                          class="btn-primary-login" 
                          style="font-size: 11px; padding: 4px 12px;"
                          onclick="window.appStore.moveToCartFromSaved('${product.id}')"
                        >
                          MOVE TO CART
                        </button>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            ` : ''}
          </div>

          <!-- Right Column: Sticky Price Summary & Coupons (4 cols desktop) -->
          <div style="grid-column: span 4;">
            <!-- Coupon Application Box -->
            <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-5); margin-bottom: var(--space-4); box-shadow: var(--shadow-xs);">
              <div style="font-weight: 800; font-size: var(--text-xs); text-transform: uppercase; color: var(--color-gray-900); margin-bottom: var(--space-3); display: flex; align-items: center; gap: 6px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                Apply Promo Coupons
              </div>

              ${appliedCoupon ? `
                <div style="background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: var(--radius-md); padding: var(--space-3); display: flex; align-items: center; justify-content: space-between;">
                  <div>
                    <strong style="color: #065f46; font-size: var(--text-xs);">${appliedCoupon.code} Applied!</strong>
                    <div style="font-size: 11px; color: #047857;">You saved extra ₹${pricing.couponDiscount}</div>
                  </div>
                  <button 
                    onclick="window.appStore.removeCoupon()" 
                    style="color: #ef4444; font-size: var(--text-xs); font-weight: 700;"
                  >
                    Remove
                  </button>
                </div>
              ` : `
                <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-3);">
                  <input 
                    type="text" 
                    id="cart-coupon-input" 
                    placeholder="Enter Coupon Code" 
                    style="flex: 1; padding: 8px 10px; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-size: var(--text-xs); text-transform: uppercase;" 
                  />
                  <button 
                    class="btn-primary-login" 
                    style="padding: 8px 16px; font-size: var(--text-xs);"
                    onclick="window.appStore.applyCoupon(document.getElementById('cart-coupon-input').value)"
                  >
                    Apply
                  </button>
                </div>

                <!-- Suggested Coupon Chips -->
                <div style="display: flex; flex-direction: column; gap: var(--space-2);">
                  ${COUPONS.map(c => `
                    <div 
                      style="border: 1px dashed var(--color-gray-300); border-radius: var(--radius-md); padding: 6px 10px; display: flex; align-items: center; justify-content: space-between; cursor: pointer; background: var(--color-gray-50);"
                      onclick="window.appStore.applyCoupon('${c.code}')"
                    >
                      <div>
                        <strong style="font-size: 11px; color: var(--color-blue-700);">${c.code}</strong>
                        <div style="font-size: 10px; color: var(--color-gray-500);">${c.description}</div>
                      </div>
                      <span style="font-size: 11px; font-weight: 800; color: var(--color-blue-600);">APPLY</span>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>

            <!-- Sticky Price Summary Card -->
            <div class="price-summary-sidebar">
              <h3 style="font-size: var(--text-sm); font-weight: 800; color: var(--color-gray-500); text-transform: uppercase; margin-bottom: var(--space-4);">
                Price Details
              </h3>

              <div class="price-row">
                <span>Price (${pricing.totalItems} items)</span>
                <span>₹${pricing.totalMrp.toLocaleString('en-IN')}</span>
              </div>

              <div class="price-row">
                <span>Discount on MRP</span>
                <span style="color: var(--color-success); font-weight: 700;">-₹${(pricing.totalMrp - pricing.productTotal).toLocaleString('en-IN')}</span>
              </div>

              ${pricing.couponDiscount > 0 ? `
                <div class="price-row">
                  <span>Coupon Discount</span>
                  <span style="color: var(--color-success); font-weight: 700;">-₹${pricing.couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              ` : ''}

              <div class="price-row">
                <span>Delivery Charges</span>
                <span>
                  ${pricing.deliveryFee === 0 ? '<strong style="color: var(--color-success);">FREE</strong>' : `₹${pricing.deliveryFee}`}
                </span>
              </div>

              <div class="price-row">
                <span>Secured Packaging Fee</span>
                <span>₹${pricing.packagingFee}</span>
              </div>

              <div class="price-row total-row">
                <span>Total Amount</span>
                <span>₹${pricing.grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <div style="background: #ecfdf5; border-radius: var(--radius-md); padding: var(--space-3); color: #065f46; font-size: var(--text-xs); font-weight: 700; margin-bottom: var(--space-5); text-align: center;">
                You will save ₹${pricing.totalSavings.toLocaleString('en-IN')} on this order!
              </div>

              <!-- Checkout CTA -->
              <button 
                class="btn-primary-login" 
                style="width: 100%; padding: var(--space-4); font-size: var(--text-base); background: var(--color-yellow-400); color: #0f172a; font-weight: 800; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);"
                onclick="window.appRouter.navigate('checkout')"
              >
                PROCEED TO CHECKOUT &rarr;
              </button>

              <div style="display: flex; align-items: center; justify-content: center; gap: 6px; font-size: 11px; color: var(--color-gray-500); margin-top: var(--space-4);">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                100% Safe and Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
