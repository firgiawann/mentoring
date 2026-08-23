import { BookCheck, CalendarCheck2, ClipboardList, UserCheck, Users } from "lucide-react";

import { Card } from "@/components/ui/card";
import type { PrototypeState } from "@/features/prototype/types";

export function MentorOverview({ state }: { state: PrototypeState }) {
  const pendingUsers = state.mentees.filter((mentee) => mentee.status === "pending").length;
  const pendingProgress = state.materialProgress.filter((item) => item.status === "pending_verification").length;
  const stats = [
    { label: "Mentee aktif", value: state.mentees.filter((mentee) => mentee.status === "approved").length, icon: Users, tone: "blue" as const },
    { label: "Menunggu akun", value: pendingUsers, icon: UserCheck, tone: "pink" as const },
    { label: "Verifikasi materi", value: pendingProgress, icon: BookCheck, tone: "yellow" as const },
    { label: "Pertemuan", value: state.meetings.length, icon: CalendarCheck2, tone: "green" as const },
  ];
  return <section className="admin-section" id="admin-ringkasan"><div className="admin-welcome"><div><span className="eyebrow">MENTOR CONTROL ROOM</span><h1>Selamat datang, Mentor.</h1><p>Semua yang perlu perhatian hari ini, langsung kelihatan.</p></div><span className="admin-date"><ClipboardList size={22} /> 22 AGU 2026</span></div><div className="admin-stat-grid">{stats.map(({ label, value, icon: Icon, tone }) => <Card className="admin-stat" key={label} tone={tone}><Icon size={27} strokeWidth={2.8} /><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></Card>)}</div></section>;
}
