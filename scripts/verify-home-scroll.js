const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({
    executablePath: "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe"
  });
  const page = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true });
  await page.goto("http://127.0.0.1:5178/", { waitUntil: "networkidle" });
  await page.getByText("热门标的").waitFor({ timeout: 3000 });
  const before = await page.locator(".market-row").first().boundingBox();
  await page.locator(".screen").evaluate((node) => {
    node.scrollTop = node.scrollHeight;
  });
  await page.waitForTimeout(250);
  const after = await page.locator(".market-row").first().boundingBox();
  const nav = await page.locator(".nav").boundingBox();
  const detailButton = await page.getByRole("button", { name: "详情" }).first().boundingBox();
  if (!before || !after || after.y >= before.y) {
    throw new Error("Home market list did not move upward after scrolling.");
  }
  if (!nav || nav.y < 740) {
    throw new Error("Bottom navigation is not fixed near the viewport bottom.");
  }
  if (detailButton && nav && detailButton.y + detailButton.height > nav.y) {
    throw new Error("Bottom navigation overlaps the first market row action buttons.");
  }
  await page.screenshot({ path: "demo-home-scroll-check.png", fullPage: true });
  await browser.close();
  console.log("Home scroll verified");
})();
