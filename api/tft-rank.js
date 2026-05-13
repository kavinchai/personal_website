const RIOT_API_KEY = process.env.RIOT_API_KEY;
const GAME_NAME = "WangPo";
const TAG_LINE = "6767";
const REGION = "na1";
const ROUTING = "americas";

async function fetchRiot(url) {
  const res = await fetch(url, {
    headers: { "X-Riot-Token": RIOT_API_KEY },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Riot API ${res.status}: ${text}`);
  }
  return res.json();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://kavinchai.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate=600");

  if (!RIOT_API_KEY) {
    return res.status(200).json({ error: "Riot API key not configured" });
  }

  try {
    // 1. Get PUUID from Riot ID
    const account = await fetchRiot(
      `https://${ROUTING}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(GAME_NAME)}/${encodeURIComponent(TAG_LINE)}`
    );

    // 2. Get TFT summoner by PUUID
    const summoner = await fetchRiot(
      `https://${REGION}.api.riotgames.com/tft/summoner/v1/summoners/by-puuid/${account.puuid}`
    );

    // 3. Get TFT league entries
    const entries = await fetchRiot(
      `https://${REGION}.api.riotgames.com/tft/league/v1/entries/by-summoner/${summoner.id}`
    );

    // Find the ranked TFT entry (RANKED_TFT)
    const ranked = entries.find((e) => e.queueType === "RANKED_TFT");

    if (!ranked) {
      return res.status(200).json({
        hasRank: false,
        riotId: `${GAME_NAME}#${TAG_LINE}`,
      });
    }

    return res.status(200).json({
      hasRank: true,
      riotId: `${GAME_NAME}#${TAG_LINE}`,
      tier: ranked.tier,
      rank: ranked.rank,
      lp: ranked.leaguePoints,
      wins: ranked.wins,
      losses: ranked.losses,
      winRate: Math.round(
        (ranked.wins / (ranked.wins + ranked.losses)) * 100
      ),
      games: ranked.wins + ranked.losses,
    });
  } catch (err) {
    console.error("Riot API error:", err.message);
    return res.status(200).json({
      error: "Could not fetch TFT rank",
    });
  }
}
