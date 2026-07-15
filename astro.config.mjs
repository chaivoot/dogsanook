import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';

// Static marketing site (Astro) for dogsanook.com.
// Marketing + blog pages stay prerendered (static). Only the Keystatic admin
// routes (/keystatic, /api/keystatic) render on-demand, so we add the Vercel
// adapter — those two routes become serverless functions, everything else is
// still static + fast. See CLAUDE.md §2 and README (Keystatic setup).
export default defineConfig({
  site: 'https://dogsanook.com',
  output: 'static',
  adapter: vercel(),
  trailingSlash: 'ignore',
  integrations: [react(), keystatic()],
  build: {
    inlineStylesheets: 'auto',
  },
});
