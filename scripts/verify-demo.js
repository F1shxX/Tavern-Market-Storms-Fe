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
  await page.getByText("详情").first().click();
  await page.getByRole("button", { name: "买入" }).click();
  await page.locator("#buyQty").fill("20");
  await page.getByRole("button", { name: "买入" }).last().click();
  await page.getByText("买入成功").waitFor({ timeout: 3000 });
  await page.getByRole("button", { name: "卖出" }).click();
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
