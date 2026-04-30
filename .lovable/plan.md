## Goal

Bring the three pages from **Remix of CEIP** into this CEIP project and fully rewrite their content for the Croatian companies context (CEIP brand, FINA 2024 enterprise figures, real Croatian fabricators like Đuro Đaković, Končar, Brodosplit, Rimac, AD Plastik, Dalekovod, EN 1090-2 / ISO 3834-2 standards).

Pages to import:
1. `src/pages/AboutUs.tsx` (418 lines in source)
2. `src/pages/ScanProPlus.tsx` (1,897 lines in source — the largest)
3. `src/pages/GroundIntelligence.tsx` (515 lines — this is the "inspection" page in Remix; its old `/lng-inspection` route already redirects here)

## What changes

### 1. Page imports + supporting files

For each page, copy from Remix of CEIP and:
- Bring along any **missing subcomponents** the page imports (e.g. `src/components/scanpro/*` — `SampleAuditReportPreview`, `BrokenCompromiseSection`, `ThreeLayerPlatformSection`, `HeadlineKpiBand`, `AtlasAIProvenance`, `OnboardingStepsSection`).
- Bring along any **missing image assets** referenced (industry/auditor/checkpoint/scanpro photos, blueprints, world maps).
- Bring along **translation strings** used (e.g. `t.groundIntelligence`, `t.lngInspectionPage`) into `src/translations/en.ts`.
- Reuse components that already exist in this project as-is (Navigation, PageSEO, ROICalculator, charts, modals, Earth3D, etc.).

### 2. Croatian content adaptation (the actual work after import)

Rewrite every piece of copy so the pages are unmistakably about Croatian industry, not generic "YVOO" or "AKCP / Austria-Kazakhstan":

**AboutUs**
- Brand: YVOO Technologies → **CEIP (Croatian Enterprise Intelligence Platform)**, government-backed export initiative.
- Founding story: Zagreb-based, partnered with FINA, HGK (Croatian Chamber of Economy), and HBOR.
- Timeline 2023–2026: foundation in Zagreb → onboarding of 162,000+ Croatian companies from FINA 2024 register → Atlas AI launch with VDA 6.3 / EN 1090-2 / ISO 3834-2 verification → first international buyer deals (BMW, Linde, Siemens Energy).
- Mission/values reframed around boosting Croatian exports.

**ScanProPlus**
- Reposition as the **CEIP audit & inspection product for Croatian suppliers** serving EU OEMs.
- All sample suppliers, NCRs, and case studies use real Croatian fabricators: Đuro Đaković (Slavonski Brod), Končar (Zagreb), Brodosplit (Split), Rimac Technology (Sveta Nedelja), AD Plastik (Solin), Dalekovod (Zagreb).
- KPI band, ROI calculator inputs, and dashboards calibrated to Croatian market sizing (FINA 2024: 492 large, 2,157 medium, 17,228 small, 142,258 micro enterprises).
- Industry strips: heavy steel (Slavonski Brod), shipbuilding (Split/Pula), energy/transformers (Končar), automotive trim (AD Plastik), EV/battery (Rimac), transmission towers (Dalekovod).
- Compliance modals: EN 1090-2, EN ISO 3834-2, IATF 16949, VDA 6.3, IEC 60076, DNV GL, UN ECE R100.
- Sample audit report preview uses a Croatian supplier example.

**GroundIntelligence (the inspection page)**
- Title/SEO: replace "YVOO for AKCP — Austria, Kazakhstan, Middle Corridor" with **"CEIP On-Site Inspection — Verified Croatian Suppliers for EU & Global Buyers"**.
- Deployment radius: Croatia and the wider Adriatic / CEE region (48–72h to any Croatian county and neighboring markets — Slovenia, Hungary, BiH, Serbia, Italy).
- Auditor network sized to the Croatian context (lead auditors registered with HGK, NDT Level III inspectors from Croatian Welding Society / HDTZ, etc.).
- Checkpoint cards (machine park, measurement systems, process capability, capacity, material stock, HSE, equipment intelligence, expert on-site) all illustrated with Croatian supplier scenarios.
- Demo dashboard (`LNGInspectionDashboard`) — already Croatian-themed, keep as is and ensure it stays wired in.

### 3. Routing

`src/App.tsx` already has `/about-us`, `/scanpro-plus`, `/ground-intelligence`, and `/lng-inspection` routes — no route changes needed. The existing `/lng-inspection` page stays (it's the live demo dashboard), and `/ground-intelligence` becomes the imported inspection landing page.

### 4. Navigation

Add a "Ground Intelligence" entry to the dropdown in `src/components/Navigation.tsx` (currently it links to LNG Inspection / Atlas / Live Audit / ScanPro+ Report only) so the imported page is reachable.

## Technical details

- Files copied via `cross_project--copy_project_asset` for binary assets and `cross_project--read_project_file` + `code--write` for source files.
- After copying, every file is reviewed and copy strings are rewritten in-place — no leftover "YVOO", "AKCP", "Austria/Kazakhstan", or generic auditor names.
- `src/translations/en.ts` extended with `groundIntelligence` and `lngInspectionPage` blocks consumed by the new GroundIntelligence page.
- Any cross-page references (e.g. ScanProPlus linking to AboutUs / GroundIntelligence CTAs) updated to local routes.
- No backend / database changes. No new npm packages expected (all source pages use libraries already in this project: framer-motion, lucide-react, react-router, recharts).

## Out of scope

- No changes to Atlas AI app (`/atlas/*`), AuditReport, or other existing pages.
- No PDF generation work (separate from these page imports).
- No design-system token changes — pages will inherit the current CEIP theme.

## Deliverable

After approval, switching to build mode and executing: 3 fully rewritten pages + supporting components/assets/translations, all reachable from the navigation, all copy in Croatian-companies context.
