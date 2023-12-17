import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function BubbleChartVisualization({ data }) {
  return (
    <div className="flex flex-col items-center  text-center mb-4">
      <div className="text-gray-700 text-base">
        {" "}
        Data Latitude and Longitude:
      </div>
      <div className="text-gray-500 text-sm">
        Show latitude and longitude only.
      </div>

      <div style={{ width: "100vw" }}>
        <Scatter data={data}></Scatter>
      </div>
    </div>
  );
}
