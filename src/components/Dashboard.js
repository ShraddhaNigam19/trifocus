import React, { useState } from "react";
import Sidebar from "./Sidebar";
import DashboardLayout from "./DashboardLayout";
import AddTaskModal from "./AddTaskModal";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [showModal, setShowModal] = useState(false);

  const handleAddTask = async (taskData) => {
    try {
      await addDoc(collection(db, "tasks"), taskData);
      console.log("✅ Task added successfully");
    } catch (err) {
      console.error("🔥 Error adding task:", err.message);
    }
  };

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="main-content">
        {/* 🧠 Show Quick Add at top */}

        <DashboardLayout />

        {/* 🔥 Modal only shows if triggered */}
        {showModal && (
          <AddTaskModal
            onClose={() => setShowModal(false)}
            onAdd={handleAddTask}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
