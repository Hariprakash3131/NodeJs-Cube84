import { chromium } from 'playwright';
import path from 'path';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('BROWSER:', msg.text()));
  page.on('pageerror', err => console.log('PAGEERROR:', err.message));
  
  const fileUrl = 'file:///' + path.resolve('services.html').replace(/\\/g, '/');
  await page.goto(fileUrl);
  
  await page.addScriptTag({ path: path.resolve('js/servora.bundle.js') });
  
  const alpineStatus = await page.evaluate(() => {
    const dropdowns = Array.from(document.querySelectorAll('[x-show="open"]'));
    return {
      hasAlpine: typeof window.Alpine !== 'undefined',
      serviceCount: document.querySelectorAll('.glass-card').length,
      visibleDropdowns: dropdowns.filter(el => window.getComputedStyle(el).display !== 'none').length
    };
  });
  
  console.log('Alpine test results:', alpineStatus);
  await browser.close();
})();

