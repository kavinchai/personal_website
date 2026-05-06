import React from "react";
import { FiGithub, FiLinkedin, FiMail, FiArrowRight } from "react-icons/fi";
import "../css/Sidebar.css";

const NAV_ITEMS = [
  { id: "about", num: "01", label: "About" },
  { id: "experience", num: "02", label: "Experience" },
  { id: "projects", num: "03", label: "Projects" },
];

const Sidebar = ({ activeView, onChange }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo">
          <span className="sidebar-logo-dot" />
          <span className="sidebar-logo-text">kavin.dev</span>
        </div>
        <span className="sidebar-status">
          <span className="sidebar-status-dot" /> Available for chat
        </span>
      </div>

      <div className="sidebar-mid">
        <h1 className="sidebar-name">
          <span className="sidebar-name-first">Kavin</span>
          <span className="sidebar-name-last">Chaisawangwong</span>
        </h1>
        <p className="sidebar-role">Software Engineer · NYC</p>

        <nav className="sidebar-nav" aria-label="Sections">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              className={`sidebar-nav-item ${
                activeView === item.id ? "active" : ""
              }`}
              onClick={() => onChange(item.id)}
            >
              <span className="sidebar-nav-num">{item.num}</span>
              <span className="sidebar-nav-label">{item.label}</span>
              <FiArrowRight className="sidebar-nav-arrow" />
            </button>
          ))}
        </nav>
      </div>

      <div className="sidebar-bottom">
        <div className="sidebar-socials">
          <a
            href="https://github.com/kavinchai"
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FiGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/kavinchaisawangwong/"
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FiLinkedin />
          </a>
          <a href="mailto:kavinchai00@gmail.com" aria-label="Email">
            <FiMail />
          </a>
        </div>
        <div className="sidebar-copy">© 2025 — coded with care</div>
      </div>
    </aside>
  );
};

export default Sidebar;
