## Overview

The warm tavern styling should become shared application styling rather than market-page-only overrides. Market rows will keep a clickable stock name and use one primary action button for trading.

## UI Direction

- Shared shell uses dark wood/brown background.
- Panels use warm brown gradients, gold trim, and beveled highlights.
- Home index/rank panels, holdings, rankings, announcements, and trade cards should feel connected to the market page.
- Bottom navigation remains blue/gold, matching the reference.
- Market table action column should contain one `交易` button.

## Interaction Notes

- Clicking the stock name opens detail.
- Clicking the only row action button opens the trade view.
- Existing buy/sell flow remains unchanged after opening the trade page.

## Verification

- Market table still renders 36 rows.
- Each row has one action button in the action column.
- The last row remains reachable.
- Existing demo buy/sell flow passes.
