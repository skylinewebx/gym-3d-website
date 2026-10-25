#!/usr/bin/env bash
# Turns 4K/8K masters into web-optimised files.
#
# Usage:
#   scripts/optimize-media.sh video  media-src/hero-master.mp4        # -> public/video/hero-{720,1080,1440,2160}.{av1.mp4,webm,mp4} + poster
#   scripts/optimize-media.sh images media-src/images public/images   # -> resized 2560px-wide JPG masters (Next.js then serves AVIF/WebP)
#
# Needs ffmpeg (with libx264, libvpx-vp9, and optionally libsvtav1). Install: https://ffmpeg.org/download.html
# Keep originals OUT of /public (use /media-src, which is git-ignored). Never ship raw 8K.
#
# FPS: set FPS=60 for the smoothest hero loops (default 30). Slow-motion footage shot at 120-240fps
# is fine as a source; it is exported to FPS here.
set -euo pipefail

FPS="${FPS:-30}"
OUT_VIDEO="${OUT_VIDEO:-public/video}"
command -v ffmpeg >/dev/null || { echo "ffmpeg not found"; exit 1; }
has_enc() { ffmpeg -hide_banner -encoders 2>/dev/null | grep -q "$1"; }

video() {
  local src="$1"; mkdir -p "$OUT_VIDEO"
  # tier:height:crf-h264:crf-vp9:crf-av1:maxrate
  for t in "720:720:26:34:36:2500k" "1080:1080:23:31:34:6000k" "1440:1440:22:30:33:11000k" "2160:2160:21:29:32:22000k"; do
    IFS=: read -r name h c264 cvp9 cav1 maxr <<<"$t"
    local vf="scale=-2:'min($h,ih)':flags=lanczos,fps=$FPS,format=yuv420p"
    echo ">> hero-$name"
    # H.264 MP4: universal fallback (faststart so playback begins before the download ends)
    ffmpeg -y -loglevel error -i "$src" -an -vf "$vf" -c:v libx264 -preset slow -crf "$c264" -maxrate "$maxr" -bufsize "$maxr" -profile:v high -movflags +faststart "$OUT_VIDEO/hero-$name.mp4"
    # VP9 WebM
    if has_enc libvpx-vp9; then
      ffmpeg -y -loglevel error -i "$src" -an -vf "$vf" -c:v libvpx-vp9 -b:v 0 -crf "$cvp9" -row-mt 1 -cpu-used 2 "$OUT_VIDEO/hero-$name.webm"
    fi
    # AV1 (smallest; browsers pick it first when supported)
    if has_enc libsvtav1; then
      ffmpeg -y -loglevel error -i "$src" -an -vf "$vf" -c:v libsvtav1 -preset 6 -crf "$cav1" -movflags +faststart "$OUT_VIDEO/hero-$name.av1.mp4"
    fi
  done
  # Poster (shown while loading, on slow links and for reduced motion)
  mkdir -p public/images/brand
  ffmpeg -y -loglevel error -ss 1 -i "$src" -frames:v 1 -vf "scale=2560:-2:flags=lanczos" -q:v 2 public/images/brand/hero-poster.jpg
  echo "Done. Check sizes: ls -lh $OUT_VIDEO"
}

images() {
  local in="$1" out="$2"
  find "$in" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' -o -iname '*.webp' -o -iname '*.tif*' \) | while read -r f; do
    rel="${f#"$in"/}"; dest="$out/${rel%.*}.jpg"; mkdir -p "$(dirname "$dest")"
    # Cap at 2560px wide (never upscale). q:v 2 is visually lossless; Next.js serves AVIF/WebP at request time.
    ffmpeg -y -loglevel error -i "$f" -vf "scale='min(2560,iw)':-2:flags=lanczos" -q:v 2 "$dest"
    echo "   $dest"
  done
}

case "${1:-}" in
  video)  video  "${2:?source video required}" ;;
  images) images "${2:?input dir required}" "${3:-public/images}" ;;
  *) sed -n '2,14p' "$0"; exit 1 ;;
esac
