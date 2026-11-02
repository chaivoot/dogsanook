import { getCollection, type CollectionEntry } from 'astro:content';

export type BlogPost = CollectionEntry<'blog'>;

// Scheduled publishing.
// ---------------------------------------------------------------------------
// A post goes live on the PRODUCTION site only when it is not a draft AND its
// pubDate has arrived. So to schedule a post for a future day, just set its
// `pubDate` to that day and merge as usual — it stays hidden until then.
//
// On local dev and Vercel PREVIEW deploys we show future (scheduled) posts too,
// so they can be reviewed before they go live. Vercel sets VERCEL_ENV to
// 'production' only on the production deployment.
//
// A daily scheduled rebuild (see .github/workflows/scheduled-publish.yml) makes
// the production site re-build once a day, so a post whose pubDate has passed
// gets published automatically without anyone pushing.
const isProd = process.env.VERCEL_ENV === 'production';

/** True when the post should be visible on the current build. */
export function isLive(post: BlogPost): boolean {
  if (post.data.draft) return false;
  if (!isProd) return true; // dev + preview: show scheduled posts for review
  return post.data.pubDate.getTime() <= Date.now();
}

/** All live posts, newest first. */
export async function getLivePosts(): Promise<BlogPost[]> {
  const posts = await getCollection('blog');
  return posts.filter(isLive).sort(
    (a, b) => b.data.pubDate.getTime() - a.data.pubDate.getTime()
  );
}
