import type { Browser, Page } from '@playwright/test';

export const VIEWS = ['editorial', 'paper', 'terminal', 'display'] as const;
export const THEMES = ['light', 'dark'] as const;
export const PAGES = ['/', '/projects/super-notes/', '/this-page-does-not-exist/'] as const;
export type View = (typeof VIEWS)[number];
export type Theme = (typeof THEMES)[number];

/** A fresh page that opens in the given view and theme (set before the site's own boot script runs). */
export async function pageIn(browser: Browser, view: View, theme: Theme, opts: { width?: number; reducedMotion?: boolean } = {}): Promise<Page> {
  const ctx = await browser.newContext({ viewport: { width: opts.width ?? 1280, height: 900 }, reducedMotion: opts.reducedMotion ? 'reduce' : 'no-preference' });
  await ctx.addInitScript(([v, t]) => { try { localStorage.setItem('view', v); localStorage.setItem('theme', t); } catch {} }, [view, theme]);
  return ctx.newPage();
}

export const currentView = (page: Page) => page.evaluate(() => document.documentElement.dataset.view);

/** Count canvas draw calls over a short window: which hero animation is actually running. */
export const canvasActivity = (page: Page, ms = 1200) =>
  page.evaluate((ms) => new Promise<{ rain: number; flow: number }>((resolve) => {
    const P: any = CanvasRenderingContext2D.prototype, fillText = P.fillText, stroke = P.stroke;
    let rain = 0, flow = 0;
    P.fillText = function (this: unknown, ...a: unknown[]) { rain++; return fillText.apply(this, a); };
    P.stroke = function (this: unknown, ...a: unknown[]) { flow++; return stroke.apply(this, a); };
    setTimeout(() => { P.fillText = fillText; P.stroke = stroke; resolve({ rain, flow }); }, ms);
  }), ms);
