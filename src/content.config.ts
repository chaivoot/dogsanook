import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog = portable Markdown (CLAUDE.md §2). Content survives a framework move.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    pubDate: z.coerce.date(),
    heroImage: z.string().optional(),
    heroAlt: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
