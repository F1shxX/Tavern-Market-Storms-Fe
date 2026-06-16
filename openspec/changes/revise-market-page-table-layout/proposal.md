## Why

The current market page uses avatar cards for each stock, so desktop wide screens show a narrow phone-like column and only a small number of stocks per viewport. The boss requested a more compact, Excel-like stock table without image cards so one page can show more stocks.

## What Changes

- Replace the market page card list with a text-first, dense table layout.
- Remove stock avatars from the market list while keeping detail and holding pages intact.
- Make the market page visually brighter and closer to a trading spreadsheet/dashboard.
- Use wider responsive layout on desktop so the page does not stay as a narrow center strip.
- Keep the 36-stock data, detail navigation, and trading actions working.

## Impact

- Affected files:
  - `app.js`
  - `styles.css`
  - verification scripts
- No backend/API changes.
- No dependency changes.
