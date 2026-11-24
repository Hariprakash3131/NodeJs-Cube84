import { store } from '../store.js';
import { PRODUCTS } from '../data.js';

export function renderCheckoutPage() {
  const { cart, user, selectedAddressId, selectedPaymentMethod } = store.state;
  const pricing = store.getCartPricing();

  if (cart.length === 0) {
    return `
      <div class="py-12 text-center">
        <div class="container" style="max-width: 500px;">
          <h2 style="font-size: var(--text-2xl); font-weight: 800; margin-bottom: 8px;">No items in checkout</h2>
          <p style="font-size: var(--text-xs); color: var(--color-gray-500); margin-bottom: 16px;">Please add items to your cart before proceeding to checkout.</p>
          <button class="btn-primary-login" onclick="window.appRouter.navigate('home')">Return to Store</button>
        </div>
      </div>
    `;
  }

  return `
    <div class="checkout-page-view py-6">
      <div class="container">
        <!-- Secure Checkout Header Indicator -->
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-6); border-bottom: 1px solid var(--color-gray-200); padding-bottom: var(--space-4);">
          <div style="display: flex; align-items: center; gap: var(--space-2);">
            <div class="brand-crest" style="width: 32px; height: 32px; font-size: 1rem;">N</div>
            <span style="font-size: var(--text-lg); font-weight: 800; color: var(--color-gray-900);">Nexora Secured Checkout</span>
          </div>
          <div style="display: flex; align-items: center; gap: 6px; font-size: var(--text-xs); color: var(--color-success); font-weight: 700;">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            256-Bit Bank Grade SSL Encrypted
          </div>
        </div>

        <div class="grid-12">
          <!-- Left Column: Checkout Accordion Steps (8 cols desktop) -->
          <div style="grid-column: span 8;">
            <!-- Step 1: Login Account Confirmation -->
            <div class="checkout-step-card">
              <div class="step-card-header">
                <span class="step-number" style="background: var(--color-success);">✓</span>
                <span style="flex: 1;">1. Login & Contact Info</span>
                <span style="font-size: var(--text-xs); font-weight: 500; color: var(--color-gray-500);">${user.name} (${user.phone})</span>
              </div>
            </div>

            <!-- Step 2: Delivery Address -->
            <div class="checkout-step-card">
              <div class="step-card-header">
                <span class="step-number">2</span>
                <span style="flex: 1;">2. Delivery Address</span>
                <button 
                  onclick="window.appModals.openAddressModal()" 
                  style="font-size: var(--text-xs); color: var(--color-blue-600); font-weight: 700;"
                >
                  + Add New Address
                </button>
              </div>
              <div class="step-card-body">
                <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                  ${user.addresses.map(addr => `
                    <label 
                      style="display: flex; gap: var(--space-3); border: 1.5px solid ${selectedAddressId === addr.id ? 'var(--color-blue-600)' : 'var(--color-gray-200)'}; background: ${selectedAddressId === addr.id ? 'var(--color-blue-50)' : 'var(--color-white)'}; border-radius: var(--radius-lg); padding: var(--space-4); cursor: pointer;"
                    >
                      <input 
                        type="radio" 
                        name="checkout-address-select" 
                        value="${addr.id}"
                        ${selectedAddressId === addr.id ? 'checked' : ''}
                        onchange="window.appStore.state.selectedAddressId = '${addr.id}'; window.appStore.notify();"
                        style="margin-top: 4px; accent-color: var(--color-blue-600);"
                      />
                      <div style="flex: 1;">
                        <div style="display: flex; align-items: center; gap: var(--space-2); margin-bottom: 2px;">
                          <strong style="font-size: var(--text-sm);">${addr.name}</strong>
                          <span style="font-size: 10px; font-weight: 800; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${addr.tag}</span>
                          <span style="font-size: var(--text-xs); color: var(--color-gray-600); font-weight: 600;">${addr.phone}</span>
                        </div>
                        <p style="font-size: var(--text-xs); color: var(--color-gray-700); line-height: 1.4;">
                          ${addr.addressLine}, ${addr.city}, ${addr.state} - <strong>${addr.pincode}</strong>
                        </p>
                      </div>
                    </label>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Step 3: Order Review & Items -->
            <div class="checkout-step-card">
              <div class="step-card-header">
                <span class="step-number">3</span>
                <span>3. Order Summary (${pricing.totalItems} Items)</span>
              </div>
              <div class="step-card-body">
                ${cart.map(item => {
                  const p = PRODUCTS.find(prod => prod.id === item.productId);
                  if (!p) return '';
                  return `
                    <div style="display: flex; align-items: center; justify-content: space-between; border-bottom: 1px solid var(--color-gray-100); padding: var(--space-3) 0;">
                      <div style="display: flex; align-items: center; gap: var(--space-3);">
                        <div style="width: 48px; height: 48px; background: #f8fafc; border-radius: var(--radius-sm); border: 1px solid var(--color-gray-200); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px;">
                          ${item.qty}x
                        </div>
                        <div>
                          <h4 style="font-size: var(--text-xs); font-weight: 700; color: var(--color-gray-900);">${p.title.slice(0, 50)}...</h4>
                          <span style="font-size: 11px; color: var(--color-gray-500);">${item.selectedColor || ''} • Delivery by ${p.deliveryDays}</span>
                        </div>
                      </div>
                      <strong style="font-size: var(--text-sm); color: var(--color-gray-900);">₹${(p.price * item.qty).toLocaleString('en-IN')}</strong>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Step 4: Payment Options (Full Indian Payment Ecosystem) -->
            <div class="checkout-step-card">
              <div class="step-card-header">
                <span class="step-number">4</span>
                <span>4. Payment Methods</span>
              </div>
              <div class="step-card-body">
                <!-- Payment Navigation Tabs -->
                <div class="payment-tab-row">
                  <button 
                    class="payment-tab-btn ${selectedPaymentMethod === 'upi' ? 'active' : ''}" 
                    onclick="window.appStore.state.selectedPaymentMethod = 'upi'; window.appStore.notify();"
                  >
                    UPI / QR Code
                  </button>
                  <button 
                    class="payment-tab-btn ${selectedPaymentMethod === 'cards' ? 'active' : ''}" 
                    onclick="window.appStore.state.selectedPaymentMethod = 'cards'; window.appStore.notify();"
                  >
                    Credit / Debit Card
                  </button>
                  <button 
                    class="payment-tab-btn ${selectedPaymentMethod === 'netbanking' ? 'active' : ''}" 
                    onclick="window.appStore.state.selectedPaymentMethod = 'netbanking'; window.appStore.notify();"
                  >
                    Net Banking
                  </button>
                  <button 
                    class="payment-tab-btn ${selectedPaymentMethod === 'cod' ? 'active' : ''}" 
                    onclick="window.appStore.state.selectedPaymentMethod = 'cod'; window.appStore.notify();"
                  >
                    Cash on Delivery
                  </button>
                  <button 
                    class="payment-tab-btn ${selectedPaymentMethod === 'emi' ? 'active' : ''}" 
                    onclick="window.appStore.state.selectedPaymentMethod = 'emi'; window.appStore.notify();"
                  >
                    EMI / Pay Later
                  </button>
                </div>

                <!-- UPI Tab Content -->
                ${selectedPaymentMethod === 'upi' ? `
                  <div style="background: var(--color-gray-50); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-5);">
                    <h4 style="font-size: var(--text-sm); font-weight: 700; margin-bottom: var(--space-3);">Choose your preferred UPI Option:</h4>
                    <div style="display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-4);">
                      <label style="display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-xs); cursor: pointer;">
                        <input type="radio" name="upi-option" checked style="accent-color: var(--color-blue-600);" />
                        <span style="font-weight: 600;">Google Pay (aarav@okhdfcbank)</span>
                        <span style="font-size: 10px; background: #ecfdf5; color: #047857; padding: 2px 6px; border-radius: 4px; font-weight: 700;">Fastest</span>
                      </label>
                      <label style="display: flex; align-items: center; gap: var(--space-3); font-size: var(--text-xs); cursor: pointer;">
                        <input type="radio" name="upi-option" style="accent-color: var(--color-blue-600);" />
                        <span style="font-weight: 600;">PhonePe / BHIM UPI (9876543210@ybl)</span>
                      </label>
                    </div>

                    <div style="display: flex; gap: var(--space-2); max-width: 360px;">
                      <input 
                        type="text" 
                        placeholder="Enter other UPI ID (e.g. user@oksbi)"
                        style="flex: 1; padding: 8px 10px; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-size: var(--text-xs);"
                      />
                      <button class="btn-primary-login" style="padding: 8px 14px; font-size: var(--text-xs);">Verify</button>
                    </div>
                  </div>
                ` : ''}

                <!-- Cards Tab Content -->
                ${selectedPaymentMethod === 'cards' ? `
                  <div style="background: var(--color-gray-50); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-5);">
                    <h4 style="font-size: var(--text-sm); font-weight: 700; margin-bottom: var(--space-3);">Enter Credit or Debit Card Details:</h4>
                    <div style="display: flex; flex-direction: column; gap: var(--space-3); max-width: 420px;">
                      <input type="text" placeholder="Card Number (16 Digits)" maxlength="19" style="padding: 10px; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-size: var(--text-xs);" />
                      <div style="display: flex; gap: var(--space-3);">
                        <input type="text" placeholder="MM / YY" maxlength="5" style="flex: 1; padding: 10px; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-size: var(--text-xs);" />
                        <input type="password" placeholder="CVV (3 Digits)" maxlength="4" style="flex: 1; padding: 10px; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-size: var(--text-xs);" />
                      </div>
                      <input type="text" placeholder="Cardholder Name as on card" style="padding: 10px; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-size: var(--text-xs);" />
                    </div>
                  </div>
                ` : ''}

                <!-- Net Banking Tab Content -->
                ${selectedPaymentMethod === 'netbanking' ? `
                  <div style="background: var(--color-gray-50); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-5);">
                    <h4 style="font-size: var(--text-sm); font-weight: 700; margin-bottom: var(--space-3);">Select Popular Bank:</h4>
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-2); margin-bottom: var(--space-4);">
                      <label style="border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); padding: 8px; text-align: center; cursor: pointer; background: #ffffff;">
                        <input type="radio" name="nb-bank" checked style="accent-color: var(--color-blue-600);" />
                        <span style="font-size: 11px; font-weight: 700;">HDFC Bank</span>
                      </label>
                      <label style="border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); padding: 8px; text-align: center; cursor: pointer; background: #ffffff;">
                        <input type="radio" name="nb-bank" style="accent-color: var(--color-blue-600);" />
                        <span style="font-size: 11px; font-weight: 700;">State Bank of India</span>
                      </label>
                      <label style="border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); padding: 8px; text-align: center; cursor: pointer; background: #ffffff;">
                        <input type="radio" name="nb-bank" style="accent-color: var(--color-blue-600);" />
                        <span style="font-size: 11px; font-weight: 700;">ICICI Bank</span>
                      </label>
                    </div>
                  </div>
                ` : ''}

                <!-- Cash on Delivery Tab Content -->
                ${selectedPaymentMethod === 'cod' ? `
                  <div style="background: var(--color-gray-50); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-5);">
                    <h4 style="font-size: var(--text-sm); font-weight: 700; margin-bottom: var(--space-2);">Cash on Delivery Available</h4>
                    <p style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-3);">
                      You can pay via Cash, UPI QR or Card upon delivery to your delivery executive.
                    </p>
                    <div style="display: flex; align-items: center; gap: var(--space-3);">
                      <span style="font-family: monospace; font-size: 18px; font-weight: 800; background: #e2e8f0; padding: 6px 14px; border-radius: 4px; letter-spacing: 4px;">7489</span>
                      <input type="text" placeholder="Enter Captcha code" maxlength="4" style="width: 140px; padding: 8px; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-size: var(--text-xs);" />
                    </div>
                  </div>
                ` : ''}

                <!-- EMI Tab Content -->
                ${selectedPaymentMethod === 'emi' ? `
                  <div style="background: var(--color-gray-50); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-5);">
                    <h4 style="font-size: var(--text-sm); font-weight: 700; margin-bottom: var(--space-2);">Nexora PayLater & No Cost EMI</h4>
                    <p style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-3);">
                      Pre-approved limit: <strong>₹50,000</strong>. Pay next month on 5th with 0 interest.
                    </p>
                    <button class="btn-primary-login" style="font-size: var(--text-xs); padding: 8px 16px;">
                      Activate Instant PayLater &rarr;
                    </button>
                  </div>
                ` : ''}

                <!-- Place Order Button -->
                <div style="margin-top: var(--space-6);">
                  <button 
                    class="btn-primary-login" 
                    style="width: 100%; padding: var(--space-4); font-size: var(--text-base); font-weight: 800; background: var(--color-yellow-400); color: #0f172a; box-shadow: 0 4px 14px rgba(245, 158, 11, 0.4);"
                    onclick="window.appActions.handlePlaceOrder()"
                  >
                    CONFIRM & PLACE ORDER (₹${pricing.grandTotal.toLocaleString('en-IN')})
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column: Sticky Order Summary (4 cols desktop) -->
          <div style="grid-column: span 4;">
            <div class="price-summary-sidebar">
              <h3 style="font-size: var(--text-sm); font-weight: 800; color: var(--color-gray-500); text-transform: uppercase; margin-bottom: var(--space-4);">
                Order Summary
              </h3>

              <div class="price-row">
                <span>Items Subtotal</span>
                <span>₹${pricing.totalMrp.toLocaleString('en-IN')}</span>
              </div>

              <div class="price-row">
                <span>Discount on MRP</span>
                <span style="color: var(--color-success); font-weight: 700;">-₹${(pricing.totalMrp - pricing.productTotal).toLocaleString('en-IN')}</span>
              </div>

              ${pricing.couponDiscount > 0 ? `
                <div class="price-row">
                  <span>Coupon (${store.state.appliedCoupon.code})</span>
                  <span style="color: var(--color-success); font-weight: 700;">-₹${pricing.couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              ` : ''}

              <div class="price-row">
                <span>Delivery Charge</span>
                <span>
                  ${pricing.deliveryFee === 0 ? '<strong style="color: var(--color-success);">FREE</strong>' : `₹${pricing.deliveryFee}`}
                </span>
              </div>

              <div class="price-row total-row">
                <span>Total Payable</span>
                <span>₹${pricing.grandTotal.toLocaleString('en-IN')}</span>
              </div>

              <div style="font-size: 11px; color: var(--color-gray-500); line-height: 1.4; border-top: 1px solid var(--color-gray-100); padding-top: var(--space-3);">
                By placing your order, you agree to Nexora's <a href="javascript:void(0)" style="color: var(--color-blue-600);">Terms of Sale</a> and <a href="javascript:void(0)" style="color: var(--color-blue-600);">Privacy Policy</a>.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}
