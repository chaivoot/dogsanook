import { config, fields, collection } from '@keystatic/core';

// Keystatic CMS for the dogsanook.com blog.
// - Dev: local mode — edits write straight to ./src/content/blog/*.md (no auth).
// - Prod: GitHub mode — the admin at /keystatic commits to the repo, and Vercel
//   rebuilds the static site. Requires a GitHub App (see README §Keystatic).
// Content is stored as plain Markdown (extension: 'md') so it stays a portable
// Astro Content Collection — same files Astro already renders (CLAUDE.md §2).
export default config({
  storage: import.meta.env.DEV
    ? { kind: 'local' }
    : { kind: 'github', repo: 'chaivoot/dogsanook' },

  ui: {
    brand: { name: 'หมาสนุก' },
  },

  collections: {
    blog: collection({
      label: 'บทความ Blog',
      path: 'src/content/blog/*',
      slugField: 'title',
      format: { contentField: 'content' },
      entryLayout: 'content',
      columns: ['title', 'pubDate'],
      schema: {
        title: fields.slug({
          name: { label: 'หัวข้อบทความ (Title)' },
          slug: {
            label: 'Slug (URL — ใช้ภาษาอังกฤษ)',
            description: 'ส่วนท้าย URL เช่น recall-3-steps → /blog/recall-3-steps',
          },
        }),
        description: fields.text({
          label: 'คำอธิบายสั้น (SEO description)',
          multiline: true,
        }),
        category: fields.text({ label: 'หมวดหมู่ (เช่น RECALL, PUPPY, การเดินสายจูง)' }),
        pubDate: fields.date({ label: 'วันที่เผยแพร่' }),
        heroImage: fields.text({
          label: 'รูปหน้าปก (path)',
          description: 'เช่น /uploads/dog-training-recall.jpg',
        }),
        heroAlt: fields.text({ label: 'ข้อความ Alt ของรูปหน้าปก (บรรยายรูปเพื่อ SEO/accessibility)' }),
        draft: fields.checkbox({
          label: 'ฉบับร่าง (ติ๊ก = ยังไม่เผยแพร่)',
          defaultValue: false,
        }),
        content: fields.markdoc({ label: 'เนื้อหาบทความ', extension: 'md' }),
      },
    }),
  },
});
