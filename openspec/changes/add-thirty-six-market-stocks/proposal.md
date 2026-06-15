## Why

The current market page only contains a small mock set of targets. The boss provided a temporary list of 36 stocks that should be visible in the market list so the demo reflects the planned product inventory.

## What Changes

- Replace the current limited mock market target list with the 36 temporary stocks from `股票.xlsx`.
- Preserve the existing demo trading flow, detail page, holdings, ranking, and localStorage behavior.
- Generate demo price, score, heat, volume, avatar, quote, and 7-day trend values for the new stocks.
- Keep the market page scrollable and able to show all 36 entries.

## Capabilities

### New Capabilities

- None.

### Modified Capabilities

- `market-target-data`: The frontend mock market data must include all 36 temporary stocks.

## Impact

- Affected files:
  - `app.js`
  - verification scripts
- No backend/API changes.
- No dependency changes.
