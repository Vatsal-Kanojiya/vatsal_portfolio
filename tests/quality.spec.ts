import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { VIEWS, THEMES, PAGES, pageIn } from './helpers';

// One test per view x theme, each covering every page, so a failure names exactly where it broke.
for (const view of VIEWS) for (const theme of THEMES) {
  test.describe(`${view} / ${theme}`, () => {
    test('no accessibility violations (axe, WCAG 2.2 AA)', async ({ browser }) => {
      const page = await pageIn(browser, view, theme, { reducedMotion: true });
      for (const path of PAGES) {
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        const { violations } = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa']).analyze();
        expect.soft(violations.map((v) => `${path} ${v.id}: ${v.nodes.map((n) => n.target.join(' ')).join(', ')}`)).toEqual([]);
      }
    });

    test('no horizontal scroll on a 390px phone', async ({ browser }) => {
      const page = await pageIn(browser, view, theme, { width: 390, reducedMotion: true });
      for (const path of PAGES) {
        await page.goto(path);
        await page.evaluate(() => document.fonts.ready);
        expect.soft(await page.evaluate(() => document.documentElement.scrollWidth), path).toBeLessThanOrEqual(390);
      }
    });

    test('nothing blocked by the Content-Security-Policy', async ({ browser }) => {
      const page = await pageIn(browser, view, theme);
      await page.addInitScript(() => {
        (window as any).__csp = [];
        document.addEventListener('securitypolicyviolation', (e) => (window as any).__csp.push(`${e.violatedDirective} ${e.blockedURI}`));
      });
      for (const path of PAGES) {
        await page.goto(path);
        await page.evaluate(() => scrollTo({ top: document.body.scrollHeight, behavior: 'instant' }));
        await page.waitForTimeout(300);
        expect.soft(await page.evaluate(() => (window as any).__csp), path).toEqual([]);
        expect.soft(await page.evaluate(() => [...document.fonts].filter((f) => f.status === 'error').map((f) => f.family)), `${path} fonts`).toEqual([]);
      }
    });
  });
}
