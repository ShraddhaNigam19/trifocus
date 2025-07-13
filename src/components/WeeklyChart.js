import React from "react";
import { BarChart, Bar, XAxis, Tooltip } from "recharts";

const data = [
  { name: "S", tasks: 2 },
  { name: "M", tasks: 3 },
  { name: "T", tasks: 3 },
  { name: "W", tasks: 2 },
  { name: "T", tasks: 3 },
  { name: "F", tasks: 1 },
  { name: "S", tasks: 0 },
];

const WeeklyChart = () => {
  return (
    <div className="bg-white mt-4 p-4 rounded shadow">
      <h3 className="font-semibold mb-2">Weekly Progress</h3>
      <BarChart width={300} height={150} data={data}>
        <XAxis dataKey="name" />
        <Tooltip />
        <Bar dataKey="tasks" fill="#82ca9d" />
      </BarChart>
    </div>
  );
};

export default WeeklyChart;
