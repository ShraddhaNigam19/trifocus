import React, { useState } from "react";
import { db } from "../firebase";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { useAuth } from "../context/AuthContext"; // ✅ make sure this is correct

const Reflection = () => {
  const { user } = useAuth(); // ✅ this provides the logged-in user
  const [text, setText] = useState("");

  const saveReflection = async (text) => {
    if (!user?.uid) {
      alert("Please login first!");
      return;
    }

    const userRef = doc(db, "users", user.uid);
    await setDoc(
      userRef,
      {
        reflections: arrayUnion({
          text,
          timestamp: new Date().toISOString(),
        }),
      },
      { merge: true }
    );

    alert("Saved: " + text);
    setText("");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-lg font-bold text-indigo-700 mb-4">Reflection</h2>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-24 border border-gray-300 rounded-lg p-2 mb-3"
        placeholder="Write something about your day..."
      />
      <button
        onClick={() => saveReflection(text)}
        className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600">
        Save
      </button>
    </div>
  );
};

export default Reflection;
