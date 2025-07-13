import React from "react";
import WelcomeBanner from "./WelcomeBanner";
import StatsOverview from "./StatsOverview";
import TaskList from "./TaskList";
import PomodoroTimer from "./PomodoroTimer";
import HabitTracker from "./HabitTracker";
import Analytics from "./Analytics";
import "../styles/Dashboard.css";

const DashboardLayout = () => {
  return (
    <div className="dashboard-layout">
      <WelcomeBanner />
      <StatsOverview />
      <div className="dashboard-panels">
        <div className="left-column">
          <TaskList />
          <HabitTracker />
        </div>
        <div className="right-column">
          <PomodoroTimer />
          <Analytics />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
