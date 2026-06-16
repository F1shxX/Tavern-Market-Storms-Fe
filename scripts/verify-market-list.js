const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  const logs = [];
  page.on("pageerror", (error) => logs.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") logs.push(`console: ${message.text()}`);
  });

  await page.goto("http://127.0.0.1:5178/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "行情", exact: true }).click();
  await page.getByText("主播指数榜").waitFor({ timeout: 3000 });

  const rows = page.locator(".stock-table tbody tr");
  const rowCount = await rows.count();
  if (rowCount !== 36) {
    throw new Error(`Expected 36 table rows, found ${rowCount}.`);
  }

  const marketAvatars = await page.locator(".market-table-screen .avatar").count();
  if (marketAvatars !== 0) {
    throw new Error(`Market table should not render avatar images, found ${marketAvatars}.`);
  }

  await page.getByText("豆豆农场").waitFor({ timeout: 3000 });
  await page.getByText("俺的你男装").waitFor({ timeout: 3000 });

  const screen = page.locator(".screen");
  const lastRow = rows.filter({ hasText: "野炊夜店" });
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
    throw new Error("The 36th stock is not reachable after scrolling the market page.");
  }
  await page.screenshot({ path: "demo-market-list-check.png", fullPage: true });

  await lastRow.getByRole("button", { name: "详情" }).click();
  await page.getByText("野炊夜店").first().waitFor({ timeout: 3000 });
  await page.getByText("代码：TM-036").waitFor({ timeout: 3000 });

  const desktop = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await desktop.goto("http://127.0.0.1:5178/", { waitUntil: "networkidle" });
  await desktop.getByRole("button", { name: "行情", exact: true }).click();
  await desktop.getByText("主播指数榜").waitFor({ timeout: 3000 });
  const visibleRows = await desktop.locator(".stock-table tbody tr").evaluateAll((elements) => {
    const viewportHeight = window.innerHeight;
    return elements.filter((element) => {
      const box = element.getBoundingClientRect();
      return box.bottom > 0 && box.top < viewportHeight;
    }).length;
  });
  if (visibleRows < 12) {
    throw new Error(`Expected at least 12 visible rows on desktop, found ${visibleRows}.`);
  }
  await desktop.screenshot({ path: "demo-market-table-desktop-check.png", fullPage: true });
  await desktop.close();

  await browser.close();
  if (logs.length) {
    console.error(logs.join("\n"));
    process.exit(1);
  }
  console.log("Market list verified");
})();
