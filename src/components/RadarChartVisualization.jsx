import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export default function RadarChartVisualization({ data }) {
  return (
    <div className="flex flex-col items-center text-center mb-4">
      <div className="text-gray-700 text-base"> Data places: </div>
      <div className="text-gray-500 text-sm px-1 mb-1">
        Textual description of named geographic region near to the event. This
        may be a city name, or a Flinn-Engdahl Region name.
      </div>
      <div style={{ width: "100vw" }}>
        <Radar data={data}></Radar>
      </div>
    </div>
  );
}
