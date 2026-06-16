## Tasks

- [x] Replace the market row two-button action cell with one primary trade button.
- [x] Warm up shared shell, topbar, panels, rankings, holdings, announcements, and trade controls.
- [x] Update verification to assert one market row action button.
- [x] Run local verification:
  - `openspec validate unify-warm-tavern-ui --strict`
  - `node --check app.js`
  - `node --check scripts/verify-market-list.js`
  - `node scripts/verify-home-scroll.js`
  - `node scripts/verify-market-list.js`
  - `npm run verify`
