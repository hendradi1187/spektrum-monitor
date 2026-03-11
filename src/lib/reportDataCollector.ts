import { format } from "date-fns";
import type { KKKSRecord } from "@/data/mockData";
import { getStatusCounts, getNationalAvgCompliance } from "@/data/mockData";
import type { ReportData } from "./reportGenerator";

export type ReportType = "weekly" | "monthly" | "quarterly";
export type WKScope = "all" | "certified" | "pilot";

export interface ReportConfig {
  reportType: ReportType;
  period: string;
  wkScope: WKScope;
  generatedBy?: string;
}

/**
 * Collect and prepare all data needed for PDF report generation
 */
export const collectReportData = (
  kkksData: KKKSRecord[],
  config: ReportConfig
): ReportData => {
  // Filter data based on scope
  const filteredData = filterDataByScope(kkksData, config.wkScope);

  // Calculate summary statistics
  const statusCounts = getStatusCounts();
  const summary = {
    totalWK: filteredData.length,
    certified: filteredData.filter((k) => k.connectionStatus === "CERTIFIED").length,
    pilot: filteredData.filter((k) => k.connectionStatus === "PILOT").length,
    onboarding: filteredData.filter((k) => k.connectionStatus === "ONBOARDING").length,
    registration: filteredData.filter((k) => k.connectionStatus === "REGISTRATION")
      .length,
    avgCompliance: getNationalAvgCompliance(),
    implementationProgress:
      ((statusCounts.CERTIFIED + statusCounts.PILOT) / 50) * 100,
  };

  // Generate report title based on type
  const title = generateReportTitle(config.reportType, config.period);

  return {
    title,
    period: config.period,
    generatedBy: config.generatedBy || "SPEKTRUM IOG 4.0 System",
    summary,
    kkksData: filteredData,
  };
};

/**
 * Filter KKKS data based on scope
 */
const filterDataByScope = (
  data: KKKSRecord[],
  scope: WKScope
): KKKSRecord[] => {
  switch (scope) {
    case "certified":
      return data.filter((k) => k.connectionStatus === "CERTIFIED");
    case "pilot":
      return data.filter((k) => k.connectionStatus === "PILOT");
    case "all":
    default:
      return data;
  }
};

/**
 * Generate report title based on type and period
 */
const generateReportTitle = (type: ReportType, period: string): string => {
  const typeMap = {
    weekly: "Laporan Mingguan",
    monthly: "Laporan Bulanan",
    quarterly: "Laporan Triwulanan",
  };

  return `${typeMap[type]} Implementasi SPEKTRUM IOG 4.0 - ${period}`;
};

/**
 * Generate filename for PDF download
 */
export const generateReportFilename = (
  type: ReportType,
  period: string
): string => {
  // Convert period to filename-safe format
  const periodSafe = period
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .toLowerCase();

  const timestamp = format(new Date(), "yyyyMMdd_HHmmss");

  return `SPEKTRUM_Report_${type}_${periodSafe}_${timestamp}.pdf`;
};

/**
 * Get chart IDs that need to be captured for the report
 */
export const getChartIdsForCapture = (): string[] => {
  return [
    "status-distribution-chart",
    "compliance-ranking-chart",
    "sigi-domain-chart",
    "implementation-trend-chart",
  ];
};

/**
 * Validate report configuration
 */
export const validateReportConfig = (config: ReportConfig): string[] => {
  const errors: string[] = [];

  if (!config.period || config.period.trim() === "") {
    errors.push("Period is required");
  }

  if (!["weekly", "monthly", "quarterly"].includes(config.reportType)) {
    errors.push("Invalid report type");
  }

  if (!["all", "certified", "pilot"].includes(config.wkScope)) {
    errors.push("Invalid WK scope");
  }

  return errors;
};
