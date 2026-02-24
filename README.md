# AIedu

HexaOrigin AI Skill OS marketing site MVP (Next.js App Router + Tailwind).

## Homepage Hero illustration update

### What changed
- Implemented a production-ready Hero right-side illustration on `/` with:
  - `<picture>` WebP-first source (`hero-illustration-v1.webp`)
  - PNG fallback (`hero-illustration-v1.png`)
  - fixed-size containers to prevent layout shift
  - error fallback UI that does not block Hero copy/CTA
  - responsive behavior across desktop/tablet/mobile
- Added static assets:
  - `public/images/hero-illustration-v1.webp`
  - `public/images/hero-illustration-v1.png`
- Added CDN-oriented cache headers in `next.config.mjs`:
  - `cache-control: public, max-age=31536000, immutable`

### Responsive behavior
- Desktop (>=1024): image in right column, contain + right-center position.
- Tablet (768-1023): contained illustration with constrained height.
- Mobile (<768): illustration moves under headline, full width, max-height constrained.

### A11y
- Informative alt text is used:
  - `AI-assisted training session with scorecards and analytics dashboards.`

### How to test
1. `npm install`
2. `npm run dev`
3. Open `/` and inspect breakpoints:
   - >=1024
   - 768-1023
   - <768
4. Validate:
   - no stretch/cropping,
   - no Hero layout jump while loading,
   - CTA still visible on mobile first screen,
   - image fallback behavior when image URL is invalid.

### Known gaps
- No backend/auth/payment/integration services (mock-only by design).
- Install/build checks can fail in restricted environments that block npm registry access.
