import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

console.log('⚡ Compiling Tailwind CSS from src/css/main.css...');

try {
  const css = execSync('npx tailwindcss -i ./src/css/main.css --minify', {
    maxBuffer: 25 * 1024 * 1024,
    encoding: 'utf-8'
  });

  fs.writeFileSync('src/css/compiled.css', css, 'utf-8');
  console.log(`✓ Compiled CSS successfully! Size: ${css.length} bytes`);
} catch (err) {
  console.error('Error during Tailwind compilation:', err);
  process.exit(1);
}
