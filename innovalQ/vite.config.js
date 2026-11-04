import { defineConfig } from 'vite';
import { resolve, relative } from 'path';
import fs from 'fs';

function htmlPartialsPlugin() {
  return {
    name: 'html-partials-plugin',
    transformIndexHtml: {
      order: 'pre',
      handler(html, ctx) {
        const includeRegex = /<!--\s*@include\s+([^\s]+)(.*?)\s*-->|<include\s+src="([^"]+)"([^>]*)(?:\/>|><\/include>)/g;
        
        function resolveIncludes(content, currentFile) {
          return content.replace(includeRegex, (match, p1, attrs1, p2, attrs2) => {
            const rawPath = p1 || p2;
            const rawAttrs = attrs1 || attrs2 || '';
            const partialPath = resolve(__dirname, 'src', rawPath.trim());
            
            if (!fs.existsSync(partialPath)) {
              console.warn(`[html-partials] Partial not found: ${partialPath}`);
              return `<!-- Missing partial: ${rawPath} -->`;
            }

            let partialContent = fs.readFileSync(partialPath, 'utf-8');

            const attrRegex = /([a-zA-Z0-9_-]+)="([^"]*)"/g;
            let attrMatch;
            const vars = {};
            while ((attrMatch = attrRegex.exec(rawAttrs)) !== null) {
              vars[attrMatch[1]] = attrMatch[2];
            }

            partialContent = partialContent.replace(/{{\s*([a-zA-Z0-9_-]+)\s*}}/g, (_, key) => {
              return vars[key] !== undefined ? vars[key] : '';
            });

            return resolveIncludes(partialContent, partialPath);
          });
        }

        return resolveIncludes(html, ctx.filename);
      }
    }
  };
}

function getExistingHtmlEntries() {
  const entries = {};
  const searchDirs = ['.', 'admin', 'docs'];

  searchDirs.forEach((dir) => {
    const fullDir = resolve(__dirname, dir);
    if (fs.existsSync(fullDir)) {
      const files = fs.readdirSync(fullDir);
      files.forEach((file) => {
        if (file.endsWith('.html')) {
          const filePath = resolve(fullDir, file);
          const relPath = relative(__dirname, filePath).replace(/\\/g, '/');
          const entryName = relPath.replace(/\.html$/, '').replace(/\//g, '_');
          entries[entryName] = filePath;
        }
      });
    }
  });

  return entries;
}

export default defineConfig({
  base: './',
  root: '.',
  plugins: [htmlPartialsPlugin()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: getExistingHtmlEntries()
    }
  },
  server: {
    port: 3000,
    open: false
  }
});
