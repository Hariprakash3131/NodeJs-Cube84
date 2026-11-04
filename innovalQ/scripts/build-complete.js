import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const partialsDir = path.join(srcDir, 'partials');
const distDir = path.join(rootDir, 'dist');
const srcPagesDir = path.join(srcDir, 'pages');

console.log('🚀 Running Servora Universal HTML & CSS Compiler...\n');

// 1. Ensure src/pages exists
if (!fs.existsSync(srcPagesDir)) {
  fs.mkdirSync(srcPagesDir, { recursive: true });
}
if (!fs.existsSync(path.join(srcPagesDir, 'admin'))) {
  fs.mkdirSync(path.join(srcPagesDir, 'admin'), { recursive: true });
}
if (!fs.existsSync(path.join(srcPagesDir, 'docs'))) {
  fs.mkdirSync(path.join(srcPagesDir, 'docs'), { recursive: true });
}

// 2. Partials resolution function
function resolvePartials(content, rootPrefix = '') {
  const includeRegex = /<!--\s*@include\s+([^\s]+)(.*?)\s*-->|<include\s+src="([^"]+)"([^>]*)(?:\/>|><\/include>)/g;
  
  return content.replace(includeRegex, (match, p1, attrs1, p2, attrs2) => {
    const rawPath = p1 || p2;
    const rawAttrs = attrs1 || attrs2 || '';
    const partialPath = path.resolve(srcDir, rawPath.trim());

    if (!fs.existsSync(partialPath)) {
      console.warn(`[Warning] Partial not found: ${partialPath}`);
      return `<!-- Missing: ${rawPath} -->`;
    }

    let partialContent = fs.readFileSync(partialPath, 'utf-8');

    // Parse attributes
    const attrRegex = /([a-zA-Z0-9_-]+)="([^"]*)"/g;
    let attrMatch;
    const vars = { root: rootPrefix };
    while ((attrMatch = attrRegex.exec(rawAttrs)) !== null) {
      vars[attrMatch[1]] = attrMatch[2];
    }

    partialContent = partialContent.replace(/{{\s*([a-zA-Z0-9_-]+)\s*}}/g, (_, key) => {
      return vars[key] !== undefined ? vars[key] : '';
    });

    return resolvePartials(partialContent, rootPrefix);
  });
}

// List of all page files to process
const pages = [
  { file: 'index.html', dir: '.', rootPrefix: '' },
  { file: 'home-saas.html', dir: '.', rootPrefix: '' },
  { file: 'about.html', dir: '.', rootPrefix: '' },
  { file: 'services.html', dir: '.', rootPrefix: '' },
  { file: 'service-details.html', dir: '.', rootPrefix: '' },
  { file: 'blog.html', dir: '.', rootPrefix: '' },
  { file: 'blog-details.html', dir: '.', rootPrefix: '' },
  { file: 'contact.html', dir: '.', rootPrefix: '' },
  { file: 'pricing.html', dir: '.', rootPrefix: '' },
  { file: 'login.html', dir: '.', rootPrefix: '' },
  { file: 'register.html', dir: '.', rootPrefix: '' },
  { file: 'forgot-password.html', dir: '.', rootPrefix: '' },
  { file: '404.html', dir: '.', rootPrefix: '' },
  { file: 'coming-soon.html', dir: '.', rootPrefix: '' },
  { file: 'maintenance.html', dir: '.', rootPrefix: '' },
  { file: 'privacy.html', dir: '.', rootPrefix: '' },
  { file: 'dashboard.html', dir: 'admin', rootPrefix: '../' },
  { file: 'users.html', dir: 'admin', rootPrefix: '../' },
  { file: 'orders.html', dir: 'admin', rootPrefix: '../' },
  { file: 'messages.html', dir: 'admin', rootPrefix: '../' },
  { file: 'analytics.html', dir: 'admin', rootPrefix: '../' },
  { file: 'settings.html', dir: 'admin', rootPrefix: '../' },
  { file: 'index.html', dir: 'docs', rootPrefix: '../' },
  { file: 'components.html', dir: 'docs', rootPrefix: '../' }
];

let compiledCount = 0;

pages.forEach(p => {
  const srcFilePath = path.join(rootDir, p.dir, p.file);
  const templatePath = path.join(srcPagesDir, p.dir, p.file);

  if (fs.existsSync(templatePath)) {
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    let compiledContent = resolvePartials(templateContent, p.rootPrefix);
    compiledContent = compiledContent.replace(/{{\s*root\s*}}/g, p.rootPrefix);

    // Write to root workspace location
    fs.writeFileSync(srcFilePath, compiledContent, 'utf-8');

    // Write to dist location
    const distTargetDir = path.join(distDir, p.dir);
    if (!fs.existsSync(distTargetDir)) {
      fs.mkdirSync(distTargetDir, { recursive: true });
    }
    fs.writeFileSync(path.join(distTargetDir, p.file), compiledContent, 'utf-8');

    console.log(`  ✓ Compiled: ${p.dir}/${p.file} (CSS: ${p.rootPrefix}css/servora.min.css, JS: ${p.rootPrefix}js/servora.bundle.js)`);
    compiledCount++;
  }
});

// Ensure dist/css has servora.min.css
const distCssDir = path.join(distDir, 'css');
if (!fs.existsSync(distCssDir)) {
  fs.mkdirSync(distCssDir, { recursive: true });
}
if (fs.existsSync(path.join(rootDir, 'css', 'servora.min.css'))) {
  fs.copyFileSync(path.join(rootDir, 'css', 'servora.min.css'), path.join(distCssDir, 'servora.min.css'));
}

// Ensure dist/js has all bundle files
const distJsDir = path.join(distDir, 'js');
if (!fs.existsSync(distJsDir)) {
  fs.mkdirSync(distJsDir, { recursive: true });
}
const jsFiles = fs.readdirSync(path.join(rootDir, 'js')).filter(f => f.endsWith('.bundle.js'));
jsFiles.forEach(file => {
  fs.copyFileSync(path.join(rootDir, 'js', file), path.join(distJsDir, file));
});

console.log(`\n✨ Successfully compiled ${compiledCount} standalone HTML pages with full CSS & JS connectivity!\n`);

