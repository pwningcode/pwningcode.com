import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    draft: z.boolean().default(false),
    tags: z.array(z.string()).default([]),
    cover: z
      .object({
        stats: z.array(z.string()).max(4).optional(),
        pull: z.string().max(120).optional(),
        image: z.string().optional(),
      })
      .refine((c) => !(c.stats && c.pull), {
        message: 'cover.stats and cover.pull are mutually exclusive',
      })
      .optional(),
  }),
});

export const collections = { notes };
