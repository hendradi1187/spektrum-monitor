import type { ConnectionStatus } from "@/data/mockData";

// Map configuration constants for Leaflet
export const MAP_CONFIG = {
  // Initial center position (Indonesia)
  center: [-2, 118] as [number, number],

  // Initial zoom level
  zoom: 5,

  // Min/max zoom levels
  minZoom: 4,
  maxZoom: 18,

  // Indonesia bounds to constrain map
  bounds: [
    [-11, 95],  // Southwest coordinates
    [6, 141],   // Northeast coordinates
  ] as [[number, number], [number, number]],
} as const;

// Connection status colors (matches existing StatusBadge)
export const STATUS_COLORS: Record<ConnectionStatus, string> = {
  CERTIFIED: 'hsl(145, 63%, 40%)',    // --success
  PILOT: 'hsl(45, 100%, 51%)',        // --warning
  ONBOARDING: 'hsl(209, 40%, 52%)',   // --chart-2
  REGISTRATION: 'hsl(354, 70%, 54%)', // --destructive
};

// Compliance score color gradient
export const getComplianceColor = (score: number): string => {
  if (score >= 85) return 'hsl(145, 63%, 40%)';  // Green (85-100%)
  if (score >= 70) return 'hsl(85, 60%, 45%)';   // Yellow-green (70-84%)
  if (score >= 50) return 'hsl(45, 100%, 51%)';  // Orange (50-69%)
  return 'hsl(354, 70%, 54%)';                    // Red (0-49%)
};

// Certificate alert colors
export const CERTIFICATE_COLORS = {
  EXPIRED: 'hsl(354, 70%, 54%)',   // Red
  CRITICAL: 'hsl(27, 96%, 50%)',   // Orange
  WARNING: 'hsl(45, 100%, 51%)',   // Yellow
  VALID: 'hsl(145, 63%, 40%)',     // Green
} as const;

export type CertificateStatus = keyof typeof CERTIFICATE_COLORS;
