/*
 * dogsanook.com — central site config
 * ------------------------------------------------------------------
 * All NAP / contact / social / pricing data lives here so it stays
 * consistent across the page, the SEO metadata and the JSON-LD schema
 * (CLAUDE.md §6 "NAP consistency"). Fill the TODO fields with real data
 * before launch — they are the CLAUDE.md §10 open items.
 */

export const site = {
  name: 'หมาสนุก',
  nameEn: 'dogsanook',
  domain: 'https://dogsanook.com',

  // Positioning (CLAUDE.md §3): game-based is the core, recall is a result.
  tagline: 'เล่นไปฝึกไป · ไม่ดุ ไม่บังคับ',
  method: 'สอนผ่านการเล่น + ให้หมาได้เลือกเอง ไม่ดุ ไม่บังคับ',

  // Teacher (name as written in the approved mockup).
  teacher: 'วุฒิ',

  // Service area — Bangkok only (CLAUDE.md §1/§7). Order kept consistent everywhere.
  zones: ['รามคำแหง', 'กรุงเทพกรีฑา', 'พระราม 9', 'ลาดกระบัง'],
  zonesNearby: ['บางกะปิ', 'ศรีนครินทร์', 'มีนบุรี'],
  city: 'กรุงเทพฯ',

  // LINE Official Account = @dogsanook. Add-friend deep link.
  lineOaId: '@dogsanook',
  lineUrl: 'https://line.me/R/ti/p/@dogsanook',

  // Phone — for people who'd rather call than add LINE.
  phone: '081-949-6389', // display form
  phoneTel: '+66819496389', // tel: link (E.164)

  // TODO(owner): business hours (CLAUDE.md §10).
  hours: '',

  // Socials — handles from CLAUDE.md §5. TODO(owner): confirm exact URLs.
  social: {
    tiktok: 'https://www.tiktok.com/@dogsanook',
    youtube: 'https://www.youtube.com/@dogsanook',
    instagram: 'https://www.instagram.com/dogsanook',
    facebook: 'https://www.facebook.com/dogsanook',
  },

  // Pricing (CLAUDE.md §5). Shown on-site only (never in Google Business desc — §9).
  pricing: {
    firstSession: { normal: 3000, promo: 1990 },
    course5: { normal: 15000, promo: 11900 },
  },
} as const;

// SEO strings — verbatim from CLAUDE.md §6.
export const seo = {
  title: 'ครูฝึกสุนัขถึงบ้าน กรุงเทพฯ (รามคำแหง–ลาดกระบัง) | หมาสนุก',
  description:
    'ครูฝึกสุนัขถึงบ้าน สไตล์เล่นไปฝึกไป ไม่ดุ ไม่บังคับ สอนน้องเรียกแล้วมา ปูพื้นฐานลูกหมา มารยาทในบ้าน บริการโซนรามคำแหง กรุงเทพกรีฑา พระราม 9 ลาดกระบัง — ปรึกษาฟรีทาง LINE',
  keywords: [
    'ครูฝึกสุนัขถึงบ้าน',
    'ฝึกสุนัขถึงบ้าน กรุงเทพ',
    'ฝึกหมาเชิงบวก',
    'สอนหมาเรียกแล้วมา',
    'ฝึกลูกสุนัข',
    'ฝึกสุนัข รามคำแหง',
    'ฝึกสุนัข ลาดกระบัง',
  ],
  ogImage: '/uploads/mommam-gold.png',
} as const;
