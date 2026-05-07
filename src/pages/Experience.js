import React, { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import jobs from "../content/jobs.json";
import "../css/Experience.css";

const Experience = () => {
	const [active, setActive] = useState(0);
	const job = jobs.data[active];
	const startYear = job.duration.match(/\d{4}/)?.[0] ?? "";

	return (
		<div className="exp-view">
			<div className="view-header">
				<span className="view-label">02 — Experience</span>
				<h2 className="view-title">
					A few years of <em>work experience</em>.
				</h2>
			</div>

			<div className="exp-body">
				<div className="exp-tabs">
					{jobs.data.map((j, i) => {
						const yr = j.duration.match(/\d{4}/)?.[0] ?? "";
						return (
							<button
								key={i}
								className={`exp-tab ${active === i ? "active" : ""}`}
								onClick={() => setActive(i)}
							>
								<span className="exp-tab-year">{yr}</span>
								<span className="exp-tab-company">{j.company}</span>
							</button>
						);
					})}
				</div>

				<div className="exp-detail">
					<div className="exp-detail-head">
						<h3 className="exp-detail-role">{job.title}</h3>
						<a
							href={job.url}
							target="_blank"
							rel="noreferrer"
							className="exp-detail-company"
						>
							@ {job.company}
							<FiArrowUpRight />
						</a>
						<div className="exp-detail-meta">
							<span>{job.duration}</span>
							<span className="exp-detail-dot" />
							<span>{job.location}</span>
						</div>
					</div>
					<ul className="exp-detail-list">
						{job.text.map((b, i) => (
							<li key={i}>{b}</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
};

export default Experience;
