interface KPICardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  variant?: "default" | "success" | "warning" | "destructive" | "primary";
}

const variantStyles: Record<string, string> = {
  default: "border-l-border",
  success: "border-l-success",
  warning: "border-l-warning",
  destructive: "border-l-destructive",
  primary: "border-l-primary",
};

const KPICard = ({ label, value, subtitle, variant = "default" }: KPICardProps) => {
  return (
    <div className={`card-elevated p-5 border-l-4 ${variantStyles[variant]}`}>
      <p className="kpi-label mb-2">{label}</p>
      <p className="kpi-value">{value}</p>
      {subtitle && <p className="text-xs text-muted-foreground mt-1 font-body">{subtitle}</p>}
    </div>
  );
};

export default KPICard;
