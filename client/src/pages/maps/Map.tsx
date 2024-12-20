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

interface ClinicMapProps {
  latitude: number;
  longitude: number;
  clinicName: string;
  address: string;
}

const ClinicMap: React.FC<ClinicMapProps> = ({
  latitude,
  longitude,
  clinicName,
  address,
}) => {
  const googleStreetViewURL = (lat: number, lng: number) =>
    `https://www.google.com/maps/embed/v1/streetview?key=AIzaSyB0rL70fxeRtawDwZeUEp9aiNKSYvMsc_A&location=${lat},${lng}&heading=210&pitch=10&fov=90`;

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {
        <div
          style={{
            height: "300px",
            width: "100%",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.3)",
          }}
        >
          <MapContainer
            center={[latitude, longitude]}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[latitude, longitude]} icon={customIcon}>
              <Popup>
                <b>{clinicName}</b>
                <br />
                {address}
                <br />
                <div style={{ marginTop: "10px" }}>
                  <iframe
                    width="250"
                    height="150"
                    style={{ border: "0", borderRadius: "8px" }}
                    loading="lazy"
                    allowFullScreen
                    src={googleStreetViewURL(latitude, longitude)}
                  ></iframe>
                </div>
              </Popup>
            </Marker>
          </MapContainer>
        </div>
      }
    </div>
  );
};

export default ClinicMap;

