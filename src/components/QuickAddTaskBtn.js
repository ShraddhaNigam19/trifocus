import React from "react";

const QuickAddTaskBtn = ({ onClick }) => {
  return (
    <button className="quick-add-btn" onClick={onClick}>
      + Add Task
    </button>
  );
};

export default QuickAddTaskBtn;
