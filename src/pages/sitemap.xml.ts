import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';

export const GET: APIRoute = async () => {
  const posts = await getCollection('blog', ({ data }) => !data.draft);
  const urls = [
    { loc: `${site.domain}/`, priority: '1.0' },
    // /hand-target is intentionally excluded — it's a LINE-only gated guide (noindex).
    { loc: `${site.domain}/blog`, priority: '0.8' },
    { loc: `${site.domain}/terms`, priority: '0.3' },
    { loc: `${site.domain}/privacy`, priority: '0.3' },
    ...posts.map((p) => ({
      loc: `${site.domain}/blog/${p.id}`,
      priority: '0.6',
      lastmod: p.data.pubDate.toISOString().split('T')[0],
    })),
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) =>
      `  <url><loc>${u.loc}</loc>${
        'lastmod' in u && u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''
      }<priority>${u.priority}</priority></url>`
  )
  .join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
