import { chromium } from 'playwright';
import http from 'http';
import fs from 'fs';
import path from 'path';

console.log('🧪 Running Universal Navbar & JS Audit across all 24 pages in local HTTP server...\n');

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
    res.writeHead(404);
    res.end('Not found: ' + req.url);
  }
});

const pages = [
  'index.html',
  'home-saas.html',
  'about.html',
  'services.html',
  'service-details.html',
  'blog.html',
  'blog-details.html',
  'contact.html',
  'pricing.html',
  'login.html',
  'register.html',
  'forgot-password.html',
  '404.html',
  'coming-soon.html',
  'maintenance.html',
  'privacy.html',
  'admin/dashboard.html',
  'admin/users.html',
  'admin/orders.html',
  'admin/messages.html',
  'admin/analytics.html',
  'admin/settings.html',
  'docs/index.html',
  'docs/components.html'
];

server.listen(5598, async () => {
  let failedPages = 0;
  try {
    const browser = await chromium.launch();

    for (const pageUrl of pages) {
      const page = await browser.newPage();
      const pageErrors = [];

      page.on('console', msg => {
        if (msg.type() === 'error') pageErrors.push(msg.text());
      });
      page.on('pageerror', err => pageErrors.push(err.message));

      await page.setViewportSize({ width: 1280, height: 800 });
      await page.goto(`http://127.0.0.1:5598/${pageUrl}`, { waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(100);

      const navStatus = await page.evaluate(() => {
        const hasAlpine = typeof window.Alpine !== 'undefined';
        const dropdowns = Array.from(document.querySelectorAll('header nav div[x-show="open"]'));
        const visibleDropdowns = dropdowns.filter(el => {
          const style = window.getComputedStyle(el);
          return style.display !== 'none' && style.visibility !== 'hidden' && style.opacity !== '0';
        }).length;

        return { hasAlpine, visibleDropdowns };
      });

      if (navStatus.visibleDropdowns > 0 || pageErrors.length > 0) {
        console.error(`❌ [FAIL] ${pageUrl}: visible dropdowns = ${navStatus.visibleDropdowns}, errors = ${pageErrors.join(', ')}`);
        failedPages++;
      } else {
        console.log(`✅ [PASS] ${pageUrl}: Alpine=${navStatus.hasAlpine}, DropdownsHidden=0, Errors=0`);
      }

      await page.close();
    }

    await browser.close();

    console.log('\n========================================');
    if (failedPages === 0) {
      console.log('🎉 100% SUCCESS: All 24 pages have clean navbars, 0 overlapping dropdowns, and 0 console errors!');
    } else {
      console.error(`⚠️ ${failedPages} pages failed navbar check!`);
      process.exit(1);
    }
    console.log('========================================\n');

  } catch (err) {
    console.error('Fatal audit error:', err);
  } finally {
    server.close();
  }
});

