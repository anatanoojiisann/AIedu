# AIedu

HexaOrigin AI Skill OS marketing site MVP (Next.js App Router + Tailwind).

## Third-screen update (Homepage)

### What changed
- Reworked Homepage Screen 3 into four narrative sections:
  1) Hexa Loop methodology stage (dark)
  2) Workflow-native deployment (light)
  3) Enterprise-grade controls (light gray)
  4) 2-week pilot conversion CTA band (deep blue)
- Added dedicated image renderer for Screen 3 visuals with:
  - WebP-first `<picture>` source
  - PNG fallback
  - fixed min-height loading placeholders
  - non-blocking error/empty fallback state
  - `object-fit: contain` and no cropping/stretching

### New image runtime paths
(kept uncommitted on purpose; ignored by git)
- `/images/hexa-loop-v1.webp` + `/images/hexa-loop-v1.png`
- `/images/workflow-native-v1.webp` + `/images/workflow-native-v1.png`

### A11y
- Hexa alt: `Hexa Loop methodology diagram showing a closed-loop training cycle.`
- Workflow alt: `Workflow-native training flow: trigger, practice, score, and dashboard.`

### Cache
- `next.config.mjs` serves `/images/*.webp|png` with:
  - `Cache-Control: public, max-age=31536000, immutable`

### Binary policy
- Binary image files remain excluded from git.
- `.gitignore` includes both wildcard and explicit file-name patterns for the new third-screen assets.

### How to test
1. `npm install`
2. `npm run dev`
3. Open `/` and validate third-screen structure and breakpoints:
   - Desktop (>=1024)
   - Tablet (768-1023)
   - Mobile (<768)
4. Break one image path to verify fallback state does not block copy/CTA.
