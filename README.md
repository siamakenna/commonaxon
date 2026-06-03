# CommonAxon

CommonAxon is a standalone prototype for a clean, easy-to-use research app focused on brain health equity, article search, clinical trials, community resources, and reflective STEM advocacy.

## What is included

- Disparity Atlas dashboard with sample disease equity visualizations.
- Research Hub with live PubMed E-utilities search and Sci-Bot article search links.
- AI Translator prototype with patient, advocate, peer, and public-facing summaries.
- Trial Finder with live ClinicalTrials.gov API v2 search.
- Portfolio reflection log with dated research notes, mood/energy tags, user-defined lenses, prompts, GitHub profile link, and resource connector.
- Broad multi-select equity filters for geography, community lens, and data source layers.
- Browser-local prototype accounts, saved searches, research notes, resources, GitHub profile link, JSON backup upload, and CSV/JSON export.

## Run locally

No install is required.

```bash
node server.js
```

Then open `http://localhost:4173`.

You can also open `index.html` directly in a browser, though some live API requests may be more reliable through the local server.

## Production notes

This prototype is not attached to Base44. For production, connect:

- Supabase for auth and database tables.
- FastAPI for secure API proxying and Claude calls.
- Anthropic Claude for science translation.
- PubMed E-utilities for research search.
- ClinicalTrials.gov API v2 for trial search.
- CDC WONDER, AHRQ, and NIH exports for validated disparity data.

## Accessibility and equity notes

The prototype includes broad race, ethnicity, gender, sex, sexuality, disability, language, income, geography, religion, caregiver, immigration, and access lenses. These are interface filters and reflection lenses, not proof that every public dataset supports every category. Production should clearly document which categories are present, missing, aggregated, or suppressed in each dataset.

See `DATA_ARCHITECTURE.md` for schema and service design.

## Accessibility roadmap and implemented upgrades

CommonAxon now treats accessibility as part of the product experience rather than a final visual pass.

Implemented in this prototype:

- Skip link for keyboard users.
- Visible `:focus-visible` states for links, buttons, fields, summaries, and routed content.
- Active navigation uses `aria-current="page"`.
- Accessibility settings panel with large text, high contrast, relaxed reading spacing, plain-language mode, and chart table visibility controls.
- Reduced-motion support through `prefers-reduced-motion`.
- Live regions and busy states for PubMed, ClinicalTrials.gov, translation output, saved searches, resources, and export status.
- Form validation messages connected with `aria-describedby` and `aria-invalid`.
- Table alternatives for Atlas bar charts, map scores, and trend charts.
- Heat-map cells include text labels and priority categories so color is not the only signal.
- Plain-language glossary for common research, data, and clinical-trial terms.
- Trial access snapshots for remote options, compensation, language access, caregiver requirements, and travel burden signals.

Target standard: WCAG 2.2 AA for focus visibility, keyboard navigation, labels, contrast, dynamic updates, nonvisual chart alternatives, reduced motion, and accessible authentication patterns.

## Accessibility testing

Install development dependencies and run the automated accessibility smoke test:

```bash
npm install
npm run test:a11y
```

The Playwright + axe test opens the main routes and checks for detectable accessibility violations. Manual review is still needed for keyboard-only navigation, screen-reader wording, chart interpretation, and plain-language quality.
