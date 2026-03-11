import { kkksData, getStatusCounts } from "@/data/mockData";
import StatusBadge from "@/components/StatusBadge";
import KPICard from "@/components/KPICard";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";

const COLORS = ["#28A745", "#FFC107", "#5886B1", "#DC3545"];

const ConnectionStatusPage = () => {
  const counts = getStatusCounts();
  const pieData = [
    { name: "Certified", value: counts.CERTIFIED },
    { name: "Pilot", value: counts.PILOT },
    { name: "Onboarding", value: counts.ONBOARDING },
    { name: "Registration", value: counts.REGISTRATION },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="page-title">Connection Status</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">Real-time connection status across all 50 KKKS</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard label="Certified" value={counts.CERTIFIED} variant="success" />
        <KPICard label="Pilot" value={counts.PILOT} variant="warning" />
        <KPICard label="Onboarding" value={counts.ONBOARDING} variant="primary" />
        <KPICard label="Registration" value={counts.REGISTRATION} variant="destructive" />
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="card-elevated p-6">
          <h2 className="section-title mb-4">Distribution</h2>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={95} dataKey="value" label={({ name, value }) => `${name}: ${value}`} labelLine={false}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="col-span-2 card-elevated p-6 overflow-hidden">
          <h2 className="section-title mb-4">Status by KKKS</h2>
          <div className="overflow-y-auto max-h-[320px]">
            <table className="w-full text-sm font-body">
              <thead className="sticky top-0 bg-card">
                <tr className="border-b border-border">
                  <th className="text-left px-4 py-2 font-semibold text-foreground">KKKS</th>
                  <th className="text-left px-4 py-2 font-semibold text-foreground">WK</th>
                  <th className="text-left px-4 py-2 font-semibold text-foreground">Status</th>
                  <th className="text-left px-4 py-2 font-semibold text-foreground">Last Sync</th>
                </tr>
              </thead>
              <tbody>
                {kkksData.map(k => (
                  <tr key={k.id} className="border-b border-border">
                    <td className="px-4 py-2 text-foreground">{k.kkksName}</td>
                    <td className="px-4 py-2 text-muted-foreground">{k.wilayahKerja}</td>
                    <td className="px-4 py-2"><StatusBadge status={k.connectionStatus} /></td>
                    <td className="px-4 py-2 text-muted-foreground text-xs">{new Date(k.lastSync).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectionStatusPage;
