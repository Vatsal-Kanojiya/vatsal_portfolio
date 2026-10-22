import { test, expect } from '@playwright/test';

test('Copy email copies the address and confirms it', async ({ browser }) => {
  const ctx = await browser.newContext({ permissions: ['clipboard-read', 'clipboard-write'] });
  const page = await ctx.newPage();
  await page.goto('/');
  await page.click('#copy-email');
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe('vatsalkanojiya@gmail.com');
  await expect(page.locator('#copy-email [data-label]')).toHaveText('Copied ✓');
  await expect(page.locator('#copy-status')).toHaveText('Email address copied');
});

test('Copy email shows the address when the clipboard is unavailable', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => { navigator.clipboard.writeText = () => Promise.reject(new Error('denied')); });
  await page.click('#copy-email');
  await expect(page.locator('#copy-email [data-label]')).toHaveText('vatsalkanojiya@gmail.com');
});

test('the nav marks the section being read', async ({ page }) => {
  await page.goto('/');
  for (const id of ['projects', 'work', 'skills', 'contact']) {
    await page.evaluate((id) => {
      const el = document.getElementById(id)!;
      scrollTo({ top: el.offsetTop + Math.min(300, el.offsetHeight / 3) - innerHeight * 0.45, behavior: 'instant' });
    }, id);
    await expect(page.locator('nav a[aria-current="true"]')).toHaveAttribute('data-section', id);
  }
});

test('404 shows the missed request as plain text', async ({ page }) => {
  const res = await page.goto('/no/such/page?x=<b>hi</b>');
  expect(res?.status()).toBe(404);
  await expect(page.locator('#req-path')).toHaveText('/no/such/page?x=<b>hi</b>');
  await expect(page.locator('#req-path b')).toHaveCount(0);
});

test('mobile browser chrome follows the view and theme', async ({ page }) => {
  await page.goto('/');
  const seen = new Set<string>();
  for (const view of ['editorial', 'paper', 'terminal', 'display']) {
    await page.click('#view-btn');
    await page.click(`[data-set-view=${view}]`);
    await page.waitForTimeout(800);
    for (let i = 0; i < 2; i++) {
      seen.add(await page.locator('meta[name="theme-color"]').getAttribute('content') ?? '');
      await page.click('#theme-toggle');
    }
  }
  expect(seen.size).toBe(8);
});

test('the journey line fills with scroll', async ({ page }) => {
  await page.goto('/');
  const fillAt = (fraction: number) => page.evaluate(async (f) => {
    const track = document.querySelector('.journey-track')!, r = track.getBoundingClientRect(), vh = innerHeight;
    scrollBy({ top: r.top - (0.7 * vh - f * (0.1 * vh + r.height)), behavior: 'instant' });
    await new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(res)));
    const m = getComputedStyle(document.querySelector('.journey-fill')!).transform;
    return m === 'none' ? 1 : Number(m.split(',')[3]);
  }, fraction);
  expect(await fillAt(0)).toBeCloseTo(0, 1);
  expect(await fillAt(0.5)).toBeCloseTo(0.5, 1);
  expect(await fillAt(1.2)).toBeCloseTo(1, 1);
});

test('"increase contrast" strengthens secondary text in every view', async ({ page }) => {
  await page.goto('/');
  const ratio = () => page.evaluate(() => {
    // Paint the colour to read it back as sRGB, whatever notation the browser uses (rgb, oklab, …)
    const ctx = document.createElement('canvas').getContext('2d', { willReadFrequently: true })!;
    const rgb = (c: string) => { ctx.clearRect(0, 0, 1, 1); ctx.fillStyle = c; ctx.fillRect(0, 0, 1, 1); return [...ctx.getImageData(0, 0, 1, 1).data].slice(0, 3); };
    const lum = (c: string) => { const [r, g, b] = rgb(c).map((v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }); return 0.2126 * r + 0.7152 * g + 0.0722 * b; };
    const probe = document.createElement('span'); probe.className = 'text-muted bg-bg'; document.body.append(probe);
    const s = getComputedStyle(probe), a = lum(s.color), b = lum(s.backgroundColor); probe.remove();
    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  });
  for (const view of ['editorial', 'paper', 'terminal', 'display']) {
    await page.evaluate((v) => { document.documentElement.dataset.view = v; }, view);
    await page.emulateMedia({ contrast: 'no-preference' });
    const normal = await ratio();
    await page.emulateMedia({ contrast: 'more' });
    const more = await ratio();
    expect.soft(more, view).toBeGreaterThan(normal);
    expect.soft(more, view).toBeGreaterThanOrEqual(7);
  }
});

test('print: content is visible and decorations are hidden', async ({ page }) => {
  await page.goto('/');
  await page.emulateMedia({ media: 'print' });
  await expect(page.locator('header nav')).toBeHidden();
  // Sections below the fold haven't been revealed by scrolling, but must still print
  const opacity = await page.locator('#contact h2').evaluate((el) => getComputedStyle(el).opacity);
  expect(opacity).toBe('1');
});
