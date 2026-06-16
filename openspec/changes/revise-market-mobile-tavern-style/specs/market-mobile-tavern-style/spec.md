# market-mobile-tavern-style Specification

## MODIFIED Requirements

### Requirement: Market page MUST remain mobile portrait

The market page MUST be displayed as a phone-width portrait interface, including when viewed in a desktop browser.

#### Scenario: User opens market page on desktop

- **GIVEN** the viewport is desktop sized
- **WHEN** the user opens the market page
- **THEN** the app shell width is no wider than 430px
- **AND** the market page is scrollable vertically

### Requirement: Market page MUST use tavern game styling

The market page MUST visually match the tavern/card-game direction instead of a light spreadsheet/admin dashboard.

#### Scenario: User views market table

- **GIVEN** the market table is rendered
- **WHEN** the user sees the market page
- **THEN** the table uses dark warm panels with gold trim
- **AND** the page keeps red/green market change colors
- **AND** the rows do not use stock avatar images

### Requirement: Existing market interactions MUST continue to work

The revised market styling MUST preserve the existing stock navigation and trade flow.

#### Scenario: User opens the last stock

- **GIVEN** the user opens the market page
- **WHEN** the user scrolls to the 36th stock and clicks detail
- **THEN** the detail page opens for `TM-036`
