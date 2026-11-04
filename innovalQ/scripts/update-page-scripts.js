import fs from 'fs';
import path from 'path';

function walk(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir)) {
    const p = path.join(dir, item);
    if (fs.statSync(p).isDirectory()) {
      files = files.concat(walk(p));
    } else if (p.endsWith('.html')) {
      files.push(p);
    }
  }
  return files;
}

const allPages = walk('src/pages');
for (const p of allPages) {
  let content = fs.readFileSync(p, 'utf8');
  if (content.includes("import '/src/js/main.js';")) {
    const oldBlock1 = /<script\s+type=["']module["']>\s*import\s+['"\/]+src\/js\/main\.js['"];?\s*<\/script>/gi;
    const oldBlock2 = /<script\s+type=["']module["']>\s*import\s+['"\/]+src\/js\/main\.js['"];?\s*import\s+\{\s*initAnimations\s*\}\s*from\s+['"\/]+src\/js\/animations\.js['"];?\s*document\.addEventListener\(['"]DOMContentLoaded['"],\s*\(\)\s*=>\s*\{\s*initAnimations\(\);\s*\}\);\s*<\/script>/gi;

    const replacement = `  <script defer src="{{root}}js/animations.bundle.js"></script>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      if (window.initAnimations) window.initAnimations();
    });
  </script>`;

    content = content.replace(oldBlock2, replacement);
    content = content.replace(oldBlock1, replacement);

    fs.writeFileSync(p, content, 'utf8');
    console.log('✓ Updated script tags in:', p);
  }
}

