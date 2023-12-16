import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bubble } from "react-chartjs-2";

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export default function BubbleChartVisualization({ data }) {
  return (
    <div className="flex flex-col items-center  text-center mb-4">
      <div className="text-gray-700 text-base">
        {" "}
        Data Latitude, Longitude, and Depth:{" "}
      </div>
      <div className="text-gray-500 text-sm">
        Show latitude, longitude, and depth
      </div>

      {/* <div className="text-gray-500 text-xs mt-2">Show 10 latest data only</div> */}
      <div style={{ width: "100vw" }}>
        <Bubble
          options={{
            y: {
              beginAtZero: true,
            },
          }}
          data={data}
        ></Bubble>
      </div>
    </div>
  );
}
