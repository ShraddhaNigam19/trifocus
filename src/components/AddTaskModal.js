import React, { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/AddTaskModal.css";

const AddTaskModal = ({ onClose, taskToEdit, onSuccess }) => {
  const isEditMode = !!taskToEdit;

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [focusTime, setFocusTime] = useState("");

  useEffect(() => {
    if (isEditMode) {
      setTitle(taskToEdit.title || "");
      setCategory(taskToEdit.category || "Personal");
      setFocusTime(taskToEdit.focusTime || "");
    }
  }, [taskToEdit, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) return;

    const taskData = {
      title,
      category,
      focusTime: focusTime ? parseInt(focusTime) : null,
      createdAt: new Date(),
      completed: taskToEdit?.completed || false,
    };

    try {
      if (isEditMode) {
        const taskRef = doc(db, "tasks", taskToEdit.id);
        await updateDoc(taskRef, taskData);
        onSuccess?.("✅ Task updated");
      } else {
        await addDoc(collection(db, "tasks"), taskData);
        onSuccess?.("✅ Task added");
      }

      onClose();
    } catch (error) {
      console.error("❌ Error:", error.message);
      onSuccess?.("❌ Error saving task");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <h2>{isEditMode ? "Edit Task" : "Add Task"}</h2>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value="Personal">Personal</option>
            <option value="Work">Work</option>
            <option value="Health">Health</option>
            <option value="Study">Study</option>
          </select>

          <input
            type="number"
            placeholder="Optional Focus Time (min)"
            value={focusTime}
            onChange={(e) => setFocusTime(e.target.value)}
            min="1"
          />

          <button type="submit">
            {isEditMode ? "Update Task" : "Add Task"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
