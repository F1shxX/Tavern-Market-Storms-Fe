## ADDED Requirements

### Requirement: Market page MUST show group boards

The market page SHALL show a dedicated group board for each spreadsheet-defined group, including the group index stock and all member stocks.

#### Scenario: User opens market page

- **WHEN** the user opens the market page
- **THEN** the page shows group cards for 达安集团, 高磁集团, and 优巨集团
- **AND** 达安集团 lists 8 member stocks
- **AND** 高磁集团 lists 3 member stocks
- **AND** 优巨集团 lists 2 member stocks

### Requirement: Group stocks MUST be marked in the market table

The market table SHALL visually mark group index rows and group member rows.

#### Scenario: User scans market rows

- **WHEN** the market table renders
- **THEN** group index rows display a group index label
- **AND** member rows display their owning group label

### Requirement: Stock details MUST include group context

The detail page SHALL show group context when the selected stock is a group index or group member.

#### Scenario: User opens a grouped stock detail

- **WHEN** the user opens a grouped stock detail page
- **THEN** the page shows the related group name
- **AND** the page shows member context for that group
