## Context

The demo is a static front-end application. Market rows are rendered from local stock seed data, while rankings are simulated from a small local player list plus the current account's computed total assets.

## Goals / Non-Goals

**Goals:**

- Make each market table row visually simpler by showing only the stock name and any group badge.
- Keep detail and trade pages unchanged, including stock codes where they are useful for verification and drill-down context.
- Show ranking leaders and the current account's surrounding competitors in separate blocks.
- Hide all displayed ranking coin amounts.

**Non-Goals:**

- Adding live leaderboard APIs.
- Changing trading, holdings, or total-asset calculation rules.
- Removing stock code data from the underlying seed list.

## Decisions

- Remove the market row secondary metadata element only from `renderMarketRow`. This keeps detail pages and tests that use stock codes intact.
- Build rankings from a deterministic local dataset and insert the current account score before sorting. This keeps the demo stable while still reflecting player asset changes.
- Use a fixed-size nearby window around the current account, adjusted only at the top or bottom of the ranking list.
- Render all ranking scores through a masked helper so numeric values are not accidentally exposed in either the top-three or nearby lists.

## Risks / Trade-offs

- The ranking list is still simulated rather than backed by real players. Mitigation: label non-current rows as simulated players.
- The current account can appear in both the top-three block and nearby block if its score becomes high enough. Mitigation: keep the nearby block focused on relative context, because that is the requested behavior.
