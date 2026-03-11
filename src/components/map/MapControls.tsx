import { useEffect } from "react";
import { Layers, Activity, ShieldAlert } from "lucide-react";

interface MapControlsProps {
  enabledLayers: {
    status: boolean;
    compliance: boolean;
    certificates: boolean;
  };
  onChange: (layers: { status: boolean; compliance: boolean; certificates: boolean }) => void;
}

const MapControls = ({ enabledLayers, onChange }: MapControlsProps) => {
  // Persist layer preferences to localStorage
  useEffect(() => {
    localStorage.setItem("map-layer-preferences", JSON.stringify(enabledLayers));
  }, [enabledLayers]);

  const handleToggle = (layer: keyof typeof enabledLayers) => {
    onChange({
      ...enabledLayers,
      [layer]: !enabledLayers[layer],
    });
  };

  return (
    <div className="absolute top-4 right-4 z-10">
      <div className="card-elevated p-4 bg-card min-w-[200px]">
        <h3 className="text-sm font-semibold font-display text-foreground mb-3">
          Map Layers
        </h3>

        <div className="space-y-2">
          {/* Connection Status Toggle */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={enabledLayers.status}
              onChange={() => handleToggle("status")}
              disabled={enabledLayers.compliance}
              className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary disabled:opacity-50 disabled:cursor-not-allowed"
            />
            <Layers className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="text-xs font-body text-foreground flex-1">
              Connection Status
            </span>
          </label>

          {/* Compliance Score Toggle */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={enabledLayers.compliance}
              onChange={() => handleToggle("compliance")}
              className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
            />
            <Activity className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="text-xs font-body text-foreground flex-1">
              Compliance Score
            </span>
          </label>

          {/* Certificate Alerts Toggle */}
          <label className="flex items-center gap-2 cursor-pointer group">
            <input
              type="checkbox"
              checked={enabledLayers.certificates}
              onChange={() => handleToggle("certificates")}
              className="w-4 h-4 rounded border-border text-primary focus:ring-2 focus:ring-primary"
            />
            <ShieldAlert className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
            <span className="text-xs font-body text-foreground flex-1">
              Certificate Alerts
            </span>
          </label>
        </div>

        {enabledLayers.compliance && (
          <p className="text-xs text-muted-foreground font-body mt-3 pt-3 border-t border-border">
            Compliance layer overrides status colors
          </p>
        )}
      </div>
    </div>
  );
};

export default MapControls;
