import { Popup } from "react-leaflet";
import { format } from "date-fns";
import { X, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import StatusBadge from "@/components/StatusBadge";
import type { MapFeature } from "@/lib/geojson";

interface MapPopupProps {
  feature: MapFeature;
  onClose: () => void;
}

const MapPopup = ({ feature, onClose }: MapPopupProps) => {
  const { properties } = feature;

  // Format certificate expiry date
  const formatCertExpiry = (expiryDate: string | undefined): string => {
    if (!expiryDate) return "N/A";
    try {
      return format(new Date(expiryDate), "MMM dd, yyyy");
    } catch {
      return "Invalid date";
    }
  };

  // Format last sync date
  const formatLastSync = (syncDate: string): string => {
    try {
      return format(new Date(syncDate), "MMM dd, yyyy HH:mm");
    } catch {
      return "Unknown";
    }
  };

  // Get compliance color based on score
  const getComplianceClass = (score: number): string => {
    if (score >= 85) return "text-[hsl(145,63%,40%)]";
    if (score >= 70) return "text-[hsl(85,60%,45%)]";
    if (score >= 50) return "text-[hsl(45,100%,51%)]";
    return "text-[hsl(354,70%,54%)]";
  };

  return (
    <Popup
      position={[properties.latitude, properties.longitude]}
      onClose={onClose}
      closeButton={false}
      className="custom-popup"
      maxWidth={320}
      minWidth={280}
    >
      <div className="bg-card rounded-lg overflow-hidden">
        {/* Header */}
        <div className="px-4 py-3 border-b border-border bg-muted/30 flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold font-display text-foreground text-sm mb-1 truncate">
              {properties.wilayahKerja}
            </h3>
            <StatusBadge status={properties.connectionStatus} />
          </div>
          <button
            onClick={onClose}
            className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close popup"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-3 space-y-2.5">
          {/* KKKS Name */}
          <div>
            <p className="text-xs font-medium text-muted-foreground font-body uppercase tracking-wide">
              KKKS
            </p>
            <p className="text-sm text-foreground font-body">{properties.kkksName}</p>
          </div>

          {/* Compliance Score */}
          <div>
            <p className="text-xs font-medium text-muted-foreground font-body uppercase tracking-wide">
              Compliance Score
            </p>
            <p className={`text-sm font-semibold font-display ${getComplianceClass(properties.sigiComplianceScore)}`}>
              {properties.sigiComplianceScore}%
            </p>
          </div>

          {/* Certificate Status (if CERTIFIED) */}
          {properties.connectionStatus === "CERTIFIED" && properties.certificateExpiry && (
            <div>
              <p className="text-xs font-medium text-muted-foreground font-body uppercase tracking-wide">
                Certificate
              </p>
              <p className="text-sm text-foreground font-body">
                {properties.certificateName}
              </p>
              <p className="text-xs text-muted-foreground font-body">
                Expires: {formatCertExpiry(properties.certificateExpiry)}
                {properties.daysUntilExpiry !== undefined && properties.daysUntilExpiry < 90 && (
                  <span className={`ml-1 font-medium ${
                    properties.daysUntilExpiry < 0 ? "text-destructive" :
                    properties.daysUntilExpiry <= 30 ? "text-[hsl(27,96%,50%)]" :
                    "text-warning"
                  }`}>
                    ({properties.daysUntilExpiry < 0 ? "EXPIRED" : `${properties.daysUntilExpiry} days`})
                  </span>
                )}
              </p>
            </div>
          )}

          {/* PPDM Modules */}
          <div>
            <p className="text-xs font-medium text-muted-foreground font-body uppercase tracking-wide">
              PPDM Modules
            </p>
            <p className="text-sm text-foreground font-body">
              {properties.ppdmModulesActivated} / {properties.ppdmModulesTotal} activated
            </p>
          </div>

          {/* Last Sync */}
          <div>
            <p className="text-xs font-medium text-muted-foreground font-body uppercase tracking-wide">
              Last Sync
            </p>
            <p className="text-sm text-foreground font-body">
              {formatLastSync(properties.lastSync)}
            </p>
          </div>
        </div>

        {/* Footer - View Details Link */}
        <div className="px-4 py-3 border-t border-border bg-muted/30">
          <Link
            to="/kkks"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-primary hover:text-primary/80 transition-colors font-body"
          >
            View Details
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </Popup>
  );
};

export default MapPopup;
