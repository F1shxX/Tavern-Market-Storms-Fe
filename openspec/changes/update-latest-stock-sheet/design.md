## Context

The current front-end demo stores all market targets in `seedTargets` inside `app.js` and merges them with saved localStorage state. The latest spreadsheet contains 44 rows with columns for sequence number, stock name, streamer, and corresponding game name. The sheet notes also define a 25% single-stock investment limit and a sell limit based on current holdings.

## Goals / Non-Goals

**Goals:**

- Import the 44 spreadsheet rows into deterministic demo seed data.
- Keep stock IDs and codes stable as `stock-001` through `stock-044` and `TM-001` through `TM-044`.
- Surface the corresponding game name without making the mobile portrait market table wider.
- Enforce buy and sell limits through the shared input, stepper, estimate, and submit paths.
- Reset old localStorage data to avoid stale 36-stock state.

**Non-Goals:**

- Live leaderboard scraping or real official score integration.
- Season reset automation beyond the existing demo reset flow.
- Backend persistence or Steam release work.

## Decisions

- Store `gameName` on each target and display it as compact secondary text in list/detail/trade views. This preserves the sheet's extra column while keeping the current table structure.
- Generate prices, trends, volume, and heat deterministically from row order. The sheet does not provide live prices, so deterministic values keep screenshots and tests stable.
- Increase the storage key to `v3`. This avoids old browser data carrying 36-stock arrays or renamed rows into the latest demo.
- Calculate buy max from 25% of current total assets minus existing exposure in the selected stock. The submit handler, input handler, and stepper all call the same helper so the UI cannot drift from the actual order limit.
- Keep sell max as current holding quantity. This directly covers the "80 shares cannot sell 90 shares" behavior.

## Risks / Trade-offs

- The official leaderboard rules in the sheet cannot be fully implemented without a data source. Mitigation: keep the demo deterministic and label values as simulated until backend integration exists.
- Existing saved demo states will reset because of the storage key change. Mitigation: this is intentional for an updated temporary stock universe.
- Long corresponding game names may be dense on mobile. Mitigation: use single-line ellipsis in table rows and fuller text in detail/trade pages.
