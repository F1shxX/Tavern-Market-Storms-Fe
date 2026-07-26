# Tavern Market Storms Frontend

Frontend repository for Tavern Market Storms.

## Docs

- [Project Overview](docs/PROJECT_OVERVIEW.md)
- [Development Schedule](docs/DEVELOPMENT_SCHEDULE.md)
- [Asset Requirements](docs/ASSET_REQUIREMENTS.md)
- [API Contract Draft](docs/API_CONTRACT_DRAFT.md)
- [OpenSpec Workflow](docs/OPENSPEC_WORKFLOW.md)

## Runtime

The frontend is a mobile-first trading game client for Tavern Market Storms.

Open `index.html` directly in a browser, or serve the folder with any static web server.

Runtime features:

- Home dashboard
- Market list
- Target detail with 7-day trend
- Username/password account login
- Buy and sell flow through the backend API
- Holdings, orders, and balance persisted in Supabase
- Ranking page from real player records
- Announcements
- Market sync from the backend leaderboard endpoint, with the static captured snapshot only as a real-data fallback
- Request timeouts, safe text rendering for player-provided data, and browser-side validation that matches backend account rules

## Deployment

Use `deploy/nginx-static-cache.conf` inside the Nginx `server` block. It configures cache lifetimes and a restrictive Content Security Policy for this self-contained app. The `index.html` CSS/JS version suffix is the release cache-buster; update it when publishing a new static release.
