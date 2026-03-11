const severityClasses: Record<string, string> = {
  Critical: "bg-destructive text-destructive-foreground",
  High: "bg-warning text-warning-foreground",
  Medium: "bg-chart-2 text-primary-foreground",
  Low: "bg-muted text-muted-foreground",
};

const SeverityBadge = ({ severity }: { severity: string }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium font-body ${severityClasses[severity] || ""}`}>
      {severity}
    </span>
  );
};

export default SeverityBadge;
