import { test, expect } from '@playwright/test';
import { VIEWS, pageIn, currentView, canvasActivity } from './helpers';

test('Editorial is the default view', async ({ page }) => {
  await page.goto('/');
  expect(await currentView(page)).toBe('editorial');
});

test('the switcher changes the view, remembers it, and closes', async ({ page }) => {
  await page.goto('/');
  await page.click('#view-btn');
  await expect(page.locator('#view-menu')).toBeVisible();
  await expect(page.locator('[data-set-view=editorial]')).toHaveAttribute('aria-pressed', 'true');
  await page.keyboard.press('Escape');
  await expect(page.locator('#view-menu')).toBeHidden();
  await expect(page.locator('#view-btn')).toBeFocused();

  await page.click('#view-btn');
  await page.click('[data-set-view=paper]');
  await expect.poll(() => currentView(page)).toBe('paper');
  await expect(page.locator('#view-menu')).toBeHidden();
  expect(await page.evaluate(() => localStorage.getItem('view'))).toBe('paper');

  await page.goto('/projects/super-notes/');
  expect(await currentView(page)).toBe('paper');
});

test('?view= wins over the saved choice, is remembered, and follows later switches', async ({ page }) => {
  await page.goto('/?view=terminal');
  expect(await currentView(page)).toBe('terminal');
  await page.goto('/');
  expect(await currentView(page)).toBe('terminal');
  await page.goto('/?view=display');
  await page.click('#view-btn');
  await page.click('[data-set-view=editorial]');
  await expect.poll(() => page.url()).toContain('view=editorial');
});

test('an unknown ?view= is ignored', async ({ page }) => {
  await page.goto('/?view=bogus');
  expect(await currentView(page)).toBe('editorial');
});

test('works with storage blocked', async ({ browser }) => {
  const ctx = await browser.newContext();
  await ctx.addInitScript(() => Object.defineProperty(window, 'localStorage', { get() { throw new Error('blocked'); } }));
  const page = await ctx.newPage();
  const errors: string[] = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto('/?view=paper');
  expect(await currentView(page)).toBe('paper');
  await page.click('#view-btn');
  await page.click('[data-set-view=editorial]');
  await expect.poll(() => currentView(page)).toBe('editorial');
  expect(errors).toEqual([]);
});

test('typing "matrix" switches to Terminal; a partial word does nothing', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.type('matri');
  await page.waitForTimeout(300);
  expect(await currentView(page)).toBe('editorial');
  await page.keyboard.type('x');
  await expect.poll(() => currentView(page)).toBe('terminal');
});

test('each hero animation runs only in its own view', async ({ browser }) => {
  for (const view of VIEWS) {
    const page = await pageIn(browser, view, 'light');
    await page.goto('/');
    await page.waitForTimeout(2500); // the flow field starts once the page is idle
    const { rain, flow } = await canvasActivity(page);
    expect.soft(flow > 0, `${view}: flow field`).toBe(view === 'editorial');
    expect.soft(rain > 0, `${view}: code rain`).toBe(view === 'terminal');
    await page.context().close();
  }
});

test('the Display clock ticks in IST only while Display shows', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('#lcd-s')).toHaveText('--');
  await page.click('#view-btn');
  await page.click('[data-set-view=display]');
  await expect.poll(() => page.locator('#lcd-s').textContent()).toMatch(/^\d\d$/);
  const ist = await page.evaluate(() => new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Kolkata', hour: '2-digit', hourCycle: 'h23' }).format(new Date()));
  await expect(page.locator('#lcd-h')).toHaveText(ist);
});

test('reduced motion: no animation loops, cursor and colon hold still', async ({ browser }) => {
  for (const view of ['terminal', 'display'] as const) {
    const page = await pageIn(browser, view, 'dark', { reducedMotion: true });
    await page.goto('/');
    const { rain, flow } = await canvasActivity(page);
    expect(rain + flow).toBe(0);
    const selector = view === 'terminal' ? '.term-cursor' : '.lcd-colon';
    expect(await page.locator(selector).evaluate((el) => getComputedStyle(el).animationName)).toBe('none');
    await page.context().close();
  }
});
