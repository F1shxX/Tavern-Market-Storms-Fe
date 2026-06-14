# API Contract Draft

The frontend should be able to work with mock data first. The backend can later replace mock data with imported or external leaderboard data.

## Main Data Shapes

### Market Target

```json
{
  "id": "tm001",
  "code": "TM001",
  "name": "Tavern Alpha",
  "description": "Short entertainment profile.",
  "currentIndex": 12.5,
  "changePercent": 3.2,
  "rank": 1,
  "avatarUrl": "/assets/targets/tm001.png",
  "tags": ["hot", "tavern"]
}
```

### Holding

```json
{
  "targetId": "tm001",
  "quantity": 100,
  "averageCost": 10.2,
  "currentIndex": 12.5,
  "profitLoss": 230,
  "profitLossPercent": 22.5
}
```

### Order Request

```json
{
  "targetId": "tm001",
  "side": "buy",
  "quantity": 10
}
```

If compliance wording needs to be softer, the UI can display "support/reduce" while the API still uses `buy/sell` internally.

## Frontend Pages And API Needs

| Page | API Need |
| --- | --- |
| Home | market overview, top gainers, top losers, user balance |
| Market list | paged market targets, filters, sorting |
| Detail | target detail, trend data, user holding |
| Trade/support | current target data, order submission |
| Holdings | user holdings and total profit/loss |
| Ranking | profit ranking and balance ranking |
| Announcement | official notices |

