import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function DoughnutChartVisualization({ data }) {
  return (
    <div className="flex flex-col items-center  text-center mb-4">
      <div className="text-gray-700 text-base"> Data Magnitude Type: </div>
      <div className="text-gray-500 text-sm px-1 mb-1">
        The method or algorithm used to calculate the preferred magnitude for
        the event.
      </div>
      <div style={{ width: "300px" }}>
        <Doughnut data={data}></Doughnut>
      </div>
    </div>
  );
}
