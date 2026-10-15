import profile from '../data/profile.json';

/** Years since careerStart, to one decimal — stays current on every build. */
export function yearsOfExperience(now = new Date()): string {
  const start = new Date(profile.careerStart);
  const years = (now.getTime() - start.getTime()) / (365.25 * 24 * 3600 * 1000);
  return (Math.floor(years * 10) / 10).toFixed(1);
}

export const visible = <T extends { data: { hidden?: boolean } }>(e: T) => !e.data.hidden;

/** Segment-display "ghost" for the Display view: the same string fully lit, shown faintly behind the text.
 *  DSEG lights all segments with "~" (14-segment, letters and digits) or "8" (7-segment, digits only:
 *  letters in 7-segment numbers are set in the text font, so they keep their own shape). */
export const ghost = (s: string, segments: 7 | 14 = 14) => (segments === 7 ? s.replace(/[0-9]/g, '8') : s.replace(/[0-9A-Za-z]/g, '~'));
