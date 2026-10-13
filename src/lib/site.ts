import profile from '../data/profile.json';

/** Years since careerStart, to one decimal — stays current on every build. */
export function yearsOfExperience(now = new Date()): string {
  const start = new Date(profile.careerStart);
  const years = (now.getTime() - start.getTime()) / (365.25 * 24 * 3600 * 1000);
  return (Math.floor(years * 10) / 10).toFixed(1);
}

export const visible = <T extends { data: { hidden?: boolean } }>(e: T) => !e.data.hidden;
