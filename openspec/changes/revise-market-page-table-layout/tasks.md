## Tasks

- [x] Replace market card rows with a compact table layout.
- [x] Update responsive CSS so desktop market view uses more width and a brighter table style.
- [x] Update verification for the new table DOM and visible-row density.
- [x] Run local verification:
  - `openspec validate revise-market-page-table-layout --strict`
  - `node --check app.js`
  - `node --check scripts/verify-market-list.js`
  - `node scripts/verify-home-scroll.js`
  - `node scripts/verify-market-list.js`
  - `npm run verify`
