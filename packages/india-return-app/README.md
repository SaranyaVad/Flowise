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
