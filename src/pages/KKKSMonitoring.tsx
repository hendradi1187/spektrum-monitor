import { useState, useMemo } from "react";
import { kkksData, type ConnectionStatus } from "@/data/mockData";
import StatusBadge from "@/components/StatusBadge";
import { Search, Download } from "lucide-react";

const KKKSMonitoring = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ConnectionStatus | "ALL">("ALL");
  const [tierFilter, setTierFilter] = useState<string>("ALL");

  const filtered = useMemo(() => {
    return kkksData.filter(k => {
      const matchSearch = search === "" ||
        k.kkksName.toLowerCase().includes(search.toLowerCase()) ||
        k.wilayahKerja.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "ALL" || k.connectionStatus === statusFilter;
      const matchTier = tierFilter === "ALL" || k.sparkAdapterTier === tierFilter;
      return matchSearch && matchStatus && matchTier;
    });
  }, [search, statusFilter, tierFilter]);

  const exportCSV = () => {
    const headers = ["KKKS Name", "Wilayah Kerja", "SPARK Tier", "PPDM Modules", "SIGI Score", "Status", "Last Sync", "Data Steward"];
    const rows = filtered.map(k => [
      k.kkksName, k.wilayahKerja, k.sparkAdapterTier,
      `${k.ppdmModulesActivated}/${k.ppdmModulesTotal}`,
      k.sigiComplianceScore, k.connectionStatus,
      new Date(k.lastSync).toLocaleDateString(), k.dataSteward
    ]);
    const csv = [headers, ...rows].map(r => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "kkks_monitoring.csv";
    a.click();
  };

  return (
    <div className="p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">KKKS Monitoring</h1>
          <p className="text-sm text-muted-foreground mt-1 font-body">50 KKKS & Wilayah Kerja Status</p>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium font-body hover:opacity-90 transition-opacity">
          <Download className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-2 rounded-md border border-border bg-card flex-1 max-w-sm">
          <Search className="w-4 h-4 text-muted-foreground" />
          <input type="text" placeholder="Search KKKS or WK..." value={search} onChange={e => setSearch(e.target.value)}
            className="bg-transparent text-sm outline-none w-full font-body" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value as any)}
          className="px-3 py-2 rounded-md border border-border bg-card text-sm font-body">
          <option value="ALL">All Status</option>
          <option value="CERTIFIED">Certified</option>
          <option value="PILOT">Pilot</option>
          <option value="ONBOARDING">Onboarding</option>
          <option value="REGISTRATION">Registration</option>
        </select>
        <select value={tierFilter} onChange={e => setTierFilter(e.target.value)}
          className="px-3 py-2 rounded-md border border-border bg-card text-sm font-body">
          <option value="ALL">All Tiers</option>
          <option value="Tier 1">Tier 1</option>
          <option value="Tier 2">Tier 2</option>
          <option value="Tier 3">Tier 3</option>
        </select>
        <span className="text-sm text-muted-foreground font-body">{filtered.length} records</span>
      </div>

      {/* Table */}
      <div className="card-elevated overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left px-4 py-3 font-semibold text-foreground">KKKS Name</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Wilayah Kerja</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">SPARK Tier</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">PPDM Modules</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">SIGI Score</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Last Sync</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground">Data Steward</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-muted-foreground">
                    No matching records found for the selected criteria.
                  </td>
                </tr>
              ) : (
                filtered.map(k => (
                  <tr key={k.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                    <td className="px-4 py-3 font-medium text-foreground">{k.kkksName}</td>
                    <td className="px-4 py-3 text-muted-foreground">{k.wilayahKerja}</td>
                    <td className="px-4 py-3">{k.sparkAdapterTier}</td>
                    <td className="px-4 py-3">{k.ppdmModulesActivated}/{k.ppdmModulesTotal}</td>
                    <td className="px-4 py-3">
                      <span className={k.sigiComplianceScore >= 80 ? "text-success font-medium" : k.sigiComplianceScore >= 60 ? "text-warning font-medium" : "text-destructive font-medium"}>
                        {k.sigiComplianceScore}%
                      </span>
                    </td>
                    <td className="px-4 py-3"><StatusBadge status={k.connectionStatus} /></td>
                    <td className="px-4 py-3 text-muted-foreground">{new Date(k.lastSync).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-muted-foreground">{k.dataSteward}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default KKKSMonitoring;
