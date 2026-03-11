export type ConnectionStatus = "CERTIFIED" | "PILOT" | "ONBOARDING" | "REGISTRATION";

export interface KKKSRecord {
  id: string;
  kkksName: string;
  wilayahKerja: string;
  sparkAdapterTier: "Tier 1" | "Tier 2" | "Tier 3";
  ppdmModulesActivated: number;
  ppdmModulesTotal: number;
  sigiComplianceScore: number;
  connectionStatus: ConnectionStatus;
  lastSync: string;
  dataSteward: string;
  latitude: number;
  longitude: number;
  certificateName?: string;
  certificateExpiry?: string;
}

export interface IssueRecord {
  id: string;
  title: string;
  wk: string;
  severity: "Critical" | "High" | "Medium" | "Low";
  status: "Open" | "In Progress" | "Resolved" | "Closed";
  pic: string;
  lastUpdate: string;
}

const kkksNames = [
  "Pertamina Hulu Mahakam", "Chevron Pacific Indonesia", "BP Tangguh",
  "ExxonMobil Cepu", "ConocoPhillips Grissik", "Medco E&P Natuna",
  "PHE ONWJ", "Pertamina Hulu Kalimantan Timur", "CNOOC SES",
  "Premier Oil Natuna Sea", "Santos Madura Offshore", "Kangean Energy",
  "Petronas Carigali Ketapang", "Eni Muara Bakau", "Husky-CNOOC Madura",
  "JOB Pertamina-Medco Tomori", "Star Energy Kakap", "Harbour Energy",
  "Repsol Oil & Gas Indonesia", "Pan Orient Energy Citarum",
  "Mubadala Energy", "Jadestone Energy", "TotalEnergies Indonesie",
  "INPEX Masela", "Shell Indonesia", "Petrochina International Jabung",
  "Ophir Energy Indonesia", "Mandala Energy", "Saka Energi Indonesia",
  "Pertamina EP", "Pertamina Hulu Energi", "Elnusa Petrofin",
  "Energi Mega Persada", "Bukit Energy", "Samudra Energy",
  "Pacific Oil & Gas", "Lundin Energy", "Murphy Oil Indonesia",
  "Japex Block A", "Mitsui E&P Indonesia", "KrisEnergy",
  "Pan Pacific Petroleum", "Talisman Energy", "Nido Petroleum",
  "Genting Oil & Gas", "Central Kalimantan Energy", "Salamander Energy",
  "Paladin Resources", "Gulf Resources Pacific", "Orchard Energy"
];

const wkNames = [
  "Mahakam", "Rokan", "Tangguh", "Cepu", "Corridor", "Natuna Sea Block A",
  "Offshore North West Java", "East Kalimantan", "South East Sumatra",
  "Natuna Sea Block B", "Madura Offshore", "Kangean", "Ketapang",
  "Muara Bakau", "Madura Strait", "Senoro-Toili", "Kakap",
  "Tuna Block", "Sakakemang", "Citarum", "Andaman I",
  "Lemang", "South Mahakam", "Masela", "Rapak",
  "Jabung", "West Papua", "Bulu", "Pangkah",
  "Sukowati", "Salawati", "Raja", "Bentu",
  "Gebang", "Semberah", "Ganal", "Baronang",
  "Berau", "Block A Aceh", "East Natuna", "Bontang",
  "Nunukan", "Ogan Komering", "Timor Sea", "Aru",
  "Kutai", "South Barito", "Bengara", "West Aru", "East Java"
];

const stewards = [
  "Ir. Budi Santoso", "Dr. Rina Wahyuni", "Ir. Ahmad Fauzi",
  "Drs. Siti Nurhaliza", "Ir. Hendra Gunawan", "Dr. Dewi Lestari",
  "Ir. Agus Prasetyo", "Dra. Maya Sari", "Ir. Rudi Hartono",
  "Dr. Ani Widyaningsih"
];

const statuses: ConnectionStatus[] = ["CERTIFIED", "PILOT", "ONBOARDING", "REGISTRATION"];

function randomDate(start: Date, end: Date): string {
  const d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  return d.toISOString();
}

export const kkksData: KKKSRecord[] = kkksNames.map((name, i) => {
  const status = i < 18 ? "CERTIFIED" : i < 30 ? "PILOT" : i < 42 ? "ONBOARDING" : "REGISTRATION";
  const score = status === "CERTIFIED" ? 85 + Math.floor(Math.random() * 15) :
    status === "PILOT" ? 65 + Math.floor(Math.random() * 20) :
    status === "ONBOARDING" ? 40 + Math.floor(Math.random() * 25) :
    10 + Math.floor(Math.random() * 30);
  return {
    id: `kkks-${i + 1}`,
    kkksName: name,
    wilayahKerja: wkNames[i],
    sparkAdapterTier: i < 20 ? "Tier 1" : i < 38 ? "Tier 2" : "Tier 3" as const,
    ppdmModulesActivated: status === "CERTIFIED" ? 12 + Math.floor(Math.random() * 4) :
      status === "PILOT" ? 6 + Math.floor(Math.random() * 6) :
      status === "ONBOARDING" ? 2 + Math.floor(Math.random() * 4) : Math.floor(Math.random() * 2),
    ppdmModulesTotal: 16,
    sigiComplianceScore: score,
    connectionStatus: status,
    lastSync: randomDate(new Date("2025-12-01"), new Date("2026-03-11")),
    dataSteward: stewards[i % stewards.length],
    latitude: -8 + Math.random() * 12,
    longitude: 95 + Math.random() * 40,
    certificateName: status === "CERTIFIED" ? `CERT-IOG4-${String(i + 1).padStart(3, "0")}` : undefined,
    certificateExpiry: status === "CERTIFIED" ? randomDate(new Date("2026-03-01"), new Date("2027-06-01")) : undefined,
  };
});

export const issuesData: IssueRecord[] = [
  { id: "ISS-001", title: "SPARK Adapter timeout on daily sync", wk: "Mahakam", severity: "Critical", status: "Open", pic: "Ir. Budi Santoso", lastUpdate: "2026-03-10" },
  { id: "ISS-002", title: "PPDM module 'Well Header' data mismatch", wk: "Rokan", severity: "High", status: "In Progress", pic: "Dr. Rina Wahyuni", lastUpdate: "2026-03-09" },
  { id: "ISS-003", title: "Certificate renewal pending for Block A", wk: "Block A Aceh", severity: "High", status: "Open", pic: "Ir. Ahmad Fauzi", lastUpdate: "2026-03-08" },
  { id: "ISS-004", title: "GeoJSON layer not rendering for Masela", wk: "Masela", severity: "Medium", status: "In Progress", pic: "Dr. Dewi Lestari", lastUpdate: "2026-03-07" },
  { id: "ISS-005", title: "Low compliance score in SIGI Domain 240", wk: "Cepu", severity: "Medium", status: "Open", pic: "Ir. Hendra Gunawan", lastUpdate: "2026-03-06" },
  { id: "ISS-006", title: "Data steward reassignment required", wk: "Tangguh", severity: "Low", status: "Resolved", pic: "Dra. Maya Sari", lastUpdate: "2026-03-05" },
  { id: "ISS-007", title: "Network latency affecting onboarding WK", wk: "Kangean", severity: "High", status: "Open", pic: "Ir. Agus Prasetyo", lastUpdate: "2026-03-04" },
  { id: "ISS-008", title: "Duplicate well records in PPDM sync", wk: "Corridor", severity: "Critical", status: "In Progress", pic: "Ir. Rudi Hartono", lastUpdate: "2026-03-03" },
];

export const monthlyProgress = [
  { month: "Jul 2025", connected: 8, target: 50 },
  { month: "Aug 2025", connected: 12, target: 50 },
  { month: "Sep 2025", connected: 16, target: 50 },
  { month: "Oct 2025", connected: 20, target: 50 },
  { month: "Nov 2025", connected: 24, target: 50 },
  { month: "Dec 2025", connected: 28, target: 50 },
  { month: "Jan 2026", connected: 32, target: 50 },
  { month: "Feb 2026", connected: 36, target: 50 },
  { month: "Mar 2026", connected: 40, target: 50 },
];

export const sigiDomains = [
  { domain: "210 - Well", coverage: 82 },
  { domain: "220 - Seismic", coverage: 74 },
  { domain: "230 - Production", coverage: 88 },
  { domain: "240 - Facility", coverage: 61 },
  { domain: "250 - Land", coverage: 55 },
];

export const getStatusCounts = () => {
  const counts = { CERTIFIED: 0, PILOT: 0, ONBOARDING: 0, REGISTRATION: 0 };
  kkksData.forEach(k => counts[k.connectionStatus]++);
  return counts;
};

export const getNationalAvgCompliance = () => {
  return Math.round(kkksData.reduce((s, k) => s + k.sigiComplianceScore, 0) / kkksData.length);
};

export const getImplementationPercent = () => {
  const counts = getStatusCounts();
  return Math.round(((counts.CERTIFIED + counts.PILOT) / 50) * 100);
};
