## Why

The current home screen still contains announcement, personal holding, and streamer wall content, which does not match the latest product direction from the boss. The home screen should be clearer and focus on the market overview: total index, top 5 gainers, top 5 losers, and navigation to trading, market, holdings, and player asset ranking.

## What Changes

- Replace the home screen content with a market-dashboard layout inspired by the provided reference image.
- Remove official announcements and personal holding summary from the home screen.
- Remove the "hot targets" list from the home screen.
- Show a large real-time total market index with date and available virtual coin balance.
- Show top 5 gainers and top 5 losers side by side.
- Rename the bottom navigation label from "收益" to "排名".
- Keep existing market, detail, trading, holdings, ranking, and announcement pages available.
- Keep the visual style adjustable while moving closer to the reference: deep blue board, gold headings, clear red/green lists, large bottom buttons.

## Capabilities

### New Capabilities

- `home-market-dashboard`: Covers the home screen market dashboard and bottom navigation behavior.

### Modified Capabilities

- None.

## Impact

- Affected files:
  - `app.js`
  - `styles.css`
  - `scripts/verify-home-scroll.js`
- No backend/API changes.
- No dependency changes.

