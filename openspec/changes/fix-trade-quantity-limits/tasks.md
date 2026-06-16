## Tasks

- [x] Add shared helpers for trade quantity limits and estimate calculation.
- [x] Update trade rendering so inputs expose max values and estimates are addressable.
- [x] Add input/change handling so estimates update and quantities clamp live.
- [x] Update submit and step handlers to use the same clamps.
- [x] Update verification for estimate updates and sell limit behavior.
- [x] Run local verification:
  - `openspec validate fix-trade-quantity-limits --strict`
  - `node --check app.js`
  - `node --check scripts/verify-demo.js`
  - `node --check scripts/verify-market-list.js`
  - `node scripts/verify-home-scroll.js`
  - `npm run verify`
