import { MapContainer as LeafletMap, TileLayer } from "react-leaflet";
import { MAP_CONFIG } from "@/lib/mapbox";

interface MapContainerProps {
  children?: React.ReactNode;
}

const MapContainer = ({ children }: MapContainerProps) => {
  return (
    <LeafletMap
      center={MAP_CONFIG.center}
      zoom={MAP_CONFIG.zoom}
      minZoom={MAP_CONFIG.minZoom}
      maxZoom={MAP_CONFIG.maxZoom}
      maxBounds={MAP_CONFIG.bounds}
      style={{ width: "100%", height: "100%" }}
      className="z-0"
    >
      {/* OpenStreetMap tile layer */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {children}
    </LeafletMap>
  );
};

export default MapContainer;
