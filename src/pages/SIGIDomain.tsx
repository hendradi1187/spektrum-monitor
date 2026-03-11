import { kkksData, sigiDomains } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const domainLabels: Record<string, string> = {
  "210": "Well", "220": "Seismic", "230": "Production", "240": "Facility", "250": "Land"
};

const SIGIDomain = () => {
  // Generate heatmap-like data
  const heatmapData = kkksData.slice(0, 20).map(k => ({
    name: k.wilayahKerja.slice(0, 14),
    "210": Math.min(100, k.sigiComplianceScore + Math.floor(Math.random() * 15 - 7)),
    "220": Math.min(100, k.sigiComplianceScore + Math.floor(Math.random() * 20 - 10)),
    "230": Math.min(100, k.sigiComplianceScore + Math.floor(Math.random() * 10 - 5)),
    "240": Math.min(100, k.sigiComplianceScore + Math.floor(Math.random() * 25 - 15)),
    "250": Math.min(100, k.sigiComplianceScore + Math.floor(Math.random() * 20 - 12)),
  }));

  const getCellColor = (value: number) => {
    if (value >= 80) return "bg-success";
    if (value >= 60) return "bg-warning";
    if (value >= 40) return "bg-chart-2";
    return "bg-destructive";
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="page-title">SIGI Domain Coverage</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">Coverage across 5 SIGI domains (210–250)</p>
      </div>

      {/* National Averages */}
      <div className="card-elevated p-6">
        <h2 className="section-title mb-4">National Domain Coverage</h2>
        <ResponsiveContainer width="100%" height={240}>
          <BarChart data={sigiDomains} layout="vertical" margin={{ left: 30 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
            <XAxis type="number" domain={[0, 100]} unit="%" tick={{ fontSize: 11 }} />
            <YAxis dataKey="domain" type="category" tick={{ fontSize: 11, fontFamily: "Roboto Flex" }} width={140} />
            <Tooltip />
            <Bar dataKey="coverage" fill="#00529B" radius={[0, 3, 3, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Heatmap Table */}
      <div className="card-elevated p-6">
        <h2 className="section-title mb-4">Domain Coverage Heatmap (Top 20 WK)</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm font-body">
            <thead>
              <tr className="border-b border-border bg-muted">
                <th className="text-left px-4 py-3 font-semibold text-foreground">Wilayah Kerja</th>
                {["210", "220", "230", "240", "250"].map(d => (
                  <th key={d} className="text-center px-4 py-3 font-semibold text-foreground">{d} - {domainLabels[d]}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {heatmapData.map((row, i) => (
                <tr key={i} className="border-b border-border">
                  <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
                  {(["210", "220", "230", "240", "250"] as const).map(d => (
                    <td key={d} className="px-4 py-2 text-center">
                      <span className={`inline-block px-3 py-1 rounded text-xs font-medium ${getCellColor(row[d])} text-primary-foreground`}>
                        {row[d]}%
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Legend */}
        <div className="flex items-center gap-4 mt-4 text-xs font-body text-muted-foreground">
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-success" /> ≥80%</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-warning" /> 60–79%</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-chart-2" /> 40–59%</span>
          <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-destructive" /> &lt;40%</span>
        </div>
      </div>
    </div>
  );
};

export default SIGIDomain;
