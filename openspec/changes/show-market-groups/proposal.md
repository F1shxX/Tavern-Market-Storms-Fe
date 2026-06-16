## Why

The latest stock sheet uses color-coded groups, but the current demo only shows a flat 44-stock table. The boss needs group stocks to stand out and needs a quick way to see which stocks belong to each group.

## What Changes

- Add a dedicated group board to the market page for 达安集团, 高磁集团, and 优巨集团.
- Show each group's index stock separately from its member stocks.
- Mark group index rows and member rows in the market table with group-colored labels.
- Add group membership context to stock detail pages.
- Update Playwright verification to cover group cards, member counts, and group row labels.

## Capabilities

### New Capabilities

- `market-group-display`: The market page exposes group index stocks and member lists from the latest stock sheet.

### Modified Capabilities

- None.

## Impact

- Affected code: `app.js`, `styles.css`, `scripts/verify-market-list.js`.
- No new dependencies or backend API changes.
