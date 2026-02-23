# AIedu

HexaOrigin AI Skill OS marketing-site MVP built with Next.js App Router + Tailwind, focused on B2B demo/pilot conversion and procurement trust.

## What changed
- Added a full multi-page bilingual marketing site: Home, Business, Integrations, Pricing, Security, Resources, Login, and custom 404.
- Implemented a locale context (EN/ZH) with localStorage persistence.
- Added reusable conversion modal (`Book a demo` / `Start a pilot`) with:
  - lightweight form validation,
  - loading state (~700ms simulated delay),
  - error state (random 15% failure),
  - success state with next-step CTAs,
  - localStorage lead persistence (last 20 records),
  - CTA + submit event logging to console.
- Added explicit loading/empty/error/success state examples on every required page.
- Applied “Cosmic Enterprise” visual direction using a dark hero / light body split and restrained neon accents.

## How to test
1. `npm install`
2. `npm run dev`
3. Visit:
   - `/`
   - `/business`
   - `/integrations`
   - `/pricing`
   - `/security`
   - `/resources`
   - `/login`
   - any unknown route for `404`
4. Confirm any primary CTA opens the lead modal and submitting stores data in localStorage keys:
   - `hexaorigin.locale`
   - `hexaorigin.leads`
   - `hexaorigin.lastCta`

## Known gaps
- No backend/auth/real integrations (intentionally mocked for MVP).
- Accessibility and advanced mobile nav polish can be improved in next iteration.
- Build/test commands could not be executed in this environment due npm registry access restrictions.
