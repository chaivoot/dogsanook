# dogsanook.com

Landing page + blog สำหรับ **หมาสนุก (dogsanook)** — ครูฝึกสุนัขถึงบ้าน กรุงเทพฯ
แนวทาง game-based "เล่นไปฝึกไป" ไม่ดุ ไม่บังคับ

งานเดียวของหน้านี้: เปลี่ยนคนเข้าเว็บ → **แอด LINE ปรึกษา/จองประเมิน**

> บริบทแบรนด์ ข้อจำกัด IP และ copy guardrails ทั้งหมดอยู่ใน [`CLAUDE.md`](./CLAUDE.md) — อ่านก่อนแก้ไขเนื้อหา

## Stack

- **[Astro](https://astro.build)** — static marketing site + blog (เร็ว, SEO ดี)
- **Blog** = Astro Content Collection (Markdown) → เนื้อหา portable
- **Deploy** = Vercel (custom domain `dogsanook.com`), auto-detect Astro → `dist/`
- **Phase 2** = `games.dogsanook.com` (คอร์สออนไลน์, Next.js) — แยก subdomain ไม่แตะ repo นี้

## โครงสร้าง

```
src/
  config/site.ts        ข้อมูลกลาง: NAP, LINE, โซน, ราคา, โซเชียล (แก้ที่นี่ที่เดียว)
  styles/tokens.css     design tokens (สี/ฟอนต์/ระยะ) — ใช้ซ้ำกับ games.* ได้
  layouts/BaseLayout    <head> SEO + OG/Twitter + JSON-LD
  components/           Nav, Hero, ProblemSection, MethodSection, AboutSection,
                        ServicesCards, StepsSection, PricingSection, LeadMagnet,
                        ProofSection, SocialSection, BlogSection, FAQSection,
                        FinalCTA, Footer, ImageSlot, SeoSchema
  content/blog/         บทความ (Markdown) + content.config.ts (schema)
  pages/                index.astro, blog/index, blog/[...slug], sitemap.xml
public/uploads/         โลโก้ / รูปครู+มอมแมม / คลิป (assets จาก handoff)
```

## Dev

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # → dist/
npm run preview
```

## TODO ก่อน launch (CLAUDE.md §10)

แก้ที่ `src/config/site.ts`:

- [ ] `lineUrl` — ลิงก์ LINE จริง (ตอนนี้ CTA เลื่อนไปหา section #line)
- [ ] `hours` — เวลาทำการ
- [ ] ยืนยัน URL โซเชียลจริง (`social.*`)
- [ ] คลิป recall แนวนอน + รูปครู/มอมแมม + ไฟล์แจกฟรี hand target
- [ ] รีวิวลูกค้า (ทยอยเติมใน ProofSection)

## หมายเหตุดีไซน์

Palette ตอนนี้ตรงกับ mockup ที่อนุมัติ (warm ink + gold) 1:1 — teal สีโลโก้ถูกเก็บไว้ใน
`tokens.css` เป็น `--brand-teal-*` (ยังไม่ใช้ในหน้า) รอเจ้าของเคาะเรื่อง teal vs warm
(CLAUDE.md §4 open item)
