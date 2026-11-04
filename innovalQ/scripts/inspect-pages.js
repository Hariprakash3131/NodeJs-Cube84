import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

async function main() {
  if (!fs.existsSync('reports')) fs.mkdirSync('reports', { recursive: true });
  const browser = await chromium.launch();
  const root = path.resolve('.');
  
  // Test 1: index.html at 1440px
  const pageIndex = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const indexUrl = 'file:///' + path.join(root, 'index.html').replace(/\\/g, '/');
  await pageIndex.goto(indexUrl, { waitUntil: 'load' });
  await pageIndex.waitForTimeout(1000);
  await pageIndex.screenshot({ path: 'reports/index-inspection-1440.png' });
  console.log('Saved reports/index-inspection-1440.png');

  // Test 2: services.html at 1440px
  const pageServices = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const servicesUrl = 'file:///' + path.join(root, 'services.html').replace(/\\/g, '/');
  await pageServices.goto(servicesUrl, { waitUntil: 'load' });
  await pageServices.waitForTimeout(800);
  await pageServices.screenshot({ path: 'reports/services-inspection.png' });
  console.log('Saved reports/services-inspection.png');

  await browser.close();
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
