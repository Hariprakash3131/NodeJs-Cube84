import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '..', 'dist');

console.log('🔍 Running Servora Automated HTML, SEO & Link Integrity Verification...\n');

function getAllFiles(dir, ext = '.html') {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllFiles(filePath, ext));
    } else if (file.endsWith(ext)) {
      results.push(filePath);
    }
  });
  return results;
}

const htmlFiles = getAllFiles(distDir);
console.log(`Found ${htmlFiles.length} production HTML files in dist/:\n`);

let totalErrors = 0;
let totalWarnings = 0;

htmlFiles.forEach(file => {
  const relPath = path.relative(distDir, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf-8');

  // 1. Check title
  const hasTitle = /<title>[^<]+<\/title>/i.test(content);
  // 2. Check meta description
  const hasMetaDesc = /<meta\s+name="description"\s+content="[^"]*"/i.test(content);
  // 3. Check viewport
  const hasViewport = /<meta\s+name="viewport"/i.test(content);
  // 4. Check main landmark
  const hasMain = /<main/i.test(content);
  // 5. Check missing alt attributes on images
  const imgMatches = content.match(/<img\s+[^>]*>/gi) || [];
  let missingAlt = 0;
  imgMatches.forEach(img => {
    if (!/alt="[^"]*"/i.test(img)) {
      missingAlt++;
    }
  });

  // 6. Check internal links
  const linkMatches = content.match(/href="([^"#:]+)"/gi) || [];
  let brokenLinks = [];
  linkMatches.forEach(linkStr => {
    const href = linkStr.replace(/^href="/i, '').replace(/"$/, '');
    if (href.startsWith('/') && href.endsWith('.html')) {
      const targetFile = path.join(distDir, href);
      if (!fs.existsSync(targetFile)) {
        brokenLinks.push(href);
      }
    }
  });

  let status = '✅ PASS';
  let issues = [];

  if (!hasTitle) issues.push('Missing <title>');
  if (!hasMetaDesc) issues.push('Missing meta description');
  if (!hasViewport) issues.push('Missing viewport');
  if (!hasMain) issues.push('Missing <main> landmark');
  if (missingAlt > 0) issues.push(`${missingAlt} images missing alt`);
  if (brokenLinks.length > 0) issues.push(`Broken internal links: ${brokenLinks.join(', ')}`);

  if (issues.length > 0) {
    status = '❌ FAIL';
    totalErrors += issues.length;
    console.log(`  ${status} [${relPath}]: ${issues.join('; ')}`);
  } else {
    console.log(`  ${status} [${relPath}] — SEO, semantics & links intact`);
  }
});

console.log('\n----------------------------------------');
if (totalErrors === 0) {
  console.log(`✨ All ${htmlFiles.length} pages passed verification with 0 errors!`);
} else {
  console.log(`⚠️ Completed with ${totalErrors} issue(s) detected.`);
}
console.log('----------------------------------------\n');

