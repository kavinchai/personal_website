import React, { useState, useEffect, useCallback } from "react";
import "../css/About.css";

const SpotifyIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const STATS = [
  { label: "Currently", value: "Wells Fargo" },
  { label: "Based in", value: "New York" },
  { label: "Hobbies", value: "Photography, Running, TFT" },
  { label: "Currently spamming", value: null, spotify: true },
];

const About = ({ onNavigate }) => {
  const [topTrack, setTopTrack] = useState(null);

  const fetchTopTrack = useCallback(async () => {
    try {
      const res = await fetch("/api/top-track");
      const data = await res.json();
      if (data.hasTrack) {
        setTopTrack(data);
      }
    } catch {
      // silently fail
    }
  }, []);

  useEffect(() => {
    fetchTopTrack();
  }, [fetchTopTrack]);

  return (
    <div className="about-view">
      <div className="view-header">
        <span className="view-label">01 — About</span>
        <h2 className="view-title">
          Hi! I'm a software engineer who likes <em>building things for fun</em>
          .
        </h2>
      </div>

      <div className="about-body">
        <p>
          I write code for work, write more code when I get home, and somewhere
          in between find time to run, take photos, and drink an unreasonable
          amount of coffee.
        </p>
        <p>
          I'm currently working on{" "}
          <a
            href="#progresslog"
            onClick={(e) => {
              e.preventDefault();
              onNavigate && onNavigate("progresslog");
            }}
          >
            ProgressLog
          </a>
          , a web app that lets you log your workouts and track your progress.
        </p>
        <p>
          I also like to play catan, shank golf shots, and butcher
          Chinese/Korean balads. I'm good at TFT though.
        </p>
      </div>

      <div className="about-stats">
        {STATS.map((s, i) => (
          <div key={i} className={`about-stat${s.spotify ? " about-stat--spotify" : ""}`}>
            <span className="about-stat-label">{s.label}</span>
            {s.spotify ? (
              <span className="about-stat-value">
                {topTrack ? (
                  <a
                    href={topTrack.url}
                    target="_blank"
                    rel="noreferrer"
                    className="about-spotify"
                  >
                    <SpotifyIcon />
                    <span className="about-spotify-text">
                      <span className="about-spotify-title">{topTrack.name}</span>
                      <span className="about-spotify-artist">{topTrack.artist}</span>
                    </span>
                  </a>
                ) : (
                  "..."
                )}
              </span>
            ) : (
              <span className="about-stat-value">{s.value}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
