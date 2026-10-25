import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Every section of the site is driven by files in src/content/.
// Add, edit or hide an entry there — no component changes needed.

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      tagline: z.string(),
      summary: z.string(),
      stack: z.array(z.string()),
      order: z.number().default(99),
      // showcase = flagship card; more = "More client work" row; app = page behind a reusable-app tile; early = 2023 work
      kind: z.enum(['showcase', 'more', 'app', 'early']).default('showcase'),
      year: z.string(),
      platforms: z.array(z.string()).default([]),
      features: z.array(z.object({ title: z.string(), text: z.string() })).default([]),
      status: z.enum(['live', 'in-progress', 'archived']).default('in-progress'),
      statusLabel: z.string().optional(), // free text that overrides the status pill, e.g. "In production · client work"
      note: z.string().optional(), // one honest line under the card, e.g. how it was built
      points: z.array(z.string()).default([]), // 2–3 card highlights: mechanism → rule → failure prevented
      repo: z.url().optional(),
      live: z.url().optional(),
      cover: image().optional(),
      highlights: z.array(z.object({ value: z.string(), label: z.string() })).default([]),
      gallery: z.array(z.object({ src: image(), caption: z.string().optional() })).default([]),
      hidden: z.boolean().default(false),
    }),
});

const journey = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/journey' }),
  schema: ({ image }) =>
    z.object({
      period: z.string(),
      title: z.string(),
      place: z.string().optional(),
      kind: z.enum(['foundation', 'work', 'pivot', 'now']),
      order: z.number(),
      image: image().optional(),
      imageAlt: z.string().optional(),
      hidden: z.boolean().default(false),
    }),
});

const experience = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/experience' }),
  schema: z.object({
    role: z.string(),
    company: z.string(),
    place: z.string(),
    period: z.string(),
    order: z.number(),
    intro: z.string().optional(),
    highlights: z.array(z.object({ title: z.string(), text: z.string(), tags: z.array(z.string()).default([]) })),
    hidden: z.boolean().default(false),
  }),
});

export const collections = { projects, journey, experience };
