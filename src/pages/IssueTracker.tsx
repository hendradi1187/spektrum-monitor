import { issuesData } from "@/data/mockData";
import SeverityBadge from "@/components/SeverityBadge";

const IssueTracker = () => {
  const critical = issuesData.filter(i => i.severity === "Critical").length;
  const open = issuesData.filter(i => i.status === "Open").length;

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="page-title">Issue & Risk Tracker</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">Active issues and risks across all KKKS implementations</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <div className="card-elevated p-5 border-l-4 border-l-destructive">
          <p className="kpi-label mb-2">Total Issues</p>
          <p className="kpi-value">{issuesData.length}</p>
        </div>
        <div className="card-elevated p-5 border-l-4 border-l-destructive">
          <p className="kpi-label mb-2">Critical</p>
          <p className="kpi-value">{critical}</p>
        </div>
        <div className="card-elevated p-5 border-l-4 border-l-warning">
          <p className="kpi-label mb-2">Open</p>
          <p className="kpi-value">{open}</p>
        </div>
        <div className="card-elevated p-5 border-l-4 border-l-success">
          <p className="kpi-label mb-2">Resolved</p>
          <p className="kpi-value">{issuesData.filter(i => i.status === "Resolved").length}</p>
        </div>
      </div>

      <div className="card-elevated overflow-hidden">
        <table className="w-full text-sm font-body">
          <thead>
            <tr className="border-b border-border bg-muted">
              <th className="text-left px-4 py-3 font-semibold text-foreground">ID</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Issue Title</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">WK</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Severity</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Status</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">PIC</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Last Update</th>
            </tr>
          </thead>
          <tbody>
            {issuesData.map(issue => (
              <tr key={issue.id} className="border-b border-border hover:bg-muted/50 transition-colors">
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{issue.id}</td>
                <td className="px-4 py-3 font-medium text-foreground">{issue.title}</td>
                <td className="px-4 py-3 text-muted-foreground">{issue.wk}</td>
                <td className="px-4 py-3"><SeverityBadge severity={issue.severity} /></td>
                <td className="px-4 py-3">
                  <span className={`text-xs font-medium ${issue.status === "Open" ? "text-destructive" : issue.status === "In Progress" ? "text-warning" : "text-success"}`}>
                    {issue.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{issue.pic}</td>
                <td className="px-4 py-3 text-muted-foreground">{issue.lastUpdate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IssueTracker;
