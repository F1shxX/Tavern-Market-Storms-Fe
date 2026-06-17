## Context

The current frontend is a static single-page demo using local seed data and saved state. The backend will expose a CORS-enabled leaderboard snapshot because the official Blizzard endpoint cannot be consumed directly from GitHub Pages.

## Goals / Non-Goals

**Goals:**

- Sync stock scores when the backend leaderboard endpoint is available.
- Preserve the existing demo behavior when the backend is unavailable.
- Apply matched official score changes as unified stock movement: score, price, previous close, trend, heat, and volume move together.
- Keep unmatched stocks below the current top-500 floor score.

**Non-Goals:**

- Adding user-visible official battle tags back to the market list.
- Replacing local trading or holdings logic with backend trading APIs.
- Guaranteeing perfect identity matching without official stable player IDs.

## Decisions

- Keep the frontend stock list local and enrich it with leaderboard-derived values at runtime.
- Match names using normalized `gameName`, `alias`, and small explicit `leaderboardNames` aliases where punctuation differs.
- Compute price as `score / 1000` so existing trading and display logic continue to work.
- Store sync metadata in `state.marketSync` and show it in the market header.
- Use `http://127.0.0.1:3001` as the local default API base, with `window.TMS_API_BASE_URL` override for deployed backends.
- On GitHub Pages, use `data/battlegrounds-leaderboard.json` as a same-origin fallback because no public backend URL exists yet.
- Add a scheduled GitHub Action to refresh the static snapshot periodically and commit it back to the frontend repo.
- For unmatched stocks, generate a deterministic random score in a band below `floorScore` and cap it at `floorScore - 1`.

## Risks / Trade-offs

- Name matching can miss players whose displayed battle tags changed. Mitigation: explicit aliases can be added per stock.
- GitHub Pages static snapshots are not true push-based realtime. Mitigation: keep backend support for realtime local/deployed use and refresh the static JSON on a schedule.
- Updating saved target data may preserve old demo values. Mitigation: merge new seed fields and apply runtime sync when available.
