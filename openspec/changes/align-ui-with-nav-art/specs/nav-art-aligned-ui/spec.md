## ADDED Requirements

### Requirement: Main UI MUST visually align with bottom nav art

The app SHALL use typography, outlines, borders, and colors that match the supplied bottom navigation button art.

#### Scenario: User views the home screen

- **WHEN** the home screen renders
- **THEN** key titles and large values use cream-colored heavy text with dark outline styling
- **AND** panels use dark wood and gold-frame styling consistent with the bottom buttons

### Requirement: Dense market UI MUST remain readable

The market table and group sections SHALL remain readable on mobile portrait after the style update.

#### Scenario: User opens the market page on mobile

- **WHEN** the market page renders
- **THEN** the table remains within the mobile app shell
- **AND** group cards and table rows remain readable without horizontal overflow

### Requirement: Existing navigation and trade flows MUST remain unchanged

The visual restyle SHALL NOT change tab destinations, trading behavior, stock data, or verification flows.

#### Scenario: User runs demo verification

- **WHEN** the automated demo flow runs
- **THEN** navigation, trading, market list, and home layout checks still pass
