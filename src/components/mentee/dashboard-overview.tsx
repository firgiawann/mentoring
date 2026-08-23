"use client";

import {
  ArrowRight, BookMarked, BookOpenText, CalendarClock, ChevronDown, ChevronUp,
  CircleHelp, Coffee, Flame, ScanLine, Sparkles, ThumbsUp,
} from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ProgressBar } from "@/components/ui/progress-bar";
import type { Meeting, Mentee, ProgressSummary } from "@/features/prototype/types";

type Mood = "ready" | "steady" | "help";

const moodCopy: Record<Mood, string> = {
  ready: "Mantap! Pilih satu langkah kecil di bawah dan mulai dari sana.",
  steady: "Santai saja. Nggak perlu menuntaskan semuanya dalam satu waktu.",
  help: "Kamu nggak sendirian. Catat kendalanya dan cerita ke mentor saat mentoring, ya.",
};

export function DashboardOverview({ mentee, nextMeeting, summary, attendanceActive }: {
  mentee: Mentee;
  nextMeeting?: Meeting;
  summary: ProgressSummary;
  attendanceActive: boolean;
}) {
  const [mood, setMood] = useState<Mood | null>(null);
  const [showGuide, setShowGuide] = useState(true);

  return (
    <section className="portal-section portal-overview" id="ringkasan">
      <div className="portal-greeting">
        <div><span className="eyebrow">RUANG BELAJARMU HARI INI</span><h1>Halo, {mentee.name.split(" ")[0]}! <span>👋</span></h1><p>Nggak harus langsung paham semuanya. Kita mulai dari satu langkah kecil.</p></div>
        <Badge tone="yellow"><Flame size={15} /> 3 pekan konsisten</Badge>
      </div>

      <Card className="mentee-checkin" tone="green">
        <div className="checkin-copy"><span className="eyebrow">CHECK-IN DULU</span><h2>Gimana keadaanmu hari ini?</h2><p>Pilih yang paling mendekati. Nggak ada jawaban salah.</p></div>
        <div aria-label="Pilih keadaanmu" className="mood-options" role="group">
          <button aria-pressed={mood === "ready"} onClick={() => setMood("ready")} type="button"><ThumbsUp size={19} /> Siap belajar</button>
          <button aria-pressed={mood === "steady"} onClick={() => setMood("steady")} type="button"><Coffee size={19} /> Santai dulu</button>
          <button aria-pressed={mood === "help"} onClick={() => setMood("help")} type="button"><CircleHelp size={19} /> Butuh bantuan</button>
        </div>
        <p className="mood-response" role="status">{mood ? moodCopy[mood] : "Pilih kondisi kamu supaya kami bisa memberi arahan yang pas."}</p>
      </Card>

      <div className="today-focus">
        <div className="today-focus__head"><div><span className="eyebrow">FOKUS HARI INI</span><h2>Mau mulai dari mana?</h2></div><span>3 langkah sederhana</span></div>
        <div className="focus-actions">
          <a className="focus-action focus-action--yellow" href="#materi-belajar"><span><BookOpenText size={22} /></span><div><small>Langkah 1</small><strong>Buka materi</strong><p>Lihat ringkasan topik berikutnya.</p></div><ArrowRight /></a>
          <a className="focus-action focus-action--blue" href="#jadwal"><span><CalendarClock size={22} /></span><div><small>Langkah 2</small><strong>Cek agenda</strong><p>{nextMeeting ? `${nextMeeting.title} sudah dijadwalkan.` : "Jadwal berikutnya masih disiapkan."}</p></div><ArrowRight /></a>
          <a className={`focus-action ${attendanceActive ? "focus-action--green" : "focus-action--paper"}`} href="#presensi"><span><ScanLine size={22} /></span><div><small>Langkah 3</small><strong>{attendanceActive ? "Presensi sekarang" : "Lihat status presensi"}</strong><p>{attendanceActive ? "Sesi aktif, kamu sudah bisa memindai." : "Kami kabari saat sesi dibuka mentor."}</p></div><ArrowRight /></a>
        </div>
      </div>

      <div className="overview-grid">
        <Card className="progress-hero" tone="pink"><div className="progress-hero__top"><div><span className="eyebrow">PROGRES BELAJARMU</span><strong>{summary.verified}<small>/{summary.total}</small></strong></div><BookMarked size={46} strokeWidth={2.5} /></div><ProgressBar label="Materi terverifikasi" max={summary.total} value={summary.verified} /><p>{summary.pending ? `${summary.pending} materi sedang dicek mentor.` : "Semua progres yang dikirim sudah diperiksa."}</p></Card>
        <Card className="next-meeting-card" tone="blue"><div className="card-icon-label"><CalendarClock size={23} /><span className="eyebrow">KITA KETEMU LAGI</span></div><h2>{nextMeeting?.title ?? "Jadwal menyusul"}</h2>{nextMeeting && <><p>{new Intl.DateTimeFormat("id-ID", { weekday: "long", day: "numeric", month: "long" }).format(new Date(nextMeeting.date))} · {nextMeeting.time}</p><span className="meeting-location">{nextMeeting.location}</span></>}<a href="#jadwal">Lihat agenda <ArrowRight size={17} /></a></Card>
        <Card className="quick-presence" tone={attendanceActive ? "green" : "yellow"}><ScanLine size={34} strokeWidth={3} /><div><span className="eyebrow">PRESENSI</span><h2>{attendanceActive ? "Sesi sedang aktif!" : "Belum waktunya presensi"}</h2><p>{attendanceActive ? "Buka pemindai dan catat kehadiranmu." : "Tombol pemindai akan aktif setelah mentor membuka sesi."}</p></div><a aria-label="Buka bagian presensi" href="#presensi"><ArrowRight /></a></Card>
      </div>

      <aside aria-label="Panduan mentee baru" className={`new-student-guide ${showGuide ? "is-open" : "is-closed"}`}>
        <div className="guide-heading"><div><Sparkles size={22} /><span><small>BARU DI SINI?</small><strong>Mulai dari sini</strong></span></div><button aria-expanded={showGuide} onClick={() => setShowGuide((value) => !value)} type="button">{showGuide ? <><ChevronUp /> Tutup panduan</> : <><ChevronDown /> Buka panduan</>}</button></div>
        {showGuide && <ol><li><strong>Baca ringkasan</strong><span>Supaya punya gambaran sebelum mentoring.</span></li><li><strong>Ikuti pertemuan</strong><span>Bertanya itu bagian dari belajar.</span></li><li><strong>Catat progres</strong><span>Tandai materi setelah kamu mencobanya.</span></li></ol>}
      </aside>
    </section>
  );
}
