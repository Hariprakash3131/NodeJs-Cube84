import { store } from '../store.js';
import { PRODUCTS } from '../data.js';
import { renderProductCard } from '../components/ProductCard.js';

export function renderDashboardPage() {
  const { user, activeDashboardTab, wishlist } = store.state;

  return `
    <div class="dashboard-page-view py-8">
      <div class="container">
        <!-- User Profile Header Card -->
        <div style="background: linear-gradient(135deg, var(--color-blue-800) 0%, var(--color-blue-900) 100%); border-radius: var(--radius-xl); padding: var(--space-6) var(--space-8); color: #ffffff; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4); margin-bottom: var(--space-8); box-shadow: var(--shadow-md);">
          <div style="display: flex; align-items: center; gap: var(--space-4);">
            <div style="width: 64px; height: 64px; border-radius: var(--radius-full); background: var(--color-yellow-400); color: #0f172a; font-size: var(--text-xl); font-weight: 800; display: flex; align-items: center; justify-content: center; box-shadow: var(--shadow-sm);">
              ${user.avatar}
            </div>
            <div>
              <div style="display: flex; align-items: center; gap: var(--space-2);">
                <h1 style="font-size: var(--text-xl); font-weight: 800;">${user.name}</h1>
                <span style="background: rgba(254, 243, 199, 0.2); border: 1px solid rgba(253, 230, 138, 0.4); color: var(--color-yellow-300); font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: var(--radius-full);">
                  ★ ${user.tier}
                </span>
              </div>
              <p style="font-size: var(--text-xs); color: rgba(255,255,255,0.7); margin-top: 2px;">
                ${user.email} • ${user.phone}
              </p>
            </div>
          </div>

          <div style="display: flex; gap: var(--space-6);">
            <div style="text-align: right;">
              <span style="font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; color: var(--color-yellow-300); font-weight: 700;">SuperCoins Balance</span>
              <div style="font-size: var(--text-2xl); font-weight: 800; color: #ffffff;">🪙 ${user.superCoins}</div>
            </div>
          </div>
        </div>

        <div class="grid-12">
          <!-- Left Navigation Tabs (3 cols desktop) -->
          <div style="grid-column: span 3;">
            <div class="dashboard-nav-card">
              <div 
                class="dashboard-nav-item ${activeDashboardTab === 'orders' ? 'active' : ''}"
                onclick="window.appStore.state.activeDashboardTab = 'orders'; window.appStore.notify();"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                <span>My Orders</span>
              </div>

              <div 
                class="dashboard-nav-item ${activeDashboardTab === 'wishlist' ? 'active' : ''}"
                onclick="window.appStore.state.activeDashboardTab = 'wishlist'; window.appStore.notify();"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                <span>My Wishlist (${wishlist.length})</span>
              </div>

              <div 
                class="dashboard-nav-item ${activeDashboardTab === 'addresses' ? 'active' : ''}"
                onclick="window.appStore.state.activeDashboardTab = 'addresses'; window.appStore.notify();"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                <span>Saved Addresses</span>
              </div>

              <div 
                class="dashboard-nav-item ${activeDashboardTab === 'payments' ? 'active' : ''}"
                onclick="window.appStore.state.activeDashboardTab = 'payments'; window.appStore.notify();"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                <span>Cards & UPI</span>
              </div>

              <div 
                class="dashboard-nav-item ${activeDashboardTab === 'notifications' ? 'active' : ''}"
                onclick="window.appStore.state.activeDashboardTab = 'notifications'; window.appStore.notify();"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
                <span>Notifications</span>
              </div>

              <div 
                class="dashboard-nav-item ${activeDashboardTab === 'settings' ? 'active' : ''}"
                onclick="window.appStore.state.activeDashboardTab = 'settings'; window.appStore.notify();"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
                <span>Profile & Settings</span>
              </div>
            </div>
          </div>

          <!-- Right Content Area (9 cols desktop) -->
          <div style="grid-column: span 9;">
            <!-- Tab 1: Orders -->
            ${activeDashboardTab === 'orders' ? `
              <div>
                <h2 style="font-size: var(--text-lg); font-weight: 800; margin-bottom: var(--space-4);">Order History & Live Tracking</h2>

                ${user.orders.map(order => `
                  <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-xl); padding: var(--space-6); margin-bottom: var(--space-5); box-shadow: var(--shadow-xs);">
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--color-gray-100); padding-bottom: var(--space-3); margin-bottom: var(--space-4); flex-wrap: wrap; gap: 8px;">
                      <div>
                        <span style="font-size: 11px; color: var(--color-gray-500);">Order Placed on ${order.date}</span>
                        <div style="font-weight: 800; font-size: var(--text-sm); color: var(--color-blue-700);">${order.orderId}</div>
                      </div>
                      <div style="display: flex; align-items: center; gap: var(--space-3);">
                        <strong style="font-size: var(--text-base);">₹${order.total.toLocaleString('en-IN')}</strong>
                        <button 
                          style="border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); padding: 4px 10px; font-size: 11px; font-weight: 700; color: var(--color-gray-700);"
                          onclick="window.appStore.showToast('Downloading Tax Invoice PDF...', 'success')"
                        >
                          Invoice PDF
                        </button>
                      </div>
                    </div>

                    <!-- Items List in Order -->
                    ${order.items.map(it => `
                      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-3);">
                        <div style="display: flex; align-items: center; gap: var(--space-3);">
                          <div style="width: 44px; height: 44px; background: #f8fafc; border-radius: var(--radius-sm); border: 1px solid var(--color-gray-200); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 11px;">
                            ${it.qty}x
                          </div>
                          <div>
                            <div style="font-size: var(--text-xs); font-weight: 700;">${it.title}</div>
                            <div style="font-size: 11px; color: var(--color-gray-500);">${it.color || ''}</div>
                          </div>
                        </div>
                        <span style="font-size: var(--text-xs); font-weight: 700;">₹${it.price.toLocaleString('en-IN')}</span>
                      </div>
                    `).join('')}

                    <!-- Visual Delivery Stepper Tracker (Flipkart / Amazon Pattern) -->
                    <div class="order-tracker">
                      <div class="order-tracker-line"></div>
                      <div class="order-tracker-progress" style="width: ${order.currentStep === 1 ? '10%' : order.currentStep === 2 ? '40%' : order.currentStep === 3 ? '75%' : '100%'}"></div>

                      <div class="tracker-node ${order.currentStep >= 1 ? 'completed' : ''}">
                        <div class="tracker-circle">✓</div>
                        <span class="tracker-label">Confirmed</span>
                      </div>

                      <div class="tracker-node ${order.currentStep >= 2 ? (order.currentStep === 2 ? 'current' : 'completed') : ''}">
                        <div class="tracker-circle">${order.currentStep >= 2 ? '✓' : '2'}</div>
                        <span class="tracker-label">Shipped</span>
                      </div>

                      <div class="tracker-node ${order.currentStep >= 3 ? (order.currentStep === 3 ? 'current' : 'completed') : ''}">
                        <div class="tracker-circle">${order.currentStep >= 3 ? '✓' : '3'}</div>
                        <span class="tracker-label">Out for Delivery</span>
                      </div>

                      <div class="tracker-node ${order.currentStep >= 4 ? 'completed' : ''}">
                        <div class="tracker-circle">${order.currentStep >= 4 ? '✓' : '4'}</div>
                        <span class="tracker-label">Delivered</span>
                      </div>
                    </div>

                    <div style="background: var(--color-blue-50); border-radius: var(--radius-md); padding: 8px 12px; font-size: var(--text-xs); color: var(--color-blue-800); font-weight: 600; display: flex; align-items: center; justify-content: space-between;">
                      <span>Status: <strong>${order.status}</strong> (${order.estimatedDelivery})</span>
                      <button style="color: var(--color-blue-700); font-weight: 800; font-size: 11px;" onclick="window.appStore.showToast('Live tracking updates active.', 'info')">
                        Need Help &rarr;
                      </button>
                    </div>
                  </div>
                `).join('')}
              </div>
            ` : ''}

            <!-- Tab 2: Wishlist -->
            ${activeDashboardTab === 'wishlist' ? `
              <div>
                <h2 style="font-size: var(--text-lg); font-weight: 800; margin-bottom: var(--space-4);">My Wishlist (${wishlist.length} Items)</h2>
                ${wishlist.length > 0 ? `
                  <div class="grid-12">
                    ${wishlist.map(id => {
                      const p = PRODUCTS.find(prod => prod.id === id);
                      if (!p) return '';
                      return `
                        <div style="grid-column: span 4;">
                          ${renderProductCard(p)}
                        </div>
                      `;
                    }).join('')}
                  </div>
                ` : `
                  <p style="font-size: var(--text-xs); color: var(--color-gray-500);">Your wishlist is empty. Tap the heart on products you love to save them for later.</p>
                `}
              </div>
            ` : ''}

            <!-- Tab 3: Saved Addresses -->
            ${activeDashboardTab === 'addresses' ? `
              <div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: var(--space-4);">
                  <h2 style="font-size: var(--text-lg); font-weight: 800;">Saved Delivery Addresses</h2>
                  <button class="btn-primary-login" onclick="window.appModals.openAddressModal()">+ Add New Address</button>
                </div>

                <div style="display: flex; flex-direction: column; gap: var(--space-4);">
                  ${user.addresses.map(addr => `
                    <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-5); box-shadow: var(--shadow-xs);">
                      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 6px;">
                        <div style="display: flex; align-items: center; gap: 8px;">
                          <strong style="font-size: var(--text-sm);">${addr.name}</strong>
                          <span style="font-size: 10px; font-weight: 800; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${addr.tag}</span>
                          ${addr.isDefault ? '<span style="font-size: 10px; font-weight: 800; color: #059669; background: #ecfdf5; padding: 2px 6px; border-radius: 4px;">DEFAULT</span>' : ''}
                        </div>
                        <div style="display: flex; gap: var(--space-2);">
                          <button style="font-size: 11px; color: var(--color-blue-600); font-weight: 700;" onclick="window.appModals.openAddressModal()">Edit</button>
                          <span style="color: var(--color-gray-300);">|</span>
                          <button style="font-size: 11px; color: var(--color-danger); font-weight: 700;" onclick="window.appStore.showToast('Address cannot be deleted if set as default', 'info')">Delete</button>
                        </div>
                      </div>
                      <p style="font-size: var(--text-xs); color: var(--color-gray-600); line-height: 1.5;">
                        ${addr.addressLine}, ${addr.city}, ${addr.state} - <strong>${addr.pincode}</strong>
                      </p>
                      <div style="font-size: 11px; color: var(--color-gray-500); margin-top: 4px;">Mobile: ${addr.phone}</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Tab 4: Payments -->
            ${activeDashboardTab === 'payments' ? `
              <div>
                <h2 style="font-size: var(--text-lg); font-weight: 800; margin-bottom: var(--space-4);">Saved Payment Instruments</h2>
                
                <!-- Nexora Wallet Card -->
                <div style="background: linear-gradient(135deg, #1e40af 0%, #2563eb 100%); border-radius: var(--radius-lg); padding: var(--space-6); color: #ffffff; margin-bottom: var(--space-6);">
                  <span style="font-size: 10px; font-weight: 800; text-transform: uppercase; background: rgba(255,255,255,0.2); padding: 2px 8px; border-radius: 4px;">Nexora FastPay Wallet</span>
                  <div style="font-size: var(--text-3xl); font-weight: 800; margin: 8px 0;">₹1,250.00</div>
                  <p style="font-size: var(--text-xs); opacity: 0.85;">1-click checkout ready • Zero OTP needed for transactions under ₹2,000</p>
                </div>

                <h3 style="font-size: var(--text-sm); font-weight: 800; margin-bottom: var(--space-3);">Saved Cards</h3>
                <div style="display: flex; flex-direction: column; gap: var(--space-3); margin-bottom: var(--space-6);">
                  ${user.savedCards.map(c => `
                    <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); padding: var(--space-4); display: flex; align-items: center; justify-content: space-between;">
                      <div style="display: flex; align-items: center; gap: var(--space-3);">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect><line x1="1" y1="10" x2="23" y2="10"></line></svg>
                        <div>
                          <strong>${c.bank} ${c.type}</strong>
                          <div style="font-size: 11px; color: var(--color-gray-500);">${c.number} • Exp: ${c.expiry}</div>
                        </div>
                      </div>
                      <button style="font-size: 11px; color: var(--color-danger); font-weight: 700;">Remove</button>
                    </div>
                  `).join('')}
                </div>

                <h3 style="font-size: var(--text-sm); font-weight: 800; margin-bottom: var(--space-3);">Linked UPI Accounts</h3>
                <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                  ${user.savedUpi.map(u => `
                    <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); padding: var(--space-4); display: flex; align-items: center; justify-content: space-between;">
                      <div>
                        <strong>${u.app}</strong>
                        <div style="font-size: 11px; color: var(--color-gray-500);">${u.handle}</div>
                      </div>
                      ${u.isPrimary ? '<span style="font-size: 10px; font-weight: 800; background: #ecfdf5; color: #047857; padding: 2px 6px; border-radius: 4px;">PRIMARY</span>' : ''}
                    </div>
                  `).join('')}
                </div>
              </div>
            ` : ''}

            <!-- Tab 5: Notifications -->
            ${activeDashboardTab === 'notifications' ? `
              <div>
                <h2 style="font-size: var(--text-lg); font-weight: 800; margin-bottom: var(--space-4);">Notifications & Alerts</h2>
                <div style="display: flex; flex-direction: column; gap: var(--space-3);">
                  <div style="background: var(--color-white); border-left: 4px solid var(--color-blue-600); border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); padding: var(--space-4);">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--color-gray-400); margin-bottom: 2px;">
                      <strong style="color: var(--color-blue-700);">Shipment Update</strong>
                      <span>2 hours ago</span>
                    </div>
                    <p style="font-size: var(--text-xs); color: var(--color-gray-800);">Your package <strong>NX-892410-IN</strong> is out for delivery with executive Rajesh (OTP: 5821).</p>
                  </div>

                  <div style="background: var(--color-white); border-left: 4px solid var(--color-success); border: 1px solid var(--color-gray-200); border-radius: var(--radius-md); padding: var(--space-4);">
                    <div style="display: flex; justify-content: space-between; font-size: 11px; color: var(--color-gray-400); margin-bottom: 2px;">
                      <strong style="color: var(--color-success);">Price Drop Alert</strong>
                      <span>Yesterday</span>
                    </div>
                    <p style="font-size: var(--text-xs); color: var(--color-gray-800);">AuraWave ANC Headphones in your wishlist just dropped by 15%! Buy before stocks run out.</p>
                  </div>
                </div>
              </div>
            ` : ''}

            <!-- Tab 6: Settings -->
            ${activeDashboardTab === 'settings' ? `
              <div>
                <h2 style="font-size: var(--text-lg); font-weight: 800; margin-bottom: var(--space-4);">Profile & Security Settings</h2>
                <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-6); max-width: 500px;">
                  <div style="display: flex; flex-direction: column; gap: var(--space-4);">
                    <div>
                      <label style="font-size: var(--text-xs); font-weight: 700; color: var(--color-gray-700); display: block; margin-bottom: 4px;">Full Name</label>
                      <input type="text" value="${user.name}" style="width: 100%; padding: 8px 12px; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-size: var(--text-xs);" />
                    </div>

                    <div>
                      <label style="font-size: var(--text-xs); font-weight: 700; color: var(--color-gray-700); display: block; margin-bottom: 4px;">Email Address</label>
                      <input type="email" value="${user.email}" style="width: 100%; padding: 8px 12px; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-size: var(--text-xs);" />
                    </div>

                    <div>
                      <label style="font-size: var(--text-xs); font-weight: 700; color: var(--color-gray-700); display: block; margin-bottom: 4px;">Mobile Phone Number</label>
                      <input type="tel" value="${user.phone}" style="width: 100%; padding: 8px 12px; border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-size: var(--text-xs);" />
                    </div>

                    <button class="btn-primary-login" onclick="window.appStore.showToast('Profile updated successfully!', 'success')">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    </div>
  `;
}
