// The switchable "views": same content, different atmosphere.
// Adding a view = an entry here + a token file in src/styles/views/ (imported from global.css).
import caveat from '@fontsource-variable/caveat/files/caveat-latin-wght-normal.woff2?url';

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
];
