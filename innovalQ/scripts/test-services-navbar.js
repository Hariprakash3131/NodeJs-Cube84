import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

console.log('🧪 Testing Services.html navbar and components in local HTTP server...\n');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml'
};

const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/') reqPath = '/index.html';
  const filePath = path.join(process.cwd(), reqPath);
  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'text/plain' });
    res.end(fs.readFileSync(filePath));
  } else {
    console.log('404 requested:', req.url);
    res.writeHead(404);
    res.end('Not found: ' + req.url);
  }
});

server.listen(5599, async () => {
  try {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    const errors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    page.on('pageerror', err => errors.push('PAGEERROR: ' + err.message));

    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('http://127.0.0.1:5599/services.html', { waitUntil: 'networkidle' });

    console.log('Console Errors caught:', errors.length > 0 ? errors : 'None! (0 errors)');

    // 1. Verify Alpine
    const hasAlpine = await page.evaluate(() => typeof window.Alpine !== 'undefined');
    console.log('✓ Alpine.js Loaded & Active:', hasAlpine);

    // 2. Check initial dropdown visibility (should be 0 visible!)
    const visibleDropdownsCount = await page.evaluate(() => {
      const dropdowns = Array.from(document.querySelectorAll('header nav div[x-show="open"]'));
      return dropdowns.filter(el => {
        const style = window.getComputedStyle(el);
        return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
      }).length;
    });
    console.log('✓ Initial Visible Dropdowns (should be 0):', visibleDropdownsCount);

    // 3. Test opening "Services" dropdown on hover/click
    const servicesButton = page.locator('header nav button:has-text("Services")');
    await servicesButton.hover();
    await page.waitForTimeout(300);

    const isServicesDropdownOpen = await page.evaluate(() => {
      const el = document.querySelector('header nav div:nth-child(2) div[x-show="open"]');
      if (!el) return false;
      const style = window.getComputedStyle(el);
      return style.display !== 'none';
    });
    console.log('✓ Services Dropdown Opens on Hover:', isServicesDropdownOpen);

    // 4. Test closing dropdown on mouseout
    await page.mouse.move(10, 10);
    await page.waitForTimeout(300);
    const isClosedAfterMove = await page.evaluate(() => {
      const el = document.querySelector('header nav div:nth-child(2) div[x-show="open"]');
      if (!el) return true;
      const style = window.getComputedStyle(el);
      return style.display === 'none';
    });
    console.log('✓ Services Dropdown Closes on Mouse Leave:', isClosedAfterMove);

    // 5. Test Services Catalog rendering
    const serviceCardsCount = await page.evaluate(() => {
      return document.querySelectorAll('.glass-card').length;
    });
    console.log('✓ Services Cards Rendered in Catalog:', serviceCardsCount, '(Expected: 6)');

    // 6. Test Zero Results State is hidden
    const isZeroResultsHidden = await page.evaluate(() => {
      const zeroEl = document.querySelector('[x-show="filteredServices().length === 0"]');
      if (!zeroEl) return true;
      return window.getComputedStyle(zeroEl).display === 'none';
    });
    console.log('✓ "No services match" Message is Hidden initially:', isZeroResultsHidden);

    // Take screenshot of clean navbar on services.html
    const screenshotPath = path.resolve('reports/services-navbar-fixed.png');
    await page.screenshot({ path: screenshotPath });
    console.log('📸 Saved verification screenshot to:', screenshotPath);

    await browser.close();
  } catch (err) {
    console.error('Test execution error:', err);
  } finally {
    server.close();
  }
});
