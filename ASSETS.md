# Asset list

Drop files at these paths (under `public/`). Until a file exists, the site shows a labelled placeholder block.
Supply masters at 4K+; run `scripts/optimize-media.sh` to produce web files. All photos are `.jpg`.

| Filename | Section | Type | Recommended res | Ratio | What it should show |
|---|---|---|---|---|---|
| `video/hero-*.{mp4,webm,av1.mp4}` | Hero | Video | 4K master (3840×2160), 10–15 s | 16:9 | Seamless loop, no audio. Slow cinematic gym footage: barbell lift, chalk, cable pull, dim light with accent glow. No faces needed. Export at 30 or 60 fps. |
| `images/brand/hero-poster.jpg` | Hero fallback | Image | 2560×1440 | 16:9 | First/best frame of the hero loop (auto-created by the script). |
| `images/brand/logo.svg` | Navbar/footer (optional) | SVG | vector | any | Your logo, light-on-dark. Text logo is used until supplied. |
| `images/brand/favicon.ico` → place at `app/favicon.ico` | Browser tab | Icon | 48×48 + 512 | 1:1 | Simple mark of the logo. |
| `images/brand/og.jpg` | Social share | Image | 1200×630 | 1.91:1 | Gym name over a dark action shot. |
| `images/brand/3d-render.jpg` | "Train in a space built for results" | Image | 3840×1646 | 21:9 (crops to 4:5 on mobile; keep subject centred) | Cinematic or 3D-rendered wide view of the gym floor, dark, moody, accent-colour lighting. |
| `images/facilities/floor-wide.jpg` | "More than a gym" | Image | 2560×1920 | 4:3 | Wide shot of the full gym floor. |
| `images/programs/cardio.jpg` | Programs 01 | Image | 1600×2000 | 4:5 | Person on treadmill/bike/rower, dark background. |
| `images/programs/strength.jpg` | Programs 02 | Image | 1600×2000 | 4:5 | Barbell squat/deadlift/bench. |
| `images/programs/hybrid.jpg` | Programs 03 | Image | 1600×2000 | 4:5 | Kettlebell or battle-rope plus weights. |
| `images/programs/functional.jpg` | Programs 04 | Image | 1600×2000 | 4:5 | Sled push, box jump or TRX. |
| `images/programs/weight-loss.jpg` | Programs 05 | Image | 1600×2000 | 4:5 | High-energy circuit or HIIT. |
| `images/programs/muscle-gain.jpg` | Programs 06 | Image | 1600×2000 | 4:5 | Dumbbell press / cable work. |
| `images/programs/yoga-zumba.jpg` | Programs 07 | Image | 1600×2000 | 4:5 | Group class in the studio. |
| `images/programs/personal-training.jpg` | Programs 08 | Image | 1600×2000 | 4:5 | Trainer spotting a client. |
| `images/facilities/cardio.jpg` | Gallery: Cardio Zone | Image | 2560×1920 | 4:3 | Row of treadmills/bikes. |
| `images/facilities/strength.jpg` | Gallery: Strength Zone | Image | 2560×1920 | 4:3 | Racks, benches, platforms. |
| `images/facilities/dumbbells.jpg` | Gallery: Free Weights | Image | 2560×1920 | 4:3 | Dumbbell rack, mirror wall. |
| `images/facilities/machines.jpg` | Gallery: Machines | Image | 2560×1920 | 4:3 | Selectorised machines. |
| `images/facilities/functional.jpg` | Gallery: Functional Area | Image | 2560×1920 | 4:3 | Turf, sled, rig. |
| `images/facilities/lockers.jpg` | Gallery: Locker/Changing | Image | 2560×1920 | 4:3 | Clean lockers / changing room. |
| `images/facilities/reception.jpg` | Gallery: Reception | Image | 2560×1920 | 4:3 | Front desk with logo wall. |
| `images/trainers/trainer-1.jpg` … `trainer-4.jpg` | Trainers | Image | 1600×2133 | 3:4 | Head-and-shoulders portrait, face in the upper third (cropped to top). Shown B&W, colour on hover. Shoot in colour. |

## Generating the missing visuals
If you generate with an image/video model, use these prompts (swap the accent colour to match your theme):
- **Hero loop:** "Seamless 12-second loop, 16:9, 4K, no audio. Dark premium gym, slow dolly past a barbell rack, chalk dust floating in a beam of light, subtle lime-green rim light, shallow depth of field, cinematic, no text, no people's faces."
- **3D render:** "Photorealistic 3D render of a modern dark gym interior, wide angle, black walls, rows of equipment, thin lime LED strips, polished floor reflections, cinematic lighting, 21:9, no text."
- **Programs / facilities:** use your own photos where possible. They show real members and equipment, which builds more trust than generated images.
