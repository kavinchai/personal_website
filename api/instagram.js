const ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN;
const APP_SECRET = process.env.INSTAGRAM_APP_SECRET;

const BASE_URL = "https://graph.instagram.com/v25.0";

async function refreshLongLivedToken() {
  const res = await fetch(
    `${BASE_URL}/refresh_access_token?grant_type=ig_refresh_token&access_token=${ACCESS_TOKEN}`
  );
  return res.json();
}

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "https://kavinchai.vercel.app");
  res.setHeader("Access-Control-Allow-Methods", "GET");
  res.setHeader("Cache-Control", "s-maxage=3600, stale-while-revalidate=7200");

  try {
    const limit = Math.min(parseInt(req.query.limit) || 12, 50);

    const meRes = await fetch(
      `${BASE_URL}/me?fields=user_id,username&access_token=${ACCESS_TOKEN}`
    );
    const me = await meRes.json();

    if (me.error) {
      console.error("Instagram /me error:", me.error);
      return res.status(200).json({ hasMedia: false });
    }

    const mediaRes = await fetch(
      `${BASE_URL}/${me.id}/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=${limit}&access_token=${ACCESS_TOKEN}`
    );
    const mediaData = await mediaRes.json();

    if (mediaData.error) {
      console.error("Instagram media error:", mediaData.error);
      return res.status(200).json({ hasMedia: false });
    }

    const posts = (mediaData.data || [])
      .filter((m) => m.media_type === "IMAGE" || m.media_type === "CAROUSEL_ALBUM")
      .map((m) => ({
        id: m.id,
        caption: m.caption || "",
        mediaUrl: m.media_url,
        permalink: m.permalink,
        timestamp: m.timestamp,
      }));

    return res.status(200).json({
      hasMedia: true,
      username: me.username,
      posts,
    });
  } catch (err) {
    console.error("Instagram API error:", err);
    return res.status(200).json({ hasMedia: false });
  }
}
