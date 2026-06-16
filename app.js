const STORAGE_KEY = "tavern-market-storms-demo-state-v2";
const FEE_RATE = 0.001;

const seedTargets = [
  {
    "id": "stock-001",
    "code": "TM-001",
    "name": "豆豆农场",
    "alias": "炉石豆哥",
    "price": 7.38,
    "prevClose": 7.56,
    "score": 7380,
    "volume": 2630,
    "heat": 55,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "炉石豆哥 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      7.19,
      7.28,
      7.37,
      7.39,
      7.48,
      7.57,
      7.38
    ]
  },
  {
    "id": "stock-002",
    "code": "TM-002",
    "name": "可可林业",
    "alias": "林可",
    "price": 8.56,
    "prevClose": 9.24,
    "score": 8560,
    "volume": 3060,
    "heat": 62,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "林可 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      8.92,
      9.0,
      9.01,
      9.1,
      9.18,
      9.27,
      8.56
    ]
  },
  {
    "id": "stock-003",
    "code": "TM-003",
    "name": "风和电力",
    "alias": "郭风荷",
    "price": 9.74,
    "prevClose": 8.99,
    "score": 9740,
    "volume": 3490,
    "heat": 69,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "郭风荷 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      8.8,
      8.79,
      8.85,
      8.91,
      8.97,
      8.96,
      9.74
    ]
  },
  {
    "id": "stock-004",
    "code": "TM-004",
    "name": "L灯业",
    "alias": "lighting",
    "price": 10.92,
    "prevClose": 10.79,
    "score": 10920,
    "volume": 3920,
    "heat": 76,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "lighting 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      10.63,
      10.68,
      10.72,
      10.77,
      10.74,
      10.78,
      10.92
    ]
  },
  {
    "id": "stock-005",
    "code": "TM-005",
    "name": "幻领IT",
    "alias": "幻林",
    "price": 12.1,
    "prevClose": 11.82,
    "score": 12100,
    "volume": 3050,
    "heat": 83,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "幻林 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      11.1,
      11.26,
      11.42,
      11.51,
      11.67,
      11.83,
      12.1
    ]
  },
  {
    "id": "stock-006",
    "code": "TM-006",
    "name": "达安集团",
    "alias": "大安庄园",
    "price": 13.28,
    "prevClose": 14.01,
    "score": 13280,
    "volume": 3480,
    "heat": 90,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "大安庄园 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      13.35,
      13.5,
      13.58,
      13.73,
      13.88,
      14.04,
      13.28
    ]
  },
  {
    "id": "stock-007",
    "code": "TM-007",
    "name": "俺的你男装",
    "alias": "安德罗妮",
    "price": 14.46,
    "prevClose": 13.34,
    "score": 14460,
    "volume": 3910,
    "heat": 50,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "安德罗妮 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      12.89,
      12.93,
      13.04,
      13.16,
      13.27,
      13.31,
      14.46
    ]
  },
  {
    "id": "stock-008",
    "code": "TM-008",
    "name": "风二动漫",
    "alias": "风的二次救赎",
    "price": 15.64,
    "prevClose": 16.02,
    "score": 15640,
    "volume": 4340,
    "heat": 57,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "风的二次救赎 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      15.61,
      15.7,
      15.8,
      15.89,
      15.92,
      16.01,
      15.64
    ]
  },
  {
    "id": "stock-009",
    "code": "TM-009",
    "name": "呆呆动物园",
    "alias": "呆呆兽",
    "price": 6.75,
    "prevClose": 6.83,
    "score": 6750,
    "volume": 4770,
    "heat": 64,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "呆呆兽 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      6.74,
      6.77,
      6.81,
      6.77,
      6.8,
      6.84,
      6.75
    ]
  },
  {
    "id": "stock-010",
    "code": "TM-010",
    "name": "隽籽教育",
    "alias": "学妹",
    "price": 7.93,
    "prevClose": 7.86,
    "score": 7930,
    "volume": 3900,
    "heat": 71,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "学妹 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      7.4,
      7.51,
      7.55,
      7.66,
      7.77,
      7.89,
      7.93
    ]
  },
  {
    "id": "stock-011",
    "code": "TM-011",
    "name": "黄香蕉果业",
    "alias": "黄香蕉",
    "price": 9.11,
    "prevClose": 9.0,
    "score": 9110,
    "volume": 4330,
    "heat": 78,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "黄香蕉 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      8.59,
      8.63,
      8.73,
      8.84,
      8.94,
      8.97,
      9.11
    ]
  },
  {
    "id": "stock-012",
    "code": "TM-012",
    "name": "AgO科技",
    "alias": "阿尔法go",
    "price": 10.29,
    "prevClose": 10.85,
    "score": 10290,
    "volume": 4760,
    "heat": 85,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "阿尔法go 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      10.43,
      10.53,
      10.62,
      10.72,
      10.74,
      10.84,
      10.29
    ]
  },
  {
    "id": "stock-013",
    "code": "TM-013",
    "name": "离伤传媒",
    "alias": "虎牙终离殇",
    "price": 11.47,
    "prevClose": 10.74,
    "score": 11470,
    "volume": 5190,
    "heat": 92,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "虎牙终离殇 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      10.47,
      10.54,
      10.61,
      10.61,
      10.68,
      10.75,
      11.47
    ]
  },
  {
    "id": "stock-014",
    "code": "TM-014",
    "name": "激速赛车",
    "alias": "激情速八",
    "price": 12.65,
    "prevClose": 13.12,
    "score": 12650,
    "volume": 5620,
    "heat": 52,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "激情速八 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      12.97,
      13.02,
      13.0,
      13.05,
      13.1,
      13.15,
      12.65
    ]
  },
  {
    "id": "stock-015",
    "code": "TM-015",
    "name": "荣耀菜刀",
    "alias": "刀锋上的荣耀",
    "price": 13.83,
    "prevClose": 14.17,
    "score": 13830,
    "volume": 4750,
    "heat": 59,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "刀锋上的荣耀 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      13.35,
      13.46,
      13.65,
      13.84,
      14.03,
      14.14,
      13.83
    ]
  },
  {
    "id": "stock-016",
    "code": "TM-016",
    "name": "小浪宠物",
    "alias": "小狼",
    "price": 15.01,
    "prevClose": 15.19,
    "score": 15010,
    "volume": 5180,
    "heat": 66,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "小狼 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      14.43,
      14.6,
      14.76,
      14.93,
      15.02,
      15.18,
      15.01
    ]
  },
  {
    "id": "stock-017",
    "code": "TM-017",
    "name": "杰弗英语",
    "alias": "jeff",
    "price": 16.19,
    "prevClose": 16.05,
    "score": 16190,
    "volume": 5610,
    "heat": 73,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "jeff 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      15.46,
      15.6,
      15.73,
      15.79,
      15.93,
      16.06,
      16.19
    ]
  },
  {
    "id": "stock-018",
    "code": "TM-018",
    "name": "不如死保险",
    "alias": "布鲁斯",
    "price": 7.3,
    "prevClose": 7.7,
    "score": 7300,
    "volume": 6040,
    "heat": 80,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "布鲁斯 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      7.52,
      7.58,
      7.56,
      7.62,
      7.67,
      7.73,
      7.3
    ]
  },
  {
    "id": "stock-019",
    "code": "TM-019",
    "name": "尖尖运动",
    "alias": "尖尖箭",
    "price": 8.48,
    "prevClose": 8.28,
    "score": 8480,
    "volume": 6470,
    "heat": 87,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "尖尖箭 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      8.21,
      8.17,
      8.21,
      8.25,
      8.29,
      8.25,
      8.48
    ]
  },
  {
    "id": "stock-020",
    "code": "TM-020",
    "name": "贰呜呜传媒",
    "alias": "211",
    "price": 9.66,
    "prevClose": 9.32,
    "score": 9660,
    "volume": 5600,
    "heat": 94,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "211 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      8.73,
      8.86,
      8.99,
      9.12,
      9.18,
      9.31,
      9.66
    ]
  },
  {
    "id": "stock-021",
    "code": "TM-021",
    "name": "溪间旅业",
    "alias": "溪流萤间",
    "price": 10.84,
    "prevClose": 10.15,
    "score": 10840,
    "volume": 6030,
    "heat": 54,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "溪流萤间 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      9.65,
      9.77,
      9.88,
      9.93,
      10.04,
      10.16,
      10.84
    ]
  },
  {
    "id": "stock-022",
    "code": "TM-022",
    "name": "马乐邦体育",
    "alias": "小马",
    "price": 12.02,
    "prevClose": 12.32,
    "score": 12020,
    "volume": 6460,
    "heat": 61,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "小马 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      11.89,
      11.99,
      12.03,
      12.13,
      12.24,
      12.35,
      12.02
    ]
  },
  {
    "id": "stock-023",
    "code": "TM-023",
    "name": "基哥娱乐",
    "alias": "基格沃斯",
    "price": 13.2,
    "prevClose": 13.36,
    "score": 13200,
    "volume": 6890,
    "heat": 68,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "基格沃斯 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      13.07,
      13.08,
      13.16,
      13.24,
      13.32,
      13.33,
      13.2
    ]
  },
  {
    "id": "stock-024",
    "code": "TM-024",
    "name": "炮炮婚庆",
    "alias": "有局炮炮",
    "price": 14.38,
    "prevClose": 15.17,
    "score": 14380,
    "volume": 7320,
    "heat": 75,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "有局炮炮 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      14.96,
      15.02,
      15.07,
      15.12,
      15.11,
      15.16,
      14.38
    ]
  },
  {
    "id": "stock-025",
    "code": "TM-025",
    "name": "不在乎时尚",
    "alias": "在乎",
    "price": 15.56,
    "prevClose": 15.38,
    "score": 15560,
    "volume": 6450,
    "heat": 82,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "在乎 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      14.45,
      14.65,
      14.85,
      14.98,
      15.19,
      15.39,
      15.56
    ]
  },
  {
    "id": "stock-026",
    "code": "TM-026",
    "name": "鹿知道母婴",
    "alias": "炉指导",
    "price": 16.74,
    "prevClose": 16.35,
    "score": 16740,
    "volume": 6880,
    "heat": 89,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "炉指导 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      15.57,
      15.75,
      15.85,
      16.03,
      16.2,
      16.38,
      16.74
    ]
  },
  {
    "id": "stock-027",
    "code": "TM-027",
    "name": "春野摄影",
    "alias": "春日野琼",
    "price": 7.85,
    "prevClose": 7.24,
    "score": 7850,
    "volume": 7310,
    "heat": 49,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "春日野琼 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      7.01,
      7.0,
      7.07,
      7.14,
      7.21,
      7.21,
      7.85
    ]
  },
  {
    "id": "stock-028",
    "code": "TM-028",
    "name": "梦方药业",
    "alias": "梦境彼方",
    "price": 9.03,
    "prevClose": 9.37,
    "score": 9030,
    "volume": 7740,
    "heat": 56,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "梦境彼方 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      9.12,
      9.18,
      9.24,
      9.31,
      9.3,
      9.36,
      9.03
    ]
  },
  {
    "id": "stock-029",
    "code": "TM-029",
    "name": "汽汁山羊奶",
    "alias": "七只羊",
    "price": 10.21,
    "prevClose": 10.46,
    "score": 10210,
    "volume": 8170,
    "heat": 63,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "七只羊 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      10.33,
      10.37,
      10.41,
      10.38,
      10.43,
      10.47,
      10.21
    ]
  },
  {
    "id": "stock-030",
    "code": "TM-030",
    "name": "瓦力拉重工",
    "alias": "瓦莉拉",
    "price": 11.39,
    "prevClose": 12.01,
    "score": 11390,
    "volume": 7300,
    "heat": 70,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "瓦莉拉 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      11.3,
      11.46,
      11.55,
      11.71,
      11.87,
      12.04,
      11.39
    ]
  },
  {
    "id": "stock-031",
    "code": "TM-031",
    "name": "俺的兔童装",
    "alias": "安德罗妮的学徒",
    "price": 12.57,
    "prevClose": 12.46,
    "score": 12570,
    "volume": 7730,
    "heat": 77,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "安德罗妮的学徒 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      11.89,
      11.95,
      12.09,
      12.23,
      12.37,
      12.43,
      12.57
    ]
  },
  {
    "id": "stock-032",
    "code": "TM-032",
    "name": "米奇公园",
    "alias": "米奇",
    "price": 13.75,
    "prevClose": 13.59,
    "score": 13750,
    "volume": 8160,
    "heat": 84,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "米奇 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      13.07,
      13.19,
      13.31,
      13.42,
      13.47,
      13.58,
      13.75
    ]
  },
  {
    "id": "stock-033",
    "code": "TM-033",
    "name": "小糯食品",
    "alias": "小糯米",
    "price": 14.93,
    "prevClose": 14.58,
    "score": 14930,
    "volume": 8590,
    "heat": 91,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "小糯米 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      14.22,
      14.31,
      14.4,
      14.41,
      14.5,
      14.59,
      14.93
    ]
  },
  {
    "id": "stock-034",
    "code": "TM-034",
    "name": "墩墩养身",
    "alias": "墩墩盾",
    "price": 16.11,
    "prevClose": 14.97,
    "score": 16110,
    "volume": 9020,
    "heat": 51,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "墩墩盾 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      14.8,
      14.85,
      14.84,
      14.89,
      14.94,
      15.0,
      16.11
    ]
  },
  {
    "id": "stock-035",
    "code": "TM-035",
    "name": "白白羽绒服",
    "alias": "白羽",
    "price": 17.29,
    "prevClose": 17.94,
    "score": 17290,
    "volume": 8150,
    "heat": 58,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "白羽 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      16.89,
      17.05,
      17.29,
      17.52,
      17.75,
      17.91,
      17.29
    ]
  },
  {
    "id": "stock-036",
    "code": "TM-036",
    "name": "野炊夜店",
    "alias": "吹哥",
    "price": 8.4,
    "prevClose": 8.86,
    "score": 8400,
    "volume": 8580,
    "heat": 65,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "吹哥 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      8.41,
      8.51,
      8.61,
      8.72,
      8.75,
      8.85,
      8.4
    ]
  }
];

const defaultState = {
  balance: 100000,
  holdings: {
    "stock-001": { quantity: 100, averageCost: 7.1 }
  },
  orders: [],
  activeTab: "home",
  selectedId: "stock-001",
  view: "home",
  toast: ""
};

let state = loadState();

function loadState() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (!saved) return structuredClone(defaultState);
    return normalizeState({
      ...structuredClone(defaultState),
      ...saved,
      targets: mergeTargets(saved.targets)
    });
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

function normalizeState(nextState) {
  const validIds = new Set(seedTargets.map((target) => target.id));
  const holdings = {};
  for (const [id, holding] of Object.entries(nextState.holdings || {})) {
    if (validIds.has(id) && holding.quantity > 0) {
      holdings[id] = holding;
    }
  }
  if (!validIds.has(nextState.selectedId)) {
    nextState.selectedId = seedTargets[0].id;
  }
  nextState.holdings = holdings;
  return nextState;
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
    ["home", "交易"],
    ["markets", "行情"],
    ["holdings", "持仓"],
    ["rankings", "排名"],
    ["announcements", "社区"]
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
  const gainers = topGainers();
  const losers = topLosers();
  const indexValue = totalMarketIndex();
  const indexMove = marketMove();
  return `
    <section class="screen home-screen">
      <header class="market-header">
        <button class="mini-btn back-chip" data-action="simulate">刷新</button>
        <div class="home-title gold-text">炉石股神</div>
        <div class="home-date">2026.06.15</div>
        <div class="home-balance">
          <span>${money(state.balance)}</span>
          <strong>金币</strong>
        </div>
      </header>

      <div class="panel market-board">
        <div class="index-card">
          <div class="index-label gold-text">实时大盘总指数</div>
          <div class="index-value">${price(indexValue)}</div>
          <div class="index-change ${indexMove >= 0 ? "up" : "down"}">${indexMove >= 0 ? "+" : ""}${price(indexMove)}% ${indexMove >= 0 ? "⬆" : "⬇"}</div>
        </div>
        <div class="home-rank-grid">
          ${renderHomeRankList("涨幅榜", "TOP5", gainers, "up")}
          ${renderHomeRankList("跌幅榜", "TOP5", losers, "down")}
        </div>
      </div>

      <div class="home-disclaimer">
        纯娱乐模拟数据，不涉及充值、提现或真实金融交易。
      </div>
      ${renderNav()}
      ${renderToast()}
    </section>
  `;
}

function totalMarketIndex() {
  const avgPrice = targets().reduce((sum, target) => sum + target.price, 0) / targets().length;
  return avgPrice * 100;
}

function marketMove() {
  const avg = targets().reduce((sum, target) => sum + changePercent(target), 0) / targets().length;
  return avg;
}

function topGainers() {
  return [...targets()].sort((a, b) => changePercent(b) - changePercent(a)).slice(0, 5);
}

function topLosers() {
  const negative = targets().filter((target) => changePercent(target) < 0);
  const source = negative.length >= 5 ? negative : targets();
  return [...source].sort((a, b) => changePercent(a) - changePercent(b)).slice(0, 5);
}

function renderHomeRankList(title, badge, items, tone) {
  return `
    <section class="home-rank-panel ${tone}">
      <div class="home-rank-title"><span>${title}</span><b>${badge}</b></div>
      ${items
        .map((item, index) => {
          const change = changePercent(item);
          return `
            <button class="home-rank-item" data-action="detail" data-id="${item.id}">
              <span class="home-rank-index">${index + 1}.</span>
              <span class="home-rank-name">${item.name}</span>
              <span class="home-rank-price">${price(item.price)}</span>
              <span class="home-rank-change">${change >= 0 ? "+" : ""}${price(change)}%</span>
            </button>
          `;
        })
        .join("")}
    </section>
  `;
}

function formatSignedCoins(value) {
  const rounded = Math.round(value);
  if (rounded > 0) return `+${money(rounded)} 金币`;
  if (rounded < 0) return `${money(rounded)} 金币`;
  return "0 金币";
}

function renderMarketRow(target, index) {
  const change = changePercent(target);
  const tone = change >= 0 ? "up" : "down";
  return `
    <tr>
      <td class="col-rank">${index + 1}</td>
      <td class="col-name">
        <button class="stock-name-btn" data-action="detail" data-id="${target.id}">
          <strong>${target.name}</strong>
          <span>${target.code}</span>
        </button>
      </td>
      <td class="col-price">${price(target.price)}</td>
      <td class="col-change ${tone}">${change >= 0 ? "+" : ""}${price(change)}%</td>
      <td class="col-volume">${money(target.volume)}</td>
      <td class="col-heat">${target.heat}</td>
      <td class="col-actions">
        <button class="table-action primary" data-action="trade" data-id="${target.id}">交易</button>
      </td>
    </tr>
  `;
}

function renderMarkets() {
  return `
    <section class="screen market-table-screen">
      ${renderTopbar("Market", "行情大厅")}
      <div class="section-heading table-heading">
        <div>
          <div class="section-title">主播指数榜</div>
          <div class="table-note">36 支暂定股票 · 表格模式</div>
        </div>
        <button class="mini-btn" data-action="simulate">刷新行情</button>
      </div>
      <div class="stock-table-wrap">
        <table class="stock-table">
          <thead>
            <tr>
              <th>序</th>
              <th>股票</th>
              <th>现价</th>
              <th>涨跌</th>
              <th>成交</th>
              <th>热度</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            ${targets()
              .map((target, index) => renderMarketRow(target, index))
              .join("")}
          </tbody>
        </table>
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
