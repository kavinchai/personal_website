const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const TOP_URL = "https://api.spotify.com/v1/me/top";

async function getAccessToken() {
  const basic = Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString(
    "base64"
  );

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: REFRESH_TOKEN,
    }),
  });

  return res.json();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://kavinchai.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=7200");

  try {
    const { access_token } = await getAccessToken();
    const headers = { Authorization: `Bearer ${access_token}` };

    const [tracksRes, artistsRes] = await Promise.all([
      fetch(`${TOP_URL}/tracks?limit=5&time_range=medium_term`, { headers }),
      fetch(`${TOP_URL}/artists?limit=5&time_range=medium_term`, { headers }),
    ]);

    const tracksData = await tracksRes.json();
    const artistsData = await artistsRes.json();

    const tracks = (tracksData.items || []).map((t) => ({
      name: t.name,
      artist: t.artists.map((a) => a.name).join(", "),
      album: t.album.name,
      albumArt: t.album.images[1]?.url || t.album.images[0]?.url,
      url: t.external_urls.spotify,
    }));

    const artists = (artistsData.items || []).map((a) => ({
      name: a.name,
      image: a.images[1]?.url || a.images[0]?.url,
      url: a.external_urls.spotify,
    }));

    return res.status(200).json({ tracks, artists });
  } catch (err) {
    console.error("Spotify top music error:", err);
    return res.status(200).json({ tracks: [], artists: [] });
  }
}
