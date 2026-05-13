const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;

const TOKEN_URL = "https://accounts.spotify.com/api/token";
const NOW_PLAYING_URL =
  "https://api.spotify.com/v1/me/player/currently-playing";

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

  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_URL, {
      headers: { Authorization: `Bearer ${access_token}` },
    });

    if (response.status === 204 || response.status > 400) {
      return res.status(200).json({ isPlaying: false });
    }

    const data = await response.json();

    if (!data.item) {
      return res.status(200).json({ isPlaying: false });
    }

    return res.status(200).json({
      isPlaying: data.is_playing,
      title: data.item.name,
      artist: data.item.artists.map((a) => a.name).join(", "),
      album: data.item.album.name,
      albumArt: data.item.album.images[0]?.url,
      songUrl: data.item.external_urls.spotify,
    });
  } catch (err) {
    console.error("Spotify API error:", err);
    return res.status(200).json({ isPlaying: false });
  }
}
