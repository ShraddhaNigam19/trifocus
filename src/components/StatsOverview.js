import React, { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import "../styles/StatsOverview.css";
import { FaCheckCircle, FaClock, FaFire, FaRegDotCircle } from "react-icons/fa";

const StatsOverview = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    tasksCompleted: 0,
    timeFocused: 0,
    habitStreak: 0,
    pomodoroSessions: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      if (!user?.uid) return;
      try {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          const data = userSnap.data();
          setStats({
            tasksCompleted: data.stats?.tasksCompleted || 0,
            timeFocused: data.stats?.timeFocused || 0,
            habitStreak: data.stats?.habitStreak || 0,
            pomodoroSessions: data.stats?.pomodoroSessions || 0,
          });
        }
      } catch (error) {
        console.error("Error fetching stats:", error.message);
      }
    };

    fetchStats();
  }, [user]);

  // Convert timeFocused from minutes to HH:MM
  const formatTime = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hrs}h ${mins}m`;
  };

  return (
    <div className="stats-container">
      <div className="stat-box">
        <FaCheckCircle className="stat-icon" />
        <div>
          <h3>{stats.tasksCompleted}</h3>
          <p>Tasks Completed</p>
        </div>
      </div>

      <div className="stat-box">
        <FaClock className="stat-icon" />
        <div>
          <h3>{formatTime(stats.timeFocused)}</h3>
          <p>Time Focused</p>
        </div>
      </div>

      <div className="stat-box">
        <FaFire className="stat-icon" />
        <div>
          <h3>{stats.habitStreak}</h3>
          <p>Habit Streak</p>
        </div>
      </div>

      <div className="stat-box">
        <FaRegDotCircle className="stat-icon" />
        <div>
          <h3>{stats.pomodoroSessions}</h3>
          <p>Pomodoro Sessions</p>
        </div>
      </div>
    </div>
  );
};

export default StatsOverview;
