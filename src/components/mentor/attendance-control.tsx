"use client";

import { Clock3, Radio, ShieldCheck, StopCircle } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createRotatingToken, isAttendanceSessionActive } from "@/features/prototype/domain";
import type { AttendanceSession, Meeting } from "@/features/prototype/types";

type AttendanceControlProps = {
  meeting: Meeting;
  session: AttendanceSession | null;
  onOpen: (meetingId: string, durationMinutes: 30 | 45 | 60) => void;
  onClose: () => void;
  now?: number;
};

function formatRemaining(milliseconds: number) {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  const minutes = Math.floor(seconds / 60);
  return `${String(minutes).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
}

export function AttendanceControl({ meeting, session, onOpen, onClose, now }: AttendanceControlProps) {
  const [duration, setDuration] = useState<30 | 45 | 60>(30);
  const [clock, setClock] = useState<number | null>(now ?? null);

  useEffect(() => {
    if (now !== undefined) return;
    const initialTick = window.setTimeout(() => setClock(Date.now()), 0);
    const interval = window.setInterval(() => setClock(Date.now()), 1000);
    return () => {
      window.clearTimeout(initialTick);
      window.clearInterval(interval);
    };
  }, [now]);

  const currentTime = now ?? clock ?? 0;
  const active = Boolean(session && session.meetingId === meeting.id && isAttendanceSessionActive(session.openedAt, session.durationMinutes, currentTime));
  const token = active ? createRotatingToken(meeting.id, currentTime, 15) : "";
  const remaining = active && session ? session.openedAt + session.durationMinutes * 60_000 - currentTime : 0;

  if (!active) {
    return <Card className="attendance-control attendance-control--closed" tone="paper"><div className="attendance-control__intro"><span className="admin-icon"><Radio size={27} /></span><div><span className="eyebrow">SESI PRESENSI</span><h3>{meeting.title}</h3><p>Pilih durasi aktif. QR akan terus berotasi selama sesi berlangsung.</p></div></div><label className="duration-select">Durasi sesi<select aria-label="Durasi sesi" onChange={(event) => setDuration(Number(event.target.value) as 30 | 45 | 60)} value={duration}><option value="30">30 menit</option><option value="45">45 menit</option><option value="60">60 menit</option></select></label><Button onClick={() => onOpen(meeting.id, duration)}><Radio size={18} /> Buka presensi</Button></Card>;
  }

  return <Card className="attendance-control attendance-control--active" tone="green"><div className="qr-panel"><div className="qr-frame" role="img" aria-label="QR presensi aktif"><QRCodeSVG bgColor="#fffef7" fgColor="#171717" level="M" marginSize={2} size={196} value={`ptik-mentoring://${meeting.id}?token=${token}`} /></div><Badge tone="pink"><span className="live-dot" /> QR berotasi</Badge></div><div className="attendance-live-copy"><span className="eyebrow">PRESENSI SEDANG AKTIF</span><h3>{meeting.title}</h3><div className="session-timer"><Clock3 size={23} /><div><small>Sisa sesi</small><strong>{formatRemaining(remaining)}</strong></div></div><p>Kode saat ini: <code>{token}</code></p><span className="security-line"><ShieldCheck size={18} /> Sesi {session!.durationMinutes} menit · token visual 15 detik</span><Button onClick={onClose} variant="danger"><StopCircle size={18} /> Tutup presensi</Button></div></Card>;
}
