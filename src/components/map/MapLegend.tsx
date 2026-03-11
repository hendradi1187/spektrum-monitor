import { STATUS_COLORS, CERTIFICATE_COLORS } from "@/lib/mapbox";

interface MapLegendProps {
  enabledLayers: {
    status: boolean;
    compliance: boolean;
    certificates: boolean;
  };
}

const MapLegend = ({ enabledLayers }: MapLegendProps) => {
  // Don't show legend if no layers are enabled
  if (!enabledLayers.status && !enabledLayers.compliance && !enabledLayers.certificates) {
    return null;
  }

  return (
    <div className="absolute bottom-4 left-4 z-10">
      <div className="card-elevated p-4 bg-card max-w-[280px]">
        <h3 className="text-sm font-semibold font-display text-foreground mb-3">
          Legend
        </h3>

        <div className="space-y-4">
          {/* Connection Status Legend */}
          {enabledLayers.status && !enabledLayers.compliance && (
            <div>
              <p className="text-xs font-medium font-body text-muted-foreground mb-2 uppercase tracking-wide">
                Connection Status
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: STATUS_COLORS.CERTIFIED }}
                  />
                  <span className="text-xs font-body text-foreground">Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: STATUS_COLORS.PILOT }}
                  />
                  <span className="text-xs font-body text-foreground">Pilot</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: STATUS_COLORS.ONBOARDING }}
                  />
                  <span className="text-xs font-body text-foreground">Onboarding</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: STATUS_COLORS.REGISTRATION }}
                  />
                  <span className="text-xs font-body text-foreground">Registration</span>
                </div>
              </div>
            </div>
          )}

          {/* Compliance Score Legend */}
          {enabledLayers.compliance && (
            <div>
              <p className="text-xs font-medium font-body text-muted-foreground mb-2 uppercase tracking-wide">
                Compliance Score
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: "hsl(145, 63%, 40%)" }}
                  />
                  <span className="text-xs font-body text-foreground">85-100% (Excellent)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: "hsl(85, 60%, 45%)" }}
                  />
                  <span className="text-xs font-body text-foreground">70-84% (Good)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: "hsl(45, 100%, 51%)" }}
                  />
                  <span className="text-xs font-body text-foreground">50-69% (Fair)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full border-2 border-white"
                    style={{ backgroundColor: "hsl(354, 70%, 54%)" }}
                  />
                  <span className="text-xs font-body text-foreground">0-49% (Poor)</span>
                </div>
              </div>
            </div>
          )}

          {/* Certificate Alerts Legend */}
          {enabledLayers.certificates && (
            <div>
              <p className="text-xs font-medium font-body text-muted-foreground mb-2 uppercase tracking-wide">
                Certificate Alerts
              </p>
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full certificate-pulse"
                    style={{ backgroundColor: CERTIFICATE_COLORS.EXPIRED }}
                  />
                  <span className="text-xs font-body text-foreground">Expired</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full certificate-pulse"
                    style={{ backgroundColor: CERTIFICATE_COLORS.CRITICAL }}
                  />
                  <span className="text-xs font-body text-foreground">Critical (&lt;30 days)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full certificate-pulse"
                    style={{ backgroundColor: CERTIFICATE_COLORS.WARNING }}
                  />
                  <span className="text-xs font-body text-foreground">Warning (&lt;90 days)</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapLegend;
