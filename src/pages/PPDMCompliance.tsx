import { kkksData, getNationalAvgCompliance } from "@/data/mockData";
import KPICard from "@/components/KPICard";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

const PPDMCompliance = () => {
  const avgCompliance = getNationalAvgCompliance();
  const sorted = [...kkksData].sort((a, b) => b.sigiComplianceScore - a.sigiComplianceScore);
  const top15 = sorted.slice(0, 15).map(k => ({ name: k.wilayahKerja.slice(0, 16), score: k.sigiComplianceScore }));

  // Histogram
  const bins = [
    { range: "0-20", count: 0 }, { range: "21-40", count: 0 },
    { range: "41-60", count: 0 }, { range: "61-80", count: 0 },
    { range: "81-100", count: 0 },
  ];
  kkksData.forEach(k => {
    const s = k.sigiComplianceScore;
    if (s <= 20) bins[0].count++;
    else if (s <= 40) bins[1].count++;
    else if (s <= 60) bins[2].count++;
    else if (s <= 80) bins[3].count++;
    else bins[4].count++;
  });

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="page-title">PPDM Compliance Monitoring</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">PPDM 3.9 Hub compliance metrics across 50 KKKS</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <KPICard label="National Average" value={`${avgCompliance}%`} variant="primary" />
        <KPICard label="Highest Score" value={`${sorted[0].sigiComplianceScore}%`} subtitle={sorted[0].wilayahKerja} variant="success" />
        <KPICard label="Lowest Score" value={`${sorted[sorted.length - 1].sigiComplianceScore}%`} subtitle={sorted[sorted.length - 1].wilayahKerja} variant="destructive" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card-elevated p-6">
          <h2 className="section-title mb-4">Compliance Score Ranking (Top 15)</h2>
          <ResponsiveContainer width="100%" height={440}>
            <BarChart data={top15} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fontFamily: "Roboto Flex" }} width={110} />
              <Tooltip />
              <Bar dataKey="score" fill="#00529B" radius={[0, 2, 2, 0]} barSize={16} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="card-elevated p-6">
          <h2 className="section-title mb-4">Score Distribution</h2>
          <ResponsiveContainer width="100%" height={440}>
            <BarChart data={bins}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="range" tick={{ fontSize: 11, fontFamily: "Roboto Flex" }} label={{ value: "Score Range", position: "bottom", fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} label={{ value: "Number of WK", angle: -90, position: "insideLeft", fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="count" fill="#5886B1" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default PPDMCompliance;
