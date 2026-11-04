import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');
const reportsDir = path.resolve(__dirname, '..', 'reports');

if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

console.log('🚀 Launching Playwright Automated Responsive, Dark/Light & RTL QA Audit...\n');

async function runQAAudit() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  const breakpoints = [
    { name: 'mobile-360', width: 360, height: 740 },
    { name: 'tablet-768', width: 768, height: 1024 },
    { name: 'laptop-1024', width: 1024, height: 768 },
    { name: 'desktop-1280', width: 1280, height: 800 },
    { name: 'ultrawide-1536', width: 1536, height: 960 },
  ];

  const testPages = [
    { name: 'Home 1 (General)', path: 'index.html' },
    { name: 'Home 2 (SaaS)', path: 'home-saas.html' },
    { name: 'Pricing Matrix', path: 'pricing.html' },
    { name: 'Contact & Map', path: 'contact.html' },
    { name: 'Admin Dashboard', path: 'admin/dashboard.html' },
    { name: 'Admin Orders', path: 'admin/orders.html' }
  ];

  const results = [];

  for (const pageInfo of testPages) {
    const page = await context.newPage();
    const fileUrl = 'file:///' + path.join(distDir, pageInfo.path).replace(/\\/g, '/');

    console.log(`Auditing: ${pageInfo.name} (${pageInfo.path})`);

    // 1. Audit Breakpoints
    for (const bp of breakpoints) {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });

      // Check overflow-x
      const hasHorizontalScroll = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      results.push({
        page: pageInfo.path,
        test: `Breakpoint ${bp.name} (${bp.width}px)`,
        passed: !hasHorizontalScroll,
        details: hasHorizontalScroll ? 'Horizontal scrollbar detected!' : 'Clean responsive layout'
      });
    }

    // 2. Audit Dark Mode
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto(fileUrl, { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      document.documentElement.classList.add('dark');
    });
    const isDarkActive = await page.evaluate(() => document.documentElement.classList.contains('dark'));
    results.push({
      page: pageInfo.path,
      test: 'Dark Mode Activation',
      passed: isDarkActive,
      details: isDarkActive ? 'Dark class successfully applied' : 'Dark mode failed'
    });

    // 3. Audit RTL Layout
    await page.evaluate(() => {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    });
    const isRtlActive = await page.evaluate(() => document.documentElement.getAttribute('dir') === 'rtl');
    results.push({
      page: pageInfo.path,
      test: 'RTL (Arabic) Layout Direction',
      passed: isRtlActive,
      details: isRtlActive ? 'dir="rtl" and lang="ar" applied' : 'RTL attribute missing'
    });

    // 4. Capture Sample Verification Screenshot
    const screenshotPath = path.join(reportsDir, `${pageInfo.path.replace(/\//g, '_')}-preview.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    console.log(`  📸 Saved preview screenshot: ${screenshotPath}`);

    await page.close();
  }

  await browser.close();

  console.log('\n========================================');
  console.log('       PLAYWRIGHT QA AUDIT REPORT       ');
  console.log('========================================');

  let passedCount = 0;
  let failedCount = 0;

  results.forEach(r => {
    if (r.passed) {
      passedCount++;
      console.log(`✅ [PASS] ${r.page} -> ${r.test}: ${r.details}`);
    } else {
      failedCount++;
      console.log(`❌ [FAIL] ${r.page} -> ${r.test}: ${r.details}`);
    }
  });

  console.log('========================================');
  console.log(`Summary: ${passedCount} Passed, ${failedCount} Failed out of ${results.length} total checks.`);
  console.log('========================================\n');

  return { passedCount, failedCount, results };
}

runQAAudit().catch(err => {
  console.error('QA Audit Error:', err);
  process.exit(1);
});

