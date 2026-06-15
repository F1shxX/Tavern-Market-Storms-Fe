## Tasks

- [x] Replace `seedTargets` with the 36 temporary stocks from `股票.xlsx`.
- [x] Add deterministic demo values for price, previous close, score, heat, volume, quote, and trend.
- [x] Update verification to confirm the market page can reach the 36th stock.
- [x] Run local verification:
  - `openspec validate add-thirty-six-market-stocks --strict`
  - `node --check app.js`
  - `node --check scripts/verify-market-list.js`
  - `node scripts/verify-home-scroll.js`
  - `node scripts/verify-market-list.js`
  - `npm run verify`
