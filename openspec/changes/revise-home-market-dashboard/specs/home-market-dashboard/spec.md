# home-market-dashboard Specification

## ADDED Requirements

### Requirement: Home Screen Market Overview

The home screen MUST present a market overview instead of personal holdings or official announcements.

#### Scenario: User opens the home screen

- **GIVEN** the user opens the demo
- **WHEN** the home screen is rendered
- **THEN** the screen shows the product title
- **AND** shows the current date
- **AND** shows available virtual coin balance
- **AND** shows a large total market index card
- **AND** shows top 5 gainers
- **AND** shows top 5 losers
- **AND** does not show an official announcement block
- **AND** does not show a personal holding summary block

### Requirement: Market Ranking Lists

The home screen MUST display market ranking lists derived from the current mock market data.

#### Scenario: Market data changes

- **GIVEN** market prices are refreshed
- **WHEN** the home screen is rendered again
- **THEN** the total market index reflects the updated prices
- **AND** the gainer list is sorted by highest percent change first
- **AND** the loser list is sorted by lowest percent change first

### Requirement: Bottom Navigation Labels

The bottom navigation MUST use product-facing labels that match the latest direction.

#### Scenario: User views bottom navigation

- **GIVEN** the bottom navigation is visible
- **WHEN** the user reads the nav labels
- **THEN** the labels include `交易`, `行情`, `持仓`, `排名`, and `社区`
- **AND** the navigation remains pinned to the bottom of the viewport
