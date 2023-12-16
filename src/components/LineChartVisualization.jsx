import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function LineChartVisualization({ data }) {
  return (
    <div className="flex flex-col items-center  text-center mb-4">
      <div className="text-gray-700 text-base"> Data Magnitude: </div>
      <div className="text-gray-500 text-sm px-1 mb-1">
        The magnitude reported is that which the U.S. Geological Survey
        considers official for this earthquake, and was the best available
        estimate of the earthquake’s size, at the time that this page was
        created. Other magnitudes associated with web pages linked from here are
        those determined at various times following the earthquake with
        different types of seismic data. Although they are legitimate estimates
        of magnitude, the U.S. Geological Survey does not consider them to be
        the preferred "official" magnitude for the event.
      </div>

      <div style={{ width: "100%" }}>
        <Line data={data}></Line>
      </div>
    </div>
  );
}
