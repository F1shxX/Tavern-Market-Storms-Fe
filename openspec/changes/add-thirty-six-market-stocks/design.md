## Overview

The demo currently keeps market target data inside `app.js` as `seedTargets`. This change updates that seed data to include the 36 temporary stocks from the provided spreadsheet.

## Data Mapping

Spreadsheet columns:

- `序号` -> display/order index
- `名称` -> stock display name
- `主播` -> streamer/source name used in quote/description
- `股票介绍` -> currently empty; generate a short placeholder quote for demo use

Generated fields:

- `id`: stable ASCII slug such as `stock-001`
- `code`: `TM-001` through `TM-036`
- `alias`: streamer name
- `price`: deterministic demo price
- `prevClose`: deterministic demo previous close
- `score`: `price * 1000`
- `volume`: deterministic demo volume
- `heat`: deterministic demo heat
- `avatar`: reused local SVG avatar assets in rotation
- `quote`: generated from stock and streamer name
- `trend`: deterministic 7-day trend array

## Compatibility

Existing localStorage may contain an older `targets` array. The existing `mergeTargets()` function already maps the current `seedTargets` and only uses saved data when an ID matches. Since new IDs are introduced, the new 36-stock set will be used cleanly.

## Verification

Verification should confirm:

- The market page includes representative items from the 36-stock list.
- The 36th item is reachable after scrolling.
- Existing buy/sell flow still works.
