import React from "react";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export default function PolarAreaChartVisualization({ data }) {
  return (
    <div className="flex flex-col items-center text-center mb-4">
      <div className="text-gray-700 text-base"> Data types: </div>
      <div className="text-gray-500 text-sm px-1 mb-1">
        A comma-separated list of product types associated to this event.
      </div>
      <div style={{ width: "375px" }}>
        <PolarArea data={data}></PolarArea>
      </div>
    </div>
  );
}
