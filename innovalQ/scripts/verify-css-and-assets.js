import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

console.log('🔍 Running Comprehensive CSS & Asset Connectivity Verification...\n');

const testSuites = [
  {
    name: 'Root Workspace Pages (Direct Browser / Live Server / file://)',
    files: [
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
    ],
    baseDir: rootDir
  },
  {
    name: 'Dist Production Pages (Compiled Release)',
    files: [
      'dist/index.html',
      'dist/home-saas.html',
      'dist/about.html',
      'dist/services.html',
      'dist/service-details.html',
      'dist/blog.html',
      'dist/blog-details.html',
      'dist/contact.html',
      'dist/pricing.html',
      'dist/login.html',
      'dist/register.html',
      'dist/forgot-password.html',
      'dist/404.html',
      'dist/coming-soon.html',
      'dist/maintenance.html',
      'dist/privacy.html',
      'dist/admin/dashboard.html',
      'dist/admin/users.html',
      'dist/admin/orders.html',
      'dist/admin/messages.html',
      'dist/admin/analytics.html',
      'dist/admin/settings.html',
      'dist/docs/index.html',
      'dist/docs/components.html'
    ],
    baseDir: rootDir
  }
];

let totalChecks = 0;
let passedChecks = 0;
let failedChecks = 0;

for (const suite of testSuites) {
  console.log(`\n========================================`);
  console.log(`📋 ${suite.name}`);
  console.log(`========================================`);

  for (const relFile of suite.files) {
    totalChecks++;
    const absHtmlPath = path.resolve(suite.baseDir, relFile);

    if (!fs.existsSync(absHtmlPath)) {
      console.error(`❌ [MISSING FILE] ${relFile} does not exist`);
      failedChecks++;
      continue;
    }

    const htmlContent = fs.readFileSync(absHtmlPath, 'utf-8');

    // 1. Check for unresolved include comments or template brackets
    const hasUnresolved = /<!--\s*@include/i.test(htmlContent) || /\{\{root\}\}/i.test(htmlContent);
    if (hasUnresolved) {
      console.error(`❌ [TEMPLATE ERROR] ${relFile} has unparsed template tags/comments`);
      failedChecks++;
      continue;
    }

    // 2. Find stylesheet link tags
    const linkMatches = [...htmlContent.matchAll(/<link\s+[^>]*rel=["']stylesheet["'][^>]*>/gi)];
    if (linkMatches.length === 0) {
      console.error(`❌ [NO STYLESHEET] ${relFile} has no <link rel="stylesheet">`);
      failedChecks++;
      continue;
    }

    let cssFoundAndValid = false;
    let cssDetails = [];

    for (const linkTag of linkMatches) {
      const hrefMatch = linkTag[0].match(/href=["']([^"']+)["']/i);
      if (!hrefMatch) continue;
      const href = hrefMatch[1];

      // Google fonts or CDN
      if (href.startsWith('http://') || href.startsWith('https://')) {
        cssDetails.push(`External CDN font/css: ${href}`);
        continue;
      }

      // Local CSS file resolution
      const htmlDir = path.dirname(absHtmlPath);
      let targetCssPath;
      if (href.startsWith('/')) {
        // Absolute from root
        targetCssPath = path.resolve(rootDir, '.' + href);
      } else {
        // Relative to HTML file
        targetCssPath = path.resolve(htmlDir, href);
      }

      if (!fs.existsSync(targetCssPath)) {
        cssDetails.push(`❌ BROKEN: ${href} (not found at ${targetCssPath})`);
      } else {
        const stats = fs.statSync(targetCssPath);
        const cssContent = fs.readFileSync(targetCssPath, 'utf-8');
        const hasTailwind = cssContent.includes('--tw-') || cssContent.includes('flex') || cssContent.includes('grid');
        cssDetails.push(`✓ ${href} (${(stats.size / 1024).toFixed(1)} KB, Tailwind: ${hasTailwind ? 'Yes' : 'No'})`);
        if (hasTailwind && stats.size > 1000) {
          cssFoundAndValid = true;
        }
      }
    }

    if (cssFoundAndValid) {
      passedChecks++;
      console.log(`✅ [CSS CONNECTED] ${relFile} -> ${cssDetails.join(' | ')}`);
    } else {
      failedChecks++;
      console.error(`❌ [CSS FAILED] ${relFile} -> ${cssDetails.join(' | ')}`);
    }
  }
}

console.log('\n========================================');
console.log(`📊 SUMMARY: ${passedChecks}/${totalChecks} pages verified.`);
if (failedChecks === 0) {
  console.log('🎉 100% SUCCESS: Every single page has verified CSS connectivity!');
} else {
  console.log(`⚠️ ${failedChecks} pages failed verification.`);
  process.exit(1);
}
