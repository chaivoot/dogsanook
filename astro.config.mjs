import { defineConfig } from 'astro/config';

// Static marketing site (Astro) for dogsanook.com.
// Deployed on Vercel (framework auto-detected → `astro build` → dist/).
// Phase 2 course platform lives on a separate subdomain (games.dogsanook.com,
// Next.js) — it does NOT touch this project. See CLAUDE.md §2.
export default defineConfig({
  site: 'https://dogsanook.com',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    inlineStylesheets: 'auto',
  },
});
