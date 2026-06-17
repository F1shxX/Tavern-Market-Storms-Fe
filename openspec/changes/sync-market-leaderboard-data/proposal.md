## Why

Market data should follow the official Hearthstone Battlegrounds `酒馆战棋` / `第13赛季` leaderboard. Stocks with matching leaderboard names should move with their official score changes, while stocks outside the top 500 should remain below the top-500 floor and use constrained random movement.

## What Changes

- Add frontend support for fetching backend leaderboard snapshots.
- Add a static snapshot fallback for GitHub Pages, refreshed by a scheduled GitHub Action.
- Map each local stock's game name and alias to leaderboard battle tags.
- Update market target scores and prices from official scores when matched.
- Treat unmatched stocks as outside the top 500 and keep their random score below the `floorScore` threshold.
- Recalculate group index stocks from their member stocks after synchronization.
- Add market UI metadata showing the leaderboard sync source and update time.

## Capabilities

### New Capabilities

- `market-leaderboard-score-sync`: The market screen synchronizes stock scores from backend Battlegrounds leaderboard snapshots.

### Modified Capabilities

- None.

## Impact

- Affected code: `app.js`, `styles.css`, `scripts/verify-market-list.js`, `scripts/verify-demo.js`, frontend docs.
- Uses `http://127.0.0.1:3101/api/leaderboard/battlegrounds` during local development.
- Uses `data/battlegrounds-leaderboard.json` as the GitHub Pages fallback unless `window.TMS_API_BASE_URL` points to a deployed backend.
