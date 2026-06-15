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

  const rows = page.locator(".market-row");
  const rowCount = await rows.count();
  if (rowCount !== 36) {
    throw new Error(`Expected 36 market rows, found ${rowCount}.`);
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

  await lastRow.getByRole("button", { name: "详情" }).click();
  await page.getByText("野炊夜店").first().waitFor({ timeout: 3000 });
  await page.getByText("代码：TM-036").waitFor({ timeout: 3000 });
  await page.screenshot({ path: "demo-market-list-check.png", fullPage: true });

  await browser.close();
  if (logs.length) {
    console.error(logs.join("\n"));
    process.exit(1);
  }
  console.log("Market list verified");
})();
