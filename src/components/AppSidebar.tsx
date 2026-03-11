import { NavLink, useLocation } from "react-router-dom";
import {
  LayoutDashboard, Building2, TrendingUp, ShieldCheck,
  Grid3X3, Wifi, Map, Award, AlertTriangle, FileText, Search
} from "lucide-react";

const navItems = [
  { path: "/", icon: LayoutDashboard, label: "Executive Dashboard" },
  { path: "/kkks-monitoring", icon: Building2, label: "KKKS Monitoring" },
  { path: "/implementation", icon: TrendingUp, label: "Implementation Progress" },
  { path: "/ppdm-compliance", icon: ShieldCheck, label: "PPDM Compliance" },
  { path: "/sigi-domain", icon: Grid3X3, label: "SIGI Domain Coverage" },
  { path: "/connection-status", icon: Wifi, label: "Connection Status" },
  { path: "/geoportal", icon: Map, label: "Geoportal Map" },
  { path: "/certificates", icon: Award, label: "Certificate Monitoring" },
  { path: "/issues", icon: AlertTriangle, label: "Issue & Risk Tracker" },
  { path: "/reports", icon: FileText, label: "Automated Reports" },
];

const AppSidebar = () => {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[280px] bg-sidebar flex flex-col z-50">
      {/* Header */}
      <div className="px-6 py-5 border-b border-sidebar-border">
        <h1 className="font-display text-sm font-semibold text-sidebar-accent-foreground tracking-wide uppercase">
          SPEKTRUM IOG 4.0
        </h1>
        <p className="text-xs text-sidebar-muted mt-1">Implementation Monitoring System</p>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 px-3 py-2 rounded-md bg-sidebar-accent">
          <Search className="w-4 h-4 text-sidebar-muted" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent text-sm text-sidebar-foreground placeholder:text-sidebar-muted outline-none w-full font-body"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-2 overflow-y-auto">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-body transition-colors ${
                    isActive
                      ? "bg-sidebar-accent text-sidebar-primary font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  }`}
                >
                  <item.icon className="w-4 h-4 flex-shrink-0" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-sidebar-accent flex items-center justify-center">
            <span className="text-xs font-semibold text-sidebar-primary font-display">AD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-sidebar-foreground font-body">Admin User</p>
            <p className="text-xs text-sidebar-muted">SKK Migas</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default AppSidebar;
