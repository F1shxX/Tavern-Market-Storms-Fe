const assert = require("node:assert/strict");
const fs = require("node:fs");
const { chromium } = require("playwright");
const snapshot = require("../data/battlegrounds-leaderboard.json");

const player = { id: "layout-player", publicId: 100001, username: "layoutuser", displayName: "Layout Test", balance: 100000 };
const portfolio = { player, balance: 100000, holdings: [{ targetId: "stock-001", quantity: 100, averageCost: 7.1 }], orders: [] };

async function checkControls(page) {
  const violations = await page.locator(".action-button, .qty-step, .account-actions .btn, .interaction-choice").evaluateAll((buttons) => buttons.flatMap((button) => {
    const box = button.getBoundingClientRect();
    const problems = [];
    if (box.height < 43.5 || box.width < 43.5) problems.push("small tap target");
    if (button.scrollWidth > button.clientWidth + 1 || button.scrollHeight > button.clientHeight + 1) problems.push("clipped label");
    return problems.map((problem) => `${button.className}: ${problem}`);
  }));
  assert.deepEqual(violations, []);
  const crowded = await page.locator(".quick-actions, .holding-actions, .account-actions, .qty-row, .nav").evaluateAll((groups) => groups.flatMap((group) => {
    const children = [...group.children];
    return children.flatMap((child, index) => children.slice(index + 1).flatMap((other) => {
      const a = child.getBoundingClientRect();
      const b = other.getBoundingClientRect();
      const horizontalGap = Math.max(b.left - a.right, a.left - b.right);
      const verticalGap = Math.max(b.top - a.bottom, a.top - b.bottom);
      return horizontalGap < 5 && verticalGap < 5 ? [group.className] : [];
    }));
  }));
  assert.deepEqual(crowded, [], "Controls must have visible separation");
}

async function checkDialog(page) {
  const dialog = page.locator(".interaction-dialog");
  await dialog.scrollIntoViewIfNeeded();
  const size = await dialog.evaluate((element) => {
    const box = element.getBoundingClientRect();
    const style = getComputedStyle(element);
    const content = {
      left: box.left + parseFloat(style.borderLeftWidth),
      right: box.right - parseFloat(style.borderRightWidth),
      top: box.top + parseFloat(style.borderTopWidth),
      bottom: box.bottom - parseFloat(style.borderBottomWidth)
    };
    return {
      width: box.width,
      height: box.height,
      borderless: style.borderImageSource === "none" && style.backgroundImage === "none" && parseFloat(style.borderTopWidth) === 0,
      fits: [...element.querySelectorAll(".interaction-speaker, p, button")].every((child) => {
        const rect = child.getBoundingClientRect();
        return rect.left >= content.left && rect.right <= content.right && rect.top >= content.top && rect.bottom <= content.bottom;
      })
    };
  });
  assert(size.fits, "Dialogue content must fit its container");
  assert(size.borderless, "Innkeeper dialogue must not have a decorative frame");
  return size;
}

(async () => {
  fs.mkdirSync(".tmp/control-layout", { recursive: true });
  const browser = await chromium.launch({ executablePath: process.env.BROWSER_EXECUTABLE || "C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe" });
  try {
    for (const width of [320, 390, 430, 1440]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.addInitScript((player) => {
        localStorage.setItem("tavern-market-storms-auth-v1", JSON.stringify({ token: "layout-only", player, expiresAt: "2099-01-01T00:00:00Z" }));
      }, player);
      await page.route("**/api/**", (route) => {
        const path = new URL(route.request().url()).pathname;
        const data = path.endsWith("/battlegrounds") ? snapshot : path.endsWith("/rankings") ? { rows: [] } : portfolio;
        return route.fulfill({ status: 200, contentType: "application/json", headers: { "access-control-allow-origin": "*", "access-control-allow-headers": "*" }, body: JSON.stringify({ ok: true, data }) });
      });
      await page.goto(process.env.TEST_BASE_URL || "http://127.0.0.1:5178", { waitUntil: "networkidle" });
      const homeDialog = await checkDialog(page);
      await checkControls(page);
      await page.screenshot({ path: `.tmp/control-layout/home-${width}.png` });
      await page.locator('[data-tab="announcements"]').click();
      const communityDialog = await checkDialog(page);
      assert(Math.abs(homeDialog.width - communityDialog.width) < 1, "Home and community frames must have equal widths");
      assert(Math.abs(homeDialog.height - communityDialog.height) < 1, "Shared dialogue must have equal height");
      await checkControls(page);
      await page.screenshot({ path: `.tmp/control-layout/community-${width}.png` });
      await page.locator('[data-tab="holdings"]').click();
      await checkControls(page);
      await page.locator('.holding-actions [data-action="detail"]').first().click();
      await checkControls(page);
      const topButtons = await page.locator(".topbar .action-button").evaluateAll((buttons) => buttons.map((b) => b.offsetHeight));
      assert.equal(new Set(topButtons).size, 1, "Back and refresh heights must match");
      await page.locator(".trade-side-image-button").first().click();
      await checkControls(page);
      const orderHeights = await page.locator(".order-image-button").evaluateAll((buttons) => buttons.map((b) => b.offsetHeight));
      assert.deepEqual(orderHeights, [48, 48]);
      await page.locator(".order-image-button").first().scrollIntoViewIfNeeded();
      await page.screenshot({ path: `.tmp/control-layout/order-${width}.png` });
      await page.locator('[data-tab="markets"]').click();
      await checkControls(page);
      await page.screenshot({ path: `.tmp/control-layout/market-${width}.png` });
      assert.deepEqual(errors, []);
      await page.close();
      console.log(`Control layout verified at ${width}px`);
    }
  } finally {
    await browser.close();
  }
})().catch((error) => { console.error(error); process.exitCode = 1; });
