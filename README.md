# Gym Website (Next.js, dark, premium)

## Deploy to Vercel (USA, `iad1`): 5 steps
GitHub only stores the code. It does not run the site. The live site runs on Vercel.

1. Go to **vercel.com/new** and choose **Continue with GitHub**.
2. Click **Import** next to this repository. Leave all build settings as they are (Next.js is detected; the region `iad1` is already set in `vercel.json`).
3. Open **Environment Variables** and add the variables below.
4. Click **Deploy**. In 1-2 minutes you get a link like `https://your-project.vercel.app`.
5. Add your own domain under **Settings > Domains**, then set `NEXT_PUBLIC_SITE_URL` to it and redeploy.

### Environment variables (exact names)
| Name | Required | Value |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Your final URL, no trailing slash, e.g. `https://www.yourgym.com` |
| `SUPABASE_URL` | Yes (to save leads) | Supabase > Project Settings > API > Project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes (to save leads) | Supabase > Project Settings > API > `service_role` key. Keep secret |
| `RESEND_API_KEY` | Yes (to email the owner) | resend.com > API Keys |
| `LEAD_NOTIFY_EMAIL` | Yes (to email the owner) | Where new leads are sent |
| `LEAD_FROM_EMAIL` | Optional | e.g. `Leads <leads@yourgym.com>` (verify the domain in Resend; default is `onboarding@resend.dev`) |

Before the first lead: run `supabase/schema.sql` once in the Supabase SQL editor. In production the form returns an error if neither Supabase nor Resend is configured, so you never lose leads silently. Do not use static export or GitHub Pages: the form needs the `/api/lead` server route.

## Local setup
```bash
npm install
cp .env.example .env.local   # fill in values (optional for local dev)
npm run dev                  # http://localhost:3000
npm run build                # production build
```
Without Supabase/Resend keys the form still works locally and logs the lead in the terminal.

### Environment variables
| Name | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical URL for SEO/sitemap |
| `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` | Lead storage (server only). Run `supabase/schema.sql` once in the SQL editor |
| `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`, `LEAD_FROM_EMAIL` | Owner email on each lead. Verify your sending domain in Resend for production |

## Edit content
Everything lives in **`data/gym.config.ts`**: name, phone/WhatsApp, address, timings, prices, trainers, programs, FAQs, testimonials. Anything marked `PLACEHOLDER` or `SAMPLE` must be replaced before launch.

## Switch theme
In `data/gym.config.ts` change one line: `theme: "lime" | "red" | "grey"`. Token values are in `app/globals.css`; add a new theme by adding a `[data-theme="x"]` block.

**Contrast note (WCAG AA, 4.5:1 for normal text):** lime and grey accents with `#0B0B0D` text pass (about 16:1 and 14:1), and accents on the `#0A0B10` background pass. Red `#FF3B30` with white text is about 3.5:1, which passes only for large/bold text. For small text on red buttons, change `--accent-contrast` for red to `11 11 13` (about 5.9:1).

## Images and video
See `ASSETS.md` for every filename, size and subject. Missing files show a labelled placeholder.
Install ffmpeg, put masters in `media-src/` (git-ignored), then:
```bash
scripts/optimize-media.sh video  media-src/hero-master.mp4           # hero tiers 720/1080/1440/2160 in AV1, VP9, H.264 + poster
FPS=60 scripts/optimize-media.sh video media-src/hero-master.mp4     # smoother 60fps loop
scripts/optimize-media.sh images media-src/images public/images      # caps at 2560px, never upscales
```
On Windows run it from Git Bash or WSL. Next.js converts photos to AVIF/WebP and serves retina sizes automatically. The hero loads the lightest video tier for phones and shows the poster only on slow/Save-Data connections or with reduced motion. Do not ship raw 8K files.

## Deploy to Vercel (USA)
1. Push to GitHub and import the repo at vercel.com/new (region is pinned in `vercel.json`: `iad1`).
2. Add the environment variables above in Project Settings > Environment Variables.
3. Settings > Domains: add your domain and set the DNS records Vercel shows.
4. Set `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy.

## Notes
- Rate limiting is in-memory (best effort on serverless). For strict limits use Upstash Ratelimit in `lib/ratelimit.ts`.
- Razorpay is not built; `lib/payments.ts` is the seam.
- Animations respect `prefers-reduced-motion`.
- Add `app/favicon.ico` for the tab icon.
