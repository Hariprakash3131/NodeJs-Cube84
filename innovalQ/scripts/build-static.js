import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');
const srcDir = path.join(rootDir, 'src');
const distDir = path.join(rootDir, 'dist');

console.log('📦 Servora Standalone Static HTML Compiler Starting...\n');

// Partials resolution helper
function resolvePartials(htmlContent, currentFilePath) {
  const includeRegex = /<!--\s*@include\s+([^\s]+)(.*?)\s*-->|<include\s+src="([^"]+)"([^>]*)(?:\/>|><\/include>)/g;
  
  return htmlContent.replace(includeRegex, (match, p1, attrs1, p2, attrs2) => {
    const rawPath = p1 || p2;
    const rawAttrs = attrs1 || attrs2 || '';
    const partialPath = path.resolve(srcDir, rawPath.trim());

    if (!fs.existsSync(partialPath)) {
      console.warn(`[Static Compiler] Missing partial: ${rawPath}`);
      return `<!-- Missing partial: ${rawPath} -->`;
    }

    let partialContent = fs.readFileSync(partialPath, 'utf-8');

    // Parse attributes
    const attrRegex = /([a-zA-Z0-9_-]+)="([^"]*)"/g;
    let attrMatch;
    const vars = {};
    while ((attrMatch = attrRegex.exec(rawAttrs)) !== null) {
      vars[attrMatch[1]] = attrMatch[2];
    }

    partialContent = partialContent.replace(/{{\s*([a-zA-Z0-9_-]+)\s*}}/g, (_, key) => {
      return vars[key] !== undefined ? vars[key] : '';
    });

    return resolvePartials(partialContent, partialPath);
  });
}

function processHtmlFiles(dir, relativeTo = rootDir) {
  const entries = fs.readdirSync(dir);
  entries.forEach(entry => {
    const fullPath = path.join(dir, entry);
    const stat = fs.statSync(fullPath);

    if (entry === 'node_modules' || entry === 'dist' || entry === '.git' || entry === 'src') {
      return;
    }

    if (stat && stat.isDirectory()) {
      processHtmlFiles(fullPath, relativeTo);
    } else if (entry.endsWith('.html')) {
      const relPath = path.relative(relativeTo, fullPath);
      const outPath = path.join(distDir, relPath);
      const outSubDir = path.dirname(outPath);

      if (!fs.existsSync(outSubDir)) {
        fs.mkdirSync(outSubDir, { recursive: true });
      }

      const rawHtml = fs.readFileSync(fullPath, 'utf-8');
      const compiledHtml = resolvePartials(rawHtml, fullPath);
      fs.writeFileSync(outPath, compiledHtml, 'utf-8');
      console.log(`  ✓ Compiled: ${relPath} -> dist/${relPath}`);
    }
  });
}

processHtmlFiles(rootDir);
console.log('\n✨ Standalone static compilation complete!\n');

