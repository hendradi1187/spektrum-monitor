import { kkksData } from "@/data/mockData";
import { useMemo } from "react";

const CertificateMonitoring = () => {
  const certs = useMemo(() => {
    return kkksData
      .filter(k => k.certificateName && k.certificateExpiry)
      .map(k => {
        const expiry = new Date(k.certificateExpiry!);
        const now = new Date("2026-03-11");
        const daysLeft = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
        const status = daysLeft < 0 ? "EXPIRED" : daysLeft <= 30 ? "EXPIRING" : "VALID";
        return { ...k, expiry, daysLeft, certStatus: status };
      })
      .sort((a, b) => a.daysLeft - b.daysLeft);
  }, []);

  const getStatusClass = (status: string) => {
    if (status === "EXPIRED") return "status-registration";
    if (status === "EXPIRING") return "status-pilot";
    return "status-certified";
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="page-title">Certificate Monitoring</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">IOG 4.0 certificate status and expiry alerts</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="card-elevated p-5 border-l-4 border-l-destructive">
          <p className="kpi-label mb-2">Expired</p>
          <p className="kpi-value">{certs.filter(c => c.certStatus === "EXPIRED").length}</p>
        </div>
        <div className="card-elevated p-5 border-l-4 border-l-warning">
          <p className="kpi-label mb-2">Expiring (≤30 days)</p>
          <p className="kpi-value">{certs.filter(c => c.certStatus === "EXPIRING").length}</p>
        </div>
        <div className="card-elevated p-5 border-l-4 border-l-success">
          <p className="kpi-label mb-2">Valid</p>
          <p className="kpi-value">{certs.filter(c => c.certStatus === "VALID").length}</p>
        </div>
      </div>

      <div className="card-elevated overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="text-left px-4 py-3 font-semibold text-foreground">KKKS</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Wilayah Kerja</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Certificate</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Expiry Date</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Days Left</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
            </tr>
          </thead>
          <tbody>
            {certs.map(c => (
              <tr key={c.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 font-medium text-foreground">{c.kkksName}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.wilayahKerja}</td>
                <td className="px-4 py-3 font-mono text-xs">{c.certificateName}</td>
                <td className="px-4 py-3 text-muted-foreground">{c.expiry.toLocaleDateString()}</td>
                <td className="px-4 py-3">{c.daysLeft < 0 ? `${Math.abs(c.daysLeft)}d overdue` : `${c.daysLeft}d`}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${getStatusClass(c.certStatus)}`}>
                    {c.certStatus}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CertificateMonitoring;
