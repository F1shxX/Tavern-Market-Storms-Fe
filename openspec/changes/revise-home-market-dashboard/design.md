## Overview

Revise the static demo home page so it acts as a clear market overview instead of a mixed content page. The home screen will become a single market board:

- Header: product title, date, available coin balance.
- Main index card: total market index and overall percent change.
- Two ranking columns: top 5 gainers and top 5 losers.
- Bottom navigation: transaction, market, holdings, ranking, community/notice.

## UI Structure

The home screen should render:

```text
Title / date / balance
┌─────────────────────────────┐
│ Real-time total index        │
│ 1250.00   +2.35%             │
├──────────────┬──────────────┤
│ Gainers TOP5 │ Losers TOP5  │
│ 1 ...        │ 1 ...        │
│ ...          │ ...          │
└──────────────┴──────────────┘
Bottom nav: 交易 行情 持仓 排名 社区
```

## Data

Use existing mock market targets.

Computed values:

- Total market index: average target price multiplied by 100, rounded to 2 decimals.
- Total market change: average percent change across all targets.
- Gainers: targets sorted by descending percent change.
- Losers: targets sorted by ascending percent change.

If fewer than five targets exist, show all available targets.

## Navigation Labels

The route key can stay `rankings`, but the visible bottom navigation label must become `排名`.

The `announcements` route can stay, but the visible label should be `社区` to match the reference and boss wording. The page can still show announcement/community content in this demo.

## Constraints

- Keep the demo static and local-state based.
- Do not add backend integration in this change.
- Do not remove existing trading functionality.
- Avoid text overlap on 390x844 and narrow mobile widths.

