## Why

The market page now uses a warm tavern style, but other pages still have a cooler blue-heavy look. The user also pointed out that each market row does not need both detail and trade buttons; one action button is enough.

## What Changes

- Make shared pages and components warmer so the whole demo feels like one tavern/card-game UI.
- Keep blue as a secondary button color, but shift surfaces, panels, rankings, and top bars toward brown/gold.
- Replace the market table row's two action buttons with a single primary action button.
- Preserve current stock detail access by keeping the stock name itself clickable.

## Impact

- Affected files:
  - `app.js`
  - `styles.css`
  - verification scripts
- No backend/API changes.
- No dependency changes.
