import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import Hobbies from "./pages/Hobbies";
import ProgressLog from "./pages/ProgressLog";
import "./css/App.css";

const VIEWS = {
  about: About,
  experience: Experience,
  projects: Projects,
  hobbies: Hobbies,
};

const App = () => {
  const [activeView, setActiveView] = useState("about");

  if (activeView === "progresslog") {
    return (
      <div className="app">
        <Sidebar activeView={activeView} onChange={setActiveView} />
        <main className="app-main">
          <div key={activeView} className="view-container">
            <ProgressLog onBack={() => setActiveView("projects")} />
          </div>
        </main>
      </div>
    );
  }

  const ActiveComponent = VIEWS[activeView];

  return (
    <div className="app">
      <Sidebar activeView={activeView} onChange={setActiveView} />
      <main className="app-main">
        <div key={activeView} className="view-container">
          <ActiveComponent onNavigate={setActiveView} />
        </div>
      </main>
    </div>
  );
};

export default App;
