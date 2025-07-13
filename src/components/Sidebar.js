import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Dashboard,
  ListAlt,
  TrackChanges,
  Timer,
  CalendarToday,
  BarChart,
  Person,
  Settings,
  Logout,
} from "@mui/icons-material";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { label: "Dashboard", path: "/dashboard", icon: <Dashboard /> },
    { label: "Tasks", path: "/tasks", icon: <ListAlt /> },
    { label: "Habits", path: "/habits", icon: <TrackChanges /> },
    { label: "Pomodoro", path: "/pomodoro", icon: <Timer /> },
    { label: "Calendar", path: "/calendar", icon: <CalendarToday /> },
    { label: "Analytics", path: "/analytics", icon: <BarChart /> },
    { label: "Profile", path: "/profile", icon: <Person /> },
    { label: "Settings", path: "/settings", icon: <Settings /> },
    { label: "Logout", path: "/logout", icon: <Logout /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-logo">TriFocus</div>
      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-link ${
              location.pathname === item.path ? "active" : ""
            }`}>
            <span className="icon">{item.icon}</span>
            <span className="label">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
