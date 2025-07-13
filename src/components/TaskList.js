import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import TaskCard from "./TaskCard";
import QuickAddTaskBtn from "./QuickAddTaskBtn";
import FilterBar from "./FilterBar";
import AddTaskModal from "./AddTaskModal";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("recent");

  // Fetch tasks from Firestore
  useEffect(() => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTasks(data);
    });

    return () => unsub();
  }, []);

  // ✅ Add task handler
  const handleAddTask = async (taskData) => {
    try {
      await addDoc(collection(db, "tasks"), {
        ...taskData,
        createdAt: serverTimestamp(),
      });
      console.log("✅ Task added");
      setShowModal(false);
    } catch (err) {
      console.error("🔥 Error adding task:", err.message);
    }
  };

  // ✅ Filter + sort
  const filteredTasks = tasks
    .filter((task) => filter === "all" || task.category === filter)
    .sort((a, b) => {
      if (sort === "a-z") return a.title.localeCompare(b.title);
      if (sort === "completed") return b.completed - a.completed;
      return 0;
    });

  return (
    <div className="task-list">
      <QuickAddTaskBtn onClick={() => setShowModal(true)} />

      <FilterBar
        onFilterChange={(val) => setFilter(val)}
        onSortChange={(val) => setSort(val)}
      />

      {filteredTasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}

      {showModal && (
        <AddTaskModal
          onAdd={handleAddTask}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default TaskList;
