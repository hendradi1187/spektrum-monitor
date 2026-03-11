import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import AppLayout from "@/components/AppLayout";
import Dashboard from "@/pages/Dashboard";
import KKKSMonitoring from "@/pages/KKKSMonitoring";
import ImplementationProgress from "@/pages/ImplementationProgress";
import PPDMCompliance from "@/pages/PPDMCompliance";
import SIGIDomain from "@/pages/SIGIDomain";
import ConnectionStatusPage from "@/pages/ConnectionStatusPage";
import GeoportalMap from "@/pages/GeoportalMap";
import CertificateMonitoring from "@/pages/CertificateMonitoring";
import IssueTracker from "@/pages/IssueTracker";
import ReportGeneration from "@/pages/ReportGeneration";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/kkks-monitoring" element={<KKKSMonitoring />} />
            <Route path="/implementation" element={<ImplementationProgress />} />
            <Route path="/ppdm-compliance" element={<PPDMCompliance />} />
            <Route path="/sigi-domain" element={<SIGIDomain />} />
            <Route path="/connection-status" element={<ConnectionStatusPage />} />
            <Route path="/geoportal" element={<GeoportalMap />} />
            <Route path="/certificates" element={<CertificateMonitoring />} />
            <Route path="/issues" element={<IssueTracker />} />
            <Route path="/reports" element={<ReportGeneration />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
