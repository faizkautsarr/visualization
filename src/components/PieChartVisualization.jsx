import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChartVisualization({ data }) {
  return (
    <div className="flex flex-col items-center text-center mb-4">
      <div className="text-gray-700 text-base"> Data status: </div>
      <div className="text-gray-500 text-sm px-1 mb-1">
        Status is either automatic or reviewed. Automatic events are directly
        posted by automatic processing systems and have not been verified or
        altered by a human. Reviewed events have been looked at by a human. The
        level of review can range from a quick validity check to a careful
        reanalysis of the event.
      </div>
      <div style={{ width: "300px" }}>
        <Pie data={data}></Pie>
      </div>
    </div>
  );
}
