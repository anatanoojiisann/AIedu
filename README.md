# AIedu

HexaOrigin AI Skill OS marketing-site MVP (Next.js App Router + Tailwind).

## Pricing vNext update

### What changed (`/pricing` only)
- Rebuilt Pricing page with required IA order:
  Pricing Hero + track toggle → Plan cards → Compare table → Pricing drivers → Pilot Offer (Business only) → Add-ons & Services (Business only) → Procurement & Billing (Business only) → Upgrade to Business band (Individual only) → Final CTA band.
- Implemented Business/Individual track toggle with default `Business` and synchronized section switching.
- Added light loading transition (180ms skeleton) when switching tracks.
- Added full CN/EN copy blocks for pricing hero, conditional sections, and final CTA content.

### CTA behavior mapping
- Business track
  - Request pricing → `LeadModalTrigger(type="pricing")`
  - Start a 2-week pilot → `LeadModalTrigger(type="pilot")`
  - Contact sales / Book demo paths → `LeadModalTrigger(type="demo")`
- Individual track
  - Start free / Upgrade to Pro → `LeadModalTrigger(type="demo")` (placeholder conversion flow)
- All CTA clicks log:
  - `pricing_cta_click` with `cta`, `track`, `section`, `locale`

### Events and state handling
- Added pricing events:
  - `pricing_track_view`
  - `pricing_track_toggle`
  - `pricing_cta_click`
- Lead modal events remain enabled:
  - `lead_submit_start` / `lead_submit_success` / `lead_submit_error`
- Required states covered:
  - Loading: track switch skeleton
  - Empty: compare table uses `—` / `Business only`
  - Error: lead submit random 15% failure with retry-safe form state
  - Success: lead success with saved-locally indicator

### Compare table data and extension
- Compare table data currently lives inline in `app/pricing/page.tsx` for both tracks.
- To extend: move row/group arrays into `lib/pricing-data.ts` and keep `CompareTable` rendering schema unchanged.

### How to test
1. `npm install`
2. `npm run dev`
3. Open `/pricing` and verify default track is Business.
4. Toggle to Individual and confirm Hero CTA, plan cards, compare table, conditional sections, and final band all switch consistently.
5. Click each CTA and verify modal opens + logs + submit flow states.

### Known gaps
- No backend/auth/real payment/subscription system (mock-only by design).
- Install/build checks can fail in restricted environments that block npm registry access.
