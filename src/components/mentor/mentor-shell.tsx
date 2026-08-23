"use client";

import { Bell, BookCopy, CalendarRange, ChartNoAxesCombined, ClipboardCheck, FileDown, Globe2, Home, LogOut, Menu, QrCode, UsersRound } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { AttendanceControl } from "@/components/mentor/attendance-control";
import { ContentManagement } from "@/components/mentor/content-management";
import { ExportPanel } from "@/components/mentor/export-panel";
import { MaterialManagement } from "@/components/mentor/material-management";
import { MeetingManagement } from "@/components/mentor/meeting-management";
import { MentorOverview } from "@/components/mentor/mentor-overview";
import { ProgressVerification } from "@/components/mentor/progress-verification";
import { UserManagement } from "@/components/mentor/user-management";
import { Badge } from "@/components/ui/badge";
import { usePrototype } from "@/features/prototype/prototype-store";

const nav = [
  { href: "#admin-ringkasan", label: "Ringkasan", icon: Home },
  { href: "#admin-users", label: "Mentee", icon: UsersRound },
  { href: "#admin-materials", label: "Materi", icon: BookCopy },
  { href: "#admin-meetings", label: "Pertemuan", icon: CalendarRange },
  { href: "#admin-progress", label: "Verifikasi", icon: ClipboardCheck },
  { href: "#admin-attendance", label: "Presensi", icon: QrCode },
  { href: "#admin-content", label: "Konten publik", icon: Globe2 },
  { href: "#admin-export", label: "Ekspor", icon: FileDown },
];

function AdminSection({ id, eyebrow, title, badge, children }: { id: string; eyebrow: string; title: string; badge?: string; children: React.ReactNode }) {
  return <section className="admin-section" id={id}><div className="admin-section__head"><div><span className="eyebrow">{eyebrow}</span><h2>{title}</h2></div>{badge && <Badge tone="pink">{badge}</Badge>}</div>{children}</section>;
}

export function MentorShell() {
  const { state, approveUser, verifyMaterial, openAttendance, closeAttendance, resetDemo } = usePrototype();
  const upcoming = state.meetings.filter((meeting) => meeting.status === "akan_datang");
  const [selectedMeetingId, setSelectedMeetingId] = useState(upcoming[0]?.id ?? state.meetings[0]!.id);
  const selectedMeeting = state.meetings.find((meeting) => meeting.id === selectedMeetingId)!;
  const verificationQueue = useMemo(() => state.materialProgress.filter((item) => item.status === "pending_verification"), [state.materialProgress]);
  const attentionCount = state.mentees.filter((mentee) => mentee.status === "pending").length + verificationQueue.length;

  return <div className="admin-layout"><aside className="admin-sidebar"><Link className="admin-brand" href="/"><span>M</span><strong>MENTOR<br />PANEL</strong><i>PROTOTYPE</i></Link><nav aria-label="Navigasi panel mentor">{nav.map(({ href, label, icon: Icon }) => <a href={href} key={href}><Icon size={18} /> {label}</a>)}</nav><Link className="admin-exit" href="/"><LogOut size={17} /> Kembali ke publik</Link></aside><header className="admin-mobile-header"><Link className="admin-brand" href="/"><span>M</span><strong>MENTOR</strong></Link><div><button aria-label="Lihat perhatian"><Bell /><i>{attentionCount}</i></button><button aria-label="Buka menu"><Menu /></button></div></header><main className="admin-main" id="main-content"><MentorOverview state={state} /><AdminSection badge={`${state.mentees.filter((mentee) => mentee.status === "pending").length} pending`} eyebrow="AKUN & AKSES" id="admin-users" title="Kelola mentee"><UserManagement mentees={state.mentees} onApprove={approveUser} /></AdminSection><AdminSection eyebrow="ROADMAP BELAJAR" id="admin-materials" title="Kelola materi"><MaterialManagement materials={state.materials} /></AdminSection><AdminSection eyebrow="AGENDA MINGGUAN" id="admin-meetings" title="Pertemuan"><MeetingManagement meetings={state.meetings} /></AdminSection><AdminSection badge={`${verificationQueue.length} antrean`} eyebrow="PERLU TINDAKAN" id="admin-progress" title="Verifikasi progres"><ProgressVerification materials={state.materials} mentees={state.mentees} onVerify={verifyMaterial} queue={verificationQueue} /></AdminSection><AdminSection eyebrow="QR DINAMIS" id="admin-attendance" title="Kontrol presensi"><label className="meeting-picker">Pertemuan aktif<select onChange={(event) => setSelectedMeetingId(event.target.value)} value={selectedMeetingId}>{upcoming.map((meeting) => <option key={meeting.id} value={meeting.id}>{meeting.title}</option>)}</select></label><AttendanceControl meeting={selectedMeeting} onClose={closeAttendance} onOpen={openAttendance} session={state.attendanceSession} /></AdminSection><AdminSection eyebrow="LANDING PAGE" id="admin-content" title="Konten publik"><ContentManagement contents={state.publicContent} /></AdminSection><AdminSection eyebrow="DATA & PROTOTYPE" id="admin-export" title="Ekspor dan reset"><ExportPanel onReset={resetDemo} state={state} /></AdminSection></main><div className="admin-prototype-chip"><ChartNoAxesCombined size={16} /> DATA SIMULASI</div></div>;
}
