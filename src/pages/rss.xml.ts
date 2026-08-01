import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config/site';

// RSS 2.0 feed for the blog. Hand-rolled (no extra dep) to match sitemap.xml.ts.
// Helps content distribution and lets readers/aggregators pick up new posts.
const esc = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  const items = posts
    .map((p) => {
      const url = `${site.domain}/blog/${p.id}`;
      return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${esc(p.data.description)}</description>
      <pubDate>${p.data.pubDate.toUTCString()}</pubDate>
      <category>${esc(p.data.category)}</category>
    </item>`;
    })
    .join('\n');

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(site.name)} — บทความฝึกสุนัข</title>
    <link>${site.domain}/blog</link>
    <atom:link href="${site.domain}/rss.xml" rel="self" type="application/rss+xml" />
    <description>บทความฝึกสุนัขสไตล์เล่นไปฝึกไป ไม่ดุ ไม่บังคับ โดยครูฝึกสุนัขถึงบ้าน หมาสนุก</description>
    <language>th</language>
${items}
  </channel>
</rss>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
