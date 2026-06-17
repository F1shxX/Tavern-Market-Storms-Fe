## ADDED Requirements

### Requirement: Market page MUST synchronize matched stocks from leaderboard scores

The frontend SHALL update market target scores and prices from the backend Battlegrounds leaderboard snapshot when a stock's configured leaderboard name matches a ranking row.

#### Scenario: Backend snapshot contains a stock's leaderboard name

- **WHEN** the market sync receives a row matching a stock
- **THEN** that stock's `score` equals the official row score
- **AND** its displayed price and change percent reflect the official score movement
- **AND** the stock records the official rank as sync metadata

### Requirement: Market sync MUST keep unmatched stocks below the top-500 floor

The frontend SHALL treat stocks that do not match the leaderboard snapshot as outside the top 500.

#### Scenario: A stock is not found in the top-500 snapshot

- **WHEN** the backend snapshot includes `floorScore`
- **THEN** the unmatched stock receives a random score below `floorScore`
- **AND** the unmatched stock score does not exceed `floorScore - 1`

### Requirement: Group index stocks MUST use member averages after sync

The frontend SHALL recalculate group index stocks from their group members after applying leaderboard scores and unmatched fallback movement.

#### Scenario: Group members have synchronized scores

- **WHEN** a market group has member stocks
- **THEN** the group index score equals the rounded average member score
- **AND** the group index price and change percent reflect the recalculated score

### Requirement: Market sync MUST degrade gracefully

The frontend SHALL preserve the existing local demo data when the backend leaderboard endpoint is unavailable.

#### Scenario: Backend sync fails

- **WHEN** the leaderboard request fails
- **THEN** the market page remains usable
- **AND** the user can still manually refresh simulated market data
