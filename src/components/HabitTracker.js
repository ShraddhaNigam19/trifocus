import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";
import { useAuth } from "../context/AuthContext";
import "../styles/HabitTracker.css";

const HabitTracker = () => {
  const { user } = useAuth();
  const [habits, setHabits] = useState([]);
  const [newHabit, setNewHabit] = useState("");

  const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD

  useEffect(() => {
    if (!user) return;

    const q = query(collection(db, "habits"), where("userId", "==", user.uid));
    const unsub = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setHabits(data);
    });

    return () => unsub();
  }, [user]);

  const handleAddHabit = async (e) => {
    e.preventDefault();
    if (!newHabit.trim()) return;

    try {
      await addDoc(collection(db, "habits"), {
        title: newHabit,
        createdAt: new Date(),
        userId: user.uid,
        completedDates: [],
      });
      setNewHabit("");
    } catch (err) {
      console.error("Error adding habit:", err.message);
    }
  };

  const toggleHabitComplete = async (habit) => {
    const alreadyCompleted = habit.completedDates.includes(today);
    const updatedDates = alreadyCompleted
      ? habit.completedDates.filter((d) => d !== today)
      : [...habit.completedDates, today];

    const habitRef = doc(db, "habits", habit.id);
    await updateDoc(habitRef, { completedDates: updatedDates });
  };

  return (
    <div className="habit-tracker">
      <h3>Today's Habits</h3>

      <form onSubmit={handleAddHabit} className="habit-form">
        <input
          type="text"
          placeholder="New habit..."
          value={newHabit}
          onChange={(e) => setNewHabit(e.target.value)}
        />
        <button type="submit">➕</button>
      </form>

      <ul className="habit-list">
        {habits.map((habit) => {
          const completedToday = habit.completedDates.includes(today);
          return (
            <li
              key={habit.id}
              className={completedToday ? "completed" : ""}
              onClick={() => toggleHabitComplete(habit)}>
              {completedToday ? "✅" : "⬜️"} {habit.title}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default HabitTracker;
