import React, { useEffect, useState } from "react";
import { doc, setDoc, getDoc, increment } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Label,
} from "recharts";

const PomodoroTimer = () => {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [taskData, setTaskData] = useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1 && !hasCompleted) {
          handleComplete();
          setHasCompleted(true);
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [hasCompleted]);

  const formatTime = (t) => {
    const m = Math.floor(t / 60);
    const s = t % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const handleComplete = async () => {
    if (!user?.uid) return;

    try {
      const userRef = doc(db, "users", user.uid);
      await setDoc(
        userRef,
        {
          pomodoro: {
            totalFocusMinutes: increment(25),
            sessionsCompleted: increment(1),
          },
        },
        { merge: true }
      );
    } catch (err) {
      console.error("❌ Error updating Pomodoro stats:", err.message);
    }
  };

  useEffect(() => {
    const fetchTaskData = async () => {
      if (!user?.uid) return;
      try {
        const userRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          const tasks = data.goals || [];
          const formatted = tasks.map((task, index) => ({
            name:
              task.text.length > 10
                ? `${task.text.slice(0, 10)}...`
                : task.text || `Task ${index + 1}`,
            "Time Spent (min)": task.timeSpent || 0,
          }));
          setTaskData(formatted);
        }
      } catch (err) {
        console.error("❌ Error fetching task data:", err.message);
      }
    };

    fetchTaskData();
  }, [user]);

  return (
    <div
      style={{
        background: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        marginTop: "30px",
      }}>
      <h3 style={{ fontWeight: "600", marginBottom: "10px" }}>
        Pomodoro Timer
      </h3>
      <div
        style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "20px" }}>
        {formatTime(timeLeft)}
      </div>

      <h4 style={{ fontSize: "16px", fontWeight: "500", marginBottom: "10px" }}>
        ⏱ Task Focus Summary
      </h4>
      {taskData.length > 0 ? (
        <ResponsiveContainer width="100%" height={250}>
          <BarChart
            data={taskData}
            margin={{ top: 5, right: 30, left: 20, bottom: 40 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name">
              <Label value="Tasks" offset={-10} position="insideBottom" />
            </XAxis>
            <YAxis
              label={{ value: "Minutes", angle: -90, position: "insideLeft" }}
            />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar
              dataKey="Time Spent (min)"
              fill="#8884d8"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <p style={{ fontSize: "14px", color: "#777" }}>No time data yet.</p>
      )}
    </div>
  );
};

export default PomodoroTimer;
