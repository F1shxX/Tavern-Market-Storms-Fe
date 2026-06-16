## Why

The latest boss-supplied stock sheet updates the temporary market list from 36 to 44 stocks and adds the corresponding in-game names that should be visible in the demo. The sheet also includes trading constraints that need to be reflected in the playable trading flow rather than remaining only as external notes.

## What Changes

- Replace the demo market seed data with the 44 stocks from `股票(1).xlsx`.
- Preserve each row's stock name, streamer name, and corresponding game name in the front-end data model.
- Update the market table and detail/trade pages so the displayed stock count and corresponding game name stay in sync with the data.
- Enforce the rule that a single stock's total exposure cannot exceed 25% of the player's current total assets.
- Keep sell quantity clamped to the user's current holding and keep estimated buy/sell totals updating when quantities change.
- Update Playwright verification to cover the 44-stock list, the newly added last stock, and the buy/sell limits.

## Capabilities

### New Capabilities

- `latest-stock-sheet-data`: The front-end demo renders and trades against the latest 44-stock sheet data, including corresponding game names.
- `trade-order-risk-limits`: The front-end demo enforces order quantity limits from the sheet notes for buy and sell operations.

### Modified Capabilities

- None.

## Impact

- Affected code: `app.js`, `styles.css`, `scripts/verify-demo.js`, `scripts/verify-market-list.js`.
- Affected data: local demo seed data and localStorage schema key.
- No new runtime dependencies or backend API changes.
