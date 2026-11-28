/**
 * Writes the resized, compressed WebP copies of the site's photos that the
 * page actually downloads. Run it after adding or replacing a photo:
 *
 *   npm run images
 *
 * - Customer review photos: originals live in `assets/customers/<name>.jpg`
 *   (not deployed). Writes `public/customers/google/<name>-{480,800}.webp`.
 * - Brand photos: originals live in `assets/brands/<name>.webp` (not
 *   deployed). Writes `public/brands/<name>-{400,640}.webp`.
 * - Hero: writes `public/hero/hero-v3-1280.webp` from the 2720px original.
 *
 * Existing outputs are overwritten, so the script is safe to re-run.
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const QUALITY = 72;

async function resize(input, output, width) {
  const info = await sharp(input)
    .rotate() // respect EXIF orientation from phone photos
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: QUALITY, effort: 6 })
    .toFile(output);
  console.log(
    `${path.relative(root, output)}  ${info.width}×${info.height}  ${Math.round(info.size / 1024)} KB`,
  );
}

/** Writes `<out>/<name>-<width>.webp` for every image in `<src>`. */
async function resizeAll(srcDir, outDir, widths) {
  const src = path.join(root, srcDir);
  const out = path.join(root, outDir);
  await mkdir(out, { recursive: true });
  for (const file of await readdir(src)) {
    if (!/\.(jpe?g|png|webp)$/i.test(file)) continue;
    const name = file.replace(/\.[^.]+$/, "");
    for (const width of widths) {
      await resize(path.join(src, file), path.join(out, `${name}-${width}.webp`), width);
    }
  }
}

const customers = () => resizeAll("assets/customers", "public/customers/google", [480, 800]);
const brands = () => resizeAll("assets/brands", "public/brands", [400, 640]);

async function hero() {
  const dir = path.join(root, "public/hero");
  await resize(path.join(dir, "hero-v3-2720.webp"), path.join(dir, "hero-v3-1280.webp"), 1280);
}

await customers();
await brands();
await hero();
