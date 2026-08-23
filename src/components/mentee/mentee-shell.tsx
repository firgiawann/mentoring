"use client";

import { Bell, BookOpen, CalendarDays, ClipboardCheck, Home, LogOut, Menu, ScanLine, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { AttendanceSummary } from "@/components/mentee/attendance-summary";
import { DashboardOverview } from "@/components/mentee/dashboard-overview";
import { MaterialList } from "@/components/mentee/material-list";
import { NotificationDrawer } from "@/components/mentee/notification-drawer";
import { ScanAttendanceCard } from "@/components/mentee/scan-attendance-card";
import { ScheduleList } from "@/components/mentee/schedule-list";
import { Badge } from "@/components/ui/badge";
import { calculateProgressSummary, isAttendanceSessionActive } from "@/features/prototype/domain";
import { usePrototype } from "@/features/prototype/prototype-store";

const nav = [
  { href: "#ringkasan", label: "Beranda", icon: Home },
  { href: "#materi-belajar", label: "Materi", icon: BookOpen },
  { href: "#jadwal", label: "Jadwal", icon: CalendarDays },
  { href: "#presensi", label: "Presensi", icon: ScanLine },
  { href: "#notifikasi", label: "Pesan", icon: Bell },
];

export function MenteeShell() {
  const { state, submitMaterial, markNotificationRead, simulateScan } = usePrototype();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mentee = state.mentees.find((item) => item.id === state.activeMenteeId)!;
  const progress = state.materialProgress.filter((item) => item.menteeId === mentee.id);
  const notifications = state.notifications.filter((item) => item.menteeId === mentee.id);
  const attendance = state.attendanceRecords.filter((item) => item.menteeId === mentee.id);
  const nextMeeting = state.meetings.find((meeting) => meeting.status === "akan_datang");
  const activeSession = state.attendanceSession && isAttendanceSessionActive(
    state.attendanceSession.openedAt,
    state.attendanceSession.durationMinutes,
  ) ? state.attendanceSession : null;
  const activeMeeting = state.meetings.find((meeting) => meeting.id === activeSession?.meetingId);
  const alreadyRecorded = Boolean(activeMeeting && attendance.some((record) => record.meetingId === activeMeeting.id));
  const unreadCount = notifications.filter((item) => !item.read).length;

  return (
    <div className="portal-layout">
      <aside className="portal-sidebar">
        <Link className="portal-brand" href="/"><span>D1</span><strong>PTIK<br />MENTORING</strong></Link>
        <nav aria-label="Navigasi mentee">{nav.map(({ href, label, icon: Icon }) => <a href={href} key={href}><Icon size={20} /> {label}</a>)}</nav>
        <div className="portal-profile"><span>{mentee.initials}</span><div><strong>{mentee.name}</strong><small>{mentee.nim}</small></div></div>
        <Link className="portal-logout" href="/"><LogOut size={18} /> Keluar demo</Link>
      </aside>

      <header className="portal-mobile-header">
        <Link className="portal-brand" href="/"><span>D1</span><strong>PTIK</strong></Link>
        <div>
          <a aria-label={`${unreadCount} pesan belum dibaca`} className="mobile-header-action" href="#notifikasi"><Bell />{unreadCount > 0 && <i>{unreadCount}</i>}</a>
          <button aria-controls="mentee-mobile-menu" aria-expanded={mobileMenuOpen} aria-label="Buka menu" onClick={() => setMobileMenuOpen(true)} type="button"><Menu /></button>
        </div>
      </header>

      {mobileMenuOpen && <div className="mobile-menu-layer">
        <button aria-label="Tutup panel navigasi" className="mobile-menu-backdrop" onClick={() => setMobileMenuOpen(false)} type="button" />
        <aside aria-label="Menu mentee" aria-modal="true" className="mobile-menu-panel" id="mentee-mobile-menu" role="dialog">
          <div className="mobile-menu-head"><div><span>{mentee.initials}</span><p><small>Halo,</small><strong>{mentee.name.split(" ")[0]}</strong></p></div><button aria-label="Tutup menu" onClick={() => setMobileMenuOpen(false)} type="button"><X /></button></div>
          <p className="mobile-menu-intro">Kamu mau ke bagian mana?</p>
          <nav aria-label="Menu cepat mentee">{nav.map(({ href, label, icon: Icon }) => <a href={href} key={href} onClick={() => setMobileMenuOpen(false)}><Icon size={22} /><span>{label}<small>Buka bagian {label.toLowerCase()}</small></span><span aria-hidden="true">→</span></a>)}</nav>
          <Link className="mobile-menu-exit" href="/"><LogOut size={18} /> Keluar dari mode demo</Link>
        </aside>
      </div>}

      <main className="portal-main" id="main-content">
        <DashboardOverview attendanceActive={Boolean(activeMeeting)} mentee={mentee} nextMeeting={nextMeeting} summary={calculateProgressSummary(state, mentee.id)} />
        <section className="portal-section" id="materi-belajar"><div className="portal-section__head"><div><span className="eyebrow">ROADMAP BELAJAR</span><h2>Materi kamu</h2></div><Badge tone="purple">14 topik</Badge></div><MaterialList materials={state.materials} onSubmit={submitMaterial} progress={progress} /></section>
        <section className="portal-section" id="jadwal"><div className="portal-section__head"><div><span className="eyebrow">SETIAP PEKAN TERCATAT</span><h2>Jadwal mentoring</h2></div><ClipboardCheck size={34} /></div><ScheduleList meetings={state.meetings} /></section>
        <section className="portal-section" id="presensi"><div className="portal-section__head"><div><span className="eyebrow">KEHADIRAN</span><h2>Presensi kamu</h2></div></div><AttendanceSummary records={attendance} /><ScanAttendanceCard alreadyRecorded={alreadyRecorded} meeting={activeMeeting} onScan={simulateScan} /></section>
        <section className="portal-section" id="notifikasi"><div className="portal-section__head"><div><span className="eyebrow">TETAP TERHUBUNG</span><h2>Pesan untukmu</h2></div><Badge tone="pink">{unreadCount} baru</Badge></div><NotificationDrawer notifications={notifications} onRead={markNotificationRead} /></section>
      </main>

      <nav aria-label="Navigasi mentee ponsel" className="portal-bottom-nav">{nav.map(({ href, label, icon: Icon }) => <a href={href} key={href}><Icon size={20} /><span>{label}</span></a>)}</nav>
    </div>
  );
}
