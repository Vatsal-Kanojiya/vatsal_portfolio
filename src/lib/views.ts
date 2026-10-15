// The switchable "views": same content, different atmosphere.
// Adding a view = an entry here + a token file in src/styles/views/ (imported from global.css).
import caveat from '@fontsource-variable/caveat/files/caveat-latin-wght-normal.woff2?url';
import vt323 from '@fontsource/vt323/files/vt323-latin-400-normal.woff2?url';
import dseg14 from 'dseg/fonts/DSEG14-Classic/DSEG14Classic-Regular.woff2?url';

export interface View {
  id: string;
  label: string;
  hint: string;
  /** Font the switcher uses to preview the view's name */
  previewFont?: string;
  /** Fonts to fetch before switching, so the view appears with its type already in place */
  fonts?: string[];
  /** Font files preloaded when a visitor lands in this view */
  preload?: string[];
  /** Typing this word anywhere on the page switches to the view (an easter egg) */
  secret?: string;
}

export const defaultView = 'editorial';

export const views: View[] = [
  { id: 'editorial', label: 'Editorial', hint: 'Clean and modern. The default.', previewFont: '"Fraunces Variable", Georgia, serif' },
  {
    id: 'paper',
    label: 'Paper',
    hint: 'A handwritten notebook.',
    previewFont: '"Caveat Variable", cursive',
    fonts: ['500 1em "Caveat Variable"', '700 1em "Caveat Variable"', '1em "Reenie Beanie"'],
    preload: [caveat],
  },
  {
    id: 'terminal',
    label: 'Terminal',
    hint: 'Phosphor green on black.',
    previewFont: '"VT323", monospace',
    fonts: ['1em "VT323"', '400 1em "JetBrains Mono Variable"'],
    preload: [vt323],
    secret: 'matrix',
  },
  {
    id: 'display',
    label: 'Display',
    hint: 'LCD by day, amber LED by night.',
    previewFont: '"DSEG14 Classic", monospace',
    fonts: ['400 1em "DSEG14 Classic"', '400 1em "DSEG7 Classic"'],
    preload: [dseg14],
  },
];
