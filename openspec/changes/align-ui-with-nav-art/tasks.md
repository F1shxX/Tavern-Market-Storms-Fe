## Tasks

- [x] Add shared CSS variables and outline text utilities matching the nav art.
- [x] Restyle global headings, top bars, panels, and major numeric displays.
- [x] Restyle market table, group cards, and action buttons while preserving density.
- [x] Restyle detail/trade/holding surfaces for the same font and gold-frame treatment.
- [x] Run local verification:
  - `openspec validate align-ui-with-nav-art --strict`
  - `node --check app.js`
  - `node --check scripts/verify-demo.js`
  - `node --check scripts/verify-market-list.js`
  - `node scripts/verify-home-scroll.js`
  - `npm run verify`
