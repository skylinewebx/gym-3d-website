# Image and video prompts

Use with any image/video generator (Midjourney, Flux, Ideogram, Veo, Runway, Kling). Generate at the highest resolution offered, then run `scripts/optimize-media.sh`.
Filenames match `ASSETS.md`. Swap "lime-green" for your theme colour (red or silver-white) if you change `theme`.

## Style block (add to every prompt)
> Photorealistic, dark premium gym, near-black background, single lime-green accent light, cinematic low-key lighting, high contrast, shallow depth of field, sharp detail, no text, no logos, no watermarks, no brand names on equipment.

## Negative prompt (if supported)
> text, letters, logos, watermark, extra fingers, deformed hands, extra limbs, distorted face, blurry, oversaturated, stock-photo smile, cartoon, bright white walls

---

## 1. Hero loop video: `video/hero-master.mp4`
16:9, 4K, 12 seconds, seamless loop, no audio, 24-30 fps.
> Slow cinematic dolly shot along a row of loaded barbell racks in a dark gym, chalk dust drifting through a narrow beam of light, a lifter in silhouette preparing a deadlift in the background, thin lime-green LED strip glowing along the ceiling, polished black floor reflections. Camera moves slowly left to right, the last frame matches the first for a seamless loop. No faces in focus, no text.

Tip: if the tool can't loop, generate 6 s forward and reverse it (ping-pong) in any editor.

## 2. 3D render: `images/brand/3d-render.jpg`
21:9, 3840x1646.
> Photorealistic 3D architectural render of a modern premium gym interior, wide-angle, black matte walls, rows of strength machines and dumbbell racks, thin lime-green LED lines on ceiling and floor edges, glossy dark floor with soft reflections, empty of people, moody cinematic lighting. Keep the focal point centred (the image is cropped to portrait on phones).

## 3. Wide floor: `images/facilities/floor-wide.jpg`
4:3.
> Wide view of a clean modern gym floor, free-weight area in the foreground and machines behind, dark walls, warm-white overhead spots with a subtle lime-green accent, a few members training out of focus.

## 4. Programs (all 4:5, subject in the lower two-thirds, dark background)
- `programs/cardio.jpg`: Athlete sprinting on a treadmill, side view, motion in the legs, dark gym, lime-green rim light.
- `programs/strength.jpg`: Lifter mid-squat under a heavy barbell in a power rack, chalk on hands, strong back light.
- `programs/hybrid.jpg`: Athlete swinging a kettlebell with a battle rope and barbell visible behind, sweat highlights.
- `programs/functional.jpg`: Athlete pushing a weighted sled across black turf, low camera angle, dramatic side light.
- `programs/weight-loss.jpg`: Small group doing a high-energy HIIT circuit, jump rope in motion, bright but moody.
- `programs/muscle-gain.jpg`: Close-up of a dumbbell incline press, defined shoulders and arms, sharp rim light.
- `programs/yoga-zumba.jpg`: Women-led group class in a dim studio, mid-stretch / dance pose, soft lime-green glow behind.
- `programs/personal-training.jpg`: Coach spotting a client on a bench press, both engaged, shot from behind the bench.

## 5. Facilities (all 4:3, no people or only blurred figures)
- `facilities/cardio.jpg`: Row of treadmills and bikes facing a dark wall, evenly lit, lime-green accent strip.
- `facilities/strength.jpg`: Squat racks, benches and lifting platforms, rubber floor, dramatic overhead lights.
- `facilities/dumbbells.jpg`: Long dumbbell rack with a mirror wall, neatly ordered, moody reflections.
- `facilities/machines.jpg`: Selectorised chest, lat and leg machines in a row, clean and well lit.
- `facilities/functional.jpg`: Turf area with a sled, plyo boxes, a rig and hanging ropes.
- `facilities/lockers.jpg`: Clean dark locker room, black lockers with lime-green numbers, bench, soft warm light.
- `facilities/reception.jpg`: Minimal reception desk with a blank backlit wall panel, plant, dark wood.

## 6. Trainers (3:4, head and shoulders, face in the upper third)
> Studio portrait of a fit [man / woman] in their [30s] wearing a plain black training top, arms folded, confident neutral expression, dark grey backdrop, soft key light with a subtle lime-green rim light, sharp eyes, natural skin texture. Colour (the site converts to black-and-white).

Use real photos of your actual trainers whenever you can. AI faces presented as your staff are misleading and members will notice. Generate only as temporary stand-ins.

## 7. Social share: `images/brand/og.jpg`
1200x630.
> Dark gym scene with a lifter in silhouette on the right and empty dark space on the left for text, lime-green rim light, cinematic. Add the gym name and logo yourself in Canva or Figma.

## 8. Poster: `images/brand/hero-poster.jpg`
No prompt needed. The script extracts it from the hero video. Or export a clean still of the video's best frame at 2560x1440.
