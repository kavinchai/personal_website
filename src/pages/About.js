import React from "react";
import "../css/About.css";

const STATS = [
  { label: "Currently", value: "Wells Fargo" },
  { label: "Based in", value: "New York" },
  { label: "Coffees today", value: "2 or 3" },
  { label: "Hobbies", value: "Photography, Running, TFT" },
];

const About = () => {
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
            href="https://progress-log-five-delta.vercel.app/"
            target="_blank"
            rel="noreferrer"
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
            <span className="about-stat-value">{s.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
