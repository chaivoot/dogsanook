# dogsanook.com

Landing page + blog สำหรับ **หมาสนุก (dogsanook)** — ครูฝึกสุนัขถึงบ้าน กรุงเทพฯ
แนวทาง game-based "เล่นไปฝึกไป" ไม่ดุ ไม่บังคับ

งานเดียวของหน้านี้: เปลี่ยนคนเข้าเว็บ → **แอด LINE ปรึกษา/จองประเมิน**

> บริบทแบรนด์ ข้อจำกัด IP และ copy guardrails ทั้งหมดอยู่ใน [`CLAUDE.md`](./CLAUDE.md) — อ่านก่อนแก้ไขเนื้อหา

## Stack

- **[Astro](https://astro.build)** — static marketing site + blog (เร็ว, SEO ดี)
- **Blog** = Astro Content Collection (Markdown) → เนื้อหา portable · แก้ผ่าน **Keystatic CMS** ที่ `/keystatic`
- **Deploy** = Vercel (custom domain `dogsanook.com`) · Vercel adapter (`.vercel/output`) — เว็บยัง static เกือบทั้งหมด ยกเว้น route ของ Keystatic
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
npm run build    # → .vercel/output (มี Vercel adapter สำหรับ route ของ Keystatic)
npm run preview
```

## Blog CMS — Keystatic (แก้/เพิ่มบทความผ่านหน้าเว็บ)

หน้า admin อยู่ที่ **`/keystatic`** — พิมพ์ Markdown ได้เลย ไม่ต้องแตะโค้ด
เนื้อหายังเก็บเป็นไฟล์ `.md` ใน `src/content/blog/` เหมือนเดิม (portable)

- **ตอน dev** (`npm run dev` → `/keystatic`): โหมด **local** — กดเซฟแล้วเขียนลงไฟล์ในเครื่องเลย ไม่ต้อง login
- **ตอน production** (`dogsanook.com/keystatic`): โหมด **GitHub** — กดเซฟ = commit เข้า repo → Vercel rebuild → บทความขึ้นเว็บ (~1 นาที)

### ตั้งค่าครั้งเดียวสำหรับ production (GitHub App)

หน้าการตลาด/blog ทั้งหมดยังเป็น **static** — มีแค่ `/keystatic` + `/api/keystatic`
ที่รันฝั่ง server (ผ่าน Vercel adapter) การ login ใช้ GitHub App ตั้งครั้งเดียว:

1. Deploy ขึ้น Vercel ตามปกติ (ยังไม่ต้องมี env ของ Keystatic)
2. เปิด **`https://dogsanook.com/keystatic`** → Keystatic จะขึ้นหน้า setup ให้ **"สร้าง GitHub App"** (กรอกชื่อ/สิทธิ์/callback ให้อัตโนมัติ ชี้มาที่ repo `chaivoot/dogsanook`)
3. กดสร้าง → GitHub พากลับมา แล้ว Keystatic จะโชว์ค่า env 4 ตัว — ก็อปไปใส่ใน **Vercel → Settings → Environment Variables**:
   ```
   KEYSTATIC_GITHUB_CLIENT_ID=
   KEYSTATIC_GITHUB_CLIENT_SECRET=
   KEYSTATIC_SECRET=
   PUBLIC_KEYSTATIC_GITHUB_APP_SLUG=
   ```
4. **Redeploy** ครั้งนึง → หลังจากนั้นเข้า `/keystatic` login ด้วย GitHub ได้เลย แก้/เพิ่มบทความ กดเซฟ = ขึ้นเว็บ

> ยังไม่ตั้ง GitHub App ก็ไม่กระทบเว็บหลัก — หน้า `/keystatic` แค่ยัง login ไม่ได้เท่านั้น ส่วนที่เหลือของเว็บทำงานปกติ

## ฝังคลิป YouTube (lazy, ประหยัด bandwidth)

โหลดแค่ thumbnail ก่อน กดแล้วค่อยโหลด player (nocookie) — เบา ไม่ถ่วงเว็บ

- ในไฟล์ `.astro`: `<YouTubeEmbed id="VIDEO_ID" title="..." />`
- ในบทความ `.md`: เขียน raw HTML ได้เลย
  ```html
  <div class="yt-facade" data-id="VIDEO_ID" data-title="..."></div>
  ```

> คลิปในหน้า gate (`/hand-target`) ให้ตั้งเป็น **Unlisted** บน YouTube · คลิปในบทความสาธารณะเป็น public ได้

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
