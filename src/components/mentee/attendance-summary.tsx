import { CheckCircle2, Clock3, HeartPulse, MessageSquareMore, XCircle } from "lucide-react";

import type { AttendanceRecord } from "@/features/prototype/types";

const statuses = [
  { key: "hadir", label: "Hadir", icon: CheckCircle2, tone: "green" },
  { key: "terlambat", label: "Terlambat", icon: Clock3, tone: "yellow" },
  { key: "izin", label: "Izin", icon: MessageSquareMore, tone: "blue" },
  { key: "sakit", label: "Sakit", icon: HeartPulse, tone: "purple" },
  { key: "alpa", label: "Alpa", icon: XCircle, tone: "pink" },
] as const;

export function AttendanceSummary({ records }: { records: AttendanceRecord[] }) {
  return <div className="attendance-stat-grid">{statuses.map(({ key, label, icon: Icon, tone }) => <div className={`attendance-stat attendance-stat--${tone}`} key={key}><Icon size={23} strokeWidth={2.7} /><strong>{records.filter((record) => record.status === key).length}</strong><span>{label}</span></div>)}</div>;
}
