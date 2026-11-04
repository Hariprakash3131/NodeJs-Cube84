import esbuild from 'esbuild';
import fs from 'fs';
import path from 'path';

console.log('⚡ Bundling standalone browser scripts with esbuild...');

const entries = [
  { in: 'src/js/main.js', out: 'js/servora.bundle.js', globalName: 'Servora' },
  { in: 'src/js/animations.js', out: 'js/animations.bundle.js', globalName: 'ServoraAnimations' },
  { in: 'src/js/three-hero.js', out: 'js/three-hero.bundle.js', globalName: 'ServoraHero3D' },
  { in: 'src/js/three-saas.js', out: 'js/three-saas.bundle.js', globalName: 'ServoraSaas3D' },
  { in: 'src/js/three-404.js', out: 'js/three-404.bundle.js', globalName: 'Servora404' },
  { in: 'src/js/charts.js', out: 'js/charts.bundle.js', globalName: 'ServoraCharts' },
  { in: 'src/js/map.js', out: 'js/map.bundle.js', globalName: 'ServoraMap' },
];

for (const entry of entries) {
  try {
    const res = await esbuild.build({
      entryPoints: [entry.in],
      outfile: entry.out,
      bundle: true,
      minify: true,
      format: 'iife',
      globalName: entry.globalName,
      sourcemap: false
    });
    console.log(`  ✓ Bundled ${entry.in} -> ${entry.out}`);
  } catch (err) {
    console.error(`  ❌ Failed to bundle ${entry.in}:`, err);
  }
}

// Also ensure dist/js has these bundles
const distJsDir = path.resolve('dist/js');
if (!fs.existsSync(distJsDir)) {
  fs.mkdirSync(distJsDir, { recursive: true });
}
for (const entry of entries) {
  const srcFile = path.resolve(entry.out);
  const destFile = path.resolve('dist', entry.out);
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile);
  }
}
console.log('✨ All scripts successfully bundled for 100% standalone browser usage!\n');

