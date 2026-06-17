## ADDED Requirements

### Requirement: Market rows MUST hide secondary stock metadata

The market table SHALL show each stock row with the stock name and any group badge, without displaying the stock code or streamer/game secondary text in the row.

#### Scenario: User scans the market table

- **WHEN** the user opens the market page
- **THEN** each stock row shows the stock name
- **AND** group stocks still show their group badge
- **AND** stock codes and streamer/game labels are not visible in the market row name area

### Requirement: Ranking page MUST show leaders and nearby player context

The ranking page SHALL show the top three ranked players separately from a nearby ranking list centered on the current account.

#### Scenario: User opens the ranking page

- **WHEN** the user opens the ranking page
- **THEN** the page shows exactly three top-ranked players in the leader section
- **AND** the nearby ranking section contains the current account
- **AND** the nearby ranking section includes players immediately before and after the current account when available

### Requirement: Ranking coin totals MUST be masked

The ranking page SHALL mask displayed coin totals for all ranking entries.

#### Scenario: User reads ranking scores

- **WHEN** ranking rows are rendered
- **THEN** every ranking score displays as `XXXX金币`
- **AND** no real numeric coin totals are visible in ranking rows
