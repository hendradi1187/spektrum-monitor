import { CircleMarker } from "react-leaflet";
import type { MapGeoJSON, MapFeature } from "@/lib/geojson";
import { CERTIFICATE_COLORS } from "@/lib/mapbox";
import { Fragment } from "react";

interface MapLayersProps {
  data: MapGeoJSON;
  enabledLayers: {
    status: boolean;
    compliance: boolean;
    certificates: boolean;
  };
  onFeatureClick: (feature: MapFeature) => void;
}

const MapLayers = ({ data, enabledLayers, onFeatureClick }: MapLayersProps) => {
  return (
    <>
      {/* Render each WK location as a circle marker */}
      {data.features.map((feature) => {
        const { properties } = feature;
        const position: [number, number] = [properties.latitude, properties.longitude];

        // Determine color based on active layer
        const fillColor = enabledLayers.compliance
          ? properties.complianceColor
          : properties.statusColor;

        // Determine radius based on active layer
        const radius = enabledLayers.compliance ? 10 : 8;

        // Check if certificate alert should be shown
        const showCertAlert =
          enabledLayers.certificates &&
          properties.certificateStatus &&
          ["EXPIRED", "CRITICAL", "WARNING"].includes(properties.certificateStatus);

        return (
          <Fragment key={properties.id}>
            {/* Certificate alert overlay (pulsing effect) - render first so it's behind */}
            {showCertAlert && (
              <CircleMarker
                center={position}
                radius={radius + 4}
                pathOptions={{
                  fillColor:
                    properties.certificateStatus === "EXPIRED"
                      ? CERTIFICATE_COLORS.EXPIRED
                      : properties.certificateStatus === "CRITICAL"
                      ? CERTIFICATE_COLORS.CRITICAL
                      : CERTIFICATE_COLORS.WARNING,
                  fillOpacity: 0.5,
                  color: "transparent",
                  weight: 0,
                }}
                className="certificate-pulse"
              />
            )}

            {/* Main marker */}
            {(enabledLayers.status || enabledLayers.compliance) && (
              <CircleMarker
                center={position}
                radius={radius}
                pathOptions={{
                  fillColor: fillColor,
                  fillOpacity: 1,
                  color: "#ffffff",
                  weight: 2,
                }}
                eventHandlers={{
                  click: () => onFeatureClick(feature),
                }}
              />
            )}
          </Fragment>
        );
      })}
    </>
  );
};

export default MapLayers;
