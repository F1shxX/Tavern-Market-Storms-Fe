const { chromium } = require("playwright");

(async () => {
  const executablePath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";
  const browser = await chromium.launch({ executablePath });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  const logs = [];
  page.on("pageerror", (error) => logs.push(`pageerror: ${error.message}`));
  page.on("console", (message) => {
    if (message.type() === "error") logs.push(`console: ${message.text()}`);
  });

  await page.goto("http://127.0.0.1:5178/", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "行情", exact: true }).click();
  await page.locator(".stock-name-btn").first().click();
  await page.getByRole("button", { name: "买入" }).click();
  const initialBuyEstimate = await page.locator("#buyEstimate").textContent();
  await page.locator("#buyQty").fill("20");
  const updatedBuyEstimate = await page.locator("#buyEstimate").textContent();
  if (initialBuyEstimate === updatedBuyEstimate) {
    throw new Error("Buy estimate did not update after changing quantity.");
  }
  await page.getByRole("button", { name: "买入" }).last().click();
  await page.getByText("买入成功").waitFor({ timeout: 3000 });
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
  await page.getByText("卖出成功").waitFor({ timeout: 3000 });
  await page.getByRole("button", { name: "← 返回" }).click();
  await page.getByRole("button", { name: "← 返回" }).click();
  await page.getByRole("button", { name: "持仓", exact: true }).click();
  await page.getByText("总资产").waitFor({ timeout: 3000 });
  await page.getByRole("button", { name: "排名", exact: true }).click();
  await page.getByText("玩家收益榜").waitFor({ timeout: 3000 });
  await page.screenshot({ path: "demo-mobile-check.png", fullPage: true });

  await browser.close();
  if (logs.length) {
    console.error(logs.join("\n"));
    process.exit(1);
  }
  console.log("Demo flow verified");
})();
