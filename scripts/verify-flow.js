const { chromium } = require("playwright");

(async () => {
  const executablePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const browser = await chromium.launch({ executablePath });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  const logs = [];
  let orderCalls = 0;
  page.on("pageerror", (error) => logs.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") logs.push(`console: ${message.text()}`);
  });
  const portfolio = {
    player: { id: "test-player", publicId: 100001, username: "testuser", displayName: "Test Traveler", balance: 100000 },
    balance: 100000,
    holdings: [{ targetId: "stock-001", quantity: 100, averageCost: 7.1 }],
    orders: []
  };
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
  await page.route("**/api/me", (route) => {
    if (route.request().method() === "OPTIONS") {
      route.fulfill({
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET, POST, OPTIONS",
          "access-control-allow-headers": "content-type, authorization"
        }
      });
      return;
    }
    route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify({ ok: true, data: portfolio })
    });
  });
  await page.route("**/api/orders", async (route) => {
    if (route.request().method() === "OPTIONS") {
      await route.fulfill({
        status: 204,
        headers: {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "GET, POST, OPTIONS",
          "access-control-allow-headers": "content-type, authorization"
        }
      });
      return;
    }
    const order = route.request().postDataJSON();
    orderCalls += 1;
    const existing = portfolio.holdings.find((holding) => holding.targetId === order.targetId);
    if (order.side === "BUY") {
      portfolio.balance -= order.price * order.quantity * 1.001;
      if (existing) {
        existing.averageCost = ((existing.averageCost * existing.quantity) + (order.price * order.quantity)) / (existing.quantity + order.quantity);
        existing.quantity += order.quantity;
      } else {
        portfolio.holdings.push({ targetId: order.targetId, quantity: order.quantity, averageCost: order.price });
      }
    } else if (existing) {
      portfolio.balance += order.price * order.quantity * 0.999;
      existing.quantity -= order.quantity;
      if (existing.quantity <= 0) {
        portfolio.holdings = portfolio.holdings.filter((holding) => holding !== existing);
      }
    }
    portfolio.orders.unshift({
      id: `order-${portfolio.orders.length + 1}`,
      type: order.side,
      targetId: order.targetId,
      quantity: order.quantity,
      price: order.price,
      fee: order.price * order.quantity * 0.001,
      createdAt: new Date().toISOString()
    });
    route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify({ ok: true, data: { result: {}, portfolio } })
    });
  });

  await page.route("**/api/rankings", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify({
        ok: true,
        data: {
          rows: [
            { rank: 1, publicId: 100004, username: "alpha", displayName: "Alpha", totalAssets: 150000 },
            { rank: 2, publicId: 100002, username: "bravo", displayName: "Bravo", totalAssets: 120000 },
            { rank: 3, publicId: 100001, username: "testuser", displayName: "Test Traveler", totalAssets: 100000, self: true },
            { rank: 4, publicId: 100003, username: "delta", displayName: "Delta", totalAssets: 98000 },
            { rank: 5, publicId: 100005, username: "echo", displayName: "Echo", totalAssets: 96000 }
          ]
        }
      })
    })
  );

  await page.goto("http://127.0.0.1:5178/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "行情", exact: true }).click();
  await page.locator(".stock-name-btn").first().click();
  await page.getByRole("button", { name: "买入" }).click();
  const tradeNavImages = await page.locator(".nav .nav-button-img").count();
  if (tradeNavImages !== 5) {
    throw new Error(`Trade page should keep the 5 bottom navigation buttons visible, found ${tradeNavImages}.`);
  }
  await page.getByRole("button", { name: "行情", exact: true }).click();
  await page.getByText("主播指数榜").waitFor({ timeout: 3000 });
  await page.locator(".stock-name-btn").first().click();
  await page.getByRole("button", { name: "买入" }).click();
  const initialBuyEstimate = await page.locator("#buyEstimate").textContent();
  await page.locator("#buyQty").fill("20");
  const updatedBuyEstimate = await page.locator("#buyEstimate").textContent();
  if (initialBuyEstimate === updatedBuyEstimate) {
    throw new Error("Buy estimate did not update after changing quantity.");
  }
  await page.locator("#buyQty").fill("999999");
  const buyMax = Number(await page.locator("#buyQty").getAttribute("max"));
  const clampedBuyQty = Number(await page.locator("#buyQty").inputValue());
  if (clampedBuyQty !== buyMax) {
    throw new Error(`Buy quantity should clamp to 25% exposure max ${buyMax}, got ${clampedBuyQty}.`);
  }
  const buyPrice = Number((await page.locator(".trade-card").first().locator(".trade-meta div").first().locator("strong").textContent()).replace(/,/g, ""));
  const buyEstimate = Number((await page.locator("#buyEstimate").textContent()).replace(/[^\d]/g, ""));
  if (buyEstimate > 25000) {
    throw new Error(`Buy estimate should stay within the 25% single-stock limit, got ${buyEstimate} at price ${buyPrice}.`);
  }
  await page.locator("#buyQty").fill("20");
  await page.getByRole("button", { name: "买入" }).last().click();
  await page.waitForFunction(() => {
    const saved = JSON.parse(localStorage.getItem("tavern-market-storms-state-v4"));
    return saved?.holdings?.["stock-001"]?.quantity >= 120;
  });
  await page.getByRole("button", { name: "卖出" }).click();
  const initialSellEstimate = await page.locator("#sellEstimate").textContent();
  await page.locator("#sellQty").fill("20");
  const updatedSellEstimate = await page.locator("#sellEstimate").textContent();
  if (initialSellEstimate === updatedSellEstimate) {
    throw new Error("Sell estimate did not update after changing quantity.");
  }
  await page.locator("#sellQty").fill("999");
  const sellMax = Number(await page.locator("#sellQty").getAttribute("max"));
  const clampedSellQty = Number(await page.locator("#sellQty").inputValue());
  if (clampedSellQty !== sellMax) {
    throw new Error(`Sell quantity should clamp to holding max ${sellMax}, got ${clampedSellQty}.`);
  }
  await page.locator('[data-input="sellQty"][data-step="10"]').click();
  const steppedSellQty = Number(await page.locator("#sellQty").inputValue());
  if (steppedSellQty !== sellMax) {
    throw new Error(`Sell plus button should not exceed holding max ${sellMax}, got ${steppedSellQty}.`);
  }
  await page.locator("#sellQty").fill("10");
  await page.getByRole("button", { name: "卖出" }).last().click();
  await page.waitForFunction(() => {
    const saved = JSON.parse(localStorage.getItem("tavern-market-storms-state-v4"));
    return saved?.holdings?.["stock-001"]?.quantity <= 110;
  });
  await page.getByRole("button", { name: "← 返回" }).click();
  await page.getByRole("button", { name: "← 返回" }).click();
  await page.getByRole("button", { name: "持仓", exact: true }).click();
  await page.getByText("总资产").waitFor({ timeout: 3000 });
  await page.locator(".nav button").nth(3).click();
  await page.getByText("Player Leaderboard").waitFor({ timeout: 3000 });
  await page.getByText("Top Players").waitFor({ timeout: 3000 });
  await page.getByText("Nearby Rank").waitFor({ timeout: 3000 });

  const topCount = await page.locator(".rank-top-list .rank-row").count();
  if (topCount !== 3) {
    throw new Error(`Expected 3 top ranking rows, found ${topCount}.`);
  }
  const nearbyRows = page.locator(".rank-nearby-list .rank-row");
  const nearbyCount = await nearbyRows.count();
  const selfIndex = await nearbyRows.evaluateAll((elements) =>
    elements.findIndex((element) => element.classList.contains("self"))
  );
  if (selfIndex === -1) {
    throw new Error("Nearby rankings should include the current account.");
  }
  if (nearbyCount >= 5 && selfIndex !== 2) {
    throw new Error(`Current account should be centered in nearby rankings, found at index ${selfIndex}.`);
  }
  const rankingText = await page.locator(".screen").textContent();
  if (!/ID 100001/.test(rankingText) || !/Current account/.test(rankingText)) {
    throw new Error("Ranking page should show the current account public id.");
  }
  if (!/150,?000/.test(rankingText) || !/100,?000/.test(rankingText)) {
    throw new Error("Ranking page should show ranking totals from the API.");
  }
  await page.screenshot({ path: "tms-mobile-check.png", fullPage: true });
  if (orderCalls < 2) {
    throw new Error(`Expected buy and sell API calls, got ${orderCalls}.`);
  }

  await browser.close();
  if (logs.length) {
    console.error(logs.join("\n"));
    process.exit(1);
  }
  console.log("Flow verified");
})();
