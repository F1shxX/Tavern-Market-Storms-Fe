const STORAGE_KEY = "tavern-market-storms-demo-state-v3";
const FEE_RATE = 0.001;
const SINGLE_STOCK_BUY_LIMIT = 0.25;
const TREND_WINDOW = 7;
const LOCAL_API_BASE_URL = ["127.0.0.1", "localhost"].includes(window.location.hostname)
  ? "http://127.0.0.1:3101"
  : "";
const API_BASE_URL = window.TMS_API_BASE_URL || LOCAL_API_BASE_URL;
const STATIC_LEADERBOARD_URL = "./data/battlegrounds-leaderboard.json";
const AUTH_STORAGE_KEY = "tavern-market-storms-auth-v1";
const SITE_DOMAIN = "luzhidao123.cn";
const ICP_BEIAN = "浙ICP备2026047968号-1";
const portraitAvatars = {
  "stock-001": "./assets/portraits/stock-001.webp",
  "stock-002": "./assets/portraits/stock-002.webp",
  "stock-003": "./assets/portraits/stock-003.webp",
  "stock-004": "./assets/portraits/stock-004.webp",
  "stock-005": "./assets/portraits/stock-005.webp",
  "stock-007": "./assets/portraits/stock-007.webp",
  "stock-009": "./assets/portraits/stock-009.webp",
  "stock-010": "./assets/portraits/stock-010.webp",
  "stock-011": "./assets/portraits/stock-011.webp",
  "stock-016": "./assets/portraits/stock-016.webp",
  "stock-017": "./assets/portraits/stock-017.webp",
  "stock-019": "./assets/portraits/stock-019.webp",
  "stock-020": "./assets/portraits/stock-020.webp",
  "stock-026": "./assets/portraits/stock-026.webp",
  "stock-027": "./assets/portraits/stock-027.webp",
  "stock-029": "./assets/portraits/stock-029.webp",
  "stock-030": "./assets/portraits/stock-030.webp",
  "stock-031": "./assets/portraits/stock-031.webp",
  "stock-034": "./assets/portraits/stock-034.webp",
  "stock-035": "./assets/portraits/stock-035.webp",
  "stock-042": "./assets/portraits/stock-042.webp"
};

const buttonAssets = {
  refresh: "./assets/buttons/trade-refresh-lite.png",
  marketTrade: "./assets/buttons/market-trade-lite.png",
  marketSync: "./assets/buttons/market-sync-lite.png",
  holdingDetail: "./assets/buttons/holding-detail-lite.png",
  holdingTrade: "./assets/buttons/holding-trade-lite.png",
  buy: "./assets/buttons/buy-wide-lite.png",
  sell: "./assets/buttons/sell-wide-lite.png",
  back: "./assets/buttons/back-blue-lite.png"
};

const seedTargets = [
  {
    "id": "stock-001",
    "code": "TM-001",
    "name": "豆豆农场",
    "alias": "炉石豆哥",
    "gameName": "炉石豆哥",
    "price": 7.38,
    "prevClose": 7.56,
    "score": 7380,
    "volume": 2630,
    "heat": 55,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "炉石豆哥 / 炉石豆哥 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "抖音丶炉石林可",
    "price": 8.56,
    "prevClose": 9.24,
    "score": 8560,
    "volume": 3060,
    "heat": 62,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "林可 / 抖音丶炉石林可 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "郭枫荷",
    "price": 9.74,
    "prevClose": 8.99,
    "score": 9740,
    "volume": 3490,
    "heat": 69,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "郭风荷 / 郭枫荷 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "Lighting",
    "price": 10.92,
    "prevClose": 10.79,
    "score": 10920,
    "volume": 3920,
    "heat": 76,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "lighting / Lighting 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "幻之泪伤",
    "price": 12.1,
    "prevClose": 11.82,
    "score": 12100,
    "volume": 3050,
    "heat": 83,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "幻林 / 幻之泪伤 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "标蓝股票的均值",
    "price": 13.28,
    "prevClose": 14.01,
    "score": 13280,
    "volume": 3480,
    "heat": 90,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "大安庄园 / 标蓝股票的均值 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "无耻之徒",
    "price": 14.46,
    "prevClose": 13.34,
    "score": 14460,
    "volume": 3910,
    "heat": 50,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "安德罗妮 / 无耻之徒 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "风的二次救赎",
    "price": 15.64,
    "prevClose": 16.02,
    "score": 15640,
    "volume": 4340,
    "heat": 57,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "风的二次救赎 / 风的二次救赎 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "仙居呆呆兽",
    "price": 6.75,
    "prevClose": 6.83,
    "score": 6750,
    "volume": 4770,
    "heat": 64,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "呆呆兽 / 仙居呆呆兽 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "抖音丨学妹是娟子",
    "price": 7.93,
    "prevClose": 7.86,
    "score": 7930,
    "volume": 3900,
    "heat": 71,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "学妹 / 抖音丨学妹是娟子 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "大安庄园黄香蕉",
    "price": 9.11,
    "prevClose": 9.0,
    "score": 9110,
    "volume": 4330,
    "heat": 78,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "黄香蕉 / 大安庄园黄香蕉 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "Zorgo",
    "price": 10.29,
    "prevClose": 10.85,
    "score": 10290,
    "volume": 4760,
    "heat": 85,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "阿尔法go / Zorgo 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "虎牙丶终离殇",
    "price": 11.47,
    "prevClose": 10.74,
    "score": 11470,
    "volume": 5190,
    "heat": 92,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "虎牙终离殇 / 虎牙丶终离殇 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "斗鱼激情速八",
    "price": 12.65,
    "prevClose": 13.12,
    "score": 12650,
    "volume": 5620,
    "heat": 52,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "激情速八 / 斗鱼激情速八 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "刀锋上的荣耀",
    "price": 13.83,
    "prevClose": 14.17,
    "score": 13830,
    "volume": 4750,
    "heat": 59,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "刀锋上的荣耀 / 刀锋上的荣耀 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "抖音|有局|小狼",
    "price": 15.01,
    "prevClose": 15.19,
    "score": 15010,
    "volume": 5180,
    "heat": 66,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "小狼 / 抖音|有局|小狼 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "jeff",
    "price": 16.19,
    "prevClose": 16.05,
    "score": 16190,
    "volume": 5610,
    "heat": 73,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "jeff / jeff 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "DouyinBruise",
    "price": 7.3,
    "prevClose": 7.7,
    "score": 7300,
    "volume": 6040,
    "heat": 80,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "布鲁斯 / DouyinBruise 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "虎牙|尖尖箭",
    "price": 8.48,
    "prevClose": 8.28,
    "score": 8480,
    "volume": 6470,
    "heat": 87,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "尖尖箭 / 虎牙|尖尖箭 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "呜呜呜呜呜呜",
    "price": 9.66,
    "prevClose": 9.32,
    "score": 9660,
    "volume": 5600,
    "heat": 94,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "211 / 呜呜呜呜呜呜 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "彩虹|溪流萤间",
    "price": 10.84,
    "prevClose": 10.15,
    "score": 10840,
    "volume": 6030,
    "heat": 54,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "溪流萤间 / 彩虹|溪流萤间 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "乐邦詹士",
    "price": 12.02,
    "prevClose": 12.32,
    "score": 12020,
    "volume": 6460,
    "heat": 61,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "小马 / 乐邦詹士 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "告辞|基格沃斯",
    "price": 13.2,
    "prevClose": 13.36,
    "score": 13200,
    "volume": 6890,
    "heat": 68,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "基格沃斯 / 告辞|基格沃斯 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "有局|炮炮",
    "price": 14.38,
    "prevClose": 15.17,
    "score": 14380,
    "volume": 7320,
    "heat": 75,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "有局炮炮 / 有局|炮炮 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "在乎",
    "price": 15.56,
    "prevClose": 15.38,
    "score": 15560,
    "volume": 6450,
    "heat": 82,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "在乎 / 在乎 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "抖音炉指导",
    "price": 16.74,
    "prevClose": 16.35,
    "score": 16740,
    "volume": 6880,
    "heat": 89,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "炉指导 / 抖音炉指导 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "春日野穹",
    "price": 7.85,
    "prevClose": 7.24,
    "score": 7850,
    "volume": 7310,
    "heat": 49,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "春日野琼 / 春日野穹 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "抖音丨梦境彼方",
    "price": 9.03,
    "prevClose": 9.37,
    "score": 9030,
    "volume": 7740,
    "heat": 56,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "梦境彼方 / 抖音丨梦境彼方 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "抖音七只羊",
    "price": 10.21,
    "prevClose": 10.46,
    "score": 10210,
    "volume": 8170,
    "heat": 63,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "七只羊 / 抖音七只羊 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "把把金铜须",
    "price": 11.39,
    "prevClose": 12.01,
    "score": 11390,
    "volume": 7300,
    "heat": 70,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "瓦莉拉 / 把把金铜须 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "抖音安德罗妮学徒",
    "price": 12.57,
    "prevClose": 12.46,
    "score": 12570,
    "volume": 7730,
    "heat": 77,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "安德罗妮的学徒 / 抖音安德罗妮学徒 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "告辞丨米奇猪猪",
    "price": 13.75,
    "prevClose": 13.59,
    "score": 13750,
    "volume": 8160,
    "heat": 84,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "米奇 / 告辞丨米奇猪猪 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "抖音小糯米",
    "price": 14.93,
    "prevClose": 14.58,
    "score": 14930,
    "volume": 8590,
    "heat": 91,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "小糯米 / 抖音小糯米 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "name": "吨吨养身",
    "alias": "新娘",
    "gameName": "虎牙丨吨吨盾",
    "price": 16.11,
    "prevClose": 14.97,
    "score": 16110,
    "volume": 9020,
    "heat": 51,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "新娘 / 虎牙丨吨吨盾 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "抖音|炉石白羽",
    "price": 17.29,
    "prevClose": 17.94,
    "score": 17290,
    "volume": 8150,
    "heat": 58,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "白羽 / 抖音|炉石白羽 相关模拟指数，当前用于炉市风云 Demo 展示。",
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
    "gameName": "南怀北瑾|林川",
    "price": 8.4,
    "prevClose": 8.86,
    "score": 8400,
    "volume": 8580,
    "heat": 65,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "吹哥 / 南怀北瑾|林川 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      8.41,
      8.51,
      8.61,
      8.72,
      8.75,
      8.85,
      8.4
    ]
  },
  {
    "id": "stock-037",
    "code": "TM-037",
    "name": "婀姿美容",
    "alias": "阿紫",
    "gameName": "抖音|阿紫",
    "price": 9.58,
    "prevClose": 9.7,
    "score": 9580,
    "volume": 9010,
    "heat": 72,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "阿紫 / 抖音|阿紫 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      9.34,
      9.43,
      9.52,
      9.53,
      9.62,
      9.71,
      9.58
    ]
  },
  {
    "id": "stock-038",
    "code": "TM-038",
    "name": "西城餐饮",
    "alias": "胖枫",
    "gameName": "夕尘残枫",
    "price": 10.76,
    "prevClose": 10.66,
    "score": 10760,
    "volume": 9440,
    "heat": 79,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "胖枫 / 夕尘残枫 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      10.41,
      10.48,
      10.48,
      10.55,
      10.62,
      10.69,
      10.76
    ]
  },
  {
    "id": "stock-039",
    "code": "TM-039",
    "name": "高磁集团",
    "alias": "告辞集团",
    "gameName": "标黄股票的均值",
    "price": 11.94,
    "prevClose": 12.59,
    "score": 11940,
    "volume": 9870,
    "heat": 86,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "告辞集团 / 标黄股票的均值 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      12.47,
      12.44,
      12.49,
      12.54,
      12.59,
      12.56,
      11.94
    ]
  },
  {
    "id": "stock-040",
    "code": "TM-040",
    "name": "EM苹果乐园",
    "alias": "恶魔苹果",
    "gameName": "抖音丶恶魔苹果",
    "price": 13.12,
    "prevClose": 12.81,
    "score": 13120,
    "volume": 9000,
    "heat": 93,
    "avatar": "./assets/avatars/stormbard.svg",
    "quote": "恶魔苹果 / 抖音丶恶魔苹果 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      12.01,
      12.19,
      12.36,
      12.53,
      12.63,
      12.8,
      13.12
    ]
  },
  {
    "id": "stock-041",
    "code": "TM-041",
    "name": "李子书院",
    "alias": "里子",
    "gameName": "云黎子昭",
    "price": 14.3,
    "prevClose": 13.39,
    "score": 14300,
    "volume": 9430,
    "heat": 53,
    "avatar": "./assets/avatars/evenlock.svg",
    "quote": "里子 / 云黎子昭 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      12.74,
      12.88,
      13.03,
      13.11,
      13.25,
      13.4,
      14.3
    ]
  },
  {
    "id": "stock-042",
    "code": "TM-042",
    "name": "KK拳击馆",
    "alias": "Kimmy",
    "gameName": "自在极意豪",
    "price": 15.48,
    "prevClose": 16.06,
    "score": 15480,
    "volume": 9860,
    "heat": 60,
    "avatar": "./assets/avatars/bronzebeard.svg",
    "quote": "Kimmy / 自在极意豪 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      15.49,
      15.62,
      15.69,
      15.82,
      15.95,
      16.09,
      15.48
    ]
  },
  {
    "id": "stock-043",
    "code": "TM-043",
    "name": "乔七古玩",
    "alias": "乔奇乔",
    "gameName": "抖音乔奇乔",
    "price": 16.66,
    "prevClose": 17.07,
    "score": 16660,
    "volume": 10290,
    "heat": 67,
    "avatar": "./assets/avatars/moonfox.svg",
    "quote": "乔奇乔 / 抖音乔奇乔 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      16.69,
      16.72,
      16.82,
      16.92,
      17.02,
      17.04,
      16.66
    ]
  },
  {
    "id": "stock-044",
    "code": "TM-044",
    "name": "优巨集团",
    "alias": "有局",
    "gameName": "标绿股票的均值",
    "price": 17.84,
    "prevClose": 19.27,
    "score": 17840,
    "volume": 10720,
    "heat": 74,
    "avatar": "./assets/avatars/embercat.svg",
    "quote": "有局 / 标绿股票的均值 相关模拟指数，当前用于炉市风云 Demo 展示。",
    "trend": [
      19.01,
      19.08,
      19.14,
      19.2,
      19.2,
      19.26,
      17.84
    ]
  }
];

const marketGroups = [
  {
    id: "daan",
    name: "达安集团",
    shortName: "达安",
    tone: "blue",
    indexId: "stock-006",
    memberIds: [
      "stock-003",
      "stock-005",
      "stock-007",
      "stock-009",
      "stock-010",
      "stock-011",
      "stock-018",
      "stock-027"
    ]
  },
  {
    id: "gaoci",
    name: "高磁集团",
    shortName: "高磁",
    tone: "yellow",
    indexId: "stock-039",
    memberIds: ["stock-004", "stock-023", "stock-032"]
  },
  {
    id: "youju",
    name: "优巨集团",
    shortName: "优巨",
    tone: "green",
    indexId: "stock-044",
    memberIds: ["stock-016", "stock-024"]
  }
];

const leaderboardNameAliases = {
  "stock-001": ["炉石豆哥"],
  "stock-002": ["抖音丶炉石林可", "抖音丨炉石林可", "抖音|炉石林可", "炉石林可", "林可"],
  "stock-003": ["郭枫荷", "郭风荷"],
  "stock-004": ["lighting", "Lighting"],
  "stock-007": ["无耻之徒", "虎牙安德罗妮", "安德罗妮"],
  "stock-008": ["风的二次救赎"],
  "stock-010": ["抖音丨学妹是娟子", "抖音|学妹是娟子", "学妹是娟子", "学妹"],
  "stock-013": ["虎牙丶终离殇", "虎牙丨终离殇", "虎牙终离殇"],
  "stock-016": ["抖音丨有局丨小狼", "抖音|有局|小狼", "有局小狼", "小狼"],
  "stock-017": ["jeef", "jeff"],
  "stock-019": ["虎牙丨尖尖箭", "虎牙|尖尖箭", "尖尖箭"],
  "stock-020": ["呜呜呜呜呜呜"],
  "stock-021": ["彩虹丨溪流萤间", "彩虹|溪流萤间", "溪流萤间"],
  "stock-022": ["乐邦詹士"],
  "stock-023": ["告辞丨基格沃斯", "告辞|基格沃斯", "基格沃斯"],
  "stock-024": ["有局丨炮炮", "有局|炮炮", "炮炮"],
  "stock-025": ["在乎"],
  "stock-027": ["春日野穹", "春日野琼"],
  "stock-028": ["抖音丨梦境彼方", "抖音|梦境彼方", "梦境彼方"],
  "stock-032": ["告辞丨米奇猪猪", "告辞|米奇猪猪", "米奇猪猪", "米奇"],
  "stock-033": ["抖音小糯米", "小糯米"],
  "stock-034": ["虎牙丨吨吨盾", "虎牙|吨吨盾", "吨吨盾", "新娘"],
  "stock-031": ["抖音安德罗妮学徒", "安德罗妮学徒"],
  "stock-035": ["抖音丨炉石白羽", "抖音|炉石白羽", "炉石白羽"],
  "stock-036": ["南怀北瑾|林川", "南怀北瑾丨林川", "南怀北瑾林川", "林川", "吹哥"],
  "stock-037": ["抖音|阿紫", "抖音丨阿紫", "阿紫"],
  "stock-040": ["抖音丶恶魔苹果", "抖音丨恶魔苹果", "抖音|恶魔苹果", "恶魔苹果"],
  "stock-043": ["抖音乔奇乔", "乔奇乔"]
};

const defaultState = {
  balance: 100000,
  holdings: {
    "stock-001": { quantity: 100, averageCost: 7.1 }
  },
  orders: [],
  activeTab: "home",
  selectedId: "stock-001",
  view: "home",
  toast: "",
  marketSync: null
};

let state = loadState();
state.auth = loadAuth();
state.authStep = "phone";
state.authBusy = false;
state.loginPhone = "";

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

function loadAuth() {
  try {
    const auth = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY));
    if (!auth?.token) return null;
    return auth;
  } catch {
    return null;
  }
}

function saveAuth(auth) {
  if (!auth?.token) {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    state.auth = null;
    return;
  }
  state.auth = auth;
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
}

function authHeaders() {
  return state.auth?.token ? { authorization: `Bearer ${state.auth.token}` } : {};
}

async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "content-type": "application/json",
      ...authHeaders(),
      ...(options.headers || {})
    }
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok || payload.ok === false) {
    throw new Error(payload.message || payload.error || `Request failed: ${response.status}`);
  }
  return payload.data ?? payload;
}

function orderTime(order) {
  const date = order.createdAt ? new Date(order.createdAt) : new Date();
  return date.toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
}

function applyPortfolio(portfolio) {
  if (!portfolio) return;
  state.balance = Number(portfolio.balance ?? portfolio.player?.balance ?? state.balance);
  state.holdings = {};
  for (const holding of portfolio.holdings || []) {
    if (holding.quantity > 0) {
      state.holdings[holding.targetId] = {
        quantity: holding.quantity,
        averageCost: holding.averageCost
      };
    }
  }
  state.orders = (portfolio.orders || []).map((order) => ({
    type: order.type,
    targetId: order.targetId,
    quantity: order.quantity,
    price: order.price,
    fee: order.fee,
    time: orderTime(order)
  }));
  if (portfolio.player && state.auth) {
    saveAuth({ ...state.auth, player: portfolio.player });
  }
  saveState();
}

async function loadRemotePortfolio({ silent = false } = {}) {
  if (!state.auth?.token) return;
  try {
    const portfolio = await apiRequest("/api/me");
    applyPortfolio(portfolio);
    render();
  } catch (error) {
    console.warn("Failed to load player portfolio.", error);
    saveAuth(null);
    if (!silent) showToast("登录已失效，请重新验证手机号。");
    render();
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
      marketSync: state.marketSync,
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

function normalizeLeaderboardName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[|｜丨丶·\s_\-—–]/g, "");
}

function leaderboardNamesForTarget(target) {
  return [
    target.gameName,
    target.alias,
    target.name,
    ...(leaderboardNameAliases[target.id] || [])
  ]
    .filter(Boolean)
    .map(normalizeLeaderboardName)
    .filter(Boolean);
}

function findLeaderboardRow(target, rowMap) {
  const names = leaderboardNamesForTarget(target);
  for (const name of names) {
    if (rowMap.has(name)) return rowMap.get(name);
  }
  return null;
}

function deterministicOutsideScore(target, floorScore) {
  const currentScore = Math.round((target.score || target.price * 1000 || 9000));
  const safeFloor = Math.max(5000, Number(floorScore) || 11000);
  const seed = [...target.id].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  const swing = Math.round(Math.sin(Date.now() / 3600000 + seed) * 140 + (seed % 97) - 48);
  const lower = Math.max(3000, safeFloor - Math.max(900, Math.round(safeFloor * 0.1)));
  const next = Math.max(lower, Math.min(safeFloor - 1, currentScore + swing));
  return Math.round(next);
}

function priceFromScore(score) {
  return Number(Math.max(3, Number(score) / 1000).toFixed(2));
}

function normalizedScoreHistory(scores, fallbackScore) {
  const values = Array.isArray(scores)
    ? scores.map((score) => Number(score)).filter((score) => Number.isFinite(score) && score > 0)
    : [];
  const nextFallback = Number(fallbackScore);
  if (Number.isFinite(nextFallback) && nextFallback > 0) values.push(nextFallback);
  const recent = values.slice(-TREND_WINDOW);
  if (!recent.length && Number.isFinite(nextFallback) && nextFallback > 0) return [nextFallback];
  return recent;
}

function buildScoreTrend(target, scoreHistory, nextScore) {
  if (scoreHistory.length >= 2) {
    return scoreHistory.map(priceFromScore);
  }
  const currentPrice = target.price || priceFromScore(nextScore);
  const nextPrice = priceFromScore(nextScore);
  const span = TREND_WINDOW - 1;
  return Array.from({ length: TREND_WINDOW }, (_, index) => {
    const ratio = span ? index / span : 1;
    const eased = ratio * ratio * (3 - 2 * ratio);
    return Number((currentPrice + (nextPrice - currentPrice) * eased).toFixed(2));
  });
}

function applyTargetScore(target, nextScore, syncMeta = {}) {
  const scoreHistory = normalizedScoreHistory(syncMeta.scoreHistory, nextScore);
  const nextTrend = buildScoreTrend(target, scoreHistory, nextScore);
  const prevPrice = nextTrend.length > 1 ? nextTrend[nextTrend.length - 2] : target.price;
  const nextPrice = Number(Math.max(3, nextScore / 1000).toFixed(2));
  const swing = prevPrice ? (nextPrice - prevPrice) / prevPrice : 0;
  target.prevClose = prevPrice;
  target.price = nextPrice;
  target.score = Math.round(nextScore);
  target.volume = Math.max(900, Math.round(target.volume * (1 + Math.min(0.45, Math.abs(swing) * 5))));
  target.heat = Math.max(35, Math.min(99, Math.round(target.heat + swing * 180)));
  target.trend = nextTrend;
  target.sync = { ...syncMeta, scoreHistory };
}

function getTarget(id) {
  return targets().find((target) => target.id === id) || targets()[0];
}

function avatarFor(target) {
  return portraitAvatars[target.id] || target.avatar;
}

function avatarClassFor(target, extra = "") {
  return `avatar${portraitAvatars[target.id] ? " portrait-avatar" : ""}${extra ? ` ${extra}` : ""}`;
}

function getHolding(id) {
  return state.holdings[id] || { quantity: 0, averageCost: 0 };
}

function marketGroupForTarget(targetId) {
  for (const group of marketGroups) {
    if (group.indexId === targetId) return { group, role: "index" };
    if (group.memberIds.includes(targetId)) return { group, role: "member" };
  }
  return null;
}

function groupMembers(group) {
  return group.memberIds.map((id) => getTarget(id));
}

function buyMaxQuantity(target) {
  const stockBudget = totalAssets() * SINGLE_STOCK_BUY_LIMIT;
  const currentExposure = holdingValue(target.id);
  const remainingBudget = Math.max(0, stockBudget - currentExposure);
  const orderBudget = Math.min(state.balance, remainingBudget);
  return Math.max(0, Math.floor(orderBudget / (target.price * (1 + FEE_RATE))));
}

function sellMaxQuantity(targetId) {
  return Math.max(0, getHolding(targetId).quantity);
}

function clampQuantity(value, max, min = 1) {
  const parsed = Math.floor(Number(value) || 0);
  if (max <= 0) return 0;
  return Math.max(min, Math.min(max, parsed));
}

function estimateBuy(target, quantity) {
  return target.price * quantity * (1 + FEE_RATE);
}

function estimateSell(target, quantity) {
  return target.price * quantity * (1 - FEE_RATE);
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

async function buy(targetId, quantity) {
  if (!state.auth?.token) {
    showToast("Please sign in with your phone first.");
    return;
  }
  const target = getTarget(targetId);
  const maxQty = buyMaxQuantity(target);
  const qty = clampQuantity(quantity, maxQty);
  if (qty <= 0) {
    showToast("Order exceeds the 25% limit or balance is insufficient.");
    return;
  }
  const gross = target.price * qty;
  const fee = gross * FEE_RATE;
  const cost = gross + fee;
  if (cost > state.balance) {
    showToast("Insufficient balance.");
    return;
  }

  try {
    const data = await apiRequest("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        side: "BUY",
        targetId,
        quantity: qty,
        price: target.price
      })
    });
    applyPortfolio(data.portfolio);
    showToast(`Buy filled: ${target.name} ${qty}`);
    render();
  } catch (error) {
    showToast(error.message || "Buy failed.");
  }
}

async function sell(targetId, quantity) {
  if (!state.auth?.token) {
    showToast("Please sign in with your phone first.");
    return;
  }
  const target = getTarget(targetId);
  const holding = getHolding(targetId);
  const qty = clampQuantity(quantity, holding.quantity);
  if (qty <= 0) {
    showToast("Insufficient holding.");
    return;
  }

  try {
    const data = await apiRequest("/api/orders", {
      method: "POST",
      body: JSON.stringify({
        side: "SELL",
        targetId,
        quantity: qty,
        price: target.price
      })
    });
    applyPortfolio(data.portfolio);
    showToast(`Sell filled: ${target.name} ${qty}`);
    render();
  } catch (error) {
    showToast(error.message || "Sell failed.");
  }
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
  recalculateGroupIndexTargets();
  saveState();
  showToast("行情已刷新，K线和持仓收益已更新。");
}

function recalculateGroupIndexTargets() {
  for (const group of marketGroups) {
    const indexTarget = getTarget(group.indexId);
    const members = groupMembers(group);
    if (!indexTarget || !members.length) continue;
    const nextScore = Math.round(members.reduce((sum, target) => sum + target.score, 0) / members.length);
    const scoreHistory = Array.from({ length: TREND_WINDOW }, (_, index) => {
      const memberScores = members.map((target) => Math.round((target.trend?.[index] || target.price) * 1000));
      return Math.round(memberScores.reduce((sum, score) => sum + score, 0) / memberScores.length);
    });
    applyTargetScore(indexTarget, nextScore, {
      source: "group-average",
      groupId: group.id,
      matched: true,
      scoreHistory
    });
  }
}

async function fetchLeaderboardSnapshot() {
  if (API_BASE_URL) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/leaderboard/battlegrounds`);
      if (!response.ok) {
        throw new Error(`leaderboard ${response.status}`);
      }
      const payload = await response.json();
      if (!payload.ok || !payload.data) {
        throw new Error(payload.message || "leaderboard unavailable");
      }
      return payload.data;
    } catch (error) {
      console.warn("Backend leaderboard sync failed, trying static snapshot.", error);
    }
  }

  const response = await fetch(`${STATIC_LEADERBOARD_URL}?v=${Date.now()}`, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(`leaderboard snapshot ${response.status}`);
  }
  const payload = await response.json();
  const data = payload.data || payload;
  if (!data?.rows) {
    throw new Error(payload.message || "leaderboard unavailable");
  }
  return data;
}

async function syncMarketFromLeaderboard({ silent = false } = {}) {
  const snapshot = await fetchLeaderboardSnapshot();
  const rowMap = new Map(
    snapshot.rows.map((row) => [row.normalizedBattleTag || normalizeLeaderboardName(row.battleTag), row])
  );
  let matched = 0;
  let unmatched = 0;

  targets().forEach((target) => {
    if (marketGroups.some((group) => group.indexId === target.id)) return;
    const row = findLeaderboardRow(target, rowMap);
    if (row) {
      matched += 1;
      applyTargetScore(target, row.score, {
        source: "blizzard-cn",
        matched: true,
        rank: row.position,
        battleTag: row.battleTag,
        scoreHistory: row.scoreHistory
      });
    } else {
      unmatched += 1;
      applyTargetScore(target, deterministicOutsideScore(target, snapshot.floorScore), {
        source: "outside-top-500",
        matched: false,
        floorScore: snapshot.floorScore,
        scoreHistory: target.sync?.source === "outside-top-500" ? target.sync.scoreHistory : null
      });
    }
  });
  recalculateGroupIndexTargets();
  state.marketSync = {
    status: "synced",
    source: `${snapshot.modeLabel || "酒馆战棋"} ${snapshot.seasonLabel || "第13赛季"}`,
    updatedAt: snapshot.updatedAt,
    syncedAt: new Date().toISOString(),
    matched,
    unmatched,
    floorScore: snapshot.floorScore,
    floorRank: snapshot.floorRank,
    cached: snapshot.cached
  };
  saveState();
  if (!silent) {
    showToast(`已同步官网积分：命中 ${matched} 支，500名门槛 ${money(snapshot.floorScore)}`);
  } else {
    render();
  }
  return state.marketSync;
}

async function refreshMarketData() {
  try {
    state.marketSync = {
      status: "syncing",
      message: "正在同步官网积分...",
      syncedAt: new Date().toISOString()
    };
    saveState();
    render();
    await syncMarketFromLeaderboard();
  } catch (error) {
    console.warn("Leaderboard sync failed, using local simulation.", error);
    state.marketSync = {
      status: "fallback",
      message: "官网同步失败，已使用本地随机行情",
      syncedAt: new Date().toISOString()
    };
    simulateMarket();
  }
}

function shouldAutoSyncMarket() {
  if (state.marketSync?.status === "syncing") return false;
  if (state.marketSync?.status !== "synced") return true;
  const syncedAt = new Date(state.marketSync.syncedAt).getTime();
  return !Number.isFinite(syncedAt) || Date.now() - syncedAt > 10 * 60 * 1000;
}

function maybeAutoSyncMarket() {
  if (state.view !== "markets" || !shouldAutoSyncMarket()) return;
  state.marketSync = {
    status: "syncing",
    message: "正在同步官网积分...",
    syncedAt: new Date().toISOString()
  };
  saveState();
  render();
  syncMarketFromLeaderboard({ silent: true }).catch((error) => {
    console.warn("Leaderboard auto sync failed.", error);
    state.marketSync = {
      status: "fallback",
      message: "官网同步失败，保留本地演示行情",
      syncedAt: new Date().toISOString()
    };
    saveState();
    render();
  });
}

async function requestOtp() {
  const phoneInput = document.getElementById("loginPhone");
  const phone = phoneInput?.value?.trim() || state.loginPhone;
  if (!phone) {
    showToast("请输入手机号。");
    return;
  }
  state.authBusy = true;
  state.loginPhone = phone;
  render();
  try {
    const data = await apiRequest("/api/auth/request-otp", {
      method: "POST",
      body: JSON.stringify({ phone })
    });
    state.authStep = "code";
    state.authBusy = false;
    state.loginPhone = phone;
    render();
    showToast(data.debugCode ? `验证码：${data.debugCode}` : "验证码已发送。");
  } catch (error) {
    state.authBusy = false;
    render();
    showToast(error.message || "验证码发送失败。");
  }
}

async function verifyOtp() {
  const phone = document.getElementById("loginPhone")?.value?.trim() || state.loginPhone;
  const code = document.getElementById("loginCode")?.value?.trim();
  if (!phone || !code) {
    showToast("请输入手机号和验证码。");
    return;
  }
  state.authBusy = true;
  render();
  try {
    const data = await apiRequest("/api/auth/verify-otp", {
      method: "POST",
      body: JSON.stringify({ phone, code })
    });
    saveAuth({
      token: data.token,
      expiresAt: data.expiresAt,
      player: data.player
    });
    state.authBusy = false;
    state.authStep = "phone";
    state.loginPhone = "";
    await loadRemotePortfolio({ silent: true });
    setView("home", "home");
    showToast("登录成功。");
  } catch (error) {
    state.authBusy = false;
    render();
    showToast(error.message || "登录失败。");
  }
}

async function logout() {
  try {
    await apiRequest("/api/auth/logout", { method: "POST", body: "{}" });
  } catch (error) {
    console.warn("Logout request failed.", error);
  }
  saveAuth(null);
  state.authStep = "phone";
  render();
}

function resetDemo() {
  state = structuredClone(defaultState);
  state.targets = structuredClone(seedTargets);
  state.auth = loadAuth();
  state.authStep = "phone";
  state.authBusy = false;
  state.loginPhone = "";
  saveState();
  showToast("Demo 已重置。");
}

function setView(view, tab = view, selectedId = state.selectedId) {
  state.view = view;
  state.activeTab = tab || state.activeTab || "home";
  state.selectedId = selectedId;
  saveState();
  render();
  maybeAutoSyncMarket();
}

function tradeQuantityLimit(input) {
  const target = getTarget(state.selectedId);
  return input.dataset.side === "sell" ? sellMaxQuantity(target.id) : buyMaxQuantity(target);
}

function updateTradeEstimate(input, shouldClamp = false) {
  if (!input || !input.dataset.estimate) return 0;
  const target = getTarget(state.selectedId);
  const max = tradeQuantityLimit(input);
  const raw = Math.floor(Number(input.value) || 0);
  const qty = shouldClamp || raw > max || raw < 0 ? clampQuantity(raw, max) : Math.max(0, raw);
  if (shouldClamp || raw > max || raw < 0) {
    input.value = qty;
  }
  const estimate = input.dataset.side === "sell" ? estimateSell(target, qty) : estimateBuy(target, qty);
  const estimateElement = document.getElementById(input.dataset.estimate);
  if (estimateElement) {
    estimateElement.textContent = `${money(estimate)} 金币`;
  }
  return qty;
}

function renderTopbar(title, subtitle = "Streamer Stock Trade") {
  const player = state.auth?.player;
  return `
    <div class="topbar">
      <div class="brand">
        <h1 class="hero-title">${title}</h1>
        <h2>${player ? `${subtitle} - ${player.displayName || player.phone}` : subtitle}</h2>
      </div>
      <div class="balance-pill">
        <span>Coins</span>
        <strong>${money(state.balance)}</strong>
      </div>
    </div>
  `;
}

function renderLogin() {
  const busy = state.authBusy ? "disabled" : "";
  return `
    <section class="screen login-screen">
      <div class="login-panel">
        <div class="login-brand">
          <h1 class="hero-title">Tavern Market</h1>
          <h2>Sign in with phone to play</h2>
        </div>
        <label class="login-field">
          <span>Phone</span>
          <input id="loginPhone" class="login-input" type="tel" inputmode="tel" autocomplete="tel" placeholder="Phone number" value="${state.loginPhone || ""}" />
        </label>
        ${
          state.authStep === "code"
            ? `
              <label class="login-field">
                <span>OTP</span>
                <input id="loginCode" class="login-input" type="text" inputmode="numeric" autocomplete="one-time-code" maxlength="6" placeholder="6-digit code" />
              </label>
            `
            : ""
        }
        <div class="login-actions">
          ${
            state.authStep === "code"
              ? `<button class="btn btn-green btn-wide" data-action="verify-otp" ${busy}>Sign In</button>
                 <button class="btn btn-blue btn-wide" data-action="request-otp" ${busy}>Resend Code</button>`
              : `<button class="btn btn-green btn-wide" data-action="request-otp" ${busy}>Send Code</button>`
          }
        </div>
        <p class="login-note">Your account, coins, holdings, and orders are saved to the database.</p>
      </div>
      ${renderSiteFiling()}
      ${renderToast()}
    </section>
  `;
}

function renderImageButton({ className = "", action, id = "", label, image }) {
  const idAttribute = id ? ` data-id="${id}"` : "";
  return `
    <button class="image-button ${className}" data-action="${action}"${idAttribute} aria-label="${label}">
      <img class="image-button-img" src="${image}" alt="${label}" />
    </button>
  `;
}

function renderNav() {
  const tabs = [
    ["home", "交易", "./assets/nav/nav-trade-lite.png"],
    ["markets", "行情", "./assets/nav/nav-market-lite.png"],
    ["holdings", "持仓", "./assets/nav/nav-holdings-lite.png"],
    ["rankings", "排名", "./assets/nav/nav-rankings-lite.png"],
    ["announcements", "社区", "./assets/nav/nav-community-lite.png"]
  ];
  return `
    <nav class="nav">
      ${tabs
        .map(
          ([key, label, image]) => `
            <button class="nav-image-button ${state.activeTab === key ? "active" : ""}" data-action="tab" data-tab="${key}" aria-label="${label}">
              <img class="nav-button-img" src="${image}" alt="" />
            </button>
          `
        )
        .join("")}
    </nav>
  `;
}

function renderSiteFiling() {
  return `
    <footer class="site-filing">
      <a href="https://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">${ICP_BEIAN}</a>
      <span>${SITE_DOMAIN}</span>
    </footer>
  `;
}

function renderInteractionDialog() {
  return `
    <section class="interaction-dialog" aria-label="互动对话">
      <div class="interaction-speaker">旅店老板</div>
      <p>后续互动内容将在这里展示：任务提示、股票事件、角色对话和确认操作都会使用这个文本框。</p>
      <div class="interaction-actions">
        <button class="interaction-choice" type="button" disabled>即将开放</button>
      </div>
    </section>
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
        ${renderImageButton({ className: "back-chip refresh-image-button", action: "simulate", label: "刷新", image: buttonAssets.refresh })}
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
      ${renderSiteFiling()}
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

function renderMarketGroups() {
  return `
    <section class="group-board" aria-label="集团板块">
      ${marketGroups.map((group) => renderMarketGroupCard(group)).join("")}
    </section>
  `;
}

function renderMarketGroupCard(group) {
  const indexTarget = getTarget(group.indexId);
  const members = groupMembers(group);
  const avgMove = members.reduce((sum, target) => sum + changePercent(target), 0) / members.length;
  return `
    <article class="group-card group-${group.tone}">
      <button class="group-main" data-action="detail" data-id="${indexTarget.id}">
        <span>${group.name}</span>
        <strong>${price(indexTarget.price)}</strong>
        <em class="${avgMove >= 0 ? "up" : "down"}">${avgMove >= 0 ? "+" : ""}${price(avgMove)}%</em>
        <small>${members.length} 支成员</small>
      </button>
      <div class="group-members" aria-label="${group.name}成员">
        ${members
          .map(
            (member) => `
              <button class="group-member-chip" data-action="detail" data-id="${member.id}" title="${member.name} · ${member.alias}">
                ${member.name}
              </button>
            `
          )
          .join("")}
      </div>
    </article>
  `;
}

function renderMarketRow(target, index) {
  const change = changePercent(target);
  const tone = change >= 0 ? "up" : "down";
  const groupInfo = marketGroupForTarget(target.id);
  const groupLabel =
    groupInfo && groupInfo.role === "index" ? `${groupInfo.group.shortName}指数` : groupInfo?.group.shortName;
  return `
    <tr class="${groupInfo ? `group-row group-${groupInfo.group.tone} ${groupInfo.role === "index" ? "group-index-row" : "group-member-row"}` : ""}">
      <td class="col-rank">${index + 1}</td>
      <td class="col-name">
        <button class="stock-name-btn" data-action="detail" data-id="${target.id}">
          <strong><span class="stock-title-text">${target.name}</span>${groupInfo ? `<span class="group-badge ${groupInfo.group.tone}">${groupLabel}</span>` : ""}</strong>
        </button>
      </td>
      <td class="col-price">${price(target.price)}</td>
      <td class="col-change ${tone}">${change >= 0 ? "+" : ""}${price(change)}%</td>
      <td class="col-volume">${money(target.volume)}</td>
      <td class="col-heat">${target.heat}</td>
      <td class="col-actions">
        ${renderImageButton({ className: "table-action image-table-action", action: "trade", id: target.id, label: "交易", image: buttonAssets.marketTrade })}
      </td>
    </tr>
  `;
}

function renderMarkets() {
  const stockCount = targets().length;
  return `
    <section class="screen market-table-screen">
      ${renderTopbar("Market", "行情大厅")}
      <div class="section-heading table-heading">
        <div>
          <div class="section-title">主播指数榜</div>
          <div class="table-note">${stockCount} 支暂定股票 · 表格模式</div>
          ${renderMarketSyncNote()}
        </div>
        ${renderImageButton({ className: "market-sync-button", action: "simulate", label: "同步官网积分", image: buttonAssets.marketSync })}
      </div>
      ${renderMarketGroups()}
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
      ${renderSiteFiling()}
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
  const groupInfo = marketGroupForTarget(target.id);
  return `
    <section class="screen">
      <div class="topbar">
        ${renderImageButton({ className: "back-image-button", action: "back", label: "← 返回", image: buttonAssets.back })}
        ${renderImageButton({ className: "refresh-image-button", action: "simulate", label: "刷新行情", image: buttonAssets.refresh })}
      </div>
      <div class="detail-head">
        <img class="${avatarClassFor(target, "large")}" src="${avatarFor(target)}" alt="${target.name}" />
        <div>
          <div class="detail-name gold-text">${target.name}</div>
          <div class="detail-code">代码：${target.code}${target.gameName ? ` · 对应：${target.gameName}` : ""}</div>
          <div class="detail-price">${price(target.price)}</div>
          <div class="change ${change >= 0 ? "up" : "down"}">${change >= 0 ? "+" : ""}${price(change)}% ${change >= 0 ? "↑" : "↓"}</div>
        </div>
      </div>

      <div class="panel chart-card">
        <div class="section-title" style="text-align:center">近7日走势</div>
        <div class="chart-wrap">${renderChart(target)}</div>
        <p class="detail-copy">${target.quote} | 场均热度 ${target.heat}</p>
      </div>

      ${groupInfo ? renderDetailGroupContext(groupInfo) : ""}

      <div class="detail-actions">
        ${renderImageButton({ className: "trade-side-image-button", action: "trade", id: target.id, label: "买入", image: buttonAssets.buy })}
        ${renderImageButton({ className: "trade-side-image-button", action: "trade", id: target.id, label: "卖出", image: buttonAssets.sell })}
      </div>

      <div class="holding-summary">
        <div class="summary-pill">当前持仓<strong>${holding.quantity} 股</strong></div>
        <div class="summary-pill">持仓收益<strong class="${pnl >= 0 ? "profit" : "loss"}">${formatSignedCoins(pnl)}</strong></div>
        <div class="summary-pill">今日成交<strong>${money(target.volume)} 手</strong></div>
        <div class="summary-pill">可用金币<strong>${money(state.balance)}</strong></div>
      </div>
      ${renderSiteFiling()}
      ${renderNav()}
      ${renderToast()}
    </section>
  `;
}

function renderMarketSyncNote() {
  const sync = state.marketSync;
  if (!sync) {
    return `<div class="market-sync-note">未同步官网积分 · 本地演示行情</div>`;
  }
  if (sync.status === "syncing") {
    return `<div class="market-sync-note">正在同步官网积分...</div>`;
  }
  if (sync.status === "synced") {
    const time = new Date(sync.syncedAt).toLocaleTimeString("zh-CN", { hour: "2-digit", minute: "2-digit" });
    return `<div class="market-sync-note">已同步 ${sync.source} · 命中 ${sync.matched} 支 · 500名门槛 ${money(sync.floorScore)} · ${time}</div>`;
  }
  return `<div class="market-sync-note warn">${sync.message || "官网同步失败 · 本地演示行情"}</div>`;
}

function renderDetailGroupContext(groupInfo) {
  const { group, role } = groupInfo;
  const members = groupMembers(group);
  return `
    <div class="panel detail-group-card group-${group.tone}">
      <div class="detail-group-title">
        <span>${group.name}</span>
        <strong>${role === "index" ? "集团指数股" : "集团成员股"}</strong>
      </div>
      <div class="detail-group-members">
        ${members
          .map(
            (member) => `
              <button class="group-member-chip" data-action="detail" data-id="${member.id}" title="${member.name} · ${member.alias}">
                ${member.name}
              </button>
            `
          )
          .join("")}
      </div>
    </div>
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
  const maxBuyQty = buyMaxQuantity(target);
  const maxSellQty = sellMaxQuantity(target.id);
  const buyQty = clampQuantity(10, maxBuyQty);
  const sellQty = clampQuantity(Math.min(10, maxSellQty), maxSellQty);
  const buyValue = estimateBuy(target, buyQty);
  const sellValue = estimateSell(target, sellQty);
  return `
    <section class="screen">
      <div class="topbar">
        ${renderImageButton({ className: "back-image-button", action: "detail", id: target.id, label: "← 返回", image: buttonAssets.back })}
      </div>
      <div class="trade-target panel">
        <img class="${avatarClassFor(target, "large")}" src="${avatarFor(target)}" alt="${target.name}" />
        <div>
          <div class="detail-name gold-text">${target.name}</div>
          <div class="detail-code">${target.code}${target.gameName ? ` · ${target.gameName}` : ""}</div>
          <div class="detail-price">${price(target.price)}</div>
        </div>
      </div>

      <div class="trade-layout">
        <div class="trade-card">
          <div class="trade-title">买入</div>
          <div class="qty-row">
            <button class="qty-step" data-action="step" data-input="buyQty" data-step="-10">-</button>
            <input id="buyQty" type="number" min="${maxBuyQty > 0 ? 1 : 0}" max="${maxBuyQty}" step="10" value="${buyQty}" inputmode="numeric" data-estimate="buyEstimate" data-side="buy" />
            <button class="qty-step" data-action="step" data-input="buyQty" data-step="10">+</button>
          </div>
          <div class="trade-meta">
            <div>价格<strong>${price(target.price)}</strong></div>
            <div>预估消耗<strong id="buyEstimate">${money(buyValue)} 金币</strong></div>
            <div>买入上限<strong>${maxBuyQty} 股</strong></div>
          </div>
          ${renderImageButton({ className: "order-image-button", action: "buy", id: target.id, label: "买入", image: buttonAssets.buy })}
        </div>

        <div class="trade-card">
          <div class="trade-title">卖出</div>
          <div class="qty-row">
            <button class="qty-step" data-action="step" data-input="sellQty" data-step="-10">-</button>
            <input id="sellQty" type="number" min="${maxSellQty > 0 ? 1 : 0}" max="${maxSellQty}" step="10" value="${sellQty}" inputmode="numeric" data-estimate="sellEstimate" data-side="sell" />
            <button class="qty-step" data-action="step" data-input="sellQty" data-step="10">+</button>
          </div>
          <div class="trade-meta">
            <div>持仓<strong>${holding.quantity} 股</strong></div>
            <div>预估到账<strong id="sellEstimate">${money(sellValue)} 金币</strong></div>
          </div>
          ${renderImageButton({ className: "order-image-button", action: "sell", id: target.id, label: "卖出", image: buttonAssets.sell })}
        </div>
      </div>

      <div class="panel">
        <div class="notice-line"><b>手续费：</b><span>0.1%，仅用于模拟交易。</span></div>
        <div class="notice-line"><b>买入限制：</b><span>单支股票总投入最多占当前总资产的 25%。</span></div>
        <div class="notice-line"><b>可用金币：</b><span>${money(state.balance)} 金币</span></div>
        <div class="notice-line"><b>当前持仓：</b><span>${holding.quantity} 股，均价 ${price(holding.averageCost)}</span></div>
      </div>
      ${renderSiteFiling()}
      ${renderNav()}
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
      ${renderSiteFiling()}
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
      <img class="${avatarClassFor(target)}" src="${avatarFor(target)}" alt="${target.name}" />
      <div>
        <h3 class="gold-text">${target.name}</h3>
        <p>${holding.quantity} 股 · 均价 ${price(holding.averageCost)} · 当前 ${price(target.price)}</p>
        <p class="${pnl >= 0 ? "profit" : "loss"}">收益 ${formatSignedCoins(pnl)}</p>
      </div>
      <div class="holding-actions">
        ${renderImageButton({ className: "holding-image-button", action: "detail", id: target.id, label: "查看详情", image: buttonAssets.holdingDetail })}
        ${renderImageButton({ className: "holding-image-button", action: "trade", id: target.id, label: "继续交易", image: buttonAssets.holdingTrade })}
      </div>
    </article>
  `;
}

function rankingRows() {
  const playerScore = Math.round(totalAssets());
  return [
    { name: "张兰", score: 150000 },
    { name: "李四", score: 120000 },
    { name: "陈掌柜", score: 105600 },
    { name: "夜航商人", score: 102400 },
    { name: "我方酒客", score: playerScore, self: true },
    { name: "月夜粉团", score: 98400 },
    { name: "荧火掌柜", score: 96150 },
    { name: "木桶旅人", score: 93520 },
    { name: "晨星账房", score: 91080 },
    { name: "铜杯骑士", score: 88700 }
  ]
    .sort((a, b) => b.score - a.score)
    .map((row, index) => ({ ...row, rank: index + 1 }));
}

function nearbyRankingRows(rows, size = 5) {
  const selfIndex = rows.findIndex((row) => row.self);
  if (selfIndex === -1) return rows.slice(0, size);
  let start = Math.max(0, selfIndex - Math.floor(size / 2));
  let end = start + size;
  if (end > rows.length) {
    end = rows.length;
    start = Math.max(0, end - size);
  }
  return rows.slice(start, end);
}

function maskedRankScore() {
  return "XXXX<br>金币";
}

function renderRankRow(row, variant = "") {
  return `
    <article class="rank-row ${variant} ${row.self ? "self" : ""}">
      <div class="rank-medal">${row.rank}</div>
      <div>
        <div class="market-name gold-text">${row.name}</div>
        <div class="market-code">${row.self ? "当前账号" : "模拟玩家"}</div>
      </div>
      <div class="rank-score" aria-label="金币已隐藏">${maskedRankScore()}</div>
    </article>
  `;
}

function renderRankings() {
  const rows = rankingRows();
  const leaders = rows.slice(0, 3);
  const nearby = nearbyRankingRows(rows);
  return `
    <section class="screen">
      ${renderTopbar("Ranking", "玩家收益榜")}
      <div class="ranking-section">
        <div class="ranking-section-title">前三名</div>
        <div class="rank-top-list">
          ${leaders.map((row) => renderRankRow(row, "top-three")).join("")}
        </div>
      </div>
      <div class="ranking-section">
        <div class="ranking-section-title">我的附近排名</div>
        <div class="rank-nearby-list">
          ${nearby.map((row) => renderRankRow(row)).join("")}
        </div>
      </div>
      ${renderSiteFiling()}
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
      ${renderInteractionDialog()}
      <button class="btn btn-blue btn-wide" data-action="reload-profile">Refresh Account</button>
      <button class="btn btn-red btn-wide" data-action="logout">Sign Out</button>
      ${renderSiteFiling()}
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
  if (!state.auth?.token) {
    app.innerHTML = renderLogin();
    return;
  }
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
  if (action === "request-otp") {
    requestOtp();
  }
  if (action === "verify-otp") {
    verifyOtp();
  }
  if (action === "logout") {
    logout();
  }
  if (action === "reload-profile") {
    loadRemotePortfolio();
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
    buy(id, updateTradeEstimate(document.getElementById("buyQty"), true));
  }
  if (action === "sell") {
    sell(id, updateTradeEstimate(document.getElementById("sellQty"), true));
  }
  if (action === "simulate") {
    refreshMarketData();
  }
  if (action === "reset") {
    resetDemo();
  }
  if (action === "step") {
    const input = document.getElementById(element.dataset.input);
    const step = Number(element.dataset.step);
    input.value = (Number(input.value) || 0) + step;
    updateTradeEstimate(input, true);
  }
});

document.addEventListener("input", (event) => {
  if (event.target.matches("[data-estimate]")) {
    updateTradeEstimate(event.target);
  }
});

document.addEventListener("change", (event) => {
  if (event.target.matches("[data-estimate]")) {
    updateTradeEstimate(event.target, true);
  }
});

if (!state.targets) {
  state.targets = structuredClone(seedTargets);
  saveState();
}

render();
if (state.auth?.token) {
  loadRemotePortfolio({ silent: true });
}
maybeAutoSyncMarket();
