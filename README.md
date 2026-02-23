# AIedu

HexaOrigin AI Skill OS marketing site MVP (Next.js App Router + Tailwind).

## Latest refinement

### Removed pages
- Removed `/integrations`
- Removed `/security`
- Removed `/resources`

### Navigation refinement
- Simplified top navigation to focus on core conversion pages:
  - Home
  - Business
  - Pricing
  - Login
- Footer simplified to legal essentials (Privacy / Terms).

### Page refinements
- Home: tightened enterprise story and CTA flow, removed dependencies on removed pages, and kept core proof + pilot narrative.
- Business: removed links to deleted sections and redirected proof/navigation links to active surfaces.
- Pricing: remains track-driven (Business/Individual) with CTA and compare-table behavior.

### CTA behavior
- Lead modal now supports `pricing` as a lead type and keeps shared states:
  validation, loading, simulated error, success, and local save.
- Success next-steps now route to active pages (`/pricing`, `/business`) instead of removed pages.

### How to test
1. `npm install`
2. `npm run dev`
3. Visit `/`, `/business`, `/pricing`, `/login`
4. Verify CTA open/submit behavior and localStorage keys:
   - `hexaorigin.locale`
   - `hexaorigin.leads`
   - `hexaorigin.lastCta`

### Known gaps
- No backend/auth/real payment/integration services (mock-only by design).
- Install/build checks can fail in restricted environments that block npm registry access.
