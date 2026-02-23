# AIedu

HexaOrigin AI Skill OS marketing-site MVP (Next.js App Router + Tailwind).

## Business vNext update

### What changed (`/business` only)
- Rebuilt the Business page to match required IA order:
  Hero → Outcomes KPI (4 cards) → Use Cases (6 cards) → How it works (3-step stepper + Input/Output/Proof) → Proof Layer → Implementation timelines (2-week/30-day) → Integrations & Controls → ROI Model → FAQ → Final CTA Band.
- Added full CN/EN mirrored copy for all Business sections using locale-aware rendering.
- Added KPI team toggle (Onboarding/Support/Sales/Ops/QA) with mock metric variants and `toggle_change` event logging.
- Added 3-step How-it-works stepper with synchronized right panel and `step_change` event logging.
- Added required CTA coverage on Hero, Implementation A/B cards, and Final CTA band, all wired to shared LeadModal.
- Added required loading/empty patterns in-page:
  - Hero visual placeholder skeleton,
  - Proof visual skeleton,
  - KPI supports `—` fallback and pilot benchmark badge.

### CTA flow and events
- CTA clicks use source values including:
  `hero`, `implementationA`, `implementationB`, `finalBand`, and existing global sources.
- LeadModal flow remains:
  validation → loading (~700ms) → success/error (15% random error) → next steps + saved locally banner.
- Events:
  - `cta_click`
  - `lead_submit_start`
  - `lead_submit_success`
  - `lead_submit_error`
  - `toggle_change`
  - `step_change`

### How to test
1. `npm install`
2. `npm run dev`
3. Open `/business` and verify section order and bilingual content.
4. Test team toggle updates KPI values and logs `toggle_change`.
5. Test stepper changes right content and logs `step_change`.
6. Click CTAs from Hero / Implementation / Final band and verify modal validation/loading/success/error flows.

### Asset placeholder strategy
- Business page uses explicit placeholders for required visuals:
  - I-01 Hero visual placeholder
  - I-04 step diagram placeholders
  - I-05 proof layer placeholder
- These placeholders prevent blank blocks and provide fallback-ready structure until WebP/PNG assets are supplied.

### Known gaps
- No backend/auth/real integrations (mock-only by design).
- Install/build checks can fail in restricted environments that block npm registry access.
