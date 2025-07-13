import React from "react";

const StreakTracker = () => {
  return (
    <div className="bg-orange-100 p-4 rounded shadow mt-4 text-center">
      <div className="text-xl">🔥 5 day streak</div>
      <div className="flex justify-center mt-2 space-x-2">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full bg-green-500"
            title={d}></div>
        ))}
      </div>
    </div>
  );
};

export default StreakTracker;
