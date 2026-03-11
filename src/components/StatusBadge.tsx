import type { ConnectionStatus } from "@/data/mockData";

const statusClasses: Record<ConnectionStatus, string> = {
  CERTIFIED: "status-certified",
  PILOT: "status-pilot",
  ONBOARDING: "status-onboarding",
  REGISTRATION: "status-registration",
};

const StatusBadge = ({ status }: { status: ConnectionStatus }) => {
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium font-body ${statusClasses[status]}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
