import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";


const customIcon = new L.Icon({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface TerrorEventMapProps {
  events: {
    latitude: number;
    longitude: number;
    title: string;
    description: string;
  }[];
}

const TerrorEventMap: React.FC<TerrorEventMapProps> = ({ events }) => {
  return (
    <div style={{ position: "relative", width: "100%" }}>
      <div
        style={{
          height: "600px",
          width: "100%",
          borderRadius: "15px",
          overflow: "hidden",
          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
        }}
      >
        <MapContainer
          center={[20, 0]} 
          zoom={2}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {events.map((event, index) => (
            <Marker
              key={index}
              position={[event.latitude, event.longitude]}
              icon={customIcon}
            >
              <Popup>
                <b>{event.title}</b>
                <br />
                {event.description}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};

export default TerrorEventMap;
