## ADDED Requirements

### Requirement: Latest stock sheet data MUST drive the market list

The demo SHALL render the latest temporary stock universe from the supplied spreadsheet, preserving row order, stock names, streamer aliases, and corresponding game names.

#### Scenario: Market list shows all supplied stocks

- **WHEN** the user opens the market page
- **THEN** the market table contains 44 stock rows
- **AND** the table note reports 44 temporary stocks
- **AND** the final row is `优巨集团` with code `TM-044`

#### Scenario: Corresponding game name is visible

- **WHEN** the user opens a stock detail or trade page
- **THEN** the selected stock shows its corresponding game name from the spreadsheet

### Requirement: Market data MUST remain usable on mobile portrait

The demo SHALL keep the market page in a mobile portrait-width layout while showing the 44-stock list.

#### Scenario: Last stock is reachable by scrolling

- **WHEN** the user scrolls the market table to the bottom on a mobile viewport
- **THEN** the `优巨集团` row is reachable
- **AND** each market row exposes one trade action button
