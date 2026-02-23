# AIedu

HexaOrigin AI Skill OS marketing-site MVP (Next.js App Router + Tailwind).

## Home vNext update

### What changed (home only)
- Rebuilt `/` to follow the required IA order exactly:
  Nav → Hero → Integrations strip → Trust badges → KPI outcomes → Problem/Solution → Hexa Loop → Product modules → Workflow-native → Security & controls → Pilot offer → FAQ → Footer.
- Removed the old **Required states preview** block from Home.
- Added full CN/EN mirrored copy for all Home sections (locale-aware and structure-aligned).
- Updated sticky top nav with compact-on-scroll behavior and both CTA buttons visible.
- Improved CTA flow instrumentation and validation:
  - `cta_click` with `source`, `cta`, `locale`
  - `lead_submit_start`, `lead_submit_success`, `lead_submit_error`
  - required field validation + email format validation
  - submit loading (~700ms), randomized error (15%), success + saved indicator, retry without losing input
- Added optional `section_view` logs for Hero / HexaLoop / Pilot.

### How to test CTA flow
1. `npm install`
2. `npm run dev`
3. Open `/` and click CTA from nav/hero/pilot/security.
4. In modal, test:
   - missing required fields,
   - invalid email,
   - success state (saved banner + next steps),
   - error retry flow (15% random failure; retry keeps data).
5. Inspect localStorage:
   - `hexaorigin.locale`
   - `hexaorigin.leads`
   - `hexaorigin.lastCta`

### Where copy/i18n lives
- Home bilingual copy: `app/page.tsx` (`content.en` / `content.zh`)
- Shared CTA/form labels: `lib/i18n.ts`
- Locale store: `components/locale-context.tsx`

### Known gaps
- No backend/auth/real integrations (mock-only by design).
- Install/build checks can fail in restricted environments that block npm registry access.
