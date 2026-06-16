## Overview

The market page will be redesigned around a table component that prioritizes stock density over decorative cards. It will still be rendered from the existing `targets()` data and keep the same `detail` and `trade` actions.

## UI Direction

- Use a light, warm table surface with stronger contrast against the app shell.
- Keep the bottom navigation and mobile-first interaction model.
- On desktop, allow the app shell to expand beyond the current 430px phone width.
- On the market page, each stock row should be compact and text-based:
  - rank
  - stock name and code
  - latest price
  - percent change
  - volume
  - heat
  - detail/trade actions
- Use sticky table header so users keep column context while scrolling.

## Implementation Notes

- Add a `market-table-screen` class to the market view section.
- Replace `renderMarketRow()` markup with table row markup.
- Keep `.market-row` styles for holdings and rankings compatibility if needed, but market page should use new `.stock-table` styles.
- Update verification to locate `.stock-table tbody tr` instead of `.market-row`.
- Keep screenshots ignored by git.

## Verification

Run existing flow checks plus a market-specific check:

- table has exactly 36 rows
- representative stocks are present
- the 36th stock is reachable after scrolling
- detail page for `TM-036` still opens
