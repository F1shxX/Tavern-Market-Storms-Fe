## ADDED Requirements

### Requirement: Buy orders MUST respect the 25 percent single-stock exposure limit

The demo SHALL prevent a stock's total exposure from exceeding 25% of the player's current total assets.

#### Scenario: User enters buy quantity above the allowed investment limit

- **GIVEN** the user opens a stock trade page
- **WHEN** the user enters a buy quantity that would push the selected stock above the 25% total exposure limit
- **THEN** the buy quantity is clamped to the maximum quantity allowed by remaining exposure
- **AND** the estimated buy cost is recalculated for the clamped quantity

### Requirement: Sell orders MUST not exceed current holdings

The demo SHALL prevent sell order quantity from exceeding the player's current holding for that stock.

#### Scenario: User attempts to sell more shares than held

- **GIVEN** the user has 80 shares of a stock
- **WHEN** the user enters 90 shares in the sell quantity input
- **THEN** the sell quantity is clamped to 80
- **AND** estimated proceeds are calculated for 80 shares

### Requirement: Trade estimates MUST update with quantity changes

The demo SHALL update estimated buy cost and estimated sell proceeds whenever the corresponding quantity input changes.

#### Scenario: User edits buy or sell quantity

- **WHEN** the user changes a buy or sell quantity input
- **THEN** the related estimate changes immediately to match the current clamped quantity
