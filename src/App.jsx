import { useState, useEffect } from "react";
import PieChartVisualization from "./components/PieChartVisualization";
import DoughnutChartVisualization from "./components/DoughnutChartVisualization";
import LineChartVisualization from "./components/LineChartVisualization";
import BubbleChartVisualization from "./components/BubbleChartVisualization";
import BarChartVisualization from "./components/BarChartVisualization";
import PolarAreaChartVisualization from "./components/PolarAreaChartVisualizatio";
import "./App.css";
import axios from "axios";
import { generateColors } from "./utils/commons";

export default function App() {
  const [allData, setAllData] = useState([]);
  const [pieChartData, setPieChartData] = useState({});
  const [barChartData, setBarChartData] = useState({});
  const [doughnutData, setDoughnutData] = useState({});
  const [lineData, setLineData] = useState({});
  const [bubbleData, setBubbleData] = useState({});
  const [polarAreaData, setPolarAreaData] = useState({});

  const handleRedirect = () => {
    window.location.href = "https://www.usgs.gov/";
  };
  async function getData() {
    await axios
      .get(
        "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2023-12-14&endtime=2023-12-15"
      )
      .then((response) => {
        setAllData(response.data.features);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function buildToVisualizeData(objectData, type) {
    const labels = Object.keys(objectData);
    const values = Object.values(objectData);
    let colors = [];

    switch (type) {
      case "pie":
        colors = generateColors(labels.length);
        setPieChartData({
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
        });
        break;

      case "bar":
        setBarChartData({
          labels: labels,
          datasets: [
            {
              label: "Sources",
              data: values,
              backgroundColor: "rgba(53, 162, 235, 0.5)",
            },
          ],
        });
        break;

      case "doughnut":
        colors = generateColors(labels.length);
        setDoughnutData({
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
        });
        break;

      case "line":
        colors = generateColors(labels.length);
        setLineData({
          labels: labels,
          datasets: [
            {
              label: "magnitude",
              data: values,
              borderColor: "rgb(255, 99, 132)",
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
        break;

      case "bubble":
        setBubbleData({
          datasets: [
            {
              label: "Lat, Long, Depth",
              data: objectData,
              backgroundColor: "rgba(255, 99, 132, 0.5)",
            },
          ],
        });
        break;

      default:
        colors = generateColors(labels.length);
        setPolarAreaData({
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
        });
    }
  }
  function buildData() {
    var dataTemp = allData.slice();
    var pie = {};
    var doughnut = {};
    var line = {};
    var bubble = [];
    var bar = {};
    var polarArea = {};
    var loc = {};

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

      // cleansing the data by remove "," at first and last char
      var sourcesStr = dataTemp[i].properties.sources.slice(1, -1);
      var sourcesArr = sourcesStr.split(",");
      for (var ii = 0; ii < sourcesArr.length; ii++) {
        bar[sourcesArr[ii]] = (bar[sourcesArr[ii]] || 0) + 1;
      }

      var typesStr = dataTemp[i].properties.types.slice(1, -1);
      var typesArr = typesStr.split(",");
      for (var iii = 0; iii < typesArr.length; iii++) {
        polarArea[typesArr[iii]] = (polarArea[typesArr[iii]] || 0) + 1;
      }

      var locTemp = dataTemp[i].properties.place.includes(",")
        ? dataTemp[i].properties.place.split(",")[1].slice(1)
        : dataTemp[i].properties.place;
      loc[locTemp] = (loc[locTemp] || 0) + 1;
    }

    console.log(loc);

    buildToVisualizeData(pie, "pie");
    buildToVisualizeData(doughnut, "doughnut");
    buildToVisualizeData(line, "line");
    buildToVisualizeData(bubble, "bubble");
    buildToVisualizeData(bar, "bar");
    buildToVisualizeData(polarArea, "polarArea");
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
        {allData.length && polarAreaData.labels !== undefined && (
          <>
            <div className="text-gray-700 text-base mb-4">
              Total there are{" "}
              <span className="font-bold text-xl">{allData.length}</span> data.
            </div>
            <PieChartVisualization data={pieChartData} />
            <DoughnutChartVisualization data={doughnutData} />
            <BarChartVisualization data={barChartData} />
            <PolarAreaChartVisualization data={polarAreaData} />
            <LineChartVisualization data={lineData} />
            <BubbleChartVisualization data={bubbleData} />
          </>
        )}
      </div>
    </>
  );
}
