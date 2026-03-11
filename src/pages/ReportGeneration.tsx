import { useState } from "react";
import { FileText, CheckCircle } from "lucide-react";

const reportSections = [
  "Cover Page",
  "BAB I — Ringkasan Eksekutif",
  "BAB II — Status Implementasi 50 KKKS",
  "BAB III — Laporan Mingguan",
  "BAB IV — Dashboard KPI Bulanan",
  "BAB V — Scorecard Tahunan",
  "BAB VI — Isu dan Risiko",
  "BAB VII — Penutup",
];

const ReportGeneration = () => {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState<number>(-1);
  const [done, setDone] = useState(false);
  const [reportType, setReportType] = useState("weekly");

  const generate = async () => {
    setGenerating(true);
    setDone(false);
    setProgress(-1);
    for (let i = 0; i < reportSections.length; i++) {
      await new Promise(r => setTimeout(r, 600));
      setProgress(i);
    }
    await new Promise(r => setTimeout(r, 400));
    setGenerating(false);
    setDone(true);
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="page-title">Automated Report Generation</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">
          Generate SKK Migas style implementation reports
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {/* Config */}
        <div className="card-elevated p-6 space-y-6">
          <h2 className="section-title">Report Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground font-body block mb-1.5">Report Type</label>
              <select value={reportType} onChange={e => setReportType(e.target.value)}
                className="w-full px-3 py-2 rounded-md border border-border bg-card text-sm font-body">
                <option value="weekly">Laporan Mingguan</option>
                <option value="monthly">Laporan Bulanan</option>
                <option value="quarterly">Laporan Triwulanan</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-body block mb-1.5">Period</label>
              <input type="text" defaultValue="March 2026 — Week 2" className="w-full px-3 py-2 rounded-md border border-border bg-card text-sm font-body" />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-body block mb-1.5">WK Scope</label>
              <select className="w-full px-3 py-2 rounded-md border border-border bg-card text-sm font-body">
                <option>All 50 KKKS</option>
                <option>Certified Only</option>
                <option>Pilot Only</option>
              </select>
            </div>
            <button
              onClick={generate}
              disabled={generating}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-primary-foreground rounded-md text-sm font-semibold font-body hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              <FileText className="w-4 h-4" />
              {generating ? "Generating..." : "Generate Report"}
            </button>
          </div>

          <div className="text-xs text-muted-foreground font-body space-y-1">
            <p>API: POST /api/report/generate</p>
            <p>Automated: Weekly (Mon 06:00 WIB), Monthly (1st working day)</p>
          </div>
        </div>

        {/* Report Genesis Animation */}
        <div className="card-elevated p-6">
          <h2 className="section-title mb-4">Report Structure</h2>
          <p className="text-xs text-muted-foreground font-body mb-4">
            Laporan Kemajuan Implementasi SPEKTRUM IOG 4.0
          </p>
          <div className="space-y-2">
            {reportSections.map((section, i) => {
              const isActive = generating && progress === i;
              const isComplete = progress > i || done;
              return (
                <div
                  key={i}
                  className={`flex items-center gap-3 px-4 py-3 rounded-md border transition-all duration-300 ${
                    isComplete
                      ? "border-primary bg-primary/5"
                      : isActive
                      ? "border-primary bg-primary/10 shadow-sm"
                      : "border-border bg-card"
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                  ) : (
                    <div className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${isActive ? "border-primary animate-pulse" : "border-border"}`} />
                  )}
                  <span className={`text-sm font-body ${isComplete ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                    {section}
                  </span>
                  {isActive && <span className="text-xs text-primary font-body ml-auto">Generating...</span>}
                </div>
              );
            })}
          </div>

          {done && (
            <button className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-success text-success-foreground rounded-md text-sm font-semibold font-body hover:opacity-90 transition-opacity">
              <FileText className="w-4 h-4" />
              Download Report (PDF)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGeneration;
