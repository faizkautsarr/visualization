import { useState, useEffect } from "react";
import PieChartVisualization from "./components/PieChartVisualization";
import DoughnutChartVisualization from "./components/DoughnutChartVisualization";
import LineChartVisualization from "./components/LineChartVisualization";
import BubbleChartVisualization from "./components/BubbleChartVisualization";
import BarChartVisualization from "./components/BarChartVisualization";
import "./App.css";
import axios from "axios";

export default function App() {
  const [allData, setAllData] = useState([]);
  const [pieChartData, setPieChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [doughnutData, setDoughnutData] = useState({});
  const [lineData, setLineData] = useState({});
  const [bubbleData, setBubbleData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleRedirect = () => {
    window.location.href = "https://www.usgs.gov/";
  };
  async function getData() {
    setIsLoading(true);

    await axios
      .get(
        "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2023-12-14&endtime=2023-12-15"
      )
      .then((response) => {
        setAllData(response.data.features);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(async () => {
        setIsLoading(false);
      });
  }

  function generateColors(n) {
    var colors = [];
    const uniqueBrightColors = [
      "#3498db", // Blue
      "#2ecc71", // Green
      "#8e44ad", // Purple
      "#2980b9", // Dark Blue
      "#f39c12", // Orange
      "#e74c3c", // Red
      "#1abc9c", // Turquoise
      "#d35400", // Rust
      "#c0392b", // Maroon
      "#16a085", // Teal
    ];
    for (let i = 0; i < n; i++) {
      // Generate a random color in hexadecimal format
      const c = uniqueBrightColors[i];
      colors.push(c);
    }

    return colors;
  }

  function buildToVisualizeData(objectData, type) {
    var labels = "";
    var values = "";
    var colors = [];

    if (type === "pie") {
      labels = Object.keys(objectData);
      values = Object.values(objectData);
      colors = generateColors(labels.length);
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Number of data",
            data: values,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      };

      setPieChartData(data);
    } else if (type === "bar") {
      labels = Object.keys(objectData);
      values = Object.values(objectData);
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Sources",
            data: values,
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ],
      };

      setBarChartData(data);
    } else if (type === "doughnut") {
      labels = Object.keys(objectData);
      values = Object.values(objectData);
      colors = generateColors(labels.length);
      const data = {
        labels: labels,
        datasets: [
          {
            label: "Number of data",
            data: values,
            backgroundColor: colors,
            borderColor: colors,
            borderWidth: 1,
          },
        ],
      };

      setDoughnutData(data);
    } else if (type === "line") {
      labels = Object.keys(objectData);
      values = Object.values(objectData);
      colors = generateColors(labels.length);
      const data = {
        labels: labels,
        datasets: [
          {
            label: "magnitude",
            data: values,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };
      setLineData(data);
    } else if (type == "bubble") {
      const data = {
        datasets: [
          {
            label: "Lat, Long, Depth",
            data: objectData,
            backgroundColor: "rgba(255, 99, 132, 0.5)",
          },
        ],
      };
      setBubbleData(data);
    }
  }
  function buildData() {
    setIsLoading(true);
    var dataTemp = allData.slice();
    var pie = {};
    var doughnut = {};
    var line = {};
    var bubble = [];
    var bar = {};

    for (var i = 0; i < dataTemp.length; i++) {
      pie[dataTemp[i].properties.status] =
        (pie[dataTemp[i].properties.status] || 0) + 1;

      doughnut[dataTemp[i].properties.magType] =
        (doughnut[dataTemp[i].properties.magType] || 0) + 1;

      bubble.push({
        x: dataTemp[i].geometry.coordinates[0],
        y: dataTemp[i].geometry.coordinates[1],
        r: dataTemp[i].geometry.coordinates[2] / 10,
      });

      line[dataTemp[i].id] = dataTemp[i].properties.mag;

      // handle sources
      var sourcesStr = dataTemp[i].properties.sources.slice(1, -1);
      var sourcesArr = sourcesStr.split(",");
      for (var ii = 0; ii < sourcesArr.length; ii++) {
        bar[sourcesArr[ii]] = (bar[sourcesArr[ii]] || 0) + 1;
      }
    }

    buildToVisualizeData(pie, "pie");
    buildToVisualizeData(doughnut, "doughnut");
    buildToVisualizeData(line, "line");
    buildToVisualizeData(bubble, "bubble");
    buildToVisualizeData(bar, "bar");
    setIsLoading(false);
  }

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (allData.length > 0) {
      buildData();
    }
  }, [allData]);

  return (
    <>
      <div
        className="flex flex-col items-center p-4 font-mono mt-16"
        style={{ maxWidth: "100vw" }}
      >
        <p className="font-mono text-xl text-center mb-4">
          Here is a summary of seismic activity recorded between December 14
          2023 until December 15 2023, sourced exclusively from the{" "}
          <span className="text-blue-900 underline" onClick={handleRedirect}>
            USGS.
          </span>
        </p>
        {!isLoading && allData.length && pieChartData.labels !== undefined && (
          <>
            <div className="text-gray-700 text-base mb-4">
              Total there are{" "}
              <span className="font-bold text-xl">{allData.length}</span> data.
            </div>
            <PieChartVisualization data={pieChartData} />
            <DoughnutChartVisualization data={doughnutData} />
            <LineChartVisualization data={lineData} />
            <BubbleChartVisualization data={bubbleData} />
            <BarChartVisualization data={barChartData} />
          </>
        )}
      </div>
    </>
  );
}
