import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function BarChartVisualization({ data }) {
  return (
    <div className="flex flex-col items-center text-center mb-4">
      <div className="text-gray-700 text-base"> Data sources: </div>
      <div className="text-gray-500 text-sm px-1 mb-1">
        The ID of a data contributor. Identifies the network considered to be
        the preferred source of information for this event.
      </div>
      <div style={{ width: "375px" }}>
        <Bar data={data}></Bar>
      </div>
    </div>
  );
}
