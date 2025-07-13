import React, { useState, useEffect } from "react";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";
import {
  FaRegCheckCircle,
  FaCheckCircle,
  FaTrashAlt,
  FaEdit,
  FaClock,
  FaStopCircle,
} from "react-icons/fa";
import "../styles/TaskCard.css";

const TaskCard = ({ task, onEdit }) => {
  const [completed, setCompleted] = useState(task.completed || false);
  const [isTiming, setIsTiming] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  // ✅ Toggle task completed
  const toggleComplete = async () => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, { completed: !completed });
      setCompleted(!completed);
    } catch (error) {
      console.error("❌ Error updating task:", error.message);
    }
  };

  // ✅ Start / Stop timer
  const toggleTimer = () => {
    if (isTiming) {
      clearInterval(intervalId);
      setIsTiming(false);
      setIntervalId(null);
      console.log(`🕒 Focus time: ${elapsedTime} sec`);
      // Optionally, update Firebase with time spent
    } else {
      const id = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
      setIsTiming(true);
    }
  };

  // ✅ Delete task
  const deleteTask = async () => {
    if (!window.confirm("Delete this task?")) return;
    try {
      const taskRef = doc(db, "tasks", task.id);
      await deleteDoc(taskRef);
    } catch (error) {
      console.error("❌ Error deleting task:", error.message);
    }
  };

  // 🧹 Cleanup on unmount
  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  return (
    <div className={`task-card ${completed ? "completed" : ""}`}>
      <div className="task-left" onClick={toggleComplete}>
        {completed ? (
          <FaCheckCircle className="icon check done" title="Mark Incomplete" />
        ) : (
          <FaRegCheckCircle className="icon check" title="Mark Complete" />
        )}
      </div>

      <div className="task-title">{task.title}</div>

      {task.focusTime && (
        <div
          className="task-time"
          onClick={toggleTimer}
          title="Start/Stop Timer">
          {isTiming ? (
            <FaStopCircle className="icon clock stop" />
          ) : (
            <FaClock className="icon clock" />
          )}
          {task.focusTime} min
        </div>
      )}

      <div className="task-actions">
        <FaEdit
          className="icon edit"
          title="Edit Task"
          onClick={() => onEdit?.(task)}
        />
        <FaTrashAlt
          className="icon delete"
          title="Delete Task"
          onClick={deleteTask}
        />
      </div>
    </div>
  );
};

export default TaskCard;
