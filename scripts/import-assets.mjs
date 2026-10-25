// Imports the supplied source photos into /public/images with web-ready sizing, mild sharpening,
// and writes data/blur.json (tiny blur placeholders so images fade in without a flash).
// Usage: node scripts/import-assets.mjs "C:/path/to/gym web asset"
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const srcDir = process.argv[2] ?? "C:/Users/HP/Downloads/gym web asset";
const outRoot = "public/images";
const files = fs.readdirSync(srcDir);
const find = (key) => {
  const f = files.find((n) => n.toLowerCase().startsWith(key.toLowerCase()));
  if (!f) throw new Error(`No source starting with "${key}"`);
  return path.join(srcDir, f);
};

// out: path under /public/images. from: filename prefix. crop: fractions of the source (left, top, width, height).
const jobs = [
  { out: "programs/cardio.jpg", from: "Athlete_sprinting_on_treadmill" },
  { out: "programs/strength.jpg", from: "Athlete_squatting_barbell" },
  { out: "programs/hybrid.jpg", from: "Athlete_performing_kettlebell" },
  { out: "programs/functional.jpg", from: "Athlete_pushing_weighted_sled" },
  { out: "programs/muscle-gain.jpg", from: "Athlete_performing_dumbbell_incl" },
  { out: "facilities/cardio.jpg", from: "Gym_with_cardio_and_weights", crop: [0, 0.28, 0.5, 0.5025] },
  { out: "facilities/functional.jpg", from: "Gym_with_cardio_and_weights", crop: [0.55, 0.43, 0.45, 0.452] },
  { out: "facilities/strength.jpg", from: "Gym_interior_with_strength", crop: [0.25, 0, 0.744, 1] },
  { out: "facilities/dumbbells.jpg", from: "Dumbbell_rack_in_dark_gym" },
  { out: "facilities/machines.jpg", from: "Gym_machines_in_a_row" },
  { out: "facilities/lockers.jpg", from: "Matte_black_gym_lockers" },
  { out: "facilities/reception.jpg", from: "Black_gym_reception_desk" },
  { out: "facilities/floor-wide.jpg", from: "Gym_with_cardio_and_weights" },
  { out: "brand/3d-render.jpg", from: "Gym_interior_with_strength" },
  { out: "brand/hero-poster.jpg", from: "Gym_interior_with_strength" },
];

const blur = {};
const widthsManifest = {}; // src -> available WebP widths (used by lib/image-loader.ts on the static build)
const VARIANTS = [480, 768, 1080, 1440, 1920, 2560];
const MAX_W = 2560;

for (const j of jobs) {
  let img = sharp(find(j.from)).rotate();
  const meta = await img.metadata();
  if (j.crop) {
    const [l, t, w, h] = j.crop;
    img = img.extract({ left: Math.round(l * meta.width), top: Math.round(t * meta.height), width: Math.round(w * meta.width), height: Math.round(h * meta.height) });
  }
  const buf = await img.toBuffer();
  const dest = path.join(outRoot, j.out);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  // withoutEnlargement: never upscale. Mild unsharp mask keeps edges crisp after Next's resizing.
  await sharp(buf).resize({ width: MAX_W, withoutEnlargement: true, kernel: "lanczos3" }).sharpen({ sigma: 0.6, m1: 0.8, m2: 1.5 })
    .jpeg({ quality: 90, mozjpeg: true, progressive: true, chromaSubsampling: "4:4:4" }).toFile(dest);
  // Responsive WebP variants (never upscaled) so phones download ~40-100 KB instead of the 2560px original.
  const srcW = Math.min((await sharp(buf).metadata()).width, MAX_W);
  const ws = [...VARIANTS.filter((w) => w < srcW), srcW];
  for (const w of ws) {
    await sharp(buf).resize({ width: w, withoutEnlargement: true, kernel: "lanczos3" }).sharpen({ sigma: 0.5, m1: 0.8, m2: 1.5 })
      .webp({ quality: 82, effort: 5 }).toFile(dest.replace(/\.jpg$/, `-${w}.webp`));
  }
  widthsManifest["/images/" + j.out] = ws;
  const tiny = await sharp(buf).resize(20).blur(1).jpeg({ quality: 60 }).toBuffer();
  blur["/images/" + j.out] = "data:image/jpeg;base64," + tiny.toString("base64");
  console.log("ok", j.out);
}

// Social share image 1200x630: photo + dark gradient + name
const og = await sharp(find("Gym_interior_with_strength")).resize(1200, 630, { fit: "cover", position: "right" }).toBuffer();
const svg = Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
<defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0A0B10" stop-opacity=".95"/><stop offset=".65" stop-color="#0A0B10" stop-opacity=".35"/><stop offset="1" stop-color="#0A0B10" stop-opacity="0"/></linearGradient></defs>
<rect width="1200" height="630" fill="url(#g)"/>
<text x="64" y="330" font-family="Impact, 'Arial Black', sans-serif" font-size="108" fill="#F2F2F3">PRIME FORM</text>
<text x="64" y="430" font-family="Impact, 'Arial Black', sans-serif" font-size="108" fill="#C6FF3D">FITNESS</text>
<text x="68" y="490" font-family="Arial, sans-serif" font-size="30" fill="#9A9DA8">Train hard. Stay consistent. See real progress.</text></svg>`);
await sharp(og).composite([{ input: svg }]).jpeg({ quality: 88, mozjpeg: true }).toFile(path.join(outRoot, "brand/og.jpg"));
console.log("ok brand/og.jpg");

fs.writeFileSync("data/blur.json", JSON.stringify(blur));
fs.writeFileSync("data/image-widths.json", JSON.stringify(widthsManifest));
console.log("wrote data/blur.json");
