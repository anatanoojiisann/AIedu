# AIedu

HexaOrigin AI Skill OS marketing site MVP (Next.js App Router + Tailwind).

## Second-screen update: System Breakdown vs Closed-Loop System

### What changed (`/` only)
- Added a new comparison section right below Hero:
  - Title + subtitle
  - Before vs After illustration area
  - Left/Right system bullets
  - Center micro CTA link
- Implemented responsive layout behavior:
  - Desktop: two columns with 48/52 weighting
  - Tablet/mobile: stacked layout
- Implemented image rendering strategy with resilient fallbacks:
  - WebP preferred
  - PNG fallback
  - If image still fails, section keeps text + CTA and shows non-blocking fallback state
- Added structure-focused dark tech background blend with radial glows.

### Image behavior guarantees
- `object-fit: contain` (no crop / no stretch)
- fixed min-height containers (loading without layout jump)
- mobile visual capped with `max-h-[60vh]` to avoid overlong first reading flow

### Accessibility
- Informative alt text configured for both images:
  - Before: fragmented/disconnected system
  - After: closed-loop system with retraining cycle and execution

### Cache strategy
- `next.config.mjs` sets image headers to:
  - `Cache-Control: public, max-age=31536000, immutable`
- Versioning strategy: bump filename (`-v2` or hash) when images update.

### Binary policy
- As requested, binary image files are not committed.
- `.gitignore` already includes `public/images/*.png` and `public/images/*.webp`.
- Put these files locally/CDN at runtime:
  - `public/images/system-compare-before-v1.webp`
  - `public/images/system-compare-before-v1.png`
  - `public/images/system-compare-after-v1.webp`
  - `public/images/system-compare-after-v1.png`

### How to test
1. `npm install`
2. `npm run dev`
3. Open `/` and validate second screen at breakpoints:
   - Desktop (>=1024)
   - Tablet (768-1023)
   - Mobile (<768)
4. Optional failure test:
   - Temporarily rename one compare image and verify text/CTA still render with fallback state.
