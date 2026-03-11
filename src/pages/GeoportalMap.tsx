import { useState, useMemo } from "react";
import { kkksData } from "@/data/mockData";
import { transformToGeoJSON } from "@/lib/geojson";
import type { MapFeature } from "@/lib/geojson";
import MapContainer from "@/components/map/MapContainer";
import MapLayers from "@/components/map/MapLayers";
import MapControls from "@/components/map/MapControls";
import MapLegend from "@/components/map/MapLegend";
import MapPopup from "@/components/map/MapPopup";

const GeoportalMap = () => {
  // Load layer preferences from localStorage
  const getInitialLayerPreferences = () => {
    const saved = localStorage.getItem("map-layer-preferences");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // Fall back to defaults if parsing fails
      }
    }
    return {
      status: false,
      compliance: true,
      certificates: true,
    };
  };

  const [enabledLayers, setEnabledLayers] = useState(getInitialLayerPreferences);
  const [selectedFeature, setSelectedFeature] = useState<MapFeature | null>(null);

  // Transform KKKS data to GeoJSON
  const geoJsonData = useMemo(() => transformToGeoJSON(kkksData), []);

  return (
    <div className="h-screen flex flex-col">
      {/* Header bar */}
      <div className="px-8 py-4 border-b border-border bg-card flex items-center justify-between">
        <div>
          <h1 className="page-title">Geoportal Monitoring Map</h1>
          <p className="text-sm text-muted-foreground font-body">
            Indonesia WK centroids by connection status and compliance
          </p>
        </div>
        <p className="text-xs text-muted-foreground font-body">
          {geoJsonData.features.length} WK locations
        </p>
      </div>

      {/* Map container */}
      <div className="flex-1 relative">
        <MapContainer>
          <MapLayers
            data={geoJsonData}
            enabledLayers={enabledLayers}
            onFeatureClick={setSelectedFeature}
          />
          <MapControls enabledLayers={enabledLayers} onChange={setEnabledLayers} />
          <MapLegend enabledLayers={enabledLayers} />
          {selectedFeature && (
            <MapPopup feature={selectedFeature} onClose={() => setSelectedFeature(null)} />
          )}
        </MapContainer>
      </div>
    </div>
  );
};

export default GeoportalMap;
