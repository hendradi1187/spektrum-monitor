import { differenceInDays } from "date-fns";
import type { KKKSRecord } from "@/data/mockData";
import { STATUS_COLORS, getComplianceColor, type CertificateStatus } from "./mapbox";

// Extended feature properties for map layers
export interface MapFeatureProperties extends KKKSRecord {
  statusColor: string;
  complianceColor: string;
  certificateStatus?: CertificateStatus;
  daysUntilExpiry?: number;
}

export interface MapFeature {
  type: "Feature";
  geometry: {
    type: "Point";
    coordinates: [number, number]; // [longitude, latitude]
  };
  properties: MapFeatureProperties;
}

export interface MapGeoJSON {
  type: "FeatureCollection";
  features: MapFeature[];
}

// Calculate certificate status based on expiry date
const getCertificateStatus = (expiryDate: string | undefined): CertificateStatus | undefined => {
  if (!expiryDate) return undefined;

  const daysLeft = differenceInDays(new Date(expiryDate), new Date());

  if (daysLeft < 0) return "EXPIRED";
  if (daysLeft <= 30) return "CRITICAL";
  if (daysLeft <= 90) return "WARNING";
  return "VALID";
};

// Calculate days until certificate expiry
const getDaysUntilExpiry = (expiryDate: string | undefined): number | undefined => {
  if (!expiryDate) return undefined;
  return differenceInDays(new Date(expiryDate), new Date());
};

// Transform KKKS records to GeoJSON feature collection
export const transformToGeoJSON = (records: KKKSRecord[]): MapGeoJSON => {
  const features: MapFeature[] = records.map((record) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [record.longitude, record.latitude],
    },
    properties: {
      ...record,
      statusColor: STATUS_COLORS[record.connectionStatus],
      complianceColor: getComplianceColor(record.sigiComplianceScore),
      certificateStatus: getCertificateStatus(record.certificateExpiry),
      daysUntilExpiry: getDaysUntilExpiry(record.certificateExpiry),
    },
  }));

  return {
    type: "FeatureCollection",
    features,
  };
};

// Filter features by certificate alert status
export const filterCertificateAlerts = (geoJson: MapGeoJSON): MapGeoJSON => {
  return {
    type: "FeatureCollection",
    features: geoJson.features.filter((feature) => {
      const status = feature.properties.certificateStatus;
      return status === "EXPIRED" || status === "CRITICAL" || status === "WARNING";
    }),
  };
};
