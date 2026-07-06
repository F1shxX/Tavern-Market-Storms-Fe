const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await page.addInitScript(() => {
    localStorage.setItem(
      "tavern-market-storms-auth-v1",
      JSON.stringify({
        token: "test-token",
        expiresAt: "2099-01-01T00:00:00.000Z",
        player: { id: "test-player", publicId: 100001, username: "testuser", displayName: "测试玩家" }
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
          player: { id: "test-player", publicId: 100001, username: "testuser", displayName: "测试玩家", balance: 100000 },
          balance: 100000,
          holdings: [],
          orders: []
        }
      })
    })
  );
  await page.goto("http://127.0.0.1:5178/", { waitUntil: "networkidle" });
  await page.getByText("实时大盘总指数").waitFor({ timeout: 3000 });
  await page.getByText("涨幅榜").waitFor({ timeout: 3000 });
  await page.getByText("跌幅榜").waitFor({ timeout: 3000 });
  await page.getByText("旅店老板").waitFor({ timeout: 3000 });
  await page.getByRole("button", { name: "排名", exact: true }).waitFor({ timeout: 3000 });
  const navImages = await page.locator(".nav .nav-button-img").count();
  if (navImages !== 5) {
    throw new Error(`Bottom navigation should render 5 image buttons, found ${navImages}.`);
  }
  const activeNavLabel = await page.locator(".nav button.active").getAttribute("aria-label");
  if (activeNavLabel !== "交易") {
    throw new Error(`Home nav active label should be 交易, got ${activeNavLabel}.`);
  }
  if (await page.getByText("官方公告").count()) {
    throw new Error("Home screen should not show official announcement block.");
  }
  if (await page.getByText("玩家晒单区").count()) {
    throw new Error("Home screen should not show personal sharing block.");
  }
  const nav = await page.locator(".nav").boundingBox();
  if (!nav || nav.y < 740) {
    throw new Error("Bottom navigation is not fixed near the viewport bottom.");
  }
  const app = await page.locator("#app").boundingBox();
  if (!app || nav.x < app.x || nav.x + nav.width > app.x + app.width + 1) {
    throw new Error("Bottom image navigation overflows the app shell.");
  }
  await page.screenshot({ path: "tms-home-scroll-check.png", fullPage: true });
  await browser.close();
  console.log("Home scroll verified");
})();
