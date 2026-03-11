import { kkksData } from "@/data/mockData";
import StatusBadge from "@/components/StatusBadge";
import { MapPin } from "lucide-react";

const GeoportalMap = () => {
  return (
    <div className="h-screen flex flex-col">
      {/* Header bar */}
      <div className="px-8 py-4 border-b border-border bg-card flex items-center justify-between">
        <div>
          <h1 className="page-title">Geoportal Monitoring Map</h1>
          <p className="text-sm text-muted-foreground font-body">Indonesia WK centroids by implementation status</p>
        </div>
        <p className="text-xs text-muted-foreground font-body">Mapbox integration required for live map. Showing data view.</p>
      </div>

      {/* Map placeholder with data */}
      <div className="flex-1 bg-muted relative overflow-auto p-8">
        <div className="card-elevated p-6">
          <h2 className="section-title mb-4">WK Locations & Status</h2>
          <div className="grid grid-cols-2 gap-3">
            {kkksData.map(k => (
              <div key={k.id} className="flex items-center gap-3 px-3 py-2 rounded border border-border bg-card">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate font-body">{k.wilayahKerja}</p>
                  <p className="text-xs text-muted-foreground font-body">{k.latitude.toFixed(2)}°, {k.longitude.toFixed(2)}°</p>
                </div>
                <StatusBadge status={k.connectionStatus} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeoportalMap;
