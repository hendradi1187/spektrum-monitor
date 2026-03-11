import KPICard from "@/components/KPICard";
import StatusBadge from "@/components/StatusBadge";
import {
  kkksData, monthlyProgress, sigiDomains,
  getStatusCounts, getNationalAvgCompliance, getImplementationPercent
} from "@/data/mockData";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, BarChart, Bar, Legend
} from "recharts";

const COLORS = ["#00529B", "#FFC107", "#5886B1", "#DC3545"];

const Dashboard = () => {
  const counts = getStatusCounts();
  const avgCompliance = getNationalAvgCompliance();
  const implPercent = getImplementationPercent();

  const pieData = [
    { name: "Certified", value: counts.CERTIFIED },
    { name: "Pilot", value: counts.PILOT },
    { name: "Onboarding", value: counts.ONBOARDING },
    { name: "Registration", value: counts.REGISTRATION },
  ];

  const top10Compliance = [...kkksData]
    .sort((a, b) => b.sigiComplianceScore - a.sigiComplianceScore)
    .slice(0, 10)
    .map(k => ({ name: k.wilayahKerja.slice(0, 16), score: k.sigiComplianceScore }));

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="page-title">Executive Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">
          SPEKTRUM IOG 4.0 — National Implementation Overview as of 11 March 2026
        </p>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-4 gap-4">
        <KPICard label="Total WK Target" value="50" variant="primary" />
        <KPICard label="Certified WK" value={counts.CERTIFIED} subtitle={`${Math.round(counts.CERTIFIED / 50 * 100)}% of target`} variant="success" />
        <KPICard label="Pilot WK" value={counts.PILOT} variant="warning" />
        <KPICard label="Onboarding WK" value={counts.ONBOARDING} variant="primary" />
      </div>
      <div className="grid grid-cols-4 gap-4">
        <KPICard label="Registration WK" value={counts.REGISTRATION} variant="destructive" />
        <KPICard label="Implementation Progress" value={`${implPercent}%`} variant="primary" />
        <KPICard label="Avg. PPDM Compliance" value={`${avgCompliance}%`} variant="primary" />
        <KPICard label="Active Issues" value="8" subtitle="2 Critical" variant="destructive" />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Implementation Progress Line Chart */}
        <div className="card-elevated p-6">
          <h2 className="section-title mb-4">Implementation Progress</h2>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "Roboto Flex" }} />
              <YAxis tick={{ fontSize: 11, fontFamily: "Roboto Flex" }} />
              <Tooltip />
              <Line type="monotone" dataKey="target" stroke="#9EABCC" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Target" />
              <Line type="monotone" dataKey="connected" stroke="#00529B" strokeWidth={2.5} dot={{ r: 3, fill: "#00529B" }} name="Connected" />
              <Legend />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Connection Status Pie */}
        <div className="card-elevated p-6">
          <h2 className="section-title mb-4">Connection Status</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Compliance Ranking */}
        <div className="card-elevated p-6">
          <h2 className="section-title mb-4">Top 10 PPDM Compliance Score</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={top10Compliance} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} />
              <YAxis dataKey="name" type="category" tick={{ fontSize: 11, fontFamily: "Roboto Flex" }} width={110} />
              <Tooltip />
              <Bar dataKey="score" fill="#00529B" radius={[0, 2, 2, 0]} barSize={18} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* SIGI Domain Coverage */}
        <div className="card-elevated p-6">
          <h2 className="section-title mb-4">SIGI Domain Coverage Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={sigiDomains} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 11 }} unit="%" />
              <YAxis dataKey="domain" type="category" tick={{ fontSize: 11, fontFamily: "Roboto Flex" }} width={130} />
              <Tooltip />
              <Bar dataKey="coverage" fill="#5886B1" radius={[0, 2, 2, 0]} barSize={22} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
