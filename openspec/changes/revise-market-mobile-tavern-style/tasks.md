## Tasks

- [x] Remove desktop-width market expansion and keep market in phone portrait width.
- [x] Restyle market table and controls with tavern wood/gold game UI texture.
- [x] Update verification to enforce portrait width on desktop.
- [x] Run local verification:
  - `openspec validate revise-market-mobile-tavern-style --strict`
  - `node --check app.js`
  - `node --check scripts/verify-market-list.js`
  - `node scripts/verify-home-scroll.js`
  - `node scripts/verify-market-list.js`
  - `npm run verify`
