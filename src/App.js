import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import About from "./pages/About";
import Experience from "./pages/Experience";
import Projects from "./pages/Projects";
import "./css/App.css";

const VIEWS = {
  about: About,
  experience: Experience,
  projects: Projects,
};

const App = () => {
  const [activeView, setActiveView] = useState("about");
  const ActiveComponent = VIEWS[activeView];

  return (
    <div className="app">
      <Sidebar activeView={activeView} onChange={setActiveView} />
      <main className="app-main">
        <div key={activeView} className="view-container">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
};

export default App;
