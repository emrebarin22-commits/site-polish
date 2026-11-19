#!/usr/bin/env node
// Usage: node scripts/capture.js <url> <outDir>
// Saves the rendered HTML plus full-page desktop and mobile screenshots.
const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

(async () => {
  const [url, outDir] = process.argv.slice(2);
  if (!url || !outDir) {
    console.error('Usage: node scripts/capture.js <url> <outDir>');
    process.exit(1);
  }
  fs.mkdirSync(outDir, { recursive: true });
  const browser = await chromium.launch();

  const shots = [
    ['desktop', { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 }],
    ['mobile', { ...devices['iPhone 13'] }],
  ];
  for (const [name, opts] of shots) {
    const ctx = await browser.newContext(opts);
    const page = await ctx.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(1500);
    await page.screenshot({ path: path.join(outDir, `${name}.png`), fullPage: true });
    if (name === 'desktop') fs.writeFileSync(path.join(outDir, 'page.html'), await page.content());
    await ctx.close();
  }
  await browser.close();
  console.log(`Captured ${url} -> ${outDir}`);
})();
