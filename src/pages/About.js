import React, { useState, useEffect, useCallback } from "react";
import "../css/About.css";

const STATS = [
  { label: "Currently", value: "Wells Fargo" },
  { label: "Based in", value: "New York" },
  { label: "Currently spamming", value: null },
  { label: "Hobbies", value: "Photography, Running, TFT" },
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
          <div key={i} className="about-stat">
            <span className="about-stat-label">{s.label}</span>
            {s.label === "Currently spamming" ? (
              <span className="about-stat-value">
                {topTrack ? (
                  <a
                    href={topTrack.url}
                    target="_blank"
                    rel="noreferrer"
                    className="about-stat-link"
                  >
                    {topTrack.name} — {topTrack.artist}
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
