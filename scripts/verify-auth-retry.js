const { chromium } = require("playwright");

(async () => {
  const executablePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const browser = await chromium.launch({ executablePath });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  const logs = [];
  let meStatus = 500;

  page.on("pageerror", (error) => logs.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    const text = message.text();
    if (
      message.type() === "error" &&
      !text.includes("ERR_CONNECTION_REFUSED") &&
      !text.includes("status of 500") &&
      !text.includes("status of 401")
    ) {
      logs.push(`console: ${text}`);
    }
  });

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

  await page.route("**/api/me", (route) => {
    if (meStatus === 500) {
      route.fulfill({
        status: 500,
        contentType: "application/json",
        headers: { "access-control-allow-origin": "*" },
        body: JSON.stringify({ ok: false, error: "INTERNAL_ERROR", message: "temporary failure" })
      });
      return;
    }
    route.fulfill({
      status: 401,
      contentType: "application/json",
      headers: { "access-control-allow-origin": "*" },
      body: JSON.stringify({ ok: false, error: "SESSION_INVALID", message: "Session expired." })
    });
  });

  await page.goto("http://127.0.0.1:5178/", { waitUntil: "networkidle" });
  await page.getByText("金币").first().waitFor({ timeout: 3000 });
  const tokenAfterServerError = await page.evaluate(() => JSON.parse(localStorage.getItem("tavern-market-storms-auth-v1"))?.token);
  if (tokenAfterServerError !== "test-token") {
    throw new Error("A temporary /api/me failure should not clear the saved login token.");
  }

  meStatus = 401;
  await page.evaluate(() => loadRemotePortfolio({ silent: false }));
  await page.getByText("登录后开始游戏").waitFor({ timeout: 3000 });
  const tokenAfterAuthError = await page.evaluate(() => localStorage.getItem("tavern-market-storms-auth-v1"));
  if (tokenAfterAuthError) {
    throw new Error("An explicit auth failure should clear the saved login token.");
  }

  await browser.close();
  if (logs.length) {
    console.error(logs.join("\n"));
    process.exit(1);
  }
  console.log("Auth retry verified");
})();
