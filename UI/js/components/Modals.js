import { store } from '../store.js';

export const Modals = {
  openAddressModal() {
    const overlay = document.getElementById('modal-overlay');
    const dialog = document.getElementById('modal-dialog-content');
    if (!overlay || !dialog) return;

    dialog.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Select Delivery Address</h3>
        <button class="modal-close-btn" onclick="window.appModals.closeModal()">&times;</button>
      </div>
      <div class="modal-body">
        <p style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-4);">
          Choose an address to view accurate product availability and express delivery dates.
        </p>

        <div style="display: flex; gap: var(--space-2); margin-bottom: var(--space-4);">
          <input 
            type="text" 
            id="modal-pincode-input" 
            placeholder="Enter 6-digit Pincode (e.g. 560102)" 
            maxlength="6"
            value="${store.state.pincode}"
            style="flex: 1; padding: var(--space-2) var(--space-3); border: 1px solid var(--color-gray-300); border-radius: var(--radius-md); font-size: var(--text-sm);"
          />
          <button 
            class="btn-primary-login" 
            onclick="window.appActions.updatePincode(document.getElementById('modal-pincode-input').value)"
          >
            Apply
          </button>
        </div>

        <div style="display: flex; flex-direction: column; gap: var(--space-3);">
          ${store.state.user.addresses.map(addr => `
            <div 
              style="border: 1.5px solid ${store.state.selectedAddressId === addr.id ? 'var(--color-blue-600)' : 'var(--color-gray-200)'}; background: ${store.state.selectedAddressId === addr.id ? 'var(--color-blue-50)' : 'var(--color-white)'}; border-radius: var(--radius-lg); padding: var(--space-4); cursor: pointer;"
              onclick="window.appActions.selectAddress('${addr.id}', '${addr.pincode}')"
            >
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 4px;">
                <strong style="font-size: var(--text-sm);">${addr.name}</strong>
                <span style="font-size: 10px; font-weight: 800; background: #e2e8f0; padding: 2px 6px; border-radius: 4px;">${addr.tag}</span>
              </div>
              <p style="font-size: var(--text-xs); color: var(--color-gray-600); line-height: 1.4;">
                ${addr.addressLine}, ${addr.city}, ${addr.state} - <strong>${addr.pincode}</strong>
              </p>
              <div style="font-size: var(--text-xs); color: var(--color-gray-500); margin-top: 4px;">Phone: ${addr.phone}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    overlay.classList.add('open');
  },

  openSizeGuideModal() {
    const overlay = document.getElementById('modal-overlay');
    const dialog = document.getElementById('modal-dialog-content');
    if (!overlay || !dialog) return;

    dialog.innerHTML = `
      <div class="modal-header">
        <h3 class="modal-title">Standard Size & Fit Guide</h3>
        <button class="modal-close-btn" onclick="window.appModals.closeModal()">&times;</button>
      </div>
      <div class="modal-body">
        <p style="font-size: var(--text-xs); color: var(--color-gray-600); margin-bottom: var(--space-4);">
          All measurements are in inches. For a relaxed fit, we recommend ordering one size larger.
        </p>
        <table style="width: 100%; border-collapse: collapse; font-size: var(--text-xs); text-align: left;">
          <thead>
            <tr style="background: var(--color-gray-100); border-bottom: 2px solid var(--color-gray-200);">
              <th style="padding: 8px;">Size</th>
              <th style="padding: 8px;">Chest (in)</th>
              <th style="padding: 8px;">Front Length (in)</th>
              <th style="padding: 8px;">Shoulder (in)</th>
            </tr>
          </thead>
          <tbody>
            <tr style="border-bottom: 1px solid var(--color-gray-200);"><td style="padding: 8px; font-weight: 700;">S (38)</td><td style="padding: 8px;">38 - 39</td><td style="padding: 8px;">28.5</td><td style="padding: 8px;">17.5</td></tr>
            <tr style="border-bottom: 1px solid var(--color-gray-200);"><td style="padding: 8px; font-weight: 700;">M (40)</td><td style="padding: 8px;">40 - 41</td><td style="padding: 8px;">29.0</td><td style="padding: 8px;">18.0</td></tr>
            <tr style="border-bottom: 1px solid var(--color-gray-200);"><td style="padding: 8px; font-weight: 700;">L (42)</td><td style="padding: 8px;">42 - 43</td><td style="padding: 8px;">29.5</td><td style="padding: 8px;">18.5</td></tr>
            <tr style="border-bottom: 1px solid var(--color-gray-200);"><td style="padding: 8px; font-weight: 700;">XL (44)</td><td style="padding: 8px;">44 - 45</td><td style="padding: 8px;">30.0</td><td style="padding: 8px;">19.2</td></tr>
          </tbody>
        </table>
      </div>
    `;

    overlay.classList.add('open');
  },

  openOrderSuccessModal(order) {
    const overlay = document.getElementById('modal-overlay');
    const dialog = document.getElementById('modal-dialog-content');
    if (!overlay || !dialog) return;

    dialog.innerHTML = `
      <div class="modal-body" style="text-align: center; padding: var(--space-8) var(--space-6);">
        <div style="width: 64px; height: 64px; border-radius: 50%; background: #ecfdf5; color: #059669; display: flex; align-items: center; justify-content: center; margin: 0 auto var(--space-4);">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>

        <h3 style="font-size: var(--text-2xl); font-weight: 800; color: var(--color-gray-900); margin-bottom: 4px;">Order Confirmed!</h3>
        <p style="font-size: var(--text-sm); color: var(--color-gray-600); margin-bottom: var(--space-4);">
          Thank you for choosing Nexora. We have sent the confirmation SMS & Email.
        </p>

        <div style="background: var(--color-gray-50); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-4); text-align: left; margin-bottom: var(--space-6);">
          <div style="display: flex; justify-content: space-between; font-size: var(--text-xs); margin-bottom: 6px;">
            <span style="color: var(--color-gray-500);">Order ID</span>
            <strong style="color: var(--color-blue-700);">${order.orderId}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: var(--text-xs); margin-bottom: 6px;">
            <span style="color: var(--color-gray-500);">Expected Delivery</span>
            <strong style="color: var(--color-gray-900);">${order.estimatedDelivery}</strong>
          </div>
          <div style="display: flex; justify-content: space-between; font-size: var(--text-xs);">
            <span style="color: var(--color-gray-500);">Amount Paid</span>
            <strong style="color: var(--color-gray-900);">₹${order.total.toLocaleString('en-IN')}</strong>
          </div>
        </div>

        <div style="display: flex; gap: var(--space-3);">
          <button 
            class="btn-primary-login" 
            style="flex: 1; padding: var(--space-3);"
            onclick="window.appModals.closeModal(); window.appRouter.navigate('dashboard', { dashboardTab: 'orders' })"
          >
            Track in Orders
          </button>
          <button 
            style="flex: 1; padding: var(--space-3); border: 1px solid var(--color-gray-300); border-radius: var(--radius-lg); font-size: var(--text-sm); font-weight: 600;"
            onclick="window.appModals.closeModal(); window.appRouter.navigate('home')"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    `;

    overlay.classList.add('open');
  },

  closeModal() {
    const overlay = document.getElementById('modal-overlay');
    if (overlay) {
      overlay.classList.remove('open');
    }
  }
};
