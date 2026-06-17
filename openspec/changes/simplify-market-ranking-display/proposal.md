## Why

The latest boss feedback asks for a cleaner market list and a ranking view that focuses on the player's relative position instead of exposing exact coin totals. The current table still shows stock codes and streamer/game labels, and the ranking list shows raw scores for every simulated player.

## What Changes

- Remove stock codes and streamer/game secondary text from market table rows.
- Keep stock names and group badges visible so grouped stocks remain scannable.
- Split the ranking page into a top-three area and a nearby-ranking area centered on the current account.
- Mask ranking coin totals as `XXXX金币` instead of showing real numeric values.
- Extend Playwright checks for the simplified market rows and masked ranking display.

## Capabilities

### New Capabilities

- `simplified-market-ranking`: The market and ranking screens present cleaner rows, top-three rankings, centered nearby rankings, and masked ranking coins.

### Modified Capabilities

- None.

## Impact

- Affected code: `app.js`, `styles.css`, `scripts/verify-demo.js`, `scripts/verify-market-list.js`.
- No backend API, storage, or dependency changes.
