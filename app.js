const STORAGE_KEY = "tavern-market-storms-demo-state-v1";
const FEE_RATE = 0.001;

const seedTargets = [
  {
    id: "evenlock",
    code: "TM-001",
    name: "夜契术士",
    alias: "Evenlock",
    price: 12.5,
    prevClose: 12.35,
    score: 12500,
    volume: 5240,
    heat: 85,
    avatar: "./assets/avatars/evenlock.svg",
    quote: "酒馆夜场拉满，控场节奏稳定。",
    trend: [10.8, 11.9, 12.25, 12.05, 11.7, 12.18, 12.5]
  },
  {
    id: "bronzebeard",
    code: "TM-002",
    name: "铜须酒保",
    alias: "Bronze Tap",
    price: 9.8,
    prevClose: 10.22,
    score: 9800,
    volume: 4210,
    heat: 72,
    avatar: "./assets/avatars/bronzebeard.svg",
    quote: "今日手气偏冷，粉丝仍在加仓观望。",
    trend: [10.5, 10.35, 10.2, 10.4, 10.1, 9.95, 9.8]
  },
  {
    id: "moonfox",
    code: "TM-003",
    name: "月狐占星",
    alias: "Moonfox",
    price: 15.2,
    prevClose: 14.62,
    score: 15200,
    volume: 6820,
    heat: 94,
    avatar: "./assets/avatars/moonfox.svg",
    quote: "连胜预言命中，弹幕热度飙升。",
    trend: [13.8, 14.2, 14.0, 14.6, 14.9, 14.75, 15.2]
  },
  {
    id: "embercat",
    code: "TM-004",
    name: "烬尾猫团",
    alias: "Embercat",
    price: 7.6,
    prevClose: 7.48,
    score: 7600,
    volume: 3150,
    heat: 66,
    avatar: "./assets/avatars/embercat.svg",
    quote: "低位反弹，适合小额试水。",
    trend: [7.1, 7.24, 7.18, 7.4, 7.32, 7.55, 7.6]
  },
  {
    id: "stormbard",
    code: "TM-005",
    name: "风暴吟游",
    alias: "Stormbard",
    price: 18.4,
    prevClose: 17.62,
    score: 18400,
    volume: 7580,
    heat: 97,
    avatar: "./assets/avatars/stormbard.svg",
    quote: "大盘领唱位，短线情绪最强。",
    trend: [16.8, 17.2, 16.95, 17.5, 17.7, 18.0, 18.4]
  }
];

const defaultState = {
  balance: 100000,
  holdings: {
    evenlock: { quantity: 100, averageCost: 11.25 }
  },
  orders: [],
  activeTab: "home",
  selectedId: "evenlock",
  view: "home",
  toast: ""
};

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return structuredClone(defaultState);
    return {
      ...structuredClone(defaultState),
      ...saved,
      targets: mergeTargets(saved.targets)
    };
  } catch {
    return structuredClone(defaultState);
  }
}

function mergeTargets(savedTargets) {
  if (!Array.isArray(savedTargets)) return structuredClone(seedTargets);
  return seedTargets.map((seed) => {
    const saved = savedTargets.find((item) => item.id === seed.id);
    return saved ? { ...seed, ...saved, avatar: seed.avatar } : structuredClone(seed);
  });
}

function targets() {
  if (!state.targets) state.targets = structuredClone(seedTargets);
  return state.targets;
}

function saveState() {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      balance: state.balance,
      holdings: state.holdings,
      orders: state.orders,
      activeTab: state.activeTab,
      selectedId: state.selectedId,
      view: state.view,
      targets: targets()
    })
  );
}

function money(value) {
  return Math.round(value).toLocaleString("zh-CN");
}

function price(value) {
  return Number(value).toFixed(2);
}

function getTarget(id) {
  return targets().find((target) => target.id === id) || targets()[0];
}

function getHolding(id) {
  return state.holdings[id] || { quantity: 0, averageCost: 0 };
}

function changePercent(target) {
  return ((target.price - target.prevClose) / target.prevClose) * 100;
}

function holdingValue(id) {
  const target = getTarget(id);
  const holding = getHolding(id);
  return holding.quantity * target.price;
}

function holdingProfit(id) {
  const target = getTarget(id);
  const holding = getHolding(id);
  return holding.quantity * (target.price - holding.averageCost);
}

function totalMarketValue() {
  return Object.keys(state.holdings).reduce((sum, id) => sum + holdingValue(id), 0);
}

function totalProfit() {
  return Object.keys(state.holdings).reduce((sum, id) => sum + holdingProfit(id), 0);
}

function totalAssets() {
  return state.balance + totalMarketValue();
}

function topHolding() {
  const items = Object.keys(state.holdings)
    .map((id) => ({ id, profit: holdingProfit(id), holding: getHolding(id) }))
    .filter((item) => item.holding.quantity > 0)
    .sort((a, b) => b.profit - a.profit);
  return items[0] || null;
}

function showToast(message) {
  state.toast = message;
  render();
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    state.toast = "";
    render();
  }, 1800);
}

function buy(targetId, quantity) {
  const target = getTarget(targetId);
  const qty = Math.max(1, Math.floor(Number(quantity) || 0));
  const gross = target.price * qty;
  const fee = gross * FEE_RATE;
  const cost = gross + fee;
  if (cost > state.balance) {
    showToast("金币不足，无法买入这笔委托。");
    return;
  }

  const holding = getHolding(targetId);
  const totalCost = holding.averageCost * holding.quantity + gross;
  const nextQty = holding.quantity + qty;
  state.holdings[targetId] = {
    quantity: nextQty,
    averageCost: totalCost / nextQty
  };
  state.balance -= cost;
  state.orders.unshift({
    type: "BUY",
    targetId,
    quantity: qty,
    price: target.price,
    fee,
    time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
  });
  saveState();
  showToast(`买入成功：${target.name} ${qty} 股`);
}

function sell(targetId, quantity) {
  const target = getTarget(targetId);
  const qty = Math.max(1, Math.floor(Number(quantity) || 0));
  const holding = getHolding(targetId);
  if (qty > holding.quantity) {
    showToast("持仓不足，无法卖出这笔委托。");
    return;
  }

  const gross = target.price * qty;
  const fee = gross * FEE_RATE;
  state.balance += gross - fee;
  const nextQty = holding.quantity - qty;
  if (nextQty <= 0) {
    delete state.holdings[targetId];
  } else {
    state.holdings[targetId] = {
      quantity: nextQty,
      averageCost: holding.averageCost
    };
  }
  state.orders.unshift({
    type: "SELL",
    targetId,
    quantity: qty,
    price: target.price,
    fee,
    time: new Date().toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" })
  });
  saveState();
  showToast(`卖出成功：${target.name} ${qty} 股`);
}

function simulateMarket() {
  targets().forEach((target, index) => {
    const swing = Math.sin(Date.now() / 900000 + index) * 0.015 + (Math.random() - 0.45) * 0.04;
    const next = Math.max(3, target.price * (1 + swing));
    target.prevClose = target.price;
    target.price = Number(next.toFixed(2));
    target.score = Math.round(target.price * 1000);
    target.volume = Math.max(900, Math.round(target.volume * (1 + Math.abs(swing) * 2)));
    target.heat = Math.max(35, Math.min(99, Math.round(target.heat + swing * 120)));
    target.trend = [...target.trend.slice(-6), target.price];
  });
  saveState();
  showToast("行情已刷新，K线和持仓收益已更新。");
}

function resetDemo() {
  state = structuredClone(defaultState);
  state.targets = structuredClone(seedTargets);
  saveState();
  showToast("Demo 已重置。");
}

function setView(view, tab = view, selectedId = state.selectedId) {
  state.view = view;
  state.activeTab = tab;
  state.selectedId = selectedId;
  saveState();
  render();
}

function renderTopbar(title, subtitle = "Streamer Stock Trade") {
  return `
    <div class="topbar">
      <div class="brand">
        <h1 class="hero-title">${title}</h1>
        <h2>${subtitle}</h2>
      </div>
      <div class="balance-pill">
        <span>可用金币</span>
        <strong>${money(state.balance)}</strong>
      </div>
    </div>
  `;
}

function renderNav() {
  const tabs = [
    ["home", "首页"],
    ["markets", "行情"],
    ["holdings", "持仓"],
    ["rankings", "收益"],
    ["announcements", "公告"]
  ];
  return `
    <nav class="nav">
      ${tabs
        .map(
          ([key, label]) =>
            `<button class="${state.activeTab === key ? "active" : ""}" data-action="tab" data-tab="${key}">${label}</button>`
        )
        .join("")}
    </nav>
  `;
}

function renderHome() {
  const holding = topHolding();
  const holdingTarget = holding ? getTarget(holding.id) : getTarget("evenlock");
  const leaders = [...targets()].sort((a, b) => changePercent(b) - changePercent(a)).slice(0, 3);
  return `
    <section class="screen">
      ${renderTopbar("Tavern<br>Market", "炉市风云 Demo")}
      <div class="panel notice-panel">
        <div class="section-title">官方公告</div>
        <div class="notice-line"><b>【成盟总结】</b><span>今日大盘波动 ${price(marketMove())}% ，收盘术领发。</span></div>
        <div class="notice-line"><b>【停牌通知】</b><span>TM-003 数据异常，已切换人工复核。</span></div>
        <div class="notice-line"><b>【活动】</b><span>完成首次交易，赠送 1000 金币体验金。</span></div>
      </div>

      <div class="section-heading">
        <div class="section-title">玩家晒单区</div>
        <button class="mini-btn" data-action="simulate">刷新行情</button>
      </div>
      <div class="dashboard-grid">
        <div class="panel stat-box">
          <div class="stat-label">持仓图览</div>
          <div class="stat-main">${holding ? holding.holding.quantity : 0}<span style="font-size:18px">股</span></div>
          <div class="stat-note">${holdingTarget.name}</div>
          <div class="${holding && holding.profit >= 0 ? "profit" : "loss"} stat-note">收益：${holding ? formatSignedCoins(holding.profit) : "0 金币"}</div>
        </div>
        <div class="panel stat-box">
          <div class="stat-label">收益榜</div>
          ${leaders
            .map(
              (item, index) =>
                `<div class="notice-line"><b>${index + 1}</b><span>${item.name}<br><strong class="value-gold">${money(item.score)} 金币</strong></span></div>`
            )
            .join("")}
        </div>
      </div>

      <div class="panel streamer-wall home-streamer">
        <img class="avatar large" src="${holdingTarget.avatar}" alt="${holdingTarget.name}" />
        <div>
          <div class="section-title">主播便墙</div>
          <div class="speech">${holdingTarget.name}：${holdingTarget.quote}</div>
        </div>
      </div>

      <div class="section-heading">
        <div class="section-title">热门标的</div>
        <button class="mini-btn" data-action="tab" data-tab="markets">全部行情</button>
      </div>
      <div class="market-list">
        ${targets()
          .slice(0, 3)
          .map((target) => renderMarketRow(target))
          .join("")}
      </div>
      ${renderNav()}
      ${renderToast()}
    </section>
  `;
}

function marketMove() {
  const avg = targets().reduce((sum, target) => sum + changePercent(target), 0) / targets().length;
  return avg;
}

function formatSignedCoins(value) {
  const rounded = Math.round(value);
  if (rounded > 0) return `+${money(rounded)} 金币`;
  if (rounded < 0) return `${money(rounded)} 金币`;
  return "0 金币";
}

function renderMarketRow(target) {
  const change = changePercent(target);
  return `
    <article class="market-row">
      <img class="avatar" src="${target.avatar}" alt="${target.name}" />
      <div>
        <div class="market-name gold-text">${target.name}</div>
        <div class="market-code">${target.code} · 热度 ${target.heat}</div>
        <div class="quick-actions">
          <button class="mini-btn" data-action="detail" data-id="${target.id}">详情</button>
          <button class="mini-btn" data-action="trade" data-id="${target.id}">交易</button>
        </div>
      </div>
      <div class="price-stack">
        <div class="price">${price(target.price)}</div>
        <div class="change ${change >= 0 ? "up" : "down"}">${change >= 0 ? "+" : ""}${price(change)}%</div>
      </div>
    </article>
  `;
}

function renderMarkets() {
  return `
    <section class="screen">
      ${renderTopbar("Market", "行情大厅")}
      <div class="section-heading">
        <div class="section-title">主播指数榜</div>
        <button class="mini-btn" data-action="simulate">刷新行情</button>
      </div>
      <div class="market-list">
        ${targets()
          .map((target) => renderMarketRow(target))
          .join("")}
      </div>
      ${renderNav()}
      ${renderToast()}
    </section>
  `;
}

function renderDetail() {
  const target = getTarget(state.selectedId);
  const holding = getHolding(target.id);
  const pnl = holdingProfit(target.id);
  const change = changePercent(target);
  return `
    <section class="screen no-nav">
      <div class="topbar">
        <button class="btn btn-blue back-btn" data-action="back">← 返回</button>
        <button class="mini-btn" data-action="simulate">刷新行情</button>
      </div>
      <div class="detail-head">
        <img class="avatar large" src="${target.avatar}" alt="${target.name}" />
        <div>
          <div class="detail-name gold-text">${target.name}</div>
          <div class="detail-code">代码：${target.code}</div>
          <div class="detail-price">${price(target.price)}</div>
          <div class="change ${change >= 0 ? "up" : "down"}">${change >= 0 ? "+" : ""}${price(change)}% ${change >= 0 ? "↑" : "↓"}</div>
        </div>
      </div>

      <div class="panel chart-card">
        <div class="section-title" style="text-align:center">近7日走势</div>
        <div class="chart-wrap">${renderChart(target)}</div>
        <p class="detail-copy">${target.quote} | 场均热度 ${target.heat}</p>
      </div>

      <div class="detail-actions">
        <button class="btn btn-gold" data-action="trade" data-id="${target.id}">买入</button>
        <button class="btn btn-red" data-action="trade" data-id="${target.id}">卖出</button>
      </div>

      <div class="holding-summary">
        <div class="summary-pill">当前持仓<strong>${holding.quantity} 股</strong></div>
        <div class="summary-pill">持仓收益<strong class="${pnl >= 0 ? "profit" : "loss"}">${formatSignedCoins(pnl)}</strong></div>
        <div class="summary-pill">今日成交<strong>${money(target.volume)} 手</strong></div>
        <div class="summary-pill">可用金币<strong>${money(state.balance)}</strong></div>
      </div>
      ${renderToast()}
    </section>
  `;
}

function renderChart(target) {
  const values = target.trend;
  const max = Math.max(...values) * 1.06;
  const min = Math.min(...values) * 0.94;
  const range = max - min || 1;
  const points = values.map((value, index) => {
    const x = 28 + index * 48;
    const y = 132 - ((value - min) / range) * 96;
    return { x, y, value, up: index === 0 ? true : value >= values[index - 1] };
  });
  const candle = points
    .map((point, index) => {
      const prev = index === 0 ? point.value * 0.98 : values[index - 1];
      const high = Math.max(point.value, prev) * 1.018;
      const low = Math.min(point.value, prev) * 0.982;
      const highY = 132 - ((high - min) / range) * 96;
      const lowY = 132 - ((low - min) / range) * 96;
      const openY = 132 - ((prev - min) / range) * 96;
      const closeY = 132 - ((point.value - min) / range) * 96;
      const top = Math.min(openY, closeY);
      const height = Math.max(13, Math.abs(openY - closeY));
      const color = point.up ? "#20d66b" : "#ff4053";
      return `
        <line x1="${point.x}" y1="${highY}" x2="${point.x}" y2="${lowY}" stroke="${color}" stroke-width="3" />
        <rect x="${point.x - 12}" y="${top}" width="24" height="${height}" rx="3" fill="${color}" opacity="0.92" />
        <text x="${point.x}" y="160" text-anchor="middle" fill="#fff7bf" font-size="12" font-weight="800">日${index + 1}</text>
      `;
    })
    .join("");
  return `
    <svg viewBox="0 0 340 176" role="img" aria-label="${target.name} 近7日走势">
      <line x1="12" y1="130" x2="330" y2="130" stroke="rgba(187,218,255,.42)" stroke-width="2" />
      <line x1="12" y1="84" x2="330" y2="84" stroke="rgba(187,218,255,.18)" stroke-width="1" />
      <line x1="12" y1="40" x2="330" y2="40" stroke="rgba(187,218,255,.18)" stroke-width="1" />
      ${candle}
    </svg>
  `;
}

function renderTrade() {
  const target = getTarget(state.selectedId);
  const holding = getHolding(target.id);
  const buyValue = target.price * 10 * (1 + FEE_RATE);
  const sellValue = target.price * Math.min(10, holding.quantity) * (1 - FEE_RATE);
  return `
    <section class="screen no-nav">
      <div class="topbar">
        <button class="btn btn-blue back-btn" data-action="detail" data-id="${target.id}">← 返回</button>
      </div>
      <div class="trade-target panel">
        <img class="avatar large" src="${target.avatar}" alt="${target.name}" />
        <div>
          <div class="detail-name gold-text">${target.name}</div>
          <div class="detail-code">${target.code}</div>
          <div class="detail-price">${price(target.price)}</div>
        </div>
      </div>

      <div class="trade-layout">
        <div class="trade-card">
          <div class="trade-title">买入</div>
          <div class="qty-row">
            <button class="qty-step" data-action="step" data-input="buyQty" data-step="-10">-</button>
            <input id="buyQty" type="number" min="1" step="10" value="10" inputmode="numeric" />
            <button class="qty-step" data-action="step" data-input="buyQty" data-step="10">+</button>
          </div>
          <div class="trade-meta">
            <div>价格<strong>${price(target.price)}</strong></div>
            <div>预估消耗<strong>${money(buyValue)} 金币</strong></div>
          </div>
          <button class="btn btn-gold btn-wide" data-action="buy" data-id="${target.id}">买入</button>
        </div>

        <div class="trade-card">
          <div class="trade-title">卖出</div>
          <div class="qty-row">
            <button class="qty-step" data-action="step" data-input="sellQty" data-step="-10">-</button>
            <input id="sellQty" type="number" min="1" step="10" value="${Math.max(1, Math.min(10, holding.quantity || 10))}" inputmode="numeric" />
            <button class="qty-step" data-action="step" data-input="sellQty" data-step="10">+</button>
          </div>
          <div class="trade-meta">
            <div>持仓<strong>${holding.quantity} 股</strong></div>
            <div>预估到账<strong>${money(sellValue)} 金币</strong></div>
          </div>
          <button class="btn btn-red btn-wide" data-action="sell" data-id="${target.id}">卖出</button>
        </div>
      </div>

      <div class="panel">
        <div class="notice-line"><b>手续费：</b><span>0.1%，仅用于模拟交易。</span></div>
        <div class="notice-line"><b>可用金币：</b><span>${money(state.balance)} 金币</span></div>
        <div class="notice-line"><b>当前持仓：</b><span>${holding.quantity} 股，均价 ${price(holding.averageCost)}</span></div>
      </div>
      ${renderToast()}
    </section>
  `;
}

function renderHoldings() {
  const ids = Object.keys(state.holdings).filter((id) => state.holdings[id].quantity > 0);
  return `
    <section class="screen">
      ${renderTopbar("Holdings", "我的持仓")}
      <div class="dashboard-grid">
        <div class="panel stat-box">
          <div class="stat-label">总资产</div>
          <div class="stat-main">${money(totalAssets())}</div>
          <div class="stat-note">金币 + 持仓市值</div>
        </div>
        <div class="panel stat-box">
          <div class="stat-label">浮动收益</div>
          <div class="stat-main ${totalProfit() >= 0 ? "profit" : "loss"}">${formatSignedCoins(totalProfit()).replace(" 金币", "")}</div>
          <div class="stat-note">实时按当前行情计算</div>
        </div>
      </div>
      <div class="market-list">
        ${
          ids.length
            ? ids.map((id) => renderHoldingCard(getTarget(id))).join("")
            : `<div class="panel empty">暂无持仓，去行情页买入第一只标的。</div>`
        }
      </div>
      ${renderNav()}
      ${renderToast()}
    </section>
  `;
}

function renderHoldingCard(target) {
  const holding = getHolding(target.id);
  const pnl = holdingProfit(target.id);
  return `
    <article class="holding-card">
      <img class="avatar" src="${target.avatar}" alt="${target.name}" />
      <div>
        <h3 class="gold-text">${target.name}</h3>
        <p>${holding.quantity} 股 · 均价 ${price(holding.averageCost)} · 当前 ${price(target.price)}</p>
        <p class="${pnl >= 0 ? "profit" : "loss"}">收益 ${formatSignedCoins(pnl)}</p>
      </div>
      <div class="holding-actions">
        <button class="mini-btn" data-action="detail" data-id="${target.id}">查看详情</button>
        <button class="mini-btn" data-action="trade" data-id="${target.id}">继续交易</button>
      </div>
    </article>
  `;
}

function renderRankings() {
  const playerScore = Math.round(totalAssets());
  const rows = [
    { name: "张兰", score: 150000 },
    { name: "李四", score: 120000 },
    { name: "我方酒客", score: playerScore },
    { name: "陈掌柜", score: 105600 },
    { name: "月夜粉团", score: 98400 }
  ].sort((a, b) => b.score - a.score);
  return `
    <section class="screen">
      ${renderTopbar("Ranking", "玩家收益榜")}
      <div class="market-list">
        ${rows
          .map(
            (row, index) => `
              <article class="rank-row">
                <div class="rank-medal">${index + 1}</div>
                <div>
                  <div class="market-name gold-text">${row.name}</div>
                  <div class="market-code">${row.name === "我方酒客" ? "当前账号" : "模拟玩家"}</div>
                </div>
                <div class="rank-score">${money(row.score)}<br>金币</div>
              </article>
            `
          )
          .join("")}
      </div>
      ${renderNav()}
      ${renderToast()}
    </section>
  `;
}

function renderAnnouncements() {
  const latestOrder = state.orders[0];
  return `
    <section class="screen">
      ${renderTopbar("Notice", "官方公告")}
      <article class="announcement">
        <h3>【成盟总结】大盘播报</h3>
        <p>今日酒馆指数波动 ${price(marketMove())}% ，热门标的成交活跃。请注意，本 Demo 所有金币均为虚拟数值。</p>
      </article>
      <article class="announcement">
        <h3>【活动】首次交易奖励</h3>
        <p>完成买入或卖出后，持仓、余额和收益榜会即时刷新。当前版本用于交互验证，不涉及充值、提现或实物兑换。</p>
      </article>
      <article class="announcement">
        <h3>【最近委托】</h3>
        <p>${
          latestOrder
            ? `${latestOrder.time} ${latestOrder.type === "BUY" ? "买入" : "卖出"} ${getTarget(latestOrder.targetId).name} ${latestOrder.quantity} 股，价格 ${price(latestOrder.price)}。`
            : "暂无交易记录。"
        }</p>
      </article>
      <button class="btn btn-red btn-wide" data-action="reset">重置 Demo 数据</button>
      ${renderNav()}
      ${renderToast()}
    </section>
  `;
}

function renderToast() {
  return `<div class="toast ${state.toast ? "show" : ""}">${state.toast}</div>`;
}

function render() {
  const app = document.getElementById("app");
  const views = {
    home: renderHome,
    markets: renderMarkets,
    detail: renderDetail,
    trade: renderTrade,
    holdings: renderHoldings,
    rankings: renderRankings,
    announcements: renderAnnouncements
  };
  app.innerHTML = (views[state.view] || renderHome)();
}

document.addEventListener("click", (event) => {
  const element = event.target.closest("[data-action]");
  if (!element) return;
  const action = element.dataset.action;
  const id = element.dataset.id;

  if (action === "tab") {
    setView(element.dataset.tab, element.dataset.tab);
  }
  if (action === "detail") {
    setView("detail", state.activeTab, id || state.selectedId);
  }
  if (action === "trade") {
    setView("trade", state.activeTab, id || state.selectedId);
  }
  if (action === "back") {
    setView(state.activeTab || "home", state.activeTab || "home");
  }
  if (action === "buy") {
    buy(id, document.getElementById("buyQty").value);
  }
  if (action === "sell") {
    sell(id, document.getElementById("sellQty").value);
  }
  if (action === "simulate") {
    simulateMarket();
  }
  if (action === "reset") {
    resetDemo();
  }
  if (action === "step") {
    const input = document.getElementById(element.dataset.input);
    const step = Number(element.dataset.step);
    input.value = Math.max(1, (Number(input.value) || 0) + step);
  }
});

if (!state.targets) {
  state.targets = structuredClone(seedTargets);
  saveState();
}

render();
