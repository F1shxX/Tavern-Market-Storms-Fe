# unified-tavern-ui Specification

## MODIFIED Requirements

### Requirement: Shared pages MUST use warm tavern styling

The frontend demo MUST apply a unified warm tavern/card-game style across the main pages.

#### Scenario: User navigates between pages

- **GIVEN** the user opens home, market, holdings, ranking, or community pages
- **WHEN** the page is rendered
- **THEN** the page uses warm dark surfaces, gold accents, and game-like panel styling
- **AND** the bottom navigation remains visually consistent

### Requirement: Market row action MUST be single-button

The market table MUST use one row action button while preserving detail navigation from the stock name.

#### Scenario: User opens the market table

- **GIVEN** the user opens the market page
- **WHEN** the table rows are rendered
- **THEN** each row action cell contains exactly one action button
- **AND** the stock name remains clickable for opening detail
- **AND** the row action button opens trading
