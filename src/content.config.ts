import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'zod';

export const collections = {
  announcements: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/announcements' }),
    schema: z.object({
      id: z.string(),
      title: z.string(),
      content: z.string(),
      date: z.string().datetime(),
      hash: z.string().optional(),
    }),
  }),
  subjects: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/subjects' }),
    schema: z.object({
      id: z.string(),
      title: z.string(),
      teacher: z.string(),
      description: z.string().optional(),
    }),
  }),
};
