const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_URL = "https://accounts.spotify.com/api/token";

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

    const response = await fetch(
      "https://api.spotify.com/v1/me/top/tracks?limit=1&time_range=short_term",
      { headers: { Authorization: `Bearer ${access_token}` } }
    );

    const data = await response.json();
    const track = data.items?.[0];

    if (!track) {
      return res.status(200).json({ hasTrack: false });
    }

    return res.status(200).json({
      hasTrack: true,
      name: track.name,
      artist: track.artists.map((a) => a.name).join(", "),
      url: track.external_urls.spotify,
    });
  } catch (err) {
    console.error("Spotify top track error:", err);
    return res.status(200).json({ hasTrack: false });
  }
}
