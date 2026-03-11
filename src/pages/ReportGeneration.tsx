import { useState } from "react";
import { FileText, CheckCircle, Download, AlertCircle } from "lucide-react";
import { kkksData } from "@/data/mockData";
import { generatePDFReport } from "@/lib/reportGenerator";
import {
  collectReportData,
  generateReportFilename,
  validateReportConfig,
  type ReportType,
  type WKScope,
} from "@/lib/reportDataCollector";

const reportSections = [
  "Cover Page",
  "BAB I — Ringkasan Eksekutif",
  "BAB II — Status Implementasi 50 KKKS",
  "BAB III — Analisis Compliance SIGI",
  "BAB IV — Tabel Detail KKKS",
  "BAB V — Rekomendasi",
  "Finalizing Document",
];

const ReportGeneration = () => {
  const [generating, setGenerating] = useState(false);
  const [progress, setProgress] = useState<number>(-1);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string>("");
  const [reportType, setReportType] = useState<ReportType>("weekly");
  const [period, setPeriod] = useState("March 2026 — Week 2");
  const [wkScope, setWkScope] = useState<WKScope>("all");
  const [generatedPDF, setGeneratedPDF] = useState<any>(null);

  const generate = async () => {
    setGenerating(true);
    setDone(false);
    setProgress(-1);
    setError("");
    setGeneratedPDF(null);

    try {
      // Validate configuration
      const config = { reportType, period, wkScope };
      const validationErrors = validateReportConfig(config);

      if (validationErrors.length > 0) {
        throw new Error(validationErrors.join(", "));
      }

      // Simulate progress through sections
      for (let i = 0; i < reportSections.length; i++) {
        setProgress(i);
        await new Promise(r => setTimeout(r, 400));

        // Generate PDF at the final step
        if (i === reportSections.length - 1) {
          // Collect report data
          const reportData = collectReportData(kkksData, {
            reportType,
            period,
            wkScope,
            generatedBy: "System Administrator",
          });

          // Generate PDF
          const pdf = await generatePDFReport(reportData);
          setGeneratedPDF({ pdf, filename: generateReportFilename(reportType, period) });
        }
      }

      setGenerating(false);
      setDone(true);
    } catch (err) {
      console.error("Report generation error:", err);
      setError(err instanceof Error ? err.message : "Failed to generate report");
      setGenerating(false);
      setDone(false);
    }
  };

  const downloadReport = () => {
    if (generatedPDF) {
      generatedPDF.pdf.save(generatedPDF.filename);
    }
  };

  return (
    <div className="p-8 space-y-8">
      <div>
        <h1 className="page-title">Automated Report Generation</h1>
        <p className="text-sm text-muted-foreground mt-1 font-body">
          Generate professional PDF reports with consulting layout
        </p>
      </div>

      {/* Error Alert */}
      {error && (
        <div className="card-elevated p-4 bg-destructive/10 border-destructive flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-destructive font-body">
              Report Generation Failed
            </h3>
            <p className="text-sm text-destructive/80 font-body mt-1">{error}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-8">
        {/* Config */}
        <div className="card-elevated p-6 space-y-6">
          <h2 className="section-title">Report Configuration</h2>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground font-body block mb-1.5">
                Report Type
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as ReportType)}
                disabled={generating}
                className="w-full px-3 py-2 rounded-md border border-border bg-card text-sm font-body disabled:opacity-50"
              >
                <option value="weekly">Laporan Mingguan</option>
                <option value="monthly">Laporan Bulanan</option>
                <option value="quarterly">Laporan Triwulanan</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-body block mb-1.5">
                Period
              </label>
              <input
                type="text"
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                disabled={generating}
                className="w-full px-3 py-2 rounded-md border border-border bg-card text-sm font-body disabled:opacity-50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground font-body block mb-1.5">
                WK Scope
              </label>
              <select
                value={wkScope}
                onChange={(e) => setWkScope(e.target.value as WKScope)}
                disabled={generating}
                className="w-full px-3 py-2 rounded-md border border-border bg-card text-sm font-body disabled:opacity-50"
              >
                <option value="all">All 50 KKKS</option>
                <option value="certified">Certified Only</option>
                <option value="pilot">Pilot Only</option>
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

          <div className="border-t border-border pt-4 space-y-2">
            <h3 className="text-xs font-semibold text-foreground font-body uppercase tracking-wide">
              Report Features
            </h3>
            <ul className="text-xs text-muted-foreground font-body space-y-1">
              <li>• Professional consulting layout</li>
              <li>• 2.5cm margins, A4 format</li>
              <li>• Auto-generated header/footer</li>
              <li>• Confidential watermark</li>
              <li>• Executive summary & recommendations</li>
              <li>• Detailed KKKS status tables</li>
            </ul>
          </div>

          <div className="text-xs text-muted-foreground font-body space-y-1 border-t border-border pt-4">
            <p className="font-semibold text-foreground">Automation Schedule:</p>
            <p>Weekly: Monday 06:00 WIB</p>
            <p>Monthly: 1st working day 08:00 WIB</p>
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
                    <div
                      className={`w-4 h-4 rounded-full border-2 flex-shrink-0 ${
                        isActive ? "border-primary animate-pulse" : "border-border"
                      }`}
                    />
                  )}
                  <span
                    className={`text-sm font-body ${
                      isComplete ? "text-foreground font-medium" : "text-muted-foreground"
                    }`}
                  >
                    {section}
                  </span>
                  {isActive && (
                    <span className="text-xs text-primary font-body ml-auto">
                      Generating...
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          {done && generatedPDF && (
            <button
              onClick={downloadReport}
              className="mt-6 w-full flex items-center justify-center gap-2 px-4 py-3 bg-success text-success-foreground rounded-md text-sm font-semibold font-body hover:opacity-90 transition-opacity"
            >
              <Download className="w-4 h-4" />
              Download Report (PDF)
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportGeneration;
