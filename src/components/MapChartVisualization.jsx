import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export default function MapChartVisualization({ data }) {
  const center = [51.505, -0.09]; // Coordinates for the center of the map

  return (
    <div className="flex flex-col items-center  text-center mb-4">
      <div className="text-gray-700 text-base">Data Maps:</div>
      <div className="text-gray-500 text-sm mb-4">
        Map of earthquakes based on longitude and latitude
      </div>

      <MapContainer
        center={center}
        zoom={2}
        style={{ height: "600px", width: "375px" }}
      >
        {/* Add a tile layer */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {/* Add markers with popups */}
        {data.map((marker, index) => (
          <Marker key={index} position={marker.position}>
            <Popup>{marker.popupText}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
