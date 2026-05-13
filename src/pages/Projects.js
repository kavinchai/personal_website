import React from "react";
import { FiArrowUpRight, FiArrowRight } from "react-icons/fi";
import projects from "../content/projects.json";
import "../css/Projects.css";

const Projects = ({ onNavigate }) => {
  return (
    <div className="proj-view">
      <div className="view-header">
        <span className="view-label">03 — Projects</span>
        <h2 className="view-title">
          A few things I've <em>actually built</em>.
        </h2>
      </div>

      <div className="proj-list">
        {projects.data.map((p, i) => {
          const hasShowcase = p.title === "ProgressLog";
          const isLink = !hasShowcase && !!p.link;
          const Tag = isLink ? "a" : "div";
          return (
            <Tag
              key={i}
              {...(isLink
                ? { href: p.link, target: "_blank", rel: "noreferrer" }
                : {})}
              {...(hasShowcase
                ? {
                    onClick: () => onNavigate && onNavigate("progresslog"),
                    role: "button",
                    tabIndex: 0,
                    onKeyDown: (e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        onNavigate && onNavigate("progresslog");
                      }
                    },
                  }
                : {})}
              className="proj-row"
            >
              <div className="proj-row-head">
                <span className="proj-row-num">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="proj-row-title">{p.title}</span>
                <div className="proj-row-tags">
                  {p.tech.map((t, j) => (
                    <span key={j}>{t}</span>
                  ))}
                </div>
                {hasShowcase ? (
                  <FiArrowRight className="proj-row-arrow" />
                ) : (
                  isLink && <FiArrowUpRight className="proj-row-arrow" />
                )}
              </div>
              <p className="proj-row-desc">{p.desc}</p>
            </Tag>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
