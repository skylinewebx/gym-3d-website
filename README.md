# Gym Website (Next.js, dark, premium)

One codebase, two deploy targets. Pick one.

## A) Vercel (recommended: working form API, USA region `iad1`)
1. vercel.com/new > **Continue with GitHub** > **Import** this repo. Keep the defaults (`npm run build`).
2. Add these Environment Variables, then **Deploy**:

| Name | Needed for |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Your final URL, no trailing slash (SEO, sitemap) |
| `SUPABASE_URL` | Saving leads (run `supabase/schema.sql` once in the Supabase SQL editor) |
| `SUPABASE_SERVICE_ROLE_KEY` | Saving leads. Server only, never public |
| `RESEND_API_KEY` | Emailing leads to the owner |
| `LEAD_NOTIFY_EMAIL` | Where lead emails go |
| `LEAD_FROM_EMAIL` | Optional sender, e.g. `Leads <leads@yourgym.com>` (verify the domain in Resend) |

You need Supabase **or** Resend (both is best). If neither is set, the live form shows an error instead of silently losing leads. Add your domain under Settings > Domains.

## B) GitHub Pages (static, no server)
Run `npm run deploy:pages`. It builds the static site (`npm run build:pages`, API route skipped) and publishes `out/` to the `gh-pages` branch.
1. One time: repo Settings > Pages > Source = **Deploy from a branch** > `gh-pages` / root.
2. Live at your custom domain (`public/CNAME`) or `https://<user>.github.io/gym-3d-website/` (then build with env `BASE_PATH=/gym-3d-website`).
3. The form has no server here: set `NEXT_PUBLIC_FORMSPREE_ID` (formspree.io) in the environment when building to receive emails. Without it, visitors get a "Send on WhatsApp / email" screen with their details pre-filled.

## Local setup
```bash
npm install
cp .env.example .env.local   # fill in values (optional for local dev)
npm run dev                  # http://localhost:3000
npm run build                # Vercel build
npm run build:pages          # GitHub Pages static build (output in out/)
npm run deploy:pages         # build + publish to the gh-pages branch
```

## Edit content
Everything lives in **`data/gym.config.ts`**: name, phone/WhatsApp, address, timings, prices, trainers, programs, FAQs, testimonials. Anything marked `PLACEHOLDER` or `SAMPLE` must be replaced before launch.

## Switch theme
In `data/gym.config.ts` change one line: `theme: "lime" | "red" | "grey"`. Token values are in `app/globals.css`; add a new theme by adding a `[data-theme="x"]` block.

**Contrast (WCAG AA, measured):** text on background 17.6:1, muted text 7.3:1. Accent as text on the dark background: lime 16.6, red 5.5, grey 13.3. Dark text on accent buttons: lime 16.6, red 5.5, grey 13.3. All pass 4.5:1. (White text on the red accent would only be 3.6:1, so the red theme uses dark text.)

## Images and video
See `ASSETS.md` for every filename, size and subject. Missing files show a labelled placeholder.
Install ffmpeg, put masters in `media-src/` (git-ignored), then:
```bash
scripts/optimize-media.sh video  media-src/hero-master.mp4           # hero tiers 720/1080/1440/2160 in AV1, VP9, H.264 + poster
FPS=60 scripts/optimize-media.sh video media-src/hero-master.mp4     # smoother 60fps loop
scripts/optimize-media.sh images media-src/images public/images      # caps at 2560px, never upscales
```
On Windows run it from Git Bash or WSL. `node scripts/import-assets.mjs "<folder>"` turns your photos into sharpened JPEGs (max 2560px) plus responsive WebP sizes (480-2560px) and blur previews. The GitHub Pages build serves those WebP sizes through `lib/image-loader.ts`; on Vercel the Next.js optimizer serves AVIF/WebP. The hero loads the lightest video tier for phones and shows the poster only on slow/Save-Data connections or with reduced motion. Do not ship raw 8K files.

## Notes
- Spam protection: hidden honeypot field; on Vercel also server-side validation and an in-memory rate limit (5 per 10 min per IP, best effort on serverless; use Upstash for strict limits).
- Razorpay is not built; `lib/payments.ts` is the seam (Vercel only).
- Testimonials are hidden in production until `testimonialsVerified: true` in the config.
- Animations respect `prefers-reduced-motion`.
- Favicon is `app/icon.svg`.
