const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  const logs = [];
  page.on("pageerror", (error) => logs.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error" && !message.text().includes("ERR_CONNECTION_REFUSED")) {
      logs.push(`console: ${message.text()}`);
    }
  });
  await page.addInitScript(() => {
    localStorage.setItem(
      "tavern-market-storms-auth-v1",
      JSON.stringify({
        token: "test-token",
        expiresAt: "2099-01-01T00:00:00.000Z",
        player: { id: "test-player", publicId: 100001, username: "testuser", displayName: "Test Traveler" }
      })
    );
  });
  await page.route("**/api/me", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify({
        ok: true,
        data: {
          player: { id: "test-player", publicId: 100001, username: "testuser", displayName: "Test Traveler", balance: 100000 },
          balance: 100000,
          holdings: [{ targetId: "stock-001", quantity: 100, averageCost: 7.1 }],
          orders: []
        }
      })
    })
  );

  await page.goto("http://127.0.0.1:5178/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "行情", exact: true }).click();
  await page.getByText("主播指数榜").waitFor({ timeout: 3000 });
  await page.getByText(/已同步.*第13赛季/).waitFor({ timeout: 20000 });
  await page.getByText(/500名门槛/).waitFor({ timeout: 3000 });
  const syncState = await page.evaluate(() => {
    const saved = JSON.parse(localStorage.getItem("tavern-market-storms-state-v4"));
    return {
      marketSync: saved.marketSync,
      syncedTarget: saved.targets.find((target) => target.id === "stock-004"),
      outsideLeaks: saved.targets
        .filter((target) => target.sync?.source === "outside-top-500")
        .filter((target) => target.score >= saved.marketSync.floorScore)
        .map((target) => ({ name: target.name, score: target.score }))
    };
  });
  if (!syncState.marketSync || syncState.marketSync.status !== "synced") {
    throw new Error("Market should store synced leaderboard metadata.");
  }
  if (!syncState.marketSync.fetched || syncState.marketSync.fetched < 500) {
    throw new Error(`Market sync should expose the official leaderboard row count, got ${syncState.marketSync.fetched}.`);
  }
  const outsideScoreCheck = await page.evaluate(() => {
    const lowSeedTarget = { id: "stock-001", price: 7.38, score: 7380 };
    const anchoredScore = deterministicOutsideScore(lowSeedTarget, 12183);
    lowSeedTarget.score = 20000;
    lowSeedTarget.price = 20;
    const repeatedScore = deterministicOutsideScore(lowSeedTarget, 12183);
    return { anchoredScore, repeatedScore };
  });
  if (outsideScoreCheck.anchoredScore !== outsideScoreCheck.repeatedScore) {
    throw new Error(`Outside-top-500 score should not depend on the current refreshed score: ${JSON.stringify(outsideScoreCheck)}.`);
  }
  if (Math.abs(outsideScoreCheck.anchoredScore - 7380) > 250) {
    throw new Error(`Outside-top-500 low-price stock should stay near its seed score, got ${outsideScoreCheck.anchoredScore}.`);
  }
  if (syncState.marketSync.floorScore !== 11440 && syncState.marketSync.floorScore < 10000) {
    throw new Error(`Unexpected leaderboard floor score: ${syncState.marketSync.floorScore}.`);
  }
  if (syncState.outsideLeaks.length) {
    throw new Error(`Outside-top-500 stocks must stay below the floor score: ${JSON.stringify(syncState.outsideLeaks[0])}`);
  }
  if (!Array.isArray(syncState.syncedTarget?.sync?.scoreHistory) || syncState.syncedTarget.sync.scoreHistory.length < 1) {
    throw new Error("Synced stocks should store scoreHistory for the detail trend chart.");
  }
  const expectedTrend = syncState.syncedTarget.sync.scoreHistory.map((score) => Number(Math.max(3, score / 1000).toFixed(2)));
  const actualTrend = syncState.syncedTarget.trend.slice(-expectedTrend.length);
  if (JSON.stringify(actualTrend) !== JSON.stringify(expectedTrend)) {
    throw new Error(`Detail trend should be derived from scoreHistory. Expected ${expectedTrend}, got ${actualTrend}.`);
  }

  const rows = page.locator(".stock-table tbody tr");
  const rowCount = await rows.count();
  if (rowCount !== 44) {
    throw new Error(`Expected 44 table rows, found ${rowCount}.`);
  }
  await page.getByText("44 支股票").waitFor({ timeout: 3000 });
  await page.locator(".group-card").filter({ hasText: "达安集团" }).waitFor({ timeout: 3000 });
  await page.locator(".group-card").filter({ hasText: "高磁集团" }).waitFor({ timeout: 3000 });
  await page.locator(".group-card").filter({ hasText: "优巨集团" }).waitFor({ timeout: 3000 });
  await page.locator(".group-card").filter({ hasText: "达安集团" }).getByText("8 支成员").waitFor({ timeout: 3000 });
  await page.locator(".group-card").filter({ hasText: "高磁集团" }).getByText("3 支成员").waitFor({ timeout: 3000 });
  await page.locator(".group-card").filter({ hasText: "优巨集团" }).getByText("2 支成员").waitFor({ timeout: 3000 });

  const marketAvatars = await page.locator(".market-table-screen .avatar").count();
  if (marketAvatars !== 0) {
    throw new Error(`Market table should not render avatar images, found ${marketAvatars}.`);
  }
  const actionCounts = await rows.evaluateAll((elements) =>
    elements.map((element) => element.querySelectorAll(".col-actions button").length)
  );
  const invalidActionRow = actionCounts.findIndex((count) => count !== 1);
  if (invalidActionRow !== -1) {
    throw new Error(`Expected one action button per market row; row ${invalidActionRow + 1} has ${actionCounts[invalidActionRow]}.`);
  }
  const leakedRowMeta = await page.locator(".stock-name-btn").evaluateAll((elements) =>
    elements
      .map((element, index) => ({ index: index + 1, text: element.textContent || "" }))
      .filter((row) => /TM-\d{3}|炉石豆哥|郭枫荷|Lighting|标蓝股票的均值|标黄股票的均值|标绿股票的均值/.test(row.text))
  );
  if (leakedRowMeta.length) {
    throw new Error(`Market rows should hide stock code and streamer/game metadata: ${JSON.stringify(leakedRowMeta[0])}`);
  }

  await rows.filter({ hasText: "豆豆农场" }).waitFor({ timeout: 3000 });
  await rows.filter({ hasText: "俺的你男装" }).waitFor({ timeout: 3000 });
  await rows.filter({ hasText: "吨吨养身" }).waitFor({ timeout: 3000 });
  await rows.filter({ hasText: "婀姿美容" }).waitFor({ timeout: 3000 });
  await rows.filter({ hasText: "达安集团" }).locator(".group-badge").filter({ hasText: "达安指数" }).waitFor({ timeout: 3000 });
  await rows.filter({ hasText: "俺的你男装" }).locator(".group-badge").filter({ hasText: "达安" }).waitFor({ timeout: 3000 });
  await rows.filter({ hasText: "高磁集团" }).locator(".group-badge").filter({ hasText: "高磁指数" }).waitFor({ timeout: 3000 });
  await rows.filter({ hasText: "优巨集团" }).locator(".group-badge").filter({ hasText: "优巨指数" }).waitFor({ timeout: 3000 });

  const screen = page.locator(".screen");
  const lastRow = rows.filter({ hasText: "优巨集团" });
  await screen.evaluate((element) => {
    element.scrollTop = element.scrollHeight;
  });
  await page.waitForTimeout(100);

  const screenBox = await screen.boundingBox();
  const lastRowBox = await lastRow.boundingBox();
  if (!screenBox || !lastRowBox) {
    throw new Error("Could not measure market list scroll position.");
  }
  if (lastRowBox.bottom < screenBox.y || lastRowBox.y > screenBox.y + screenBox.height) {
    throw new Error("The 44th stock is not reachable after scrolling the market page.");
  }
  await page.screenshot({ path: "tms-market-list-check.png", fullPage: true });

  await lastRow.locator(".stock-name-btn").click();
  await page.getByText("优巨集团").first().waitFor({ timeout: 3000 });
  await page.getByText(/代码：TM-044/).waitFor({ timeout: 3000 });
  const detailNavImages = await page.locator(".nav .nav-button-img").count();
  if (detailNavImages !== 5) {
    throw new Error(`Detail page should keep the 5 bottom navigation buttons visible, found ${detailNavImages}.`);
  }
  await page.locator(".detail-group-card").filter({ hasText: "优巨集团" }).waitFor({ timeout: 3000 });
  await page.locator(".detail-group-card").filter({ hasText: "小浪宠物" }).waitFor({ timeout: 3000 });
  await page.locator(".detail-group-card").filter({ hasText: "炮炮婚庆" }).waitFor({ timeout: 3000 });

  const desktop = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await desktop.addInitScript(() => {
    localStorage.setItem(
      "tavern-market-storms-auth-v1",
      JSON.stringify({
        token: "test-token",
        expiresAt: "2099-01-01T00:00:00.000Z",
        player: { id: "test-player", publicId: 100001, username: "testuser", displayName: "Test Traveler" }
      })
    );
  });
  await desktop.route("**/api/me", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify({
        ok: true,
        data: {
          player: { id: "test-player", publicId: 100001, username: "testuser", displayName: "Test Traveler", balance: 100000 },
          balance: 100000,
          holdings: [{ targetId: "stock-001", quantity: 100, averageCost: 7.1 }],
          orders: []
        }
      })
    })
  );
  await desktop.goto("http://127.0.0.1:5178/", { waitUntil: "networkidle" });
  await desktop.getByRole("button", { name: "行情", exact: true }).click();
  await desktop.getByText("主播指数榜").waitFor({ timeout: 3000 });
  await desktop.getByText(/已同步.*第13赛季/).waitFor({ timeout: 20000 });
  const appBox = await desktop.locator("#app").boundingBox();
  if (!appBox) {
    throw new Error("Could not measure desktop app shell.");
  }
  if (appBox.width > 431) {
    throw new Error(`Market page should stay mobile portrait width on desktop, found ${appBox.width}px.`);
  }
  await desktop.screenshot({ path: "tms-market-table-desktop-check.png", fullPage: true });
  await desktop.close();

  await browser.close();
  if (logs.length) {
    console.error(logs.join("\n"));
    process.exit(1);
  }
  console.log("Market list verified");
})();
