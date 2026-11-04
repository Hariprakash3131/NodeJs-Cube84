import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const artifactDir = 'C:/Users/ASUS/.gemini/antigravity/brain/decf6518-44d2-4d6c-8f99-45a65c4c5b88';
const workspaceDir = path.resolve('.');

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  // 1. Index at 1440px (Hero section)
  {
    const page = await context.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = 'file:///' + path.join(workspaceDir, 'index.html').replace(/\\/g, '/');
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(artifactDir, 'hero-aligned-1440.png') });
    console.log('Captured hero-aligned-1440.png');
    await page.close();
  }

  // 2. Index at 1280px (Hero section)
  {
    const page = await context.newPage();
    await page.setViewportSize({ width: 1280, height: 850 });
    const url = 'file:///' + path.join(workspaceDir, 'index.html').replace(/\\/g, '/');
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(artifactDir, 'hero-aligned-1280.png') });
    console.log('Captured hero-aligned-1280.png');
    await page.close();
  }

  // 3. Services at 1440px
  {
    const page = await context.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = 'file:///' + path.join(workspaceDir, 'services.html').replace(/\\/g, '/');
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(artifactDir, 'services-aligned-1440.png') });
    console.log('Captured services-aligned-1440.png');
    await page.close();
  }

  // 4. SaaS Home at 1440px
  {
    const page = await context.newPage();
    await page.setViewportSize({ width: 1440, height: 900 });
    const url = 'file:///' + path.join(workspaceDir, 'home-saas.html').replace(/\\/g, '/');
    await page.goto(url, { waitUntil: 'load' });
    await page.waitForTimeout(800);
    await page.screenshot({ path: path.join(artifactDir, 'saas-aligned-1440.png') });
    console.log('Captured saas-aligned-1440.png');
    await page.close();
  }

  await browser.close();
  console.log('All screenshots captured successfully.');
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
