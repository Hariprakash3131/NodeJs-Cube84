import { store } from '../store.js';
import { CATEGORIES, PRODUCTS, REVIEWS } from '../data.js';
import { renderProductCard } from '../components/ProductCard.js';

export function renderHomePage() {
  const flashDeals = PRODUCTS.filter(p => p.flashDeal);
  const bestSellers = PRODUCTS.filter(p => p.bestseller);
  const trending = PRODUCTS.slice(0, 4);
  const newArrivals = PRODUCTS.slice(4, 8);
  const recommended = PRODUCTS.slice(2, 6);

  return `
    <div class="home-page-view">
      <!-- 1. Hero Promotional Banner Carousel -->
      <section class="container" aria-label="Featured Promotions">
        <div class="hero-carousel">
          <div class="carousel-slides" id="hero-carousel-slides">
            <!-- Slide 1 -->
            <div class="carousel-slide">
              <div>
                <span class="slide-tag">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  Festive Tech Fest • Live Now
                </span>
                <h1 class="slide-title">Next-Gen Audio & Gadgets <span>Up to 70% Off</span></h1>
                <p class="slide-subtitle">Upgrade to industry-grade Active Noise Cancellation, high-res audio, and all-day comfort with instant bank cashbacks.</p>
                <div class="slide-cta-row">
                  <button class="btn-hero-cta" onclick="window.appRouter.navigate('category', { category: 'electronics' })">
                    Shop Audio Fest &rarr;
                  </button>
                  <span style="font-size: var(--text-xs); color: rgba(255,255,255,0.85); font-weight: 500;">
                    ✓ No Cost EMI from ₹299/mo
                  </span>
                </div>
              </div>
              <div class="slide-visual">
                <div style="background: rgba(255,255,255,0.1); backdrop-filter: blur(8px); padding: 24px; border-radius: var(--radius-2xl); border: 1px solid rgba(255,255,255,0.2); width: 280px; height: 280px; display: flex; align-items: center; justify-content: center;">
                  <svg viewBox="0 0 200 200" width="220" height="220" fill="none">
                    <path d="M 45 105 A 55 55 0 0 1 155 105" stroke="#fbbf24" stroke-width="16" stroke-linecap="round" />
                    <rect x="30" y="95" width="28" height="52" rx="14" fill="#ffffff" />
                    <rect x="142" y="95" width="28" height="52" rx="14" fill="#ffffff" />
                    <circle cx="44" cy="95" r="4" fill="#f59e0b" />
                    <circle cx="156" cy="95" r="4" fill="#f59e0b" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Carousel Indicators -->
          <div class="carousel-indicators">
            <span class="carousel-dot active"></span>
            <span class="carousel-dot"></span>
            <span class="carousel-dot"></span>
          </div>
        </div>
      </section>

      <!-- 2. Top Categories Roundels (Flipkart / Meesho Visual Style) -->
      <section class="container mb-8" aria-label="Browse by Category">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
          <h2 style="font-size: var(--text-lg); font-weight: 800; color: var(--color-gray-900);">Top Categories</h2>
          <button 
            onclick="window.appRouter.navigate('category', { category: 'all' })" 
            style="color: var(--color-blue-600); font-size: var(--text-xs); font-weight: 700;"
          >
            See All &rarr;
          </button>
        </div>

        <div class="categories-roundels-wrapper">
          ${CATEGORIES.map(cat => `
            <div class="category-roundel-card" onclick="window.appRouter.navigate('category', { category: '${cat.id}' })">
              <div class="category-roundel-icon">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--color-blue-600)" stroke-width="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                  <line x1="8" y1="21" x2="16" y2="21"></line>
                  <line x1="12" y1="17" x2="12" y2="21"></line>
                </svg>
              </div>
              <span class="category-roundel-name">${cat.name.split(' ')[0]}</span>
              <span class="category-roundel-discount">${cat.discount}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 3. Flash Deals Section with Live Countdown Timer -->
      <section class="container mb-8" aria-label="Flash Deals">
        <div class="flash-deals-header">
          <div class="flash-title-wrap">
            <span class="flash-badge">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
              FLASH DEALS
            </span>
            <span style="font-weight: 800; font-size: var(--text-base); color: #991b1b;">Steal Deals of the Day</span>
          </div>

          <div class="countdown-timer" id="flash-timer-display">
            <span style="font-size: var(--text-xs); font-weight: 700; color: #7f1d1d; margin-right: 4px;">ENDS IN</span>
            <span class="timer-box" id="timer-hours">03</span>
            <span class="timer-sep">:</span>
            <span class="timer-box" id="timer-minutes">42</span>
            <span class="timer-sep">:</span>
            <span class="timer-box" id="timer-seconds">18</span>
          </div>
        </div>

        <!-- 4-Card Responsive Grid -->
        <div class="grid-12">
          ${flashDeals.map(product => `
            <div style="grid-column: span 3;">
              ${renderProductCard(product)}
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 4. Featured Brand Stores Banner (Amazon Brand Stores Pattern) -->
      <section class="container mb-8" aria-label="Featured Brands">
        <div style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); border-radius: var(--radius-xl); padding: var(--space-6) var(--space-8); color: #ffffff; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: var(--space-4);">
          <div>
            <span style="background: var(--color-yellow-400); color: #0f172a; font-size: 10px; font-weight: 800; padding: 2px 8px; border-radius: 4px; text-transform: uppercase;">Official Brand Lounges</span>
            <h3 style="font-size: var(--text-2xl); font-weight: 800; margin-top: 6px;">Curated Official Flagship Stores</h3>
            <p style="color: var(--color-gray-400); font-size: var(--text-xs);">Direct brand warranty • 100% genuine sealed boxes • Priority service</p>
          </div>
          <div style="display: flex; gap: var(--space-3); flex-wrap: wrap;">
            <button class="btn-primary-login" onclick="window.appRouter.navigate('category', { category: 'electronics' })" style="background: #ffffff; color: #0f172a; font-weight: 700;">
              AuraWave Store &rarr;
            </button>
            <button class="btn-primary-login" onclick="window.appRouter.navigate('category', { category: 'mobiles' })" style="background: transparent; border: 1.5px solid rgba(255,255,255,0.4); color: #ffffff;">
              Veloce 5G Hub &rarr;
            </button>
          </div>
        </div>
      </section>

      <!-- 5. Trending Products Grid -->
      <section class="container mb-8" aria-label="Trending Products">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
          <div>
            <h2 style="font-size: var(--text-xl); font-weight: 800; color: var(--color-gray-900);">Trending Products</h2>
            <p style="font-size: var(--text-xs); color: var(--color-gray-500);">Most loved products across India this week</p>
          </div>
          <button 
            onclick="window.appRouter.navigate('category', { category: 'all' })" 
            style="color: var(--color-blue-600); font-size: var(--text-xs); font-weight: 700;"
          >
            Explore All Trending &rarr;
          </button>
        </div>

        <div class="grid-12">
          ${trending.map(product => `
            <div style="grid-column: span 3;">
              ${renderProductCard(product)}
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 6. Best Sellers -->
      <section class="container mb-8" aria-label="Best Sellers">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
          <div>
            <h2 style="font-size: var(--text-xl); font-weight: 800; color: var(--color-gray-900);">Best Sellers</h2>
            <p style="font-size: var(--text-xs); color: var(--color-gray-500);">Top rated by verified buyers</p>
          </div>
          <button 
            onclick="window.appRouter.navigate('category', { category: 'all' })" 
            style="color: var(--color-blue-600); font-size: var(--text-xs); font-weight: 700;"
          >
            View More &rarr;
          </button>
        </div>

        <div class="grid-12">
          ${bestSellers.map(product => `
            <div style="grid-column: span 3;">
              ${renderProductCard(product)}
            </div>
          `).join('')}
        </div>
      </section>

      <!-- 7. Recently Viewed & Recommended Dual Row -->
      <section class="container mb-8" aria-label="Recommended for you">
        <div class="grid-12">
          <div style="grid-column: span 12;">
            <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-xl); padding: var(--space-6); box-shadow: var(--shadow-xs);">
              <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-4);">
                <h3 style="font-size: var(--text-lg); font-weight: 800;">Recommended For You</h3>
                <span style="font-size: var(--text-xs); color: var(--color-blue-600); font-weight: 600;">Based on your recent browsing</span>
              </div>
              <div class="grid-12">
                ${recommended.map(product => `
                  <div style="grid-column: span 3;">
                    ${renderProductCard(product)}
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- 8. Verified Customer Testimonials Carousel -->
      <section class="container mb-12" aria-label="Customer Reviews">
        <div style="text-align: center; margin-bottom: var(--space-6);">
          <span style="background: #eff6ff; color: var(--color-blue-700); font-size: 11px; font-weight: 800; padding: 3px 10px; border-radius: var(--radius-full); text-transform: uppercase;">
            Real Experiences
          </span>
          <h2 style="font-size: var(--text-2xl); font-weight: 800; color: var(--color-gray-900); margin-top: 6px;">Loved by Over 5 Million Indian Shoppers</h2>
        </div>

        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: var(--space-6);">
          ${REVIEWS.map(rev => `
            <div style="background: var(--color-white); border: 1px solid var(--color-gray-200); border-radius: var(--radius-lg); padding: var(--space-5); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; justify-content: space-between;">
              <div>
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2);">
                  <div style="display: flex; gap: 2px;">
                    ${Array(rev.rating).fill(0).map(() => `
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                    `).join('')}
                  </div>
                  <span style="font-size: 11px; color: var(--color-gray-400);">${rev.date}</span>
                </div>
                <h4 style="font-size: var(--text-sm); font-weight: 700; color: var(--color-gray-900); margin-bottom: 4px;">"${rev.title}"</h4>
                <p style="font-size: var(--text-xs); color: var(--color-gray-600); line-height: 1.5; margin-bottom: var(--space-4);">${rev.comment}</p>
              </div>

              <div style="display: flex; align-items: center; gap: var(--space-3); border-top: 1px solid var(--color-gray-100); padding-top: var(--space-3);">
                <div style="width: 32px; height: 32px; border-radius: var(--radius-full); background: var(--color-blue-100); color: var(--color-blue-800); font-weight: 800; font-size: 12px; display: flex; align-items: center; justify-content: center;">
                  ${rev.author[0]}
                </div>
                <div>
                  <div style="font-size: var(--text-xs); font-weight: 700; color: var(--color-gray-900);">${rev.author}</div>
                  <div style="font-size: 10px; color: var(--color-success); font-weight: 600; display: flex; align-items: center; gap: 3px;">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    Verified Buyer • ${rev.city}
                  </div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    </div>
  `;
}
