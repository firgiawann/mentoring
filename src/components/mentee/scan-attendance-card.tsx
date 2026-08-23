"use client";

import { Camera, CheckCircle2, QrCode, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { Meeting } from "@/features/prototype/types";

export function ScanAttendanceCard({ meeting, alreadyRecorded, onScan }: { meeting?: Meeting; alreadyRecorded: boolean; onScan: () => void }) {
  return <Card className="scan-card" tone={meeting ? "green" : "paper"}><div className="scan-illustration">{alreadyRecorded ? <CheckCircle2 size={64} /> : meeting ? <Camera size={64} /> : <QrCode size={64} />}</div><div><span className="eyebrow">PRESENSI QR DINAMIS</span><h3>{alreadyRecorded ? "Kehadiranmu tercatat!" : meeting ? `${meeting.title} sedang aktif` : "Belum ada sesi aktif"}</h3><p>{alreadyRecorded ? "Status sementara: hadir. Mentor tetap dapat melakukan koreksi." : meeting ? "Prototype akan mensimulasikan pemindaian QR yang masih valid." : "Sesi akan aktif selama 30, 45, atau 60 menit ketika dibuka mentor."}</p><div className="secure-copy"><ShieldCheck size={18} /> Token berotasi, tanpa mengambil lokasi.</div></div><Button disabled={!meeting || alreadyRecorded} onClick={onScan}>{alreadyRecorded ? "Sudah tercatat" : "Simulasikan pindai"}</Button></Card>;
}
