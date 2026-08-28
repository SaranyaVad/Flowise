# Return to India — Project Handoff

This document is a complete record of what has been built so far, how to run and extend it,
and what was deliberately deferred. Anyone starting from this document plus the repository
should be able to reproduce, run, and continue the work without needing prior context.

## 1. What this is

A standalone web app that helps NRIs plan a move back to India: school fee benchmarks, rent-vs-buy
housing costs, salary/seniority pay bands, and a calculator that turns a chosen lifestyle into an
estimated required annual income. First (and currently only) city covered: **Hyderabad**.

It is intentionally a static, self-contained frontend — no backend, no database, no auth. All data
is hard-coded in TypeScript files and shipped with the app.

- **Repository**: `SaranyaVad/Flowise` (this is a fork of the Flowise low-code LLM platform repo;
  this app is unrelated to Flowise's own product and lives in its own package)
- **Branch**: `claude/india-return-info-app-kutwjo`
- **Package location**: `packages/india-return-app`
- **Stack**: React 18 + TypeScript + Vite, Leaflet/react-leaflet for the map. No backend.

## 2. How to run it

```bash
git clone https://github.com/SaranyaVad/Flowise.git
cd Flowise
git checkout claude/india-return-info-app-kutwjo
cd packages/india-return-app
pnpm install
pnpm dev
```

Open `http://localhost:5180`. That's the whole setup — no environment variables, no external
services, no API keys.

Other useful commands (run from `packages/india-return-app`):

```bash
pnpm build      # type-check (tsc -b) + production build to dist/
pnpm preview    # serve the production build locally
pnpm lint       # eslint
```

## 3. What's been built, tab by tab

The app is a single page (`src/App.tsx`) with six tabs. Each tab is one component in
`src/components/`, backed by one or more data files in `src/data/`.

### Schools & Fees (`SchoolsSection.tsx` + `data/schools.ts`)
- **50 schools** across Hyderabad, spanning budget/mid/premium tiers and all major boards
  (CBSE, ICSE, IB, IGCSE, State Board).
- Each entry: name, area, board(s), tier, annual tuition fee range, optional one-time admission
  fee, optional notes, approximate map coordinates, and an informal **1–5 star reputation score**
  with a one-line note.
- The reputation score is explicitly labeled as informal — India has no single official school
  inspection body (no Ofsted equivalent), so it's aggregated from published "best schools" rankings
  and parent-review sites, not an audited measure.
- Filters: tier, board, free-text search (name/area). Shows a live "Showing X of 50" count.

### Rent vs Buy (`HousingSection.tsx` + `data/housing.ts`)
- **50 localities** covering the whole city: IT corridor west (Gachibowli, Financial District,
  Kokapet, Kondapur, Madhapur, Narsingi, Tellapur, Kollur, Mokila, etc.), north/northwest (KPHB,
  Bachupally, Nizampet, Kompally, etc.), northeast (Secunderabad, Sainikpuri, Malkajgiri, etc.),
  east (Nacharam, Dilsukhnagar, LB Nagar, etc.), old city/central (Charminar, Abids, Begumpet,
  Banjara Hills, Somajiguda, etc.), and southeast (Hayathnagar, Shamshabad, etc.).
- Each entry: tier, one-line "known for", 2BHK/3BHK monthly rent range, buy price per sqft range,
  approximate map coordinates.
- Filters: tier, free-text search. Shows a live "Showing X of 50" count.
- Includes a rule-of-thumb EMI illustration (20% down, 8.5% rate, 20-year loan).

### Map (`MapSection.tsx`)
- A real interactive **Leaflet** map (OpenStreetMap tiles by default, CARTO dark-mode tile option)
  plotting all 50 schools and 50 localities as color-coded pins (by tier), with a popup on click
  showing the same fee/rent details as the list views.
- Filters: show schools only / localities only / both; tier.
- **Important caveat**: map tiles require normal outbound internet access. They will not render in
  a sandboxed dev/CI environment with restricted network egress, and they cannot be replicated in a
  Claude Artifact preview (Artifacts block loading image tiles from external hosts as a platform
  content-security policy — this is not fixable from app code). They render correctly on any normal
  developer machine or production deployment.

### Salaries & Seniority (`SalariesSection.tsx` + `data/salaries.ts`)
- 14 seniority levels across 4 career tracks: Tech (Individual Contributor), Tech (Engineering
  Management), Product Management, General Corporate (Ops/Finance/HR/Marketing).
- Each level: typical titles, years of experience, IT-services CTC range (where applicable),
  product-company CTC range, notes (e.g. base-vs-equity composition at senior levels).

### Lifestyle Calculator (`LifestyleCalculator.tsx` + `data/lifestyle.ts` + `calc.ts`)
- Inputs: number of adults, number of school-age kids, lifestyle tier (Modest/Comfortable/Premium),
  school tier, rent-or-buy + locality tier, car ownership, domestic help.
- An expandable "What does this include?" panel breaks down each lifestyle tier's per-adult monthly
  cost by category (groceries, transport, utilities, healthcare, discretionary).
- Buy mode computes a real EMI (20% down, 8.5%/20yr) off the average price/sqft for the chosen
  locality tier and an assumed flat size.
- Output: full monthly budget breakdown, total monthly/annual, target annual take-home (expenses ×
  1.2 savings margin), and the **estimated CTC needed** — accounting for a simple tiered
  take-home-vs-CTC ratio model (tax + PF + typical bonus/equity structure at each income level).

### Common Questions (`InsightsSection.tsx` + `data/insights.ts`)
- 8 recurring themes pulled from NRI/expat community discussions (r/nri, r/developersIndia,
  r/FIRE_ind, TeamBlind's "Return to India" channel) — not official guidance, explicitly labeled
  as community sentiment to plan around.
- Topics: the foreign-salary-to-INR conversion trap, India isn't uniformly cheaper, school fees can
  offset rent savings, pick a home by commute not sentiment, rent before you buy, ~50% of returnees
  reconsider within 5 years, keep foreign visa status active as a backstop, time the move to the
  Indian school year.
- Each item links to the relevant tab (clicking "See Schools & Fees →" switches tabs).

## 4. Data sources used

No live APIs — everything is static, hand-curated from public sources gathered via web research:

- **School fees/rankings**: Yellow Slate, EzySchooling, Invest4Edu "best schools" lists, individual
  school fee-structure pages.
- **Rent/buy prices**: patterns and ranges informed by 99acres, NoBroker, SquareYards listings;
  locality names from Wikipedia's list of Hyderabad neighbourhoods.
- **Salary bands**: aggregated from public salary-guide sites and community-reported ranges (the
  kind of data Glassdoor/AmbitionBox/Levels.fyi/PayScale publish) rather than a single live feed.
- **Common Questions content**: recurring themes from NRI/expat community discussion patterns
  (Reddit-adjacent forums, TeamBlind).

All figures are labeled "indicative 2025–26" throughout the app, with an explicit disclaimer in the
footer to verify before making financial decisions. **None of this data auto-updates** — refreshing
it is a manual research task (see §6).

## 5. The parallel Artifact (shareable preview link)

Because this session runs in a sandboxed container, a `localhost` link isn't reachable from outside
it. A second, self-contained version of the app was built as a single HTML file
(`return-to-hyderabad.html`, vanilla JS, no build step) and published as a Claude Artifact so it can
be opened directly in a browser without cloning/running anything:

**https://claude.ai/code/artifact/690d54eb-8849-4c0b-97af-90a5358ac8c6**

This is a parallel implementation, not the same codebase — it mirrors the same data and logic by
design, generated from the real TS data files to keep them in sync, but changes to one do not
automatically propagate to the other. If the real app's data changes, the artifact needs to be
regenerated separately (see §6).

Because Artifacts block loading external map tile images (platform-level content policy, not
something app code can override), the Artifact's Map tab is a hand-illustrated SVG schematic
instead of a real Leaflet map — it draws the same 100 pins on a stylized layout with Hussain Sagar
lake, the Musi River, and the Outer Ring Road sketched in as landmarks so it reads as "Hyderabad"
rather than an abstract scatter plot. The real app's Map tab (§3) uses genuine map tiles.

## 6. How to extend this

### Add another city
The data model was built to generalize. To add a second city:
1. Duplicate the shape of `data/schools.ts`, `data/housing.ts` with the new city's schools/localities
   (same fields: tier, fee/rent ranges, coordinates, etc.).
2. Either add a city switcher (a new top-level dropdown/tab that swaps which data file is active) or
   split each data file into per-city modules keyed by a `city` field and filter by it.
3. Update `CITY` in `data/schools.ts` (currently a single hardcoded constant) to be dynamic.
4. Re-run the coordinate/bounds logic in `MapSection.tsx` — it already computes bounds dynamically
   from whatever points are present, so it should adapt without changes.

Likely next cities based on where NRIs most commonly return to: Bengaluru, Mumbai, Delhi NCR,
Chennai, Pune.

### Refresh the data
There's no live feed — refreshing fee/rent/salary figures means re-running the same kind of web
research documented in §4 and manually updating the arrays in `data/*.ts`. Consider re-checking
annually at minimum (school fees alone rise ~8–10%/year per the in-app disclaimers).

### Regenerate the Artifact after a real-app data change
The Artifact's `schools`/`localities` arrays were generated from the TS source via esbuild + a
small transform script (converts field names like `annualTuitionFeeINR` → `fee`,
`reputationScore` → `rating`, etc.). If you update `data/schools.ts` or `data/housing.ts`, the
Artifact needs the same transform re-run and re-published — it will not pick up changes on its own.

## 7. Deferred / "for later" — not built

These were explicitly raised during the project but intentionally **not** started, since they
require real backend infrastructure that this static app doesn't have:

- **NRI networking / "book a call" feature.** The idea: people can opt in to a directory (e.g. NRIs
  who've already moved back, or local experts), and others can book a call with them through the
  website instead of exchanging phone numbers directly. This would need:
  - User accounts/auth (sign-up, login, profile management)
  - A directory/listing system with search and enrollment
  - A booking/calendar system (availability, scheduling, timezone handling)
  - Likely a real backend + database (this app currently has neither) — e.g. Supabase/Firebase for
    a fast path, or a proper Node/Postgres backend if this repo's existing `packages/server`
    patterns should be reused
  - Privacy/safety design for a two-sided marketplace where one side is giving out contact access
  - Possibly payments if calls are ever monetized
  - This is a substantial phase of work on its own and should be scoped separately before starting.

- **Multi-city coverage.** Only Hyderabad is built. The original ask was "return to India from any
  country" (i.e., origin country doesn't affect destination-side content) with city chosen as the
  starting scope — Bengaluru, Mumbai, Delhi NCR, Chennai are natural next cities (see §6).

- **Live/current data instead of static snapshots.** Not raised as an explicit requirement, but
  worth flagging: fee/rent/salary figures will drift out of date. A future phase could look at
  periodic scraping or a lightweight admin-editable data source instead of hardcoded TS files —
  but that's a meaningful scope increase (needs a backend either way) and wasn't asked for.

## 8. Commit history on this branch

```
c5e5dfb Expand to 50 schools and 50 localities citywide, add search
6d54273 Add map view, school ratings, and a Common Questions section
5e61608 Add expandable lifestyle-tier breakdown to the calculator
cc7f35c Add Return to India (Hyderabad) relocation guide app
```

No pull request has been opened yet — all work is pushed to the branch above, ready for one when
requested.
