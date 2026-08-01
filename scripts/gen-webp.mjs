// Generate .webp siblings for every raster image in public/uploads.
// ImageSlot serves the .webp via <picture> when the sibling exists, falling
// back to the original for anything not yet converted. Re-run after adding
// images:  node scripts/gen-webp.mjs
import { readdir, stat } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = 'public/uploads';
const files = await readdir(dir);
const rasters = files.filter((f) => /\.(jpe?g|png)$/i.test(f));

let made = 0;
let skipped = 0;
for (const f of rasters) {
  const src = path.join(dir, f);
  const out = src.replace(/\.(jpe?g|png)$/i, '.webp');
  // Skip if an up-to-date webp already exists.
  if (existsSync(out) && (await stat(out)).mtimeMs >= (await stat(src)).mtimeMs) {
    skipped++;
    continue;
  }
  await sharp(src).webp({ quality: 80 }).toFile(out);
  made++;
  console.log('webp', path.basename(out));
}
console.log(`done: ${made} generated, ${skipped} up-to-date, ${rasters.length} total`);
