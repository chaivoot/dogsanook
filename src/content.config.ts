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
    heroVideo: z.string().optional(), // mp4 path — if set, the hero is a muted autoplay-loop <video> instead of an image
    heroVideoDuration: z.string().optional(), // ISO 8601 (e.g. "PT16S") for VideoObject schema
    heroAlt: z.string().optional(),
    heroRatio: z.string().optional(), // hero aspect-ratio (default 16/9). e.g. "1/1" for a square photo.
    hideHero: z.boolean().default(false), // use heroImage only as the listing/home/og thumbnail, don't render it as the in-article hero (e.g. when the post's main visual is an embedded video)
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
