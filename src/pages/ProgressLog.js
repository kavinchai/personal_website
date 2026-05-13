import React from "react";
import { FiArrowUpRight, FiGithub, FiArrowLeft } from "react-icons/fi";
import landingImg from "../imgs/progresslog/landing.png";
import todayImg from "../imgs/progresslog/today.png";
import historyImg from "../imgs/progresslog/history.png";
import progressImg from "../imgs/progresslog/progress.png";
import workoutImg from "../imgs/progresslog/workout_logging.png";
import walkthroughGif from "../imgs/progresslog/app_walkthrough.gif";
import "../css/ProgressLog.css";

const FEATURES = [
  {
    title: "Daily Dashboard",
    desc: "Track your weight, steps, workouts, and nutrition all in one place. The Today view gives you an at-a-glance summary of your daily progress with quick-add buttons for each metric.",
    img: todayImg,
  },
  {
    title: "Workout Logging",
    desc: "Log strength exercises, runs, and timed activities with a clean modal interface. Name your sessions, add exercises with sets/reps/weight, and save everything in one click.",
    img: workoutImg,
  },
  {
    title: "Weekly History & Stats",
    desc: "View weekly summaries with averages for weight, calories, protein, steps, and workouts. A daily log table lets you click into any day to see the full breakdown.",
    img: historyImg,
  },
  {
    title: "Strength Progress",
    desc: "Visualize your max weight progression across every exercise with interactive charts. Filter by time range, see PR highlights, and review session history for each lift.",
    img: progressImg,
  },
  {
    title: "Community Leaderboard",
    desc: "Compete with other lifters on per-exercise leaderboards ranked by best single set. See community stats, top lifters by total volume, and activity trends over the last 30 days.",
    img: landingImg,
  },
];

const ProgressLog = ({ onBack }) => {
  return (
    <div className="pl-view">
      <button className="pl-back" onClick={onBack}>
        <FiArrowLeft />
        <span>Back to Home</span>
      </button>

      <div className="view-header">
        <span className="view-label">Project — ProgressLog</span>
        <h2 className="view-title">
          A full-stack <em>fitness tracker</em> built for lifters.
        </h2>
      </div>

      <div className="pl-intro">
        <p>
          ProgressLog is a personal fitness logger for tracking weight,
          nutrition, workouts, strength progression, goals, and milestones.
          Built with React + Vite on the frontend with Recharts visualizations,
          a Spring Boot REST API with JWT authentication on the backend, and
          PostgreSQL for data storage. Deployed on Vercel and Railway.
        </p>
        <div className="pl-links">
          <a
            href="https://progress-log-five-delta.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="pl-link pl-link-primary"
          >
            <span>Visit Live Site</span>
            <FiArrowUpRight />
          </a>
          <a
            href="https://github.com/kavinchai/ProgressLog"
            target="_blank"
            rel="noreferrer"
            className="pl-link pl-link-secondary"
          >
            <FiGithub />
            <span>View on GitHub</span>
          </a>
        </div>
      </div>

      <div className="pl-tech">
        {["React", "Vite", "Spring Boot", "PostgreSQL", "JWT", "Recharts", "Vercel", "Railway"].map(
          (t, i) => (
            <span key={i} className="pl-tech-tag">
              {t}
            </span>
          )
        )}
      </div>

      <div className="pl-walkthrough">
        <h3 className="pl-section-title">App Walkthrough</h3>
        <div className="pl-gif-wrap">
          <img src={walkthroughGif} alt="ProgressLog app walkthrough" />
        </div>
      </div>

      <div className="pl-features">
        {FEATURES.map((f, i) => (
          <div key={i} className="pl-feature">
            <div className="pl-feature-text">
              <span className="pl-feature-num">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="pl-feature-title">{f.title}</h3>
              <p className="pl-feature-desc">{f.desc}</p>
            </div>
            <div className="pl-feature-img">
              <img src={f.img} alt={f.title} loading="lazy" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressLog;
