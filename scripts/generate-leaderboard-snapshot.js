const fs = require("node:fs/promises");
const path = require("node:path");

const API_ROOT = "https://webapi.blizzard.cn/hs-rank-api-server/api";
const MODE_NAME = "battlegrounds";
const MODE_LABEL = "酒馆战棋";
const SEASON_LABEL = "第13赛季";
const PAGE_SIZE = 25;
const TARGET_LIMIT = 500;
const SCORE_HISTORY_LIMIT = 7;

function normalizeBattleTag(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/[|｜丨丶·\s_\-—–]/g, "");
}

async function readPreviousSnapshot(outPath) {
  try {
    const payload = JSON.parse(await fs.readFile(outPath, "utf8"));
    return payload.data || payload;
  } catch {
    return null;
  }
}

function scoreHistoryFor(row, previousRowsByName) {
  const previous = previousRowsByName.get(row.normalizedBattleTag);
  const previousScores = Array.isArray(previous?.scoreHistory) ? previous.scoreHistory : [];
  return [...previousScores, row.score]
    .map((score) => Number(score))
    .filter((score) => Number.isFinite(score) && score > 0)
    .slice(-SCORE_HISTORY_LIMIT);
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      referer: "https://hs.blizzard.cn/community/leaderboards/",
      "user-agent": "Tavern-Market-Storms-Fe-Snapshot/0.1"
    }
  });
  if (!response.ok) {
    throw new Error(`Upstream ${response.status} for ${url}`);
  }
  const payload = await response.json();
  if (payload.code !== 0) {
    throw new Error(`Upstream error ${payload.code}: ${payload.message || "unknown"}`);
  }
  return payload.data;
}

async function resolveSeason() {
  const data = await fetchJson(`${API_ROOT}/v2/game/mode`);
  const mode = (data.game_modes || []).find((item) => item.mode_name === MODE_NAME);
  const season = (data.season_map?.[MODE_NAME] || []).find((item) => item.season === SEASON_LABEL);
  if (!season) throw new Error(`Could not resolve ${MODE_LABEL} ${SEASON_LABEL}`);
  return {
    modeName: MODE_NAME,
    modeLabel: mode?.cn_mode_name || MODE_LABEL,
    seasonId: season.season_id,
    seasonLabel: season.season
  };
}

async function fetchRankPage({ seasonId, page }) {
  const url = new URL(`${API_ROOT}/game/ranks`);
  url.searchParams.set("page", String(page));
  url.searchParams.set("page_size", String(PAGE_SIZE));
  url.searchParams.set("mode_name", MODE_NAME);
  url.searchParams.set("season_id", String(seasonId));
  return fetchJson(url);
}

async function main() {
  const outPath = path.join(__dirname, "..", "data", "battlegrounds-leaderboard.json");
  const previousSnapshot = await readPreviousSnapshot(outPath);
  const previousRowsByName = new Map(
    (previousSnapshot?.rows || []).map((row) => [row.normalizedBattleTag || normalizeBattleTag(row.battleTag), row])
  );
  const season = await resolveSeason();
  const firstPage = await fetchRankPage({ seasonId: season.seasonId, page: 1 });
  const total = Number(firstPage.total || 0);
  const expectedRows = Math.min(TARGET_LIMIT, total || TARGET_LIMIT);
  const pageCount = Math.max(1, Math.ceil(expectedRows / PAGE_SIZE));
  const rows = [...(firstPage.list || [])];

  for (let page = 2; page <= pageCount; page += 1) {
    const data = await fetchRankPage({ seasonId: season.seasonId, page });
    rows.push(...(data.list || []));
  }

  const normalizedRows = rows.slice(0, expectedRows).map((row) => ({
    position: Number(row.position),
    battleTag: row.battle_tag,
    normalizedBattleTag: normalizeBattleTag(row.battle_tag),
    score: Number(row.score)
  }));
  normalizedRows.forEach((row) => {
    row.scoreHistory = scoreHistoryFor(row, previousRowsByName);
  });
  const floorRow = normalizedRows[normalizedRows.length - 1] || null;
  const snapshot = {
    source: "blizzard-cn-static",
    modeName: season.modeName,
    modeLabel: season.modeLabel,
    seasonId: season.seasonId,
    seasonLabel: season.seasonLabel,
    updatedAt: new Date().toISOString(),
    total,
    fetched: normalizedRows.length,
    floorRank: floorRow?.position || null,
    floorScore: floorRow?.score || null,
    rows: normalizedRows
  };

  await fs.mkdir(path.dirname(outPath), { recursive: true });
  await fs.writeFile(outPath, `${JSON.stringify(snapshot, null, 2)}\n`, "utf8");
  console.log(`Wrote ${outPath}: rows=${snapshot.rows.length}, floorScore=${snapshot.floorScore}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
