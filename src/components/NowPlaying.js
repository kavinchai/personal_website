import React, { useState, useEffect, useCallback } from "react";
import "../css/NowPlaying.css";

const API_URL =
  process.env.NODE_ENV === "development"
    ? "/api/now-playing"
    : "/api/now-playing";

const NowPlaying = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchNowPlaying = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setData(json);
    } catch {
      setData({ isPlaying: false });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000);
    return () => clearInterval(interval);
  }, [fetchNowPlaying]);

  if (loading) {
    return (
      <div className="np-card np-loading">
        <div className="np-icon">
          <SpotifyIcon />
        </div>
        <span className="np-status">Checking Spotify...</span>
      </div>
    );
  }

  if (!data || !data.isPlaying) {
    return (
      <div className="np-card np-idle">
        <div className="np-icon">
          <SpotifyIcon />
        </div>
        <div className="np-info">
          <span className="np-status">Not playing</span>
          <span className="np-subtitle">Spotify is quiet right now</span>
        </div>
      </div>
    );
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noreferrer"
      className="np-card np-active"
    >
      {data.albumArt && (
        <img className="np-album-art" src={data.albumArt} alt={data.album} />
      )}
      <div className="np-info">
        <span className="np-label">
          <SpotifyIcon />
          Now Playing
        </span>
        <span className="np-title">{data.title}</span>
        <span className="np-artist">{data.artist}</span>
      </div>
      <div className="np-bars">
        <span />
        <span />
        <span />
      </div>
    </a>
  );
};

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

export default NowPlaying;
