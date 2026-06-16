# market-page-density Specification

## MODIFIED Requirements

### Requirement: Market page MUST use a compact stock table

The market page MUST display stocks in a text-first table layout instead of image card rows.

#### Scenario: User opens market page

- **GIVEN** the user opens the market page
- **WHEN** the market list is rendered
- **THEN** the page displays a table with 36 stock rows
- **AND** the rows do not use stock avatar images
- **AND** the table includes stock name, code, price, change, volume, heat, and actions

### Requirement: Market page MUST show more stocks per viewport

The market page MUST be denser than the previous avatar card layout.

#### Scenario: User views the market page on desktop

- **GIVEN** the user opens the market page on a desktop-sized viewport
- **WHEN** the table is visible
- **THEN** at least 12 stock rows are visible in the viewport without opening detail pages
- **AND** the 36th stock remains reachable by scrolling

### Requirement: Existing trading navigation MUST continue to work

The table layout MUST preserve existing detail and trading navigation.

#### Scenario: User opens a stock from the table

- **GIVEN** the user opens the market page
- **WHEN** the user clicks the detail action on a stock row
- **THEN** the stock detail page opens for that stock
