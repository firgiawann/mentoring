import { BookOpen, CalendarDays, QrCode, Users } from "lucide-react";

import { Card } from "@/components/ui/card";

const features = [
  { icon: BookOpen, value: "14", label: "Materi terarah", copy: "Ringkasan bisa dibaca lebih awal, isi lengkap dibuka sesuai ritme kelas.", tone: "yellow" as const },
  { icon: CalendarDays, value: "10+", label: "Pertemuan", copy: "Agenda, catatan, materi, dan dokumentasi terhubung dalam satu riwayat.", tone: "blue" as const },
  { icon: QrCode, value: "15 dtk", label: "QR berotasi", copy: "Presensi cepat dengan kode dinamis dan tetap bisa dikoreksi mentor.", tone: "pink" as const },
  { icon: Users, value: "1:10", label: "Ruang kecil", copy: "Dibuat khusus untuk PTIK D1 2026 agar pendampingan terasa dekat.", tone: "green" as const },
];

export function ProgramOverview() {
  return (
    <section className="public-section" id="program">
      <div className="section-wrap">
        <div className="section-heading">
          <div><span className="eyebrow">BUKAN CUMA CHECKLIST</span><h2>Satu ruang untuk<br />tetap bertumbuh.</h2></div>
          <p>Prototype ini menyatukan persiapan materi, aktivitas mentoring, progres, dan kehadiran—tanpa membuat mentee tenggelam dalam banyak alat.</p>
        </div>
        <div className="feature-grid">
          {features.map(({ icon: Icon, value, label, copy, tone }) => (
            <Card as="article" className="feature-card" key={label} tone={tone}>
              <div className="feature-icon"><Icon size={25} strokeWidth={3} /></div>
              <strong className="feature-value">{value}</strong>
              <h3>{label}</h3>
              <p>{copy}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
