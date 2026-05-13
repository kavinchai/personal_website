import React, { useState, useEffect, useCallback } from "react";
import "../css/TopMusic.css";

const API_URL = "/api/top-music";

const TopMusic = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchTopMusic = useCallback(async () => {
    try {
      const res = await fetch(API_URL);
      const json = await res.json();
      setData(json);
    } catch {
      setData({ tracks: [], artists: [] });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopMusic();
  }, [fetchTopMusic]);

  if (loading) {
    return (
      <div className="tm-loading">
        <span>Loading top music...</span>
      </div>
    );
  }

  return (
    <div className="tm-container">
      <div className="tm-column">
        <h4 className="tm-heading">Top Songs</h4>
        <ol className="tm-list">
          {(data?.tracks || []).map((track, i) => (
            <li key={i}>
              <a
                href={track.url}
                target="_blank"
                rel="noreferrer"
                className="tm-track"
              >
                {track.albumArt && (
                  <img
                    className="tm-art"
                    src={track.albumArt}
                    alt={track.album}
                  />
                )}
                <div className="tm-meta">
                  <span className="tm-rank">{String(i + 1).padStart(2, "0")}</span>
                  <div className="tm-text">
                    <span className="tm-name">{track.name}</span>
                    <span className="tm-sub">{track.artist}</span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>

      <div className="tm-column">
        <h4 className="tm-heading">Top Artists</h4>
        <ol className="tm-list">
          {(data?.artists || []).map((artist, i) => (
            <li key={i}>
              <a
                href={artist.url}
                target="_blank"
                rel="noreferrer"
                className="tm-track"
              >
                {artist.image && (
                  <img
                    className="tm-art tm-art-round"
                    src={artist.image}
                    alt={artist.name}
                  />
                )}
                <div className="tm-meta">
                  <span className="tm-rank">{String(i + 1).padStart(2, "0")}</span>
                  <div className="tm-text">
                    <span className="tm-name">{artist.name}</span>
                  </div>
                </div>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
};

export default TopMusic;
