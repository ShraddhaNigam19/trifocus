import React from "react";

const FilterBar = ({ onFilterChange, onSortChange }) => {
  return (
    <div className="filter-bar">
      <select onChange={(e) => onFilterChange(e.target.value)}>
        <option value="all">All</option>
        <option value="work">Work</option>
        <option value="personal">Personal</option>
      </select>

      <select onChange={(e) => onSortChange(e.target.value)}>
        <option value="recent">Recently Added</option>
        <option value="a-z">A → Z</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};

export default FilterBar;
