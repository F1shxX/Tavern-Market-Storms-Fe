## Tasks

- [x] Parse `股票(1).xlsx` and replace `seedTargets` with 44 deterministic demo stocks including `gameName`.
- [x] Update market/detail/trade rendering for dynamic stock count and corresponding game names.
- [x] Enforce the 25% buy limit while preserving sell clamping and live estimate updates.
- [x] Update CSS so longer corresponding names truncate cleanly in the mobile table.
- [x] Update Playwright verification for the 44-stock list and buy/sell order limits.
- [x] Run local verification:
  - `openspec validate update-latest-stock-sheet --strict`
  - `node --check app.js`
  - `node --check scripts/verify-demo.js`
  - `node --check scripts/verify-market-list.js`
  - `node scripts/verify-home-scroll.js`
  - `npm run verify`
