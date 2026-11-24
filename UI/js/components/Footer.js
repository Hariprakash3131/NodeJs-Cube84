export function renderFooter() {
  return `
    <!-- Pre-Footer Trust Bar (Flipkart / Amazon Pattern) -->
    <section class="bg-white border-t border-b py-8" style="background: #ffffff;">
      <div class="container">
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-6);">
          <div style="display: flex; align-items: center; gap: var(--space-4);">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-lg); background: var(--color-blue-50); color: var(--color-blue-600); display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
            </div>
            <div>
              <h4 style="font-size: var(--text-sm); font-weight: 700; color: var(--color-gray-900);">100% Genuine</h4>
              <p style="font-size: var(--text-xs); color: var(--color-gray-500);">Direct from verified manufacturers</p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: var(--space-4);">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-lg); background: #ecfdf5; color: #059669; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="23 4 23 10 17 10"></polyline><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path></svg>
            </div>
            <div>
              <h4 style="font-size: var(--text-sm); font-weight: 700; color: var(--color-gray-900);">7-Day Easy Returns</h4>
              <p style="font-size: var(--text-xs); color: var(--color-gray-500);">Doorstep pickup & quick refund</p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: var(--space-4);">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-lg); background: #fef3c7; color: #d97706; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle></svg>
            </div>
            <div>
              <h4 style="font-size: var(--text-sm); font-weight: 700; color: var(--color-gray-900);">Free Express Delivery</h4>
              <p style="font-size: var(--text-xs); color: var(--color-gray-500);">Orders above ₹499 delivered fast</p>
            </div>
          </div>

          <div style="display: flex; align-items: center; gap: var(--space-4);">
            <div style="width: 48px; height: 48px; border-radius: var(--radius-lg); background: #eff6ff; color: #1e40af; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            </div>
            <div>
              <h4 style="font-size: var(--text-sm); font-weight: 700; color: var(--color-gray-900);">256-Bit SSL Security</h4>
              <p style="font-size: var(--text-xs); color: var(--color-gray-500);">Bank-grade encrypted checkout</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Main Footer -->
    <footer class="site-footer" role="contentinfo">
      <div class="container">
        <!-- Newsletter Signup Row -->
        <div style="display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-6); padding-bottom: var(--space-8); border-bottom: 1px solid rgba(255,255,255,0.12); margin-bottom: var(--space-8);">
          <div>
            <h3 style="font-size: var(--text-lg); font-weight: 700; color: #ffffff; margin-bottom: 4px;">Join the Nexora Insider Club</h3>
            <p style="color: var(--color-gray-400); font-size: var(--text-xs);">Subscribe for VIP early access to flash deals, secret coupons & trend drops.</p>
          </div>
          <form onsubmit="event.preventDefault(); window.appStore.showToast('Subscribed! Check your inbox for ₹200 welcome voucher.', 'success');" style="display: flex; gap: var(--space-2); width: 100%; max-width: 420px;">
            <input 
              type="email" 
              placeholder="Enter your email address..." 
              required
              style="flex: 1; padding: 10px 14px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.2); background: rgba(255,255,255,0.08); color: #ffffff; font-size: var(--text-xs); outline: none;" 
            />
            <button 
              type="submit" 
              style="background: var(--color-yellow-400); color: #0f172a; font-weight: 700; font-size: var(--text-xs); padding: 10px 18px; border-radius: var(--radius-md);"
            >
              Subscribe
            </button>
          </form>
        </div>

        <!-- 4-Column Links Directory -->
        <div class="grid-12" style="row-gap: var(--space-8);">
          <div style="grid-column: span 3;">
            <h4 class="footer-col-title">About Nexora</h4>
            <ul class="footer-link-list">
              <li><a href="javascript:void(0)">About Us</a></li>
              <li><a href="javascript:void(0)">Careers at Nexora</a></li>
              <li><a href="javascript:void(0)">Nexora Stories Blog</a></li>
              <li><a href="javascript:void(0)">Press Releases</a></li>
              <li><a href="javascript:void(0)">Nexora Wholesale</a></li>
              <li><a href="javascript:void(0)">Corporate Information</a></li>
            </ul>
          </div>

          <div style="grid-column: span 3;">
            <h4 class="footer-col-title">Help & Support</h4>
            <ul class="footer-link-list">
              <li><a href="javascript:void(0)">Payments & UPI FAQ</a></li>
              <li><a href="javascript:void(0)">Shipping & Express Delivery</a></li>
              <li><a href="javascript:void(0)">Cancellations & Returns</a></li>
              <li><a href="javascript:void(0)">Nexora Customer Care (24x7)</a></li>
              <li><a href="javascript:void(0)">Report Infringement</a></li>
              <li><a href="javascript:void(0)">Track Order Status</a></li>
            </ul>
          </div>

          <div style="grid-column: span 3;">
            <h4 class="footer-col-title">Consumer Policy</h4>
            <ul class="footer-link-list">
              <li><a href="javascript:void(0)">Return Policy</a></li>
              <li><a href="javascript:void(0)">Terms of Use</a></li>
              <li><a href="javascript:void(0)">Security & Encryption</a></li>
              <li><a href="javascript:void(0)">Privacy Policy</a></li>
              <li><a href="javascript:void(0)">Grievance Redressal</a></li>
              <li><a href="javascript:void(0)">EPR Compliance</a></li>
            </ul>
          </div>

          <div style="grid-column: span 3;">
            <h4 class="footer-col-title">Registered Office</h4>
            <div style="color: var(--color-gray-400); font-size: var(--text-xs); line-height: 1.6;">
              <p>Nexora Internet Private Limited,</p>
              <p>Buildings Alyssa, Begonia & Clove Embassy Tech Village,</p>
              <p>Outer Ring Road, Devarabeesanahalli Village,</p>
              <p>Bengaluru, 560103, Karnataka, India</p>
              <p style="margin-top: 8px;"><strong>CIN:</strong> U51109KA2026PTC198421</p>
              <p><strong>Telephone:</strong> 1800 208 9898</p>
            </div>
          </div>
        </div>

        <!-- Bottom Row: Payment Logos & Copyright -->
        <div class="footer-bottom-bar">
          <div style="display: flex; align-items: center; gap: var(--space-4); flex-wrap: wrap;">
            <span style="color: var(--color-gray-400); font-size: 11px;">Payment Partners:</span>
            <span style="background: rgba(255,255,255,0.1); padding: 3px 8px; border-radius: 4px; font-weight: 700; color: #38bdf8;">UPI</span>
            <span style="background: rgba(255,255,255,0.1); padding: 3px 8px; border-radius: 4px; font-weight: 700; color: #4ade80;">RuPay</span>
            <span style="background: rgba(255,255,255,0.1); padding: 3px 8px; border-radius: 4px; font-weight: 700; color: #ffffff;">VISA</span>
            <span style="background: rgba(255,255,255,0.1); padding: 3px 8px; border-radius: 4px; font-weight: 700; color: #f59e0b;">Mastercard</span>
            <span style="background: rgba(255,255,255,0.1); padding: 3px 8px; border-radius: 4px; font-weight: 700; color: #cbd5e1;">NetBanking</span>
            <span style="background: rgba(255,255,255,0.1); padding: 3px 8px; border-radius: 4px; font-weight: 700; color: #e2e8f0;">Cash on Delivery</span>
          </div>

          <div style="color: var(--color-gray-500); font-size: 11px;">
            &copy; 2026 Nexora.com. All Rights Reserved. WCAG 2.1 AA Compliant.
          </div>
        </div>
      </div>
    </footer>
  `;
}
