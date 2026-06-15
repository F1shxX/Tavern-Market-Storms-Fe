const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await page.goto("http://127.0.0.1:5178/", { waitUntil: "networkidle" });
  await page.getByText("实时大盘总指数").waitFor({ timeout: 3000 });
  await page.getByText("涨幅榜").waitFor({ timeout: 3000 });
  await page.getByText("跌幅榜").waitFor({ timeout: 3000 });
  await page.getByRole("button", { name: "排名", exact: true }).waitFor({ timeout: 3000 });
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
  await page.screenshot({ path: "demo-home-scroll-check.png", fullPage: true });
  await browser.close();
  console.log("Home scroll verified");
})();
