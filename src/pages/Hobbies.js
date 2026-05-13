import React from "react";
import NowPlaying from "../components/NowPlaying";
import TopMusic from "../components/TopMusic";
import InstagramGrid from "../components/InstagramGrid";
import "../css/Hobbies.css";

const Hobbies = () => {
  return (
    <div className="hobbies-view">
      <div className="view-header">
        <span className="view-label">04 — Hobbies</span>
        <h2 className="view-title">
          What I do when I'm <em>not coding</em>.
        </h2>
      </div>

      <div className="hobbies-sections">
        <section className="hobbies-section">
          <h3 className="hobbies-section-title">
            <span className="hobbies-section-icon">📷</span>
            Photography
          </h3>
          <p className="hobbies-section-desc">
            Recent shots from my photography account.
          </p>
          <InstagramGrid />
        </section>

        <section className="hobbies-section">
          <h3 className="hobbies-section-title">
            <span className="hobbies-section-icon">🎵</span>
            Listening To
          </h3>
          <p className="hobbies-section-desc">
            What's currently playing on my Spotify.
          </p>
          <NowPlaying />
        </section>

        <section className="hobbies-section">
          <h3 className="hobbies-section-title">
            <span className="hobbies-section-icon">🏆</span>
            Top This Year
          </h3>
          <p className="hobbies-section-desc">
            My most played songs and artists over the last 6 months.
          </p>
          <TopMusic />
        </section>
      </div>
    </div>
  );
};

export default Hobbies;
