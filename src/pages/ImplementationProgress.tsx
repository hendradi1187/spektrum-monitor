import { monthlyProgress, getStatusCounts, getImplementationPercent } from "@/data/mockData";
import KPICard from "@/components/KPICard";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";

const ImplementationProgress = () => {
  const counts = getStatusCounts();
  const implPercent = getImplementationPercent();
  const remaining = 50 - counts.CERTIFIED - counts.PILOT;
  const monthsLeft = 9; // until Dec 2026
  const rateNeeded = Math.ceil(remaining / monthsLeft);

  const targetVsConnected = [
    { label: "Target", value: 50 },
    { label: "Connected (Certified + Pilot)", value: counts.CERTIFIED + counts.PILOT },
    { label: "Remaining", value: remaining },
  ];

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="page-title">Implementation Progress</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">Progress toward 50 WK target by 31 December 2026</p>
      </div>

      <div className="grid grid-cols-4 gap-4">
        <KPICard label="National Progress" value={`${implPercent}%`} variant="primary" />
        <KPICard label="Connected WK" value={counts.CERTIFIED + counts.PILOT} subtitle="Certified + Pilot" variant="success" />
        <KPICard label="Remaining WK" value={remaining} variant="warning" />
        <KPICard label="Required Rate" value={`${rateNeeded}/mo`} subtitle="To meet Dec 2026 deadline" variant="destructive" />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="card-elevated p-6">
          <h2 className="section-title mb-4">Monthly Implementation Growth</h2>
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={monthlyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fontFamily: "Roboto Flex" }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="target" stroke="#9EABCC" strokeWidth={2} strokeDasharray="5 5" dot={false} name="Target" />
              <Line type="monotone" dataKey="connected" stroke="#00529B" strokeWidth={2.5} dot={{ r: 3, fill: "#00529B" }} name="Connected" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card-elevated p-6">
          <h2 className="section-title mb-4">Target vs Connected</h2>
          <ResponsiveContainer width="100%" height={320}>
            <BarChart data={targetVsConnected}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(214, 20%, 90%)" />
              <XAxis dataKey="label" tick={{ fontSize: 11, fontFamily: "Roboto Flex" }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Bar dataKey="value" fill="#00529B" radius={[4, 4, 0, 0]} barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Timeline */}
      <div className="card-elevated p-6">
        <h2 className="section-title mb-4">Timeline to 31 December 2026</h2>
        <div className="relative">
          <div className="h-3 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full transition-all" style={{ width: `${implPercent}%` }} />
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground font-body">
            <span>Jul 2025 — Start</span>
            <span>Mar 2026 — Current ({implPercent}%)</span>
            <span>Dec 2026 — Deadline</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImplementationProgress;
