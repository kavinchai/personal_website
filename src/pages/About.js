import React from "react";
import "../css/About.css";

const STATS = [
	{ label: "Currently", value: "Wells Fargo" },
	{ label: "Based in", value: "New York" },
	{ label: "Coffees today", value: "too many" },
	{ label: "Hobbies", value: "run · taking pics" },
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
					I work on platform and developer infrastructure at Wells Fargo,
					shipping the kind of unglamorous tooling that quietly saves entire
					release cycles.
				</p>
				<p>
					Outside of work, I'm probably running on the west side highway, taking
					photos, or finding a new coffee shop to ruin my productivity at.
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
