## Context

The spreadsheet marks group membership by cell color in the corresponding game name column. Blue entries belong to 达安集团, yellow entries belong to 高磁集团, and green entries belong to 优巨集团. Rows 6, 39, and 44 are group index stocks whose game-name notes say they are the average of their colored member stocks.

## Goals / Non-Goals

**Goals:**

- Keep the existing 44-row stock table and trading flow.
- Add a compact group summary above the market table.
- Clearly distinguish group index stocks from ordinary member stocks.
- Let users tap group members or group index stocks to navigate to details.

**Non-Goals:**

- Auto-calculating group index prices from member prices in this front-end-only demo.
- Adding filters, sorting, or a new page.
- Changing the current trading rules.

## Decisions

- Store group definitions in a small `marketGroups` constant keyed by stable stock IDs. This keeps group membership independent from saved price simulation state.
- Exclude the group index stock from the displayed member list. The group card shows the index stock at the top and member chips below it.
- Use table row classes and compact badges for group labels so the mobile table remains portrait-width.

## Risks / Trade-offs

- Group membership must be manually updated if the spreadsheet changes again. Mitigation: keep the group definition next to the market seed data and verify member counts in Playwright.
- Long member names may make the group board tall. Mitigation: use compact chips with ellipsis and a vertical layout suited for mobile scrolling.
