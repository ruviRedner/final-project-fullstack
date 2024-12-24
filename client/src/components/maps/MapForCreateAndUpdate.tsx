import { LeafletMouseEvent } from "leaflet";
import React from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
interface Props {
  onMapClick: (lat: number, lng: number) =>void;
}
const MapForCreateAndUpdate: React.FC<Props> = ({ onMapClick }) => {
  const MapClickHandler = () => {
    useMapEvents({
      click: (e: LeafletMouseEvent) => {
        const { lat, lng } = e.latlng;
        if (onMapClick) onMapClick(lat, lng);
      },
    });
    return null;
  };
  return (
    <div>
      <MapContainer
        center={[32.0853, 34.7818]}
        zoom={2}
        style={{ height: "200px", width: "100%" }}
      >
         <TileLayer
                   url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                   attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                 />
        <MapClickHandler />
      </MapContainer>
    </div>
  );
};

export default MapForCreateAndUpdate;
