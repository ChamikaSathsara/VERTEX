const fs = require('fs');
const path = require('path');

const root = __dirname;
const outDir = path.join(root, 'dist');
const siteEntries = [
  'index.html',
  'app.js',
  'style.css',
  'sw.js',
  'manifest.json',
  'icon-192.png',
  'icon-512.png',
  'local-invoice'
];

fs.rmSync(outDir, { recursive: true, force: true });
fs.mkdirSync(outDir);
siteEntries.forEach((entry) => {
  fs.cpSync(path.join(root, entry), path.join(outDir, entry), { recursive: true });
});
console.log('Built static site into dist/');
