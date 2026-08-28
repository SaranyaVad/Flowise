# Return to India — City Guide

A standalone web app to help NRIs plan a move back to India: school fee benchmarks, rent-vs-buy
housing costs, and salary/seniority-level pay bands, plus a calculator that turns a chosen
lifestyle into an estimated monthly budget and required annual CTC.

First version covers **Hyderabad**. The data model (`src/data/*.ts`) is structured so another
city can be added by populating the same shapes (schools, localities, seniority levels) and
switching `CITY` in `src/data/schools.ts`.

## Data

All figures are indicative 2025-26 estimates gathered from public school fee structures, property
listing sites, and salary surveys — not live data. Sources and caveats are noted inline as
comments in the data files. Always confirm current numbers before making a financial decision.

## Develop

```bash
pnpm install
pnpm --filter india-return-app dev      # start dev server (http://localhost:5180)
pnpm --filter india-return-app build    # type-check + production build
```

## Publishing to the Claude Artifact preview

```bash
pnpm --filter india-return-app build:artifact
```

Builds the real app into a single self-contained `dist-artifact/index.html` (JS/CSS inlined,
`vite-plugin-singlefile`, config in `vite.artifact.config.ts`) that can be published directly as
a Claude Artifact — no hand-maintained mirror to keep in sync, since it *is* the compiled app.
Strip the `<!doctype>`/`<html>`/`<head>`/`<body>` wrapper tags before publishing (Artifacts want
flat content). One unavoidable gap: the Artifact sandbox blocks loading external map tile images,
so the Map tab's Leaflet tiles won't render there even though it's the same code — see
`src/components/MapSection.tsx`. Everything else (schools, housing + EMI calculator, salaries,
the lifestyle calculator, currency conversion, common questions) works identically to the real app.
