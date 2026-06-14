# Tavern Market Storms - Frontend Overview

## Current Direction

Tavern Market Storms is planned as a vertical, lightweight Douyin mini-game or H5 game. The first version should focus on clear mobile reading and fast interaction:

- Market overview
- Ranking lists
- Market target detail
- Virtual buy/sell or support/reduce operation
- Holdings
- Profit/loss ranking
- Announcements

The interface should feel like a light game, not a serious finance app.

## Recommended Visual Style

Use a "light cartoon / flat UI + tavern fantasy elements + market dashboard" style.

Recommended:

- Rounded, readable mobile UI
- Tavern-themed decorations such as signs, coins, boards, badges
- Clear red/green movement indicators
- Large buttons and strong visual hierarchy
- Q-style or icon-style avatars

Avoid for the first version:

- Realistic art style, because it increases asset and adaptation cost
- Heavy anime character illustration, unless assets and authorization are confirmed
- Dense finance-style pages that are hard to read on mobile
- Excessive animation that delays implementation or hurts performance

## Frontend Responsibility

This repository owns:

- Mobile vertical UI
- Page routing
- Market list and ranking pages
- Market detail page
- Trade/support interaction
- Holdings page
- Announcement page
- API integration with the backend
- Asset integration from design

## Development Assumption

Programming is handled by one developer. The frontend should therefore keep the first version focused and avoid unnecessary page complexity.

